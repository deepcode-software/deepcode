import { useParams } from 'react-router-dom';
import { useMarkdownContent, useDocsStructure } from '../hooks/useGitHubContent';
import { MarkdownRenderer } from '../components/content/MarkdownRenderer';
import { TableOfContents } from '../components/content/TableOfContents';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { AlertCircle, Clock } from 'lucide-react';
import { calculateReadingTime } from '../utils/markdownUtils';

export const DocumentationPage = () => {
    const { course, lesson } = useParams();
    const { structure } = useDocsStructure();

    // Find the lesson path from structure
    const lessonData = structure
        .find(c => c.slug === course)
        ?.lessons.find(l => l.slug === lesson);

    const { content, loading, error } = useMarkdownContent(lessonData?.path);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <LoadingSpinner size="lg" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                    <div>
                        <h3 className="font-semibold text-red-900 dark:text-red-100">
                            Failed to load content
                        </h3>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!lessonData || !content) {
        return (
            <div className="max-w-4xl mx-auto px-4 py-16">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Lesson not found
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        The requested lesson could not be found.
                    </p>
                </div>
            </div>
        );
    }

    const readingTime = calculateReadingTime(content);

    return (
        <div className="flex max-w-screen-2xl mx-auto">
            {/* Main Content */}
            <article className="flex-1 min-w-0 px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <a href="/" className="hover:text-primary-600 dark:hover:text-primary-400">
                            Home
                        </a>
                        <span>/</span>
                        <span className="capitalize">{course}</span>
                        <span>/</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                            {lessonData.title}
                        </span>
                    </div>
                </div>

                {/* Title & Meta */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {lessonData.title}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{readingTime} min read</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="max-w-3xl">
                    <MarkdownRenderer content={content} />
                </div>
            </article>

            {/* Table of Contents */}
            <div className="hidden xl:block w-64 px-4 py-8">
                <TableOfContents content={content} />
            </div>
        </div>
    );
};
