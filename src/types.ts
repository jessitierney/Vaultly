/**
 * Vaultly Type Definitions
 *
 * Central type registry for all entities, events, and UI states.
 * Extracted from App.tsx for better organization and reusability.
 */

// ============================================================================
// NAVIGATION & UI
// ============================================================================

export type PageKey = 'dashboard' | 'budget' | 'projects' | 'calendar' | 'documents' | 'reports' | 'profile' | 'settings';

export interface NavItem {
  key: PageKey;
  label: string;
  icon: string;
}

// ============================================================================
// INCOME & FINANCIAL SETTINGS
// ============================================================================

export type IncomeFrequency = 'Weekly' | 'Fortnightly' | 'Monthly' | 'Quarterly' | 'Yearly' | 'One-off';
export type SalaryFrequency = 'Weekly' | 'Fortnightly' | 'Monthly';
export type RosterFrequency = 'Weekly' | 'Fortnightly' | 'Manual';
export type IncomeType = 'Salary' | 'Casual / shift work' | 'Mixed income';
export type OtherIncomeType =
  | 'Rental income'
  | 'Government concessions'
  | 'Centrelink / family payments'
  | 'Child support'
  | 'Business income'
  | 'Side income'
  | 'Dividends / investments'
  | 'Other';

export interface SalaryEntry {
  personName: string;
  employerName: string;
  annualSalary: string;
  payFrequency: SalaryFrequency;
  firstPayDate: string;
  superOption: boolean;
  taxEstimateOption: boolean;
  notes: string;
}

export interface RosterEntry {
  personName: string;
  amount: string;
  hourlyRate: string;
  penaltyRates: string;
  overtime: string;
  publicHoliday: string;
  annualLeave: string;
  sickLeave: string;
  frequency: RosterFrequency;
  nextShiftDate: string;
  notes: string;
}

export interface OtherIncomeEntry {
  id: number;
  incomeName: string;
  incomeType: OtherIncomeType;
  amount: string;
  frequency: IncomeFrequency;
  firstPaymentDate: string;
  endDate: string;
  person: string;
  notes: string;
}

export interface IncomeSettings {
  incomeType: IncomeType;
  primarySalary: SalaryEntry;
  partnerSalary: SalaryEntry;
  primaryRoster: RosterEntry;
  partnerRoster: RosterEntry;
  leaveAdjustment: string;
  otherIncome: OtherIncomeEntry[];
}

// ============================================================================
// CALENDAR & EVENTS
// ============================================================================

export type CalendarEventType = 'Income' | 'Bills' | 'Projects' | 'Appointments' | 'Leave' | 'Holiday' | 'Warranty';

export interface CalendarEvent {
  id: number;
  title: string;
  date: number;
  type: CalendarEventType;
  color: string;
  time: string;
  detail: string;
}

// ============================================================================
// DOCUMENTS & FILES
// ============================================================================

export type DocumentKind = 'Quote' | 'Invoice' | 'Receipt' | 'Warranty document' | 'Manual' | 'Photo' | 'Other file';

export interface ProjectDocument {
  id: number;
  documentName: string;
  uploadDate: string;
  documentType: DocumentKind;
  supplier: string;
  purchaseDate: string;
  warrantyExpiryDate: string;
  amount: string;
  linkedProject: string;
  notes: string;
  fileName?: string;
}

export interface HouseholdWarrantyItem {
  id: number;
  productName: string;
  category: string;
  purchaseDate: string;
  warrantyExpiryDate: string;
  amount: string;
  receiptFileName?: string;
  warrantyFileName?: string;
  manualFileName?: string;
  photoFileName?: string;
  notes: string;
}

// ============================================================================
// PROJECTS & TASKS
// ============================================================================

export interface Project {
  id: number;
  name: string;
  budget: number;
  spent: number;
  progress: number;
  notes: string;
  documents: ProjectDocument[];
}

// ============================================================================
// USERS & HOUSEHOLDS
// ============================================================================

export interface User {
  id: number;
  name: string;
  email: string;
  householdId?: number;
}

export interface Member {
  id: number;
  name: string;
}

export interface Household {
  id: number;
  name: string;
  members: number[]; // user ids
}

// ============================================================================
// BUDGET & FINANCIAL ITEMS
// ============================================================================

export interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate?: string;
  linkedProjectId?: number;
}

export interface WishlistItem {
  id: number;
  title: string;
  amount?: number;
  notes?: string;
  linked?: boolean;
}

// ============================================================================
// ACTIVITY & FEED
// ============================================================================

export type ActivityType = 'bcr' | 'family'; // bcr = Bills, Costs, Receipts

export interface ActivityPost {
  id: number;
  type: ActivityType;
  author?: string;
  message: string;
  date: string;
  meta?: Record<string, any>;
}

// ============================================================================
// MODAL & FORM STATE
// ============================================================================

export type ModalType = 'project-doc' | 'household-item' | 'bill' | 'wishlist' | string;
export type ModalMode = 'create' | 'edit';

export interface ModalFormData {
  name?: string;
  title?: string;
  supplier?: string;
  documentType?: DocumentKind;
  purchaseDate?: string;
  warrantyExpiryDate?: string;
  amount?: string;
  linkedProject?: string;
  notes?: string;
  fileName?: string;
  uploadDate?: string;
  dueDate?: string;
  [key: string]: string | boolean | undefined;
}

// ============================================================================
// UI STATE
// ============================================================================

export interface AppState {
  activePage: PageKey;
  modalOpen: boolean;
  modalType: ModalType;
  modalMode: ModalMode;
  editingEntityId: number | null;
  modalFormData: ModalFormData;
}

// ============================================================================
// APPLICATION STATE
// ============================================================================

export interface VaultlyAppState {
  // UI state
  ui: AppState;

  // Data entities
  projects: Project[];
  householdWarrantyItems: HouseholdWarrantyItem[];
  users: User[];
  households: Household[];
  bills: Bill[];
  wishlist: WishlistItem[];
  activityFeed: ActivityPost[];
  incomeSettings: IncomeSettings;

  // Current user
  currentUser: User | null;
}
