import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import BestsellersSection from '@/components/BestsellersSection';
import TrustSection from '@/components/TrustSection';
import ReviewsSection from '@/components/ReviewsSection';
import NewsletterSection from '@/components/NewsletterSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSlider />
        <CategoryGrid />
        <BestsellersSection />
        <TrustSection />
        <ReviewsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
