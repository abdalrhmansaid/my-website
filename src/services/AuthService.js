// Client-side-only admin auth. This is enough to gate the /admin UI in a
// project with no backend yet, but it is NOT real security — anyone with
// devtools access to this browser can read localStorage. See README →
// "Future Backend Integration" for how to replace this with a real,
// server-verified session once a backend exists.

import { storage, KEYS } from '@/utils/storage';

const DEFAULT_CREDENTIALS = {
  username: 'admin',
  // Default password: velora2026 — change this immediately from
  // src/data seed or via the one-time setup below. See README.
  password: 'velora2026',
};

const SESSION_TTL_MS = 12 * 60 * 60 * 1000; // 12h

function ensureSeeded() {
  storage.seed(KEYS.ADMIN_CREDENTIALS, DEFAULT_CREDENTIALS);
}

export const AuthService = {
  login(username, password) {
    ensureSeeded();
    const creds = storage.get(KEYS.ADMIN_CREDENTIALS, DEFAULT_CREDENTIALS);
    const ok = username.trim() === creds.username && password === creds.password;
    if (!ok) return { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' };

    const session = { username, expiresAt: Date.now() + SESSION_TTL_MS };
    storage.set(KEYS.AUTH, session);
    return { success: true };
  },

  logout() {
    storage.remove(KEYS.AUTH);
  },

  isAuthenticated() {
    const session = storage.get(KEYS.AUTH, null);
    if (!session) return false;
    if (Date.now() > session.expiresAt) {
      storage.remove(KEYS.AUTH);
      return false;
    }
    return true;
  },

  changeCredentials({ currentPassword, newUsername, newPassword }) {
    ensureSeeded();
    const creds = storage.get(KEYS.ADMIN_CREDENTIALS, DEFAULT_CREDENTIALS);
    if (currentPassword !== creds.password) {
      return { success: false, error: 'كلمة المرور الحالية غير صحيحة' };
    }
    const next = {
      username: newUsername?.trim() || creds.username,
      password: newPassword || creds.password,
    };
    storage.set(KEYS.ADMIN_CREDENTIALS, next);
    return { success: true };
  },
};
