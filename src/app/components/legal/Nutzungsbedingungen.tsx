import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Nutzungsbedingungen() {
  const { language } = useLanguage();

  const content = language === 'de' ? <DeContent /> : language === 'ru' ? <RuContent /> : <EnContent />;

  return (
    <LegalLayout
      titleRu="Общие условия использования"
      titleEn={language === 'de' ? 'Allgemeine Nutzungsbedingungen' : 'Terms of Use (General)'}
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
      <h2>1. Geltungsbereich</h2>
      <p>
        Diese Nutzungsbedingungen gelten für die Nutzung der Website von ChefNet LLC unter der Domain chefnet.ai sowie aller damit verbundenen Unterseiten.
      </p>

      <h2>2. Anbieter</h2>
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

      <h2>3. Gegenstand der Website</h2>
      <p>
        Die Website dient der Information über ChefNet, dessen Leistungen, Produkte, Konzepte, Unternehmensinformationen sowie Kontaktmöglichkeiten.
      </p>
      <p>
        Soweit auf der Website Inhalte zu künftigen Produkten, Funktionen, Plattformbestandteilen oder geschäftlichen Entwicklungen dargestellt werden, stellen diese Informationen grundsätzlich keine verbindliche Zusage oder Garantie dar, sofern nicht ausdrücklich etwas anderes erklärt wird.
      </p>

      <h2>4. Kein verbindliches Angebot</h2>
      <p>
        Die auf dieser Website bereitgestellten Inhalte stellen kein rechtlich bindendes Angebot zum Abschluss eines Vertrages dar, sofern nicht ausdrücklich etwas anderes angegeben ist.
      </p>

      <h2>5. Zulässige Nutzung</h2>
      <p>
        Die Inhalte dieser Website dürfen nur im Rahmen der geltenden Gesetze und dieser Nutzungsbedingungen genutzt werden. Untersagt sind insbesondere:
      </p>
      <ul>
        <li>missbräuchliche Nutzung der Website</li>
        <li>Eingriffe in die technische Funktionsfähigkeit</li>
        <li>automatisiertes Auslesen der Website ohne Zustimmung, soweit rechtlich unzulässig</li>
        <li>Nutzung der Inhalte zu rechtswidrigen Zwecken</li>
      </ul>

      <h2>6. Geistiges Eigentum</h2>
      <p>
        Sämtliche Inhalte der Website, insbesondere Texte, Bilder, Grafiken, Logos, Konzepte, Strukturen, Designs und sonstige Bestandteile, sind urheberrechtlich oder anderweitig rechtlich geschützt.
      </p>
      <p>
        Jede Vervielfältigung, Bearbeitung, Verbreitung oder sonstige Nutzung außerhalb der gesetzlichen Schranken bedarf der vorherigen ausdrücklichen Zustimmung von ChefNet LLC oder des jeweiligen Rechteinhabers.
      </p>

      <h2>7. Inhalte und Haftung</h2>
      <p>
        Wir bemühen uns um die Richtigkeit, Vollständigkeit und Aktualität der auf dieser Website bereitgestellten Informationen. Eine Gewähr für die jederzeitige Richtigkeit, Vollständigkeit und Aktualität wird jedoch nicht übernommen, soweit gesetzlich zulässig.
      </p>
      <p>
        Die Nutzung der auf der Website bereitgestellten Inhalte erfolgt auf eigene Verantwortung.
      </p>

      <h2>8. Verfügbarkeit der Website</h2>
      <p>
        Wir bemühen uns um eine möglichst unterbrechungsfreie Verfügbarkeit der Website. Eine jederzeitige und ununterbrochene Verfügbarkeit kann jedoch technisch nicht gewährleistet werden.
      </p>
      <p>
        Wir behalten uns vor, Inhalte oder Funktionen der Website jederzeit ganz oder teilweise zu ändern, einzuschränken oder einzustellen.
      </p>

      <h2>9. Externe Links</h2>
      <p>
        Soweit unsere Website Links zu externen Websites Dritter enthält, haben wir auf deren Inhalte keinen Einfluss. Für diese fremden Inhalte übernehmen wir keine Gewähr. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
      </p>

      <h2>10. Kommunikation</h2>
      <p>
        Die Kontaktaufnahme über die auf der Website angegebenen Kommunikationswege begründet für sich genommen noch keinen Anspruch auf Vertragsschluss oder auf eine bestimmte Reaktionszeit, sofern nicht ausdrücklich etwas anderes vereinbart wurde.
      </p>

      <h2>11. Verbraucherstreitbeilegung</h2>
      <p>
        Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>12. Anwendbares Recht</h2>
      <p>
        Es gilt das Recht des Staates Delaware, USA, unter Ausschluss des UN-Kaufrechts, soweit dem keine zwingenden Verbraucherschutzvorschriften des Staates entgegenstehen, in dem der Nutzer seinen gewöhnlichen Aufenthalt hat.
      </p>

      <h2>13. Salvatorische Klausel</h2>
      <p>
        Sollten einzelne Bestimmungen dieser Nutzungsbedingungen ganz oder teilweise unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
    </div>
  );
}

/* ─── English ─── */
function EnContent() {
  return (
    <div className="prose-legal">
      <h2>1. Scope</h2>
      <p>
        These Terms of Use apply to the use of the website of ChefNet LLC under the domain chefnet.ai and all associated subpages.
      </p>

      <h2>2. Provider</h2>
      <p>
        ChefNet LLC, 8 The Green, Suite B, Dover, DE 19901, USA
        <br />
        Represented by: Dmitry Vaganov
        <br />
        Email: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a> | Phone: <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>3. Subject Matter of the Website</h2>
      <p>
        The website serves to provide information about ChefNet, its services, products, concepts, company information, and contact options. Any content regarding future products, features, or business developments does not constitute a binding commitment or guarantee unless expressly stated otherwise.
      </p>

      <h2>4. No Binding Offer</h2>
      <p>
        The content provided on this website does not constitute a legally binding offer to enter into a contract unless expressly stated otherwise.
      </p>

      <h2>5. Permitted Use</h2>
      <p>
        The content of this website may only be used in accordance with applicable laws and these Terms of Use. The following are specifically prohibited: misuse of the website, interference with technical functionality, unauthorized automated scraping, and use of content for unlawful purposes.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All content of the website, including texts, images, graphics, logos, concepts, structures, designs and other components, is protected by copyright or other legal rights. Any reproduction, modification, distribution, or other use beyond legal limits requires the prior express consent of ChefNet LLC.
      </p>

      <h2>7. Content and Liability</h2>
      <p>
        We strive for accuracy, completeness, and timeliness of information provided on this website. However, no guarantee for continuous accuracy, completeness, and timeliness is assumed to the extent legally permissible. Use of the content is at your own risk.
      </p>

      <h2>8. Website Availability</h2>
      <p>
        We strive for uninterrupted availability of the website. However, continuous and uninterrupted availability cannot be technically guaranteed. We reserve the right to change, restrict, or discontinue content or features at any time.
      </p>

      <h2>9. External Links</h2>
      <p>
        Insofar as our website contains links to external third-party websites, we have no influence over their content and assume no liability for them.
      </p>

      <h2>10. Communication</h2>
      <p>
        Contacting us through the communication channels provided on the website does not in itself establish a claim to the conclusion of a contract or a specific response time.
      </p>

      <h2>11. Consumer Dispute Resolution</h2>
      <p>
        We are not obligated and not willing to participate in dispute resolution proceedings before a consumer arbitration board.
      </p>

      <h2>12. Applicable Law</h2>
      <p>
        The law of the State of Delaware, USA, applies, excluding the UN Convention on Contracts for the International Sale of Goods, insofar as this does not conflict with mandatory consumer protection provisions of the state in which the user has their habitual residence.
      </p>

      <h2>13. Severability Clause</h2>
      <p>
        Should individual provisions of these Terms of Use be or become wholly or partially invalid, the validity of the remaining provisions shall remain unaffected.
      </p>
    </div>
  );
}

/* ─── Russian ─── */
function RuContent() {
  return (
    <div className="prose-legal">
      <h2>1. Область применения</h2>
      <p>
        Настоящие условия использования применяются к использованию сайта ChefNet LLC по домену chefnet.ai и всех связанных подстраниц.
      </p>

      <h2>2. Поставщик</h2>
      <p>
        ChefNet LLC, 8 The Green, Suite B, Dover, DE 19901, USA
        <br />
        Представитель: Дмитрий Ваганов (Dmitry Vaganov)
        <br />
        Email: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a> | Телефон: <a href="tel:+19173328053">+1 (917) 332-8053</a>
      </p>

      <h2>3. Предмет сайта</h2>
      <p>
        Сайт предназначен для информирования о ChefNet, его услугах, продуктах, концепциях и контактных данных. Информация о будущих продуктах или бизнес-планах не является обязательным обещанием, если не указано иное.
      </p>

      <h2>4. Отсутствие обязывающего предложения</h2>
      <p>
        Содержимое сайта не является юридически обязывающим предложением о заключении договора, если не указано иное.
      </p>

      <h2>5. Допустимое использование</h2>
      <p>
        Содержимое сайта может использоваться только в рамках действующего законодательства. Запрещены: злоупотребление сайтом, вмешательство в техническую работоспособность, несанкционированный автоматический сбор данных и использование контента в незаконных целях.
      </p>

      <h2>6. Интеллектуальная собственность</h2>
      <p>
        Все материалы сайта защищены авторским правом. Любое воспроизведение, изменение или распространение без письменного согласия ChefNet LLC запрещено.
      </p>

      <h2>7. Контент и ответственность</h2>
      <p>
        Мы стремимся к точности и актуальности информации, но не гарантируем её полноту. Использование контента осуществляется на ваш собственный риск.
      </p>

      <h2>8. Доступность сайта</h2>
      <p>
        Мы стремимся к бесперебойной работе сайта, но не можем гарантировать постоянную доступность. Мы оставляем за собой право изменять или ограничивать функции сайта.
      </p>

      <h2>9. Внешние ссылки</h2>
      <p>
        За содержание внешних сайтов, на которые ведут ссылки, мы ответственности не несём.
      </p>

      <h2>10. Коммуникация</h2>
      <p>
        Обращение через контактные каналы сайта само по себе не создаёт обязательств по заключению договора или определённым срокам ответа.
      </p>

      <h2>11. Урегулирование споров</h2>
      <p>
        Мы не обязаны и не готовы участвовать в процедурах урегулирования споров перед потребительской арбитражной комиссией.
      </p>

      <h2>12. Применимое право</h2>
      <p>
        Применяется право штата Делавэр, США, с исключением Конвенции ООН о договорах международной купли-продажи, если это не противоречит обязательным нормам защиты потребителей по месту проживания пользователя.
      </p>

      <h2>13. Сальваторная оговорка</h2>
      <p>
        Если отдельные положения данных условий окажутся недействительными, остальные положения сохраняют свою силу.
      </p>
    </div>
  );
}
