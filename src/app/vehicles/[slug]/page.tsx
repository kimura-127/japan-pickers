import { notFound } from "next/navigation";
import { getVehicleBySlug, getAllVehicleSlugs } from "@/lib/vehicles";
import VehicleDetail from "@/components/vehicles/VehicleDetail";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next/types";

type Params = {
  slug: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "車両が見つかりません | ジャパンピッカーズ",
      description: "お探しの車両情報は見つかりませんでした。",
    };
  }

  return {
    title: `${vehicle.name} | ジャパンピッカーズ`,
    description: vehicle.description,
    openGraph: {
      title: `${vehicle.name} | ジャパンピッカーズ`,
      description: vehicle.description,
      images: [
        {
          url: vehicle.image,
          width: 1200,
          height: 630,
          alt: vehicle.name,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllVehicleSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function VehiclePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <VehicleDetail vehicle={vehicle} />
      </main>
      <Footer />
    </div>
  );
}
