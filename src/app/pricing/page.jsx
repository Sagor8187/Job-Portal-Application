"use client"

import React, { useState } from 'react'

// Data Structures
const seekerPlans = [
  {
    id: "seeker_free",
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Perfect for getting started and exploring opportunities.",
    features: ["Browse & save up to 10 jobs", "Apply to up to 3 jobs per month", "Basic profile creation", "Email job alerts"],
    buttonText: "Get Started",
    popular: false,
  },
  {
    id: "seeker_pro",
    name: "Pro",
    price: "$19",
    period: "/month",
    description: "Accelerate your job search with advanced insights.",
    features: ["Apply to up to 30 jobs per month", "Unlimited saved jobs", "Application status tracking", "Salary insights"],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
  {
    id: "seeker_premium",
    name: "Premium",
    price: "$39",
    period: "/month",
    description: "Maximum visibility and direct edge over other applicants.",
    features: ["Everything in Pro", "Unlimited job applications", "Profile boost to recruiters", "Early access to new jobs", "Priority support"],
    buttonText: "Go Premium",
    popular: false,
  }
]

const recruiterPlans = [
  {
    id: "recruiter_free",
    name: "Free",
    price: "$0",
    period: "/forever",
    description: "Great for a company's first year of hiring.",
    features: ["Up to 3 active job posts", "Basic applicant management", "Standard listing visibility"],
    buttonText: "Post a Job Free",
    popular: false,
  },
  {
    id: "recruiter_growth",
    name: "Growth",
    price: "$49",
    period: "/month",
    description: "Scale your team with better tracking tools.",
    features: ["Up to 10 active job posts", "Applicant tracking system (ATS)", "Basic analytics", "Email support"],
    buttonText: "Choose Growth",
    popular: true,
  },
  {
    id: "recruiter_enterprise",
    name: "Enterprise",
    price: "$149",
    period: "/month",
    description: "Built for teams requiring advanced talent acquisition pipelines.",
    features: ["Up to 50 active job posts", "Advanced analytics dashboard", "Featured job listings", "Team collaboration tools", "Custom branding", "Priority support"],
    buttonText: "Contact Sales",
    popular: false,
  }
]

const faqs = [
  { question: "Can I cancel my subscription anytime?", answer: "Yes, you can cancel your plan at any moment from your account settings. You will retain access to your premium features until the end of your billing cycle." },
  { question: "How do refunds work?", answer: "We offer a 14-day money-back guarantee if you are unsatisfied with our service. Please reach out to our support team to initiate a refund request." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, including Visa, Mastercard, American Express, as well as digital wallets like PayPal and Apple Pay." },
  { question: "Can I switch between Seeker and Recruiter accounts?", answer: "Subscriptions are locked to specific account roles. If you need both, you can create separate account profiles using different email addresses, or contact support for a tailored enterprise package." }
]

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('seeker')
  const [openFaq, setOpenFaq] = useState(null)
  
  // Tracks the currently selected plan ID (defaults to the popular tiers)
  const [selectedPlan, setSelectedPlan] = useState('seeker-pro')

  const activePlans = activeTab === 'seeker' ? seekerPlans : recruiterPlans

  // Automatically switches default selection when swapping between Seeker and Recruiter tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSelectedPlan(tab === 'seeker' ? 'seeker-pro' : 'recruiter-growth')
  }

  return (
    <div className="min-h-screen bg-black text-white py-16 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="mt-4 text-lg text-gray-400">
          Choose the plan that fits your goals. Whether you are looking for your next career move or looking to hire top tier talent.
        </p>

        {/* Tab Toggle Control */}
        <div className="mt-10 inline-flex items-center p-1 bg-gray-900 border border-gray-800 rounded-xl">
          <button
            onClick={() => handleTabChange('seeker')}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'seeker'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            For Job Seekers
          </button>
          <button
            onClick={() => handleTabChange('recruiter')}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
              activeTab === 'recruiter'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            For Recruiters
          </button>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-3 items-stretch mb-24">
        {activePlans.map((plan) => {
          const isSelected = selectedPlan === plan.id

          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex flex-col justify-between rounded-2xl p-8 bg-gray-900 border transition-all duration-300 cursor-pointer ${
                isSelected 
                  ? 'border-blue-500 shadow-xl shadow-blue-500/20 scale-105 z-10' 
                  : 'border-gray-800 hover:border-gray-700 hover:scale-[1.01]'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-6 -translate-y-1/2 bg-blue-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full">
                  Most Popular
                </span>
              )}

              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  {/* Small selection radio indicator */}
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-600'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
                
                <p className="mt-2 text-sm text-gray-400 h-10">{plan.description}</p>
                
                <div className="mt-6 flex items-baseline">
                  <span className="text-4xl font-extrabold tracking-tight">{plan.price}</span>
                  <span className="ml-1 text-xl font-semibold text-gray-400">{plan.period}</span>
                </div>

                {/* Feature List */}
                <ul className="mt-8 space-y-4 border-t border-gray-800 pt-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-300">
                      <svg className="flex-shrink-0 h-5 w-5 text-blue-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name='plan_id' value={plan.id}/>
                  <section>
                    <button type="submit" role="link"  className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white'
                  }`}>
                      Checkout
                    </button>
                  </section>
                </form>
                
              </div>
            </div>
          )
        })}
      </div>

      <hr className="max-w-4xl mx-auto border-gray-800 my-16" />

      {/* FAQ Accordion Section */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8 sm:text-3xl">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx
            return (
              <div key={idx} className="border border-gray-800 bg-gray-900/50 rounded-xl overflow-hidden transition-all">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-medium text-gray-200 hover:text-white transition-colors"
                >
                  <span>{faq.question}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-gray-800/60' : 'max-h-0'
                  }`}
                >
                  <p className="p-5 text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}