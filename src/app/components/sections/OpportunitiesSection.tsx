import { motion } from 'motion/react';
import { TrendingUp, Smile, FileCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import IconBox from '@/app/components/IconBox';
const phonesImage = '';
const chefIconImage = '';
import { useState, useEffect } from 'react';

export default function OpportunitiesSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [rotatingIcons, setRotatingIcons] = useState<{ [key: number]: boolean }>({});
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const opportunities = [
    {
      icon: TrendingUp,
      title: t.chefnetAppOpportunity1Title,
      subtitle: t.chefnetAppOpportunity1Subtitle,
      description: t.chefnetAppOpportunity1Desc,
    },
    {
      icon: Smile,
      title: t.chefnetAppOpportunity2Title,
      subtitle: t.chefnetAppOpportunity2Subtitle,
      description: t.chefnetAppOpportunity2Desc,
    },
    {
      icon: FileCheck,
      title: t.chefnetAppOpportunity3Title,
      subtitle: t.chefnetAppOpportunity3Subtitle,
      description: t.chefnetAppOpportunity3Desc,
    },
  ];

  return (
    <section id="opportunities" className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Icon and Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          {/* Chef Icon */}
          <IconBox delay={0.2}>
            <img 
              src={chefIconImage} 
              alt="Chef Icon" 
              className="w-16 h-16 relative z-10 drop-shadow-lg" 
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(118%) contrast(97%)'
              }} 
            />
          </IconBox>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-text)] mt-6 sm:mt-8">
            {t.chefnetAppTitle1}
            <span className="text-[#FB7F43]">{t.chefnetAppTitle2}</span>
            {t.chefnetAppTitle3}
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start relative">
          {/* Orange Block - Background Layer - Desktop Only */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:block absolute left-0 right-0 bg-gradient-to-r from-[#D2691E] via-[#FF6B35] to-[#FF9A76] rounded-[40px] z-0"
            style={{
              height: '400px',
              top: '380px',
              bottom: 'auto'
            }}
          />

          {/* Left Side - Phones Image */}
          <motion.div
            initial={{ opacity: 0, x: isMobile ? 0 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.6, ease: "easeOut" }}
            className="relative z-20"
          >
            <img
              src={phonesImage}
              alt="ChefNet App"
              className="w-full h-auto"
              style={{ 
                imageRendering: '-webkit-optimize-contrast',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                filter: isMobile 
                  ? 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1))' 
                  : 'drop-shadow(0 40px 180px rgba(0, 0, 0, 0.05)) drop-shadow(0 20px 100px rgba(0, 0, 0, 0.04)) drop-shadow(0 10px 50px rgba(0, 0, 0, 0.03)) drop-shadow(0 5px 25px rgba(0, 0, 0, 0.02))'
              }}
            />
          </motion.div>

          {/* Right Side - Opportunities List */}
          <div className="space-y-3 lg:space-y-4 -mt-32 lg:mt-0 relative z-20">
            {opportunities.map((item, index) => (
              <motion.div
                key={item.title + item.subtitle}
                initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ 
                  delay: isMobile ? index * 0.05 : index * 0.1, 
                  duration: isMobile ? 0.3 : 0.5,
                  ease: "easeOut"
                }}
                onTouchStart={() => {
                  setActiveCard(activeCard === index ? null : index);
                }}
                className={`bg-white border-2 rounded-2xl p-4 transition-all duration-300 group ${index === 0 ? 'mt-8 lg:mt-0' : ''} ${
                  activeCard === index ? 'border-[#FF7A59]' : 'border-transparent hover:border-[#FF7A59]'
                }`}
                style={{
                  boxShadow: isMobile 
                    ? '0 10px 30px -10px rgba(0, 0, 0, 0.1)'
                    : activeCard === index 
                      ? '0 25px 80px -20px rgba(255, 140, 66, 0.18), 0 15px 50px -15px rgba(255, 107, 53, 0.12), 0 8px 30px -10px rgba(255, 107, 53, 0.08)' 
                      : '0 12px 50px -12px rgba(0, 0, 0, 0.06), 0 6px 30px -8px rgba(0, 0, 0, 0.04), 0 3px 15px -4px rgba(0, 0, 0, 0.03)'
                }}
                onMouseEnter={(e) => {
                  if (!isMobile && activeCard !== index) {
                    e.currentTarget.style.boxShadow = '0 20px 70px -18px rgba(255, 140, 66, 0.14), 0 10px 40px -12px rgba(255, 107, 53, 0.09), 0 5px 20px -6px rgba(255, 107, 53, 0.06)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile && activeCard !== index) {
                    e.currentTarget.style.boxShadow = '0 12px 50px -12px rgba(0, 0, 0, 0.06), 0 6px 30px -8px rgba(0, 0, 0, 0.04), 0 3px 15px -4px rgba(0, 0, 0, 0.03)';
                  }
                }}
              >
                <div className="flex gap-3">
                {/* Icon */}
                <motion.button
                  type="button"
                  animate={rotatingIcons[index] ? { rotate: 360 } : { rotate: 0 }}
                  transition={{ duration: 0.6 }}
                  onClick={() => {
                    console.log('Icon clicked:', index);
                    setRotatingIcons(prev => ({ ...prev, [index]: true }));
                    setTimeout(() => {
                      setRotatingIcons(prev => ({ ...prev, [index]: false }));
                    }, 600);
                  }}
                  onMouseEnter={() => {
                    setRotatingIcons(prev => ({ ...prev, [index]: true }));
                    setTimeout(() => {
                      setRotatingIcons(prev => ({ ...prev, [index]: false }));
                    }, 600);
                  }}
                  className="relative z-20 flex-shrink-0 w-12 h-12 bg-gradient-to-br from-[#FF7A59] to-[#EB5632] rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#FF6B35]/40 transition-shadow cursor-pointer"
                >
                  <item.icon className="w-6 h-6 text-white pointer-events-none" strokeWidth={2} />
                </motion.button>

                {/* Text Content */}
                <div className="flex-1">
                  <h3 className="text-base md:text-lg mb-1 group-hover:text-[#FF6B35] transition-colors">
                    <span className="font-bold text-[#FF6B35]">{item.title}</span>
                    <span className="text-[var(--color-text)] font-bold">{item.subtitle}</span>
                  </h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {index === 0 ? (
                      <>
                        <span className="font-bold text-[var(--color-text)]">
                          {t.chefnetAppOpportunity1DescPart1}
                          <span className="text-[#FF6B35]">{t.chefnetAppOpportunity1DescPart2}</span>
                        </span>
                        {t.chefnetAppOpportunity1DescPart3}
                      </>
                    ) : index === 1 ? (
                      <>
                        {t.chefnetAppOpportunity2DescPart1}
                        <span className="font-bold text-[var(--color-text)]">{t.chefnetAppOpportunity2DescPart2}</span>
                        {t.chefnetAppOpportunity2DescPart3}
                      </>
                    ) : (
                      <>
                        {t.chefnetAppOpportunity3DescPart1}
                        <span className="font-bold text-[var(--color-text)]">{t.chefnetAppOpportunity3DescPart2}</span>
                        {t.chefnetAppOpportunity3DescPart3}
                      </>
                    )}
                  </p>
                </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What We Believe In Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-6 lg:hidden bg-gradient-to-r from-[#D2691E] via-[#FF6B35] to-[#FF9A76] rounded-[40px] px-12 md:px-16 pb-8 md:pb-10 pt-4 text-white relative z-10"
        >
          {/* Title at the top center */}
          <div className="text-center mb-4">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              {t.believeTitle}
            </h2>
          </div>

          {/* Content - Full Width */}
          <div className="space-y-4">
            <h3 className="text-2xl md:text-3xl font-bold">
              {t.believeSubtitle}
            </h3>
            <p className="text-lg leading-relaxed opacity-95 whitespace-pre-line">
              {t.believeDesc1}
            </p>
            <p className="text-lg leading-relaxed opacity-95 whitespace-pre-line">
              {t.believeDesc2}
            </p>
            {t.believeDesc3 && (
              <p className="text-lg leading-relaxed opacity-95 whitespace-pre-line">
                {t.believeDesc3}
              </p>
            )}
          </div>
        </motion.div>

        {/* What We Believe In Section - Desktop Version Inside Orange Block */}
        <div className="hidden lg:block relative" style={{ marginTop: '-400px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-12 md:px-16 pb-8 md:pb-10 pt-60 text-white relative z-10"
          >
            {/* Title at the top center */}
            <div className="text-center mb-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                {t.believeTitle}
              </h2>
            </div>

            {/* Content - Full Width */}
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold">
                {t.believeSubtitle}
              </h3>
              <p className="text-lg leading-relaxed opacity-95 whitespace-pre-line">
                {t.believeDesc1}
              </p>
              <p className="text-lg leading-relaxed opacity-95 whitespace-pre-line">
                {t.believeDesc2}
              </p>
              {t.believeDesc3 && (
                <p className="text-lg leading-relaxed opacity-95 whitespace-pre-line">
                  {t.believeDesc3}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}