import { useState } from 'react';
import {
  IncomeStatCard,
  ExpensesStatCard,
  NeutralStatCard,
  SavingsStatCard,
  NeutralCard,
  HighlightCard,
  IncomeCard,
  BillsCard,
  ExpensesCard,
} from './CardThemes';
import { VaultlyIcon } from './common/VaultlyIcon';

// ============================================================================
// TYPES
// ============================================================================

export type IncomeType = 'Salary' | 'Hourly' | 'Roster' | 'Casual' | 'Business' | 'Government' | 'Other';
export type BillFrequency = 'Weekly' | 'Fortnightly' | 'Monthly' | 'Quarterly' | 'Yearly' | 'One-off';
export type AccountType = 'Everyday' | 'Mortgage Offset' | 'Savings' | 'Emergency' | 'Holiday' | 'Renovation' | 'Cash' | 'Credit Card';
export type ExpenseCategory = 'Mortgage' | 'Utilities' | 'Groceries' | 'Transport' | 'Insurance' | 'Medical' | 'Pets' | 'Children' | 'Entertainment' | 'Savings' | 'Projects' | 'Other';
export type TransactionType = 'Income' | 'Expense' | 'Bill' | 'Transfer';

export interface IncomeStream {
  id: number;
  name: string;
  contributor: string;
  type: IncomeType;
  frequency: BillFrequency;
  amount: number;
  linkedAccount?: number;
  notes: string;
  status: 'Active' | 'Inactive';
}

export interface BudgetAccount {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  availableFunds: number;
  linkedBills: number[];
  linkedGoals: number[];
  linkedExpenses: number[];
  linkedIncome: number[];
}

export interface Bill {
  id: number;
  name: string;
  category: ExpenseCategory;
  dueDate: string;
  frequency: BillFrequency;
  amount: number;
  account: string;
  status: 'Upcoming' | 'Paid' | 'Overdue';
  receiptLink?: number;
  calendarLink?: number;
  projectLink?: number;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  account: string;
  linkedReceipt?: number;
  linkedProject?: number;
  notes: string;
  archived: boolean;
}

export interface Transaction {
  id: number;
  type: TransactionType;
  description: string;
  amount: number;
  date: string;
  category: string;
  account: string;
  receiptReference?: string;
  notes: string;
}

export interface SinkingFund {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  contributionFrequency: BillFrequency;
  linkedAccount?: number;
  forecastCompletion?: string;
}

export interface SavingsGoal {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  linkedProject?: number;
  linkedWishlist?: number;
  linkedAccount?: number;
  targetDate?: string;
}

export interface BudgetState {
  incomeStreams: IncomeStream[];
  accounts: BudgetAccount[];
  bills: Bill[];
  expenses: Expense[];
  transactions: Transaction[];
  sinkingFunds: SinkingFund[];
  savingsGoals: SavingsGoal[];
}

type BudgetSection = 'overview' | 'income' | 'accounts' | 'bills' | 'expenses' | 'transactions' | 'sinking-funds' | 'savings-goals' | 'forecast' | 'settings';

// ============================================================================
// INITIAL DATA
// ============================================================================

export const initialBudgetState: BudgetState = {
  incomeStreams: [
    { id: 1, name: 'Primary Salary', contributor: 'Jessica', type: 'Salary', frequency: 'Fortnightly', amount: 3200, linkedAccount: 1, notes: 'Full-time employment', status: 'Active' },
    { id: 2, name: 'Partner Salary', contributor: 'Partner', type: 'Salary', frequency: 'Fortnightly', amount: 2800, linkedAccount: 1, notes: 'Part-time employment', status: 'Active' },
    { id: 3, name: 'Casual Work', contributor: 'Jessica', type: 'Casual', frequency: 'Weekly', amount: 450, linkedAccount: 1, notes: 'Weekend shifts', status: 'Active' },
  ],
  accounts: [
    { id: 1, name: 'Everyday', type: 'Everyday', balance: 4200, availableFunds: 3800, linkedBills: [1, 2], linkedGoals: [1], linkedExpenses: [1, 2], linkedIncome: [1, 2, 3] },
    { id: 2, name: 'Mortgage Offset', type: 'Mortgage Offset', balance: 28500, availableFunds: 28500, linkedBills: [], linkedGoals: [], linkedExpenses: [], linkedIncome: [] },
    { id: 3, name: 'Emergency Fund', type: 'Emergency', balance: 12800, availableFunds: 12800, linkedBills: [], linkedGoals: [], linkedExpenses: [], linkedIncome: [] },
    { id: 4, name: 'Holiday Fund', type: 'Holiday', balance: 5600, availableFunds: 5600, linkedBills: [], linkedGoals: [2], linkedExpenses: [], linkedIncome: [] },
    { id: 5, name: 'Renovation Fund', type: 'Renovation', balance: 8900, availableFunds: 8900, linkedBills: [], linkedGoals: [3], linkedExpenses: [], linkedIncome: [] },
  ],
  bills: [
    { id: 1, name: 'Mortgage Payment', category: 'Mortgage', dueDate: '2026-07-15', frequency: 'Monthly', amount: 2400, account: 'Everyday', status: 'Upcoming', projectLink: 1 },
    { id: 2, name: 'Electricity', category: 'Utilities', dueDate: '2026-07-20', frequency: 'Monthly', amount: 180, account: 'Everyday', status: 'Upcoming' },
    { id: 3, name: 'Internet', category: 'Utilities', dueDate: '2026-07-18', frequency: 'Monthly', amount: 89, account: 'Everyday', status: 'Upcoming' },
    { id: 4, name: 'Car Insurance', category: 'Insurance', dueDate: '2026-08-05', frequency: 'Yearly', amount: 650, account: 'Everyday', status: 'Upcoming' },
  ],
  expenses: [
    { id: 1, description: 'Groceries - Coles', amount: 156, date: '2026-07-05', category: 'Groceries', account: 'Everyday', notes: 'Weekly shopping', archived: false },
    { id: 2, description: 'Petrol', amount: 65, date: '2026-07-04', category: 'Transport', account: 'Everyday', notes: 'Fill up', archived: false },
  ],
  transactions: [
    { id: 1, type: 'Income', description: 'Salary - Jessica', amount: 3200, date: '2026-07-03', category: 'Salary', account: 'Everyday', receiptReference: 'SAL-20260703-001', notes: '' },
    { id: 2, type: 'Income', description: 'Salary - Partner', amount: 2800, date: '2026-07-03', category: 'Salary', account: 'Everyday', receiptReference: 'SAL-20260703-002', notes: '' },
    { id: 3, type: 'Expense', description: 'Groceries', amount: 156, date: '2026-07-05', category: 'Groceries', account: 'Everyday', notes: '' },
    { id: 4, type: 'Bill', description: 'Electricity', amount: 180, date: '2026-06-20', category: 'Utilities', account: 'Everyday', notes: '' },
  ],
  sinkingFunds: [
    { id: 1, name: 'Christmas', targetAmount: 2000, currentAmount: 1450, contributionFrequency: 'Monthly', linkedAccount: 1, forecastCompletion: '2026-11-15' },
    { id: 2, name: 'Car Registration', targetAmount: 800, currentAmount: 320, contributionFrequency: 'Monthly', linkedAccount: 1, forecastCompletion: '2026-09-10' },
    { id: 3, name: 'Rates', targetAmount: 1200, currentAmount: 900, contributionFrequency: 'Monthly', linkedAccount: 2, forecastCompletion: '2026-08-20' },
  ],
  savingsGoals: [
    { id: 1, name: 'New Car', targetAmount: 35000, currentAmount: 18500, linkedAccount: 4, targetDate: '2027-12-31' },
    { id: 2, name: 'Home Gym', targetAmount: 5000, currentAmount: 2800, linkedWishlist: 1, targetDate: '2026-12-31' },
    { id: 3, name: 'Kitchen Reno', targetAmount: 15000, currentAmount: 8900, linkedProject: 1, targetDate: '2027-06-30' },
  ],
};

// ============================================================================
// COMPONENTS
// ============================================================================

function BudgetLeftNav({ activeSection, onSelectSection }: { activeSection: BudgetSection; onSelectSection: (section: BudgetSection) => void }) {
  const sections: Array<{ key: BudgetSection; label: string; emoji: string }> = [
    { key: 'overview', label: 'Overview', emoji: '📊' },
    { key: 'income', label: 'Income', emoji: '💰' },
    { key: 'accounts', label: 'Accounts', emoji: '🏦' },
    { key: 'bills', label: 'Bills', emoji: '📄' },
    { key: 'expenses', label: 'Expenses', emoji: '🏷️' },
    { key: 'transactions', label: 'Transactions', emoji: '📋' },
    { key: 'sinking-funds', label: 'Sinking Funds', emoji: '🎯' },
    { key: 'savings-goals', label: 'Savings Goals', emoji: '⭐' },
    { key: 'forecast', label: 'Forecast', emoji: '📈' },
    { key: 'settings', label: 'Settings', emoji: '⚙️' },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-vaultly-grey overflow-y-auto">
      <div className="p-6 border-b border-vaultly-grey">
        <h3 className="text-lg font-semibold text-[#38506A]">Financial Centre</h3>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => onSelectSection(section.key)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeSection === section.key
                ? 'bg-[#E8DDCC] text-[#38506A] shadow-sm'
                : 'text-vaultly-sage hover:text-vaultly-navy hover:bg-vaultly-cream'
            }`}
          >
            <span className="text-lg">{section.emoji}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function OverviewSection({ state }: { state: BudgetState }) {
  const totalIncome = state.incomeStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const totalExpenses = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const totalBills = state.bills.reduce((sum, bill) => sum + bill.amount, 0);
  const remaining = totalIncome - totalExpenses - totalBills;
  const budgetHealth = Math.round((remaining / (totalIncome || 1)) * 100);

  const upcomingBills = state.bills.filter(b => b.status === 'Upcoming').slice(0, 3);
  const upcomingIncome = state.incomeStreams.filter(s => s.status === 'Active').slice(0, 3);
  const savingsProgress = state.savingsGoals.length > 0
    ? Math.round(
        state.savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0) /
          state.savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0) *
          100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <IncomeStatCard
          label="Total Income"
          value={totalIncome.toLocaleString()}
          icon={<VaultlyIcon name="finance" size="lg" />}
          subtitle="This month"
        />

        <ExpensesStatCard
          label="Expenses"
          value={totalExpenses.toLocaleString()}
          icon={<VaultlyIcon name="finance" size="lg" />}
          subtitle="Manual + bills"
        />

        <NeutralStatCard
          label="Remaining"
          value={remaining.toLocaleString()}
          icon={<VaultlyIcon name="finance" size="lg" />}
          subtitle="Available this month"
        />

        <SavingsStatCard
          label="Budget Health"
          value={`${budgetHealth}%`}
          icon={<VaultlyIcon name="finance" size="lg" />}
          subtitle="Household readiness"
        />
      </div>

      {/* Quick Actions */}
      <NeutralCard>
        <h3 className="text-lg font-semibold text-[#38506A] mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <button className="px-4 py-3 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors text-sm">
            + Add Income
          </button>
          <button className="px-4 py-3 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors text-sm">
            + Add Expense
          </button>
          <button className="px-4 py-3 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors text-sm">
            + Add Bill
          </button>
          <button className="px-4 py-3 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors text-sm">
            Transfer
          </button>
          <button className="px-4 py-3 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors text-sm">
            + Sinking Fund
          </button>
          <button className="px-4 py-3 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors text-sm">
            + Savings Goal
          </button>
        </div>
      </NeutralCard>

      {/* Upcoming Bills & Income */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NeutralCard>
          <h3 className="text-lg font-semibold text-[#38506A] mb-4">Upcoming Bills</h3>
          {upcomingBills.length > 0 ? (
            <div className="space-y-3">
              {upcomingBills.map((bill) => (
                <div key={bill.id} className="flex justify-between items-start py-2 border-b border-vaultly-cream last:border-0">
                  <div>
                    <p className="font-medium text-[#38506A]">{bill.name}</p>
                    <p className="text-xs text-[#A4B69A]">{bill.dueDate}</p>
                  </div>
                  <p className="font-semibold text-[#D48C6A]">${bill.amount}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#A4B69A]">No upcoming bills</p>
          )}
        </NeutralCard>

        <NeutralCard>
          <h3 className="text-lg font-semibold text-[#38506A] mb-4">Upcoming Income</h3>
          {upcomingIncome.length > 0 ? (
            <div className="space-y-3">
              {upcomingIncome.map((income) => (
                <div key={income.id} className="flex justify-between items-start py-2 border-b border-vaultly-cream last:border-0">
                  <div>
                    <p className="font-medium text-[#38506A]">{income.name}</p>
                    <p className="text-xs text-[#A4B69A]">{income.contributor}</p>
                  </div>
                  <p className="font-semibold text-[#A4B69A]">${income.amount}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#A4B69A]">No active income streams</p>
          )}
        </NeutralCard>
      </div>

      {/* Savings Progress & BCR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NeutralCard>
          <h3 className="text-lg font-semibold text-[#38506A] mb-4">Savings Progress</h3>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#A4B69A]">Overall progress</span>
              <span className="text-lg font-bold text-[#38506A]">{savingsProgress}%</span>
            </div>
            <div className="w-full bg-[#F6F2EA] rounded-full h-2">
              <div className="bg-[#A4B69A] h-2 rounded-full transition-all" style={{ width: `${savingsProgress}%` }} />
            </div>
          </div>
          <p className="text-xs text-[#A4B69A]">{state.savingsGoals.length} active goals</p>
        </NeutralCard>

        <HighlightCard>
          <h3 className="text-lg font-semibold text-[#38506A] mb-3">BCR Summary</h3>
          <div className="space-y-2 text-sm text-[#38506A]">
            <p>✓ Receipt matched to expense</p>
            <p>✓ Bill linked to calendar</p>
            <p>✓ Income schedule refreshed</p>
            <p className="text-xs text-[#A4B69A] mt-3">BCR organised your financial records</p>
          </div>
        </HighlightCard>
      </div>
    </div>
  );
}

function IncomeSection({ state }: { state: BudgetState; onUpdate?: (newState: BudgetState) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#38506A]">Income Streams</h2>
        <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
          + Add Income Stream
        </button>
      </div>

      {state.incomeStreams.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {state.incomeStreams.map((income) => (
            <IncomeCard key={income.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Name</p>
                  <p className="font-semibold text-white">{income.name}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Contributor</p>
                  <p className="font-semibold text-white">{income.contributor}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Frequency & Amount</p>
                  <p className="font-semibold text-white">${income.amount} {income.frequency}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${income.status === 'Active' ? 'bg-white/30 text-white' : 'bg-red-200/30 text-white'}`}>
                    {income.status}
                  </span>
                </div>
              </div>
            </IncomeCard>
          ))}
        </div>
      ) : (
        <NeutralCard>
          <div className="p-12 text-center">
            <p className="text-2xl mb-2">💰</p>
            <p className="text-[#38506A] font-semibold mb-2">No income streams yet</p>
            <p className="text-[#A4B69A] mb-4">Add your first income stream to get started</p>
            <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
              + Add Income Stream
            </button>
          </div>
        </NeutralCard>
      )}
    </div>
  );
}

function AccountsSection({ state }: { state: BudgetState; onUpdate?: (newState: BudgetState) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#38506A]">Household Accounts</h2>
        <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
          + Add Account
        </button>
      </div>

      {state.accounts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.accounts.map((account) => (
            <NeutralCard key={account.id}>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#38506A]">{account.name}</h3>
                <p className="text-xs text-[#A4B69A]">{account.type}</p>
              </div>

              <div className="space-y-3 mb-4 pb-4 border-b border-[#F6F2EA]">
                <div className="flex justify-between">
                  <span className="text-sm text-[#A4B69A]">Current Balance</span>
                  <span className="font-bold text-[#38506A]">${account.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[#A4B69A]">Available Funds</span>
                  <span className="font-bold text-[#A4B69A]">${account.availableFunds.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <p className="text-[#A4B69A]">📄 {account.linkedBills.length} linked bills</p>
                <p className="text-[#A4B69A]">⭐ {account.linkedGoals.length} linked goals</p>
                <p className="text-[#A4B69A]">💰 {account.linkedIncome.length} income streams</p>
              </div>
            </NeutralCard>
          ))}
        </div>
      ) : (
        <NeutralCard>
          <div className="p-12 text-center">
            <p className="text-2xl mb-2">🏦</p>
            <p className="text-[#38506A] font-semibold mb-2">No accounts yet</p>
            <p className="text-[#A4B69A] mb-4">Create your first household account</p>
            <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
              + Add Account
            </button>
          </div>
        </NeutralCard>
      )}
    </div>
  );
}

function BillsSection({ state }: { state: BudgetState; onUpdate?: (newState: BudgetState) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#38506A]">Bills</h2>
        <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
          + Add Bill
        </button>
      </div>

      {state.bills.length > 0 ? (
        <div className="space-y-4">
          {state.bills.map((bill) => (
            <BillsCard key={bill.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Bill Name</p>
                  <p className="font-semibold text-white">{bill.name}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Due Date</p>
                  <p className="font-semibold text-white">{bill.dueDate}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Amount</p>
                  <p className="font-semibold text-white">${bill.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Frequency</p>
                  <p className="font-semibold text-white">{bill.frequency}</p>
                </div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${bill.status === 'Upcoming' ? 'bg-white/30 text-white' : bill.status === 'Paid' ? 'bg-green-400/30 text-white' : 'bg-red-400/30 text-white'}`}>
                    {bill.status}
                  </span>
                </div>
              </div>
            </BillsCard>
          ))}
        </div>
      ) : (
        <NeutralCard>
          <div className="p-12 text-center">
            <p className="text-2xl mb-2">📄</p>
            <p className="text-[#38506A] font-semibold mb-2">No bills recorded</p>
            <p className="text-[#A4B69A] mb-4">Add your first recurring or one-off bill</p>
            <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
              + Add Bill
            </button>
          </div>
        </NeutralCard>
      )}
    </div>
  );
}

function ExpensesSection({ state }: { state: BudgetState; onUpdate?: (newState: BudgetState) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#38506A]">Expenses</h2>
        <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
          + Add Expense
        </button>
      </div>

      {state.expenses.length > 0 ? (
        <div className="space-y-4">
          {state.expenses.map((expense) => (
            <ExpensesCard key={expense.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Description</p>
                  <p className="font-semibold text-white">{expense.description}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Date</p>
                  <p className="font-semibold text-white">{expense.date}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Amount</p>
                  <p className="font-semibold text-white">${expense.amount}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Category</p>
                  <p className="font-semibold text-white">{expense.category}</p>
                </div>
                <div>
                  <p className="text-xs text-white font-medium mb-1 opacity-75">Account</p>
                  <p className="font-semibold text-white">{expense.account}</p>
                </div>
              </div>
            </ExpensesCard>
          ))}
        </div>
      ) : (
        <NeutralCard>
          <div className="p-12 text-center">
            <p className="text-2xl mb-2">🏷️</p>
            <p className="text-[#38506A] font-semibold mb-2">No expenses recorded</p>
            <p className="text-[#A4B69A] mb-4">Add your first manual expense</p>
            <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
              + Add Expense
            </button>
          </div>
        </NeutralCard>
      )}
    </div>
  );
}

function TransactionsSection({ state }: { state: BudgetState }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#38506A]">Transaction History</h2>
      </div>

      {state.transactions.length > 0 ? (
        <div className="bg-white border border-[#E7DED2] rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#F6F2EA] border-b border-[#E7DED2]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#38506A]">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#38506A]">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#38506A]">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#38506A]">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-[#38506A]">Account</th>
                </tr>
              </thead>
              <tbody>
                {state.transactions.map((transaction, idx) => (
                  <tr key={transaction.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAF8F5]'}>
                    <td className="px-6 py-4 text-sm text-[#38506A]">{transaction.description}</td>
                    <td className="px-6 py-4 text-sm text-[#A4B69A]">{transaction.date}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'Income' ? 'bg-[#A4B69A]/20 text-[#38506A]' :
                        transaction.type === 'Bill' ? 'bg-[#E8DDCC]/80 text-[#38506A]' :
                        'bg-[#D48C6A]/20 text-[#C86B4A]'
                      }`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-semibold ${transaction.type === 'Income' ? 'text-[#A4B69A]' : 'text-[#D48C6A]'}`}>
                      {transaction.type === 'Income' ? '+' : '-'}${transaction.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#A4B69A]">{transaction.account}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-[#E7DED2] rounded-lg p-12 text-center shadow-sm">
          <p className="text-2xl mb-2">📋</p>
          <p className="text-[#38506A] font-semibold mb-2">No transactions yet</p>
          <p className="text-[#A4B69A]">Your financial history will appear here</p>
        </div>
      )}
    </div>
  );
}

function SinkingFundsSection({ state }: { state: BudgetState; onUpdate?: (newState: BudgetState) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#38506A]">Sinking Funds</h2>
        <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
          + Create Sinking Fund
        </button>
      </div>

      {state.sinkingFunds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.sinkingFunds.map((fund) => {
            const progress = Math.round((fund.currentAmount / fund.targetAmount) * 100);
            return (
              <div key={fund.id} className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-[#38506A] mb-4">{fund.name}</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#A4B69A]">Progress</span>
                      <span className="text-sm font-bold text-[#38506A]">${fund.currentAmount.toLocaleString()} / ${fund.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-[#F6F2EA] rounded-full h-2">
                      <div className="bg-[#A4B69A] h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F6F2EA] space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#A4B69A]">Contribution</span>
                      <span className="font-semibold text-[#38506A]">{fund.contributionFrequency}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#A4B69A]">Forecast Complete</span>
                      <span className="font-semibold text-[#38506A]">{fund.forecastCompletion}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-[#E7DED2] rounded-lg p-12 text-center shadow-sm">
          <p className="text-2xl mb-2">🎯</p>
          <p className="text-[#38506A] font-semibold mb-2">No sinking funds yet</p>
          <p className="text-[#A4B69A] mb-4">Create your first sinking fund to save for specific needs</p>
          <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
            + Create Sinking Fund
          </button>
        </div>
      )}
    </div>
  );
}

function SavingsGoalsSection({ state }: { state: BudgetState; onUpdate?: (newState: BudgetState) => void }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-[#38506A]">Savings Goals</h2>
        <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
          + Create Savings Goal
        </button>
      </div>

      {state.savingsGoals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {state.savingsGoals.map((goal) => {
            const progress = Math.round((goal.currentAmount / goal.targetAmount) * 100);
            return (
              <div key={goal.id} className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold text-[#38506A] mb-2">{goal.name}</h3>
                <p className="text-xs text-[#A4B69A] mb-4">{goal.targetDate}</p>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#A4B69A]">Saved</span>
                      <span className="text-sm font-bold text-[#38506A]">{progress}%</span>
                    </div>
                    <div className="w-full bg-[#F6F2EA] rounded-full h-2">
                      <div className="bg-[#A4B69A] h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#F6F2EA]">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#A4B69A]">Target</span>
                      <span className="font-semibold text-[#38506A]">${goal.targetAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#A4B69A]">Saved</span>
                      <span className="font-semibold text-[#A4B69A]">${goal.currentAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-[#E7DED2] rounded-lg p-12 text-center shadow-sm">
          <p className="text-2xl mb-2">⭐</p>
          <p className="text-[#38506A] font-semibold mb-2">No savings goals yet</p>
          <p className="text-[#A4B69A] mb-4">Create your first savings goal</p>
          <button className="px-4 py-2 rounded-lg bg-[#38506A] text-white font-medium hover:bg-[#2C3D52] transition-colors">
            + Create Savings Goal
          </button>
        </div>
      )}
    </div>
  );
}

function ForecastSection({ state }: { state: BudgetState }) {
  const upcomingIncome = state.incomeStreams.reduce((sum, stream) => sum + stream.amount, 0);
  const upcomingBills = state.bills.reduce((sum, bill) => sum + bill.amount, 0);
  const expectedExpenses = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const projectedBalance = upcomingIncome - upcomingBills - expectedExpenses;
  const savingsProgress = state.savingsGoals.length > 0
    ? Math.round(
        state.savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0) /
          state.savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0) *
          100
      )
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#38506A]">Financial Forecast</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm">
          <p className="text-sm text-[#A4B69A] font-medium mb-1">Upcoming Income</p>
          <p className="text-3xl font-bold text-[#A4B69A]">${upcomingIncome.toLocaleString()}</p>
          <p className="text-xs text-[#A4B69A] mt-2">Next 30 days</p>
        </div>

        <div className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm">
          <p className="text-sm text-[#A4B69A] font-medium mb-1">Upcoming Bills</p>
          <p className="text-3xl font-bold text-[#D48C6A]">${upcomingBills.toLocaleString()}</p>
          <p className="text-xs text-[#A4B69A] mt-2">Next 30 days</p>
        </div>

        <div className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm">
          <p className="text-sm text-[#A4B69A] font-medium mb-1">Expected Expenses</p>
          <p className="text-3xl font-bold text-[#D48C6A]">${expectedExpenses.toLocaleString()}</p>
          <p className="text-xs text-[#A4B69A] mt-2">Estimated spend</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#38506A] mb-4">Projected Balance</h3>
          <p className={`text-4xl font-bold mb-2 ${projectedBalance >= 0 ? 'text-[#A4B69A]' : 'text-[#C86B4A]'}`}>
            ${projectedBalance.toLocaleString()}
          </p>
          <p className="text-sm text-[#A4B69A]">Based on current income and expenses</p>
        </div>

        <div className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-[#38506A] mb-4">Savings Forecast</h3>
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-sm text-[#A4B69A] mb-1">Overall progress</p>
              <p className="text-3xl font-bold text-[#A4B69A]">{savingsProgress}%</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-[#A4B69A] mb-1">{state.savingsGoals.length} goals</p>
              <p className="text-lg font-semibold text-[#38506A]">${state.savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0).toLocaleString()}</p>
            </div>
          </div>
          <div className="w-full bg-[#F6F2EA] rounded-full h-2">
            <div className="bg-[#A4B69A] h-2 rounded-full transition-all" style={{ width: `${savingsProgress}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-[#F6F2EA] border border-[#D8C3A5] rounded-lg p-6">
        <p className="text-sm text-[#38506A] leading-relaxed">
          <strong>Important:</strong> This forecast is informational only and based on your current data. Vaultly never provides financial advice. Actual results may vary based on spending patterns and changes to your income or expenses.
        </p>
      </div>
    </div>
  );
}

function SettingsSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#38506A]">Budget Settings</h2>

      <div className="bg-white border border-[#E7DED2] rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-[#38506A] mb-4">Budget Configuration</h3>
        <p className="text-[#A4B69A]">Budget settings coming soon...</p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN BUDGET COMPONENT
// ============================================================================

export default function BudgetModule({ initialState = initialBudgetState, onStateChange }: { initialState?: BudgetState; onStateChange?: (state: BudgetState) => void }) {
  const [activeSection, setActiveSection] = useState<BudgetSection>('overview');
  const [state, setState] = useState<BudgetState>(initialState);

  const handleStateUpdate = (newState: BudgetState) => {
    setState(newState);
    onStateChange?.(newState);
  };

  return (
    <div className="flex gap-6">
      {/* Left Navigation */}
      <BudgetLeftNav activeSection={activeSection} onSelectSection={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeSection === 'overview' && <OverviewSection state={state} />}
        {activeSection === 'income' && <IncomeSection state={state} onUpdate={handleStateUpdate} />}
        {activeSection === 'accounts' && <AccountsSection state={state} onUpdate={handleStateUpdate} />}
        {activeSection === 'bills' && <BillsSection state={state} onUpdate={handleStateUpdate} />}
        {activeSection === 'expenses' && <ExpensesSection state={state} onUpdate={handleStateUpdate} />}
        {activeSection === 'transactions' && <TransactionsSection state={state} />}
        {activeSection === 'sinking-funds' && <SinkingFundsSection state={state} onUpdate={handleStateUpdate} />}
        {activeSection === 'savings-goals' && <SavingsGoalsSection state={state} onUpdate={handleStateUpdate} />}
        {activeSection === 'forecast' && <ForecastSection state={state} />}
        {activeSection === 'settings' && <SettingsSection />}
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7DED2]">
        <div className="flex justify-around">
          {(['overview', 'income', 'accounts', 'bills', 'expenses', 'transactions'] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`flex-1 py-3 text-center font-medium text-xs transition-colors ${
                activeSection === section ? 'text-[#38506A] bg-[#E8DDCC]' : 'text-[#A4B69A]'
              }`}
            >
              {section.charAt(0).toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
