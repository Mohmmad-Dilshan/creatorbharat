import { Mail, MessageCircle, Building2 } from 'lucide-react';
import { LinkedinIcon } from '../components/icons/SocialIcons';

export const contactChannels = [
  { 
    id: 'direct',
    icon: Mail, 
    title: "Direct Support", 
    value: "support@creatorbharat.in", 
    sub: "Median response time: 4 hours", 
    delay: 0.1 
  },
  { 
    id: 'brand',
    icon: LinkedinIcon, 
    title: "Brand Solutions", 
    value: "solutions@creatorbharat.in", 
    sub: "For agency and large brand queries", 
    delay: 0.2 
  },
  { 
    id: 'whatsapp',
    icon: MessageCircle, 
    title: "Quick Chat", 
    value: "+91 9999-000000", 
    sub: "WhatsApp Support (Mon-Fri, 10am-7pm)", 
    delay: 0.3 
  },
  { 
    id: 'hq',
    icon: Building2, 
    title: "Headquarters", 
    value: "Bhilwara, Rajasthan", 
    sub: "The heart and soul of Bharat's creation", 
    delay: 0.4 
  }
];
