import { AnnouncementBar } from '@/components/layout/announcement-bar';
import { Navbar } from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh flex flex-col">
      <header className="relative w-full">
        <AnnouncementBar />
        <Navbar />
      </header>
      <main className="flex-1 container">
        {children}
      </main>
      <Footer />
    </div>
  );
}
