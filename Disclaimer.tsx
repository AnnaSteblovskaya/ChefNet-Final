import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Disclaimer() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Отказ от ответственности"
      titleEn="Disclaimer"
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
      <h2>1. Общий отказ от ответственности</h2>
      <p>
        ChefNet Invest («Платформа») — это инвестиционная платформа, принадлежащая ChefNet LLC и управляемая ею. Вся информация, материалы и содержание, доступные на сайте chefnet.ai, предоставляются исключительно в информационных целях. Данные материалы не предназначены для замены профессиональной консультации и не должны рассматриваться как индивидуальные инвестиционные рекомендации.
      </p>

      <h2>2. Это не финансовый совет</h2>
      <p>
        Ничего на chefnet.ai <span className="highlight">не является финансовым советом, инвестиционным советом, юридическим советом или налоговым советом</span>. Вся информация предоставляется в образовательных целях. Перед принятием каких-либо инвестиционных решений вы должны проконсультироваться с квалифицированными специалистами, включая:
      </p>
      <ul>
        <li>Лицензированного финансового консультанта или инвестиционного советника</li>
        <li>Квалифицированного налогового специалиста</li>
        <li>Компетентного юридического консультанта</li>
      </ul>

      <h2>3. Инвестиционные риски</h2>
      <p>
        Инвестирование сопряжено со значительными рисками. Вы должны полностью понимать и принимать следующие риски перед инвестированием:
      </p>
      <ul>
        <li><strong>Риск потери капитала:</strong> Все инвестиции связаны с риском, включая риск полной потери вложенного капитала</li>
        <li><strong>Прошлые результаты:</strong> Прошлые результаты не указывают на будущие результаты. Исторические данные о компании или сектора не гарантируют аналогичной производительности в будущем</li>
        <li><strong>Токенизированные акции:</strong> Акции, предлагаемые через Платформу, представляют собой токенизированные ценные бумаги и не являются публично торгуемыми ценными бумагами</li>
        <li><strong>Волатильность стоимости:</strong> Стоимость акций может колебаться значительно и непредсказуемо</li>
        <li><strong>Высокий риск стартапов:</strong> Инвестиции в стартапы и компании на ранних стадиях развития являются по своей природе высокорисковыми, и большинство таких компаний не добиваются успеха</li>
        <li><strong>Отсутствие гарантий:</strong> Нет гарантии возврата инвестиций, выплаты дивидендов или обеспечения ликвидности</li>
        <li><strong>Ограниченная ликвидность:</strong> Токенизированные акции могут быть менее ликвидны, чем публично торгуемые ценные бумаги, и их может быть сложнее продать</li>
      </ul>

      <h2>4. Отсутствие гарантии точности информации</h2>
      <p>
        Хотя мы стремимся обеспечить точность и полноту информации на Платформе, <span className="highlight">мы не даем никаких гарантий относительно полноты, надежности, своевременности или точности любой информации</span>. Информация предоставляется в том виде, в котором она есть, без каких-либо явных или подразумеваемых гарантий.
      </p>

      <h2>5. Нормативный статус</h2>
      <p>
        Важно понимать нормативный статус ChefNet LLC и Платформы:
      </p>
      <ul>
        <li><strong>ChefNet LLC не является:</strong> зарегистрированным брокером-дилером, инвестиционным консультантом, банком или кредитным учреждением</li>
        <li><strong>Платформа не зарегистрирована:</strong> в Комиссии по ценным бумагам и биржам (SEC), FINRA или в каком-либо другом органе, как биржа ценных бумаг</li>
        <li><strong>Отсутствие защиты инвесторов:</strong> Инвестиции через ChefNet Invest могут не быть покрыты схемами защиты инвесторов, включая Корпорацию по страхованию депозитов (FDIC) или Корпорацию по защите инвесторов ценных бумаг (SIPC)</li>
        <li><strong>Ответственность пользователя:</strong> Вы несете полную ответственность за соответствие всем применимым законам и нормативным актам вашей юрисдикции</li>
      </ul>

      <h2>6. Перспективные заявления</h2>
      <p>
        Любые прогнозы, оценки, прогнозы или перспективные заявления на Платформе сделаны на основе предположений и оценок, которые по своей природе являются неопределенными и подвергаются значительному риску. Фактические результаты могут существенно отличаться от любых перспективных заявлений. Мы не гарантируем достижение или достижение каких-либо целей, и никакие перспективные заявления не должны рассматриваться как гарантии будущих результатов.
      </p>

      <h2>7. Контент третьих сторон</h2>
      <p>
        Платформа может содержать ссылки на веб-сайты, приложения и услуги третьих сторон. <span className="highlight">Мы не несем ответственности за контент третьих сторон, ссылки или услуги</span>. Использование контента и услуг третьих сторон регулируется их условиями использования и политиками конфиденциальности. Мы рекомендуем вам проверить их перед использованием.
      </p>

      <h2>8. Территориальные ограничения</h2>
      <p>
        Платформа может быть недоступна во всех юрисдикциях. Вы несете полную ответственность за:
      </p>
      <ul>
        <li>Определение того, разрешено ли вам по закону использовать Платформу в вашей юрисдикции</li>
        <li>Соблюдение всех применимых местных, государственных и национальных законов и нормативных актов</li>
        <li>Уплату всех применимых налогов, включая налоги на заработок от инвестиций</li>
      </ul>
      <p>
        Если использование Платформы запрещено в вашей юрисдикции, вы не должны использовать Платформу.
      </p>

      <h2>9. Ограничение ответственности</h2>
      <p>
        <span className="highlight">ChefNet LLC не несет ответственность за какие-либо прямые, косвенные, случайные, специальные, штрафные или косвенные убытки</span>, включая, помимо прочего, убытки от потери прибыли, потери данных, потери использования или другие потери, связанные с использованием или невозможностью использования Платформы или контента, даже если ChefNet LLC была уведомлена о возможности таких убытков.
      </p>

      <h2>10. Отсутствие оферты или приглашения</h2>
      <p>
        Содержание Платформы <strong>не представляет собой предложение</强> продать, продать или предоставить какие-либо инвестиции, и не может рассматриваться как приглашение или заявка на покупку или продажу инвестиций в какой-либо юрисдикции, где такое предложение или приглашение было бы незаконным.
      </p>

      <h2>11. Контактная информация</h2>
      <p>
        По вопросам, связанным с этим отказом от ответственности или другим нормативным вопросам, пожалуйста, свяжитесь с нами по адресу:
      </p>
      <p>
        <strong>legal@chefnet.ai</strong>
      </p>
    </div>
  );
}

function EnContent() {
  return (
    <div className="prose-legal">
      <h2>1. General Disclaimer</h2>
      <p>
        ChefNet Invest ("Platform") is an investment platform owned and operated by ChefNet LLC. All information, materials, and content available on chefnet.ai are provided for informational purposes only. This material is not intended to serve as a substitute for professional advice and should not be considered as individual investment recommendations.
      </p>

      <h2>2. Not Financial Advice</h2>
      <p>
        Nothing on chefnet.ai <span className="highlight">constitutes financial advice, investment advice, legal advice, or tax advice</span>. All information is provided for educational purposes. Before making any investment decisions, you should consult with qualified professionals, including:
      </p>
      <ul>
        <li>A licensed financial advisor or investment advisor</li>
        <li>A qualified tax specialist or CPA</li>
        <li>A competent legal counsel</li>
      </ul>

      <h2>3. Investment Risks</h2>
      <p>
        Investing involves significant risks. You must fully understand and accept the following risks before investing:
      </p>
      <ul>
        <li><strong>Capital Loss Risk:</strong> All investments carry risk, including the risk of total loss of invested capital</li>
        <li><strong>Past Performance:</strong> Past performance does not guarantee future results. Historical data about a company or sector does not guarantee similar performance in the future</li>
        <li><strong>Tokenized Shares:</strong> Shares offered through the Platform represent tokenized securities and are not publicly traded securities</li>
        <li><strong>Value Volatility:</strong> The value of shares may fluctuate significantly and unpredictably</li>
        <li><strong>Startup Risk:</strong> Investments in startups and early-stage companies are inherently high-risk, and the vast majority of such companies do not succeed</li>
        <li><strong>No Guarantee of Returns:</strong> There is no guarantee of return on investment, payment of dividends, or provision of liquidity</li>
        <li><strong>Limited Liquidity:</strong> Tokenized shares may be less liquid than publicly traded securities and may be difficult to sell</li>
      </ul>

      <h2>4. No Guarantee of Accuracy</h2>
      <p>
        While we strive to provide accurate and complete information on the Platform, <span className="highlight">we make no representations or warranties regarding the completeness, reliability, timeliness, or accuracy of any information</span>. Information is provided "as-is" without any express or implied warranties.
      </p>

      <h2>5. Regulatory Status</h2>
      <p>
        It is important to understand the regulatory status of ChefNet LLC and the Platform:
      </p>
      <ul>
        <li><strong>ChefNet LLC is not:</strong> a registered broker-dealer, investment advisor, bank, or financial institution</li>
        <li><strong>The Platform is not registered:</strong> with the Securities and Exchange Commission (SEC), FINRA, or any other regulatory body as a securities exchange</li>
        <li><strong>No Investor Protection:</strong> Investments through ChefNet Invest may not be covered by investor protection schemes, including the Federal Deposit Insurance Corporation (FDIC) or the Securities Investor Protection Corporation (SIPC)</li>
        <li><strong>Your Responsibility:</strong> You are solely responsible for compliance with all applicable laws and regulations in your jurisdiction</li>
      </ul>

      <h2>6. Forward-Looking Statements</h2>
      <p>
        Any projections, estimates, forecasts, or forward-looking statements on the Platform are made based on assumptions and estimates that are inherently uncertain and subject to significant risk. Actual results may differ materially from any forward-looking statements. We do not guarantee the achievement of any objectives, and no forward-looking statements should be considered guarantees of future results.
      </p>

      <h2>7. Third-Party Content</h2>
      <p>
        The Platform may contain links to third-party websites, applications, and services. <span className="highlight">We are not responsible for third-party content, links, or services</span>. Use of third-party content and services is governed by their terms of use and privacy policies. We encourage you to review these before use.
      </p>

      <h2>8. Jurisdictional Restrictions</h2>
      <p>
        The Platform may not be available in all jurisdictions. You are solely responsible for:
      </p>
      <ul>
        <li>Determining whether you are legally permitted to use the Platform in your jurisdiction</li>
        <li>Complying with all applicable local, state, and national laws and regulations</li>
        <li>Paying all applicable taxes, including taxes on investment income</li>
      </ul>
      <p>
        If the use of the Platform is prohibited in your jurisdiction, you should not use the Platform.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        <span className="highlight">ChefNet LLC shall not be liable for any direct, indirect, incidental, special, punitive, or consequential damages</span>, including but not limited to loss of profits, loss of data, loss of use, or other losses arising out of or relating to the use of or inability to use the Platform or content, even if ChefNet LLC has been advised of the possibility of such damages.
      </p>

      <h2>10. No Solicitation</h2>
      <p>
        The content on the Platform <strong>does not constitute an offer</strong> to sell, supply, or provide any investment, and may not be considered as an invitation or bid to purchase or sell investments in any jurisdiction where such offer or invitation would be unlawful.
      </p>

      <h2>11. Contact Information</h2>
      <p>
        For questions regarding this Disclaimer or other regulatory matters, please contact us at:
      </p>
      <p>
        <strong>legal@chefnet.ai</strong>
      </p>
    </div>
  );
}
