'use client';

import React from 'react';

interface RiskRadarChartProps {
  scores: {
    affective: number;
    cognitive: number;
    somatic: number;
    crisis: number;
  };
  size?: number;
}

export const RiskRadarChart: React.FC<RiskRadarChartProps> = ({ scores, size = 220 }) => {
  const center = size / 2;
  const radius = (size / 2) - 32;

  const axes = [
    { label: 'Affective', value: scores.affective, angle: -Math.PI / 2, color: '#38bdf8' },
    { label: 'Cognitive', value: scores.cognitive, angle: 0, color: '#a855f7' },
    { label: 'Somatic', value: scores.somatic, angle: Math.PI / 2, color: '#fbbf24' },
    { label: 'Crisis', value: scores.crisis, angle: Math.PI, color: '#f43f5e' },
  ];

  const polygonPoints = axes
    .map((axis) => {
      const normalized = Math.min(100, Math.max(0, axis.value)) / 100;
      const r = normalized * radius;
      const x = center + r * Math.cos(axis.angle);
      const y = center + r * Math.sin(axis.angle);
      return `${x},${y}`;
    })
    .join(' ');

  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="flex flex-col items-center justify-center p-2">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
        aria-label="Clinical Risk Radar Chart"
      >
        {rings.map((ratio, i) => (
          <circle
            key={i}
            cx={center}
            cy={center}
            r={radius * ratio}
            fill="none"
            stroke="currentColor"
            className="text-slate-700/40 dark:text-slate-800"
            strokeWidth="1"
            strokeDasharray={ratio < 1 ? '3 3' : undefined}
          />
        ))}

        {axes.map((axis, i) => {
          const x2 = center + radius * Math.cos(axis.angle);
          const y2 = center + radius * Math.sin(axis.angle);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              className="text-slate-700/50 dark:text-slate-800"
              strokeWidth="1.2"
            />
          );
        })}

        <polygon
          points={polygonPoints}
          fill="rgba(56, 189, 248, 0.22)"
          stroke="#38bdf8"
          strokeWidth="2.2"
          className="transition-all duration-500 ease-out"
        />

        {axes.map((axis, i) => {
          const normalized = Math.min(100, Math.max(0, axis.value)) / 100;
          const r = normalized * radius;
          const cx = center + r * Math.cos(axis.angle);
          const cy = center + r * Math.sin(axis.angle);
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r="4.5"
                fill={axis.color}
                stroke="#0f172a"
                strokeWidth="2"
                className="transition-all duration-500"
              />
            </g>
          );
        })}

        {axes.map((axis, i) => {
          const labelDist = radius + 18;
          const lx = center + labelDist * Math.cos(axis.angle);
          const ly = center + labelDist * Math.sin(axis.angle);
          return (
            <text
              key={i}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-slate-400 text-[10px] font-semibold tracking-wider uppercase select-none"
            >
              {axis.label}
              <tspan className="fill-slate-200 font-bold" dx="3">
                {axis.value}%
              </tspan>
            </text>
          );
        })}
      </svg>

      <div className="w-full mt-3 grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-sky-400"></span> Affective
          </span>
          <span className="font-semibold text-slate-200">{scores.affective}%</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span> Cognitive
          </span>
          <span className="font-semibold text-slate-200">{scores.cognitive}%</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span> Somatic
          </span>
          <span className="font-semibold text-slate-200">{scores.somatic}%</span>
        </div>
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-2 flex items-center justify-between">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span> Crisis
          </span>
          <span className="font-semibold text-slate-200">{scores.crisis}%</span>
        </div>
      </div>
    </div>
  );
};
