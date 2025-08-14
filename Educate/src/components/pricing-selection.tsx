import { Check, Shield, RotateCcw, Headphones } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    description: "Perfect for beginners exploring tech",
    price: 99,
    period: "per course",
    features: [
      "Access to 1 course",
      "Basic video content", 
      "Community forum access",
      "Course completion certificate"
    ],
    buttonText: "Get Started",
    buttonStyle: "outline"
  },
  {
    name: "Professional", 
    description: "Complete learning experience",
    price: 299,
    period: "per course",
    features: [
      "All Starter features",
      "1-on-1 mentor sessions",
      "Live Q&A sessions", 
      "Project portfolio review",
      "Job placement assistance"
    ],
    buttonText: "Start Learning",
    buttonStyle: "primary",
    popular: true
  },
  {
    name: "Enterprise",
    description: "For teams and organizations", 
    price: 999,
    period: "per month",
    features: [
      "All Professional features",
      "Unlimited team members",
      "Custom curriculum",
      "Dedicated success manager",
      "Advanced analytics"
    ],
    buttonText: "Contact Sales",
    buttonStyle: "outline"
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-6">
            Choose Your Learning Path
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Flexible pricing options designed to fit your budget and learning goals.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`p-8 hover:shadow-xl transition-all duration-300 border border-slate-200 ${
                plan.popular 
                  ? "bg-gradient-to-br from-blue-600 to-violet-600 text-white transform scale-105 relative" 
                  : "bg-white"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-yellow-900 px-6 py-2 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              
              <CardContent className="p-0">
                <div className="text-center mb-8">
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-slate-800'}`}>
                    {plan.name}
                  </h3>
                  <p className={`mb-6 ${plan.popular ? 'text-blue-100' : 'text-slate-600'}`}>
                    {plan.description}
                  </p>
                  <div className={`text-4xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-slate-800'}`}>
                    ${plan.price}
                  </div>
                  <div className={plan.popular ? 'text-blue-200' : 'text-slate-500'}>
                    {plan.period}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check 
                        size={16} 
                        className={`mr-3 ${plan.popular ? 'text-emerald-300' : 'text-emerald-500'}`}
                      />
                      <span className={plan.popular ? 'text-white' : 'text-slate-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full py-3 font-semibold transition-colors duration-200 ${
                    plan.popular
                      ? "bg-white text-blue-600 hover:bg-blue-50"
                      : plan.buttonStyle === "outline" 
                        ? "bg-slate-200 text-slate-700 hover:bg-slate-300"
                        : "bg-slate-800 text-white hover:bg-slate-900"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-600 mb-4">All plans include a 30-day money-back guarantee</p>
          <div className="flex justify-center items-center space-x-8 text-slate-500">
            <div className="flex items-center">
              <Shield size={16} className="mr-2" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <RotateCcw size={16} className="mr-2" />
              <span>30-Day Refund</span>
            </div>
            <div className="flex items-center">
              <Headphones size={16} className="mr-2" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
