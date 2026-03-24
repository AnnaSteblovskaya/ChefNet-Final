import LegalLayout from './LegalLayout';
import { useLanguage } from '@/contexts/LanguageContext';

export default function RiskDisclosure() {
  const { language } = useLanguage();
  const isRu = language === 'ru';

  return (
    <LegalLayout
      titleRu="Раскрытие инвестиционных рисков"
      titleEn="Investment Risk Disclosure"
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
        <p><strong>Внимательно прочитайте настоящий документ перед принятием инвестиционного решения.</strong> Инвестирование в стартапы и проекты ранних стадий несёт существенные риски, включая полную потерю вложенных средств. Прошлые результаты не гарантируют будущей доходности.</p>
      </div>

      <h2>1. Общее предупреждение</h2>
      <p>ChefNet Invest является платформой краудфандинга акционерного капитала (equity crowdfunding) в секторе FoodTech. Инвестиции, осуществляемые через платформу, представляют собой вложения в компании на ранних стадиях развития. Такие инвестиции по своей природе являются высокорискованными и неликвидными.</p>

      <h2>2. Риск полной потери вложений</h2>
      <p>Большинство стартапов не достигают коммерческого успеха. Вы должны быть готовы к тому, что можете потерять 100% вложенных средств. Инвестируйте только те средства, потерю которых вы можете себе позволить, не нанося ущерба вашему финансовому положению.</p>

      <h2>3. Риск низкой ликвидности</h2>
      <ul>
        <li>Акции (доли) стартапов не обращаются на публичных рынках</li>
        <li>Возможность продажи акций третьим лицам ограничена и не гарантирована</li>
        <li>Вы можете быть не в состоянии вернуть вложенные средства в желаемые сроки</li>
        <li>Инвестиционный горизонт, как правило, составляет от 3 до 10 лет</li>
      </ul>

      <h2>4. Риски, связанные с бизнесом</h2>
      <ul>
        <li><strong>Операционный риск:</strong> компания может не суметь реализовать свою бизнес-модель</li>
        <li><strong>Рыночный риск:</strong> рыночные условия могут измениться таким образом, что продукт или услуга компании окажутся невостребованными</li>
        <li><strong>Конкурентный риск:</strong> появление сильных конкурентов может существенно снизить рыночную долю компании</li>
        <li><strong>Риск ключевых лиц:</strong> уход основателей или ключевых сотрудников может негативно сказаться на деятельности компании</li>
        <li><strong>Технологический риск:</strong> технологии, лежащие в основе продукта, могут устареть или оказаться нереализуемыми</li>
        <li><strong>Регуляторный риск:</strong> изменения в законодательстве могут повлечь ограничения для деятельности компании</li>
      </ul>

      <h2>5. Риск разводнения</h2>
      <p>В будущих раундах финансирования компания может привлекать новых инвесторов на условиях, предусматривающих выпуск дополнительных акций. Это приведёт к пропорциональному уменьшению (разводнению) вашей доли в компании. Защита от разводнения не гарантируется.</p>

      <h2>6. Валютный риск</h2>
      <p>Инвестиции принимаются в долларах США и криптовалюте. Если ваша базовая валюта отличается от USD, колебания валютных курсов могут повлиять на реальную стоимость ваших вложений и доходность.</p>

      <h2>7. Риск мошенничества</h2>
      <p>Несмотря на проведение проверок компаний, размещающих раунды на платформе, ChefNet LLC не может гарантировать достоверность всей предоставленной ими информации. Существует риск того, что данные о компании окажутся неполными или недостоверными.</p>

      <h2>8. Риск платформы</h2>
      <ul>
        <li>В случае прекращения деятельности ChefNet LLC ваши права на акции сохраняются, однако управление ими может осложниться</li>
        <li>Технические сбои могут временно ограничить доступ к платформе</li>
        <li>Кибератаки могут представлять угрозу сохранности данных</li>
      </ul>

      <h2>9. Риски, связанные с криптовалютными платежами</h2>
      <p>При оплате инвестиций в криптовалюте:</p>
      <ul>
        <li>Стоимость криптовалют подвержена значительным колебаниям</li>
        <li>Транзакции в блокчейне являются необратимыми</li>
        <li>Ошибочно указанный адрес кошелька может привести к безвозвратной потере средств</li>
        <li>Регуляторный статус криптовалют может измениться</li>
      </ul>

      <h2>10. Налоговые риски</h2>
      <p>Инвестиционный доход может облагаться налогом в вашей юрисдикции. Налоговое законодательство в отношении криптовалютных активов и акций стартапов различается в зависимости от страны и может меняться. Рекомендуем проконсультироваться с налоговым советником.</p>

      <h2>11. Диверсификация</h2>
      <div className="highlight">
        <p>Не концентрируйте весь инвестиционный портфель в одном проекте. Диверсификация — ключевой инструмент управления рисками. Рекомендуется инвестировать в несколько проектов, распределяя риски, и не вкладывать в стартапы более 10% своего инвестиционного портфеля.</p>
      </div>

      <h2>12. Профессиональная консультация</h2>
      <p>Перед принятием инвестиционного решения настоятельно рекомендуем:</p>
      <ul>
        <li>Проконсультироваться с независимым финансовым советником</li>
        <li>Ознакомиться со всей доступной документацией по раунду финансирования</li>
        <li>Самостоятельно провести Due Diligence (проверку) компании</li>
        <li>Оценить соответствие инвестиции вашему риск-профилю и инвестиционным целям</li>
      </ul>

      <h2>13. Не является инвестиционным советом</h2>
      <p>Никакая информация, размещённая на платформе ChefNet Invest, не является инвестиционным советом, рекомендацией или офертой по смыслу применимого законодательства. Все инвестиционные решения вы принимаете самостоятельно и несёте за них полную ответственность.</p>

      <h2>14. Подтверждение понимания рисков</h2>
      <div className="highlight">
        <p>Регистрируясь на платформе и участвуя в инвестиционных раундах, вы подтверждаете, что:<br />
        — ознакомились с настоящим документом и понимаете описанные риски;<br />
        — осознаёте возможность полной потери вложенных средств;<br />
        — принимаете инвестиционное решение самостоятельно и добровольно;<br />
        — не рассматриваете информацию на платформе как инвестиционный совет.</p>
      </div>
    </div>
  );
}

function EnContent() {
  return (
    <div className="prose-legal">
      <div className="highlight">
        <p><strong>Read this document carefully before making an investment decision.</strong> Investing in early-stage startups carries substantial risks, including complete loss of invested funds. Past performance does not guarantee future returns.</p>
      </div>

      <h2>1. General Warning</h2>
      <p>ChefNet Invest is an equity crowdfunding platform in the FoodTech sector. Investments made through the platform are stakes in early-stage companies. Such investments are inherently high-risk and illiquid.</p>

      <h2>2. Risk of Total Loss</h2>
      <p>Most startups do not achieve commercial success. You should be prepared to lose 100% of invested funds. Only invest money you can afford to lose without affecting your financial wellbeing.</p>

      <h2>3. Liquidity Risk</h2>
      <ul>
        <li>Startup shares do not trade on public markets</li>
        <li>The ability to sell shares to third parties is limited and not guaranteed</li>
        <li>You may be unable to recover your investment within a desired timeframe</li>
        <li>Investment horizon is typically 3 to 10 years</li>
      </ul>

      <h2>4. Business Risks</h2>
      <ul>
        <li><strong>Operational risk:</strong> the company may fail to execute its business model</li>
        <li><strong>Market risk:</strong> market conditions may change making the product unviable</li>
        <li><strong>Competition risk:</strong> strong competitors may reduce the company's market share</li>
        <li><strong>Key person risk:</strong> departure of founders or key staff may harm the business</li>
        <li><strong>Regulatory risk:</strong> changes in law may restrict company operations</li>
      </ul>

      <h2>5. Dilution Risk</h2>
      <p>In future funding rounds, the company may issue additional shares to new investors, proportionally reducing (diluting) your ownership stake. Anti-dilution protection is not guaranteed.</p>

      <h2>6. Currency Risk</h2>
      <p>Investments are accepted in USD and cryptocurrency. If your base currency differs from USD, exchange rate fluctuations may affect the real value of your investment.</p>

      <h2>7. Diversification</h2>
      <div className="highlight">
        <p>Do not concentrate your entire portfolio in one project. We recommend investing in multiple projects and not allocating more than 10% of your investment portfolio to startups.</p>
      </div>

      <h2>8. Not Investment Advice</h2>
      <p>No information on the ChefNet Invest platform constitutes investment advice, recommendation or offer under applicable law. All investment decisions are made solely by you and are your full responsibility.</p>

      <h2>9. Acknowledgement</h2>
      <div className="highlight">
        <p>By registering on the platform and participating in investment rounds, you confirm that you have read this document, understand the risks described, and acknowledge the possibility of total loss of invested funds.</p>
      </div>
    </div>
  );
}
