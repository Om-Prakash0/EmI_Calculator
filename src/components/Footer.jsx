/**
 * Footer – credits + "Built for Digital Heroes" CTA
 */
import React from 'react'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-100 dark:border-slate-800 py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-5 text-center">

        {/* CTA Button */}
        <a
          href="https://digitalheroesco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold font-display
                     bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600
                     text-white shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.97]
                     focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          Built for Digital Heroes
        </a>

        {/* Author info */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4 text-sm text-slate-500 dark:text-slate-400">
          <span className="font-semibold text-slate-700 dark:text-slate-300 font-display">
            Om Prakash Yadav
          </span>
          <span className="hidden sm:block text-slate-300 dark:text-slate-700">·</span>
          <a
            href="mailto:YOUR_EMAIL_HERE"
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            YOUR_EMAIL_HERE
          </a>
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} EMI Calculator. Results are indicative — consult your lender for exact figures.
        </p>
      </div>
    </footer>
  )
}
