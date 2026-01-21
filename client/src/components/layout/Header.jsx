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
        <header className="sticky top-0 z-50 w-full glass-3 border-b border-white/20 dark:border-white/10 backdrop-blur-3xl">
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-neural-purple/5 to-accent-500/5 pointer-events-none animate-neural-flow"
                style={{ backgroundSize: '200% 200%' }} />

            <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Left: Logo + Mobile Menu */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onMenuToggle}
                        className="lg:hidden p-2 rounded-xl hover:bg-white/10 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 transition-fluid"
                        aria-label="Toggle menu"
                    >
                        <Menu className="w-5 h-5" />
                    </button>

                    <a href="/" className="flex items-center gap-3 group">
                        <div className="relative w-10 h-10 bg-gradient-neural rounded-2xl flex items-center justify-center shadow-neural transition-all group-hover:scale-110 group-hover:rotate-6 overflow-hidden">
                            <Sparkles className="w-5 h-5 text-white relative z-10 group-hover:animate-pulse-glow" />
                            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -inset-1 bg-gradient-neural rounded-2xl blur-xl opacity-50 group-hover:opacity-100 transition-opacity animate-pulse-glow" />
                        </div>
                        <div>
                            <span className="font-black text-lg gradient-text hidden sm:block">
                                Deepcode Academy
                            </span>
                        </div>
                    </a>
                </div>

                {/* Right: Search + Theme Toggle */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={onSearchOpen}
                        className="group flex items-center gap-2 px-4 py-2 rounded-2xl glass-3 hover:shadow-neural border border-white/20 dark:border-white/10 transition-fluid hover:scale-105"
                    >
                        <Search className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
                        <span className="hidden sm:inline text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            Search
                        </span>
                        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs font-mono bg-gradient-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-lg border border-gray-300/50 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </button>

                    <button
                        onClick={toggleTheme}
                        className="relative p-2.5 rounded-2xl bg-gradient-to-br from-primary-500 via-neural-purple to-accent-500 hover:from-primary-600 hover:via-neural-purple hover:to-accent-600 text-white transition-all hover:scale-110 hover:rotate-12 shadow-glow hover:shadow-glow-xl overflow-hidden group"
                        aria-label="Toggle theme"
                    >
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10 transition-transform duration-500 group-hover:rotate-180">
                            {theme === 'dark' ? (
                                <Sun className="w-5 h-5" />
                            ) : (
                                <Moon className="w-5 h-5" />
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};
