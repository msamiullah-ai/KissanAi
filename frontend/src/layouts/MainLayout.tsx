import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-8">
        <div className="hidden xl:block xl:w-72">
          <Sidebar />
        </div>
        <main className="min-h-[calc(100vh-6rem)] w-full">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
