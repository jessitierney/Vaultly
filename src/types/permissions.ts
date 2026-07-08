// ============================================================================
// PERMISSIONS & ROLES SYSTEM
// ============================================================================

export type UserRole = 'Administrator' | 'Member';

export type Permission =
  // Budget Permissions
  | 'budget:view'
  | 'budget:view_expenses'
  | 'budget:view_income'
  | 'budget:notifications'
  | 'budget:edit'
  // Calendar Permissions
  | 'calendar:view'
  | 'calendar:add_events'
  | 'calendar:edit_events'
  | 'calendar:delete_events'
  | 'calendar:notifications'
  // Projects Permissions
  | 'projects:view'
  | 'projects:edit'
  | 'projects:archive'
  // Home Hub Permissions
  | 'home_hub:view_documents'
  | 'home_hub:upload_documents'
  | 'home_hub:edit_documents'
  | 'home_hub:delete_documents'
  // Reports Permissions
  | 'reports:view'
  // Notifications
  | 'notifications:bcr_updates'
  | 'notifications:budget_alerts'
  | 'notifications:maintenance_reminders'
  | 'notifications:project_notifications'
  // Admin Permissions
  | 'admin:edit_household'
  | 'admin:edit_budget'
  | 'admin:delete_calendar_events'
  | 'admin:silence_notifications'
  | 'admin:edit_permissions'
  | 'admin:manage_profiles'
  | 'admin:manage_visibility';

export interface MemberPermissions {
  // Budget
  'budget:view': boolean;
  'budget:view_expenses': boolean;
  'budget:view_income': boolean;
  'budget:notifications': boolean;
  'budget:edit': boolean;
  // Calendar
  'calendar:view': boolean;
  'calendar:add_events': boolean;
  'calendar:edit_events': boolean;
  'calendar:delete_events': boolean;
  'calendar:notifications': boolean;
  // Projects
  'projects:view': boolean;
  'projects:edit': boolean;
  'projects:archive': boolean;
  // Home Hub
  'home_hub:view_documents': boolean;
  'home_hub:upload_documents': boolean;
  'home_hub:edit_documents': boolean;
  'home_hub:delete_documents': boolean;
  // Reports
  'reports:view': boolean;
  // Notifications
  'notifications:bcr_updates': boolean;
  'notifications:budget_alerts': boolean;
  'notifications:maintenance_reminders': boolean;
  'notifications:project_notifications': boolean;
}

export interface FamilyProfile {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: string;
  relationship: string;
  email: string;
  role: UserRole;
  permissions: MemberPermissions;
  isVisible: boolean; // Can this member see household data?
  createdAt: string;
}

// Default permissions for new Members
export const DEFAULT_MEMBER_PERMISSIONS: MemberPermissions = {
  // Budget - view only by default
  'budget:view': true,
  'budget:view_expenses': true,
  'budget:view_income': true,
  'budget:notifications': true,
  'budget:edit': false,
  // Calendar - can view and add, not delete
  'calendar:view': true,
  'calendar:add_events': true,
  'calendar:edit_events': false,
  'calendar:delete_events': false,
  'calendar:notifications': true,
  // Projects - view only
  'projects:view': true,
  'projects:edit': false,
  'projects:archive': false,
  // Home Hub - view and upload only
  'home_hub:view_documents': true,
  'home_hub:upload_documents': true,
  'home_hub:edit_documents': false,
  'home_hub:delete_documents': false,
  // Reports - view only
  'reports:view': true,
  // Notifications - all enabled
  'notifications:bcr_updates': true,
  'notifications:budget_alerts': true,
  'notifications:maintenance_reminders': true,
  'notifications:project_notifications': true,
};

// Default permissions for Administrators (all permissions)
export const DEFAULT_ADMIN_PERMISSIONS: MemberPermissions = {
  'budget:view': true,
  'budget:view_expenses': true,
  'budget:view_income': true,
  'budget:notifications': true,
  'budget:edit': true,
  'calendar:view': true,
  'calendar:add_events': true,
  'calendar:edit_events': true,
  'calendar:delete_events': true,
  'calendar:notifications': true,
  'projects:view': true,
  'projects:edit': true,
  'projects:archive': true,
  'home_hub:view_documents': true,
  'home_hub:upload_documents': true,
  'home_hub:edit_documents': true,
  'home_hub:delete_documents': true,
  'reports:view': true,
  'notifications:bcr_updates': true,
  'notifications:budget_alerts': true,
  'notifications:maintenance_reminders': true,
  'notifications:project_notifications': true,
};

export type VisibilityLevel = 'household' | 'admins_only' | 'private';

export interface VisibilitySettings {
  level: VisibilityLevel; // 'household', 'admins_only', or 'private' (future)
  editableBy?: 'creator' | 'admins'; // Who can edit this item
}
