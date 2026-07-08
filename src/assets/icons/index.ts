/**
 * Vaultly Icon Registry
 * Central export for all approved Vaultly SVG icons
 * 
 * Usage:
 * import { documentIcon, projectsIcon, ... } from './assets/icons';
 * Or use the VaultlyIcon component: <VaultlyIcon name="documents" />
 */

// Documents
import documentIconUrl from './documents/documents.svg?url';
export const documentIcon = documentIconUrl;

// Projects
import projectsIconUrl from './projects/vaultly-projects-navy.svg?url';
export const projectsIcon = projectsIconUrl;

// Finance/Bills
import financeIconUrl from './finance/income.svg?url';
export const financeIcon = financeIconUrl;

// Calendar
import calendarIconUrl from './calendar/vaultly-calendar-navy.svg?url';
export const calendarIcon = calendarIconUrl;

// Notifications
import notificationsIconUrl from './notifications/vaultly-alerts-navy.svg?url';
export const notificationsIcon = notificationsIconUrl;

// Household
import householdIconUrl from './household/vaultly-locked_home-navy.svg?url';
export const householdIcon = householdIconUrl;

// Reports
import reportsIconUrl from './reports/vaultly-reports-navy.svg?url';
export const reportsIcon = reportsIconUrl;

// Settings
import settingsIconUrl from './settings/vaultly-settings-navy.svg?url';
export const settingsIcon = settingsIconUrl;

/**
 * Icon mapping for VaultlyIcon component
 * These keys are used by components to reference icons consistently
 */
export const ICON_MAP = {
  documents: documentIcon,
  projects: projectsIcon,
  finance: financeIcon,
  bills: financeIcon,
  calendar: calendarIcon,
  notifications: notificationsIcon,
  homeHub: householdIcon,
  household: householdIcon,
  reports: reportsIcon,
  settings: settingsIcon,
} as const;

export type IconName = keyof typeof ICON_MAP;
