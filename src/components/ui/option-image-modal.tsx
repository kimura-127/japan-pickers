"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { OptionCarousel } from "@/components/ui/option-carousel";

interface OptionImageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  optionName: string;
}

export function OptionImageModal({ open, onOpenChange, optionName }: OptionImageModalProps) {
  // ダミーデータとして全てのスライドで同じ画像を使用
  const slides = [
    {
      id: `${optionName}-image-1`,
      title: `${optionName} - イメージ1`,
      button: "詳細を見る",
      src: "/images/options/bathtub1.JPG",
    },
    {
      id: `${optionName}-image-2`,
      title: `${optionName} - イメージ2`,
      button: "詳細を見る",
      src: "/images/options/bathtub1.JPG",
    },
    {
      id: `${optionName}-image-3`,
      title: `${optionName} - イメージ3`,
      button: "詳細を見る",
      src: "/images/options/bathtub1.JPG",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90vw] w-[900px] bg-jp-darkgray/90 border-jp-darkgray/70">
        <DialogHeader>
          <DialogTitle className="text-white text-center text-xl mb-6">
            {optionName}の写真
          </DialogTitle>
        </DialogHeader>
        <div className="p-2 sm:p-4 md:p-6">
          <OptionCarousel slides={slides} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
