import * as lucide from 'lucide-react';
const keys = Object.keys(lucide);
console.log('Github search:', keys.filter(k => k.toLowerCase().includes('github')));
console.log('Facebook search:', keys.filter(k => k.toLowerCase().includes('facebook')));
console.log('Slack search:', keys.filter(k => k.toLowerCase().includes('slack')));
