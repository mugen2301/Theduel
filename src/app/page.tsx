import { BulkOrderCta } from "@/components/sections/bulk-order-cta";
import { DealerProgram } from "@/components/sections/dealer-program";
import { FactoryWorkflow } from "@/components/sections/factory-workflow";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductCategories } from "@/components/sections/product-categories";
import { Testimonials } from "@/components/sections/testimonials";
import { TrustMetrics } from "@/components/sections/trust-metrics";

export default function Home() {
  return (
    <main>
      <Hero />
      <ProductCategories />
      <HowItWorks />
      <FactoryWorkflow />
      <TrustMetrics />
      <Testimonials />
      <BulkOrderCta />
      <DealerProgram />
      <Footer />
    </main>
  );
}
