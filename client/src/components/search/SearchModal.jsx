import { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';

export const SearchModal = ({ isOpen, onClose, results, onSearch, query }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        setSelectedIndex(0);
    }, [results]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'Escape':
                    onClose();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (results[selectedIndex]) {
                        handleSelect(results[selectedIndex]);
                    }
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex]);

    const handleSelect = (result) => {
        navigate(`/docs/${result.courseSlug}/${result.slug}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop with blur */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/10" />
            </div>

            {/* Modal */}
            <div className="relative min-h-screen flex items-start justify-center p-4 pt-20">
                <div className="relative w-full max-w-3xl glass rounded-3xl shadow-2xl border border-white/20 dark:border-white/10 overflow-hidden animate-fade-in">
                    {/* Decorative gradient */}
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

                    {/* Search Input */}
                    <div className="flex items-center gap-4 px-6 py-5 border-b border-gray-200/50 dark:border-white/10">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-primary rounded-xl shadow-lg">
                            <Search className="w-5 h-5 text-white" />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="Kurslar va darslarni qidirish..."
                            value={query}
                            onChange={(e) => onSearch(e.target.value)}
                            className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 outline-none text-lg font-medium"
                        />
                        <button
                            onClick={onClose}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Results */}
                    <div className="max-h-[500px] overflow-y-auto">
                        {query && results.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">
                                    "{query}" uchun natija topilmadi
                                </p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                    Boshqa kalit so'zlar bilan qidirib ko'ring
                                </p>
                            </div>
                        ) : query ? (
                            <ul className="py-2">
                                {results.map((result, index) => (
                                    <li key={`${result.courseSlug}-${result.slug}`}>
                                        <button
                                            onClick={() => handleSelect(result)}
                                            onMouseEnter={() => setSelectedIndex(index)}
                                            className={clsx(
                                                'w-full text-left px-6 py-4 flex items-center gap-4 transition-all group',
                                                index === selectedIndex
                                                    ? 'bg-gradient-to-r from-primary-500/10 to-transparent'
                                                    : 'hover:bg-white/50 dark:hover:bg-white/5'
                                            )}
                                        >
                                            <div className={clsx(
                                                'flex items-center justify-center w-10 h-10 rounded-xl transition-all',
                                                index === selectedIndex
                                                    ? 'bg-gradient-primary shadow-lg'
                                                    : 'bg-gray-100 dark:bg-gray-800 group-hover:bg-primary-500/20'
                                            )}>
                                                <FileText className={clsx(
                                                    'w-5 h-5',
                                                    index === selectedIndex
                                                        ? 'text-white'
                                                        : 'text-gray-600 dark:text-gray-400'
                                                )} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={clsx(
                                                    'font-semibold text-base mb-1',
                                                    index === selectedIndex
                                                        ? 'text-primary-700 dark:text-primary-300'
                                                        : 'text-gray-900 dark:text-white'
                                                )}>
                                                    {result.title}
                                                </div>
                                                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                    <span>{result.course}</span>
                                                </div>
                                            </div>
                                            <ArrowRight className={clsx(
                                                'w-5 h-5 transition-all',
                                                index === selectedIndex
                                                    ? 'text-primary-600 dark:text-primary-400 translate-x-0 opacity-100'
                                                    : 'text-gray-400 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                            )} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-6 py-16 text-center">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-2xl flex items-center justify-center">
                                    <Search className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                                    Qidirishni boshlang
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Kurslar va darslarni tez toping
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 border-t border-gray-200/50 dark:border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
                            <span className="flex items-center gap-1.5">
                                <kbd className="px-2 py-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded border border-gray-300 dark:border-gray-700 font-mono">↑↓</kbd>
                                Harakatlanish
                            </span>
                            <span className="flex items-center gap-1.5">
                                <kbd className="px-2 py-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded border border-gray-300 dark:border-gray-700 font-mono">↵</kbd>
                                Tanlash
                            </span>
                            <span className="flex items-center gap-1.5">
                                <kbd className="px-2 py-1 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded border border-gray-300 dark:border-gray-700 font-mono">ESC</kbd>
                                Yopish
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
