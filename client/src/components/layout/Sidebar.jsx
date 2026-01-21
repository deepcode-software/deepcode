import { useState } from 'react';
import { ChevronRight, FileText, Folder, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

export const Sidebar = ({ structure, isOpen, onClose }) => {
    const [expandedCourses, setExpandedCourses] = useState(
        structure.map((_, index) => index) // Expand all by default
    );
    const location = useLocation();

    const toggleCourse = (index) => {
        setExpandedCourses(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    const isActiveLesson = (courseSlug, lessonSlug) => {
        return location.pathname === `/docs/${courseSlug}/${lessonSlug}`;
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 lg:hidden transition-opacity animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    'fixed lg:sticky top-16 left-0 z-40 w-80 h-[calc(100vh-4rem)] glass-3 border-r border-white/20 dark:border-white/10 overflow-y-auto transition-all duration-300 lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Neural gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-neural-purple/5 to-accent-500/5 pointer-events-none opacity-60 animate-neural-flow"
                    style={{ backgroundSize: '200% 200%' }} />

                <nav className="relative p-6 space-y-3">
                    {structure.map((course, courseIndex) => (
                        <div key={course.slug} className="space-y-1">
                            <button
                                onClick={() => toggleCourse(courseIndex)}
                                className={clsx(
                                    'w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-2xl transition-fluid group depth-layer',
                                    expandedCourses.includes(courseIndex)
                                        ? 'neural-card text-primary-700 dark:text-primary-300 shadow-neural'
                                        : 'hover:glass dark:hover:bg-white/5 text-gray-700 dark:text-gray-300 hover:shadow-depth'
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        'w-9 h-9 rounded-xl flex items-center justify-center transition-all',
                                        expandedCourses.includes(courseIndex)
                                            ? 'bg-gradient-neural shadow-neural'
                                            : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 group-hover:from-primary-500/30 group-hover:to-accent-500/30'
                                    )}>
                                        {expandedCourses.includes(courseIndex) ? (
                                            <Sparkles className="w-4 h-4 text-white animate-pulse-glow" />
                                        ) : (
                                            <Folder className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-primary-500" />
                                        )}
                                    </div>
                                    <span>{course.name}</span>
                                </div>
                                <ChevronRight
                                    className={clsx(
                                        'w-4 h-4 transition-transform duration-300',
                                        expandedCourses.includes(courseIndex) && 'rotate-90'
                                    )}
                                />
                            </button>

                            {expandedCourses.includes(courseIndex) && (
                                <ul className="ml-3 mt-2 space-y-1 border-l-2 border-gradient-neural pl-3 animate-slide-down">
                                    {course.lessons.map((lesson) => {
                                        const isActive = isActiveLesson(course.slug, lesson.slug);
                                        return (
                                            <li key={lesson.slug}>
                                                <Link
                                                    to={`/docs/${course.slug}/${lesson.slug}`}
                                                    onClick={onClose}
                                                    className={clsx(
                                                        'flex items-center gap-3 px-4 py-2.5 text-sm rounded-2xl transition-fluid group',
                                                        isActive
                                                            ? 'neural-card text-primary-700 dark:text-primary-300 font-bold shadow-neural scale-105'
                                                            : 'text-gray-600 dark:text-gray-400 hover:glass dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200 hover:shadow-depth-sm'
                                                    )}
                                                >
                                                    <div className={clsx(
                                                        'w-7 h-7 rounded-xl flex items-center justify-center transition-all',
                                                        isActive
                                                            ? 'bg-gradient-neural shadow-glow'
                                                            : 'bg-transparent group-hover:bg-gradient-to-br group-hover:from-primary-500/20 group-hover:to-accent-500/20'
                                                    )}>
                                                        <FileText className={clsx(
                                                            'w-3.5 h-3.5',
                                                            isActive
                                                                ? 'text-white'
                                                                : 'text-gray-400 group-hover:text-primary-500'
                                                        )} />
                                                    </div>
                                                    <span className="truncate">{lesson.title}</span>
                                                    {isActive && (
                                                        <div className="ml-auto w-2 h-2 rounded-full bg-gradient-neural animate-pulse-glow" />
                                                    )}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    );
};
