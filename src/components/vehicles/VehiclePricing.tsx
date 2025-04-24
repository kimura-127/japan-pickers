import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import type { PricingPlan } from "@/lib/vehicles";

interface VehiclePricingProps {
  pricingPlan: PricingPlan;
}

export const VehiclePricing: React.FC<VehiclePricingProps> = ({ pricingPlan }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl md:text-2xl font-noto-serif-jp font-bold text-white mb-4">料金表</h3>
      <div className="overflow-x-auto rounded-md border border-white/30">
        <Table className="bg-black">
          <TableHeader className="bg-jp-orange">
            <TableRow className="border-white hover:bg-jp-orange/90">
              <TableHead className="border-r border-white text-white font-medium p-3" />
              <TableHead className="border-r border-white text-white font-medium p-3">
                最初の24時間
              </TableHead>
              <TableHead className="border-r border-white text-white font-medium p-3">
                1日追加
              </TableHead>
              <TableHead className="text-white font-medium p-3">1時間追加</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-white hover:bg-gray-900">
              <TableCell className="border-r border-white text-white font-medium p-3">
                平日
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                {formatPrice(pricingPlan.weekday.initialDay)}
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                {formatPrice(pricingPlan.weekday.additionalDay)}
              </TableCell>
              <TableCell className="text-white p-3">
                {formatPrice(pricingPlan.weekday.hourlyRate)}
                {pricingPlan.weekday.maxHourlyCharge && (
                  <span className="text-sm block text-white/70">
                    最大 {formatPrice(pricingPlan.weekday.maxHourlyCharge)}
                  </span>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="border-white hover:bg-gray-900">
              <TableCell className="border-r border-white text-white font-medium p-3">
                週末（金土日・祝）
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                {formatPrice(pricingPlan.weekend.initialDay)}
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                {formatPrice(pricingPlan.weekend.additionalDay)}
              </TableCell>
              <TableCell className="text-white p-3">
                {formatPrice(pricingPlan.weekend.hourlyRate)}
                {pricingPlan.weekend.maxHourlyCharge && (
                  <span className="text-sm block text-white/70">
                    最大 {formatPrice(pricingPlan.weekend.maxHourlyCharge)}
                  </span>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="border-white hover:bg-gray-900">
              <TableCell className="border-r border-white text-white font-medium p-3">
                ハイシーズン
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                {formatPrice(pricingPlan.highSeason.initialDay)}
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                {formatPrice(pricingPlan.highSeason.additionalDay)}
              </TableCell>
              <TableCell className="text-white p-3">
                {formatPrice(pricingPlan.highSeason.hourlyRate)}
                {pricingPlan.highSeason.maxHourlyCharge && (
                  <span className="text-sm block text-white/70">
                    最大 {formatPrice(pricingPlan.highSeason.maxHourlyCharge)}
                  </span>
                )}
              </TableCell>
            </TableRow>
            {pricingPlan.premiumSeason && (
              <TableRow className="border-white hover:bg-gray-900">
                <TableCell className="border-r border-white text-white font-medium p-3">
                  プレミアムシーズン
                </TableCell>
                <TableCell className="border-r border-white text-white p-3">
                  {formatPrice(pricingPlan.premiumSeason.initialDay)}
                </TableCell>
                <TableCell className="border-r border-white text-white p-3">
                  {formatPrice(pricingPlan.premiumSeason.additionalDay)}
                </TableCell>
                <TableCell className="text-white p-3">
                  {formatPrice(pricingPlan.premiumSeason.hourlyRate)}
                  {pricingPlan.premiumSeason.maxHourlyCharge && (
                    <span className="text-sm block text-white/70">
                      最大 {formatPrice(pricingPlan.premiumSeason.maxHourlyCharge)}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableCaption className="mt-4 text-white/80 pb-2">
            ※ ハイシーズン:
            夏休み(7/14～8/31)、年末年始(12/27～1/3)、春休み(3/20～4/15)、GW(4/29～5/6)
          </TableCaption>
        </Table>
      </div>
    </div>
  );
};
