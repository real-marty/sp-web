export interface PricingTier {
  name: string;
  id: string;
  href: string;
  featured: boolean;
  description: string;
  price: {
    CZK: string;
    EUR: string;
  };
  mainFeatures: string[];
}
