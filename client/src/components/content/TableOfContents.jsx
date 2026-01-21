import { useState, useEffect } from 'react';
import { extractHeadings } from '../../utils/markdownUtils';

export const TableOfContents = ({ content }) => {
    const [headings, setHeadings] = useState([]);
    const [activeId, setActiveId] = useState('');

    useEffect(() => {
        const extracted = extractHeadings(content);
        setHeadings(extracted);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-100px 0px -80% 0px',
            }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    const handleClick = (e, id) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            window.history.pushState(null, '', `#${id}`);
        }
    };

    return (
        <nav className="hidden xl:block sticky top-20 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                On This Page
            </h4>
            <ul className="space-y-2 text-sm">
                {headings.map(({ id, text, level }) => (
                    <li
                        key={id}
                        className={`${level === 3 ? 'ml-4' : ''}`}
                    >
                        <a
                            href={`#${id}`}
                            onClick={(e) => handleClick(e, id)}
                            className={`block py-1 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${activeId === id
                                    ? 'text-primary-600 dark:text-primary-400 font-medium border-l-2 border-primary-600 dark:border-primary-400 pl-3 -ml-3'
                                    : 'text-gray-600 dark:text-gray-400'
                                }`}
                        >
                            {text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
