import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

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

const CategoryGrid = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-2 text-sm uppercase tracking-widest text-primary">
            Our Collections
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            Shop by Category
          </h2>
        </motion.div>

        {/* Category Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={itemVariants}>
              <Link
                to={`/category/${category.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-lg"
              >
                {/* Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/30 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Border Effect */}
                <div className="absolute inset-4 rounded-lg border-2 border-transparent transition-all duration-300 group-hover:border-primary" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center">
                  <h3 className="mb-2 font-serif text-2xl font-semibold text-cream transition-transform duration-300 group-hover:-translate-y-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-cream/80 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Shop Now →
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
