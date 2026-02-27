'use client'

// Compatibility shim: replaces react-router-dom with Next.js equivalents
export { default as Link } from 'next/link'
export type { LinkProps } from 'next/link'
export { useParams, useRouter, usePathname } from 'next/navigation'

// NavLinkProps type shim
export type NavLinkProps = {
  href: string;
  className?: string | ((args: { isActive: boolean; isPending: boolean }) => string);
  children?: React.ReactNode;
  [key: string]: unknown;
}

// useNavigate → returns router.push
import { useRouter } from 'next/navigation'
export function useNavigate() {
  const router = useRouter()
  return (path: string) => router.push(path)
}

// useLocation shim - avoids useSearchParams which needs Suspense
import { usePathname } from 'next/navigation'
export function useLocation() {
  const pathname = usePathname()
  return {
    pathname,
    search: typeof window !== 'undefined' ? window.location.search : '',
    hash: typeof window !== 'undefined' ? window.location.hash : '',
  }
}
