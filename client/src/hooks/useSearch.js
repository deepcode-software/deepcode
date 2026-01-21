import { useState, useEffect, useCallback } from 'react';
import { createSearchIndex, searchDocs } from '../services/searchService';

/**
 * Hook for search functionality
 */
export const useSearch = (docsStructure, contentMap) => {
    const [searchIndex, setSearchIndex] = useState(null);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // Create/update search index when structure or content changes
    useEffect(() => {
        if (docsStructure.length > 0 && Object.keys(contentMap).length > 0) {
            const index = createSearchIndex(docsStructure, contentMap);
            setSearchIndex(index);
        }
    }, [docsStructure, contentMap]);

    // Perform search when query changes
    useEffect(() => {
        if (!searchIndex) {
            setResults([]);
            return;
        }

        const searchResults = searchDocs(searchIndex, query);
        setResults(searchResults);
    }, [query, searchIndex]);

    const search = useCallback((newQuery) => {
        setQuery(newQuery);
    }, []);

    const clearSearch = useCallback(() => {
        setQuery('');
        setResults([]);
    }, []);

    return {
        query,
        results,
        search,
        clearSearch,
    };
};
