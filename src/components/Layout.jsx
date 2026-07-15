
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="grow max-w-7xl mx-auto w-full p-6">
        {/* Outlet acts as a placeholder for whichever page route is active */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;