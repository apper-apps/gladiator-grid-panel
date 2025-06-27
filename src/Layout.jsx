import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Ancient background with Colosseum atmosphere */}
      <div className="fixed inset-0 bg-gradient-to-b from-background via-surface-900 to-background">
        <div className="absolute inset-0 bg-stone-texture opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-surface-800/20 to-background/40"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;