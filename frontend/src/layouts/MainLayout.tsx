import { ReactNode } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import AIChatAssistant from '../components/AIChatAssistant';
import Footer from '../components/Footer';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-hero-gradient text-white">
      <Navbar />
      <div className="relative flex min-h-[calc(100vh-6rem)] gap-6 px-0 pt-28 md:px-10">
        <div className="hidden md:block md:w-80">
          <Sidebar />
        </div>
        <main className="w-full max-w-7xl flex-1 px-6 pb-16 md:px-0">{children}</main>
      </div>
      <Footer />
      <AIChatAssistant />
    </div>
  );
};

export default MainLayout;
