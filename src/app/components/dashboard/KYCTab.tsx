import { motion } from 'motion/react';
import { ShieldCheck, Bell, CheckCircle, AlertCircle, Loader2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { dashboardTranslations } from '@/utils/dashboardTranslations';
import { useState, useEffect, useRef } from 'react';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import { apiGet, apiPost } from '@/utils/api';

declare global {
  interface Window {
    SumsubWebSdk: any;
  }
}

interface KYCRecord {
  status: string;
  sumsub_applicant_id?: string;
  verified_date?: string;
  updated_at?: string;
}

interface KYCTabProps {
  setActiveTab: (tab: string) => void;
}

const STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
  not_started: { label: 'Не начата', color: 'text-gray-500', icon: '○' },
  pending:      { label: 'На проверке', color: 'text-yellow-600', icon: '⏳' },
  verified:     { label: 'Верифицирован', color: 'text-green-600', icon: '✓' },
  rejected:     { label: 'Отклонено', color: 'text-red-600', icon: '✗' },
};

function loadSumsubSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.SumsubWebSdk) { resolve(); return; }
    const existing = document.getElementById('sumsub-sdk-script');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      return;
    }
    const script = document.createElement('script');
    script.id = 'sumsub-sdk-script';
    script.src = 'https://static.sumsub.com/idensic/static/sns-websdk-builder.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Sumsub SDK'));
    document.head.appendChild(script);
  });
}

export default function KYCTab({ setActiveTab }: KYCTabProps) {
  const { language } = useLanguage();
  const t = dashboardTranslations[language];

  const [kyc, setKyc] = useState<KYCRecord | null>(null);
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [launching, setLaunching] = useState(false);
  const [sdkActive, setSdkActive] = useState(false);
  const [sdkDone, setSdkDone] = useState(false);
  const [error, setError] = useState('');
  const sdkRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    apiGet<KYCRecord>('/api/kyc')
      .then(data => { setKyc(data); setLoadingStatus(false); })
      .catch(() => { setKyc({ status: 'not_started' }); setLoadingStatus(false); });
  }, []);

  const getNewToken = async (): Promise<string> => {
    const data = await apiPost<{ token: string }>('/api/kyc/access-token', {});
    return data.token;
  };

  const launchSdk = async () => {
    setLaunching(true);
    setError('');
    try {
      const data = await apiPost<{ token: string }>('/api/kyc/access-token', {});
      await loadSumsubSdk();

      const lang = language === 'ru' ? 'ru' : language === 'de' ? 'de' : language === 'es' ? 'es' : language === 'tr' ? 'tr' : 'en';

      sdkRef.current = window.SumsubWebSdk
        .init(data.token, getNewToken)
        .withConf({ lang })
        .withOptions({ addViewportTag: false, adaptIframeHeight: true })
        .on('idCheck.onApplicantStatusChanged', (payload: any) => {
          const answer = payload?.reviewResult?.reviewAnswer;
          const status = payload?.reviewStatus;
          if (status === 'completed' && answer === 'GREEN') {
            setKyc(prev => ({ ...prev, status: 'verified' }));
            setSdkDone(true);
            setSdkActive(false);
          } else if (status === 'completed' && answer === 'RED') {
            setKyc(prev => ({ ...prev, status: 'rejected' }));
            setSdkDone(true);
            setSdkActive(false);
          } else if (status === 'pending' || status === 'prechecked') {
            setKyc(prev => ({ ...prev, status: 'pending' }));
          }
        })
        .on('idCheck.onApplicantSubmitted', () => {
          setKyc(prev => ({ ...prev, status: 'pending' }));
          setSdkDone(true);
          setSdkActive(false);
        })
        .on('idCheck.onError', (err: any) => {
          console.error('[sumsub] SDK error:', err);
          setError('Ошибка верификации. Попробуйте ещё раз.');
          setSdkActive(false);
        })
        .build();

      setSdkActive(true);
      setTimeout(() => {
        if (containerRef.current) {
          sdkRef.current.launch('#sumsub-container');
        }
      }, 100);
    } catch (err: any) {
      console.error('[sumsub] launch error:', err);
      const msg = (err as any)?.data?.error || err?.message || '';
      if (msg.includes('not configured')) {
        setError('Sumsub не настроен. Свяжитесь с администратором.');
      } else if (msg.includes('not found in Sumsub') || msg.includes('KYC level')) {
        setError('Уровень верификации не найден в Sumsub. Администратору необходимо создать Verification Flow в панели Sumsub.');
      } else {
        setError('Не удалось запустить верификацию. Попробуйте позже.');
      }
    } finally {
      setLaunching(false);
    }
  };

  const status = kyc?.status || 'not_started';
  const statusInfo = STATUS_MAP[status] || STATUS_MAP.not_started;
  const isVerified = status === 'verified';
  const isPending = status === 'pending';
  const isRejected = status === 'rejected';

  return (
    <div>
      <div className="mb-6 lg:mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{t.kycTitle}</h2>
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher variant="dark" />
            <div className="relative cursor-pointer" onClick={() => setActiveTab('notifications')}>
              <Bell className="w-6 h-6 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-primary)] text-white text-xs rounded-full flex items-center justify-center font-medium">2</span>
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
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-5 h-5 text-gray-700" />
          <h3 className="text-xl font-bold text-gray-900">{t.submitInfo}</h3>
          {!loadingStatus && (
            <span className={`ml-auto text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.icon} {statusInfo.label}
            </span>
          )}
        </div>

        {loadingStatus ? (
          <div className="flex justify-center py-10">
            <Loader2 className="w-8 h-8 animate-spin text-[#D4522A]" />
          </div>
        ) : (
          <>
            {/* Verified */}
            {isVerified && !sdkActive && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Верификация пройдена</h4>
                <p className="text-sm text-gray-500">Ваша личность подтверждена. Вы можете инвестировать.</p>
                {kyc?.verified_date && (
                  <p className="text-xs text-gray-400 mt-2">
                    Дата: {new Date(kyc.verified_date).toLocaleDateString('ru')}
                  </p>
                )}
              </div>
            )}

            {/* Pending */}
            {isPending && !sdkActive && !sdkDone && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-yellow-600 animate-spin" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">На проверке</h4>
                <p className="text-sm text-gray-500 mb-4">Ваши документы проверяются. Обычно занимает несколько минут.</p>
                <button
                  onClick={launchSdk}
                  disabled={launching}
                  className="text-sm text-[#D4522A] underline hover:no-underline disabled:opacity-50"
                >
                  {launching ? 'Загрузка...' : 'Продолжить верификацию'}
                </button>
              </div>
            )}

            {/* Rejected */}
            {isRejected && !sdkActive && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">Верификация отклонена</h4>
                <p className="text-sm text-gray-500 mb-6">Проверьте данные и попробуйте снова.</p>
                <button
                  onClick={launchSdk}
                  disabled={launching}
                  className="px-6 py-3 bg-[#D4522A] hover:bg-[#B8441F] text-white rounded-xl font-medium transition-all disabled:opacity-50 flex items-center gap-2 mx-auto"
                >
                  {launching ? <><Loader2 className="w-4 h-4 animate-spin" /> Загрузка...</> : 'Пройти повторно'}
                </button>
              </div>
            )}

            {/* Not started */}
            {status === 'not_started' && !sdkActive && !sdkDone && (
              <div>
                <p className="text-sm text-gray-600 mb-6">{t.submitDesc}</p>
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Что потребуется:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>📄 Паспорт или ID карта</li>
                    <li>🤳 Селфи с документом</li>
                    <li>⏱ 3–5 минут вашего времени</li>
                  </ul>
                </div>
                <button
                  onClick={launchSdk}
                  disabled={launching}
                  className="w-full max-w-md mx-auto flex items-center justify-center gap-2 py-4 bg-[#D4522A] hover:bg-[#B8441F] text-white rounded-xl font-semibold transition-all shadow-lg disabled:opacity-50"
                >
                  {launching ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Загрузка...</>
                  ) : (
                    <><ShieldCheck className="w-5 h-5" /> Начать верификацию</>
                  )}
                </button>
              </div>
            )}

            {/* SDK done message */}
            {sdkDone && !sdkActive && status === 'pending' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">Документы отправлены</h4>
                <p className="text-sm text-gray-500">Результат верификации придёт в течение нескольких минут.</p>
              </div>
            )}

            {/* Sumsub SDK container */}
            {sdkActive && (
              <div>
                <p className="text-sm text-gray-500 mb-3 text-center">Верификация через Sumsub — следуйте инструкциям ниже</p>
                <div id="sumsub-container" ref={containerRef} className="min-h-[500px] rounded-xl overflow-hidden border border-gray-200" />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Info block */}
      {!sdkActive && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 bg-white rounded-2xl p-4 lg:p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-start gap-3">
            <ExternalLink className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">Powered by Sumsub</h4>
              <p className="text-xs text-gray-500">
                Верификация проводится через защищённую платформу Sumsub. Ваши данные надёжно хранятся и не передаются третьим лицам без вашего согласия.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
