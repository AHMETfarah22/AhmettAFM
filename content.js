// Site içeriği: yayındaki siteler, deneyim ve programlama dilleri.
// Yeni bir site eklemek için AFM_SITES listesine bir kayıt ekleyin ve
// ekran görüntüsünü assets/sites/ klasörüne koyun (1280x800 WebP önerilir).

const AFM_SITES = [
    {
        name: 'Şark Köşesi',
        url: 'https://sarkkosesi.online/',
        image: 'assets/sites/sark-kosesi.webp',
        tech: ['HTML', 'CSS', 'JavaScript'],
        category: { tr: 'Restoran', en: 'Restaurant', so: 'Makhaayad' },
        desc: {
            tr: "Kırşehir'deki bir gözleme ve mantı evi için online sipariş sitesi. Menüde arama, sepet ve kapıda ödeme var; üyelik gerekmiyor.",
            en: 'Online ordering for a gözleme and mantı restaurant in Kırşehir. Searchable menu, cart and pay on delivery, no account needed.',
            so: 'Dalab online oo loogu talagalay makhaayad gözleme iyo mantı ah oo ku taal Kırşehir. Menu la raadin karo, dambiil iyo lacag-bixin marka la keeno, akoon looma baahna.'
        }
    },
    {
        name: 'Tercihim ÇOMÜ',
        url: 'https://tercihim.comu.edu.tr/',
        image: 'assets/sites/tercihim-comu.webp',
        tech: ['PHP'],
        category: { tr: 'Üniversite', en: 'University', so: 'Jaamacad' },
        desc: {
            tr: "Çanakkale Onsekiz Mart Üniversitesi'nin aday öğrenciler için tercih sitesi: akademik birimler, puanlar, burslar ve tercih kılavuzu tek yerde.",
            en: "Çanakkale Onsekiz Mart University's site for prospective students: departments, scores, scholarships and the application guide in one place.",
            so: 'Websaydhka Jaamacadda Çanakkale Onsekiz Mart ee ardayda cusub: kulliyadaha, dhibcaha, deeqaha waxbarasho iyo hagaha doorashada oo hal meel ku jira.'
        }
    },
    {
        name: '18 Mart Sıraç Koleji',
        url: 'https://18martsirackoleji.k12.tr/',
        image: 'assets/sites/sirac-koleji.webp',
        tech: ['Bootstrap', 'CMS'],
        category: { tr: 'Okul', en: 'School', so: 'Dugsi' },
        desc: {
            tr: "Özel On Sekiz Mart Sıraç Koleji İlkokulu'nun web sitesi ve yönetim paneli: kurumsal sayfalar, etkinlikler, kadro ve ön kayıt.",
            en: 'Website and admin panel for Özel On Sekiz Mart Sıraç Koleji primary school: school pages, events, staff and pre-registration.',
            so: 'Websaydhka iyo guddiga maamulka ee dugsiga hoose ee Özel On Sekiz Mart Sıraç Koleji: bogagga dugsiga, dhacdooyinka, shaqaalaha iyo is-diiwaangelinta.'
        }
    },
    {
        name: 'Martisoor Hotel',
        url: 'https://martisoorhotel.com/',
        image: 'assets/sites/martisoor-hotel.webp',
        tech: ['WordPress'],
        category: { tr: 'Otel', en: 'Hotel', so: 'Huteel' },
        desc: {
            tr: "Garowe, Puntland'deki Martisoor Hotel'in sitesi: odalar, restoran, etkinlik salonları, galeri ve rezervasyon.",
            en: 'Website for Martisoor Hotel in Garowe, Puntland: rooms, restaurant, event spaces, gallery and booking.',
            so: 'Websaydhka Martisoor Hotel ee Garowe, Puntland: qolalka, makhaayadda, hoolalka munaasabadaha, sawirada iyo ballansashada.'
        }
    },
    {
        name: 'Faro Perform',
        url: 'https://ahmetfarah22.github.io/faroperfom/',
        image: 'assets/sites/faro-perform.webp',
        tech: ['Three.js', 'JavaScript'],
        category: { tr: 'E-ticaret', en: 'E-commerce', so: 'Ganacsi online' },
        desc: {
            tr: 'Niş bir parfüm markası için konsept mağaza. Şişeler fotoğraf değil; hepsi Three.js ile kodla çizilmiş 3D modeller.',
            en: "Concept store for a niche perfume brand. The bottles aren't photos: each one is a 3D model drawn in code with Three.js.",
            so: 'Dukaan tijaabo ah oo loogu talagalay summad cadar. Dhalooyinku sawirro ma aha; mid kastaa waa moodel 3D ah oo lagu sawiray kood Three.js.'
        }
    },
    {
        name: 'Marifet Yurdu Yemek Menüsü',
        url: 'https://ahmetfarah22.github.io/Yamek-listy/',
        image: 'assets/sites/marifet-menu.webp',
        tech: ['HTML', 'CSS', 'JavaScript'],
        category: { tr: 'Yurt', en: 'Dormitory', so: 'Hoy arday' },
        desc: {
            tr: "Marifet Erkek Öğrenci Yurdu'nun aylık yemek menüsü. Tarihe, güne ya da yemeğe göre arama ve tek dokunuşla bugünün menüsü.",
            en: "Monthly meal menu for Marifet men's student dormitory, searchable by date, day or dish, with a one-tap view of today.",
            so: 'Menuga cuntada bisha ee hoyga ardayda wiilasha ee Marifet; ku raadi taariikh, maalin ama cunto, oo hal taabasho ku arag menuga maanta.'
        }
    }
];

// En yeniden eskiye.
const AFM_EXPERIENCE = [
    {
        org: 'AFM-CODING',
        period: { tr: 'Şu an', en: 'Now', so: 'Hadda' },
        role: { tr: 'Kurucu, full-stack geliştirici', en: 'Founder, full-stack developer', so: 'Aasaasaha, horumariye full-stack' },
        desc: {
            tr: 'Restoran, otel, okul ve üniversiteler için web siteleri ve yönetim panelleri; otel yönetim sistemi ve yapay zekâ destekli uygulamalar.',
            en: 'Websites and admin panels for restaurants, hotels, schools and universities, plus a hotel management system and AI-powered apps.',
            so: 'Websaydhyo iyo guddiyo maamul oo loogu talagalay makhaayado, huteelo, dugsiyo iyo jaamacado, iyo nidaamka maamulka huteelka iyo barnaamijyo AI ah.'
        }
    },
    {
        org: 'Mode Akademi',
        period: { tr: '1 yıl', en: '1 year', so: '1 sano' },
        desc: {
            tr: 'Bir yıl boyunca Mode Akademi ekibinde çalıştım.',
            en: 'Worked on the Mode Akademi team for a year.',
            so: 'Hal sano ayaan ka shaqeeyay kooxda Mode Akademi.'
        }
    },
    {
        org: '18 Mart Sıraç Koleji',
        period: { tr: 'Proje', en: 'Project', so: 'Mashruuc' },
        role: { tr: 'Web sitesi ve yönetim paneli', en: 'Website and admin panel', so: 'Websayd iyo guddiga maamulka' },
        desc: {
            tr: 'Okulun sistemini kurdum: web sitesi ve içeriklerin yönetildiği yönetim paneli.',
            en: "Set up the school's system: the website and the admin panel used to manage its content.",
            so: 'Waxaan dhisay nidaamka dugsiga: websaydhka iyo guddiga maamulka ee lagu maareeyo macluumaadka.'
        },
        url: 'https://18martsirackoleji.k12.tr/'
    },
    {
        org: 'Çanakkale Onsekiz Mart Üniversitesi',
        period: { tr: 'Staj', en: 'Internship', so: 'Tababar' },
        role: { tr: 'Stajyer', en: 'Intern', so: 'Tababarte' }
    }
];

const AFM_LANGUAGES = [
    { name: 'Python', mark: 'Py', color: '#3776AB', ink: '#fff', use: { tr: 'Yapay zekâ, otomasyon', en: 'AI, automation', so: 'AI iyo automation' } },
    { name: 'C#', mark: 'C#', color: '#68217A', ink: '#fff', use: { tr: '.NET, masaüstü uygulamalar', en: '.NET, desktop apps', so: '.NET, barnaamijyada kombiyuutarka' } },
    { name: 'C++', mark: 'C++', color: '#00599C', ink: '#fff', use: { tr: 'Algoritmalar', en: 'Algorithms', so: 'Algorithms' } },
    { name: 'PHP', mark: 'PHP', color: '#777BB4', ink: '#fff', use: { tr: 'Web siteleri, yönetim panelleri', en: 'Websites, admin panels', so: 'Websaydhyo, guddiyo maamul' } },
    { name: 'Dart & Flutter', mark: 'Dt', color: '#0175C2', ink: '#fff', use: { tr: 'Mobil uygulamalar', en: 'Mobile apps', so: 'Barnaamijyada mobilka' } },
    { name: 'HTML, CSS, JavaScript', mark: 'JS', color: '#F7DF1E', ink: '#1E1E1E', use: { tr: 'Web arayüzleri', en: 'Web interfaces', so: 'Naqshadaha websaydhka' } },
    { name: 'Go', mark: 'Go', color: '#00ADD8', ink: '#fff', use: { tr: 'Sunucu servisleri', en: 'Backend services', so: 'Adeegyada server-ka' } }
];

// Yeni bölümlerin arayüz metinleri (script.js içindeki i18n sözlüğüne eklenir).
const AFM_UI = {
    tr: {
        'nav.sites': 'Siteler',
        'nav.experience': 'Deneyim',
        'nav.sitesBtn': 'Sitelerim',
        'hero.btnSites': 'Sitelerimi gör',
        'sites.title': 'Yayındaki sitelerim',
        'sites.desc': 'Tasarlayıp geliştirdiğim ve şu an internette açık olan siteler. Bir siteye tıklayın, burada önizleyin.',
        'sites.countLabel': 'site yayında',
        'sites.open': 'Siteyi aç',
        'sites.listLabel': 'Siteler',
        'exp.title': 'Deneyim',
        'exp.desc': 'Çalıştığım yerler ve üstlendiğim işler.',
        'exp.visit': 'Siteyi aç',
        'languages.badge': 'Diller',
        'languages.title': 'Bildiğim programlama dilleri',
        'languages.subtitle': 'Projelerimde kullandığım diller ve her birini ne için kullandığım.'
    },
    en: {
        'nav.sites': 'Sites',
        'nav.experience': 'Experience',
        'nav.sitesBtn': 'My sites',
        'hero.btnSites': 'See my sites',
        'sites.title': 'Live sites I built',
        'sites.desc': 'Sites I designed and built that are online right now. Pick one to preview it here.',
        'sites.countLabel': 'sites live',
        'sites.open': 'Open site',
        'sites.listLabel': 'Sites',
        'exp.title': 'Experience',
        'exp.desc': "Where I've worked and what I did there.",
        'exp.visit': 'Open site',
        'languages.badge': 'Languages',
        'languages.title': 'Programming languages I know',
        'languages.subtitle': 'The languages I use in my projects and what I use each one for.'
    },
    so: {
        'nav.sites': 'Websaydhada',
        'nav.experience': 'Khibradda',
        'nav.sitesBtn': 'Websaydhadayda',
        'hero.btnSites': 'Eeg websaydhadayda',
        'sites.title': 'Websaydhada aan dhisay',
        'sites.desc': 'Websaydhyo aan naqshadeeyay oo hadda internetka ku jira. Dooro mid si aad halkan ugu aragto.',
        'sites.countLabel': 'websayd oo shaqaynaya',
        'sites.open': 'Fur websaydhka',
        'sites.listLabel': 'Websaydhada',
        'exp.title': 'Khibradda',
        'exp.desc': 'Meelaha aan ka shaqeeyay iyo shaqooyinka aan qabtay.',
        'exp.visit': 'Fur websaydhka',
        'languages.badge': 'Luuqadaha',
        'languages.title': 'Luuqadaha barnaamijyada aan aqaan',
        'languages.subtitle': 'Luuqadaha aan ku isticmaalo mashaariicdayda iyo waxa aan mid walba u isticmaalo.'
    }
};
