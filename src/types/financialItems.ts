import { RecurringSettings } from '../components/FinancialFormComponents';
import { ReminderSettings } from '../components/FinancialFormComponents';

// ============================================================================
// FINANCIAL ITEM BASE TYPES
// ============================================================================

/**
 * Base interface for all financial items
 * This is the permanent behavior for Income, Bills, Expenses, Sinking Funds, Savings Goals
 */
export interface FinancialItemBase {
  id: number;
  createdAt: string;
  updatedAt: string;
  createdBy: number; // User ID who created this item

  // Core linking
  linkedAccountId?: number; // Account this item is linked to
  linkedProjectId?: number; // Project this item is linked to (if applicable)
  linkedCalendarEventId?: number; // Calendar event this item created

  // Default behavior - automatically enabled
  addedToCalendar: boolean; // ✓ Added to Calendar (default: true)
  includedInForecast: boolean; // ✓ Included in Forecast (default: true)
  includedInReports: boolean; // ✓ Included in Reports (default: true)
  affectsHouseholdReadiness: boolean; // ✓ Affects Household Readiness (default: true)
  bcrMonitored: boolean; // ✓ Monitored by BCR (default: true)

  // Advanced options
  recurring: RecurringSettings;
  reminders: ReminderSettings;

  // Visibility & permissions
  visibility: 'household' | 'admins_only'; // 'household' by default
  editableBy: 'creator' | 'admins'; // Who can edit this item

  // BCR metadata
  receiptLinked?: boolean; // Has a receipt been linked?
  receiptPath?: string; // Path to receipt file
  bcrNotes?: string; // Notes from BCR
  lastBcrCheck?: string; // Last time BCR checked this item
}

/**
 * Standard form state for creating/editing financial items
 * Use this pattern in all financial modules
 */
export interface FinancialItemFormState extends FinancialItemBase {
  // Override for form usage
  isSubmitting: boolean;
  validationErrors: Record<string, string>;
}

/**
 * Metadata about the financial item for BCR and automation
 */
export interface FinancialItemMetadata {
  itemType: 'income' | 'bill' | 'expense' | 'sinking_fund' | 'savings_goal';
  status: 'draft' | 'active' | 'completed' | 'archived';
  tags: string[];
  customFields?: Record<string, any>;
}

/**
 * Default values for a new financial item
 */
export const DEFAULT_FINANCIAL_ITEM_VALUES: Omit<FinancialItemBase, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'> = {
  linkedAccountId: undefined,
  linkedProjectId: undefined,
  linkedCalendarEventId: undefined,

  // Default behavior - all enabled
  addedToCalendar: true,
  includedInForecast: true,
  includedInReports: true,
  affectsHouseholdReadiness: true,
  bcrMonitored: true,

  // Advanced options - defaults
  recurring: {
    isRecurring: false,
  },
  reminders: {
    enabled: true,
    timing: 'OneWeekBefore',
  },

  // Visibility - default to household
  visibility: 'household',
  editableBy: 'creator',

  // BCR metadata
  receiptLinked: false,
};

/**
 * What happens automatically when a financial item is created (per spec)
 */
export const AUTOMATIC_BEHAVIORS = {
  saveItem: true, // ✓ Save the item
  addToCalendar: true, // ✓ Add to Calendar
  includeForecast: true, // ✓ Include in Forecast
  includeReports: true, // ✓ Include in Reports
  includeHouseholdReadiness: true, // ✓ Include in Household Readiness
  linkAccount: true, // ✓ Link to Account
  allowBCRMonitoring: true, // ✓ Allow BCR to monitor
  postToHomeFeed: true, // ✓ Post to Home Feed (if visible)
} as const;
