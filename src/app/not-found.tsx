import Link from 'next/link';

export const metadata = {
  title: 'Page Not Found | Vaatsalya Foods',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
      <h1 className="text-6xl font-black text-navy mb-4">404</h1>
      <h2 className="text-2xl font-bold text-navy/80 mb-8">Page Not Found</h2>
      <p className="text-sm text-navy/60 mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/" 
        className="px-8 py-4 bg-accent-orange text-navy font-black uppercase tracking-widest rounded-xl hover:bg-navy hover:text-white transition-all shadow-md inline-block"
      >
        Return to Home
      </Link>
    </div>
  );
}
