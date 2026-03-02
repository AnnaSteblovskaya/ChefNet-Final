import { apiGet, apiPost, apiPut } from '@/utils/api';

interface RoundsData {
  [key: string]: {
    id: string;
    name: string;
    price: number;
    minInvestment: number;
    totalShares: number;
    soldShares: number;
    myShares: number;
    status: string;
    amount: string;
    highlight: boolean;
  };
}

interface ReferralItem {
  name: string;
  status: string;
  amount: string;
  shares: number;
  commission: string;
  date: string;
  round: string | null;
}

interface KycData {
  status: string;
  full_name?: string;
  date_of_birth?: string;
  country?: string;
  address?: string;
  email?: string;
  phone?: string;
  verified_date?: string;
}

interface ProfileData {
  full_name?: string;
  email?: string;
  phone?: string;
  country?: string;
  address?: string;
  date_of_birth?: string;
  nationality?: string;
  zip_code?: string;
}

export async function loadDataFromServer(): Promise<void> {
  try {
    const [roundsRes, investmentsRes, referralsRes, kycRes, profileRes] = await Promise.allSettled([
      apiGet<any[]>('/api/rounds'),
      apiGet<{ investments: any[]; userRounds: any[] }>('/api/investments'),
      apiGet<any[]>('/api/referrals'),
      apiGet<KycData>('/api/kyc'),
      apiGet<ProfileData | null>('/api/profile'),
    ]);

    if (roundsRes.status === 'fulfilled' && roundsRes.value.length > 0) {
      const rounds = roundsRes.value;
      const userRounds = investmentsRes.status === 'fulfilled' ? investmentsRes.value.userRounds : [];

      const roundsData: RoundsData = {};
      const roundNameMap: Record<string, string> = {
        seed: 'Seed',
        seriesA: 'Private',
        marketing: 'Marketing',
        ipo: 'Public/IPO',
      };

      const roundDisplayNameMap: Record<string, string> = {
        seed: 'Раунд посева',
        seriesA: 'Серия A',
        marketing: 'Серия B',
        ipo: 'Серия C / IPO',
      };

      rounds.forEach((round: any) => {
        const key = roundNameMap[round.id] || round.id;
        const userRound = userRounds.find((ur: any) => ur.round_id === round.id);
        roundsData[key] = {
          id: round.id,
          name: roundDisplayNameMap[round.id] || round.name,
          price: parseFloat(round.price),
          minInvestment: parseFloat(round.min_investment),
          totalShares: round.total_shares,
          soldShares: round.sold_shares,
          myShares: userRound ? userRound.my_shares : 0,
          status: round.status === 'active' ? 'Активный' : round.status === 'upcoming' ? 'Вскоре' : 'Распроданный',
          amount: round.amount,
          highlight: round.highlight,
        };
      });

      localStorage.setItem('chefnet_rounds_data', JSON.stringify(roundsData));
    }

    if (investmentsRes.status === 'fulfilled' && investmentsRes.value.investments.length > 0) {
      const investments = investmentsRes.value.investments.map((inv: any) => ({
        round: inv.round === 'seed' ? 'Seed' : inv.round,
        shares: inv.shares,
        amount: inv.amount,
        date: inv.date,
        status: inv.status,
      }));
      localStorage.setItem('chefnet_investments', JSON.stringify(investments));
    }

    if (referralsRes.status === 'fulfilled' && referralsRes.value.length > 0) {
      const referrals = referralsRes.value.map((ref: any) => ({
        name: ref.name,
        status: ref.status,
        amount: ref.amount,
        shares: ref.shares,
        commission: ref.commission,
        date: ref.date,
        round: ref.round,
      }));
      localStorage.setItem('chefnet_referrals_data', JSON.stringify(referrals));
      localStorage.setItem('chefnet_referrals_version', '6.0');
    }

    if (kycRes.status === 'fulfilled' && kycRes.value.status !== 'not_started') {
      const kyc = kycRes.value;
      localStorage.setItem('chefnet_kyc_status', kyc.status);
      if (kyc.full_name) {
        localStorage.setItem('chefnet_kyc_data', JSON.stringify({
          fullName: kyc.full_name,
          dateOfBirth: kyc.date_of_birth || '',
          country: kyc.country || '',
          address: kyc.address || '',
          email: kyc.email || '',
          phone: kyc.phone || '',
        }));
      }
      if (kyc.verified_date) {
        localStorage.setItem('chefnet_kyc_verified_date', kyc.verified_date);
      }
    }

    if (profileRes.status === 'fulfilled' && profileRes.value) {
      const profile = profileRes.value;
      localStorage.setItem('chefnet_profile_data', JSON.stringify({
        fullName: profile.full_name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        country: profile.country || '',
        address: profile.address || '',
        dateOfBirth: profile.date_of_birth || '',
        nationality: profile.nationality || '',
        zipCode: profile.zip_code || '',
      }));
    }
  } catch (error) {
    console.error('Error loading data from server:', error);
  }
}

export async function saveDataToServer(): Promise<void> {
  try {
    const kycStatus = localStorage.getItem('chefnet_kyc_status');
    const kycData = localStorage.getItem('chefnet_kyc_data');
    const profileData = localStorage.getItem('chefnet_profile_data');

    const promises: Promise<any>[] = [];

    if (kycStatus && kycStatus !== 'not_started') {
      const kyc = kycData ? JSON.parse(kycData) : {};
      promises.push(apiPut('/api/kyc', {
        status: kycStatus,
        full_name: kyc.fullName || '',
        date_of_birth: kyc.dateOfBirth || '',
        country: kyc.country || '',
        address: kyc.address || '',
        email: kyc.email || '',
        phone: kyc.phone || '',
      }));
    }

    if (profileData) {
      const profile = JSON.parse(profileData);
      promises.push(apiPut('/api/profile', {
        full_name: profile.fullName || '',
        email: profile.email || '',
        phone: profile.phone || '',
        country: profile.country || '',
        address: profile.address || '',
        date_of_birth: profile.dateOfBirth || '',
        nationality: profile.nationality || '',
        zip_code: profile.zipCode || '',
      }));
    }

    await Promise.allSettled(promises);
  } catch (error) {
    console.error('Error saving data to server:', error);
  }
}

export async function seedDemoData(): Promise<void> {
  try {
    await apiPost('/api/seed-demo-data', {});
  } catch (error) {
    console.error('Error seeding demo data:', error);
  }
}

export function clearLocalDashboardData(): void {
  const keysToRemove = [
    'chefnet_rounds_data',
    'chefnet_investments',
    'chefnet_referrals_data',
    'chefnet_referrals_version',
    'chefnet_kyc_status',
    'chefnet_kyc_data',
    'chefnet_kyc_verified_date',
    'chefnet_kyc_sumsub_applicant_id',
    'chefnet_kyc_sumsub_inspection_id',
    'chefnet_profile_data',
    'chefnet_user_email',
  ];
  keysToRemove.forEach(key => localStorage.removeItem(key));
}
