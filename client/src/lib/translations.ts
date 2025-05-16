import { Language } from "@/hooks/useI18n";

export const translations: Record<Language, any> = {
  ar: {
    seo: {
      home: {
        title: "Eco DZ - منصة تحليل النباتات والتربة والبيئة",
        description: "منصة متكاملة لتحليل النباتات والتربة والأنظمة البيئية في الجزائر باستخدام الذكاء الاصطناعي والتحليل البيولوجي"
      },
      analysis: {
        title: "تحليل النباتات والتربة - Eco DZ",
        description: "قم بتحليل النباتات والتربة باستخدام الذكاء الاصطناعي للحصول على تقييم دقيق وتوصيات للتحسين"
      },
      database: {
        title: "قاعدة البيانات الإيكولوجية - النظام البيئي الذكي",
        description: "استكشف قاعدة بياناتنا الشاملة للنباتات والتربة والأنظمة البيئية في الجزائر"
      },
      simulation: {
        title: "المحاكاة البيئية - النظام البيئي الذكي",
        description: "جرب المحاكاة البيئية وتوقع تأثير التغييرات على النظام البيئي المحلي"
      },
      sensor: {
        title: "المسبار البيولوجي - النظام البيئي الذكي",
        description: "تعرف على المسبار البيولوجي لتحليل النسغ النباتي ومكونات التربة بدقة عالية"
      },
      about: {
        title: "من نحن - النظام البيئي الذكي",
        description: "تعرف على فريقنا وأهدافنا لتحسين البيئة والزراعة المستدامة في الجزائر"
      }
    },
    header: {
      title: "Eco DZ",
      analysis: "التحليل",
      database: "قاعدة البيانات",
      simulation: "المحاكاة البيئية",
      sensor: "المسبار",
      about: "من نحن",
      login: "حسابي"
    },
    hero: {
      title: "موقع ذكي لتحليل النباتات، التربة، والأنظمة البيئية",
      subtitle: "أداة متكاملة للطلبة، الباحثين، والفلاحين في الجزائر",
      startAnalysis: "ابدأ التحليل",
      exploreDatabase: "استكشف قاعدة البيانات"
    },
    features: {
      title: "خدماتنا الرئيسية",
      imageAnalysis: {
        title: "تحليل النباتات والتربة بالصور",
        description: "استخدام تقنيات الذكاء الاصطناعي لتحليل صور النباتات والتربة وتقديم تقييم دقيق لحالتها.",
        cta: "ابدأ التحليل"
      },
      bioSensor: {
        title: "تحليل بيولوجي عبر مسبار",
        description: "استخدام جهاز مسبار خاص لقياس وتحليل النسغ النباتي ومكونات التربة بشكل مباشر ودقيق.",
        cta: "تعرف على المسبار"
      },
      simulation: {
        title: "محاكاة بيئية تفاعلية",
        description: "محاكاة تأثير إدخال أنواع نباتية جديدة أو تغييرات في البيئة على النظام البيئي المحلي.",
        cta: "جرب المحاكاة"
      }
    },
    analysis: {
      title: "تحليل النباتات والتربة",
      description: "قم برفع صورة للنبات أو التربة، وسيقوم نظامنا الذكي بتحليلها وتقديم تقرير مفصل عن حالتها وتوصيات للتحسين.",
      upload: {
        title: "رفع صورة للتحليل",
        plantAnalysis: "تحليل نبات",
        soilAnalysis: "تحليل تربة",
        dragAndDrop: "اسحب الصورة هنا أو انقر للاختيار",
        fileTypes: "JPG, PNG أو HEIC بحد أقصى 10MB",
        selectImage: "اختر صورة",
        changeImage: "تغيير الصورة",
        examples: {
          title: "أمثلة للصور المناسبة للتحليل:",
          healthy: "مثال لورقة نبات صحية",
          diseased: "مثال لورقة نبات مريضة",
          soil: "مثال لعينة تربة"
        }
      },
      result: {
        title: "معاينة التحليل",
        noImage: "سيظهر هنا معاينة للتحليل بعد رفع الصورة",
        readyToAnalyze: "الصورة جاهزة للتحليل",
        analyzing: "جاري التحليل...",
        analyzeImage: "تحليل الصورة",
        connectSensor: "الاتصال بالمسبار",
        loginNotice: "تحتاج إلى تسجيل الدخول لحفظ نتائج التحليل",
        condition: "الحالة",
        recommendations: "التوصيات",
        confidence: "مستوى الثقة",
        phLevel: "درجة الحموضة (pH)",
        nutrients: "المغذيات",
        low: "منخفض",
        high: "مرتفع"
      },
      history: {
        title: "تحليلاتك السابقة",
        viewAll: "عرض الكل",
        noAnalyses: "لا توجد تحليلات سابقة"
      },
      errors: {
        noImage: "لم يتم اختيار صورة",
        pleaseSelectImage: "يرجى اختيار صورة للتحليل",
        failed: "فشل التحليل",
        tryAgain: "حدث خطأ أثناء التحليل، يرجى المحاولة مرة أخرى"
      },
      success: {
        title: "تم التحليل بنجاح",
        description: "تم تحليل الصورة وإظهار النتائج"
      }
    },
    database: {
      title: "قاعدة البيانات الإيكولوجية",
      description: "استكشف قاعدة بياناتنا الشاملة للأنظمة البيئية في الجزائر، بما في ذلك الأنواع النباتية المحلية، أنواع التربة، والمناخ.",
      search: {
        searchLabel: "بحث",
        searchPlaceholder: "اسم النبات، نوع التربة...",
        categoryLabel: "الفئة",
        regionLabel: "المنطقة",
        allCategories: "جميع الفئات",
        allRegions: "كل الجزائر",
        plants: "نباتات",
        trees: "أشجار",
        soils: "أنواع التربة",
        ecosystems: "أنظمة بيئية",
        north: "الشمال",
        south: "الجنوب",
        east: "الشرق",
        west: "الغرب",
        highlands: "الهضاب العليا",
        desert: "الصحراء"
      },
      item: {
        region: "المنطقة",
        viewMore: "عرض المزيد"
      },
      details: {
        scientificName: "الاسم العلمي",
        description: "الوصف",
        characteristics: "الخصائص"
      },
      noResults: "لا توجد نتائج مطابقة لبحثك",
      loadMore: "عرض المزيد من العناصر"
    },
    simulation: {
      title: "المحاكاة البيئية التفاعلية",
      description: "جرب كيف يمكن أن تتطور البيئة المحلية مع مرور الوقت، وتأثير إدخال أنواع نباتية جديدة أو تغييرات في النظام البيئي.",
      controls: {
        title: "إعدادات المحاكاة",
        selectEcosystem: "اختر النظام البيئي",
        ecosystemPlaceholder: "غابات البحر المتوسط (شمال)",
        introducedSpecies: "إدخال أنواع جديدة",
        plants: {
          eucalyptus: "أشجار الكينا",
          argan: "نبات الأرغان",
          aleppoPine: "الصنوبر الحلبي",
          durumWheat: "القمح الصلب"
        },
        climateFactors: "عوامل المناخ",
        rainfall: "معدل هطول الأمطار",
        rainfallUnit: "ملم/سنة",
        temperature: "متوسط درجة الحرارة",
        windSpeed: "سرعة الرياح",
        windSpeeds: {
          low: "منخفضة",
          medium: "متوسطة",
          high: "مرتفعة"
        },
        simulationPeriod: "فترة المحاكاة",
        years: "سنة",
        startSimulation: "بدء المحاكاة",
        simulating: "جاري المحاكاة..."
      },
      results: {
        title: "نتائج المحاكاة",
        fullscreenTitle: "المحاكاة البيئية (عرض كامل)",
        pressToStart: "اضغط لبدء المحاكاة",
        selectSettings: "حدد الإعدادات أولاً من القائمة المجاورة",
        simulating: "جاري تنفيذ المحاكاة...",
        year: "السنة",
        years: "السنوات",
        percentage: "النسبة المئوية",
        indicators: {
          vegetation: "الغطاء النباتي",
          biodiversity: "التنوع الحيوي",
          soilQuality: "جودة التربة",
          sustainability: "الاستدامة"
        }
      },
      success: {
        title: "تمت المحاكاة بنجاح",
        description: "تم إنشاء محاكاة جديدة وعرض النتائج"
      },
      error: {
        title: "فشلت المحاكاة",
        description: "حدث خطأ أثناء تنفيذ المحاكاة، يرجى المحاولة مرة أخرى"
      }
    },
    sensor: {
      title: "المسبار الذكي للتحليل البيولوجي",
      description: "يتيح المسبار البيولوجي الخاص بنا إجراء تحليل دقيق ومباشر للنباتات والتربة، مما يساعد على تحديد المشكلات قبل أن تصبح مرئية للعين المجردة.",
      features: {
        title: "مميزات المسبار",
        item1: "قياس مستويات المغذيات والمعادن في التربة بدقة عالية",
        item2: "تحليل النسغ النباتي والكشف المبكر عن الأمراض",
        item3: "قياس درجة الحموضة والتوصيل الكهربائي للتربة",
        item4: "اتصال مباشر عبر USB/USB-C مع تطبيق التحليل"
      },
      requestInfo: "طلب معلومات",
      watchVideo: "مشاهدة الفيديو التوضيحي",
      comingSoon: "قريباً",
      deviceImage: "جهاز المسبار البيولوجي للتحليل",
      infoCard: {
        title: "قياسات دقيقة",
        description: "يقدم المسبار قياسات بدقة تصل إلى 99.8% للعناصر الأساسية في التربة."
      }
    },
    about: {
      title: "عن المشروع",
      description: "نحن فريق من الباحثين والمهندسين والمتخصصين في علوم البيئة والزراعة، نعمل معًا لتطوير أدوات تكنولوجية متقدمة تساعد في فهم وتحسين النظم البيئية في الجزائر.",
      objectives: {
        title: "أهدافنا",
        item1: "تعزيز الوعي البيئي والمحافظة على التنوع الحيوي",
        item2: "دعم اتخاذ القرارات الزراعية المستنيرة بناءً على تحليلات دقيقة",
        item3: "تقديم أدوات تعليمية تفاعلية للطلاب والباحثين",
        item4: "المساهمة في تطوير الزراعة المستدامة والذكية"
      },
      contactUs: "تواصل معنا",
      readMore: "اقرأ المزيد",
      images: {
        lab: "باحثون يقومون بتحليل عينات نباتية",
        field: "عامل ميداني يستخدم جهاز لوحي لمراقبة النباتات",
        data: "تصور البيانات من مراقبة البيئة",
        conservation: "جهود الحفاظ على البيئة في المناظر الطبيعية الجزائرية"
      }
    },
    footer: {
      title: "Eco DZ",
      description: "منصة رقمية لتحليل ومراقبة وتحسين النظم البيئية في الجزائر باستخدام تقنيات الذكاء الاصطناعي والتحليل البيولوجي.",
      quickLinks: {
        title: "روابط سريعة",
        analysis: "التحليل الذكي",
        database: "قاعدة البيانات",
        simulation: "المحاكاة البيئية",
        sensor: "المسبار البيولوجي",
        about: "من نحن"
      },
      support: {
        title: "الدعم والمساعدة",
        faq: "الأسئلة الشائعة",
        guide: "دليل الاستخدام",
        terms: "المصطلحات العلمية",
        help: "مركز المساعدة",
        contact: "اتصل بنا"
      },
      newsletter: {
        title: "اشترك في النشرة البريدية",
        description: "احصل على آخر الأخبار والتحديثات حول المشروع والبيئة الجزائرية.",
        emailPlaceholder: "البريد الإلكتروني"
      },
      copyright: "© 2023 Eco DZ. جميع الحقوق محفوظة.",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
      cookies: "سياسة ملفات تعريف الارتباط"
    },
    auth: {
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي",
      greeting: "مرحباً",
      user: "المستخدم",
      loginRequired: "تسجيل الدخول مطلوب",
      loginToAnalyze: "يجب تسجيل الدخول لاستخدام ميزة التحليل",
      loginToSimulate: "يجب تسجيل الدخول لاستخدام ميزة المحاكاة",
      loginToSaveResults: "قم بتسجيل الدخول لحفظ نتائج التحليل",
      loginToSaveSimulations: "قم بتسجيل الدخول لحفظ نتائج المحاكاة",
      loginToSaveDesc: "سجل دخولك لحفظ نتائج التحليل والمحاكاة والاستفادة من جميع ميزات المنصة"
    },
    settings: {
      languageChanged: "تم تغيير اللغة",
      languageChangeFailed: "فشل تغيير اللغة",
      tryAgain: "يرجى المحاولة مرة أخرى"
    }
  },
  fr: {
    seo: {
      home: {
        title: "Système Écologique Intelligent - Plateforme d'analyse des plantes, sols et environnements",
        description: "Plateforme intégrée pour l'analyse des plantes, sols et écosystèmes en Algérie utilisant l'intelligence artificielle et l'analyse biologique"
      },
      analysis: {
        title: "Analyse des Plantes et Sols - Système Écologique Intelligent",
        description: "Analysez les plantes et les sols à l'aide de l'intelligence artificielle pour obtenir une évaluation précise et des recommandations d'amélioration"
      },
      database: {
        title: "Base de Données Écologique - Système Écologique Intelligent",
        description: "Explorez notre base de données complète sur les plantes, sols et écosystèmes en Algérie"
      },
      simulation: {
        title: "Simulation Environnementale - Système Écologique Intelligent",
        description: "Expérimentez avec la simulation environnementale et prédisez l'impact des changements sur l'écosystème local"
      },
      sensor: {
        title: "Sonde Biologique - Système Écologique Intelligent",
        description: "Découvrez la sonde biologique pour analyser la sève des plantes et les composants du sol avec haute précision"
      },
      about: {
        title: "À Propos - Système Écologique Intelligent",
        description: "Découvrez notre équipe et nos objectifs pour améliorer l'environnement et l'agriculture durable en Algérie"
      }
    },
    header: {
      title: "Système Écologique Intelligent",
      analysis: "Analyse",
      database: "Base de Données",
      simulation: "Simulation",
      sensor: "Sonde",
      about: "À Propos",
      login: "Mon Compte"
    },
    hero: {
      title: "Plateforme Intelligente d'Analyse des Plantes, Sols et Écosystèmes",
      subtitle: "Outil intégré pour étudiants, chercheurs et agriculteurs en Algérie",
      startAnalysis: "Commencer l'Analyse",
      exploreDatabase: "Explorer la Base de Données"
    },
    features: {
      title: "Nos Services Principaux",
      imageAnalysis: {
        title: "Analyse des Plantes et Sols par Image",
        description: "Utilisation de techniques d'intelligence artificielle pour analyser les images de plantes et de sols et fournir une évaluation précise de leur état.",
        cta: "Commencer l'Analyse"
      },
      bioSensor: {
        title: "Analyse Biologique par Sonde",
        description: "Utilisation d'une sonde spéciale pour mesurer et analyser la sève des plantes et les composants du sol avec précision.",
        cta: "Découvrir la Sonde"
      },
      simulation: {
        title: "Simulation Environnementale Interactive",
        description: "Simulation de l'impact de l'introduction de nouvelles espèces végétales ou des changements environnementaux sur l'écosystème local.",
        cta: "Essayer la Simulation"
      }
    },
    analysis: {
      title: "Analyse des Plantes et des Sols",
      description: "Téléchargez une image de plante ou de sol, et notre système intelligent l'analysera pour fournir un rapport détaillé sur son état et des recommandations d'amélioration.",
      upload: {
        title: "Télécharger une Image pour Analyse",
        plantAnalysis: "Analyse de Plante",
        soilAnalysis: "Analyse de Sol",
        dragAndDrop: "Glissez l'image ici ou cliquez pour sélectionner",
        fileTypes: "JPG, PNG ou HEIC jusqu'à 10MB",
        selectImage: "Sélectionner une Image",
        changeImage: "Changer l'Image",
        examples: {
          title: "Exemples d'images appropriées pour l'analyse:",
          healthy: "Exemple de feuille de plante saine",
          diseased: "Exemple de feuille de plante malade",
          soil: "Exemple d'échantillon de sol"
        }
      },
      result: {
        title: "Aperçu de l'Analyse",
        noImage: "L'aperçu de l'analyse apparaîtra ici après avoir téléchargé une image",
        readyToAnalyze: "Image prête pour l'analyse",
        analyzing: "Analyse en cours...",
        analyzeImage: "Analyser l'Image",
        connectSensor: "Connecter la Sonde",
        loginNotice: "Vous devez vous connecter pour sauvegarder les résultats d'analyse",
        condition: "Condition",
        recommendations: "Recommandations",
        confidence: "Niveau de Confiance",
        phLevel: "Niveau de pH",
        nutrients: "Nutriments",
        low: "Faible",
        high: "Élevé"
      },
      history: {
        title: "Vos Analyses Précédentes",
        viewAll: "Voir Tout",
        noAnalyses: "Aucune analyse précédente"
      },
      errors: {
        noImage: "Aucune image sélectionnée",
        pleaseSelectImage: "Veuillez sélectionner une image pour l'analyse",
        failed: "Échec de l'analyse",
        tryAgain: "Une erreur s'est produite lors de l'analyse, veuillez réessayer"
      },
      success: {
        title: "Analyse Réussie",
        description: "L'image a été analysée et les résultats sont affichés"
      }
    },
    database: {
      title: "Base de Données Écologique",
      description: "Explorez notre base de données complète des écosystèmes en Algérie, y compris les espèces végétales locales, les types de sols, et le climat.",
      search: {
        searchLabel: "Recherche",
        searchPlaceholder: "Nom de plante, type de sol...",
        categoryLabel: "Catégorie",
        regionLabel: "Région",
        allCategories: "Toutes les Catégories",
        allRegions: "Toute l'Algérie",
        plants: "Plantes",
        trees: "Arbres",
        soils: "Types de Sol",
        ecosystems: "Écosystèmes",
        north: "Nord",
        south: "Sud",
        east: "Est",
        west: "Ouest",
        highlands: "Hauts Plateaux",
        desert: "Désert"
      },
      item: {
        region: "Région",
        viewMore: "Voir Plus"
      },
      details: {
        scientificName: "Nom Scientifique",
        description: "Description",
        characteristics: "Caractéristiques"
      },
      noResults: "Aucun résultat correspondant à votre recherche",
      loadMore: "Afficher Plus d'Éléments"
    },
    simulation: {
      title: "Simulation Environnementale Interactive",
      description: "Expérimentez comment l'environnement local peut évoluer au fil du temps, et l'impact de l'introduction de nouvelles espèces végétales ou des changements dans l'écosystème.",
      controls: {
        title: "Paramètres de Simulation",
        selectEcosystem: "Sélectionner l'Écosystème",
        ecosystemPlaceholder: "Forêts Méditerranéennes (Nord)",
        introducedSpecies: "Introduction de Nouvelles Espèces",
        plants: {
          eucalyptus: "Eucalyptus",
          argan: "Arganier",
          aleppoPine: "Pin d'Alep",
          durumWheat: "Blé Dur"
        },
        climateFactors: "Facteurs Climatiques",
        rainfall: "Niveau de Précipitations",
        rainfallUnit: "mm/an",
        temperature: "Température Moyenne",
        windSpeed: "Vitesse du Vent",
        windSpeeds: {
          low: "Faible",
          medium: "Moyenne",
          high: "Élevée"
        },
        simulationPeriod: "Période de Simulation",
        years: "années",
        startSimulation: "Démarrer la Simulation",
        simulating: "Simulation en cours..."
      },
      results: {
        title: "Résultats de la Simulation",
        fullscreenTitle: "Simulation Environnementale (Plein Écran)",
        pressToStart: "Cliquez pour Démarrer la Simulation",
        selectSettings: "Sélectionnez d'abord les paramètres dans le menu adjacent",
        simulating: "Exécution de la simulation...",
        year: "Année",
        years: "Années",
        percentage: "Pourcentage",
        indicators: {
          vegetation: "Couverture Végétale",
          biodiversity: "Biodiversité",
          soilQuality: "Qualité du Sol",
          sustainability: "Durabilité"
        }
      },
      success: {
        title: "Simulation Réussie",
        description: "Une nouvelle simulation a été créée et les résultats sont affichés"
      },
      error: {
        title: "Échec de la Simulation",
        description: "Une erreur s'est produite lors de la simulation, veuillez réessayer"
      }
    },
    sensor: {
      title: "Sonde Intelligente pour Analyse Biologique",
      description: "Notre sonde biologique permet une analyse précise et directe des plantes et des sols, aidant à identifier les problèmes avant qu'ils ne deviennent visibles à l'œil nu.",
      features: {
        title: "Caractéristiques de la Sonde",
        item1: "Mesure des niveaux de nutriments et de minéraux dans le sol avec haute précision",
        item2: "Analyse de la sève des plantes et détection précoce des maladies",
        item3: "Mesure du pH et de la conductivité électrique du sol",
        item4: "Connexion directe via USB/USB-C avec l'application d'analyse"
      },
      requestInfo: "Demander des Informations",
      watchVideo: "Regarder la Vidéo Explicative",
      comingSoon: "Bientôt",
      deviceImage: "Dispositif de sonde biologique pour analyse",
      infoCard: {
        title: "Mesures Précises",
        description: "La sonde fournit des mesures avec une précision de 99,8% pour les éléments essentiels du sol."
      }
    },
    about: {
      title: "À Propos du Projet",
      description: "Nous sommes une équipe de chercheurs, d'ingénieurs et de spécialistes en sciences environnementales et agricoles, travaillant ensemble pour développer des outils technologiques avancés qui aident à comprendre et améliorer les écosystèmes en Algérie.",
      objectives: {
        title: "Nos Objectifs",
        item1: "Promouvoir la sensibilisation environnementale et la conservation de la biodiversité",
        item2: "Soutenir la prise de décisions agricoles éclairées basées sur des analyses précises",
        item3: "Fournir des outils éducatifs interactifs pour les étudiants et les chercheurs",
        item4: "Contribuer au développement de l'agriculture durable et intelligente"
      },
      contactUs: "Contactez-nous",
      readMore: "Lire Plus",
      images: {
        lab: "Chercheurs analysant des échantillons de plantes",
        field: "Travailleur de terrain utilisant une tablette pour surveiller les plantes",
        data: "Visualisation de données de surveillance environnementale",
        conservation: "Efforts de conservation dans les paysages algériens"
      }
    },
    footer: {
      title: "Système Écologique Intelligent",
      description: "Plateforme numérique pour analyser, surveiller et améliorer les écosystèmes en Algérie en utilisant l'intelligence artificielle et l'analyse biologique.",
      quickLinks: {
        title: "Liens Rapides",
        analysis: "Analyse Intelligente",
        database: "Base de Données",
        simulation: "Simulation Environnementale",
        sensor: "Sonde Biologique",
        about: "À Propos"
      },
      support: {
        title: "Support et Aide",
        faq: "FAQ",
        guide: "Guide d'Utilisation",
        terms: "Termes Scientifiques",
        help: "Centre d'Aide",
        contact: "Contactez-nous"
      },
      newsletter: {
        title: "Inscrivez-vous à la Newsletter",
        description: "Recevez les dernières nouvelles et mises à jour sur le projet et l'environnement algérien.",
        emailPlaceholder: "Email"
      },
      copyright: "© 2023 Système Écologique Intelligent. Tous droits réservés.",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      cookies: "Politique de Cookies"
    },
    auth: {
      login: "Se Connecter",
      logout: "Se Déconnecter",
      profile: "Profil",
      greeting: "Bonjour",
      user: "Utilisateur",
      loginRequired: "Connexion Requise",
      loginToAnalyze: "Vous devez vous connecter pour utiliser la fonction d'analyse",
      loginToSimulate: "Vous devez vous connecter pour utiliser la fonction de simulation",
      loginToSaveResults: "Connectez-vous pour sauvegarder les résultats d'analyse",
      loginToSaveSimulations: "Connectez-vous pour sauvegarder les résultats de simulation",
      loginToSaveDesc: "Connectez-vous pour sauvegarder les résultats d'analyses et de simulations et profiter de toutes les fonctionnalités de la plateforme"
    },
    settings: {
      languageChanged: "Langue Modifiée",
      languageChangeFailed: "Échec de Changement de Langue",
      tryAgain: "Veuillez réessayer"
    }
  }
};
