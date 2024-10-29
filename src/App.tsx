import { useState } from 'react';
import { AuthForm } from './components/AuthForm';
import { LandingPage } from './components/LandingPage';

type Page = 'landing' | 'login' | 'signup';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentPage === 'landing' ? (
        <LandingPage onNavigate={handleNavigate} />
      ) : (
        <div className="flex items-center justify-center p-4 min-h-screen">
          <div className="w-full">
            <button
              onClick={() => setCurrentPage('landing')}
              className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2 mx-auto"
            >
              ← Back to Home
            </button>
            <AuthForm initialMode={currentPage === 'login' ? 'login' : 'signup'} />
          </div>
        </div>
      )}
    </div>
  );
}