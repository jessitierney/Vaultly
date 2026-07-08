# Financial Items Architecture - Vaultly

## Overview

This document describes the permanent behavior for all financial items in Vaultly.

This behavior pattern is used by:
- Budget Module (Income, Bills, Expenses, Sinking Funds, Savings Goals)
- Calendar (integrates financial items)
- Reports (includes financial data)
- BCR (monitors financial items)
- Forecast (calculates projections)
- Household Readiness Score

## Default Behavior

When a user creates any financial item (Income, Bill, Expense, Sinking Fund, Savings Goal), Vaultly automatically:

✓ Saves the item
✓ Adds it to the Household Calendar
✓ Includes it in Forecast calculations
✓ Includes it in Reports
✓ Includes it in Household Readiness calculations
✓ Links it to the selected Account
✓ Allows BCR to monitor the item

**The user does NOT need to manually enable these features.**

## Architecture

### Core Types

**`FinancialItemBase`** (`src/types/financialItems.ts`)
- Base interface for all financial items
- Contains all metadata needed for automatic behavior
- Properties:
  - `addedToCalendar` (default: true)
  - `includedInForecast` (default: true)
  - `includedInReports` (default: true)
  - `affectsHouseholdReadiness` (default: true)
  - `bcrMonitored` (default: true)
  - Recurring settings
  - Reminder settings
  - Visibility & permissions
  - BCR metadata

### Reusable Components

#### 1. **AdvancedOptionsWrapper**
Collapsed section containing advanced settings. Expands on click.

```tsx
import { AdvancedOptionsWrapper } from '@/components/FinancialFormComponents';

<AdvancedOptionsWrapper>
  {/* Content here - only visible when expanded */}
</AdvancedOptionsWrapper>
```

#### 2. **RecurringSettingsComponent**
Frequency, Start Date, End options.

```tsx
import { RecurringSettingsComponent } from '@/components/FinancialFormComponents';

const [recurring, setRecurring] = useState({
  isRecurring: false,
});

<RecurringSettingsComponent 
  value={recurring} 
  onChange={setRecurring} 
/>
```

#### 3. **ReminderSettingsComponent**
Notification timing settings.

```tsx
import { ReminderSettingsComponent } from '@/components/FinancialFormComponents';

const [reminders, setReminders] = useState({
  enabled: true,
  timing: 'OneWeekBefore',
});

<ReminderSettingsComponent 
  value={reminders} 
  onChange={setReminders} 
/>
```

#### 4. **CalendarVisibilitySettingsComponent**
Show in Calendar + Visibility controls (admin only).

```tsx
import { CalendarVisibilitySettingsComponent } from '@/components/FinancialFormComponents';

<CalendarVisibilitySettingsComponent
  value={{ showInCalendar: true, visibility: 'household' }}
  onChange={handleChange}
  isAdmin={true}
/>
```

#### 5. **PermissionTogglesComponent**
Reusable permission toggles for family members.

```tsx
import { PermissionTogglesComponent } from '@/components/FinancialFormComponents';

<PermissionTogglesComponent 
  permissions={memberPermissions} 
  onChange={setPermissions} 
/>
```

### Form Components

#### **FinancialItemFormLayout**
Main form wrapper for all financial item forms.

```tsx
import { FinancialItemFormLayout } from '@/components/FinancialItemFormWrapper';

<FinancialItemFormLayout
  title="Add Income Stream"
  description="Create a new income source"
  onSubmit={handleSubmit}
  isSubmitting={isSubmitting}
  linkedAccountId={accountId}
  onAccountChange={setAccountId}
>
  {/* Your form fields */}
</FinancialItemFormLayout>
```

#### **FinancialItemAdvancedOptions**
Complete advanced options section.

```tsx
import { FinancialItemAdvancedOptions } from '@/components/FinancialItemFormWrapper';

<FinancialItemAdvancedOptions
  recurringSettings={recurring}
  onRecurringChange={setRecurring}
  reminderSettings={reminders}
  onReminderChange={setReminders}
  showInCalendar={showInCalendar}
  onCalendarChange={setShowInCalendar}
  visibility={visibility}
  onVisibilityChange={setVisibility}
/>
```

### Example Modals

Two example modals are provided:

1. **AddIncomeModal** - Complete example for adding income
2. **AddBillModal** - Complete example for adding bills

These demonstrate the reusable pattern that should be replicated for:
- Expenses
- Sinking Funds
- Savings Goals

## Permissions System

### Roles

Vaultly has only **two roles**:
- **Administrator** - Full access to everything
- **Member** - Access controlled by permissions

### Permission Categories

Each category has independent toggles:

**Budget**
- View Budget
- View Expenses
- View Income
- Receive Budget Notifications
- Edit Budget (default OFF)

**Calendar**
- View Calendar
- Add Calendar Events
- Edit Calendar Events
- Delete Calendar Events (default OFF)
- Receive Calendar Notifications

**Projects**
- View Projects
- Edit Projects
- Archive Projects (default OFF)

**Home Hub**
- View Documents
- Upload Documents
- Edit Documents
- Delete Documents (default OFF)

**Reports**
- View Reports

**Notifications**
- Receive BCR Updates
- Receive Budget Alerts
- Receive Maintenance Reminders
- Receive Project Notifications

## BCR Automation

When a financial item is created, BCR automatically:

```
Item Created
    ↓
Added to Calendar
    ↓
Linked to Account
    ↓
Added to Forecast
    ↓
Added to Reports
    ↓
Included in Household Readiness
    ↓
Posted to Home Feed (if visible)
```

This happens **automatically**. No manual configuration needed.

## Visibility Settings

Items can have different visibility levels:

- **Household** (default) - Visible to all household members
- **Admins Only** - Visible only to administrators
- **Private** (future) - Visible only to creator (when personal profiles implemented)

Administrators can control who sees what items.

## Permission Hooks

Use these hooks to check permissions:

```tsx
import { 
  usePermission, 
  useIsAdmin, 
  useUserRole,
  hasPermission 
} from '@/hooks/usePermissions';

// Check specific permission
const canEditBudget = usePermission('budget:edit');

// Check if admin
const isAdmin = useIsAdmin();

// Get user role
const role = useUserRole();

// Check permission with explicit parameters
const canView = hasPermission(role, 'budget:view', permissions);
```

## Usage Pattern

### Creating a New Financial Item Form

1. Import components:
```tsx
import { FinancialItemFormLayout, FinancialItemAdvancedOptions } from '@/components/FinancialItemFormWrapper';
import { DEFAULT_FINANCIAL_ITEM_VALUES } from '@/types/financialItems';
```

2. Create form state:
```tsx
const [formData, setFormData] = useState({
  // Your fields here
  linkedAccountId: undefined,
  recurring: DEFAULT_FINANCIAL_ITEM_VALUES.recurring,
  reminders: DEFAULT_FINANCIAL_ITEM_VALUES.reminders,
  showInCalendar: DEFAULT_FINANCIAL_ITEM_VALUES.addedToCalendar,
  visibility: DEFAULT_FINANCIAL_ITEM_VALUES.visibility,
});
```

3. Build the form:
```tsx
<FinancialItemFormLayout onSubmit={handleSubmit}>
  {/* Essential fields */}
  
  <FinancialItemAdvancedOptions
    recurringSettings={formData.recurring}
    onRecurringChange={...}
    reminderSettings={formData.reminders}
    onReminderChange={...}
    showInCalendar={formData.showInCalendar}
    onCalendarChange={...}
    visibility={formData.visibility}
    onVisibilityChange={...}
  />
</FinancialItemFormLayout>
```

4. On save, ensure automatic behaviors:
```tsx
// When user clicks Save, automatically:
await saveFinancialItem({
  ...formData,
  addedToCalendar: true,           // ✓ Auto
  includedInForecast: true,        // ✓ Auto
  includedInReports: true,         // ✓ Auto
  affectsHouseholdReadiness: true, // ✓ Auto
  bcrMonitored: true,              // ✓ Auto
  linkedAccountId: formData.linkedAccountId, // ✓ Auto
});
```

## Design System

All components follow the Vaultly Design System:

- **Colors**: Navy, Cream, Sage, Terracotta
- **Spacing**: Premium padding/margins
- **Cards**: Rounded corners, soft shadows
- **Typography**: DM Sans (headings), Montserrat (body)
- **Icons**: Lucide outline icons
- **Responsiveness**: Mobile-first, responsive grids
- **Feel**: Clean, calm, effortless

## Storage

Currently storing data locally. Future migration to Supabase:

```typescript
// Local storage key
const STORAGE_KEY = 'vaultly_state_v1';

// Structure
{
  financialItems: {
    income: [],
    bills: [],
    expenses: [],
    sinkingFunds: [],
    savingsGoals: []
  }
}
```

## Next Steps

1. Integrate these components into Budget Module
2. Create Add/Edit/Delete modals for each item type
3. Implement BCR automation logic
4. Connect Calendar integration
5. Connect Reports integration
6. Implement Household Readiness calculations
7. Migrate to Supabase (future)
