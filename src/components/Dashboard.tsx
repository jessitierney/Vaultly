/**
 * Vaultly Dashboard - Household Command Centre
 * First screen users see after login
 */

import React from 'react';
import { NeutralCard, HighlightCard } from './CardThemes';
import { VaultlyIcon } from './common/VaultlyIcon';

// Dashboard Card Components
export interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({ children, className = '' }) => (
  <NeutralCard className={className}>
    {children}
  </NeutralCard>
);

// Household Readiness Score Component
export const HouseholdReadinessScore: React.FC = () => {
  const categories = [
    { name: 'Budget', percentage: 85 },
    { name: 'Bills', percentage: 92 },
    { name: 'Projects', percentage: 68 },
    { name: 'Documents', percentage: 78 },
    { name: 'Maintenance', percentage: 88 },
    { name: 'Calendar', percentage: 95 },
  ];

  const avgScore = Math.round(categories.reduce((sum, cat) => sum + cat.percentage, 0) / categories.length);

  return (
    <DashboardCard>
      <div className="flex flex-col items-center">
        <h3 className="text-lg font-semibold text-vaultly-navy mb-6">Household Readiness Score</h3>
        
        {/* Circular Score Display */}
        <div className="relative w-40 h-40 mb-8">
          <svg className="w-full h-full" viewBox="0 0 200 200">
            {/* Background circle */}
            <circle cx="100" cy="100" r="90" fill="none" stroke="#E8DDCC" strokeWidth="12" />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="90"
              fill="none"
              stroke="#38506A"
              strokeWidth="12"
              strokeDasharray={`${(avgScore / 100) * 565.4} 565.4`}
              strokeLinecap="round"
              transform="rotate(-90 100 100)"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-vaultly-navy">{avgScore}%</span>
            <span className="text-sm text-vaultly-sage">Overall</span>
          </div>
        </div>

        {/* Category Progress Bars */}
        <div className="w-full space-y-4">
          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-vaultly-navy">{cat.name}</span>
                <span className="text-xs text-vaultly-sage">{cat.percentage}%</span>
              </div>
              <div className="w-full h-2 bg-vaultly-grey rounded-full overflow-hidden">
                <div
                  className="h-full bg-vaultly-sage transition-all duration-300"
                  style={{ width: `${cat.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardCard>
  );
};

// Today Section Component
export const TodaySection: React.FC = () => {
  const items = [
    { type: 'bill', title: 'Electricity Bill', time: 'Due today', iconName: 'bills' as const, color: '#E0B14D' },
    { type: 'calendar', title: 'Team Meeting', time: '2:00 PM', iconName: 'calendar' as const, color: '#2F4F3E' },
    { type: 'project', title: 'Kitchen Renovation', time: 'Milestone due', iconName: 'projects' as const, color: '#C86B4A' },
    { type: 'maintenance', title: 'HVAC Maintenance', time: 'Due this week', iconName: 'finance' as const, color: '#38506A' },
  ];

  return (
    <DashboardCard>
      <h3 className="text-lg font-semibold text-vaultly-navy mb-4">Today &amp; Upcoming</h3>
      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-[#D4B24C] hover:bg-[#C9A63D] transition-colors">
            <VaultlyIcon name={item.iconName} size="lg" />
            <div className="flex-1">
              <p className="font-semibold text-white text-sm" style={{ fontFamily: 'Montserrat, sans-serif' }}>{item.title}</p>
              <p className="text-xs text-white" style={{ opacity: 0.8 }}>{item.time}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

// Household Activity Component
export const HouseholdActivity: React.FC = () => {
  const activities = [
    { type: 'bcr', title: 'Receipt organized', description: 'Kitchen project', time: '2 hours ago', iconName: 'documents' as const },
    { type: 'family', title: 'Document uploaded', description: 'James uploaded insurance', time: '4 hours ago', iconName: 'household' as const },
    { type: 'bcr', title: 'Warranty linked', description: 'Connected to refrigerator', time: '1 day ago', iconName: 'documents' as const },
    { type: 'family', title: 'Project updated', description: 'Emma completed bathroom design', time: '2 days ago', iconName: 'projects' as const },
  ];

  return (
    <DashboardCard>
      <h3 className="text-lg font-semibold text-[#38506A] mb-4">Household Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start gap-3 pb-3 border-b border-[#E8DDCC] last:border-b-0">
            <VaultlyIcon name={activity.iconName} size="lg" />
            <div className="flex-1">
              <p className="text-sm font-medium text-[#38506A]">{activity.title}</p>
              <p className="text-xs text-[#A4B69A]">{activity.description}</p>
              <p className="text-xs text-[#D8C3A5] mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

// Quick Actions Component
export const QuickActions: React.FC = () => {
  // First action is primary (Terracotta), rest alternate between Sage and Warm Cream
  const actions = [
    { title: 'Add Bill',          iconName: 'finance' as const, primary: true, useSvg: true },
    { title: 'Upload Document',   iconName: 'documents' as const, primary: false, alt: false, useSvg: true },
    { title: 'New Project',       iconName: 'projects' as const, primary: false, alt: true, useSvg: true },
    { title: 'Calendar Event',    iconName: 'calendar' as const, primary: false, alt: false, useSvg: true },
    { title: 'Add Receipt',       iconName: 'documents' as const, primary: false, alt: true, useSvg: true },
    { title: 'Wishlist Item',     iconName: 'finance' as const, primary: false, alt: false, useSvg: true },
  ];

  return (
    <DashboardCard>
      <h3 className="text-lg font-semibold text-[#38506A] mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className={`p-4 rounded-[16px] transition-colors text-center ${
              action.primary
                ? 'bg-[#C96F4A] hover:bg-[#b85e3a] text-white'
                : action.alt
                ? 'bg-[#F7F3EC] hover:bg-[#EEE8DC] text-[#38506A] border border-[#E7DED2]'
                : 'bg-[#DDE6D6] hover:bg-[#ccdac4] text-[#38506A]'
            }`}
          >
            <div className="text-2xl mb-2 flex justify-center">
              <VaultlyIcon name={action.iconName} size="lg" />
            </div>
            <p className="text-xs font-semibold">{action.title}</p>
          </button>
        ))}
      </div>
    </DashboardCard>
  );
};

// Household Snapshot Component
export const HouseholdSnapshot: React.FC = () => {
  const snapshots = [
    { label: 'Documents', count: 24, status: '✓ Organized', iconName: 'documents' as const },
    { label: 'Projects', count: 5, status: '58% Average', iconName: 'projects' as const },
    { label: 'Bills', count: 12, status: '✓ On Track', iconName: 'finance' as const },
    { label: 'Calendar', count: 18, status: '✓ Updated', iconName: 'calendar' as const },
  ];

  return (
    <DashboardCard>
      <h3 className="text-lg font-semibold text-[#38506A] mb-4">Household Snapshot</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {snapshots.map((snap, idx) => (
          <div key={idx} className="p-4 rounded-[16px] bg-[#F7F3EC] border border-[#E7DED2] text-center">
            <div className="mb-2 flex justify-center">
              <VaultlyIcon name={snap.iconName} size="lg" />
            </div>
            <p className="text-2xl font-bold text-[#38506A]">{snap.count}</p>
            <p className="text-xs text-[#A4B69A] mt-1">{snap.label}</p>
            <p className="text-xs font-medium text-[#2F4F3E] mt-2">{snap.status}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

// BCR Summary Component
export const BCRSummary: React.FC = () => {
  const automations = [
    { action: 'Receipt organized', module: 'Kitchen project', time: '2 hours ago' },
    { action: 'Warranty linked', module: 'Refrigerator', time: '1 day ago' },
    { action: 'Reminder created', module: 'Insurance renewal', time: '2 days ago' },
  ];

  return (
    <HighlightCard>
      <div>
        <h3 className="text-lg font-semibold text-[#38506A]">BCR</h3>
        <p className="text-sm text-[#6B7E8F] mb-4">Household Automation Assistant</p>
        
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium text-[#38506A] mb-2">Recent Automations</h4>
            {automations.map((auto, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs mb-2">
                <span className="text-[#2F4F3E]">•</span>
                <div>
                  <p className="text-[#38506A]">{auto.action}</p>
                  <p className="text-[#A4B69A]">{auto.module} • {auto.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-3 border-t border-[#C8D4E0]">
            <p className="text-xs text-[#6B7E8F]">BCR is your household automation assistant. It organizes information, not provide financial advice.</p>
          </div>
        </div>
      </div>
    </HighlightCard>
  );
};

// Recent Documents Component
export const RecentDocuments: React.FC = () => {
  const documents = [
    { title: 'Kitchen Receipt', type: 'Receipt', date: 'Today', iconName: 'documents' as const },
    { title: 'Refrigerator Manual', type: 'Manual', date: '3 days ago', iconName: 'documents' as const },
    { title: 'Home Insurance', type: 'Insurance', date: '1 week ago', iconName: 'documents' as const },
    { title: 'Washing Machine Warranty', type: 'Warranty', date: '2 weeks ago', iconName: 'documents' as const },
  ];

  return (
    <DashboardCard>
      <h3 className="text-lg font-semibold text-[#38506A] mb-4">Recently Uploaded</h3>
      <div className="space-y-2">
        {documents.map((doc, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E7DED2] hover:bg-[#F7F3EC] transition-colors">
            <div className="flex items-center gap-3">
              <VaultlyIcon name={doc.iconName} size="lg" />
              <div>
                <p className="text-sm font-medium text-[#38506A]">{doc.title}</p>
                <p className="text-xs text-[#A4B69A]">{doc.type} • {doc.date}</p>
              </div>
            </div>
            <button className="text-xs font-medium text-[#38506A] hover:text-[#2F4F3E]">Open →</button>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

// Household Timeline Component
export const HouseholdTimeline: React.FC = () => {
  const events = [
    { title: 'Electricity bill paid', date: 'Today', icon: '⚡' },
    { title: 'Receipt uploaded', date: '2 hours ago', icon: '🧾' },
    { title: 'Insurance renewed', date: '1 day ago', icon: '🛡️' },
    { title: 'Warranty added', date: '3 days ago', icon: '📄' },
    { title: 'Smoke alarms checked', date: '1 week ago', icon: '🔔' },
  ];

  return (
    <DashboardCard>
      <h3 className="text-lg font-semibold text-[#38506A] mb-4">Household Timeline</h3>
      <div className="space-y-0">
        {events.map((event, idx) => (
          <div key={idx} className="flex gap-4 pb-4 last:pb-0">
            {/* Timeline dot and line */}
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 rounded-full bg-[#38506A] mt-1.5" />
              {idx !== events.length - 1 && <div className="w-0.5 h-12 bg-[#E8DDCC] mt-2" />}
            </div>
            {/* Event content */}
            <div className="pt-0.5">
              <p className="text-sm font-medium text-[#38506A]">{event.title}</p>
              <p className="text-xs text-[#A4B69A]">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default DashboardCard;
