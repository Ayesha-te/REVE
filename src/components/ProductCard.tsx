import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      product,
      quantity: 1,
      size: product.sizes[0],
      color: product.colors[0],
    });
    
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={`/product/${product.slug}`}
        className="group block overflow-hidden rounded-lg bg-card shadow-luxury transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.isBestseller && (
              <Badge className="bg-primary text-primary-foreground">
                Bestseller
              </Badge>
            )}
            {product.isNew && (
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                New
              </Badge>
            )}
            {product.originalPrice && (
              <Badge variant="destructive">
                Save £{product.originalPrice - product.price}
              </Badge>
            )}
          </div>

          {/* Quick Add Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <Button
              onClick={handleQuickAdd}
              className="w-full gap-2 gradient-bronze"
            >
              <ShoppingBag className="h-4 w-4" />
              Quick Add
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Rating */}
          <div className="mb-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-primary text-primary'
                    : 'text-muted'
                }`}
              />
            ))}
            <span className="ml-1 text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Name */}
          <h3 className="mb-2 font-serif text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>

          {/* Description */}
          <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
            {product.shortDescription}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">
              £{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                £{product.originalPrice}
              </span>
            )}
          </div>

          {/* Available Sizes */}
          <div className="mt-3 flex flex-wrap gap-1">
            {product.sizes.slice(0, 4).map((size) => (
              <span
                key={size}
                className="rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
