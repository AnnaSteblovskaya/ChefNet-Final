import { motion } from 'motion/react';
import { Check, Circle, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translations } from '@/locales/translations';
import IconBox from '@/app/components/IconBox';
import { useState } from 'react';

export default function RoadmapSection() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const getRoadmapData = () => {
    const data: { [key: string]: any } = {
      en: [
        { 
          period: 'Q2 2026', 
          mainTitle: 'Foundation & MVP',
          title: 'Development & Alpha testing', 
          categories: [
            { label: 'Action:', text: 'MVP development (User App + Basic AI Panel + Scanner), AI Companion that you can tell: "Book me a quiet place for a date on Friday, Italian cuisine, budget $200", — and it will find, book, and add it to your calendar by itself.' },
            { label: 'Business:', text: 'Selection of a single city/region for launch. Customer development (CustDev) with 20 restaurants.' }
          ],
          kpi: '', 
          status: 'active' 
        },
        { 
          period: 'Q3 2026', 
          mainTitle: 'Soft launch',
          title: 'Direct sales', 
          categories: [
            { label: 'Business:', text: 'Onboarding the first 50 restaurants.' },
            { label: 'Marketing:', text: 'Local marketing campaigns and collaborations with micro-influencers.' }
          ],
          kpi: 'KPI: 2,000 active users, 50 restaurants onboarded, first confirmed transaction.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2026', 
          mainTitle: 'Product, marketing, and economics',
          title: 'Validation and iteration', 
          categories: [
            { label: 'Product:', text: 'Rollout of the booking and ordering system. User feedback collection. Retention optimization (driving repeat usage).' },
            { label: 'Business:', text: 'Hiring and scaling the sales team.' }
          ],
          kpi: 'KPI: 15K users, 150 restaurants. Positive unit economics (each order is profitable).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2027', 
          mainTitle: 'Preparation for scaling',
          title: 'Software enhancement', 
          categories: [
            { label: 'Tech:', text: 'Architecture optimization for high-load scalability. Personalization (AI recommendations v1).' },
            { label: 'Biz:', text: 'Legal and regulatory preparation for expansion into a new region (U.S. or EU).' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q2 2027', 
          mainTitle: 'Ecosystem development',
          title: 'Geographic expansion', 
          categories: [
            { label: 'Tech:', text: 'U.S. market entry (or Europe alternatively).' },
            { label: 'Biz:', text: 'Integration with local services (Uber, map platforms, delivery services).' }
          ],
          kpi: 'KPI: 100,000 active users, 500 partner restaurants.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q3 2027', 
          mainTitle: 'Marketing',
          title: 'Monetization & B2B value', 
          categories: [
            { label: 'Action:', text: 'Launch of a Premium subscription for users or SaaS tools for restaurants.' },
            { label: 'Business:', text: 'Implementation of embedded payments (integrated payment infrastructure).' }
          ],
          kpi: 'KPI: First meaningful revenue milestone ($100K ARR).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Growth stages',
          title: 'Aggressive marketing', 
          categories: [
            { label: 'Marketing:', text: 'Large-scale influencer campaigns and performance marketing.' },
            { label: 'Product:', text: 'Gamification (points, levels) to drive retention.' }
          ],
          kpi: 'KPI: 500K active users, 2K partner restaurants.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Social dining & events',
          title: 'Social impact & engagement', 
          categories: [
            { label: 'Action:', text: 'Launch of the "Shared Plans" feature: users can invite friends, vote on a restaurant, and automatically book a table.' },
            { label: 'Marketing:', text: 'In-app video reviews (Stories/TikTok-style) – trusted more than text-based feedback.' },
            { label: 'Monetization:', text: 'Ticket sales for gastro dinners, tastings, and exclusive chef events (premium content).' },
            { label: 'Business Strategy:', text: 'Focus on high-LTV markets (New York, London, Dubai) and strategic collaborations with ticketing platforms and event agencies.' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2028', 
          mainTitle: 'AI & FinTech 2.0 ecosystem',
          title: 'AI Companion & Intelligent payments', 
          categories: [
            { label: 'Action:', text: 'AI Companion as your personal secretary and partner who will plan your day, book tables for meetings in restaurants, and plan travel routes so you don\'t have to wait in queues to eat. Interactive restaurant menus adapt to each user.' },
            { label: 'Business:', text: 'Intelligent bill payments where each person pays for their own dishes in one click (no waiter needed).' }
          ],
          kpi: 'KPI: 1.5M–2M active users. Revenue: $8M–$10M (driven by commissions from reservations, ticketing, and fintech transactions).', 
          status: 'upcoming' 
        },
      ],
      ru: [
        { 
          period: 'Q2 2026', 
          mainTitle: 'Фундамент и MVP',
          title: 'Разработка и Alpha-тест', 
          categories: [
            { label: 'Действие:', text: 'Разработка MVP (User App + Basic AI Panel + Skaner), AI Companion, которому ты говоришь: «Забронируй мне тихое место для свидания в пятницу, итальянская кухня, бюджет $200», — и он сам находит, бронирует и добавляет в календарь.' },
            { label: 'Бизнес:', text: 'Выбор одного города/региона для запуска. Кастдев (CustDev) с 20 ресторанами.' }
          ],
          kpi: '', 
          status: 'active' 
        },
        { 
          period: 'Q3 2026', 
          mainTitle: 'Мягкий запуск',
          title: 'Ручные продажи', 
          categories: [
            { label: 'Бизнес:', text: 'Подключение первых 50 ресторанов.' },
            { label: 'Маркетинг:', text: 'Локальный маркетинг, работа с микро-инфлюенсерами.' }
          ],
          kpi: 'KPI: 2К активных пользователей, 50 ресторанов, подтвержденная первая транзакция.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2026', 
          mainTitle: 'Продукт, маркетинг и экономика',
          title: 'Проверка гипотез и доработка', 
          categories: [
            { label: 'Действие:', text: 'Внедрение системы бронирования/заказов. Сбор фидбека. Работа над Retention (чтобы люди возвращались).' },
            { label: 'Маркетинг:', text: 'Найм Sales-команды.' }
          ],
          kpi: 'KPI: 15К пользователей, 150 ресторанов. Positive Unit Economics (на одном заказе вы не теряете деньги).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2027', 
          mainTitle: 'Подготовка к масштабированию',
          title: 'Улучшение ПО', 
          categories: [
            { label: 'Действие:', text: 'Улучшение архитектуры под нагрузку. Персонализация (AI-рекомендации v1).' },
            { label: 'Бизнес:', text: 'Юридическая подготовка к выходу в новый регион (США или ЕС).' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q2 2027', 
          mainTitle: 'Развитие Экосистемы',
          title: 'Географическое расширение', 
          categories: [
            { label: 'Действие:', text: 'Выход на рынок США (или Европы).' },
            { label: 'Бизнес:', text: 'Интеграция с локальными сервисами (Uber/Maps/Delivery).' }
          ],
          kpi: 'KPI: 100К пользователей, 500 ресторанов.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q3 2027', 
          mainTitle: 'Маркетинг',
          title: 'Монетизация и B2B ценность', 
          categories: [
            { label: 'Действие:', text: 'Запуск Premium-подписки для юзеров или SaaS-инструментов для ресторанов.' },
            { label: 'Бизнес:', text: 'Внедрение встроенных платежей (Embedded Payments).' }
          ],
          kpi: 'KPI: Первая ощутимая выручка ($100K ARR).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Стадии роста',
          title: 'Агрессивный маркетинг', 
          categories: [
            { label: 'Marketing:', text: 'Масштабные компании с блогерами, Performance marketing.' },
            { label: 'Product:', text: 'Геймификация (баллы, уровни) для удержания.' }
          ],
          kpi: 'KPI: 500К пользователей, 2К ресторанов.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Совместные обеды и мероприятия',
          title: 'Социальная эффективность', 
          categories: [
            { label: 'Действие:', text: 'Запуск функции «Совместные планы»: возможность пригласить друзей, проголосовать за ресторан и автоматически забронировать стол.' },
            { label: 'Маркетинг:', text: 'Видео-отзывы (формат Stories/TikTok внутри приложения), которым доверяют больше, чем тексту.' },
            { label: 'Монтизация:', text: 'Продажа билетов на гастро-ужины, дегустации и закрытые мероприятия шеф-поваров (эксклюзивный контент).' },
            { label: 'Бизнес:', text: 'Фокус на High-LTV рынках (Нью-Йорк, Лондон, Дубай), Коллаборации с билетными операторами или Event-агентствами.' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2028', 
          mainTitle: 'Экосистема AI и финтех 2.0',
          title: 'AI Компаньон & интеллектуальные оплаты', 
          categories: [
            { label: 'Действие:', text: 'AI Companion, как твой личный секретарь и партнер, который спланирует твой день, забронирует столики для встреч в ресторанах, продумает маршрут поездки так, чтобы не пришлось стоять в очередях с целью поесть. Интерактивное меню ресторанов адаптируется под юзера.' },
            { label: 'Бизнес:', text: 'Интеллектуальная оплата счета, где каждый платит за свои блюда в один клик (без официанта).' }
          ],
          kpi: 'KPI: 1.5M - 2M активных пользователей. Выручка: $8M - $10M (за счет комиссий с брони, билетов и финтех-транзакций).', 
          status: 'upcoming' 
        },
      ],
      de: [
        { 
          period: 'Q2 2026', 
          mainTitle: 'Gründung & MVP',
          title: 'Entwicklung & Alpha-Testing', 
          categories: [
            { label: 'Aktion:', text: 'MVP-Entwicklung (Nutzer-App + Basic AI Panel + Scanner), AI Companion, dem Sie einfach sagen: „Reserviere einen ruhigen Ort für ein Date am Freitag, italienische Küche, Budget 200 $" – und er findet selbstständig, reserviert und fügt es Ihrem Kalender hinzu.' },
            { label: 'Geschäft:', text: 'Auswahl einer Stadt/Region für den Launch. Kundenvalidierung (CustDev) mit 20 Restaurants.' }
          ],
          kpi: '', 
          status: 'active' 
        },
        { 
          period: 'Q3 2026', 
          mainTitle: 'Sanftanlauf',
          title: 'Direktvertrieb', 
          categories: [
            { label: 'Geschäftsbereich:', text: 'Integration der ersten 50 Partnerrestaurants in die Plattform.' },
            { label: 'Marketing:', text: 'Lokale Kampagnen und strategische Kooperationen mit Mikroinfluencern.' }
          ],
          kpi: 'KPIs: 2.000 aktive Nutzer, 50 erfolgreich onboardete Restaurants, erste bestätigte Transaktion abgeschlossen.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2026', 
          mainTitle: 'Produkt, Marketing und Ökonomie',
          title: 'Validierung und Optimierung', 
          categories: [
            { label: 'Produkt:', text: 'Einführung des Buchungs- und Bestellsystems. Systematische Nutzerfeedback-Erhebung. Optimierung der Nutzerbindung (Steigerung der Wiederbenutzungsrate).' },
            { label: 'Geschäft:', text: 'Personalrekrutierung und Skalierung des Vertriebsteams (Aufbau regionaler Vertriebscluster).' }
          ],
          kpi: 'KPI: 15.000 aktive Nutzer, 150 Partner-Restaurants. Positive Transaktionsökonomie (jede Bestellung erwirtschaftet Gewinn).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2027', 
          mainTitle: 'Vorbereitung auf die Skalierung',
          title: 'Software-Optimierung', 
          categories: [
            { label: 'Tech:', text: 'Architekturoptimierung für Skalierbarkeit unter Hochlastbedingungen. Personalisierung (KI-Empfehlungen v1).' },
            { label: 'Biz:', text: 'Rechtliche und regulatorische Vorbereitung für die Expansion in eine neue Region (USA oder EU).' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q2 2027', 
          mainTitle: 'Ökosystem-Ausbau',
          title: 'Geografische Expansion', 
          categories: [
            { label: 'Tech:', text: 'Markteintritt in die USA (alternativ Europa).' },
            { label: 'Biz:', text: 'Integration lokaler Dienstleistungen (Uber, Kartenplattformen, Lieferdienste).' }
          ],
          kpi: 'KPI: 100.000 aktive Nutzer, 500 Partner-Restaurants.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q3 2027', 
          mainTitle: 'Marketing',
          title: 'Monetarisierung & B2B-Wertgenerierung', 
          categories: [
            { label: 'Maßnahme:', text: 'Einführung eines Premium-Abonnements für Endnutzer sowie SaaS-Lösungen speziell für Gastronomiebetriebe.' },
            { label: 'Geschäftsmodell:', text: 'Integration von Embedded-Payment-Systemen (direkt in die Plattform eingebundene Zahlungsabwicklung).' }
          ],
          kpi: 'KPI: Erreichen des ersten signifikanten Umsatzmeilensteins (100.000 USD Annual Recurring Revenue).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Wachstumsphasen',
          title: 'Offensive Wachstumsstrategie', 
          categories: [
            { label: 'Marketing:', text: 'Groß angelegte Influencer-Kampagnen und Performance-Marketing.' },
            { label: 'Produkt:', text: 'Gamification (Punktesystem, Level-Progression) zur Steigerung der Nutzerbindung.' }
          ],
          kpi: 'KPI: 500.000 aktive Nutzer, 2.000 angeschlossene Restaurants.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Gemeinschaftsgastronomie & Veranstaltungen',
          title: 'Gesellschaftliche Wirkung & Partizipation', 
          categories: [
            { label: 'Maßnahme:', text: 'Einführung der Funktion „Gemeinsame Pläne": Nutzer laden Freunde ein, stimmen über Restaurants ab und buchen Tische automatisch.' },
            { label: 'Marketing:', text: 'Video-Bewertungen im Stories/TikTok-Format (in-App) – genießen höheres Vertrauen als textbasierte Bewertungen.' },
            { label: 'Monetarisierung:', text: 'Ticketverkäufe für gastronomische Abendessen, Verkostungen und exklusive Chef-Events (Premium-Inhalte).' },
            { label: 'Geschäftsstrategie:', text: 'Fokus auf CLV-starke Märkte (New York, London, Dubai) sowie strategische Partnerschaften mit Ticketing-Plattformen und Event-Agenturen.' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2028', 
          mainTitle: 'KI & FinTech 2.0-Ökosystem',
          title: 'KI-Begleiter & Intelligente Zahlungsabwicklung', 
          categories: [
            { label: 'Produkt:', text: 'Ein KI-Begleiter als Ihr persönlicher Sekretär und Partner, der Ihren Tag plant, Tische für Treffen in Restaurants bucht und Reiserouten so gestaltet, dass Sie nicht in Warteschlangen für Essen stehen müssen. Restaurantmenüs passen sich dynamisch an jeden Nutzer an.' },
            { label: 'Geschäftsmodell:', text: 'Intelligente Rechnungsabwicklung, bei der jeder Gast mit einem Klick nur für seine eigenen Gerichte bezahlt – ohne Bedienungspersonal.' }
          ],
          kpi: 'KPI: 1,5–2 Mio. aktive Nutzer. Umsatz: 8–10 Mio. $ (generiert durch Provisionen aus Reservierungen, Ticketing und Fintech-Transaktionen).', 
          status: 'upcoming' 
        },
      ],
      es: [
        { 
          period: 'Q2 2026', 
          mainTitle: 'Creación y MVP',
          title: 'Desarrollo y pruebas alfa', 
          categories: [
            { label: 'Acción:', text: 'Desarrollo de MVP (App para usuarios + Basic AI Panel + Scanner), Asistente de IA al que simplemente le dices: «Reserva un lugar tranquilo para una cita el viernes, cocina italiana, presupuesto de 200 $» – y automáticamente encuentra, reserva y añade a tu calendario.' },
            { label: 'Negocio:', text: 'Selección de una ciudad/región para el lanzamiento. Validación con clientes (CustDev) en 20 restaurantes.' }
          ],
          kpi: '', 
          status: 'active' 
        },
        { 
          period: 'Q3 2026', 
          mainTitle: 'Lanzamiento controlado',
          title: 'Ventas directas', 
          categories: [
            { label: 'Negocio:', text: 'Incorporación de los primeros 50 restaurantes asociados a la plataforma.' },
            { label: 'Marketing:', text: 'Campañas locales y alianzas estratégicas con microinfluencers.' }
          ],
          kpi: 'Indicadores clave (KPI): 2.000 usuarios activos, 50 restaurantes integrados, primera transacción confirmada.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2026', 
          mainTitle: 'Producto, marketing y economía',
          title: 'Validación y optimización continua', 
          categories: [
            { label: 'Producto:', text: 'Lanzamiento del sistema de reservas y pedidos. Recopilación estructurada de feedback de usuarios. Optimización de retención (impulso del uso recurrente mediante engagement activo).' },
            { label: 'Negocio:', text: 'Contratación estratégica y escalado del equipo comercial (despliegue por zonas geográficas prioritarias).' }
          ],
          kpi: 'KPI: 15.000 usuarios activos, 150 restaurantes asociados. Rentabilidad por transacción positiva (cada pedido genera beneficio neto).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2027', 
          mainTitle: 'Preparación para el escalado',
          title: 'Optimización de Software', 
          categories: [
            { label: 'Tecnología:', text: 'Optimización de arquitectura para escalabilidad en alta demanda. Personalización (recomendaciones de IA v1).' },
            { label: 'Negocio:', text: 'Preparación legal y regulatoria para expansión a nueva región (EE.UU. o UE).' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q2 2027', 
          mainTitle: 'Desarrollo del ecosistema',
          title: 'Expansión geográfica', 
          categories: [
            { label: 'Tecnología:', text: 'Entrada en el mercado estadounidense (o europeo como alternativa).' },
            { label: 'Modelo de negocio:', text: 'Integración con servicios locales (Uber, Plataformas de mapas, Servicios de entrega).' }
          ],
          kpi: 'Indicadores clave (KPI): 100.000 usuarios activos, 500 restaurantes asociados.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q3 2027', 
          mainTitle: 'Marketing',
          title: 'Monetización y generación de valor B2B', 
          categories: [
            { label: 'Acción:', text: 'Lanzamiento de suscripción Premium para usuarios finales y herramientas SaaS específicas para restaurantes.' },
            { label: 'Negocio:', text: 'Implementación de sistemas de pagos embebidos (procesamiento de pagos integrado directamente en la plataforma).' }
          ],
          kpi: 'KPI: Alcanzar el primer hito significativo de ingresos (100.000 USD en Ingresos Anuales Recurrentes - ARR).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Etapas de crecimiento',
          title: 'Estrategia de marketing agresiva', 
          categories: [
            { label: 'Marketing:', text: 'Campañas masivas con influencers y marketing de rendimiento.' },
            { label: 'Producto:', text: 'Gamificación (sistema de puntos, niveles) para potenciar la retención de usuarios.' }
          ],
          kpi: 'KPI: 500.000 usuarios activos, 2.000 restaurantes asociados.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Experiencias gastronómicas compartidas & eventos',
          title: 'Impacto social y participación', 
          categories: [
            { label: 'Acción:', text: 'Lanzamiento de la función «Planes Compartidos»: los usuarios invitan amigos, votan por restaurantes y reservan mesas automáticamente.' },
            { label: 'Marketing:', text: 'Reseñas en video estilo Stories/TikTok (dentro de la app) – generan mayor confianza que valoraciones textuales.' },
            { label: 'Monetización:', text: 'Venta de entradas para cenas gastronómicas, degustaciones y eventos exclusivos con chefs (contenido premium).' },
            { label: 'Estrategia Empresarial:', text: 'Enfoque en mercados de alto CLV (valor vitalicio del cliente): Nueva York, Londres, Dubai. Colaboraciones estratégicas con plataformas de tickets y agencias de eventos.' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2028', 
          mainTitle: 'Ecosistema IA & FinTech 2.0',
          title: 'Asistente de IA & Pagos Inteligentes', 
          categories: [
            { label: 'Producto:', text: 'Un Asistente de IA al que simplemente le dices: «Reserva un lugar tranquilo para una cita el viernes, cocina italiana, presupuesto de 200 $» – y automáticamente encuentra el establecimiento, realiza la reserva y la añade a tu calendario. Los menús de los restaurantes se adaptan dinámicamente a cada usuario.' },
            { label: 'Modelo de Negocio:', text: 'Sistema inteligente de pagos de cuentas: cada comensal paga sus platos con un solo clic – sin necesidad de camarero.' }
          ],
          kpi: 'KPI: 1,5–2 millones de usuarios activos. Ingresos: 8–10 millones de $ (impulsados por comisiones de reservas, venta de entradas y transacciones fintech).', 
          status: 'upcoming' 
        },
      ],
      tr: [
        { 
          period: 'Q2 2026', 
          mainTitle: 'Kuruluş ve MVP',
          title: 'Gelişim & Alfa testleri', 
          categories: [
            { label: 'Eylem:', text: 'MVP geliştirme (Kullanıcı Uygulaması + Basic AI Panel + Scanner), Size „Cuma günü bir buluşma için sessiz bir yer ayırt, İtalyan mutfağı, bütçe 200 $\" diyerek talimat verebileceğiniz bir Yapay Zekâlı Rehber – mekanı otomatik olarak bulur, rezervasyonu yapar ve takviminize ekler.' },
            { label: 'İş:', text: 'Başlangıç için tek bir şehir/bölge seçimi. 20 restoran ile müşteri ihtiyaç analizi (CustDev).' }
          ],
          kpi: '', 
          status: 'active' 
        },
        { 
          period: 'Q3 2026', 
          mainTitle: 'Sınırlı lansman',
          title: 'Doğrudan satış', 
          categories: [
            { label: 'İş Geliştirme:', text: 'İlk 50 iş ortağı restoranın platforma entegrasyonu.' },
            { label: 'Pazarlama:', text: 'Bölgesel kampanyalar ve mikro influencerlarla stratejik iş birliği.' }
          ],
          kpi: 'Temel Performans Göstergeleri (KPI): 2.000 aktif kullanıcı, 50 restoranın tam entegrasyonu, ilk işlem gerçekleştirildi.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2026', 
          mainTitle: 'Ürün, pazarlama ve İktisat',
          title: 'Doğrulama ve sürekli iyileştirme', 
          categories: [
            { label: 'Ürün:', text: 'Rezervasyon ve sipariş sisteminin tam entegrasyonu. Kullanıcı geri bildirimi sistematik toplanması. Sadakat optimizasyonu (tekrarlı kullanım oranını artırma odaklı stratejiler).' },
            { label: 'İş Modeli:', text: 'Satış ekibinin hedefli işe alınması ve bölgesel çapta ölçeklendirilmesi (temel pazar segmentlerinde odaklanma).' }
          ],
          kpi: 'KPI: 15.000 aktif kullanıcı, 150 iş ortağı restoran. Pozitif işlem ekonomisi (her sipariş net kâr marjı yaratıyor).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2027', 
          mainTitle: 'Ölçeklendirmeye hazırlık',
          title: 'Yazılım iyileştirmeleri', 
          categories: [
            { label: 'Teknik:', text: 'Yüksek trafiğe dayanıklı ölçeklenebilirlik için altyapı optimizasyonu. Kişiselleştirme (Yapay Zeka öneri motoru v1).' },
            { label: 'İş:', text: 'Yeni bölgeye (ABD veya AB) açılma için yasal ve mevzuatsal hazırlıklar.' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q2 2027', 
          mainTitle: 'Ekosistem geliştirme',
          title: 'Coğrafi genişleme', 
          categories: [
            { label: 'Teknoloji:', text: 'ABD pazarına giriş (veya Avrupa alternatif).' },
            { label: 'İş Modeli:', text: 'Yerel servislerle entegrasyon (Uber, Haritalar, Yemek Dağıtım platformları).' }
          ],
          kpi: 'Temel Performans Göstergeleri: 100.000 aktif kullanıcı, 500 restoran.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q3 2027', 
          mainTitle: 'Pazarlama',
          title: 'Gelir modeli ve kurumsal değer yaratımı', 
          categories: [
            { label: 'Eylem:', text: 'Son kullanıcılar için Premium abonelik ve restoranlara özel SaaS araçlarının başlatılması.' },
            { label: 'İş Modeli:', text: 'Platform içine gömülmüş ödeme sistemlerinin (entegre ödeme altyapısı) devreye alınması.' }
          ],
          kpi: 'KPI: İlk kritik gelir hedefinin gerçekleştirilmesi (yıllık düzenli gelir bazında 100.000 USD).', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Büyüme aşamaları',
          title: 'Saldırıya dayalı pazarlama', 
          categories: [
            { label: 'Pazarlama:', text: 'Büyük ölçekli influencer kampanyaları ve performansa dayalı pazarlama.' },
            { label: 'Ürün:', text: 'Kullanıcı bağlılığını artırmak için oyunlaştırma mekanizmaları (puan sistemleri, seviye ilerlemesi).' }
          ],
          kpi: 'Temel Performans Göstergeleri: 500 bin aktif kullanıcı, 2 bin restoran ortağı.', 
          status: 'upcoming' 
        },
        { 
          period: 'Q4 2027', 
          mainTitle: 'Topluluk yemekleri & etkinlikler',
          title: 'Sosyal etki ve katılım', 
          categories: [
            { label: 'Eylem:', text: 'Paylaşılan Planlar özelliğinin hayata geçirilmesi: Kullanıcılar arkadaşlarını davet eder, restoran seçimi için oylar ve masaları otomatik rezerve eder.' },
            { label: 'Pazarlama:', text: 'Uygulama içi Stories/TikTok tarzı video incelemeler – metin tabanlı geri bildirimlere kıyasla daha fazla güvenilir.' },
            { label: 'Monetizasyon:', text: 'Gastronomi akşamları, tadımlar ve şeflerin özel etkinlikleri için bilet satışları (premium içerik).' },
            { label: 'İş Stratejisi:', text: 'Yüksek CLV\'li pazarlara odaklanma (New York, Londra, Dubai) ve bilet satış platformları ile etkinlik ajanslarıyla stratejik iş birliği.' }
          ],
          kpi: '', 
          status: 'upcoming' 
        },
        { 
          period: 'Q1 2028', 
          mainTitle: 'Yapay zeka & FinTech 2.0 ekosistemi',
          title: 'Yapay Zekâlı Rehber & Akıllı Ödeme Çözümleri', 
          categories: [
            { label: 'Ürün:', text: 'Kişisel sekreteriniz ve partneriniz olarak görev yapacak, gününüzü planlayacak, restoranlarda görüşme için masa rezervasyonları yapacak ve yemek yemek için sıra beklemenize gerek kalmayacak şekilde seyahat rotaları tasarlayacak Yapay Zekâlı Rehber. Restoran menüleri her kullanıcıya dinamik olarak uyarlanır.' },
            { label: 'İş Modeli:', text: 'Akıllı hesap ödemeleri; her misafir tek tıkla yalnızca kendi yemeklerini ödeyebilir — garson desteği gerekmez.' }
          ],
          kpi: 'Temel Performans Göstergesi (KPI): 1,5–2 milyon aktif kullanıcı. Gelir: 8–10 milyon $ (rezervasyon, bilet satışları ve fintech işlemlerinden alınan komisyonlarla destekleniyor).', 
          status: 'upcoming' 
        },
      ],
    };

    return data[language] || data['en'];
  };

  const milestones = getRoadmapData();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'active':
        return 'bg-[#FF6B35]';
      default:
        return 'bg-gray-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return t.completed;
      case 'active':
        return t.active;
      default:
        return t.upcoming;
    }
  };

  return (
    <section id="roadmap" className="py-12 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <IconBox delay={0.2}>
            <MapPin className="w-12 h-12 text-[#FF6B35] mx-auto relative z-10 drop-shadow-lg" />
          </IconBox>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 mt-6 sm:mt-8">
            {language === 'ru' ? 'Дорожная карта' : t.roadmapTitle}
          </h2>
          <p className="text-lg sm:text-xl text-[var(--color-text-secondary)]">
            {t.roadmapSubtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FF6B35] via-[#FF8C42] to-gray-300" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={`${milestone.period}-${index}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12 sm:pl-20"
                onTouchStart={() => {
                  setActiveCard(activeCard === index ? null : index);
                }}
              >
                {/* Dot */}
                <div className={`absolute left-2 sm:left-6 top-2 w-5 h-5 rounded-full ${getStatusColor(milestone.status)} border-4 border-white shadow-lg`} />

                {/* Content */}
                <div className={`bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 ${
                  activeCard === index ? 'border-[#FF8C42] shadow-xl' : 'border-transparent hover:border-[#FF8C42]'
                }`}>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="font-bold text-[#FF6B35] text-lg mb-1">{milestone.period}</div>
                      {milestone.mainTitle && (
                        <div className="font-bold text-gray-900 text-xl mb-2">
                          {language === 'ru' 
                            ? milestone.mainTitle.split(' ').map((word, i) => i === 1 ? word.toLowerCase() : word).join(' ')
                            : milestone.mainTitle
                          }
                        </div>
                      )}
                      <div className="font-bold text-gray-800 text-base">{milestone.title}</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      milestone.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : milestone.status === 'active'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {getStatusLabel(milestone.status)}
                    </span>
                  </div>
                  <div className="text-[var(--color-text-secondary)] mb-3 whitespace-pre-line leading-relaxed">
                    {milestone.categories ? (
                      milestone.categories.map((category, idx) => (
                        <div key={idx}>
                          <strong>{category.label}</strong> {category.text}
                        </div>
                      ))
                    ) : (
                      milestone.description
                    )}
                  </div>
                  {milestone.kpi && <p className="font-semibold text-[#FF6B35]">{milestone.kpi}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}