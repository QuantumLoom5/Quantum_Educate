import { Play, Video } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Master{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                IT & Computer Science
              </span>{" "}
              with Live Online Classes
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Join interactive Zoom classes designed for University and School students. 
              Learn from industry experts and build real-world skills through hands-on projects 
              and live coding sessions.
            </p>
            
            {/* Online Learning Highlight */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 border border-blue-100 dark:border-slate-700 shadow-lg">
              <div className="flex items-center mb-4">
                <Video className="text-blue-600 mr-3" size={24} />
                <h3 className="font-bold text-slate-800 dark:text-white">Live Interactive Classes</h3>
              </div>
              <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Real-time Zoom sessions with expert instructors</li>
                <li>• Interactive coding exercises and Q&A</li>
                <li>• Small class sizes for personalized attention</li>
                <li>• Flexible scheduling for students</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('level-selection')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Choose Your Level
              </button>
              <button className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold text-lg hover:border-blue-600 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 flex items-center justify-center">
                <Play size={20} className="mr-2" />
                Watch Demo
              </button>
            </div>
            
            <div className="flex items-center space-x-8 mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">2,500+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-violet-600">100+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Live Classes Monthly</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">98%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Satisfaction Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 rounded-3xl opacity-20 blur-3xl animate-float"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="Students in online Zoom class learning programming"
              className="relative rounded-3xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
