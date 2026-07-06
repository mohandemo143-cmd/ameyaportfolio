import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

// Import the components
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";

// Configure Next.js optimized fonts
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

const instrumentSerif = Instrument_Serif({ 
  weight: "400", 
  subsets: ["latin"], 
  variable: "--font-instrument" 
});

export const metadata = {
  title: "Ameya IT Solutions",
  description: "Software studio building enterprise platforms, AI systems and digital products.",
};

// ADDED: This forces mobile browsers to use light-themed scrollbars and inputs
export const viewport = {
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    // ADDED: className="light" and style={{ colorScheme: 'light' }}
    <html lang="en" className="light scroll-smooth" style={{ colorScheme: 'light' }}>
      <body className={`${inter.variable} ${instrumentSerif.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Nav />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}