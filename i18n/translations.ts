export type Locale = "zh-TW" | "en";

export const translations = {
  // Navigation
  "nav.explore": { "zh-TW": "探索", en: "Explore" },
  "nav.trending": { "zh-TW": "熱門", en: "Trending" },
  "nav.recent": { "zh-TW": "最近", en: "Recent" },
  "nav.expiring": { "zh-TW": "到期", en: "Expiring" },
  "nav.categories": { "zh-TW": "分類", en: "Categories" },
  "nav.following": { "zh-TW": "追蹤", en: "Following" },
  "nav.settings": { "zh-TW": "設定", en: "Settings" },
  "nav.saved": { "zh-TW": "已存", en: "Saved" },
  "nav.personal": { "zh-TW": "個人", en: "Personal" },

  // Mobile tabs
  "tab.back": { "zh-TW": "返回", en: "Back" },
  "tab.home": { "zh-TW": "首頁", en: "Home" },
  "tab.search": { "zh-TW": "搜尋", en: "Search" },
  "tab.follow": { "zh-TW": "追蹤", en: "Follow" },
  "tab.me": { "zh-TW": "我的", en: "Me" },

  // Index page
  "index.welcome": { "zh-TW": "歡迎回來", en: "Welcome back" },
  "index.welcomeDesc": { "zh-TW": "探索全球網域動態，追蹤您關注的網站", en: "Explore global domain trends, track the sites you care about" },
  "index.searchDomain": { "zh-TW": "搜尋網域", en: "Search domain" },
  "index.domainsTracked": { "zh-TW": "個網域追蹤中", en: "domains tracked" },
  "index.followingDomains": { "zh-TW": "追蹤中的網域", en: "Following" },
  "index.browseDomains": { "zh-TW": "瀏覽網域", en: "Browse" },
  "index.viewAll": { "zh-TW": "全部", en: "All" },
  "index.viewAllLower": { "zh-TW": "查看全部", en: "View all" },
  "index.categories": { "zh-TW": "分類", en: "Categories" },
  "index.domainSearch": { "zh-TW": "網域搜尋", en: "Domain Search" },
  "index.lookUpInstantly": { "zh-TW": "即時查詢任何網域", en: "Look up any domain instantly" },

  // Search
  "search.placeholder": { "zh-TW": "搜尋網域...", en: "Search domain..." },
  "search.placeholderFull": { "zh-TW": "搜尋任何網域...", en: "Search any domain..." },
  "search.enterDomain": { "zh-TW": "輸入任何網域...", en: "Enter any domain..." },
  "search.noMatches": { "zh-TW": "找不到相符結果", en: "No matches found" },
  "search.lookUp": { "zh-TW": "查詢", en: "Look up" },
  "search.recent": { "zh-TW": "最近搜尋", en: "Recent" },
  "search.trending": { "zh-TW": "熱門搜尋", en: "Trending" },
  "search.clear": { "zh-TW": "清除", en: "Clear" },
  "search.cancel": { "zh-TW": "取消", en: "Cancel" },

  // Domain detail
  "domain.collecting": { "zh-TW": "資料蒐集中...", en: "Collecting data..." },
  "domain.firstQuery": { "zh-TW": "首次查詢此網域", en: "First time looking up this domain" },
  "domain.collectingInfo": { "zh-TW": "正在蒐集相關資訊，請稍候...", en: "Collecting information, please wait..." },
  "domain.autoUpdate": { "zh-TW": "資料蒐集完成後將自動更新", en: "Will auto-update when data collection is complete" },
  "domain.collectingLabel": { "zh-TW": "蒐集中...", en: "Collecting..." },
  "domain.done": { "zh-TW": "完成", en: "Done" },
  "domain.follow": { "zh-TW": "追蹤", en: "Follow" },
  "domain.following": { "zh-TW": "追蹤中", en: "Following" },
  "domain.visit": { "zh-TW": "造訪", en: "Visit" },
  "domain.sslOk": { "zh-TW": "SSL 正常", en: "SSL OK" },
  "domain.running": { "zh-TW": "運行中", en: "Running" },
  "domain.normal": { "zh-TW": "正常", en: "Normal" },

  // Domain detail - data steps
  "domain.stepWhois": { "zh-TW": "WHOIS 資料", en: "WHOIS Data" },
  "domain.stepDNS": { "zh-TW": "DNS 記錄", en: "DNS Records" },
  "domain.stepSecurity": { "zh-TW": "安全性檢測", en: "Security Check" },
  "domain.stepHistory": { "zh-TW": "歷史資料", en: "Historical Data" },

  // Domain tabs
  "domain.tabDNS": { "zh-TW": "DNS", en: "DNS" },
  "domain.tabHealth": { "zh-TW": "健康", en: "Health" },
  "domain.tabSecurity": { "zh-TW": "安全", en: "Security" },
  "domain.tabTimeline": { "zh-TW": "時間軸", en: "Timeline" },

  // AI Review
  "ai.review": { "zh-TW": "AI 講評", en: "AI Review" },
  "ai.description": { "zh-TW": "網站說明", en: "Description" },
  "ai.updatedAt": { "zh-TW": "更新於", en: "Updated" },
  "ai.noDescription": { "zh-TW": "此網域尚未提供官方說明。", en: "No official description available for this domain." },

  // Comparison
  "compare.similarDomains": { "zh-TW": "相似網域", en: "Similar Domains" },
  "compare.clickToExpand": { "zh-TW": "點擊展開查看差異比較", en: "Click to expand and compare" },
  "compare.dimension": { "zh-TW": "維度", en: "Dimension" },
  "compare.age": { "zh-TW": "網齡", en: "Age" },
  "compare.registrar": { "zh-TW": "註冊商", en: "Registrar" },
  "compare.sslValid": { "zh-TW": "SSL 有效", en: "SSL Valid" },
  "compare.uptime": { "zh-TW": "運行時間", en: "Uptime" },
  "compare.lastChange": { "zh-TW": "最近變更", en: "Last Change" },
  "compare.techStack": { "zh-TW": "技術棧", en: "Tech Stack" },
  "compare.sameRegistrar": { "zh-TW": "相同註冊商", en: "Same registrar" },
  "compare.similarTech": { "zh-TW": "類似技術棧", en: "Similar tech" },
  "compare.similarAge": { "zh-TW": "相近網齡", en: "Similar age" },
  "compare.sameType": { "zh-TW": "同類型網站", en: "Same type" },

  // Following page
  "following.title": { "zh-TW": "追蹤中", en: "Following" },
  "following.domainsTracked": { "zh-TW": "個網域追蹤中", en: "domains tracked" },
  "following.noDomainsTitle": { "zh-TW": "尚未追蹤任何網域", en: "No domains tracked" },
  "following.noDomainsDesc": { "zh-TW": "追蹤網域以取得活動更新通知。", en: "Follow domains to track their activity and get updates when things change." },
  "following.findDomains": { "zh-TW": "尋找網域", en: "Find domains" },
  "following.beingTracked": { "zh-TW": "個網域追蹤中", en: "domain(s) being tracked" },
  "following.trackedDomains": { "zh-TW": "追蹤的網域", en: "Tracked Domains" },
  "following.suggested": { "zh-TW": "推薦", en: "Suggested" },
  "following.suggestedDesc": { "zh-TW": "您可能感興趣的熱門網域", en: "Popular domains you might want to track" },
  "following.view": { "zh-TW": "查看", en: "View" },

  // Categories
  "categories.title": { "zh-TW": "分類", en: "Categories" },
  "categories.browseByIndustry": { "zh-TW": "依產業瀏覽", en: "Browse by industry" },
  "categories.domains": { "zh-TW": "個網域", en: "domains" },
  "categories.noDomains": { "zh-TW": "此分類尚無網域。", en: "No domains in this category yet." },
  "categories.notFound": { "zh-TW": "找不到分類。", en: "Category not found." },

  // Category labels
  "category.tech": { "zh-TW": "科技", en: "Technology" },
  "category.business": { "zh-TW": "商業", en: "Business" },
  "category.media": { "zh-TW": "媒體", en: "Media" },
  "category.ecommerce": { "zh-TW": "電子商務", en: "E-commerce" },
  "category.finance": { "zh-TW": "金融", en: "Finance" },
  "category.social": { "zh-TW": "社群", en: "Social" },

  // Recent
  "recent.title": { "zh-TW": "最近更新", en: "Recently Updated" },
  "recent.subtitle": { "zh-TW": "追蹤最新活動的網域", en: "Domains with recent activity" },
  "recent.realtime": { "zh-TW": "即時更新", en: "Real-time Updates" },
  "recent.realtimeDesc": { "zh-TW": "系統每 5 分鐘自動掃描追蹤中的網域，確保資訊最新。", en: "System scans tracked domains every 5 minutes to keep information up-to-date." },

  // Expiring
  "expiring.title": { "zh-TW": "即將到期", en: "Expiring Soon" },
  "expiring.subtitle": { "zh-TW": "追蹤即將到期的網域，把握註冊機會", en: "Domains approaching expiration" },
  "expiring.alert": { "zh-TW": "重要提醒", en: "Important Alert" },
  "expiring.alertDesc": { "zh-TW": "有 12 個網域將在 7 天內到期。建議設定提醒以免錯過續約時間。", en: "12 domains will expire within 7 days. Set up alerts to avoid missing renewal deadlines." },
  "expiring.noDomains": { "zh-TW": "目前沒有即將到期的網域。", en: "No domains expiring soon." },

  // Trending
  "trending.title": { "zh-TW": "熱門網域", en: "Trending Domains" },
  "trending.subtitle": { "zh-TW": "即時追蹤最活躍的網域動態", en: "Most active domains right now" },
  "trending.hotThisWeek": { "zh-TW": "本週最熱", en: "Hot This Week" },

  // Sidebar
  "sidebar.totalDomains": { "zh-TW": "總收錄網域", en: "Total Domains" },
  "sidebar.activeToday": { "zh-TW": "今日活躍", en: "Active Today" },
  "sidebar.totalShort": { "zh-TW": "總收錄", en: "Total" },

  // Settings
  "settings.title": { "zh-TW": "設定", en: "Settings" },
  "settings.appearance": { "zh-TW": "外觀", en: "Appearance" },
  "settings.light": { "zh-TW": "淺色", en: "Light" },
  "settings.dark": { "zh-TW": "深色", en: "Dark" },
  "settings.system": { "zh-TW": "系統", en: "System" },
  "settings.language": { "zh-TW": "語言", en: "Language" },
  "settings.account": { "zh-TW": "帳號", en: "Account" },
  "settings.accountDesc": { "zh-TW": "登入以同步跨裝置的追蹤網域。", en: "Sign in to sync your followed domains across devices." },
  "settings.signIn": { "zh-TW": "登入", en: "Sign In" },
  "settings.notifications": { "zh-TW": "通知", en: "Notifications" },
  "settings.expirationAlerts": { "zh-TW": "網域到期提醒", en: "Domain expiration alerts" },
  "settings.followedUpdates": { "zh-TW": "追蹤網域更新", en: "Followed domain updates" },
  "settings.privacy": { "zh-TW": "隱私", en: "Privacy" },
  "settings.analytics": { "zh-TW": "使用分析", en: "Usage analytics" },
  "settings.about": { "zh-TW": "關於", en: "About" },
  "settings.aboutDesc": { "zh-TW": "Whoisvibe 揭示任何網域的面貌。", en: "Whoisvibe reveals the vibe of any domain." },

  // Vibe labels
  "vibe.ai-native": { "zh-TW": "AI 原生", en: "AI-native" },
  "vibe.high-attention": { "zh-TW": "高關注", en: "High attention" },
  "vibe.established": { "zh-TW": "成熟穩定", en: "Established" },
  "vibe.under-radar": { "zh-TW": "低調潛力", en: "Under the radar" },
  "vibe.dormant": { "zh-TW": "休眠中", en: "Dormant" },
  "vibe.brand-sensitive": { "zh-TW": "品牌敏感", en: "Brand-sensitive" },
  "vibe.aging-influential": { "zh-TW": "資深影響力", en: "Aging but influential" },

  // 404
  "notFound.title": { "zh-TW": "找不到頁面", en: "Page not found" },
  "notFound.back": { "zh-TW": "返回首頁", en: "Return to Home" },

  // Common
  "common.view": { "zh-TW": "查看", en: "View" },
  "common.notFound": { "zh-TW": "找不到", en: "Not Found" },
} as const;

export type TranslationKey = keyof typeof translations;
