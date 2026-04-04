import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Impressum() {
  const { language } = useLanguage();

  const content = language === 'de' ? <DeContent /> : language === 'ru' ? <RuContent /> : <EnContent />;

  return (
    <LegalLayout
      titleRu="Импрессум (правовая информация)"
      titleEn={language === 'de' ? 'Impressum' : 'Impressum (Legal Notice)'}
      updatedRu="Последнее обновление: 4 апреля 2026 г."
      updatedEn={language === 'de' ? 'Stand: 4. April 2026' : 'Last updated: April 4, 2026'}
    >
      {content}
    </LegalLayout>
  );
}

/* ─── German (original legal language) ─── */
function DeContent() {
  return (
    <div className="prose-legal">
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>
        <strong>ChefNet LLC</strong>
      </p>
      <p>
        <strong>Vertreten durch:</strong>
        <br />
        Dmitry Vaganov
      </p>

      <h2>Geschäftsanschrift</h2>
      <p>
        ChefNet LLC
        <br />
        8 The Green, Suite B
        <br />
        Dover, DE 19901
        <br />
        USA
      </p>

      <h2>Kontakt</h2>
      <p>
        <strong>E-Mail:</strong>{' '}
        <a href="mailto:support@chefnet.ai">support@chefnet.ai</a>
      </p>
      <p>
        <strong>Telefon:</strong>{' '}
        <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>Registereintrag</h2>
      <p>
        Registriert im Staat Delaware, USA
        <br />
        <strong>File Number:</strong> 10324019
      </p>

      <h2>Steuerangaben</h2>
      <p>
        <strong>EIN:</strong> 39-4294489
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        Dmitry Vaganov
        <br />
        ChefNet LLC
        <br />
        8 The Green, Suite B
        <br />
        Dover, DE 19901
        <br />
        USA
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
      </p>

      <h2>Hinweis gemäß § 36 VSBG</h2>
      <p>
        Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftungsausschluss</h2>
      <p className="highlight">
        <strong>WICHTIGER HINWEIS:</strong> ChefNet LLC ist kein reguliertes Finanzinstitut, keine Bank, kein Anlageberater und kein Broker-Dealer. Die über diese Website bereitgestellten Dienste und Informationen stellen keine Finanzberatung, Anlageempfehlungen oder Angebote zum Kauf oder Verkauf von Wertpapieren dar.
      </p>

      <h2>Hosting</h2>
      <p>
        <strong>Hosting-Anbieter:</strong> DigitalOcean LLC
        <br />
        101 Avenue of the Americas, New York, NY 10013, USA
        <br />
        <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer">
          https://www.digitalocean.com
        </a>
      </p>
    </div>
  );
}

/* ─── English ─── */
function EnContent() {
  return (
    <div className="prose-legal">
      <h2>1. Company Information (pursuant to § 5 DDG)</h2>
      <p>
        <strong>Company Name:</strong> ChefNet LLC
      </p>
      <p>
        <strong>Represented by:</strong> Dmitry Vaganov
      </p>
      <p>
        <strong>Legal Form:</strong> Limited Liability Company (LLC)
      </p>
      <p>
        <strong>Jurisdiction:</strong> State of Delaware, United States of America
      </p>
      <p>
        <strong>Registered Address:</strong> 8 The Green, Suite B, Dover, DE 19901, USA
      </p>
      <p>
        <strong>File Number:</strong> 10324019
      </p>
      <p>
        <strong>EIN:</strong> 39-4294489
      </p>

      <h2>2. Contact Information</h2>
      <p>
        <strong>Website:</strong> <a href="https://chefnet.ai">https://chefnet.ai</a>
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <a href="mailto:support@chefnet.ai">support@chefnet.ai</a>
      </p>
      <p>
        <strong>Phone:</strong>{' '}
        <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>3. Responsible for Content (§ 18 para. 2 MStV)</h2>
      <p>
        Dmitry Vaganov
        <br />
        ChefNet LLC
        <br />
        8 The Green, Suite B
        <br />
        Dover, DE 19901
        <br />
        USA
      </p>

      <h2>4. Dispute Resolution</h2>
      <p>
        The European Commission provides an Online Dispute Resolution (ODR) platform:{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>
        <strong>Notice pursuant to § 36 VSBG:</strong> We are not obligated and not willing to participate in dispute resolution proceedings before a consumer arbitration board.
      </p>

      <h2>5. Regulatory Notice and Disclaimer</h2>
      <p className="highlight">
        <strong>IMPORTANT NOTICE:</strong> ChefNet LLC is not a regulated financial institution, bank, investment adviser, or broker-dealer. The services and information provided through this website do not constitute financial advice, investment recommendations, or offers to sell or solicitations to buy any securities.
      </p>
      <ul>
        <li>Investment in foodtech and related ventures carries substantial risk, including potential loss of capital</li>
        <li>Historical performance does not guarantee future results</li>
        <li>All investors must conduct their own due diligence and consult with licensed financial and legal advisors</li>
      </ul>

      <h2>6. Intellectual Property Rights</h2>
      <p>
        All content, materials, design, logos, text, graphics, software, and other intellectual property on this website are owned by or licensed to ChefNet LLC. Unauthorized reproduction, distribution, modification, or use without prior written permission is strictly prohibited.
      </p>

      <h2>7. Limitation of Liability</h2>
      <p>
        While ChefNet LLC strives to maintain accurate and current information, we make no warranties regarding the completeness, accuracy, or timeliness of any information presented. To the maximum extent permitted by law, ChefNet LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of this website.
      </p>
      <p>
        ChefNet LLC is not responsible for the content of external websites. Links to external sites are provided for convenience and do not constitute endorsement.
      </p>

      <h2>8. Hosting Provider</h2>
      <p>
        <strong>Provider:</strong> DigitalOcean LLC
        <br />
        101 Avenue of the Americas, New York, NY 10013, USA
        <br />
        <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer">
          https://www.digitalocean.com
        </a>
      </p>

      <h2>9. Applicable Law</h2>
      <p>
        This Impressum and all related terms shall be governed by the laws of the State of Delaware, USA, without regard to conflict of law provisions.
      </p>
    </div>
  );
}

/* ─── Russian ─── */
function RuContent() {
  return (
    <div className="prose-legal">
      <h2>1. Информация о компании (согласно § 5 DDG)</h2>
      <p>
        <strong>Наименование:</strong> ChefNet LLC
      </p>
      <p>
        <strong>Представитель:</strong> Дмитрий Ваганов (Dmitry Vaganov)
      </p>
      <p>
        <strong>Форма:</strong> Limited Liability Company (LLC)
      </p>
      <p>
        <strong>Юрисдикция:</strong> Штат Делавэр, США
      </p>
      <p>
        <strong>Юридический адрес:</strong> 8 The Green, Suite B, Dover, DE 19901, USA
      </p>
      <p>
        <strong>File Number:</strong> 10324019
      </p>
      <p>
        <strong>EIN:</strong> 39-4294489
      </p>

      <h2>2. Контактная информация</h2>
      <p>
        <strong>Веб-сайт:</strong> <a href="https://chefnet.ai">https://chefnet.ai</a>
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <a href="mailto:support@chefnet.ai">support@chefnet.ai</a>
      </p>
      <p>
        <strong>Телефон:</strong>{' '}
        <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>3. Ответственный за содержание (§ 18 абз. 2 MStV)</h2>
      <p>
        Дмитрий Ваганов (Dmitry Vaganov)
        <br />
        ChefNet LLC
        <br />
        8 The Green, Suite B
        <br />
        Dover, DE 19901
        <br />
        USA
      </p>

      <h2>4. Разрешение споров</h2>
      <p>
        Европейская комиссия предоставляет платформу для онлайн-разрешения споров (ODR):{' '}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr
        </a>
      </p>
      <p>
        <strong>Уведомление в соответствии с § 36 VSBG:</strong> Мы не обязаны и не готовы участвовать в процедурах разрешения споров перед потребительской арбитражной комиссией.
      </p>

      <h2>5. Регуляторное уведомление и отказ от ответственности</h2>
      <p className="highlight">
        <strong>ВАЖНОЕ УВЕДОМЛЕНИЕ:</strong> ChefNet LLC не является регулируемым финансовым учреждением, банком, инвестиционным консультантом или брокер-дилером. Услуги и информация на этом веб-сайте не являются финансовыми рекомендациями или предложениями по покупке/продаже ценных бумаг.
      </p>
      <ul>
        <li>Инвестиции в FoodTech связаны со значительным риском, включая возможную потерю капитала</li>
        <li>Прошлые результаты не гарантируют будущих</li>
        <li>Все инвесторы должны проводить собственную проверку и консультироваться с лицензированными специалистами</li>
      </ul>

      <h2>6. Права интеллектуальной собственности</h2>
      <p>
        Все материалы, дизайн, логотипы, тексты, графика и программное обеспечение на этом веб-сайте принадлежат ChefNet LLC или лицензированы ей. Несанкционированное воспроизведение или распространение без письменного разрешения запрещено.
      </p>

      <h2>7. Ограничение ответственности</h2>
      <p>
        ChefNet LLC стремится поддерживать точную и актуальную информацию, но не даёт гарантий полноты, точности или своевременности. В максимально допустимой законом степени ChefNet LLC не несёт ответственности за косвенные, побочные или штрафные убытки.
      </p>
      <p>
        ChefNet LLC не несёт ответственности за содержимое внешних веб-сайтов. Ссылки на внешние сайты предоставляются для удобства.
      </p>

      <h2>8. Поставщик хостинга</h2>
      <p>
        <strong>Провайдер:</strong> DigitalOcean LLC
        <br />
        101 Avenue of the Americas, New York, NY 10013, USA
        <br />
        <a href="https://www.digitalocean.com" target="_blank" rel="noopener noreferrer">
          https://www.digitalocean.com
        </a>
      </p>

      <h2>9. Применимое право</h2>
      <p>
        Данный Импрессум и все связанные условия регулируются законодательством штата Делавэр, США.
      </p>
    </div>
  );
}
