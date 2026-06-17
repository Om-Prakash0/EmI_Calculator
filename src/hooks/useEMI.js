/**
 * useEMI — core calculation hook
 * EMI = P × R × (1+R)^N / ((1+R)^N − 1)
 *   P = Principal
 *   R = Monthly interest rate  (annualRate / 12 / 100)
 *   N = Total months
 */
import { useState, useCallback, useMemo } from 'react'

const DEFAULTS = {
  loanAmount: '500000',
  interestRate: '8.5',
  tenure: '5',
  tenureType: 'years',
}

export function useEMI() {
  const [loanAmount, setLoanAmount]   = useState(DEFAULTS.loanAmount)
  const [interestRate, setInterestRate] = useState(DEFAULTS.interestRate)
  const [tenure, setTenure]           = useState(DEFAULTS.tenure)
  const [tenureType, setTenureType]   = useState(DEFAULTS.tenureType)
  const [errors, setErrors]           = useState({})
  const [calculated, setCalculated]   = useState(false)
  const [loading, setLoading]         = useState(false)

  // ─── Validation ───────────────────────────────────────────────────────────
  const validate = useCallback(() => {
    const errs = {}

    const p = parseFloat(loanAmount)
    if (!loanAmount || isNaN(p) || p <= 0)          errs.loanAmount   = 'Enter a valid loan amount (> 0)'
    else if (p > 100_00_00_000)                       errs.loanAmount   = 'Loan amount cannot exceed ₹100 Crore'

    const r = parseFloat(interestRate)
    if (!interestRate || isNaN(r) || r <= 0)         errs.interestRate = 'Enter a valid interest rate (> 0%)'
    else if (r > 50)                                  errs.interestRate = 'Interest rate cannot exceed 50%'

    const t = parseFloat(tenure)
    if (!tenure || isNaN(t) || t <= 0)               errs.tenure       = 'Enter a valid tenure (> 0)'
    else if (tenureType === 'years' && t > 30)        errs.tenure       = 'Tenure cannot exceed 30 years'
    else if (tenureType === 'months' && t > 360)      errs.tenure       = 'Tenure cannot exceed 360 months'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }, [loanAmount, interestRate, tenure, tenureType])

  // ─── Core calculation ─────────────────────────────────────────────────────
  const result = useMemo(() => {
    const P = parseFloat(loanAmount)
    const R = parseFloat(interestRate) / 12 / 100
    const N = tenureType === 'years'
      ? parseFloat(tenure) * 12
      : parseFloat(tenure)

    if (!P || !R || !N || isNaN(P) || isNaN(R) || isNaN(N)) return null

    const compounded = Math.pow(1 + R, N)
    const emi        = (P * R * compounded) / (compounded - 1)
    const totalPay   = emi * N
    const totalInt   = totalPay - P

    return {
      emi:       Math.round(emi),
      totalInt:  Math.round(totalInt),
      totalPay:  Math.round(totalPay),
      principal: Math.round(P),
      months:    N,
    }
  }, [loanAmount, interestRate, tenure, tenureType])

  // ─── Actions ──────────────────────────────────────────────────────────────
  const calculate = useCallback(() => {
    if (!validate()) return
    setLoading(true)
    // Simulate brief async to show loading state
    setTimeout(() => {
      setLoading(false)
      setCalculated(true)
    }, 420)
  }, [validate])

  const reset = useCallback(() => {
    setLoanAmount(DEFAULTS.loanAmount)
    setInterestRate(DEFAULTS.interestRate)
    setTenure(DEFAULTS.tenure)
    setTenureType(DEFAULTS.tenureType)
    setErrors({})
    setCalculated(false)
    setLoading(false)
  }, [])

  // Live-clear individual error when user edits that field
  const clearError = useCallback((field) => {
    setErrors(prev => {
      if (!prev[field]) return prev
      const next = { ...prev }
      delete next[field]
      return next
    })
  }, [])

  return {
    // state
    loanAmount, setLoanAmount: (v) => { setLoanAmount(v);   clearError('loanAmount')   },
    interestRate, setInterestRate: (v) => { setInterestRate(v); clearError('interestRate') },
    tenure, setTenure: (v) => { setTenure(v);       clearError('tenure')       },
    tenureType, setTenureType,
    errors,
    calculated,
    loading,
    result,
    // actions
    calculate,
    reset,
  }
}
