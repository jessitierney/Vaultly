// Navigation types for Vaultly application

export type MainPageKey = 'dashboard' | 'budget' | 'home-hub' | 'projects' | 'calendar' | 'reports' | 'settings';

export type BudgetSection = 'overview' | 'income' | 'accounts' | 'bills' | 'spending' | 'transactions' | 'sinking-funds' | 'savings-goals' | 'forecast';

export type HomeHubSection = 'home-feed' | 'family-profiles' | 'household-details' | 'documents' | 'receipts' | 'manuals' | 'warranties' | 'insurance' | 'certificates' | 'vehicles' | 'pets' | 'appliances' | 'property-information' | 'home-inventory';

export type ProjectsSection = 'overview' | 'active-projects' | 'planned-projects' | 'maintenance' | 'quotes' | 'contractors' | 'timeline' | 'documents' | 'photos' | 'receipts' | 'budget' | 'archive';

export type CalendarSection = 'month' | 'week' | 'day' | 'agenda' | 'calendar-categories' | 'bills' | 'projects' | 'maintenance' | 'birthdays' | 'appointments' | 'renewals' | 'tasks' | 'wishlist' | 'school' | 'family-events';

export type ReportsSection = 'overview' | 'household-readiness' | 'budget' | 'spending' | 'projects' | 'maintenance' | 'documents' | 'historical-trends';

export type SettingsSection = 'profile' | 'household' | 'notifications' | 'permissions' | 'security' | 'appearance' | 'subscription' | 'integrations';

export interface NavItem {
  key: string;
  label: string;
  emoji: string;
  icon?: string;
  count?: number;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

// Navigation structure for main pages
export const MAIN_NAVIGATION: NavItem[] = [
  { key: 'dashboard', label: 'Dashboard', emoji: '🏠' },
  { key: 'budget', label: 'Budget', emoji: '💰' },
  { key: 'home-hub', label: 'Home Hub', emoji: '🏡' },
  { key: 'projects', label: 'Projects', emoji: '🛠' },
  { key: 'calendar', label: 'Calendar', emoji: '📅' },
  { key: 'reports', label: 'Reports', emoji: '📊' },
  { key: 'settings', label: 'Settings', emoji: '⚙️' },
];

// Budget module internal navigation
export const BUDGET_NAVIGATION: NavItem[] = [
  { key: 'overview', label: 'Overview', emoji: '📊' },
  { key: 'income', label: 'Income', emoji: '💰' },
  { key: 'accounts', label: 'Accounts', emoji: '🏦' },
  { key: 'bills', label: 'Bills', emoji: '📄' },
  { key: 'spending', label: 'Spending', emoji: '🏷️' },
  { key: 'transactions', label: 'Transactions', emoji: '📋' },
  { key: 'sinking-funds', label: 'Sinking Funds', emoji: '🎯' },
  { key: 'savings-goals', label: 'Savings Goals', emoji: '⭐' },
  { key: 'forecast', label: 'Forecast', emoji: '📈' },
];

// Home Hub module internal navigation
export const HOME_HUB_NAVIGATION: NavItem[] = [
  { key: 'home-feed', label: 'Home Feed', emoji: '📰' },
  { key: 'family-profiles', label: 'Family Profiles', emoji: '👨‍👩‍👧' },
  { key: 'household-details', label: 'Household Details', emoji: '🏠' },
  { key: 'documents', label: 'Documents', emoji: '📄' },
  { key: 'receipts', label: 'Receipts', emoji: '🧾' },
  { key: 'manuals', label: 'Manuals', emoji: '📖' },
  { key: 'warranties', label: 'Warranties', emoji: '✅' },
  { key: 'insurance', label: 'Insurance', emoji: '🛡️' },
  { key: 'certificates', label: 'Certificates', emoji: '🎓' },
  { key: 'vehicles', label: 'Vehicles', emoji: '🚗' },
  { key: 'pets', label: 'Pets', emoji: '🐾' },
  { key: 'appliances', label: 'Appliances', emoji: '🍳' },
  { key: 'property-information', label: 'Property Info', emoji: '🏘️' },
  { key: 'home-inventory', label: 'Home Inventory', emoji: '📦' },
];

// Projects module internal navigation
export const PROJECTS_NAVIGATION: NavItem[] = [
  { key: 'overview', label: 'Overview', emoji: '📊' },
  { key: 'active-projects', label: 'Active Projects', emoji: '🏗️' },
  { key: 'planned-projects', label: 'Planned Projects', emoji: '📋' },
  { key: 'maintenance', label: 'Maintenance', emoji: '🔧' },
  { key: 'quotes', label: 'Quotes', emoji: '💬' },
  { key: 'contractors', label: 'Contractors', emoji: '👷' },
  { key: 'timeline', label: 'Timeline', emoji: '📈' },
  { key: 'documents', label: 'Documents', emoji: '📄' },
  { key: 'photos', label: 'Photos', emoji: '📸' },
  { key: 'receipts', label: 'Receipts', emoji: '🧾' },
  { key: 'budget', label: 'Budget', emoji: '💰' },
  { key: 'archive', label: 'Archive', emoji: '📦' },
];

// Calendar module internal navigation
export const CALENDAR_NAVIGATION: NavItem[] = [
  { key: 'month', label: 'Month', emoji: '📅' },
  { key: 'week', label: 'Week', emoji: '📆' },
  { key: 'day', label: 'Day', emoji: '📍' },
  { key: 'agenda', label: 'Agenda', emoji: '📝' },
  { key: 'calendar-categories', label: 'Categories', emoji: '🏷️' },
  { key: 'bills', label: 'Bills', emoji: '💳' },
  { key: 'projects', label: 'Projects', emoji: '🏗️' },
  { key: 'maintenance', label: 'Maintenance', emoji: '🔧' },
  { key: 'birthdays', label: 'Birthdays', emoji: '🎂' },
  { key: 'appointments', label: 'Appointments', emoji: '📞' },
  { key: 'renewals', label: 'Renewals', emoji: '🔄' },
  { key: 'tasks', label: 'Tasks', emoji: '✓' },
  { key: 'wishlist', label: 'Wishlist', emoji: '⭐' },
  { key: 'school', label: 'School', emoji: '🎓' },
  { key: 'family-events', label: 'Family Events', emoji: '🎉' },
];

// Reports module internal navigation
export const REPORTS_NAVIGATION: NavItem[] = [
  { key: 'overview', label: 'Overview', emoji: '📊' },
  { key: 'household-readiness', label: 'Household Readiness', emoji: '✅' },
  { key: 'budget', label: 'Budget', emoji: '💰' },
  { key: 'spending', label: 'Spending', emoji: '📈' },
  { key: 'projects', label: 'Projects', emoji: '🏗️' },
  { key: 'maintenance', label: 'Maintenance', emoji: '🔧' },
  { key: 'documents', label: 'Documents', emoji: '📄' },
  { key: 'historical-trends', label: 'Historical Trends', emoji: '📊' },
];

// Settings module internal navigation
export const SETTINGS_NAVIGATION: NavItem[] = [
  { key: 'profile', label: 'Profile', emoji: '👤' },
  { key: 'household', label: 'Household', emoji: '🏠' },
  { key: 'notifications', label: 'Notifications', emoji: '🔔' },
  { key: 'permissions', label: 'Permissions', emoji: '🔐' },
  { key: 'security', label: 'Security', emoji: '🛡️' },
  { key: 'appearance', label: 'Appearance', emoji: '🎨' },
  { key: 'subscription', label: 'Subscription', emoji: '💳' },
  { key: 'integrations', label: 'Integrations', emoji: '🔗' },
];

export function getModuleNavigation(module: MainPageKey): NavItem[] {
  switch (module) {
    case 'budget':
      return BUDGET_NAVIGATION;
    case 'home-hub':
      return HOME_HUB_NAVIGATION;
    case 'projects':
      return PROJECTS_NAVIGATION;
    case 'calendar':
      return CALENDAR_NAVIGATION;
    case 'reports':
      return REPORTS_NAVIGATION;
    case 'settings':
      return SETTINGS_NAVIGATION;
    default:
      return [];
  }
}
