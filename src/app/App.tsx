import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { LanguageProvider, useLanguage } from '@/contexts/LanguageContext';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/app/components/sections/HeroSection';
import AboutSection from '@/app/components/sections/AboutSection';
import UniqueFeaturesSection from '@/app/components/sections/UniqueFeaturesSection';
import OpportunitiesSection from '@/app/components/sections/OpportunitiesSection';
import PartnershipSection from '@/app/components/sections/PartnershipSection';
import InvestmentsSection from '@/app/components/sections/InvestmentsSection';
import AdvantagesSection from '@/app/components/sections/AdvantagesSection';
import RoadmapSection from '@/app/components/sections/RoadmapSection';
import ChefNetAppSection from '@/app/components/sections/ChefNetAppSection';
import FAQSection from '@/app/components/sections/FAQSection';
import CTABanner from '@/app/components/sections/CTABanner';
import Footer from '@/app/components/sections/Footer';
import Dashboard from '@/app/components/dashboard/Dashboard';
import StickyNavigation from '@/app/components/StickyNavigation';
import TeamSection from '@/app/components/sections/TeamSection';

function AppContent() {
  const { isAuthenticated, debugGetAllUsers } = useAuth();
  const { language } = useLanguage();
  const [showDashboard, setShowDashboard] = useState(false);

  // Expose debug function to console
  useEffect(() => {
    (window as any).showAllUsers = debugGetAllUsers;
    console.log('💡 Debug: To see all registered users, run: showAllUsers()');
  }, [debugGetAllUsers]);

  // Show dashboard if authenticated and user wants to see it
  if (isAuthenticated && showDashboard) {
    return <Dashboard onBackToHome={() => setShowDashboard(false)} />;
  }

  // Show main landing page
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-text)] transition-colors duration-300 overflow-x-hidden w-full max-w-full">
      <StickyNavigation onGoToDashboard={() => setShowDashboard(true)} />
      <HeroSection key={language} onGoToDashboard={() => setShowDashboard(true)} />
      <UniqueFeaturesSection />
      <OpportunitiesSection />
      <PartnershipSection />
      <InvestmentsSection />
      <AboutSection />
      <AdvantagesSection />
      <RoadmapSection />
      <ChefNetAppSection />
      <FAQSection />
      <CTABanner />
      <TeamSection />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider defaultTheme="light" storageKey="chefnet-theme">
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}