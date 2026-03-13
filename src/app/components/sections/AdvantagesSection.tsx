import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Network, Users, ChefHat, Cpu, Lightbulb, Bot } from 'lucide-react';
import IconBox from '@/app/components/IconBox';
const chefHatIcon = '/assets/54be9ff74347f73ccd52001aa7dd668dab089a70.png';

// Import all 20 phone screen images (in order)
const screen1 = '/assets/6703e859ae4c1c1c332eda1d88857693fac709f9.png';
const screen2 = '/assets/6da7e5596b6118ee97481d7b7844693298cf8dae.png';
const screen3 = '/assets/527d5df8c4d7161277f7248cb9e4e3cd947f5a98.png';
const screen4 = '/assets/2059faaa98a3f390fa81656ff965e263b5a61898.png';
const screen5 = '/assets/1921604215d1556792b3703ead92942088abd16c.png';
const screen6 = '/assets/10e0dc2a9d32a0f276bd9f855e352cddf7883b3d.png';
const screen7 = '/assets/c059c548f65cfd397a9ee050cd10dce70c961851.png';
const screen8 = '/assets/d0091a95463244689ef2d2d41947d544bbf31f94.png';
const screen9 = '/assets/4f157aca04e4e04d86d0767469394af86312b7de.png';
const screen10 = '/assets/fae7ab5509bba96daa751252012ae0f60ff8f7a2.png';
const screen11 = '/assets/ba6e0ca809d0e38c46b92ca118a9d265697e745d.png';
const screen12 = '/assets/0fa925e56abd77b1cad1f80d18631ee4b472a97c.png';
const screen13 = '/assets/b342fe9431aceefe70b533331bda3c29c35beac1.png';
const screen14 = '/assets/997e6c5af76db948ce0df0dfcbeacff01fe674a9.png';
const screen15 = '/assets/f97c2a84643ecd740366d15f08cd366cb0e2032e.png';
const screen16 = '/assets/a69765b4636ceff80502e8e910ef2c0053b94942.png';
const screen17 = '/assets/5f2ee46ef6703704e5ecd61cbf608f47e855f091.png';
const screen18 = '/assets/dea4c79ef16fed416ef4a48040b4163c28c466d9.png';
const screen19 = '/assets/a9c2ee52a77558b91aad4a7c7c1856e1d8a604ea.png';
const screen20 = '/assets/2e50fa26a1cfd605840824e117173d05b0780545.png';

export default function AdvantagesSection() {
  const { language } = useLanguage();
  
  // All 20 phone screens - reordered so screen1 (Get Started) is in the middle
  const phoneScreens = [
    screen2, screen3, screen4, screen5, screen6, screen7, screen8, screen9, screen10,
    screen11, screen1, screen12, screen13, screen14, screen15, screen16, screen17, 
    screen18, screen19, screen20
  ];

  // INFINITE LOOP SETUP: Create buffer by duplicating screens
  // Add 5 screens from END to START (buffer zone for scrolling left)
  // Add original 20 screens in the middle
  // Add 5 screens from START to END (buffer zone for scrolling right)
  const BUFFER_SIZE = 5;
  const extendedScreens = [
    ...phoneScreens.slice(-BUFFER_SIZE), // Last 5 screens (16-20) at the beginning
    ...phoneScreens,                      // Original 20 screens (1-20)
    ...phoneScreens.slice(0, BUFFER_SIZE) // First 5 screens (1-5) at the end
  ];
  // Total: 30 screens (5 + 20 + 5)

  // Start position: middle of original screens (after buffer zone)
  // screen1 is at index 10 in phoneScreens, so with buffer it's at 10 + BUFFER_SIZE
  const defaultCenterIndex = 10 + BUFFER_SIZE; // Index 15 in extendedScreens
  
  // State for current centered index
  const [currentStep, setCurrentStep] = useState(defaultCenterIndex);
  const [isMobile, setIsMobile] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  const [isLaptop, setIsLaptop] = useState(true);
  const [rotatingIcons, setRotatingIcons] = useState<{ [key: number]: boolean }>({});
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Desktop layout constants - MUST show exactly 5 phones per view
  const PHONE_WIDTH = 250; // Fixed width for each phone card (increased from 220)
  const PHONE_GAP = 16; // Fixed gap between phones (decreased from 20)
  const DESKTOP_VIEWPORT_WIDTH = (PHONE_WIDTH * 5) + (PHONE_GAP * 4); // 1314px for exactly 5 phones

  // Detect mobile/desktop
  useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsLaptop(width >= 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // INFINITE LOOP LOGIC: Handle seamless wrap-around
  useEffect(() => {
    // Check if we're in the buffer zones and need to "jump" to equivalent position
    const originalLength = phoneScreens.length; // 20
    
    // If scrolled too far LEFT (in start buffer zone)
    if (currentStep < BUFFER_SIZE) {
      // Wait for animation to complete, then jump to equivalent position in main zone
      const timer = setTimeout(() => {
        setEnableTransition(false); // Disable animation for instant jump
        setCurrentStep(currentStep + originalLength); // Jump to equivalent position
        
        // Re-enable transition after jump
        setTimeout(() => setEnableTransition(true), 50);
      }, 300); // Wait for spring animation to finish
      
      return () => clearTimeout(timer);
    }
    
    // If scrolled too far RIGHT (in end buffer zone)
    if (currentStep >= BUFFER_SIZE + originalLength) {
      // Wait for animation to complete, then jump to equivalent position in main zone
      const timer = setTimeout(() => {
        setEnableTransition(false); // Disable animation for instant jump
        setCurrentStep(currentStep - originalLength); // Jump to equivalent position
        
        // Re-enable transition after jump
        setTimeout(() => setEnableTransition(true), 50);
      }, 300); // Wait for spring animation to finish
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, phoneScreens.length]);

  // Navigation handlers - NO BOUNDARIES for infinite loop
  const goToNext = () => {
    if (isAnimating) return; // Block if already animating
    setIsAnimating(true);
    setCurrentStep((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 500); // Unlock after 500ms
  };

  const goToPrev = () => {
    if (isAnimating) return; // Block if already animating
    setIsAnimating(true);
    setCurrentStep((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 500); // Unlock after 500ms
  };

  // Touch handlers - COPIED FROM UniqueFeaturesSection
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
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
    
    // Reset
    setDragOffset(0);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Calculate scale for each phone based on distance from center
  const getPhoneScale = (index: number) => {
    if (isMobile) {
      // Mobile: gentle scaling for smooth transitions
      const distance = Math.abs(index - currentStep);
      if (distance === 0) return 1.0;  // Center
      if (distance === 1) return 0.88; // Neighbors
      return 0.78; // Far items
    }
    // Desktop: gradual scaling
    const distance = Math.abs(index - currentStep);
    if (distance === 0) return 1.0; // Center
    if (distance === 1) return 0.88; // Neighbors
    if (distance === 2) return 0.78; // Next neighbors
    return 0.7; // Far items
  };

  // Calculate X offset to center the current phone as the 3rd visible item (index 2 of 5)
  const getCarouselOffset = () => {
    if (isMobile) {
      // Mobile: Center the current phone with smaller spacing to show 3 phones
      const phoneWidth = 240; // Smaller width to fit 3 phones
      const gap = 6; // Very small gap for compact view
      const containerWidth = window.innerWidth;
      const viewportCenter = containerWidth / 2;
      const phoneCenter = phoneWidth / 2;
      const currentPhonePosition = currentStep * (phoneWidth + gap) + phoneCenter;
      return viewportCenter - currentPhonePosition;
    } else {
      // Desktop: MUST show exactly 5 phones, center phone is at index 3 (position 2 of 5)
      const viewportCenter = DESKTOP_VIEWPORT_WIDTH / 2;
      const phoneCenter = PHONE_WIDTH / 2;
      
      // Position of current phone from the start of carousel
      const currentPhonePosition = currentStep * (PHONE_WIDTH + PHONE_GAP) + phoneCenter;
      
      // Calculate offset to center it in viewport
      return viewportCenter - currentPhonePosition;
    }
  };

  // Content for different languages
  const content = {
    ru: {
      title: 'Почему ChefNet?',
      advantagesTitlePart1: 'Почему',
      advantagesTitlePart2: 'ChefNet',
      items: [
        {
          icon: <Network className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet — экосистема нового поколения',
          description:
            'Мы соединяем пользователей и бизнес на базе AI, делая гастрономию умной и удобной.',
        },
        {
          icon: <Users className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Кулинарная социальная сеть',
          description:
            'Контент от пользователей и шефов: фото, видео, обзоры, рецепты. Прямые эфиры и мастер классы от лучших шефов.',
        },
        {
          icon: <ChefHat className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Платформа ChefNet',
          description: 'Платформа, где страсть к кулинарии соединяется с технологиями.',
        },
        {
          icon: <Cpu className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Технологии, которые работают на рестораны',
          description:
            'Умные интерфейсы увеличивают средний чек. AI сокращает затраты и улучшает прогнозирование. ChefNet помогает ресторанам зарабатывать больше без лишних усилий.',
        },
        {
          icon: <Lightbulb className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Помощь ресторанам — часть миссии ChefNet',
          description:
            'От привлечения гостей до привлечения финансирования при обновлении, модернизации или открытии нового заведения, а также маркетинговая поддержка, чтобы о заведении узнали те, кому оно понравится. ChefNet — сервис, который помогает ресторанам не просто работать, но расти и развиваться.',
        },
        {
          icon: <Bot className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Персонализация через AI-компаньона',
          description:
            'Рекомендации под ваши вкусы, настроение и обстоятельства. Мгновенное бронирование и готовый маршрут. Динамиеские меню, голосовые сценарии и адаптивные рекомендации — всё, чтобы выбор был действительно лёгким.',
        },
      ],
    },
    en: {
      title: 'Why ChefNet?',
      advantagesTitlePart1: 'Why',
      advantagesTitlePart2: 'ChefNet',
      items: [
        {
          icon: <Network className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet is a next-generation ecosystem',
          description:
            'We connect users and businesses through AI, making gastronomy smart and convenient.',
        },
        {
          icon: <Users className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Culinary social network',
          description:
            'Content from users and chefs: photos, videos, reviews, and recipes. Live streams and masterclasses from the world\'s top chefs.',
        },
        {
          icon: <ChefHat className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet platform',
          description: 'A platform where passion for food meets technology.',
        },
        {
          icon: <Cpu className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Technology that works for restaurants',
          description:
            'Smart interfaces increase average check. AI reduces costs and improves forecasting. ChefNet helps restaurants earn more effortlessly.',
        },
        {
          icon: <Lightbulb className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Helping restaurants is part of ChefNet\'s mission',
          description:
            'From attracting customers to financing for renovation, modernization, or new openings, plus marketing support to ensure the right people find your place. ChefNet is a service that not only supports but helps your business grow and thrive.',
        },
        {
          icon: <Bot className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Personalization through your AI companion',
          description:
            'Recommendations based on your tastes, mood, and context. Instant booking and a ready route. Dynamic menus, voice scenarios, and adaptive suggestions—everything to make your choice truly easy.',
        },
      ],
    },
    es: {
      title: '¿Por qué ChefNet?',
      advantagesTitlePart1: '¿Por qué',
      advantagesTitlePart2: 'ChefNet',
      items: [
        {
          icon: <Network className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet — un ecosistema de nueva generación',
          description:
            'Conectamos a usuarios y empresas mediante inteligencia artificial, haciendo que la gastronomía sea inteligente y fluida.',
        },
        {
          icon: <Users className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Una red social gastronómica',
          description:
            'Contenido de usuarios y chefs: fotos, vídeos, reseñas y recetas. Transmisiones en directo y clases magistrales de los mejores chefs del mundo.',
        },
        {
          icon: <ChefHat className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Plataforma ChefNet',
          description: 'Una plataforma donde la pasión por la gastronomía se encuentra con la tecnología.',
        },
        {
          icon: <Cpu className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Tecnología que trabaja para los restaurantes',
          description:
            'Las interfaces inteligentes aumentan el ticket promedio. La IA reduce costos y mejora la precisión de las previsiones. ChefNet ayuda a los restaurantes a ganar más — sin esfuerzo.',
        },
        {
          icon: <Lightbulb className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Apoyar a los restaurantes está en el corazón de la misión de ChefNet',
          description:
            'Desde atraer comensales hasta conseguir financiación para renovaciones, mejoras o nuevos lanzamientos, y brindar apoyo de marketing para que las personas adecuadas descubran tu establecimiento. ChefNet es el servicio que ayuda a los restaurantes no solo a funcionar, sino a crecer y prosperar.',
        },
        {
          icon: <Bot className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Personalización con tu compañero de IA',
          description:
            'Recomendaciones precisas según tu gusto, estado de ánimo y contexto. Reserva instantánea y ruta lista para ir. Menús dinámicos, escenarios por voz y sugerencias adaptativas: todo ello hace que tu elección sea verdaderamente sencilla.',
        },
      ],
    },
    tr: {
      title: 'Neden ChefNet?',
      advantagesTitlePart1: 'Neden',
      advantagesTitlePart2: 'ChefNet',
      items: [
        {
          icon: <Network className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet — yeni nesil bir ekosistem',
          description:
            'Yapay zekâ aracılığıyla kullanıcıları ve işletmeleri birleştiriyor, mutfak kültürüne akıllılık ve kesintisizlik katıyoruz.',
        },
        {
          icon: <Users className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Bir Mutfak Sosyal Ağı',
          description:
            'Kullanıcılardan ve şeflerden içerik: fotoğraf, video, yorumlar ve tarifler. Dünyanın önde gelen şeflerinden canlı yayınlar ve mutfak dersleri.',
        },
        {
          icon: <ChefHat className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet Platformu',
          description: 'Mutfak kültürüne olan tutkunun teknolojiyle buluştuğu bir platform.',
        },
        {
          icon: <Cpu className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Restoranlar için çalışan teknoloji',
          description:
            'Akıllı arayüzler ortalama müşteri harcamasını artırır. Yapay zek maliyetleri düşürür ve tahminleri iyileştirir. ChefNet, restoranların kazanmasına – çabayla değil – yardımcı olur.',
        },
        {
          icon: <Lightbulb className="w-7 h-7 text-white" strokeWidth={2} />,
          title: "Restoranlara destek vermek, ChefNet'in misyonunun merkezindedir",
          description:
            'Misafir çekmekten, yenileme, modernizasyon veya yeni açılışlar için finansman sağlamaya, ayrıca pazarlama desteği sunarak doğru insanların işletmenizi bulmasını sağlamaya kadar. ChefNet, restoranların sadece çalışmasına değil, büyümesine ve gelişmesine yardımcı olan bir hizmettir.',
        },
        {
          icon: <Bot className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Yapay zekâ arkadaşınızla kişiselleştirme',
          description:
            'Damak zevkinize, ruh halinize ve durumunuza göre kesin öneriler. Anında rezervasyon ve hazır rota. Dinamik menüler, sesli senaryolar ve uyarlanabilir öneriler — hepsi seçiminizi gerçekten kolay hale getirir.',
        },
      ],
    },
    de: {
      title: 'Warum ChefNet?',
      advantagesTitlePart1: 'Warum',
      advantagesTitlePart2: 'ChefNet',
      items: [
        {
          icon: <Network className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet ist ein Ökosystem der nächsten Generation',
          description:
            'Wir verbinden Nutzer und Unternehmen durch KI und machen Gastronomie smart und bequem.',
        },
        {
          icon: <Users className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Kulinarisches soziales Netzwerk',
          description:
            'Inhalte von Nutzern und Köchen: Fotos, Videos, Rezensionen und Rezepte. Live-Streams und Meisterkurse von den besten Köchen der Welt.',
        },
        {
          icon: <ChefHat className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'ChefNet-Plattform',
          description: 'Eine Plattform, auf der Leidenschaft für Kulinarik auf Technologie trifft.',
        },
        {
          icon: <Cpu className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Technologie, die für Restaurants arbeitet',
          description:
            'Intelligente Interfaces erhöhen den durchschnittlichen Umsatz pro Gast. KI senkt Kosten und verbessert die Prognosegenauigkeit. ChefNet hilft Restaurants, mehr zu verdienen – mühelos.',
        },
        {
          icon: <Lightbulb className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Die Unterstützung von Restaurants steht im Herzen der ChefNet-Mission',
          description:
            'Von der Gästegewinnung über die Beschaffung von Finanzmitteln für Renovierungen, Modernisierungen oder Neueröffnungen bis hin zur Marketingunterstützung, damit die richtigen Gäste Ihr Lokal entdecken. ChefNet ist der Service, der Restaurants nicht nur beim Betrieb hilft, sondern dabei, zu wachsen und erfolgreich zu sein.',
        },
        {
          icon: <Bot className="w-7 h-7 text-white" strokeWidth={2} />,
          title: 'Personalisierung durch Ihren KI-Begleiter',
          description:
            'Exakte Empfehlungen basierend auf Ihrem Geschmack, Ihrer Stimmung und dem Kontext. Sofortige Buchung und eine fertige Route. Dynamische Menüs, sprachbasierte Szenarien und adaptive Vorschläge – all das macht Ihre Entscheidung wirklich unkompliziert.',
        },
      ],
    },
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <section id="advantages" className="py-12 bg-background" style={{ paddingLeft: isMobile ? '0' : '80px', paddingRight: isMobile ? '0' : '80px' }}>
      <div className="flex flex-col" style={{ gap: isMobile ? '4px' : '8px' }}>
        {/* TitleBlock */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center relative"
          style={{ gap: '12px' }}
        >
          {/* Chef Hat Icon - Using IconBox for desktop, custom for mobile */}
          {isLaptop ? (
            <IconBox delay={0.2}>
              <img 
                src={chefHatIcon} 
                alt="Chef Hat Icon" 
                className="w-16 h-16 relative z-10 drop-shadow-lg" 
                style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(98%) contrast(97%)' }}
              />
            </IconBox>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px", amount: 0.3 }}
              transition={{ 
                duration: 0.5,
                delay: 0.2,
                ease: [0.34, 1.56, 0.64, 1]
              }}
              className="flex justify-center"
              style={{ willChange: 'opacity, transform' }}
            >
              <motion.div 
                whileTap={{ scale: 0.9 }}
                transition={{ 
                  type: "spring",
                  stiffness: 400,
                  damping: 17
                }}
                className="w-24 h-24 bg-gradient-to-br from-[#FF7A59] to-[#EB5632] rounded-3xl flex items-center justify-center shadow-xl shadow-[#FF6B35]/30 relative overflow-hidden group cursor-pointer select-none"
                style={{ willChange: 'transform', touchAction: 'manipulation' }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {/* White circle behind icon for better visibility */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/90 rounded-full" />
                </div>
                <img 
                  src={chefHatIcon} 
                  alt="Chef Hat Icon" 
                  className="w-16 h-16 relative z-10 drop-shadow-lg" 
                  style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(98%) contrast(97%)' }}
                />
              </motion.div>
            </motion.div>
          )}

          {/* Headline */}
          <h2 className="text-[48px] font-bold text-[#292524] text-center mt-6 sm:mt-8">
            {currentContent.advantagesTitlePart1} <span className="text-[#FF6B35]">{currentContent.advantagesTitlePart2}</span>?
          </h2>
          
          {/* Gradient fade to hide icon shadow below - creates seamless transition */}
          <div 
            className="absolute left-0 right-0 h-32 pointer-events-none"
            style={{
              top: '100%',
              background: 'linear-gradient(to bottom, rgb(245, 234, 225) 0%, rgba(245, 234, 225, 0.9) 20%, rgba(245, 234, 225, 0) 100%)',
              zIndex: 5
            }}
          />
        </motion.div>

        {/* CarouselViewport */}
        <div className="relative" style={{ marginTop: isMobile ? '20px' : '0' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="CarouselViewport relative mx-auto"
            style={{
              maxWidth: isMobile ? '100%' : `${DESKTOP_VIEWPORT_WIDTH}px`,
              width: '100%',
              height: isMobile ? '550px' : '680px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Carousel Track - all phones in a row */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.08}
              onDragEnd={(_, info) => {
                const threshold = 40;
                if (info.offset.x < -threshold) {
                  goToNext();
                } else if (info.offset.x > threshold) {
                  goToPrev();
                }
              }}
              animate={{
                x: getCarouselOffset(),
                y: '-50%',
              }}
              style={{
                display: 'flex',
                gap: isMobile ? '6px' : `${PHONE_GAP}px`,
                position: 'absolute',
                left: 0,
                top: '50%',
                cursor: 'grab',
                touchAction: 'pan-y',
                willChange: 'transform',
              }}
              whileTap={{ cursor: 'grabbing' }}
              transition={enableTransition ? { 
                type: 'tween',
                duration: 0.45,
                ease: [0.25, 0.46, 0.45, 0.94]
              } : { duration: 0 }}
            >
              {extendedScreens.map((screen, index) => {
                const scale = getPhoneScale(index);
                const isCenter = index === currentStep;
                
                // Check if this screen is screen1 (the intro screen) - for mobile only
                const isIntroScreen = isMobile && screen === screen1;
                
                return (
                  <motion.div
                    key={index}
                    onClick={() => {
                      if (!isMobile) {
                        if (index > currentStep) goToNext();
                        else if (index < currentStep) goToPrev();
                      }
                    }}
                    animate={{
                      scale,
                      opacity: 1,
                    }}
                    transition={enableTransition ? {
                      type: 'tween',
                      duration: 0.45,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    } : { duration: 0 }}
                    style={{
                      width: isMobile ? '240px' : `${PHONE_WIDTH}px`,
                      flexShrink: 0,
                      cursor: !isMobile && !isCenter ? 'pointer' : 'default',
                      willChange: 'transform',
                    }}
                    className="relative"
                  >
                    {/* Glow effect for center phone */}
                    {isCenter && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 rounded-[36px] blur-2xl opacity-40 -z-10"
                        style={{
                          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 50%, #FFA15C 100%)',
                          transform: 'scale(1.05)',
                        }}
                      />
                    )}

                    {/* Phone Frame - Modern design with better styling */}
                    <div 
                      className={isMobile ? 'relative rounded-[36px] overflow-hidden' : 'relative bg-gradient-to-br from-white to-gray-50 rounded-[36px] shadow-2xl overflow-hidden'}
                      style={{
                        height: isMobile ? '440px' : '560px',
                        transition: 'all 0.3s ease',
                        boxShadow: isMobile ? 'none' : (isCenter 
                          ? '0 25px 60px -12px rgba(255, 107, 53, 0.35), 0 8px 16px -8px rgba(255, 107, 53, 0.2)' 
                          : '0 20px 40px -12px rgba(0, 0, 0, 0.15)'),
                      }}
                    >
                      {/* Phone Screen Image or Custom Component */}
                      <div className="w-full h-full">
                        <img
                          src={screen}
                          alt={`Phone Screen ${index + 1}`}
                          className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover'}`}
                        />
                      </div>

                      {/* Shine effect on center phone */}
                      {isCenter && (
                        <motion.div
                          initial={{ x: '-100%' }}
                          animate={{ x: '200%' }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                          style={{ width: '50%' }}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Navigation Buttons - visible on all devices */}
          <>
            <button
              onClick={goToPrev}
              className={`absolute ${isMobile ? 'left-2' : 'left-4'} top-1/2 -translate-y-1/2 z-20 ${isMobile ? 'w-10 h-10' : 'w-14 h-14'} bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all group`}
              aria-label="Previous"
            >
              <ChevronLeft className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-[#FF6B35] group-hover:text-white transition-colors`} />
            </button>
            <button
              onClick={goToNext}
              className={`absolute ${isMobile ? 'right-2' : 'right-4'} top-1/2 -translate-y-1/2 z-20 ${isMobile ? 'w-10 h-10' : 'w-14 h-14'} bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-[#FF6B35] hover:text-white transition-all group`}
              aria-label="Next"
            >
              <ChevronRight className={`${isMobile ? 'w-5 h-5' : 'w-7 h-7'} text-[#FF6B35] group-hover:text-white transition-colors`} />
            </button>
          </>

          {/* Mobile Swipe Indicator */}
          {isMobile && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
              {Array.from({ length: Math.min(5, phoneScreens.length) }).map((_, i) => {
                // Calculate which dot should be active based on currentStep
                const normalizedStep = ((currentStep - BUFFER_SIZE) % phoneScreens.length + phoneScreens.length) % phoneScreens.length;
                const isActive = i === (normalizedStep % 5);
                return (
                  <motion.div
                    key={i}
                    animate={{
                      width: isActive ? 32 : 8,
                      backgroundColor: isActive ? '#FF6B35' : 'rgba(255, 255, 255, 0.5)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    className="h-2 rounded-full"
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0" style={{ marginTop: '-6px' }}>
          {currentContent.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 border-2 border-transparent hover:border-[#FF7A59] hover:shadow-[0_8px_30px_rgb(255,122,89,0.3)] hover:scale-[1.02] transition-all duration-300 group"
            >
              <motion.div 
                className="w-14 h-14 bg-gradient-to-br from-[#FF7A59] to-[#EB5632] rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:shadow-lg group-hover:shadow-[#FF6B35]/40 cursor-pointer mx-auto select-none transition-shadow"
                animate={rotatingIcons[index] ? { rotate: 360 } : { rotate: 0 }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                onMouseEnter={isLaptop ? () => {
                  setRotatingIcons(prev => ({ ...prev, [index]: true }));
                  setTimeout(() => {
                    setRotatingIcons(prev => ({ ...prev, [index]: false }));
                  }, 500);
                } : undefined}
                onClick={!isLaptop ? (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  setRotatingIcons(prev => ({ ...prev, [index]: true }));
                  setTimeout(() => {
                    setRotatingIcons(prev => ({ ...prev, [index]: false }));
                  }, 500);
                } : undefined}
                style={{ willChange: 'transform', touchAction: 'manipulation' }}
              >
                {item.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-[rgb(255,107,53)] mb-3 text-center">{item.title}</h3>
              <p className="text-[#57534E] leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}