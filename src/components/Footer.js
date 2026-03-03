import { FileText, Twitter, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-primary p-2 rounded-lg">
                                <FileText className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Score<span className="text-primary">Resume</span>
                            </span>
                        </div>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Empowering job seekers with AI-driven insights to navigate the modern hiring landscape with confidence.
                        </p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Product</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">AI Scorer</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Keyword Finder</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">ATS Checker</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Premium Templates</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-bold mb-6">Join Our Newsletter</h4>
                        <p className="text-slate-400 mb-6 italic">Get the latest career tips delivered to your inbox.</p>
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="w-full bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:border-primary transition-colors"
                            />
                            <button className="absolute right-2 top-2 bg-primary p-1.5 rounded-lg hover:bg-primary-dark transition-colors">
                                <Mail className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
                    <p>© {currentYear} ScoreResume AI. All rights reserved.</p>
                    <div className="flex items-center gap-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
