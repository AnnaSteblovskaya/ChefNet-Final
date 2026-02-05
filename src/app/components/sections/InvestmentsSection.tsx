import { useState } from "react";
import { motion } from "motion/react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/locales/translations";
import IconBox from '@/app/components/IconBox';
import seedImage from "figma:asset/40643aa7ed76fac14e3c79e765216b03f0ac9e11.png";
import privateImage from "figma:asset/0d61a1ce10ee260331b43c1c7e53364896b63a8a.png";
import marketingImage from "figma:asset/5004eff8c0c4fedc4bd897279e5f3ba5c24a4b69.png";
import publicImage from "figma:asset/fc449afb9e571a6d4f5f63672924ad802fcd1693.png";
import growthIcon from "figma:asset/083753dd7f4e6a69680ef415c0f1e7edf472f77b.png";

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

  const handleCardEnter = (index: number) => {
    setFlippedCard(index);
  };

  const handleCardLeave = () => {
    setFlippedCard(null);
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
          <h2 className="text-[26px] sm:text-[48px] font-bold text-[#4A3F35] px-4">
            {t.investmentsTitle}
          </h2>
        </div>

        {/* Cards Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1a1a1a] rounded-[30px] sm:rounded-[50px] overflow-hidden shadow-lg"
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
                  className="relative h-[320px] cursor-pointer"
                  style={{ perspective: "1000px" }}
                  onMouseEnter={() => handleCardEnter(index)}
                  onMouseLeave={handleCardLeave}
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

                      {/* Text Content at Bottom */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
                        <h3 className="text-xl font-bold mb-2">
                          {stage.title}
                        </h3>
                        <p className="text-lg font-medium">
                          {stage.amount}
                        </p>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] p-4 flex flex-col justify-start items-center text-white overflow-hidden pt-8"
                      style={{
                        backfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                      }}
                    >
                      <h3 className="text-sm font-bold mb-3 text-center leading-tight min-h-[2rem] flex items-center">
                        {stage.backTitle}
                      </h3>
                      <div className="text-xs text-left w-full overflow-y-auto space-y-2">
                        {stage.backDesc.split('\n').map((line, idx) => (
                          <p key={idx} className="leading-snug">
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