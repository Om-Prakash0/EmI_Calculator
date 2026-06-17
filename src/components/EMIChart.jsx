/**
 * EMIChart – Pie chart showing Principal vs Interest breakdown
 */
import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatINR } from '../utils/formatters'

const COLORS = {
  principal: '#3366ff',
  interest:  '#f97316',
}

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null
  const { name, value } = payload[0]
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 px-4 py-3 text-sm">
      <p className="font-semibold font-display text-slate-700 dark:text-slate-200">{name}</p>
      <p className="font-mono font-bold text-brand-600 dark:text-brand-400">{formatINR(value)}</p>
    </div>
  )
}

const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.06) return null
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  return (
    <text
      x={x} y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={13}
      fontWeight={700}
      fontFamily="JetBrains Mono, monospace"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  )
}

export default function EMIChart({ principal, totalInt }) {
  const data = [
    { name: 'Principal',        value: principal },
    { name: 'Total Interest',   value: totalInt  },
  ]

  return (
    <div className="animate-fade-in">
      <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-display mb-4">
        Payment Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={90}
            dataKey="value"
            labelLine={false}
            label={CustomLabel}
          >
            <Cell key="principal" fill={COLORS.principal} />
            <Cell key="interest"  fill={COLORS.interest}  />
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={10}
            formatter={(value) => (
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 font-display">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
