import { useState, useEffect } from 'react';
import { fetchRepoStructure, fetchMarkdownFile, parseDocsStructure } from '../services/githubAPI';

/**
 * Hook for fetching documentation structure from GitHub
 */
export const useDocsStructure = () => {
    const [structure, setStructure] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStructure = async () => {
            try {
                setLoading(true);
                const tree = await fetchRepoStructure();
                const parsed = parseDocsStructure(tree);
                setStructure(parsed);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Failed to load docs structure:', err);
            } finally {
                setLoading(false);
            }
        };

        loadStructure();
    }, []);

    return { structure, loading, error };
};

/**
 * Hook for fetching individual markdown file content
 */
export const useMarkdownContent = (filePath) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!filePath) {
            setContent('');
            setLoading(false);
            return;
        }

        const loadContent = async () => {
            try {
                setLoading(true);
                const markdown = await fetchMarkdownFile(filePath);
                setContent(markdown);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Failed to load markdown content:', err);
            } finally {
                setLoading(false);
            }
        };

        loadContent();
    }, [filePath]);

    return { content, loading, error };
};
