/**
 * Extract headings from markdown content for table of contents
 */
export const extractHeadings = (markdown) => {
    if (!markdown) return [];

    const headingRegex = /^(#{2,3})\s+(.+)$/gm;
    const headings = [];
    let match;

    while ((match = headingRegex.exec(markdown)) !== null) {
        const level = match[1].length; // Number of # characters
        const text = match[2].trim();
        const id = generateId(text);

        headings.push({
            level,
            text,
            id,
        });
    }

    return headings;
};

/**
 * Generate anchor ID from heading text
 */
export const generateId = (text) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single
        .trim();
};

/**
 * Strip markdown formatting for search indexing
 */
export const stripMarkdown = (markdown) => {
    if (!markdown) return '';

    return markdown
        // Remove code blocks
        .replace(/```[\s\S]*?```/g, '')
        // Remove inline code
        .replace(/`[^`]+`/g, '')
        // Remove images
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
        // Remove links but keep text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // Remove headers
        .replace(/^#{1,6}\s+/gm, '')
        // Remove bold/italic
        .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, '$1')
        // Remove blockquotes
        .replace(/^>\s+/gm, '')
        // Remove list markers
        .replace(/^[-*+]\s+/gm, '')
        .replace(/^\d+\.\s+/gm, '')
        // Normalize whitespace
        .replace(/\s+/g, ' ')
        .trim();
};

/**
 * Get reading time estimate
 */
export const calculateReadingTime = (markdown) => {
    const wordsPerMinute = 200;
    const text = stripMarkdown(markdown);
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
};
