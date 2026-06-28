import './globals.css';
import { Providers } from './providers';
import { Space_Grotesk } from 'next/font/google';
import Shell from './Shell';



const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap'
});

export const metadata = {
  title: 'Sheron Pinto • Motion Designer® · Motion Design That Moves People',
  description:
    'The portfolio of Sheron Pinto, founder of MOVARO. Premium motion graphics, visual storytelling and cinematic digital experiences.',
  authors: [{ name: 'Sheron Pinto' }],
  creator: 'Sheron Pinto',

  icons: {
    icon: '/logo.svg',
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },

  openGraph: {
    title: 'Sheron Pinto • Motion Designer® · Motion Design That Moves People',
    description: 'Premium motion graphics, visual storytelling and cinematic digital experiences by Sheron Pinto, founder of MOVARO.',
    siteName: 'Sheronpinto®',
    type: 'website'
    
  }
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              'window.addEventListener("error",function(e){if(e.error instanceof DOMException&&e.error.name==="DataCloneError"&&e.message&&e.message.includes("PerformanceServerTiming")){e.stopImmediatePropagation();e.preventDefault()}},true);'
          }}
        />
      </head>
      <body className="font-sans antialiased bg-[#050505] text-white selection:bg-[#8E7B4B]/40 selection:text-white">
        <Providers>
          <Shell>{children}</Shell>
        </Providers>
      </body>
    </html>
  );
}
