import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      appName: "CreatorBharat",
      welcome: "Welcome to CreatorBharat",
      tagline: "Connecting Brands with Authentic Local Creators",
      heroBadge: "India's First 3-Sided Creator SaaS",
      heroSubtitle: "Direct connections, escrow-backed campaigns, and zero agency markups. Built for the next generation of regional creators and startups across Bharat.",
      btnFindCreators: "Find Verified Creators",
      btnFindCreatorsMobile: "Hire Talent",
      btnBrandRegister: "Register as Brand",
      btnCreatorApply: "Apply as Creator",
      btnCreatorApplyMobile: "Join as Creator",
      btnDownloadMediaKit: "Download PDF Media Kit",
      btnBookCollab: "Book Direct Collaboration",
      followers: "Followers",
      engagement: "Engagement",
      rateRange: "Rate Range",
      niche: "Niche/Category",
      platforms: "Platforms",
      location: "Location",
      status: "Status",
      verified: "Verified",
      unverified: "Pending Verification",
      tabs: {
        all: "All Creators",
        travel: "Travel",
        tech: "Tech",
        beauty: "Beauty",
        fashion: "Fashion"
      },
      nav: {
        home: "Home",
        creators: "Explore Creators",
        campaigns: "Campaigns",
        pricing: "Pricing",
        contact: "Contact",
        dashboard: "Dashboard",
        signIn: "Sign In",
        signOut: "Sign Out"
      }
    }
  },
  hi: {
    translation: {
      appName: "क्रिएटरभारत",
      welcome: "क्रिएटर भारत में आपका स्वागत है",
      tagline: "ब्रैंड्स को जोड़ें सीधे भारत के स्थानीय क्रिएटरों से",
      heroBadge: "भारत का पहला 3-सिटेड क्रिएटर SaaS",
      heroSubtitle: "सीधा संपर्क, एस्क्रो-सुरक्षित पेमेंट्स, और बिना किसी बिचौलिए की फीस। भारत के क्षेत्रीय क्रिएटरों और स्टार्टअप्स के लिए विशेष रूप से निर्मित।",
      btnFindCreators: "सत्यापित क्रिएटर खोजें",
      btnFindCreatorsMobile: "क्रिएटर खोजें",
      btnBrandRegister: "ब्रैंड पंजीकरण करें",
      btnCreatorApply: "क्रिएटर आवेदन करें",
      btnCreatorApplyMobile: "क्रिएटर बनें",
      btnDownloadMediaKit: "मीडिया किट डाउनलोड करें",
      btnBookCollab: "सीधा सहयोग बुक करें",
      followers: "फॉलोअर्स",
      engagement: "जुड़ाव दर",
      rateRange: "बजट सीमा",
      niche: "श्रेणी/निश",
      platforms: "प्लेटफ़ॉर्म",
      location: "स्थान",
      status: "स्थिति",
      verified: "सत्यापित",
      unverified: "सत्यापन लंबित",
      tabs: {
        all: "सभी क्रिएटर",
        travel: "यात्रा",
        tech: "तकनीक",
        beauty: "सौंदर्य",
        fashion: "फैशन"
      },
      nav: {
        home: "होम",
        creators: "क्रिएटर खोजें",
        campaigns: "अभियान (कैंपेन)",
        pricing: "कीमतें",
        contact: "संपर्क करें",
        dashboard: "डैशबोर्ड",
        signIn: "लॉग इन",
        signOut: "लॉग आउट"
      }
    }
  },
  rj: {
    translation: {
      appName: "क्रिएटरभारत",
      welcome: "खम्मा घणी सा! क्रिएटर भारत में आपरो घणो स्वागत है",
      tagline: "ब्रैंड्स ने जोड़ो सीधा माटी से जुड़े क्रिएटरों सागे",
      heroBadge: "भारत रो पहेलो 3-सिटेड क्रिएटर SaaS",
      heroSubtitle: "सीधो संपर्क, एस्क्रो-सुरक्षित भुगतान, और बिना कोई एजेंसी कमिशन। राजस्थान और पूरे भारत रा लोकल क्रिएटरों व स्टार्टअप्स री सेवा में हाजिर।",
      btnFindCreators: "सत्यापित क्रिएटर ढूंढो सा",
      btnFindCreatorsMobile: "क्रिएटर ढूंढो",
      btnBrandRegister: "ब्रैंड खाता बणाओ सा",
      btnCreatorApply: "क्रिएटर आवेदन करो सा",
      btnCreatorApplyMobile: "क्रिएटर बणो",
      btnDownloadMediaKit: "मीडिया किट डाउनलोड करो सा",
      btnBookCollab: "सीधा संपर्क करो सा",
      followers: "प्रशंसक (फॉलोअर्स)",
      engagement: "जुड़ाव (एंगेजमेंट)",
      rateRange: "रेट सीमा (INR)",
      niche: "निश (श्रेणी)",
      platforms: "प्लेटफ़ॉर्म",
      location: "ठिकाणो (स्थान)",
      status: "स्थिति",
      verified: "सत्यापित सा",
      unverified: "सत्यापन बाक़ी",
      tabs: {
        all: "सगळा क्रिएटर",
        travel: "घूमणो (ट्रैवल)",
        tech: "तकनीक (टेक)",
        beauty: "सौंदर्य (ब्यूटी)",
        fashion: "पोशाक (फैशन)"
      },
      nav: {
        home: "होम",
        creators: "क्रिएटर ढूंढो",
        campaigns: "कैंपेन",
        pricing: "रेट सूची",
        contact: "राम-राम करो (संपर्क)",
        dashboard: "डैशबोर्ड",
        signIn: "खाता खोलो (लॉग इन)",
        signOut: "बंद करो (लॉग आउट)"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
