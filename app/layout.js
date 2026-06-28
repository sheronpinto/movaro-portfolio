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
  title: 'MOVARO® — Motion Design That Moves People',
  description:
    'MOVARO crafts premium motion graphics, cinematic visuals and digital experiences.',
  openGraph: {
    title: 'MOVARO® — Motion Design That Moves People',
    description: 'Premium motion graphics, cinematic visuals and digital experiences.'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <head>
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
