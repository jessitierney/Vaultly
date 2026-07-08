/**
 * Vaultly Auth Types
 * ==================
 * Shared types for the authentication system.
 * Designed to be extensible: Google → Apple, Microsoft, Magic Link, Passkeys.
 */

export type AuthProvider = 'email' | 'google' | 'apple' | 'microsoft' | 'magic-link' | 'passkey';

export interface ConnectedProvider {
  provider: AuthProvider;
  /** Provider's own user identifier */
  providerId: string;
  /** Display name from provider (e.g. Google account email) */
  displayName?: string;
  /** Avatar URL from provider */
  avatar?: string;
  linkedAt: string; // ISO date string
}

export interface VaultlyUser {
  id: number;
  name: string;
  email: string;
  householdId?: number;
  /** Primary avatar URL (may come from Google, Apple, etc.) */
  avatar?: string;
  /** All linked auth providers */
  providers: ConnectedProvider[];
}

/** Parsed payload from Google's credential JWT */
export interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  picture?: string;
  emailVerified: boolean;
}

/**
 * Decode a Google credential JWT (id_token) without verifying signature.
 * Safe to use client-side because the token is received directly from Google over HTTPS.
 */
export function decodeGoogleCredential(credential: string): GoogleProfile {
  const parts = credential.split('.');
  if (parts.length !== 3) throw new Error('Invalid Google credential format');
  // Base64url → Base64 → JSON
  const payload = atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'));
  const claims = JSON.parse(payload);
  return {
    googleId: claims.sub,
    email: claims.email,
    name: claims.name ?? claims.email,
    picture: claims.picture,
    emailVerified: claims.email_verified ?? false,
  };
}
