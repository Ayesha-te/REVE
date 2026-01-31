import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './ProductCard';
import { getBestsellers } from '@/data/products';

const BestsellersSection = () => {
  const bestsellers = getBestsellers().slice(0, 4);

  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
          <div>
            <p className="mb-2 text-sm uppercase tracking-widest text-primary">
              Most Loved
            </p>
            <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
              Bestselling Beds
            </h2>
          </div>
          <Button asChild variant="outline" className="group border-accent">
            <Link to="/category/divan-beds">
              View All
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestsellers.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellersSection;
