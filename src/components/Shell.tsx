import { useState } from 'react';
import { MAIN_NAVIGATION } from '../types/navigation';
import { VaultlyLogo } from './common/VaultlyLogo';
import { VaultlyIcon } from './common/VaultlyIcon';

// Icon components - inline SVGs
const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const BellIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const PlusIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const LogOutIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const SettingsIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m3.08-3.08l4.24-4.24" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// Sidebar Component
export function Sidebar({ 
  activePage, 
  onNavigate, 
  collapsible = true 
}: { 
  activePage: string; 
  onNavigate: (page: string) => void;
  collapsible?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Collapse button for desktop */}
      {collapsible && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute top-8 -right-4 z-50 w-8 h-8 items-center justify-center bg-white rounded-full border border-vaultly-cream hover:bg-vaultly-cream transition-colors"
        >
          {isCollapsed ? '→' : '←'}
        </button>
      )}

      {/* Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-vaultly-navy transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } shrink-0 border-r border-vaultly-navy overflow-y-auto`}>
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-6 border-b border-white/10">
          <div className="flex shrink-0 items-center">
            <VaultlyLogo variant="white" size="lg" alt="Vaultly" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col justify-center">
              <p className="text-xs tracking-widest text-white/70 font-medium mt-0.5">HOUSEHOLD OPERATING SYSTEM</p>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {MAIN_NAVIGATION.map((item) => {
            const isActive = activePage === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`w-full flex items-center gap-3 rounded-full px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-white text-vaultly-navy shadow-md'
                    : 'text-white hover:bg-white/10 active:bg-white/20'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <span className="flex-shrink-0 text-lg">{item.emoji}</span>
                {!isCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

// Top Bar Component
export function TopBar({
  householdName,
  userName,
  userRole,
  onProfileMenuToggle,
  onNotificationsToggle,
  onQuickAddToggle,
}: {
  householdName: string;
  userName: string;
  userRole: 'Admin' | 'User';
  onProfileMenuToggle: () => void;
  onNotificationsToggle: () => void;
  onQuickAddToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-vaultly-grey bg-white backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-vaultly-sage" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-lg border border-vaultly-grey bg-white py-2 pl-9 pr-3 text-sm text-vaultly-navy placeholder-vaultly-sage focus:border-vaultly-navy focus:bg-white focus:outline-none focus:ring-2 focus:ring-vaultly-navy/20 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="ml-4 flex items-center gap-2">
          {/* Notifications */}
          <button
            onClick={onNotificationsToggle}
            className="relative rounded-lg p-2 text-vaultly-navy hover:bg-vaultly-cream active:bg-vaultly-grey transition-colors"
            aria-label="Notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-vaultly-terracotta" />
          </button>

          {/* Quick Add */}
          <button
            onClick={onQuickAddToggle}
            className="rounded-lg p-2 text-vaultly-navy hover:bg-vaultly-cream active:bg-vaultly-grey transition-colors"
            aria-label="Quick Add"
          >
            <PlusIcon className="h-5 w-5" />
          </button>

          {/* Divider */}
          <div className="h-6 w-px bg-vaultly-grey" />

          {/* Current Household */}
          <div className="hidden sm:block px-3 py-2 text-sm">
            <p className="text-xs text-vaultly-sage font-medium">Household</p>
            <p className="text-vaultly-navy font-medium">{householdName}</p>
          </div>

          {/* Profile Menu */}
          <button
            onClick={onProfileMenuToggle}
            className="ml-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-vaultly-navy hover:bg-vaultly-cream active:bg-vaultly-grey transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-vaultly-navy" />
            <div className="hidden md:block text-left">
              <p className="font-medium text-vaultly-navy">{userName}</p>
              <p className="text-xs text-vaultly-sage">{userRole}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

// Notification Center Component
export function NotificationCenter({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const notifications = [
    {
      id: 1,
      type: 'bill',
      title: 'Electricity bill due',
      message: 'Your electricity bill is due today for $128.40',
      time: '2 hours ago',
      iconName: 'bills' as const,
    },
    {
      id: 2,
      type: 'project',
      title: 'Kitchen project updated',
      message: 'James Johnson added a document to the Kitchen project',
      time: '4 hours ago',
      iconName: 'projects' as const,
    },
    {
      id: 3,
      type: 'warranty',
      title: 'Warranty expiring soon',
      message: 'Your refrigerator warranty expires in 45 days',
      time: '1 day ago',
      iconName: 'notifications' as const,
    },
    {
      id: 4,
      type: 'document',
      title: 'Document uploaded',
      message: 'Emma Johnson uploaded a cabinet quote',
      time: '2 days ago',
      iconName: 'documents' as const,
    },
    {
      id: 5,
      type: 'bcr',
      title: 'BCR organized your receipt',
      message: 'BCR matched your receipt to the Kitchen project',
      time: '3 days ago',
      iconName: 'documents' as const,
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 z-50 h-full w-full max-w-sm border-l border-vaultly-grey bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="border-b border-vaultly-grey px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-vaultly-navy">Notifications</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-vaultly-sage hover:bg-vaultly-cream transition-colors"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto divide-y divide-vaultly-grey">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="p-4 hover:bg-vaultly-cream transition-colors cursor-pointer border-l-4 border-l-transparent hover:border-l-vaultly-navy"
            >
              <div className="flex gap-3">
                <VaultlyIcon name={notif.iconName} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-vaultly-navy">{notif.title}</p>
                  <p className="text-sm text-vaultly-sage mt-1">{notif.message}</p>
                  <p className="text-xs text-vaultly-sage mt-2">{notif.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="border-t border-vaultly-grey p-4">
          <button className="w-full py-2 px-3 rounded-lg text-sm font-medium text-vaultly-navy hover:bg-vaultly-cream transition-colors">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
}

// Quick Add Menu Component
export function QuickAddMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const quickAddOptions = [
    { id: 'bill', label: 'Bill', icon: '📄', color: 'bg-vaultly-mustard' },
    { id: 'project', label: 'Project', icon: '🏗️', color: 'bg-vaultly-terracotta' },
    { id: 'document', label: 'Document', icon: '📎', color: 'bg-vaultly-clay' },
    { id: 'event', label: 'Calendar Event', icon: '📅', color: 'bg-vaultly-sage' },
    { id: 'receipt', label: 'Receipt', icon: '🧾', color: 'bg-vaultly-olive' },
    { id: 'wishlist', label: 'Wishlist Item', icon: '⭐', color: 'bg-vaultly-forest-green' },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Menu */}
      <div className="fixed bottom-24 right-6 z-50 bg-white rounded-2xl shadow-lg border border-vaultly-grey overflow-hidden max-w-sm">
        <div className="p-4 border-b border-vaultly-grey">
          <h3 className="font-semibold text-vaultly-navy">Quick Add</h3>
        </div>
        <div className="grid grid-cols-2 gap-2 p-4">
          {quickAddOptions.map((option) => (
            <button
              key={option.id}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all hover:shadow-md active:scale-95 ${option.color} bg-opacity-10 hover:bg-opacity-20 border border-current border-opacity-20`}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-xs font-medium text-center">{option.label}</span>
            </button>
          ))}
        </div>
        <div className="border-t border-vaultly-grey p-3 bg-vaultly-cream">
          <p className="text-xs text-vaultly-sage text-center">More features coming soon</p>
        </div>
      </div>
    </>
  );
}

// Profile Menu Component
export function ProfileMenu({
  isOpen,
  onClose,
  userName,
  householdName,
  userRole,
  onProfileClick,
  onHouseholdClick,
  onSettingsClick,
  onLogout,
}: {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  householdName: string;
  userRole: 'Admin' | 'User';
  onProfileClick: () => void;
  onHouseholdClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Menu */}
      <div className="fixed right-6 top-20 z-50 w-80 bg-white rounded-2xl shadow-lg border border-vaultly-grey overflow-hidden">
        {/* User Info Header */}
        <div className="bg-gradient-to-r from-vaultly-navy to-vaultly-sage p-6 text-white">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-white/20" />
            <div>
              <p className="font-semibold">{userName}</p>
              <p className="text-sm text-white/70">{householdName}</p>
            </div>
          </div>
          <div className="mt-3 inline-block px-2 py-1 rounded-full bg-vaultly-terracotta text-xs font-medium text-white">
            {userRole}
          </div>
        </div>

        {/* Menu Items */}
        <div className="divide-y divide-vaultly-grey">
          <button
            onClick={() => {
              onProfileClick();
              onClose();
            }}
            className="w-full px-6 py-3 text-left text-sm font-medium text-vaultly-navy hover:bg-vaultly-cream transition-colors flex items-center gap-2"
          >
            <UserIcon className="h-4 w-4 text-vaultly-sage" />
            Profile
          </button>
          <button
            onClick={() => {
              onHouseholdClick();
              onClose();
            }}
            className="w-full px-6 py-3 text-left text-sm font-medium text-vaultly-navy hover:bg-vaultly-cream transition-colors flex items-center gap-2"
          >
            <HomeIcon className="h-4 w-4 text-vaultly-sage" />
            Household
          </button>
          <button
            onClick={() => {
              onSettingsClick();
              onClose();
            }}
            className="w-full px-6 py-3 text-left text-sm font-medium text-vaultly-navy hover:bg-vaultly-cream transition-colors flex items-center gap-2"
          >
            <SettingsIcon className="h-4 w-4 text-vaultly-sage" />
            Settings
          </button>
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="w-full px-6 py-3 text-left text-sm font-medium text-vaultly-terracotta hover:bg-vaultly-cream transition-colors flex items-center gap-2"
          >
            <LogOutIcon className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

// Mobile Navigation Bar
export function MobileNavBar({
  activePage,
  onNavigate,
}: {
  activePage: string;
  onNavigate: (page: string) => void;
}) {
  // Show main navigation items on mobile (first 6 items)
  const mainNavItems = MAIN_NAVIGATION.slice(0, 6);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-vaultly-grey bg-white backdrop-blur lg:hidden">
      <div className="flex items-center justify-between px-1 py-1">
        {mainNavItems.map((item) => {
          const isActive = activePage === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onNavigate(item.key)}
              className={`flex flex-1 flex-col items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium transition-all ${
                isActive
                  ? 'text-vaultly-navy bg-vaultly-cream border-t-2 border-vaultly-terracotta'
                  : 'text-vaultly-sage hover:text-vaultly-navy'
              }`}
            >
              <span className="text-lg">{item.emoji}</span>
              <span className="text-xs leading-tight hidden sm:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
