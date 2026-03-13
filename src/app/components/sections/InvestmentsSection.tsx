import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import IconBox from '@/app/components/IconBox';
import { ChevronRight } from "lucide-react";
const seedImage = "/assets/40643aa7ed76fac14e3c79e765216b03f0ac9e11.webp";
const privateImage = "/assets/0d61a1ce10ee260331b43c1c7e53364896b63a8a.webp";
const marketingImage = "/assets/5004eff8c0c4fedc4bd897279e5f3ba5c24a4b69.webp";
const publicImage = "/assets/fc449afb9e571a6d4f5f63672924ad802fcd1693.webp";
const growthIcon = "/assets/083753dd7f4e6a69680ef415c0f1e7edf472f77b.webp";

export default function InvestmentsSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  // Editable Growth Stages Data
  const growthStages = [
    {
      title: "Seed:",
      amount: "$150,000",
      image: seedImage,
      backTitle: t.seedBackTitle,
      backDesc: t.seedBackDesc,
    },
    {
      title: "Private:",
      amount: "$350,000",
      image: privateImage,
      backTitle: t.privateBackTitle,
      backDesc: t.privateBackDesc,
    },
    {
      title: "Marketing:",
      amount: "$500,000",
      image: marketingImage,
      backTitle: t.marketingBackTitle,
      backDesc: t.marketingBackDesc,
    },
    {
      title: "Public/IPO:",
      amount: "$1,000,000",
      image: publicImage,
      backTitle: t.publicBackTitle,
      backDesc: t.publicBackDesc,
    },
  ];

  const handleCardClick = (index: number) => {
    setFlippedCard(flippedCard === index ? null : index);
  };

  const getButtonText = () => {
    switch (language) {
      case 'en':
        return 'Learn More';
      case 'de':
        return 'Mehr erfahren';
      case 'es':
        return 'Más información';
      case 'fr':
        return 'En savoir plus';
      default:
        return 'Подробнее';
    }
  };

  return (
    <section
      id="investments"
      className="py-12 bg-background"
    >
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header with Icon */}
        <div className="text-center mb-10">
          <IconBox delay={0.2}>
            <img 
              src={growthIcon} 
              alt="Growth icon" 
              className="w-16 h-16 relative z-10" 
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(118%) contrast(97%)'
              }}
            />
          </IconBox>
          <h2 className="text-[26px] sm:text-[48px] font-bold text-[#4A3F35] px-4 mt-6 sm:mt-8">
            {t.investmentsTitle}
          </h2>
        </div>

        {/* Cards Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[30px] sm:rounded-[50px] overflow-hidden shadow-lg"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {growthStages.map((stage, index) => {
              const isFlipped = flippedCard === index;
              
              return (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-[280px] sm:h-[320px] cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onClick={() => handleCardClick(index)}
                >
                  <motion.div
                    className="relative w-full h-full"
                    style={{ 
                      transformStyle: "preserve-3d"
                    }}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  >
                    {/* Front Side */}
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{ backfaceVisibility: "hidden" }}
                    >
                      {/* Background Image */}
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover"
                      />

                      {/* Dark overlay for better text visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      {/* Text Content at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white text-center">
                        <h3 className="text-base sm:text-lg font-bold mb-1">
                          {stage.title}
                        </h3>
                        <p className="text-sm sm:text-base font-medium mb-3">
                          {stage.amount}
                        </p>
                        {/* Learn More Button - always visible */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(index);
                          }}
                          className="inline-flex items-center gap-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF7A59] to-[#EB5632] text-white rounded-full text-xs sm:text-sm font-bold hover:shadow-lg transition-all hover:scale-105"
                        >
                          {getButtonText()}
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FF7A59] to-[#EB5632] p-4 sm:p-6 flex flex-col justify-center items-start text-white overflow-hidden"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <h3 className="text-sm sm:text-base font-bold mb-3 sm:mb-4 text-left leading-tight w-full">
                        {stage.backTitle}
                      </h3>
                      <div className="text-xs sm:text-sm text-left w-full space-y-2 leading-relaxed">
                        {stage.backDesc.split('\n').map((line, idx) => (
                          <p key={idx} className="leading-relaxed">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}