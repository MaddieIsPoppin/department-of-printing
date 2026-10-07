import { products } from "@/data/products";
import { HeroCampaign } from "@/features/storefront/hero-campaign";
import { FeaturedProducts } from "@/features/storefront/featured-products";
import { CustomTeaser } from "@/features/storefront/custom-teaser";
import { FinalCTA } from "@/features/storefront/final-cta";

export default function StorefrontPage() {
  return <main id="content"><HeroCampaign /><FeaturedProducts products={products.filter(product => product.featured)} /><CustomTeaser /><FinalCTA /></main>;
}
