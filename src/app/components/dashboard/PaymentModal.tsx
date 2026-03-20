import { useState, useEffect } from 'react';
import { X, Building2, Bitcoin, Copy, Check, ChevronRight, AlertCircle } from 'lucide-react';
import { getAuthHeaders } from '@/utils/api';

interface Round {
  id: string;
  name: string;
  price: number;
}

interface PaymentSettings {
  bank_us_account_holder?: string;
  bank_us_bank_name?: string;
  bank_us_routing_number?: string;
  bank_us_account_number?: string;
  bank_us_swift?: string;
  bank_us_address?: string;
  bank_intl_account_holder?: string;
  bank_intl_bank_name?: string;
  bank_intl_swift?: string;
  bank_intl_iban?: string;
  bank_intl_bank_address?: string;
  bank_intl_bank_country?: string;
  crypto_usdt_trc20?: string;
  crypto_usdt_erc20?: string;
  crypto_usdt_bep20?: string;
  crypto_usdt_polygon?: string;
  crypto_usdt_solana?: string;
  crypto_usdt_arbitrum?: string;
  crypto_usdt_ton?: string;
}

interface Props {
  round: Round;
  shares: number;
  usdAmount: number;
  onClose: () => void;
  onSuccess: () => void;
}

const CRYPTO_NETWORKS = [
  { key: 'trc20',    label: 'TRC-20 (Tron)',        fee: '~1 USDT',      fast: true  },
  { key: 'bep20',    label: 'BEP-20 (BSC)',          fee: '~0.5 USDT',    fast: true  },
  { key: 'polygon',  label: 'Polygon',               fee: '~0.1 USDT',    fast: true  },
  { key: 'ton',      label: 'TON Network',           fee: '~0.1 USDT',    fast: true  },
  { key: 'arbitrum', label: 'Arbitrum One',          fee: '~0.5 USDT',    fast: true  },
  { key: 'solana',   label: 'Solana',                fee: '~0.01 USDT',   fast: true  },
  { key: 'erc20',    label: 'ERC-20 (Ethereum)',     fee: '~5–20 USDT',   fast: false },
];

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={copy} className="ml-2 text-white/40 hover:text-[#D4522A] transition-colors flex-shrink-0">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-white/5 last:border-0">
      <span className="text-white/50 text-sm flex-shrink-0 mr-4">{label}</span>
      <div className="flex items-center gap-1 min-w-0">
        <span className="text-white text-sm font-mono text-right break-all">{value}</span>
        <CopyButton value={value} />
      </div>
    </div>
  );
}

export default function PaymentModal({ round, shares, usdAmount, onClose, onSuccess }: Props) {
  const [method, setMethod] = useState<'bank' | 'crypto'>('bank');
  const [bankType, setBankType] = useState<'us' | 'intl'>('intl');
  const [cryptoNetwork, setCryptoNetwork] = useState<string>('trc20');
  const [settings, setSettings] = useState<PaymentSettings>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/payment-settings').then(r => r.json()).then(setSettings).catch(() => {});
  }, []);

  const totalWithFee = method === 'crypto' ? (usdAmount * 1.03).toFixed(2) : usdAmount.toFixed(2);
  const selectedNet = CRYPTO_NETWORKS.find(n => n.key === cryptoNetwork);
  const walletAddr = settings[`crypto_usdt_${cryptoNetwork}` as keyof PaymentSettings] || '';

  const handleSubmit = async () => {
    setSubmitting(true);
    setError('');
    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/investments', {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({
          round: round.id,
          shares,
          amount: parseFloat(totalWithFee),
          payment_method: method,
          crypto_network: method === 'crypto' ? cryptoNetwork : null,
          bank_type: method === 'bank' ? bankType : null,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        onSuccess();
      } else {
        const err = await res.json().catch(() => ({}));
        setError(err.error || 'Ошибка при отправке заявки');
      }
    } catch {
      setError('Ошибка сети. Попробуйте ещё раз.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1a1a2e] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div>
            <h2 className="text-xl font-bold text-white">Выбор способа оплаты</h2>
            <p className="text-white/50 text-sm mt-1">
              {shares.toLocaleString()} долей · Раунд {round.name}
            </p>
          </div>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Заявка отправлена!</h3>
            <p className="text-white/60 text-sm mb-2">
              Ваша заявка на покупку <strong className="text-white">{shares.toLocaleString()} долей</strong> за <strong className="text-white">${totalWithFee}</strong> отправлена и ожидает подтверждения.
            </p>
            <p className="text-white/40 text-xs mb-6">
              После получения платежа администратор подтвердит вашу покупку вручную. Статус отобразится в разделе «История покупок».
            </p>
            <button onClick={onClose} className="bg-[#D4522A] hover:bg-[#c04520] text-white px-8 py-3 rounded-xl font-semibold transition">
              Закрыть
            </button>
          </div>
        ) : (
          <>
            {/* Amount summary */}
            <div className="mx-6 mt-5 bg-white/5 rounded-xl p-4 flex items-center justify-between">
              <span className="text-white/60 text-sm">Сумма к оплате</span>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">${totalWithFee}</div>
                {method === 'crypto' && (
                  <div className="text-xs text-white/40">включая 3% за конвертацию</div>
                )}
              </div>
            </div>

            {/* Method selector */}
            <div className="flex gap-3 mx-6 mt-5">
              <button
                onClick={() => setMethod('bank')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  method === 'bank'
                    ? 'border-[#D4522A] bg-[#D4522A]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <Building2 className={`w-6 h-6 ${method === 'bank' ? 'text-[#D4522A]' : 'text-white/50'}`} />
                <span className={`text-sm font-medium ${method === 'bank' ? 'text-white' : 'text-white/50'}`}>
                  Банковский перевод
                </span>
              </button>
              <button
                onClick={() => setMethod('crypto')}
                className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  method === 'crypto'
                    ? 'border-[#D4522A] bg-[#D4522A]/10'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                <Bitcoin className={`w-6 h-6 ${method === 'crypto' ? 'text-[#D4522A]' : 'text-white/50'}`} />
                <span className={`text-sm font-medium ${method === 'crypto' ? 'text-white' : 'text-white/50'}`}>
                  Криптовалюта
                </span>
              </button>
            </div>

            {/* Bank transfer */}
            {method === 'bank' && (
              <div className="mx-6 mt-5">
                {/* Sub-tabs */}
                <div className="flex bg-white/5 rounded-xl p-1 mb-4">
                  <button
                    onClick={() => setBankType('intl')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      bankType === 'intl' ? 'bg-[#D4522A] text-white' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    🌍 Весь мир (SWIFT)
                  </button>
                  <button
                    onClick={() => setBankType('us')}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                      bankType === 'us' ? 'bg-[#D4522A] text-white' : 'text-white/50 hover:text-white'
                    }`}
                  >
                    🇺🇸 США (ACH/Wire)
                  </button>
                </div>

                {bankType === 'intl' && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/50 text-xs mb-3">Для международных переводов (SWIFT/IBAN)</p>
                    <InfoRow label="Получатель" value={settings.bank_intl_account_holder || 'ChefNet LLC'} />
                    <InfoRow label="Банк" value={settings.bank_intl_bank_name || 'Wise (TransferWise)'} />
                    <InfoRow label="SWIFT/BIC" value={settings.bank_intl_swift || 'TRWIBEB1XXX'} />
                    <InfoRow label="IBAN" value={settings.bank_intl_iban || 'BE56 9670 3661 4199'} />
                    <InfoRow label="Адрес банка" value={settings.bank_intl_bank_address || 'Rue du Trône 100, 3rd floor, Brussels, Belgium'} />
                    <InfoRow label="Страна банка" value={settings.bank_intl_bank_country || 'Belgium'} />
                    <InfoRow label="Назначение платежа" value={`Investment ${round.name} – ${shares.toLocaleString()} shares`} />
                  </div>
                )}

                {bankType === 'us' && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-white/50 text-xs mb-3">Для переводов внутри США (ACH / Wire Transfer)</p>
                    <InfoRow label="Получатель" value={settings.bank_us_account_holder || 'ChefNet LLC'} />
                    <InfoRow label="Банк" value={settings.bank_us_bank_name || 'Evolve Bank & Trust'} />
                    <InfoRow label="Routing Number" value={settings.bank_us_routing_number || ''} />
                    <InfoRow label="Account Number" value={settings.bank_us_account_number || ''} />
                    <InfoRow label="SWIFT/BIC" value={settings.bank_us_swift || ''} />
                    <InfoRow label="Адрес банка" value={settings.bank_us_address || ''} />
                    <InfoRow label="Memo / Reference" value={`Investment ${round.name} – ${shares.toLocaleString()} shares`} />
                  </div>
                )}

                <div className="mt-3 flex items-start gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-yellow-300 text-xs">
                    После совершения перевода нажмите «Подтвердить заявку». Ваша покупка будет подтверждена вручную в течение 1–3 рабочих дней.
                  </p>
                </div>
              </div>
            )}

            {/* Crypto payment */}
            {method === 'crypto' && (
              <div className="mx-6 mt-5">
                <p className="text-white/60 text-sm mb-3">Принимаем USDT (Tether). Выберите сеть для перевода:</p>

                <div className="space-y-2 mb-4">
                  {CRYPTO_NETWORKS.map(net => (
                    <button
                      key={net.key}
                      onClick={() => setCryptoNetwork(net.key)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                        cryptoNetwork === net.key
                          ? 'border-[#D4522A] bg-[#D4522A]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${cryptoNetwork === net.key ? 'bg-[#D4522A]' : 'bg-white/20'}`} />
                        <div className="text-left">
                          <div className={`text-sm font-medium ${cryptoNetwork === net.key ? 'text-white' : 'text-white/70'}`}>
                            {net.label}
                          </div>
                        </div>
                        {net.fast && <span className="text-xs text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">Быстро</span>}
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-white/40">Комиссия сети</div>
                        <div className={`text-sm font-mono ${cryptoNetwork === net.key ? 'text-[#D4522A]' : 'text-white/60'}`}>
                          {net.fee}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {walletAddr ? (
                  <div className="bg-white/5 rounded-xl p-4 mb-3">
                    <p className="text-white/50 text-xs mb-2">Адрес кошелька USDT ({selectedNet?.label}):</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-mono text-sm break-all flex-1">{walletAddr}</span>
                      <CopyButton value={walletAddr} />
                    </div>
                    <div className="mt-3 pt-3 border-t border-white/10">
                      <div className="flex justify-between text-sm">
                        <span className="text-white/50">Сумма к переводу</span>
                        <span className="text-white font-bold">{totalWithFee} USDT</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/5 rounded-xl p-4 mb-3 text-center">
                    <p className="text-white/40 text-sm">Адрес кошелька для этой сети не настроен.<br />Обратитесь в поддержку.</p>
                  </div>
                )}

                <div className="bg-white/5 rounded-xl p-3 mb-3 space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Сумма инвестиции</span>
                    <span className="text-white">${usdAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">+ 3% за конвертацию</span>
                    <span className="text-yellow-400">+${(usdAmount * 0.03).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold border-t border-white/10 pt-1.5">
                    <span className="text-white">Итого к оплате</span>
                    <span className="text-white">{totalWithFee} USDT</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-300 text-xs">
                    Комиссию сети и 3% за конвертацию оплачивает покупатель. После отправки средств нажмите «Подтвердить заявку» — менеджер проверит транзакцию вручную.
                  </p>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="mx-6 mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Submit */}
            <div className="p-6 pt-5">
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full bg-[#D4522A] hover:bg-[#c04520] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-base transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> Отправка...</>
                ) : (
                  <>Подтвердить заявку <ChevronRight className="w-5 h-5" /></>
                )}
              </button>
              <p className="text-center text-white/30 text-xs mt-3">
                Нажимая кнопку, вы подтверждаете намерение совершить платёж. Доли будут зачислены после проверки оплаты.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
