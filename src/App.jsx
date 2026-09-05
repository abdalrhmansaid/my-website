import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { StoreProvider } from '@/contexts/StoreContext';
import { WishlistProvider } from '@/contexts/WishlistContext';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/common/ProtectedRoute';

import Layout from '@/components/layout/Layout';
import HomePage from '@/pages/HomePage';
import ProductsPage from '@/pages/ProductsPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import WishlistPage from '@/pages/WishlistPage';
import OffersPage from '@/pages/OffersPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import NotFoundPage from '@/pages/NotFoundPage';

import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminOverviewPage from '@/pages/admin/AdminOverviewPage';
import AdminProductsPage from '@/pages/admin/AdminProductsPage';
import AdminProductFormPage from '@/pages/admin/AdminProductFormPage';
import AdminCategoriesPage from '@/pages/admin/AdminCategoriesPage';
import AdminBannersPage from '@/pages/admin/AdminBannersPage';
import AdminSettingsPage from '@/pages/admin/AdminSettingsPage';

function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <StoreProvider>
          <AuthProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </AuthProvider>
        </StoreProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Providers>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:id" element={<ProductDetailsPage />} />
            <Route path="wishlist" element={<WishlistPage />} />
            <Route path="offers" element={<OffersPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminOverviewPage />} />
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="products/new" element={<AdminProductFormPage />} />
            <Route path="products/:id" element={<AdminProductFormPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="banners" element={<AdminBannersPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
        </Routes>
      </Providers>
    </BrowserRouter>
  );
}
