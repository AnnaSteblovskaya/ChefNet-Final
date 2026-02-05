import { motion } from 'motion/react';
import { Facebook, Send, Music, Instagram, Mail, Phone, MapPin, ArrowRight, ChefHat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { useState } from 'react';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const [email, setEmail] = useState('');
  const [isRotating, setIsRotating] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  const handleChefHatClick = () => {
    setIsRotating(true);
    setTimeout(() => setIsRotating(false), 600);
  };

  return (
    <footer id="footer" className="bg-[#EAE7E3] border-t border-[#FFE5DE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-20 sm:pt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 mb-12">
          {/* Logo and Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="flex items-center gap-2 mb-6"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                animate={{ rotate: isRotating ? 360 : 0 }}
                transition={{ duration: 0.6 }}
                className="cursor-pointer"
                onClick={handleChefHatClick}
              >
                <ChefHat className="w-10 h-10 text-[#FF6B35]" />
              </motion.div>
              <span className="text-2xl font-bold text-[#2C1810]">
                ChefNet <span className="text-[#FF6B35]">Invest</span>
              </span>
            </motion.div>
            <p className="text-[#6B4423] mb-8 leading-relaxed whitespace-pre-line">
              {t.footerTagline}
            </p>
            
            {/* Social Links with glassmorphism effect */}
            <div className="flex gap-3">
              <motion.a
                href="https://www.facebook.com/groups/chefnet.official/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://t.me/chefnet_ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
              >
                <Send className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@chefnet.app?_r=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
              >
                <Music className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/chefnet.ai/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Privacy Policy */}
            <motion.a
              href="#"
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 mt-8 text-[#6B4423] hover:text-[#FF6B35] transition-colors text-sm font-medium"
            >
              {t.footerPrivacyPolicy}
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-[#2C1810] mb-8 relative before:content-[''] before:hidden">{t.footerContacts}</h3>
            <div className="space-y-5">
              <motion.a
                href={`mailto:${t.footerEmail}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-[#6B4423] hover:text-[#FF6B35] transition-all duration-300 group"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center group-hover:border-[#FF6B35] group-hover:shadow-lg group-hover:shadow-[#FF6B35]/20 transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium">{t.footerEmail}</span>
              </motion.a>

              <motion.a
                href={`tel:${t.footerPhone.replace(/\s/g, '')}`}
                whileHover={{ x: 5 }}
                className="flex items-center gap-4 text-[#6B4423] hover:text-[#FF6B35] transition-all duration-300 group"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center group-hover:border-[#FF6B35] group-hover:shadow-lg group-hover:shadow-[#FF6B35]/20 transition-all duration-300"
                >
                  <Phone className="w-5 h-5" />
                </motion.div>
                <span className="text-sm font-medium">{t.footerPhone}</span>
              </motion.a>

              <motion.a 
                href="https://www.google.com/maps/search/?api=1&query=ChefNet+LLC+The+Green+STE+B+Dover+DE+19901"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 text-[#6B4423] hover:text-[#FF6B35] transition-all duration-300 group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center flex-shrink-0 group-hover:border-[#FF6B35] group-hover:shadow-lg group-hover:shadow-[#FF6B35]/20 transition-all duration-300"
                >
                  <MapPin className="w-5 h-5" />
                </motion.div>
                <div className="whitespace-pre-line text-sm leading-relaxed pt-1 font-medium">{t.footerAddress}</div>
              </motion.a>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold text-[#2C1810] mb-6 before:content-[''] before:hidden">{t.footerNewsletter}</h3>
            <p className="text-[#6B4423] mb-8 leading-relaxed">
              {t.footerNewsletterDesc}
            </p>
            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.footerNewsletterPlaceholder}
                required
                className="w-full px-5 py-4 pr-16 rounded-2xl bg-white/80 backdrop-blur-sm border-2 border-[#FFE5DE] text-[#2C1810] placeholder:text-[#B8957A] focus:outline-none focus:border-[#FF6B35] focus:shadow-lg focus:shadow-[#FF6B35]/20 transition-all duration-300"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8C42] text-white flex items-center justify-center hover:shadow-lg hover:shadow-[#FF6B35]/40 transition-all duration-300"
                aria-label={t.footerNewsletterButton}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="pt-6 pb-8 border-t border-[#FFE5DE]"
        >
          <p className="text-center text-[#6B4423] text-sm">
            {t.footerCopyright}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}