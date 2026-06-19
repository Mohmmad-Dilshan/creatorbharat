import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, Clock, CheckCircle2, AlertCircle, ChevronLeft, 
  ChevronRight, Sparkles, BookOpen, MapPin, BadgeHelp, CheckSquare, ListTodo, ShieldAlert
} from 'lucide-react';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';
import { Card, Bdg, Empty } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const T = {
  saffron: '#FF9431',
  emerald: '#10B981',
  violet: '#7C3AED',
  blue: '#3B82F6',
  navy: '#0F172A',
  slate: '#64748B',
  bg: '#F8FAFC',
  border: '#F1F5F9'
};

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

export default function CalendarPage() {
  const { st } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());

  useEffect(() => {
    const h = () => setMob(globalThis.innerWidth < 768);
    globalThis.addEventListener('resize', h);
    return () => globalThis.removeEventListener('resize', h);
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();
  const days = getMonthDays(year, month);

  // Get applications from localStorage
  const myApps = LS.get('cb_applications', []).filter(a => a.applicantEmail === st.user?.email);

  // Generate mock deliverables scheduled across the current month
  const deliverables = useMemo(() => {
    const list = [];
    myApps.forEach((app, index) => {
      const baseDay = 5 + (index * 7) % 20;
      
      // Event 1: Draft Submission (Saffron)
      list.push({
        id: `ev-draft-${app.id}`,
        day: baseDay,
        type: 'draft',
        label: 'Video Draft Submission',
        campaign: app.campaignTitle || 'Campaign Deliverable',
        brand: app.brand || 'Brand Partner',
        desc: 'Submit initial 60s Reel draft to brand for editorial check.',
        status: 'pending',
        color: T.saffron
      });

      // Event 2: Scheduled Post (Violet)
      list.push({
        id: `ev-post-${app.id}`,
        day: baseDay + 3,
        type: 'post',
        label: 'Reel Posting Window',
        campaign: app.campaignTitle || 'Campaign Deliverable',
        brand: app.brand || 'Brand Partner',
        desc: 'Publish approved video on Instagram. Tag official handles.',
        status: 'pending',
        color: T.violet
      });

      // Event 3: Escrow Payment Settlement (Emerald)
      list.push({
        id: `ev-pay-${app.id}`,
        day: baseDay + 6,
        type: 'payment',
        label: 'Escrow Payout Settlement',
        campaign: app.campaignTitle || 'Campaign Deliverable',
        brand: app.brand || 'Brand Partner',
        desc: 'Razorpay Escrow payment release after posting confirmation.',
        status: app.status === 'selected' ? 'released' : 'pending',
        color: T.emerald
      });
    });
    
    // Add default events if no active applications
    if (list.length === 0) {
      list.push({
        id: 'ev-default-1',
        day: 12,
        type: 'draft',
        label: 'Submit First Portfolio Draft',
        campaign: 'Platform Vetting Profile',
        brand: 'CreatorBharat Editorial',
        desc: 'Complete profile chapters and add 3 gallery posts.',
        status: 'completed',
        color: T.saffron
      });
      list.push({
        id: 'ev-default-2',
        day: 15,
        type: 'payment',
        label: 'Pioneer Fee Waiver Expiry',
        campaign: 'Elite Verification Desk',
        brand: 'CreatorBharat Admin',
        desc: 'Submit verification before pioneer batch is full.',
        status: 'pending',
        color: T.emerald
      });
    }

    return list;
  }, [myApps]);

  const activeEventsForDay = useMemo(() => {
    return deliverables.filter(d => d.day === selectedDay);
  }, [deliverables, selectedDay]);

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(1);
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(1);
  };

  return (
    <div className="dashboard-page-container" style={{ paddingBottom: '100px' }}>
      <CreatorPageHeader 
        badge="CONTENT SCHEDULE" 
        title="Creator Calendar" 
        subtitle="Manage sponsored posts, script drafts, review sessions, and escrow milestones." 
        icon={CalendarDays} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1.35fr 1fr', gap: 32, alignItems: 'start' }}>
        
        {/* Left Panel: Calendar Grid */}
        <Card style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <button onClick={prevMonth} style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: 12, width: 40, height: 40, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <ChevronLeft size={20} color={T.slate} />
            </button>
            <h3 style={{ fontSize: 18, fontWeight: 950, color: T.navy, fontFamily: 'Outfit', margin: 0 }}>
              {MONTHS[month]} {year}
            </h3>
            <button onClick={nextMonth} style={{ background: '#F8FAFC', border: '1px solid #F1F5F9', borderRadius: 12, width: 40, height: 40, display: 'grid', placeItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
              <ChevronRight size={20} color={T.slate} />
            </button>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 12 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 900, color: T.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day Grid cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const isSelected = day === selectedDay;
              
              const dayEvents = deliverables.filter(d => d.day === day);
              const hasEvents = dayEvents.length > 0;

              return (
                <motion.div
                  key={`day-${day}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedDay(day)}
                  style={{
                    textAlign: 'center',
                    padding: '14px 4px',
                    borderRadius: 16,
                    fontSize: 14,
                    fontWeight: isToday || isSelected ? 950 : 700,
                    color: isSelected ? '#ffffff' : isToday ? T.saffron : T.navy,
                    background: isSelected 
                      ? 'linear-gradient(135deg, #FF9431, #EA580C)'
                      : isToday 
                      ? 'rgba(255,148,49,0.08)' 
                      : 'rgba(255,255,255,0.7)',
                    border: isSelected 
                      ? 'none' 
                      : isToday 
                      ? `1.5px solid ${T.saffron}40` 
                      : '1.5px solid #F1F5F9',
                    boxShadow: isSelected ? '0 10px 20px rgba(255,148,49,0.3)' : 'none',
                    position: 'relative',
                    cursor: 'pointer',
                    minHeight: 56,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background-color 0.2s, color 0.2s'
                  }}
                >
                  <span style={{ fontSize: 15 }}>{day}</span>
                  
                  {/* Event indicator dots */}
                  {hasEvents && (
                    <div style={{ display: 'flex', gap: 3, marginTop: 4, justifyContent: 'center' }}>
                      {dayEvents.slice(0, 3).map((ev, idx) => (
                        <div 
                          key={idx} 
                          style={{ 
                            width: 5, 
                            height: 5, 
                            borderRadius: '50%', 
                            background: isSelected ? '#ffffff' : ev.color,
                            opacity: isSelected ? 0.9 : 1
                          }} 
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Color Legend keys */}
          <div style={{ display: 'flex', gap: 16, marginTop: 24, paddingTop: 20, borderTop: '1.5px solid #F1F5F9', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: T.slate, textTransform: 'uppercase' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: T.saffron }} /> Draft Submission
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: T.slate, textTransform: 'uppercase' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: T.violet }} /> Posting Window
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 800, color: T.slate, textTransform: 'uppercase' }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: T.emerald }} /> Escrow Released
            </div>
          </div>
        </Card>

        {/* Right Panel: Day Details & Milestones Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          
          {/* Day Activities Sidebar */}
          <Card style={{ padding: 28, background: '#ffffff', border: '1.5px solid #F1F5F9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1.5px solid #F1F5F9', paddingBottom: 14 }}>
              <div>
                <h4 style={{ fontSize: 11, fontWeight: 900, color: T.slate, textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 2px' }}>
                  Schedule Details
                </h4>
                <h3 style={{ fontSize: 18, fontWeight: 950, color: T.navy, fontFamily: 'Outfit, sans-serif', margin: 0 }}>
                  {selectedDay} {MONTHS[month]}
                </h3>
              </div>
              <Bdg color="saffron" sm>{activeEventsForDay.length} Events</Bdg>
            </div>

            <AnimatePresence mode="wait">
              {activeEventsForDay.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: 'center', padding: '36px 12px' }}
                >
                  <div style={{ fontSize: 36, marginBottom: 12 }}>🧘</div>
                  <h5 style={{ fontSize: 14, fontWeight: 850, color: T.navy, margin: '0 0 4px' }}>Clear day!</h5>
                  <p style={{ fontSize: 12, color: T.slate, fontWeight: 500, margin: 0 }}>No deliverables or payout settlements scheduled for this date.</p>
                </motion.div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {activeEventsForDay.map(ev => (
                    <motion.div
                      key={ev.id}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      style={{
                        padding: 16,
                        borderRadius: 16,
                        background: 'linear-gradient(135deg, #F8FAFC 0%, #FFFFFF 100%)',
                        borderLeft: `4px solid ${ev.color}`,
                        borderTop: '1px solid #F1F5F9',
                        borderRight: '1px solid #F1F5F9',
                        borderBottom: '1px solid #F1F5F9',
                        boxShadow: '0 4px 12px rgba(15,23,42,0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 950, color: ev.color, textTransform: 'uppercase', letterSpacing: '1px' }}>
                          {ev.type}
                        </span>
                        <Bdg sm color={ev.status === 'completed' || ev.status === 'released' ? 'green' : 'blue'}>
                          {ev.status}
                        </Bdg>
                      </div>
                      <h4 style={{ fontSize: 14, fontWeight: 900, color: T.navy, margin: '0 0 4px' }}>{ev.label}</h4>
                      <p style={{ fontSize: 12, fontWeight: 700, color: T.slate, margin: '0 0 8px' }}>
                        💼 {ev.brand} · {ev.campaign}
                      </p>
                      <p style={{ fontSize: 12, color: T.slate, fontWeight: 500, lineHeight: 1.5, margin: 0 }}>
                        {ev.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </Card>

          {/* Quick List Checklist widget */}
          <Card style={{ padding: 28 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              <ListTodo size={18} color={T.saffron} />
              <h4 style={{ fontSize: 14, fontWeight: 900, color: T.navy, margin: 0 }}>Upcoming Milestones</h4>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Video draft upload for campaign brief', done: false },
                { label: 'Verify social audience demographic tags', done: true },
                { label: 'Release and link bank details on wallet desk', done: true }
              ].map((todo, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ color: todo.done ? T.emerald : T.slateLight }}>
                    {todo.done ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                  </div>
                  <span style={{ fontSize: 13, color: todo.done ? T.slate : T.navy, textDecoration: todo.done ? 'line-through' : 'none', fontWeight: 600 }}>
                    {todo.label}
                  </span>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
