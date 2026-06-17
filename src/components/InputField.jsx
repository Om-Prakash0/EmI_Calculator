/**
 * InputField – labeled numeric input with optional slider and inline error
 */
import React from 'react'

export default function InputField({
  label,
  id,
  value,
  onChange,
  prefix,
  suffix,
  placeholder,
  min,
  max,
  step = 1,
  error,
  hint,
  sliderMin,
  sliderMax,
  sliderStep,
  children, // optional right-side slot (e.g. tenure type toggle)
}) {
  const showSlider = sliderMin != null && sliderMax != null

  return (
    <div className="flex flex-col gap-1.5">
      {/* Label row */}
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="text-sm font-semibold text-slate-600 dark:text-slate-300 font-display"
        >
          {label}
        </label>
        {children}
      </div>

      {/* Input wrapper */}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-slate-400 dark:text-slate-500 font-mono font-medium select-none text-sm">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          inputMode="numeric"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          aria-invalid={!!error}
          className={`input-field ${prefix ? 'pl-8' : ''} ${suffix ? 'pr-16' : ''} ${error ? 'error' : ''}`}
        />
        {suffix && (
          <span className="absolute right-3.5 text-slate-400 dark:text-slate-500 font-mono text-sm select-none">
            {suffix}
          </span>
        )}
      </div>

      {/* Slider */}
      {showSlider && (
        <div className="px-0.5">
          <input
            type="range"
            min={sliderMin}
            max={sliderMax}
            step={sliderStep ?? step}
            value={Math.min(Math.max(parseFloat(value) || sliderMin, sliderMin), sliderMax)}
            onChange={e => onChange(e.target.value)}
            aria-hidden="true"
            className="w-full"
            style={{
              background: `linear-gradient(to right, #3366ff ${
                (((parseFloat(value) || sliderMin) - sliderMin) / (sliderMax - sliderMin)) * 100
              }%, #e2e8f0 0%)`,
            }}
          />
          <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-600 mt-0.5 font-mono">
            <span>{sliderMin}</span>
            <span>{sliderMax}</span>
          </div>
        </div>
      )}

      {/* Error / Hint */}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-500 dark:text-red-400 flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
            <circle cx="6" cy="6" r="6" opacity="0.15"/>
            <path d="M6 3.5v3M6 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-xs text-slate-400 dark:text-slate-500">{hint}</p>
      ) : null}
    </div>
  )
}
