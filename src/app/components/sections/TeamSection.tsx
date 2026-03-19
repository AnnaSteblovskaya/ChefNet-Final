import { motion } from 'motion/react';
import IconBox from '@/app/components/IconBox';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import { useSiteContent } from '@/contexts/SiteContentContext';
const alexeyPhoto = '/assets/5161dcbea8f660508ae7dab63631acefabe12971.png';
const dmitryPhoto = '/assets/4a68720d7087b9ff89ce0e0efb17d5c8e247bd8e.png';
const vladimirPhoto = '/assets/da745cecc8434d3bd83de9d68ada3703476ca78e.png';
const yuriyPhoto = '/assets/799ef95bc799834f2fdd3d37bd119941ff5b38c9.png';
const teamIcon = '/assets/a598161e6a3a78bc81c07fa776406dfb88d60efe.png';

export default function TeamSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const { get } = useSiteContent();
  const lang = language as 'ru'|'en'|'de'|'es'|'tr';

  const rawMembers = [
    {
      id: 1,
      name: language === 'en' ? 'Alexey Steblovsky' : language === 'de' ? 'Alexey Steblovsky' : language === 'tr' ? 'Alexey Steblovsky' : language === 'es' ? 'Alexey Steblovsky' : 'Алексей Стебловский',
      position: language === 'en' ? 'CEO & Founder, ChefNet' : language === 'de' ? 'CEO & Gründer, ChefNet' : language === 'tr' ? 'ChefNet Yönetim Kurulu Başkanı ve Kurucu' : language === 'es' ? 'Director Ejecutivo y Fundador, ChefNet' : 'CEO, основатель ChefNet',
      image: alexeyPhoto,
      imagePosition: 'right' as const,
      points: language === 'en' ? [
        'Graduate of the International Institute of Business and Law (IIBL).',
        'Brings over 15 years of experience in building and leading large-scale distributed teams exceeding 10,000 professionals.',
        'Has hands-on expertise in designing and scaling international business systems across more than 20 countries, including establishing management frameworks, launching operational workflows, and developing strategic partner ecosystems.'
      ] : language === 'de' ? [
        'Absolvent des Internationalen Instituts für Wirtschaft und Recht (IIWR).',
        'Verfügt über mehr als 15 Jahre Erfahrung im Aufbau und der Führung großskaliger, dezentraler Teams mit über 10.000 Fachkräften.',
        'Praktische Expertise in der Konzeption und Skalierung internationaler Geschäftssysteme in über 20 Ländern – inklusive Etablierung von Managementstrukturen, Implementierung operativer Prozesse und Entwicklung strategischer Partnernetzwerke.'
      ] : language === 'tr' ? [
        'Uluslararası İşletme ve Hukuk Enstitüsü (UIHE) mezunu.',
        '10.000\'den fazla profesyonelin yer aldığı büyük ölçekli dağıtık ekiplerin kurulması ve yönetilmesinde 15 yılı aşkın deneyime sahip.',
        '20\'den fazla ülkede uluslararası iş sistemlerinin tasarımı ve ölçeklendirilmesi konusunda saha tecrübesi bulunuyor; yönetim çerçevelerinin oluşturulması, operasyonel iş akışlarının devreye alınması ve stratejik ortaklık ekosistemlerinin geliştirilmesi dahil.'
      ] : language === 'es' ? [
        'Egresado del Instituto Internacional de Administración de Empresas y Derecho (IIAED).',
        'Cuenta con más de 15 años de experiencia en la creación y liderazgo de equipos distribuidos a gran escala, superando los 10.000 profesionales.',
        'Experto práctico en el diseño y escalado de sistemas empresariales internacionales en más de 20 países, incluyendo la estructuración de marcos gerenciales, lanzamiento de procesos operativos y desarrollo de ecosistemas estratégicos de socios.'
      ] : [
        'Выпускник Международного института управления бизнеса и права (МИУБП).',
        'Обладает более чем 15-летним опытом в создании и управлении крупными распределёнными командами численностью свыше 10 000 человек.',
        'Имеет практический опыт построения и масштабирования международных бизнес-систем в более чем 20 странах, включая формирование управленческих структр, запуск операционных процессов и выстраивание партнёрских экосистем.'
      ],
      summary: language === 'en' ? 'At ChefNet, Alexey is responsible for corporate strategy, long-term product vision, business architecture, and the expansion of global partnerships.' : language === 'de' ? 'Bei ChefNet verantwortet Alexey die Unternehmensstrategie, die langfristige Produktvision, die Geschäftsarchitektur sowie den Ausbau weltweit agierender Partnerschaften.' : language === 'tr' ? 'ChefNet\'te kurumsal strateji, uzun vadeli ürün vizyonu, iş mimarisi ve küresel ortaklıkların genişletilmesinden sorumlu.' : language === 'es' ? 'En ChefNet, Alexey lidera la estrategia corporativa, la visión de producto a largo plazo, la arquitectura empresarial y la expansión de alianzas globales.' : 'В ChefNet отвечает за стратегию, долгосрочное видение продукта, архитектуру бизнеса и развитие международных партнёрств.'
    },
    {
      id: 2,
      name: language === 'en' ? 'Dmitry Vaganov' : language === 'de' ? 'Dmitry Vaganov' : language === 'tr' ? 'Dmitry Vaganov' : language === 'es' ? 'Dmitry Vaganov' : 'Дмитрий Ваганов',
      position: language === 'en' ? 'Chief Operating Officer / Managing Director' : language === 'de' ? 'Chief Operating Officer / Geschäftsführer' : language === 'tr' ? 'Operasyon Direktörü / Yönetici Direktör' : language === 'es' ? 'Director de Operaciones / Director General' : 'Генеральный директор (COO / Managing Director)',
      image: dmitryPhoto,
      imagePosition: 'left' as const,
      points: language === 'en' ? [
        'A seasoned professional in banking operations, international payments, and payment processing.',
        'Brings deep expertise in financial infrastructure, regulatory compliance, settlement systems, and the integration of payment solutions across international markets.'
      ] : language === 'de' ? [
        'Langjähriger Experte für Bankbetriebsabläufe, internationale Zahlungsverkehre und Payment-Processing.',
        'Verfügt über tiefgreifende Fachkompetenz in Finanzinfrastruktur, regulatorischem Compliance, Abrechnungssystemen sowie der Integration von Zahlungslösungen auf internationalen Märkten.'
      ] : language === 'tr' ? [
        'Bankacılık operasyonları, uluslararası ödemeler ve ödeme süreç yönetimi alanlarında deneyimli bir uzman.',
        'Finansal altyapı, mevzuata uyum (compliance), takas sistemleri ve küresel pazarlarda ödeme çözümlerinin entegrasyonu konularında derin uzmanlığa sahip.'
      ] : language === 'es' ? [
        'Profesional con amplia trayectoria en operaciones bancarias, pagos internacionales y procesamiento de transacciones.',
        'Cuenta con expertise profundo en infraestructura financiera, cumplimiento normativo, sistemas de liquidación e integración de soluciones de pago en mercados globales.'
      ] : [
        'Профессионал в сфере банковских операций, международных переводов и платёжного процессинга.',
        'Имеет глубокую экспертизу в области финансовой инфраструктуры, комплаенса, расчётных систем и интеграции платёжных решений на международных рынках.'
      ],
      summary: language === 'en' ? 'At ChefNet, Dmitry oversees operational execution, financial processes, payment mechanisms, and collaboration with financial and technology partners.' : language === 'de' ? 'Bei ChefNet verantwortet Dmitry die operative Umsetzung, Finanzprozesse, Zahlungsabwicklungssysteme sowie die strategische Zusammenarbeit mit Finanz- und Technologiepartnern.' : language === 'tr' ? 'ChefNet\'te operasyonel yürütme, finansal süreçler, ödeme mekanizmaları ile finansal ve teknoloji ortaklarıyla stratejik iş birliklerinden sorumlu.' : language === 'es' ? 'En ChefNet, Dmitry lidera la ejecución operativa, procesos financieros, mecanismos de pago y la colaboración estratégica con socios financieros y tecnológicos.' : 'В ChefNet курирует операционную деятельность, финансовые процессы, платёжные механизмы и взаимодействие с финансовыми и технологическими партнёрами.'
    },
    {
      id: 3,
      name: language === 'en' ? 'Vladimir Rakhov' : language === 'de' ? 'Vladimir Rakhov' : language === 'tr' ? 'Vladimir Rakhov' : language === 'es' ? 'Vladimir Rakhov' : 'Владимир Рахов',
      position: language === 'en' ? 'Chief Development Officer (CDO)' : language === 'de' ? 'Chief Development Officer (CDO) / Leiter Unternehmensentwicklung' : language === 'tr' ? 'Kurumsal Gelişim Direktörü (CDO)' : language === 'es' ? 'Director de Desarrollo Corporativo (CDO)' : 'Директор по развитию (Chief Development Officer)',
      image: vladimirPhoto,
      imagePosition: 'right' as const,
      points: language === 'en' ? [
        'Specializes in strategic marketing, international partnership development, and designing global scaling strategies.',
        'Demonstrates a proven track record in launching products into new markets, building robust partner networks, and crafting long-term growth strategies.'
      ] : language === 'de' ? [
        'Experte für strategisches Marketing, Aufbau internationaler Partnerschaften und Entwicklung globaler Skalierungsstrategien.',
        'Verfügt über eine nachweisliche Erfolgsbilanz bei der Markteinführung von Produkten in neuen Regionen, dem Aufbau leistungsstarker Partnernetzwerke sowie der Konzeption langfristiger Wachstumsstrategien.'
      ] : language === 'tr' ? [
        'Stratejik pazarlama, uluslararası ortaklık ağları geliştirme ve küresel büyüme stratejileri tasarlamada uzmanlaşmış.',
        'Yeni pazarlara ürün girişleri, dayanıklı ortaklık ekosistemleri inşa etme ve sürdürülebilir uzun vadeli büyüme stratejileri oluşturma alanlarında kanıtlanmış başarılar elde etti.'
      ] : language === 'es' ? [
        'Especialista en marketing estratégico, creación de alianzas internacionales y diseño de estrategias de expansión global.',
        'Cuenta con un historial comprobado en lanzamientos exitosos en mercados emergentes, construcción de redes sólidas de socios y elaboración de estrategias sostenibles de crecimiento a largo plazo.'
      ] : [
        'Специалист в области стратегического маркетинга, развития международных отношений и построения глобальных планов масштабирования.',
        'Имеет опыт вывода продуктов на новые рынки, формирования партнёрских сетей и разработки долгосрочных стратегий роста.'
      ],
      summary: language === 'en' ? 'At ChefNet, Vladimir oversees ecosystem development, international expansion initiatives, strategic alliances, and the coordination of partner programs.' : language === 'de' ? 'Bei ChefNet verantwortet Vladimir die Entwicklung des Unternehmensökosystems, internationale Expansionsprojekte, strategische Partnerschaften und die ganzheitliche Koordination aller Partnerprogramme.' : language === 'tr' ? 'ChefNet\'te ekosistem gelişimini, uluslararası büyüme girişimlerini, stratejik ortaklıkları ve ortaklık programlarının entegre yönetimi yürütüyor.' : language === 'es' ? 'En ChefNet, Vladimir lidera el desarrollo del ecosistema, las iniciativas de expansión internacional, las alianzas estratégicas y la coordinación integral de programas de colaboración.' : 'В ChefNet отвечает за развитие экосистемы, международную экспансию, стратегические альянсы и координацию партнёрских программ.'
    },
    {
      id: 4,
      name: language === 'en' ? 'Yuri Matyushkin' : language === 'de' ? 'Yuri Matyushkin' : language === 'tr' ? 'Yuri Matyushkin' : language === 'es' ? 'Yuri Matyushkin' : 'Юрий Матюшкин',
      position: language === 'en' ? 'Chief Design Officer, ChefNet' : language === 'de' ? 'Chief Design Officer, ChefNet' : language === 'tr' ? 'ChefNet Tasarım Müdürü (CDO)' : language === 'es' ? 'Director de Diseño, ChefNet' : 'Дизайнер-директор ChefNet (Chief Design Officer)',
      image: yuriyPhoto,
      imagePosition: 'left' as const,
      points: language === 'en' ? [
        'Chief Design Officer with over 20 years of experience in UI/UX and comprehensive visual systems. Expert in a broad range of design disciplines: product design, user interfaces, brand identity, design systems, and visual strategy.',
        'Has elevated hundreds of digital and commercial projects to industry-leading status across markets in Europe, the CIS countries, and Asia. Possesses deep expertise in creating scalable design solutions for international products and high-traffic platforms.'
      ] : language === 'de' ? [
        'Design-Executive mit über 20 Jahren Expertise in UI/UX und ganzheitlichen visuellen Systemen. Anerkannter Experte in sämtlichen Design-Disziplinen: Produktgestaltung, Benutzeroberflächen, Markenidentität, Gestaltungssysteme und visuelle Strategieentwicklung.',
        'Führte hunderte digitale und kommerzielle Projekte zu Marktführerpositionen in europäischen, GUS- und asiatischen Märkten. Tiefgehende Spezialisierung auf skalierbare Designlösungen für globale Produkte und plattformübergreifende Hochlastsysteme.'
      ] : language === 'tr' ? [
        'UI/UX ve kapsamlı görsel sistemler alanında 20 yılı aşkın deneyim sahibi bir tasarım yöneticisi. Ürün tasarımı, kullanıcı arayüzleri, kurumsal kimlik, tasarım sistemleri ve görsel strateji dahil çoklu disiplinlerde tanınmış bir uzman.',
        'Avrupa, BDT ve Asya pazarlarında yüzlerce dijital ve ticari projeyi sektörün lider konumlarına taşıdı. Küresel ürünler ve yüksek trafiğe sahip platformlar için ölçeklenebilir tasarım çözümleri oluşturmada derin uzmanlığa sahip.'
      ] : language === 'es' ? [
        'Ejecutivo de diseño con más de 20 años de experiencia en UI/UX y sistemas visuales integrales. Experto reconocido en múltiples disciplinas: diseño de producto, interfaces de usuario, identidad de marca, sistemas de diseño y estrategia visual.',
        'Ha posicionado cientos de proyectos digitales y comerciales como líderes sectoriales en mercados europeos, de la CEI y asiáticos. Experticia consolidada en soluciones de diseño escalables para productos globales y plataformas de alto tráfico.'
      ] : [
        'Шеф-директор по дизайну с более чем 20-летним опытом в области UI/UX и комплексных визуальных систем. Эксперт в широком спектре дизайнерских дисциплин: продуктовый дизайн, пользовательские интерфейсы, бренд-айдентика, дизайн-системы и визуальная стратегия.',
        'Вывел сотни цифровых и коммерческих проектов в лидеры отрасли на рынках Европы, стран СНГ и Азии. Обладает глубокой экспертизой в создании масштабируемых дизайн-решений для международных продуктов и высоконагруженных платформ.'
      ],
      summary: language === 'en' ? 'At ChefNet, responsible for design strategy, the integrity of the product\'s visual identity, user experience, and the development of the ChefNet ecosystem\'s design system on a global scale.' : language === 'de' ? 'Bei ChefNet verantwortet Yuri die Gesamt-Designstrategie, visuelle Stringenz des Produkts, die durchgängige Nutzererfahrung sowie die Weiterentwicklung des ökosystemübergreifenden Gestaltungssystems im globalen Maßstab.' : language === 'tr' ? 'ChefNet\'te Yuri, genel tasarım stratejisi, ürünün görsel tutarlılığı, uçtan uca kullanıcı deneyimi ve ChefNet ekosisteminin küresel ölçekte tasarım sisteminin evriminden sorumludur.' : language === 'es' ? 'En ChefNet, Yuri lidera la estrategia de diseño integral, coherencia visual del producto, experiencia completa del usuario y la evolución del sistema de diseño unificado en todo el ecosistema a nivel mundial.' : 'В ChefNet отвечает за дизайн-стратегию, целостность визуального образа продукта, пользовательский опыт и развитие дизайн-системы экосистемы ChefNet на глобальном уровне.'
    }
  ];

  const teamMembers = rawMembers.map((m, idx) => {
    const n = idx + 1;
    return {
      ...m,
      name: get(`member${n}_name`, lang, m.name),
      position: get(`member${n}_position`, lang, m.position),
      summary: get(`member${n}_summary`, lang, m.summary),
      points: m.points.map((p: string, pi: number) => get(`member${n}_p${pi + 1}`, lang, p)).filter(Boolean),
    };
  });

  return (
    <section id="team" className="py-12 bg-[#F5EAE1] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          {/* Team Icon */}
          <IconBox delay={0.2}>
            <img 
              src={teamIcon} 
              alt="Team Icon" 
              className="w-16 h-16 relative z-10 drop-shadow-lg" 
              style={{ 
                filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(346deg) brightness(118%) contrast(97%)'
              }} 
            />
          </IconBox>

          <h2 className="text-4xl md:text-5xl font-bold text-[#3E3E3E] mb-4 mt-6 sm:mt-8">
            {get('team_section_title', lang, t.team)}
          </h2>
        </motion.div>

        {/* Team Members */}
        <div className="space-y-8 md:space-y-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex flex-col ${ 
                member.imagePosition === 'right' ? 'md:flex-row' : 'md:flex-row-reverse'
              } gap-0 bg-white rounded-[32px] shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group hover:border-[#FB7F43] md:h-[500px]`}
            >
              {/* Image with Gradient Overlay */}
              <div className="md:w-[40%] flex-shrink-0 relative overflow-hidden h-[400px] md:h-auto bg-white">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content with Modern Design */}
              <div className="md:w-[60%] p-6 md:p-6 flex flex-col justify-center bg-gradient-to-br from-white to-[#F5EAE1]/30">
                
                {/* Name and Position */}
                <div className="mb-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#3E3E3E] mb-2 tracking-tight">
                    {member.name}
                  </h3>
                  <p className="text-[#FB7F43] text-sm md:text-base font-medium">
                    {member.position}
                  </p>
                </div>

                {/* Points */}
                <div className="space-y-2.5 mb-4">
                  {member.points.map((point, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                      className="flex items-start gap-3 group/item"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FB7F43] flex-shrink-0 mt-1.5 shadow-md group-hover/item:scale-110 transition-transform duration-300">
                      </div>
                      <p className="text-[#3E3E3E] text-base md:text-lg leading-snug">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Summary */}
                {member.summary && (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + member.points.length * 0.1 }}
                    className="pt-4 border-t border-[#FB7F43]/20"
                  >
                    <p className="text-[#3E3E3E] text-base md:text-lg leading-snug font-medium">
                      {member.summary}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#4A3F35] leading-tight">
            {t.ctaBannerTitle}
            <br />
            {t.ctaBannerHighlight}
            <span className="text-[#FF6B35]">{t.ctaBannerHighlightBrand}</span>
            {t.ctaBannerSuffix}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}