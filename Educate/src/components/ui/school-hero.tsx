import { Video, Users, Clock, Star } from "lucide-react";

export default function SchoolHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Fun{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Tech Learning
              </span>{" "}
              for School Students
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Discover the exciting world of programming and technology through 
              interactive online classes. Perfect for high school students ready 
              to explore coding, web design, and digital creativity.
            </p>
            
            {/* Course Features */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 border border-emerald-100 dark:border-slate-700 shadow-lg">
              <div className="flex items-center mb-4">
                <Video className="text-emerald-600 mr-3" size={24} />
                <h3 className="font-bold text-slate-800 dark:text-white">Teen-Friendly Online Classes</h3>
              </div>
              <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Visual programming with Scratch and Python</li>
                <li>• Creative web design and interactive projects</li>
                <li>• Digital safety and responsible computing</li>
                <li>• Small groups of 6-10 school students</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Explore Fun Courses
              </button>
              <button 
                onClick={() => document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-emerald-600 text-emerald-600 dark:text-emerald-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-emerald-600 hover:text-white transition-all duration-300"
              >
                Join a Class
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Users className="text-emerald-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">1,200+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">School Students</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Clock className="text-cyan-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">6-10</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Week Programs</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Star className="text-blue-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">4.8</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Student Rating</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Video className="text-purple-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">Live</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Interactive Fun</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-3xl opacity-20 blur-3xl animate-float"></div>
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="School students having fun learning programming online"
              className="relative rounded-3xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}