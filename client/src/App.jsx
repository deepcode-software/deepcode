import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { SearchModal } from './components/search/SearchModal';
import { Home } from './pages/Home';
import { DocumentationPage } from './pages/DocumentationPage';
import { useDocsStructure, useMarkdownContent } from './hooks/useGitHubContent';
import { useSearch } from './hooks/useSearch';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { structure } = useDocsStructure();
  const [contentMap, setContentMap] = useState({});

  // Build content map for search indexing
  useEffect(() => {
    const loadAllContent = async () => {
      const map = {};
      // For now, we'll load content on-demand rather than all at once
      // to avoid hitting GitHub API limits
      setContentMap(map);
    };

    if (structure.length > 0) {
      loadAllContent();
    }
  }, [structure]);

  const { query, results, search, clearSearch } = useSearch(structure, contentMap);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => {
    setIsSearchOpen(false);
    clearSearch();
  };

  return (
    <BrowserRouter>
      <Layout onSearchOpen={openSearch}>
        <Routes>
          <Route path="/" element={<Home onSearchOpen={openSearch} />} />
          <Route path="/docs/:course/:lesson" element={<DocumentationPage />} />
        </Routes>
      </Layout>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        results={results}
        onSearch={search}
        query={query}
      />
    </BrowserRouter>
  );
}

export default App;
