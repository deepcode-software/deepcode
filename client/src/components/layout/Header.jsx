import { Search, Moon, Sun, Menu, Sparkles } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const Header = ({ onSearchOpen, onMenuToggle }) => {
    const { theme, toggleTheme } = useTheme();

    const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            onSearchOpen();
        }
    };

    // Add keyboard listener
    if (typeof window !== 'undefined') {
        window.addEventListener('keydown', handleKeyDown);
    }

    return (
        <header className="sticky top-0 z-50 w-full glass border-b border-white/20 dark:border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-accent-500/10 pointer-events-none" />

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left: Logo + Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuToggle}
                        className="lg:hidden p-2 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-all"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <a href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30 transition-all group-hover:scale-110 group-hover:shadow-glow">
                            <Sparkles className="w-5 h-5 text-white" />
                            <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div>
                            <span className="font-bold text-lg gradient-text hidden sm:block">
                                Deepcode Academy
                            </span>
                        </div>
                    </a>
                </div>

                {/* Right: Search + Theme Toggle */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onSearchOpen}
                        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 border border-gray-200/50 dark:border-white/10 transition-all hover:shadow-lg"
                    >
                        <Search className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                        <span className="hidden sm:inline text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                            Search
                        </span>
                        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded border border-gray-300 dark:border-gray-700 shadow-sm">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="relative p-2.5 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white transition-all hover:scale-110 hover:shadow-glow overflow-hidden group"
                        aria-label="Toggle theme"
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 relative z-10" />
                        ) : (
                            <Moon className="w-5 h-5 relative z-10" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
};
