# Vaultly Assets Directory

A professional, organized asset structure for the Vaultly application. All assets are centrally located and exported through a unified index for consistency and maintainability.

## Directory Structure

```
assets/
│
├── branding/                 # Logo variants, favicons, and brand identity
│   ├── logo-icon.svg        # Primary icon logo (currentColor - inherits color)
│   ├── logo-navy.svg        # Navy colored logo (#38506A)
│   ├── logo-white.svg       # White logo (for dark backgrounds)
│   ├── favicon.svg          # Favicon in SVG format
│   ├── favicon-32.png       # 32x32 PNG favicon (add as needed)
│   ├── apple-touch-icon.png # iOS home screen icon (add as needed)
│   └── app-icon-1024.png    # App store / PWA icon (add as needed)
│
├── icons/                    # Organized icon library by category
│   ├── navigation/          # Navigation, menu, and page icons
│   ├── finance/             # Budget, income, expenses, transactions
│   ├── household/           # Home, family, members, settings
│   ├── projects/            # Projects, renovations, tasks
│   ├── calendar/            # Calendar, events, dates
│   ├── reports/             # Charts, graphs, analytics
│   ├── settings/            # Configuration, preferences, controls
│   ├── notifications/       # Alerts, messages, reminders
│   └── system/              # Help, search, close, errors
│
├── illustrations/            # Large illustrations and graphics
│   ├── empty-states/        # Empty state illustrations
│   ├── onboarding/          # Onboarding flow illustrations
│   ├── dashboards/          # Dashboard background illustrations
│   └── marketing/           # Marketing and promotional graphics
│
├── backgrounds/              # Background patterns and textures
│
├── avatars/                  # User and household member avatars
│
├── placeholders/             # Placeholder images for development
│
├── images/                   # General use images
│   ├── home/                # Homepage and dashboard images
│   ├── receipts/            # Receipt and transaction images
│   ├── documents/           # Document and file images
│   ├── renovations/         # Project and renovation images
│   └── demo/                # Demo and example content images
│
├── index.ts                  # Central export file for all assets
└── README.md                 # This file
```

## Usage

### Importing Assets

Use the centralized `index.ts` file to import assets:

```typescript
import { BRANDING, ICON_PATHS, ILLUSTRATION_PATHS } from '../assets';

// Use the branding logo
<img src={BRANDING.logo.icon} alt="Vaultly" />

// Use navy logo
<img src={BRANDING.logo.navy} alt="Vaultly" />

// Use white logo for dark backgrounds
<img src={BRANDING.logo.white} alt="Vaultly" />
```

### Branding Asset Variants

#### Logo Icon (Dynamic Color)
- **File**: `logo-icon.svg`
- **Use**: Primary logo variant
- **Color**: Inherits from CSS `currentColor`
- **Best for**: Buttons, headers, navigation where color should match text

```tsx
<img src={BRANDING.logo.icon} alt="Vaultly" className="text-[#38506A]" />
```

#### Logo Navy
- **File**: `logo-navy.svg`
- **Use**: When brand navy color is required
- **Color**: #38506A (Vaultly Navy)
- **Best for**: Light backgrounds, print, standard displays

#### Logo White
- **File**: `logo-white.svg`
- **Use**: On dark backgrounds and overlays
- **Color**: White
- **Best for**: Dark backgrounds, overlays, dark mode, footer areas

#### Favicon
- **File**: `favicon.svg`
- **Use**: Browser tab icon
- **Best for**: HTML head section as favicon

### Locations Where Logo Should Be Used

1. **Login Screen** - `src/components/LoginPage.tsx`
   - Use `BRANDING.logo.navy` or `BRANDING.logo.icon`
   - Size: Medium (80x80 or 100x100)

2. **Registration Screen** - `src/components/RegisterPage.tsx`
   - Use `BRANDING.logo.navy` or `BRANDING.logo.icon`
   - Size: Medium (80x80 or 100x100)

3. **Sidebar Header** - `src/components/Shell.tsx`
   - Use `BRANDING.logo.icon` with navy color
   - Size: Small (32x32 or 40x40)

4. **Dashboard Header** - `src/components/Dashboard.tsx`
   - Use `BRANDING.logo.icon` with navy color
   - Size: Small (32x32)

5. **Marketing Pages** - `src/components/LandingPage.tsx` (future)
   - Use `BRANDING.logo.navy` or `BRANDING.logo.icon`
   - Size: Large (120x120 or more)

6. **Loading Screen** - `src/components/LoadingScreen.tsx` (future)
   - Use `BRANDING.logo.icon` with animation
   - Size: Large (80x80 or 100x100)

7. **Browser Favicon** - `index.html`
   - Use `BRANDING.favicon.svg`
   - Configure in HTML head tag

### Vaultly Design System Colors

When displaying logos with `currentColor`, ensure proper color context:

- **Primary Navy**: `#38506A`
- **Accent Cream**: `#F6F2EA`
- **Soft Beige**: `#E8DDCC`
- **Sage Green**: `#A4B69A`
- **Dark Navy**: `#2F4F3E`
- **White**: `#FFFFFF`
- **Light Gray**: `#FAF8F5`

## Adding New Assets

### Adding Icons

1. Create a new `.svg` file
2. Place in appropriate `icons/[category]/` folder
3. Ensure SVG uses `stroke="currentColor"` for dynamic coloring
4. Optional: Add TypeScript export in `index.ts` if commonly used

### Adding Illustrations

1. Create a new `.svg` or `.png` file
2. Place in `illustrations/[category]/` folder
3. Update `ILLUSTRATION_PATHS` in `index.ts` if adding new category

### Adding Images

1. Create appropriate folder under `images/`
2. Optimize file size before adding:
   - PNG: Use for graphics with transparency
   - JPG: Use for photographs
   - WebP: Use for better compression (modern browsers)

### Adding Avatars

1. Place avatar files in `avatars/` folder
2. Follow naming convention: `[username].png` or `avatar-[id].png`
3. Recommended size: 128x128px or larger

## Performance Considerations

- **SVG**: Use for logos, icons, and scalable graphics (no file size bloat with zoom)
- **PNG**: Use for graphics requiring transparency
- **JPG**: Use for photographs and complex images
- **WebP**: Use for better compression on modern browsers (with fallbacks)

### File Size Guidelines

- Icons: < 5KB (SVG), < 2KB (PNG)
- Illustrations: < 50KB
- Images: < 200KB
- Avatars: < 50KB

## Relative Import Paths

Always use relative imports when referencing assets in components:

```typescript
// From src/components/App.tsx
import { BRANDING } from '../assets';

// From src/components/sections/Dashboard.tsx
import { BRANDING } from '../../assets';

// From src/hooks/useTheme.ts
import { BRANDING } from '../assets';
```

## SVG Best Practices

When creating or modifying SVG files:

1. **Use `currentColor`** for dynamic coloring
   ```svg
   <path stroke="currentColor" fill="currentColor" />
   ```

2. **Set viewBox** for scalability
   ```svg
   <svg viewBox="0 0 24 24" ... />
   ```

3. **Use consistent stroke width**
   ```svg
   <svg stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
   ```

4. **Optimize before adding**
   - Remove unnecessary metadata
   - Minimize decimals in paths
   - Use SVGO or similar tool

## Favicon Configuration

Add favicon links to `index.html`:

```html
<!-- Main favicon -->
<link rel="icon" type="image/svg+xml" href="/src/assets/branding/favicon.svg" />

<!-- Fallback for older browsers -->
<link rel="icon" type="image/png" sizes="32x32" href="/src/assets/branding/favicon-32.png" />

<!-- iOS home screen icon -->
<link rel="apple-touch-icon" href="/src/assets/branding/apple-touch-icon.png" />

<!-- PWA app icon -->
<link rel="icon" sizes="1024x1024" href="/src/assets/branding/app-icon-1024.png" />
```

## Maintenance

- **Review quarterly** for unused assets
- **Optimize file sizes** using tools like TinyPNG or SVGO
- **Keep index.ts updated** when adding new assets
- **Document new categories** with clear purpose
- **Version control** - commit asset changes with descriptive messages

## Future Enhancements

- [ ] Add icon system with Figma component library
- [ ] Implement SVG sprite sheet for icons
- [ ] Add dark mode illustration variants
- [ ] Create responsive image sets (srcset)
- [ ] Implement image lazy loading
- [ ] Add animation SVG files
- [ ] Create custom font assets for branding

## References

- [Vaultly Design System](../DESIGN_SYSTEM.md)
- [Component Documentation](../docs)
- [Vite Asset Handling](https://vitejs.dev/guide/assets.html)
