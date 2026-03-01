export type Locale = "zh-TW" | "en" | "es" | "fr";

export const translations = {
  // Navigation
  "nav.explore": { "zh-TW": "探索", en: "Explore", es: "Explorar", fr: "Explorer" },
  "nav.trending": { "zh-TW": "熱門", en: "Trending", es: "Tendencias", fr: "Tendances" },
  "nav.recent": { "zh-TW": "最近", en: "Recent", es: "Recientes", fr: "Récents" },
  "nav.expiring": { "zh-TW": "到期", en: "Expiring", es: "Vencen", fr: "Expirants" },
  "nav.categories": { "zh-TW": "分類", en: "Categories", es: "Categorías", fr: "Catégories" },
  "nav.following": { "zh-TW": "追蹤", en: "Following", es: "Siguiendo", fr: "Suivis" },
  "nav.settings": { "zh-TW": "設定", en: "Settings", es: "Ajustes", fr: "Paramètres" },
  "nav.saved": { "zh-TW": "已存", en: "Saved", es: "Guardados", fr: "Enregistrés" },
  "nav.personal": { "zh-TW": "個人", en: "Personal", es: "Personal", fr: "Personnel" },

  // Mobile tabs
  "tab.back": { "zh-TW": "返回", en: "Back", es: "Atrás", fr: "Retour" },
  "tab.home": { "zh-TW": "首頁", en: "Home", es: "Inicio", fr: "Accueil" },
  "tab.search": { "zh-TW": "搜尋", en: "Search", es: "Buscar", fr: "Recherche" },
  "tab.follow": { "zh-TW": "追蹤", en: "Follow", es: "Seguir", fr: "Suivre" },
  "tab.me": { "zh-TW": "我的", en: "Me", es: "Yo", fr: "Moi" },

  // Index page
  "index.welcome": { "zh-TW": "歡迎回來", en: "Welcome back", es: "Bienvenido", fr: "Bienvenue" },
  "index.welcomeDesc": { "zh-TW": "探索全球網域動態，追蹤您關注的網站", en: "Explore global domain trends, track the sites you care about", es: "Explora tendencias de dominios y sigue los sitios que te importan", fr: "Explorez les tendances des domaines et suivez les sites qui vous intéressent" },
  "index.searchDomain": { "zh-TW": "搜尋網域", en: "Search domain", es: "Buscar dominio", fr: "Rechercher un domaine" },
  "index.domainsTracked": { "zh-TW": "個網域追蹤中", en: "domains tracked", es: "dominios seguidos", fr: "domaines suivis" },
  "index.followingDomains": { "zh-TW": "追蹤中的網域", en: "Following", es: "Siguiendo", fr: "Suivis" },
  "index.browseDomains": { "zh-TW": "瀏覽網域", en: "Browse", es: "Explorar", fr: "Parcourir" },
  "index.viewAll": { "zh-TW": "全部", en: "All", es: "Todo", fr: "Tout" },
  "index.viewAllLower": { "zh-TW": "查看全部", en: "View all", es: "Ver todo", fr: "Voir tout" },
  "index.categories": { "zh-TW": "分類", en: "Categories", es: "Categorías", fr: "Catégories" },
  "index.domainSearch": { "zh-TW": "網域搜尋", en: "Domain Search", es: "Buscar dominio", fr: "Recherche de domaine" },
  "index.lookUpInstantly": { "zh-TW": "即時查詢任何網域", en: "Look up any domain instantly", es: "Consulta cualquier dominio al instante", fr: "Recherchez n'importe quel domaine instantanément" },

  // Search
  "search.placeholder": { "zh-TW": "搜尋網域...", en: "Search domain...", es: "Buscar dominio...", fr: "Rechercher un domaine..." },
  "search.placeholderFull": { "zh-TW": "搜尋任何網域...", en: "Search any domain...", es: "Buscar cualquier dominio...", fr: "Rechercher n'importe quel domaine..." },
  "search.enterDomain": { "zh-TW": "輸入任何網域...", en: "Enter any domain...", es: "Ingresa cualquier dominio...", fr: "Entrez n'importe quel domaine..." },
  "search.noMatches": { "zh-TW": "找不到相符結果", en: "No matches found", es: "Sin resultados", fr: "Aucun résultat" },
  "search.lookUp": { "zh-TW": "查詢", en: "Look up", es: "Consultar", fr: "Rechercher" },
  "search.recent": { "zh-TW": "最近搜尋", en: "Recent", es: "Recientes", fr: "Récents" },
  "search.trending": { "zh-TW": "熱門搜尋", en: "Trending", es: "Tendencias", fr: "Tendances" },
  "search.clear": { "zh-TW": "清除", en: "Clear", es: "Limpiar", fr: "Effacer" },
  "search.cancel": { "zh-TW": "取消", en: "Cancel", es: "Cancelar", fr: "Annuler" },

  // Domain detail
  "domain.collecting": { "zh-TW": "資料蒐集中...", en: "Collecting data...", es: "Recopilando datos...", fr: "Collecte des données..." },
  "domain.firstQuery": { "zh-TW": "首次查詢此網域", en: "First time looking up this domain", es: "Primera consulta de este dominio", fr: "Première recherche de ce domaine" },
  "domain.collectingInfo": { "zh-TW": "正在蒐集相關資訊，請稍候...", en: "Collecting information, please wait...", es: "Recopilando información, espera...", fr: "Collecte d'informations, veuillez patienter..." },
  "domain.autoUpdate": { "zh-TW": "資料蒐集完成後將自動更新", en: "Will auto-update when data collection is complete", es: "Se actualizará automáticamente al completar", fr: "Mise à jour automatique à la fin de la collecte" },
  "domain.collectingLabel": { "zh-TW": "蒐集中...", en: "Collecting...", es: "Recopilando...", fr: "Collecte..." },
  "domain.done": { "zh-TW": "完成", en: "Done", es: "Listo", fr: "Terminé" },
  "domain.follow": { "zh-TW": "追蹤", en: "Follow", es: "Seguir", fr: "Suivre" },
  "domain.following": { "zh-TW": "追蹤中", en: "Following", es: "Siguiendo", fr: "Suivi" },
  "domain.visit": { "zh-TW": "造訪", en: "Visit", es: "Visitar", fr: "Visiter" },
  "domain.sslOk": { "zh-TW": "SSL 正常", en: "SSL OK", es: "SSL OK", fr: "SSL OK" },
  "domain.running": { "zh-TW": "運行中", en: "Running", es: "Activo", fr: "En ligne" },
  "domain.normal": { "zh-TW": "正常", en: "Normal", es: "Normal", fr: "Normal" },

  // Domain error states
  "domain.notRegistered": { "zh-TW": "此網域尚未註冊", en: "This domain is not registered", es: "Este dominio no está registrado", fr: "Ce domaine n'est pas enregistré" },
  "domain.notRegisteredHint": { "zh-TW": "WHOIS 資料庫中查無此網域的註冊記錄", en: "No registration record found in the WHOIS database", es: "No se encontró registro en la base de datos WHOIS", fr: "Aucun enregistrement trouvé dans la base de données WHOIS" },
  "domain.notRegisteredBadge": { "zh-TW": "此網域目前可供購買", en: "This domain is available for purchase", es: "Este dominio está disponible para compra", fr: "Ce domaine est disponible à l'achat" },
  "domain.fetchFailed": { "zh-TW": "查詢失敗", en: "Query failed", es: "Consulta fallida", fr: "Échec de la requête" },
  "domain.fetchFailedHint": { "zh-TW": "無法連線至查詢服務，請稍後再試", en: "Unable to connect to the query service, please try again later", es: "No se pudo conectar al servicio, intenta más tarde", fr: "Impossible de se connecter au service, réessayez plus tard" },
  "domain.invalid": { "zh-TW": "無效的網域格式", en: "Invalid domain format", es: "Formato de dominio inválido", fr: "Format de domaine invalide" },
  "domain.invalidHint": { "zh-TW": "這看起來不像有效的網域名稱，請試試 example.com 這類格式", en: "This doesn't look like a valid domain. Try a format like example.com", es: "Esto no parece un dominio válido. Prueba un formato como example.com", fr: "Cela ne ressemble pas à un domaine valide. Essayez un format comme example.com" },
  "domain.retry": { "zh-TW": "重試", en: "Retry", es: "Reintentar", fr: "Réessayer" },
  "domain.searchAnother": { "zh-TW": "搜尋其他網域", en: "Search another domain", es: "Buscar otro dominio", fr: "Rechercher un autre domaine" },
  "domain.takesSeconds": { "zh-TW": "通常 2–5 秒", en: "Usually 2–5 seconds", es: "Generalmente 2–5 segundos", fr: "Généralement 2–5 secondes" },

  // Search errors
  "search.invalidDomain": { "zh-TW": "請輸入有效的網域（例如 example.com）", en: "Please enter a valid domain (e.g. example.com)", es: "Ingresa un dominio válido (ej. example.com)", fr: "Veuillez saisir un domaine valide (ex. example.com)" },

  // Nav home
  "nav.home": { "zh-TW": "返回首頁", en: "Home", es: "Inicio", fr: "Accueil" },

  // User profile
  "user.guest": { "zh-TW": "訪客", en: "Guest", es: "Invitado", fr: "Invité" },
  "user.guestDesc": { "zh-TW": "登入以解鎖完整功能", en: "Sign in to unlock all features", es: "Inicia sesión para desbloquear todo", fr: "Connectez-vous pour tout débloquer" },
  "user.signOut": { "zh-TW": "登出", en: "Sign Out", es: "Cerrar sesión", fr: "Se déconnecter" },
  "user.member": { "zh-TW": "會員", en: "Member", es: "Miembro", fr: "Membre" },

  // Domain detail - data steps
  "domain.stepWhois": { "zh-TW": "WHOIS 資料", en: "WHOIS Data", es: "Datos WHOIS", fr: "Données WHOIS" },
  "domain.stepDNS": { "zh-TW": "DNS 記錄", en: "DNS Records", es: "Registros DNS", fr: "Enregistrements DNS" },
  "domain.stepSecurity": { "zh-TW": "安全性檢測", en: "Security Check", es: "Verificación de seguridad", fr: "Vérification de sécurité" },
  "domain.stepHistory": { "zh-TW": "歷史資料", en: "Historical Data", es: "Datos históricos", fr: "Données historiques" },

  // Domain tabs
  "domain.tabDNS": { "zh-TW": "DNS", en: "DNS", es: "DNS", fr: "DNS" },
  "domain.tabHealth": { "zh-TW": "健康", en: "Health", es: "Salud", fr: "Santé" },
  "domain.tabSecurity": { "zh-TW": "安全", en: "Security", es: "Seguridad", fr: "Sécurité" },
  "domain.tabTimeline": { "zh-TW": "時間軸", en: "Timeline", es: "Cronología", fr: "Chronologie" },

  // AI Review
  "ai.review": { "zh-TW": "AI 講評", en: "AI Review", es: "Análisis IA", fr: "Analyse IA" },
  "ai.description": { "zh-TW": "網站說明", en: "Description", es: "Descripción", fr: "Description" },
  "ai.updatedAt": { "zh-TW": "更新於", en: "Updated", es: "Actualizado", fr: "Mis à jour" },
  "ai.noDescription": { "zh-TW": "此網域尚未提供官方說明。", en: "No official description available for this domain.", es: "No hay descripción oficial disponible para este dominio.", fr: "Aucune description officielle disponible pour ce domaine." },

  // Comparison
  "compare.similarDomains": { "zh-TW": "相似網域", en: "Similar Domains", es: "Dominios similares", fr: "Domaines similaires" },
  "compare.clickToExpand": { "zh-TW": "點擊展開查看差異比較", en: "Click to expand and compare", es: "Clic para expandir y comparar", fr: "Cliquez pour développer et comparer" },
  "compare.dimension": { "zh-TW": "維度", en: "Dimension", es: "Dimensión", fr: "Dimension" },
  "compare.age": { "zh-TW": "網齡", en: "Age", es: "Antigüedad", fr: "Âge" },
  "compare.registrar": { "zh-TW": "註冊商", en: "Registrar", es: "Registrador", fr: "Registraire" },
  "compare.sslValid": { "zh-TW": "SSL 有效", en: "SSL Valid", es: "SSL válido", fr: "SSL valide" },
  "compare.uptime": { "zh-TW": "運行時間", en: "Uptime", es: "Tiempo activo", fr: "Disponibilité" },
  "compare.lastChange": { "zh-TW": "最近變更", en: "Last Change", es: "Último cambio", fr: "Dernier changement" },
  "compare.techStack": { "zh-TW": "技術棧", en: "Tech Stack", es: "Stack técnico", fr: "Stack technique" },
  "compare.sameRegistrar": { "zh-TW": "相同註冊商", en: "Same registrar", es: "Mismo registrador", fr: "Même registraire" },
  "compare.similarTech": { "zh-TW": "類似技術棧", en: "Similar tech", es: "Tecnología similar", fr: "Tech similaire" },
  "compare.similarAge": { "zh-TW": "相近網齡", en: "Similar age", es: "Antigüedad similar", fr: "Âge similaire" },
  "compare.sameType": { "zh-TW": "同類型網站", en: "Same type", es: "Mismo tipo", fr: "Même type" },

  // Following page
  "following.title": { "zh-TW": "追蹤中", en: "Following", es: "Siguiendo", fr: "Suivis" },
  "following.domainsTracked": { "zh-TW": "個網域追蹤中", en: "domains tracked", es: "dominios seguidos", fr: "domaines suivis" },
  "following.noDomainsTitle": { "zh-TW": "尚未追蹤任何網域", en: "No domains tracked", es: "Sin dominios seguidos", fr: "Aucun domaine suivi" },
  "following.noDomainsDesc": { "zh-TW": "追蹤網域以取得活動更新通知。", en: "Follow domains to track their activity and get updates when things change.", es: "Sigue dominios para recibir actualizaciones de actividad.", fr: "Suivez des domaines pour recevoir des mises à jour d'activité." },
  "following.findDomains": { "zh-TW": "尋找網域", en: "Find domains", es: "Buscar dominios", fr: "Trouver des domaines" },
  "following.beingTracked": { "zh-TW": "個網域追蹤中", en: "domain(s) being tracked", es: "dominio(s) seguidos", fr: "domaine(s) suivis" },
  "following.trackedDomains": { "zh-TW": "追蹤的網域", en: "Tracked Domains", es: "Dominios seguidos", fr: "Domaines suivis" },
  "following.suggested": { "zh-TW": "推薦", en: "Suggested", es: "Sugeridos", fr: "Suggérés" },
  "following.suggestedDesc": { "zh-TW": "您可能感興趣的熱門網域", en: "Popular domains you might want to track", es: "Dominios populares que podrían interesarte", fr: "Domaines populaires qui pourraient vous intéresser" },
  "following.view": { "zh-TW": "查看", en: "View", es: "Ver", fr: "Voir" },

  // Categories
  "categories.title": { "zh-TW": "分類", en: "Categories", es: "Categorías", fr: "Catégories" },
  "categories.browseByIndustry": { "zh-TW": "依產業瀏覽", en: "Browse by industry", es: "Explorar por industria", fr: "Parcourir par industrie" },
  "categories.domains": { "zh-TW": "個網域", en: "domains", es: "dominios", fr: "domaines" },
  "categories.noDomains": { "zh-TW": "此分類尚無網域。", en: "No domains in this category yet.", es: "Aún no hay dominios en esta categoría.", fr: "Aucun domaine dans cette catégorie." },
  "categories.notFound": { "zh-TW": "找不到分類。", en: "Category not found.", es: "Categoría no encontrada.", fr: "Catégorie introuvable." },

  // Category labels
  "category.tech": { "zh-TW": "科技", en: "Technology", es: "Tecnología", fr: "Technologie" },
  "category.business": { "zh-TW": "商業", en: "Business", es: "Negocios", fr: "Business" },
  "category.media": { "zh-TW": "媒體", en: "Media", es: "Medios", fr: "Médias" },
  "category.ecommerce": { "zh-TW": "電子商務", en: "E-commerce", es: "Comercio electrónico", fr: "E-commerce" },
  "category.finance": { "zh-TW": "金融", en: "Finance", es: "Finanzas", fr: "Finance" },
  "category.social": { "zh-TW": "社群", en: "Social", es: "Social", fr: "Social" },

  // Recent
  "recent.title": { "zh-TW": "最近搜尋", en: "Recent Searches", es: "Búsquedas recientes", fr: "Recherches récentes" },
  "recent.subtitle": { "zh-TW": "所有用戶的最新查詢記錄", en: "Latest queries from all users", es: "Últimas consultas de todos los usuarios", fr: "Dernières requêtes de tous les utilisateurs" },
  "recent.empty": { "zh-TW": "尚無查詢記錄", en: "No recent searches yet", es: "Sin búsquedas recientes", fr: "Aucune recherche récente" },
  "recent.realtime": { "zh-TW": "即時更新", en: "Real-time Updates", es: "Actualizaciones en tiempo real", fr: "Mises à jour en temps réel" },
  "recent.realtimeDesc": { "zh-TW": "系統每 5 分鐘自動掃描追蹤中的網域，確保資訊最新。", en: "System scans tracked domains every 5 minutes to keep information up-to-date.", es: "El sistema escanea dominios cada 5 minutos para mantener la información actualizada.", fr: "Le système analyse les domaines suivis toutes les 5 minutes pour maintenir les informations à jour." },

  // Expiring
  "expiring.title": { "zh-TW": "即將到期", en: "Expiring Soon", es: "Próximos a vencer", fr: "Expirent bientôt" },
  "expiring.subtitle": { "zh-TW": "追蹤即將到期的網域，把握註冊機會", en: "Domains approaching expiration", es: "Dominios próximos a vencer", fr: "Domaines proches de l'expiration" },
  "expiring.alert": { "zh-TW": "重要提醒", en: "Important Alert", es: "Alerta importante", fr: "Alerte importante" },
  "expiring.alertDesc": { "zh-TW": "有 12 個網域將在 7 天內到期。建議設定提醒以免錯過續約時間。", en: "12 domains will expire within 7 days. Set up alerts to avoid missing renewal deadlines.", es: "12 dominios vencerán en 7 días. Configura alertas para no perder las fechas de renovación.", fr: "12 domaines expireront dans 7 jours. Configurez des alertes pour ne pas manquer les échéances." },
  "expiring.noDomains": { "zh-TW": "目前沒有即將到期的網域。", en: "No domains expiring soon.", es: "No hay dominios próximos a vencer.", fr: "Aucun domaine n'expire bientôt." },
  "expiring.daysWindow": { "zh-TW": "天內", en: "days", es: "días", fr: "jours" },
  "expiring.days": { "zh-TW": "天", en: "days", es: "días", fr: "jours" },
  "expiring.expired": { "zh-TW": "已到期", en: "Expired", es: "Vencido", fr: "Expiré" },
  "expiring.urgentDesc": { "zh-TW": "個網域將在 7 天內到期，建議盡快處理。", en: "domain(s) will expire within 7 days. Take action soon.", es: "dominio(s) vencerán en 7 días. Actúa pronto.", fr: "domaine(s) expireront dans 7 jours. Agissez vite." },
  "expiring.timeline": { "zh-TW": "到期時間軸", en: "Expiry Timeline", es: "Cronología de vencimiento", fr: "Chronologie d'expiration" },

  // Trending
  "trending.title": { "zh-TW": "熱門網域", en: "Trending Domains", es: "Dominios en tendencia", fr: "Domaines tendance" },
  "trending.subtitle": { "zh-TW": "即時追蹤最活躍的網域動態", en: "Most active domains right now", es: "Los dominios más activos ahora mismo", fr: "Les domaines les plus actifs en ce moment" },
  "trending.hotThisWeek": { "zh-TW": "本週最熱", en: "Hot This Week", es: "Popular esta semana", fr: "Populaire cette semaine" },

  // Sidebar
  "sidebar.totalDomains": { "zh-TW": "總收錄網域", en: "Total Domains", es: "Total de dominios", fr: "Total des domaines" },
  "sidebar.activeToday": { "zh-TW": "今日活躍", en: "Active Today", es: "Activos hoy", fr: "Actifs aujourd'hui" },
  "sidebar.totalShort": { "zh-TW": "總收錄", en: "Total", es: "Total", fr: "Total" },

  // Settings
  "settings.title": { "zh-TW": "設定", en: "Settings", es: "Ajustes", fr: "Paramètres" },
  "settings.appearance": { "zh-TW": "外觀", en: "Appearance", es: "Apariencia", fr: "Apparence" },
  "settings.light": { "zh-TW": "淺色", en: "Light", es: "Claro", fr: "Clair" },
  "settings.dark": { "zh-TW": "深色", en: "Dark", es: "Oscuro", fr: "Sombre" },
  "settings.system": { "zh-TW": "系統", en: "System", es: "Sistema", fr: "Système" },
  "settings.language": { "zh-TW": "語言", en: "Language", es: "Idioma", fr: "Langue" },
  "settings.account": { "zh-TW": "帳號", en: "Account", es: "Cuenta", fr: "Compte" },
  "settings.accountDesc": { "zh-TW": "登入以同步跨裝置的追蹤網域。", en: "Sign in to sync your followed domains across devices.", es: "Inicia sesión para sincronizar tus dominios seguidos.", fr: "Connectez-vous pour synchroniser vos domaines suivis." },
  "settings.signIn": { "zh-TW": "登入", en: "Sign In", es: "Iniciar sesión", fr: "Se connecter" },
  "settings.notifications": { "zh-TW": "通知", en: "Notifications", es: "Notificaciones", fr: "Notifications" },
  "settings.expirationAlerts": { "zh-TW": "網域到期提醒", en: "Domain expiration alerts", es: "Alertas de vencimiento", fr: "Alertes d'expiration" },
  "settings.followedUpdates": { "zh-TW": "追蹤網域更新", en: "Followed domain updates", es: "Actualizaciones de dominios seguidos", fr: "Mises à jour des domaines suivis" },
  "settings.privacy": { "zh-TW": "隱私", en: "Privacy", es: "Privacidad", fr: "Confidentialité" },
  "settings.analytics": { "zh-TW": "使用分析", en: "Usage analytics", es: "Análisis de uso", fr: "Analyse d'utilisation" },
  "settings.about": { "zh-TW": "關於", en: "About", es: "Acerca de", fr: "À propos" },
  "settings.aboutDesc": { "zh-TW": "Whoisvibe 揭示任何網域的面貌。", en: "Whoisvibe reveals the vibe of any domain.", es: "Whoisvibe revela la esencia de cualquier dominio.", fr: "Whoisvibe révèle l'essence de n'importe quel domaine." },

  // Vibe labels
  "vibe.ai-native": { "zh-TW": "AI 原生", en: "AI-native", es: "IA nativo", fr: "IA natif" },
  "vibe.high-attention": { "zh-TW": "高關注", en: "High attention", es: "Alta atención", fr: "Haute attention" },
  "vibe.established": { "zh-TW": "成熟穩定", en: "Established", es: "Establecido", fr: "Établi" },
  "vibe.under-radar": { "zh-TW": "低調潛力", en: "Under the radar", es: "Bajo el radar", fr: "Sous le radar" },
  "vibe.dormant": { "zh-TW": "休眠中", en: "Dormant", es: "Inactivo", fr: "En veille" },
  "vibe.brand-sensitive": { "zh-TW": "品牌敏感", en: "Brand-sensitive", es: "Marca sensible", fr: "Marque sensible" },
  "vibe.aging-influential": { "zh-TW": "資深影響力", en: "Aging but influential", es: "Antiguo pero influyente", fr: "Ancien mais influent" },

  // 404
  "notFound.title": { "zh-TW": "找不到頁面", en: "Page not found", es: "Página no encontrada", fr: "Page introuvable" },
  "notFound.back": { "zh-TW": "返回首頁", en: "Return to Home", es: "Volver al inicio", fr: "Retour à l'accueil" },
  "notFound.subtitle": { "zh-TW": "這個頁面已經漂流到網路的盡頭了", en: "This page has drifted to the edge of the internet", es: "Esta página se ha perdido en los confines de internet", fr: "Cette page a dérivé aux confins d'internet" },
  "notFound.searchInstead": { "zh-TW": "搜尋網域", en: "Search a domain", es: "Buscar un dominio", fr: "Rechercher un domaine" },

  // Login
  "login.title": { "zh-TW": "登入帳號", en: "Sign In", es: "Iniciar sesión", fr: "Se connecter" },
  "login.subtitle": { "zh-TW": "揭示任何網域的面貌", en: "Reveal the vibe of any domain", es: "Revela la esencia de cualquier dominio", fr: "Révélez l'essence de n'importe quel domaine" },
  "login.description": { "zh-TW": "登入以同步追蹤資料並接收通知", en: "Sign in to sync your data and receive notifications", es: "Inicia sesión para sincronizar datos y recibir notificaciones", fr: "Connectez-vous pour synchroniser vos données et recevoir des notifications" },
  "login.google": { "zh-TW": "使用 Google 帳號登入", en: "Continue with Google", es: "Continuar con Google", fr: "Continuer avec Google" },
  "login.or": { "zh-TW": "或", en: "or", es: "o", fr: "ou" },
  "login.guest": { "zh-TW": "以訪客身份瀏覽", en: "Continue as guest", es: "Continuar como invitado", fr: "Continuer en tant qu'invité" },
  "login.featureNotify": { "zh-TW": "到期通知", en: "Expiry alerts", es: "Alertas de vencimiento", fr: "Alertes d'expiration" },
  "login.featureTrack": { "zh-TW": "網域追蹤", en: "Domain tracking", es: "Seguimiento de dominios", fr: "Suivi de domaines" },
  "login.featureSync": { "zh-TW": "跨裝置同步", en: "Cross-device sync", es: "Sincronización entre dispositivos", fr: "Synchronisation multi-appareils" },

  // Notifications
  "notifications.title": { "zh-TW": "通知", en: "Notifications", es: "Notificaciones", fr: "Notifications" },
  "notifications.loginRequired": { "zh-TW": "請先登入", en: "Sign in required", es: "Inicio de sesión requerido", fr: "Connexion requise" },
  "notifications.loginRequiredDesc": { "zh-TW": "登入以接收追蹤網域的到期提醒與更新通知。", en: "Sign in to receive expiration alerts and updates for your tracked domains.", es: "Inicia sesión para recibir alertas de vencimiento de tus dominios seguidos.", fr: "Connectez-vous pour recevoir les alertes d'expiration de vos domaines suivis." },
  "notifications.markAllRead": { "zh-TW": "全部已讀", en: "Mark all read", es: "Marcar todo leído", fr: "Tout marquer comme lu" },
  "notifications.unread": { "zh-TW": "則未讀通知", en: "unread", es: "sin leer", fr: "non lues" },
  "notifications.allRead": { "zh-TW": "所有通知已讀", en: "All notifications read", es: "Todas las notificaciones leídas", fr: "Toutes les notifications lues" },
  "notifications.empty": { "zh-TW": "沒有通知", en: "No notifications", es: "Sin notificaciones", fr: "Aucune notification" },
  "notifications.emptyDesc": { "zh-TW": "追蹤網域後，到期提醒將顯示在這裡。", en: "Follow domains and expiration alerts will appear here.", es: "Sigue dominios y las alertas aparecerán aquí.", fr: "Suivez des domaines et les alertes apparaîtront ici." },
  "nav.notifications": { "zh-TW": "通知", en: "Notifications", es: "Notificaciones", fr: "Notifications" },

  // Common
  "common.view": { "zh-TW": "查看", en: "View", es: "Ver", fr: "Voir" },
  "common.notFound": { "zh-TW": "找不到", en: "Not Found", es: "No encontrado", fr: "Introuvable" },
} as const;

export type TranslationKey = keyof typeof translations;
