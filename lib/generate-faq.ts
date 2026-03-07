import type { WhoisData, DNSData } from '@/types/domain';
import type { FAQItem, DomainFAQContext, SupportedLocale } from '@/types/faq';

// ─── FAQ templates per locale ────────────────────────────────────────────────

type TemplateVars = {
  domain: string;
  tld: string;
  registrar: string;
  expiryDate: string;
  createDate: string;
  domainAgeYears: number;
  registrantCountry: string;
  nameServerList: string;
  nameServerExplanation: string;
  mxProvider: string;
  mxExplanation: string;
  lockExplanation: string;
  serverLockNote: string;
  tldType: string;
  daysUntilExpiry: number;
};

type FAQTemplate = {
  category: FAQItem['category'];
  tags: string[];
  priority: number;
  q: (v: TemplateVars) => string;
  a: (v: TemplateVars) => string;
};

const templates: Record<string, Record<SupportedLocale, FAQTemplate>> = {
  'who-owns': {
    en: {
      category: 'basic', tags: ['registrar', 'owner'], priority: 1,
      q: v => `Who owns ${v.domain}?`,
      a: v => `${v.domain} is registered through ${v.registrar}. The domain was created on ${v.createDate} and is set to expire on ${v.expiryDate}. The registrant is located in ${v.registrantCountry || 'an undisclosed location'}.`,
    },
    'zh-TW': {
      category: 'basic', tags: ['regist商', '擁有者'], priority: 1,
      q: v => `${v.domain} 是誰擁有的？`,
      a: v => `${v.domain} 透過 ${v.registrar} 註冊。此域名於 ${v.createDate} 建立，到期日為 ${v.expiryDate}。域名持有者位於 ${v.registrantCountry || '未公開地區'}。`,
    },
    es: {
      category: 'basic', tags: ['registrador', 'propietario'], priority: 1,
      q: v => `¿Quién es el propietario de ${v.domain}?`,
      a: v => `${v.domain} está registrado a través de ${v.registrar}. El dominio fue creado el ${v.createDate} y expira el ${v.expiryDate}. El titular del dominio está ubicado en ${v.registrantCountry || 'una ubicación no divulgada'}.`,
    },
    fr: {
      category: 'basic', tags: ['registraire', 'propriétaire'], priority: 1,
      q: v => `Qui possède ${v.domain} ?`,
      a: v => `${v.domain} est enregistré auprès de ${v.registrar}. Le domaine a été créé le ${v.createDate} et expire le ${v.expiryDate}. Le titulaire du domaine est situé à ${v.registrantCountry || 'un emplacement non divulgué'}.`,
    },
  },
  'expiry-date': {
    en: {
      category: 'basic', tags: ['expiry', 'renewal'], priority: 2,
      q: v => `When does ${v.domain} expire?`,
      a: v => v.daysUntilExpiry < 999
        ? `${v.domain} is set to expire on ${v.expiryDate}, which is ${v.daysUntilExpiry} days from now. Domains are typically renewed annually or for multi-year periods. Failure to renew before expiry may result in the domain becoming available for others to register.`
        : `${v.domain} is registered with ${v.registrar}. The expiry date could not be determined from available WHOIS data. Check the registrar's control panel for exact renewal dates.`,
    },
    'zh-TW': {
      category: 'basic', tags: ['到期', '續費'], priority: 2,
      q: v => `${v.domain} 什麼時候到期？`,
      a: v => v.daysUntilExpiry < 999
        ? `${v.domain} 預計於 ${v.expiryDate} 到期，距今還有 ${v.daysUntilExpiry} 天。域名通常每年或多年續費一次。若未在到期前續費，域名可能開放給他人註冊。`
        : `${v.domain} 已向 ${v.registrar} 註冊。目前無法從 WHOIS 資料確定確切到期日，請至該域名的控制台查詢。`,
    },
    es: {
      category: 'basic', tags: ['vencimiento', 'renovación'], priority: 2,
      q: v => `¿Cuándo vence ${v.domain}?`,
      a: v => v.daysUntilExpiry < 999
        ? `${v.domain} vence el ${v.expiryDate}, lo que equivale a ${v.daysUntilExpiry} días a partir de ahora. Los dominios generalmente se renuevan anualmente. Si no se renueva antes del vencimiento, el dominio podría quedar disponible para otros.`
        : `${v.domain} está registrado con ${v.registrar}. La fecha de vencimiento no pudo determinarse. Consulte el panel de control del registrador.`,
    },
    fr: {
      category: 'basic', tags: ['expiration', 'renouvellement'], priority: 2,
      q: v => `Quand expire ${v.domain} ?`,
      a: v => v.daysUntilExpiry < 999
        ? `${v.domain} expire le ${v.expiryDate}, soit dans ${v.daysUntilExpiry} jours. Les domaines sont généralement renouvelés annuellement. Un non-renouvellement avant l'expiration peut rendre le domaine disponible pour d'autres.`
        : `${v.domain} est enregistré auprès de ${v.registrar}. La date d'expiration n'a pas pu être déterminée. Consultez le panneau de contrôle du registraire.`,
    },
  },
  'nameservers': {
    en: {
      category: 'dns', tags: ['dns', 'nameservers'], priority: 3,
      q: v => `What nameservers does ${v.domain} use?`,
      a: v => `${v.domain} uses the following nameservers: ${v.nameServerList || 'Not available'}. ${v.nameServerExplanation}`,
    },
    'zh-TW': {
      category: 'dns', tags: ['DNS', '名稱伺服器'], priority: 3,
      q: v => `${v.domain} 使用哪些名稱伺服器（Nameservers）？`,
      a: v => `${v.domain} 目前使用以下名稱伺服器：${v.nameServerList || '無資料'}。${v.nameServerExplanation}`,
    },
    es: {
      category: 'dns', tags: ['dns', 'servidores de nombres'], priority: 3,
      q: v => `¿Qué servidores de nombres usa ${v.domain}?`,
      a: v => `${v.domain} utiliza los siguientes servidores de nombres: ${v.nameServerList || 'No disponible'}. ${v.nameServerExplanation}`,
    },
    fr: {
      category: 'dns', tags: ['dns', 'serveurs de noms'], priority: 3,
      q: v => `Quels serveurs de noms utilise ${v.domain} ?`,
      a: v => `${v.domain} utilise les serveurs de noms suivants : ${v.nameServerList || 'Non disponible'}. ${v.nameServerExplanation}`,
    },
  },
  'email-provider': {
    en: {
      category: 'dns', tags: ['email', 'mx', 'mail'], priority: 4,
      q: v => `What email service does ${v.domain} use?`,
      a: v => `Based on MX records, ${v.domain} uses ${v.mxProvider} for email. ${v.mxExplanation}`,
    },
    'zh-TW': {
      category: 'dns', tags: ['電子郵件', 'MX', '郵件服務'], priority: 4,
      q: v => `${v.domain} 使用什麼電子郵件服務？`,
      a: v => `根據 MX 記錄，${v.domain} 使用 ${v.mxProvider} 作為郵件服務。${v.mxExplanation}`,
    },
    es: {
      category: 'dns', tags: ['correo', 'mx', 'email'], priority: 4,
      q: v => `¿Qué servicio de correo usa ${v.domain}?`,
      a: v => `Según los registros MX, ${v.domain} usa ${v.mxProvider} para correo electrónico. ${v.mxExplanation}`,
    },
    fr: {
      category: 'dns', tags: ['email', 'mx', 'messagerie'], priority: 4,
      q: v => `Quel service d'e-mail utilise ${v.domain} ?`,
      a: v => `D'après les enregistrements MX, ${v.domain} utilise ${v.mxProvider} pour les e-mails. ${v.mxExplanation}`,
    },
  },
  'domain-locks': {
    en: {
      category: 'security', tags: ['security', 'lock', 'transfer'], priority: 5,
      q: v => `Is ${v.domain} protected against unauthorized transfers?`,
      a: v => `${v.lockExplanation} ${v.serverLockNote}`,
    },
    'zh-TW': {
      category: 'security', tags: ['安全', '鎖定', '轉移'], priority: 5,
      q: v => `${v.domain} 有防止未授權轉移的保護嗎？`,
      a: v => `${v.lockExplanation} ${v.serverLockNote}`,
    },
    es: {
      category: 'security', tags: ['seguridad', 'bloqueo', 'transferencia'], priority: 5,
      q: v => `¿Está ${v.domain} protegido contra transferencias no autorizadas?`,
      a: v => `${v.lockExplanation} ${v.serverLockNote}`,
    },
    fr: {
      category: 'security', tags: ['sécurité', 'verrouillage', 'transfert'], priority: 5,
      q: v => `${v.domain} est-il protégé contre les transferts non autorisés ?`,
      a: v => `${v.lockExplanation} ${v.serverLockNote}`,
    },
  },
  'taiwan-tw-domain': {
    en: {
      category: 'geo', tags: ['taiwan', 'ccTLD', '.tw'], priority: 6,
      q: v => `What is the .tw domain and what does it mean for ${v.domain}?`,
      a: v => `The .tw country code top-level domain (ccTLD) is assigned to Taiwan. ${v.domain} is a .tw domain registered under Taiwan's domain registry (TWNIC). Businesses with .tw domains often target Taiwanese users or emphasize regional trust and credibility.`,
    },
    'zh-TW': {
      category: 'geo', tags: ['台灣', 'ccTLD', '.tw'], priority: 6,
      q: v => `${v.domain} 是台灣的 .tw 域名，這代表什麼？`,
      a: v => `.tw 是台灣的國家代碼頂級域名（ccTLD），由 TWNIC（台灣網路資訊中心）管理。擁有 .tw 域名的網站通常以台灣用戶為目標，或代表在台灣的業務可信度。`,
    },
    es: {
      category: 'geo', tags: ['taiwán', 'ccTLD', '.tw'], priority: 6,
      q: v => `¿Qué significa que ${v.domain} tenga el dominio .tw?`,
      a: v => `.tw es el dominio de nivel superior del código de país (ccTLD) asignado a Taiwán. Los dominios .tw están gestionados por TWNIC y suelen indicar que el sitio web está orientado a usuarios taiwaneses.`,
    },
    fr: {
      category: 'geo', tags: ['taïwan', 'ccTLD', '.tw'], priority: 6,
      q: v => `Que signifie le domaine .tw pour ${v.domain} ?`,
      a: v => `.tw est le domaine de premier niveau de code pays (ccTLD) attribué à Taïwan, géré par TWNIC. Les domaines .tw indiquent généralement que le site cible des utilisateurs taïwanais.`,
    },
  },
  'france-domain': {
    en: {
      category: 'geo', tags: ['france', 'ccTLD', '.fr'], priority: 6,
      q: v => `What is the .fr domain and what does it indicate for ${v.domain}?`,
      a: v => `The .fr country code top-level domain (ccTLD) is reserved for France and is managed by AFNIC. ${v.domain} is a .fr domain, which typically indicates that the website serves a French audience or is operated by a French entity.`,
    },
    'zh-TW': {
      category: 'geo', tags: ['法國', 'ccTLD', '.fr'], priority: 6,
      q: v => `${v.domain} 的 .fr 域名代表什麼？`,
      a: v => `.fr 是法國的國家代碼頂級域名（ccTLD），由 AFNIC 管理。${v.domain} 為 .fr 域名，通常表示該網站面向法國用戶或由法國實體運營。`,
    },
    es: {
      category: 'geo', tags: ['francia', 'ccTLD', '.fr'], priority: 6,
      q: v => `¿Qué indica el dominio .fr para ${v.domain}?`,
      a: v => `.fr es el ccTLD asignado a Francia y está gestionado por AFNIC. Un dominio .fr generalmente indica que el sitio web está orientado a una audiencia francesa.`,
    },
    fr: {
      category: 'geo', tags: ['france', 'ccTLD', '.fr'], priority: 6,
      q: v => `Que signifie le domaine .fr pour ${v.domain} ?`,
      a: v => `.fr est le ccTLD attribué à la France, géré par l'AFNIC. Un domaine .fr indique généralement que le site cible un public français ou est exploité par une entité française.`,
    },
  },
  'latin-america-domain': {
    en: {
      category: 'geo', tags: ['latin america', 'ccTLD', 'es'], priority: 6,
      q: v => `Is ${v.domain} targeting Latin American or Spanish-speaking users?`,
      a: v => `Based on available WHOIS data, ${v.domain} is registered with ${v.registrar} and located in ${v.registrantCountry || 'an undisclosed location'}. Spanish-language websites often target users in Latin America, Spain, or other Spanish-speaking regions.`,
    },
    'zh-TW': {
      category: 'geo', tags: ['拉丁美洲', '西班牙語'], priority: 6,
      q: v => `${v.domain} 是針對拉丁美洲或西班牙語用戶嗎？`,
      a: v => `根據 WHOIS 資料，${v.domain} 透過 ${v.registrar} 註冊，持有人位於 ${v.registrantCountry || '未公開地區'}。西班牙語網站通常面向拉丁美洲、西班牙或其他西班牙語地區的用戶。`,
    },
    es: {
      category: 'geo', tags: ['latinoamérica', 'hispanohablantes'], priority: 6,
      q: v => `¿Está ${v.domain} orientado a usuarios latinoamericanos o hispanohablantes?`,
      a: v => `Según los datos WHOIS, ${v.domain} está registrado con ${v.registrar} y el titular está ubicado en ${v.registrantCountry || 'una ubicación no divulgada'}. Los sitios en español suelen estar orientados a usuarios de América Latina, España u otras regiones hispanohablantes.`,
    },
    fr: {
      category: 'geo', tags: ['amérique latine', 'hispanophone'], priority: 6,
      q: v => `${v.domain} cible-t-il des utilisateurs hispanophones ?`,
      a: v => `Selon les données WHOIS, ${v.domain} est enregistré auprès de ${v.registrar} et le titulaire est situé à ${v.registrantCountry || 'un emplacement non divulgué'}. Les sites en espagnol ciblent généralement les utilisateurs d'Amérique latine ou d'Espagne.`,
    },
  },
  'phishing-check': {
    en: {
      category: 'security', tags: ['phishing', 'scam', 'trust'], priority: 7,
      q: v => `Is ${v.domain} a legitimate website or a phishing risk?`,
      a: v => `${v.domain} was registered ${v.domainAgeYears < 1 ? 'less than a year ago' : `${v.domainAgeYears} years ago`} with ${v.registrar}. Newer domains (especially those under 2 years old) carry a higher statistical risk of being associated with phishing or fraud. We recommend verifying the site's SSL certificate, checking its reputation on tools like VirusTotal, and confirming the domain matches official communication before sharing sensitive data.`,
    },
    'zh-TW': {
      category: 'security', tags: ['釣魚', '詐騙', '信任'], priority: 7,
      q: v => `${v.domain} 是合法網站還是釣魚風險？`,
      a: v => `${v.domain} 於 ${v.domainAgeYears < 1 ? '不到一年前' : `${v.domainAgeYears} 年前`}透過 ${v.registrar} 註冊。較新的域名（特別是不滿 2 年的）統計上與釣魚或詐騙的關聯風險較高。建議在提供個人敏感資料前，確認 SSL 憑證、使用 VirusTotal 查詢聲譽，並確保域名與官方聯繫資訊一致。`,
    },
    es: {
      category: 'security', tags: ['phishing', 'estafa', 'confianza'], priority: 7,
      q: v => `¿Es ${v.domain} un sitio legítimo o un riesgo de phishing?`,
      a: v => `${v.domain} fue registrado hace ${v.domainAgeYears < 1 ? 'menos de un año' : `${v.domainAgeYears} años`} con ${v.registrar}. Los dominios más nuevos (especialmente los de menos de 2 años) tienen estadísticamente mayor riesgo de estar asociados con phishing. Se recomienda verificar el certificado SSL y consultar herramientas como VirusTotal.`,
    },
    fr: {
      category: 'security', tags: ['phishing', 'arnaque', 'confiance'], priority: 7,
      q: v => `${v.domain} est-il un site légitime ou un risque de phishing ?`,
      a: v => `${v.domain} a été enregistré il y a ${v.domainAgeYears < 1 ? 'moins d\'un an' : `${v.domainAgeYears} ans`} auprès de ${v.registrar}. Les domaines récents (moins de 2 ans) présentent statistiquement un risque plus élevé de phishing. Il est recommandé de vérifier le certificat SSL et de consulter des outils comme VirusTotal.`,
    },
  },
  'verify-legitimate': {
    en: {
      category: 'security', tags: ['trust', 'verification', 'age'], priority: 7,
      q: v => `How can I verify that ${v.domain} is a legitimate domain?`,
      a: v => `${v.domain} has been registered for ${v.domainAgeYears} years, which is a positive trust signal — established domains are less likely to be used for fraud. You can further verify legitimacy by checking the SSL certificate, looking up the registrar (${v.registrar}), and cross-referencing WHOIS data with official company information.`,
    },
    'zh-TW': {
      category: 'security', tags: ['信任', '驗證', '網齡'], priority: 7,
      q: v => `如何確認 ${v.domain} 是合法域名？`,
      a: v => `${v.domain} 已註冊 ${v.domainAgeYears} 年，這是正面的信任訊號——網齡越長越不易與詐騙相關。您可進一步確認 SSL 憑證、查看域名註冊商（${v.registrar}），並對照 WHOIS 資料與官方公司資訊是否一致。`,
    },
    es: {
      category: 'security', tags: ['confianza', 'verificación', 'antigüedad'], priority: 7,
      q: v => `¿Cómo verificar que ${v.domain} es un dominio legítimo?`,
      a: v => `${v.domain} lleva ${v.domainAgeYears} años registrado, lo que es una señal positiva de confianza. Puede verificar la legitimidad comprobando el certificado SSL, consultando el registrador (${v.registrar}) y comparando los datos WHOIS con la información oficial de la empresa.`,
    },
    fr: {
      category: 'security', tags: ['confiance', 'vérification', 'ancienneté'], priority: 7,
      q: v => `Comment vérifier que ${v.domain} est un domaine légitime ?`,
      a: v => `${v.domain} est enregistré depuis ${v.domainAgeYears} ans, ce qui est un signal de confiance positif. Vous pouvez vérifier la légitimité en contrôlant le certificat SSL, en consultant le registraire (${v.registrar}) et en comparant les données WHOIS avec les informations officielles.`,
    },
  },
  'privacy-protection': {
    en: {
      category: 'basic', tags: ['privacy', 'whois', 'redaction'], priority: 8,
      q: v => `Why is the registrant contact hidden for ${v.domain}?`,
      a: v => `Many domain registrars offer WHOIS privacy protection (also known as domain privacy or proxy registration), which replaces the registrant's personal details with those of the registrar's proxy service. This is a common practice to protect domain owners from spam and identity exposure. The domain ${v.domain} is registered in ${v.registrantCountry || 'an undisclosed location'}.`,
    },
    'zh-TW': {
      category: 'basic', tags: ['隱私', 'WHOIS', '保護'], priority: 8,
      q: v => `為什麼 ${v.domain} 的域名持有者資訊被隱藏？`,
      a: v => `許多域名註冊商提供 WHOIS 隱私保護服務（也稱為域名隱私或代理註冊），會用代理服務的資訊替換持有人的個人資料。這是保護域名擁有者免受垃圾郵件和身份洩露的常見做法。${v.domain} 的持有人位於 ${v.registrantCountry || '未公開地區'}。`,
    },
    es: {
      category: 'basic', tags: ['privacidad', 'whois', 'protección'], priority: 8,
      q: v => `¿Por qué está oculta la información del titular de ${v.domain}?`,
      a: v => `Muchos registradores ofrecen protección de privacidad WHOIS, que reemplaza los datos personales del titular con los del servicio proxy del registrador. Es una práctica común para proteger a los propietarios del spam y la exposición de identidad. ${v.domain} está registrado en ${v.registrantCountry || 'una ubicación no divulgada'}.`,
    },
    fr: {
      category: 'basic', tags: ['confidentialité', 'whois', 'protection'], priority: 8,
      q: v => `Pourquoi les informations du titulaire de ${v.domain} sont-elles masquées ?`,
      a: v => `De nombreux registraires proposent une protection de la vie privée WHOIS, remplaçant les données personnelles du titulaire par celles du service proxy du registraire. C'est une pratique courante pour protéger les propriétaires de domaine contre le spam. ${v.domain} est enregistré à ${v.registrantCountry || 'un emplacement non divulgué'}.`,
    },
  },
  'track-domain': {
    en: {
      category: 'management', tags: ['monitoring', 'alerts', 'expiry'], priority: 9,
      q: v => `How can I monitor ${v.domain} for changes?`,
      a: v => `You can track ${v.domain} using WhoisVibe's domain monitoring features. Set up alerts for expiry date changes, registrar transfers, nameserver updates, or WHOIS data modifications. Regular monitoring helps detect unauthorized transfers, DNS hijacking, or upcoming expiry that could affect ${v.domain}'s availability.`,
    },
    'zh-TW': {
      category: 'management', tags: ['監控', '警報', '到期'], priority: 9,
      q: v => `如何監控 ${v.domain} 的異動？`,
      a: v => `您可以透過 WhoisVibe 的域名監控功能追蹤 ${v.domain}。設定到期日變更、域名轉移、名稱伺服器更新或 WHOIS 資料修改的警報。定期監控有助於偵測未授權轉移、DNS 劫持或即將到期等情況。`,
    },
    es: {
      category: 'management', tags: ['monitoreo', 'alertas', 'vencimiento'], priority: 9,
      q: v => `¿Cómo puedo monitorear ${v.domain} para detectar cambios?`,
      a: v => `Puede rastrear ${v.domain} usando las funciones de monitoreo de WhoisVibe. Configure alertas para cambios en la fecha de vencimiento, transferencias de registrador, actualizaciones de servidores de nombres o modificaciones de datos WHOIS.`,
    },
    fr: {
      category: 'management', tags: ['surveillance', 'alertes', 'expiration'], priority: 9,
      q: v => `Comment surveiller ${v.domain} pour détecter des changements ?`,
      a: v => `Vous pouvez suivre ${v.domain} grâce aux fonctionnalités de surveillance de WhoisVibe. Configurez des alertes pour les changements de date d'expiration, les transferts de registraire, les mises à jour des serveurs de noms ou les modifications WHOIS.`,
    },
  },
};

// ─── Context builder ──────────────────────────────────────────────────────────

export function buildFAQContext(
  whois: WhoisData | null,
  dns: DNSData | null,
  locale: SupportedLocale,
  domain: string,
): DomainFAQContext {
  const tld = domain.includes('.') ? domain.split('.').slice(1).join('.') : '';
  const registrar = whois?.domain_registrar?.registrar_name ?? 'Unknown Registrar';
  const expiryRaw = whois?.expiry_date ?? '';
  const createRaw = whois?.create_date ?? '';
  const registrantCountry = whois?.registrant_contact?.country_name ?? '';
  const nameServers = whois?.name_servers ?? dns?.nameservers ?? [];
  const domainStatus = whois?.domain_status ?? dns?.domain_status ?? [];

  const mxRecordsRaw = dns?.dnsRecords?.filter(r => r.dnsType === 'MX') ?? [];
  const mxRecords = mxRecordsRaw.map(r => r.target ?? r.singleName ?? '').filter(Boolean);

  let domainAgeYears = 0;
  if (createRaw) {
    const created = new Date(createRaw);
    if (!isNaN(created.getTime())) {
      domainAgeYears = Math.floor((Date.now() - created.getTime()) / (1000 * 60 * 60 * 24 * 365));
    }
  }

  let daysUntilExpiry = 999;
  if (expiryRaw) {
    const expiry = new Date(expiryRaw);
    if (!isNaN(expiry.getTime())) {
      daysUntilExpiry = Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    }
  }

  const mxLower = mxRecords.join(' ').toLowerCase();
  const hasGoogleMX = mxLower.includes('google') || mxLower.includes('gmail');
  const hasMicrosoftMX = mxLower.includes('outlook') || mxLower.includes('microsoft');

  const statusLower = domainStatus.join(' ').toLowerCase();
  const hasServerLock = statusLower.includes('serverdeleteprohibited') || statusLower.includes('servertransferprohibited');
  const hasClientLock = statusLower.includes('clientdeleteprohibited') || statusLower.includes('clienttransferprohibited');

  const expiryDate = expiryRaw
    ? (() => { const d = new Date(expiryRaw); return isNaN(d.getTime()) ? expiryRaw : d.toLocaleDateString('en-CA'); })()
    : 'Unknown';
  const createDate = createRaw
    ? (() => { const d = new Date(createRaw); return isNaN(d.getTime()) ? createRaw : d.toLocaleDateString('en-CA'); })()
    : 'Unknown';

  return {
    domain, tld, registrar, expiryDate, createDate, domainAgeYears,
    registrantCountry, nameServers, mxRecords, domainStatus,
    hasGoogleMX, hasMicrosoftMX, hasServerLock, hasClientLock,
    daysUntilExpiry, locale,
  };
}

// ─── Template variable builder ────────────────────────────────────────────────

function buildTemplateVars(ctx: DomainFAQContext): TemplateVars {
  const locale = ctx.locale;
  const nameServerList = ctx.nameServers.slice(0, 4).join(', ');

  const nsLower = ctx.nameServers.join(' ').toLowerCase();
  let nameServerExplanation = '';
  if (nsLower.includes('awsdns')) {
    const nsMap: Record<SupportedLocale, string> = {
      en: 'These nameservers indicate the domain is using Amazon Route 53 for DNS management.',
      'zh-TW': '這些名稱伺服器表示此域名使用 Amazon Route 53 管理 DNS。',
      es: 'Estos servidores de nombres indican que el dominio usa Amazon Route 53 para la gestión DNS.',
      fr: 'Ces serveurs de noms indiquent que le domaine utilise Amazon Route 53 pour la gestion DNS.',
    };
    nameServerExplanation = nsMap[locale];
  } else if (nsLower.includes('cloudflare')) {
    const nsMap: Record<SupportedLocale, string> = {
      en: 'These nameservers indicate the domain is using Cloudflare for DNS management, which also provides CDN and DDoS protection.',
      'zh-TW': '這些名稱伺服器表示此域名使用 Cloudflare 管理 DNS，同時提供 CDN 和 DDoS 防護。',
      es: 'Estos servidores de nombres indican que el dominio usa Cloudflare para DNS, lo que también proporciona CDN y protección DDoS.',
      fr: 'Ces serveurs de noms indiquent que le domaine utilise Cloudflare pour DNS, offrant également CDN et protection DDoS.',
    };
    nameServerExplanation = nsMap[locale];
  } else if (nsLower.includes('google')) {
    const nsMap: Record<SupportedLocale, string> = {
      en: 'These nameservers indicate the domain is using Google Cloud DNS for DNS management.',
      'zh-TW': '這些名稱伺服器表示此域名使用 Google Cloud DNS 管理 DNS。',
      es: 'Estos servidores de nombres indican que el dominio usa Google Cloud DNS.',
      fr: 'Ces serveurs de noms indiquent que le domaine utilise Google Cloud DNS.',
    };
    nameServerExplanation = nsMap[locale];
  } else if (ctx.nameServers.length > 0) {
    const nsMap: Record<SupportedLocale, string> = {
      en: 'Nameservers control where DNS queries for this domain are directed.',
      'zh-TW': '名稱伺服器控制此域名的 DNS 查詢導向。',
      es: 'Los servidores de nombres controlan hacia dónde se dirigen las consultas DNS del dominio.',
      fr: 'Les serveurs de noms contrôlent la direction des requêtes DNS pour ce domaine.',
    };
    nameServerExplanation = nsMap[locale];
  }

  let mxProvider = '';
  let mxExplanation = '';
  if (ctx.hasGoogleMX) {
    mxProvider = 'Google Workspace (Gmail)';
    const mxMap: Record<SupportedLocale, string> = {
      en: 'Google Workspace provides professional email, calendar, and collaboration tools for businesses.',
      'zh-TW': 'Google Workspace 為企業提供專業電子郵件、日曆和協作工具。',
      es: 'Google Workspace proporciona correo profesional, calendario y herramientas de colaboración para empresas.',
      fr: 'Google Workspace fournit des e-mails professionnels, un agenda et des outils de collaboration pour les entreprises.',
    };
    mxExplanation = mxMap[locale];
  } else if (ctx.hasMicrosoftMX) {
    mxProvider = 'Microsoft 365 (Outlook)';
    const mxMap: Record<SupportedLocale, string> = {
      en: 'Microsoft 365 provides professional email via Exchange Online along with Office suite tools.',
      'zh-TW': 'Microsoft 365 透過 Exchange Online 提供專業電子郵件以及 Office 套件工具。',
      es: 'Microsoft 365 proporciona correo electrónico profesional a través de Exchange Online junto con las herramientas de Office.',
      fr: 'Microsoft 365 fournit des e-mails professionnels via Exchange Online ainsi que les outils Office.',
    };
    mxExplanation = mxMap[locale];
  } else if (ctx.mxRecords.length > 0) {
    mxProvider = ctx.mxRecords[0];
    const mxMap: Record<SupportedLocale, string> = {
      en: 'This indicates a custom or self-hosted email setup.',
      'zh-TW': '這表示使用自訂或自架郵件服務。',
      es: 'Esto indica una configuración de correo personalizada o autohospedada.',
      fr: 'Cela indique une configuration e-mail personnalisée ou auto-hébergée.',
    };
    mxExplanation = mxMap[locale];
  }

  let lockExplanation = '';
  let serverLockNote = '';
  if (ctx.hasServerLock && ctx.hasClientLock) {
    const lMap: Record<SupportedLocale, string> = {
      en: `${ctx.domain} has both server-level and client-level locks applied, providing strong protection against unauthorized transfers or deletions.`,
      'zh-TW': `${ctx.domain} 同時啟用了伺服器層級和用戶端層級的鎖定，可有效防止未授權的轉移或刪除。`,
      es: `${ctx.domain} tiene aplicados bloqueos a nivel de servidor y de cliente, lo que proporciona una sólida protección contra transferencias o eliminaciones no autorizadas.`,
      fr: `${ctx.domain} dispose de verrous au niveau serveur et au niveau client, offrant une protection solide contre les transferts ou suppressions non autorisés.`,
    };
    lockExplanation = lMap[locale];
    const snMap: Record<SupportedLocale, string> = {
      en: 'Server locks (serverTransferProhibited) can only be removed by the registry, while client locks (clientTransferProhibited) are managed by the registrar.',
      'zh-TW': '伺服器鎖（serverTransferProhibited）只能由域名局解除，而用戶端鎖（clientTransferProhibited）由域名商管理。',
      es: 'Los bloqueos de servidor solo pueden ser eliminados por el registro, mientras que los bloqueos de cliente son gestionados por el registrador.',
      fr: 'Les verrous serveur ne peuvent être levés que par le registre, tandis que les verrous client sont gérés par le registraire.',
    };
    serverLockNote = snMap[locale];
  } else if (ctx.hasServerLock) {
    const lMap: Record<SupportedLocale, string> = {
      en: `${ctx.domain} has a server-level lock (serverTransferProhibited / serverDeleteProhibited) applied by the registry, preventing unauthorized transfers.`,
      'zh-TW': `${ctx.domain} 已由域名局啟用伺服器層級鎖定（serverTransferProhibited / serverDeleteProhibited），防止未授權轉移。`,
      es: `${ctx.domain} tiene un bloqueo a nivel de servidor aplicado por el registro, impidiendo transferencias no autorizadas.`,
      fr: `${ctx.domain} dispose d'un verrou au niveau serveur appliqué par le registre, empêchant les transferts non autorisés.`,
    };
    lockExplanation = lMap[locale];
  } else if (ctx.hasClientLock) {
    const lMap: Record<SupportedLocale, string> = {
      en: `${ctx.domain} has a client-level lock (clientTransferProhibited) that prevents unauthorized transfers. This lock can be lifted by the registrar upon legitimate request.`,
      'zh-TW': `${ctx.domain} 已啟用用戶端層級鎖定（clientTransferProhibited），防止未授權轉移。此鎖定可在合法請求後由域名商解除。`,
      es: `${ctx.domain} tiene un bloqueo a nivel de cliente que impide transferencias no autorizadas. Este bloqueo puede ser levantado por el registrador ante una solicitud legítima.`,
      fr: `${ctx.domain} dispose d'un verrou au niveau client empêchant les transferts non autorisés. Ce verrou peut être levé par le registraire sur demande légitime.`,
    };
    lockExplanation = lMap[locale];
  } else {
    const lMap: Record<SupportedLocale, string> = {
      en: `No transfer locks were detected for ${ctx.domain}. This means the domain could potentially be transferred without additional verification steps. Consider enabling clientTransferProhibited via your registrar.`,
      'zh-TW': `${ctx.domain} 未偵測到轉移鎖定。這表示域名可能在沒有額外驗證的情況下被轉移。建議透過域名商啟用 clientTransferProhibited。`,
      es: `No se detectaron bloqueos de transferencia para ${ctx.domain}. Esto significa que el dominio podría transferirse sin pasos adicionales de verificación. Considere habilitar clientTransferProhibited.`,
      fr: `Aucun verrou de transfert n'a été détecté pour ${ctx.domain}. Cela signifie que le domaine pourrait être transféré sans étapes de vérification supplémentaires. Envisagez d'activer clientTransferProhibited.`,
    };
    lockExplanation = lMap[locale];
  }

  const tldType = ['com', 'net', 'org', 'io', 'co'].includes(ctx.tld.toLowerCase()) ? 'gTLD' : 'ccTLD';

  return {
    domain: ctx.domain,
    tld: ctx.tld,
    registrar: ctx.registrar,
    expiryDate: ctx.expiryDate,
    createDate: ctx.createDate,
    domainAgeYears: ctx.domainAgeYears,
    registrantCountry: ctx.registrantCountry,
    nameServerList,
    nameServerExplanation,
    mxProvider,
    mxExplanation,
    lockExplanation,
    serverLockNote,
    tldType,
    daysUntilExpiry: ctx.daysUntilExpiry,
  };
}

// ─── FAQ ID selector ──────────────────────────────────────────────────────────

function selectFAQIds(ctx: DomainFAQContext): string[] {
  const ids: string[] = ['who-owns', 'expiry-date', 'nameservers'];

  if (ctx.mxRecords.length > 0) ids.push('email-provider');
  if (ctx.hasServerLock || ctx.hasClientLock) ids.push('domain-locks');

  const tldLower = ctx.tld.toLowerCase();
  if ((ctx.locale === 'zh-TW' || ctx.locale === 'en') && tldLower === 'tw') ids.push('taiwan-tw-domain');
  if (ctx.locale === 'fr' && tldLower === 'fr') ids.push('france-domain');
  if (ctx.locale === 'es') ids.push('latin-america-domain');

  if (ctx.domainAgeYears < 5) {
    ids.push('phishing-check');
  } else {
    ids.push('verify-legitimate');
  }

  if (ctx.registrantCountry) ids.push('privacy-protection');
  ids.push('track-domain');

  // Deduplicate and limit to 8
  return [...new Set(ids)].slice(0, 8);
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function generateFAQ(
  whois: WhoisData | null,
  dns: DNSData | null,
  locale: SupportedLocale,
  domain: string,
): FAQItem[] {
  const ctx = buildFAQContext(whois, dns, locale, domain);
  const vars = buildTemplateVars(ctx);
  const ids = selectFAQIds(ctx);

  return ids
    .map((id, index) => {
      const tpl = templates[id]?.[locale] ?? templates[id]?.['en'];
      if (!tpl) return null;
      return {
        id,
        category: tpl.category,
        question: tpl.q(vars),
        answer: tpl.a(vars),
        tags: tpl.tags,
        priority: index + 1,
      } satisfies FAQItem;
    })
    .filter((item): item is FAQItem => item !== null);
}
