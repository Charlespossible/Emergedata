import type { ReactNode } from 'react';
import { Layout } from '@/components/layout/Layout';
import { AppRoutes } from './routes';

/**
 * `children` exists so the build-time pre-render can swap in the eager route table.
 * Everything else — client and tests — uses the code-split default.
 */
export default function App({ children }: { children?: ReactNode }) {
  return <Layout>{children ?? <AppRoutes />}</Layout>;
}
