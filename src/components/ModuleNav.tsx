import { NavItem } from '../types/navigation';

export function ModuleNav({
  title,
  items,
  activeSection,
  onNavigate,
}: {
  title: string;
  items: NavItem[];
  activeSection: string;
  onNavigate: (section: string) => void;
}) {
  return (
    <div className="border-b border-vaultly-grey bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Module Title */}
        <h2 className="text-lg font-semibold text-vaultly-navy mb-4">{title}</h2>

        {/* Navigation Items - Horizontal Scroll on Mobile */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 lg:gap-4">
          {items.map((item) => {
            const isActive = activeSection === item.key;
            return (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-vaultly-grey text-vaultly-navy shadow-sm'
                    : 'text-vaultly-sage hover:text-vaultly-navy hover:bg-vaultly-cream'
                }`}
              >
                <span>{item.emoji}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
