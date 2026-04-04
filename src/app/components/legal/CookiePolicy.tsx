import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function CookiePolicy() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Политика в отношении файлов cookie"
      titleEn="Cookie Policy"
      updatedRu="Последнее обновление: 3 апреля 2026 г."
      updatedEn="Last updated: April 3, 2026"
    >
      {isRu ? <RuContent /> : <EnContent />}
    </LegalLayout>
  );
}

function RuContent() {
  return (
    <div className="prose-legal">
      <div className="highlight">
        <p>Настоящая Политика в отношении файлов cookie описывает, как ChefNet LLC («Компания», «мы», «нас») использует файлы cookie и аналогичные технологии отслеживания на платформе ChefNet Invest (chefnet.ai).</p>
      </div>

      <h2>1. Что такое файлы cookie</h2>
      <p>Файлы cookie — это небольшие текстовые файлы, которые веб-сайты сохраняют на вашем компьютере, планшете или мобильном устройстве при посещении сайта. Cookie содержат информацию, которая может быть прочитана веб-сайтом при каждом последующем визите. Они помогают улучшить вашу работу с платформой, сохраняя учётные данные, предпочтения и другую информацию.</p>
      <p>Аналогичные технологии включают веб-маяки (пиксели отслеживания), локальное хранилище браузера и аналогичные устройства отслеживания.</p>

      <h2>2. Типы файлов cookie, которые мы используем</h2>

      <h3>2.1 Строго необходимые файлы cookie</h3>
      <p>Эти файлы cookie необходимы для функционирования платформы и не требуют вашего согласия в соответствии с законодательством о защите данных.</p>
      <ul>
        <li><strong>chefnet-session</strong> — идентификатор сеанса для поддержания вашего подключения к платформе</li>
        <li><strong>chefnet-auth</strong> — хранит токен аутентификации для проверки вашей личности</li>
        <li><strong>chefnet-csrf</strong> — защита от атак CSRF (подделка запроса между сайтами)</li>
        <li><strong>chefnet-cookie-consent</strong> — сохраняет ваши предпочтения в отношении использования cookie</li>
        <li><strong>chefnet-language</strong> — сохраняет выбранный вами язык (русский или английский)</li>
        <li><strong>chefnet-theme</strong> — сохраняет ваши предпочтения по теме оформления (светлая/тёмная тема)</li>
      </ul>

      <h3>2.2 Аналитические файлы cookie</h3>
      <p>Эти файлы cookie помогают нам понять, как пользователи используют нашу платформу, включая информацию о наиболее посещаемых страницах, времени, проведённом на платформе, и ошибках, которые пользователи встречают. Требуется ваше согласие на использование этих файлов cookie.</p>
      <ul>
        <li><strong>Google Analytics</strong> — отслеживание активности пользователей для анализа и оптимизации платформы (идентификаторы сеанса и пользователей)</li>
      </ul>

      <h3>2.3 Маркетинговые и рекламные файлы cookie</h3>
      <p>Эти файлы cookie используются для отслеживания интереса пользователей к нашим услугам и отображения персонализированной рекламы. Требуется ваше согласие на использование этих файлов cookie.</p>
      <ul>
        <li><strong>Google Ads</strong> — отслеживание конверсий и ремаркетинг</li>
        <li><strong>Facebook Pixel</strong> — отслеживание пользователей для целей маркетинга на Facebook (если применимо)</li>
      </ul>

      <h3>2.4 Функциональные файлы cookie</h3>
      <p>Эти файлы cookie помогают платформе запомнить ваши выборы и предпочтения для улучшения опыта использования.</p>
      <ul>
        <li><strong>chefnet-preferences</strong> — пользовательские предпочтения (размер шрифта, разметка и другие)</li>
        <li><strong>chefnet-recent-searches</strong> — сохранение недавних поисков пользователя</li>
      </ul>

      <h2>3. Файлы cookie третьих лиц</h2>
      <p>Мы используем услуги третьих лиц на нашей платформе. Эти компании могут устанавливать свои собственные файлы cookie:</p>

      <h3>3.1 Supabase (аутентификация и хранение данных)</h3>
      <p>Мы используем Supabase для управления аутентификацией и хранения данных. Supabase может использовать файлы cookie для управления вашей сессией и аутентификацией. Дополнительная информация доступна в <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Политике конфиденциальности Supabase</a>.</p>

      <h3>3.2 Sumsub (верификация личности KYC)</h3>
      <p>Мы используем Sumsub для проверки личности и выполнения требований KYC. Sumsub может использовать файлы cookie и отслеживающие технологии для обеспечения безопасности процесса верификации. Дополнительная информация доступна в <a href="https://sumsub.com/privacy/" target="_blank" rel="noopener noreferrer">Политике конфиденциальности Sumsub</a>.</p>

      <h3>3.3 Google reCAPTCHA</h3>
      <p>Мы используем Google reCAPTCHA для защиты нашей платформы от автоматизированных атак. Google может использовать файлы cookie для анализа поведения пользователей и определения того, являетесь ли вы человеком или ботом. Дополнительная информация доступна в <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Политике конфиденциальности Google</a>.</p>

      <h2>4. Сроки хранения файлов cookie</h2>

      <h3>4.1 Файлы cookie сеанса</h3>
      <p>Эти файлы cookie удаляются автоматически при закрытии браузера.</p>

      <h3>4.2 Постоянные файлы cookie</h3>
      <p>Эти файлы cookie остаются на вашем устройстве в течение определённого периода времени:</p>
      <ul>
        <li><strong>Согласие на использование cookie</strong> — 6 месяцев с даты последнего обновления</li>
        <li><strong>Предпочтения языка и темы</strong> — 1 год</li>
        <li><strong>Аналитические cookie Google Analytics</strong> — 2 года</li>
        <li><strong>Маркетинговые cookie</strong> — до 1 года</li>
      </ul>

      <h2>5. Как управлять файлами cookie</h2>

      <h3>5.1 Управление через наш баннер согласия</h3>
      <p>При первом посещении платформы вам будет предоставлен баннер согласия cookie. Вы можете принять все файлы cookie, отклонить нежелательные файлы cookie или настроить свои предпочтения. Вы можете изменить свои выборы в любое время через меню «Управление согласием» в футере сайта.</p>

      <h3>5.2 Управление через параметры браузера</h3>
      <p>Вы можете управлять файлами cookie через параметры вашего браузера:</p>
      <ul>
        <li><strong>Google Chrome</strong> — Параметры > Конфиденциальность и безопасность > Файлы cookie и другие данные сайтов</li>
        <li><strong>Mozilla Firefox</strong> — Параметры > Конфиденциальность и безопасность > Файлы cookie и данные сайта</li>
        <li><strong>Apple Safari</strong> — Параметры > Конфиденциальность > Управление данными веб-сайта</li>
        <li><strong>Microsoft Edge</strong> — Параметры > Конфиденциальность, поиск и услуги > Управление данными</li>
      </ul>
      <p>Вы можете удалить все существующие файлы cookie и заблокировать браузер от сохранения будущих файлов cookie. Однако это может повлиять на функциональность платформы.</p>

      <h3>5.3 Отказ от файлов cookie аналитики</h3>
      <p>Если вы не хотите, чтобы ваша активность анализировалась Google Analytics, вы можете установить <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">расширение браузера отказа от Google Analytics</a>.</p>

      <h2>6. GDPR и соответствие нормативно-правовым требованиям</h2>

      <h3>6.1 Модель согласия (Opt-In)</h3>
      <p>Мы применяем модель согласия на основе явного отказа для всех файлов cookie, не являющихся необходимыми. Это означает:</p>
      <ul>
        <li>Строго необходимые файлы cookie используются автоматически и не требуют согласия</li>
        <li>Аналитические, маркетинговые и функциональные файлы cookie требуют вашего явного согласия перед использованием</li>
        <li>Вы можете отозвать согласие в любое время</li>
        <li>Отказ от согласия не должен препятствовать использованию платформы (за исключением функций, которые напрямую зависят от согласия)</li>
      </ul>

      <h3>6.2 Соответствие GDPR и ePrivacy Directive</h3>
      <p>Наш подход к использованию файлов cookie соответствует требованиям Общего регламента по защите данных (GDPR) Европейского Союза и Директивы об электронной конфиденциальности. Мы также соблюдаем требования законодательства о защите данных других юрисдикций.</p>

      <h2>7. Третьи лица и их согласие</h2>
      <p>Некоторые файлы cookie устанавливаются компаниями, которые работают от нашего имени или у которых есть собственный интерес в использовании ваших данных для маркетинга или аналитики. Эти компании имеют свои собственные политики в отношении файлов cookie и конфиденциальности, за которые мы не несём ответственности. Рекомендуем вам ознакомиться с их политиками конфиденциальности.</p>

      <h2>8. Изменения в Политике</h2>
      <p>Мы вправе обновлять настоящую Политику в отношении файлов cookie. При существенных изменениях мы уведомим вас по электронной почте или через уведомление на платформе не менее чем за 14 дней до вступления изменений в силу.</p>

      <h2>9. Связь с Политикой конфиденциальности</h2>
      <p>Для более полной информации о том, как мы собираем, используем и защищаем ваши персональные данные, пожалуйста, см. нашу <a href="/privacy">Политику конфиденциальности</a>.</p>

      <h2>10. Контакты</h2>
      <div className="highlight">
        <p>По всем вопросам, связанным с использованием файлов cookie на платформе ChefNet Invest:<br />
        <strong>ChefNet LLC</strong><br />
        The Green STE B, Dover, DE 19901, USA<br />
        Email: <a href="mailto:legal@chefnet.ai">legal@chefnet.ai</a><br />
        Поддержка: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a></p>
      </div>
    </div>
  );
}

function EnContent() {
  return (
    <div className="prose-legal">
      <div className="highlight">
        <p>This Cookie Policy explains how ChefNet LLC ("Company", "we", "us") uses cookies and similar tracking technologies on the ChefNet Invest platform (chefnet.ai).</p>
      </div>

      <h2>1. What Are Cookies</h2>
      <p>Cookies are small text files that websites store on your computer, tablet or mobile device when you visit. Cookies contain information that can be read by the website on each subsequent visit. They help improve your experience on the platform by saving credentials, preferences and other information.</p>
      <p>Similar technologies include web beacons (tracking pixels), local browser storage and similar tracking devices.</p>

      <h2>2. Types of Cookies We Use</h2>

      <h3>2.1 Strictly Necessary Cookies</h3>
      <p>These cookies are essential for the platform to function and do not require your consent under data protection laws.</p>
      <ul>
        <li><strong>chefnet-session</strong> — session identifier to maintain your connection to the platform</li>
        <li><strong>chefnet-auth</strong> — stores your authentication token to verify your identity</li>
        <li><strong>chefnet-csrf</strong> — protection against CSRF attacks (cross-site request forgery)</li>
        <li><strong>chefnet-cookie-consent</strong> — saves your cookie preferences and consent choices</li>
        <li><strong>chefnet-language</strong> — stores your selected language (Russian or English)</li>
        <li><strong>chefnet-theme</strong> — stores your theme preferences (light/dark mode)</li>
      </ul>

      <h3>2.2 Analytics Cookies</h3>
      <p>These cookies help us understand how users interact with our platform, including information about the most visited pages, time spent on the platform, and errors that users encounter. Your consent is required to use these cookies.</p>
      <ul>
        <li><strong>Google Analytics</strong> — tracking user activity for analysis and platform optimization (session and user identifiers)</li>
      </ul>

      <h3>2.3 Marketing and Advertising Cookies</h3>
      <p>These cookies are used to track user interest in our services and display personalised advertising. Your consent is required to use these cookies.</p>
      <ul>
        <li><strong>Google Ads</strong> — conversion tracking and remarketing</li>
        <li><strong>Facebook Pixel</strong> — tracking users for marketing purposes on Facebook (if applicable)</li>
      </ul>

      <h3>2.4 Functional Cookies</h3>
      <p>These cookies help the platform remember your choices and preferences to improve your user experience.</p>
      <ul>
        <li><strong>chefnet-preferences</strong> — user preferences (font size, layout and others)</li>
        <li><strong>chefnet-recent-searches</strong> — storing user's recent searches</li>
      </ul>

      <h2>3. Third-Party Cookies</h2>
      <p>We use third-party services on our platform. These companies may set their own cookies:</p>

      <h3>3.1 Supabase (Authentication and Data Storage)</h3>
      <p>We use Supabase to manage authentication and data storage. Supabase may use cookies to manage your session and authentication. Additional information is available in the <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase Privacy Policy</a>.</p>

      <h3>3.2 Sumsub (KYC Identity Verification)</h3>
      <p>We use Sumsub for identity verification and KYC compliance. Sumsub may use cookies and tracking technologies to ensure the security of the verification process. Additional information is available in the <a href="https://sumsub.com/privacy/" target="_blank" rel="noopener noreferrer">Sumsub Privacy Policy</a>.</p>

      <h3>3.3 Google reCAPTCHA</h3>
      <p>We use Google reCAPTCHA to protect our platform from automated attacks. Google may use cookies to analyse user behaviour and determine whether you are human or a bot. Additional information is available in the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</p>

      <h2>4. Cookie Duration</h2>

      <h3>4.1 Session Cookies</h3>
      <p>These cookies are automatically deleted when you close your browser.</p>

      <h3>4.2 Persistent Cookies</h3>
      <p>These cookies remain on your device for a specified period of time:</p>
      <ul>
        <li><strong>Cookie consent</strong> — 6 months from the date of last update</li>
        <li><strong>Language and theme preferences</strong> — 1 year</li>
        <li><strong>Google Analytics cookies</strong> — 2 years</li>
        <li><strong>Marketing cookies</strong> — up to 1 year</li>
      </ul>

      <h2>5. How to Manage Cookies</h2>

      <h3>5.1 Managing Through Our Consent Banner</h3>
      <p>When you first visit the platform, you will be presented with a cookie consent banner. You can accept all cookies, reject unwanted cookies or customise your preferences. You can change your choices at any time through the "Manage Consent" menu in the site footer.</p>

      <h3>5.2 Managing Through Browser Settings</h3>
      <p>You can manage cookies through your browser settings:</p>
      <ul>
        <li><strong>Google Chrome</strong> — Settings > Privacy and Security > Cookies and other site data</li>
        <li><strong>Mozilla Firefox</strong> — Settings > Privacy & Security > Cookies and Site Data</li>
        <li><strong>Apple Safari</strong> — Preferences > Privacy > Manage Website Data</li>
        <li><strong>Microsoft Edge</strong> — Settings > Privacy, search, and services > Manage data</li>
      </ul>
      <p>You can delete all existing cookies and block your browser from saving future cookies. However, this may affect the functionality of the platform.</p>

      <h3>5.3 Opting Out of Analytics Cookies</h3>
      <p>If you do not want your activity to be analysed by Google Analytics, you can install the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Extension</a>.</p>

      <h2>6. GDPR and Regulatory Compliance</h2>

      <h3>6.1 Consent Model (Opt-In)</h3>
      <p>We apply an explicit opt-in consent model for all non-essential cookies. This means:</p>
      <ul>
        <li>Strictly necessary cookies are used automatically and do not require consent</li>
        <li>Analytics, marketing and functional cookies require your explicit consent before use</li>
        <li>You can withdraw your consent at any time</li>
        <li>Refusing consent should not prevent you from using the platform (except for features that directly depend on consent)</li>
      </ul>

      <h3>6.2 GDPR and ePrivacy Directive Compliance</h3>
      <p>Our approach to cookie usage complies with the requirements of the European Union's General Data Protection Regulation (GDPR) and the ePrivacy Directive. We also comply with data protection legislation requirements in other jurisdictions.</p>

      <h2>7. Third Parties and Their Consent</h2>
      <p>Some cookies are set by companies that work on our behalf or that have their own interest in using your data for marketing or analytics. These companies have their own cookie and privacy policies for which we are not responsible. We recommend that you review their privacy policies.</p>

      <h2>8. Changes to This Policy</h2>
      <p>We may update this Cookie Policy. For material changes we will notify you by email or platform notification at least 14 days before the changes take effect.</p>

      <h2>9. Link to Our Privacy Policy</h2>
      <p>For more comprehensive information about how we collect, use and protect your personal data, please see our <a href="/privacy">Privacy Policy</a>.</p>

      <h2>10. Contact Us</h2>
      <div className="highlight">
        <p><strong>ChefNet LLC</strong><br />
        The Green STE B, Dover, DE 19901, USA<br />
        Email: <a href="mailto:legal@chefnet.ai">legal@chefnet.ai</a><br />
        Support: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a></p>
      </div>
    </div>
  );
}
