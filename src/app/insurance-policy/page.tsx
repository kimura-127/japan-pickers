import React from "react";

export default function InsurancePage() {
  return (
    <div className="max-w-4xl mx-auto py-22 px-6 md:px-8 lg:px-10">
      <h1 className="text-3xl font-bold mb-8 text-jp-gold">保険・補償制度</h1>
      <div className="bg-jp-black/50 p-6 md:p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-jp-silver border-b border-jp-silver/30 pb-2">
          保険制度
        </h2>
        <p className="mb-4">当店の車両は全て任意保険に加入しております</p>
        <ul className="list-disc list-inside mb-4">
          <li>対人賠償／無制限</li>
          <li>対物賠償／無制限（免責額０円～全額実費）※1</li>
          <li>車両補償／車両時価額（免責額5.5万円～全額実費）※1</li>
          <li>搭乗者補償／１事故限度500万円</li>
        </ul>
        <p className="text-sm text-jp-silver mb-4">
          ※1 補償プランにより異なりますので下記表でご確認ください。
          <br />
          ※万が一旅先で車両トラブルが発生した場合は、当社契約保険会社のロードサービスが利用可能です（サービス内容は保険会社の規定による）
          <br />
          ※お客様のお車の保険を使用することも可能です（他社運転特約）
        </p>
      </div>

      <div className="bg-jp-black/50 p-6 md:p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-jp-silver border-b border-jp-silver/30 pb-2">
          補償プラン（任意）
        </h2>
        <p className="mb-4">
          レンタカー車両の破損損害（車両の全設備を含みます）についての賠償は、全額お客様のご負担となります。
          この制度に加入していれば車両の修理費用のうち、お客様のご負担となる金額が一定額*の「一事故負担金」に軽減されます。
          当社では、3つの補償プランをご用意しております。
          <br />
          ※キャンピングカーの修繕費は高額のため、加入をお薦めいたします。
        </p>

        <div className="overflow-x-auto mt-6 mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-jp-silver bg-jp-dark-gray text-jp-silver p-3 text-center">
                  補償プラン・免責額
                </th>
                <th className="border border-jp-silver bg-jp-dark-gray text-jp-silver p-3 text-center">
                  レンタカー車両
                  <br />
                  (税込)
                </th>
                <th className="border border-jp-silver bg-jp-dark-gray text-jp-silver p-3 text-center">
                  対物事故
                  <br />
                  (非課税)
                </th>
                <th className="border border-jp-silver bg-jp-dark-gray text-jp-silver p-3 text-center">
                  NOC
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  <p className="font-semibold mb-1">未加入</p>
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  修理費全額
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  修理費全額
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  自走可・自走不可関わらず
                  <br />
                  (最大30日分)
                </td>
              </tr>
              <tr>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  <p className="font-semibold mb-1">エコノミー</p>
                  <p>2,200円/日</p>
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  最大 110,000円
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  最大 100,000円
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  自走可(最大7日分)
                  <br />
                  自走不可(最大14日分)
                </td>
              </tr>
              <tr>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  <p className="font-semibold mb-1">スタンダード</p>
                  <p>5,500円/日</p>
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  最大 110,000円
                </td>
                <td className="border border-jp-silver bg-jp-black bg-opacity-80 text-jp-gold p-3 text-center font-bold">
                  <span className="text-3xl">0</span>円
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  自走可(最大3日分)
                  <br />
                  自走不可(最大7日分)
                </td>
              </tr>
              <tr>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  <p className="font-semibold mb-1">プレミアム</p>
                  <p>8,800円/日</p>
                </td>
                <td className="border border-jp-silver bg-jp-black text-jp-silver p-3 text-center">
                  最大 55,000円
                </td>
                <td className="border border-jp-silver bg-jp-black bg-opacity-80 text-jp-gold p-3 text-center font-bold">
                  <span className="text-3xl">0</span>円
                </td>
                <td className="border border-jp-silver bg-jp-black bg-opacity-80 text-jp-gold p-3 text-center font-bold">
                  <span className="text-3xl">0</span>円
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-jp-black/50 p-6 md:p-8 rounded-lg shadow-md mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-jp-silver border-b border-jp-silver/30 pb-2">
          ノンオペレーションチャージ（NOC）
        </h2>
        <p className="mb-4">
          NOCは事故により車が使えなくなった場合だけでなく、コーヒーこぼした場合や大きな傷をつけてしまった場合など、
          <br />
          その車をそのまま営業に使えなくなった場合に発生します。
          <br />
          万一事故・盗難・故障汚損等が発生し、車両の修理・清掃が必要となった場合は、その期間中の営業補償として以下の金額をご負担いただきます。
        </p>

        <ul className="list-disc list-inside mb-4">
          <li>自走し予定の返還場所に返還された場合：破損状況により変動（最大3～30日分）</li>
          <li>
            自走出来ず予定の返還場所に返還されなかった場合：破損状況により変動（最大7～30日分）
          </li>
        </ul>

        <p className="text-sm text-jp-silver mb-4">
          ※プレミアム補償に加入の場合は免除となります。
          <br />
          ※当該車両の予約有無に関わらず、修理入庫してレンタル出来ない場合発生します。
        </p>
      </div>
    </div>
  );
}
