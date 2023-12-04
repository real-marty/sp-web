import NavigationWrapper from "@/components/shop/navigation/layout/navigation-wrapper";
import Footer from "@/components/shop/navigation/footer";
import MessagePage from "@/components/shop/message/user-message-page";
import Stats from "@/components/shop/statistics/stats-section";
import PricingSection from "@/components/shop/pricing/pricing-section";

import { useGlobalStatisctics } from "@/components/shop/data/stats";
import { Button } from "@/components/white-black-button";

export default async function Home() {
  const stats = useGlobalStatisctics();
  return (
    <>
      <NavigationWrapper>
        <div className="relative flex items-center justify-center flex-col mx-auto max-w-3xl h-full min-h-screen px-6 text-center lg:px-0">
          <h1 className="text-4xl pt-10 font-bold tracking-tight text-white lg:text-6xl">
            Nech si vyčistit boty!
          </h1>
          <p className="mt-4 text-xl text-white">
            Ať už máte drahé "designer shoes", sportovní obuv nebo oblíbené
            tenisky, naše služby zajistí, že vaše boty dostanou péči, kterou si
            zaslouží!
          </p>
          <Button
            invert={true}
            href={"/products"}
            aria-label={`Sezmam všech služeb`}
            className="mt-8"
          >
            Sezmam všech služeb
          </Button>
        </div>
      </NavigationWrapper>
      <PricingSection />
      <Stats
        heading="Lidé nám už jejich obuv svěřili. Svěříte ji také?"
        description="Zaručujeme, že vaše oblíbené páry obuvi od nás odejdou čisté a jako nové. Naším cílem je vždy obnovit boty do stavu, ve kterém je budete s hrdostí nosit. Spolehněte se na nás, že vaše obuv dostane tu nejlepší péči a vrátí se k vám v perfektním stavu."
        stats={stats}
      />
      <MessagePage />
      <Footer />
    </>
  );
}
