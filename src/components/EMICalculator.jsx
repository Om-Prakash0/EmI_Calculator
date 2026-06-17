/**
 * EMICalculator – main calculator panel (form + results)
 */
import React, { useState } from 'react'
import { useEMI } from '../hooks/useEMI'
import { formatINR } from '../utils/formatters'
import InputField from './InputField'
import ResultCard from './ResultCard'
import EMIChart from './EMIChart'
import LoadingSpinner from './LoadingSpinner'

// ─── Copy to clipboard helper ──────────────────────────────────────────────
function useCopyResult() {
  const [copied, setCopied] = useState(false)
  const copy = (result) => {
    const text = [
      `EMI Calculator Results`,
      `─────────────────────`,
      `Monthly EMI      : ${formatINR(result.emi)}`,
      `Total Interest   : ${formatINR(result.totalInt)}`,
      `Total Payment    : ${formatINR(result.totalPay)}`,
      `Principal Amount : ${formatINR(result.principal)}`,
      `Tenure           : ${result.months} months`,
    ].join('\n')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return { copied, copy }
}

// ─── Tenure type toggle ────────────────────────────────────────────────────
function TenureToggle({ value, onChange }) {
  return (
    <div className="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 text-xs font-semibold font-display">
      {['years', 'months'].map(type => (
        <button
          key={type}
          type="button"
          onClick={() => onChange(type)}
          className={`px-3 py-1.5 capitalize transition-colors focus:outline-none ${
            value === type
              ? 'bg-brand-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
          }`}
          aria-pressed={value === type}
        >
          {type}
        </button>
      ))}
    </div>
  )
}

// ─── Component ─────────────────────────────────────────────────────────────
export default function EMICalculator() {
  const {
    loanAmount,   setLoanAmount,
    interestRate, setInterestRate,
    tenure,       setTenure,
    tenureType,   setTenureType,
    errors,
    calculated,
    loading,
    result,
    calculate,
    reset,
  } = useEMI()

  const { copied, copy } = useCopyResult()

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

      {/* Page hero */}
      <div className="mb-8 sm:mb-10">
        <p className="text-xs font-semibold font-display uppercase tracking-widest text-brand-500 mb-2">
          Instant Loan Calculator
        </p>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white leading-tight">
          How much will your<br className="hidden sm:block"/>
          <span className="text-brand-600"> loan cost per month?</span>
        </h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-xl">
          Adjust the sliders or type values directly. Your EMI updates instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Input Panel ────────────────────────────────────────────────── */}
        <div className="lg:col-span-2 card p-6 flex flex-col gap-6">
          <h2 className="sr-only">Loan Parameters</h2>

          {/* Loan Amount */}
          <InputField
            id="loanAmount"
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            prefix="₹"
            placeholder="500000"
            min={1000}
            max={1000000000}
            sliderMin={50000}
            sliderMax={10000000}
            sliderStep={50000}
            error={errors.loanAmount}
            hint="Enter the principal loan amount"
          />

          {/* Interest Rate */}
          <InputField
            id="interestRate"
            label="Annual Interest Rate"
            value={interestRate}
            onChange={setInterestRate}
            suffix="% p.a."
            placeholder="8.5"
            min={0.1}
            max={50}
            step={0.1}
            sliderMin={1}
            sliderMax={30}
            sliderStep={0.1}
            error={errors.interestRate}
          />

          {/* Tenure */}
          <InputField
            id="tenure"
            label="Loan Tenure"
            value={tenure}
            onChange={setTenure}
            suffix={tenureType === 'years' ? 'yrs' : 'mo'}
            placeholder={tenureType === 'years' ? '5' : '60'}
            min={1}
            max={tenureType === 'years' ? 30 : 360}
            sliderMin={1}
            sliderMax={tenureType === 'years' ? 30 : 360}
            sliderStep={1}
            error={errors.tenure}
          >
            <TenureToggle value={tenureType} onChange={setTenureType} />
          </InputField>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={calculate}
              disabled={loading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <LoadingSpinner size={16} />
                  Calculating…
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="4" y="2" width="16" height="20" rx="2"/>
                    <line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/>
                    <line x1="8" y1="14" x2="12" y2="14"/>
                  </svg>
                  Calculate EMI
                </>
              )}
            </button>
            <button
              onClick={reset}
              className="btn-secondary px-4"
              aria-label="Reset calculator"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <path d="M3 3v5h5"/>
              </svg>
            </button>
          </div>

          {/* Formula note */}
          <p className="text-[11px] text-slate-400 dark:text-slate-600 leading-relaxed font-mono border-t border-slate-100 dark:border-slate-800 pt-4">
            EMI = P × R × (1+R)^N / ((1+R)^N − 1)
          </p>
        </div>

        {/* ── Results Panel ──────────────────────────────────────────────── */}
        <div className="lg:col-span-3 flex flex-col gap-4">

          {!calculated && !loading && (
            <div className="card p-8 flex flex-col items-center justify-center gap-4 text-center h-full min-h-[300px]">
              <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-950 flex items-center justify-center">
                <span className="text-3xl text-brand-400" aria-hidden="true">₹</span>
              </div>
              <div>
                <p className="font-display font-semibold text-slate-700 dark:text-slate-300">
                  Fill in the details &amp; calculate
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
                  Your monthly EMI and payment breakdown will appear here
                </p>
              </div>
            </div>
          )}

          {loading && (
            <div className="card p-8 flex flex-col items-center justify-center gap-3 min-h-[300px]">
              <LoadingSpinner size={32} />
              <p className="text-sm text-slate-500 dark:text-slate-400 font-display font-semibold">
                Crunching numbers…
              </p>
            </div>
          )}

          {calculated && result && !loading && (
            <>
              {/* Result Cards */}
              <div className="card p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display">
                    Your EMI Summary
                  </h2>
                  {/* Copy button */}
                  <button
                    onClick={() => copy(result)}
                    className="flex items-center gap-1.5 text-xs font-semibold font-display px-3 py-1.5 rounded-lg
                               bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400
                               hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus:outline-none focus:ring-1 focus:ring-brand-400"
                    aria-label="Copy results to clipboard"
                  >
                    {copied ? (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
                  <div className="col-span-2 sm:col-span-2">
                    <ResultCard
                      label="Monthly EMI"
                      value={result.emi}
                      highlight
                      icon="📅"
                    />
                  </div>
                  <ResultCard
                    label="Total Interest"
                    value={result.totalInt}
                    icon="📈"
                    color="text-orange-500"
                  />
                  <ResultCard
                    label="Total Payment"
                    value={result.totalPay}
                    icon="💰"
                    color="text-green-500"
                  />
                  <ResultCard
                    label="Principal"
                    value={result.principal}
                    icon="🏦"
                    color="text-brand-500"
                  />
                  <div className="result-card bg-slate-50 dark:bg-slate-800/70 animate-pop">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
                      Tenure
                    </span>
                    <p className="font-mono font-bold text-xl text-slate-800 dark:text-slate-100 mt-1">
                      {result.months} <span className="text-sm font-semibold text-slate-400">months</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Chart */}
              <div className="card p-5">
                <EMIChart principal={result.principal} totalInt={result.totalInt} />
              </div>

              {/* Interest ratio bar */}
              <div className="card p-5 animate-slide-up">
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display mb-3">
                  Interest vs Principal
                </p>
                <div className="flex h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-brand-600 transition-all duration-700"
                    style={{ width: `${(result.principal / result.totalPay) * 100}%` }}
                    title={`Principal: ${((result.principal / result.totalPay) * 100).toFixed(1)}%`}
                  />
                  <div
                    className="bg-orange-400 transition-all duration-700"
                    style={{ width: `${(result.totalInt / result.totalPay) * 100}%` }}
                    title={`Interest: ${((result.totalInt / result.totalPay) * 100).toFixed(1)}%`}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
                  <span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-brand-600 mr-1 align-middle" />
                    Principal {((result.principal / result.totalPay) * 100).toFixed(1)}%
                  </span>
                  <span>
                    <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-400 mr-1 align-middle" />
                    Interest {((result.totalInt / result.totalPay) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Info strip */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        {[
          { icon: '🏠', title: 'Home Loans',     desc: 'Typically 7–9% p.a., up to 30 years' },
          { icon: '🚗', title: 'Car Loans',      desc: 'Typically 8–12% p.a., up to 7 years' },
          { icon: '💳', title: 'Personal Loans', desc: 'Typically 10–24% p.a., up to 5 years' },
        ].map(item => (
          <div key={item.title} className="card px-5 py-4">
            <span className="text-2xl" aria-hidden="true">{item.icon}</span>
            <p className="font-display font-semibold text-sm text-slate-700 dark:text-slate-200 mt-2">{item.title}</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
