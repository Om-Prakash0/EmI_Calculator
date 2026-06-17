/**
 * ResultCard – single metric display in the results section
 */
import React from 'react'
import { formatINR } from '../utils/formatters'

export default function ResultCard({ label, value, highlight, icon, color }) {
  return (
    <div
      className={`result-card animate-pop ${
        highlight
          ? 'bg-brand-600 text-white'
          : 'bg-slate-50 dark:bg-slate-800/70'
      }`}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span
            className={`text-base leading-none ${
              highlight ? 'opacity-80' : color || 'text-brand-500'
            }`}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span
          className={`text-xs font-semibold uppercase tracking-wider font-display ${
            highlight ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          {label}
        </span>
      </div>
      <p
        className={`font-mono font-bold text-xl leading-tight mt-1 ${
          highlight ? 'text-white' : 'text-slate-800 dark:text-slate-100'
        }`}
      >
        {formatINR(value)}
      </p>
    </div>
  )
}
