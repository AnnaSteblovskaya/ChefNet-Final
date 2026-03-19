import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion } from 'motion/react';
import IconBox from '@/app/components/IconBox';
import { 
  Handshake, 
  Network, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight,
  Settings,
  Brain,
  DollarSign,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { useSiteContent } from '@/contexts/SiteContentContext';
const partnerIcon = '/assets/85a04790adadc69f1d0380e9066216a493e83d6b.png';

export default function PartnershipSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const { get } = useSiteContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [lastClicked, setLastClicked] = useState<'prev' | 'next' | null>(null);
  const [isLaptop, setIsLaptop] = useState(true);
  const [rotatingIcons, setRotatingIcons] = useState<{ [key: number]: boolean }>({});
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const iconTouchStartRef = useRef<{ [key: number]: number }>({});
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Calculate visible cards and container width
  useLayoutEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      setIsLaptop(width >= 1024);
      
      if (width < 640) {
        setVisibleCards(1);
      } else if (width < 1024) {
        setVisibleCards(2);
      } else if (width < 1280) {
        setVisibleCards(3);
      } else {
        setVisibleCards(4);
      }

      if (carouselRef.current) {
        const style = getComputedStyle(carouselRef.current);
        const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
        setContainerWidth(carouselRef.current.offsetWidth - paddingX);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const cards = [
    {
      icon: Handshake,
      title: t.partner1Title,
      description: t.partner1Desc,
    },
    {
      icon: Network,
      title: t.partner2Title,
      description: t.partner2Desc,
    },
    {
      icon: TrendingUp,
      title: t.partner3Title,
      description: t.partner3Desc,
    },
    {
      icon: Settings,
      title: t.partner4Title,
      description: t.partner4Desc,
    },
    {
      icon: Brain,
      title: t.partner5Title,
      description: t.partner5Desc,
    },
    {
      icon: Network,
      title: t.partner6Title,
      description: t.partner6Desc,
    },
    {
      icon: DollarSign,
      title: t.partner7Title,
      description: t.partner7Desc,
    },
    {
      icon: FileText,
      title: t.partner8Title,
      description: t.partner8Desc,
    },
  ];

  const maxIndex = cards.length - visibleCards;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    setLastClicked('prev');
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    setLastClicked('next');
  };

  const getGapPx = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      return 16;
    }
    return 32;
  };

  const getSlideOffset = () => {
    if (!containerWidth) return 0;
    const gap = getGapPx();
    const cardWidth = (containerWidth - (visibleCards - 1) * gap) / visibleCards;
    return -(currentIndex * (cardWidth + gap));
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || touchStart === null) return;
    const currentTouch = e.touches[0].clientX;
    setTouchEnd(currentTouch);
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    setIsDragging(false);
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrev();
    }
    
    // Reset
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section id="partnership" className="py-12 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <IconBox delay={0.2}>
            <img src={partnerIcon} alt="Partner Icon" className="w-16 h-16 relative z-10 drop-shadow-lg -mt-2" />
          </IconBox>
          <h2 className="text-4xl md:text-5xl font-bold text-[#3E3E3E] mt-6 sm:mt-8">
            {get('partner_title', language, t.partnersTitle)}
          </h2>
          {get('partner_desc', language, '') && (
            <p className="mt-4 text-base sm:text-lg text-[#5A5A5A] max-w-2xl mx-auto leading-relaxed">
              {get('partner_desc', language, '')}
            </p>
          )}
          {(get('partner_stat1_value', language, '') || get('partner_stat2_value', language, '') || get('partner_stat3_value', language, '')) && (
            <div className="flex flex-wrap justify-center gap-8 mt-6">
              {[
                { key: 'partner_stat1', defaultLabel: '', defaultValue: '' },
                { key: 'partner_stat2', defaultLabel: '', defaultValue: '' },
                { key: 'partner_stat3', defaultLabel: '', defaultValue: '' },
              ].filter(s => get(`${s.key}_value`, language, '')).map((stat) => (
                <div key={stat.key} className="text-center">
                  <div className="text-2xl font-bold text-[#FF6B35]">{get(`${stat.key}_value`, language, '')}</div>
                  {get(`${stat.key}_label`, language, '') && (
                    <div className="text-sm text-[#5A5A5A] mt-1">{get(`${stat.key}_label`, language, '')}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className={`absolute left-0 sm:left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-4 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
              lastClicked === 'prev'
                ? 'opacity-100 bg-[#FF8C42] text-white'
                : 'opacity-100 bg-white/90 text-black hover:bg-[#FF8C42] hover:text-white'
            }`}
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={handleNext}
            className={`absolute right-0 sm:right-0 top-1/2 -translate-y-1/2 translate-x-1/2 sm:translate-x-4 z-20 w-8 h-8 sm:w-12 sm:h-12 rounded-full backdrop-blur-sm shadow-lg flex items-center justify-center transition-all ${
              lastClicked === 'next'
                ? 'opacity-100 bg-[#FF8C42] text-white'
                : 'opacity-100 bg-white/90 text-black hover:bg-[#FF8C42] hover:text-white'
            }`}
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Cards Container */}
          <div 
            ref={carouselRef}
            className="overflow-hidden px-4 py-2"
          >
            <motion.div
              drag="x"
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                const threshold = 50;
                if (info.offset.x > threshold) {
                  handlePrev();
                } else if (info.offset.x < -threshold) {
                  handleNext();
                }
              }}
              className="flex gap-4 sm:gap-8"
              animate={{
                x: getSlideOffset(),
              }}
              style={{
                cursor: 'grab',
                touchAction: 'pan-y',
              }}
              whileTap={{ cursor: 'grabbing' }}
              transition={{ type: 'tween', duration: 0.4, ease: 'easeOut' }}
            >
              {cards.map((card, index) => {
                const Icon = card.icon;
                const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                const gap = getGapPx();
                const cardWidthPx = containerWidth ? (containerWidth - (visibleCards - 1) * gap) / visibleCards : 0;
                return (
                  <motion.div
                    key={index}
                    initial={isMobile ? {} : { opacity: 0, y: 30 }}
                    whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={isMobile ? {} : { duration: 0.5, delay: index * 0.1 }}
                    style={{ width: cardWidthPx || undefined }}
                    className="flex-shrink-0"
                    onTouchStart={() => {
                      setActiveCard(activeCard === index ? null : index);
                    }}
                  >
                    <div className={`bg-white border-2 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center ${
                      activeCard === index ? 'border-[#FF7A59] shadow-xl' : 'border-transparent hover:border-[#FF7A59]'
                    }`}>
                      {/* Icon */}
                      <motion.div
                        animate={rotatingIcons[index] ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        onTouchStart={(e) => {
                          e.stopPropagation();
                          const touch = e.touches[0];
                          iconTouchStartRef.current[index] = touch.clientX;
                        }}
                        onTouchEnd={(e) => {
                          e.stopPropagation();
                          const touchStartX = iconTouchStartRef.current[index] || 0;
                          const touchEndX = e.changedTouches[0].clientX;
                          const distance = Math.abs(touchEndX - touchStartX);
                          
                          // Если движение меньше 10px - это тап, не свайп
                          if (distance < 10) {
                            setRotatingIcons(prev => ({ ...prev, [index]: true }));
                            setTimeout(() => {
                              setRotatingIcons(prev => ({ ...prev, [index]: false }));
                            }, 600);
                          }
                        }}
                        onMouseEnter={isLaptop ? () => {
                          setRotatingIcons(prev => ({ ...prev, [index]: true }));
                          setTimeout(() => {
                            setRotatingIcons(prev => ({ ...prev, [index]: false }));
                          }, 600);
                        } : undefined}
                        className="flex-shrink-0 bg-gradient-to-br from-[#FF7A59] to-[#EB5632] w-16 h-16 rounded-xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#FF6B35]/40 transition-shadow mb-4 cursor-pointer select-none"
                        style={{ touchAction: 'manipulation' }}
                      >
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-[#FF6B35] mb-3">
                          {card.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-[#5A5A5A] leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-[#FF8C42] w-8'
                    : 'bg-[#D2B48C]/40 hover:bg-[#D2B48C]'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}