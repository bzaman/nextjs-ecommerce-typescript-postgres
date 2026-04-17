export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-svh flex flex-col">
      <main className="flex-1 container">
        {children}
      </main>
    </div>
  );
}
