import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sarah Thompson',
    location: 'Manchester',
    rating: 5,
    text: "Absolutely stunning bed! The quality is exceptional and the delivery was seamless. The Chelsea Divan has transformed our bedroom. Worth every penny!",
    product: 'Chelsea Divan Bed',
    date: '2 weeks ago',
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'London',
    rating: 5,
    text: "The Windsor Ottoman is a game-changer. So much storage space and the velvet finish is luxurious. Reve Living's customer service was outstanding.",
    product: 'Windsor Ottoman Bed',
    date: '1 month ago',
  },
  {
    id: 3,
    name: 'Emma Davis',
    location: 'Birmingham',
    rating: 5,
    text: "We bought the Hampton Oak for our master bedroom. The craftsmanship is incredible - you can tell it's handmade in the UK. Highly recommend!",
    product: 'Hampton Oak Bed',
    date: '3 weeks ago',
  },
  {
    id: 4,
    name: 'Michael Brown',
    location: 'Leeds',
    rating: 5,
    text: "The Pocket Spring Deluxe mattress has completely changed my sleep. No more back pain! The quality is comparable to mattresses twice the price.",
    product: 'Pocket Spring Deluxe',
    date: '1 week ago',
  },
];

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

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
            Testimonials
          </p>
          <h2 className="font-serif text-3xl font-bold text-foreground md:text-4xl">
            What Our Customers Say
          </h2>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg bg-card p-8 shadow-luxury md:p-12"
            >
              {/* Quote Icon */}
              <Quote className="mb-6 h-12 w-12 text-primary/20" />

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < reviews[currentIndex].rating
                        ? 'fill-primary text-primary'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="mb-6 font-serif text-xl italic text-foreground md:text-2xl">
                "{reviews[currentIndex].text}"
              </p>

              {/* Reviewer Info */}
              <div className="flex flex-col items-start gap-2">
                <div>
                  <p className="font-semibold text-foreground">
                    {reviews[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {reviews[currentIndex].location} • {reviews[currentIndex].date}
                  </p>
                </div>
                <p className="text-sm font-medium text-primary">
                  Purchased: {reviews[currentIndex].product}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="absolute -left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-lg transition-all hover:bg-primary hover:text-primary-foreground md:-left-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextReview}
            className="absolute -right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card shadow-lg transition-all hover:bg-primary hover:text-primary-foreground md:-right-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-primary'
                    : 'w-2 bg-border hover:bg-accent'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
