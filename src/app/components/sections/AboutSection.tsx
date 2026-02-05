import { motion } from 'motion/react';
import { Lightbulb, TrendingUp, Users, DollarSign, Flame, ShoppingCart, ChefHat, Smile, FileCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import opportunitiesImage from 'figma:asset/051a5a01917030682fe777f22a9c20055c4b08a8.png';

export default function AdvantagesSection() {
  const { language } = useLanguage();
  const t = translations[language];

  const advantages = [
    {
      icon: Lightbulb,
      title: t.opportunity1Title,
      description: t.opportunity1Desc,
    },
    {
      icon: TrendingUp,
      title: t.opportunity2Title,
      description: t.opportunity2Desc,
    },
    {
      icon: ShoppingCart,
      title: t.opportunity3Title,
      description: t.opportunity3Desc,
    },
  ];

  const opportunityItems = [
    {
      icon: ChefHat,
      title: t.opportunity1Title,
      description: t.opportunity1Desc,
    },
    {
      icon: Smile,
      title: t.opportunity2Title,
      description: t.opportunity2Desc,
    },
    {
      icon: FileCheck,
      title: t.opportunity3Title,
      description: t.opportunity3Desc,
    },
  ];

  return (
    null
  );
}