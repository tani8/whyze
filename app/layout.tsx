import type { Metadata } from 'next';
import { DM_Sans, DM_Mono, Playfair_Display } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Whyze — Learn Why You Got It Wrong',
  description:
    'AI-powered certification prep that explains your exact reasoning error — not just the right answer. Built for nurses, expanding to every science certification.',
  openGraph: {
    title: 'Whyze',
    description: 'The only study tool that explains why YOUR answer was wrong.',
    url: 'https://whyze.ai',
    siteName: 'Whyze',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Whyze',
    description: 'The only study tool that explains why YOUR answer was wrong.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${dmSans.variable} ${dmMono.variable} ${playfair.variable}`}>
        <body className="font-sans bg-cream text-navy antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
