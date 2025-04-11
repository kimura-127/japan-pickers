// 車両データモデル
export interface VehicleFeature {
  icon: string;
  name: string;
  description: string;
}

// 料金情報の定義
export interface PriceInfo {
  initialDay: number; // 最初の24時間
  additionalDay: number; // 1日追加
  hourlyRate: number; // 1時間追加
  maxHourlyCharge?: number; // 時間課金の上限（オプション）
}

// 料金プラン情報
export interface PricingPlan {
  weekday: PriceInfo; // 平日料金
  weekend: PriceInfo; // 週末料金（金土日・祝）
  highSeason: PriceInfo; // ハイシーズン料金
  premiumSeason?: PriceInfo; // プレミアムシーズン料金（オプション）
}

export interface VehicleImage {
  src: string;
  alt: string;
  type: "exterior" | "interior" | "detail" | "feature";
}

export interface VehicleSpec {
  length: string;
  width: string;
  height: string;
  engine: string;
  fuelEfficiency: string;
  year: number;
  mileage: string;
  driveType: string;
  capacity: number;
  sleepingCapacity: number;
}

export interface VehicleEquipment {
  kitchen: string[];
  bathroom: string[];
  bedroom: string[];
  climate: string[];
  entertainment: string[];
  outdoor: string[];
  safety?: string[];
  power?: string[];
}

export interface RecommendedUse {
  idealGroupSize: string;
  recommendedTrips: string[];
  seasonalAdvice: string[];
  images: VehicleImage[];
}

// 車両タイプの定義
export type VehicleType = "vega" | "landHome" | "camroad";

export interface Vehicle {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  images: VehicleImage[];
  capacity: number;
  features: string[];
  detailedFeatures: VehicleFeature[];
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  specs: VehicleSpec;
  equipment: VehicleEquipment;
  recommendedUse: RecommendedUse;
  videoTour?: string;
  floorPlan?: string;
  vehicleType: VehicleType; // 車両タイプを追加
  subText?: string;
  pricingPlan: PricingPlan; // 料金プランを追加
}

// 車両データ
export const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "ランドホームグランデ",
    slug: "land-home-grande",
    description:
      "わたしたちがご用意するのは、最高峰ラグジュアリーサロンモーターホーム、純国産フルコン・ＲＶランドフラッグシップ「ランドホームグランデ」！車両サイズは、641 x 227 x H300cm。当時ＲＶランドから３台しか生産されていない走る高級ホテルと呼ばれ、人を運ぶために設計製造されたマイクロバスがベースです。さらに運転席はレカロシート装備、助手席には専用ＡＶモニターを設置し、長距離運転も快適、乗り心地も抜群です。またキャンピングカー大好き店主がこだわりの電装システムを構築し、外部電源に頼らずとも快適キャンプをお楽しみください。",
    shortDescription: "国産最高クラスキャンピングカー｜641 x 227 x H300cm｜マイクロバスがベース",
    image: "/images/landHome/IMG_9021.JPG",
    images: [
      { src: "/images/landHome/IMG_9021.JPG", alt: "ランドホームグランデ 外観", type: "exterior" },
      {
        src: "/images/landHome/IMG_9018.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9020.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9017.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9043.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9048.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9049.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9050.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9051.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9052.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9053.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9054.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9055.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9056.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9057.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9058.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9059.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9060.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9061.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9062.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9063.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9064.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9065.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9066.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9067.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9068.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9069.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9070.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9071.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
    ],
    capacity: 8,
    subText: "国産最高クラスキャンピングカー",
    features: ["8名乗車(6名就寝)", "常設エアコン", "10,000W/H電源", "フリーWi-Fi", "レカロシート"],
    detailedFeatures: [
      {
        icon: "chef-hat",
        name: "フルキッチン",
        description:
          "90Lの大型冷蔵庫、電子レンジ、3口ガスコンロを完備。調理器具と食器も揃っていいるので、本格的な料理が楽しめます。",
      },
      {
        icon: "battery-charging",
        name: "高性能電装システム",
        description:
          "ドメティック発電機2500w、10,000w/hサブバッテリー、3,000Wインバーター、外部AC入力、エコフローパワーシステム、走行充電システムを完備し、電源を気にせず快適に過ごせます。",
      },
      {
        icon: "shower-head",
        name: "シャワー/トイレ",
        description:
          "プライベートな空間で快適に使えるシャワールームとカセットトイレを完備。トイレは大便禁止でオプション（清掃費用3,300円）となります。",
      },
      {
        icon: "thermometer",
        name: "エアコン/暖房",
        description: "オールシーズン快適に過ごせる高性能エアコンと暖房システムを搭載。",
      },
      {
        icon: "sun",
        name: "ソーラーパネル",
        description:
          "屋根に設置されたソーラーパネルで電力を自給自足。環境に優しく、電源のない場所でも安心です。",
      },
      {
        icon: "truck",
        name: "運転のしやすさ",
        description:
          "オートマ車、バックカメラ、ETCを装備し、長距離の運転も快適に。2017年3月12日以降に普通免許を取得した方は準中型免許が必要です。",
      },
    ],
    pricePerNight: 55000,
    rating: 4.8,
    reviewCount: 24,
    specs: {
      length: "641",
      width: "227",
      height: "300",
      engine: "ディーゼル 4007cc",
      fuelEfficiency: "7~8km/L",
      year: 2022,
      mileage: "50,000km",
      driveType: "2WD",
      capacity: 8,
      sleepingCapacity: 6,
    },
    equipment: {
      kitchen: [
        "冷蔵庫90L",
        "電子レンジ",
        "3口ガスコンロ",
        "電気ケトル",
        "トースター",
        "コーヒーメーカー",
        "調理器具一式",
        "食器類一式",
      ],
      bathroom: [
        "温水シャワー",
        "外部シャワー",
        "電気ラジエター温水器",
        "カセットトイレ",
        "洗面台",
      ],
      bedroom: ["ダブルベッド × 2", "展開シングルベッド", "収納スペース"],
      climate: [
        "ルーフエアコン",
        "ルーフベンチレーター×2",
        "リヤクーラー/ヒーター",
        "FFヒーター（暖房）",
      ],
      entertainment: ["AmazonfireTV", "フリーテレビシステム", "USB充電ポート", "AC100V電源"],
      outdoor: [
        "4.5mサイドオーニング",
        "アウトドアテーブル",
        "アウトドアチェア",
        "バーベキューセット(オプション)",
      ],
    },
    recommendedUse: {
      idealGroupSize:
        "最大8名（2017年3月12日以降に普通免許を取得した方は準中型免許が必要、特別会員のみペット可）",
      recommendedTrips: [
        "長期休暇での全国周遊",
        "高原・山岳リゾート",
        "海辺でのリラックスステイ",
        "温泉巡り",
      ],
      seasonalAdvice: [
        "春：桜の名所巡りに最適",
        "夏：エアコン完備で快適なバカンス",
        "秋：紅葉狩りと温泉巡り",
        "冬：暖房完備で雪景色も楽しめる",
      ],
      images: [
        { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデで行く桜旅", type: "feature" },
        {
          src: "/images/IMG_8936.JPG",
          alt: "ランドホームグランデで行く海辺の休日",
          type: "feature",
        },
      ],
    },
    videoTour: "https://example.com/videos/land-home-grande-tour.mp4",
    floorPlan: "/images/floor-plans/land-home-grande.svg",
    vehicleType: "landHome", // 車両タイプを追加
    pricingPlan: {
      weekday: {
        initialDay: 44000,
        additionalDay: 35200,
        hourlyRate: 6800,
        maxHourlyCharge: 35200,
      },
      weekend: {
        initialDay: 49500,
        additionalDay: 42075,
        hourlyRate: 6800,
        maxHourlyCharge: 42075,
      },
      highSeason: {
        initialDay: 58000,
        additionalDay: 49300,
        hourlyRate: 6800,
        maxHourlyCharge: 49300,
      },
      premiumSeason: {
        initialDay: 68000,
        additionalDay: 57800,
        hourlyRate: 6800,
        maxHourlyCharge: 57800,
      },
    },
  },
  {
    id: 2,
    name: "カムロードZiL",
    slug: "camroad-zil",
    description:
      "カムロードZiLは、効率性と機能性を兼ね備えたコンパクトなキャンピングカーです。トラックをベースにした4WDディーゼルエンジン車で、アウトドア愛好家に最適な一台。サイズは498 x 211 x H290cmで、比較的小回りが利き、標高の高いキャンプ場や未舗装の道路でも安心して運転できます。コンパクトながらも、室内には必要な設備がすべて整っており、快適な旅を楽しむことができます。",
    shortDescription: "キャブコン4WDディーゼル｜498 x 211 x H290cm｜トラックがベース",
    image: "/images/IMG_8936.JPG",
    images: [
      { src: "/images/camload/IMG_9029.JPG", alt: "カムロードZiL 外観", type: "exterior" },
      { src: "/images/camload/IMG_9026.JPG", alt: "カムロードZiL 内装", type: "interior" },
      { src: "/images/camload/IMG_9024.JPG", alt: "カムロードZiL 内装", type: "interior" },
      { src: "/images/camload/aboutcar_zil_01.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_02.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_03.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_04.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_05.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_06.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_07.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_08.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_09.jpg", alt: "カムロードZiL ベッド", type: "interior" },
      { src: "/images/camload/aboutcar_zil_10.jpg", alt: "カムロードZiL ベッド", type: "interior" },
    ],
    capacity: 10,
    subText: "キャブコン4WDディーゼル",
    features: ["10名乗車(6名就寝)", "4WD", "ペット可", "レカロシート", "家庭用エアコン"],
    detailedFeatures: [
      {
        icon: "bed",
        name: "広々としたベッドスペース",
        description:
          "6名が就寝できる広々としたスペースを確保。快適な睡眠環境で、疲れを癒し、次の冒険に備えることができます。",
      },
      {
        icon: "truck",
        name: "4WD対応",
        description:
          "4WDディーゼルエンジン車なので雪道や悪路、不整地キャンプ場や河川敷など絶対的に安心。普通免許で運転できます。",
      },
      {
        icon: "pet",
        name: "ペット同伴OK",
        description:
          "大切な家族の一員であるペットと一緒に旅行を楽しめます。ゲージに入れての乗車をお願いしています。",
      },
    ],
    pricePerNight: 19800,
    rating: 4.9,
    reviewCount: 32,
    specs: {
      length: "498",
      width: "211",
      height: "290",
      engine: "ディーゼル 3000cc",
      fuelEfficiency: "7~8km/L",
      year: 2023,
      mileage: "35,000km",
      driveType: "4WD",
      capacity: 10,
      sleepingCapacity: 6,
    },
    equipment: {
      kitchen: [
        "ガスコンロ（2口）",
        "冷蔵庫 DC50L",
        "電子レンジ",
        "シンク（温水/冷水）",
        "給水・排水タンク各19L",
        "食器セット（6人用）",
        "調理器具一式",
        "※車内でのコンロ使用は軽食程度とし、油料理は禁止",
      ],
      bathroom: ["カセットトイレ", "外部シャワー", "ポータブルトイレ"],
      bedroom: ["ダブルベッド", "ソファベッド", "展開式ベッド", "寝具一式"],
      climate: [
        "セパレートエアコン",
        "ルーフベンチレーター×2",
        "リヤクーラー/ヒーター",
        "FFヒーター（暖房）",
        "家庭用エアコン",
      ],
      entertainment: ["TV", "ステレオ", "USB充電ポート", "AC100V電源"],
      outdoor: [
        "サイドオーニング",
        "キャンプテーブル",
        "キャンプチェア",
        "12～3月頃はスタッドレスタイヤ装着",
      ],
    },
    recommendedUse: {
      idealGroupSize: "普通免許で運転可能、ペット同伴OK（最大10名）",
      recommendedTrips: [
        "週末の短期旅行",
        "フェスティバル参加",
        "アウトドアアクティビティ",
        "都市観光",
      ],
      seasonalAdvice: [
        "春：花見キャンプに最適",
        "夏：海水浴やフェスに便利",
        "秋：紅葉ドライブに最適",
        "冬：スキーリゾートへのアクセスに便利",
      ],
      images: [
        { src: "/images/IMG_8936.JPG", alt: "カムロードZiLで行くフェスティバル", type: "feature" },
        { src: "/images/IMG_8936.JPG", alt: "カムロードZiLで行く海辺のキャンプ", type: "feature" },
      ],
    },
    floorPlan: "/images/floor-plans/camroad-zil.svg",
    vehicleType: "camroad", // 車両タイプを追加
    pricingPlan: {
      weekday: {
        initialDay: 19800,
        additionalDay: 15000,
        hourlyRate: 3800,
      },
      weekend: {
        initialDay: 25000,
        additionalDay: 21250,
        hourlyRate: 3800,
      },
      highSeason: {
        initialDay: 30000,
        additionalDay: 25000,
        hourlyRate: 3800,
      },
      premiumSeason: {
        initialDay: 35000,
        additionalDay: 30000,
        hourlyRate: 3800,
      },
    },
  },
  {
    id: 3,
    name: "コースター ベガ",
    slug: "coaster-vega",
    description:
      "コースターVega630は日本最高峰キャンピングカーです。 広々とした室内空間と、キッチン、マルチルーム、リビング、ツインベッドルームを備えたモーターホームです。  日本に十台ほどしかないこのキャンピングカーは見た目の豪華さはもちろん、設備の性能、使い勝手を考慮し各所に工夫を凝らしており、照明も鮮やかに演出しています。 極上のラグジュアリーキャンピングカーコースターベガで素敵なお時間をお過ごしください。",
    shortDescription: "ハイエンドキャビン｜624 x 220 x H300cm｜コースターがベース",
    image: "/images/IMG_8936.JPG",
    images: [
      { src: "/images/vegas/IMG_9026.JPG", alt: "コースター ベガ 外観", type: "exterior" },
      { src: "/images/vegas/IMG_9028.JPG", alt: "コースター ベガ 外装", type: "interior" },
      { src: "/images/vegas/IMG_9029.JPG", alt: "コースター ベガ 外装", type: "interior" },
      { src: "/images/vegas/IMG_9031.JPG", alt: "コースター ベガ 外装", type: "interior" },
      { src: "/images/vegas/IMG_9115.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9116.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9119.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9121.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9122.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9123.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9124.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9130.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9125.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9126.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9127.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9131.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9132.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9133.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9135.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9136.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9137.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9139.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9142.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9143.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/vegas/IMG_9146.JPG", alt: "コースター ベガ 内装", type: "interior" },
    ],
    capacity: 6,
    subText: "セミフルコンフラックシップモデル",
    features: [
      "6名乗車(6名就寝)",
      "家庭用エアコン",
      "5,000W/H電源",
      "レカロシート",
      "ツインベットルーム",
    ],
    detailedFeatures: [
      {
        icon: "sofa",
        name: "ゆとりのインテリア",
        description: "高級感あふれるゆとりあるインテリアで、上質な旅の時間を演出します。",
      },
      {
        icon: "sun",
        name: "開放感のある大型ウインドウ",
        description: "開放感あふれる大型のサイドウィンドウから、星空や木漏れ日を楽しめます。",
      },
      {
        icon: "laptop",
        name: "ワークステーション",
        description: "広々したリビングで、ノマドワークにも対応した、機能的なワークスペースを完備。",
      },
      {
        icon: "wine",
        name: "ワイン・ウィスキーのボトル置き",
        description: "揺れる車内でもワインやウィスキーを楽しむための専用ボトル置きを設置。",
      },
      {
        icon: "truck",
        name: "マイクロバスベース",
        description:
          "人を運ぶために設計製造されたマイクロバスをベースに、フロント部には運転席・助手席共にレカロシート装備、フロント専用ＡＶモニターを設置し、長距離運転も快適で乗り心地は抜群です。",
      },
      {
        icon: "alert-triangle",
        name: "運転条件",
        description:
          "ベースはマイクロバスですので普通車感覚では運転できません。普段大きな車を扱われている方が運転してください。また運転経験が浅い方、運転に自身がない方、緑免許の方、26歳未満の方は運転をご遠慮ください。",
      },
    ],
    pricePerNight: 44000,
    rating: 4.7,
    reviewCount: 18,
    specs: {
      length: "624",
      width: "220",
      height: "300",
      engine: "ディーゼル 4007cc",
      fuelEfficiency: "7~8km/L",
      year: 2023,
      mileage: "28,000km",
      driveType: "2WD",
      capacity: 6,
      sleepingCapacity: 6,
    },
    equipment: {
      kitchen: [
        "ガスコンロ（2口）",
        "冷蔵庫90L",
        "電子レンジ",
        "シンク（温水/冷水）",
        "食器セット（6人用）",
        "調理器具一式",
        "※車内でのコンロ使用は軽食程度とし、油料理は禁止",
      ],
      bathroom: ["水洗トイレ", "洗面台＆ミラー", "シャワー", "温水ボイラー"],
      bedroom: ["ツインベッド or クイーンサイズベッド", "二段ベッド", "展開式ベッド", "寝具一式"],
      climate: ["家庭用エアコン", "ベンチレーター", "走行リアクーラー", "FFヒーター"],
      entertainment: ["29インチリアテレビ", "AmazonfireTV", "フリーテレビシステム", "wi-fi"],
      outdoor: ["4.5Mサイドオーニング", "アウトドアテーブル＆チェア", "外部シャワー"],
      safety: ["常時バックモニター", "バックカメラ", "ETC"],
      power: [
        "軽油ボイラー",
        "400Aリチウムサブバッテリー",
        "インバーター1500W",
        "外部AC入力",
        "走行充電システム",
      ],
    },
    recommendedUse: {
      idealGroupSize: "6名まで。2017年3月12日以降に普通免許を取得した方は、準中型免許が必要",
      recommendedTrips: [
        "ワーケーション",
        "ラグジュアリーな休暇",
        "ワイナリーツアー",
        "長期滞在型旅行",
      ],
      seasonalAdvice: [
        "春：新緑の中でのワーケーションに最適",
        "夏：避暑地での長期滞在に便利",
        "秋：ワイナリーツアーに最適なシーズン",
        "冬：温泉地での贅沢な滞在に",
      ],
      images: [
        { src: "/images/IMG_8936.JPG", alt: "コースター ベガでのワーケーション", type: "feature" },
        {
          src: "/images/IMG_8936.JPG",
          alt: "コースター ベガで行くワイナリーツアー",
          type: "feature",
        },
      ],
    },
    videoTour: "https://example.com/videos/coaster-vega-tour.mp4",
    floorPlan: "/images/floor-plans/coaster-vega.svg",
    vehicleType: "vega", // 車両タイプを追加
    pricingPlan: {
      weekday: {
        initialDay: 44000,
        additionalDay: 35200,
        hourlyRate: 6800,
        maxHourlyCharge: 35200,
      },
      weekend: {
        initialDay: 49500,
        additionalDay: 42075,
        hourlyRate: 6800,
        maxHourlyCharge: 42075,
      },
      highSeason: {
        initialDay: 58000,
        additionalDay: 49300,
        hourlyRate: 6800,
        maxHourlyCharge: 49300,
      },
      premiumSeason: {
        initialDay: 68000,
        additionalDay: 57800,
        hourlyRate: 6800,
        maxHourlyCharge: 57800,
      },
    },
  },
];

// おもしろ車両データ
export const otherVehicles: Vehicle[] = [
  {
    id: 1,
    name: "Jeep ミリタリー色",
    slug: "jeep-military",
    description:
      "わたしたちがご用意するのは、最高峰ラグジュアリーサロンモーターホーム、純国産フルコン・ＲＶランドフラッグシップ「ランドホームグランデ」！車両サイズは、641 x 227 x H300cm。当時ＲＶランドから３台しか生産されていない走る高級ホテルと呼ばれ、人を運ぶために設計製造されたマイクロバスがベースです。さらに運転席はレカロシート装備、助手席には専用ＡＶモニターを設置し、長距離運転も快適、乗り心地も抜群です。またキャンピングカー大好き店主がこだわりの電装システムを構築し、外部電源に頼らずとも快適キャンプをお楽しみください。",
    shortDescription: "国産最高クラスキャンピングカー｜641 x 227 x H300cm｜マイクロバスがベース",
    image: "/images/otherVehicle/jeep_military4.JPG",
    images: [
      {
        src: "/images/otherVehicle/jeep_military4.JPG",
        alt: "ランドホームグランデ 外観",
        type: "exterior",
      },
      {
        src: "/images/otherVehicle/jeep_military1.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_military2.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_military3.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_military5.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_military6.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_military7.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_military8.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
    ],
    capacity: 8,
    features: ["8名乗車", "6名就寝", "シャワー・トイレ完備", "FreeWi-fi", "AmazonfireTV"],
    detailedFeatures: [
      {
        icon: "chef-hat",
        name: "フルキッチン",
        description:
          "90Lの大型冷蔵庫、電子レンジ、3口ガスコンロを完備。調理器具と食器も揃っていいるので、本格的な料理が楽しめます。",
      },
      {
        icon: "battery-charging",
        name: "高性能電装システム",
        description:
          "ドメティック発電機2500w、10,000w/hサブバッテリー、3,000Wインバーター、外部AC入力、エコフローパワーシステム、走行充電システムを完備し、電源を気にせず快適に過ごせます。",
      },
      {
        icon: "shower-head",
        name: "シャワー/トイレ",
        description:
          "プライベートな空間で快適に使えるシャワールームとカセットトイレを完備。トイレは大便禁止でオプション（清掃費用3,300円）となります。",
      },
      {
        icon: "thermometer",
        name: "エアコン/暖房",
        description: "オールシーズン快適に過ごせる高性能エアコンと暖房システムを搭載。",
      },
      {
        icon: "sun",
        name: "ソーラーパネル",
        description:
          "屋根に設置されたソーラーパネルで電力を自給自足。環境に優しく、電源のない場所でも安心です。",
      },
      {
        icon: "truck",
        name: "運転のしやすさ",
        description:
          "オートマ車、バックカメラ、ETCを装備し、長距離の運転も快適に。2017年3月12日以降に普通免許を取得した方は準中型免許が必要です。",
      },
    ],
    pricePerNight: 45200,
    rating: 4.8,
    reviewCount: 24,
    specs: {
      length: "641",
      width: "227",
      height: "300",
      engine: "ディーゼル 4007cc",
      fuelEfficiency: "7~8km/L",
      year: 2022,
      mileage: "50,000km",
      driveType: "2WD",
      capacity: 8,
      sleepingCapacity: 6,
    },
    equipment: {
      kitchen: [
        "冷蔵庫90L",
        "電子レンジ",
        "3口ガスコンロ",
        "電気ケトル",
        "トースター",
        "コーヒーメーカー",
        "調理器具一式",
        "食器類一式",
      ],
      bathroom: [
        "温水シャワー",
        "外部シャワー",
        "電気ラジエター温水器",
        "カセットトイレ",
        "洗面台",
      ],
      bedroom: ["ダブルベッド × 2", "展開シングルベッド", "収納スペース"],
      climate: [
        "ルーフエアコン",
        "ルーフベンチレーター×2",
        "リヤクーラー/ヒーター",
        "FFヒーター（暖房）",
      ],
      entertainment: ["AmazonfireTV", "フリーテレビシステム", "USB充電ポート", "AC100V電源"],
      outdoor: [
        "4.5mサイドオーニング",
        "アウトドアテーブル",
        "アウトドアチェア",
        "バーベキューセット(オプション)",
      ],
    },
    recommendedUse: {
      idealGroupSize:
        "最大8名（2017年3月12日以降に普通免許を取得した方は準中型免許が必要、特別会員のみペット可）",
      recommendedTrips: [
        "長期休暇での全国周遊",
        "高原・山岳リゾート",
        "海辺でのリラックスステイ",
        "温泉巡り",
      ],
      seasonalAdvice: [
        "春：桜の名所巡りに最適",
        "夏：エアコン完備で快適なバカンス",
        "秋：紅葉狩りと温泉巡り",
        "冬：暖房完備で雪景色も楽しめる",
      ],
      images: [
        { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデで行く桜旅", type: "feature" },
        {
          src: "/images/IMG_8936.JPG",
          alt: "ランドホームグランデで行く海辺の休日",
          type: "feature",
        },
      ],
    },
    videoTour: "https://example.com/videos/land-home-grande-tour.mp4",
    floorPlan: "/images/floor-plans/land-home-grande.svg",
    vehicleType: "landHome", // 車両タイプを追加
    pricingPlan: {
      weekday: {
        initialDay: 44000,
        additionalDay: 35200,
        hourlyRate: 6800,
        maxHourlyCharge: 35200,
      },
      weekend: {
        initialDay: 49500,
        additionalDay: 42075,
        hourlyRate: 6800,
        maxHourlyCharge: 42075,
      },
      highSeason: {
        initialDay: 58000,
        additionalDay: 49300,
        hourlyRate: 6800,
        maxHourlyCharge: 49300,
      },
      premiumSeason: {
        initialDay: 68000,
        additionalDay: 57800,
        hourlyRate: 6800,
        maxHourlyCharge: 57800,
      },
    },
  },
  {
    id: 2,
    name: "Jeep カーキ色",
    slug: "jeep-khaki",
    description:
      "わたしたちがご用意するのは、最高峰ラグジュアリーサロンモーターホーム、純国産フルコン・ＲＶランドフラッグシップ「ランドホームグランデ」！車両サイズは、641 x 227 x H300cm。当時ＲＶランドから３台しか生産されていない走る高級ホテルと呼ばれ、人を運ぶために設計製造されたマイクロバスがベースです。さらに運転席はレカロシート装備、助手席には専用ＡＶモニターを設置し、長距離運転も快適、乗り心地も抜群です。またキャンピングカー大好き店主がこだわりの電装システムを構築し、外部電源に頼らずとも快適キャンプをお楽しみください。",
    shortDescription: "国産最高クラスキャンピングカー｜641 x 227 x H300cm｜マイクロバスがベース",
    image: "/images/otherVehicle/jeep_khaki1.JPG",
    images: [
      {
        src: "/images/otherVehicle/jeep_khaki1.JPG",
        alt: "ランドホームグランデ 外観",
        type: "exterior",
      },
      {
        src: "/images/otherVehicle/jeep_khaki2.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_khaki3.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_khaki4.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_khaki5.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_khaki6.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_khaki7.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/otherVehicle/jeep_khaki8.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
    ],
    capacity: 8,
    features: ["8名乗車", "6名就寝", "シャワー・トイレ完備", "FreeWi-fi", "AmazonfireTV"],
    detailedFeatures: [
      {
        icon: "chef-hat",
        name: "フルキッチン",
        description:
          "90Lの大型冷蔵庫、電子レンジ、3口ガスコンロを完備。調理器具と食器も揃っていいるので、本格的な料理が楽しめます。",
      },
      {
        icon: "battery-charging",
        name: "高性能電装システム",
        description:
          "ドメティック発電機2500w、10,000w/hサブバッテリー、3,000Wインバーター、外部AC入力、エコフローパワーシステム、走行充電システムを完備し、電源を気にせず快適に過ごせます。",
      },
      {
        icon: "shower-head",
        name: "シャワー/トイレ",
        description:
          "プライベートな空間で快適に使えるシャワールームとカセットトイレを完備。トイレは大便禁止でオプション（清掃費用3,300円）となります。",
      },
      {
        icon: "thermometer",
        name: "エアコン/暖房",
        description: "オールシーズン快適に過ごせる高性能エアコンと暖房システムを搭載。",
      },
      {
        icon: "sun",
        name: "ソーラーパネル",
        description:
          "屋根に設置されたソーラーパネルで電力を自給自足。環境に優しく、電源のない場所でも安心です。",
      },
      {
        icon: "truck",
        name: "運転のしやすさ",
        description:
          "オートマ車、バックカメラ、ETCを装備し、長距離の運転も快適に。2017年3月12日以降に普通免許を取得した方は準中型免許が必要です。",
      },
    ],
    pricePerNight: 45200,
    rating: 4.8,
    reviewCount: 24,
    specs: {
      length: "641",
      width: "227",
      height: "300",
      engine: "ディーゼル 4007cc",
      fuelEfficiency: "7~8km/L",
      year: 2022,
      mileage: "50,000km",
      driveType: "2WD",
      capacity: 8,
      sleepingCapacity: 6,
    },
    equipment: {
      kitchen: [
        "冷蔵庫90L",
        "電子レンジ",
        "3口ガスコンロ",
        "電気ケトル",
        "トースター",
        "コーヒーメーカー",
        "調理器具一式",
        "食器類一式",
      ],
      bathroom: [
        "温水シャワー",
        "外部シャワー",
        "電気ラジエター温水器",
        "カセットトイレ",
        "洗面台",
      ],
      bedroom: ["ダブルベッド × 2", "展開シングルベッド", "収納スペース"],
      climate: [
        "ルーフエアコン",
        "ルーフベンチレーター×2",
        "リヤクーラー/ヒーター",
        "FFヒーター（暖房）",
      ],
      entertainment: ["AmazonfireTV", "フリーテレビシステム", "USB充電ポート", "AC100V電源"],
      outdoor: [
        "4.5mサイドオーニング",
        "アウトドアテーブル",
        "アウトドアチェア",
        "バーベキューセット(オプション)",
      ],
    },
    recommendedUse: {
      idealGroupSize:
        "最大8名（2017年3月12日以降に普通免許を取得した方は準中型免許が必要、特別会員のみペット可）",
      recommendedTrips: [
        "長期休暇での全国周遊",
        "高原・山岳リゾート",
        "海辺でのリラックスステイ",
        "温泉巡り",
      ],
      seasonalAdvice: [
        "春：桜の名所巡りに最適",
        "夏：エアコン完備で快適なバカンス",
        "秋：紅葉狩りと温泉巡り",
        "冬：暖房完備で雪景色も楽しめる",
      ],
      images: [
        { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデで行く桜旅", type: "feature" },
        {
          src: "/images/IMG_8936.JPG",
          alt: "ランドホームグランデで行く海辺の休日",
          type: "feature",
        },
      ],
    },
    videoTour: "https://example.com/videos/land-home-grande-tour.mp4",
    floorPlan: "/images/floor-plans/land-home-grande.svg",
    vehicleType: "landHome", // 車両タイプを追加
    pricingPlan: {
      weekday: {
        initialDay: 44000,
        additionalDay: 35200,
        hourlyRate: 6800,
        maxHourlyCharge: 35200,
      },
      weekend: {
        initialDay: 49500,
        additionalDay: 42075,
        hourlyRate: 6800,
        maxHourlyCharge: 42075,
      },
      highSeason: {
        initialDay: 58000,
        additionalDay: 49300,
        hourlyRate: 6800,
        maxHourlyCharge: 49300,
      },
      premiumSeason: {
        initialDay: 68000,
        additionalDay: 57800,
        hourlyRate: 6800,
        maxHourlyCharge: 57800,
      },
    },
  },
  {
    id: 3,
    name: "ミニカー",
    slug: "mini-car",
    description:
      "わたしたちがご用意するのは、最高峰ラグジュアリーサロンモーターホーム、純国産フルコン・ＲＶランドフラッグシップ「ランドホームグランデ」！車両サイズは、641 x 227 x H300cm。当時ＲＶランドから３台しか生産されていない走る高級ホテルと呼ばれ、人を運ぶために設計製造されたマイクロバスがベースです。さらに運転席はレカロシート装備、助手席には専用ＡＶモニターを設置し、長距離運転も快適、乗り心地も抜群です。またキャンピングカー大好き店主がこだわりの電装システムを構築し、外部電源に頼らずとも快適キャンプをお楽しみください。",
    shortDescription: "国産最高クラスキャンピングカー｜641 x 227 x H300cm｜マイクロバスがベース",
    image: "/images/otherVehicle/miniCar2.JPG",
    images: [
      {
        src: "/images/otherVehicle/miniCar2.JPG",
        alt: "ランドホームグランデ 外観",
        type: "exterior",
      },
      {
        src: "/images/otherVehicle/miniCar1.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9020.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9017.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9043.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9048.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9049.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9050.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9051.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9052.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9053.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9054.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9055.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9056.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9057.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9058.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9059.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9060.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9061.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9062.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9063.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9064.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9065.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9066.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9067.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9068.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9069.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9070.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
      {
        src: "/images/landHome/IMG_9071.JPG",
        alt: "ランドホームグランデ キッチン",
        type: "interior",
      },
    ],
    capacity: 8,
    features: ["8名乗車", "6名就寝", "シャワー・トイレ完備", "FreeWi-fi", "AmazonfireTV"],
    detailedFeatures: [
      {
        icon: "chef-hat",
        name: "フルキッチン",
        description:
          "90Lの大型冷蔵庫、電子レンジ、3口ガスコンロを完備。調理器具と食器も揃っていいるので、本格的な料理が楽しめます。",
      },
      {
        icon: "battery-charging",
        name: "高性能電装システム",
        description:
          "ドメティック発電機2500w、10,000w/hサブバッテリー、3,000Wインバーター、外部AC入力、エコフローパワーシステム、走行充電システムを完備し、電源を気にせず快適に過ごせます。",
      },
      {
        icon: "shower-head",
        name: "シャワー/トイレ",
        description:
          "プライベートな空間で快適に使えるシャワールームとカセットトイレを完備。トイレは大便禁止でオプション（清掃費用3,300円）となります。",
      },
      {
        icon: "thermometer",
        name: "エアコン/暖房",
        description: "オールシーズン快適に過ごせる高性能エアコンと暖房システムを搭載。",
      },
      {
        icon: "sun",
        name: "ソーラーパネル",
        description:
          "屋根に設置されたソーラーパネルで電力を自給自足。環境に優しく、電源のない場所でも安心です。",
      },
      {
        icon: "truck",
        name: "運転のしやすさ",
        description:
          "オートマ車、バックカメラ、ETCを装備し、長距離の運転も快適に。2017年3月12日以降に普通免許を取得した方は準中型免許が必要です。",
      },
    ],
    pricePerNight: 45200,
    rating: 4.8,
    reviewCount: 24,
    specs: {
      length: "641",
      width: "227",
      height: "300",
      engine: "ディーゼル 4007cc",
      fuelEfficiency: "7~8km/L",
      year: 2022,
      mileage: "50,000km",
      driveType: "2WD",
      capacity: 8,
      sleepingCapacity: 6,
    },
    equipment: {
      kitchen: [
        "冷蔵庫90L",
        "電子レンジ",
        "3口ガスコンロ",
        "電気ケトル",
        "トースター",
        "コーヒーメーカー",
        "調理器具一式",
        "食器類一式",
      ],
      bathroom: [
        "温水シャワー",
        "外部シャワー",
        "電気ラジエター温水器",
        "カセットトイレ",
        "洗面台",
      ],
      bedroom: ["ダブルベッド × 2", "展開シングルベッド", "収納スペース"],
      climate: [
        "ルーフエアコン",
        "ルーフベンチレーター×2",
        "リヤクーラー/ヒーター",
        "FFヒーター（暖房）",
      ],
      entertainment: ["AmazonfireTV", "フリーテレビシステム", "USB充電ポート", "AC100V電源"],
      outdoor: [
        "4.5mサイドオーニング",
        "アウトドアテーブル",
        "アウトドアチェア",
        "バーベキューセット(オプション)",
      ],
    },
    recommendedUse: {
      idealGroupSize:
        "最大8名（2017年3月12日以降に普通免許を取得した方は準中型免許が必要、特別会員のみペット可）",
      recommendedTrips: [
        "長期休暇での全国周遊",
        "高原・山岳リゾート",
        "海辺でのリラックスステイ",
        "温泉巡り",
      ],
      seasonalAdvice: [
        "春：桜の名所巡りに最適",
        "夏：エアコン完備で快適なバカンス",
        "秋：紅葉狩りと温泉巡り",
        "冬：暖房完備で雪景色も楽しめる",
      ],
      images: [
        { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデで行く桜旅", type: "feature" },
        {
          src: "/images/IMG_8936.JPG",
          alt: "ランドホームグランデで行く海辺の休日",
          type: "feature",
        },
      ],
    },
    videoTour: "https://example.com/videos/land-home-grande-tour.mp4",
    floorPlan: "/images/floor-plans/land-home-grande.svg",
    vehicleType: "landHome", // 車両タイプを追加
    pricingPlan: {
      weekday: {
        initialDay: 44000,
        additionalDay: 35200,
        hourlyRate: 6800,
        maxHourlyCharge: 35200,
      },
      weekend: {
        initialDay: 49500,
        additionalDay: 42075,
        hourlyRate: 6800,
        maxHourlyCharge: 42075,
      },
      highSeason: {
        initialDay: 58000,
        additionalDay: 49300,
        hourlyRate: 6800,
        maxHourlyCharge: 49300,
      },
      premiumSeason: {
        initialDay: 68000,
        additionalDay: 57800,
        hourlyRate: 6800,
        maxHourlyCharge: 57800,
      },
    },
  },
];

// IDで車両を取得する関数
export function getVehicleById(id: number): Vehicle | undefined {
  // vehiclesとotherVehiclesの両方から検索
  return (
    vehicles.find((vehicle) => vehicle.id === id) ||
    otherVehicles.find((vehicle) => vehicle.id === id)
  );
}

// スラッグで車両を取得する関数
export function getVehicleBySlug(slug: string): Vehicle | undefined {
  // vehiclesとotherVehiclesの両方から検索
  return (
    vehicles.find((vehicle) => vehicle.slug === slug) ||
    otherVehicles.find((vehicle) => vehicle.slug === slug)
  );
}

// 全ての車両のスラッグを取得する関数
export function getAllVehicleSlugs(): string[] {
  // vehiclesとotherVehiclesの両方からスラッグを取得して結合
  return [
    ...vehicles.map((vehicle) => vehicle.slug),
    ...otherVehicles.map((vehicle) => vehicle.slug),
  ];
}
