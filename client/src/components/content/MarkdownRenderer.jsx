import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import { generateId } from '../../utils/markdownUtils';

export const MarkdownRenderer = ({ content }) => {
    return (
        <div className="prose dark:prose-dark max-w-none">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // Headings with anchor links
                    h1: ({ children }) => {
                        const id = generateId(children.toString());
                        return (
                            <h1 id={id} className="scroll-mt-20">
                                <a href={`#${id}`} className="no-underline hover:underline">
                                    {children}
                                </a>
                            </h1>
                        );
                    },
                    h2: ({ children }) => {
                        const id = generateId(children.toString());
                        return (
                            <h2 id={id} className="scroll-mt-20">
                                <a href={`#${id}`} className="no-underline hover:underline">
                                    {children}
                                </a>
                            </h2>
                        );
                    },
                    h3: ({ children }) => {
                        const id = generateId(children.toString());
                        return (
                            <h3 id={id} className="scroll-mt-20">
                                <a href={`#${id}`} className="no-underline hover:underline">
                                    {children}
                                </a>
                            </h3>
                        );
                    },
                    // Code blocks
                    code: ({ node, inline, className, children, ...props }) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : '';

                        if (inline) {
                            return (
                                <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-mono text-sm" {...props}>
                                    {children}
                                </code>
                            );
                        }

                        return (
                            <CodeBlock language={language}>
                                {String(children).replace(/\n$/, '')}
                            </CodeBlock>
                        );
                    },
                    // Links
                    a: ({ href, children }) => {
                        const isExternal = href?.startsWith('http');
                        return (
                            <a
                                href={href}
                                target={isExternal ? '_blank' : undefined}
                                rel={isExternal ? 'noopener noreferrer' : undefined}
                                className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                                {children}
                            </a>
                        );
                    },
                    // Images
                    img: ({ src, alt }) => {
                        return (
                            <img
                                src={src}
                                alt={alt}
                                loading="lazy"
                                className="rounded-lg max-w-full h-auto"
                            />
                        );
                    },
                    // Tables
                    table: ({ children }) => {
                        return (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    // Blockquotes
                    blockquote: ({ children }) => {
                        return (
                            <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-700 dark:text-gray-300">
                                {children}
                            </blockquote>
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
