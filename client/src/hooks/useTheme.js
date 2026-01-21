import { useState, useEffect } from 'react';

/**
 * Hook for managing dark/light theme
 */
export const useTheme = () => {
    const [theme, setTheme] = useState(() => {
        // Check localStorage first
        const stored = localStorage.getItem('theme');
        if (stored) return stored;

        // Check system preference
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }

        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;

        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return { theme, toggleTheme };
};
