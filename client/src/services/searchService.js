import Fuse from 'fuse.js';
import { stripMarkdown, extractHeadings } from '../utils/markdownUtils';

/**
 * Create search index from documentation structure and content
 */
export const createSearchIndex = (docsStructure, contentMap) => {
    const searchData = [];

    docsStructure.forEach(course => {
        course.lessons.forEach(lesson => {
            const content = contentMap[lesson.path] || '';
            const headings = extractHeadings(content);
            const stripped = stripMarkdown(content);

            searchData.push({
                title: lesson.title,
                course: course.name,
                path: lesson.path,
                slug: lesson.slug,
                courseSlug: course.slug,
                content: stripped,
                headings: headings.map(h => h.text).join(' '),
            });
        });
    });

    const fuse = new Fuse(searchData, {
        keys: [
            { name: 'title', weight: 3 },
            { name: 'headings', weight: 2 },
            { name: 'content', weight: 1 },
            { name: 'course', weight: 1.5 },
        ],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2,
    });

    return fuse;
};

/**
 * Search the documentation
 */
export const searchDocs = (fuse, query) => {
    if (!query || query.trim().length < 2) {
        return [];
    }

    const results = fuse.search(query);
    return results.map(result => ({
        ...result.item,
        score: result.score,
        matches: result.matches,
    }));
};
