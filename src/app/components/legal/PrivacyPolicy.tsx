import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Политика конфиденциальности"
      titleEn="Privacy Policy"
      updatedRu="Последнее обновление: 24 марта 2026 г."
      updatedEn="Last updated: March 24, 2026"
    >
      {isRu ? <RuContent /> : <EnContent />}
    </LegalLayout>
  );
}

function RuContent() {
  return (
    <div className="prose-legal">
      <div className="highlight">
        <p>Настоящая Политика конфиденциальности описывает, как ChefNet LLC («Компания», «мы», «нас») собирает, использует и защищает персональные данные пользователей платформы ChefNet Invest, доступной по адресу chefnet.ai.</p>
      </div>

      <h2>1. Кто мы</h2>
      <p>ChefNet LLC — компания, зарегистрированная в штате Делавэр, США (The Green STE B, Dover, DE 19901). Мы являемся оператором инвестиционной платформы ChefNet Invest, предназначенной для привлечения финансирования в сектор FoodTech.</p>

      <h2>2. Какие данные мы собираем</h2>
      <h3>2.1 Данные, предоставляемые вами напрямую</h3>
      <ul>
        <li>Имя, фамилия, адрес электронной почты — при регистрации</li>
        <li>Документы, удостоверяющие личность (паспорт, ID) — в рамках процедуры KYC-верификации</li>
        <li>Информация об инвестициях: суммы, выбранные раунды, реквизиты платежей</li>
        <li>Реферальный код и информация о привлечённых партнёрах</li>
        <li>Переписка с нашей службой поддержки</li>
      </ul>

      <h3>2.2 Данные, собираемые автоматически</h3>
      <ul>
        <li>IP-адрес, тип браузера и операционная система</li>
        <li>Страницы, которые вы посещаете на платформе, и время визита</li>
        <li>Файлы cookie и аналогичные технологии отслеживания</li>
        <li>Данные о транзакциях и активности на платформе</li>
      </ul>

      <h2>3. Цели обработки данных</h2>
      <p>Мы обрабатываем ваши персональные данные в следующих целях:</p>
      <ul>
        <li>Создание и ведение вашего аккаунта на платформе</li>
        <li>Проведение верификации личности (KYC) в соответствии с требованиями законодательства</li>
        <li>Обработка инвестиционных заявок и платежей</li>
        <li>Направление уведомлений о новостях платформы, обновлениях раундов финансирования и статусе ваших инвестиций</li>
        <li>Обеспечение безопасности платформы и предотвращение мошенничества</li>
        <li>Выполнение требований применимого законодательства (AML, KYC)</li>
        <li>Улучшение качества наших услуг</li>
      </ul>

      <h2>4. Правовые основания обработки</h2>
      <ul>
        <li>Исполнение договора — обработка необходима для предоставления вам доступа к платформе и обработки инвестиций</li>
        <li>Законное обязательство — соблюдение требований AML/KYC</li>
        <li>Законный интерес — обеспечение безопасности платформы и предотвращение мошенничества</li>
        <li>Согласие — направление маркетинговых сообщений (вы можете отозвать согласие в любой момент)</li>
      </ul>

      <h2>5. Передача данных третьим лицам</h2>
      <p>Мы не продаём и не сдаём в аренду ваши персональные данные. Передача данных третьим лицам осуществляется только в следующих случаях:</p>
      <ul>
        <li><strong>Поставщики услуг KYC</strong> (в частности, Sumsub Inc.) — для верификации личности</li>
        <li><strong>Платёжные системы</strong> — для обработки транзакций</li>
        <li><strong>Облачные провайдеры</strong> (Supabase Inc.) — для хранения данных на защищённых серверах</li>
        <li><strong>Государственные органы</strong> — при наличии законного требования</li>
      </ul>
      <p>Все третьи лица обязаны соблюдать конфиденциальность ваших данных и использовать их исключительно в указанных целях.</p>

      <h2>6. Хранение данных</h2>
      <p>Мы храним ваши персональные данные в течение срока действия вашего аккаунта, а также в течение 5 лет после его закрытия — в целях выполнения требований законодательства о противодействии отмыванию денег. KYC-документы хранятся в соответствии с требованиями применимого законодательства (как правило, не менее 5 лет).</p>

      <h2>7. Ваши права</h2>
      <p>В зависимости от страны вашего проживания вы имеете следующие права:</p>
      <ul>
        <li>Право на доступ к вашим персональным данным</li>
        <li>Право на исправление неточных данных</li>
        <li>Право на удаление данных («право быть забытым») — если это не противоречит законодательным обязательствам</li>
        <li>Право на ограничение обработки</li>
        <li>Право на перенос данных</li>
        <li>Право на возражение против обработки в маркетинговых целях</li>
      </ul>
      <p>Для реализации своих прав обратитесь к нам по адресу: <a href="mailto:privacy@chefnet.ai">privacy@chefnet.ai</a>. Мы ответим в течение 30 дней.</p>

      <h2>8. Файлы cookie</h2>
      <p>Мы используем необходимые cookie для работы платформы (аутентификация, сессия) и аналитические cookie для улучшения сервиса. Вы можете управлять настройками cookie в параметрах вашего браузера.</p>

      <h2>9. Безопасность данных</h2>
      <p>Мы применяем технические и организационные меры для защиты ваших данных: шифрование данных в состоянии покоя и при передаче (TLS/SSL), ограниченный доступ к персональным данным на основе принципа минимальных привилегий, регулярный аудит безопасности.</p>

      <h2>10. Международная передача данных</h2>
      <p>Платформа работает из США. Если вы находитесь в ЕС или другом регионе с законодательством о защите данных, ваши данные могут передаваться в США. В этом случае мы обеспечиваем соответствующий уровень защиты в соответствии с применимым законодательством.</p>

      <h2>11. Изменения в Политике</h2>
      <p>Мы вправе обновлять настоящую Политику. При существенных изменениях мы уведомим вас по электронной почте или через уведомление на платформе не менее чем за 14 дней до вступления изменений в силу.</p>

      <h2>12. Контакты</h2>
      <div className="highlight">
        <p>По всем вопросам, связанным с обработкой ваших персональных данных:<br />
        <strong>ChefNet LLC</strong><br />
        The Green STE B, Dover, DE 19901, USA<br />
        Email: <a href="mailto:privacy@chefnet.ai">privacy@chefnet.ai</a><br />
        Общие вопросы: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a></p>
      </div>
    </div>
  );
}

function EnContent() {
  return (
    <div className="prose-legal">
      <div className="highlight">
        <p>This Privacy Policy describes how ChefNet LLC ("Company", "we", "us") collects, uses and protects the personal data of users of the ChefNet Invest platform available at chefnet.ai.</p>
      </div>

      <h2>1. Who We Are</h2>
      <p>ChefNet LLC is a company incorporated in the State of Delaware, USA (The Green STE B, Dover, DE 19901). We operate the ChefNet Invest investment platform designed to raise funding in the FoodTech sector.</p>

      <h2>2. Data We Collect</h2>
      <h3>2.1 Data you provide directly</h3>
      <ul>
        <li>First name, last name, email address — upon registration</li>
        <li>Identity documents (passport, ID) — as part of the KYC verification procedure</li>
        <li>Investment information: amounts, selected rounds, payment details</li>
        <li>Referral code and information about referred partners</li>
        <li>Correspondence with our support team</li>
      </ul>

      <h3>2.2 Data collected automatically</h3>
      <ul>
        <li>IP address, browser type and operating system</li>
        <li>Pages you visit on the platform and time of visit</li>
        <li>Cookies and similar tracking technologies</li>
        <li>Transaction and platform activity data</li>
      </ul>

      <h2>3. Purposes of Processing</h2>
      <ul>
        <li>Creating and maintaining your account on the platform</li>
        <li>Conducting identity verification (KYC) in accordance with legal requirements</li>
        <li>Processing investment applications and payments</li>
        <li>Sending notifications about platform news, funding round updates and your investment status</li>
        <li>Ensuring platform security and preventing fraud</li>
        <li>Compliance with applicable law (AML, KYC)</li>
        <li>Improving the quality of our services</li>
      </ul>

      <h2>4. Legal Basis for Processing</h2>
      <ul>
        <li>Performance of contract — processing is necessary to provide you access to the platform</li>
        <li>Legal obligation — compliance with AML/KYC requirements</li>
        <li>Legitimate interest — ensuring platform security and fraud prevention</li>
        <li>Consent — sending marketing communications (you may withdraw consent at any time)</li>
      </ul>

      <h2>5. Sharing with Third Parties</h2>
      <p>We do not sell or rent your personal data. Data is shared with third parties only in the following cases:</p>
      <ul>
        <li><strong>KYC service providers</strong> (including Sumsub Inc.) — for identity verification</li>
        <li><strong>Payment systems</strong> — for transaction processing</li>
        <li><strong>Cloud providers</strong> (Supabase Inc.) — for storage on secure servers</li>
        <li><strong>Government authorities</strong> — when required by law</li>
      </ul>

      <h2>6. Data Retention</h2>
      <p>We retain your personal data for the duration of your account and for 5 years after its closure to comply with anti-money laundering legislation. KYC documents are retained in accordance with applicable law requirements (generally no less than 5 years).</p>

      <h2>7. Your Rights</h2>
      <ul>
        <li>Right of access to your personal data</li>
        <li>Right to rectification of inaccurate data</li>
        <li>Right to erasure ("right to be forgotten") — where not contrary to legal obligations</li>
        <li>Right to restriction of processing</li>
        <li>Right to data portability</li>
        <li>Right to object to processing for marketing purposes</li>
      </ul>
      <p>To exercise your rights, contact us at: <a href="mailto:privacy@chefnet.ai">privacy@chefnet.ai</a>. We will respond within 30 days.</p>

      <h2>8. Cookies</h2>
      <p>We use necessary cookies for platform operation (authentication, session) and analytical cookies to improve the service. You can manage cookie settings in your browser preferences.</p>

      <h2>9. Data Security</h2>
      <p>We apply technical and organisational measures to protect your data: encryption at rest and in transit (TLS/SSL), limited access to personal data based on the principle of least privilege, regular security audits.</p>

      <h2>10. International Data Transfers</h2>
      <p>The platform operates from the USA. If you are located in the EU or another region with data protection legislation, your data may be transferred to the USA with appropriate safeguards in place.</p>

      <h2>11. Policy Changes</h2>
      <p>We may update this Policy. For material changes we will notify you by email or platform notification at least 14 days before the changes take effect.</p>

      <h2>12. Contact Us</h2>
      <div className="highlight">
        <p><strong>ChefNet LLC</strong><br />
        The Green STE B, Dover, DE 19901, USA<br />
        Email: <a href="mailto:privacy@chefnet.ai">privacy@chefnet.ai</a><br />
        General: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a></p>
      </div>
    </div>
  );
}
