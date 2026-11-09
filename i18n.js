// Sitedeki tüm metinler burada. Her dilde aynı anahtarlar bulunmalı.
const TECH_EN = {
  full: ['Modern JS / TypeScript', 'React & Vue.js', 'Node.js, REST & GraphQL', 'SQL & NoSQL databases'],
  arch: ['Enterprise systems architecture', 'Microservices & scalability', 'Docker & CI/CD', 'Cloud infrastructure'],
  ux: ['High-end visual design', 'Glassmorphism & motion', 'Responsive & adaptive', 'User-centered UX'],
  ai: ['LLM API integrations', 'Smart study algorithms', 'Prompt engineering', 'Smart process automation'],
};

const I18N = {
  tr: {
    meta: {
      title: 'Ahmed Farah Mohamed | AFM-CODING',
      desc: 'AFM-CODING kurucusu Ahmed Farah Mohamed: full-stack geliştirici. Web siteleri, otel yönetim yazılımı, mobil uygulamalar ve yapay zekâ entegrasyonu.',
    },
    ui: {
      home: 'Ana sayfa', doors: 'Kapılar', experience: 'Deneyim', contact: 'İletişim',
      lamp: 'Işığı aç veya kapat', homeAria: 'Ana sayfa', menu: 'Ana menü',
      heroRole: 'AFM-CODING kurucusu', hi: 'Merhaba, ben Ahmed.', iam: 'Ben bir',
      start: 'Proje başlat', seeSites: 'Sitelerimi gör',
      portrait: 'Ahmed Farah Mohamed, ofisinde dizüstü bilgisayarının başında',
      strip1: 'Yeni projelere açığım', strip2: 'Somali ve Türkiye', strip3: '3+ yıl deneyim',
      doorsTitle: 'Her kapının arkasında bir iş var', openDoor: 'Kapıyı aç', openAria: '{t} kapısını aç',
      back: 'Kapılara dön', pastTitle: 'Zamanda geriye gidelim.',
      contactA: 'Bir fikrin mi var?', contactB: 'Birlikte kuralım.',
      contactP: 'Yeni bir yazılım fikrin, otel platformun veya yapay zekâ projen için bana yaz.',
      whatsapp: "WhatsApp'tan yaz",
      code: "Kodları GitHub'da gör", shot: 'ekran görüntüsü', langsTitle: 'Bildiğim programlama dilleri',
    },
    roles: ['Full-Stack Geliştiriciyim', "AFM-CODING'in Kurucusuyum", 'UI/UX Tasarımcısıyım', 'Yapay Zekâ Geliştiricisiyim', 'Yazılım Mentörüyüm'],
    doors: {
      web: {
        title: 'Web Siteleri', nav: 'Web Siteleri', plaque: 'Web',
        lead: 'Tasarlayıp geliştirdiğim ve şu an internette açık olan beş site.',
        points: ['Restoran, okul ve otel siteleri', 'Yönetim panelleri', 'Three.js ile 3D mağaza konsepti'],
        cards: [
          { tag: 'Restoran', title: 'Şark Köşesi', desc: "Kırşehir'deki bir gözleme ve mantı evi için online sipariş sitesi. Menüde arama, sepet ve kapıda ödeme var; üyelik gerekmiyor." },
          { tag: 'Okul', title: '18 Mart Sıraç Koleji', desc: "Özel On Sekiz Mart Sıraç Koleji İlkokulu'nun web sitesi ve yönetim paneli: kurumsal sayfalar, etkinlikler, kadro ve ön kayıt." },
          { tag: 'Otel', title: 'Martisoor Hotel', desc: "Garowe, Puntland'deki Martisoor Hotel'in sitesi: odalar, restoran, etkinlik salonları, galeri ve rezervasyon." },
          { tag: 'E-ticaret', title: 'Faro Perform', desc: 'Niş bir parfüm markası için konsept mağaza. Şişeler fotoğraf değil; hepsi Three.js ile kodla çizilmiş 3D modeller.' },
          { tag: 'Yurt', title: 'Marifet Yurdu Yemek Menüsü', desc: "Marifet Erkek Öğrenci Yurdu'nun aylık yemek menüsü. Tarihe, güne ya da yemeğe göre arama ve tek dokunuşla bugünün menüsü." },
        ],
      },
      app: {
        title: 'Uygulamalar', nav: 'Uygulamalar', plaque: 'Mobil',
        lead: "TScan: telefonu ters çevir, odaklan. PDF'ini yükle, yapay zekâ senin için quiz hazırlasın.",
        points: ['Flutter ve Dart ile yazıldı', 'Android, iOS ve Windows', 'Odak sayacı, istatistik ve rozetler'],
        cards: [{
          tag: 'Mobil uygulama', title: 'TScan', sub: 'Yapay zekâ destekli çalışma uygulaması',
          desc: "Telefonu ters çevir, odaklan. PDF'ini yükle, yapay zekâ senin için quiz hazırlasın. Seviyeli odak sayacı, istatistikler ve rozetlerle çalışmayı alışkanlığa dönüştürür.",
          bullets: ['Seviyeli odak sayacı', 'Telefonu çevir, odak başlasın', "PDF'ten yapay zekâ ile quiz", 'İstatistik, seri ve rozetler'],
          phoneAlt: 'TScan odak sayacı ekranı: 05:00 süre, kategori seçimi ve Start düğmesi',
        }],
        screens: [
          { title: 'AI Quest', text: "PDF'ini yükle, yapay zekâ quiz hazırlasın", alt: 'TScan AI Quest ekranı: PDF yükleme ve son çalışılan belgeler' },
          { title: 'İstatistikler', text: 'Haftalık hedef, seri ve quiz ortalaması', alt: 'TScan istatistik ekranı: haftalık hedef, oturumlar ve son yedi gün' },
          { title: 'Hesap', text: 'Seri, kazanılan rozetler ve Premium', alt: 'TScan hesap ekranı: seri, rozetler ve Premium durumu' },
        ],
      },
      sys: {
        title: 'Kurumsal Sistemler', nav: 'Kurumsal Sistemler', plaque: 'Sistem',
        lead: 'İşletmelerin günlük işini yürüten yönetim yazılımları.',
        points: ['Oda, yatak ve rezervasyon yönetimi', 'Canlı doluluk takvimi', 'Okul yönetim paneli'],
        cards: [
          {
            tag: 'Kurumsal çözüm', title: 'Pansiyon ve Otel Yönetim Sistemi',
            desc: 'Pansiyon, otel ve konaklama tesisleri için geliştirilmiş kurumsal yönetim platformu. Müşteri giriş/çıkış süreçleri, canlı oda doluluk takibi, gelir analitiği ve rezervasyon otomasyonunu entegre yöneten C# mimarili sistem.',
            bullets: ['Oda, yatak ve rezervasyon yönetimi', 'Hızlı check-in / check-out', 'Canlı doluluk takvimi', 'Gelir ve doluluk raporları'],
          },
          { tag: 'Proje', title: '18 Mart Sıraç Koleji', sub: 'Web sitesi ve yönetim paneli', desc: 'Okulun sistemini kurdum: web sitesi ve içeriklerin yönetildiği yönetim paneli.' },
        ],
      },
      skill: {
        title: 'Uzmanlık', nav: 'Uzmanlık', plaque: 'Uzmanlık',
        lead: 'Arayüzden sunucuya, mimariden yapay zekâya uçtan uca çalışıyorum.',
        points: ['Full-stack geliştirme', 'Sistem mimarisi ve bulut', 'UI/UX ve yapay zekâ çözümleri'],
        skills: [
          { title: 'Full-Stack Geliştirme', items: ['Modern JS / TypeScript', 'React ve Vue.js', 'Node.js, REST ve GraphQL', 'SQL ve NoSQL veritabanları'] },
          { title: 'Sistem Mimarisi ve Bulut', items: ['Kurumsal sistem mimarisi', 'Mikroservisler ve ölçekleme', 'Docker ve CI/CD', 'Bulut altyapısı'] },
          { title: 'Arayüz ve Deneyim', items: ['Üst düzey görsel tasarım', 'Glassmorphism ve hareket', 'Responsive ve uyarlanabilir yapı', 'Kullanıcı odaklı UX'] },
          { title: 'Yapay Zekâ Çözümleri', items: ['LLM API entegrasyonları', 'Akıllı çalışma algoritmaları', 'Prompt mühendisliği', 'Süreç otomasyonu'] },
        ],
        langs: ['Yapay zekâ, otomasyon', '.NET, masaüstü uygulamalar', 'Algoritmalar', 'Web siteleri, yönetim panelleri', 'Mobil uygulamalar', 'Web arayüzleri', 'Sunucu servisleri'],
      },
      me: {
        title: 'Hakkımda', nav: 'Hakkımda', plaque: 'Ben',
        lead: "AFM-CODING'in kurucusu ve full-stack geliştirici. Somali ve Türkiye'den çalışıyorum.",
        points: ['3+ yıl deneyim', 'Bilgisayar Bilimleri', 'Somalice, Türkçe, İngilizce'],
        bio: [
          "Tutkulu bir Full-Stack Geliştirici ve AFM-CODING'in kurucusuyum. Uzmanlığım kurumsal sistem mimarisi, UI/UX tasarımı ve yapay zekâ entegrasyonunu kapsıyor; sadece çalışan değil, fark yaratan çözümler sunuyorum.",
          'Gerçek işletmelere hizmet veren otel yönetim platformlarından, öğrencilerin öğrenme biçimini dönüştüren yapay zekâ destekli çalışma uygulamalarına kadar somut bir fark yaratan yazılımlar inşa ediyorum.',
        ],
        facts: [['İsim', 'Ahmed Farah Mohamed'], ['Rol', 'Founder @ AFM-CODING'], ['Deneyim', '3+ yıl'], ['Eğitim', 'Bilgisayar Bilimleri'], ['Konum', 'Somali / Türkiye'], ['Diller', 'Somalice, Türkçe, İngilizce']],
        shots: ['AFM-CODING logosu ve Ahmed Farah Mohamed', "Ahmed, Mode Academy'de dizüstü bilgisayarında yazılım geliştirirken", 'Ahmed, çift ekranlı çalışma masasında kod yazarken', 'Ahmed, bir proje üzerinde çalışırken'],
      },
    },
    past: [
      { big: 'Şu an', title: 'Mode Academy', role: 'Yazılım geliştirici ve yönetim mentörü', desc: 'Bir yıldır ekipteyim; yazılım geliştiriyor ve yönetim tarafında mentörlük yapıyorum.' },
      { big: 'Kurucu', title: 'AFM-CODING', role: 'Kurucu, full-stack geliştirici', desc: 'Restoran, otel ve okullar için web siteleri ve yönetim panelleri; otel yönetim sistemi ve yapay zekâ destekli uygulamalar.' },
      { big: 'Proje', title: '18 Mart Sıraç Koleji', role: 'Web sitesi ve yönetim paneli', desc: 'Okulun sistemini kurdum: web sitesi ve içeriklerin yönetildiği yönetim paneli.' },
      { big: 'Staj', title: 'Çanakkale Onsekiz Mart Üniversitesi', role: 'Stajyer' },
    ],
  },

  en: {
    meta: {
      title: 'Ahmed Farah Mohamed | AFM-CODING',
      desc: 'Ahmed Farah Mohamed, founder of AFM-CODING and full-stack developer: websites, hotel management software, mobile apps and AI integration.',
    },
    ui: {
      home: 'Home', doors: 'Doors', experience: 'Experience', contact: 'Contact',
      lamp: 'Turn the light on or off', homeAria: 'Home', menu: 'Main menu',
      heroRole: 'Founder of AFM-CODING', hi: "Hi, I'm Ahmed.", iam: 'I am',
      start: 'Start a project', seeSites: 'See my sites',
      portrait: 'Ahmed Farah Mohamed at his laptop in the office',
      strip1: 'Available for new projects', strip2: 'Somalia and Turkey', strip3: '3+ years of experience',
      doorsTitle: "There's work behind every door", openDoor: 'Open the door', openAria: 'Open the {t} door',
      back: 'Back to the doors', pastTitle: 'A look back.',
      contactA: 'Have an idea?', contactB: "Let's make it real.",
      contactP: 'Reach out about your software idea, hotel platform or AI project.',
      whatsapp: 'Message me on WhatsApp',
      code: 'View the code on GitHub', shot: 'screenshot', langsTitle: 'Programming languages I know',
    },
    roles: ['a Full-Stack Developer', 'the Founder of AFM-CODING', 'a UI/UX Designer', 'an AI Developer', 'a Software Mentor'],
    doors: {
      web: {
        title: 'Websites', nav: 'Websites', plaque: 'Web',
        lead: 'Five sites I designed and built that are online right now.',
        points: ['Restaurant, school and hotel sites', 'Admin panels', 'A 3D store concept built with Three.js'],
        cards: [
          { tag: 'Restaurant', title: 'Şark Köşesi', desc: 'Online ordering for a gözleme and mantı restaurant in Kırşehir. Searchable menu, cart and pay on delivery, no account needed.' },
          { tag: 'School', title: '18 Mart Sıraç Koleji', desc: 'Website and admin panel for Özel On Sekiz Mart Sıraç Koleji primary school: school pages, events, staff and pre-registration.' },
          { tag: 'Hotel', title: 'Martisoor Hotel', desc: 'Website for Martisoor Hotel in Garowe, Puntland: rooms, restaurant, event spaces, gallery and booking.' },
          { tag: 'E-commerce', title: 'Faro Perform', desc: "Concept store for a niche perfume brand. The bottles aren't photos: each one is a 3D model drawn in code with Three.js." },
          { tag: 'Dormitory', title: 'Marifet Yurdu Yemek Menüsü', desc: "Monthly meal menu for Marifet men's student dormitory, searchable by date, day or dish, with a one-tap view of today." },
        ],
      },
      app: {
        title: 'Apps', nav: 'Apps', plaque: 'Mobile',
        lead: 'TScan: flip your phone face down and focus. Upload a PDF and let AI build a quiz for you.',
        points: ['Built with Flutter and Dart', 'Android, iOS and Windows', 'Focus timer, stats and badges'],
        cards: [{
          tag: 'Mobile app', title: 'TScan', sub: 'AI-powered study app',
          desc: 'Flip your phone face down and focus. Upload a PDF and let AI build a quiz for you. A levelled focus timer, stats and badges turn studying into a habit.',
          bullets: ['Levelled focus timer', 'Flip the phone to start focusing', 'AI quizzes from your PDFs', 'Stats, streaks and badges'],
          phoneAlt: 'TScan focus timer screen: 05:00 duration, category selection and Start button',
        }],
        screens: [
          { title: 'AI Quest', text: 'Upload a PDF, get an AI quiz', alt: 'TScan AI Quest screen: PDF upload and recently studied documents' },
          { title: 'Statistics', text: 'Weekly goal, streak and quiz average', alt: 'TScan statistics screen: weekly goal, sessions and the last seven days' },
          { title: 'Account', text: 'Streak, earned badges and Premium', alt: 'TScan account screen: streak, badges and Premium status' },
        ],
      },
      sys: {
        title: 'Enterprise Systems', nav: 'Systems', plaque: 'System',
        lead: 'Management software that runs the daily work of businesses.',
        points: ['Rooms, beds and reservations', 'Live occupancy calendar', 'School admin panel'],
        cards: [
          {
            tag: 'Enterprise solution', title: 'Guesthouse & Hotel Management Platform',
            desc: 'An enterprise management system designed for guesthouses, pensions and hotels. Unifies guest check-in/out, live room tracking, revenue analytics and automated reservation management, built with C# architecture.',
            bullets: ['Rooms, beds and reservations', 'Fast check-in / check-out', 'Live occupancy calendar', 'Revenue and occupancy reports'],
          },
          { tag: 'Project', title: '18 Mart Sıraç Koleji', sub: 'Website and admin panel', desc: "Set up the school's system: the website and the admin panel used to manage its content." },
        ],
      },
      skill: {
        title: 'Expertise', nav: 'Expertise', plaque: 'Skills',
        lead: 'End to end: from interface to server, from architecture to AI.',
        points: ['Full-stack development', 'System architecture and cloud', 'UI/UX and AI solutions'],
        skills: [
          { title: 'Full-Stack Development', items: TECH_EN.full },
          { title: 'Architecture & Cloud', items: TECH_EN.arch },
          { title: 'UI/UX & Experience', items: TECH_EN.ux },
          { title: 'AI Solutions', items: TECH_EN.ai },
        ],
        langs: ['AI, automation', '.NET, desktop apps', 'Algorithms', 'Websites, admin panels', 'Mobile apps', 'Web interfaces', 'Backend services'],
      },
      me: {
        title: 'About', nav: 'About', plaque: 'Me',
        lead: 'Founder of AFM-CODING and full-stack developer, working from Somalia and Turkey.',
        points: ['3+ years of experience', 'Computer Science', 'Somali, Turkish, English'],
        bio: [
          "I'm a passionate Full-Stack Developer and the founder of AFM-CODING. My expertise spans enterprise system architecture, UI/UX design and AI integration, delivering solutions that don't just work, but wow.",
          'From hotel management platforms serving real businesses to AI-powered study applications that transform how students learn, I build software that makes a tangible difference.',
        ],
        facts: [['Name', 'Ahmed Farah Mohamed'], ['Role', 'Founder @ AFM-CODING'], ['Experience', '3+ years'], ['Education', 'Computer Science'], ['Location', 'Somalia / Turkey'], ['Languages', 'Somali, Turkish, English']],
        shots: ['AFM-CODING logo and Ahmed Farah Mohamed', 'Ahmed developing software on his laptop at Mode Academy', 'Ahmed writing code at a dual-monitor desk', 'Ahmed working on a project'],
      },
    },
    past: [
      { big: 'Now', title: 'Mode Academy', role: 'Software developer and management mentor', desc: "The company I work at now. I've been on the team for a year, building software and mentoring on the management side." },
      { big: 'Founder', title: 'AFM-CODING', role: 'Founder, full-stack developer', desc: 'Websites and admin panels for restaurants, hotels and schools, plus a hotel management system and AI-powered apps.' },
      { big: 'Project', title: '18 Mart Sıraç Koleji', role: 'Website and admin panel', desc: "Set up the school's system: the website and the admin panel used to manage its content." },
      { big: 'Intern', title: 'Çanakkale Onsekiz Mart Üniversitesi', role: 'Intern' },
    ],
  },

  so: {
    meta: {
      title: 'Ahmed Farah Mohamed | AFM-CODING',
      desc: 'Ahmed Farah Mohamed, aasaasaha AFM-CODING iyo horumariye Full-Stack ah: websaydhyo, nidaamka maamulka huteelada, barnaamijyo mobil iyo AI.',
    },
    ui: {
      home: 'Bogga hore', doors: 'Albaabada', experience: 'Khibradda', contact: 'La xiriir',
      lamp: 'Shid ama dami nalka', homeAria: 'Bogga hore', menu: 'Menuga weyn',
      heroRole: 'Aasaasaha AFM-CODING', hi: 'Salaan, magacaygu waa Ahmed.', iam: 'Waxaan ahay',
      start: 'Bilow mashruuc', seeSites: 'Eeg websaydhadayda',
      portrait: 'Ahmed Farah Mohamed oo xafiiskiisa ku fadhiya laptop-ka hortiisa',
      strip1: 'Diyaar u ah mashaariic cusub', strip2: 'Soomaaliya iyo Turkiga', strip3: '3+ sano oo khibrad ah',
      doorsTitle: 'Albaab kasta gadaashiisa shaqo ayaa ku jirta', openDoor: 'Fur albaabka', openAria: 'Fur albaabka {t}',
      back: 'Ku noqo albaabada', pastTitle: 'Aan dib u eegno.',
      contactA: 'Fikrad ma haysaa?', contactB: 'Aan wadajir u dhisno.',
      contactP: 'Iila soo xiriir fikradaada softwear-ka, nidaamka huteelka ama mashruucaaga AI-da.',
      whatsapp: 'Iigu soo qor WhatsApp',
      code: 'Koodka ka eeg GitHub', shot: 'sawirka shaashadda', langsTitle: 'Luuqadaha barnaamijyada aan aqaan',
    },
    roles: ['Horumariye Full-Stack', 'Aasaasaha AFM-CODING', 'Naqshadeeye UI/UX', 'Horumariye AI', 'Lataliye Software'],
    doors: {
      web: {
        title: 'Websaydhyo', nav: 'Websaydhyo', plaque: 'Web',
        lead: 'Shan websayd oo aan naqshadeeyay oo hadda internetka ku jira.',
        points: ['Websaydhyo makhaayad, dugsi iyo huteel', 'Guddiyo maamul', 'Dukaan 3D ah oo lagu dhisay Three.js'],
        cards: [
          { tag: 'Makhaayad', title: 'Şark Köşesi', desc: 'Dalab online oo loogu talagalay makhaayad gözleme iyo mantı ah oo ku taal Kırşehir. Menu la raadin karo, dambiil iyo lacag-bixin marka la keeno, akoon looma baahna.' },
          { tag: 'Dugsi', title: '18 Mart Sıraç Koleji', desc: 'Websaydhka iyo guddiga maamulka ee dugsiga hoose ee Özel On Sekiz Mart Sıraç Koleji: bogagga dugsiga, dhacdooyinka, shaqaalaha iyo is-diiwaangelinta.' },
          { tag: 'Huteel', title: 'Martisoor Hotel', desc: 'Websaydhka Martisoor Hotel ee Garowe, Puntland: qolalka, makhaayadda, hoolalka munaasabadaha, sawirada iyo ballansashada.' },
          { tag: 'Ganacsi online', title: 'Faro Perform', desc: 'Dukaan tijaabo ah oo loogu talagalay summad cadar. Dhalooyinku sawirro ma aha; mid kastaa waa moodel 3D ah oo lagu sawiray kood Three.js.' },
          { tag: 'Hoy arday', title: 'Marifet Yurdu Yemek Menüsü', desc: 'Menuga cuntada bisha ee hoyga ardayda wiilasha ee Marifet; ku raadi taariikh, maalin ama cunto, oo hal taabasho ku arag menuga maanta.' },
        ],
      },
      app: {
        title: 'Barnaamijyo', nav: 'Barnaamijyo', plaque: 'Mobil',
        lead: "TScan: Telefoonka u rog oo diiradda saar. Soo geli PDF, AI-guna ha kuu diyaariyo su'aalo.",
        points: ['Lagu dhisay Flutter iyo Dart', 'Android, iOS iyo Windows', 'Saacad diirad, tirakoob iyo calaamado'],
        cards: [{
          tag: 'Barnaamij mobil', title: 'TScan', sub: 'Barnaamij waxbarasho oo AI ku shaqeeya',
          desc: "Telefoonka u rog oo diiradda saar. Soo geli PDF, AI-guna ha kuu diyaariyo su'aalo. Saacad diirad leh oo heerar leh, tirakoob iyo calaamado ayaa waxbarashada ka dhiga caado.",
          bullets: ['Saacadda diiradda oo heerar leh', 'Telefoonka u rog si diiraddu u bilaabato', "Su'aalo AI ah oo laga sameeyo PDF-gaaga", 'Tirakoob, joogtayn iyo calaamado'],
          phoneAlt: 'Shaashadda saacadda diiradda ee TScan: 05:00 daqiiqo, doorashada qaybta iyo badhanka Start',
        }],
        screens: [
          { title: 'AI Quest', text: "Soo geli PDF, AI-gu su'aalo ha diyaariyo", alt: 'Shaashadda AI Quest ee TScan: soo gelinta PDF iyo dukumentiyadii dhowaa' },
          { title: 'Tirakoob', text: "Hadafka toddobaadka, joogtaynta iyo celceliska su'aalaha", alt: 'Shaashadda tirakoobka ee TScan: hadafka toddobaadka iyo toddobadii maalmood ee u dambeeyay' },
          { title: 'Akoonka', text: 'Joogtaynta, calaamadaha iyo Premium', alt: 'Shaashadda akoonka ee TScan: joogtaynta, calaamadaha iyo Premium' },
        ],
      },
      sys: {
        title: 'Nidaamyada Ganacsiga', nav: 'Nidaamyo', plaque: 'Nidaam',
        lead: 'Softwear maamul oo socodsiiya shaqada maalinlaha ah ee ganacsiyada.',
        points: ['Maamulka qolalka, sariiraha iyo ballansashada', 'Jadwalka buuxsanka ee tooska ah', 'Guddiga maamulka dugsiga'],
        cards: [
          {
            tag: 'Xalka ganacsiga', title: 'Nidaamka Maamulka Huteelada & Guryaha Martida',
            desc: 'Nidaam maamul oo loo sameeyay guryaha martida (pension) iyo huteelada. Wuxuu maamulaa check-in/out-ka martida, qolalka, dakhliga iyo ballansashada tooska ah oo ku dhisan C#.',
            bullets: ['Maamulka qolalka, sariiraha iyo ballansashada', 'Check-in / check-out degdeg ah', 'Jadwalka buuxsanka ee tooska ah', 'Warbixinnada dakhliga iyo buuxsanka'],
          },
          { tag: 'Mashruuc', title: '18 Mart Sıraç Koleji', sub: 'Websayd iyo guddiga maamulka', desc: 'Waxaan dhisay nidaamka dugsiga: websaydhka iyo guddiga maamulka ee lagu maareeyo macluumaadka.' },
        ],
      },
      skill: {
        title: 'Xirfadaha', nav: 'Xirfadaha', plaque: 'Xirfad',
        lead: 'Dhammaan heerarka: naqshadda, server-ka, dhismaha nidaamka iyo AI-da.',
        points: ['Horumarinta Full-Stack', 'Nidaamka Dhismaha & Cloud', 'UI/UX iyo Xalka AI-da'],
        skills: [
          { title: 'Horumarinta Full-Stack', items: TECH_EN.full },
          { title: 'Nidaamka Dhismaha & Cloud', items: TECH_EN.arch },
          { title: 'Naqshadda & Isticmaalaha', items: TECH_EN.ux },
          { title: 'Xalka AI-da', items: TECH_EN.ai },
        ],
        langs: ['AI iyo automation', '.NET, barnaamijyada kombiyuutarka', 'Algorithms', 'Websaydhyo, guddiyo maamul', 'Barnaamijyada mobilka', 'Naqshadaha websaydhka', 'Adeegyada server-ka'],
      },
      me: {
        title: 'Nala Barasho', nav: 'Nala Barasho', plaque: 'Aniga',
        lead: 'Aasaasaha AFM-CODING iyo horumariye Full-Stack ah, oo ka shaqeeya Soomaaliya iyo Turkiga.',
        points: ['3+ sano oo khibrad ah', 'Sayniska Kombuyuutarka', 'Soomaali, Turki, Ingiriis'],
        bio: [
          'Waxaan ahay Horumariye Full-Stack oo xamaasad badan iyo aasaasaha AFM-CODING. Khibradeydu waxay ku saabsan tahay dhismaha nidaamyada ganacsiga, UI/UX, iyo AI, oo bixiya xalal aan kaliya shaqeynayn, laakiin cajiib ah.',
          'Laga soo bilaabo nidaamyada maareynta huteelada ilaa barnaamijyada waxbarashada ee AI-da ku shaqeeya, waxaan dhisaa softwear runtii isbeddel dhab ah sameeya.',
        ],
        facts: [['Magaca', 'Ahmed Farah Mohamed'], ['Doorka', 'Founder @ AFM-CODING'], ['Khibradda', '3+ sano'], ['Waxbarashada', 'Sayniska Kombuyuutarka'], ['Goobta', 'Soomaaliya / Turkiga'], ['Luqadaha', 'Soomaali, Turki, Ingiriis']],
        shots: ['Astaanta AFM-CODING iyo Ahmed Farah Mohamed', 'Ahmed oo software ka horumarinaya Mode Academy', 'Ahmed oo kood ku qoraya miis laba shaashadood leh', 'Ahmed oo ka shaqeynaya mashruuc'],
      },
    },
    past: [
      { big: 'Hadda', title: 'Mode Academy', role: 'Horumariye software iyo lataliye maamul', desc: 'Shirkadda aan hadda ka shaqeeyo. Hal sano ayaan kooxda la joogay; waxaan dhisaa software, dhinaca maamulkana waxaan ka ahay lataliye.' },
      { big: 'Aasaase', title: 'AFM-CODING', role: 'Aasaasaha, horumariye full-stack', desc: 'Websaydhyo iyo guddiyo maamul oo loogu talagalay makhaayado, huteelo iyo dugsiyo, iyo nidaamka maamulka huteelka iyo barnaamijyo AI ah.' },
      { big: 'Mashruuc', title: '18 Mart Sıraç Koleji', role: 'Websayd iyo guddiga maamulka', desc: 'Waxaan dhisay nidaamka dugsiga: websaydhka iyo guddiga maamulka ee lagu maareeyo macluumaadka.' },
      { big: 'Tababar', title: 'Çanakkale Onsekiz Mart Üniversitesi', role: 'Tababarte' },
    ],
  },
};
