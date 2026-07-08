import React, { useState, useMemo } from 'react';

// Types for Budget module
export type AccountType = 'Everyday' | 'Mortgage Offset' | 'Savings' | 'Emergency' | 'Holiday' | 'Renovation' | 'Investment' | 'Cash';
export type CategoryType = 'Mortgage' | 'Utilities' | 'Groceries' | 'Transport' | 'Insurance' | 'Medical' | 'Pets' | 'Children' | 'Entertainment' | 'Savings' | 'Projects' | 'Other';

export type BudgetAccount = {
  id: number;
  name: string;
  type: AccountType;
  balance: number;
  availableFunds: number;
  linkedBills: number[];
  linkedGoals: number[];
};

export type BudgetCategory = {
  id: number;
  name: CategoryType;
  allocated: number;
  spent: number;
};

export type SinkingFund = {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  frequency: 'Weekly' | 'Fortnightly' | 'Monthly';
  linkedAccount?: number;
};

export type SavingsGoal = {
  id: number;
  name: string;
  targetAmount: number;
  currentAmount: number;
  linkedAccount?: number;
  linkedWishlist?: number;
  linkedProject?: number;
  targetDate?: string;
};

export type Transaction = {
  id: number;
  type: 'Income' | 'Expense' | 'Transfer';
  amount: number;
  category: string;
  description: string;
  date: string;
  account: string;
  notes: string;
  linkedReceipt?: number;
};

export type BudgetState = {
  accounts: BudgetAccount[];
  categories: BudgetCategory[];
  sinkingFunds: SinkingFund[];
  savingsGoals: SavingsGoal[];
  transactions: Transaction[];
};

interface BudgetProps {
  initialState?: BudgetState;
  onStateChange?: (state: BudgetState) => void;
}

// Sample data
export const initialBudgetState: BudgetState = {
  accounts: [
    { id: 1, name: 'Everyday', type: 'Everyday', balance: 4200, availableFunds: 3800, linkedBills: [1, 2, 3], linkedGoals: [1] },
    { id: 2, name: 'Mortgage Offset', type: 'Mortgage Offset', balance: 28500, availableFunds: 28500, linkedBills: [4], linkedGoals: [] },
    { id: 3, name: 'Emergency Fund', type: 'Emergency', balance: 12800, availableFunds: 12800, linkedBills: [], linkedGoals: [] },
    { id: 4, name: 'Holiday Fund', type: 'Holiday', balance: 5600, availableFunds: 5600, linkedBills: [], linkedGoals: [2] },
    { id: 5, name: 'Renovation Fund', type: 'Renovation', balance: 8900, availableFunds: 8900, linkedBills: [], linkedGoals: [3] },
  ],
  categories: [
    { id: 1, name: 'Mortgage', allocated: 2400, spent: 2400 },
    { id: 2, name: 'Utilities', allocated: 350, spent: 287 },
    { id: 3, name: 'Groceries', allocated: 500, spent: 438 },
    { id: 4, name: 'Transport', allocated: 200, spent: 156 },
    { id: 5, name: 'Insurance', allocated: 280, spent: 280 },
    { id: 6, name: 'Entertainment', allocated: 150, spent: 92 },
    { id: 7, name: 'Savings', allocated: 800, spent: 800 },
    { id: 8, name: 'Projects', allocated: 600, spent: 450 },
  ],
  sinkingFunds: [
    { id: 1, name: 'Christmas', targetAmount: 2000, currentAmount: 1450, frequency: 'Monthly', linkedAccount: 1 },
    { id: 2, name: 'Car Registration', targetAmount: 800, currentAmount: 320, frequency: 'Monthly', linkedAccount: 1 },
    { id: 3, name: 'Rates', targetAmount: 1200, currentAmount: 900, frequency: 'Monthly', linkedAccount: 2 },
    { id: 4, name: 'School Fees', targetAmount: 3500, currentAmount: 2100, frequency: 'Monthly', linkedAccount: 1 },
    { id: 5, name: 'Holiday', targetAmount: 5000, currentAmount: 3200, frequency: 'Monthly', linkedAccount: 4 },
  ],
  savingsGoals: [
    { id: 1, name: 'New Car', targetAmount: 35000, currentAmount: 18500, linkedAccount: 4, targetDate: '2027-12-31' },
    { id: 2, name: 'Home Gym', targetAmount: 5000, currentAmount: 2800, linkedWishlist: 1, targetDate: '2026-12-31' },
    { id: 3, name: 'Kitchen Reno', targetAmount: 15000, currentAmount: 8900, linkedProject: 1, targetDate: '2027-06-30' },
  ],
  transactions: [
    { id: 1, type: 'Income', amount: 6500, category: 'Salary', description: 'Monthly salary', date: '2026-07-01', account: 'Everyday', notes: 'Primary income', linkedReceipt: undefined },
    { id: 2, type: 'Income', amount: 3200, category: 'Rental Income', description: 'Studio rental', date: '2026-07-01', account: 'Everyday', notes: '', linkedReceipt: undefined },
    { id: 3, type: 'Expense', amount: 2400, category: 'Mortgage', description: 'Home loan payment', date: '2026-07-05', account: 'Everyday', notes: '', linkedReceipt: undefined },
    { id: 4, type: 'Expense', amount: 287, category: 'Utilities', description: 'Electricity bill', date: '2026-07-08', account: 'Everyday', notes: 'Off peak discount', linkedReceipt: undefined },
    { id: 5, type: 'Expense', amount: 156, category: 'Transport', description: 'Fuel', date: '2026-07-10', account: 'Everyday', notes: '', linkedReceipt: undefined },
    { id: 6, type: 'Transfer', amount: 500, category: 'Transfer', description: 'To Emergency Fund', date: '2026-07-12', account: 'Everyday', notes: '', linkedReceipt: undefined },
    { id: 7, type: 'Expense', amount: 438, category: 'Groceries', description: 'Weekly shopping', date: '2026-07-14', account: 'Everyday', notes: '', linkedReceipt: undefined },
  ],
};

type BudgetSectionKey = 'overview' | 'income' | 'accounts' | 'bills' | 'categories' | 'sinking-funds' | 'savings-goals' | 'wishlist' | 'forecast' | 'transactions' | 'settings';

const BudgetSidebarNav: React.FC<{ activeSection: BudgetSectionKey; onSectionChange: (section: BudgetSectionKey) => void }> = ({ activeSection, onSectionChange }) => {
  const sections: Array<{ id: BudgetSectionKey; label: string; icon: string }> = [
    { id: 'overview', label: 'Budget Overview', icon: '📊' },
    { id: 'income', label: 'Income', icon: '💰' },
    { id: 'accounts', label: 'Accounts', icon: '🏦' },
    { id: 'bills', label: 'Bills', icon: '📄' },
    { id: 'categories', label: 'Categories', icon: '🏷️' },
    { id: 'sinking-funds', label: 'Sinking Funds', icon: '🎯' },
    { id: 'savings-goals', label: 'Savings Goals', icon: '⭐' },
    { id: 'wishlist', label: 'Wishlist Allocations', icon: '🛍️' },
    { id: 'forecast', label: 'Forecast', icon: '📈' },
    { id: 'transactions', label: 'Transactions', icon: '📋' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="h-full w-64 overflow-y-auto border-r border-vaultly-grey bg-white p-4 lg:block hidden">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-vaultly-navy">Financial Centre</h2>
      </div>
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`w-full flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all ${
              activeSection === section.id
                ? 'bg-white text-vaultly-navy shadow-sm'
                : 'text-vaultly-sage hover:bg-white/50'
            }`}
          >
            <span className="text-lg">{section.icon}</span>
            <span className="font-medium">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const BudgetOverviewSection: React.FC<{ state: BudgetState }> = ({ state }) => {
  const stats = useMemo(() => {
    const totalIncome = state.transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = state.transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const totalAllocated = state.categories.reduce((sum, c) => sum + c.allocated, 0);
    const totalAccounts = state.accounts.reduce((sum, a) => sum + a.balance, 0);
    const readinessScore = Math.round((totalAllocated / (totalIncome || 1)) * 100);

    return {
      totalIncome,
      totalExpenses,
      totalAllocated,
      remaining: totalIncome - totalExpenses,
      totalAccounts,
      readinessScore,
    };
  }, [state]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-vaultly-navy">Budget Overview</h1>
        <p className="text-vaultly-sage">July 2026</p>
      </div>

      {/* Budget Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm">
          <p className="text-sm text-vaultly-sage mb-2">Total Income</p>
          <p className="text-2xl font-bold text-vaultly-navy">${stats.totalIncome.toFixed(0)}</p>
          <p className="text-xs text-vaultly-sage mt-2">Live forecast</p>
        </div>
        <div className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm">
          <p className="text-sm text-vaultly-sage mb-2">Allocated</p>
          <p className="text-2xl font-bold text-vaultly-navy">${stats.totalAllocated.toFixed(0)}</p>
          <p className="text-xs text-vaultly-sage mt-2">{Math.round((stats.totalAllocated / stats.totalIncome) * 100)}% of income</p>
        </div>
        <div className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm">
          <p className="text-sm text-vaultly-sage mb-2">Remaining</p>
          <p className="text-2xl font-bold text-vaultly-sage">${stats.remaining.toFixed(0)}</p>
          <p className="text-xs text-vaultly-sage mt-2">Available to allocate</p>
        </div>
        <div className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm">
          <p className="text-sm text-vaultly-sage mb-2">Budget Health</p>
          <p className="text-2xl font-bold text-vaultly-navy">{stats.readinessScore}%</p>
          <p className="text-xs text-vaultly-sage mt-2">Household readiness</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-vaultly-navy mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="rounded-lg bg-vaultly-navy text-white px-4 py-3 text-sm font-medium hover:bg-vaultly-forest-green transition-all">+ Add Income</button>
          <button className="rounded-lg bg-vaultly-navy text-white px-4 py-3 text-sm font-medium hover:bg-vaultly-forest-green transition-all">+ Add Expense</button>
          <button className="rounded-lg bg-vaultly-navy text-white px-4 py-3 text-sm font-medium hover:bg-vaultly-forest-green transition-all">+ New Category</button>
          <button className="rounded-lg bg-vaultly-navy text-white px-4 py-3 text-sm font-medium hover:bg-vaultly-forest-green transition-all">+ New Goal</button>
        </div>
      </div>

      {/* Top Accounts */}
      <div className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-vaultly-navy mb-4">Accounts Snapshot</h2>
        <div className="space-y-3">
          {state.accounts.slice(0, 3).map((account) => (
            <div key={account.id} className="flex items-center justify-between p-3 bg-vaultly-cream rounded-lg">
              <div>
                <p className="font-medium text-vaultly-navy">{account.name}</p>
                <p className="text-sm text-vaultly-sage">{account.type}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-vaultly-navy">${account.balance.toFixed(0)}</p>
                <p className="text-sm text-vaultly-sage">Available: ${account.availableFunds.toFixed(0)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AccountsSection: React.FC<{ state: BudgetState; onStateChange: (state: BudgetState) => void }> = ({ state, onStateChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', type: 'Everyday' as AccountType });

  const handleAddAccount = () => {
    if (!formData.name) return;
    const newAccount: BudgetAccount = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      balance: 0,
      availableFunds: 0,
      linkedBills: [],
      linkedGoals: [],
    };
    onStateChange({
      ...state,
      accounts: [...state.accounts, newAccount],
    });
    setFormData({ name: '', type: 'Everyday' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-vaultly-navy">Accounts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-vaultly-navy text-white px-4 py-2 text-sm font-medium hover:bg-vaultly-forest-green transition-all"
        >
          + Add Account
        </button>
      </div>

      {showForm && (
        <div className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-vaultly-navy mb-4">New Account</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Account name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg border border-vaultly-grey px-4 py-2 text-vaultly-navy"
            />
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as AccountType })}
              className="w-full rounded-lg border border-vaultly-grey px-4 py-2 text-vaultly-navy"
            >
              <option>Everyday</option>
              <option>Mortgage Offset</option>
              <option>Savings</option>
              <option>Emergency</option>
              <option>Holiday</option>
              <option>Renovation</option>
              <option>Investment</option>
              <option>Cash</option>
            </select>
            <div className="flex gap-3">
              <button
                onClick={handleAddAccount}
                className="flex-1 rounded-lg bg-vaultly-sage text-white px-4 py-2 text-sm font-medium hover:bg-vaultly-olive transition-all"
              >
                Create
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 rounded-lg border border-vaultly-grey px-4 py-2 text-sm font-medium text-vaultly-sage hover:bg-vaultly-cream transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.accounts.map((account) => (
          <div key={account.id} className="rounded-xl bg-white border border-vaultly-grey p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-vaultly-navy">{account.name}</h3>
                <p className="text-sm text-vaultly-sage">{account.type}</p>
              </div>
              <button className="text-vaultly-sage hover:text-vaultly-navy">⋮</button>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-vaultly-sage">Current Balance</p>
                <p className="text-2xl font-bold text-vaultly-navy">${account.balance.toFixed(0)}</p>
              </div>
              <div>
                <p className="text-xs text-vaultly-sage">Available Funds</p>
                <p className="text-lg font-semibold text-vaultly-sage">${account.availableFunds.toFixed(0)}</p>
              </div>
              <div className="pt-3 border-t border-vaultly-grey">
                <p className="text-xs text-vaultly-sage">{account.linkedBills.length} linked bills • {account.linkedGoals.length} linked goals</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TransactionsSection: React.FC<{ state: BudgetState }> = ({ state }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Income' | 'Expense' | 'Transfer'>('All');

  const filtered = useMemo(() => {
    return state.transactions.filter((t) => {
      const matchesType = filterType === 'All' || t.type === filterType;
      const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           t.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [state.transactions, filterType, searchTerm]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#38506A]">Transactions</h1>

      {/* Search and Filter */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-[#E7DED2] px-4 py-2 text-[#38506A]"
        />
        <div className="flex gap-2">
          {(['All', 'Income', 'Expense', 'Transfer'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                filterType === type
                  ? 'bg-[#38506A] text-white'
                  : 'border border-[#E7DED2] text-[#5B6F82] hover:bg-[#F6F2EA]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-2">
        {filtered.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#E7DED2] hover:shadow-sm transition-all">
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg ${
                transaction.type === 'Income' ? 'bg-[#A4B69A]' :
                transaction.type === 'Expense' ? 'bg-[#D48C6A]' :
                'bg-[#5B6F82]'
              }`}>
                {transaction.type === 'Income' ? '💰' : transaction.type === 'Expense' ? '💸' : '↔️'}
              </div>
              <div>
                <p className="font-medium text-[#38506A]">{transaction.description}</p>
                <p className="text-sm text-[#5B6F82]">{transaction.category} • {transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`font-semibold ${
                transaction.type === 'Income' ? 'text-[#A4B69A]' : 'text-[#D48C6A]'
              }`}>
                {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toFixed(2)}
              </p>
              <p className="text-sm text-[#5B6F82]">{transaction.account}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ForecastSection: React.FC<{ state: BudgetState }> = ({ state }) => {
  const forecast = useMemo(() => {
    const income = state.transactions.filter(t => t.type === 'Income').reduce((sum, t) => sum + t.amount, 0);
    const expenses = state.transactions.filter(t => t.type === 'Expense').reduce((sum, t) => sum + t.amount, 0);
    const savings = income - expenses;

    return {
      expectedIncome: income,
      expectedBills: state.categories.filter(c => c.name === 'Mortgage' || c.name === 'Utilities').reduce((sum, c) => sum + c.allocated, 0),
      upcomingExpenses: expenses,
      savingsProgress: (state.savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0) / state.savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0)) * 100,
      householdPosition: savings,
    };
  }, [state]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#38506A]">Forecast</h1>
        <p className="text-[#5B6F82]">Financial outlook and projections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white border border-[#E7DED2] p-6 shadow-sm">
          <p className="text-sm text-[#5B6F82] mb-2">Expected Income</p>
          <p className="text-3xl font-bold text-[#A4B69A]">${forecast.expectedIncome.toFixed(0)}</p>
        </div>
        <div className="rounded-xl bg-white border border-[#E7DED2] p-6 shadow-sm">
          <p className="text-sm text-[#5B6F82] mb-2">Expected Bills</p>
          <p className="text-3xl font-bold text-[#D48C6A]">${forecast.expectedBills.toFixed(0)}</p>
        </div>
        <div className="rounded-xl bg-white border border-[#E7DED2] p-6 shadow-sm">
          <p className="text-sm text-[#5B6F82] mb-2">Upcoming Expenses</p>
          <p className="text-3xl font-bold text-[#D8B65A]">${forecast.upcomingExpenses.toFixed(0)}</p>
        </div>
        <div className="rounded-xl bg-white border border-[#E7DED2] p-6 shadow-sm">
          <p className="text-sm text-[#5B6F82] mb-2">Household Position</p>
          <p className={`text-3xl font-bold ${forecast.householdPosition >= 0 ? 'text-[#A4B69A]' : 'text-[#C86B4A]'}`}>
            ${forecast.householdPosition.toFixed(0)}
          </p>
        </div>
      </div>

      <div className="rounded-xl bg-white border border-[#E7DED2] p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#38506A] mb-4">Savings Progress</h2>
        <div className="w-full bg-[#E8DDCC] rounded-full h-3">
          <div
            className="bg-[#A4B69A] h-3 rounded-full transition-all"
            style={{ width: `${Math.min(forecast.savingsProgress, 100)}%` }}
          />
        </div>
        <p className="text-sm text-[#5B6F82] mt-2">{forecast.savingsProgress.toFixed(0)}% of goals funded</p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-[#38506A] to-[#2F4F3E] p-6 text-white">
        <h2 className="text-lg font-semibold mb-2">Disclaimer</h2>
        <p className="text-sm opacity-90">
          This forecast is informational only. Vaultly never recommends financial decisions. Always consult with a financial advisor for important decisions.
        </p>
      </div>
    </div>
  );
};

const SavingsGoalsSection: React.FC<{ state: BudgetState }> = ({ state }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-[#38506A]">Savings Goals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {state.savingsGoals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          return (
            <div key={goal.id} className="rounded-xl bg-white border border-[#E7DED2] p-6 shadow-sm hover:shadow-md transition-all">
              <h3 className="font-semibold text-[#38506A] mb-4">{goal.name}</h3>
              <div className="space-y-3">
                <div className="w-full bg-[#E8DDCC] rounded-full h-3">
                  <div
                    className="bg-[#A4B69A] h-3 rounded-full transition-all"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#5B6F82]">${goal.currentAmount.toFixed(0)} of ${goal.targetAmount.toFixed(0)}</span>
                  <span className="font-semibold text-[#38506A]">{progress.toFixed(0)}%</span>
                </div>
                {goal.targetDate && (
                  <p className="text-xs text-[#5B6F82]">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BudgetComponent: React.FC<BudgetProps> = ({ initialState = initialBudgetState, onStateChange }) => {
  const [activeSection, setActiveSection] = useState<BudgetSectionKey>('overview');
  const [state, setState] = useState(initialState);

  const handleStateChange = (newState: BudgetState) => {
    setState(newState);
    onStateChange?.(newState);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-screen">
      {/* Sidebar Navigation - Hidden on mobile, visible on lg+ */}
      <BudgetSidebarNav activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8 bg-white">
        {activeSection === 'overview' && <BudgetOverviewSection state={state} />}
        {activeSection === 'accounts' && <AccountsSection state={state} onStateChange={handleStateChange} />}
        {activeSection === 'transactions' && <TransactionsSection state={state} />}
        {activeSection === 'forecast' && <ForecastSection state={state} />}
        {activeSection === 'savings-goals' && <SavingsGoalsSection state={state} />}

        {/* Placeholder sections */}
        {['income', 'bills', 'categories', 'sinking-funds', 'wishlist', 'settings'].includes(activeSection) && (
          <div className="rounded-xl bg-white border border-[#E7DED2] p-8 text-center">
            <p className="text-lg font-semibold text-[#38506A] mb-2">
              {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
            </p>
            <p className="text-[#5B6F82]">Coming soon...</p>
          </div>
        )}
      </main>

      {/* Mobile Navigation Drawer - Toggle on mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E7DED2] p-2 flex gap-1 overflow-x-auto">
        {['overview', 'income', 'accounts', 'bills', 'forecast', 'transactions'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section as BudgetSectionKey)}
            className={`flex-shrink-0 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
              activeSection === section
                ? 'bg-[#38506A] text-white'
                : 'bg-[#F6F2EA] text-[#5B6F82] hover:bg-white'
            }`}
          >
            {section}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BudgetComponent;
