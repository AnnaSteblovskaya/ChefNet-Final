import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Datenschutz() {
  const { language } = useLanguage();

  const content = language === 'de' ? <DeContent /> : language === 'ru' ? <RuContent /> : <EnContent />;

  return (
    <LegalLayout
      titleRu="Политика конфиденциальности (DSGVO)"
      titleEn={language === 'de' ? 'Datenschutzerklärung' : 'Privacy Policy (GDPR)'}
      updatedRu="Последнее обновление: 4 апреля 2026 г."
      updatedEn={language === 'de' ? 'Stand: 4. April 2026' : 'Last updated: April 4, 2026'}
    >
      {content}
    </LegalLayout>
  );
}

/* ─── German (original) ─── */
function DeContent() {
  return (
    <div className="prose-legal">
      <h2>1. Verantwortlicher</h2>
      <p>
        ChefNet LLC
        <br />
        8 The Green, Suite B
        <br />
        Dover, DE 19901
        <br />
        USA
      </p>
      <p>
        <strong>Vertreten durch:</strong> Dmitry Vaganov
      </p>
      <p>
        <strong>E-Mail:</strong>{' '}
        <a href="mailto:support@chefnet.ai">support@chefnet.ai</a>
        <br />
        <strong>Telefon:</strong>{' '}
        <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>2. Allgemeine Hinweise zur Datenverarbeitung</h2>
      <p>
        Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten ausschließlich im Rahmen der geltenden datenschutzrechtlichen Vorschriften, insbesondere der Datenschutz-Grundverordnung (DSGVO).
      </p>
      <p>
        Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
      </p>

      <h2>3. Datenverarbeitung beim Besuch der Website</h2>
      <p>
        Beim Aufrufen unserer Website werden durch den Hosting-Provider technisch erforderliche Informationen automatisch erfasst. Dies sind insbesondere:
      </p>
      <ul>
        <li>IP-Adresse</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite / Datei</li>
        <li>Referrer-URL</li>
        <li>Browsertyp und Browserversion</li>
        <li>verwendetes Betriebssystem</li>
        <li>Hostname des zugreifenden Rechners</li>
      </ul>
      <p>
        Die Verarbeitung erfolgt zur Bereitstellung der Website, zur Gewährleistung der Systemsicherheit und -stabilität sowie zur technischen Administration.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der sicheren, stabilen und technisch fehlerfreien Bereitstellung unseres Online-Angebots.
      </p>

      <h2>4. Kontaktaufnahme</h2>
      <p>
        Wenn Sie uns per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten (z. B. Name, E-Mail-Adresse, Telefonnummer, Inhalt der Nachricht), um Ihre Anfrage zu bearbeiten.
      </p>
      <p>
        Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung vorvertraglicher Maßnahmen oder zur Vertragserfüllung erforderlich ist, sowie Art. 6 Abs. 1 lit. f DSGVO bei sonstigen Anfragen. Unser berechtigtes Interesse liegt in der effizienten Bearbeitung eingehender Anfragen.
      </p>

      <h2>5. Empfänger von Daten</h2>
      <p>
        Empfänger Ihrer personenbezogenen Daten können technische Dienstleister sein, die wir zum Betrieb unserer Website und Kommunikationssysteme einsetzen, insbesondere Hosting- und IT-Dienstleister, soweit dies zur Bereitstellung unseres Angebots erforderlich ist.
      </p>
      <p>
        Eine Weitergabe erfolgt nur, soweit dies rechtlich zulässig ist.
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie dies für die jeweiligen Verarbeitungszwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.
      </p>
      <p>
        Daten aus Anfragen speichern wir grundsätzlich nur so lange, wie dies zur Bearbeitung und abschließenden Kommunikation erforderlich ist, sofern keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
      </p>
      <p>
        Server-Logfiles werden für einen begrenzten Zeitraum gespeichert, soweit dies technisch und sicherheitsbezogen erforderlich ist.
      </p>

      <h2>7. Cookies und ähnliche Technologien</h2>
      <p>
        Unsere Website kann technisch notwendige Cookies oder ähnliche Technologien verwenden, soweit dies für den sicheren und funktionsfähigen Betrieb der Website erforderlich ist.
      </p>
      <p>
        Soweit darüber hinaus Informationen in Ihrer Endeinrichtung gespeichert oder ausgelesen werden, erfolgt dies nur auf Grundlage einer gesetzlichen Erlaubnis oder Ihrer Einwilligung.
      </p>

      <h2>8. Ihre Rechte</h2>
      <p>Sie haben nach Maßgabe der gesetzlichen Vorschriften folgende Rechte:</p>
      <ul>
        <li>Recht auf Auskunft über die von uns verarbeiteten personenbezogenen Daten</li>
        <li>Recht auf Berichtigung unrichtiger Daten</li>
        <li>Recht auf Löschung</li>
        <li>Recht auf Einschränkung der Verarbeitung</li>
        <li>Recht auf Datenübertragbarkeit</li>
        <li>Recht auf Widerspruch gegen Verarbeitungen, die auf Art. 6 Abs. 1 lit. f DSGVO beruhen</li>
        <li>Recht auf Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft</li>
      </ul>

      <h2>9. Beschwerderecht bei einer Aufsichtsbehörde</h2>
      <p>
        Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren.
      </p>

      <h2>10. Pflicht zur Bereitstellung von Daten</h2>
      <p>
        Die Bereitstellung personenbezogener Daten ist grundsätzlich weder gesetzlich noch vertraglich vorgeschrieben. Ohne bestimmte Daten können wir Ihre Anfrage jedoch gegebenenfalls nicht bearbeiten.
      </p>

      <h2>11. Automatisierte Entscheidungsfindung</h2>
      <p>
        Eine automatisierte Entscheidungsfindung einschließlich Profiling im Sinne des Art. 22 DSGVO findet über diese Website nicht statt.
      </p>

      <h2>12. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung bei Bedarf anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen auf der Website umzusetzen.
      </p>
    </div>
  );
}

/* ─── English ─── */
function EnContent() {
  return (
    <div className="prose-legal">
      <h2>1. Data Controller</h2>
      <p>
        ChefNet LLC
        <br />
        8 The Green, Suite B
        <br />
        Dover, DE 19901, USA
      </p>
      <p>
        <strong>Represented by:</strong> Dmitry Vaganov
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <a href="mailto:support@chefnet.ai">support@chefnet.ai</a>
        <br />
        <strong>Phone:</strong>{' '}
        <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>2. General Information on Data Processing</h2>
      <p>
        The protection of your personal data is important to us. We process personal data exclusively in accordance with applicable data protection regulations, in particular the General Data Protection Regulation (GDPR).
      </p>
      <p>
        Personal data is any data that can be used to personally identify you.
      </p>

      <h2>3. Data Processing When Visiting the Website</h2>
      <p>
        When you access our website, technically required information is automatically collected by the hosting provider, including: IP address, date and time of access, page/file accessed, referrer URL, browser type and version, operating system, and hostname of the accessing device.
      </p>
      <p>
        This processing is carried out to provide the website, ensure system security and stability, and for technical administration. The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest lies in the secure, stable, and technically error-free provision of our online offering.
      </p>

      <h2>4. Contact</h2>
      <p>
        When you contact us by email or telephone, we process the data you provide (e.g., name, email address, phone number, content of the message) to handle your inquiry.
      </p>
      <p>
        The legal basis is Art. 6(1)(b) GDPR insofar as the processing is necessary for the performance of pre-contractual measures or contract fulfillment, and Art. 6(1)(f) GDPR for other inquiries.
      </p>

      <h2>5. Data Recipients</h2>
      <p>
        Recipients of your personal data may include technical service providers that we use to operate our website and communication systems, in particular hosting and IT service providers, insofar as this is necessary to provide our services. Data is only shared to the extent legally permissible.
      </p>

      <h2>6. Storage Duration</h2>
      <p>
        We store personal data only as long as necessary for the respective processing purposes or as required by statutory retention obligations. Server log files are stored for a limited period insofar as technically and security-related necessary.
      </p>

      <h2>7. Cookies and Similar Technologies</h2>
      <p>
        Our website may use technically necessary cookies or similar technologies insofar as this is required for the secure and functional operation of the website. Insofar as information is stored or read on your device beyond this, this is done only on the basis of a legal permission or your consent.
      </p>

      <h2>8. Your Rights</h2>
      <p>In accordance with the applicable legal provisions, you have the following rights:</p>
      <ul>
        <li>Right of access to personal data processed by us</li>
        <li>Right to rectification of inaccurate data</li>
        <li>Right to erasure</li>
        <li>Right to restriction of processing</li>
        <li>Right to data portability</li>
        <li>Right to object to processing based on Art. 6(1)(f) GDPR</li>
        <li>Right to withdraw consent with effect for the future</li>
      </ul>

      <h2>9. Right to Lodge a Complaint</h2>
      <p>
        You have the right to lodge a complaint with a data protection supervisory authority regarding the processing of your personal data.
      </p>

      <h2>10. Obligation to Provide Data</h2>
      <p>
        The provision of personal data is generally neither legally nor contractually required. However, without certain data, we may not be able to process your inquiry.
      </p>

      <h2>11. Automated Decision-Making</h2>
      <p>
        Automated decision-making including profiling within the meaning of Art. 22 GDPR does not take place on this website.
      </p>

      <h2>12. Changes to This Privacy Policy</h2>
      <p>
        We reserve the right to amend this privacy policy as needed to ensure it always complies with current legal requirements or to implement changes to our services on the website.
      </p>
    </div>
  );
}

/* ─── Russian ─── */
function RuContent() {
  return (
    <div className="prose-legal">
      <h2>1. Ответственный за обработку данных</h2>
      <p>
        ChefNet LLC
        <br />
        8 The Green, Suite B
        <br />
        Dover, DE 19901, USA
      </p>
      <p>
        <strong>Представитель:</strong> Дмитрий Ваганов (Dmitry Vaganov)
      </p>
      <p>
        <strong>Email:</strong>{' '}
        <a href="mailto:support@chefnet.ai">support@chefnet.ai</a>
        <br />
        <strong>Телефон:</strong>{' '}
        <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>2. Общие сведения об обработке данных</h2>
      <p>
        Защита ваших персональных данных важна для нас. Мы обрабатываем персональные данные исключительно в соответствии с действующими нормами о защите данных, в частности Общим регламентом по защите данных (GDPR/DSGVO).
      </p>

      <h2>3. Обработка данных при посещении сайта</h2>
      <p>
        При посещении нашего сайта хостинг-провайдер автоматически собирает технически необходимую информацию: IP-адрес, дату и время доступа, запрашиваемую страницу, URL-реферер, тип и версию браузера, операционную систему.
      </p>
      <p>
        Правовая основа — ст. 6 п. 1 лит. f GDPR. Наш законный интерес — безопасное и стабильное предоставление онлайн-сервиса.
      </p>

      <h2>4. Контактные обращения</h2>
      <p>
        При обращении по email или телефону мы обрабатываем предоставленные вами данные для обработки вашего запроса. Правовая основа — ст. 6 п. 1 лит. b и f GDPR.
      </p>

      <h2>5. Получатели данных</h2>
      <p>
        Получателями ваших данных могут быть технические провайдеры (хостинг, IT-сервисы), необходимые для работы сайта. Передача данных осуществляется только в законно допустимых рамках.
      </p>

      <h2>6. Срок хранения</h2>
      <p>
        Мы храним данные только столько, сколько необходимо для целей обработки или в рамках установленных законом сроков хранения.
      </p>

      <h2>7. Файлы cookie и аналогичные технологии</h2>
      <p>
        Наш сайт может использовать технически необходимые cookie. Хранение или считывание информации на вашем устройстве сверх этого происходит только на основании законного разрешения или вашего согласия.
      </p>

      <h2>8. Ваши права</h2>
      <ul>
        <li>Право на доступ к обрабатываемым данным</li>
        <li>Право на исправление неточных данных</li>
        <li>Право на удаление</li>
        <li>Право на ограничение обработки</li>
        <li>Право на переносимость данных</li>
        <li>Право на возражение против обработки на основании ст. 6 п. 1 лит. f GDPR</li>
        <li>Право на отзыв согласия с действием на будущее</li>
      </ul>

      <h2>9. Право на подачу жалобы</h2>
      <p>
        Вы имеете право подать жалобу в надзорный орган по защите данных.
      </p>

      <h2>10. Обязательность предоставления данных</h2>
      <p>
        Предоставление персональных данных не является обязательным, однако без определённых данных мы не сможем обработать ваш запрос.
      </p>

      <h2>11. Автоматизированное принятие решений</h2>
      <p>
        Автоматизированное принятие решений, включая профилирование по ст. 22 GDPR, на этом сайте не осуществляется.
      </p>

      <h2>12. Изменения данной политики</h2>
      <p>
        Мы оставляем за собой право обновлять данную политику конфиденциальности для соответствия актуальным правовым требованиям.
      </p>
    </div>
  );
}
