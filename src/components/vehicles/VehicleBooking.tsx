"use client";

import PremiumButton from "@/components/ui/PremiumButton";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { OptionImageModal } from "@/components/ui/option-image-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { calculateTotalPrice, getPriceBreakdown } from "@/lib/pricing";
import type { DayType } from "@/lib/pricing";
import { PRICE_TABLE, getDayType } from "@/lib/pricing";
import type { Vehicle } from "@/lib/vehicles";
import { CAMPAIGN_DISCOUNT_RATE } from "@/lib/vehicles";
import { ja } from "date-fns/locale";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  X,
} from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";
import { ReservationFormModal } from "./ReservationFormModal";

interface VehicleBookingProps {
  vehicle: Vehicle;
  onShowImages?: (optionName: string) => void;
}

const VehicleBooking = ({ vehicle, onShowImages }: VehicleBookingProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  // 現在は使用していませんが、将来的に使用する予定の状態
  // const [adults, setAdults] = useState(2);
  // const [children, setChildren] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasUnavailableDates, setHasUnavailableDates] = useState<boolean>(false);
  const [priceBreakdown] = useState<ReturnType<typeof getPriceBreakdown> | null>(null);
  const [departureTime, setDepartureTime] = useState<string>(""); // 出発時間用の名前を変更
  const [arrivalTime, setArrivalTime] = useState<string>(""); // 到着時間を追加
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  const options = [
    { id: "wifi", name: "Wi-Fiルーター", price: 2000 },
    { id: "bbq", name: "BBQグリルセット", price: 3000 },
    { id: "chair", name: "アウトドアチェア", price: 1000 },
    { id: "bedding", name: "追加寝具セット", price: 2000 },
    { id: "bike", name: "小型トライク", price: 7700 },
  ];

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId) ? prev.filter((id) => id !== optionId) : [...prev, optionId],
    );
  };

  const getTotalDays = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // 終了日も含める
  };

  // 料金計算ロジックを新しいものに置き換え
  const calculateTotal = () => {
    if (!dateRange?.from || !dateRange?.to)
      return { total: 0, breakdown: null, timeFee: 0, extraHours: 0, discountedTotal: 0 };

    // 基本料金を計算
    const basePrice = calculateTotalPrice(dateRange.from, dateRange.to, vehicle.vehicleType);

    // 料金内訳を計算
    const breakdown = getPriceBreakdown(dateRange.from, dateRange.to, vehicle.vehicleType);

    let total = basePrice;
    let timeFee = 0;
    let extraHours = 0;

    // オプション料金を追加
    for (const optionId of selectedOptions) {
      const option = options.find((opt) => opt.id === optionId);
      if (option) {
        total += option.price;
      }
    }

    // 時間帯が選択されている場合、時間数に基づいて追加料金を計算
    if (departureTime && arrivalTime && dateRange.from && dateRange.to) {
      // 出発時間と到着時間を解析
      const depHour = Number.parseInt(departureTime.split(":")[0]);
      const arrHour = Number.parseInt(arrivalTime.split(":")[0]);

      // 出発時間と到着時間が同じ場合は追加時間なし
      if (depHour === arrHour) {
        extraHours = 0;
        timeFee = 0;
      } else {
        // 日数（切り上げ）を計算
        const diffDays = getTotalDays() - 1; // 開始日と終了日を含むので1を引く

        // 同日内での予約か複数日にわたる予約かを確認
        if (diffDays === 0) {
          // 同日内での予約の場合
          if (arrHour > depHour) {
            // 到着時間が出発時間より後の場合のみ追加料金
            extraHours = arrHour - depHour;
          } else {
            // 到着時間が出発時間より前の場合は追加時間なし
            // (例: 13:00出発、12:00到着)
            extraHours = 0;
          }
        } else {
          // 複数日予約の場合
          if (arrHour >= depHour) {
            // 最終日の到着時間が初日の出発時間と同じか後の場合
            // (例: 1日目13:00出発、2日目14:00到着)
            extraHours = arrHour - depHour;
          } else {
            // 最終日の到着時間が初日の出発時間より前の場合
            // (例: 1日目13:00出発、2日目12:00到着)
            extraHours = 0;
          }
        }

        // 時間料金の計算
        const totalHours = diffDays * 24 + extraHours;

        // 最初の24時間を超える分を計算
        if (totalHours > 24 && extraHours > 0) {
          // 日付の種類を取得
          const dayType = getDayType(dateRange.from);

          // PRICE_TABLEから時間単価と上限料金を取得
          const hourlyRate = PRICE_TABLE[vehicle.vehicleType][dayType].hourlyRate || 0;
          const maxHourlyCharge = PRICE_TABLE[vehicle.vehicleType][dayType].hourlyMax;

          // 時間料金を計算（上限がある場合は上限を適用）
          timeFee = Math.min(extraHours * hourlyRate, maxHourlyCharge || extraHours * hourlyRate);
        } else {
          timeFee = 0;
        }
      }

      total += timeFee;
    }

    // キャンペーン割引を適用
    const discountedTotal = Math.round(total * CAMPAIGN_DISCOUNT_RATE);

    return { total, breakdown, timeFee, extraHours, discountedTotal };
  };

  // 日付タイプの日本語表示
  const getDayTypeLabel = (dayType: DayType): string => {
    const labels = {
      weekday: "平日",
      weekend: "週末・祝日",
      highSeason: "ハイシーズン",
    };
    return labels[dayType];
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
  };

  // 仮の予約可能日を生成
  const generateAvailableDates = () => {
    const today = new Date();
    const availableDates: Date[] = [];

    for (let i = 1; i <= 90; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // 水曜日（3）以外の日を予約可能とする
      if (date.getDay() !== 3) {
        availableDates.push(date);
      }
    }

    return availableDates;
  };

  const availableDates = generateAvailableDates();

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate(),
    );
  };

  // 予約不可の日付を指定
  const disabledDays = () => {
    const today = new Date();
    const threemonthsLater = new Date();
    threemonthsLater.setMonth(today.getMonth() + 3);

    // 過去の日付と3ヶ月後以降の日付を無効化
    const disabledDates: Date[] = [];

    // 予約可能日以外の日付を無効化
    const allDates: Date[] = [];
    const startDate = new Date(today);
    const endDate = new Date(threemonthsLater);

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      allDates.push(new Date(d));
    }

    for (const date of allDates) {
      if (!isDateAvailable(date)) {
        disabledDates.push(date);
      }
    }

    return [{ before: today }, { after: threemonthsLater }, ...disabledDates];
  };

  // 前の月に移動
  const goToPreviousMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  };

  // 次の月に移動
  const goToNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // 現在の月が今月かどうかを確認
  const isCurrentMonthToday = () => {
    const today = new Date();
    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  // 現在の月が3ヶ月後かどうかを確認
  const isCurrentMonthThreeMonthsLater = () => {
    const today = new Date();
    const threeMonthsLater = new Date(today);
    threeMonthsLater.setMonth(today.getMonth() + 2); // 0, 1, 2の3ヶ月

    return (
      currentMonth.getMonth() === threeMonthsLater.getMonth() &&
      currentMonth.getFullYear() === threeMonthsLater.getFullYear()
    );
  };

  // カスタムモディファイアを作成
  const modifiers = {
    unavailable: (date: Date) => !isDateAvailable(date) && date > new Date(),
  };

  // カスタムコンテンツを作成
  const dayContent = (day: Date) => {
    const isUnavailable = !isDateAvailable(day) && day > new Date();
    const isStart = dateRange?.from && day.getTime() === dateRange.from.getTime();
    const isEnd = dateRange?.to && day.getTime() === dateRange.to.getTime();

    if (isUnavailable) {
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <span>{day.getDate()}</span>
          <X className="absolute text-jp-silver/70 w-4 h-4" />
        </div>
      );
    }

    if (isStart) {
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <span>{day.getDate()}</span>
          <div className="absolute -bottom-1 text-jp-gold text-[8px]">開始日</div>
        </div>
      );
    }

    if (isEnd) {
      return (
        <div className="relative flex items-center justify-center w-full h-full">
          <span>{day.getDate()}</span>
          <div className="absolute -bottom-1 text-jp-gold text-[8px]">終了日</div>
        </div>
      );
    }

    return <div className="flex items-center justify-center">{day.getDate()}</div>;
  };

  // 日付選択時のハンドラー
  const handleDateSelect = (range: DateRange | undefined) => {
    // 選択がクリアされた場合
    if (!range || !range.from || !range.to) {
      setDateRange(range);
      setHasUnavailableDates(false);
      return;
    }

    // 選択範囲内に予約済みの日付があるかチェック
    const startDate = new Date(range.from);
    const endDate = new Date(range.to);

    // 日付の範囲内に水曜日が含まれているかチェック
    let hasWednesday = false;
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (currentDate.getDay() === 3) {
        // 水曜日
        hasWednesday = true;
        break;
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (hasWednesday) {
      // 警告トーストを表示
      toast.error("予約エラー", {
        description:
          "選択した期間内に既に予約が入っている日付があります。別の日程を選択してください。",
      });
      // 予約不可フラグを設定
      setHasUnavailableDates(true);
    } else {
      setHasUnavailableDates(false);
    }

    // 日付範囲を設定（予約済み日付があっても選択は許可）
    setDateRange(range);
  };

  // 時間選択時のハンドラー
  const handleDepartureTimeChange = (value: string) => {
    setDepartureTime(value);
  };

  const handleArrivalTimeChange = (value: string) => {
    setArrivalTime(value);
  };

  const handleShowImages = (optionName: string) => {
    if (onShowImages) {
      onShowImages(optionName);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="gold-icon w-5 h-5" />
            <h3 className="text-xl font-medium text-white">予約日を選択</h3>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50 w-fit mx-auto">
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                size="icon"
                onClick={goToPreviousMonth}
                disabled={isCurrentMonthToday()}
                className="border-jp-darkgray/50 text-jp-silver hover:text-white hover:bg-jp-darkgray/70"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-white font-medium">
                {currentMonth.toLocaleDateString("ja-JP", { year: "numeric", month: "long" })}
              </h3>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNextMonth}
                disabled={isCurrentMonthThreeMonthsLater()}
                className="border-jp-darkgray/50 text-jp-silver hover:text-white hover:bg-jp-darkgray/70"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center w-full">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={handleDateSelect}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                numberOfMonths={1}
                disabled={disabledDays()}
                locale={ja}
                showOutsideDays={false}
                modifiers={modifiers}
                components={{
                  DayContent: ({ date }) => dayContent(date),
                }}
                className="text-white"
                classNames={{
                  day_selected:
                    "bg-jp-gold text-jp-black hover:bg-jp-gold hover:text-jp-black font-bold",
                  day_today: "border border-jp-silver text-jp-silver",
                  day_range_middle: "bg-jp-gold/30 text-white",
                  day_disabled: "text-jp-silver/30 line-through",
                  caption_label: "text-white font-medium hidden", // カスタムナビゲーションを使用するため非表示
                  nav: "hidden", // カスタムナビゲーションを使用するため非表示
                  cell: "text-jp-silver h-12", // 高さを増やして「開始日」「終了日」のラベルが入るようにする
                  day_outside: "invisible",
                  table: "w-full border-spacing-1",
                }}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <Check className="gold-icon w-5 h-5" />
            <h3 className="text-xl font-medium text-white">オプションを選択</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
              <div
                key={option.id}
                className="border border-jp-darkgray/50 rounded-xl pt-3 px-5 cursor-pointer"
              >
                <Button
                  type="button"
                  className={`w-full text-left bg-jp-darkgray/30 cursor-pointer transition-colors ${
                    selectedOptions.includes(option.id)
                      ? "border-jp-gold"
                      : "border-jp-darkgray/50 hover:border-jp-gold/50"
                  }`}
                  onClick={() => toggleOption(option.id)}
                  aria-pressed={selectedOptions.includes(option.id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        selectedOptions.includes(option.id)
                          ? "bg-jp-gold text-jp-black"
                          : "border border-jp-silver text-jp-silver"
                      }`}
                    >
                      {selectedOptions.includes(option.id) && <Check className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-white">{option.name}</p>
                      <p className="text-sm text-jp-silver">¥{option.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Button>
                <div className="flex items-center justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-jp-silver hover:text-white hover:bg-jp-darkgray/50 px-3 py-1.5 flex items-center cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShowImages(option.name);
                    }}
                  >
                    <ImageIcon className="w-4 h-4 mb-1" />
                    <span className="text-xs">写真で確認する</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-jp-darkgray/30 rounded-xl p-6 border border-jp-darkgray/50 sticky top-24">
          <h3 className="text-xl font-medium text-white mb-4">予約内容</h3>

          <div className="space-y-4 mb-6">
            <div>
              <p className="text-jp-silver mb-1">車両</p>
              <p className="text-white font-medium">{vehicle.name}</p>
            </div>

            <div>
              <p className="text-jp-silver mb-1">日程</p>
              {dateRange?.from && dateRange?.to ? (
                <p className="text-white font-medium">
                  {formatDate(dateRange.from)} 〜 {formatDate(dateRange.to)}
                  <span className="text-jp-silver ml-2 text-sm">（{getTotalDays()}泊）</span>
                </p>
              ) : (
                <p className="text-jp-silver italic">日程を選択してください</p>
              )}
            </div>

            {selectedOptions.length > 0 && (
              <div>
                <p className="text-jp-silver mb-1">選択オプション</p>
                <ul className="space-y-1">
                  {selectedOptions.map((optionId) => {
                    const option = options.find((opt) => opt.id === optionId);
                    return option ? (
                      <li key={optionId} className="text-white">
                        {option.name}
                        <span className="text-jp-silver ml-2 text-sm">
                          （¥{option.price.toLocaleString()}）
                        </span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            )}
          </div>

          <div className="border-t border-jp-darkgray/50 pt-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-jp-silver">基本料金（最初の24時間）</p>
              <p className="text-white">
                {priceBreakdown ? `¥${priceBreakdown.initial24h.price.toLocaleString()}` : "-"}
                {priceBreakdown && (
                  <span className="text-xs ml-1 text-jp-silver">
                    （{getDayTypeLabel(priceBreakdown.initial24h.dayType)}）
                  </span>
                )}
              </p>
            </div>

            {priceBreakdown && priceBreakdown.additionalDays.length > 0 && (
              <div className="flex justify-between items-start mb-2">
                <p className="text-jp-silver">追加日数</p>
                <div className="text-right">
                  {priceBreakdown.additionalDays.map((day) => (
                    <p key={day.date.toISOString()} className="text-white text-sm mb-1">
                      {formatDate(day.date)}: ¥{day.price.toLocaleString()}
                      <span className="text-xs ml-1 text-jp-silver">
                        （{getDayTypeLabel(day.dayType)}）
                      </span>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {selectedOptions.length > 0 && (
              <div className="flex justify-between items-center mb-2">
                <p className="text-jp-silver">オプション料金</p>
                <p className="text-white">
                  {dateRange?.from && dateRange?.to
                    ? `¥${(
                        calculateTotal().total -
                          (calculateTotal().breakdown?.total || 0) -
                          calculateTotal().timeFee
                      ).toLocaleString()}` // 時間料金を除いたオプション料金
                    : "-"}
                </p>
              </div>
            )}

            {/* 時間追加料金の表示 */}
            {calculateTotal().timeFee > 0 && (
              <div className="flex justify-between items-center mb-2">
                <p className="text-jp-silver">
                  追加時間料金（{calculateTotal().extraHours}時間分）
                </p>
                <p className="text-white">¥{calculateTotal().timeFee.toLocaleString()}</p>
              </div>
            )}

            <div className="flex justify-between items-center text-lg font-medium mt-4">
              <p className="text-white">合計</p>
              <p className="text-jp-gold">
                {dateRange?.from && dateRange?.to
                  ? `¥${calculateTotal().total.toLocaleString()}`
                  : "-"}
              </p>
            </div>
          </div>

          {/* 料金サマリー */}
          <div className="mt-6 p-4 bg-jp-black-light border border-jp-gray rounded-md">
            <h3 className="text-xl font-noto-serif-jp font-bold text-white mb-3">料金サマリー</h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-jp-silver">レンタル基本料金</span>
                <span className="text-white font-medium">
                  {calculateTotal().breakdown
                    ? `¥${(calculateTotal().total - calculateTotal().timeFee).toLocaleString()}`
                    : "日程を選択してください"}
                </span>
              </div>

              {departureTime && arrivalTime && calculateTotal().timeFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-jp-silver">時間追加料金</span>
                  <span className="text-white font-medium">
                    ¥{calculateTotal().timeFee.toLocaleString()}
                  </span>
                </div>
              )}

              {selectedOptions.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-jp-silver">オプション</span>
                  <span className="text-white font-medium">
                    ¥
                    {selectedOptions
                      .reduce((sum, id) => {
                        const option = options.find((o) => o.id === id);
                        return sum + (option?.price || 0);
                      }, 0)
                      .toLocaleString()}
                  </span>
                </div>
              )}

              <div className="border-t border-jp-gray pt-2 flex justify-between">
                <span className="text-jp-silver">合計</span>
                <span className="text-white font-medium line-through">
                  {calculateTotal().total > 0
                    ? `¥${calculateTotal().total.toLocaleString()}`
                    : "日程を選択してください"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-jp-silver flex items-center flex-col">
                  <span className="text-white bg-red-600 text-xs px-2 py-0.5 rounded mr-2">
                    キャンペーン
                  </span>
                  {`${((1 - CAMPAIGN_DISCOUNT_RATE) * 100).toFixed(0)}%OFF適用後`}
                </span>
                <span className="text-red-500 font-bold text-xl">
                  {calculateTotal().total > 0
                    ? `¥${calculateTotal().discountedTotal.toLocaleString()}`
                    : "日程を選択してください"}
                </span>
              </div>
            </div>
          </div>

          {/* 時間帯選択UI */}
          <div className="mb-4">
            <label
              htmlFor="departure-time-select"
              className="block text-sm font-medium text-jp-silver mb-2"
            >
              出発時間を選択
            </label>
            <Select
              value={departureTime}
              onValueChange={handleDepartureTimeChange}
              disabled={!dateRange?.from || !dateRange?.to} // 日付が選択されていない場合は無効
            >
              <SelectTrigger
                id="departure-time-select"
                className="w-full bg-jp-black-light border-jp-gray text-white"
              >
                <SelectValue placeholder="出発時間を選択..." />
              </SelectTrigger>
              <SelectContent className="bg-jp-black border-jp-gray text-white">
                {Array.from({ length: 10 }, (_, i) => i + 10).map((hour) => (
                  <SelectItem key={hour} value={`${hour}:00`} className="hover:bg-jp-gray">
                    {`${hour}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="my-4">
            <label
              htmlFor="arrival-time-select"
              className="block text-sm font-medium text-jp-silver mb-2"
            >
              到着時間を選択
            </label>
            <Select
              value={arrivalTime}
              onValueChange={handleArrivalTimeChange}
              disabled={!dateRange?.from || !dateRange?.to || !departureTime} // 日付と出発時間が選択されていない場合は無効
            >
              <SelectTrigger
                id="arrival-time-select"
                className="w-full bg-jp-black-light border-jp-gray text-white"
              >
                <SelectValue placeholder="到着時間を選択..." />
              </SelectTrigger>
              <SelectContent className="bg-jp-black border-jp-gray text-white">
                {Array.from({ length: 10 }, (_, i) => i + 10).map((hour) => (
                  <SelectItem key={hour} value={`${hour}:00`} className="hover:bg-jp-gray">
                    {`${hour}:00`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!dateRange?.from || !dateRange?.to ? (
              <p className="text-xs text-jp-silver mt-1">日付を選択すると時間を指定できます。</p>
            ) : !departureTime ? (
              <p className="text-xs text-jp-silver mt-1">出発時間を先に選択してください。</p>
            ) : null}
          </div>

          {departureTime && arrivalTime && (
            <div className="mb-4 p-3 bg-jp-black-light rounded-md border border-jp-gray">
              <p className="text-sm text-jp-silver">
                レンタル時間:{" "}
                <span className="text-white font-medium">
                  {calculateTotal().extraHours > 0
                    ? `24時間 + ${calculateTotal().extraHours}時間`
                    : "24時間以内"}
                </span>
              </p>
              <p className="text-xs text-jp-silver mt-1">
                {vehicle.vehicleType === "camroad"
                  ? "※追加時間は1時間あたり3,800円で、最大で1日分の料金までとなります"
                  : "※追加時間は1時間あたり6,800円で、最大で1日分の料金までとなります"}
              </p>
            </div>
          )}

          <PremiumButton
            withShimmer
            className="w-full"
            onClick={() => {
              if (!dateRange?.from || !dateRange?.to) {
                toast.error("予約エラー", {
                  description: "予約日程を選択してください。",
                });
              } else if (!departureTime) {
                toast.error("予約エラー", {
                  description: "出発時刻を選択してください。",
                });
              } else if (!arrivalTime) {
                toast.error("予約エラー", {
                  description: "到着時刻を選択してください。",
                });
              } else if (hasUnavailableDates) {
                toast.error("予約エラー", {
                  description:
                    "選択した期間内に予約できない日付があります。別の日程を選択してください。",
                });
              } else {
                // 予約モーダルを表示
                setIsReservationModalOpen(true);
              }
            }}
          >
            予約を確定する
          </PremiumButton>

          <p className="text-center text-jp-silver text-sm mt-4">
            予約確定後、お支払い情報の入力に進みます
          </p>
        </div>
      </div>
      {/* 予約フォームモーダル */}
      <ReservationFormModal
        open={isReservationModalOpen}
        onOpenChange={setIsReservationModalOpen}
        onSubmit={async (data) => {
          try {
            console.log("予約情報:", data);
            console.log("vehicle ID:", vehicle.id, "型:", typeof vehicle.id);

            // ユーザー認証情報（実際のアプリでは適切な認証方法を使用）
            const userId = "temp-user-id"; // 一時的なユーザーID（実際の実装では認証から取得）

            // 予約情報をAPIに送信
            const response = await fetch("/api/bookings", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                vehicleId: String(vehicle.id), // 文字列に変換
                userId: userId,
                startDate: dateRange?.from?.toISOString(),
                endDate: dateRange?.to?.toISOString(),
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                userName: data.name,
                userEmail: data.email,
                userPhone: data.phone,
              }),
            });

            const result = await response.json();
            console.log("予約結果:", result);
            if (!response.ok) {
              throw new Error(result.message || "予約処理中にエラーが発生しました");
            }

            // 予約成功
            setIsReservationModalOpen(false);
            toast.success("予約が完了しました", {
              description: "ご予約の詳細をメールでお送りしました。",
            });
          } catch (error) {
            console.error("予約処理中のエラー:", error);
            toast.error("予約処理中にエラーが発生しました", {
              description: "後ほど再度お試しいただくか、お電話でご連絡ください。",
            });
          }
        }}
        reservationSummary={{
          vehicleName: vehicle.name,
          startDate: dateRange?.from ? formatDate(dateRange.from) : null,
          endDate: dateRange?.to ? formatDate(dateRange.to) : null,
          days: getTotalDays(),
          totalPrice: calculateTotal().total,
          discountedPrice: calculateTotal().discountedTotal,
        }}
      />
    </div>
  );
};

export const VehicleBookingWithModals = ({
  vehicle,
}: Omit<VehicleBookingProps, "onShowImages">) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");

  const handleShowImages = (optionName: string) => {
    setSelectedOption(optionName);
    setIsModalOpen(true);
  };

  return (
    <>
      <VehicleBooking vehicle={vehicle} onShowImages={handleShowImages} />
      <OptionImageModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        optionName={selectedOption}
      />
    </>
  );
};

export default VehicleBookingWithModals;
