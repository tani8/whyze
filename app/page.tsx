import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import WhySection from '@/components/WhySection';
import CompareSection from '@/components/CompareSection';
import CtaSection from '@/components/CtaSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <WhySection />
      <CompareSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
