"use client";

import { Button } from "@/components/ui/button";
import type { VehicleImage } from "@/lib/vehicles";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface VehicleGalleryProps {
  images: VehicleImage[];
  videoTour?: string;
}

const VehicleGallery = ({ images, videoTour }: VehicleGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [showVideo, setShowVideo] = useState(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const openFullscreen = (index: number) => {
    setFullscreenIndex(index);
  };

  const closeFullscreen = () => {
    setFullscreenIndex(null);
  };

  return (
    <div className="relative">
      {/* メインギャラリー */}
      <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-jp-black/50 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
              <p className="text-white text-sm md:text-base bg-jp-black/70 px-3 py-1 rounded-full">
                {images[currentIndex].alt}
              </p>

              <Button
                onClick={() => openFullscreen(currentIndex)}
                variant="ghost"
                size="icon"
                className="bg-jp-black/70 text-white hover:bg-jp-gold hover:text-jp-black rounded-full"
              >
                <Maximize2 className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 前へ/次へボタン */}
        <Button
          onClick={goToPrevious}
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-jp-black/70 text-white hover:bg-jp-gold hover:text-jp-black rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <Button
          onClick={goToNext}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-jp-black/70 text-white hover:bg-jp-gold hover:text-jp-black rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* サムネイル */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 md:gap-4">
        {images.map((image, index) => {
          const key = `thumbnail-${index}`;

          return (
            <div
              key={key}
              className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                currentIndex === index ? "ring-2 ring-jp-gold" : "opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                onClick={() => setCurrentIndex(index)}
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          );
        })}

        {/* 動画ツアー */}
        {/* {videoTour && (
          <div
            
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-jp-darkgray/50 flex items-center justify-center group"
            onClick={() => setShowVideo(true)}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-jp-gold/20 to-jp-black/50 group-hover:from-jp-gold/40 transition-all duration-300" />
            <Play className="w-10 h-10 text-jp-gold group-hover:scale-110 transition-transform duration-300" />
            <span className="absolute bottom-2 text-xs text-white text-center w-full">
              動画ツアー
            </span>
          </div>
        )} */}
      </div>

      {/* フルスクリーンモーダル */}
      {fullscreenIndex !== null && (
        <div className="fixed inset-0 z-50 bg-jp-black/95 flex items-center justify-center">
          <Button
            onClick={closeFullscreen}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-jp-black/70 text-white hover:bg-jp-gold hover:text-jp-black rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={images[fullscreenIndex].src}
              alt={images[fullscreenIndex].alt}
              fill
              className="object-contain"
            />
          </div>

          <Button
            onClick={() =>
              setFullscreenIndex((prev: number | null) => {
                if (prev === null) return 0;
                return prev === 0 ? images.length - 1 : prev - 1;
              })
            }
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-jp-black/70 text-white hover:bg-jp-gold hover:text-jp-black rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            onClick={() =>
              setFullscreenIndex((prev: number | null) => {
                if (prev === null) return 0;
                return prev === images.length - 1 ? 0 : prev + 1;
              })
            }
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-jp-black/70 text-white hover:bg-jp-gold hover:text-jp-black rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-jp-black/70 px-4 py-2 rounded-full text-white">
            {fullscreenIndex + 1} / {images.length}
          </div>
        </div>
      )}

      {/* ビデオモーダル */}
      {showVideo && videoTour && (
        <div className="fixed inset-0 z-50 bg-jp-black/95 flex items-center justify-center">
          <Button
            onClick={() => setShowVideo(false)}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-jp-black/70 text-white hover:bg-jp-gold hover:text-jp-black rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>

          <div className="relative w-[90vw] aspect-video">
            <iframe
              src={videoTour}
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              title="車両ビデオツアー"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleGallery;
