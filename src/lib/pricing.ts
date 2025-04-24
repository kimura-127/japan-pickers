/**
 * 料金計算に関するユーティリティ関数
 */

export type VehicleType = "vega" | "landHome" | "camroad";
export type DayType = "weekday" | "weekend" | "highSeason";

interface PriceStructure {
  // 最初の24時間の料金
  initial24h: number;
  // 追加の1日あたりの料金
  additionalDay: number;
  // 1時間あたりの料金（該当する場合）
  hourlyRate?: number;
  // 1時間あたりの最大料金（該当する場合）
  hourlyMax?: number;
}

// 車種ごとの料金体系
export const PRICE_TABLE: Record<VehicleType, Record<DayType, PriceStructure>> = {
  // ベガとランドホームグランデの料金
  vega: {
    weekday: {
      initial24h: 44000,
      additionalDay: 35200,
      hourlyRate: 6800,
      hourlyMax: 35200,
    },
    weekend: {
      initial24h: 49500,
      additionalDay: 42075,
      hourlyRate: 6800,
      hourlyMax: 42075,
    },
    highSeason: {
      initial24h: 58000,
      additionalDay: 49300,
      hourlyRate: 6800,
      hourlyMax: 49300,
    },
  },
  landHome: {
    weekday: {
      initial24h: 54000,
      additionalDay: 45200,
      hourlyRate: 6800,
      hourlyMax: 45200,
    },
    weekend: {
      initial24h: 59500,
      additionalDay: 52075,
      hourlyRate: 6800,
      hourlyMax: 52075,
    },
    highSeason: {
      initial24h: 68000,
      additionalDay: 59300,
      hourlyRate: 6800,
      hourlyMax: 59300,
    },
  },
  // カムロードZiLの料金
  camroad: {
    weekday: {
      initial24h: 19800,
      additionalDay: 15000,
      hourlyRate: 3800,
    },
    weekend: {
      initial24h: 25000,
      additionalDay: 21250,
      hourlyRate: 3800,
    },
    highSeason: {
      initial24h: 30000,
      additionalDay: 25500,
      hourlyRate: 3800,
    },
  },
};

// ハイシーズンの期間
export const HIGH_SEASON_PERIODS = [
  // 夏休み: 7/14～8/31
  { start: { month: 7, day: 14 }, end: { month: 8, day: 31 } },
  // 年末: 12/27～1/3
  { start: { month: 12, day: 27 }, end: { month: 1, day: 3 } },
  // 春休み: 3/20-4/5
  { start: { month: 3, day: 20 }, end: { month: 4, day: 5 } },
  // GW: 4/29-5/6
  { start: { month: 4, day: 29 }, end: { month: 5, day: 6 } },
];

/**
 * 日付が休日（金土日・祝）かどうかを判定する
 *
 * @param date 判定する日付
 * @returns 休日の場合はtrue、平日の場合はfalse
 */
export function isWeekendOrHoliday(date: Date): boolean {
  const day = date.getDay();
  // 金(5)、土(6)、日(0)は週末
  return day === 0 || day === 5 || day === 6;

  // 注: 祝日判定は現在含まれていません。より正確な判定を行うには、祝日リストを使用するか、
  // 外部APIを利用する必要があります。
}

/**
 * 日付がハイシーズンかどうかを判定する
 *
 * @param date 判定する日付
 * @returns ハイシーズンの場合はtrue、それ以外の場合はfalse
 */
export function isHighSeason(date: Date): boolean {
  const month = date.getMonth() + 1; // JavaScriptの月は0から始まるため、+1する
  const day = date.getDate();

  return HIGH_SEASON_PERIODS.some((period) => {
    const { start, end } = period;

    // 特別なケース: 年末年始など、年をまたぐ期間の処理
    if (start.month > end.month) {
      // 12月27日～1月3日のような場合
      return (month === start.month && day >= start.day) || (month === end.month && day <= end.day);
    }

    // 通常のケース: 同じ年内での期間
    return (
      (month > start.month || (month === start.month && day >= start.day)) &&
      (month < end.month || (month === end.month && day <= end.day))
    );
  });
}

/**
 * 日付の種類（平日、週末、ハイシーズン）を判定する
 *
 * @param date 判定する日付
 * @returns 日付の種類（'weekday', 'weekend', 'highSeason'）
 */
export function getDayType(date: Date): DayType {
  // ハイシーズンの判定を最優先
  if (isHighSeason(date)) {
    return "highSeason";
  }

  // 次に休日判定
  if (isWeekendOrHoliday(date)) {
    return "weekend";
  }

  // それ以外は平日
  return "weekday";
}

/**
 * 指定された期間の合計料金を計算する
 *
 * @param startDate 開始日
 * @param endDate 終了日
 * @param vehicleType 車種タイプ
 * @param isHourly 時間単位の計算を行うかどうか (デフォルト: false)
 * @param hours 時間数 (時間単位の計算を行う場合)
 * @returns 合計料金
 */
export function calculateTotalPrice(
  startDate: Date,
  endDate: Date,
  vehicleType: VehicleType,
  isHourly = false,
  hours?: number,
) {
  // 日付の差分を計算（ミリ秒）
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());

  // 日数を計算（終了日を含む）
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // 1日未満（24時間以内）の短期レンタルの場合
  if (diffDays === 1 && isHourly && hours !== undefined) {
    // 1日目の日付タイプを取得
    const dayType = getDayType(startDate);
    const priceStructure = PRICE_TABLE[vehicleType][dayType];

    // 時間単位で計算
    const hourlyPrice = hours * (priceStructure.hourlyRate || 0);

    // 最大料金が設定されている場合は、その金額を超えないようにする
    if (priceStructure.hourlyMax !== undefined && hourlyPrice > priceStructure.hourlyMax) {
      return priceStructure.hourlyMax;
    }

    return hourlyPrice;
  }

  // 1日以上のレンタルの場合
  let totalPrice = 0;
  const currentDate = new Date(startDate);

  // 最初の日の24時間分の料金を追加
  const firstDayType = getDayType(currentDate);
  totalPrice += PRICE_TABLE[vehicleType][firstDayType].initial24h;

  // 2日目以降の料金を追加
  if (diffDays > 1) {
    // 各日付をループして、その日の種類に基づいて料金を加算
    for (let i = 1; i < diffDays; i++) {
      // 次の日に進める
      currentDate.setDate(currentDate.getDate() + 1);

      const dayType = getDayType(currentDate);
      totalPrice += PRICE_TABLE[vehicleType][dayType].additionalDay;
    }
  }

  return totalPrice;
}

/**
 * 料金内訳を取得する
 *
 * @param startDate 開始日
 * @param endDate 終了日
 * @param vehicleType 車種タイプ
 * @returns 料金内訳オブジェクト
 */
export function getPriceBreakdown(startDate: Date, endDate: Date, vehicleType: VehicleType) {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

  const firstDayType = getDayType(startDate);
  const initial24hPrice = PRICE_TABLE[vehicleType][firstDayType].initial24h;

  const additionalDays: Array<{ price: number; dayType: DayType; date: Date }> = [];
  let totalPrice = initial24hPrice;

  if (diffDays > 1) {
    const currentDate = new Date(startDate);

    for (let i = 1; i < diffDays; i++) {
      // 次の日に進める
      currentDate.setDate(currentDate.getDate() + 1);
      const nextDate = new Date(currentDate);

      const dayType = getDayType(nextDate);
      const price = PRICE_TABLE[vehicleType][dayType].additionalDay;

      additionalDays.push({
        price,
        dayType,
        date: nextDate,
      });

      totalPrice += price;
    }
  }

  return {
    initial24h: { price: initial24hPrice, dayType: firstDayType },
    additionalDays,
    total: totalPrice,
  };
}
