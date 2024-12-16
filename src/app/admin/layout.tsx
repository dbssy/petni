import { MobileSidebar } from './_components/mobile-sidebar';
import { Sidebar } from './_components/sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full">
      <div className="md:hidden w-full h-2 p-4 inset-y-0 z-50 fixed">
        <MobileSidebar />
      </div>

      <div className="hidden md:flex w-48 h-full flex-col inset-y-0 z-50 fixed">
        <Sidebar />
      </div>

      <main className="h-full md:pl-56 pt-20 md:pt-10 px-4">{children}</main>
    </div>
  );
}
