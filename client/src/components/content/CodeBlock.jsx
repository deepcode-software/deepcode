import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const CodeBlock = ({ language, children }) => {
    const [copied, setCopied] = useState(false);
    const { theme } = useTheme();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 rounded-md bg-gray-800 dark:bg-gray-700 text-gray-300 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                aria-label="Copy code"
            >
                {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>
            <SyntaxHighlighter
                language={language || 'text'}
                style={theme === 'dark' ? vscDarkPlus : vs}
                customStyle={{
                    margin: 0,
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    fontFamily: 'JetBrains Mono, Consolas, monospace',
                }}
                showLineNumbers={false}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};
