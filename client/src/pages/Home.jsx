import { BookOpen, Search, Zap, Code, Rocket, Award, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDocsStructure } from '../hooks/useGitHubContent';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const Home = ({ onSearchOpen }) => {
    const { structure, loading } = useDocsStructure();

    return (
        <div className="min-h-[calc(100vh-4rem)] relative overflow-hidden">
            {/* Fluid gradient mesh background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                {/* Animated mesh gradient overlay */}
                <div className="absolute inset-0 bg-gradient-mesh opacity-40 dark:opacity-30" />

                {/* Floating gradient orbs */}
                <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-primary-400/30 to-neural-purple/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float" />
                <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-accent-400/30 to-neural-cyan/20 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl float-soft" style={{ animationDelay: '2s' }} />
                <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-neural-pink/20 to-secondary-400/30 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl animate-float" style={{ animationDelay: '4s' }} />
            </div>

            <div className="relative flex flex-col items-center justify-center px-4 py-16 sm:py-24">
                <div className="max-w-5xl mx-auto text-center space-y-12">
                    {/* Hero Section */}
                    <div className="space-y-6 animate-fade-in">
                        <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-neural rounded-4xl shadow-neural mb-8 relative group hover:scale-110 transition-fluid overflow-hidden">
                            <BookOpen className="w-14 h-14 text-white relative z-10 group-hover:rotate-12 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 rounded-4xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute -inset-2 bg-gradient-neural rounded-4xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity animate-pulse-glow" />
                            <Sparkles className="absolute top-2 right-2 w-6 h-6 text-white/60 animate-pulse-glow" />
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight">
                            <span className="gradient-text">Deepcode Academy</span>
                        </h1>

                        <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed">
                            Zamonaviy dasturchilar uchun zamonaviy hujjatlar.<br />
                            <span className="gradient-text font-bold">O'rganing, yarating va o'sing</span> bizning keng qamrovli qo'llanmalarimiz bilan.
                        </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={onSearchOpen}
                            className="group relative px-8 py-4 neural-card rounded-3xl shadow-neural hover:shadow-glow-xl transition-fluid hover:scale-105 btn-magnetic overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-neural opacity-0 group-hover:opacity-20 transition-opacity" />
                            <div className="relative z-10 flex items-center gap-3 text-gray-900 dark:text-white font-bold text-lg">
                                <Search className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                <span>Hujjatlarni Qidirish</span>
                                <kbd className="px-3 py-1.5 bg-gradient-to-br from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-xl text-sm font-mono border border-gray-300/50 dark:border-gray-700/50 shadow-sm backdrop-blur-sm">⌘K</kbd>
                            </div>
                        </button>

                        {!loading && structure.length > 0 && (
                            <Link
                                to={`/docs/${structure[0].slug}/${structure[0].lessons[0].slug}`}
                                className="group relative px-8 py-4 glass-3 rounded-3xl hover:shadow-depth-lg transition-fluid hover:scale-105 border border-white/30 dark:border-white/20"
                            >
                                <div className="flex items-center gap-3 text-gray-900 dark:text-white font-bold text-lg">
                                    <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:animate-pulse-glow" />
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
                                gradient: "from-primary-500 via-neural-purple to-primary-600",
                            },
                            {
                                icon: Rocket,
                                title: "Kuchli Qidiruv",
                                description: "Aqlli qidiruv yordamida kerakli ma'lumotni bir zumda toping",
                                gradient: "from-accent-500 via-neural-cyan to-accent-600",
                            },
                            {
                                icon: Award,
                                title: "Tez va Zamonaviy",
                                description: "Chaqmoq tezlikda ishlaydigan, toza va zamonaviy interfeys",
                                gradient: "from-neural-pink via-secondary-500 to-neural-magenta",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className="group relative p-8 glass-3 rounded-3xl hover:shadow-depth-lg transition-fluid fluid-hover border border-white/30 dark:border-white/20 depth-layer"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Gradient glow on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity pointer-events-none`} />

                                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-neural group-hover:scale-110 group-hover:rotate-6 transition-fluid`}>
                                    <feature.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 group-hover:gradient-text transition-all">
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
                            <h2 className="text-3xl sm:text-4xl font-black text-center mb-10">
                                <span className="gradient-text">Mavjud Kurslar</span>
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {structure.map((course, index) => (
                                    <Link
                                        key={course.slug}
                                        to={`/docs/${course.slug}/${course.lessons[0].slug}`}
                                        className="group relative p-6 neural-card rounded-3xl hover:shadow-neural border border-white/30 dark:border-white/20 transition-fluid fluid-hover depth-layer overflow-hidden"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        {/* Animated gradient background */}
                                        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-neural opacity-20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700`} />

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-12 h-12 bg-gradient-neural rounded-2xl flex items-center justify-center shadow-neural group-hover:scale-110 group-hover:rotate-6 transition-fluid">
                                                    <BookOpen className="w-6 h-6 text-white" />
                                                </div>
                                                <h3 className="font-black text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                    {course.name}
                                                </h3>
                                            </div>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 font-medium">
                                                <span className="w-2 h-2 bg-gradient-neural rounded-full animate-pulse-glow" />
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
