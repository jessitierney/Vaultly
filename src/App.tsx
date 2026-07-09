import { useMemo, useState, useEffect } from 'react';
import { Sidebar, TopBar, NotificationCenter, QuickAddMenu, ProfileMenu, MobileNavBar } from './components/Shell';
import { ModuleNav } from './components/ModuleNav';
import { VaultlyLogo } from './components/common/VaultlyLogo';
import { GoogleSignInButton } from './components/auth/GoogleSignInButton';
import { Button } from './components/Button';
import BrandPreview from './components/BrandPreview';
import type { GoogleProfile } from './types/auth';
import type { ConnectedProvider } from './types/auth';
import {
  HouseholdReadinessScore,
  TodaySection,
  HouseholdActivity,
  QuickActions,
  HouseholdSnapshot,
  BCRSummary,
  RecentDocuments,
  HouseholdTimeline,
  DashboardCard,
} from './components/Dashboard';
import BudgetModule, { initialBudgetState, type BudgetState } from './components/BudgetModule';
import {
  MainPageKey,
  BudgetSection,
  HomeHubSection,
  ProjectsSection,
  CalendarSection,
  ReportsSection,
  SettingsSection,
  HOME_HUB_NAVIGATION,
  PROJECTS_NAVIGATION,
  CALENDAR_NAVIGATION,
  REPORTS_NAVIGATION,
  SETTINGS_NAVIGATION,
} from './types/navigation';

type PageKey = MainPageKey;

type IncomeFrequency = 'Weekly' | 'Fortnightly' | 'Monthly' | 'Quarterly' | 'Yearly' | 'One-off';
type SalaryFrequency = 'Weekly' | 'Fortnightly' | 'Monthly';
type RosterFrequency = 'Weekly' | 'Fortnightly' | 'Manual';
type IncomeType = 'Salary' | 'Casual / shift work' | 'Mixed income';
type OtherIncomeType = 'Rental income' | 'Government concessions' | 'Centrelink / family payments' | 'Child support' | 'Business income' | 'Side income' | 'Dividends / investments' | 'Other';

type SalaryEntry = {
  personName: string;
  employerName: string;
  annualSalary: string;
  payFrequency: SalaryFrequency;
  firstPayDate: string;
  superOption: boolean;
  taxEstimateOption: boolean;
  notes: string;
};

type RosterEntry = {
  personName: string;
  amount: string;
  hourlyRate: string;
  penaltyRates: string;
  overtime: string;
  publicHoliday: string;
  annualLeave: string;
  sickLeave: string;
  frequency: RosterFrequency;
  nextShiftDate: string;
  notes: string;
};

type OtherIncomeEntry = {
  id: number;
  incomeName: string;
  incomeType: OtherIncomeType;
  amount: string;
  frequency: IncomeFrequency;
  firstPaymentDate: string;
  endDate: string;
  person: string;
  notes: string;
};

type IncomeSettings = {
  incomeType: IncomeType;
  primarySalary: SalaryEntry;
  partnerSalary: SalaryEntry;
  primaryRoster: RosterEntry;
  partnerRoster: RosterEntry;
  leaveAdjustment: string;
  otherIncome: OtherIncomeEntry[];
};

type CalendarEvent = {
  id: number;
  title: string;
  date: number;
  type: 'Income' | 'Bills' | 'Projects' | 'Appointments' | 'Leave' | 'Holiday' | 'Warranty';
  color: string;
  time: string;
  detail: string;
};

type DocumentKind = 'Quote' | 'Invoice' | 'Receipt' | 'Warranty document' | 'Manual' | 'Photo' | 'Other file';

type ProjectDocument = {
  id: number;
  documentName: string;
  uploadDate: string;
  documentType: DocumentKind;
  supplier: string;
  purchaseDate: string;
  warrantyExpiryDate: string;
  amount: string;
  linkedProject: string;
  notes: string;
  fileName?: string;
};

type HouseholdWarrantyItem = {
  id: number;
  productName: string;
  category: string;
  purchaseDate: string;
  warrantyExpiryDate: string;
  amount: string;
  receiptFileName?: string;
  warrantyFileName?: string;
  manualFileName?: string;
  photoFileName?: string;
  notes: string;
};

type Project = {
  id: number;
  name: string;
  budget: number;
  spent: number;
  progress: number;
  notes: string;
  documents: ProjectDocument[];
};

type User = {
  id: number;
  name: string;
  email: string;
  householdId?: number;
  /** Profile avatar URL (from Google, Apple, etc.) */
  avatar?: string;
  /** All linked auth providers */
  providers: ConnectedProvider[];
};

type Household = {
  id: number;
  name: string;
  members: number[]; // user ids
};

type Bill = {
  id: number;
  name: string;
  amount: number;
  dueDate?: string;
  linkedProjectId?: number;
};

type WishlistItem = {
  id: number;
  title: string;
  amount?: number;
  notes?: string;
  linked?: boolean;
};

type ActivityType = 'bcr' | 'family';
type ActivityPost = {
  id: number;
  type: ActivityType;
  author?: string;
  message: string;
  date: string;
  meta?: Record<string, any>;
};

type MemberRestriction = {
  budgetAccess: boolean;
  calendarEditing: boolean;
  documentUploads: boolean;
  projectEditing: boolean;
  alerts: boolean;
  feedPosting: boolean;
};

type MemberContributor = {
  incomeContributor: boolean;
  homeOwner: boolean;
  primaryContact: boolean;
  emergencyContact: boolean;
  householdAdministrator: boolean;
};

type HouseholdMember = {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  dateOfBirth?: string;
  relationship: 'Mum' | 'Dad' | 'Mother' | 'Father' | 'Husband' | 'Wife' | 'Spouse' | 'Partner' | 'Son' | 'Daughter' | 'Child' | 'Brother' | 'Sister' | 'Grandmother' | 'Grandfather' | 'Grandparent' | 'Aunt' | 'Uncle' | 'Cousin' | 'Guardian' | 'Roommate' | 'Carer' | 'Other';
  role: 'Admin' | 'User';
  restrictions: MemberRestriction;
  contributors: MemberContributor;
};

type HouseholdSetupData = {
  name: string;
  currency: string;
  timeZone: string;
  members: HouseholdMember[];
  completed: boolean;
};

// Navigation framework implemented in Shell.tsx - navItems no longer needed here

const initialProjects: Project[] = [
  {
    id: 1,
    name: 'Kitchen',
    budget: 7800,
    spent: 4620,
    progress: 72,
    notes: 'Cabinets, lighting and splashback next.',
    documents: [
      {
        id: 1,
        documentName: 'Cabinet quote',
        uploadDate: '2026-06-18',
        documentType: 'Quote',
        supplier: 'Northshore Joinery',
        purchaseDate: '2026-06-18',
        warrantyExpiryDate: '2028-06-18',
        amount: '3200',
        linkedProject: 'Kitchen',
        notes: 'Cabinet layout and stone quote',
        fileName: 'cabinet-quote.pdf',
      },
      {
        id: 2,
        documentName: 'Appliance warranty',
        uploadDate: '2026-06-22',
        documentType: 'Warranty document',
        supplier: 'Harbour Appliances',
        purchaseDate: '2026-06-22',
        warrantyExpiryDate: '2028-06-22',
        amount: '980',
        linkedProject: 'Kitchen',
        notes: 'Integrated oven coverage',
        fileName: 'oven-warranty.pdf',
      },
    ],
  },
  {
    id: 2,
    name: 'Bathroom',
    budget: 3200,
    spent: 1980,
    progress: 58,
    notes: 'Tiles and vanity almost approved.',
    documents: [
      {
        id: 3,
        documentName: 'Vanity invoice',
        uploadDate: '2026-06-25',
        documentType: 'Invoice',
        supplier: 'Stone & Timber',
        purchaseDate: '2026-06-25',
        warrantyExpiryDate: '2027-06-25',
        amount: '1180',
        linkedProject: 'Bathroom',
        notes: 'Vanity and mirror package',
        fileName: 'vanity-invoice.pdf',
      },
    ],
  },
  {
    id: 3,
    name: 'Landscaping',
    budget: 2400,
    spent: 980,
    progress: 41,
    notes: 'Garden beds and lighting plan in motion.',
    documents: [],
  },
  {
    id: 4,
    name: 'Holiday',
    budget: 3200,
    spent: 2140,
    progress: 67,
    notes: 'Flights and accommodation locked in.',
    documents: [],
  },
  {
    id: 5,
    name: 'Emergency Fund',
    budget: 10000,
    spent: 5400,
    progress: 54,
    notes: 'Steady monthly contributions continue.',
    documents: [],
  },
];

const initialHouseholdItems: HouseholdWarrantyItem[] = [
  {
    id: 1,
    productName: 'Fridge',
    category: 'White goods',
    purchaseDate: '2025-03-17',
    warrantyExpiryDate: '2027-03-17',
    amount: '1899',
    receiptFileName: 'fridge-receipt.pdf',
    warrantyFileName: 'fridge-warranty.pdf',
    notes: 'Bottom freezer model',
  },
  {
    id: 2,
    productName: 'Washing machine',
    category: 'White goods',
    purchaseDate: '2026-02-08',
    warrantyExpiryDate: '2026-07-10',
    amount: '1299',
    receiptFileName: 'washer-receipt.pdf',
    warrantyFileName: 'washer-warranty.pdf',
    notes: 'Needs service reminder',
  },
  {
    id: 3,
    productName: 'Air conditioner',
    category: 'Electronics',
    purchaseDate: '2026-04-14',
    warrantyExpiryDate: '2026-08-20',
    amount: '1690',
    receiptFileName: 'ac-receipt.pdf',
    manualFileName: 'ac-manual.pdf',
    notes: 'Split system',
  },
];

const defaultIncomeSettings: IncomeSettings = {
  incomeType: 'Mixed income',
  primarySalary: {
    personName: 'Jessica',
    employerName: 'Northshore Studio',
    annualSalary: '78000',
    payFrequency: 'Monthly',
    firstPayDate: '2026-07-01',
    superOption: true,
    taxEstimateOption: true,
    notes: 'Primary salary',
  },
  partnerSalary: {
    personName: 'Partner',
    employerName: 'Harbour Co',
    annualSalary: '62000',
    payFrequency: 'Monthly',
    firstPayDate: '2026-07-15',
    superOption: false,
    taxEstimateOption: true,
    notes: 'Secondary salary',
  },
  primaryRoster: {
    personName: 'Jessica',
    amount: '24',
    hourlyRate: '32',
    penaltyRates: '180',
    overtime: '90',
    publicHoliday: '120',
    annualLeave: '60',
    sickLeave: '0',
    frequency: 'Weekly',
    nextShiftDate: '2026-07-06',
    notes: 'Weekend shifts',
  },
  partnerRoster: {
    personName: 'Partner',
    amount: '16',
    hourlyRate: '28',
    penaltyRates: '90',
    overtime: '40',
    publicHoliday: '60',
    annualLeave: '30',
    sickLeave: '0',
    frequency: 'Fortnightly',
    nextShiftDate: '2026-07-10',
    notes: 'Evening shifts',
  },
  leaveAdjustment: '-240',
  otherIncome: [
    {
      id: 1,
      incomeName: 'Rental income',
      incomeType: 'Rental income',
      amount: '1200',
      frequency: 'Monthly',
      firstPaymentDate: '2026-07-01',
      endDate: '',
      person: 'Jessica',
      notes: 'Studio rental',
    },
    {
      id: 2,
      incomeName: 'Family payment',
      incomeType: 'Centrelink / family payments',
      amount: '680',
      frequency: 'Fortnightly',
      firstPaymentDate: '2026-07-08',
      endDate: '',
      person: 'Family',
      notes: 'Regular support payment',
    },
  ],
};

function addMonths(date: Date, count: number) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + count);
  return result;
}

function addWeeks(date: Date, count: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + count * 7);
  return result;
}

function getSalaryAmount(entry: SalaryEntry) {
  const annual = Number(entry.annualSalary);
  if (Number.isNaN(annual) || annual <= 0) {
    return 0;
  }

  switch (entry.payFrequency) {
    case 'Weekly':
      return annual / 52;
    case 'Fortnightly':
      return annual / 26;
    default:
      return annual / 12;
  }
}

function getRosterAmount(entry: RosterEntry) {
  const hours = Number(entry.amount);
  const hourlyRate = Number(entry.hourlyRate);
  if (Number.isNaN(hours) || hours <= 0 || Number.isNaN(hourlyRate) || hourlyRate <= 0) {
    return 0;
  }

  const baseWeekly = hours * hourlyRate;
  const extras = [entry.penaltyRates, entry.overtime, entry.publicHoliday, entry.annualLeave, entry.sickLeave]
    .reduce((sum, value) => sum + (Number(value) || 0), 0);
  const weeklyEstimate = baseWeekly + extras;

  switch (entry.frequency) {
    case 'Weekly':
      return weeklyEstimate * 4;
    case 'Fortnightly':
      return weeklyEstimate * 2;
    default:
      return weeklyEstimate;
  }
}

function getOtherIncomeAmount(entry: OtherIncomeEntry) {
  const amount = Number(entry.amount);
  if (Number.isNaN(amount) || amount <= 0) {
    return 0;
  }

  switch (entry.frequency) {
    case 'Weekly':
      return amount * 4;
    case 'Fortnightly':
      return amount * 2;
    case 'Monthly':
      return amount;
    case 'Quarterly':
      return amount / 3;
    case 'Yearly':
      return amount / 12;
    default:
      return amount;
  }
}

function buildForecast(settings: IncomeSettings) {
  const confirmedSalaryIncome = getSalaryAmount(settings.primarySalary) + getSalaryAmount(settings.partnerSalary);
  const estimatedRosterIncome = getRosterAmount(settings.primaryRoster) + getRosterAmount(settings.partnerRoster);
  const otherIncome = settings.otherIncome.reduce((sum, entry) => sum + getOtherIncomeAmount(entry), 0);
  const leaveAdjustment = Number(settings.leaveAdjustment) || 0;
  const totalPredictedHouseholdIncome = confirmedSalaryIncome + estimatedRosterIncome + otherIncome + leaveAdjustment;

  const nextSalaryDate = [settings.primarySalary.firstPayDate, settings.partnerSalary.firstPayDate].find((date) => Boolean(date));
  const nextRosterDate = [settings.primaryRoster.nextShiftDate, settings.partnerRoster.nextShiftDate].find((date) => Boolean(date));
  const otherDates = settings.otherIncome.map((entry) => entry.firstPaymentDate).filter(Boolean);
  const nextPayDateCandidates = [nextSalaryDate, nextRosterDate, ...otherDates].filter((date): date is string => Boolean(date));
  const nextPayDate = nextPayDateCandidates.sort((a, b) => Date.parse(a) - Date.parse(b))[0] || '—';

  return {
    confirmedSalaryIncome,
    estimatedRosterIncome,
    otherIncome,
    totalPredictedHouseholdIncome,
    nextPayDate,
  };
}

function buildPayDayEvents(settings: IncomeSettings): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const today = new Date();

  const pushEntry = (entry: SalaryEntry, label: string) => {
    const amountValue = Number(entry.annualSalary);
    if (!entry.personName || !entry.firstPayDate || Number.isNaN(amountValue) || amountValue <= 0) {
      return;
    }

    const startDate = new Date(entry.firstPayDate);
    let cursor = startDate;
    while (cursor < today) {
      if (entry.payFrequency === 'Weekly') cursor = addWeeks(cursor, 1);
      else if (entry.payFrequency === 'Fortnightly') cursor = addWeeks(cursor, 2);
      else cursor = addMonths(cursor, 1);
    }

    for (let index = 0; index < 6; index += 1) {
      if (cursor > new Date(today.getFullYear(), today.getMonth() + 6, 1)) {
        break;
      }

      events.push({
        id: Number(`${Date.parse(cursor.toISOString())}${index}`),
        title: `${label} Pay Day`,
        date: cursor.getDate(),
        type: 'Income',
        color: 'bg-vaultly-sage text-white',
        time: '09:00',
        detail: `${entry.employerName || 'Household income'} · ${entry.payFrequency}`,
      });

      if (entry.payFrequency === 'Weekly') cursor = addWeeks(cursor, 1);
      else if (entry.payFrequency === 'Fortnightly') cursor = addWeeks(cursor, 2);
      else cursor = addMonths(cursor, 1);
    }
  };

  if (settings.incomeType !== 'Casual / shift work') {
    pushEntry(settings.primarySalary, settings.primarySalary.personName || 'Primary');
    pushEntry(settings.partnerSalary, settings.partnerSalary.personName || 'Partner');
  }

  return events.sort((a, b) => a.date - b.date);
}

function buildRosterEvents(settings: IncomeSettings): CalendarEvent[] {
  if (settings.incomeType === 'Salary') {
    return [];
  }

  const events: CalendarEvent[] = [];
  const pushEntry = (entry: RosterEntry, label: string) => {
    const amountValue = Number(entry.amount);
    if (!entry.personName || !entry.nextShiftDate || Number.isNaN(amountValue) || amountValue <= 0) {
      return;
    }

    const startDate = new Date(entry.nextShiftDate);
    const step = entry.frequency === 'Fortnightly' ? 14 : entry.frequency === 'Weekly' ? 7 : 0;

    for (let index = 0; index < 4; index += 1) {
      const cursor = new Date(startDate);
      if (step > 0) {
        cursor.setDate(startDate.getDate() + index * step);
      } else {
        cursor.setDate(startDate.getDate() + index);
      }

      events.push({
        id: Number(`${Date.parse(cursor.toISOString())}${index}`),
        title: `${label} shift`,
        date: cursor.getDate(),
        type: 'Income',
        color: 'bg-vaultly-navy text-white',
        time: '18:00',
        detail: `${entry.notes || 'Casual shift'} · ${entry.frequency}`,
      });
    }
  };

  pushEntry(settings.primaryRoster, settings.primaryRoster.personName || 'Primary');
  pushEntry(settings.partnerRoster, settings.partnerRoster.personName || 'Partner');

  return events.sort((a, b) => a.date - b.date);
}

function buildOtherIncomeEvents(settings: IncomeSettings): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  settings.otherIncome.forEach((entry, index) => {
    const amountValue = Number(entry.amount);
    if (!entry.incomeName || !entry.firstPaymentDate || Number.isNaN(amountValue) || amountValue <= 0) {
      return;
    }

    const startDate = new Date(entry.firstPaymentDate);
    const count = entry.frequency === 'One-off' ? 1 : entry.frequency === 'Weekly' ? 4 : entry.frequency === 'Fortnightly' ? 4 : entry.frequency === 'Monthly' ? 4 : entry.frequency === 'Quarterly' ? 4 : 3;

    for (let stepIndex = 0; stepIndex < count; stepIndex += 1) {
      const cursor = new Date(startDate);
      if (entry.frequency === 'Weekly') {
        cursor.setDate(startDate.getDate() + stepIndex * 7);
      } else if (entry.frequency === 'Fortnightly') {
        cursor.setDate(startDate.getDate() + stepIndex * 14);
      } else if (entry.frequency === 'Monthly') {
        cursor.setMonth(startDate.getMonth() + stepIndex);
      } else if (entry.frequency === 'Quarterly') {
        cursor.setMonth(startDate.getMonth() + stepIndex * 3);
      } else if (entry.frequency === 'Yearly') {
        cursor.setFullYear(startDate.getFullYear() + stepIndex);
      }

      if (entry.endDate && cursor > new Date(entry.endDate)) {
        break;
      }

      events.push({
        id: Number(`${Date.parse(cursor.toISOString())}${index}${stepIndex}`),
        title: `${entry.incomeName} payment`,
        date: cursor.getDate(),
        type: 'Income',
        color: 'bg-vaultly-mustard text-vaultly-navy',
        time: '09:30',
        detail: `${entry.incomeType} · ${entry.frequency}`,
      });
    }
  });

  return events.sort((a, b) => a.date - b.date);
}

function buildWarrantyEvents(warrantyItems: HouseholdWarrantyItem[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  warrantyItems.forEach((item, index) => {
    const expiryDate = new Date(item.warrantyExpiryDate);
    if (Number.isNaN(expiryDate.getTime())) return;

    events.push({
      id: Number(`${Date.parse(expiryDate.toISOString())}${index}`),
      title: `${item.productName} warranty`,
      date: expiryDate.getDate(),
      type: 'Warranty',
      color: 'bg-[#D8CFC4] text-[#24384D]',
      time: '10:00',
      detail: `${item.category} · expires ${expiryDate.toLocaleDateString('en-AU')}`,
    });
  });

  return events.sort((a, b) => a.date - b.date);
}

function buildCalendarEvents(settings: IncomeSettings, warrantyItems: HouseholdWarrantyItem[]): CalendarEvent[] {
  const payDayEvents = buildPayDayEvents(settings);
  const rosterEvents = buildRosterEvents(settings);
  const otherIncomeEvents = buildOtherIncomeEvents(settings);
  const warrantyEvents = buildWarrantyEvents(warrantyItems);
  const additionalEvents: CalendarEvent[] = [
    {
      id: 9000,
      title: 'Savings transfer',
      date: 25,
      type: 'Income',
      color: 'bg-[#A8B99A] text-white',
      time: '07:00',
      detail: 'Transfer to emergency fund',
    },
    {
      id: 9001,
      title: 'Leave / Family time',
      date: 14,
      type: 'Leave',
      color: 'bg-[#D8CFC4] text-[#24384D]',
      time: 'All day',
      detail: 'Leave adjustment applied',
    },
    {
      id: 9002,
      title: 'Public holiday',
      date: 4,
      type: 'Holiday',
      color: 'bg-[#D8B65A] text-[#24384D]',
      time: 'All day',
      detail: 'Public holiday calendar entry',
    },
    {
      id: 9003,
      title: 'Electricity Bill',
      date: 8,
      type: 'Bills',
      color: 'bg-[#D8B65A] text-[#24384D]',
      time: '08:30',
      detail: 'Utility payment due before noon.',
    },
    {
      id: 9004,
      title: 'Kitchen Visit',
      date: 12,
      type: 'Projects',
      color: 'bg-vaultly-terracotta text-white',
      time: '14:00',
      detail: 'Confirm materials and final cabinet colour.',
    },
    {
      id: 9005,
      title: 'Doctor Appointment',
      date: 18,
      type: 'Appointments',
      color: 'bg-vaultly-navy text-white',
      time: '10:00',
      detail: 'Annual checkup with Dr. Lee.',
    },
    {
      id: 9006,
      title: 'Budget Review',
      date: 21,
      type: 'Bills',
      color: 'bg-[#D8B65A] text-[#24384D]',
      time: '19:30',
      detail: 'Review this month’s recurring obligations.',
    },
  ];

  return [...payDayEvents, ...rosterEvents, ...otherIncomeEvents, ...warrantyEvents, ...additionalEvents].sort((a, b) => a.date - b.date);
}

function App() {
  const [activePage, setActivePage] = useState<PageKey>('dashboard');
  const [incomeSettings] = useState<IncomeSettings>(defaultIncomeSettings);
  const STORAGE_KEY = 'vaultly_state_v1';

  const loadState = () => {
    try {
      if (typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  };

  const saveState = (payload: Record<string, any>) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      // ignore
    }
  };

  const persisted = typeof window !== 'undefined' ? loadState() : null;

  const [projects, setProjects] = useState<Project[]>(persisted?.projects ?? initialProjects);
  const [householdWarrantyItems, setHouseholdWarrantyItems] = useState<HouseholdWarrantyItem[]>(persisted?.householdWarrantyItems ?? initialHouseholdItems);
  const [budgetState, setBudgetState] = useState<BudgetState>(persisted?.budgetState ?? initialBudgetState);

  const [users, setUsers] = useState<User[]>(persisted?.users ?? []);
  const [currentUser, setCurrentUser] = useState<User | null>(persisted?.currentUser ?? null);
  const [households, setHouseholds] = useState<Household[]>(persisted?.households ?? []);
  const [bills, setBills] = useState<Bill[]>(persisted?.bills ?? []);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(persisted?.wishlist ?? []);
  const [activityFeed, setActivityFeed] = useState<ActivityPost[]>(persisted?.activityFeed ?? []);
  const [householdSetupData, setHouseholdSetupData] = useState<HouseholdSetupData | null>(persisted?.householdSetupData ?? null);
  const [showSetupWizard, setShowSetupWizard] = useState(false);
  const [newSignupName, setNewSignupName] = useState('');

  // Modal form state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'project-doc' | 'household-item' | 'bill' | 'wishlist' | 'calendar-event' | null>(null);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create'); // create or edit
  const [modalProjectId, setModalProjectId] = useState<number | null>(null);
  const [editingEntityId, setEditingEntityId] = useState<number | null>(null); // ID of entity being edited
  const [modalFormData, setModalFormData] = useState<Record<string, string>>({});

  // UI shell state
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Module navigation state
  const [budgetSection, setBudgetSection] = useState<BudgetSection>('overview');
  const [homeHubSection, setHomeHubSection] = useState<HomeHubSection>('home-feed');
  const [projectsSection, setProjectsSection] = useState<ProjectsSection>('overview');
  const [calendarSection, setCalendarSection] = useState<CalendarSection>('month');
  const [reportsSection, setReportsSection] = useState<ReportsSection>('overview');
  const [settingsSection, setSettingsSection] = useState<SettingsSection>('profile');

  useEffect(() => {
    saveState({ projects, householdWarrantyItems, users, currentUser, households, bills, wishlist, activityFeed, householdSetupData, budgetState });
  }, [projects, householdWarrantyItems, users, currentUser, households, bills, wishlist, activityFeed, householdSetupData, budgetState]);

  const forecast = useMemo(() => buildForecast(incomeSettings), [incomeSettings]);
  const calendarEvents = useMemo(() => buildCalendarEvents(incomeSettings, householdWarrantyItems), [incomeSettings, householdWarrantyItems]);

  const pushActivity = (type: ActivityType, message: string, meta?: Record<string, any>) => {
    const post: ActivityPost = {
      id: Date.now(),
      type,
      author: type === 'family' ? (currentUser?.name ?? 'Family') : 'BCR',
      message,
      date: new Date().toISOString(),
      meta: meta || {},
    };
    setActivityFeed((s) => [post, ...s]);
  };

  const signUp = (name: string, email: string, googleProfile?: GoogleProfile) => {
    try {
      const newUser: User = {
        id: Date.now(),
        name,
        email,
        avatar: googleProfile?.picture,
        providers: googleProfile
          ? [{ provider: 'google', providerId: googleProfile.googleId, displayName: googleProfile.email, avatar: googleProfile.picture, linkedAt: new Date().toISOString() }]
          : [],
      };
      setUsers((u) => [...u, newUser]);
      setCurrentUser(newUser);
      setNewSignupName(name);
      setShowSetupWizard(true);
      pushActivity('bcr', `New user ${name} signed up`);
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  /** Sign in with Google — creates account if new, links if existing */
  const googleSignIn = (profile: GoogleProfile) => {
    const existing = users.find((u) => u.email === profile.email);
    if (existing) {
      // Link Google to existing account if not already linked
      const alreadyLinked = existing.providers?.some((p) => p.provider === 'google');
      if (!alreadyLinked) {
        const updated: User = {
          ...existing,
          avatar: existing.avatar ?? profile.picture,
          providers: [
            ...(existing.providers ?? []),
            { provider: 'google', providerId: profile.googleId, displayName: profile.email, avatar: profile.picture, linkedAt: new Date().toISOString() },
          ],
        };
        setUsers((u) => u.map((x) => (x.id === existing.id ? updated : x)));
        setCurrentUser(updated);
      } else {
        setCurrentUser(existing);
      }
      pushActivity('bcr', `${existing.name} signed in via Google`);
    } else {
      // New user — create account and go to onboarding
      signUp(profile.name, profile.email, profile);
    }
  };

  const handleWizardComplete = (data: HouseholdSetupData) => {
    // Create household from wizard data
    const newHousehold: Household = {
      id: Date.now(),
      name: data.name,
      members: currentUser ? [currentUser.id] : []
    };
    setHouseholds((h) => [...h, newHousehold]);
    
    // Update current user with household ID
    if (currentUser) {
      const updated = { ...currentUser, householdId: newHousehold.id };
      setCurrentUser(updated);
      setUsers((u) => u.map((x) => (x.id === currentUser.id ? updated : x)));
    }
    
    // Save household setup data
    setHouseholdSetupData(data);
    setShowSetupWizard(false);
    
    pushActivity('bcr', `Household setup completed: ${data.name}`);
  };

  const login = (email: string) => {
    try {
      const found = users.find((u) => u.email === email);
      if (found) {
        setCurrentUser(found);
        pushActivity('bcr', `${found.name} signed in`);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    if (currentUser) pushActivity('bcr', `${currentUser.name} signed out`);
    setCurrentUser(null);
  };

  const addProjectDocument = (projectId: number) => {
    setModalProjectId(projectId);
    setModalType('project-doc');
    setModalMode('create');
    setEditingEntityId(null);
    setModalFormData({ name: '', supplier: '', amount: '' });
    setModalOpen(true);
  };

  const submitProjectDocument = () => {
    const { name, supplier = '', amount = '0' } = modalFormData;
    if (!name) return;
    const doc: ProjectDocument = {
      id: Date.now(),
      documentName: name,
      uploadDate: new Date().toISOString().split('T')[0],
      documentType: 'Other file',
      supplier,
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiryDate: '',
      amount,
      linkedProject: '',
      notes: '',
    };
    setProjects((prev) => prev.map((p) => (p.id === modalProjectId ? { ...p, documents: [...p.documents, doc] } : p)));
    pushActivity('bcr', `Added document '${name}' to project ID ${modalProjectId}`, { projectId: modalProjectId });
    setModalOpen(false);
  };

  const _addHouseholdItem = () => {
    setModalType('household-item');
    setModalMode('create');
    setEditingEntityId(null);
    setModalFormData({ title: '', amount: '' });
    setModalOpen(true);
  };

  const submitHouseholdItem = () => {
    const { title, amount = '0' } = modalFormData;
    if (!title) return;
    const item: HouseholdWarrantyItem = {
      id: Date.now(),
      productName: title,
      category: 'General',
      purchaseDate: new Date().toISOString().split('T')[0],
      warrantyExpiryDate: '',
      amount,
      notes: '',
    };
    setHouseholdWarrantyItems((s) => [item, ...s]);
    pushActivity('bcr', `Added household item ${title}`);
    setModalOpen(false);
  };

  const addBill = () => {
    setModalType('bill');
    setModalMode('create');
    setEditingEntityId(null);
    setModalFormData({ name: '', amount: '', dueDate: '' });
    setModalOpen(true);
  };

  const submitBill = () => {
    const { name, amount = '0', dueDate } = modalFormData;
    if (!name) return;
    if (modalMode === 'edit' && editingEntityId) {
      setBills((b) => b.map((bill) => (bill.id === editingEntityId ? { ...bill, name, amount: Number(amount), dueDate } : bill)));
      pushActivity('bcr', `Updated bill ${name}`, { amount: Number(amount), dueDate });
    } else {
      const bill: Bill = { id: Date.now(), name, amount: Number(amount), dueDate };
      setBills((b) => [bill, ...b]);
      pushActivity('bcr', `Added bill ${name}`, { amount: Number(amount), dueDate });
    }
    setModalOpen(false);
    setEditingEntityId(null);
  };

  const _editBill = (billId: number) => {
    const bill = bills.find((b) => b.id === billId);
    if (!bill) return;
    setModalType('bill');
    setModalMode('edit');
    setEditingEntityId(billId);
    setModalFormData({ name: bill.name, amount: bill.amount.toString(), dueDate: bill.dueDate || '' });
    setModalOpen(true);
  };

  const _deleteBill = (billId: number) => {
    const bill = bills.find((b) => b.id === billId);
    if (!bill) return;
    setBills((b) => b.filter((x) => x.id !== billId));
    pushActivity('bcr', `Deleted bill ${bill.name}`);
  };

  const addWishlistItem = () => {
    setModalType('wishlist');
    setModalMode('create');
    setEditingEntityId(null);
    setModalFormData({ title: '', amount: '' });
    setModalOpen(true);
  };

  const submitWishlistItem = () => {
    const { title, amount = '0' } = modalFormData;
    if (!title) return;
    if (modalMode === 'edit' && editingEntityId) {
      setWishlist((w) => w.map((item) => (item.id === editingEntityId ? { ...item, title, amount: Number(amount) || undefined } : item)));
      pushActivity('bcr', `Updated wishlist item ${title}`);
    } else {
      const item: WishlistItem = { id: Date.now(), title, amount: Number(amount) || undefined };
      setWishlist((w) => [item, ...w]);
      pushActivity('bcr', `Added wishlist item ${title}`);
    }
    setModalOpen(false);
    setEditingEntityId(null);
  };

  const _editWishlistItem = (itemId: number) => {
    const item = wishlist.find((w) => w.id === itemId);
    if (!item) return;
    setModalType('wishlist');
    setModalMode('edit');
    setEditingEntityId(itemId);
    setModalFormData({ title: item.title, amount: (item.amount || '').toString() });
    setModalOpen(true);
  };

  const _deleteWishlistItem = (itemId: number) => {
    const item = wishlist.find((w) => w.id === itemId);
    if (!item) return;
    setWishlist((w) => w.filter((x) => x.id !== itemId));
    pushActivity('bcr', `Deleted wishlist item ${item.title}`);
  };

  // Use handlers to avoid "declared but never read" errors
  void addBill;
  void addWishlistItem;

  // Navigation handler
  const handleNavigation = (pageKey: string) => {
    // Validate that the pageKey is a valid main page
    const validPages: MainPageKey[] = ['dashboard', 'budget', 'home-hub', 'projects', 'calendar', 'reports', 'settings'];
    if (validPages.includes(pageKey as MainPageKey)) {
      setActivePage(pageKey as MainPageKey);
    }
    setShowProfileMenu(false);
    setShowQuickAdd(false);
    setShowNotifications(false);
  };

  const handleModuleNavigate = (sectionKey: string) => {
    switch (activePage) {
      case 'budget':
        if (sectionKey !== budgetSection) setBudgetSection(sectionKey as BudgetSection);
        break;
      case 'home-hub':
        if (sectionKey !== homeHubSection) setHomeHubSection(sectionKey as HomeHubSection);
        break;
      case 'projects':
        if (sectionKey !== projectsSection) setProjectsSection(sectionKey as ProjectsSection);
        break;
      case 'calendar':
        if (sectionKey !== calendarSection) setCalendarSection(sectionKey as CalendarSection);
        break;
      case 'reports':
        if (sectionKey !== reportsSection) setReportsSection(sectionKey as ReportsSection);
        break;
      case 'settings':
        if (sectionKey !== settingsSection) setSettingsSection(sectionKey as SettingsSection);
        break;
    }
  };

  // Suppress unused warnings for future implementations
  void _addHouseholdItem;
  void _editBill;
  void _deleteBill;
  void _editWishlistItem;
  void _deleteWishlistItem;
  void _BudgetPageLegacy;
  void _DocumentsPage;
  void _ProfilePage;

  const pageContent = useMemo(() => {
    if (!currentUser) {
      return <AuthPage onSignUp={signUp} onLogin={login} onGoogleSignIn={googleSignIn} />;
    }

    // Render page-specific module navigation for pages with internal sections
    const renderPageWithModuleNav = (
      page: MainPageKey,
      currentSection: string,
      navItems: any[],
      content: React.ReactNode
    ) => {
      return (
        <>
          <ModuleNav
            title={page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ')}
            items={navItems}
            activeSection={currentSection}
            onNavigate={handleModuleNavigate}
          />
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {content}
          </div>
        </>
      );
    };

    switch (activePage) {
      case 'budget':
        return <BudgetPage budgetState={budgetState} onBudgetStateChange={setBudgetState} />;
      case 'home-hub':
        return renderPageWithModuleNav(
          'home-hub',
          homeHubSection,
          HOME_HUB_NAVIGATION,
          <div>Home Hub module - Section: {homeHubSection}</div>
        );
      case 'projects':
        return renderPageWithModuleNav(
          'projects',
          projectsSection,
          PROJECTS_NAVIGATION,
          <ProjectsPage projects={projects} onAddDocument={addProjectDocument} />
        );
      case 'calendar':
        return renderPageWithModuleNav(
          'calendar',
          calendarSection,
          CALENDAR_NAVIGATION,
          <CalendarPage events={calendarEvents} householdItems={householdWarrantyItems} />
        );
      case 'reports':
        return renderPageWithModuleNav(
          'reports',
          reportsSection,
          REPORTS_NAVIGATION,
          <ReportsPage />
        );
      case 'settings':
        return renderPageWithModuleNav(
          'settings',
          settingsSection,
          SETTINGS_NAVIGATION,
          <SettingsPage 
            onLogout={logout} 
            currentUser={currentUser} 
            onLinkGoogle={googleSignIn}
            settingsSection={settingsSection}
            householdSetupData={householdSetupData}
            onUpdateHousehold={(updatedData) => setHouseholdSetupData({ ...householdSetupData!, ...updatedData })}
          />
        );
      default:
        return <DashboardPage />;
    }
  }, [
    activePage,
    budgetSection,
    homeHubSection,
    projectsSection,
    calendarSection,
    reportsSection,
    settingsSection,
    incomeSettings,
    forecast,
    calendarEvents,
    householdWarrantyItems,
    projects,
    currentUser,
    budgetState,
  ]);

  // Check for brand preview route
  if (typeof window !== 'undefined' && window.location.pathname === '/brand-preview') {
    return <BrandPreview />;
  }

  return !currentUser ? (
    // Authentication standalone experience
    <AuthPage onSignUp={signUp} onLogin={login} onGoogleSignIn={googleSignIn} />
  ) : showSetupWizard ? (
    // Household setup wizard
    <HouseholdSetupWizard onComplete={handleWizardComplete} initialUserName={newSignupName} />
  ) : (
    // Authenticated app shell with premium navigation
    <div className="min-h-screen bg-white text-vaultly-navy flex flex-col">
      {/* Top Bar - Premium Navigation */}
      <TopBar
        householdName={householdSetupData?.name || 'Your Household'}
        userName={currentUser?.name || 'User'}
        userRole={'Admin' as 'Admin' | 'User'}
        onProfileMenuToggle={() => setShowProfileMenu(!showProfileMenu)}
        onNotificationsToggle={() => setShowNotifications(!showNotifications)}
        onQuickAddToggle={() => setShowQuickAdd(!showQuickAdd)}
      />

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop Navigation */}
        <Sidebar
          activePage={activePage}
          onNavigate={handleNavigation}
          collapsible={true}
        />

        {/* Main Content Area */}
        <main className={`flex-1 overflow-y-auto pb-24 lg:pb-0 ${activePage === 'budget' ? 'bg-white' : ''}`}>
          {/* Budget page has its own layout */}
          {activePage === 'budget' && pageContent}
          
          {/* Dashboard with container */}
          {activePage === 'dashboard' && (
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {pageContent}
            </div>
          )}
          
          {/* Other module pages with module navigation */}
          {activePage !== 'dashboard' && activePage !== 'budget' && pageContent}
        </main>
      </div>

      {/* Notification Center */}
      <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

      {/* Quick Add Menu */}
      <QuickAddMenu isOpen={showQuickAdd} onClose={() => setShowQuickAdd(false)} />

      {/* Profile Menu */}
      <ProfileMenu
        isOpen={showProfileMenu}
        onClose={() => setShowProfileMenu(false)}
        userName={currentUser?.name || 'User'}
        householdName={householdSetupData?.name || 'Your Household'}
        userRole={'Admin' as 'Admin' | 'User'}
        onProfileClick={() => {
          handleNavigation('settings');
          setSettingsSection('profile');
        }}
        onHouseholdClick={() => handleNavigation('dashboard')}
        onSettingsClick={() => handleNavigation('settings')}
        onLogout={logout}
      />

      {/* Mobile Navigation Bar */}
      <MobileNavBar
        activePage={activePage}
        onNavigate={handleNavigation}
      />

      {/* Modal Form */}
      {currentUser && modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-lg font-semibold text-[#24384D]">
              {modalMode === 'edit' ? 'Edit' : 'Add'}{' '}
              {modalType === 'project-doc' && 'Project Document'}
              {modalType === 'household-item' && 'Household Item'}
              {modalType === 'bill' && 'Bill'}
              {modalType === 'wishlist' && 'Wishlist Item'}
              {modalType === 'calendar-event' && 'Calendar Event'}
            </h2>
            <div className="space-y-3">
              {(modalType === 'project-doc' || modalType === 'household-item' || modalType === 'bill' || modalType === 'wishlist') && (
                <>
                  {(modalType === 'project-doc') && (
                    <>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Document name</span>
                        <input
                          type="text"
                          value={modalFormData.name || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                          placeholder="e.g., Cabinet quote"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Supplier</span>
                        <input
                          type="text"
                          value={modalFormData.supplier || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, supplier: e.target.value })}
                          placeholder="Optional"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Amount</span>
                        <input
                          type="number"
                          value={modalFormData.amount || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, amount: e.target.value })}
                          placeholder="0"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                    </>
                  )}
                  {(modalType === 'household-item') && (
                    <>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Item name</span>
                        <input
                          type="text"
                          value={modalFormData.title || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, title: e.target.value })}
                          placeholder="e.g., Refrigerator"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Amount</span>
                        <input
                          type="number"
                          value={modalFormData.amount || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, amount: e.target.value })}
                          placeholder="0"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                    </>
                  )}
                  {(modalType === 'bill') && (
                    <>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Bill name</span>
                        <input
                          type="text"
                          value={modalFormData.name || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, name: e.target.value })}
                          placeholder="e.g., Electricity"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Amount</span>
                        <input
                          type="number"
                          value={modalFormData.amount || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, amount: e.target.value })}
                          placeholder="0"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Due date</span>
                        <input
                          type="date"
                          value={modalFormData.dueDate || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, dueDate: e.target.value })}
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                    </>
                  )}
                  {(modalType === 'wishlist') && (
                    <>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Item name</span>
                        <input
                          type="text"
                          value={modalFormData.title || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, title: e.target.value })}
                          placeholder="e.g., New couch"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                      <label className="block text-sm text-[#5B6F82]">
                        <span className="mb-1 block">Desired amount</span>
                        <input
                          type="number"
                          value={modalFormData.amount || ''}
                          onChange={(e) => setModalFormData({ ...modalFormData, amount: e.target.value })}
                          placeholder="0"
                          className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#24384D]"
                        />
                      </label>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  setModalOpen(false);
                  setEditingEntityId(null);
                  setModalMode('create');
                }}
                className="flex-1 rounded-2xl border border-vaultly-grey bg-white px-4 py-2 text-sm font-semibold text-vaultly-navy"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (modalType === 'project-doc') submitProjectDocument();
                  else if (modalType === 'household-item') submitHouseholdItem();
                  else if (modalType === 'bill') submitBill();
                  else if (modalType === 'wishlist') submitWishlistItem();
                }}
                className="flex-1 rounded-2xl bg-vaultly-navy px-4 py-2 text-sm font-semibold text-white"
              >
                {modalMode === 'edit' ? 'Save' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HouseholdSetupWizard({ onComplete, initialUserName }: { onComplete: (data: HouseholdSetupData) => void; initialUserName: string }) {
  const [step, setStep] = useState(1);
  
  // Step 1: Household Details
  const [householdName, setHouseholdName] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('AUD');
  const [selectedTimeZone, setSelectedTimeZone] = useState('Australia/Sydney');

  // Step 2: Family Profiles
  const [members, setMembers] = useState<HouseholdMember[]>([
    {
      id: 1,
      firstName: initialUserName.split(' ')[0],
      lastName: initialUserName.split(' ')[1] || '',
      middleName: undefined,
      dateOfBirth: undefined,
      relationship: 'Other',
      role: 'Admin',
      restrictions: {
        budgetAccess: true,
        calendarEditing: true,
        documentUploads: true,
        projectEditing: true,
        alerts: true,
        feedPosting: true,
      },
      contributors: {
        incomeContributor: false,
        homeOwner: false,
        primaryContact: false,
        emergencyContact: false,
        householdAdministrator: true,
      },
    },
  ]);
  const [newMemberFirstName, setNewMemberFirstName] = useState('');
  const [newMemberLastName, setNewMemberLastName] = useState('');
  const [newMemberMiddleName, setNewMemberMiddleName] = useState('');
  const [newMemberDOB, setNewMemberDOB] = useState('');
  const [newMemberRelationship, setNewMemberRelationship] = useState<HouseholdMember['relationship']>('Other');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'User'>('User');

  // Step 3-4: Tracking expanded sections for advanced options
  const [expandedRestrictions, setExpandedRestrictions] = useState<Set<number>>(new Set());
  const [expandedContributors, setExpandedContributors] = useState<Set<number>>(new Set());

  const currencies = ['AUD', 'USD', 'GBP', 'NZD', 'CAD', 'EUR'];
  
  const timeZones = [
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Brisbane',
    'Australia/Perth',
    'Australia/Adelaide',
    'Australia/Hobart',
    'Pacific/Auckland',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
  ];

  const relationships: HouseholdMember['relationship'][] = [
    'Mum', 'Dad', 'Mother', 'Father', 'Husband', 'Wife', 'Spouse', 'Partner',
    'Son', 'Daughter', 'Child', 'Brother', 'Sister',
    'Grandmother', 'Grandfather', 'Grandparent', 'Aunt', 'Uncle', 'Cousin',
    'Guardian', 'Roommate', 'Carer', 'Other',
  ];

  const addMember = () => {
    if (!newMemberFirstName.trim()) return;
    const newMember: HouseholdMember = {
      id: Date.now(),
      firstName: newMemberFirstName,
      lastName: newMemberLastName,
      middleName: newMemberMiddleName || undefined,
      dateOfBirth: newMemberDOB || undefined,
      relationship: newMemberRelationship,
      role: newMemberRole,
      restrictions: {
        budgetAccess: true,
        calendarEditing: true,
        documentUploads: true,
        projectEditing: true,
        alerts: true,
        feedPosting: true,
      },
      contributors: {
        incomeContributor: false,
        homeOwner: false,
        primaryContact: false,
        emergencyContact: false,
        householdAdministrator: false,
      },
    };
    setMembers([...members, newMember]);
    setNewMemberFirstName('');
    setNewMemberLastName('');
    setNewMemberMiddleName('');
    setNewMemberDOB('');
    setNewMemberRelationship('Other');
    setNewMemberRole('User');
  };

  const removeMember = (id: number) => {
    if (members.length > 1) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const updateMemberRestriction = (memberId: number, key: keyof MemberRestriction, value: boolean) => {
    setMembers(members.map(m =>
      m.id === memberId
        ? { ...m, restrictions: { ...m.restrictions, [key]: value } }
        : m
    ));
  };

  const updateMemberContributor = (memberId: number, key: keyof MemberContributor, value: boolean) => {
    setMembers(members.map(m =>
      m.id === memberId
        ? { ...m, contributors: { ...m.contributors, [key]: value } }
        : m
    ));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return householdName.trim().length > 0;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return members.length > 0;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (canProceed() && step < 6) {
      setStep(step + 1);
    }
  };

  const handleComplete = () => {
    if (canProceed()) {
      onComplete({
        name: householdName,
        currency: selectedCurrency,
        timeZone: selectedTimeZone,
        members,
        completed: true,
      });
    }
  };

  const progressPercent = (step / 6) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-vaultly-grey">
        <div
          className="h-full bg-gradient-to-r from-vaultly-terracotta to-vaultly-mustard transition-all duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <VaultlyLogo variant="full" size="xl" />
        </div>

        {/* Step Container */}
        <div className="w-full max-w-2xl">
          {/* Step 1: Household Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-vaultly-navy" style={{ fontFamily: 'DM Sans, sans-serif' }}>Household Details</h1>
                <p className="mt-2 text-base text-vaultly-sage">Step 1 of 6: Set up your household</p>
              </div>

              <div className="rounded-[24px] bg-white p-8 border border-vaultly-grey space-y-6">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-vaultly-navy">Household Name *</span>
                  <input
                    type="text"
                    value={householdName}
                    onChange={(e) => setHouseholdName(e.target.value)}
                    placeholder="e.g., The Smiths"
                    className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage focus:outline-none focus:ring-2 focus:ring-vaultly-navy"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-vaultly-navy">Currency</span>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy focus:outline-none focus:ring-2 focus:ring-vaultly-navy"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>{currency}</option>
                    ))}
                  </select>
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-vaultly-navy">Time Zone</span>
                  <select
                    value={selectedTimeZone}
                    onChange={(e) => setSelectedTimeZone(e.target.value)}
                    className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy focus:outline-none focus:ring-2 focus:ring-vaultly-navy"
                  >
                    {timeZones.map((tz) => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}

          {/* Step 2: Family Profiles */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-vaultly-navy" style={{ fontFamily: 'DM Sans, sans-serif' }}>Family Profiles</h1>
                <p className="mt-2 text-base text-vaultly-sage">Step 2 of 6: Add your household members</p>
              </div>

              <div className="rounded-[24px] bg-white p-8 border border-vaultly-grey space-y-6">
                <div className="space-y-3">
                  <p className="text-sm font-medium text-[#38506A]">Household members</p>
                  <div className="space-y-2">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center justify-between rounded-xl bg-vaultly-cream px-4 py-3 border border-vaultly-grey">
                        <div className="flex-1">
                          <p className="font-medium text-vaultly-navy">{member.firstName} {member.lastName}</p>
                          <p className="text-xs text-vaultly-sage">{member.relationship} • {member.role}</p>
                        </div>
                        {members.length > 1 && (
                          <button
                            onClick={() => removeMember(member.id)}
                            className="ml-4 text-[#C86B4A] hover:text-[#B5593C] text-sm font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add New Member */}
                <div className="border-t border-[#E7DED2] pt-6 space-y-3">
                  <p className="text-sm font-medium text-[#38506A]">Add another member</p>
                  
                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#5B6F82]">First Name *</span>
                    <input
                      type="text"
                      value={newMemberFirstName}
                      onChange={(e) => setNewMemberFirstName(e.target.value)}
                      placeholder="First name"
                      className="w-full rounded-[12px] border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#38506A] placeholder-[#A8B99A] focus:outline-none focus:ring-2 focus:ring-[#38506A]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#5B6F82]">Last Name</span>
                    <input
                      type="text"
                      value={newMemberLastName}
                      onChange={(e) => setNewMemberLastName(e.target.value)}
                      placeholder="Last name"
                      className="w-full rounded-[12px] border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#38506A] placeholder-[#A8B99A] focus:outline-none focus:ring-2 focus:ring-[#38506A]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#5B6F82]">Middle Name (optional)</span>
                    <input
                      type="text"
                      value={newMemberMiddleName}
                      onChange={(e) => setNewMemberMiddleName(e.target.value)}
                      placeholder="Middle name"
                      className="w-full rounded-[12px] border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#38506A] placeholder-[#A8B99A] focus:outline-none focus:ring-2 focus:ring-[#38506A]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#5B6F82]">Date of Birth (optional)</span>
                    <input
                      type="date"
                      value={newMemberDOB}
                      onChange={(e) => setNewMemberDOB(e.target.value)}
                      className="w-full rounded-[12px] border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#5B6F82]">Relationship</span>
                    <select
                      value={newMemberRelationship}
                      onChange={(e) => setNewMemberRelationship(e.target.value as HouseholdMember['relationship'])}
                      className="w-full rounded-[12px] border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]"
                    >
                      {relationships.map((rel) => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-xs font-medium text-[#5B6F82]">Role</span>
                    <select
                      value={newMemberRole}
                      onChange={(e) => setNewMemberRole(e.target.value as 'Admin' | 'User')}
                      className="w-full rounded-[12px] border border-[#E7DED2] bg-white px-3 py-2 text-sm text-[#38506A] focus:outline-none focus:ring-2 focus:ring-[#38506A]"
                    >
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                    </select>
                  </label>

                  <Button
                    onClick={addMember}
                    disabled={!newMemberFirstName.trim()}
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    + Add member
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Member Permissions */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-vaultly-navy" style={{ fontFamily: 'DM Sans, sans-serif' }}>Permissions</h1>
                <p className="mt-2 text-base text-vaultly-sage">Step 3 of 6: Set member permissions</p>
              </div>

              <div className="rounded-[24px] bg-white p-8 border border-[#E7DED2] space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="border border-[#E7DED2] rounded-[16px] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#38506A]">{member.firstName} {member.lastName}</p>
                        <p className="text-xs text-[#5B6F82]">{member.role}</p>
                      </div>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedRestrictions);
                          if (newExpanded.has(member.id)) {
                            newExpanded.delete(member.id);
                          } else {
                            newExpanded.add(member.id);
                          }
                          setExpandedRestrictions(newExpanded);
                        }}
                        className="text-sm font-medium text-[#38506A] hover:text-[#2C3D52]"
                      >
                        {expandedRestrictions.has(member.id) ? 'Hide' : 'Show'} Member restrictions
                      </button>
                    </div>

                    {expandedRestrictions.has(member.id) && (
                      <div className="mt-4 pt-4 border-t border-[#E7DED2] space-y-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.restrictions.budgetAccess}
                            onChange={(e) => updateMemberRestriction(member.id, 'budgetAccess', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Budget access</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.restrictions.calendarEditing}
                            onChange={(e) => updateMemberRestriction(member.id, 'calendarEditing', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Calendar editing</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.restrictions.documentUploads}
                            onChange={(e) => updateMemberRestriction(member.id, 'documentUploads', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Document uploads</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.restrictions.projectEditing}
                            onChange={(e) => updateMemberRestriction(member.id, 'projectEditing', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Project editing</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.restrictions.alerts}
                            onChange={(e) => updateMemberRestriction(member.id, 'alerts', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Alerts / notifications</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.restrictions.feedPosting}
                            onChange={(e) => updateMemberRestriction(member.id, 'feedPosting', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Household feed posting</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Household Contributors */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-vaultly-navy" style={{ fontFamily: 'DM Sans, sans-serif' }}>Contributor Settings</h1>
                <p className="mt-2 text-base text-vaultly-sage">Step 4 of 6: Assign contributor roles (optional)</p>
              </div>

              <div className="rounded-[24px] bg-white p-8 border border-[#E7DED2] space-y-4">
                {members.map((member) => (
                  <div key={member.id} className="border border-[#E7DED2] rounded-[16px] p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-[#38506A]">{member.firstName} {member.lastName}</p>
                      </div>
                      <button
                        onClick={() => {
                          const newExpanded = new Set(expandedContributors);
                          if (newExpanded.has(member.id)) {
                            newExpanded.delete(member.id);
                          } else {
                            newExpanded.add(member.id);
                          }
                          setExpandedContributors(newExpanded);
                        }}
                        className="text-sm font-medium text-[#38506A] hover:text-[#2C3D52]"
                      >
                        {expandedContributors.has(member.id) ? 'Hide' : 'Show'} Contributor settings
                      </button>
                    </div>

                    {expandedContributors.has(member.id) && (
                      <div className="mt-4 pt-4 border-t border-[#E7DED2] space-y-3">
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.contributors.incomeContributor}
                            onChange={(e) => updateMemberContributor(member.id, 'incomeContributor', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Income Contributor</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.contributors.homeOwner}
                            onChange={(e) => updateMemberContributor(member.id, 'homeOwner', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Home Owner</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.contributors.primaryContact}
                            onChange={(e) => updateMemberContributor(member.id, 'primaryContact', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Primary Contact</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.contributors.emergencyContact}
                            onChange={(e) => updateMemberContributor(member.id, 'emergencyContact', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Emergency Contact</span>
                        </label>
                        <label className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={member.contributors.householdAdministrator}
                            onChange={(e) => updateMemberContributor(member.id, 'householdAdministrator', e.target.checked)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm text-[#38506A]">Household Administrator</span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: BCR Introduction */}
          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-vaultly-navy" style={{ fontFamily: 'DM Sans, sans-serif' }}>Meet BCR</h1>
                <p className="mt-2 text-base text-vaultly-sage">Step 5 of 6: Vaultly's Household Automation Assistant</p>
              </div>

              <div className="rounded-[24px] bg-white p-8 border border-[#E7DED2] space-y-6">
                <div className="bg-vaultly-cream p-6 rounded-[16px] space-y-4">
                  <p className="text-base text-vaultly-navy font-medium">What does BCR do?</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-vaultly-navy">•</span>
                      <span className="text-sm text-vaultly-sage"><strong>Upload once:</strong> Add your documents once and BCR organises them automatically.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-vaultly-navy">•</span>
                      <span className="text-sm text-vaultly-sage"><strong>Links across Vaultly:</strong> BCR connects your information throughout Vaultly for easy access.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-vaultly-navy">•</span>
                      <span className="text-sm text-vaultly-sage"><strong>Creates reminders:</strong> Never miss important dates with automatic reminders.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-vaultly-navy">•</span>
                      <span className="text-sm text-vaultly-sage"><strong>Updates activity:</strong> Your household stays informed with automatic updates to the feed.</span>
                    </li>
                  </ul>
                  <div className="border-t border-vaultly-grey pt-4 mt-4">
                    <p className="text-xs text-vaultly-sage">BCR is Vaultly's household automation assistant. It helps organize your household information, not provide financial advice.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Summary */}
          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-vaultly-navy" style={{ fontFamily: 'DM Sans, sans-serif' }}>Review Your Setup</h1>
                <p className="mt-2 text-base text-vaultly-sage">Step 6 of 6: Everything looks good?</p>
              </div>

              <div className="rounded-[24px] bg-white p-8 border border-vaultly-grey space-y-6">
                <div className="bg-vaultly-cream p-6 rounded-[16px] space-y-4">
                  <div>
                    <p className="text-xs font-medium text-vaultly-sage uppercase tracking-wide">Household Information</p>
                    <p className="text-lg font-semibold text-vaultly-navy mt-1">{householdName}</p>
                    <p className="text-sm text-vaultly-sage mt-1">
                      {selectedCurrency} • {selectedTimeZone}
                    </p>
                  </div>

                  <div className="border-t border-vaultly-grey pt-4">
                    <p className="text-xs font-medium text-vaultly-sage uppercase tracking-wide">Members ({members.length})</p>
                    <div className="mt-3 space-y-2">
                      {members.map((member) => (
                        <div key={member.id} className="text-sm text-vaultly-navy">
                          <span className="font-medium">{member.firstName} {member.lastName}</span>
                          <span className="text-vaultly-sage"> • {member.relationship}</span>
                          <span className="text-vaultly-sage"> • {member.role}</span>
                          {member.contributors.incomeContributor && <span className="text-vaultly-sage"> • Income Contributor</span>}
                          {member.contributors.homeOwner && <span className="text-vaultly-sage"> • Home Owner</span>}
                          {member.contributors.primaryContact && <span className="text-vaultly-sage"> • Primary Contact</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="border-t border-vaultly-grey pt-4">
                  <p className="text-xs text-vaultly-sage">You can update all of this information anytime in Household Settings.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="w-full max-w-2xl mt-12 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 rounded-[12px] border-2 border-vaultly-navy px-4 py-3 text-sm font-semibold text-vaultly-navy hover:bg-vaultly-cream transition-colors"
            >
              Back
            </button>
          )}

          {step < 6 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 rounded-[12px] bg-vaultly-terracotta px-4 py-3 text-sm font-semibold text-white hover:bg-vaultly-terracotta/90 disabled:opacity-50 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="flex-1 rounded-[12px] bg-vaultly-terracotta px-4 py-3 text-sm font-semibold text-white hover:bg-vaultly-terracotta/90 transition-colors"
            >
              Go to Dashboard
            </button>
          )}
        </div>

        {/* Step Indicator */}
        <div className="mt-8 text-xs text-vaultly-sage">
          Step {step} of 6
        </div>
      </div>
    </div>
  );
}

function AuthPage({
  onSignUp,
  onLogin,
  onGoogleSignIn,
}: {
  onSignUp: (name: string, email: string) => void;
  onLogin: (email: string) => boolean;
  onGoogleSignIn: (profile: GoogleProfile) => void;
}) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [householdName, setHouseholdName] = useState('');

  const submit = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      if (mode === 'signup') {
        if (!firstName || !lastName || !email || !householdName) {
          setError('Please fill in all required fields');
          setIsLoading(false);
          return;
        }
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        const fullName = `${firstName} ${lastName}`;
        onSignUp(fullName, email);
        // Profile is saved automatically via state management
      } else {
        if (!email) {
          setError('Please enter your email');
          setIsLoading(false);
          return;
        }
        const ok = onLogin(email);
        if (!ok) {
          setError('No account found for that email. Please create a new account.');
          setIsLoading(false);
          return;
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Auth error:', err);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Vaultly Logo */}
        <div className="mb-8 flex justify-center">
          <VaultlyLogo variant="full" size="xl" />
        </div>

        {/* Google Sign-In — primary CTA above the fold */}
        <div className="mb-6">
          <GoogleSignInButton
            onSuccess={(profile) => {
              setIsLoading(true);
              try {
                onGoogleSignIn(profile);
              } catch (err) {
                setError('Google sign-in failed. Please try again.');
                console.error('Google sign-in error:', err);
                setIsLoading(false);
              }
            }}
            label={mode === 'login' ? 'Continue with Google' : 'Sign up with Google'}
            disabled={isLoading}
          />
        </div>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[#E7DED2]" />
          <span className="text-xs font-medium uppercase tracking-wider text-[#A8B99A]">or</span>
          <div className="h-px flex-1 bg-[#E7DED2]" />
        </div>

        {mode === 'login' ? (
          <section className="rounded-[20px] bg-white border border-vaultly-grey p-8 shadow-lg">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-vaultly-navy">Sign in</h1>
              <p className="mt-2 text-base leading-6 text-vaultly-sage">Welcome back to Vaultly, your Household OS.</p>
            </div>

            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-vaultly-navy">Email Address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage transition focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
                />
              </label>

              {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-vaultly-terracotta border border-red-200">{error}</div>}

              <button
                onClick={submit}
                disabled={isLoading}
                className="w-full rounded-[14px] bg-vaultly-terracotta py-3 text-base font-semibold text-white transition hover:bg-vaultly-terracotta/90 active:bg-vaultly-terracotta focus:outline-none focus:ring-2 focus:ring-vaultly-terracotta focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-[#E7DED2]"></div>
              <span className="text-sm text-[#A8B99A]">or</span>
              <div className="h-px flex-1 bg-[#E7DED2]"></div>
            </div>

            <button
              onClick={() => {
                setMode('signup');
                setError('');
                setEmail('');
              }}
              className="mt-8 w-full rounded-[14px] border-2 border-vaultly-navy py-3 text-base font-semibold text-vaultly-navy transition hover:bg-vaultly-cream active:bg-white focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
            >
              Create account
            </button>
          </section>
        ) : (
          <section className="rounded-[20px] bg-white border border-vaultly-grey p-8 shadow-lg">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-vaultly-navy">Create your household</h1>
              <p className="mt-2 text-base leading-6 text-vaultly-sage">Set up your household and let Vaultly organise the rest.</p>
            </div>

            <div className="space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-vaultly-navy">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage transition focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-vaultly-navy">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Smith"
                  className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage transition focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-vaultly-navy">Email Address</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage transition focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-vaultly-navy">Household Name *</span>
                <input
                  type="text"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                  placeholder="e.g., The Smiths"
                  className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage transition focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-vaultly-navy">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage transition focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-vaultly-navy">Confirm Password</span>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-[14px] border border-vaultly-grey bg-white px-4 py-3 text-sm text-vaultly-navy placeholder-vaultly-sage transition focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
                />
              </label>

              {error && <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-vaultly-terracotta border border-red-200">{error}</div>}

              <button
                onClick={submit}
                disabled={isLoading}
                className="w-full rounded-[14px] bg-vaultly-terracotta py-3 text-base font-semibold text-white transition hover:bg-vaultly-terracotta/90 active:bg-vaultly-terracotta focus:outline-none focus:ring-2 focus:ring-vaultly-terracotta focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Creating account...' : 'Create account'}
              </button>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-vaultly-grey"></div>
              <span className="text-sm text-vaultly-sage">or</span>
              <div className="h-px flex-1 bg-vaultly-grey"></div>
            </div>

            <button
              onClick={() => {
                setMode('login');
                setError('');
                setEmail('');
              }}
              className="mt-8 w-full rounded-[14px] border-2 border-vaultly-navy py-3 text-base font-semibold text-vaultly-navy transition hover:bg-vaultly-cream active:bg-white focus:outline-none focus:ring-2 focus:ring-vaultly-navy focus:ring-offset-2"
            >
              Have an account? Sign in
            </button>
          </section>
        )}

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-vaultly-sage">Your household data is stored locally and never shared.</p>
      </div>
    </div>
  );
}

function DashboardPage() {
  const today = new Date();
  const greeting = today.getHours() < 12 ? 'Good Morning' : today.getHours() < 18 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-8">
      {/* Top Section - Greeting and Info */}
      <DashboardCard>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#A4B69A] mb-2">Welcome</p>
            <h1 className="text-4xl font-bold text-vaultly-navy">{greeting}, Jessica</h1>
            <p className="text-[#A4B69A] mt-2">Today is {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-[#A4B69A] mb-1">Current Household</p>
            <p className="text-lg font-semibold text-[#38506A]">The Demo House</p>
            <p className="text-xs text-[#D8C3A5] mt-2">📍 Sydney, NSW</p>
          </div>
        </div>
      </DashboardCard>

      {/* Household Readiness Score - Full Width */}
      <div className="lg:col-span-2">
        <HouseholdReadinessScore />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Today Section - Spans full on mobile */}
        <div className="md:col-span-2 lg:col-span-1">
          <TodaySection />
        </div>

        {/* Household Activity */}
        <div className="md:col-span-2 lg:col-span-1">
          <HouseholdActivity />
        </div>

        {/* Household Snapshot - Spans all on mobile */}
        <div className="md:col-span-2 lg:col-span-1">
          <HouseholdSnapshot />
        </div>
      </div>

      {/* Quick Actions - Full Width */}
      <QuickActions />

      {/* BCR Summary - Full Width */}
      <BCRSummary />

      {/* Bottom Row - Recent Documents and Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDocuments />
        <HouseholdTimeline />
      </div>
    </div>
  );
}

function BudgetPage({ 
  budgetState, onBudgetStateChange
}: { 
  budgetState: BudgetState; 
  onBudgetStateChange: (state: BudgetState) => void;
}) {
  return <BudgetModule initialState={budgetState} onStateChange={onBudgetStateChange} />;
}

// Old BudgetPage implementation (kept for reference, can be removed later)
function _BudgetPageLegacy({ 
  incomeSettings, onIncomeSettingsChange, forecast, warrantyItems, onAddHouseholdItem,
  bills, onAddBill, onEditBill, onDeleteBill,
  wishlist, onAddWishlistItem, onEditWishlistItem, onDeleteWishlistItem
}: { 
  incomeSettings: IncomeSettings; 
  onIncomeSettingsChange: (settings: IncomeSettings) => void; 
  forecast: { confirmedSalaryIncome: number; estimatedRosterIncome: number; otherIncome: number; totalPredictedHouseholdIncome: number; nextPayDate: string; }; 
  warrantyItems: HouseholdWarrantyItem[]; 
  onAddHouseholdItem?: () => void;
  bills?: Bill[];
  onAddBill?: () => void;
  onEditBill?: (billId: number) => void;
  onDeleteBill?: (billId: number) => void;
  wishlist?: WishlistItem[];
  onAddWishlistItem?: () => void;
  onEditWishlistItem?: (itemId: number) => void;
  onDeleteWishlistItem?: (itemId: number) => void;
}) {
  const [activeIncomeSection, setActiveIncomeSection] = useState<'salary' | 'roster' | 'partner' | 'other'>('salary');
  
  // Use defaults for optional props
  const billList = bills || [];
  const wishlistList = wishlist || [];

  const variableExpenses = [
    { name: 'Groceries', amount: 214.2 },
    { name: 'Transport', amount: 96 },
    { name: 'Dining', amount: 72 },
  ];

  const savings = [
    { name: 'Emergency fund', amount: 500 },
    { name: 'Holiday', amount: 220 },
  ];

  const projects = [
    { name: 'Kitchen', amount: 750 },
    { name: 'Bathroom', amount: 320 },
  ];

  const subscriptions = [
    { name: 'Streaming', amount: 28 },
    { name: 'Cloud storage', amount: 12 },
  ];

  const totals = useMemo(() => {
    const incomeTotal = forecast.totalPredictedHouseholdIncome;
    const billsTotal = billList.reduce((sum, item) => sum + item.amount, 0);
    const variableTotal = variableExpenses.reduce((sum, item) => sum + item.amount, 0);
    const savingsTotal = savings.reduce((sum, item) => sum + item.amount, 0);
    const projectsTotal = projects.reduce((sum, item) => sum + item.amount, 0);
    const subscriptionsTotal = subscriptions.reduce((sum, item) => sum + item.amount, 0);
    const plannedOutflow = billsTotal + variableTotal + projectsTotal + subscriptionsTotal + savingsTotal;
    const remainingBalance = incomeTotal - plannedOutflow;
    const savingsRate = incomeTotal > 0 ? (savingsTotal / incomeTotal) * 100 : 0;

    const categoryBreakdown = [
      { name: 'Bills', amount: billsTotal, color: '#A8B99A' },
      { name: 'Variable', amount: variableTotal, color: '#D48C6A' },
      { name: 'Projects', amount: projectsTotal, color: '#D8B65A' },
      { name: 'Subscriptions', amount: subscriptionsTotal, color: '#5B6F82' },
      { name: 'Savings', amount: savingsTotal, color: '#7FA5A1' },
    ];

    const totalForChart = categoryBreakdown.reduce((sum, item) => sum + item.amount, 0);
    const chartGradient = categoryBreakdown
      .map((item, index) => {
        const start = index === 0 ? 0 : categoryBreakdown.slice(0, index).reduce((sum, prev) => sum + prev.amount, 0) / totalForChart * 100;
        const end = (categoryBreakdown.slice(0, index + 1).reduce((sum, prev) => sum + prev.amount, 0) / totalForChart) * 100;
        return `${item.color} ${start.toFixed(1)}% ${end.toFixed(1)}%`;
      })
      .join(', ');

    return {
      incomeTotal,
      billsTotal,
      variableTotal,
      savingsTotal,
      projectsTotal,
      subscriptionsTotal,
      plannedOutflow,
      remainingBalance,
      savingsRate,
      categoryBreakdown,
      chartGradient,
    };
  }, [forecast.totalPredictedHouseholdIncome]);

  const sections = [
    { title: 'Income', amount: totals.incomeTotal, detail: 'Live forecast' },
    { title: 'Bills', amount: totals.billsTotal, detail: `${billList.length} recurring` },
    { title: 'Variable Expenses', amount: totals.variableTotal, detail: 'Flexible spending' },
    { title: 'Savings', amount: totals.savingsTotal, detail: `${savings.length} goals` },
    { title: 'Projects', amount: totals.projectsTotal, detail: `${projects.length} active` },
    { title: 'Subscriptions', amount: totals.subscriptionsTotal, detail: 'Monthly plans' },
  ];

  const handleSalaryFieldChange = (section: 'primarySalary' | 'partnerSalary', field: keyof SalaryEntry, value: string | boolean) => {
    onIncomeSettingsChange({
      ...incomeSettings,
      [section]: {
        ...incomeSettings[section],
        [field]: value,
      },
    });
  };

  const handleRosterFieldChange = (section: 'primaryRoster' | 'partnerRoster', field: keyof RosterEntry, value: string) => {
    onIncomeSettingsChange({
      ...incomeSettings,
      [section]: {
        ...incomeSettings[section],
        [field]: value,
      },
    });
  };

  const handleOtherIncomeFieldChange = (id: number, field: keyof OtherIncomeEntry, value: string) => {
    onIncomeSettingsChange({
      ...incomeSettings,
      otherIncome: incomeSettings.otherIncome.map((entry) => (entry.id === id ? { ...entry, [field]: value } : entry)),
    });
  };

  const addOtherIncomeEntry = () => {
    const nextId = Date.now();
    onIncomeSettingsChange({
      ...incomeSettings,
      otherIncome: [
        ...incomeSettings.otherIncome,
        {
          id: nextId,
          incomeName: 'New income',
          incomeType: 'Other',
          amount: '0',
          frequency: 'Monthly',
          firstPaymentDate: '',
          endDate: '',
          person: 'You',
          notes: '',
        },
      ],
    });
  };

  const renderSalaryCard = (section: 'primarySalary' | 'partnerSalary', title: string, entry: SalaryEntry) => (
    <div className="rounded-[24px] bg-[#FCFAF7] p-5">
      <p className="text-sm font-semibold text-[#24384D]">{title}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Name</span>
          <input value={entry.personName} onChange={(event) => handleSalaryFieldChange(section, 'personName', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Income amount</span>
          <input type="number" value={entry.annualSalary} onChange={(event) => handleSalaryFieldChange(section, 'annualSalary', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Salary or Casual</span>
          <select value={entry.employerName === 'Casual' ? 'Casual' : 'Salary'} onChange={(event) => handleSalaryFieldChange(section, 'employerName', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0">
            {['Salary', 'Casual'].map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Pay frequency</span>
          <select value={entry.payFrequency} onChange={(event) => handleSalaryFieldChange(section, 'payFrequency', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0">
            {['Weekly', 'Fortnightly', 'Monthly'].map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Initial pay day</span>
          <input type="date" value={entry.firstPayDate} onChange={(event) => handleSalaryFieldChange(section, 'firstPayDate', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Recurring yearly</span>
          <input type="checkbox" checked={entry.superOption} onChange={(event) => handleSalaryFieldChange(section, 'superOption', event.target.checked)} className="mt-2 h-4 w-4 rounded border-[#E7DED2] text-[#5B6F82]" />
        </label>
      </div>
      <label className="mt-3 block text-sm text-[#5B6F82]">
        <span className="mb-1 block">Notes</span>
        <textarea value={entry.notes} onChange={(event) => handleSalaryFieldChange(section, 'notes', event.target.value)} className="min-h-[80px] w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
      </label>
    </div>
  );

  const renderRosterCard = (section: 'primaryRoster' | 'partnerRoster', title: string, entry: RosterEntry) => (
    <div className="rounded-[24px] bg-[#FCFAF7] p-5">
      <p className="text-sm font-semibold text-[#24384D]">{title}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Person</span>
          <input value={entry.personName} onChange={(event) => handleRosterFieldChange(section, 'personName', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Weekly roster shifts</span>
          <input type="number" value={entry.amount} onChange={(event) => handleRosterFieldChange(section, 'amount', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Hourly rate</span>
          <input type="number" value={entry.hourlyRate} onChange={(event) => handleRosterFieldChange(section, 'hourlyRate', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Penalty rates</span>
          <input type="number" value={entry.penaltyRates} onChange={(event) => handleRosterFieldChange(section, 'penaltyRates', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Overtime</span>
          <input type="number" value={entry.overtime} onChange={(event) => handleRosterFieldChange(section, 'overtime', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Public holidays</span>
          <input type="number" value={entry.publicHoliday} onChange={(event) => handleRosterFieldChange(section, 'publicHoliday', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Annual leave</span>
          <input type="number" value={entry.annualLeave} onChange={(event) => handleRosterFieldChange(section, 'annualLeave', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Sick leave</span>
          <input type="number" value={entry.sickLeave} onChange={(event) => handleRosterFieldChange(section, 'sickLeave', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Roster frequency</span>
          <select value={entry.frequency} onChange={(event) => handleRosterFieldChange(section, 'frequency', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0">
            {['Weekly', 'Fortnightly', 'Manual'].map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="text-sm text-[#5B6F82]">
          <span className="mb-1 block">Next shift date</span>
          <input type="date" value={entry.nextShiftDate} onChange={(event) => handleRosterFieldChange(section, 'nextShiftDate', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
        </label>
      </div>
      <label className="mt-3 block text-sm text-[#5B6F82]">
        <span className="mb-1 block">Notes</span>
        <textarea value={entry.notes} onChange={(event) => handleRosterFieldChange(section, 'notes', event.target.value)} className="min-h-[80px] w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
      </label>
    </div>
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#A8B99A]">Budget</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24384D]">Income now lives here, in one calm home</h1>
            <p className="mt-3 max-w-2xl text-sm text-[#5B6F82]">Manage salary, roster, partner and other income in one place, then let the forecast guide the rest of your plan.</p>
          </div>
          <div className="rounded-2xl bg-[#F7F2EA] px-4 py-3 text-sm font-semibold text-[#24384D]">
            Predicted income ${totals.incomeTotal.toFixed(0)}
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-[24px] bg-[#FCFAF7] p-4">
            <p className="text-sm text-[#5B6F82]">Predicted income</p>
            <p className="mt-2 text-xl font-semibold text-[#24384D]">${forecast.totalPredictedHouseholdIncome.toFixed(0)}</p>
          </div>
          <div className="rounded-[24px] bg-[#FCFAF7] p-4">
            <p className="text-sm text-[#5B6F82]">Salary income</p>
            <p className="mt-2 text-xl font-semibold text-[#24384D]">${forecast.confirmedSalaryIncome.toFixed(0)}</p>
          </div>
          <div className="rounded-[24px] bg-[#FCFAF7] p-4">
            <p className="text-sm text-[#5B6F82]">Roster income</p>
            <p className="mt-2 text-xl font-semibold text-[#24384D]">${forecast.estimatedRosterIncome.toFixed(0)}</p>
          </div>
          <div className="rounded-[24px] bg-[#FCFAF7] p-4">
            <p className="text-sm text-[#5B6F82]">Next pay date</p>
            <p className="mt-2 text-xl font-semibold text-[#24384D]">{forecast.nextPayDate}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#24384D]">Bills & payments</h2>
          <button onClick={() => onAddBill?.()} className="rounded-2xl bg-[#38506A] px-3 py-1 text-sm font-semibold text-white">+ Add bill</button>
        </div>
        <div className="space-y-2">
          {billList.length === 0 ? (
            <p className="text-sm text-[#A4B69A] py-4 text-center">No bills yet. Add one to get started.</p>
          ) : (
            billList.map((bill) => (
              <div key={bill.id} className="flex items-center justify-between rounded-[20px] border border-[#E8E0D5] bg-[#FCFAF7] px-4 py-3">
                <div className="flex-1">
                  <p className="font-medium text-[#24384D]">{bill.name}</p>
                  <p className="text-sm text-[#A4B69A]">{bill.dueDate && `Due ${bill.dueDate}`}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-semibold text-[#24384D]">${bill.amount}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEditBill?.(bill.id)} className="text-sm text-[#38506A] hover:text-[#24384D] font-medium">Edit</button>
                  <button onClick={() => onDeleteBill?.(bill.id)} className="text-sm text-[#C86B4A] hover:text-[#C97B63] font-medium">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-[#24384D]">Wishlist</h2>
          <button onClick={() => onAddWishlistItem?.()} className="rounded-2xl bg-[#E0B14D] px-3 py-1 text-sm font-semibold text-[#24384D]">+ Add item</button>
        </div>
        <div className="space-y-2">
          {wishlistList.length === 0 ? (
            <p className="text-sm text-[#A4B69A] py-4 text-center">No wishlist items yet. Add one to track planned purchases.</p>
          ) : (
            wishlistList.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-[20px] border border-[#E8E0D5] bg-[#FCFAF7] px-4 py-3">
                <div className="flex-1">
                  <p className="font-medium text-[#24384D]">{item.title}</p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-semibold text-[#E0B14D]">${item.amount || 0}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEditWishlistItem?.(item.id)} className="text-sm text-[#38506A] hover:text-[#24384D] font-medium">Edit</button>
                  <button onClick={() => onDeleteWishlistItem?.(item.id)} className="text-sm text-[#C86B4A] hover:text-[#C97B63] font-medium">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#24384D]">Receipts & warranties</h2>
            <div className="flex items-center gap-2">
              <button onClick={() => onAddHouseholdItem?.()} className="rounded-2xl bg-[#5B6F82] px-3 py-1 text-sm font-semibold text-white">+ Add</button>
              <button className="text-sm font-semibold text-[#C97B63]">Manage</button>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {warrantyItems.length === 0 ? (
            <div className="rounded-[20px] bg-[#FCFAF7] p-4 text-sm text-[#5B6F82]">No receipts or warranty items yet — upload receipts to track renewals and keep manuals safe.</div>
          ) : (
            warrantyItems.map((item) => {
              const expiry = new Date(item.warrantyExpiryDate);
              const daysRemaining = Number.isNaN(expiry.getTime()) ? null : Math.ceil((expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return (
                <div key={item.id} className="flex items-center justify-between rounded-[18px] bg-[#FCFAF7] px-4 py-3">
                  <div>
                    <p className="font-semibold text-[#24384D]">{item.productName} <span className="text-sm text-[#5B6F82]">• {item.category}</span></p>
                    <p className="text-sm text-[#5B6F82]">Purchased {item.purchaseDate} • ${Number(item.amount || '0').toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#24384D]">{daysRemaining !== null ? `${daysRemaining}d` : '—'}</p>
                    <span className="rounded-full bg-[#F7F2EA] px-2 py-1 text-xs text-[#24384D]">Linked across Vaultly</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-6 shadow-soft">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'salary', label: 'Salary income' },
            { key: 'roster', label: 'Casual / roster income' },
            { key: 'partner', label: 'Partner income' },
            { key: 'other', label: 'Other income' },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveIncomeSection(tab.key as 'salary' | 'roster' | 'partner' | 'other')}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeIncomeSection === tab.key ? 'bg-[#24384D] text-white' : 'bg-[#F7F2EA] text-[#24384D]'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeIncomeSection === 'salary' && (
            <div className="grid gap-6 xl:grid-cols-2">
              {renderSalaryCard('primarySalary', 'Primary salary', incomeSettings.primarySalary)}
            </div>
          )}

          {activeIncomeSection === 'roster' && (
            <div className="grid gap-6 xl:grid-cols-2">
              {renderRosterCard('primaryRoster', 'Primary roster', incomeSettings.primaryRoster)}
              {renderRosterCard('partnerRoster', 'Partner roster', incomeSettings.partnerRoster)}
            </div>
          )}

          {activeIncomeSection === 'partner' && (
            <div className="grid gap-6 xl:grid-cols-2">
              {renderSalaryCard('partnerSalary', 'Partner salary', incomeSettings.partnerSalary)}
            </div>
          )}

          {activeIncomeSection === 'other' && (
            <div className="space-y-4">
              <div className="rounded-[24px] bg-[#FCFAF7] p-5">
                <p className="text-sm font-semibold text-[#24384D]">Other income</p>
                <p className="mt-2 text-sm text-[#5B6F82]">Add rental income, family payments, side work and more in one place.</p>
              </div>
              {incomeSettings.otherIncome.map((entry) => (
                <div key={entry.id} className="rounded-[24px] bg-[#FCFAF7] p-5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <label className="text-sm text-[#5B6F82]">
                      <span className="mb-1 block">Income name</span>
                      <input value={entry.incomeName} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'incomeName', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
                    </label>
                    <label className="text-sm text-[#5B6F82]">
                      <span className="mb-1 block">Income type</span>
                      <select value={entry.incomeType} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'incomeType', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0">
                        {['Rental income', 'Government concessions', 'Centrelink / family payments', 'Child support', 'Business income', 'Side income', 'Dividends / investments', 'Other'].map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </label>
                    <label className="text-sm text-[#5B6F82]">
                      <span className="mb-1 block">Amount</span>
                      <input type="number" value={entry.amount} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'amount', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
                    </label>
                    <label className="text-sm text-[#5B6F82]">
                      <span className="mb-1 block">Frequency</span>
                      <select value={entry.frequency} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'frequency', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0">
                        {['Weekly', 'Fortnightly', 'Monthly', 'Quarterly', 'Yearly', 'One-off'].map((option) => <option key={option} value={option}>{option}</option>)}
                      </select>
                    </label>
                    <label className="text-sm text-[#5B6F82]">
                      <span className="mb-1 block">First payment date</span>
                      <input type="date" value={entry.firstPaymentDate} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'firstPaymentDate', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
                    </label>
                    <label className="text-sm text-[#5B6F82]">
                      <span className="mb-1 block">End date</span>
                      <input type="date" value={entry.endDate} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'endDate', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
                    </label>
                    <label className="text-sm text-[#5B6F82]">
                      <span className="mb-1 block">Person</span>
                      <input value={entry.person} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'person', event.target.value)} className="w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
                    </label>
                  </div>
                  <label className="mt-3 block text-sm text-[#5B6F82]">
                    <span className="mb-1 block">Notes</span>
                    <textarea value={entry.notes} onChange={(event) => handleOtherIncomeFieldChange(entry.id, 'notes', event.target.value)} className="min-h-[80px] w-full rounded-2xl border border-[#E7DED2] bg-white px-3 py-2.5 text-sm text-[#24384D] outline-none ring-0" />
                  </label>
                </div>
              ))}
              <button type="button" onClick={addOtherIncomeEntry} className="rounded-2xl bg-[#A8B99A] px-4 py-2 text-sm font-semibold text-white">+ Add another income</button>
            </div>
          )}
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-[#24384D]">Monthly breakdown</h2>
          <div className="mt-6 space-y-4">
            {sections.map((section) => (
              <div key={section.title} className="rounded-[20px] bg-[#FCFAF7] p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-[#24384D]">{section.title}</span>
                  <span className="text-sm font-semibold text-[#5B6F82]">${section.amount.toFixed(0)}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-[#F3E9DE]">
                  <div
                    className="h-2 rounded-full bg-[#5B6F82]"
                    style={{ width: `${Math.min((section.amount / Math.max(totals.incomeTotal, 1)) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#24384D]">Monthly Cash Flow</h2>
            <span className="rounded-full bg-[#F7F2EA] px-3 py-1 text-sm font-semibold text-[#24384D]">Live</span>
          </div>

          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center">
            <div className="flex flex-col items-center">
              <div
                className="flex h-40 w-40 items-center justify-center rounded-full p-3"
                style={{ background: `conic-gradient(${totals.chartGradient})` }}
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-center">
                  <div>
                    <p className="text-sm text-[#5B6F82]">Left over</p>
                    <p className="text-xl font-semibold text-[#24384D]">${totals.remainingBalance.toFixed(0)}</p>
                  </div>
                </div>
              </div>
              <p className="mt-3 text-sm text-[#5B6F82]">Balanced against planned outflow</p>
            </div>

            <div className="flex-1 space-y-3">
              {totals.categoryBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between rounded-[18px] bg-[#FCFAF7] px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm font-medium text-[#24384D]">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-[#5B6F82]">${item.amount.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-[20px] bg-[#FCFAF7] p-4">
              <p className="text-sm text-[#5B6F82]">Remaining balance</p>
              <p className="mt-2 text-2xl font-semibold text-[#24384D]">${totals.remainingBalance.toFixed(0)}</p>
            </div>
            <div className="rounded-[20px] bg-[#FCFAF7] p-4">
              <p className="text-sm text-[#5B6F82]">Savings rate</p>
              <p className="mt-2 text-2xl font-semibold text-[#24384D]">{totals.savingsRate.toFixed(0)}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsPage({ projects, onAddDocument }: { projects: Project[]; onAddDocument?: (projectId: number) => void; }) {
  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-white p-8 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#A8B99A]">Projects</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24384D]">A calm home for every plan</h1>
            <p className="mt-3 max-w-2xl text-sm text-[#5B6F82]">Track renovations, receipts, warranties and project files in one place.</p>
          </div>
          <button className="rounded-2xl bg-[#5B6F82] px-4 py-2 text-sm font-semibold text-white">+ New project</button>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        {projects.map((project) => {
          const remaining = project.budget - project.spent;
          const accent = project.name === 'Kitchen' ? 'from-[#A8B99A] to-[#D8CFC4]' : project.name === 'Bathroom' ? 'from-[#D8B65A] to-[#F2E1B6]' : project.name === 'Landscaping' ? 'from-[#D48C6A] to-[#F4D3C2]' : project.name === 'Holiday' ? 'from-[#5B6F82] to-[#A7B6C4]' : 'from-[#24384D] to-[#5B6F82]';

          return (
            <article key={project.id} className="overflow-hidden rounded-[28px] bg-white shadow-soft">
              <div className={`h-28 bg-gradient-to-r ${accent}`} />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-[#24384D]">{project.name}</h2>
                    <p className="mt-2 text-sm text-[#5B6F82]">{project.notes}</p>
                  </div>
                  <span className="rounded-full bg-[#FCFAF7] px-3 py-1 text-sm font-semibold text-[#24384D]">{project.progress}%</span>
                </div>

                <div className="mt-5 h-2 rounded-full bg-[#F3E9DE]">
                  <div className="h-2 rounded-full bg-[#5B6F82]" style={{ width: `${project.progress}%` }} />
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[20px] bg-[#FCFAF7] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5B6F82]">Budget</p>
                    <p className="mt-1 font-semibold text-[#24384D]">${project.budget.toLocaleString()}</p>
                  </div>
                  <div className="rounded-[20px] bg-[#FCFAF7] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5B6F82]">Allocated</p>
                    <p className="mt-1 font-semibold text-[#24384D]">${Math.round(project.budget * 0.82).toLocaleString()}</p>
                  </div>
                  <div className="rounded-[20px] bg-[#FCFAF7] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5B6F82]">Spent</p>
                    <p className="mt-1 font-semibold text-[#24384D]">${project.spent.toLocaleString()}</p>
                  </div>
                  <div className="rounded-[20px] bg-[#FCFAF7] p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#5B6F82]">Remaining</p>
                    <p className="mt-1 font-semibold text-[#24384D]">${remaining.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-[#24384D]">Project files</h3>
                    <div>
                      <button onClick={() => onAddDocument?.(project.id)} className="rounded-full bg-[#A8B99A] px-3 py-1 text-xs font-semibold text-white">+ Add file</button>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2">
                    {project.documents.length === 0 ? (
                      <div className="rounded-[18px] bg-[#FCFAF7] px-4 py-3 text-sm text-[#5B6F82]">No files yet — upload receipts, warranties or quotes to keep everything together.</div>
                    ) : (
                      project.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between rounded-[18px] bg-[#FCFAF7] px-4 py-3">
                          <div>
                            <p className="font-semibold text-[#24384D]">{doc.documentName}</p>
                            <p className="text-sm text-[#5B6F82]">{doc.documentType} • {doc.supplier} • {doc.purchaseDate}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-[#5B6F82]">${Number(doc.amount || '0').toLocaleString()}</span>
                            <span className="rounded-full bg-[#F7F2EA] px-2 py-1 text-xs text-[#24384D]">Linked across Vaultly</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="mt-6 rounded-[20px] bg-[#F7F2EA] p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#24384D]">Current stage</span>
                    <span className="text-sm text-[#5B6F82]">Planning</span>
                  </div>
                  <p className="mt-2 text-sm text-[#5B6F82]">Next step: confirm final selections and lock in appointments.</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

function CalendarPage({ events, householdItems }: { events: CalendarEvent[]; householdItems?: HouseholdWarrantyItem[] }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const [selectedEventId, setSelectedEventId] = useState<number | null>(events[0]?.id ?? null);

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? events[0];
  const calendarEvents = [
    ...events,
    { id: 1001, title: 'Electricity Bill', date: 8, type: 'Bills' as const, color: 'bg-[#D8B65A] text-[#24384D]', time: '08:30', detail: 'Utility payment due before noon.' },
    { id: 1002, title: 'Kitchen Visit', date: 12, type: 'Projects' as const, color: 'bg-[#D48C6A] text-white', time: '14:00', detail: 'Confirm materials and final cabinet colour.' },
    { id: 1003, title: 'Doctor Appointment', date: 18, type: 'Appointments' as const, color: 'bg-[#5B6F82] text-white', time: '10:00', detail: 'Annual checkup with Dr. Lee.' },
    { id: 1004, title: 'Budget Review', date: 21, type: 'Bills' as const, color: 'bg-[#D8B65A] text-[#24384D]', time: '19:30', detail: 'Review this month’s recurring obligations.' },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[32px] bg-white p-6 shadow-soft lg:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#A8B99A]">Calendar</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#24384D]">July at a glance</h1>
          </div>
          <div className="rounded-2xl bg-[#F7F2EA] px-4 py-2 text-sm font-semibold text-[#24384D]">Monthly view</div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.45fr_0.55fr]">
          <div className="rounded-[28px] border border-[#EEE7DB] bg-[#FCFAF7] p-4 sm:p-5">
            <div className="grid grid-cols-7 gap-2 text-center text-sm font-semibold text-[#5B6F82]">
              {days.map((day) => (
                <div key={day} className="py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, index) => {
                const dayNumber = index + 1;
                const eventForDay = calendarEvents.find((event) => event.date === dayNumber);

                return (
                  <button
                    key={dayNumber}
                    type="button"
                    onClick={() => eventForDay && setSelectedEventId(eventForDay.id)}
                    className={`min-h-[88px] rounded-[18px] border p-2 text-left transition-all ${eventForDay ? 'border-[#E4D8C7] bg-white shadow-sm' : 'border-transparent bg-transparent'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#24384D]">{dayNumber}</span>
                      {eventForDay ? <span className="h-2.5 w-2.5 rounded-full bg-[#D48C6A]" /> : null}
                    </div>
                    {eventForDay ? (
                      <div className={`mt-2 rounded-xl px-2 py-1 text-[11px] font-medium ${eventForDay.color}`}>
                        {eventForDay.title}
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] bg-[#F7F2EA] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#A8B99A]">Today&apos;s schedule</p>
              <div className="mt-4 space-y-3">
                {events.slice(0, 2).map((event) => (
                  <div key={event.id} className="rounded-[18px] bg-white px-4 py-3 shadow-sm">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-[#24384D]">{event.title}</p>
                      <span className="text-sm text-[#5B6F82]">{event.time}</span>
                    </div>
                    <p className="mt-1 text-sm text-[#5B6F82]">{event.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#A8B99A]">Upcoming reminders</p>
              <div className="mt-4 space-y-3">
                {calendarEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 rounded-[18px] bg-[#FCFAF7] px-3 py-3">
                    <div className={`mt-0.5 h-2.5 w-2.5 rounded-full ${event.color.includes('A8B99A') ? 'bg-[#A8B99A]' : event.color.includes('D8B65A') ? 'bg-[#D8B65A]' : event.color.includes('D48C6A') ? 'bg-[#D48C6A]' : 'bg-[#5B6F82]'}`} />
                    <div>
                      <p className="font-semibold text-[#24384D]">{event.title}</p>
                      <p className="text-sm text-[#5B6F82]">Jul {event.date} • {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#A8B99A]">Warranties expiring soon</p>
              <div className="mt-4 space-y-3">
                {(!householdItems || householdItems.length === 0) ? (
                  <div className="rounded-[18px] bg-[#FCFAF7] px-3 py-3 text-sm text-[#5B6F82]">No warranty items yet — add receipts to track expiry dates.</div>
                ) : (
                  householdItems
                    .map((item) => ({ ...item, daysRemaining: Math.ceil((new Date(item.warrantyExpiryDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) }))
                    .filter((it) => !Number.isNaN(new Date(it.warrantyExpiryDate).getTime()))
                    .sort((a, b) => (a.daysRemaining ?? 9999) - (b.daysRemaining ?? 9999))
                    .slice(0, 4)
                    .map((item) => (
                      <div key={item.id} className="flex items-center justify-between rounded-[18px] bg-[#FCFAF7] px-3 py-3">
                        <div>
                          <p className="font-semibold text-[#24384D]">{item.productName}</p>
                          <p className="text-sm text-[#5B6F82]">Expires {item.warrantyExpiryDate}</p>
                        </div>
                        <div className="text-sm font-semibold text-[#24384D]">{item.daysRemaining}d</div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#24384D]">Event details</h2>
            <span className={`rounded-full px-3 py-1 text-sm font-semibold ${selectedEvent.color}`}>{selectedEvent.type}</span>
          </div>
          <div className="mt-5 rounded-[24px] bg-[#FCFAF7] p-5">
            <p className="text-sm text-[#5B6F82]">Selected event</p>
            <h3 className="mt-2 text-2xl font-semibold text-[#24384D]">{selectedEvent.title}</h3>
            <p className="mt-3 text-sm text-[#5B6F82]">{selectedEvent.detail}</p>
            <div className="mt-5 flex items-center justify-between rounded-[20px] bg-white px-4 py-3 text-sm text-[#24384D]">
              <span>Time</span>
              <span className="font-semibold">{selectedEvent.time}</span>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-[20px] bg-white px-4 py-3 text-sm text-[#24384D]">
              <span>Date</span>
              <span className="font-semibold">Jul {selectedEvent.date}</span>
            </div>
          </div>
        </section>

        <section className="rounded-[28px] bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-[#24384D]">Monthly summary</h2>
          <div className="mt-5 space-y-3">
            <div className="rounded-[20px] bg-[#FCFAF7] p-4">
              <p className="text-sm text-[#5B6F82]">Income</p>
              <p className="mt-1 text-xl font-semibold text-[#24384D]">2 planned</p>
            </div>
            <div className="rounded-[20px] bg-[#FCFAF7] p-4">
              <p className="text-sm text-[#5B6F82]">Bills</p>
              <p className="mt-1 text-xl font-semibold text-[#24384D]">2 due this month</p>
            </div>
            <div className="rounded-[20px] bg-[#FCFAF7] p-4">
              <p className="text-sm text-[#5B6F82]">Projects</p>
              <p className="mt-1 text-xl font-semibold text-[#24384D]">1 key milestone</p>
            </div>
            <div className="rounded-[20px] bg-[#FCFAF7] p-4">
              <p className="text-sm text-[#5B6F82]">Appointments</p>
              <p className="mt-1 text-xl font-semibold text-[#24384D]">1 upcoming</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function ReportsPage() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-[#A8B99A]">Reports</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#2f4350]">Insights</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-[24px] bg-[#F7F2EA] p-4">
          <p className="text-sm text-[#7c8b96]">Spending trend</p>
          <p className="mt-2 text-2xl font-semibold text-[#2f4350]">-8% vs last month</p>
        </div>
        <div className="rounded-[24px] bg-[#F7F2EA] p-4">
          <p className="text-sm text-[#7c8b96]">Projected savings</p>
          <p className="mt-2 text-2xl font-semibold text-[#2f4350]">$1,240</p>
        </div>
      </div>
    </div>
  );
}

function _DocumentsPage({ projects, householdItems }: { projects: Project[]; householdItems: HouseholdWarrantyItem[] }) {
  const documentTypes = ['Electricity bills', 'Water', 'Rates', 'Insurance', 'Mortgage', 'Receipts', 'Quotes'];
  const extractedFields = ['Supplier', 'Amount', 'Due date', 'Frequency', 'Account number (optional)'];

  const projectDocs = projects.flatMap((p) => p.documents.map((d) => ({ ...d, projectName: p.name })));

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] bg-white p-8 shadow-soft">
        <p className="text-sm uppercase tracking-[0.24em] text-[#A8B99A]">Documents</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#24384D]">Upload household documents in seconds</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#5B6F82]">Vaultly can recognise bills and receipts, then ask whether to add them as recurring items.</p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-[#24384D]">Supported uploads</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {documentTypes.map((type) => (
              <span key={type} className="rounded-full bg-[#F7F2EA] px-3 py-2 text-sm font-medium text-[#24384D]">{type}</span>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] border border-dashed border-[#D8CFC4] bg-[#FCFAF7] p-6 text-center">
            <p className="text-lg font-semibold text-[#24384D]">Drop files here or tap to upload</p>
            <p className="mt-2 text-sm text-[#5B6F82]">PDFs, photos, or screenshots work beautifully.</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#24384D]">Project files</h3>
            <div className="mt-3 space-y-3">
              {projectDocs.length === 0 ? (
                <div className="rounded-[18px] bg-[#FCFAF7] px-4 py-3 text-sm text-[#5B6F82]">No project files yet — upload quotes, invoices and warranties to keep projects organised.</div>
              ) : (
                projectDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between rounded-[18px] bg-[#FCFAF7] px-4 py-3">
                    <div>
                      <p className="font-semibold text-[#24384D]">{doc.documentName} <span className="text-sm text-[#5B6F82]">• {doc.documentType}</span></p>
                      <p className="text-sm text-[#5B6F82]">{doc.supplier} • {doc.purchaseDate} • {doc.projectName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a className="text-sm font-semibold text-[#C97B63]" href="#">{doc.fileName || 'View'}</a>
                      <span className="rounded-full bg-[#F7F2EA] px-2 py-1 text-xs text-[#24384D]">Linked across Vaultly</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="rounded-[28px] bg-white p-6 shadow-soft">
          <h2 className="text-xl font-semibold text-[#24384D]">What Vaultly extracts</h2>
          <div className="mt-5 space-y-3">
            {extractedFields.map((field) => (
              <div key={field} className="rounded-[20px] bg-[#FCFAF7] px-4 py-3 text-sm font-medium text-[#24384D]">{field}</div>
            ))}
          </div>
          <div className="mt-6 rounded-[24px] bg-[#F7F2EA] p-4 text-sm text-[#24384D]">
            <p className="font-semibold">Would you like to add this as a recurring bill?</p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold text-[#24384D]">Household records</h3>
            <div className="mt-3 space-y-3">
              {householdItems.length === 0 ? (
                <div className="rounded-[18px] bg-[#FCFAF7] px-4 py-3 text-sm text-[#5B6F82]">No household documents yet — add receipts, manuals and warranties for safekeeping.</div>
              ) : (
                householdItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between rounded-[18px] bg-[#FCFAF7] px-4 py-3">
                    <div>
                      <p className="font-semibold text-[#24384D]">{item.productName}</p>
                      <p className="text-sm text-[#5B6F82]">{item.category} • Purchased {item.purchaseDate}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <a className="text-sm font-semibold text-[#C97B63]" href="#">{item.receiptFileName || 'View'}</a>
                      <span className="rounded-full bg-[#F7F2EA] px-2 py-1 text-xs text-[#24384D]">Linked across Vaultly</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function _ProfilePage() {
  return (
    <div className="rounded-[28px] bg-white p-6 shadow-soft">
      <p className="text-sm uppercase tracking-[0.24em] text-[#A8B99A]">Profile</p>
      <h1 className="mt-2 text-2xl font-semibold text-[#24384D]">Family and preferences</h1>
      <div className="mt-6 space-y-3">
        {['Household members', 'Income preferences', 'Sharing and privacy'].map((item) => (
          <div key={item} className="rounded-[24px] border border-[#E8E0D5] bg-[#FCFAF7] px-4 py-3 text-sm font-medium text-[#4F6272]">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsPage({ 
  onLogout, 
  currentUser, 
  onLinkGoogle,
  settingsSection,
  householdSetupData: _householdSetupData,
  onUpdateHousehold: _onUpdateHousehold,
}: {
  onLogout: () => void;
  currentUser?: User | null;
  onLinkGoogle?: (profile: GoogleProfile) => void;
  settingsSection?: SettingsSection;
  householdSetupData?: HouseholdSetupData | null;
  onUpdateHousehold?: (data: Partial<HouseholdSetupData>) => void;
}) {
  const [editingAddress, setEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    addressLine1: '',
    addressLine2: '',
    suburb: '',
    state: '',
    postcode: '',
  });

  const handleSaveAddress = () => {
    // Address saving functionality to be implemented later
    setEditingAddress(false);
  };

  const handleRemoveAddress = () => {
    // Address removal functionality to be implemented later
  };

  const hasAddress = false; // Address fields will be implemented in Settings later

  // Profile Settings Section
  if (settingsSection === 'profile') {
    return (
      <div className="space-y-6">
        {/* Address Section */}
        <div className="rounded-[20px] bg-white border border-[#E7DED2] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4B69A] mb-1">Profile</p>
          <h2 className="text-xl font-semibold text-[#38506A] mb-6">Address</h2>

          {!editingAddress && !hasAddress ? (
            <div className="text-center py-6">
              <p className="text-sm text-[#A4B69A] mb-4">No address added yet</p>
              <button
                onClick={() => setEditingAddress(true)}
                className="rounded-[12px] bg-[#C96F4A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#b85e3a] transition-colors"
              >
                Add Address
              </button>
            </div>
          ) : editingAddress ? (
            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#38506A]">Address Line 1</span>
                <input
                  type="text"
                  value={addressForm.addressLine1}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine1: e.target.value })}
                  placeholder="123 Main Street"
                  className="w-full rounded-[14px] border border-[#E7DED2] bg-white px-4 py-3 text-sm text-[#38506A] placeholder-[#A4B69A] focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#38506A]">Address Line 2 (optional)</span>
                <input
                  type="text"
                  value={addressForm.addressLine2}
                  onChange={(e) => setAddressForm({ ...addressForm, addressLine2: e.target.value })}
                  placeholder="Unit, Suite, etc."
                  className="w-full rounded-[14px] border border-[#E7DED2] bg-white px-4 py-3 text-sm text-[#38506A] placeholder-[#A4B69A] focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#38506A]">Suburb / City</span>
                  <input
                    type="text"
                    value={addressForm.suburb}
                    onChange={(e) => setAddressForm({ ...addressForm, suburb: e.target.value })}
                    placeholder="Sydney"
                    className="w-full rounded-[14px] border border-[#E7DED2] bg-white px-4 py-3 text-sm text-[#38506A] placeholder-[#A4B69A] focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-[#38506A]">State</span>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    placeholder="NSW"
                    className="w-full rounded-[14px] border border-[#E7DED2] bg-white px-4 py-3 text-sm text-[#38506A] placeholder-[#A4B69A] focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-[#38506A]">Postcode</span>
                <input
                  type="text"
                  value={addressForm.postcode}
                  onChange={(e) => setAddressForm({ ...addressForm, postcode: e.target.value })}
                  placeholder="2000"
                  className="w-full rounded-[14px] border border-[#E7DED2] bg-white px-4 py-3 text-sm text-[#38506A] placeholder-[#A4B69A] focus:outline-none focus:ring-2 focus:ring-[#C96F4A]"
                />
              </label>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSaveAddress}
                  className="flex-1 rounded-[12px] bg-[#C96F4A] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#b85e3a] transition-colors"
                >
                  Save Address
                </button>
                <button
                  onClick={() => setEditingAddress(false)}
                  className="flex-1 rounded-[12px] bg-[#DDE6D6] px-4 py-2.5 text-sm font-semibold text-[#38506A] hover:bg-[#D0DCB8] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[14px] bg-[#F7F3EC] p-4">
                <p className="text-sm font-medium text-[#38506A]">
                  {addressForm.addressLine1}
                  {addressForm.addressLine2 && <>, {addressForm.addressLine2}</>}
                </p>
                <p className="text-sm text-[#A4B69A] mt-1">
                  {addressForm.suburb}, {addressForm.state} {addressForm.postcode}
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setAddressForm({
                      addressLine1: '',
                      addressLine2: '',
                      suburb: '',
                      state: '',
                      postcode: '',
                    });
                    setEditingAddress(true);
                  }}
                  className="flex-1 rounded-[12px] bg-[#DDE6D6] px-4 py-2.5 text-sm font-semibold text-[#38506A] hover:bg-[#D0DCB8] transition-colors"
                >
                  Edit Address
                </button>
                <button
                  onClick={handleRemoveAddress}
                  className="flex-1 rounded-[12px] bg-[#F0C4B0] px-4 py-2.5 text-sm font-semibold text-[#C96F4A] hover:bg-[#E8B8A0] transition-colors"
                >
                  Remove Address
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Connected Accounts — Security section */}
        <div className="rounded-[20px] bg-white border border-[#E7DED2] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4B69A] mb-1">Security</p>
          <h2 className="text-xl font-semibold text-[#38506A] mb-6">Connected Accounts</h2>

          {/* Google */}
          <div className="flex items-center justify-between py-4 border-b border-[#F0EBE4] last:border-b-0">
            <div className="flex items-center gap-3">
              {/* Google G */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DED2] bg-white shadow-sm">
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
                  <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"/>
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"/>
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-[#38506A]">Google</p>
                {currentUser?.providers?.find((p) => p.provider === 'google') ? (
                  <p className="text-xs text-[#A4B69A]">{currentUser.providers.find((p) => p.provider === 'google')?.displayName} · linked {new Date(currentUser.providers.find((p) => p.provider === 'google')?.linkedAt || '').toLocaleDateString()}</p>
                ) : (
                  <p className="text-xs text-[#A4B69A]">Not connected</p>
                )}
              </div>
            </div>
            {currentUser?.providers?.find((p) => p.provider === 'google') ? (
              <span className="rounded-full bg-[#DDE6D6] px-3 py-1 text-xs font-semibold text-[#2F4F3E]">Connected</span>
            ) : onLinkGoogle ? (
              <GoogleSignInButton
                label="Link Google"
                onSuccess={onLinkGoogle}
              />
            ) : null}
          </div>

          {/* Future providers — Apple, Microsoft */}
          {(['Apple', 'Microsoft'] as const).map((name) => (
            <div key={name} className="flex items-center justify-between py-4 border-b border-[#F0EBE4] last:border-b-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DED2] bg-[#F8F9FA] text-lg shadow-sm">
                  {name === 'Apple' ? '🍎' : '⊞'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#38506A]">{name}</p>
                  <p className="text-xs text-[#A4B69A]">Coming soon</p>
                </div>
              </div>
              <span className="rounded-full bg-[#F0EBE4] px-3 py-1 text-xs font-medium text-[#A4B69A]">Soon</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default view (security/other sections)
  return (
    <div className="space-y-6">
      {/* Connected Accounts — Security section */}
      <div className="rounded-[20px] bg-white border border-[#E7DED2] p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4B69A] mb-1">Security</p>
        <h2 className="text-xl font-semibold text-[#38506A] mb-6">Connected Accounts</h2>

        {/* Google */}
        <div className="flex items-center justify-between py-4 border-b border-[#F0EBE4] last:border-b-0">
          <div className="flex items-center gap-3">
            {/* Google G */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DED2] bg-white shadow-sm">
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"/>
                <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"/>
                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#38506A]">Google</p>
              {currentUser?.providers?.find((p) => p.provider === 'google') ? (
                <p className="text-xs text-[#A4B69A]">{currentUser.providers.find((p) => p.provider === 'google')?.displayName} · linked {new Date(currentUser.providers.find((p) => p.provider === 'google')?.linkedAt || '').toLocaleDateString()}</p>
              ) : (
                <p className="text-xs text-[#A4B69A]">Not connected</p>
              )}
            </div>
          </div>
          {currentUser?.providers?.find((p) => p.provider === 'google') ? (
            <span className="rounded-full bg-[#DDE6D6] px-3 py-1 text-xs font-semibold text-[#2F4F3E]">Connected</span>
          ) : onLinkGoogle ? (
            <GoogleSignInButton
              label="Link Google"
              onSuccess={onLinkGoogle}
            />
          ) : null}
        </div>

        {/* Future providers — Apple, Microsoft */}
        {(['Apple', 'Microsoft'] as const).map((name) => (
          <div key={name} className="flex items-center justify-between py-4 border-b border-[#F0EBE4] last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E7DED2] bg-[#F8F9FA] text-lg shadow-sm">
                {name === 'Apple' ? '🍎' : '⊞'}
              </div>
              <div>
                <p className="text-sm font-semibold text-[#38506A]">{name}</p>
                <p className="text-xs text-[#A4B69A]">Coming soon</p>
              </div>
            </div>
            <span className="rounded-full bg-[#F0EBE4] px-3 py-1 text-xs font-medium text-[#A4B69A]">Soon</span>
          </div>
        ))}
      </div>

      {/* Notification prefs placeholder */}
      <div className="rounded-[20px] bg-white border border-[#E7DED2] p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A4B69A] mb-1">Preferences</p>
        <h2 className="text-xl font-semibold text-[#38506A] mb-2">Notification Preferences</h2>
        <p className="text-sm text-[#A4B69A]">Notification settings coming soon.</p>
      </div>

      {/* Danger zone */}
      <div className="rounded-[20px] bg-white border border-[#F0C4B0] p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C96F4A] mb-1">Danger Zone</p>
        <h2 className="text-xl font-semibold text-[#38506A] mb-4">Session</h2>
        <button
          onClick={onLogout}
          className="rounded-[12px] bg-[#C96F4A] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#b85e3a] transition-colors"
        >
          Sign out
        </button>
      </div>
    </div>
  );
}

export default App;
