import { motion } from 'motion/react';
import { ShieldCheck, Calendar, Bell, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState, useEffect } from 'react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ru, enUS, de, es, tr } from 'date-fns/locale';

// Register locales for date picker
registerLocale('ru', ru);
registerLocale('en', enUS);
registerLocale('de', de);
registerLocale('es', es);
registerLocale('tr', tr);

interface KYCTabProps {
  setActiveTab: (tab: string) => void;
}

// SumSub API response structure
interface SumSubResponse {
  applicantId: string;
  inspectionId: string;
  reviewStatus: 'init' | 'pending' | 'prechecked' | 'completed';
  reviewResult: {
    reviewAnswer: 'GREEN' | 'RED' | 'RETRY';
  };
}

export default function KYCTab({ setActiveTab }: KYCTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];
  const [isUSCitizen, setIsUSCitizen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);
  
  // Form fields state
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    country: '',
    address: '',
    email: '',
    phone: ''
  });

  // Check if KYC is already verified
  const [isVerified, setIsVerified] = useState(false);
  const [verificationDate, setVerificationDate] = useState<string>('');
  
  useEffect(() => {
    const kycStatus = localStorage.getItem('chefnet_kyc_status');
    if (kycStatus === 'verified') {
      setIsVerified(true);
      // Load saved data if exists
      const savedData = localStorage.getItem('chefnet_kyc_data');
      const savedDate = localStorage.getItem('chefnet_kyc_verified_date');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Ensure all required fields exist with default values
        setFormData({
          fullName: parsedData.fullName || '',
          dateOfBirth: parsedData.dateOfBirth || '',
          country: parsedData.country || '',
          address: parsedData.address || '',
          email: parsedData.email || '',
          phone: parsedData.phone || ''
        });
      }
      if (savedDate) {
        setVerificationDate(savedDate);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Prepare data for SumSub API format
  const prepareSumSubData = () => {
    return {
      externalUserId: localStorage.getItem('chefnet_user_email') || 'user_' + Date.now(),
      info: {
        firstName: formData.fullName.split(' ')[0] || '',
        lastName: formData.fullName.split(' ').slice(1).join(' ') || '',
        dob: formData.dateOfBirth,
        country: formData.country,
        nationality: formData.country,
      },
      address: {
        country: formData.country,
        postCode: '',
        town: formData.address.split(',')[1]?.trim() || '',
        street: formData.address.split(',')[0]?.trim() || formData.address,
        state: '',
      },
      metadata: {
        isUSCitizen: isUSCitizen,
        submittedAt: new Date().toISOString(),
        platform: 'ChefNet Invest',
      }
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.dateOfBirth || !formData.country || 
        !formData.address || !formData.email || !formData.phone) {
      alert(t.fillAllFields || 'Please fill in all required fields');
      return;
    }

    // Show confirmation modal instead of submitting directly
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = async () => {
    if (!confirmChecked) {
      alert(t.confirmDataMatch || 'Please confirm that your data matches your documents');
      return;
    }

    setShowConfirmModal(false);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Prepare data in SumSub format
      const sumSubData = prepareSumSubData();
      
      // TODO: Send to your backend endpoint that handles SumSub API
      // const response = await fetch('/api/kyc/submit', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(sumSubData),
      // });
      // const result: SumSubResponse = await response.json();

      // MOCK: Simulate API call (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful response
      const mockResponse: SumSubResponse = {
        applicantId: 'app_' + Date.now(),
        inspectionId: 'insp_' + Date.now(),
        reviewStatus: 'completed',
        reviewResult: {
          reviewAnswer: 'GREEN'
        }
      };

      // Save to localStorage based on SumSub response
      if (mockResponse.reviewResult.reviewAnswer === 'GREEN') {
        localStorage.setItem('chefnet_kyc_status', 'verified');
        localStorage.setItem('chefnet_kyc_data', JSON.stringify(formData));
        localStorage.setItem('chefnet_kyc_verified_date', new Date().toISOString());
        localStorage.setItem('chefnet_kyc_sumsub_applicant_id', mockResponse.applicantId);
        localStorage.setItem('chefnet_kyc_sumsub_inspection_id', mockResponse.inspectionId);
        
        // Save data to profile
        localStorage.setItem('chefnet_profile_data', JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          nationality: formData.country,
          zipCode: '',
        }));
        
        setIsVerified(true);
        setVerificationDate(new Date().toISOString());
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
      
    } catch (error) {
      console.error('KYC submission error:', error);
      setSubmitStatus('error');
      alert(t.submissionError || 'Error submitting verification. Please try again.');
    } finally {
      setIsSubmitting(false);
      setConfirmChecked(false);
    }
  };

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.kycTitle}</h2>
          
          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="dark" />
            <div className="relative cursor-pointer" onClick={() => setActiveTab('notifications')}>
              <Bell className="w-6 h-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">
                2
              </span>
            </div>
          </div>
        </div>
        <p className="text-sm lg:text-base text-gray-600">{t.kycSubtitle}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100"
      >
        <div className="flex items-center gap-2 mb-3 lg:mb-4">
          <ShieldCheck className="w-5 h-5 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">{t.submitInfo}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-6 lg:mb-8">{t.submitDesc}</p>

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
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.dateOfBirth}
              </label>
              <DatePicker
                selected={formData.dateOfBirth ? new Date(formData.dateOfBirth) : null}
                onChange={(date) => handleInputChange('dateOfBirth', date ? date.toISOString().split('T')[0] : '')}
                placeholderText={t.pickDate}
                dateFormat="P"
                maxDate={new Date()}
                locale={language}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
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
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
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
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>
          </div>

          {/* Row 3: Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D4522A] text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.phone}
              </label>
              <input
                type="tel"
                placeholder="+1234567890"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
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
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                t.submitVerification
              )}
            </button>
          </div>

          {/* Submit Status */}
          {submitStatus === 'success' && (
            <div className="mt-4 text-sm text-green-500 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              {t.verificationSuccess}
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="mt-4 text-sm text-red-500 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {t.verificationError}
            </div>
          )}
        </form>
      </motion.div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 lg:p-8 max-w-md w-full shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#D4522A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">{t.sumsubRedirectTitle}</h3>
            </div>

            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              {t.sumsubRedirectMessage}
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="confirmData"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#D4522A] focus:ring-[#D4522A] cursor-pointer"
                />
                <label htmlFor="confirmData" className="text-sm text-gray-900 cursor-pointer select-none">
                  {t.confirmDataMatchMessage}
                </label>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  setConfirmChecked(false);
                }}
                className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-all"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleConfirmSubmit}
                className="flex-1 px-4 py-3 bg-[#D4522A] hover:bg-[#B8441F] text-white rounded-xl font-medium transition-all shadow-lg"
              >
                {t.continue}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}