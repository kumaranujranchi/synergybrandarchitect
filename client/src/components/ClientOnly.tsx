/**
 * ClientOnly - Renders children ONLY on the client after hydration.
 *
 * Use this to wrap components that:
 * - Use browser-only APIs (window, document, localStorage)
 * - Use Radix UI with useId() which generates mismatching IDs server vs client
 * - Have dynamic state that always differs between SSR and client (modals, toasts, etc.)
 *
 * This prevents React hydration mismatches and ensures SSR stays intact for SEO.
 */
import { useEffect, useState, ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <>{fallback}</>;
  return <>{children}</>;
}

export default ClientOnly;
