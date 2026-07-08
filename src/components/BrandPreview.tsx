/**
 * Vaultly Brand Preview & Design System
 * 
 * A comprehensive, live preview page showcasing the entire Vaultly design system
 * with editable controls for colors, typography, spacing, and components.
 */

import React, { useState } from 'react';
import { VaultlyLogo } from './common/VaultlyLogo';

// Default brand colors
const DEFAULT_COLORS = {
  white: '#FFFFFF',
  warmCream: '#F6F2EA',
  navy: '#38506A',
  sage: '#A4B69A',
  mustard: '#E0B14D',
  terracotta: '#C86B4A',
  forestGreen: '#2F4F3E',
  softBeige: '#E8DDCC',
  clay: '#B98268',
  olive: '#7E8F6B',
  sand: '#D8C3A5',
};

const DEFAULT_SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const BrandPreview: React.FC = () => {
  const [colors, setColors] = useState(DEFAULT_COLORS);
  const [spacing, setSpacing] = useState(DEFAULT_SPACING);
  const [borderRadius, setBorderRadius] = useState('12px');
  const [showEditPanel, setShowEditPanel] = useState(false);

  const handleColorChange = (key: keyof typeof DEFAULT_COLORS, value: string) => {
    setColors({ ...colors, [key]: value });
  };

  const handleSpacingChange = (key: keyof typeof DEFAULT_SPACING, value: number) => {
    setSpacing({ ...spacing, [key]: value });
  };

  const handleReset = () => {
    setColors(DEFAULT_COLORS);
    setSpacing(DEFAULT_SPACING);
    setBorderRadius('12px');
  };

  // Helper to convert spacing numbers to pixel strings
  const spacingPx = (value: number) => `${value}px`;

  return (
    <div style={{ backgroundColor: colors.white, color: colors.navy, fontFamily: 'Montserrat, sans-serif' }}>
      {/* Header */}
      <header style={{
        backgroundColor: colors.navy,
        color: colors.white,
        padding: spacingPx(spacing.lg),
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontFamily: 'Bricolage Grotesque, sans-serif' }}>
          Vaultly Brand Preview
        </h1>
        <div style={{ display: 'flex', gap: spacingPx(spacing.md) }}>
          <button
            onClick={() => setShowEditPanel(!showEditPanel)}
            style={{
              backgroundColor: colors.white,
              color: colors.navy,
              border: 'none',
              padding: `${spacingPx(spacing.sm)} ${spacingPx(spacing.md)}`,
              borderRadius,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            {showEditPanel ? 'Hide' : 'Edit'}
          </button>
          <button
            onClick={handleReset}
            style={{
              backgroundColor: colors.terracotta,
              color: colors.white,
              border: 'none',
              padding: `${spacing.sm} ${spacing.md}`,
              borderRadius,
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Reset
          </button>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        {/* Edit Panel */}
        {showEditPanel && (
          <aside style={{
            backgroundColor: colors.warmCream,
            borderRight: `1px solid ${colors.softBeige}`,
            padding: spacingPx(spacing.lg),
            width: '300px',
            maxHeight: '100vh',
            overflowY: 'auto',
            minHeight: '100vh',
          }}>
            <h3 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', marginTop: 0 }}>Edit Design</h3>

            {/* Color Controls */}
            <div style={{ marginBottom: spacingPx(spacing.lg) }}>
              <h4 style={{ fontSize: '14px', marginBottom: spacingPx(spacing.md) }}>Colours</h4>
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} style={{ marginBottom: spacingPx(spacing.sm) }}>
                  <label style={{ display: 'flex', gap: spacingPx(spacing.sm), alignItems: 'center', fontSize: '12px' }}>
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => handleColorChange(key as keyof typeof DEFAULT_COLORS, e.target.value)}
                      style={{ width: '40px', height: '30px', cursor: 'pointer', border: 'none', borderRadius: '4px' }}
                    />
                    <span>{key}</span>
                    <code style={{ fontSize: '10px', color: colors.sage }}>{value}</code>
                  </label>
                </div>
              ))}
            </div>

            {/* Spacing Controls */}
            <div style={{ marginBottom: spacingPx(spacing.lg) }}>
              <h4 style={{ fontSize: '14px', marginBottom: spacingPx(spacing.md) }}>Spacing</h4>
              {Object.entries(spacing).map(([key, value]) => (
                <div key={key} style={{ marginBottom: spacingPx(spacing.sm) }}>
                  <label style={{ display: 'flex', gap: spacingPx(spacing.sm), alignItems: 'center', fontSize: '12px' }}>
                    <span style={{ minWidth: '30px' }}>{key}</span>
                    <input
                      type="text"
                      value={`${value}px`}
                      onChange={(e) => handleSpacingChange(key as keyof typeof DEFAULT_SPACING, parseInt(e.target.value) || value)}
                      style={{ flex: 1, padding: '4px', borderRadius: '4px', border: `1px solid ${colors.softBeige}` }}
                    />
                  </label>
                </div>
              ))}
            </div>

            {/* Border Radius Control */}
            <div>
              <h4 style={{ fontSize: '14px', marginBottom: spacingPx(spacing.md) }}>Border Radius</h4>
              <input
                type="text"
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
                style={{ width: '100%', padding: spacingPx(spacing.sm), borderRadius: '4px', border: `1px solid ${colors.softBeige}` }}
              />
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: spacingPx(spacing.xl),
          backgroundColor: colors.white,
        }}>
          {/* Logo Section */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Logo</h2>
            <div style={{
              backgroundColor: colors.warmCream,
              padding: spacingPx(spacing.xl),
              borderRadius,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: spacingPx(spacing.xl),
            }}>
              <VaultlyLogo variant="full" size="xl" />
              <VaultlyLogo variant="icon" size="lg" />
            </div>
          </section>

          {/* Colour Palette */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Colour Palette</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: spacingPx(spacing.lg),
            }}>
              {Object.entries(colors).map(([name, value]) => (
                <div key={name} style={{
                  backgroundColor: colors.warmCream,
                  padding: spacingPx(spacing.lg),
                  borderRadius,
                  textAlign: 'center',
                }}>
                  <div style={{
                    backgroundColor: value,
                    height: '120px',
                    borderRadius,
                    marginBottom: spacingPx(spacing.md),
                    border: `2px solid ${colors.softBeige}`,
                  }} />
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '13px' }}>{name}</p>
                  <code style={{ fontSize: '11px', color: colors.sage }}>{value}</code>
                </div>
              ))}
            </div>
          </section>

          {/* Typography */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Typography</h2>
            <div style={{ display: 'grid', gap: spacingPx(spacing.lg) }}>
              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h1 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '40px', margin: 0, marginBottom: spacingPx(spacing.sm) }}>
                  Bricolage Grotesque Heading - H1
                </h1>
                <p style={{ margin: 0, fontSize: '12px', color: colors.sage }}>32px for page titles</p>
              </div>
              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '28px', margin: 0, marginBottom: spacingPx(spacing.sm) }}>
                  Bricolage Grotesque Heading - H2
                </h2>
                <p style={{ margin: 0, fontSize: '12px', color: colors.sage }}>28px for section titles</p>
              </div>
              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '16px', margin: 0, marginBottom: spacingPx(spacing.sm) }}>
                  Montserrat Body Text
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: colors.sage }}>16px for body content</p>
              </div>
              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <p style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '14px', margin: 0, marginBottom: spacingPx(spacing.sm) }}>
                  Montserrat Small
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: colors.sage }}>14px for UI labels</p>
              </div>
            </div>
          </section>

          {/* Buttons */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Buttons</h2>
            <div style={{ display: 'grid', gap: spacingPx(spacing.lg) }}>
              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h3 style={{ margin: `0 0 ${spacing.md} 0`, fontSize: '14px' }}>Primary</h3>
                <button style={{
                  backgroundColor: colors.navy,
                  color: colors.white,
                  border: 'none',
                  padding: `${spacing.md} ${spacing.lg}`,
                  borderRadius,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginRight: spacing.md,
                }}>
                  Primary Button
                </button>
                <button style={{
                  backgroundColor: colors.navy,
                  color: colors.white,
                  border: 'none',
                  padding: `${spacing.md} ${spacing.lg}`,
                  borderRadius,
                  cursor: 'not-allowed',
                  fontWeight: 'bold',
                  opacity: 0.5,
                }}>
                  Disabled
                </button>
              </div>

              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h3 style={{ margin: `0 0 ${spacing.md} 0`, fontSize: '14px' }}>Secondary</h3>
                <button style={{
                  backgroundColor: colors.sage,
                  color: colors.white,
                  border: 'none',
                  padding: `${spacing.md} ${spacing.lg}`,
                  borderRadius,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginRight: spacing.md,
                }}>
                  Secondary Button
                </button>
              </div>

              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h3 style={{ margin: `0 0 ${spacing.md} 0`, fontSize: '14px' }}>Danger</h3>
                <button style={{
                  backgroundColor: colors.terracotta,
                  color: colors.white,
                  border: 'none',
                  padding: `${spacing.md} ${spacing.lg}`,
                  borderRadius,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginRight: spacing.md,
                }}>
                  Delete
                </button>
              </div>

              <div style={{
                backgroundColor: colors.warmCream,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h3 style={{ margin: `0 0 ${spacing.md} 0`, fontSize: '14px' }}>Outline</h3>
                <button style={{
                  backgroundColor: 'transparent',
                  color: colors.navy,
                  border: `2px solid ${colors.navy}`,
                  padding: `${spacing.md} ${spacing.lg}`,
                  borderRadius,
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}>
                  Outline Button
                </button>
              </div>
            </div>
          </section>

          {/* Form Elements */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Form Elements</h2>
            <div style={{
              backgroundColor: colors.warmCream,
              padding: spacingPx(spacing.lg),
              borderRadius,
              display: 'grid',
              gap: spacingPx(spacing.lg),
              maxWidth: '400px',
            }}>
              <div>
                <label style={{ display: 'block', marginBottom: spacingPx(spacing.sm), fontSize: '14px', fontWeight: 'bold' }}>
                  Input Field
                </label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  style={{
                    width: '100%',
                    padding: spacingPx(spacing.md),
                    borderRadius,
                    border: `1px solid ${colors.softBeige}`,
                    fontSize: '14px',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: spacingPx(spacing.sm), fontSize: '14px', fontWeight: 'bold' }}>
                  Select
                </label>
                <select style={{
                  width: '100%',
                  padding: spacingPx(spacing.md),
                  borderRadius,
                  border: `1px solid ${colors.softBeige}`,
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}>
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', gap: spacingPx(spacing.sm), alignItems: 'center', cursor: 'pointer' }}>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Cards</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: spacingPx(spacing.lg) }}>
              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.softBeige}`,
                padding: spacingPx(spacing.lg),
                borderRadius,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              }}>
                <h3 style={{ margin: `0 0 ${spacing.sm} 0`, fontSize: '16px' }}>Card Example</h3>
                <p style={{ margin: 0, color: colors.sage, fontSize: '14px' }}>
                  This is a card component with border and subtle shadow.
                </p>
              </div>

              <div style={{
                backgroundColor: colors.warmCream,
                border: `1px solid ${colors.softBeige}`,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h3 style={{ margin: `0 0 ${spacing.sm} 0`, fontSize: '16px' }}>Warm Card</h3>
                <p style={{ margin: 0, color: colors.sage, fontSize: '14px' }}>
                  Card with warm cream background.
                </p>
              </div>

              <div style={{
                backgroundColor: colors.softBeige,
                border: `1px solid ${colors.sage}`,
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <h3 style={{ margin: `0 0 ${spacing.sm} 0`, fontSize: '16px' }}>Accent Card</h3>
                <p style={{ margin: 0, color: colors.navy, fontSize: '14px' }}>
                  Card with accent border.
                </p>
              </div>
            </div>
          </section>

          {/* Badges */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Badges</h2>
            <div style={{ display: 'flex', gap: spacingPx(spacing.md), flexWrap: 'wrap' }}>
              <span style={{
                backgroundColor: colors.mustard,
                color: colors.navy,
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                Warning
              </span>
              <span style={{
                backgroundColor: colors.sage,
                color: colors.white,
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                Success
              </span>
              <span style={{
                backgroundColor: colors.terracotta,
                color: colors.white,
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                Alert
              </span>
              <span style={{
                backgroundColor: colors.navy,
                color: colors.white,
                padding: `${spacing.xs} ${spacing.md}`,
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>
                Info
              </span>
            </div>
          </section>

          {/* Sidebar Example */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Sidebar</h2>
            <div style={{
              display: 'flex',
              gap: spacingPx(spacing.lg),
              backgroundColor: colors.warmCream,
              padding: spacingPx(spacing.lg),
              borderRadius,
            }}>
              <div style={{
                backgroundColor: colors.navy,
                color: colors.white,
                width: '200px',
                padding: spacingPx(spacing.lg),
                borderRadius,
              }}>
                <p style={{ margin: `0 0 ${spacing.lg} 0`, fontSize: '12px', opacity: 0.7 }}>NAVIGATION</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: spacingPx(spacing.md) }}>
                  <a href="#" style={{ color: colors.white, textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
                    Dashboard
                  </a>
                  <a href="#" style={{ color: colors.sage, textDecoration: 'none', fontSize: '14px' }}>
                    Projects
                  </a>
                  <a href="#" style={{ color: colors.sage, textDecoration: 'none', fontSize: '14px' }}>
                    Bills
                  </a>
                  <a href="#" style={{ color: colors.sage, textDecoration: 'none', fontSize: '14px' }}>
                    Calendar
                  </a>
                </div>
              </div>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <p style={{ margin: 0, color: colors.sage }}>Main content area</p>
              </div>
            </div>
          </section>

          {/* Dashboard Card Examples */}
          <section style={{ marginBottom: spacingPx(spacing.xl * 2) }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontSize: '24px', marginBottom: spacingPx(spacing.lg) }}>Dashboard Cards</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: spacingPx(spacing.lg) }}>
              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.softBeige}`,
                padding: spacingPx(spacing.lg),
                borderRadius,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: spacingPx(spacing.md) }}>ðŸ“„</div>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>24</p>
                <p style={{ margin: `${spacing.sm} 0 0 0`, color: colors.sage, fontSize: '14px' }}>Documents</p>
              </div>

              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.softBeige}`,
                padding: spacingPx(spacing.lg),
                borderRadius,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: spacingPx(spacing.md) }}>ðŸ—ï¸</div>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>5</p>
                <p style={{ margin: `${spacing.sm} 0 0 0`, color: colors.sage, fontSize: '14px' }}>Projects</p>
              </div>

              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.softBeige}`,
                padding: spacingPx(spacing.lg),
                borderRadius,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: spacingPx(spacing.md) }}>ðŸ’°</div>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>12</p>
                <p style={{ margin: `${spacing.sm} 0 0 0`, color: colors.sage, fontSize: '14px' }}>Bills</p>
              </div>

              <div style={{
                backgroundColor: colors.white,
                border: `1px solid ${colors.softBeige}`,
                padding: spacingPx(spacing.lg),
                borderRadius,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '32px', marginBottom: spacingPx(spacing.md) }}>ðŸ“…</div>
                <p style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>18</p>
                <p style={{ margin: `${spacing.sm} 0 0 0`, color: colors.sage, fontSize: '14px' }}>Events</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer style={{
            borderTop: `1px solid ${colors.softBeige}`,
            paddingTop: spacing.lg,
            textAlign: 'center',
            color: colors.sage,
            fontSize: '12px',
          }}>
            <p>Vaultly Design System Â© 2026 â€¢ All rights reserved</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default BrandPreview;




