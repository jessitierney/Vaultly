import React from 'react';
import {
  AdvancedOptionsWrapper,
  RecurringSettingsComponent,
  RecurringSettings,
  ReminderSettingsComponent,
  ReminderSettings,
  CalendarVisibilitySettingsComponent,
  PermissionTogglesComponent,
} from './FinancialFormComponents';
import { useIsAdmin } from '../hooks/usePermissions';
import { MemberPermissions } from '../types/permissions';

// ============================================================================
// FINANCIAL ITEM FORM WRAPPER
// ============================================================================

/**
 * Reusable form layout for all financial items
 * Handles basic fields + Advanced Options section
 *
 * Props:
 * - title: Form title
 * - description: Optional form description
 * - onSubmit: Form submission handler
 * - isSubmitting: Loading state
 * - children: Form field components
 * - showAccountSelect: Show account selection (default: true)
 * - linkedAccountId: Selected account ID
 * - onAccountChange: Account change callback
 */
export function FinancialItemFormLayout({
  title,
  description,
  onSubmit,
  isSubmitting,
  children,
  showAccountSelect = true,
  linkedAccountId,
  onAccountChange,
}: {
  title: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  children: React.ReactNode;
  showAccountSelect?: boolean;
  linkedAccountId?: number;
  onAccountChange?: (accountId: number) => void;
}) {
  const accounts = [
    { id: 1, name: 'Everyday' },
    { id: 2, name: 'Mortgage Offset' },
    { id: 3, name: 'Emergency Fund' },
    { id: 4, name: 'Holiday Fund' },
    { id: 5, name: 'Renovation Fund' },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#38506A] mb-1">{title}</h2>
        {description && <p className="text-sm text-[#A4B69A]">{description}</p>}
      </div>

      {/* Main form fields */}
      <div className="space-y-6">{children}</div>

      {/* Account Selection */}
      {showAccountSelect && (
        <div>
          <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Link to Account</label>
          <select
            value={linkedAccountId || ''}
            onChange={(e) => onAccountChange?.(parseInt(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
          >
            <option value="">Select an account...</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-[#A4B69A] mt-1">This item will be linked to your selected account</p>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-6 border-t border-[#E7DED2] flex gap-3 justify-end">
        <button
          type="button"
          className="px-6 py-2 rounded-lg border border-[#E7DED2] text-[#38506A] font-medium hover:bg-[#FAF8F5] transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}

// ============================================================================
// FINANCIAL ITEM ADVANCED OPTIONS SECTION
// ============================================================================

/**
 * Complete Advanced Options section with all settings
 * Include this at the bottom of your financial item forms
 */
export function FinancialItemAdvancedOptions({
  recurringSettings,
  onRecurringChange,
  reminderSettings,
  onReminderChange,
  showInCalendar,
  onCalendarChange,
  visibility,
  onVisibilityChange,
}: {
  recurringSettings: RecurringSettings;
  onRecurringChange: (settings: RecurringSettings) => void;
  reminderSettings: ReminderSettings;
  onReminderChange: (settings: ReminderSettings) => void;
  showInCalendar: boolean;
  onCalendarChange: (show: boolean) => void;
  visibility: 'household' | 'admins_only';
  onVisibilityChange: (visibility: 'household' | 'admins_only') => void;
}) {
  const isAdmin = useIsAdmin();

  return (
    <AdvancedOptionsWrapper>
      {/* Recurring Settings */}
      <div>
        <h3 className="text-sm font-semibold text-[#38506A] mb-4">Recurring</h3>
        <RecurringSettingsComponent value={recurringSettings} onChange={onRecurringChange} />
      </div>

      {/* Reminder Settings */}
      <div>
        <h3 className="text-sm font-semibold text-[#38506A] mb-4">Reminders</h3>
        <ReminderSettingsComponent value={reminderSettings} onChange={onReminderChange} />
      </div>

      {/* Calendar & Visibility */}
      <div>
        <h3 className="text-sm font-semibold text-[#38506A] mb-4">Calendar & Visibility</h3>
        <CalendarVisibilitySettingsComponent
          value={{
            showInCalendar,
            visibility,
          }}
          onChange={(settings) => {
            onCalendarChange(settings.showInCalendar);
            onVisibilityChange(settings.visibility);
          }}
          isAdmin={isAdmin}
        />
      </div>

      {/* Information about automatic behavior */}
      <div className="mt-6 p-4 rounded-lg bg-[#E8DDCC]/30 border border-[#E8DDCC]">
        <p className="text-xs font-semibold text-[#38506A] mb-2">Automatic Behavior</p>
        <ul className="text-xs text-[#38506A] space-y-1">
          <li>✓ This item will be added to your Calendar</li>
          <li>✓ This item will be included in your Forecast</li>
          <li>✓ This item will appear in your Reports</li>
          <li>✓ This item will affect your Household Readiness</li>
          <li>✓ BCR will monitor this item</li>
        </ul>
      </div>
    </AdvancedOptionsWrapper>
  );
}

// ============================================================================
// PERMISSION MANAGEMENT FORM (For Admin Use)
// ============================================================================

export function FamilyMemberPermissionsForm({
  memberName,
  permissions,
  onPermissionsChange,
  onSave,
  isSaving,
}: {
  memberName: string;
  permissions: MemberPermissions;
  onPermissionsChange: (permissions: MemberPermissions) => void;
  onSave: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="bg-white rounded-lg border border-[#E7DED2] p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#38506A]">Permissions: {memberName}</h2>
        <p className="text-sm text-[#A4B69A]">Control what {memberName} can see and do in Vaultly</p>
      </div>

      <div className="space-y-6">
        <PermissionTogglesComponent permissions={permissions} onChange={onPermissionsChange} />

        <div className="pt-6 border-t border-[#E7DED2] flex gap-3 justify-end">
          <button
            type="button"
            className="px-6 py-2 rounded-lg border border-[#E7DED2] text-[#38506A] font-medium hover:bg-[#FAF8F5] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={isSaving}
            className="px-6 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] disabled:opacity-50 transition-colors"
          >
            {isSaving ? 'Saving...' : 'Save Permissions'}
          </button>
        </div>
      </div>
    </div>
  );
}
