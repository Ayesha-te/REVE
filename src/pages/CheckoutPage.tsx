import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, CreditCard, Wallet, Banknote, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

type CheckoutStep = 'information' | 'payment' | 'confirmation';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { state, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('information');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = totalPrice >= 500 ? 0 : 49;
  const orderTotal = totalPrice + deliveryFee;

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    phone: '',
    saveInfo: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (step === 'information') {
      // Validate form
      if (!formData.email || !formData.firstName || !formData.lastName || 
          !formData.address || !formData.city || !formData.postcode || !formData.phone) {
        toast.error('Please fill in all required fields');
        return;
      }
      setStep('payment');
    } else if (step === 'payment') {
      handlePlaceOrder();
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep('confirmation');
    clearCart();
  };

  if (state.items.length === 0 && step !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm">
          <Link to="/cart" className="text-muted-foreground hover:text-primary">
            Cart
          </Link>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className={step === 'information' ? 'text-primary' : 'text-muted-foreground'}>
            Information
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className={step === 'payment' ? 'text-primary' : 'text-muted-foreground'}>
            Payment
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          <span className={step === 'confirmation' ? 'text-primary' : 'text-muted-foreground'}>
            Confirmation
          </span>
        </nav>

        {step === 'confirmation' ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-2xl text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary">
                <Check className="h-10 w-10 text-primary-foreground" />
              </div>
            </div>
            <h1 className="mb-4 font-serif text-3xl font-bold">Thank You for Your Order!</h1>
            <p className="mb-2 text-muted-foreground">Order #RL{Date.now().toString().slice(-8)}</p>
            <p className="mb-8 text-muted-foreground">
              We've sent a confirmation email to {formData.email}
            </p>
            <div className="mb-8 rounded-lg bg-card p-6 text-left">
              <h3 className="mb-4 font-semibold">What happens next?</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• You'll receive an order confirmation email shortly</li>
                <li>• Our team will prepare your order for delivery</li>
                <li>• You'll receive tracking information via email</li>
                <li>• Estimated delivery: 3-5 working days</li>
              </ul>
            </div>
            <Button asChild size="lg" className="gradient-bronze">
              <Link to="/">Continue Shopping</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form Section */}
            <div className="lg:col-span-2">
              {step === 'information' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg bg-card p-6 shadow-luxury"
                >
                  <h2 className="mb-6 font-serif text-2xl font-semibold">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="mt-1 border-accent"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="mt-1 border-accent"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="mt-1 border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Street address"
                        className="mt-1 border-accent"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="mt-1 border-accent"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          name="postcode"
                          value={formData.postcode}
                          onChange={handleInputChange}
                          className="mt-1 border-accent"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44"
                        className="mt-1 border-accent"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="saveInfo"
                        checked={formData.saveInfo}
                        onCheckedChange={(checked) =>
                          setFormData({ ...formData, saveInfo: checked as boolean })
                        }
                      />
                      <Label htmlFor="saveInfo" className="text-sm">
                        Save this information for next time
                      </Label>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="rounded-lg bg-card p-6 shadow-luxury"
                >
                  <h2 className="mb-6 font-serif text-2xl font-semibold">Payment Method</h2>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-4">
                      <div className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                        paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex flex-1 cursor-pointer items-center gap-3">
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Credit / Debit Card</p>
                            <p className="text-sm text-muted-foreground">
                              Visa, Mastercard, American Express
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                        paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}>
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex flex-1 cursor-pointer items-center gap-3">
                          <Wallet className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-muted-foreground">
                              Pay securely with PayPal. Pay in 3 available.
                            </p>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                        paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border'
                      }`}>
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex flex-1 cursor-pointer items-center gap-3">
                          <Banknote className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              Pay when your order arrives
                            </p>
                          </div>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'card' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-6 space-y-4"
                    >
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="mt-1 border-accent"
                        />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            className="mt-1 border-accent"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            className="mt-1 border-accent"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="mt-6">
                    <Button
                      variant="ghost"
                      onClick={() => setStep('information')}
                      className="text-muted-foreground"
                    >
                      ← Back to Information
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Continue Button */}
              <div className="mt-6">
                <Button
                  size="lg"
                  onClick={handleContinue}
                  disabled={isProcessing}
                  className="w-full gradient-bronze text-lg font-semibold sm:w-auto"
                >
                  {isProcessing
                    ? 'Processing...'
                    : step === 'information'
                    ? 'Continue to Payment'
                    : `Pay £${orderTotal.toFixed(2)}`}
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 rounded-lg bg-card p-6 shadow-luxury">
                <h2 className="mb-6 font-serif text-xl font-semibold">Order Summary</h2>

                <div className="space-y-4">
                  {state.items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}-${item.color}`}
                      className="flex gap-3"
                    >
                      <div className="relative">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="h-16 w-16 rounded-md object-cover"
                        />
                        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.size} / {item.color}
                        </p>
                      </div>
                      <p className="text-sm font-medium">
                        £{(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>£{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `£${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-primary">£{orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
