import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsOfUse() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Пользовательское соглашение"
      titleEn="Terms of Use"
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
        <p>Настоящее Пользовательское соглашение («Соглашение») регулирует отношения между ChefNet LLC («Компания») и пользователями инвестиционной платформы ChefNet Invest (chefnet.ai). Используя платформу, вы подтверждаете своё согласие с настоящим Соглашением в полном объёме.</p>
      </div>

      <h2>1. Стороны и предмет Соглашения</h2>
      <p>Настоящее Соглашение заключается между ChefNet LLC, зарегистрированной в штате Делавэр, США (The Green STE B, Dover, DE 19901), и физическим лицом, прошедшим регистрацию на платформе ChefNet Invest («Пользователь»).</p>
      <p>Предмет Соглашения — предоставление Пользователю доступа к инвестиционной платформе, функционал которой включает просмотр инвестиционных раундов, участие в них, управление портфелем и пользование реферальной программой.</p>

      <h2>2. Требования к пользователям</h2>
      <p>Для использования платформы необходимо:</p>
      <ul>
        <li>Достижение возраста 18 лет и старше</li>
        <li>Наличие полной правоспособности для заключения юридически обязывающих договоров</li>
        <li>Прохождение обязательной верификации личности (KYC)</li>
        <li>Отсутствие в санкционных списках международных организаций</li>
        <li>Использование платформы в личных, некоммерческих инвестиционных целях</li>
      </ul>
      <p>Платформа <strong>недоступна</strong> для граждан и резидентов юрисдикций, в которых данный вид деятельности запрещён или ограничён применимым законодательством.</p>

      <h2>3. Регистрация и безопасность аккаунта</h2>
      <p>При регистрации вы обязуетесь:</p>
      <ul>
        <li>Предоставить достоверные, точные и актуальные данные</li>
        <li>Незамедлительно обновлять данные в случае их изменения</li>
        <li>Обеспечивать конфиденциальность своих учётных данных (логин, пароль)</li>
        <li>Немедленно уведомлять нас о любом несанкционированном доступе к вашему аккаунту</li>
      </ul>
      <p>Вы несёте ответственность за все действия, совершённые через ваш аккаунт. Передача аккаунта третьим лицам запрещена.</p>

      <h2>4. Инвестиционная деятельность</h2>
      <h3>4.1 Порядок инвестирования</h3>
      <ul>
        <li>Инвестиции осуществляются путём участия в раундах финансирования, открытых на платформе</li>
        <li>Минимальная сумма инвестиции определяется условиями каждого раунда</li>
        <li>Заявка на инвестицию приобретает статус «Подтверждена» только после проверки и одобрения Компанией</li>
        <li>Доли (акции) зачисляются на ваш счёт исключительно после подтверждения инвестиции</li>
      </ul>

      <h3>4.2 Оплата</h3>
      <ul>
        <li>Платежи принимаются банковским переводом (SWIFT/SEPA) и в криптовалюте (USDT и иные поддерживаемые активы)</li>
        <li>Все транзакции проверяются на соответствие требованиям AML</li>
        <li>Комиссии и сборы за проведение платежей несёт Пользователь</li>
      </ul>

      <h3>4.3 Возврат средств</h3>
      <p>Возврат инвестиций возможен исключительно в случаях, прямо предусмотренных условиями соответствующего раунда финансирования. Подтверждённые инвестиции, как правило, являются безотзывными. Подробнее — в документации к каждому раунду.</p>

      <h2>5. Инвестиционные риски</h2>
      <div className="highlight">
        <p><strong>Важное предупреждение.</strong> Инвестирование в стартапы и проекты на ранних стадиях сопряжено с высоким риском. Вы можете потерять все вложенные средства. Перед принятием инвестиционного решения обязательно ознакомьтесь с <a href="/risks">Раскрытием инвестиционных рисков</a>.</p>
      </div>

      <h2>6. Реферальная программа</h2>
      <p>Условия реферальной программы, включая размер вознаграждения и порядок его начисления, определяются отдельным документом — <a href="/referral-terms">Условиями реферальной программы</a>. Компания вправе изменять условия программы, уведомив участников не менее чем за 14 дней.</p>

      <h2>7. Запрещённые действия</h2>
      <p>На платформе запрещается:</p>
      <ul>
        <li>Использование автоматизированных средств (ботов, скриптов) для взаимодействия с платформой</li>
        <li>Предоставление заведомо ложных данных при регистрации или KYC-верификации</li>
        <li>Создание нескольких аккаунтов одним лицом</li>
        <li>Использование платформы в целях легализации (отмывания) денежных средств</li>
        <li>Любые действия, направленные на нарушение безопасности платформы</li>
        <li>Размещение или распространение вредоносного программного обеспечения</li>
        <li>Несанкционированный сбор данных других пользователей</li>
      </ul>

      <h2>8. Интеллектуальная собственность</h2>
      <p>Все материалы платформы — дизайн, код, торговые марки, логотипы, тексты — являются собственностью ChefNet LLC и охраняются законодательством об интеллектуальной собственности. Воспроизведение, копирование или распространение материалов без письменного разрешения Компании запрещено.</p>

      <h2>9. Ограничение ответственности</h2>
      <p>Компания не несёт ответственности за:</p>
      <ul>
        <li>Убытки, связанные с инвестиционной деятельностью (снижение стоимости, потеря вложений)</li>
        <li>Действия третьих лиц, включая платёжные системы и контрагентов</li>
        <li>Технические сбои, перебои в работе интернета или форс-мажорные обстоятельства</li>
        <li>Неправомерные действия самого Пользователя</li>
      </ul>
      <p>Совокупная ответственность Компании перед Пользователем ни при каких обстоятельствах не превышает суммы комиссий, фактически уплаченных Пользователем за последние 12 месяцев.</p>

      <h2>10. Приостановление и блокировка аккаунта</h2>
      <p>Компания вправе приостановить или заблокировать аккаунт в случае:</p>
      <ul>
        <li>Нарушения настоящего Соглашения</li>
        <li>Подозрения в мошеннической деятельности или нарушениях AML</li>
        <li>Непрохождения KYC-верификации в установленные сроки</li>
        <li>Поступления запроса от уполномоченных государственных органов</li>
      </ul>

      <h2>11. Изменение Соглашения</h2>
      <p>Компания вправе вносить изменения в настоящее Соглашение. Уведомление о существенных изменениях направляется на электронную почту Пользователя не менее чем за 14 дней. Продолжение использования платформы после вступления изменений в силу означает принятие обновлённого Соглашения.</p>

      <h2>12. Применимое право и разрешение споров</h2>
      <p>Настоящее Соглашение регулируется законодательством штата Делавэр, США. Все споры подлежат рассмотрению в арбитражном порядке в соответствии с Правилами JAMS (Judicial Arbitration and Mediation Services). До обращения в арбитраж стороны обязуются предпринять попытку досудебного урегулирования в течение 30 дней.</p>

      <h2>13. Контакты</h2>
      <div className="highlight">
        <p><strong>ChefNet LLC</strong><br />
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
        <p>These Terms of Use ("Agreement") govern the relationship between ChefNet LLC ("Company") and users of the ChefNet Invest platform (chefnet.ai). By using the platform, you confirm your full agreement with these Terms.</p>
      </div>

      <h2>1. Parties and Subject Matter</h2>
      <p>This Agreement is between ChefNet LLC, incorporated in Delaware, USA (The Green STE B, Dover, DE 19901), and an individual who has registered on the ChefNet Invest platform ("User").</p>

      <h2>2. User Requirements</h2>
      <ul>
        <li>Must be 18 years of age or older</li>
        <li>Must have full legal capacity to enter into binding contracts</li>
        <li>Must complete mandatory identity verification (KYC)</li>
        <li>Must not appear on international sanctions lists</li>
        <li>Must use the platform for personal, non-commercial investment purposes</li>
      </ul>

      <h2>3. Account Registration and Security</h2>
      <ul>
        <li>Provide accurate, complete and current information</li>
        <li>Keep your credentials (login, password) confidential</li>
        <li>Immediately notify us of any unauthorised access to your account</li>
        <li>Not transfer your account to third parties</li>
      </ul>

      <h2>4. Investment Activity</h2>
      <ul>
        <li>Investments are made by participating in funding rounds open on the platform</li>
        <li>Minimum investment amounts are set by each round's terms</li>
        <li>An investment application becomes "Confirmed" only after Company review and approval</li>
        <li>Shares are credited to your account only after investment confirmation</li>
        <li>Payments accepted via bank transfer (SWIFT/SEPA) and cryptocurrency (USDT and other supported assets)</li>
      </ul>

      <h2>5. Investment Risks</h2>
      <div className="highlight">
        <p><strong>Important Warning.</strong> Investing in early-stage startups carries high risk. You may lose all invested funds. Before making an investment decision, please review the <a href="/risks">Investment Risk Disclosure</a>.</p>
      </div>

      <h2>6. Prohibited Actions</h2>
      <ul>
        <li>Use of automated tools (bots, scripts) to interact with the platform</li>
        <li>Providing false information during registration or KYC</li>
        <li>Creating multiple accounts</li>
        <li>Using the platform for money laundering purposes</li>
        <li>Any actions aimed at compromising platform security</li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>The Company is not liable for losses related to investment activity, actions of third parties, technical failures, or force majeure circumstances. The Company's total liability shall not exceed the amount of fees actually paid by the User in the last 12 months.</p>

      <h2>8. Governing Law</h2>
      <p>This Agreement is governed by the laws of the State of Delaware, USA. All disputes shall be resolved by arbitration under JAMS Rules.</p>

      <h2>9. Contact</h2>
      <div className="highlight">
        <p><strong>ChefNet LLC</strong><br />
        The Green STE B, Dover, DE 19901, USA<br />
        Email: <a href="mailto:legal@chefnet.ai">legal@chefnet.ai</a><br />
        Support: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a></p>
      </div>
    </div>
  );
}
