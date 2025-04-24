import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/utils";
import type { PricingPlan } from "@/lib/vehicles";
import { CAMPAIGN_DISCOUNT_RATE } from "@/lib/vehicles";

interface VehiclePricingProps {
  pricingPlan: PricingPlan;
}

export const VehiclePricing: React.FC<VehiclePricingProps> = ({ pricingPlan }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl md:text-2xl font-noto-serif-jp font-bold text-white mb-4">料金表</h3>

      {/* キャンペーンバナーを追加 */}
      <div className="bg-red-600 text-white p-4 rounded-t-md flex items-center justify-between mb-1">
        <div className="flex items-center">
          <span className="text-2xl font-bold mr-2">🎉</span>
          <span className="font-bold">期間限定キャンペーン</span>
        </div>
        <div className="text-xl font-bold">
          {((1 - CAMPAIGN_DISCOUNT_RATE) * 100).toFixed(0)}%OFF
        </div>
      </div>

      <div className="overflow-x-auto rounded-b-md border border-white/30">
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
                <div className="line-through text-gray-400 text-sm">
                  {formatPrice(pricingPlan.weekday.initialDay)}
                </div>
                <div className="text-red-500 font-bold">
                  {formatPrice(pricingPlan.weekday.initialDay * CAMPAIGN_DISCOUNT_RATE)}
                </div>
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                <div className="line-through text-gray-400 text-sm">
                  {formatPrice(pricingPlan.weekday.additionalDay)}
                </div>
                <div className="text-red-500 font-bold">
                  {formatPrice(pricingPlan.weekday.additionalDay * CAMPAIGN_DISCOUNT_RATE)}
                </div>
              </TableCell>
              <TableCell className="text-white p-3">
                {formatPrice(pricingPlan.weekday.hourlyRate)}
                {pricingPlan.weekday.maxHourlyCharge && (
                  <span className="text-sm block">
                    <span className="text-gray-400 line-through">
                      最大 {formatPrice(pricingPlan.weekday.maxHourlyCharge)}
                    </span>
                    <span className="text-red-500 font-bold">
                      最大{" "}
                      {formatPrice(pricingPlan.weekday.maxHourlyCharge * CAMPAIGN_DISCOUNT_RATE)}
                    </span>
                  </span>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="border-white hover:bg-gray-900">
              <TableCell className="border-r border-white text-white font-medium p-3">
                週末（金土日・祝）
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                <div className="line-through text-gray-400 text-sm">
                  {formatPrice(pricingPlan.weekend.initialDay)}
                </div>
                <div className="text-red-500 font-bold">
                  {formatPrice(pricingPlan.weekend.initialDay * CAMPAIGN_DISCOUNT_RATE)}
                </div>
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                <div className="line-through text-gray-400 text-sm">
                  {formatPrice(pricingPlan.weekend.additionalDay)}
                </div>
                <div className="text-red-500 font-bold">
                  {formatPrice(pricingPlan.weekend.additionalDay * CAMPAIGN_DISCOUNT_RATE)}
                </div>
              </TableCell>
              <TableCell className="text-white p-3">
                {formatPrice(pricingPlan.weekend.hourlyRate)}
                {pricingPlan.weekend.maxHourlyCharge && (
                  <span className="text-sm block">
                    <span className="text-gray-400 line-through">
                      最大 {formatPrice(pricingPlan.weekend.maxHourlyCharge)}
                    </span>
                    <span className="text-red-500 font-bold">
                      最大{" "}
                      {formatPrice(pricingPlan.weekend.maxHourlyCharge * CAMPAIGN_DISCOUNT_RATE)}
                    </span>
                  </span>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="border-white hover:bg-gray-900">
              <TableCell className="border-r border-white text-white font-medium p-3">
                ハイシーズン
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                <div className="line-through text-gray-400 text-sm">
                  {formatPrice(pricingPlan.highSeason.initialDay)}
                </div>
                <div className="text-red-500 font-bold">
                  {formatPrice(pricingPlan.highSeason.initialDay * CAMPAIGN_DISCOUNT_RATE)}
                </div>
              </TableCell>
              <TableCell className="border-r border-white text-white p-3">
                <div className="line-through text-gray-400 text-sm">
                  {formatPrice(pricingPlan.highSeason.additionalDay)}
                </div>
                <div className="text-red-500 font-bold">
                  {formatPrice(pricingPlan.highSeason.additionalDay * CAMPAIGN_DISCOUNT_RATE)}
                </div>
              </TableCell>
              <TableCell className="text-white p-3">
                {formatPrice(pricingPlan.highSeason.hourlyRate)}
                {pricingPlan.highSeason.maxHourlyCharge && (
                  <span className="text-sm block">
                    <span className="text-gray-400 line-through">
                      最大 {formatPrice(pricingPlan.highSeason.maxHourlyCharge)}
                    </span>
                    <span className="text-red-500 font-bold">
                      最大{" "}
                      {formatPrice(pricingPlan.highSeason.maxHourlyCharge * CAMPAIGN_DISCOUNT_RATE)}
                    </span>
                  </span>
                )}
              </TableCell>
            </TableRow>
            {/* {pricingPlan.premiumSeason && (
              <TableRow className="border-white hover:bg-gray-900">
                <TableCell className="border-r border-white text-white font-medium p-3">
                  プレミアムシーズン
                </TableCell>
                <TableCell className="border-r border-white text-white p-3">
                  {formatPrice(pricingPlan.premiumSeason.initialDay * CAMPAIGN_DISCOUNT_RATE)}
                </TableCell>
                <TableCell className="border-r border-white text-white p-3">
                  {formatPrice(pricingPlan.premiumSeason.additionalDay * CAMPAIGN_DISCOUNT_RATE)}
                </TableCell>
                <TableCell className="text-white p-3">
                  {formatPrice(pricingPlan.premiumSeason.hourlyRate)}
                  {pricingPlan.premiumSeason.maxHourlyCharge && (
                    <span className="text-sm block text-white/70">
                      最大{" "}
                      {formatPrice(
                        pricingPlan.premiumSeason.maxHourlyCharge * CAMPAIGN_DISCOUNT_RATE,
                      )}
                    </span>
                  )}
                </TableCell>
              </TableRow>
            )} */}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 text-sm text-jp-silver">
        <p>
          ※ハイシーズン：夏休み（7/14～8/31）、年末年始（12/27～1/3）、春休み（3/20～4/5）、GW（4/29～5/6）
        </p>
        <p>※プレミアムシーズン：特定の連休や特別期間（お盆、年末年始など）</p>
        <p>※表示価格はすべて税込みです</p>
      </div>
    </div>
  );
};
