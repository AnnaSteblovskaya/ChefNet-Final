import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Upload } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState } from 'react';

export default function KYCTab() {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [isUSCitizen, setIsUSCitizen] = useState(false);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.kycTitle}</h2>
        <p className="text-gray-600">{t.kycSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-bold text-gray-900">{t.submitInfo}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-8">{t.submitDesc}</p>

        <form className="space-y-6">
          {/* Row 1: Full Name & Date of Birth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.fullName}
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.dateOfBirth}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.pickDate}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Row 2: Country & Full Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.countryOfResidence}
              </label>
              <input
                type="text"
                placeholder={t.selectCountry}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.fullAddress}
              </label>
              <input
                type="text"
                placeholder="123 Main St. Anytown, USA"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>
          </div>

          {/* Row 3: ID Document & Nationality */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.idDocument}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.chooseFile}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm text-gray-500 pr-10 cursor-pointer"
                />
                <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-2">{t.passportNote}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.nationality}
              </label>
              <input
                type="text"
                placeholder="Italian"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>
          </div>

          {/* Row 4: Proof of Address & Zip Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.proofOfAddress}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.chooseFile}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm text-gray-500 pr-10 cursor-pointer"
                />
                <Upload className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <p className="text-xs text-gray-500 mt-2">{t.utilityNote}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.zipCode}
              </label>
              <input
                type="text"
                placeholder="823935"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>
          </div>

          {/* US Citizen checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="usCitizen"
              checked={isUSCitizen}
              onChange={(e) => setIsUSCitizen(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-[#D4522A] focus:ring-[#D4522A]"
            />
            <label htmlFor="usCitizen" className="text-sm text-gray-900 cursor-pointer">
              {t.usCitizen}
            </label>
            {isUSCitizen && (
              <button className="ml-auto px-4 py-2 bg-[#D4522A] text-white text-sm rounded-full font-medium hover:bg-[#B8441F] transition-all">
                {t.w9Form}
              </button>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full max-w-md mx-auto block py-3.5 bg-[#D4522A] hover:bg-[#B8441F] text-white rounded-xl font-medium transition-all shadow-lg"
            >
              {t.submitVerification}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}