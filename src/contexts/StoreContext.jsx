// Holds store-wide data that many components need at once: settings and
// categories. Keeping them in context avoids re-reading localStorage on
// every render and gives Admin edits an instant, app-wide refresh.

import { createContext, useContext, useState, useCallback } from 'react';
import { SettingsService } from '@/services/SettingsService';
import { CategoryService } from '@/services/CategoryService';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [settings, setSettings] = useState(() => SettingsService.get());
  const [categories, setCategories] = useState(() => CategoryService.getAll());

  const refreshSettings = useCallback(() => setSettings(SettingsService.get()), []);
  const refreshCategories = useCallback(() => setCategories(CategoryService.getAll()), []);

  const updateSettings = useCallback((patch) => {
    const next = SettingsService.update(patch);
    setSettings(next);
    return next;
  }, []);

  const updateSettingsSection = useCallback((section, patch) => {
    const next = SettingsService.updateNested(section, patch);
    setSettings(next);
    return next;
  }, []);

  return (
    <StoreContext.Provider
      value={{ settings, categories, refreshSettings, refreshCategories, updateSettings, updateSettingsSection }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
