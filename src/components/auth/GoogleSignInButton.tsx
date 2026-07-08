/**
 * GoogleSignInButton
 * ==================
 * Official Google Sign-In button following Google's branding guidelines.
 * Uses @react-oauth/google → useGoogleLogin (popup flow).
 *
 * Falls back to a visible disabled state when VITE_GOOGLE_CLIENT_ID is not
 * set so the UI still renders correctly during development.
 */

import { useGoogleLogin } from '@react-oauth/google';
import type { GoogleProfile } from '../../types/auth';
import { decodeGoogleCredential } from '../../types/auth';

interface GoogleSignInButtonProps {
  onSuccess: (profile: GoogleProfile) => void;
  onError?: (error: unknown) => void;
  label?: string;
  disabled?: boolean;
}

/** Google's official "G" logo in SVG — per brand guidelines */
const GoogleG = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z"
    />
    <path
      fill="#34A853"
      d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z"
    />
    <path
      fill="#FBBC05"
      d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z"
    />
    <path
      fill="#EA4335"
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z"
    />
  </svg>
);

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;
const isConfigured = Boolean(CLIENT_ID && CLIENT_ID !== 'YOUR_GOOGLE_CLIENT_ID_HERE');

/** Inner button — only rendered when provider is available */
function ActiveGoogleButton({ onSuccess, onError, label = 'Continue with Google', disabled = false }: GoogleSignInButtonProps) {
  const login = useGoogleLogin({
    // Use the code flow with credential response
    flow: 'implicit',
    onSuccess: (tokenResponse) => {
      // With implicit flow we get an access_token, not an id_token.
      // Fetch userinfo from Google to get the profile.
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      })
        .then((r) => r.json())
        .then((info) => {
          const profile: GoogleProfile = {
            googleId: info.sub,
            email: info.email,
            name: info.name ?? info.email,
            picture: info.picture,
            emailVerified: info.email_verified ?? false,
          };
          onSuccess(profile);
        })
        .catch((err) => onError?.(err));
    },
    onError: (err) => onError?.(err),
  });

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && login()}
      className="
        flex w-full items-center justify-center gap-3
        rounded-[12px] border border-[#DADCE0] bg-white
        px-4 py-3 text-sm font-medium text-[#3C4043]
        shadow-sm transition-all duration-150
        hover:bg-[#F8F9FA] hover:shadow-md active:bg-[#F1F3F4]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4285F4]
        disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-white
      "
    >
      <GoogleG />
      <span>{label}</span>
    </button>
  );
}

/** Shown when no client ID is configured (dev placeholder) */
function UnconfiguredButton({ label = 'Continue with Google' }: Pick<GoogleSignInButtonProps, 'label'>) {
  return (
    <div className="group relative w-full">
      <button
        type="button"
        disabled
        className="
          flex w-full cursor-not-allowed items-center justify-center gap-3
          rounded-[12px] border border-[#DADCE0] bg-[#F8F9FA]
          px-4 py-3 text-sm font-medium text-[#9AA0A6]
          opacity-60
        "
      >
        <GoogleG />
        <span>{label}</span>
      </button>
      <div className="
        pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2
        rounded-lg bg-[#38506A] px-3 py-2 text-xs text-white opacity-0 shadow-lg
        transition-opacity group-hover:opacity-100 whitespace-nowrap
      ">
        Set VITE_GOOGLE_CLIENT_ID in your .env to enable
      </div>
    </div>
  );
}

export function GoogleSignInButton(props: GoogleSignInButtonProps) {
  if (!isConfigured) return <UnconfiguredButton label={props.label} />;
  return <ActiveGoogleButton {...props} />;
}

// Re-export for use in credential (id_token) flows if needed
export { decodeGoogleCredential };
export type { GoogleProfile };
