"use client";

import type { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  price: string;
  priceDetail: string;
  location: string;
  vehicle: string;
  time: string;
  capacity: string;
  description: string;
  notes?: string;
}

const ServiceCard = ({
  icon: Icon,
  title,
  price,
  priceDetail,
  location,
  vehicle,
  time,
  capacity,
  description,
  notes,
}: ServiceCardProps) => {
  return (
    <div className="bg-gradient-to-br from-jp-darkgray/60 to-black/40 backdrop-blur-sm p-6 rounded-2xl border border-jp-gold/10 shadow-lg hover:shadow-xl transition-all hover:border-jp-gold/30">
      <div className="flex items-start gap-5">
        <div className="rounded-xl bg-gradient-to-br from-jp-gold/20 to-jp-gold/5 p-3 flex items-center justify-center">
          <Icon className="w-8 h-8 text-jp-gold" />
        </div>
        <div>
          <h3 className="font-semibold text-jp-gold text-xl mb-2">{title}</h3>
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-bold text-lg">{price}</span>
              <span className="text-jp-silver text-sm">{priceDetail}</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-jp-gold/30 to-transparent my-1" />
          </div>
          <p className="text-jp-silver my-4">{description}</p>
          <div className="relative mb-4">
            <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-jp-gold/30 to-transparent my-1" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-jp-gold/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-jp-gold"
                  role="img"
                  aria-hidden="true"
                >
                  <title>場所</title>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <span className="text-jp-silver text-sm">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-jp-gold/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-jp-gold"
                  role="img"
                  aria-hidden="true"
                >
                  <title>車両</title>
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.6-1.2-.9-1.9-1L9 6c-.9 0-1.7.5-2.2 1.3L5 10" />
                  <path d="M9 17h6" />
                  <path d="M17 18v2" />
                  <path d="M7 18v2" />
                  <path d="M14 10h-4" />
                  <circle cx="4" cy="15" r="2" />
                  <circle cx="20" cy="15" r="2" />
                </svg>
              </span>
              <span className="text-jp-silver text-sm">{vehicle}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-jp-gold/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-jp-gold"
                  role="img"
                  aria-hidden="true"
                >
                  <title>時間</title>
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </span>
              <span className="text-jp-silver text-sm">{time}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 flex items-center justify-center rounded-full bg-jp-gold/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-jp-gold"
                  role="img"
                  aria-hidden="true"
                >
                  <title>人数</title>
                  <path d="M18 8c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4 4 1.8 4 4z" />
                  <path d="M10 15.4C7.2 16.3 5.5 18 5.5 20A2.5 2.5 0 0 0 8 22.5h8a2.5 2.5 0 0 0 2.5-2.5c0-2-1.7-3.7-4.5-4.6" />
                </svg>
              </span>
              <span className="text-jp-silver text-sm">{capacity}</span>
            </div>
          </div>

          {notes && (
            <div className="mt-4 pt-4 border-t border-jp-gold/20">
              <p className="text-jp-silver/80 text-xs italic">{notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
