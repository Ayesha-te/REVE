import { Truck, Shield, CreditCard, Award } from 'lucide-react';

const trustFeatures = [
  {
    icon: Award,
    title: 'Handcrafted in the UK',
    description: 'Made with care & quality materials',
  },
  {
    icon: Truck,
    title: 'Fast UK Delivery',
    description: 'Next-day delivery available on most items',
  },
  {
    icon: CreditCard,
    title: 'Secure & Flexible Payments',
    description: 'Card, PayPal, bank transfer & cash on delivery',
  },
  {
    icon: Shield,
    title: '10-Year Guarantee',
    description: 'Quality you can trust',
  },
];

const TrustSection = () => {
  return (
    <section className="bg-[#F0EBE3] py-8 md:py-10">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div
          className="mb-6 text-center"
        >
          <h2 className="font-serif text-2xl font-bold text-foreground md:text-3xl">
            Our Promise to You
          </h2>
        </div>

        <div
          className="mx-auto max-w-5xl"
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trustFeatures.map((feature, index) => (
              <div
                key={index}
                className="group flex flex-col items-center text-center px-2"
              >
                <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-accent bg-card transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                  <feature.icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-primary-foreground" />
                </div>
                <h3 className="mb-1 font-serif text-sm font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-tight">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
