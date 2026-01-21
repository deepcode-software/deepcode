import { useState } from 'react';
import { ChevronRight, FileText, Folder } from 'lucide-react';
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
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={clsx(
                    'fixed lg:sticky top-16 left-0 z-40 w-80 h-[calc(100vh-4rem)] glass border-r border-white/20 dark:border-white/10 overflow-y-auto transition-all lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-accent-500/5 pointer-events-none" />

                <nav className="relative p-6 space-y-3">
                    {structure.map((course, courseIndex) => (
                        <div key={course.slug} className="space-y-1">
                            <button
                                onClick={() => toggleCourse(courseIndex)}
                                className={clsx(
                                    'w-full flex items-center justify-between px-4 py-3 text-sm font-bold rounded-xl transition-all group',
                                    expandedCourses.includes(courseIndex)
                                        ? 'bg-gradient-to-r from-primary-500/10 to-transparent text-primary-700 dark:text-primary-300'
                                        : 'hover:bg-white/50 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300'
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={clsx(
                                        'w-8 h-8 rounded-lg flex items-center justify-center transition-all',
                                        expandedCourses.includes(courseIndex)
                                            ? 'bg-gradient-primary shadow-lg shadow-primary-500/30'
                                            : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-primary-500/20'
                                    )}>
                                        <Folder className={clsx(
                                            'w-4 h-4',
                                            expandedCourses.includes(courseIndex)
                                                ? 'text-white'
                                                : 'text-gray-600 dark:text-gray-400'
                                        )} />
                                    </div>
                                    <span>{course.name}</span>
                                </div>
                                <ChevronRight
                                    className={clsx(
                                        'w-4 h-4 transition-transform',
                                        expandedCourses.includes(courseIndex) && 'rotate-90'
                                    )}
                                />
                            </button>

                            {expandedCourses.includes(courseIndex) && (
                                <ul className="ml-3 mt-2 space-y-1 border-l-2 border-primary-200 dark:border-primary-800 pl-3">
                                    {course.lessons.map((lesson) => {
                                        const isActive = isActiveLesson(course.slug, lesson.slug);
                                        return (
                                            <li key={lesson.slug}>
                                                <Link
                                                    to={`/docs/${course.slug}/${lesson.slug}`}
                                                    onClick={onClose}
                                                    className={clsx(
                                                        'flex items-center gap-3 px-4 py-2.5 text-sm rounded-xl transition-all group',
                                                        isActive
                                                            ? 'bg-gradient-to-r from-primary-500/20 to-transparent text-primary-700 dark:text-primary-300 font-semibold shadow-sm'
                                                            : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-gray-200'
                                                    )}
                                                >
                                                    <div className={clsx(
                                                        'w-6 h-6 rounded-lg flex items-center justify-center transition-all',
                                                        isActive
                                                            ? 'bg-primary-500 shadow-sm'
                                                            : 'bg-transparent group-hover:bg-primary-500/10'
                                                    )}>
                                                        <FileText className={clsx(
                                                            'w-3.5 h-3.5',
                                                            isActive
                                                                ? 'text-white'
                                                                : 'text-gray-400 group-hover:text-primary-500'
                                                        )} />
                                                    </div>
                                                    <span className="truncate">{lesson.title}</span>
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
