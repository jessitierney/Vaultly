import { MemberPermissions, DEFAULT_ADMIN_PERMISSIONS, UserRole } from '../types/permissions';

// ============================================================================
// PERMISSION HOOKS
// ============================================================================

/**
 * Hook to check if current user has a specific permission
 * In a real app, this would check the authenticated user's permissions from context/state
 */
export function usePermission(permission: keyof MemberPermissions): boolean {
  // TODO: Get actual permissions from auth context
  // For now, return admin permissions (all true)
  return DEFAULT_ADMIN_PERMISSIONS[permission];
}

/**
 * Hook to check if current user is an admin
 * In a real app, this would check the authenticated user's role from context/state
 */
export function useIsAdmin(): boolean {
  // TODO: Get actual role from auth context
  // For now, assume admin
  return true;
}

/**
 * Hook to get current user's role
 */
export function useUserRole(): UserRole {
  // TODO: Get actual role from auth context
  return 'Administrator';
}

/**
 * Hook to get current user's permissions
 */
export function useUserPermissions(): MemberPermissions {
  // TODO: Get actual permissions from auth context
  // For now, return admin permissions
  return DEFAULT_ADMIN_PERMISSIONS;
}

/**
 * Check if user can perform an action
 */
export function hasPermission(userRole: UserRole, permission: keyof MemberPermissions, userPermissions?: MemberPermissions): boolean {
  if (userRole === 'Administrator') {
    return true; // Admins have all permissions
  }

  // Members need explicit permission
  return userPermissions?.[permission] ?? false;
}

/**
 * Get visibility of an item based on user role and item visibility setting
 */
export function canViewItem(userRole: UserRole, itemVisibility: 'household' | 'admins_only'): boolean {
  if (itemVisibility === 'household') {
    return true; // Everyone can see household items
  }

  if (itemVisibility === 'admins_only') {
    return userRole === 'Administrator'; // Only admins can see admin-only items
  }

  return false;
}
