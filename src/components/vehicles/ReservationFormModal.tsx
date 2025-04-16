"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// 予約フォームのバリデーションスキーマ
const reservationFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "お名前は2文字以上で入力してください" })
    .max(50, { message: "お名前は50文字以内で入力してください" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください" }),
  phone: z
    .string()
    .min(10, { message: "電話番号は10桁以上で入力してください" })
    .max(15, { message: "電話番号は15桁以内で入力してください" })
    .regex(/^[0-9-]+$/, { message: "電話番号は数字とハイフンのみで入力してください" }),
});

// スキーマの型を取得
type ReservationFormValues = z.infer<typeof reservationFormSchema>;

interface ReservationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReservationFormValues) => void;
  reservationSummary: {
    vehicleName: string;
    startDate: string | null;
    endDate: string | null;
    days: number;
    totalPrice: number;
    discountedPrice: number;
  };
}

export function ReservationFormModal({
  open,
  onOpenChange,
  onSubmit,
  reservationSummary,
}: ReservationFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const processSubmit = async (data: ReservationFormValues) => {
    try {
      await onSubmit(data);
      reset();
      toast.success("予約が完了しました", {
        description: "ご予約の詳細をメールでお送りしました。",
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast.error("予約処理中にエラーが発生しました", {
        description: "後ほど再度お試しいただくか、お電話でご連絡ください。",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-jp-darkgray/90 border-jp-gold/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-noto-serif-jp text-jp-gold">
            予約情報入力
          </DialogTitle>
          <DialogDescription className="text-jp-silver">
            予約確定のためにお客様情報をご入力ください。
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(processSubmit)} className="space-y-6">
          <div className="bg-jp-black/50 p-4 rounded-md mb-6">
            <h4 className="text-lg text-jp-gold mb-2">予約内容</h4>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-jp-silver">車両:</span> {reservationSummary.vehicleName}
              </p>
              {reservationSummary.startDate && reservationSummary.endDate && (
                <p>
                  <span className="text-jp-silver">期間:</span> {reservationSummary.startDate} 〜{" "}
                  {reservationSummary.endDate}（{reservationSummary.days}日間）
                </p>
              )}
              <p className="flex justify-between items-center pt-2 border-t border-jp-darkgray/50 mt-2">
                <span className="text-jp-silver">合計金額:</span>{" "}
                <span className="line-through">
                  ¥{reservationSummary.totalPrice.toLocaleString()}
                </span>
              </p>
              <p className="flex justify-between items-center font-bold">
                <span className="flex items-center">
                  <span className="text-white bg-red-600 text-xs px-1.5 py-0.5 rounded mr-2">
                    キャンペーン
                  </span>
                  <span className="text-jp-silver">割引後:</span>
                </span>{" "}
                <span className="text-red-500">
                  ¥{reservationSummary.discountedPrice.toLocaleString()}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                お名前
              </Label>
              <Input
                id="name"
                placeholder="例: 山田 太郎"
                {...register("name")}
                className="bg-jp-black/70 border-jp-darkgray/70 text-white"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                メールアドレス
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="例: example@email.com"
                {...register("email")}
                className="bg-jp-black/70 border-jp-darkgray/70 text-white"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                電話番号
              </Label>
              <Input
                id="phone"
                placeholder="例: 090-1234-5678"
                {...register("phone")}
                className="bg-jp-black/70 border-jp-darkgray/70 text-white"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-jp-silver text-jp-silver hover:bg-jp-darkgray/50"
            >
              キャンセル
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-jp-gold text-jp-black hover:bg-jp-gold/90"
            >
              {isSubmitting ? "処理中..." : "予約を確定する"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
