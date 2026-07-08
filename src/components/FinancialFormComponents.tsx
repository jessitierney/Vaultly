import React, { useState } from 'react';

// Icon component - inline SVG
const ChevronRightIcon = ({ size = 18, className = '' }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={`transition-transform duration-200 ${className}`}
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================================================
// ADVANCED OPTIONS WRAPPER
// ============================================================================

export function AdvancedOptionsWrapper({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mt-6 border-t border-[#E7DED2] pt-6">
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-semibold text-[#38506A] hover:text-[#38506A] transition-colors"
      >
        <span className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRightIcon size={18} />
        </span>
        Advanced Options
      </button>

      {isExpanded && <div className="mt-6 space-y-6 pl-6 border-l-2 border-[#E8DDCC]">{children}</div>}
    </div>
  );
}

// ============================================================================
// RECURRING SETTINGS
// ============================================================================

export type RecurrenceFrequency = 'Daily' | 'Weekly' | 'Fortnightly' | 'Monthly' | 'Quarterly' | 'Yearly' | 'Custom';
export type RecurrenceEnd = 'Never' | 'SpecificDate' | 'NumberOfOccurrences';

export interface RecurringSettings {
  isRecurring: boolean;
  frequency?: RecurrenceFrequency;
  startDate?: string;
  endType?: RecurrenceEnd;
  endDate?: string;
  numberOfOccurrences?: number;
}

export function RecurringSettingsComponent({
  value,
  onChange,
}: {
  value: RecurringSettings;
  onChange: (settings: RecurringSettings) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="recurring"
          checked={value.isRecurring}
          onChange={(e) => onChange({ ...value, isRecurring: e.target.checked })}
          className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A] cursor-pointer"
        />
        <label htmlFor="recurring" className="text-sm font-medium text-[#38506A] cursor-pointer">
          Make Recurring
        </label>
      </div>

      {value.isRecurring && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Frequency</label>
            <select
              value={value.frequency || 'Monthly'}
              onChange={(e) => onChange({ ...value, frequency: e.target.value as RecurrenceFrequency })}
              className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Fortnightly">Fortnightly</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Start Date</label>
            <input
              type="date"
              value={value.startDate || new Date().toISOString().split('T')[0]}
              onChange={(e) => onChange({ ...value, startDate: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#A4B69A] mb-2">End</label>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="endType"
                  value="Never"
                  checked={value.endType === 'Never' || !value.endType}
                  onChange={() => onChange({ ...value, endType: 'Never' })}
                  className="h-4 w-4"
                />
                <span className="text-sm text-[#38506A]">Never</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="endType"
                  value="SpecificDate"
                  checked={value.endType === 'SpecificDate'}
                  onChange={() => onChange({ ...value, endType: 'SpecificDate' })}
                  className="h-4 w-4"
                />
                <span className="text-sm text-[#38506A]">Specific Date</span>
              </label>
              {value.endType === 'SpecificDate' && (
                <input
                  type="date"
                  value={value.endDate || ''}
                  onChange={(e) => onChange({ ...value, endDate: e.target.value })}
                  className="w-full ml-7 px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                />
              )}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="endType"
                  value="NumberOfOccurrences"
                  checked={value.endType === 'NumberOfOccurrences'}
                  onChange={() => onChange({ ...value, endType: 'NumberOfOccurrences' })}
                  className="h-4 w-4"
                />
                <span className="text-sm text-[#38506A]">Number of Occurrences</span>
              </label>
              {value.endType === 'NumberOfOccurrences' && (
                <input
                  type="number"
                  min="1"
                  value={value.numberOfOccurrences || 1}
                  onChange={(e) => onChange({ ...value, numberOfOccurrences: parseInt(e.target.value) })}
                  className="w-full ml-7 px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// REMINDER SETTINGS
// ============================================================================

export type ReminderTiming = 'SameDay' | 'OneDayBefore' | 'ThreeDaysBefore' | 'OneWeekBefore' | 'Custom';

export interface ReminderSettings {
  enabled: boolean;
  timing?: ReminderTiming;
  customDaysBefore?: number;
}

export function ReminderSettingsComponent({
  value,
  onChange,
}: {
  value: ReminderSettings;
  onChange: (settings: ReminderSettings) => void;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="reminders"
          checked={value.enabled}
          onChange={(e) => onChange({ ...value, enabled: e.target.checked })}
          className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A] cursor-pointer"
        />
        <label htmlFor="reminders" className="text-sm font-medium text-[#38506A] cursor-pointer">
          Send Reminder Notifications
        </label>
      </div>

      {value.enabled && (
        <div>
          <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Reminder Timing</label>
          <select
            value={value.timing || 'OneWeekBefore'}
            onChange={(e) => onChange({ ...value, timing: e.target.value as ReminderTiming })}
            className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
          >
            <option value="SameDay">Same Day</option>
            <option value="OneDayBefore">1 Day Before</option>
            <option value="ThreeDaysBefore">3 Days Before</option>
            <option value="OneWeekBefore">1 Week Before</option>
            <option value="Custom">Custom</option>
          </select>

          {value.timing === 'Custom' && (
            <input
              type="number"
              min="1"
              placeholder="Days before"
              value={value.customDaysBefore || 1}
              onChange={(e) => onChange({ ...value, customDaysBefore: parseInt(e.target.value) })}
              className="w-full mt-3 px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
            />
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CALENDAR & VISIBILITY SETTINGS
// ============================================================================

export interface CalendarVisibilitySettings {
  showInCalendar: boolean;
  visibility: 'household' | 'admins_only';
}

export function CalendarVisibilitySettingsComponent({
  value,
  onChange,
  isAdmin,
}: {
  value: CalendarVisibilitySettings;
  onChange: (settings: CalendarVisibilitySettings) => void;
  isAdmin: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="showInCalendar"
          checked={value.showInCalendar}
          onChange={(e) => onChange({ ...value, showInCalendar: e.target.checked })}
          className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A] cursor-pointer"
        />
        <label htmlFor="showInCalendar" className="text-sm font-medium text-[#38506A] cursor-pointer">
          Show in Calendar
        </label>
        <span className="text-xs text-[#A4B69A]">(default)</span>
      </div>

      {isAdmin && (
        <div>
          <label className="block text-xs font-semibold text-[#A4B69A] mb-3">Visibility</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="household"
                checked={value.visibility === 'household'}
                onChange={() => onChange({ ...value, visibility: 'household' })}
                className="h-4 w-4"
              />
              <span className="text-sm text-[#38506A]">Visible to Household</span>
              <span className="text-xs text-[#A4B69A]">(default)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="visibility"
                value="admins_only"
                checked={value.visibility === 'admins_only'}
                onChange={() => onChange({ ...value, visibility: 'admins_only' })}
                className="h-4 w-4"
              />
              <span className="text-sm text-[#38506A]">Visible to Admins Only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// PERMISSION TOGGLES
// ============================================================================

import { MemberPermissions } from '../types/permissions';

export function PermissionTogglesComponent({
  permissions,
  onChange,
}: {
  permissions: MemberPermissions;
  onChange: (permissions: MemberPermissions) => void;
}) {
  const handleToggle = (permission: keyof MemberPermissions) => {
    onChange({
      ...permissions,
      [permission]: !permissions[permission],
    });
  };

  return (
    <div className="space-y-8">
      {/* Budget Permissions */}
      <div>
        <h4 className="text-sm font-semibold text-[#38506A] mb-3">Budget</h4>
        <div className="space-y-2">
          {[
            { key: 'budget:view' as const, label: 'View Budget' },
            { key: 'budget:view_expenses' as const, label: 'View Expenses' },
            { key: 'budget:view_income' as const, label: 'View Income' },
            { key: 'budget:notifications' as const, label: 'Receive Budget Notifications' },
            { key: 'budget:edit' as const, label: 'Edit Budget', defaultOff: true },
          ].map(({ key, label, defaultOff }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={() => handleToggle(key)}
                className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A]"
              />
              <span className="text-sm text-[#38506A]">{label}</span>
              {defaultOff && <span className="text-xs text-[#A4B69A]">(default OFF)</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Calendar Permissions */}
      <div>
        <h4 className="text-sm font-semibold text-[#38506A] mb-3">Calendar</h4>
        <div className="space-y-2">
          {[
            { key: 'calendar:view' as const, label: 'View Calendar' },
            { key: 'calendar:add_events' as const, label: 'Add Calendar Events' },
            { key: 'calendar:edit_events' as const, label: 'Edit Calendar Events' },
            { key: 'calendar:delete_events' as const, label: 'Delete Calendar Events', defaultOff: true },
            { key: 'calendar:notifications' as const, label: 'Receive Calendar Notifications' },
          ].map(({ key, label, defaultOff }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={() => handleToggle(key)}
                className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A]"
              />
              <span className="text-sm text-[#38506A]">{label}</span>
              {defaultOff && <span className="text-xs text-[#A4B69A]">(default OFF)</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Projects Permissions */}
      <div>
        <h4 className="text-sm font-semibold text-[#38506A] mb-3">Projects</h4>
        <div className="space-y-2">
          {[
            { key: 'projects:view' as const, label: 'View Projects' },
            { key: 'projects:edit' as const, label: 'Edit Projects' },
            { key: 'projects:archive' as const, label: 'Archive Projects', defaultOff: true },
          ].map(({ key, label, defaultOff }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={() => handleToggle(key)}
                className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A]"
              />
              <span className="text-sm text-[#38506A]">{label}</span>
              {defaultOff && <span className="text-xs text-[#A4B69A]">(default OFF)</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Home Hub Permissions */}
      <div>
        <h4 className="text-sm font-semibold text-[#38506A] mb-3">Home Hub</h4>
        <div className="space-y-2">
          {[
            { key: 'home_hub:view_documents' as const, label: 'View Documents' },
            { key: 'home_hub:upload_documents' as const, label: 'Upload Documents' },
            { key: 'home_hub:edit_documents' as const, label: 'Edit Documents' },
            { key: 'home_hub:delete_documents' as const, label: 'Delete Documents', defaultOff: true },
          ].map(({ key, label, defaultOff }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={() => handleToggle(key)}
                className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A]"
              />
              <span className="text-sm text-[#38506A]">{label}</span>
              {defaultOff && <span className="text-xs text-[#A4B69A]">(default OFF)</span>}
            </label>
          ))}
        </div>
      </div>

      {/* Reports Permissions */}
      <div>
        <h4 className="text-sm font-semibold text-[#38506A] mb-3">Reports</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={permissions['reports:view']}
              onChange={() => handleToggle('reports:view')}
              className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A]"
            />
            <span className="text-sm text-[#38506A]">View Reports</span>
          </label>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <h4 className="text-sm font-semibold text-[#38506A] mb-3">Notifications</h4>
        <div className="space-y-2">
          {[
            { key: 'notifications:bcr_updates' as const, label: 'Receive BCR Updates' },
            { key: 'notifications:budget_alerts' as const, label: 'Receive Budget Alerts' },
            { key: 'notifications:maintenance_reminders' as const, label: 'Receive Maintenance Reminders' },
            { key: 'notifications:project_notifications' as const, label: 'Receive Project Notifications' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={permissions[key]}
                onChange={() => handleToggle(key)}
                className="h-4 w-4 rounded border-[#D8C3A5] bg-white text-[#38506A]"
              />
              <span className="text-sm text-[#38506A]">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
