// 車両データモデル
export interface VehicleFeature {
  icon: string;
  name: string;
  description: string;
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
}

export interface RecommendedUse {
  idealGroupSize: string;
  recommendedTrips: string[];
  seasonalAdvice: string[];
  images: VehicleImage[];
}

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
}

// 車両データ
export const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "ランドホームグランデ",
    slug: "land-home-grande",
    description:
      "最高級の素材と快適さを追求した、プレミアムキャンピングカー。広々とした室内空間と充実した設備で、贅沢な旅をお楽しみいただけます。",
    shortDescription: "最高級の素材と快適さを追求したプレミアムモデル",
    image: "/images/IMG_8936.JPG",
    images: [
      { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデ 外観", type: "exterior" },
      { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデ キッチン", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデ ベッドルーム", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデ バスルーム", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデ リビング", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "ランドホームグランデ 運転席", type: "interior" },
    ],
    capacity: 4,
    features: ["フルキッチン", "シャワー/トイレ", "エアコン/暖房", "ソーラーパネル"],
    detailedFeatures: [
      {
        icon: "chef-hat",
        name: "フルキッチン",
        description:
          "IHクッキングヒーター、冷蔵庫、電子レンジを完備した本格的なキッチンで、旅先でも本格的な料理が楽しめます。",
      },
      {
        icon: "shower-head",
        name: "シャワー/トイレ",
        description:
          "プライベートな空間で快適に使えるシャワールームとトイレを完備。長期の旅行でも安心です。",
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
    ],
    pricePerNight: 38000,
    rating: 4.8,
    reviewCount: 24,
    specs: {
      length: "6.2m",
      width: "2.3m",
      height: "2.8m",
      engine: "2.5L ディーゼルターボ",
      fuelEfficiency: "8.5km/L",
      year: 2022,
      mileage: "15,000km",
      driveType: "2WD",
      capacity: 4,
      sleepingCapacity: 4,
    },
    equipment: {
      kitchen: [
        "IHクッキングヒーター（2口）",
        "冷蔵庫（90L）",
        "電子レンジ",
        "シンク（温水/冷水）",
        "食器セット（4人用）",
        "調理器具一式",
        "コーヒーメーカー",
      ],
      bathroom: ["シャワールーム", "カセットトイレ", "洗面台", "温水ボイラー", "タオルセット"],
      bedroom: [
        "ダブルベッド（1台）",
        "変換ソファベッド（1台）",
        "高級寝具セット",
        "収納スペース",
        "読書灯",
      ],
      climate: ["エアコン", "FFヒーター", "サーキュレーター", "断熱材強化"],
      entertainment: [
        "32インチスマートTV",
        "Bluetoothスピーカー",
        "Wi-Fiルーター（オプション）",
        "USB充電ポート（6箇所）",
      ],
      outdoor: [
        "電動サイドオーニング",
        "アウトドアテーブル＆チェア",
        "BBQグリル（オプション）",
        "アウトドアシャワー",
      ],
    },
    recommendedUse: {
      idealGroupSize: "カップルまたは小家族（2〜4名）",
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
  },
  {
    id: 2,
    name: "カムロードZiL",
    slug: "camroad-zil",
    description:
      "コンパクトながら機能性に優れた、使い勝手の良いキャンピングカー。初めての方でも運転しやすく、充実した装備で快適な旅を実現します。",
    shortDescription: "コンパクトながら機能性に優れた万能モデル",
    image: "/images/IMG_8936.JPG",
    images: [
      { src: "/images/IMG_8936.JPG", alt: "カムロードZiL 外観", type: "exterior" },
      { src: "/images/IMG_8936.JPG", alt: "カムロードZiL 内装", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "カムロードZiL キッチン", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "カムロードZiL ベッド", type: "interior" },
    ],
    capacity: 6,
    features: [
      "キングサイズベッド",
      "プレミアムサウンドシステム",
      "Bose®スピーカー",
      "広々リビングスペース",
    ],
    detailedFeatures: [
      {
        icon: "bed",
        name: "キングサイズベッド",
        description: "贅沢な広さのキングサイズベッドで、自宅と同じ寝心地を旅先でも。",
      },
      {
        icon: "music",
        name: "プレミアムサウンドシステム",
        description: "高音質サウンドシステムを搭載し、旅の楽しさを音楽で彩ります。",
      },
      {
        icon: "speaker",
        name: "Bose®スピーカー",
        description: "世界的に有名なBose®のスピーカーを採用し、臨場感あふれるサウンドを実現。",
      },
      {
        icon: "maximize",
        name: "広々リビングスペース",
        description: "効率的なレイアウトで実現した、ゆったりとくつろげるリビングスペース。",
      },
    ],
    pricePerNight: 45000,
    rating: 4.9,
    reviewCount: 32,
    specs: {
      length: "5.8m",
      width: "2.1m",
      height: "2.7m",
      engine: "3.0L ガソリン",
      fuelEfficiency: "7.5km/L",
      year: 2023,
      mileage: "8,000km",
      driveType: "2WD",
      capacity: 6,
      sleepingCapacity: 4,
    },
    equipment: {
      kitchen: [
        "ガスコンロ（2口）",
        "冷蔵庫（65L）",
        "シンク（温水/冷水）",
        "食器セット（6人用）",
        "調理器具一式",
      ],
      bathroom: ["カセットトイレ", "ポータブルシャワー", "洗面台"],
      bedroom: [
        "キングサイズベッド（1台）",
        "変換ダイネットベッド（1台）",
        "高級寝具セット",
        "収納スペース",
      ],
      climate: ["エアコン", "ヒーター", "サーキュレーター"],
      entertainment: ["Bose®サウンドシステム", "Bluetoothスピーカー", "USB充電ポート（4箇所）"],
      outdoor: [
        "サイドオーニング",
        "アウトドアテーブル＆チェア",
        "ポータブルBBQグリル（オプション）",
      ],
    },
    recommendedUse: {
      idealGroupSize: "友人グループまたは家族（4〜6名）",
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
  },
  {
    id: 3,
    name: "コースター ベガ",
    slug: "coaster-vega",
    description:
      "大人数でのグループ旅行に最適な、広々とした空間を持つキャンピングカー。快適な移動と滞在を両立し、思い出に残る旅を演出します。",
    shortDescription: "大人数でのグループ旅行に最適な広々空間",
    image: "/images/IMG_8936.JPG",
    images: [
      { src: "/images/IMG_8936.JPG", alt: "コースター ベガ 外観", type: "exterior" },
      { src: "/images/IMG_8936.JPG", alt: "コースター ベガ 内装", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "コースター ベガ キッチン", type: "interior" },
      { src: "/images/IMG_8936.JPG", alt: "コースター ベガ ベッド", type: "interior" },
    ],
    capacity: 5,
    features: ["革張りインテリア", "ガラスルーフ", "ワークステーション", "ワインセラー"],
    detailedFeatures: [
      {
        icon: "sofa",
        name: "革張りインテリア",
        description: "高級感あふれる革張りのインテリアで、上質な旅の時間を演出します。",
      },
      {
        icon: "sun",
        name: "ガラスルーフ",
        description: "開放感あふれるガラスルーフから、星空や木漏れ日を楽しめます。",
      },
      {
        icon: "laptop",
        name: "ワークステーション",
        description: "ノマドワークにも対応した、機能的なワークスペースを完備。",
      },
      {
        icon: "wine",
        name: "ワインセラー",
        description: "温度管理された専用ワインセラーで、旅先でも最高の一杯を。",
      },
    ],
    pricePerNight: 40000,
    rating: 4.7,
    reviewCount: 18,
    specs: {
      length: "7.0m",
      width: "2.4m",
      height: "3.0m",
      engine: "3.0L ディーゼルターボ",
      fuelEfficiency: "7.0km/L",
      year: 2021,
      mileage: "25,000km",
      driveType: "2WD",
      capacity: 5,
      sleepingCapacity: 5,
    },
    equipment: {
      kitchen: [
        "IHクッキングヒーター（1口）",
        "冷蔵庫（80L）",
        "ワインセラー（6本用）",
        "シンク（温水/冷水）",
        "エスプレッソマシン",
        "食器セット（5人用）",
        "調理器具一式",
      ],
      bathroom: ["シャワールーム", "カセットトイレ", "洗面台", "温水ボイラー"],
      bedroom: [
        "シングルベッド（3台）",
        "変換ダイネットベッド（1台）",
        "高級寝具セット",
        "収納スペース",
        "読書灯",
      ],
      climate: ["エアコン", "FFヒーター", "床暖房"],
      entertainment: [
        "27インチスマートTV",
        "プレミアムサウンドシステム",
        "Wi-Fiルーター（オプション）",
        "USB充電ポート（8箇所）",
      ],
      outdoor: [
        "電動サイドオーニング",
        "アウトドアテーブル＆チェア",
        "アウトドアシネマセット（オプション）",
      ],
    },
    recommendedUse: {
      idealGroupSize: "ビジネスグループまたは家族（3〜5名）",
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
  },
];

// IDで車両を取得する関数
export function getVehicleById(id: number): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.id === id);
}

// スラッグで車両を取得する関数
export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((vehicle) => vehicle.slug === slug);
}

// 全ての車両のスラッグを取得する関数
export function getAllVehicleSlugs(): string[] {
  return vehicles.map((vehicle) => vehicle.slug);
}
