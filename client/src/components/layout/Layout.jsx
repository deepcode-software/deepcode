import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { useDocsStructure } from '../../hooks/useGitHubContent';

export const Layout = ({ children, onSearchOpen }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { structure, loading, error } = useDocsStructure();

    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <Header onSearchOpen={onSearchOpen} onMenuToggle={toggleSidebar} />

            <div className="flex">
                {!loading && !error && (
                    <Sidebar
                        structure={structure}
                        isOpen={isSidebarOpen}
                        onClose={closeSidebar}
                    />
                )}

                <main className="flex-1 min-w-0">
                    {children}
                </main>
            </div>
        </div>
    );
};
