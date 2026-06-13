import { BarChart3, ShieldAlert, Rocket, Mail, MessageCircle, Building2 } from 'lucide-react';
import { LinkedinIcon } from '@/components/icons/SocialIcons';

const ICON_MAP = {
  BarChart3,
  ShieldAlert,
  Rocket,
  Mail,
  LinkedinIcon,
  MessageCircle,
  Building2
};

export const ADVANTAGES = [
  {
    icon: BarChart3,
    iconName: 'BarChart3',
    title: "Real-Time Campaign Tracking",
    desc: "Monitor impressions, click-through rates, and conversion metrics as they happen. Our live telemetry dashboard keeps your ROI transparent.",
    delay: 0.1
  },
  {
    icon: ShieldAlert,
    iconName: 'ShieldAlert',
    title: "Elite Score Audits",
    desc: "Our proprietary AI auditor evaluates engagement patterns, comment-to-like ratios, and follower demographics to filter out fake reach.",
    delay: 0.2
  },
  {
    icon: Rocket,
    iconName: 'Rocket',
    title: "Secured Escrow Payments",
    desc: "Campaign budgets are pre-verified and escrowed securely. Payouts are released automatically upon delivery, ensuring complete trust.",
    delay: 0.3
  }
];

export const REGIONAL_HUBS = [
  { city: 'Bhilwara', type: 'Global HQ', focus: 'Ecosystem Strategy & Core Ops', state: 'Rajasthan' },
  { city: 'Jaipur', type: 'AI Tech Labs', focus: 'Elite Score & Data Analytics', state: 'Rajasthan' },
  { city: 'Bangalore', type: 'Relations Hub', focus: 'Brand Integrations & Partnerships', state: 'Karnataka' }
];

export const CONTACT_METHODS = [
  { icon: Mail, iconName: 'Mail', title: "Support Inbox", value: "support@creatorbharat.com", sub: "Quick resolutions 24/7", delay: 0.1, link: "mailto:support@creatorbharat.com" },
  { icon: LinkedinIcon, iconName: 'LinkedinIcon', title: "Brand Partnerships", value: "solutions@creatorbharat.com", sub: "Direct channel for agencies", delay: 0.2, link: "mailto:solutions@creatorbharat.com" },
  { icon: MessageCircle, iconName: 'MessageCircle', title: "WhatsApp Concierge", value: "+91 9999-000000", sub: "Mon-Fri, 10am to 7pm", delay: 0.3, link: "https://wa.me/919999000000?text=Hi%20CreatorBharat%20Team," },
  { icon: Building2, iconName: 'Building2', title: "The Bharat HQ", value: "Bhilwara, Rajasthan", sub: "311001, India", delay: 0.4, link: "https://maps.google.com/?q=Bhilwara,Rajasthan" }
];

export const CONTACT_FAQS = [
  {
    q: "How long does support take to respond?",
    a: "Our Concierge Support typically responds within 2 to 4 hours for Pro creators and brand partners, and within 24 hours for basic members."
  },
  {
    q: "Can I schedule a voice or video call with the team?",
    a: "Yes! Brand partners on our Enterprise or Pro plans can schedule direct discovery calls. Creators can request a call if their query is escalated by our concierge inbox."
  },
  {
    q: "Where is CreatorBharat based, and can I visit your office?",
    a: "Our global headquarters is in Bhilwara, Rajasthan, with tech labs in Jaipur and relations hubs in Bangalore. Visits are by appointment only to ensure privacy for visiting creators."
  },
  {
    q: "Is there a fee to contact support or register?",
    a: "No. Registration on CreatorBharat and using our Concierge Helpdesk is 100% free for all creators and basic brand accounts."
  },
  {
    q: "What information should I include in my support message?",
    a: "For verification or score issues, please include your social handles and registered email. For brands, sharing your website link and target campaign budget helps us expedite support."
  }
];

export const getContactData = () => {
  const local = localStorage.getItem('cb_contact_data');
  if (local) {
    try {
      const parsed = JSON.parse(local);
      parsed.advantages = parsed.advantages.map(adv => ({
        ...adv,
        icon: ICON_MAP[adv.iconName] || Mail
      }));
      parsed.contactMethods = parsed.contactMethods.map(method => ({
        ...method,
        icon: ICON_MAP[method.iconName] || Mail
      }));
      if (!parsed.faqs) parsed.faqs = CONTACT_FAQS;
      return parsed;
    } catch (e) {
      console.error('Failed to parse contact data from localStorage:', e);
    }
  }
  return {
    advantages: ADVANTAGES,
    regionalHubs: REGIONAL_HUBS,
    contactMethods: CONTACT_METHODS,
    faqs: CONTACT_FAQS
  };
};

export const saveContactData = (data) => {
  const serializable = {
    advantages: data.advantages.map(adv => ({
      iconName: adv.iconName || 'Mail',
      title: adv.title,
      desc: adv.desc,
      delay: adv.delay
    })),
    regionalHubs: data.regionalHubs,
    contactMethods: data.contactMethods.map(method => ({
      iconName: method.iconName || 'Mail',
      title: method.title,
      value: method.value,
      sub: method.sub,
      delay: method.delay,
      link: method.link
    })),
    faqs: data.faqs
  };
  localStorage.setItem('cb_contact_data', JSON.stringify(serializable));
};
