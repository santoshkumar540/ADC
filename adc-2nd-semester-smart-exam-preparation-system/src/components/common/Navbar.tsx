import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  GraduationCap,
  BookOpen,
  CheckSquare,
  Award,
  RotateCcw,
  Calendar,
  Bookmark,
  ShieldCheck,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Zap
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { user, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Subjects', path: '/subjects', icon: BookOpen },
    { label: 'Practice', path: '/practice', icon: CheckSquare },
    { label: '60-MCQ Mocks', path: '/mocks', icon: Award },
    { label: 'Revision', path: '/revision', icon: RotateCcw },
    { label: 'Study Plan', path: '/study-plan', icon: Calendar },
    { label: 'Final Revision', path: '/final-revision', icon: Zap },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-900 to-teal-700 flex items-center justify-center text-white shadow-md shadow-blue-900/10 group-hover:scale-105 transition duration-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                  ADC 2nd Semester
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  Smart Prep
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Curriculum Assessment & MCQ Engine
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath.startsWith(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition duration-150 ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Auth or Profile */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition text-sm font-medium text-slate-800"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-900 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {(user.name || user.email || 'U').charAt(0)}
                  </div>
                  <span className="max-w-[120px] truncate">{(user.name || user.email || 'User').split(' ')[0]}</span>
                  {isAdmin && (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.5 rounded">
                      Admin
                    </span>
                  )}
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in-50 zoom-in-95">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
                    </div>

                    <button
                      onClick={() => handleNav('/dashboard')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <UserIcon className="w-4 h-4 text-slate-400" />
                      Student Dashboard
                    </button>

                    <button
                      onClick={() => handleNav('/mistakes')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <RotateCcw className="w-4 h-4 text-amber-500" />
                      My Mistakes Bank
                    </button>

                    <button
                      onClick={() => handleNav('/bookmarks')}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                    >
                      <Bookmark className="w-4 h-4 text-teal-500" />
                      Saved Bookmarks
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleNav('/admin')}
                        className="w-full text-left px-4 py-2 text-sm font-semibold text-blue-900 hover:bg-blue-50 flex items-center gap-2.5 border-t border-slate-100"
                      >
                        <ShieldCheck className="w-4 h-4 text-blue-700" />
                        Admin CMS Panel
                      </button>
                    )}

                    <div className="border-t border-slate-100 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        handleNav('/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium"
                    >
                      <LogOut className="w-4 h-4 text-rose-500" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-3.5 py-1.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100/70 rounded-lg transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-4 py-1.5 text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 rounded-lg shadow-sm shadow-blue-900/20 transition"
                >
                  Register Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top-2">
          {user && (
            <div className="p-3 mb-2 rounded-xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-700 font-medium">Logged in</p>
                <p className="text-sm font-bold text-slate-900">{user.name || user.email || 'Student'}</p>
              </div>
              <button
                onClick={() => handleNav('/dashboard')}
                className="text-xs font-semibold text-blue-900 bg-white px-2.5 py-1 rounded-lg border border-blue-200 shadow-xs"
              >
                Dashboard
              </button>
            </div>
          )}

          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = currentPath.startsWith(link.path);
            return (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-blue-900 text-white font-semibold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {link.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 space-y-1">
            {user ? (
              <>
                <button
                  onClick={() => handleNav('/mistakes')}
                  className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  <RotateCcw className="w-4 h-4 text-amber-500" />
                  My Mistakes Bank
                </button>
                <button
                  onClick={() => handleNav('/bookmarks')}
                  className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-xl"
                >
                  <Bookmark className="w-4 h-4 text-teal-500" />
                  Saved Bookmarks
                </button>
                {isAdmin && (
                  <button
                    onClick={() => handleNav('/admin')}
                    className="w-full flex items-center gap-3 px-3.5 py-2 text-sm font-bold text-blue-900 bg-blue-50 rounded-xl"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    handleNav('/');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-xl font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="w-full py-2.5 text-center text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="w-full py-2.5 text-center text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
