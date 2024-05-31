import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "KFZ Relocation Admin",
  description: "Admin dashboard of KFZ Relocation Courier",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body
          className={`${inter.className} flex items-start justify-between h-screen`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Sidebar />
            <main className="w-full h-full overflow-auto">
              <Header />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
