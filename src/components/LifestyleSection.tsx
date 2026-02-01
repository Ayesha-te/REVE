import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const lifestyleTiles = [
  {
    id: 1,
    title: 'Enhance Your Bedroom',
    subtitle: 'with Our Collection',
    description: 'Create a sanctuary of comfort and style',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&h=400&fit=crop',
    link: '/category/beds',
  },
  {
    id: 2,
    title: 'Style Your',
    subtitle: 'Living Space',
    description: 'Sofas that blend comfort with elegance',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    link: '/category/sofas',
  },
  {
    id: 3,
    title: 'Sleep Better',
    subtitle: 'Every Night',
    description: 'Premium mattresses for restful sleep',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    link: '/category/mattresses',
  },
];

const LifestyleSection = () => {
  return (
    <section className="py-14 md:py-20 bg-[#FAF8F5]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-10 text-center">
          <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary">
            Inspiration
          </span>
          <h2 className="font-serif text-4xl font-bold text-foreground md:text-5xl">
            Transform Your Home
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
            Discover how our handcrafted furniture can elevate every room in your home
          </p>
        </div>

        {/* Lifestyle Grid - Equal Compact Tiles */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {lifestyleTiles.map((tile) => (
            <div
              key={tile.id}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/3]">
                <img
                  src={tile.image}
                  alt={tile.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                <h3 className="font-serif text-xl font-bold text-cream md:text-2xl">
                  {tile.title}
                </h3>
                <p className="font-serif text-lg text-cream/90">
                  {tile.subtitle}
                </p>
                <p className="mt-1 text-sm text-cream/70">
                  {tile.description}
                </p>
                <Button
                  asChild
                  size="sm"
                  className="mt-4 gradient-bronze font-medium"
                >
                  <Link to={tile.link}>
                    Discover More
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleSection;
