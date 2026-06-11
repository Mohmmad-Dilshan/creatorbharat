import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, Clock, Send, CheckCircle2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '@/core/context';
import { LS, fmt } from '@/utils/helpers';
import { Card, Bdg, Empty } from '@/components/common/Primitives';
import { CreatorPageHeader } from './CreatorShellPage';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

const DeadlineCard = ({ app, delay = 0 }) => {
  const isOverdue = new Date(app.date) < new Date();
  const statusColor = app.status === 'selected' ? '#10B981' : app.status === 'shortlisted' ? '#7C3AED' : '#3B82F6';
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20, background: '#fff', borderRadius: 20, border: '1px solid #f1f5f9', marginBottom: 12 }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 14, background: statusColor + '12', color: statusColor, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        {app.status === 'selected' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 800, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {app.campaignTitle || 'Campaign'}
        </div>
        <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginTop: 2 }}>
          {app.brand || 'Brand'} · Applied {fmt.date(app.date)}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <Bdg sm color={app.status === 'selected' ? 'green' : app.status === 'shortlisted' ? 'purple' : 'blue'}>
          {(app.status || 'applied').toUpperCase()}
        </Bdg>
        {isOverdue && (
          <div style={{ fontSize: 10, color: '#EF4444', fontWeight: 800, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
            <AlertCircle size={10} /> Overdue
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function CalendarPage() {
  const { st } = useApp();
  const [mob, setMob] = useState(globalThis.innerWidth < 768);
  const [currentDate, setCurrentDate] = useState(new Date());

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
  
  // Get dates that have deadlines (7 days after application date)
  const deadlineDates = useMemo(() => {
    const dates = new Set();
    myApps.forEach(app => {
      if (app.date) {
        const deadline = new Date(app.date);
        deadline.setDate(deadline.getDate() + 7);
        if (deadline.getMonth() === month && deadline.getFullYear() === year) {
          dates.add(deadline.getDate());
        }
      }
    });
    return dates;
  }, [myApps, month, year]);

  // Upcoming deadlines (sorted by date)
  const upcoming = useMemo(() => {
    return [...myApps]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [myApps]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="dashboard-page-container">
      <CreatorPageHeader 
        badge="CONTENT CALENDAR" 
        title="Deadlines & Deliverables" 
        subtitle="Campaign dates, draft submissions, posting windows, and payout milestones." 
        icon={CalendarDays} 
      />

      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1.2fr', gap: 24 }}>
        
        {/* Calendar Grid */}
        <Card style={{ padding: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <button onClick={prevMonth} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 10, width: 36, height: 36, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <ChevronLeft size={18} color="#64748b" />
            </button>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>{MONTHS[month]} {year}</h3>
            <button onClick={nextMonth} style={{ background: '#f8fafc', border: '1px solid #f1f5f9', borderRadius: 10, width: 36, height: 36, display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
              <ChevronRight size={18} color="#64748b" />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
            {DAYS.map(d => (
              <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#94a3b8', padding: '8px 0' }}>{d}</div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />;
              const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
              const hasDeadline = deadlineDates.has(day);
              
              return (
                <div 
                  key={`day-${day}`}
                  style={{ 
                    textAlign: 'center', 
                    padding: '10px 4px', 
                    borderRadius: 12,
                    fontSize: 14, 
                    fontWeight: isToday ? 900 : 600,
                    color: isToday ? '#fff' : '#0f172a',
                    background: isToday ? '#FF9431' : hasDeadline ? '#FF943112' : 'transparent',
                    border: hasDeadline && !isToday ? '1.5px solid #FF943140' : '1.5px solid transparent',
                    position: 'relative',
                    cursor: hasDeadline ? 'pointer' : 'default'
                  }}
                >
                  {day}
                  {hasDeadline && (
                    <div style={{ position: 'absolute', bottom: 3, left: '50%', transform: 'translateX(-50%)', width: 5, height: 5, borderRadius: '50%', background: '#FF9431' }} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 16, marginTop: 20, paddingTop: 16, borderTop: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#64748b' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF9431' }} /> Today
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 700, color: '#64748b' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', border: '2px solid #FF9431' }} /> Deadline
            </div>
          </div>
        </Card>

        {/* Upcoming Deadlines List */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>Active Campaigns</h3>
            <Bdg color="saffron" sm>{myApps.length} total</Bdg>
          </div>

          {upcoming.length === 0 ? (
            <Card style={{ padding: 48, textAlign: 'center' }}>
              <Empty 
                icon="📅" 
                title="No Active Campaigns" 
                sub="Apply to campaigns from Opportunities to see deadlines here." 
              />
            </Card>
          ) : (
            <div>
              {upcoming.map((app, i) => (
                <DeadlineCard key={app.id} app={app} delay={i * 0.05} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
