import { motion } from 'motion/react';
import { Facebook, Send, Music, Instagram, Mail, Phone, MapPin, ArrowRight, ChefHat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { useSiteContent } from '@/contexts/SiteContentContext';
import { useState } from 'react';

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];
  const { get } = useSiteContent();
  const lang = language as 'ru'|'en'|'de'|'es'|'tr';
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
    <footer id="footer" className="bg-[#e9ded6] border-t border-[#FFE5DE] relative overflow-hidden">
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
              {get('footer_tagline', lang, t.footerTagline)}
            </p>
            
            {/* Social Links with glassmorphism effect */}
            <div className="flex gap-3">
              <motion.a
                href="https://www.facebook.com/groups/chefnet.official/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
                style={{ cursor: 'pointer', touchAction: 'manipulation' }}
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://t.me/chefnet_ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
                style={{ cursor: 'pointer', touchAction: 'manipulation' }}
              >
                <Send className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@chefnet.app?_r=1"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
                style={{ cursor: 'pointer', touchAction: 'manipulation' }}
              >
                <Music className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/chefnet.ai/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  
                  // Определяем тип устройства
                  const userAgent = navigator.userAgent.toLowerCase();
                  const isAndroid = userAgent.includes('android');
                  const isIOS = /iphone|ipad|ipod/.test(userAgent);
                  
                  if (isAndroid) {
                    // ✅ Android: используем intent:// URL для прямого открытия приложения
                    const intentUrl = 'intent://instagram.com/_u/chefnet.ai/#Intent;scheme=https;package=com.instagram.android;end';
                    
                    try {
                      // Попытка открыть через intent
                      window.location.href = intentUrl;
                      
                      // Фоллбэк на веб-версию через 2 секунды, если приложение не открылось
                      setTimeout(() => {
                        window.open('https://www.instagram.com/chefnet.ai/', '_blank', 'noopener,noreferrer');
                      }, 2000);
                    } catch (error) {
                      // Если не удалось, открываем веб-версию
                      window.open('https://www.instagram.com/chefnet.ai/', '_blank', 'noopener,noreferrer');
                    }
                    
                  } else if (isIOS) {
                    // ✅ iOS: используем instagram:// URL схему
                    const instagramAppUrl = 'instagram://user?username=chefnet.ai';
                    const webUrl = 'https://www.instagram.com/chefnet.ai/';
                    const startTime = Date.now();
                    
                    // Попытка открыть приложение
                    window.location.href = instagramAppUrl;
                    
                    // Если приложение не открылось за 1.5 секунды, открываем веб-версию
                    setTimeout(() => {
                      if (Date.now() - startTime < 2000) {
                        window.open(webUrl, '_blank', 'noopener,noreferrer');
                      }
                    }, 1500);
                  } else {
                    // Desktop и другие устройства - просто открываем веб-версию
                    window.open('https://www.instagram.com/chefnet.ai/', '_blank', 'noopener,noreferrer');
                  }
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm border border-[#FFE5DE] flex items-center justify-center text-[#6B4423] hover:bg-gradient-to-br hover:from-[#FF6B35] hover:to-[#FF8C42] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-[#FF6B35]/30 transition-all duration-300"
                style={{ cursor: 'pointer', touchAction: 'manipulation' }}
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>

            {/* Legal links */}
            <div className="mt-8 flex flex-col gap-2">
              {[
                { href: '/privacy', label: { ru: 'Политика конфиденциальности', en: 'Privacy Policy', de: 'Datenschutzrichtlinie', es: 'Política de privacidad', tr: 'Gizlilik Politikası' } },
                { href: '/terms', label: { ru: 'Пользовательское соглашение', en: 'Terms of Use', de: 'Nutzungsbedingungen', es: 'Términos de uso', tr: 'Kullanım Koşulları' } },
                { href: '/risks', label: { ru: 'Раскрытие рисков', en: 'Risk Disclosure', de: 'Risikohinweise', es: 'Divulgación de riesgos', tr: 'Risk Açıklaması' } },
                { href: '/referral-terms', label: { ru: 'Условия реф. программы', en: 'Referral Program Terms', de: 'Empfehlungsprogramm', es: 'Programa de referidos', tr: 'Referans Programı' } },
              ].map(link => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center gap-2 text-[#6B4423] hover:text-[#FF6B35] transition-colors text-sm font-medium"
                >
                  <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                  {link.label[lang] || link.label.en}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-bold text-[#2C1810] mb-8 relative before:content-[''] before:hidden">{get('footer_contacts_title', lang, t.footerContacts)}</h3>
            <div className="space-y-5">
              <motion.a
                href={`mailto:${get('footer_email', lang, t.footerEmail)}`}
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
                <span className="text-sm font-medium">{get('footer_email', lang, t.footerEmail)}</span>
              </motion.a>

              <motion.a
                href={`tel:${get('footer_phone', lang, t.footerPhone).replace(/\s/g, '')}`}
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
                <span className="text-sm font-medium">{get('footer_phone', lang, t.footerPhone)}</span>
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
                <div className="whitespace-pre-line text-sm leading-relaxed pt-1 font-medium">{get('footer_address', lang, t.footerAddress)}</div>
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
            <h3 className="text-xl font-bold text-[#2C1810] mb-6 before:content-[''] before:hidden">{get('footer_newsletter_title', lang, t.footerNewsletter)}</h3>
            <p className="text-[#6B4423] mb-8 leading-relaxed">
              {get('footer_newsletter_desc', lang, t.footerNewsletterDesc)}
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
                className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF7A59] to-[#EB5632] text-white flex items-center justify-center hover:shadow-lg hover:shadow-[#FF6B35]/40 transition-all duration-300"
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
            {get('footer_copyright', lang, t.footerCopyright)}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}