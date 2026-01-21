// GitHub API service for fetching documentation content
const GITHUB_API_BASE = 'https://api.github.com';

// Configuration - update these with your repo details
const config = {
    owner: import.meta.env.VITE_GITHUB_REPO_OWNER || 'your-username',
    repo: import.meta.env.VITE_GITHUB_REPO_NAME || 'your-repo',
    branch: import.meta.env.VITE_GITHUB_BRANCH || 'main',
    docsPath: import.meta.env.VITE_GITHUB_DOCS_PATH || 'docs',
    token: import.meta.env.VITE_GITHUB_TOKEN || null,
};

// Helper to get headers with optional authentication
const getHeaders = () => {
    const headers = {
        'Accept': 'application/vnd.github.v3+json',
    };
    if (config.token) {
        headers['Authorization'] = `token ${config.token}`;
    }
    return headers;
};

// Cache utilities
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

const getCachedData = (key) => {
    try {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const { data, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp > CACHE_EXPIRY) {
            localStorage.removeItem(key);
            return null;
        }
        return data;
    } catch {
        return null;
    }
};

const setCachedData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify({
            data,
            timestamp: Date.now(),
        }));
    } catch (e) {
        console.warn('Failed to cache data:', e);
    }
};

/**
 * Fetch repository tree structure
 */
export const fetchRepoStructure = async () => {
    const cacheKey = `github_tree_${config.owner}_${config.repo}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/git/trees/${config.branch}?recursive=1`;

    try {
        const response = await fetch(url, { headers: getHeaders() });

        if (!response.ok) {
            throw new Error(`Failed to fetch repository structure: ${response.statusText}`);
        }

        const data = await response.json();
        setCachedData(cacheKey, data);
        return data;
    } catch (error) {
        console.error('Error fetching repo structure:', error);
        throw error;
    }
};

/**
 * Fetch markdown file content
 */
export const fetchMarkdownFile = async (path) => {
    const cacheKey = `github_file_${path}`;
    const cached = getCachedData(cacheKey);
    if (cached) return cached;

    const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

    try {
        const response = await fetch(url, { headers: getHeaders() });

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const data = await response.json();

        // Decode base64 content
        const content = atob(data.content);
        setCachedData(cacheKey, content);
        return content;
    } catch (error) {
        console.error('Error fetching markdown file:', error);
        throw error;
    }
};

/**
 * Parse docs structure from GitHub tree
 */
export const parseDocsStructure = (tree) => {
    if (!tree || !tree.tree) return [];

    // Filter for markdown files in docs directory
    const docsFiles = tree.tree.filter(item =>
        item.path.startsWith(config.docsPath) &&
        item.path.endsWith('.md') &&
        item.type === 'blob'
    );

    // Group by course/section
    const courses = new Map();

    docsFiles.forEach(file => {
        const pathParts = file.path.split('/');
        // Remove 'docs' prefix and filename
        const [, courseName, ...rest] = pathParts;

        if (!courseName) return;

        if (!courses.has(courseName)) {
            courses.set(courseName, {
                name: formatName(courseName),
                slug: courseName,
                lessons: [],
            });
        }

        const course = courses.get(courseName);
        const fileName = rest[rest.length - 1];

        course.lessons.push({
            title: formatName(fileName.replace('.md', '')),
            slug: fileName.replace('.md', ''),
            path: file.path,
        });
    });

    // Convert to array and sort
    const result = Array.from(courses.values());

    result.forEach(course => {
        course.lessons.sort((a, b) => a.title.localeCompare(b.title));
    });

    return result.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Format name from slug (kebab-case to Title Case)
 */
const formatName = (slug) => {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Check GitHub API rate limit
 */
export const checkRateLimit = async () => {
    try {
        const response = await fetch(`${GITHUB_API_BASE}/rate_limit`, {
            headers: getHeaders(),
        });
        const data = await response.json();
        return data.rate;
    } catch (error) {
        console.error('Error checking rate limit:', error);
        return null;
    }
};

export default {
    fetchRepoStructure,
    fetchMarkdownFile,
    parseDocsStructure,
    checkRateLimit,
    config,
};
