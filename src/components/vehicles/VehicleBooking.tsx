"use client";

import { useState } from "react";
import {
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import type { Vehicle } from "@/lib/vehicles";
import { Calendar } from "@/components/ui/calendar";
import type { DateRange } from "react-day-picker";
import { ja } from "date-fns/locale";
import { Button } from "@/components/ui/button";

interface VehicleBookingProps {
  vehicle: Vehicle;
}

const VehicleBooking = ({ vehicle }: VehicleBookingProps) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  // 現在は使用していませんが、将来的に使用する予定の状態
  // const [adults, setAdults] = useState(2);
  // const [children, setChildren] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const options = [
    { id: "wifi", name: "Wi-Fiルーター", price: 1000, unit: "日" },
    { id: "bbq", name: "BBQグリルセット", price: 3000, unit: "泊" },
    { id: "chair", name: "アウトドアチェア", price: 500, unit: "日/脚" },
    { id: "bedding", name: "追加寝具セット", price: 2000, unit: "セット" },
    { id: "bike", name: "電動自転車", price: 2500, unit: "日/台" },
    { id: "ski", name: "スキーラック", price: 1500, unit: "セット" },
  ];

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev =>
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const getTotalDays = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    const diffTime = Math.abs(dateRange.to.getTime() - dateRange.from.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // 終了日も含める
  };

  const calculateTotal = () => {
    const days = getTotalDays();
    if (days === 0) return 0;

    let total = vehicle.pricePerNight * days;

    // オプション料金を追加
    for (const optionId of selectedOptions) {
      const option = options.find(opt => opt.id === optionId);
      if (option) {
        if (option.unit.includes("日")) {
          total += option.price * days;
        } else if (option.unit.includes("泊")) {
          total += option.price;
        } else {
          total += option.price;
        }
      }
    }

    return total;
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

      // 仮に70%の確率で予約可能とする
      if (Math.random() > 0.3) {
        availableDates.push(date);
      }
    }

    return availableDates;
  };

  const availableDates = generateAvailableDates();

  const isDateAvailable = (date: Date) => {
    return availableDates.some(availableDate =>
      availableDate.getFullYear() === date.getFullYear() &&
      availableDate.getMonth() === date.getMonth() &&
      availableDate.getDate() === date.getDate()
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

    return [
      { before: today },
      { after: threemonthsLater },
      ...disabledDates
    ];
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
    unavailable: (date: Date) => !isDateAvailable(date) && date > new Date()
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

    return (
      <div className="flex items-center justify-center">
        {day.getDate()}
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <CalendarIcon className="gold-icon w-5 h-5" />
            <h3 className="text-xl font-medium text-white">予約日を選択</h3>
          </div>

          <div className="bg-jp-darkgray/30 rounded-xl p-4 border border-jp-darkgray/50 w-fit">
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
            <div className="flex items-center justify-center">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                numberOfMonths={1}
                disabled={disabledDays()}
                locale={ja}
                showOutsideDays={false}
                modifiers={modifiers}
                components={{
                  DayContent: ({ date }) => dayContent(date)
                }}
                className="text-white"
                classNames={{
                  day_selected: "bg-jp-gold text-jp-black hover:bg-jp-gold hover:text-jp-black font-bold",
                  day_today: "border border-jp-silver text-jp-silver",
                  day_range_middle: "bg-jp-gold/30 text-white",
                  day_disabled: "text-jp-silver/30 line-through",
                  caption_label: "text-white font-medium hidden", // カスタムナビゲーションを使用するため非表示
                  nav: "hidden", // カスタムナビゲーションを使用するため非表示
                  cell: "text-jp-silver h-12", // 高さを増やして「開始日」「終了日」のラベルが入るようにする
                  day_outside: "invisible",
                  table: "w-full"
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
              <button
                key={option.id}
                type="button"
                className={`w-full text-left bg-jp-darkgray/30 rounded-xl p-4 border transition-colors ${selectedOptions.includes(option.id)
                    ? "border-jp-gold"
                    : "border-jp-darkgray/50 hover:border-jp-gold/50"
                  }`}
                onClick={() => toggleOption(option.id)}
                aria-pressed={selectedOptions.includes(option.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white">{option.name}</p>
                    <p className="text-sm text-jp-silver">¥{option.price.toLocaleString()}/{option.unit}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${selectedOptions.includes(option.id)
                      ? "bg-jp-gold text-jp-black"
                      : "border border-jp-silver text-jp-silver"
                    }`}>
                    {selectedOptions.includes(option.id) && <Check className="w-4 h-4" />}
                  </div>
                </div>
              </button>
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
                  {selectedOptions.map(optionId => {
                    const option = options.find(opt => opt.id === optionId);
                    return option ? (
                      <li key={optionId} className="text-white">
                        {option.name}
                        <span className="text-jp-silver ml-2 text-sm">
                          （¥{option.price.toLocaleString()}/{option.unit}）
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
              <p className="text-jp-silver">基本料金</p>
              <p className="text-white">
                {dateRange?.from && dateRange?.to
                  ? `¥${(vehicle.pricePerNight * getTotalDays()).toLocaleString()}`
                  : "-"
                }
              </p>
            </div>

            {selectedOptions.length > 0 && (
              <div className="flex justify-between items-center mb-2">
                <p className="text-jp-silver">オプション料金</p>
                <p className="text-white">
                  {dateRange?.from && dateRange?.to
                    ? `¥${(calculateTotal() - vehicle.pricePerNight * getTotalDays()).toLocaleString()}`
                    : "-"
                  }
                </p>
              </div>
            )}

            <div className="flex justify-between items-center text-lg font-medium mt-4">
              <p className="text-white">合計</p>
              <p className="text-jp-gold">
                {dateRange?.from && dateRange?.to
                  ? `¥${calculateTotal().toLocaleString()}`
                  : "-"
                }
              </p>
            </div>
          </div>

          <button
            type="button"
            className={`w-full py-4 rounded-full font-bold transition-colors ${dateRange?.from && dateRange?.to
                ? "bg-jp-gold text-jp-black hover:bg-jp-gold/90"
                : "bg-jp-darkgray text-jp-silver/50 cursor-not-allowed"
              }`}
            disabled={!dateRange?.from || !dateRange?.to}
          >
            予約を確定する
          </button>

          <p className="text-center text-jp-silver text-sm mt-4">
            予約確定後、お支払い情報の入力に進みます
          </p>
        </div>
      </div>
    </div>
  );
};

export default VehicleBooking;
