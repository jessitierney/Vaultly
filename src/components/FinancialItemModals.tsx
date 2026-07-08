import React, { useState } from 'react';
import { FinancialItemFormLayout, FinancialItemAdvancedOptions } from './FinancialItemFormWrapper';
import { DEFAULT_FINANCIAL_ITEM_VALUES } from '../types/financialItems';

// Close icon component
const CloseIcon = ({ size = 20, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// EXAMPLE: ADD INCOME MODAL
// ============================================================================

/**
 * Example modal for adding an income stream
 * This demonstrates the reusable pattern for all financial item forms
 */
export function AddIncomeModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (income: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    contributor: '',
    type: 'Salary' as const,
    frequency: 'Fortnightly' as const,
    amount: '',
    notes: '',
    status: 'Active' as const,
    linkedAccountId: undefined as number | undefined,
    recurring: DEFAULT_FINANCIAL_ITEM_VALUES.recurring,
    reminders: DEFAULT_FINANCIAL_ITEM_VALUES.reminders,
    showInCalendar: DEFAULT_FINANCIAL_ITEM_VALUES.addedToCalendar,
    visibility: DEFAULT_FINANCIAL_ITEM_VALUES.visibility,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate save delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // In a real app, this would:
    // ✓ Save the item
    // ✓ Add to Calendar
    // ✓ Include in Forecast
    // ✓ Include in Reports
    // ✓ Include in Household Readiness
    // ✓ Link to Account
    // ✓ Allow BCR to monitor

    onSave(formData);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-vaultly-grey px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-vaultly-navy">💰 Add Income Stream</h2>
            <p className="text-sm text-vaultly-sage">Create a new income source for your household</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-vaultly-cream rounded-lg transition-colors text-vaultly-sage"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <FinancialItemFormLayout
            title=""
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            linkedAccountId={formData.linkedAccountId}
            onAccountChange={(id) => setFormData({ ...formData, linkedAccountId: id })}
          >
            {/* Essential Fields (Always Visible) */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-vaultly-sage mb-2">Income Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Primary Salary, Casual Work"
                  className="w-full px-3 py-2 rounded-lg border border-vaultly-grey bg-white text-vaultly-navy placeholder-vaultly-sage focus:border-vaultly-navy focus:outline-none focus:ring-2 focus:ring-vaultly-navy/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-vaultly-sage mb-2">Contributor *</label>
                <input
                  type="text"
                  value={formData.contributor}
                  onChange={(e) => setFormData({ ...formData, contributor: e.target.value })}
                  placeholder="e.g., Jessica, Partner"
                  className="w-full px-3 py-2 rounded-lg border border-vaultly-grey bg-white text-vaultly-navy placeholder-vaultly-sage focus:border-vaultly-navy focus:outline-none focus:ring-2 focus:ring-vaultly-navy/20 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-vaultly-sage mb-2">Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-vaultly-grey bg-white text-vaultly-navy focus:border-vaultly-navy focus:outline-none focus:ring-2 focus:ring-vaultly-navy/20 transition-all"
                  >
                    <option value="Salary">Salary</option>
                    <option value="Hourly">Hourly</option>
                    <option value="Roster">Roster</option>
                    <option value="Casual">Casual</option>
                    <option value="Business">Business</option>
                    <option value="Government">Government</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Frequency *</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Amount *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4B69A]">$</span>
                  <input
                    type="number"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-7 pr-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] placeholder-[#A4B69A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Notes (optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Add any notes about this income stream"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] placeholder-[#A4B69A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all resize-none"
                />
              </div>
            </div>

            {/* Advanced Options Section */}
            <FinancialItemAdvancedOptions
              recurringSettings={formData.recurring}
              onRecurringChange={(recurring) => setFormData({ ...formData, recurring })}
              reminderSettings={formData.reminders}
              onReminderChange={(reminders) => setFormData({ ...formData, reminders })}
              showInCalendar={formData.showInCalendar}
              onCalendarChange={(showInCalendar) => setFormData({ ...formData, showInCalendar })}
              visibility={formData.visibility}
              onVisibilityChange={(visibility) => setFormData({ ...formData, visibility })}
            />
          </FinancialItemFormLayout>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE: ADD BILL MODAL
// ============================================================================

/**
 * Example modal for adding a bill
 * Same pattern as income - shows reusability
 */
export function AddBillModal({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: (bill: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Utilities' as const,
    dueDate: new Date().toISOString().split('T')[0],
    frequency: 'Monthly' as const,
    amount: '',
    linkedAccountId: undefined as number | undefined,
    recurring: DEFAULT_FINANCIAL_ITEM_VALUES.recurring,
    reminders: DEFAULT_FINANCIAL_ITEM_VALUES.reminders,
    showInCalendar: DEFAULT_FINANCIAL_ITEM_VALUES.addedToCalendar,
    visibility: DEFAULT_FINANCIAL_ITEM_VALUES.visibility,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave(formData);
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E7DED2] px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#38506A]">📄 Add Bill</h2>
            <p className="text-sm text-[#A4B69A]">Create a new bill or recurring payment</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#FAF8F5] rounded-lg transition-colors text-[#A4B69A]"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6">
          <FinancialItemFormLayout
            title=""
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            linkedAccountId={formData.linkedAccountId}
            onAccountChange={(id) => setFormData({ ...formData, linkedAccountId: id })}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Bill Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Electricity, Internet, Mortgage"
                  className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] placeholder-[#A4B69A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                >
                  <option value="Mortgage">Mortgage</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Insurance">Insurance</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Transport">Transport</option>
                  <option value="Medical">Medical</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Due Date *</label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Frequency *</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                  >
                    <option value="Weekly">Weekly</option>
                    <option value="Fortnightly">Fortnightly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Yearly">Yearly</option>
                    <option value="One-off">One-off</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#A4B69A] mb-2">Amount *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A4B69A]">$</span>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full pl-7 pr-3 py-2 rounded-lg border border-[#E7DED2] bg-white text-[#38506A] placeholder-[#A4B69A] focus:border-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]/20 transition-all"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Options */}
            <FinancialItemAdvancedOptions
              recurringSettings={formData.recurring}
              onRecurringChange={(recurring) => setFormData({ ...formData, recurring })}
              reminderSettings={formData.reminders}
              onReminderChange={(reminders) => setFormData({ ...formData, reminders })}
              showInCalendar={formData.showInCalendar}
              onCalendarChange={(showInCalendar) => setFormData({ ...formData, showInCalendar })}
              visibility={formData.visibility}
              onVisibilityChange={(visibility) => setFormData({ ...formData, visibility })}
            />
          </FinancialItemFormLayout>
        </div>
      </div>
    </div>
  );
}
