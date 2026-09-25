import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { TopicDetailPage } from './pages/TopicDetailPage';
import { LearningModePage } from './pages/LearningModePage';
import { PracticeModePage } from './pages/PracticeModePage';
import { TestEnginePage } from './pages/TestEnginePage';
import { ResultPage } from './pages/ResultPage';
import { DashboardPage } from './pages/DashboardPage';
import { MistakesPage } from './pages/MistakesPage';
import { RevisionPage } from './pages/RevisionPage';
import { StudyPlanPage } from './pages/StudyPlanPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { FinalRevisionPage } from './pages/FinalRevisionPage';
import { AuthPages } from './pages/AuthPages';
import { AdminPage } from './pages/AdminPage';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [routeState, setRouteState] = useState<any>(null);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string | number, state?: any) => {
    if (typeof path === 'number') {
      window.history.go(path);
      return;
    }
    if (state !== undefined) {
      setRouteState(state);
    }
    window.history.pushState(state, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Route matching
  const renderCurrentRoute = () => {
    const [pathname, search] = currentPath.split('?');
    const urlParams = new URLSearchParams(search || window.location.search);

    // Static matches
    if (pathname === '/' || pathname === '') {
      return <LandingPage navigate={navigate} />;
    }
    if (pathname === '/subjects') {
      return <SubjectsPage navigate={navigate} />;
    }
    if (pathname === '/dashboard') {
      return <DashboardPage navigate={navigate} />;
    }
    if (pathname === '/mistakes') {
      return <MistakesPage navigate={navigate} />;
    }
    if (pathname === '/revision') {
      return <RevisionPage navigate={navigate} />;
    }
    if (pathname === '/study-plan') {
      return <StudyPlanPage navigate={navigate} />;
    }
    if (pathname === '/bookmarks') {
      return <BookmarksPage navigate={navigate} />;
    }
    if (pathname === '/final-revision') {
      return <FinalRevisionPage navigate={navigate} />;
    }
    if (pathname === '/practice') {
      return (
        <PracticeModePage
          navigate={navigate}
          initialSubjectId={urlParams.get('subject_id') || undefined}
          initialTopicId={urlParams.get('topic_id') || undefined}
        />
      );
    }
    if (pathname === '/learn') {
      return (
        <LearningModePage
          navigate={navigate}
          subjectId={urlParams.get('subject_id') || undefined}
          topicId={urlParams.get('topic_id') || undefined}
        />
      );
    }
    if (pathname === '/mocks') {
      return <SubjectsPage navigate={navigate} />;
    }
    if (pathname === '/login') {
      return <AuthPages initialMode="login" navigate={navigate} />;
    }
    if (pathname === '/register') {
      return <AuthPages initialMode="register" navigate={navigate} />;
    }
    if (pathname === '/forgot-password') {
      return <AuthPages initialMode="forgot" navigate={navigate} />;
    }
    if (pathname === '/admin') {
      return <AdminPage navigate={navigate} />;
    }

    // Dynamic matches
    if (pathname.startsWith('/subjects/')) {
      const slug = pathname.replace('/subjects/', '');
      return <SubjectDetailPage slug={slug} navigate={navigate} />;
    }

    if (pathname.startsWith('/topic/')) {
      const topicId = pathname.replace('/topic/', '');
      return <TopicDetailPage topicId={topicId} navigate={navigate} />;
    }

    if (pathname.startsWith('/test/') || pathname.startsWith('/mock/')) {
      const testId = pathname.startsWith('/test/')
        ? pathname.replace('/test/', '')
        : pathname.replace('/mock/', '');
      return <TestEnginePage testId={testId} navigate={navigate} />;
    }

    if (pathname.startsWith('/results/')) {
      const attemptId = pathname.replace('/results/', '');
      return (
        <ResultPage
          attemptId={attemptId}
          resultData={routeState?.result || routeState?.state?.result}
          navigate={navigate}
        />
      );
    }

    // Default 404 fallback
    return (
      <div className="max-w-md mx-auto my-20 text-center space-y-4 px-4">
        <h2 className="text-3xl font-extrabold text-slate-800">404 - Page Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested page does not exist on the ADC 2nd Semester Prep platform.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  };

  const isExamMode = currentPath.startsWith('/test/') || currentPath.startsWith('/mock/');

  return (
    <AuthProvider>
      <ToastProvider>
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-900 selection:text-white">
          {!isExamMode && <Navbar currentPath={currentPath} navigate={navigate} />}
          <main className="flex-1">{renderCurrentRoute()}</main>
          {!isExamMode && <Footer navigate={navigate} />}
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
