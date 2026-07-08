# Vaultly Core Data Model

## Hierarchy

```
Household (root entity)
├── Members
│   ├── Profile
│   ├── Roles & Permissions
│   └── Activity
├── Income Streams
│   ├── Salary
│   ├── Casual/Roster
│   ├── Partner
│   └── Other Income
├── Accounts
│   └── Account Settings
├── Budget
│   ├── Income forecast
│   ├── Monthly allocation
│   └── Spending categories
├── Bills
│   ├── Recurring bills
│   ├── One-time bills
│   └── Payment tracking
├── Projects
│   ├── Budget
│   ├── Timeline
│   ├── Documents
│   ├── Tasks
│   └── Contractors
├── Documents (Home Hub)
│   ├── Receipts
│   ├── Warranties
│   ├── Manuals
│   ├── Insurance
│   ├── Vehicles
│   ├── Pets
│   ├── Maintenance
│   ├── Certificates
│   └── Other
├── Calendar
│   ├── Bills due
│   ├── Projects
│   ├── Maintenance
│   ├── Renewals
│   ├── Birthdays
│   └── Appointments
├── Wishlist
│   ├── Planned purchases
│   └── Target dates
└── Household Feed
    ├── BCR Activities (automatic)
    └── Family Posts (manual)
```

## Entity Definitions

### Household

```typescript
interface Household {
  id: string;
  name: string;
  createdAt: timestamp;
  currency: string; // e.g., "USD"
  timezone: string;
  members: Member[];
  settings: HouseholdSettings;
  logo?: string;
  backgroundImage?: string;
}
```

### Member

```typescript
interface Member {
  id: string;
  householdId: string;
  name: string;
  email: string;
  role: 'admin' | 'contributor' | 'viewer';
  permissions: Permission[];
  avatar?: string;
  joinedAt: timestamp;
  isActive: boolean;
}
```

### Permission

```typescript
type Permission = 
  | 'view_all'
  | 'edit_budget'
  | 'edit_projects'
  | 'edit_documents'
  | 'add_members'
  | 'delete_members'
  | 'edit_settings'
  | 'view_reports';
```

### IncomeStream

```typescript
interface IncomeStream {
  id: string;
  householdId: string;
  memberId: string;
  name: string;
  type: 'salary' | 'casual' | 'partner' | 'other';
  amount: number;
  frequency: 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'yearly' | 'irregular';
  nextPayDate?: date;
  isRecurring: boolean;
  notes: string;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### Bill

```typescript
interface Bill {
  id: string;
  householdId: string;
  name: string;
  amount: number;
  dueDate: date;
  frequency: 'once' | 'weekly' | 'fortnightly' | 'monthly' | 'quarterly' | 'yearly';
  category: string;
  payee?: string;
  accountNumber?: string;
  isPaid: boolean;
  notes: string;
  linkedProjectId?: string;
  linkedDocumentIds: string[];
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### Project

```typescript
interface Project {
  id: string;
  householdId: string;
  name: string;
  description: string;
  budget: number;
  spent: number;
  startDate: date;
  expectedCompletionDate: date;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold';
  stage: string;
  notes: string;
  contractors: Contractor[];
  documents: Document[];
  tasks: Task[];
  timeline: TimelineEvent[];
  documents: Document[];
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### Document

```typescript
interface Document {
  id: string;
  householdId: string;
  name: string;
  type: 'receipt' | 'warranty' | 'manual' | 'invoice' | 'insurance' | 'maintenance' | 'certificate' | 'vehicle' | 'pet' | 'other';
  category: string;
  amount?: number;
  supplier?: string;
  purchaseDate?: date;
  warrantyExpiryDate?: date;
  fileUrl: string;
  fileSize: number;
  uploadDate: timestamp;
  linkedProjectId?: string;
  linkedBillId?: string;
  linkedWishlistId?: string;
  tags: string[];
  notes: string;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### WishlistItem

```typescript
interface WishlistItem {
  id: string;
  householdId: string;
  title: string;
  description: string;
  targetAmount?: number;
  currentAmount?: number;
  targetPurchaseDate?: date;
  priority: 'low' | 'medium' | 'high';
  status: 'planned' | 'in_progress' | 'purchased' | 'completed';
  linkedDocumentIds: string[];
  notes: string;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### CalendarEvent

```typescript
interface CalendarEvent {
  id: string;
  householdId: string;
  title: string;
  description: string;
  type: 'bill' | 'project' | 'maintenance' | 'renewal' | 'birthday' | 'appointment' | 'task' | 'reminder';
  startDate: date;
  endDate?: date;
  time?: time;
  location?: string;
  linkedBillId?: string;
  linkedProjectId?: string;
  linkedDocumentId?: string;
  linkedWishlistId?: string;
  reminderDays: number;
  isRecurring: boolean;
  recurrencePattern?: string;
  createdAt: timestamp;
  updatedAt: timestamp;
}
```

### HouseholdFeedPost

```typescript
interface HouseholdFeedPost {
  id: string;
  householdId: string;
  type: 'bcr_activity' | 'family_post';
  
  // BCR Activity
  bcr?: {
    action: string;
    entity: string;
    entityId: string;
    details: Record<string, any>;
  };
  
  // Family Post
  family?: {
    memberId: string;
    memberName: string;
    content: string;
    imageUrls: string[];
    conversions: Array<{
      type: 'task' | 'reminder' | 'shopping' | 'project' | 'wishlist' | 'calendar';
      createdEntityId: string;
    }>;
  };
  
  createdAt: timestamp;
  linkedEntityIds: string[];
}
```

## Data Flow Rules

1. **Single Source of Truth:** No data duplication. Every piece of information stored once.
2. **Automatic Linking:** When a document is uploaded, BCR automatically links it to relevant entities.
3. **Cascade Updates:** When an entity is modified, all linked entities reflect the changes.
4. **Activity Tracking:** Every change logged to Household Feed for transparency.
5. **Referential Integrity:** Foreign keys enforce relationships.

## Linking Rules

| From | To | Auto-Linked By |
|------|-----|-----------------|
| Receipt | Project | BCR (amount match) |
| Receipt | Budget | BCR (date match) |
| Warranty | Calendar | BCR (expiry date) |
| Document | Dashboard | BCR (recent files) |
| Bill | Calendar | System (due date) |
| Project | Dashboard | System (progress) |
| WishlistItem | Calendar | System (target date) |

## Current Implementation Status

### Implemented ✅
- User (Member)
- Household (basic)
- IncomeStream
- Bill
- WishlistItem
- Document
- CalendarEvent
- HouseholdFeedPost (Activity)

### Partially Implemented 🟡
- Document (no type recognition)
- Project (no contractors/timeline)
- Member (no roles/permissions)

### Not Yet Implemented ❌
- Forgot Password flow
- Profile editing
- Household settings
- Family posts UI
- BCR automation
- Home Hub
- Reports
