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
                            <h1 id={id} className="scroll-mt-20 group relative">
                                <a href={`#${id}`} className="no-underline hover:underline gradient-text font-black relative inline-block">
                                    {children}
                                    <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-neural opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                </a>
                            </h1>
                        );
                    },
                    h2: ({ children }) => {
                        const id = generateId(children.toString());
                        return (
                            <h2 id={id} className="scroll-mt-20 group relative">
                                <a href={`#${id}`} className="no-underline hover:underline font-black relative inline-block hover:gradient-text transition-all">
                                    {children}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-neural opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
                                </a>
                            </h2>
                        );
                    },
                    h3: ({ children }) => {
                        const id = generateId(children.toString());
                        return (
                            <h3 id={id} className="scroll-mt-20 group relative">
                                <a href={`#${id}`} className="no-underline hover:underline font-bold hover:gradient-text transition-all">
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
                                <code className="px-2 py-1 rounded-xl glass-3 text-primary-600 dark:text-primary-400 font-mono text-sm font-semibold border border-white/30 dark:border-white/20" {...props}>
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
                                className="text-primary-600 dark:text-primary-400 hover:gradient-text font-semibold transition-all relative inline-block group"
                            >
                                {children}
                                <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-neural transition-all duration-300 rounded-full" />
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
                                className="rounded-3xl max-w-full h-auto shadow-depth-lg border border-white/30 dark:border-white/20"
                            />
                        );
                    },
                    // Tables
                    table: ({ children }) => {
                        return (
                            <div className="overflow-x-auto my-6">
                                <table className="min-w-full glass-3 rounded-2xl overflow-hidden shadow-depth border border-white/30 dark:border-white/20">
                                    {children}
                                </table>
                            </div>
                        );
                    },
                    // Blockquotes
                    blockquote: ({ children }) => {
                        return (
                            <blockquote className="relative pl-6 pr-4 py-4 my-6 neural-card rounded-2xl border-l-4 border-gradient-neural shadow-neural">
                                <div className="absolute left-4 top-4 w-2 h-2 rounded-full bg-gradient-neural animate-pulse-glow" />
                                <div className="text-gray-700 dark:text-gray-300 italic font-medium">
                                    {children}
                                </div>
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
