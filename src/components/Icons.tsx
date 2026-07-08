/**
 * Vaultly Icons Component
 *
 * Unified icon system with type-safe icon names and variants.
 * Replaces multiple inline icon functions throughout the app.
 *
 * Usage:
 * import { Icon } from './components/Icons';
 *
 * <Icon name="home" />
 * <Icon name="budget" active={true} />
 * <Icon name="settings" className="h-6 w-6" stroke="#38506A" />
 */

import { ReactNode } from 'react';
import { colors } from '../design-system';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type IconName =
  | 'home'
  | 'budget'
  | 'bills'
  | 'projects'
  | 'calendar'
  | 'documents'
  | 'transactions'
  | 'reports'
  | 'settings'
  | 'profile';

export interface IconProps {
  name: IconName;
  className?: string;
  stroke?: string;
  fill?: string;
  active?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

// ============================================================================
// ICON SIZE PRESETS
// ============================================================================

const sizeMap = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
} as const;

// ============================================================================
// INDIVIDUAL ICON COMPONENTS
// ============================================================================

interface SVGIconProps {
  className?: string;
  stroke?: string;
  fill?: string;
}

export function HomeIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 10.5 12 4l8 6.5" />
      <path d="M7 9.5V20h10V9.5" />
    </svg>
  );
}

export function BudgetIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 13h3" />
      <path d="M8 9h8" />
      <path d="M8 17h5" />
    </svg>
  );
}

export function BillsIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="5" width="16" height="14" rx="2" />
      <path d="M8 9h8" />
      <path d="M8 13h5" />
      <path d="M8 17h3" />
    </svg>
  );
}

export function ProjectsIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="5" width="6" height="6" rx="1" />
      <rect x="14" y="5" width="6" height="6" rx="1" />
      <rect x="4" y="15" width="6" height="4" rx="1" />
      <rect x="14" y="15" width="6" height="4" rx="1" />
    </svg>
  );
}

export function CalendarIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4" />
      <path d="M16 3v4" />
      <path d="M4 10h16" />
    </svg>
  );
}

export function TransactionsIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M7 7h10" />
      <path d="m10 4 3-3 3 3" />
      <path d="M17 17H7" />
      <path d="m14 20-3 3-3-3" />
    </svg>
  );
}

export function ReportsIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 19V9" />
      <path d="M12 19V5" />
      <path d="M19 19v-7" />
    </svg>
  );
}

export function SettingsIcon({ className = 'h-5 w-5', stroke = colors.navyDark, fill = 'none' }: SVGIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19 12a7 7 0 0 0-.1-1l2-1.5-2-3.5-2.4 1a7.4 7.4 0 0 0-1.7-1l-.3-2.5h-4l-.3 2.5a7.4 7.4 0 0 0-1.7 1L5 6l-2 3.5 2 1.5a7 7 0 0 0 0 2l-2 1.5 2 3.5 2.4-1a7.4 7.4 0 0 0 1.7 1l.3 2.5h4l.3-2.5a7.4 7.4 0 0 0 1.7-1l2.4 1 2-3.5-2-1.5c.1-.3.1-.7.1-1Z" />
    </svg>
  );
}

// ============================================================================
// MAIN ICON COMPONENT (Type-Safe Router)
// ============================================================================

/**
 * Universal Icon component with type-safe icon name selection.
 * Handles sizing, styling, and active state.
 *
 * @param {IconProps} props - Icon configuration
 * @returns {ReactNode} - Rendered SVG icon
 *
 * @example
 * <Icon name="budget" />
 * <Icon name="home" active={true} className="h-6 w-6" />
 * <Icon name="settings" stroke="#38506A" />
 */
export function Icon({
  name,
  className,
  stroke,
  fill,
  active = false,
  size = 'md',
}: IconProps): ReactNode {
  // Determine sizing
  const sizeClass = size ? sizeMap[size] : 'h-5 w-5';
  const finalClassName = className || sizeClass;

  // Determine stroke color (white if active, navy if inactive)
  const finalStroke = stroke || (active ? '#ffffff' : colors.navyDark);

  // Router to appropriate icon component
  switch (name) {
    case 'home':
      return <HomeIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'budget':
      return <BudgetIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'bills':
      return <BillsIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'projects':
      return <ProjectsIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'calendar':
      return <CalendarIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'documents':
      return <BillsIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'transactions':
      return <TransactionsIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'reports':
      return <ReportsIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'settings':
      return <SettingsIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    case 'profile':
      return <TransactionsIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
    default:
      return <HomeIcon className={finalClassName} stroke={finalStroke} fill={fill} />;
  }
}

export default Icon;
