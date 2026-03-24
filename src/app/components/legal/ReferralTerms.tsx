import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ReferralTerms() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Условия реферальной программы"
      titleEn="Referral Program Terms"
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
        <p>Настоящие Условия реферальной программы («Условия») описывают порядок участия в реферальной программе платформы ChefNet Invest и применяются ко всем зарегистрированным пользователям платформы chefnet.ai.</p>
      </div>

      <h2>1. Общие положения</h2>
      <p>Реферальная программа ChefNet Invest позволяет участникам получать вознаграждение в виде акций Компании за привлечение новых инвесторов на платформу. Программа направлена на развитие сообщества инвесторов и расширение экосистемы ChefNet.</p>

      <h2>2. Участие в программе</h2>
      <h3>2.1 Кто может участвовать</h3>
      <p>В реферальной программе может участвовать любой зарегистрированный пользователь платформы, прошедший верификацию личности (KYC). Участие в программе является добровольным.</p>

      <h3>2.2 Реферальный код</h3>
      <p>Каждому верифицированному пользователю автоматически присваивается уникальный персональный реферальный код вида <strong>CHEF-XXXXXX</strong>. Реферальный код доступен в разделе «Партнёрская программа» вашего личного кабинета.</p>

      <h3>2.3 Реферальная ссылка</h3>
      <p>Реферальная ссылка формируется автоматически и имеет вид: <code>https://chefnet.ai/?ref=CHEF-XXXXXX</code>. При переходе нового пользователя по реферальной ссылке он привязывается к вашему аккаунту.</p>

      <h2>3. Условия начисления вознаграждения</h2>
      <h3>3.1 Размер вознаграждения</h3>
      <p>Реферальное вознаграждение составляет <strong>10% от суммы подтверждённой инвестиции</strong> привлечённого вами партнёра. Вознаграждение выплачивается в форме акций ChefNet соответствующего инвестиционного раунда.</p>

      <h3>3.2 Условия для начисления</h3>
      <p>Вознаграждение начисляется при выполнении всех следующих условий:</p>
      <ul>
        <li>Новый пользователь зарегистрировался по вашей реферальной ссылке или с использованием вашего реферального кода</li>
        <li>Новый пользователь успешно прошёл KYC-верификацию</li>
        <li>Новый пользователь осуществил инвестицию, которая была <strong>подтверждена</strong> Компанией</li>
        <li>Ваш собственный аккаунт активен и не заблокирован</li>
      </ul>

      <h3>3.3 Тип вознаграждения</h3>
      <div className="highlight">
        <p>Вознаграждение выплачивается исключительно в форме <strong>акций ChefNet</strong> (долей в Компании). Выплата вознаграждения в денежной форме не предусмотрена. Акции зачисляются на ваш счёт на платформе после подтверждения инвестиции приглашённого партнёра и фиксируются в вашем портфеле.</p>
      </div>

      <h2>4. Ограничения программы</h2>
      <ul>
        <li>Самореферирование запрещено — вы не можете использовать собственный реферальный код при регистрации или инвестировании</li>
        <li>Вознаграждение начисляется только за первую подтверждённую инвестицию каждого привлечённого партнёра в каждом раунде</li>
        <li>Реферальные коды нельзя продавать, передавать или использовать в коммерческой рекламе без письменного согласия Компании</li>
        <li>Использование реферальной программы в мошеннических целях влечёт немедленную блокировку аккаунта и аннулирование всех начисленных вознаграждений</li>
        <li>Компания вправе ограничить количество рефералов от одного участника, если это предусмотрено условиями конкретного раунда</li>
      </ul>

      <h2>5. Многоуровневая структура</h2>
      <p>Реферальная программа является одноуровневой: вознаграждение начисляется только за прямо привлечённых вами партнёров. Вознаграждение за инвестиции партнёров ваших партнёров не предусмотрено.</p>

      <h2>6. Статистика и отчётность</h2>
      <p>В разделе «Партнёрская программа» личного кабинета вы можете отслеживать:</p>
      <ul>
        <li>Количество привлечённых партнёров и их статус (зарегистрирован, верифицирован, инвестировал)</li>
        <li>Суммы и статус подтверждённых инвестиций рефералов</li>
        <li>Начисленные и зачисленные акции-вознаграждения</li>
        <li>Историю реферальных транзакций</li>
      </ul>

      <h2>7. Налоговые обязательства</h2>
      <p>Участник программы самостоятельно несёт ответственность за декларирование и уплату налогов с реферального вознаграждения в соответствии с законодательством страны своего проживания. Компания не является налоговым агентом участников программы.</p>

      <h2>8. Запрещённые методы продвижения</h2>
      <p>При распространении реферальной ссылки запрещается:</p>
      <ul>
        <li>Использование спама, массовых рассылок и нежелательной рекламы</li>
        <li>Размещение рекламы на запрещённых площадках (адалт-сайты, торренты и т.п.)</li>
        <li>Введение потенциальных инвесторов в заблуждение относительно условий платформы</li>
        <li>Выдача себя за представителя или сотрудника ChefNet LLC</li>
        <li>Использование автоматизированных систем для искусственного генерирования переходов</li>
        <li>Обещание гарантированного дохода или возврата инвестиций</li>
      </ul>

      <h2>9. Изменение и отмена программы</h2>
      <p>Компания оставляет за собой право:</p>
      <ul>
        <li>Изменять размер вознаграждения, форму выплаты и иные условия программы, уведомив участников не менее чем за 14 дней</li>
        <li>Приостанавливать или прекращать действие программы в любое время с предварительным уведомлением</li>
        <li>Аннулировать начисленные вознаграждения в случае выявления нарушений условий программы</li>
      </ul>
      <p>Изменения не имеют обратной силы в отношении уже подтверждённых и выплаченных вознаграждений.</p>

      <h2>10. Антифрод-политика</h2>
      <p>Компания проводит регулярный мониторинг активности в рамках реферальной программы. При выявлении признаков мошеннической деятельности (фиктивные регистрации, самореферирование, использование ботов и т.д.) Компания вправе:</p>
      <ul>
        <li>Заблокировать аккаунт нарушителя без предварительного уведомления</li>
        <li>Аннулировать все начисленные вознаграждения</li>
        <li>Обратиться в правоохранительные органы при наличии оснований</li>
      </ul>

      <h2>11. Контакты</h2>
      <div className="highlight">
        <p>По вопросам реферальной программы:<br />
        <strong>ChefNet LLC</strong><br />
        Email: <a href="mailto:partners@chefnet.ai">partners@chefnet.ai</a><br />
        Поддержка: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a></p>
      </div>
    </div>
  );
}

function EnContent() {
  return (
    <div className="prose-legal">
      <div className="highlight">
        <p>These Referral Program Terms describe the participation rules for the ChefNet Invest referral program and apply to all registered users of the chefnet.ai platform.</p>
      </div>

      <h2>1. Overview</h2>
      <p>The ChefNet Invest referral program allows participants to earn a reward in ChefNet shares for attracting new investors to the platform.</p>

      <h2>2. Participation</h2>
      <p>Any registered and KYC-verified user of the platform may participate. Each verified user is automatically assigned a unique referral code in the format <strong>CHEF-XXXXXX</strong>, available in the "Referral Program" section of their dashboard.</p>

      <h2>3. Reward Terms</h2>
      <h3>3.1 Reward Amount</h3>
      <p>The referral reward is <strong>10% of the confirmed investment amount</strong> made by a referred partner. The reward is paid in the form of ChefNet shares from the corresponding investment round.</p>

      <h3>3.2 Conditions for Reward</h3>
      <ul>
        <li>The new user registered using your referral link or code</li>
        <li>The new user successfully passed KYC verification</li>
        <li>The new user made an investment that was <strong>confirmed</strong> by the Company</li>
        <li>Your account is active and not suspended</li>
      </ul>

      <div className="highlight">
        <p>Rewards are paid exclusively in <strong>ChefNet shares</strong>. Cash payment is not provided.</p>
      </div>

      <h2>4. Restrictions</h2>
      <ul>
        <li>Self-referral is prohibited</li>
        <li>Reward is accrued only for the first confirmed investment of each referred partner per round</li>
        <li>Using the program for fraudulent purposes results in immediate account suspension and cancellation of all rewards</li>
        <li>Promising guaranteed returns to referred partners is strictly prohibited</li>
      </ul>

      <h2>5. Program Changes</h2>
      <p>The Company reserves the right to modify or discontinue the program with at least 14 days' notice. Changes do not affect already confirmed and paid rewards.</p>

      <h2>6. Contact</h2>
      <div className="highlight">
        <p><strong>ChefNet LLC</strong><br />
        Email: <a href="mailto:partners@chefnet.ai">partners@chefnet.ai</a><br />
        Support: <a href="mailto:support@chefnet.ai">support@chefnet.ai</a></p>
      </div>
    </div>
  );
}
