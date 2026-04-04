import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AmlKycPolicy() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Политика AML/KYC (противодействие отмыванию денег)"
      titleEn="AML/KYC Policy"
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
      <h2>1. Introduction & Purpose</h2>
      <p>
        ChefNet LLC and its investment platform ChefNet Invest ("we," "us," "our," or "Company") are committed to maintaining the highest standards of integrity and compliance with all applicable anti-money laundering (AML) and know-your-customer (KYC) regulations. This AML/KYC Policy outlines our comprehensive approach to combating money laundering, terrorist financing, fraud, and other financial crimes.
      </p>
      <p>
        Our primary objectives are to:
      </p>
      <ul>
        <li>Verify the identity of all customers and beneficial owners</li>
        <li>Understand the nature and purpose of customer relationships</li>
        <li>Monitor customer transactions for suspicious activities</li>
        <li>Detect and report suspected money laundering and terrorist financing</li>
        <li>Maintain comprehensive records of customer information and transactions</li>
      </ul>

      <h2>2. Regulatory Framework</h2>
      <p>
        Our AML/KYC program is designed to comply with all applicable U.S. federal and international regulations, including but not limited to:
      </p>
      <ul>
        <li><span className="highlight">Bank Secrecy Act (BSA)</span> — requires financial institutions to implement AML programs</li>
        <li><span className="highlight">USA PATRIOT Act</span> — enhances AML requirements and sanctions screening</li>
        <li><span className="highlight">FinCEN Guidance</span> — Financial Crimes Enforcement Network guidance on beneficial ownership, virtual assets, and suspicious activity reporting</li>
        <li><span className="highlight">Executive Order 13224</span> — sanctions and terrorist financing prevention</li>
        <li><span className="highlight">OFAC Sanctions Programs</span> — Office of Foreign Assets Control (U.S.)</li>
        <li><span className="highlight">European Union Anti-Money Laundering Directives (AMLD)</span> — for applicable EU-based users</li>
        <li><span className="highlight">FATF Recommendations</span> — Financial Action Task Force international standards for AML/CFT</li>
      </ul>

      <h2>3. KYC Verification Requirements</h2>
      <p>
        All investors on the ChefNet Invest platform must successfully complete our Know-Your-Customer (KYC) process before making any investments. Failure to complete KYC verification will result in account restrictions and inability to transact.
      </p>

      <h3>3.1 KYC Provider</h3>
      <p>
        We partner with <span className="highlight">Sumsub Inc.</span>, a leading identity verification provider, to conduct our KYC verification process. Sumsub employs advanced technology including AI-powered document verification, liveness detection, and database cross-referencing to ensure the authenticity of submitted information.
      </p>

      <h3>3.2 Required Documentation</h3>
      <p>
        To complete KYC verification, customers must provide the following documents:
      </p>
      <ul>
        <li><span className="highlight">Government-Issued Photo ID:</span> Valid passport, national identity card, or driver's license. The document must be current and legible.</li>
        <li><span className="highlight">Proof of Address:</span> Utility bill, bank statement, lease agreement, or government correspondence showing the customer's name and current address. Documents must be issued within the last 3 months.</li>
        <li><span className="highlight">Selfie/Liveness Check:</span> A video selfie or live photo verification to confirm that the person providing the documents is the same individual in the submitted government ID.</li>
      </ul>

      <h3>3.3 Enhanced Due Diligence (EDD)</h3>
      <p>
        For investments exceeding specified thresholds (currently $100,000 USD or equivalent), enhanced due diligence measures apply. Enhanced verification may include:
      </p>
      <ul>
        <li>Additional source of funds documentation</li>
        <li>Business registration certificates (for corporate entities)</li>
        <li>Beneficial ownership information</li>
        <li>Additional supporting documents as deemed necessary</li>
      </ul>

      <h2>4. Customer Due Diligence (CDD)</h2>
      <p>
        Our due diligence program consists of two tiers: Standard CDD and Enhanced CDD (EDD).
      </p>

      <h3>4.1 Standard Customer Due Diligence</h3>
      <p>
        Applied to all customers, Standard CDD includes:
      </p>
      <ul>
        <li>Collection and verification of customer identity</li>
        <li>Collection of customer contact information and investment profile</li>
        <li>Verification of customer address</li>
        <li>Sanctions screening (see Section 6)</li>
        <li>PEP screening</li>
      </ul>

      <h3>4.2 Enhanced Customer Due Diligence (EDD)</h3>
      <p>
        Enhanced CDD is conducted for higher-risk customers and situations, including:
      </p>
      <ul>
        <li>Customers identified as Politically Exposed Persons (PEPs)</li>
        <li>Customers from high-risk jurisdictions</li>
        <li>Customers with large transaction volumes or amounts</li>
        <li>Customers engaged in high-risk business activities</li>
        <li>Customers with complex ownership structures</li>
      </ul>
      <p>
        Enhanced CDD procedures include additional documentation requests, beneficial ownership verification, and source of funds confirmation.
      </p>

      <h3>4.3 Ongoing Customer Monitoring</h3>
      <p>
        We maintain ongoing surveillance of customer accounts and transactions to:
      </p>
      <ul>
        <li>Monitor investment patterns and transaction volumes</li>
        <li>Identify deviations from expected customer behavior</li>
        <li>Re-screen customers against sanctions lists periodically</li>
        <li>Update customer information as required</li>
      </ul>

      <h2>5. Suspicious Activity Reporting</h2>
      <p>
        If we identify or suspect any suspicious activity, we are obligated to report such activity to the appropriate authorities.
      </p>

      <h3>5.1 Internal Procedures</h3>
      <p>
        Our internal procedures for identifying and escalating suspicious activities include:
      </p>
      <ul>
        <li>Monitoring of transaction patterns inconsistent with customer profile</li>
        <li>Detection of rapid transfers in/out of accounts</li>
        <li>Identification of transactions involving high-risk jurisdictions</li>
        <li>Recognition of structuring or "smurfing" activities</li>
        <li>Detection of false or inconsistent information provided during KYC</li>
      </ul>

      <h3>5.2 Suspicious Activity Report (SAR) Filing</h3>
      <p>
        When suspicious activity is detected and cannot be explained through legitimate business purposes, we file a Suspicious Activity Report (SAR) with the Financial Crimes Enforcement Network (FinCEN) in compliance with 31 U.S.C. § 5318(g) and FinCEN regulations. SARs are filed within the required timeframe and contain all relevant details of the suspected violation.
      </p>

      <h3>5.3 No Tipping Off</h3>
      <p>
        We maintain strict confidentiality regarding any SAR filings or internal investigations. Customers must not be informed, directly or indirectly, that a SAR has been filed or that an investigation is underway. Violation of this prohibition may result in civil or criminal liability.
      </p>

      <h2>6. Sanctions Screening</h2>
      <p>
        We conduct comprehensive screening of all customers against relevant sanctions lists to ensure we do not engage in transactions with sanctioned individuals, entities, or jurisdictions.
      </p>

      <h3>6.1 Sanctions Lists Screened</h3>
      <ul>
        <li><span className="highlight">OFAC Sanctions Lists:</span> U.S. Treasury Department's Office of Foreign Assets Control Specially Designated Nationals (SDN) List, Consolidated Sanctions List (CSL), and all OFAC programs</li>
        <li><span className="highlight">European Union Sanctions:</span> EU consolidated sanctions list</li>
        <li><span className="highlight">United Nations Sanctions:</span> UN Security Council consolidated sanctions list</li>
        <li><span className="highlight">Additional Jurisdictional Lists:</span> As applicable to relevant regulatory regimes</li>
      </ul>

      <h3>6.2 Screening Process</h3>
      <p>
        Sanctions screening is conducted:
      </p>
      <ul>
        <li>At initial account onboarding and KYC completion</li>
        <li>Periodically throughout the customer relationship (minimum quarterly)</li>
        <li>Prior to any large transactions</li>
        <li>Upon update of customer information</li>
      </ul>

      <h3>6.3 Match Resolution</h3>
      <p>
        In the event of a potential match with a sanctions list, the matter is immediately escalated for review. Any confirmed match results in immediate account suspension and reporting to OFAC and relevant authorities. No transactions are processed until the match has been cleared through proper procedures.
      </p>

      <h2>7. Record Keeping</h2>
      <p>
        We maintain comprehensive records of all customer information and transactions as required by law.
      </p>

      <h3>7.1 KYC and Customer Information Records</h3>
      <ul>
        <li>All customer identification documents and supporting information</li>
        <li>Results of identity verification procedures</li>
        <li>Customer risk assessments</li>
        <li>Documentation of beneficial ownership investigations</li>
        <li>Records of updated customer information</li>
      </ul>

      <h3>7.2 Retention Period</h3>
      <p>
        KYC documents and customer information records are retained for a minimum of <span className="highlight">five (5) years</span> following the closure of a customer account or termination of the customer relationship. Records may be retained longer if required by applicable law or regulations.
      </p>

      <h3>7.3 Transaction Records</h3>
      <p>
        All transaction records, including investment amounts, dates, counterparties, and investment vehicles, are maintained for the period required by applicable law and regulations, typically for a minimum of 5-7 years.
      </p>

      <h3>7.4 Record Confidentiality</h3>
      <p>
        All records are maintained in secure, confidential systems with access restricted to authorized compliance personnel. Records are protected from unauthorized disclosure and maintained in compliance with applicable privacy laws.
      </p>

      <h2>8. Risk Assessment</h2>
      <p>
        We employ a risk-based approach to our AML compliance program. The level of due diligence and monitoring applied to each customer is proportionate to the perceived money laundering and terrorist financing risk.
      </p>

      <h3>8.1 Risk Factors Assessed</h3>
      <ul>
        <li><span className="highlight">Geographic Risk:</span> Customers from jurisdictions identified as high-risk by FATF, UN, OFAC, or other international bodies receive enhanced scrutiny</li>
        <li><span className="highlight">Product/Service Risk:</span> Investment in certain alternative assets or through certain channels may present elevated risk</li>
        <li><span className="highlight">Customer Type Risk:</span> PEPs, family members of PEPs, and customers in sensitive occupations receive enhanced due diligence</li>
        <li><span className="highlight">Transaction Risk:</span> Unusual transaction patterns, large amounts, rapid movements, or transactions inconsistent with customer profile</li>
        <li><span className="highlight">Business Risk:</span> Nature of customer's business, industry sector, and ownership structure</li>
      </ul>

      <h3>8.2 Risk Scoring</h3>
      <p>
        Customers are assigned a risk score based on these factors. Risk scores determine the frequency of monitoring, scope of due diligence, and transaction thresholds requiring additional review.
      </p>

      <h2>9. Training and Compliance</h2>
      <p>
        All ChefNet LLC employees, contractors, and agents involved in customer-facing activities or AML/KYC operations receive comprehensive training on:
      </p>
      <ul>
        <li>Applicable AML and KYC regulations</li>
        <li>Company AML/KYC policies and procedures</li>
        <li>Identification of suspicious activities and red flags</li>
        <li>Proper documentation and reporting procedures</li>
        <li>Sanctions screening and OFAC compliance</li>
        <li>Confidentiality and no tipping-off requirements</li>
      </ul>
      <p>
        Initial training is provided upon hire, and refresher training is conducted annually or as required by regulation.
      </p>

      <h2>10. Non-Compliance Consequences</h2>
      <p>
        Failure to comply with our AML/KYC Policy, suspicious activity, or violation of sanctions may result in severe consequences:
      </p>

      <h3>10.1 Account Actions</h3>
      <ul>
        <li>Account suspension or temporary restriction pending investigation</li>
        <li>Account termination with return of funds (minus any applicable fees)</li>
        <li>Permanent ban from the ChefNet Invest platform</li>
      </ul>

      <h3>10.2 Regulatory Reporting</h3>
      <ul>
        <li>Filing of Suspicious Activity Report (SAR) with FinCEN</li>
        <li>Reporting to OFAC if applicable</li>
        <li>Notification to relevant domestic and international authorities as required</li>
        <li>Compliance with governmental investigations and requests</li>
      </ul>

      <h3>10.3 Legal Action</h3>
      <ul>
        <li>Civil litigation for recovery of proceeds</li>
        <li>Cooperation with law enforcement and criminal investigations</li>
        <li>Potential forfeiture of assets</li>
      </ul>

      <h2>11. Contact Information</h2>
      <p>
        For questions, concerns, or reporting of suspicious activities related to our AML/KYC policies:
      </p>
      <ul>
        <li><span className="highlight">Compliance Department:</span> compliance@chefnet.ai</li>
        <li><span className="highlight">Legal Department:</span> legal@chefnet.ai</li>
      </ul>
      <p>
        All inquiries and suspicious activity reports are treated with confidentiality and urgency.
      </p>

      <h2>Final Statement</h2>
      <p>
        This AML/KYC Policy is subject to modification at any time to comply with changes in applicable laws and regulations. ChefNet LLC reserves the right to update these policies and procedures without prior notice. Continued use of the ChefNet Invest platform constitutes acceptance of any such modifications.
      </p>
    </div>
  );
}

function RuContent() {
  return (
    <div className="prose-legal">
      <h2>1. Введение и цель</h2>
      <p>
        ChefNet LLC и её инвестиционная платформа ChefNet Invest (далее "мы", "нас", "наша" или "Компания") привержены поддержанию высочайших стандартов честности и соответствия всем применимым нормам противодействия отмыванию денег (AML) и верификации клиентов (KYC). Настоящая Политика AML/KYC определяет наш комплексный подход к борьбе с отмыванием денег, финансированием терроризма, мошенничеством и другими финансовыми преступлениями.
      </p>
      <p>
        Наши основные цели:
      </p>
      <ul>
        <li>Проверка личности всех клиентов и бенефициарных владельцев</li>
        <li>Понимание характера и цели деловых отношений с клиентом</li>
        <li>Мониторинг транзакций клиентов на предмет подозрительной деятельности</li>
        <li>Выявление и отчёт о подозреваемом отмывании денег и финансировании терроризма</li>
        <li>Ведение всесторонних записей информации и транзакций клиентов</li>
      </ul>

      <h2>2. Нормативно-правовая база</h2>
      <p>
        Наша программа AML/KYC разработана в соответствии со всеми применимыми федеральными законами США и международными нормами, включая:
      </p>
      <ul>
        <li><span className="highlight">Закон о банковской секретности (BSA)</span> — требует от финансовых учреждений внедрения программ AML</li>
        <li><span className="highlight">Закон США PATRIOT Act</span> — усиливает требования AML и проверку санкций</li>
        <li><span className="highlight">Руководящие документы FinCEN</span> — рекомендации Сетей обнаружения финансовых преступлений по полезному владению, виртуальным активам и отчётам о подозрительной деятельности</li>
        <li><span className="highlight">Указ 13224</span> — санкции и предотвращение финансирования терроризма</li>
        <li><span className="highlight">Программы санкций OFAC</span> — Управления контроля иностранных активов США</li>
        <li><span className="highlight">Директивы ЕС по противодействию отмыванию денег (AMLD)</span> — для применимых пользователей из ЕС</li>
        <li><span className="highlight">Рекомендации FATF</span> — международные стандарты Целевой группы по финансовым мерам международного сообщества</li>
      </ul>

      <h2>3. Требования верификации KYC</h2>
      <p>
        Все инвесторы на платформе ChefNet Invest должны успешно пройти процесс верификации "Знай своего клиента" (KYC) перед совершением любых инвестиций. Неудача при завершении KYC-верификации приводит к ограничениям учётной записи и невозможности проведения транзакций.
      </p>

      <h3>3.1 Поставщик KYC</h3>
      <p>
        Мы сотрудничаем с <span className="highlight">Sumsub Inc.</span>, ведущим поставщиком услуг верификации личности, для проведения нашего процесса KYC-верификации. Sumsub использует передовые технологии, включая проверку документов на основе ИИ, обнаружение активности и перекрёстные ссылки на базы данных, чтобы обеспечить подлинность предоставленной информации.
      </p>

      <h3>3.2 Требуемые документы</h3>
      <p>
        Для завершения KYC-верификации клиенты должны предоставить следующие документы:
      </p>
      <ul>
        <li><span className="highlight">Удостоверение личности, выданное государством:</span> Действительный паспорт, национальное удостоверение личности или водительские права. Документ должен быть текущим и разборчивым.</li>
        <li><span className="highlight">Подтверждение адреса:</span> Счёт за коммунальные услуги, выписка из банка, договор аренды или государственная корреспонденция с указанием имени и текущего адреса клиента. Документы должны быть выданы в течение последних 3 месяцев.</li>
        <li><span className="highlight">Селфи/Проверка активности:</span> Видеосселфи или проверка фото в реальном времени для подтверждения того, что лицо, предоставляющее документы, является той же личностью, что и на предоставленном государственном удостоверении личности.</li>
      </ul>

      <h3>3.3 Повышенная надлежащая осмотрительность (EDD)</h3>
      <p>
        Для инвестиций, превышающих установленные пороги (в настоящее время 100 000 долл. США или эквивалент), применяются меры повышенной надлежащей осмотрительности. Повышенная верификация может включать:
      </p>
      <ul>
        <li>Дополнительную документацию об источнике средств</li>
        <li>Свидетельства о регистрации компании (для юридических лиц)</li>
        <li>Информацию о бенефициарном владении</li>
        <li>Дополнительные вспомогательные документы по мере необходимости</li>
      </ul>

      <h2>4. Надлежащая осмотрительность в отношении клиентов (CDD)</h2>
      <p>
        Наша программа надлежащей осмотрительности состоит из двух уровней: стандартная CDD и повышенная CDD (EDD).
      </p>

      <h3>4.1 Стандартная надлежащая осмотрительность в отношении клиентов</h3>
      <p>
        Применяется ко всем клиентам и включает:
      </p>
      <ul>
        <li>Сбор и проверку личности клиента</li>
        <li>Сбор контактной информации клиента и инвестиционного профиля</li>
        <li>Проверку адреса клиента</li>
        <li>Проверку санкций (см. раздел 6)</li>
        <li>Проверку на статус ПИДВ (политически значимые лица)</li>
      </ul>

      <h3>4.2 Повышенная надлежащая осмотрительность в отношении клиентов (EDD)</h3>
      <p>
        Повышенная CDD проводится для высокорисковых клиентов и ситуаций, включая:
      </p>
      <ul>
        <li>Клиентов, идентифицированных как политически значимые лица (ПИДВ)</li>
        <li>Клиентов из высокорисковых юрисдикций</li>
        <li>Клиентов с большими объёмами или суммами транзакций</li>
        <li>Клиентов, занятых в высокорисковой деловой деятельности</li>
        <li>Клиентов со сложными структурами владения</li>
      </ul>
      <p>
        Процедуры повышенной CDD включают дополнительные запросы документации, проверку бенефициарного владения и подтверждение источника средств.
      </p>

      <h3>4.3 Постоянный мониторинг клиентов</h3>
      <p>
        Мы ведём постоянное наблюдение за счётами и транзакциями клиентов для:
      </p>
      <ul>
        <li>Мониторинга моделей инвестирования и объёмов транзакций</li>
        <li>Выявления отклонений от ожидаемого поведения клиента</li>
        <li>Периодической переквалификации клиентов по спискам санкций</li>
        <li>Обновления информации о клиентах по мере необходимости</li>
      </ul>

      <h2>5. Отчётность о подозрительной деятельности</h2>
      <p>
        При выявлении или подозрении на подозрительную деятельность мы обязаны сообщить о такой деятельности соответствующим органам власти.
      </p>

      <h3>5.1 Внутренние процедуры</h3>
      <p>
        Наши внутренние процедуры выявления и эскалации подозрительной деятельности включают:
      </p>
      <ul>
        <li>Мониторинг моделей транзакций, несовместимых с профилем клиента</li>
        <li>Выявление быстрых переводов на счёта и со счётов</li>
        <li>Идентификацию транзакций, связанных с высокорисковыми юрисдикциями</li>
        <li>Распознавание деятельности по структурированию или "шмурфингу"</li>
        <li>Выявление ложной или противоречивой информации, предоставленной во время KYC</li>
      </ul>

      <h3>5.2 Подача отчёта о подозрительной деятельности (SAR)</h3>
      <p>
        Если выявлена подозрительная деятельность и её нельзя объяснить законными деловыми целями, мы подаём отчёт о подозрительной деятельности (SAR) в Сеть обнаружения финансовых преступлений (FinCEN) в соответствии с 31 U.S.C. § 5318(g) и нормами FinCEN. SAR подаются в установленные сроки и содержат все соответствующие детали подозреваемого нарушения.
      </p>

      <h3>5.3 Запрет на опасное предупреждение</h3>
      <p>
        Мы сохраняем строгую конфиденциальность в отношении любых подач SAR или внутренних расследований. Клиентам должно быть запрещено информировать, прямо или косвенно, о том, что был подан SAR или что проводится расследование. Нарушение этого запрета может привести к гражданской или уголовной ответственности.
      </p>

      <h2>6. Проверка санкций</h2>
      <p>
        Мы проводим всестороннюю проверку всех клиентов по соответствующим спискам санкций, чтобы обеспечить, что мы не занимаемся транзакциями с санкционированными лицами, организациями или юрисдикциями.
      </p>

      <h3>6.1 Проверяемые списки санкций</h3>
      <ul>
        <li><span className="highlight">Списки санкций OFAC:</span> Списки специально обозначенных граждан (SDN) Министерства финансов США, Консолидированный список санкций (CSL) и все программы OFAC</li>
        <li><span className="highlight">Санкции Европейского союза:</span> Консолидированный список санкций ЕС</li>
        <li><span className="highlight">Санкции Организации Объединённых Наций:</span> Консолидированный список санкций Совета Безопасности ООН</li>
        <li><span className="highlight">Дополнительные списки юрисдикций:</span> По применимости к соответствующим нормативным режимам</li>
      </ul>

      <h3>6.2 Процесс проверки</h3>
      <p>
        Проверка санкций проводится:
      </p>
      <ul>
        <li>При первоначальной регистрации на платформе и завершении KYC</li>
        <li>Периодически в течение деловых отношений с клиентом (минимум ежеквартально)</li>
        <li>До любых крупных транзакций</li>
        <li>При обновлении информации о клиенте</li>
      </ul>

      <h3>6.3 Разрешение совпадений</h3>
      <p>
        В случае возможного совпадения со списком санкций вопрос немедленно передаётся на рассмотрение. Любое подтверждённое совпадение приводит к немедленному закрытию учётной записи и сообщению в OFAC и соответствующие органы. Никакие транзакции не обрабатываются до тех пор, пока совпадение не будет разрешено надлежащим образом.
      </p>

      <h2>7. Ведение записей</h2>
      <p>
        Мы ведём всесторонние записи всей информации о клиентах и транзакций, как требуется по закону.
      </p>

      <h3>7.1 Записи KYC и информация о клиентах</h3>
      <ul>
        <li>Все документы удостоверения клиентов и вспомогательная информация</li>
        <li>Результаты процедур проверки личности</li>
        <li>Оценки риска клиентов</li>
        <li>Документация исследований полезного владения</li>
        <li>Записи обновлённой информации о клиентах</li>
      </ul>

      <h3>7.2 Период хранения</h3>
      <p>
        Документы KYC и записи информации о клиентах сохраняются в течение минимум <span className="highlight">пяти (5) лет</span> после закрытия учётной записи клиента или прекращения деловых отношений с клиентом. Записи могут храниться дольше, если это требуется применимым законом или нормами.
      </p>

      <h3>7.3 Записи о транзакциях</h3>
      <p>
        Все записи о транзакциях, включая суммы инвестиций, даты, контрагентов и инвестиционные инструменты, сохраняются в течение периода, требуемого применимым законом и нормами, как правило, минимум 5-7 лет.
      </p>

      <h3>7.4 Конфиденциальность записей</h3>
      <p>
        Все записи хранятся в защищённых, конфиденциальных системах с доступом, ограниченным для авторизованного персонала по соответствию. Записи защищены от несанкционированного раскрытия и сохраняются в соответствии с применимыми законами о конфиденциальности.
      </p>

      <h2>8. Оценка риска</h2>
      <p>
        Мы применяем подход, основанный на риске, к нашей программе соответствия AML. Уровень надлежащей осмотрительности и мониторинга, применяемый к каждому клиенту, соответствует воспринимаемому риску отмывания денег и финансирования терроризма.
      </p>

      <h3>8.1 Оценённые факторы риска</h3>
      <ul>
        <li><span className="highlight">Географический риск:</span> Клиенты из юрисдикций, определённых как высокорисковые FATF, ООН, OFAC или другими международными органами, получают повышенное внимание</li>
        <li><span className="highlight">Риск продуктов/услуг:</span> Инвестирование в определённые альтернативные активы или через определённые каналы может представлять повышенный риск</li>
        <li><span className="highlight">Риск типа клиента:</span> ПИДВ, члены семей ПИДВ и клиенты в чувствительных профессиях получают повышенную надлежащую осмотрительность</li>
        <li><span className="highlight">Риск транзакций:</span> Необычные модели транзакций, крупные суммы, быстрые движения или транзакции, несовместимые с профилем клиента</li>
        <li><span className="highlight">Деловой риск:</span> Характер деятельности клиента, отраслевой сектор и структура владения</li>
      </ul>

      <h3>8.2 Оценка риска</h3>
      <p>
        Клиентам присваивается оценка риска на основе этих факторов. Оценки риска определяют частоту мониторинга, объём надлежащей осмотрительности и пороги транзакций, требующие дополнительной проверки.
      </p>

      <h2>9. Обучение и соответствие</h2>
      <p>
        Все сотрудники ChefNet LLC, подрядчики и агенты, участвующие в работе с клиентами или операциях AML/KYC, получают всестороннее обучение по:
      </p>
      <ul>
        <li>Применимым нормам AML и KYC</li>
        <li>Политикам и процедурам AML/KYC Компании</li>
        <li>Выявлению подозрительной деятельности и красных флагов</li>
        <li>Надлежащим процедурам документирования и отчётности</li>
        <li>Проверке санкций и соответствию OFAC</li>
        <li>Требованиям конфиденциальности и запрета на опасное предупреждение</li>
      </ul>
      <p>
        Первоначальное обучение проводится при найме, а освежающее обучение проводится ежегодно или по мере требования нормами.
      </p>

      <h2>10. Последствия несоответствия</h2>
      <p>
        Несоответствие нашей Политике AML/KYC, подозрительная деятельность или нарушение санкций могут привести к серьёзным последствиям:
      </p>

      <h3>10.1 Действия в отношении учётной записи</h3>
      <ul>
        <li>Закрытие или временное ограничение учётной записи, ожидающие расследования</li>
        <li>Прекращение учётной записи с возвратом средств (минус применимые сборы)</li>
        <li>Постоянный запрет на использование платформы ChefNet Invest</li>
      </ul>

      <h3>10.2 Нормативная отчётность</h3>
      <ul>
        <li>Подача отчёта о подозрительной деятельности (SAR) в FinCEN</li>
        <li>Отчётность в OFAC при применимости</li>
        <li>Уведомление соответствующих отечественных и международных органов как требуется</li>
        <li>Сотрудничество с государственными расследованиями и запросами</li>
      </ul>

      <h3>10.3 Судебное разбирательство</h3>
      <ul>
        <li>Гражданские иски на возмещение убытков</li>
        <li>Сотрудничество с правоохранительными органами и уголовными расследованиями</li>
        <li>Возможное конфискование активов</li>
      </ul>

      <h2>11. Контактная информация</h2>
      <p>
        Для вопросов, опасений или сообщений о подозрительной деятельности, связанных с нашей политикой AML/KYC:
      </p>
      <ul>
        <li><span className="highlight">Отдел соответствия:</span> compliance@chefnet.ai</li>
        <li><span className="highlight">Юридический отдел:</span> legal@chefnet.ai</li>
      </ul>
      <p>
        Все запросы и отчёты о подозрительной деятельности рассматриваются с конфиденциальностью и срочностью.
      </p>

      <h2>Заключительное заявление</h2>
      <p>
        Настоящая Политика AML/KYC может быть изменена в любое время для соответствия изменениям применимых законов и норм. ChefNet LLC оставляет за собой право обновлять эти политики и процедуры без предварительного уведомления. Продолжение использования платформы ChefNet Invest означает согласие с любыми такими изменениями.
      </p>
    </div>
  );
}
