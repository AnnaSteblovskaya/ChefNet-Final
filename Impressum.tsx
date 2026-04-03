import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Impressum() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Импрессум (правовая информация)"
      titleEn="Impressum (Legal Notice)"
      updatedRu="Последнее обновление: 3 апреля 2026 г."
      updatedEn="Last updated: April 3, 2026"
    >
      {isRu ? <RuContent /> : <EnContent />}
    </LegalLayout>
  );
}

function EnContent() {
  return (
    <div className="prose-legal">
      <h2>1. Company Information</h2>
      <p>
        <strong>Company Name:</strong> ChefNet LLC
      </p>
      <p>
        <strong>Legal Form:</strong> Limited Liability Company (LLC)
      </p>
      <p>
        <strong>Jurisdiction:</strong> State of Delaware, United States of America
      </p>
      <p>
        <strong>Registered Address:</strong> The Green STE B, Dover, DE 19901, USA
      </p>
      <p>
        <strong>Registration Number:</strong> Available upon request
      </p>

      <h2>2. Contact Information</h2>
      <p>
        <strong>Website:</strong> <a href="https://chefnet.ai">https://chefnet.ai</a>
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:legal@chefnet.ai">legal@chefnet.ai</a>
      </p>
      <p>
        <strong>Email (General Inquiries):</strong> <a href="mailto:contact@chefnet.ai">contact@chefnet.ai</a>
      </p>

      <h2>3. Responsible for Content</h2>
      <p>
        In accordance with Section 7, Paragraph 1 of the TMG (Telemediengesetz — Tele Media Act) and other applicable laws, the person responsible for the editorial content of this website is:
      </p>
      <p>
        <strong>ChefNet LLC</strong>
        <br />
        The Green STE B
        <br />
        Dover, DE 19901
        <br />
        USA
      </p>

      <h2>4. Managing Director / CEO</h2>
      <p>
        The management and executive responsibilities are held by the Managing Directors of ChefNet LLC, to be updated as per organizational changes.
      </p>
      <p>
        For specific contact regarding management matters, please contact legal@chefnet.ai.
      </p>

      <h2>5. EU Representative</h2>
      <p>
        In accordance with Article 27 of the General Data Protection Regulation (GDPR), ChefNet LLC maintains an EU Representative to handle data protection and privacy inquiries from European users.
      </p>
      <p>
        Details of the appointed EU Representative are available upon request and will be maintained in compliance with GDPR requirements.
      </p>

      <h2>6. Dispute Resolution</h2>
      <h3>Online Dispute Resolution (ODR)</h3>
      <p>
        The European Commission provides an Online Dispute Resolution (ODR) platform for resolving disputes between consumers and businesses online. The ODR platform is accessible at:
      </p>
      <p>
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>
        ChefNet LLC is willing to participate in alternative dispute resolution procedures and will comply with applicable consumer protection requirements.
      </p>

      <h2>7. Regulatory Notice and Disclaimer</h2>
      <p className="highlight">
        <strong>IMPORTANT NOTICE:</strong> ChefNet LLC is not a regulated financial institution, bank, investment adviser, or broker-dealer. The services and information provided through this website are not intended to constitute financial advice, investment recommendations, or offers to sell or solicitations to buy any securities.
      </p>
      <ul>
        <li>Investment in foodtech and related ventures carries substantial risk, including potential loss of capital</li>
        <li>Historical performance does not guarantee future results</li>
        <li>All investors must conduct their own due diligence and consult with licensed financial and legal advisors</li>
        <li>ChefNet LLC does not provide personalized financial or investment advice</li>
        <li>Users access this platform at their own risk and are responsible for understanding all associated risks</li>
      </ul>

      <h2>8. Intellectual Property Rights</h2>
      <p>
        All content, materials, design, logos, text, graphics, software, and other intellectual property on this website are owned by or licensed to ChefNet LLC. This includes, but is not limited to:
      </p>
      <ul>
        <li>Website design and layout</li>
        <li>Proprietary software and applications</li>
        <li>Brand names, logos, and trademarks</li>
        <li>Written content and documentation</li>
        <li>Images, photographs, and multimedia content</li>
        <li>Data compilations and databases</li>
      </ul>
      <p>
        Unauthorized reproduction, distribution, modification, or use of any content without prior written permission from ChefNet LLC is strictly prohibited and may result in legal action.
      </p>

      <h2>9. Limitation of Liability and Disclaimers</h2>
      <h3>Accuracy Disclaimer</h3>
      <p>
        While ChefNet LLC strives to maintain accurate and current information on this website, we make no warranties regarding the completeness, accuracy, or timeliness of any information presented. Information may be subject to change without notice.
      </p>
      <h3>No Liability for Third-Party Content</h3>
      <p>
        ChefNet LLC is not responsible for the accuracy, validity, or legality of external websites, links, or third-party content. Links to external sites are provided for convenience only and do not constitute endorsement.
      </p>
      <h3>Limited Liability</h3>
      <p>
        To the maximum extent permitted by law, ChefNet LLC and its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this website or reliance on its content, even if advised of the possibility of such damages.
      </p>

      <h2>10. Hosting Provider</h2>
      <p>
        <strong>Hosting Provider:</strong> DigitalOcean LLC
      </p>
      <p>
        <strong>Address:</strong> 101 Avenue of the Americas, New York, NY 10013, USA
      </p>
      <p>
        <strong>Website:</strong> <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer">https://www.digitalocean.com</a>
      </p>

      <h2>11. Applicable Law and Jurisdiction</h2>
      <p>
        This Impressum, the website, and all related terms and conditions shall be governed by and construed in accordance with the laws of the State of Delaware, USA, without regard to its conflict of law provisions.
      </p>
      <p>
        By accessing and using this website, you agree to submit to the exclusive jurisdiction of the courts located in Delaware, USA.
      </p>

      <h2>12. Changes to This Impressum</h2>
      <p>
        ChefNet LLC reserves the right to update or modify this Impressum at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following any modifications constitutes your acceptance of the updated Impressum.
      </p>

      <h2>13. Contact for Legal Matters</h2>
      <p>
        For questions regarding this Impressum, privacy policies, or other legal matters, please contact:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:legal@chefnet.ai">legal@chefnet.ai</a>
      </p>
      <p>
        <strong>Mailing Address:</strong>
        <br />
        ChefNet LLC
        <br />
        The Green STE B
        <br />
        Dover, DE 19901
        <br />
        USA
      </p>
    </div>
  );
}

function RuContent() {
  return (
    <div className="prose-legal">
      <h2>1. Информация о компании</h2>
      <p>
        <strong>Наименование компании:</strong> ChefNet LLC
      </p>
      <p>
        <strong>Организационно-правовая форма:</strong> Компания с ограниченной ответственностью (LLC)
      </p>
      <p>
        <strong>Юрисдикция:</strong> Штат Делавэр, Соединённые Штаты Америки
      </p>
      <p>
        <strong>Зарегистрированный адрес:</strong> The Green STE B, Dover, DE 19901, США
      </p>
      <p>
        <strong>Номер регистрации:</strong> Предоставляется по запросу
      </p>

      <h2>2. Контактная информация</h2>
      <p>
        <strong>Веб-сайт:</strong> <a href="https://chefnet.ai">https://chefnet.ai</a>
      </p>
      <p>
        <strong>Email (правовые вопросы):</strong> <a href="mailto:legal@chefnet.ai">legal@chefnet.ai</a>
      </p>
      <p>
        <strong>Email (основные запросы):</strong> <a href="mailto:contact@chefnet.ai">contact@chefnet.ai</a>
      </p>

      <h2>3. Ответственность за содержание</h2>
      <p>
        В соответствии с требованиями европейского законодательства о медиа и других применимых законов, лицо, ответственное за редакционное содержание этого веб-сайта:
      </p>
      <p>
        <strong>ChefNet LLC</strong>
        <br />
        The Green STE B
        <br />
        Dover, DE 19901
        <br />
        США
      </p>

      <h2>4. Генеральный директор / Управляющий директор</h2>
      <p>
        Управление и исполнительная ответственность осуществляются управляющими директорами ChefNet LLC в соответствии с изменениями в организационной структуре.
      </p>
      <p>
        Для вопросов, относящихся к управлению, просим обращаться на адрес legal@chefnet.ai.
      </p>

      <h2>5. Представитель в ЕС</h2>
      <p>
        В соответствии со статьей 27 Общего положения о защите данных (GDPR), ChefNet LLC поддерживает представителя в ЕС для рассмотрения запросов пользователей из Европы, касающихся защиты данных и конфиденциальности.
      </p>
      <p>
        Сведения об назначенном представителе в ЕС предоставляются по запросу и ведутся в соответствии с требованиями GDPR.
      </p>

      <h2>6. Разрешение споров</h2>
      <h3>Онлайн платформа разрешения споров (ODR)</h3>
      <p>
        Европейская комиссия предоставляет онлайн-платформу для разрешения споров между потребителями и компаниями в режиме онлайн. Платформа ODR доступна по адресу:
      </p>
      <p>
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>
        ChefNet LLC готова участвовать в процедурах альтернативного разрешения споров и будет соблюдать применимые требования защиты прав потребителей.
      </p>

      <h2>7. Регуляторное уведомление и отказ от ответственности</h2>
      <p className="highlight">
        <strong>ВАЖНОЕ УВЕДОМЛЕНИЕ:</strong> ChefNet LLC не является регулируемым финансовым учреждением, банком, инвестиционным консультантом или брокер-дилером. Услуги и информация, предоставляемые через этот веб-сайт, не предназначены для предоставления финансовых консультаций, инвестиционных рекомендаций или предложений по продаже или приглашений к покупке ценных бумаг.
      </p>
      <ul>
        <li>Инвестирование в пищевые технологии и смежные венчурные проекты связано со значительным риском, включая возможную потерю капитала</li>
        <li>Прошлые результаты не гарантируют будущих результатов</li>
        <li>Все инвесторы должны проводить собственное исследование и консультироваться с лицензированными финансовыми и юридическими консультантами</li>
        <li>ChefNet LLC не предоставляет персонализированные финансовые или инвестиционные консультации</li>
        <li>Пользователи получают доступ к этой платформе на свой собственный риск и несут ответственность за понимание всех связанных рисков</li>
      </ul>

      <h2>8. Права интеллектуальной собственности</h2>
      <p>
        Все содержимое, материалы, дизайн, логотипы, текст, графика, программное обеспечение и другая интеллектуальная собственность на этом веб-сайте принадлежат компании ChefNet LLC или лицензированы ей. Это включает, но не ограничивается:
      </p>
      <ul>
        <li>Дизайн и макет веб-сайта</li>
        <li>Собственное программное обеспечение и приложения</li>
        <li>Торговые марки, логотипы и товарные знаки</li>
        <li>Письменное содержимое и документация</li>
        <li>Изображения, фотографии и мультимедийное содержимое</li>
        <li>Сборки данных и базы данных</li>
      </ul>
      <p>
        Несанкционированное воспроизведение, распространение, изменение или использование любого содержимого без предварительного письменного разрешения ChefNet LLC строго запрещены и могут привести к судебному преследованию.
      </p>

      <h2>9. Ограничение ответственности и отказы от ответственности</h2>
      <h3>Отказ от гарантии точности</h3>
      <p>
        Хотя ChefNet LLC стремится поддерживать точную и актуальную информацию на этом веб-сайте, мы не даём никаких гарантий в отношении полноты, точности или своевременности любой информации, представленной здесь. Информация может быть изменена без уведомления.
      </p>
      <h3>Отсутствие ответственности за содержимое третьих лиц</h3>
      <p>
        ChefNet LLC не несёт ответственности за точность, действительность или законность внешних веб-сайтов, ссылок или содержимого третьих лиц. Ссылки на внешние сайты предоставляются только для удобства и не являются одобрением.
      </p>
      <h3>Ограниченная ответственность</h3>
      <p>
        В максимально допускаемой законом степени ChefNet LLC и его должностные лица, директора, сотрудники и агенты не несут ответственность за какие-либо косвенные, побочные, специальные, косвенные или штрафные убытки, вытекающие из вашего использования этого веб-сайта или полагания на его содержимое, даже если они были предупреждены о возможности таких убытков.
      </p>

      <h2>10. Поставщик хостинга</h2>
      <p>
        <strong>Поставщик хостинга:</strong> DigitalOcean LLC
      </p>
      <p>
        <strong>Адрес:</strong> 101 Avenue of the Americas, New York, NY 10013, США
      </p>
      <p>
        <strong>Веб-сайт:</strong> <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer">https://www.digitalocean.com</a>
      </p>

      <h2>11. Применимое право и юрисдикция</h2>
      <p>
        Данный Импрессум, веб-сайт и все связанные с ними условия регулируются законодательством штата Делавэр, США, без учёта его положений о конфликте законов.
      </p>
      <p>
        Получая доступ к этому веб-сайту и используя его, вы соглашаетесь с исключительной юрисдикцией судов, расположенных в Делавэре, США.
      </p>

      <h2>12. Изменения в Импрессуме</h2>
      <p>
        ChefNet LLC оставляет за собой право обновлять или изменять данный Импрессум в любой момент. Изменения вступают в силу немедленно после размещения на веб-сайте. Ваше продолжение использования веб-сайта после любых изменений означает ваше согласие с обновленным Импрессумом.
      </p>

      <h2>13. Контакт по правовым вопросам</h2>
      <p>
        По вопросам, касающимся данного Импрессума, политик конфиденциальности или других правовых вопросов, пожалуйста, свяжитесь:
      </p>
      <p>
        <strong>Email:</strong> <a href="mailto:legal@chefnet.ai">legal@chefnet.ai</a>
      </p>
      <p>
        <strong>Почтовый адрес:</strong>
        <br />
        ChefNet LLC
        <br />
        The Green STE B
        <br />
        Dover, DE 19901
        <br />
        США
      </p>
    </div>
  );
}
