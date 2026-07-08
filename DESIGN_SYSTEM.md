# Vaultly Design System

## Overview

The Vaultly Design System is a comprehensive, centralized framework for maintaining design consistency across the application. It provides design tokens, reusable components, and semantic guidelines.

**Location:** `src/design-system/`

## Directory Structure

```
src/design-system/
├── Brand.ts           # Color palette and brand constants
├── Theme.ts           # Theme configuration and helpers
├── Typography.ts      # Font families, sizes, weights, styles
├── Spacing.ts         # Spacing scale for margins, padding, gaps
├── Radius.ts          # Border radius values
├── Shadows.ts         # Shadow system for depth
├── Buttons.tsx        # Reusable button components
├── Cards.tsx          # Card and container components
├── Inputs.tsx         # Form input components
├── Icons.tsx          # Icon library and components
├── Layout.tsx         # Layout wrapper components
└── index.ts           # Central export point

public/branding/
├── logo/              # Logo assets
├── icons/             # Icon assets (SVG, PNG)
├── favicons/          # Favicon assets
├── fonts/             # Custom font files
└── images/            # Brand imagery
```

## Design Tokens

### Colors (Brand.ts)

#### Core Colors
- **White**: #FFFFFF
- **Warm Cream**: #F6F2EA
- **Soft Slate Navy**: #38506A
- **Sage**: #A4B69A
- **Mustard**: #E0B14D
- **Terracotta**: #C86B4A
- **Forest Green**: #2F4F3E
- **Soft Beige**: #E8DDCC
- **Clay**: #B98268
- **Olive**: #7E8F6B
- **Sand**: #D8C3A5

#### Semantic Colors
- **Backgrounds**: Primary (White), Secondary (Cream), Tertiary (Soft Beige)
- **Text**: Primary (Navy), Secondary (Sage), Tertiary (Olive)
- **Interactive**: Primary (Navy), Secondary (Sage), Accent (Mustard)
- **Status**: Success (Forest Green), Warning (Mustard), Error (Terracotta), Info (Navy)

### Typography (Typography.ts)

#### Font Families
- **Heading**: DM Sans (400, 500, 600, 700)
- **Body**: Montserrat (all weights)
- **Mono**: Courier New

#### Font Sizes
- xs: 0.75rem (12px)
- sm: 0.875rem (14px)
- base: 1rem (16px)
- lg: 1.125rem (18px)
- xl: 1.25rem (20px)
- 2xl: 1.5rem (24px)
- 3xl: 1.875rem (30px)
- 4xl: 2.25rem (36px)
- 5xl: 3rem (48px)

### Spacing (Spacing.ts)

Scale from 0 to 96 (0px to 384px) in 4px increments:
- **xs**: 8px (spacing[2])
- **sm**: 16px (spacing[4])
- **md**: 24px (spacing[6])
- **lg**: 32px (spacing[8])
- **xl**: 48px (spacing[12])
- **2xl**: 64px (spacing[16])
- **3xl**: 96px (spacing[24])

### Border Radius (Radius.ts)

- sm: 6px
- base: 8px
- md: 10px
- lg: 14px
- xl: 16px (default for cards/modals)
- 2xl: 20px (default for inputs)
- 3xl: 24px
- 4xl: 32px
- full: 9999px (circles/badges)

### Shadows (Shadows.ts)

- xs: Minimal shadow for subtle depth
- sm: Small shadow for buttons
- base: Default shadow
- md: Medium shadow for cards
- lg: Large shadow for dropdowns
- xl: Extra large shadow for modals
- focus: Focus ring shadow
- inner: Inner shadow for pressed states

## Components

### Buttons (Buttons.tsx)

```tsx
import { Button, IconButton } from '@/design-system';

<Button variant="primary" size="md">Click me</Button>
<IconButton variant="secondary"><SearchIcon /></IconButton>
```

**Variants**: primary, secondary, tertiary, danger
**Sizes**: sm, md, lg

### Cards (Cards.tsx)

```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/design-system';

<Card variant="elevated">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>
```

**Variants**: default, elevated, outlined

### Inputs (Inputs.tsx)

```tsx
import { Input, TextArea, Select } from '@/design-system';

<Input label="Email" type="email" error="Invalid email" />
<TextArea label="Message" />
<Select label="Option" options={[{ value: '1', label: 'One' }]} />
```

### Icons (Icons.tsx)

```tsx
import { 
  SearchIcon, BellIcon, PlusIcon, HomeIcon, 
  SettingsIcon, LogOutIcon, UserIcon 
} from '@/design-system';

<SearchIcon size="md" color="#38506A" />
```

**Available Icons**: SearchIcon, BellIcon, PlusIcon, HomeIcon, SettingsIcon, LogOutIcon, UserIcon, MenuIcon, ChevronDownIcon, CheckIcon, XIcon, ArrowRightIcon

### Layout (Layout.tsx)

```tsx
import { Container, Flex, Grid, VStack, HStack } from '@/design-system';

<Container size="lg">
  <Flex direction="row" justify="between" align="center" gap="md">
    <VStack spacing="md">Item 1</VStack>
    <Grid cols={3} gap="lg">Grid items</Grid>
  </Flex>
</Container>
```

## Usage

### Importing the Design System

```tsx
// Import all
import * as DesignSystem from '@/design-system';

// Import specific items
import { colors, typography, Button, Card } from '@/design-system';
import { Brand } from '@/design-system';
```

### Using Design Tokens

```tsx
import { colors, spacing, radius, typography } from '@/design-system';

// In components
const backgroundColor = colors.navy;
const padding = spacing[4]; // 16px
const borderRadius = radius.lg; // 14px
```

### Creating Components with Design System

```tsx
import { Button, Card, colors, typography } from '@/design-system';

function MyComponent() {
  return (
    <Card className="p-6">
      <h1 style={{ color: colors.navy, ...typography.styles.h1 }}>
        Hello
      </h1>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## Integration Strategy

The design system is designed to be incrementally adopted:

1. **Phase 1**: Core infrastructure (✓ Complete)
   - Design tokens exported
   - Component library created
   - Build verified

2. **Phase 2**: Component Migration (Recommended)
   - Replace hardcoded colors with `colors` export
   - Replace inline styles with component exports
   - Use semantic color references

3. **Phase 3**: Full Adoption
   - All components use design system
   - Tailwind config extends design tokens
   - Consistent styling across application

## Adding to Tailwind Config

To use design system tokens in Tailwind classes:

```javascript
// tailwind.config.js
import { theme } from './src/design-system';

export default {
  theme: {
    extend: theme
  }
};
```

## Asset Management

### Public Branding Files

Place brand assets in the `public/branding/` directories:

- **Logos**: `public/branding/logo/`
- **Icons**: `public/branding/icons/`
- **Favicons**: `public/branding/favicons/`
- **Fonts**: `public/branding/fonts/`
- **Images**: `public/branding/images/`

### Referencing Assets

```tsx
// Logo
<img src="/branding/logo/vaultly-logo.svg" alt="Vaultly" />

// Icons
<img src="/branding/icons/icon-name.svg" alt="Icon" />

// Favicon in HTML
<link rel="icon" href="/branding/favicons/favicon.ico" />
```

## Extending the Design System

### Adding New Colors

Edit `src/design-system/Brand.ts`:

```typescript
export const colors = {
  // ... existing colors
  myNewColor: '#ABCDEF',
};
```

### Adding New Spacing Values

Edit `src/design-system/Spacing.ts`:

```typescript
export const spacing = {
  // ... existing spacing
  128: '32rem',
};
```

### Creating New Components

Create a new file in `src/design-system/`:

```typescript
// Badge.tsx
export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
  // Component implementation
};

// Export in index.ts
export * from './Badge';
```

## Best Practices

1. **Use semantic colors** over raw hex values
2. **Maintain spacing consistency** with the spacing scale
3. **Leverage existing components** before creating new ones
4. **Document custom components** with JSDoc comments
5. **Test responsive behavior** across breakpoints
6. **Keep components simple** and composable

## Build & Compilation

The design system compiles without errors and is fully type-safe with TypeScript support. Files are production-ready and optimized by Vite.

**Current Build Output**:
- JavaScript: 251.19 KB (66.03 KB gzipped)
- CSS: 30.53 KB (5.97 KB gzipped)

## Future Enhancements

- Storybook integration for component documentation
- Dark mode support tokens
- Animation/transition tokens
- Breakpoint configuration
- CSS custom properties export
- Accessibility tokens (ARIA roles, semantic HTML)
