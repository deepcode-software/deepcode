import { BookOpen, Search, Zap, Code, Rocket, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocsStructure } from '../hooks/useGitHubContent';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Home = ({ onSearchOpen }) => {
    const { structure, loading } = useDocsStructure();

    return (
        <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-300 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" />
                <div className="absolute top-0 -right-4 w-72 h-72 bg-accent-300 dark:bg-accent-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary-300 dark:bg-secondary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-30 animate-float" style={{ animationDelay: '4s' }} />
            </div>

            <div className="relative flex flex-col items-center justify-center px-4 py-16 sm:py-24">
                <div className="max-w-5xl mx-auto text-center space-y-12">
                    {/* Hero Section */}
                    <div className="space-y-6 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-primary rounded-3xl shadow-2xl shadow-primary-500/40 mb-8 relative group hover:scale-110 transition-transform">
                            <BookOpen className="w-12 h-12 text-white relative z-10" />
                            <div className="absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -inset-1 bg-gradient-primary rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black">
                            <span className="gradient-text">Deepcode Academy</span>
                        </h1>

                        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                            Zamonaviy dasturchilar uchun zamonaviy hujjatlar.<br />
                            <span className="text-primary-600 dark:text-primary-400">O'rganing, yarating va o'sing</span> bizning keng qamrovli qo'llanmalarimiz bilan.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onSearchOpen}
                            className="group relative px-8 py-4 bg-gradient-primary rounded-2xl shadow-2xl shadow-primary-500/50 hover:shadow-glow-lg transition-all hover:scale-105 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10 flex items-center gap-3 text-white font-semibold text-lg">
                                <Search className="w-5 h-5" />
                                <span>Hujjatlarni Qidirish</span>
                                <kbd className="px-2 py-1 bg-white/20 rounded text-sm">⌘K</kbd>
                            </div>
                        </button>

                        {!loading && structure.length > 0 && (
                            <Link
                                to={`/docs/${structure[0].slug}/${structure[0].lessons[0].slug}`}
                                className="group relative px-8 py-4 glass rounded-2xl hover:bg-white dark:hover:bg-white/10 transition-all hover:scale-105 border border-gray-200/50 dark:border-white/10"
                            >
                                <div className="flex items-center gap-3 text-gray-900 dark:text-white font-semibold text-lg">
                                    <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    <span>Tezkor Boshlash</span>
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-6 mt-20">
                        {[
                            {
                                icon: Code,
                                title: "Keng Qamrovli Qo'llanmalar",
                                description: "Barcha darajadagi dasturchilar uchun qadam-baqadam darsliklar va hujjatlar",
                                gradient: "from-primary-500 to-primary-600",
                            },
                            {
                                icon: Rocket,
                                title: "Kuchli Qidiruv",
                                description: "Aqlli qidiruv yordamida kerakli ma'lumotni bir zumda toping",
                                gradient: "from-accent-500 to-accent-600",
                            },
                            {
                                icon: Award,
                                title: "Tez va Zamonaviy",
                                description: "Chaqmoq tezlikda ishlaydigan, toza va zamonaviy interfeys",
                                gradient: "from-secondary-500 to-secondary-600",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-8 glass rounded-3xl hover:bg-white dark:hover:bg-white/10 transition-all card-hover border border-gray-200/50 dark:border-white/10"
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Courses Preview */}
                    {loading ? (
                        <div className="mt-20">
                            <LoadingSpinner size="lg" />
                        </div>
                    ) : structure.length > 0 && (
                        <div className="mt-24 text-left">
                            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
                                <span className="gradient-text">Mavjud Kurslar</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {structure.map((course, index) => (
                                    <Link
                                        key={course.slug}
                                        to={`/docs/${course.slug}/${course.lessons[0].slug}`}
                                        className="group relative p-6 glass rounded-2xl hover:bg-white dark:hover:bg-white/10 border border-gray-200/50 dark:border-white/10 transition-all card-hover overflow-hidden"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-500/20 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform`} />

                                        <div className="relative">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
                                                    <BookOpen className="w-5 h-5 text-white" />
                                                </div>
                                                <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:gradient-text transition-all">
                                                    {course.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                                <span className="w-2 h-2 bg-primary-500 rounded-full" />
                                                {course.lessons.length} ta dars
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
