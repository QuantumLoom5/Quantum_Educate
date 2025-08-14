import { Video, Users, Clock, Award } from "lucide-react";

export default function UniversityHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 dark:text-white leading-tight mb-6">
              Advanced{" "}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                Computer Science
              </span>{" "}
              for University Students
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
              Master advanced algorithms, machine learning, and cybersecurity through 
              live online classes. Perfect for Computer Science and IT majors looking 
              to excel academically and prepare for top-tier careers.
            </p>
            
            {/* Course Features */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 mb-8 border border-blue-100 dark:border-slate-700 shadow-lg">
              <div className="flex items-center mb-4">
                <Video className="text-blue-600 mr-3" size={24} />
                <h3 className="font-bold text-slate-800 dark:text-white">Live University-Level Classes</h3>
              </div>
              <ul className="text-slate-600 dark:text-slate-300 space-y-2">
                <li>• Advanced data structures and algorithmic thinking</li>
                <li>• Industry-standard development practices</li>
                <li>• Career preparation and interview coaching</li>
                <li>• Small cohorts of 8-12 university students</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                View Advanced Courses
              </button>
              <button 
                onClick={() => document.getElementById('enrollment')?.scrollIntoView({ behavior: 'smooth' })}
                className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                Enroll Now
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Users className="text-blue-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">800+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">University Students</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Clock className="text-violet-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">16-20</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Week Programs</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Award className="text-cyan-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">95%</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Job Placement</div>
              </div>
              <div className="text-center p-4 bg-white dark:bg-slate-800 rounded-lg shadow">
                <Video className="text-emerald-600 mx-auto mb-2" size={24} />
                <div className="text-2xl font-bold text-slate-800 dark:text-white">Live</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Zoom Classes</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 rounded-3xl opacity-20 blur-3xl animate-float"></div>
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600"
              alt="University students in advanced computer science online class"
              className="relative rounded-3xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}