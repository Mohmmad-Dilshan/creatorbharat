/**
 * seedData.js
 * 
 * High-quality fallback data for the platform when the API is unavailable.
 * Ensures the 'Elite' aesthetics are maintained even during backend downtime.
 */

export const SEED_CREATORS = [
  { id: 's1', name: 'Aman Deep', handle: 'amandeep', followers: 125000, niche: ['Tech', 'Lifestyle'], city: 'Mumbai', state: 'Maharashtra', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' },
  { id: 's2', name: 'Priya Sharma', handle: 'priya_vlogs', followers: 85000, niche: ['Travel', 'Fashion'], city: 'Delhi', state: 'Delhi', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200' },
  { id: 's3', name: 'Rohan Mehta', handle: 'rohanfit', followers: 210000, niche: ['Fitness', 'Health'], city: 'Bangalore', state: 'Karnataka', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200' },
  { id: 's4', name: 'Sanya Gupta', handle: 'sanya_cooks', followers: 45000, niche: ['Food', 'Culture'], city: 'Jaipur', state: 'Rajasthan', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200' },
  { id: 's5', name: 'Vikram Singh', handle: 'vik_tech', followers: 320000, niche: ['Tech', 'Gaming'], city: 'Hyderabad', state: 'Telangana', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200' }
];

export const SEED_CAMPAIGNS = [
  { id: 'c1', title: 'Summer Collection Launch', brand: 'Nykaa', budget: 500000, targetCity: 'Mumbai', status: 'active' },
  { id: 'c2', title: 'Tech Review Series', brand: 'Samsung', budget: 1200000, targetCity: 'Bangalore', status: 'active' },
  { id: 'c3', title: 'Fitness Challenge 2024', brand: 'Cult.fit', budget: 300000, targetCity: 'Delhi', status: 'completed' }
];
