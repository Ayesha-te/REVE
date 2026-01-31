import { motion } from 'framer-motion';
import { Truck, Shield, CreditCard, Award } from 'lucide-react';

const trustFeatures = [
  {
    icon: Award,
    title: 'UK Handcrafted',
    description: 'Every bed made with pride in Britain',
  },
  {
    icon: Truck,
    title: 'Free UK Delivery',
    description: 'Free delivery on orders over £500',
  },
  {
    icon: CreditCard,
    title: 'Payment Flexibility',
    description: 'PayPal, Cards & Cash on Delivery',
  },
  {
    icon: Shield,
    title: '10-Year Guarantee',
    description: 'Quality assured for a decade',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const TrustSection = () => {
  return (
    <section className="border-y border-border py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group flex flex-col items-center text-center"
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent bg-card transition-all duration-300 group-hover:border-primary group-hover:bg-primary">
                <feature.icon className="h-8 w-8 text-accent transition-colors duration-300 group-hover:text-primary-foreground" />
              </div>
              <h3 className="mb-2 font-serif text-lg font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
