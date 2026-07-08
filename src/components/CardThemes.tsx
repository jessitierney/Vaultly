import React from 'react';
import { VaultlyIcon } from './common/VaultlyIcon';

export type CardThemeType = 'income' | 'expenses' | 'bills' | 'savings' | 'neutral' | 'highlight' | 'secondary';

export interface CardThemeProps {
  children: React.ReactNode;
  className?: string;
}

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
  onClick?: () => void;
}

const BaseCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <div className={`bg-white border border-[#E8DDCC] rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}>
    {children}
  </div>
);

export const IncomeCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <BaseCard className={className}>{children}</BaseCard>
);

export const ExpensesCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <BaseCard className={className}>{children}</BaseCard>
);

export const BillsCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <BaseCard className={className}>{children}</BaseCard>
);

export const SavingsCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <BaseCard className={className}>{children}</BaseCard>
);

export const NeutralCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <BaseCard className={className}>{children}</BaseCard>
);

export const HighlightCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <BaseCard className={className}>{children}</BaseCard>
);

export const SecondaryCard: React.FC<CardThemeProps> = ({ children, className = '' }) => (
  <BaseCard className={className}>{children}</BaseCard>
);

export const IncomeStatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtitle,
  trend,
  trendValue,
  className = '',
  onClick,
}) => {
  const displayIcon = icon || <VaultlyIcon name="finance" size="lg" />;
  return (
    <IncomeCard className={`cursor-pointer ${className}`}>
      <div onClick={onClick} className="h-full">
        {displayIcon && <div className="mb-3 flex items-center" style={{ color: '#A4B69A' }}>{displayIcon}</div>}
        <div className="text-vaultly-navy">
          <p className="text-sm font-medium opacity-75 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{label}</p>
          <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: '#38506A' }}>${value}</p>
          {subtitle && <p className="text-xs opacity-60" style={{ fontFamily: 'Montserrat, sans-serif' }}>{subtitle}</p>}
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 ${trend === 'up' ? 'text-green-700' : trend === 'down' ? 'text-red-700' : 'text-vaultly-navy'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {trend === 'up' ? String.fromCharCode(8593) : trend === 'down' ? String.fromCharCode(8595) : String.fromCharCode(8594)} {trendValue}
            </p>
          )}
        </div>
      </div>
    </IncomeCard>
  );
};

export const ExpensesStatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtitle,
  trend,
  trendValue,
  className = '',
  onClick,
}) => {
  const displayIcon = icon || <VaultlyIcon name="finance" size="lg" />;
  return (
    <ExpensesCard className={`cursor-pointer ${className}`}>
      <div onClick={onClick} className="h-full">
        {displayIcon && <div className="mb-3 flex items-center" style={{ color: '#C86B4A' }}>{displayIcon}</div>}
        <div className="text-vaultly-navy">
          <p className="text-sm font-medium opacity-75 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{label}</p>
          <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: '#38506A' }}>${value}</p>
          {subtitle && <p className="text-xs opacity-60" style={{ fontFamily: 'Montserrat, sans-serif' }}>{subtitle}</p>}
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 ${trend === 'up' ? 'text-red-700' : trend === 'down' ? 'text-green-700' : 'text-vaultly-navy'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {trend === 'up' ? String.fromCharCode(8593) : trend === 'down' ? String.fromCharCode(8595) : String.fromCharCode(8594)} {trendValue}
            </p>
          )}
        </div>
      </div>
    </ExpensesCard>
  );
};

export const BillsStatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtitle,
  trend,
  trendValue,
  className = '',
  onClick,
}) => {
  const displayIcon = icon || <VaultlyIcon name="bills" size="lg" />;
  return (
    <BillsCard className={`cursor-pointer ${className}`}>
      <div onClick={onClick} className="h-full">
        {displayIcon && <div className="mb-3 flex items-center" style={{ color: '#38506A' }}>{displayIcon}</div>}
        <div className="text-vaultly-navy">
          <p className="text-sm font-medium opacity-75 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{label}</p>
          <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: '#38506A' }}>${value}</p>
          {subtitle && <p className="text-xs opacity-60" style={{ fontFamily: 'Montserrat, sans-serif' }}>{subtitle}</p>}
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 ${trend === 'up' ? 'text-green-700' : trend === 'down' ? 'text-red-700' : 'text-vaultly-navy'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {trend === 'up' ? String.fromCharCode(8593) : trend === 'down' ? String.fromCharCode(8595) : String.fromCharCode(8594)} {trendValue}
            </p>
          )}
        </div>
      </div>
    </BillsCard>
  );
};

export const SavingsStatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtitle,
  trend,
  trendValue,
  className = '',
  onClick,
}) => {
  const displayIcon = icon || <VaultlyIcon name="finance" size="lg" />;
  return (
    <SavingsCard className={`cursor-pointer ${className}`}>
      <div onClick={onClick} className="h-full">
        {displayIcon && <div className="mb-3 flex items-center" style={{ color: '#E0B14D' }}>{displayIcon}</div>}
        <div className="text-vaultly-navy">
          <p className="text-sm font-medium opacity-75 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{label}</p>
          <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: '#38506A' }}>${value}</p>
          {subtitle && <p className="text-xs opacity-60" style={{ fontFamily: 'Montserrat, sans-serif' }}>{subtitle}</p>}
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 ${trend === 'up' ? 'text-green-700' : trend === 'down' ? 'text-red-700' : 'text-vaultly-navy'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {trend === 'up' ? String.fromCharCode(8593) : trend === 'down' ? String.fromCharCode(8595) : String.fromCharCode(8594)} {trendValue}
            </p>
          )}
        </div>
      </div>
    </SavingsCard>
  );
};

export const NeutralStatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtitle,
  trend,
  trendValue,
  className = '',
  onClick,
}) => {
  const displayIcon = icon || <VaultlyIcon name="finance" size="lg" />;
  return (
    <NeutralCard className={`cursor-pointer ${className}`}>
      <div onClick={onClick} className="h-full">
        {displayIcon && <div className="mb-3 flex items-center" style={{ color: '#38506A' }}>{displayIcon}</div>}
        <div className="text-vaultly-navy">
          <p className="text-sm font-medium opacity-75 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{label}</p>
          <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: '#38506A' }}>${value}</p>
          {subtitle && <p className="text-xs opacity-60" style={{ fontFamily: 'Montserrat, sans-serif' }}>{subtitle}</p>}
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 ${trend === 'up' ? 'text-green-700' : trend === 'down' ? 'text-red-700' : 'text-vaultly-navy'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {trend === 'up' ? String.fromCharCode(8593) : trend === 'down' ? String.fromCharCode(8595) : String.fromCharCode(8594)} {trendValue}
            </p>
          )}
        </div>
      </div>
    </NeutralCard>
  );
};

export const HighlightStatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon,
  subtitle,
  trend,
  trendValue,
  className = '',
  onClick,
}) => {
  const displayIcon = icon || <VaultlyIcon name="notifications" size="lg" />;
  return (
    <HighlightCard className={`cursor-pointer ${className}`}>
      <div onClick={onClick} className="h-full">
        {displayIcon && <div className="mb-3 flex items-center" style={{ color: '#38506A' }}>{displayIcon}</div>}
        <div className="text-vaultly-navy">
          <p className="text-sm font-medium opacity-75 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>{label}</p>
          <p className="text-3xl font-bold mb-2" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', color: '#38506A' }}>${value}</p>
          {subtitle && <p className="text-xs opacity-60" style={{ fontFamily: 'Montserrat, sans-serif' }}>{subtitle}</p>}
          {trend && trendValue && (
            <p className={`text-xs font-medium mt-2 ${trend === 'up' ? 'text-green-700' : trend === 'down' ? 'text-red-700' : 'text-vaultly-navy'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {trend === 'up' ? String.fromCharCode(8593) : trend === 'down' ? String.fromCharCode(8595) : String.fromCharCode(8594)} {trendValue}
            </p>
          )}
        </div>
      </div>
    </HighlightCard>
  );
};

export const getCardTheme = (type: CardThemeType) => {
  switch (type) {
    case 'income':
      return IncomeCard;
    case 'expenses':
      return ExpensesCard;
    case 'bills':
      return BillsCard;
    case 'savings':
      return SavingsCard;
    case 'highlight':
      return HighlightCard;
    case 'secondary':
      return SecondaryCard;
    case 'neutral':
    default:
      return NeutralCard;
  }
};

export const getStatCardTheme = (type: CardThemeType) => {
  switch (type) {
    case 'income':
      return IncomeStatCard;
    case 'expenses':
      return ExpensesStatCard;
    case 'bills':
      return BillsStatCard;
    case 'savings':
      return SavingsStatCard;
    case 'highlight':
      return HighlightStatCard;
    case 'secondary':
      return SecondaryCard;
    case 'neutral':
    default:
      return NeutralStatCard;
  }
};
