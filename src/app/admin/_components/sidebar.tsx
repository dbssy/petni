import { Logo } from './logo';
import { SidebarRoutes } from './sidebar-routes';

export function Sidebar() {
  return (
    <aside className="bg-white shadow-sm border-r min-h-screen flex flex-col items-center">
      <div className="p-4">
        <Logo />
      </div>

      <div className="w-full h-full overflow-y-auto">
        <SidebarRoutes />
      </div>
    </aside>
  );
}
