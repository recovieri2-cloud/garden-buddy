import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Home, ClipboardList, Settings as SettingsIcon, Sun, CloudRain,
  CloudSun, Cloud, Wind, Droplets, Calendar as CalendarIcon,
  Download, Upload, Trash2, Sparkles, TrendingUp, X, Leaf, Plus, Edit3, Check, MapPin, StickyNote,
  Map as MapIcon, MessageCircle, Send, Camera, RefreshCw, Archive, ArrowLeft, GripVertical,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

// ============== SVG アイコン ==============
const sBlueberry = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="13" cy="6" rx="2" ry="3" fill="#5A9A3A" transform="rotate(-30 13 6)"/>
    <ellipse cx="19" cy="6" rx="2" ry="3" fill="#5A9A3A" transform="rotate(30 19 6)"/>
    <line x1="16" y1="4" x2="16" y2="12" stroke="#3F6F2A" strokeWidth="1.2"/>
    <circle cx="11" cy="17" r="5.5" fill="#3B5998"/>
    <circle cx="21" cy="17" r="5.5" fill="#3B5998"/>
    <circle cx="16" cy="22" r="6" fill="#4A6BAB"/>
    <circle cx="11" cy="14" r="1.4" fill="#1A2D4D" opacity="0.7"/>
    <circle cx="21" cy="14" r="1.4" fill="#1A2D4D" opacity="0.7"/>
    <circle cx="16" cy="19" r="1.4" fill="#1A2D4D" opacity="0.7"/>
    <ellipse cx="9" cy="15.5" rx="1.2" ry="1.8" fill="#A0B5D8" opacity="0.8"/>
    <ellipse cx="19" cy="15.5" rx="1.2" ry="1.8" fill="#A0B5D8" opacity="0.8"/>
    <ellipse cx="14" cy="20.5" rx="1.2" ry="1.8" fill="#A0B5D8" opacity="0.8"/>
  </svg>
);

const sFig = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 16 11 C 22 11 26 16 26 21 C 26 26 22 29 16 29 C 10 29 6 26 6 21 C 6 16 10 11 16 11 Z" fill="#6B3F8C"/>
    <path d="M 12 5 L 20 5 L 16 11 Z" fill="#5A9A3A"/>
    <path d="M 9 7 L 14 9 L 11 12 Z" fill="#6BB048"/>
    <path d="M 23 7 L 18 9 L 21 12 Z" fill="#6BB048"/>
    <ellipse cx="11" cy="18" rx="2" ry="3" fill="#A56FC2" opacity="0.6"/>
    <circle cx="18" cy="22" r="0.5" fill="#FFE0CC"/>
    <circle cx="14" cy="24" r="0.5" fill="#FFE0CC"/>
    <circle cx="20" cy="25" r="0.5" fill="#FFE0CC"/>
    <circle cx="16" cy="20" r="0.5" fill="#FFE0CC"/>
  </svg>
);

const sRaspberry = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 11 6 Q 14 9 12 11 L 14 11 Z" fill="#5A9A3A"/>
    <line x1="16" y1="4" x2="16" y2="11" stroke="#5A9A3A" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M 21 6 Q 18 9 20 11 L 18 11 Z" fill="#5A9A3A"/>
    <circle cx="11" cy="14" r="2.6" fill="#D63A5A"/>
    <circle cx="16" cy="13" r="2.6" fill="#E04A6E"/>
    <circle cx="21" cy="14" r="2.6" fill="#D63A5A"/>
    <circle cx="9" cy="18" r="2.6" fill="#B82847"/>
    <circle cx="13" cy="17.5" r="2.6" fill="#E04A6E"/>
    <circle cx="19" cy="17.5" r="2.6" fill="#E04A6E"/>
    <circle cx="23" cy="18" r="2.6" fill="#B82847"/>
    <circle cx="11" cy="22" r="2.6" fill="#D63A5A"/>
    <circle cx="16" cy="22" r="2.6" fill="#B82847"/>
    <circle cx="21" cy="22" r="2.6" fill="#D63A5A"/>
    <circle cx="13.5" cy="26" r="2.3" fill="#E04A6E"/>
    <circle cx="18.5" cy="26" r="2.3" fill="#E04A6E"/>
    <circle cx="10" cy="13" r="0.7" fill="#FFCDD9"/>
    <circle cx="15" cy="12" r="0.7" fill="#FFCDD9"/>
    <circle cx="20" cy="13" r="0.7" fill="#FFCDD9"/>
  </svg>
);

const sNira = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 8 28 Q 7 18 5 4" stroke="#3F8B2E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <path d="M 12 28 Q 11 16 10 3" stroke="#52B788" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <path d="M 16 28 L 16 2" stroke="#3F8B2E" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <path d="M 20 28 Q 21 16 22 3" stroke="#52B788" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <path d="M 24 28 Q 25 18 27 4" stroke="#3F8B2E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <path d="M 14 28 Q 13.5 20 13 8" stroke="#6BC990" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <path d="M 18 28 Q 18.5 20 19 8" stroke="#6BC990" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <ellipse cx="16" cy="28" rx="11" ry="1.5" fill="#7A5A3A"/>
  </svg>
);

const sHydrangea = (s) => {
  const fl = [
    [10, 8, '#9B7FED'], [16, 6, '#7B68EE'], [22, 8, '#A78BD4'],
    [7, 13, '#7B68EE'], [13, 11, '#A78BD4'], [19, 11, '#9B7FED'], [25, 13, '#7B68EE'],
    [10, 17, '#A78BD4'], [16, 16, '#9B7FED'], [22, 17, '#7B68EE'],
    [13, 21, '#7B68EE'], [19, 21, '#A78BD4'],
  ];
  return (
    <svg width={s} height={s} viewBox="0 0 32 32">
      <ellipse cx="9" cy="26" rx="5" ry="2.2" fill="#3F8B2E" transform="rotate(-25 9 26)"/>
      <ellipse cx="23" cy="26" rx="5" ry="2.2" fill="#3F8B2E" transform="rotate(25 23 26)"/>
      <ellipse cx="16" cy="27" rx="3" ry="1.5" fill="#2F6F22"/>
      {fl.map((f, i) => (
        <g key={i} transform={`translate(${f[0]},${f[1]})`}>
          <ellipse cx="0" cy="-1.8" rx="1.5" ry="1.8" fill={f[2]}/>
          <ellipse cx="1.8" cy="0" rx="1.8" ry="1.5" fill={f[2]}/>
          <ellipse cx="0" cy="1.8" rx="1.5" ry="1.8" fill={f[2]}/>
          <ellipse cx="-1.8" cy="0" rx="1.8" ry="1.5" fill={f[2]}/>
          <circle cx="0" cy="0" r="0.6" fill="#FFE869"/>
        </g>
      ))}
    </svg>
  );
};

const sMarigold = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => (
      <ellipse key={`o${a}`} cx="16" cy="6" rx="2.5" ry="4.5" fill="#FFD700" transform={`rotate(${a} 16 16)`}/>
    ))}
    {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map(a => (
      <ellipse key={`m${a}`} cx="16" cy="9" rx="2.2" ry="3.5" fill="#FFEC4F" transform={`rotate(${a} 16 16)`}/>
    ))}
    {[0, 60, 120, 180, 240, 300].map(a => (
      <ellipse key={`i${a}`} cx="16" cy="11" rx="2" ry="2.8" fill="#FFF59D" transform={`rotate(${a} 16 16)`}/>
    ))}
    <circle cx="16" cy="16" r="2.2" fill="#F59E0B"/>
    <circle cx="16" cy="16" r="1" fill="#92400E"/>
  </svg>
);

const sPot = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 8 13 L 24 13 L 22 27 Q 22 28 21 28 L 11 28 Q 10 28 10 27 Z" fill="#C97E5F"/>
    <rect x="5" y="10" width="22" height="4" rx="1.5" fill="#D69377"/>
    <ellipse cx="16" cy="11" rx="11" ry="1.8" fill="#A86347"/>
    <ellipse cx="11" cy="18" rx="1.2" ry="3.5" fill="#E5A98C" opacity="0.5"/>
    <path d="M 22 14 L 21 27" stroke="#A86347" strokeWidth="0.8" fill="none" opacity="0.6"/>
  </svg>
);

const sBasket = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <circle cx="10" cy="13" r="2.8" fill="#E63946"/>
    <line x1="10" y1="9.5" x2="10" y2="11" stroke="#3F6F2A" strokeWidth="0.8"/>
    <ellipse cx="10" cy="10" rx="1.2" ry="0.5" fill="#5A9A3A"/>
    <circle cx="9" cy="12" r="0.5" fill="#FF8585" opacity="0.7"/>
    <path d="M 17 11.5 Q 14.8 11.5 14.8 14 Q 14.8 17 17 17 Q 19.2 17 19.2 14 Q 19.2 11.5 17 11.5 Z" fill="#E94560"/>
    <circle cx="16" cy="13" r="0.3" fill="#FFEC4F"/>
    <circle cx="17.6" cy="13.8" r="0.3" fill="#FFEC4F"/>
    <circle cx="18.3" cy="13" r="0.3" fill="#FFEC4F"/>
    <circle cx="16.5" cy="15" r="0.3" fill="#FFEC4F"/>
    <circle cx="17.8" cy="15.5" r="0.3" fill="#FFEC4F"/>
    <path d="M 15 10.5 L 16.5 11.5 L 17 10.2 L 17.8 11.5 L 19 10.5 L 18 12.5 L 16 12.5 Z" fill="#5A9A3A"/>
    <path d="M 22 11 L 21 7 L 22.5 9 L 24 6.5 L 25 9 L 26 7 L 24.5 11 Z" fill="#5A9A3A"/>
    <path d="M 21 11.5 L 26 11.5 L 23.5 17 Z" fill="#FF8C42"/>
    <line x1="22.5" y1="13" x2="23" y2="13.8" stroke="#FFB585" strokeWidth="0.4"/>
    <line x1="24" y1="13.5" x2="24.5" y2="14.5" stroke="#FFB585" strokeWidth="0.4"/>
    <circle cx="6" cy="15" r="1.7" fill="#3B5998"/>
    <circle cx="7.8" cy="14.2" r="1.4" fill="#4A6BAB"/>
    <circle cx="6.3" cy="13.5" r="1.2" fill="#5874B5"/>
    <circle cx="6" cy="14.7" r="0.4" fill="#A0B5D8"/>
    <circle cx="7.6" cy="14" r="0.4" fill="#A0B5D8"/>
    <path d="M 4 17 L 28 17 L 26 28.5 Q 26 29.5 25 29.5 L 7 29.5 Q 6 29.5 6 28.5 Z" fill="#B8804A"/>
    <ellipse cx="16" cy="17" rx="12" ry="1.6" fill="#9A6633"/>
    <rect x="3.5" y="16" width="25" height="2.2" rx="0.8" fill="#D4A574"/>
    <path d="M 7 19.5 Q 16 21 25 19.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/>
    <path d="M 7 22.5 Q 16 24 25 22.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/>
    <path d="M 7.5 25.5 Q 16 27 24.5 25.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/>
    <line x1="11" y1="18.5" x2="10" y2="29" stroke="#7A5230" strokeWidth="0.3" opacity="0.5"/>
    <line x1="16" y1="18.5" x2="16" y2="29" stroke="#7A5230" strokeWidth="0.3" opacity="0.5"/>
    <line x1="21" y1="18.5" x2="22" y2="29" stroke="#7A5230" strokeWidth="0.3" opacity="0.5"/>
  </svg>
);

const sKuushinsai = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="16" cy="29" rx="6" ry="1.2" fill="#7A5A3A"/>
    <path d="M 16 29 L 16 16" stroke="#4A8B3A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M 16 22 Q 13 18 9 14" stroke="#4A8B3A" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M 16 22 Q 19 18 23 14" stroke="#4A8B3A" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M 16 16 L 13 11 L 14 6 L 16 4 L 18 6 L 19 11 Z" fill="#52B788"/>
    <line x1="16" y1="7" x2="16" y2="15" stroke="#3F8B2E" strokeWidth="0.4"/>
    <path d="M 9 14 L 5 12 L 4 8 L 6 6 L 9 7 L 11 11 Z" fill="#6BC990"/>
    <line x1="7" y1="8" x2="9" y2="13" stroke="#3F8B2E" strokeWidth="0.4"/>
    <path d="M 23 14 L 27 12 L 28 8 L 26 6 L 23 7 L 21 11 Z" fill="#6BC990"/>
    <line x1="25" y1="8" x2="23" y2="13" stroke="#3F8B2E" strokeWidth="0.4"/>
  </svg>
);

const sMitsuba = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="16" cy="29" rx="6" ry="1.2" fill="#7A5A3A"/>
    <path d="M 16 29 L 16 14" stroke="#5A8B3A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M 16 24 Q 12 22 9 18" stroke="#5A8B3A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <path d="M 16 24 Q 20 22 23 18" stroke="#5A8B3A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    <ellipse cx="16" cy="9" rx="2.8" ry="4" fill="#52B788"/>
    <line x1="16" y1="6" x2="16" y2="13" stroke="#3F8B2E" strokeWidth="0.4"/>
    <ellipse cx="11.5" cy="11.5" rx="2.5" ry="3.5" fill="#6BC990" transform="rotate(-40 11.5 11.5)"/>
    <ellipse cx="20.5" cy="11.5" rx="2.5" ry="3.5" fill="#6BC990" transform="rotate(40 20.5 11.5)"/>
    <ellipse cx="9" cy="17" rx="1.8" ry="2.3" fill="#52B788" transform="rotate(-30 9 17)"/>
    <ellipse cx="6" cy="19" rx="1.5" ry="2" fill="#6BC990" transform="rotate(-60 6 19)"/>
    <ellipse cx="11" cy="19" rx="1.5" ry="2" fill="#6BC990"/>
    <ellipse cx="23" cy="17" rx="1.8" ry="2.3" fill="#52B788" transform="rotate(30 23 17)"/>
    <ellipse cx="26" cy="19" rx="1.5" ry="2" fill="#6BC990" transform="rotate(60 26 19)"/>
    <ellipse cx="21" cy="19" rx="1.5" ry="2" fill="#6BC990"/>
  </svg>
);

// ============== 植物マスター ==============
const PLANTS = [
  { id: 'blueberry',  name: 'ブルーベリー',     svg: sBlueberry, color: '#4A6BAB', bg: 'from-blue-100 to-indigo-200',    ring: 'ring-blue-300',    wateringInterval: 2, fertilizerInterval: 30, isHarvested: true },
  { id: 'strawberry', name: 'イチゴ',           emoji: '🍓',     color: '#E94560', bg: 'from-pink-100 to-red-200',       ring: 'ring-rose-300',    wateringInterval: 2, fertilizerInterval: 14, isHarvested: true },
  { id: 'fig',        name: 'イチジク',         svg: sFig,       color: '#6B3F8C', bg: 'from-purple-100 to-fuchsia-200', ring: 'ring-purple-300',  wateringInterval: 3, fertilizerInterval: 30, isHarvested: true },
  { id: 'raspberry',  name: 'ラズベリー',       svg: sRaspberry, color: '#D63A5A', bg: 'from-rose-100 to-pink-200',      ring: 'ring-pink-300',    wateringInterval: 2, fertilizerInterval: 21, isHarvested: true },
  { id: 'nira',       name: 'ニラ',             svg: sNira,      color: '#52B788', bg: 'from-green-100 to-emerald-200',  ring: 'ring-emerald-300', wateringInterval: 2, fertilizerInterval: 21, isHarvested: true },
  { id: 'garlic',     name: 'にんにく',         emoji: '🧄',     color: '#D4A574', bg: 'from-amber-100 to-yellow-200',   ring: 'ring-amber-300',   wateringInterval: 4, fertilizerInterval: 30, isHarvested: true },
  { id: 'shiso',      name: 'しそ',             emoji: '🍃',     color: '#9B59B6', bg: 'from-violet-100 to-purple-200',  ring: 'ring-violet-300',  wateringInterval: 1, fertilizerInterval: 14, isHarvested: true },
  { id: 'kuushinsai', name: '空心菜',           svg: sKuushinsai, color: '#52B788', bg: 'from-lime-100 to-green-200',     ring: 'ring-lime-300',    wateringInterval: 1, fertilizerInterval: 14, isHarvested: true },
  { id: 'mitsuba',    name: 'ミツバ',           svg: sMitsuba,    color: '#5BAE7E', bg: 'from-emerald-100 to-teal-200',   ring: 'ring-teal-300',    wateringInterval: 1, fertilizerInterval: 21, isHarvested: true },
  { id: 'tomato',     name: 'ミニトマト',       emoji: '🍅',     color: '#E63946', bg: 'from-red-100 to-orange-200',     ring: 'ring-red-300',     wateringInterval: 1, fertilizerInterval: 14, isHarvested: true },
  { id: 'hydrangea',  name: 'アジサイ',         svg: sHydrangea, color: '#7B68EE', bg: 'from-sky-100 to-blue-200',       ring: 'ring-sky-300',     wateringInterval: 1, fertilizerInterval: 30, isHarvested: false },
  { id: 'marigold',   name: 'マリーゴールド',   svg: sMarigold,  color: '#FFD700', bg: 'from-yellow-100 to-orange-200',  ring: 'ring-yellow-300',  wateringInterval: 2, fertilizerInterval: 21, isHarvested: false },
];

const sCare = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 13.5 14.5 Q 9 9 3 5.5 Q 1.5 5 2 7.5 Q 7 11.5 12 15.5 Z"
          fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M 13.5 17.5 Q 9 23 3 26.5 Q 1.5 27 2 24.5 Q 7 20.5 12 16.5 Z"
          fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M 16 14 Q 21 10.5 28 6 Q 30 5 30 7.5 Q 28 11 22.5 14.5 Q 18 16.5 16 16 Z"
          fill="#D5DBDB" stroke="#5C2D17" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M 16 18 Q 22 18.5 29 17.5 Q 30.5 17.5 30 19.5 Q 28 21.5 22 21 Q 18 20 16 19 Z"
          fill="#EAEDED" stroke="#5C2D17" strokeWidth="1.3" strokeLinejoin="round"/>
    <circle cx="14.5" cy="16" r="2.6" fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.2"/>
    <circle cx="14.5" cy="16" r="1" fill="#3A1810"/>
    <path d="M 11.5 13 Q 12.5 14.5 11.5 16 Q 12.5 17.5 11.5 19"
          stroke="#5C2D17" strokeWidth="0.9" fill="none" strokeLinecap="round"/>
  </svg>
);

const RECORD_TYPES = [
  { id: 'watering',   name: '水やり',     emoji: '💧',   color: 'bg-sky-100 text-sky-700 ring-sky-300' },
  { id: 'care',       name: 'お手入れ',   svg: sCare,    color: 'bg-emerald-100 text-emerald-700 ring-emerald-300' },
  { id: 'harvest',    name: '収穫',       svg: sBasket,  color: 'bg-rose-100 text-rose-700 ring-rose-300' },
  { id: 'fertilizer', name: '追肥',       emoji: '🌱',   color: 'bg-green-100 text-green-700 ring-green-300' },
  { id: 'pesticide',  name: '農薬',       emoji: '🧴',   color: 'bg-purple-100 text-purple-700 ring-purple-300' },
  { id: 'repotting',  name: '植え替え',   svg: sPot,     color: 'bg-amber-100 text-amber-700 ring-amber-300' },
];

// ============== ヘルパー ==============
const todayStr = () => new Date().toISOString().split('T')[0];
const daysBetween = (d1, d2) => Math.floor((new Date(d2) - new Date(d1)) / 86400000);
const formatDate = (s) => { const d = new Date(s); return `${d.getMonth() + 1}/${d.getDate()}`; };
const getPlant = (id) => PLANTS.find(p => p.id === id) || PLANTS[0];
const getRecType = (id) => RECORD_TYPES.find(r => r.id === id) || RECORD_TYPES[0];
const newId = (prefix = 'inst') => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const defaultUnit = (recordTypeId) => recordTypeId === 'harvest' ? '個' : recordTypeId === 'fertilizer' ? 'g' : '';

function getDefaultPosition(idx, total) {
  const cols = total <= 4 ? Math.max(2, total) : Math.min(4, Math.ceil(Math.sqrt(total)));
  const rows = Math.ceil(total / cols);
  const col = idx % cols;
  const row = Math.floor(idx / cols);
  const xMargin = 14, yMargin = 16;
  const xRange = 100 - 2 * xMargin, yRange = 100 - 2 * yMargin;
  return {
    x: xMargin + (col + 0.5) * (xRange / cols),
    y: yMargin + (row + 0.5) * (yRange / Math.max(1, rows)),
  };
}

async function compressImageToDataUrl(file, maxDim = 720, quality = 0.55) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const ratio = Math.min(maxDim / img.width, maxDim / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        try { resolve(canvas.toDataURL('image/jpeg', quality)); } catch (err) { reject(err); }
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function PlantIcon({ plantId, size = 32 }) {
  const p = getPlant(plantId);
  if (p.svg) return <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>{p.svg(size)}</span>;
  return <span style={{ fontSize: size * 0.95, lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: size, height: size }}>{p.emoji}</span>;
}

function RecordIcon({ recordTypeId, size = 24 }) {
  const r = getRecType(recordTypeId);
  if (r.svg) return <span style={{ display: 'inline-flex' }}>{r.svg(size)}</span>;
  return <span style={{ fontSize: size, lineHeight: 1 }}>{r.emoji}</span>;
}

// ============== 地域・天気 ==============
const CLIMATE_DESCRIPTIONS = {
  hokkaido: '冷涼な気候、冬は厳寒で積雪が深く、夏は涼しい。霜害・凍害・防寒対策が重要',
  tohoku: '冷涼な気候、冬は寒く積雪あり、夏は穏やか。耐寒性の品種選びが大切',
  pacific_temperate: '温暖な太平洋側気候、夏は高温多湿、冬は晴天が多く乾燥しやすい',
  japan_sea_temperate: '温暖な日本海側気候、夏は蒸し暑く、冬は曇りや雪が多い',
  subtropical: '亜熱帯気候、年間を通じて温暖、夏は台風が多い、霜はほぼ降りない',
};

const CITIES = [
  { name: '札幌市', prefecture: '北海道', lat: 43.0642, lng: 141.3469, climate: 'hokkaido' },
  { name: '旭川市', prefecture: '北海道', lat: 43.7706, lng: 142.3650, climate: 'hokkaido' },
  { name: '函館市', prefecture: '北海道', lat: 41.7688, lng: 140.7290, climate: 'hokkaido' },
  { name: '釧路市', prefecture: '北海道', lat: 42.9849, lng: 144.3820, climate: 'hokkaido' },
  { name: '帯広市', prefecture: '北海道', lat: 42.9237, lng: 143.1965, climate: 'hokkaido' },
  { name: '青森市', prefecture: '青森県', lat: 40.8246, lng: 140.7406, climate: 'tohoku' },
  { name: '弘前市', prefecture: '青森県', lat: 40.6028, lng: 140.4644, climate: 'tohoku' },
  { name: '八戸市', prefecture: '青森県', lat: 40.5121, lng: 141.4884, climate: 'tohoku' },
  { name: '盛岡市', prefecture: '岩手県', lat: 39.7036, lng: 141.1527, climate: 'tohoku' },
  { name: '一関市', prefecture: '岩手県', lat: 38.9343, lng: 141.1264, climate: 'tohoku' },
  { name: '仙台市', prefecture: '宮城県', lat: 38.2682, lng: 140.8694, climate: 'tohoku' },
  { name: '石巻市', prefecture: '宮城県', lat: 38.4344, lng: 141.3029, climate: 'tohoku' },
  { name: '秋田市', prefecture: '秋田県', lat: 39.7186, lng: 140.1024, climate: 'japan_sea_temperate' },
  { name: '横手市', prefecture: '秋田県', lat: 39.3133, lng: 140.5664, climate: 'japan_sea_temperate' },
  { name: '山形市', prefecture: '山形県', lat: 38.2404, lng: 140.3636, climate: 'tohoku' },
  { name: '酒田市', prefecture: '山形県', lat: 38.9145, lng: 139.8367, climate: 'japan_sea_temperate' },
  { name: '福島市', prefecture: '福島県', lat: 37.7503, lng: 140.4676, climate: 'tohoku' },
  { name: '郡山市', prefecture: '福島県', lat: 37.4002, lng: 140.3597, climate: 'tohoku' },
  { name: 'いわき市', prefecture: '福島県', lat: 37.0501, lng: 140.8876, climate: 'pacific_temperate' },
  { name: '水戸市', prefecture: '茨城県', lat: 36.3418, lng: 140.4467, climate: 'pacific_temperate' },
  { name: 'つくば市', prefecture: '茨城県', lat: 36.0834, lng: 140.0768, climate: 'pacific_temperate' },
  { name: '宇都宮市', prefecture: '栃木県', lat: 36.5551, lng: 139.8829, climate: 'pacific_temperate' },
  { name: '那須塩原市', prefecture: '栃木県', lat: 36.9605, lng: 140.0466, climate: 'pacific_temperate' },
  { name: '前橋市', prefecture: '群馬県', lat: 36.3895, lng: 139.0634, climate: 'pacific_temperate' },
  { name: '高崎市', prefecture: '群馬県', lat: 36.3221, lng: 139.0030, climate: 'pacific_temperate' },
  { name: 'さいたま市', prefecture: '埼玉県', lat: 35.8617, lng: 139.6455, climate: 'pacific_temperate' },
  { name: '川越市', prefecture: '埼玉県', lat: 35.9251, lng: 139.4858, climate: 'pacific_temperate' },
  { name: '所沢市', prefecture: '埼玉県', lat: 35.7990, lng: 139.4690, climate: 'pacific_temperate' },
  { name: '千葉市', prefecture: '千葉県', lat: 35.6074, lng: 140.1064, climate: 'pacific_temperate' },
  { name: '船橋市', prefecture: '千葉県', lat: 35.6939, lng: 139.9826, climate: 'pacific_temperate' },
  { name: '柏市', prefecture: '千葉県', lat: 35.8676, lng: 139.9758, climate: 'pacific_temperate' },
  { name: '東京都心', prefecture: '東京都', lat: 35.6762, lng: 139.6503, climate: 'pacific_temperate' },
  { name: '新宿区', prefecture: '東京都', lat: 35.6938, lng: 139.7036, climate: 'pacific_temperate' },
  { name: '世田谷区', prefecture: '東京都', lat: 35.6464, lng: 139.6533, climate: 'pacific_temperate' },
  { name: '八王子市', prefecture: '東京都', lat: 35.6664, lng: 139.3160, climate: 'pacific_temperate' },
  { name: '町田市', prefecture: '東京都', lat: 35.5462, lng: 139.4467, climate: 'pacific_temperate' },
  { name: '横浜市', prefecture: '神奈川県', lat: 35.4437, lng: 139.6380, climate: 'pacific_temperate' },
  { name: '川崎市', prefecture: '神奈川県', lat: 35.5308, lng: 139.7029, climate: 'pacific_temperate' },
  { name: '相模原市', prefecture: '神奈川県', lat: 35.5557, lng: 139.3674, climate: 'pacific_temperate' },
  { name: '鎌倉市', prefecture: '神奈川県', lat: 35.3193, lng: 139.5468, climate: 'pacific_temperate' },
  { name: '新潟市', prefecture: '新潟県', lat: 37.9026, lng: 139.0233, climate: 'japan_sea_temperate' },
  { name: '長岡市', prefecture: '新潟県', lat: 37.4470, lng: 138.8516, climate: 'japan_sea_temperate' },
  { name: '富山市', prefecture: '富山県', lat: 36.6953, lng: 137.2113, climate: 'japan_sea_temperate' },
  { name: '高岡市', prefecture: '富山県', lat: 36.7503, lng: 137.0258, climate: 'japan_sea_temperate' },
  { name: '金沢市', prefecture: '石川県', lat: 36.5613, lng: 136.6562, climate: 'japan_sea_temperate' },
  { name: '小松市', prefecture: '石川県', lat: 36.4051, lng: 136.4498, climate: 'japan_sea_temperate' },
  { name: '福井市', prefecture: '福井県', lat: 36.0652, lng: 136.2216, climate: 'japan_sea_temperate' },
  { name: '敦賀市', prefecture: '福井県', lat: 35.6451, lng: 136.0556, climate: 'japan_sea_temperate' },
  { name: '甲府市', prefecture: '山梨県', lat: 35.6635, lng: 138.5683, climate: 'pacific_temperate' },
  { name: '富士吉田市', prefecture: '山梨県', lat: 35.4878, lng: 138.8077, climate: 'pacific_temperate' },
  { name: '長野市', prefecture: '長野県', lat: 36.6485, lng: 138.1949, climate: 'tohoku' },
  { name: '松本市', prefecture: '長野県', lat: 36.2381, lng: 137.9720, climate: 'tohoku' },
  { name: '軽井沢町', prefecture: '長野県', lat: 36.3486, lng: 138.5969, climate: 'tohoku' },
  { name: '岐阜市', prefecture: '岐阜県', lat: 35.4232, lng: 136.7607, climate: 'pacific_temperate' },
  { name: '高山市', prefecture: '岐阜県', lat: 36.1461, lng: 137.2521, climate: 'tohoku' },
  { name: '静岡市', prefecture: '静岡県', lat: 34.9756, lng: 138.3828, climate: 'pacific_temperate' },
  { name: '浜松市', prefecture: '静岡県', lat: 34.7108, lng: 137.7261, climate: 'pacific_temperate' },
  { name: '富士市', prefecture: '静岡県', lat: 35.1614, lng: 138.6764, climate: 'pacific_temperate' },
  { name: '名古屋市', prefecture: '愛知県', lat: 35.1815, lng: 136.9066, climate: 'pacific_temperate' },
  { name: '豊橋市', prefecture: '愛知県', lat: 34.7693, lng: 137.3917, climate: 'pacific_temperate' },
  { name: '岡崎市', prefecture: '愛知県', lat: 34.9542, lng: 137.1737, climate: 'pacific_temperate' },
  { name: '津市', prefecture: '三重県', lat: 34.7184, lng: 136.5057, climate: 'pacific_temperate' },
  { name: '伊勢市', prefecture: '三重県', lat: 34.4869, lng: 136.7090, climate: 'pacific_temperate' },
  { name: '大津市', prefecture: '滋賀県', lat: 35.0044, lng: 135.8686, climate: 'pacific_temperate' },
  { name: '彦根市', prefecture: '滋賀県', lat: 35.2745, lng: 136.2596, climate: 'pacific_temperate' },
  { name: '京都市', prefecture: '京都府', lat: 35.0116, lng: 135.7681, climate: 'pacific_temperate' },
  { name: '舞鶴市', prefecture: '京都府', lat: 35.4498, lng: 135.3315, climate: 'japan_sea_temperate' },
  { name: '大阪市', prefecture: '大阪府', lat: 34.6937, lng: 135.5023, climate: 'pacific_temperate' },
  { name: '堺市', prefecture: '大阪府', lat: 34.5733, lng: 135.4830, climate: 'pacific_temperate' },
  { name: '東大阪市', prefecture: '大阪府', lat: 34.6794, lng: 135.6011, climate: 'pacific_temperate' },
  { name: '神戸市', prefecture: '兵庫県', lat: 34.6901, lng: 135.1956, climate: 'pacific_temperate' },
  { name: '姫路市', prefecture: '兵庫県', lat: 34.8150, lng: 134.6856, climate: 'pacific_temperate' },
  { name: '豊岡市', prefecture: '兵庫県', lat: 35.5447, lng: 134.8197, climate: 'japan_sea_temperate' },
  { name: '奈良市', prefecture: '奈良県', lat: 34.6852, lng: 135.8048, climate: 'pacific_temperate' },
  { name: '橿原市', prefecture: '奈良県', lat: 34.5085, lng: 135.7935, climate: 'pacific_temperate' },
  { name: '和歌山市', prefecture: '和歌山県', lat: 34.2261, lng: 135.1675, climate: 'pacific_temperate' },
  { name: '田辺市', prefecture: '和歌山県', lat: 33.7305, lng: 135.3766, climate: 'pacific_temperate' },
  { name: '鳥取市', prefecture: '鳥取県', lat: 35.5039, lng: 134.2381, climate: 'japan_sea_temperate' },
  { name: '米子市', prefecture: '鳥取県', lat: 35.4283, lng: 133.3309, climate: 'japan_sea_temperate' },
  { name: '松江市', prefecture: '島根県', lat: 35.4723, lng: 133.0509, climate: 'japan_sea_temperate' },
  { name: '出雲市', prefecture: '島根県', lat: 35.3667, lng: 132.7556, climate: 'japan_sea_temperate' },
  { name: '岡山市', prefecture: '岡山県', lat: 34.6618, lng: 133.9344, climate: 'pacific_temperate' },
  { name: '倉敷市', prefecture: '岡山県', lat: 34.5851, lng: 133.7720, climate: 'pacific_temperate' },
  { name: '広島市', prefecture: '広島県', lat: 34.3853, lng: 132.4553, climate: 'pacific_temperate' },
  { name: '福山市', prefecture: '広島県', lat: 34.4858, lng: 133.3625, climate: 'pacific_temperate' },
  { name: '山口市', prefecture: '山口県', lat: 34.1858, lng: 131.4706, climate: 'pacific_temperate' },
  { name: '下関市', prefecture: '山口県', lat: 33.9577, lng: 130.9410, climate: 'pacific_temperate' },
  { name: '徳島市', prefecture: '徳島県', lat: 34.0658, lng: 134.5593, climate: 'pacific_temperate' },
  { name: '鳴門市', prefecture: '徳島県', lat: 34.1721, lng: 134.6094, climate: 'pacific_temperate' },
  { name: '高松市', prefecture: '香川県', lat: 34.3401, lng: 134.0434, climate: 'pacific_temperate' },
  { name: '丸亀市', prefecture: '香川県', lat: 34.2898, lng: 133.7975, climate: 'pacific_temperate' },
  { name: '松山市', prefecture: '愛媛県', lat: 33.8392, lng: 132.7657, climate: 'pacific_temperate' },
  { name: '今治市', prefecture: '愛媛県', lat: 34.0658, lng: 132.9978, climate: 'pacific_temperate' },
  { name: '高知市', prefecture: '高知県', lat: 33.5597, lng: 133.5311, climate: 'pacific_temperate' },
  { name: '福岡市', prefecture: '福岡県', lat: 33.5904, lng: 130.4017, climate: 'pacific_temperate' },
  { name: '北九州市', prefecture: '福岡県', lat: 33.8835, lng: 130.8751, climate: 'pacific_temperate' },
  { name: '久留米市', prefecture: '福岡県', lat: 33.3192, lng: 130.5081, climate: 'pacific_temperate' },
  { name: '佐賀市', prefecture: '佐賀県', lat: 33.2494, lng: 130.2989, climate: 'pacific_temperate' },
  { name: '長崎市', prefecture: '長崎県', lat: 32.7503, lng: 129.8779, climate: 'pacific_temperate' },
  { name: '佐世保市', prefecture: '長崎県', lat: 33.1808, lng: 129.7156, climate: 'pacific_temperate' },
  { name: '熊本市', prefecture: '熊本県', lat: 32.8031, lng: 130.7079, climate: 'pacific_temperate' },
  { name: '八代市', prefecture: '熊本県', lat: 32.5079, lng: 130.6020, climate: 'pacific_temperate' },
  { name: '大分市', prefecture: '大分県', lat: 33.2382, lng: 131.6126, climate: 'pacific_temperate' },
  { name: '別府市', prefecture: '大分県', lat: 33.2845, lng: 131.4912, climate: 'pacific_temperate' },
  { name: '宮崎市', prefecture: '宮崎県', lat: 31.9077, lng: 131.4202, climate: 'pacific_temperate' },
  { name: '延岡市', prefecture: '宮崎県', lat: 32.5821, lng: 131.6628, climate: 'pacific_temperate' },
  { name: '鹿児島市', prefecture: '鹿児島県', lat: 31.5602, lng: 130.5581, climate: 'pacific_temperate' },
  { name: '那覇市', prefecture: '沖縄県', lat: 26.2125, lng: 127.6792, climate: 'subtropical' },
  { name: '石垣市', prefecture: '沖縄県', lat: 24.3408, lng: 124.1556, climate: 'subtropical' },
  { name: '宮古島市', prefecture: '沖縄県', lat: 24.8055, lng: 125.2812, climate: 'subtropical' },
];

const DEFAULT_LOCATION = CITIES.find(c => c.name === '東京都心') || CITIES[0];
const PREFECTURES = [...new Set(CITIES.map(c => c.prefecture))];

function findNearestCity(lat, lng) {
  let closest = null;
  let minDist = Infinity;
  CITIES.forEach(c => {
    const d = Math.pow(c.lat - lat, 2) + Math.pow(c.lng - lng, 2);
    if (d < minDist) { minDist = d; closest = c; }
  });
  return closest;
}

function codeToCondition(code) {
  if (code === 0 || code === 1) return 'sunny';
  if (code === 2 || code === 3) return 'cloudy';
  if (code >= 45 && code <= 48) return 'cloudy';
  if (code >= 51 && code <= 67) return 'rainy';
  if (code >= 71 && code <= 77) return 'snowy';
  if (code >= 80 && code <= 86) return 'rainy';
  if (code >= 95) return 'rainy';
  return 'cloudy';
}

const conditionText = (c) => ({ sunny: '晴れ', cloudy: 'くもり', rainy: '雨', snowy: '雪' }[c] || 'くもり');

async function fetchWeatherDirect(location) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lng}&current=temperature_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max&timezone=Asia/Tokyo&forecast_days=4`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('open-meteo http ' + res.status);
    const data = await res.json();
    const cur = data.current || {};
    const days = data.daily.time.map((date, i) => ({
      date,
      condition: codeToCondition(data.daily.weather_code[i]),
      tempHigh: Math.round(data.daily.temperature_2m_max[i]),
      tempLow: Math.round(data.daily.temperature_2m_min[i]),
      rainProb: data.daily.precipitation_probability_max[i] || 0,
      windSpeed: Math.round((data.daily.wind_speed_10m_max[i] || 0) / 3.6),
    }));
    if (cur.temperature_2m !== undefined) {
      days[0] = {
        ...days[0],
        currentTemp: Math.round(cur.temperature_2m),
        condition: codeToCondition(cur.weather_code ?? data.daily.weather_code[0]),
        windSpeed: Math.round((cur.wind_speed_10m ?? 0) / 3.6),
      };
    }
    return { today: days[0], forecast: days.slice(1), location: location.name, isReal: true, fetchedAt: new Date().toISOString(), source: 'open-meteo' };
  } catch (e) {
    console.error('Open-Meteo failed:', e);
    return null;
  }
}

async function fetchWeatherViaAI(location) {
  try {
    const today = todayStr();
    const tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
    const dat = new Date(); dat.setDate(dat.getDate() + 2);
    const dat3 = new Date(); dat3.setDate(dat3.getDate() + 3);
    const tmrStr = tmr.toISOString().split('T')[0];
    const datStr = dat.toISOString().split('T')[0];
    const dat3Str = dat3.toISOString().split('T')[0];
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{
          role: "user",
          content: `${location.prefecture}${location.name}の天気予報を取得してください。Yahoo!天気・tenki.jp・ウェザーニュース等で確認した最新情報をJSON形式のみで返答してください（説明文・マークダウン・コードブロックは一切不要）。

【厳守ルール】
- daysは必ず「ちょうど4要素」の配列にすること
- 1番目: ${today} (今日)
- 2番目: ${tmrStr} (明日)
- 3番目: ${datStr} (明後日)
- 4番目: ${dat3Str}
- 各dateフィールドは必ず "YYYY-MM-DD" 形式（ゼロ埋め）

【返答形式】
{"days":[
  {"date":"${today}","condition":"sunny|cloudy|rainy|snowy","tempHigh":整数,"tempLow":整数,"rainProb":0-100整数,"windSpeed":m/s整数,"currentTemp":今日の現在気温整数},
  {"date":"${tmrStr}","condition":"...","tempHigh":整数,"tempLow":整数,"rainProb":整数,"windSpeed":整数},
  {"date":"${datStr}","condition":"...","tempHigh":整数,"tempLow":整数,"rainProb":整数,"windSpeed":整数},
  {"date":"${dat3Str}","condition":"...","tempHigh":整数,"tempLow":整数,"rainProb":整数,"windSpeed":整数}
]}

condition は: sunny=晴れ系, cloudy=曇り系, rainy=雨, snowy=雪 から選択。`
        }]
      })
    });
    if (!res.ok) throw new Error('AI weather http ' + res.status);
    const data = await res.json();
    const text = (data.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');
    const jsonMatch = text.match(/\{[\s\S]*"days"[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in AI response');
    const parsed = JSON.parse(jsonMatch[0]);
    if (!parsed.days || !Array.isArray(parsed.days) || parsed.days.length === 0) throw new Error('Invalid AI weather data');
    const days = parsed.days.map(d => ({
      date: d.date,
      condition: d.condition || 'cloudy',
      tempHigh: Math.round(d.tempHigh ?? 20),
      tempLow: Math.round(d.tempLow ?? 10),
      rainProb: Math.round(d.rainProb ?? 0),
      windSpeed: Math.round(d.windSpeed ?? 2),
      ...(d.currentTemp !== undefined ? { currentTemp: Math.round(d.currentTemp) } : {}),
    }));
    return { today: days[0], forecast: days.slice(1, 4), location: location.name, isReal: true, fetchedAt: new Date().toISOString(), source: 'ai' };
  } catch (e) {
    console.error('AI weather failed:', e);
    return null;
  }
}

async function fetchWeatherSmart(location) {
  if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
    location = DEFAULT_LOCATION;
  }
  const cacheKey = `weather-cache-v3-${location.lat.toFixed(3)}-${location.lng.toFixed(3)}`;
  const todayKey = todayStr();
  const todayMs = (() => { const d = new Date(); d.setHours(0,0,0,0); return d.getTime(); })();
  const futureDayCount = (forecast) => (forecast || []).filter(d => {
    const dt = new Date(d.date);
    if (isNaN(dt.getTime())) return false;
    dt.setHours(0,0,0,0);
    return Math.round((dt.getTime() - todayMs) / 86400000) >= 1;
  }).length;
  try {
    const cached = await window.storage.get(cacheKey);
    if (cached?.value) {
      const w = JSON.parse(cached.value);
      if (w.fetchedAt && w.today?.date === todayKey && futureDayCount(w.forecast) >= 3) {
        const age = Date.now() - new Date(w.fetchedAt).getTime();
        if (age < 3 * 3600 * 1000) return w;
      }
    }
  } catch {}
  let w = await fetchWeatherDirect(location);
  if (!w) w = await fetchWeatherViaAI(location);
  if (w && futureDayCount(w.forecast) < 3 && w.source !== 'ai') {
    const aiResult = await fetchWeatherViaAI(location);
    if (aiResult && futureDayCount(aiResult.forecast) >= 3) w = aiResult;
  }
  if (w?.isReal && futureDayCount(w.forecast) >= 3) {
    try { await window.storage.set(cacheKey, JSON.stringify(w)); } catch {}
  }
  return w;
}

function generateMockWeather(location) {
  const climate = location?.climate || 'pacific_temperate';
  const name = location?.name || '東京';
  const m = new Date().getMonth();
  const climateTemps = {
    hokkaido: { high: [-1, 0, 4, 11, 17, 21, 25, 26, 22, 16, 8, 2], low: [-7, -7, -3, 3, 9, 13, 17, 19, 14, 7, 1, -4] },
    tohoku: { high: [3, 4, 8, 14, 19, 23, 26, 28, 24, 18, 12, 6], low: [-3, -3, 0, 5, 11, 16, 20, 21, 16, 9, 3, -1] },
    pacific_temperate: { high: [10, 11, 14, 19, 23, 26, 30, 32, 28, 23, 18, 13], low: [2, 3, 6, 11, 16, 20, 24, 25, 22, 16, 10, 5] },
    japan_sea_temperate: { high: [5, 6, 10, 16, 21, 24, 28, 30, 26, 20, 14, 8], low: [0, 0, 3, 8, 13, 18, 22, 23, 19, 13, 7, 2] },
    subtropical: { high: [19, 19, 21, 24, 26, 29, 32, 32, 30, 27, 24, 20], low: [14, 14, 16, 19, 22, 25, 27, 27, 26, 23, 20, 16] },
  };
  const temps = climateTemps[climate] || climateTemps.pacific_temperate;
  const monthHigh = temps.high[m];
  const monthLow = temps.low[m];
  const days = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    days.push({
      date: d.toISOString().split('T')[0],
      condition: 'cloudy',
      tempHigh: monthHigh + Math.round((i % 2 === 0 ? -1 : 1)),
      tempLow: monthLow + Math.round((i % 2 === 0 ? -1 : 1)),
      rainProb: 30, windSpeed: 3,
    });
  }
  return { today: days[0], forecast: days.slice(1), location: name, isReal: false };
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return 'morning';
  if (h >= 11 && h < 17) return 'daytime';
  if (h >= 17 && h < 20) return 'evening';
  return 'night';
}

const DEFAULT_ADVICE = {
  morning: {
    sunny:  { icon: '🌅', text: '気持ちいい朝！植物の様子をチェックしてみよう' },
    cloudy: { icon: '☁️', text: 'やわらかな朝の光、観察日和です' },
    rainy:  { icon: '☔', text: '雨の朝、植物もうるおって嬉しそう' },
    snowy:  { icon: '❄️', text: '冷え込む朝、寒さから守ってあげよう' },
  },
  daytime: {
    sunny:  { icon: '😊', text: '今日もガーデニング日和！' },
    cloudy: { icon: '⛅', text: '過ごしやすい曇り空、お世話にぴったり' },
    rainy:  { icon: '🌧️', text: '雨の日はお部屋からじっくり観察を' },
    snowy:  { icon: '❄️', text: '雪景色、植物の様子をそっと確認' },
  },
  evening: {
    sunny:  { icon: '🌇', text: '夕方の水やりにちょうどいい時間' },
    cloudy: { icon: '🌆', text: '穏やかな夕暮れ、一日お疲れさま' },
    rainy:  { icon: '☔', text: '雨の夕方、明日もゆっくり育ちますように' },
    snowy:  { icon: '❄️', text: '冷え込む夕方、室内に取り込む準備を' },
  },
  night: {
    sunny:  { icon: '🌙', text: '静かな夜、植物もお休み中' },
    cloudy: { icon: '🌃', text: '今日もお疲れさま、また明日' },
    rainy:  { icon: '🌧️', text: '雨音を聞きながら、ゆっくり休んで' },
    snowy:  { icon: '❄️', text: '雪の夜、植物を寒さから守って' },
  },
};

function getWeatherAdvice(w) {
  const advice = [];
  const tomorrow = w.forecast[0];
  if (tomorrow?.rainProb >= 60) advice.push({ icon: '☔', text: '明日は雨予報！水やりはお休みでOK', type: 'info' });
  if (w.today.windSpeed >= 8) advice.push({ icon: '💨', text: '強風注意！支柱や鉢の固定を確認しよう', type: 'warning' });
  if (w.today.tempHigh >= 28) advice.push({ icon: '🌡️', text: '暑い1日！朝夕にたっぷり水を', type: 'warning' });
  if (w.today.tempLow <= 3) advice.push({ icon: '❄️', text: '冷え込み注意！霜対策を忘れずに', type: 'warning' });
  const noRain = w.forecast.every(d => d.rainProb < 30) && w.today.rainProb < 30;
  const tod = getTimeOfDay();
  if (noRain && advice.length === 0) {
    const noRainText = {
      morning: '晴れ続き！朝のうちに水やりを',
      daytime: '晴れ続き！しっかり水やりしてあげよう',
      evening: '晴れ続き！夕方の涼しい時間に水やりを',
      night: '晴れ続き！明日の朝の水やりを忘れずに',
    }[tod];
    advice.push({ icon: '☀️', text: noRainText, type: 'info' });
  }
  if (advice.length === 0) {
    const cond = w.today.condition || 'cloudy';
    const def = (DEFAULT_ADVICE[tod] && DEFAULT_ADVICE[tod][cond]) || DEFAULT_ADVICE.daytime.sunny;
    advice.push({ ...def, type: 'info' });
  }
  return advice;
}

// ============== データ移行 ==============
function defaultInstances() { return []; }

function migrateData(data) {
  if (!data) return { instances: [], location: DEFAULT_LOCATION };
  let result;
  if (Array.isArray(data.instances)) result = data;
  else if (data.plants && typeof data.plants === 'object') {
    const instances = [];
    Object.entries(data.plants).forEach(([plantTypeId, ps]) => {
      const plant = PLANTS.find(p => p.id === plantTypeId);
      if (!plant) return;
      instances.push({ id: `inst_${plantTypeId}`, plantTypeId, name: plant.name, potSize: ps.potSize || '', records: ps.records || {}, plans: '' });
    });
    result = { instances };
  } else result = { instances: [] };
  result.instances = (result.instances || []).map(inst => {
    if (!inst.records) return inst;
    const r = { ...inst.records };
    const growth = r.growth || [];
    const pruning = r.pruning || [];
    if (growth.length > 0 || pruning.length > 0) {
      const existing = r.care || [];
      r.care = [...existing, ...growth, ...pruning].sort((a, b) => (a.date || '').localeCompare(b.date || ''));
      delete r.growth; delete r.pruning;
    }
    return { ...inst, records: r };
  });
  if (!result.location || typeof result.location !== 'object' ||
      typeof result.location.lat !== 'number' || typeof result.location.lng !== 'number' ||
      !result.location.name || !result.location.climate) {
    result.location = DEFAULT_LOCATION;
  }
  return result;
}

function getMonthlyHarvest(instances) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const byType = {};
  instances.forEach(inst => {
    const harvests = inst.records?.harvest || [];
    const total = harvests.filter(h => new Date(h.date) >= monthStart).reduce((s, h) => s + (parseFloat(h.amount) || 0), 0);
    byType[inst.plantTypeId] = (byType[inst.plantTypeId] || 0) + total;
  });
  return PLANTS.filter(p => p.isHarvested).map(plant => ({
    id: plant.id, name: plant.name,
    amount: Math.round((byType[plant.id] || 0) * 10) / 10,
    color: plant.color,
  })).filter(d => d.amount > 0);
}

// ============== UI部品 ==============
function WeatherSymbol({ condition, size = 24 }) {
  const p = { size };
  if (condition === 'sunny') return <Sun {...p} className="text-yellow-500" />;
  if (condition === 'cloudy') return <CloudSun {...p} className="text-gray-400" />;
  if (condition === 'rainy') return <CloudRain {...p} className="text-blue-400" />;
  if (condition === 'snowy') return <Cloud {...p} className="text-blue-200" />;
  return <Cloud {...p} />;
}

function WeatherCard({ weather, loading, onRefresh }) {
  const advice = getWeatherAdvice(weather);
  const t = weather.today;
  return (
    <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={12} className="text-sky-700" />
        <div className="text-xs font-black text-sky-700">{weather.location}</div>
        {!weather.isReal && !loading && (
          <span className="text-[9px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">概算（オフライン）</span>
        )}
        {weather.isReal && weather.source === 'ai' && !loading && (
          <span className="text-[9px] bg-emerald-200 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold">AI取得</span>
        )}
        {loading && (
          <span className="text-[9px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full font-bold animate-pulse">取得中...</span>
        )}
        <button onClick={onRefresh} disabled={loading}
          className="ml-auto text-sky-600 hover:text-sky-800 disabled:opacity-50 active:scale-95 transition">
          <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <WeatherSymbol condition={t.condition} size={56} />
          <div>
            {t.currentTemp !== undefined ? (
              <>
                <div className="text-3xl font-black text-gray-800 leading-none">
                  {t.currentTemp}°<span className="text-[10px] text-gray-400 font-bold ml-1 align-top">いま</span>
                </div>
                <div className="text-xs text-gray-600 font-bold mt-1.5">
                  {conditionText(t.condition)} <span className="text-gray-400">↑{t.tempHigh}° ↓{t.tempLow}°</span>
                </div>
              </>
            ) : (
              <>
                <div className="text-3xl font-black text-gray-800 leading-none">
                  {t.tempHigh}°<span className="text-base text-gray-500 font-bold">/{t.tempLow}°</span>
                </div>
                <div className="text-sm text-gray-600 font-medium mt-1">{conditionText(t.condition)}</div>
              </>
            )}
          </div>
        </div>
        <div className="text-right space-y-1.5">
          <div className="flex items-center gap-1 text-xs text-gray-600 justify-end bg-white/60 rounded-full px-2 py-1">
            <Droplets size={11} className="text-blue-500" /> {t.rainProb}%
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 justify-end bg-white/60 rounded-full px-2 py-1">
            <Wind size={11} className="text-gray-500" /> {t.windSpeed}m/s
          </div>
        </div>
      </div>
      <div className="flex justify-between mb-3 bg-white/60 rounded-2xl p-2.5">
        {(() => {
          const todayMs = (() => { const d = new Date(); d.setHours(0,0,0,0); return d.getTime(); })();
          const dayDiff = (s) => {
            if (!s) return null;
            const d = new Date(s);
            if (isNaN(d.getTime())) return null;
            d.setHours(0,0,0,0);
            return Math.round((d.getTime() - todayMs) / 86400000);
          };
          const future = (weather.forecast || [])
            .map(d => ({ ...d, _diff: dayDiff(d.date) }))
            .filter(d => d._diff !== null && d._diff >= 1)
            .filter((d, i, arr) => arr.findIndex(x => x._diff === d._diff) === i)
            .sort((a, b) => a._diff - b._diff)
            .slice(0, 3);
          return future.map((d) => {
            const dateLabel = formatDate(d.date);
            const label = d._diff === 1 ? <>明日<span className="text-gray-400">({dateLabel})</span></>
              : d._diff === 2 ? <>明後日<span className="text-gray-400">({dateLabel})</span></>
              : dateLabel;
            return (
              <div key={d._diff} className="text-center flex-1">
                <div className="text-[10px] font-bold text-gray-600 mb-1 leading-tight">{label}</div>
                <div className="flex justify-center mb-1"><WeatherSymbol condition={d.condition} size={22} /></div>
                <div className="text-xs font-bold text-gray-700">{d.tempHigh}°<span className="text-gray-400">/{d.tempLow}°</span></div>
              </div>
            );
          });
        })()}
      </div>
      <div className="space-y-1.5">
        {advice.map((a, i) => (
          <div key={i} className={`flex items-start gap-2 p-2.5 rounded-2xl text-sm ${
            a.type === 'warning' ? 'bg-amber-100 text-amber-900' : 'bg-white/70 text-gray-700'
          }`}>
            <span className="text-base leading-tight">{a.icon}</span>
            <span className="font-medium flex-1 leading-snug">{a.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HarvestTick({ x, y, payload }) {
  const plant = PLANTS.find(p => p.id === payload.value);
  if (!plant) return null;
  const size = 26;
  if (plant.svg) return <g transform={`translate(${x - size / 2}, ${y + 2})`}>{plant.svg(size)}</g>;
  return <text x={x} y={y + 20} fontSize="20" textAnchor="middle">{plant.emoji}</text>;
}

function HarvestChart({ instances }) {
  const data = useMemo(() => getMonthlyHarvest(instances), [instances]);
  const total = data.reduce((s, d) => s + d.amount, 0);
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl p-1.5 shadow-sm">
          <TrendingUp size={16} className="text-white" />
        </div>
        <h2 className="font-black text-gray-800">今月の収穫</h2>
        {total > 0 && <span className="ml-auto text-xs font-bold text-emerald-600">合計 {Math.round(total)}</span>}
      </div>
      {total === 0 ? (
        <div className="text-center py-8">
          <div className="flex justify-center mb-2">{sBasket(40)}</div>
          <div className="text-sm text-gray-500 font-medium">収穫を記録すると、ここに表示されます</div>
        </div>
      ) : (
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 0, left: -18, bottom: 18 }}>
              <XAxis dataKey="id" tick={<HarvestTick />} axisLine={false} tickLine={false} interval={0} height={32} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#888' }} allowDecimals={false} />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v) => [v, '収穫量']}
                labelFormatter={(_, p) => p[0]?.payload?.name || ''}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
                {data.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

function InstanceCard({ instance, onClick }) {
  const plant = getPlant(instance.plantTypeId);
  const records = instance.records || {};
  const lastW = (records.watering || []).slice(-1)[0];
  const dW = lastW ? daysBetween(lastW.date, todayStr()) : null;
  const totalH = (records.harvest || []).reduce((s, h) => s + (parseFloat(h.amount) || 0), 0);
  const needsWater = dW !== null && dW >= plant.wateringInterval;
  return (
    <button onClick={onClick}
      className={`w-full text-left bg-gradient-to-br ${plant.bg} rounded-3xl p-4 shadow-sm hover:scale-[1.03] active:scale-95 transition-transform`}>
      <div className="flex items-center justify-between mb-2">
        <PlantIcon plantId={plant.id} size={36} />
        {needsWater && (
          <div className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">要水やり</div>
        )}
      </div>
      <div className="text-sm font-black text-gray-800 mb-1.5 truncate">{instance.name}</div>
      <div className="text-[10px] text-gray-700 space-y-0.5 font-medium">
        <div className="flex items-center gap-1">
          <Droplets size={10} className="text-blue-500" />
          {lastW ? `${dW}日前` : '記録なし'}
        </div>
        {plant.isHarvested && totalH > 0 && (
          <div className="flex items-center gap-1">
            <Sparkles size={10} className="text-yellow-500" />累計 {totalH.toFixed(1)}
          </div>
        )}
        {instance.potSize && (
          <div className="flex items-center gap-1">
            <span style={{ display: 'inline-flex' }}>{sPot(11)}</span>
            <span>{instance.potSize}</span>
          </div>
        )}
      </div>
    </button>
  );
}

function AddCard({ onClick }) {
  return (
    <button onClick={onClick}
      className="w-full bg-white/60 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 min-h-[140px]">
      <div className="relative">
        {sPot(44)}
        <div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 shadow-md ring-2 ring-white">
          <Plus size={11} className="text-white" strokeWidth={3.5} />
        </div>
      </div>
      <div className="text-xs font-black text-gray-600">鉢を追加</div>
    </button>
  );
}

function AddInstanceModal({ open, onClose, onAdd }) {
  const [plantTypeId, setPlantTypeId] = useState('strawberry');
  const [name, setName] = useState('');
  const [potSize, setPotSize] = useState('');

  useEffect(() => {
    if (open) { setPlantTypeId('strawberry'); setName(''); setPotSize(''); }
  }, [open]);

  if (!open) return null;
  const plant = getPlant(plantTypeId);

  function handleSave() {
    onAdd({ plantTypeId, name: name.trim() || plant.name, potSize: potSize.trim() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">{sPot(24)} 新しい鉢を追加</h3>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2">🌱 植物の種類</label>
            <div className="grid grid-cols-4 gap-1.5">
              {PLANTS.map(p => (
                <button key={p.id} onClick={() => setPlantTypeId(p.id)}
                  className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${
                    plantTypeId === p.id ? `bg-gradient-to-br ${p.bg} ring-2 ${p.ring} scale-105` : 'bg-gray-50'
                  }`}>
                  <PlantIcon plantId={p.id} size={26} />
                  <span className="text-[9px] font-bold text-gray-700 truncate w-full text-center">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className={`bg-gradient-to-br ${plant.bg} rounded-2xl p-4 text-center`}>
            <PlantIcon plantId={plantTypeId} size={48} />
            <div className="text-sm font-black text-gray-800 mt-1">{plant.name}</div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">📛 ニックネーム</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder={`例: ${plant.name}1号、ベランダの${plant.name}`}
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            <div className="text-[10px] text-gray-400 mt-1 font-medium">同じ植物の品種違いも自由に名付けられます！</div>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5 flex items-center gap-1">
              <span style={{ display: 'inline-flex' }}>{sPot(14)}</span>鉢サイズ（任意）
            </label>
            <input type="text" value={potSize} onChange={e => setPotSize(e.target.value)}
              placeholder="例: 7号、30cm"
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 font-black py-3 rounded-2xl active:scale-95 transition-transform">
              キャンセル
            </button>
            <button onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 transition-transform flex items-center justify-center gap-1.5">
              <Plus size={16} strokeWidth={3} />追加する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== ダッシュボード ==============
function DashboardView({ data, weather, weatherLoading, onInstanceSelect, onAddInstance, onRefreshWeather }) {
  const instances = (data.instances || []).filter(i => !i.archived);
  const now = new Date();
  const greeting = now.getHours() < 11 ? 'おはよう' : now.getHours() < 17 ? 'こんにちは' : 'こんばんは';
  const dayJp = ['日', '月', '火', '水', '木', '金', '土'][now.getDay()];
  return (
    <div className="space-y-4 pb-28 px-4 pt-3">
      <div className="px-1">
        <div className="text-xs text-gray-500 font-bold">{now.getMonth() + 1}月{now.getDate()}日 ({dayJp})</div>
        <h1 className="text-2xl font-black text-gray-800 mt-0.5">{greeting}！🌞</h1>
      </div>
      <WeatherCard weather={weather} loading={weatherLoading} onRefresh={onRefreshWeather} />
      <HarvestChart instances={instances} />
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl p-1.5 shadow-sm">
            <Leaf size={16} className="text-white" />
          </div>
          <h2 className="font-black text-gray-800">うちのみどり</h2>
          <span className="ml-auto text-xs font-bold text-gray-500">{instances.length}鉢</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {instances.map(inst => (
            <InstanceCard key={inst.id} instance={inst} onClick={() => onInstanceSelect(inst.id)} />
          ))}
          <AddCard onClick={onAddInstance} />
        </div>
      </div>
    </div>
  );
}

// ============== マップビュー ==============
function MapView({ data, setData, onInstanceSelect, onAddInstance }) {
  const containerRef = useRef(null);
  const [drag, setDrag] = useState(null);
  const [history, setHistory] = useState([]);
  const instances = (data.instances || []).filter(i => !i.archived);

  function getPosition(inst, idx) {
    if (drag?.instanceId === inst.id) return drag.current;
    if (inst.position) return inst.position;
    return getDefaultPosition(idx, instances.length);
  }

  function handlePointerDown(e, inst, currentPos) {
    if (!containerRef.current) return;
    e.stopPropagation();
    const rect = containerRef.current.getBoundingClientRect();
    const pxX = (currentPos.x / 100) * rect.width;
    const pxY = (currentPos.y / 100) * rect.height;
    setDrag({
      instanceId: inst.id, pointerId: e.pointerId,
      offsetX: e.clientX - rect.left - pxX, offsetY: e.clientY - rect.top - pxY,
      start: currentPos, current: currentPos, hasMoved: false,
    });
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
  }

  function handlePointerMove(e) {
    if (!drag || e.pointerId !== drag.pointerId || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pxX = e.clientX - rect.left - drag.offsetX;
    const pxY = e.clientY - rect.top - drag.offsetY;
    const x = Math.max(6, Math.min(94, (pxX / rect.width) * 100));
    const y = Math.max(8, Math.min(92, (pxY / rect.height) * 100));
    const moved = Math.abs(x - drag.start.x) > 1.5 || Math.abs(y - drag.start.y) > 1.5;
    setDrag(d => d ? { ...d, current: { x, y }, hasMoved: d.hasMoved || moved } : d);
  }

  function handlePointerUp() {
    if (!drag) return;
    if (drag.hasMoved) {
      setHistory(h => [...h.slice(-19), instances]);
      setData(prev => ({
        ...prev,
        instances: (prev.instances || []).map(i =>
          i.id === drag.instanceId ? { ...i, position: drag.current } : i
        ),
      }));
    } else {
      onInstanceSelect(drag.instanceId);
    }
    setDrag(null);
  }

  function handleUndo() {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setData(prev => ({ ...prev, instances: last }));
    setHistory(h => h.slice(0, -1));
  }

  return (
    <div className="pb-28 px-4 pt-3 space-y-4">
      <div className="px-1 flex items-end justify-between gap-2">
        <div>
          <div className="text-xs text-gray-500 font-bold">MAP</div>
          <h1 className="text-2xl font-black text-gray-800">配置マップ 🗺️</h1>
          <div className="text-[11px] text-gray-600 font-medium mt-0.5">タップで記録、長押し+ドラッグで移動</div>
        </div>
        <button onClick={onAddInstance}
          className="flex items-center gap-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-black px-3 py-2 rounded-full shadow-sm active:scale-95 transition-transform">
          <Plus size={14} strokeWidth={3}/>追加
        </button>
      </div>

      <div className="relative" style={{ height: '480px' }}>
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 rounded-3xl shadow-inner border-4 border-amber-200/60 overflow-hidden"
          style={{ touchAction: 'none' }}
        >
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
            <defs>
              <pattern id="gridDots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="11" cy="11" r="1.2" fill="#7BC36F" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridDots)" />
          </svg>

          <div className="absolute top-2 right-2 text-2xl opacity-30 pointer-events-none">☀️</div>
          <div className="absolute bottom-2 left-3 text-xl opacity-30 pointer-events-none">🦋</div>

          {instances.map((inst, idx) => {
            const plant = getPlant(inst.plantTypeId);
            const pos = getPosition(inst, idx);
            const isDragging = drag?.instanceId === inst.id;
            return (
              <div
                key={inst.id}
                onPointerDown={e => handlePointerDown(e, inst, pos)}
                className="absolute select-none flex flex-col items-center"
                style={{
                  left: `${pos.x}%`, top: `${pos.y}%`,
                  transform: 'translate(-50%, -50%)',
                  touchAction: 'none',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  zIndex: isDragging ? 30 : 10,
                  transition: isDragging ? 'none' : 'transform 0.15s',
                }}
              >
                <div className={`bg-gradient-to-br ${plant.bg} rounded-full shadow-lg ring-2 ring-white pointer-events-none flex items-center justify-center flex-shrink-0 ${isDragging ? 'scale-110' : ''}`}
                  style={{ width: '52px', height: '52px', boxShadow: isDragging ? '0 8px 20px rgba(0,0,0,0.25)' : '' }}>
                  <PlantIcon plantId={plant.id} size={36} />
                </div>
                <div className="text-[10px] font-black text-center mt-1 bg-white/90 rounded-full px-2 py-0.5 whitespace-nowrap shadow-sm pointer-events-none max-w-[110px] truncate">
                  {inst.name}
                </div>
              </div>
            );
          })}

          {instances.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center text-amber-700">
                <div className="flex justify-center mb-3">{sPot(56)}</div>
                <div className="font-black text-sm">鉢を追加してはじめましょう</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleUndo} disabled={history.length === 0}
          className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-full shadow-sm transition-all ${
            history.length === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50 active:scale-95'
          }`}>
          <RefreshCw size={13} className={history.length > 0 ? 'rotate-[-45deg]' : ''} />
          一つ前に戻す{history.length > 0 && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{history.length}</span>}
        </button>
      </div>

      <div className="bg-blue-50 rounded-2xl p-3 text-xs text-blue-700 font-medium leading-relaxed">
        💡 <strong>ヒント:</strong> 鉢のアイコンをドラッグして好きな位置に並べ替えできます。タップすると記録画面が開きます。間違えても「一つ前に戻す」で取り消せます！
      </div>
    </div>
  );
}

// ============== AI相談チャット ==============
function buildChatSystemPrompt({ plantTypeId, weather, instances, location }) {
  const today = new Date();
  const m = today.getMonth() + 1;
  const seasons = { 12: '冬', 1: '冬', 2: '冬', 3: '春', 4: '春', 5: '春', 6: '梅雨', 7: '夏', 8: '夏', 9: '秋', 10: '秋', 11: '秋' };
  const season = seasons[m];
  const loc = location || DEFAULT_LOCATION || { prefecture: '東京都', name: '東京', climate: 'pacific_temperate' };
  const climateDesc = CLIMATE_DESCRIPTIONS[loc?.climate] || CLIMATE_DESCRIPTIONS.pacific_temperate;
  let prompt = `あなたは家庭菜園と園芸の専門家「ガーデンバディ」です。日本の家庭菜園を楽しむアマチュアの方に、温かく実践的なアドバイスをします。

【今の状況】
場所: ${loc.prefecture || ''}${loc.name || ''}（${climateDesc}）
時期: ${m}月（${season}）`;
  if (weather) {
    prompt += `\n今日の天気: ${conditionText(weather.today.condition)}（${weather.today.tempLow}°〜${weather.today.tempHigh}°、降水確率${weather.today.rainProb}%）
明日の予報: ${conditionText(weather.forecast[0].condition)}（降水確率${weather.forecast[0].rainProb}%）`;
  }
  const activeInstances = (instances || []).filter(i => !i.archived);
  if (activeInstances.length > 0) {
    const allPlants = [...new Set(activeInstances.map(i => getPlant(i.plantTypeId).name))].join('、');
    prompt += `\n育てている植物: ${allPlants}`;
  }
  if (plantTypeId) {
    const plant = getPlant(plantTypeId);
    const sameTypeInstances = activeInstances.filter(i => i.plantTypeId === plantTypeId);
    prompt += `\n\n【今相談している植物】
植物: ${plant.name}
育てている鉢の数: ${sameTypeInstances.length}個`;
    sameTypeInstances.forEach((inst) => {
      prompt += `\n\n■ ${inst.name}`;
      if (inst.potSize) prompt += `（${inst.potSize}）`;
      const records = inst.records || {};
      const recentList = [];
      Object.entries(records).forEach(([type, list]) => {
        if (!list || list.length === 0) return;
        const last = list[list.length - 1];
        const days = daysBetween(last.date, todayStr());
        let entry = `${getRecType(type).name}: ${days}日前`;
        if (last.amount) entry += `（${last.amount}${last.unit || ''}）`;
        recentList.push(entry);
      });
      if (recentList.length > 0) prompt += `\n  最近の記録: ${recentList.join('、')}`;
      if (inst.plans?.trim()) prompt += `\n  予定メモ: ${inst.plans.slice(0, 200)}`;
    });
  }
  prompt += `\n\n【返答ルール】
- 親しみやすい口調で、絵文字も適度に使う🌱
- 簡潔に200-300字程度でまとめる（必要に応じて短い箇条書きOK）
- 専門用語は使わないか、簡単に説明する
- 質問が漠然としている時は、状況を1つだけ聞き返す
- 選択された地域の気候と現在の季節を考慮したアドバイスをする
- 同じ植物の鉢が複数ある場合は、まとめてアドバイスしつつ、必要に応じてニックネームで個別に触れてOK
- 写真は受け取れないことに留意（テキストでの状況説明をお願いする）`;
  return prompt;
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2`}>
      {!isUser && <div className="text-2xl flex-shrink-0 self-end mb-1">🌱</div>}
      <div className={`max-w-[80%] px-4 py-3 rounded-3xl ${
        isUser
          ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-br-md shadow-md'
          : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'
      }`}>
        <div className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</div>
      </div>
    </div>
  );
}

function ChatLoading() {
  return (
    <div className="flex gap-2 justify-start">
      <div className="text-2xl flex-shrink-0 self-end mb-1">🌱</div>
      <div className="bg-white px-4 py-3 rounded-3xl rounded-bl-md shadow-sm border border-gray-100">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}/>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}/>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}/>
        </div>
      </div>
    </div>
  );
}

const SUGGESTED_GENERAL = ['今の時期にやるべき手入れは？', '夏の暑さ対策を教えて', '虫がついた時の対処法は？', '肥料の選び方を知りたい'];
const SUGGESTED_BY_PLANT = {
  blueberry: ['ブルーベリーの実が小さい原因は？', '酸度調整って必要？', '剪定はいつすればいい？'],
  strawberry: ['イチゴのランナー処理について', '花が咲かない原因は？', '実の追熟方法'],
  tomato: ['ミニトマトの脇芽は全部取る？', '実割れの原因と対策', '尻腐れ病って？'],
  raspberry: ['誘引のコツを教えて', '剪定はいつする？', '株分けの方法'],
  fig: ['イチジクの剪定時期は？', '実が落ちる原因は？', '冬越しの方法'],
  nira: ['花芽は摘むべき？', '株分けのタイミング', '冬の管理方法'],
  garlic: ['にんにくの追肥タイミング', '葉が黄色くなってきた', '収穫時期の見分け方'],
  shiso: ['しその葉が硬い時は？', '花穂が出てきた', '葉を増やすコツ'],
  hydrangea: ['色を変える方法は？', '剪定時期と方法', '夏の水やり頻度'],
  marigold: ['花がら摘みのコツ', '夏越しさせる方法', 'コンパニオンプランツ効果'],
  kuushinsai: ['空心菜の収穫タイミング', '葉が小さい原因は？', '何回まで収穫できる？'],
  mitsuba: ['ミツバの再収穫法', '日陰で育つ？', '葉が黄色くなる原因'],
};

function SuggestedQuestions({ plant, onPick }) {
  const questions = plant ? (SUGGESTED_BY_PLANT[plant.id] || SUGGESTED_GENERAL).slice(0, 4) : SUGGESTED_GENERAL;
  return (
    <div className="space-y-2 pt-1">
      <div className="text-xs font-bold text-gray-500 px-2 flex items-center gap-1.5">
        <Sparkles size={11} className="text-amber-500" />よくある質問
      </div>
      {questions.map(q => (
        <button key={q} onClick={() => onPick(q)}
          className="w-full text-left bg-white hover:bg-emerald-50 rounded-2xl p-3 text-sm font-medium text-gray-700 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform">
          💭 {q}
        </button>
      ))}
    </div>
  );
}

function ChatView({ data, weather, chatMessages, setChatMessages, chatSelectedPlantTypeId, setChatSelectedPlantTypeId }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const instances = (data.instances || []).filter(i => !i.archived);

  const uniquePlantTypeIds = useMemo(() => {
    const seen = new Set();
    const result = [];
    instances.forEach(i => {
      if (!seen.has(i.plantTypeId)) {
        seen.add(i.plantTypeId);
        result.push(i.plantTypeId);
      }
    });
    return result;
  }, [instances]);

  const selectedPlant = chatSelectedPlantTypeId ? getPlant(chatSelectedPlantTypeId) : null;

  useEffect(() => {
    if (chatSelectedPlantTypeId && !uniquePlantTypeIds.includes(chatSelectedPlantTypeId)) {
      setChatSelectedPlantTypeId(null);
    }
  }, [uniquePlantTypeIds, chatSelectedPlantTypeId, setChatSelectedPlantTypeId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [chatMessages, loading]);

  async function send(text) {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    const newMessages = [...chatMessages, { role: 'user', content: msg }];
    setChatMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const systemPrompt = buildChatSystemPrompt({ plantTypeId: chatSelectedPlantTypeId, weather, instances, location: data.location });
      const apiMessages = newMessages
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: systemPrompt,
          messages: apiMessages,
        }),
      });

      if (!response.ok) throw new Error('API error');
      const replyData = await response.json();
      const replyText = replyData.content?.find(c => c.type === 'text')?.text
        || replyData.content?.[0]?.text
        || 'すみません、うまく答えられませんでした 🥲';
      setChatMessages([...newMessages, { role: 'assistant', content: replyText }]);
    } catch (e) {
      setChatMessages([...newMessages, {
        role: 'assistant',
        content: '🥲 通信エラーが発生しました。少し時間をおいて、もう一度お試しください。'
      }]);
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setChatMessages([{ role: 'assistant', content: '🌱 こんにちは！家庭菜園のこと、お気軽に聞いてくださいね。植物を選ぶと、その種類に合わせたアドバイスをします。' }]);
  }

  return (
    <div className="pb-40 px-4 pt-3 space-y-3">
      <div className="px-1 flex items-end justify-between">
        <div>
          <div className="text-xs text-gray-500 font-bold">CHAT</div>
          <h1 className="text-2xl font-black text-gray-800">AI相談 🤖</h1>
          <div className="text-[11px] text-gray-500 font-medium mt-0.5">気候・記録を踏まえてアドバイス</div>
        </div>
        {chatMessages.length > 1 && (
          <button onClick={handleClear}
            className="text-xs font-bold text-gray-500 bg-white hover:bg-gray-50 px-3 py-1.5 rounded-full shadow-sm">
            🔄 クリア
          </button>
        )}
      </div>

      <div>
        <div className="text-xs font-bold text-gray-500 mb-2 px-1">どの植物について？（任意）</div>
        <div className="-mx-4 overflow-hidden">
          <div className="overflow-x-auto pb-2"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-2 px-4" style={{ width: 'max-content' }}>
              <button onClick={() => setChatSelectedPlantTypeId(null)}
                className={`flex-shrink-0 px-3 py-2 rounded-2xl font-bold text-sm shadow-sm transition-all ${
                  !chatSelectedPlantTypeId ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white scale-105' : 'bg-white text-gray-600'
                }`}>
                🌍 全般
              </button>
              {uniquePlantTypeIds.map(plantTypeId => {
                const p = getPlant(plantTypeId);
                const active = chatSelectedPlantTypeId === plantTypeId;
                const count = instances.filter(i => i.plantTypeId === plantTypeId).length;
                return (
                  <button key={plantTypeId} onClick={() => setChatSelectedPlantTypeId(plantTypeId)}
                    className={`flex-shrink-0 flex items-center gap-1.5 pl-2 pr-3 py-2 rounded-2xl font-bold text-sm shadow-sm transition-all ${
                      active ? `bg-gradient-to-r ${p.bg} ring-2 ${p.ring} text-gray-800 scale-105` : 'bg-white text-gray-600'
                    }`}>
                    <PlantIcon plantId={p.id} size={20} />
                    <span className="whitespace-nowrap">{p.name}</span>
                    {count > 1 && (
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                        active ? 'bg-white/70 text-gray-700' : 'bg-gray-100 text-gray-500'
                      }`}>×{count}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-1">
        {chatMessages.map((m, i) => <ChatMessage key={i} message={m} />)}
        {loading && <ChatLoading />}
        {chatMessages.length === 1 && !loading && (
          <SuggestedQuestions plant={selectedPlant} onPick={send} />
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-20 left-0 right-0 z-30 px-3">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 items-end bg-white rounded-3xl shadow-xl p-2 border border-gray-100">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={selectedPlant ? `${selectedPlant.name}について質問...` : '質問を入力...'}
              rows={1}
              className="flex-1 px-3 py-2.5 bg-transparent resize-none focus:outline-none text-sm font-medium text-gray-800"
              style={{ maxHeight: '100px' }}
            />
            <button onClick={() => send()} disabled={!input.trim() || loading}
              className="bg-gradient-to-br from-emerald-400 to-green-500 text-white p-2.5 rounded-2xl shadow-md disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition-transform self-end">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== 計画・メモ カード ==============
function PlansCard({ instance, setData }) {
  const [text, setText] = useState(instance?.plans || '');
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => { setText(instance?.plans || ''); }, [instance?.id]);

  useEffect(() => {
    if (!instance) return;
    if (text === (instance.plans || '')) return;
    const timer = setTimeout(() => {
      setData(prev => ({
        ...prev,
        instances: (prev.instances || []).map(i =>
          i.id === instance.id ? { ...i, plans: text } : i
        ),
      }));
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1500);
    }, 700);
    return () => clearTimeout(timer);
  }, [text, instance, setData]);

  if (!instance) return null;

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-gradient-to-br from-amber-400 to-orange-400 rounded-xl p-1.5 shadow-sm">
          <StickyNote size={14} className="text-white" />
        </div>
        <h3 className="text-sm font-black text-gray-700">今後の予定・メモ</h3>
        {savedFlash && (
          <span className="ml-auto flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
            <Check size={10} strokeWidth={3} />保存
          </span>
        )}
      </div>
      <textarea value={text} onChange={e => setText(e.target.value)}
        placeholder={`例：\n・今月：追肥して鳥よけネット設置\n・来月：植え替え予定（ひとまわり大きい鉢へ）\n・夏前に剪定`}
        rows={4}
        className="w-full px-4 py-3 bg-white/80 rounded-2xl text-gray-800 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 resize-none placeholder:text-gray-400 leading-relaxed" />
      <div className="text-[10px] text-amber-700 mt-1.5 font-bold">入力中に自動保存されます ✨</div>
    </div>
  );
}

// ============== 写真ビューワー ==============
function PhotoViewer({ src, onClose }) {
  if (!src) return null;
  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <img src={src} alt="" className="max-w-full max-h-full object-contain rounded-2xl" />
      <button onClick={onClose} className="absolute top-6 right-6 bg-white/20 backdrop-blur rounded-full p-2 active:scale-95">
        <X size={22} className="text-white" />
      </button>
    </div>
  );
}

// ============== 記録ビュー ==============
function RecordView({ data, setData, selectedInstanceId, selectedRecordType, setSelectedInstanceId, setSelectedRecordType, mode, setMode }) {
  const allInstances = data.instances || [];
  const activeInstances = allInstances.filter(i => !i.archived);
  const archivedInstances = allInstances.filter(i => i.archived);
  const isArchiveMode = mode === 'archive';
  const visibleInstances = isArchiveMode ? archivedInstances : activeInstances;

  const instance = visibleInstances.find(i => i.id === selectedInstanceId) || visibleInstances[0];
  const plant = instance ? getPlant(instance.plantTypeId) : PLANTS[0];
  const recordType = getRecType(selectedRecordType);

  const [date, setDate] = useState(todayStr());
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState(defaultUnit(selectedRecordType));
  const [note, setNote] = useState('');
  const [potSize, setPotSize] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoError, setPhotoError] = useState(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [confirmDel, setConfirmDel] = useState(null);
  const [viewingPhoto, setViewingPhoto] = useState(null);

  useEffect(() => {
    if (instance && instance.id !== selectedInstanceId) {
      setSelectedInstanceId(instance.id);
    }
    // eslint-disable-next-line
  }, [mode]);

  useEffect(() => {
    setDate(todayStr()); setAmount(''); setNote(''); setPotSize(''); setConfirmDel(null);
    setPhoto(null); setPhotoError(null);
    setUnit(defaultUnit(selectedRecordType));
  }, [selectedInstanceId, selectedRecordType]);

  useEffect(() => {
    if (!confirmDel) return;
    const t = setTimeout(() => setConfirmDel(null), 5000);
    return () => clearTimeout(t);
  }, [confirmDel]);

  const records = instance ? (instance.records?.[recordType.id] || []) : [];

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setPhotoError(null);
    try {
      const dataUrl = await compressImageToDataUrl(file);
      setPhoto(dataUrl);
    } catch (err) {
      console.error(err);
      setPhotoError('写真の処理に失敗しました');
    }
  }

  function handleSubmit() {
    if (!instance || isArchiveMode) return;
    const newRecord = { id: newId('rec'), date, note: note.trim() };
    if (recordType.id === 'harvest' || recordType.id === 'fertilizer') {
      newRecord.amount = amount || '0';
      newRecord.unit = unit || defaultUnit(recordType.id);
    }
    if (recordType.id === 'repotting') newRecord.potSize = potSize;
    if (photo) newRecord.photo = photo;

    setData(prev => {
      const newInsts = (prev.instances || []).map(i => {
        if (i.id !== instance.id) return i;
        const newRecords = { ...(i.records || {}) };
        newRecords[recordType.id] = [...(newRecords[recordType.id] || []), newRecord]
          .sort((a, b) => a.date.localeCompare(b.date));
        const next = { ...i, records: newRecords };
        if (recordType.id === 'repotting' && potSize) next.potSize = potSize;
        return next;
      });
      return { ...prev, instances: newInsts };
    });
    setAmount(''); setNote(''); setPotSize(''); setPhoto(null); setPhotoError(null);
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }

  function handleDelete(recordId) {
    if (!instance) return;
    setData(prev => ({
      ...prev,
      instances: (prev.instances || []).map(i => {
        if (i.id !== instance.id) return i;
        const newRecords = { ...(i.records || {}) };
        newRecords[recordType.id] = (newRecords[recordType.id] || []).filter(r => r.id !== recordId);
        return { ...i, records: newRecords };
      }),
    }));
  }

  function handleUnarchive() {
    if (!instance) return;
    setData(prev => ({
      ...prev,
      instances: (prev.instances || []).map(i =>
        i.id === instance.id ? { ...i, archived: false } : i
      ),
    }));
    setMode('active');
  }

  if (visibleInstances.length === 0) {
    return (
      <div className="pb-28 px-4 pt-3 space-y-4">
        <div className="px-1 flex items-end justify-between">
          <div>
            <div className="text-xs text-gray-500 font-bold">RECORD</div>
            <h1 className="text-2xl font-black text-gray-800">記録する 📝</h1>
          </div>
          <div className="bg-white rounded-full p-1 shadow-sm flex">
            <button onClick={() => setMode('active')}
              className={`text-xs font-black px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                !isArchiveMode ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white' : 'text-gray-500'
              }`}>
              🌱 育成中
            </button>
            <button onClick={() => setMode('archive')}
              className={`text-xs font-black px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                isArchiveMode ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' : 'text-gray-500'
              }`}>
              <Archive size={11} strokeWidth={3} />アーカイブ
              {archivedInstances.length > 0 && (
                <span className="bg-white/30 px-1 rounded-full text-[9px]">{archivedInstances.length}</span>
              )}
            </button>
          </div>
        </div>

        <div className="pt-10 text-center">
          <div className="flex justify-center mb-3">{isArchiveMode ? <Archive size={56} className="text-gray-300" /> : sPot(56)}</div>
          <div className="text-base font-black text-gray-700">
            {isArchiveMode ? 'アーカイブはまだ空です' : '鉢がまだありません'}
          </div>
          <div className="text-sm text-gray-500 mt-1 leading-relaxed">
            {isArchiveMode
              ? '設定画面から鉢をアーカイブすると、ここに過去の記録が表示されます'
              : 'ホーム画面から鉢を追加してください'}
          </div>
        </div>
      </div>
    );
  }

  const showAmount = recordType.id === 'harvest' || recordType.id === 'fertilizer';
  const showPotSize = recordType.id === 'repotting';

  return (
    <div className="pb-28 px-4 pt-3 space-y-4">
      <div className="px-1 flex items-end justify-between gap-2">
        <div>
          <div className="text-xs text-gray-500 font-bold">RECORD</div>
          <h1 className="text-2xl font-black text-gray-800">記録する 📝</h1>
        </div>
        <div className="bg-white rounded-full p-1 shadow-sm flex flex-shrink-0">
          <button onClick={() => setMode('active')}
            className={`text-xs font-black px-3 py-1.5 rounded-full transition-all ${
              !isArchiveMode ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white' : 'text-gray-500'
            }`}>
            🌱 育成中
            {activeInstances.length > 0 && (
              <span className={`ml-1 px-1 rounded-full text-[9px] ${!isArchiveMode ? 'bg-white/30' : 'bg-gray-100'}`}>
                {activeInstances.length}
              </span>
            )}
          </button>
          <button onClick={() => setMode('archive')}
            className={`text-xs font-black px-3 py-1.5 rounded-full transition-all flex items-center gap-1 ${
              isArchiveMode ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white' : 'text-gray-500'
            }`}>
            <Archive size={11} strokeWidth={3} />アーカイブ
            {archivedInstances.length > 0 && (
              <span className={`px-1 rounded-full text-[9px] ${isArchiveMode ? 'bg-white/30' : 'bg-gray-100'}`}>
                {archivedInstances.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {isArchiveMode && (
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
          <Archive size={18} className="text-amber-700 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
          <div className="flex-1 min-w-0">
            <div className="text-xs font-black text-amber-900 mb-0.5">📦 アーカイブモード（閲覧専用）</div>
            <div className="text-[11px] text-amber-800 font-medium leading-snug">
              過去の記録を見ることができます。新しい記録の追加や編集はできません。
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="text-xs font-bold text-gray-500 mb-2 px-1">
          {isArchiveMode ? 'アーカイブ済みの鉢' : 'どの鉢を記録する？'}
        </div>
        <div className="-mx-4 overflow-hidden">
          <div className="overflow-x-auto pb-2"
            style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <div className="flex gap-2 px-4" style={{ width: 'max-content' }}>
              {visibleInstances.map(inst => {
                const p = getPlant(inst.plantTypeId);
                const active = instance?.id === inst.id;
                return (
                  <button key={inst.id} onClick={() => setSelectedInstanceId(inst.id)}
                    className={`flex-shrink-0 flex items-center gap-1.5 pl-2 pr-3.5 py-2 rounded-2xl font-bold text-sm transition-all shadow-sm ${
                      active ? `bg-gradient-to-r ${p.bg} ring-2 ${p.ring} text-gray-800 scale-105` : 'bg-white text-gray-600'
                    }`}>
                    <PlantIcon plantId={p.id} size={22} />
                    <span className="whitespace-nowrap">{inst.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {instance && (
        <div className={`bg-gradient-to-br ${plant.bg} rounded-3xl p-5 text-center shadow-sm relative ${isArchiveMode ? 'opacity-90' : ''}`}>
          <div className="flex justify-center mb-1"><PlantIcon plantId={plant.id} size={68} /></div>
          <div className="text-xl font-black text-gray-800 flex items-center justify-center gap-1.5">
            {instance.name}
            {isArchiveMode && <Archive size={16} className="text-gray-600" strokeWidth={2.5} />}
          </div>
          <div className="text-xs text-gray-700 mt-1 font-bold flex items-center justify-center gap-1">
            <span>{plant.name}</span>
            {instance.potSize && (
              <>
                <span>・</span>
                <span style={{ display: 'inline-flex' }}>{sPot(13)}</span>
                <span>{instance.potSize}</span>
              </>
            )}
          </div>
          {isArchiveMode && (
            <button onClick={handleUnarchive}
              className="mt-3 inline-flex items-center gap-1.5 bg-white text-amber-700 font-black text-xs px-4 py-2 rounded-full shadow-sm hover:bg-amber-50 active:scale-95 transition-all">
              <ArrowLeft size={13} strokeWidth={3} />育成中に戻す
            </button>
          )}
        </div>
      )}

      {!isArchiveMode && instance && (
        <PlansCard instance={instance} setData={setData} />
      )}

      <div className="grid grid-cols-3 gap-2">
        {RECORD_TYPES.map(rt => (
          <button key={rt.id} onClick={() => setSelectedRecordType(rt.id)}
            className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl font-bold text-[11px] transition-all shadow-sm ${
              selectedRecordType === rt.id ? `${rt.color} ring-2 scale-105` : 'bg-white text-gray-500'
            }`}>
            <RecordIcon recordTypeId={rt.id} size={30} />
            <span>{rt.name}</span>
          </button>
        ))}
      </div>

      {!isArchiveMode && instance && (
        <div className="bg-white rounded-3xl p-5 space-y-3 shadow-sm">
          <div className="text-sm font-black text-gray-700 flex items-center gap-1.5">
            <RecordIcon recordTypeId={recordType.id} size={20} />{recordType.name}を記録
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">📅 日付</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          {showAmount && (
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1">
                {recordType.id === 'harvest' ? <><span style={{ display: 'inline-flex' }}>{sBasket(16)}</span>収穫量</> : <>🌱 追肥量</>}
              </label>
              <div className="flex gap-2">
                <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" inputMode="decimal"
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                <input type="text" value={unit} onChange={e => setUnit(e.target.value)}
                  placeholder={defaultUnit(recordType.id)}
                  className="w-24 px-3 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300 text-center" />
              </div>
              {recordType.id === 'harvest' && (
                <div className="text-[10px] text-gray-400 mt-1 font-medium">単位は g、本、束 などに変更できます</div>
              )}
            </div>
          )}
          {showPotSize && (
            <div>
              <label className="text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1">
                <span style={{ display: 'inline-flex' }}>{sPot(14)}</span>新しい鉢サイズ
              </label>
              <input type="text" value={potSize} onChange={e => setPotSize(e.target.value)} placeholder="例: 7号、30cm、Lサイズ"
                className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">📝 メモ</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={2}
              placeholder={
                recordType.id === 'pesticide' ? '例: ベニカX。アブラムシ対策' :
                recordType.id === 'watering' ? '例: 葉色も良好' :
                recordType.id === 'care' ? '例: 徒長枝を剪定、新芽を3つ確認、害虫チェックOK' :
                recordType.id === 'harvest' ? '例: 甘くて美味しい！' :
                recordType.id === 'fertilizer' ? '例: 緩効性肥料を株元に' :
                recordType.id === 'repotting' ? '例: 根がよく回っていた' :
                'メモ（任意）'
              }
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none" />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 mb-1.5 flex items-center gap-1.5">
              <Camera size={13} className="text-cyan-500" />写真（任意）
            </label>
            {photo ? (
              <div className="relative">
                <img src={photo} alt="" className="w-full rounded-2xl object-cover border border-gray-200" style={{ maxHeight: '280px' }} />
                <button onClick={() => setPhoto(null)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 active:scale-90 transition">
                  <X size={16} className="text-red-500" />
                </button>
              </div>
            ) : (
              <label className="block">
                <div className="w-full rounded-2xl p-6 text-center cursor-pointer border-2 border-dashed bg-gray-50 hover:bg-gray-100 border-gray-300 transition active:scale-[0.98]">
                  <div className="flex justify-center mb-2">
                    <Camera size={28} className="text-gray-400" />
                  </div>
                  <div className="text-xs font-black text-gray-600">📷 写真を撮影 / 選択</div>
                  <div className="text-[10px] text-gray-400 mt-1 font-medium">タップしてカメラ起動 / アルバムから選択</div>
                </div>
                <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handlePhotoChange} />
              </label>
            )}
            {photoError && <div className="text-[10px] text-red-500 mt-1 font-bold">{photoError}</div>}
          </div>
          <button onClick={handleSubmit}
            className={`w-full font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 text-white ${
              savedFlash ? 'bg-gradient-to-r from-emerald-500 to-green-600' :
              'bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600'
            }`}>
            {savedFlash ? <><Check size={18} strokeWidth={3} /> 保存しました！</> : <><Sparkles size={18} />記録する</>}
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <CalendarIcon size={16} className="text-gray-500" />
          <h3 className="text-sm font-black text-gray-700">{recordType.name}の履歴</h3>
          <span className="ml-auto text-xs font-bold text-gray-500">{records.length}件</span>
        </div>
        {records.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            <div className="text-3xl mb-2">📝</div>記録がありません
          </div>
        ) : (
          <div className="space-y-2">
            {records.slice().reverse().slice(0, 30).map(r => (
              <div key={r.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                <div className="flex-shrink-0"><RecordIcon recordTypeId={recordType.id} size={22} /></div>
                {r.photo && (
                  <button onClick={() => setViewingPhoto(r.photo)} className="flex-shrink-0 active:scale-95 transition">
                    <img src={r.photo} alt="" className="w-14 h-14 rounded-xl object-cover shadow-sm" />
                  </button>
                )}
                <div className="flex-1 text-sm min-w-0">
                  <div className="font-black text-gray-800">{formatDate(r.date)}</div>
                  <div className="text-xs text-gray-600 truncate font-medium">
                    {r.amount && `${r.amount}${r.unit || ''}`}
                    {r.potSize && r.potSize}
                    {r.note && ` ${(r.amount || r.potSize) ? '・' : ''}${r.note}`}
                    {!r.amount && !r.note && !r.potSize && (r.photo ? '📷 写真記録' : '記録済み')}
                  </div>
                </div>
                {!isArchiveMode && (
                  confirmDel === r.id ? (
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button onClick={() => setConfirmDel(null)}
                        className="text-[11px] font-black px-2.5 py-2 bg-gray-200 text-gray-700 rounded-xl active:scale-95">
                        キャンセル
                      </button>
                      <button onClick={() => { handleDelete(r.id); setConfirmDel(null); }}
                        className="text-[11px] font-black px-2.5 py-2 bg-red-500 text-white rounded-xl shadow-sm active:scale-95">
                        削除
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDel(r.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors active:scale-90">
                      <X size={18} />
                    </button>
                  )
                )}
              </div>
            ))}
            {records.length > 30 && (
              <div className="text-center text-xs text-gray-400 pt-2 font-medium">他 {records.length - 30}件</div>
            )}
          </div>
        )}
      </div>

      <PhotoViewer src={viewingPhoto} onClose={() => setViewingPhoto(null)} />
    </div>
  );
}

// ============== 地域選択モーダル ==============
function LocationModal({ open, current, onClose, onSelect }) {
  const [search, setSearch] = useState('');
  const [selectedPrefecture, setSelectedPrefecture] = useState(null);
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  useEffect(() => {
    if (open) {
      setSelectedPrefecture(current?.prefecture || null);
      setSearch('');
      setGeoError(null);
    }
  }, [open, current]);

  if (!open) return null;

  const filteredCities = search
    ? CITIES.filter(c => {
        const q = search.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.prefecture.toLowerCase().includes(q);
      })
    : selectedPrefecture
      ? CITIES.filter(c => c.prefecture === selectedPrefecture)
      : [];

  function handleGeoLocation() {
    if (!navigator.geolocation) {
      setGeoError('お使いのブラウザは位置情報に対応していません');
      return;
    }
    setGeoLoading(true);
    setGeoError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nearest = findNearestCity(pos.coords.latitude, pos.coords.longitude);
        setGeoLoading(false);
        if (nearest) {
          onSelect(nearest);
          onClose();
        } else {
          setGeoError('近くの登録地点が見つかりませんでした');
        }
      },
      () => {
        setGeoLoading(false);
        setGeoError('位置情報を取得できませんでした');
      },
      { timeout: 10000 }
    );
  }

  function handleSelectCity(city) {
    onSelect(city);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}>
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <MapPin size={20} className="text-emerald-600" />地域を選ぶ
            </h3>
            <button type="button" onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>

          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">🔍</span>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="市区町村名で検索（例：横浜、京都）"
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>

          <button type="button" onClick={handleGeoLocation} disabled={geoLoading}
            className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-black text-sm py-2.5 rounded-2xl active:scale-95 transition disabled:opacity-50">
            <MapPin size={15} className={geoLoading ? 'animate-pulse' : ''} />
            {geoLoading ? '取得中...' : '現在地から近い地域を選ぶ'}
          </button>
          {geoError && <div className="text-[11px] text-red-600 font-bold">{geoError}</div>}

          {!search && (
            <div>
              <div className="text-xs font-black text-gray-500 mb-2">都道府県</div>
              <div className="flex flex-wrap gap-1.5">
                {PREFECTURES.map(pref => (
                  <button type="button" key={pref}
                    onClick={() => setSelectedPrefecture(pref)}
                    className={`text-[11px] font-black px-2.5 py-1.5 rounded-full active:scale-95 transition ${
                      selectedPrefecture === pref
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}>
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredCities.length > 0 && (
            <div>
              <div className="text-xs font-black text-gray-500 mb-2">
                {search ? `検索結果 (${filteredCities.length}件)` : `${selectedPrefecture || ''}の市区町村`}
              </div>
              <div className="space-y-1.5">
                {filteredCities.map(city => {
                  const isSelected = current && city.name === current.name && city.prefecture === current.prefecture;
                  return (
                    <button type="button" key={`${city.prefecture}-${city.name}`}
                      onClick={() => handleSelectCity(city)}
                      className={`w-full text-left flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        isSelected ? 'bg-gradient-to-r from-emerald-100 to-green-100 ring-2 ring-emerald-400' : 'bg-gray-50 hover:bg-gray-100'
                      } active:scale-[0.98]`}>
                      <MapPin size={16} className={isSelected ? 'text-emerald-600' : 'text-gray-400'} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-black text-gray-800 truncate">{city.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold">{city.prefecture}</div>
                      </div>
                      {isSelected && <Check size={16} className="text-emerald-600 flex-shrink-0" strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {filteredCities.length === 0 && (
            <div className="text-center py-6 text-gray-400 text-sm font-bold">
              {search
                ? '該当する地域が見つかりません'
                : selectedPrefecture
                  ? 'この都道府県には登録地点がありません'
                  : '都道府県を選んでください'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============== 設定 ==============
function SettingsView({ data, setData, onAddInstance, location, onLocationChange }) {
  if (!location || typeof location !== 'object') location = DEFAULT_LOCATION;
  const [importStatus, setImportStatus] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPot, setEditPot] = useState('');
  const [confirmInstDel, setConfirmInstDel] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [reorderMode, setReorderMode] = useState(false);
  const [draggedId, setDraggedId] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);
  const [locationModalOpen, setLocationModalOpen] = useState(false);

  const instances = data.instances || [];

  function handleRowPointerDown(e, instId) {
    if (!reorderMode) return;
    setDraggedId(instId);
    setDragOverId(instId);
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
  }

  function handleRowPointerMove(e) {
    if (!draggedId) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    let target = el;
    while (target && !target.dataset?.instId) {
      target = target.parentElement;
    }
    if (target?.dataset.instId) {
      setDragOverId(target.dataset.instId);
    } else {
      setDragOverId(draggedId);
    }
  }

  function handleRowPointerUp() {
    if (draggedId && dragOverId && draggedId !== dragOverId) {
      setData(prev => {
        const list = [...(prev.instances || [])];
        const fromIdx = list.findIndex(i => i.id === draggedId);
        const toIdx = list.findIndex(i => i.id === dragOverId);
        if (fromIdx === -1 || toIdx === -1) return prev;
        if (!!list[fromIdx].archived !== !!list[toIdx].archived) return prev;
        const [moved] = list.splice(fromIdx, 1);
        list.splice(toIdx, 0, moved);
        return { ...prev, instances: list };
      });
    }
    setDraggedId(null);
    setDragOverId(null);
  }

  useEffect(() => {
    if (!confirmInstDel) return;
    const t = setTimeout(() => setConfirmInstDel(null), 5000);
    return () => clearTimeout(t);
  }, [confirmInstDel]);
  useEffect(() => {
    if (!confirmReset) return;
    const t = setTimeout(() => setConfirmReset(false), 5000);
    return () => clearTimeout(t);
  }, [confirmReset]);

  function handleExport() {
    const { loaded, ...toSave } = data;
    const blob = new Blob([JSON.stringify(toSave, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `garden-buddy-backup-${todayStr()}.json`;
    a.click(); URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target.result);
        const migrated = migrateData(parsed);
        setData({ ...migrated, loaded: true });
        setImportStatus({ type: 'success', message: '✅ バックアップを読み込みました！' });
      } catch {
        setImportStatus({ type: 'error', message: '❌ ファイルの読み込みに失敗しました' });
      }
      setTimeout(() => setImportStatus(null), 3000);
    };
    reader.readAsText(file); e.target.value = '';
  }

  function handleResetAll() {
    setData(prev => ({ ...prev, instances: defaultInstances(), loaded: true }));
    setConfirmReset(false);
  }

  function handleDeleteInstance(id) {
    setData(prev => ({ ...prev, instances: (prev.instances || []).filter(i => i.id !== id) }));
    setConfirmInstDel(null);
  }

  function startEdit(inst) {
    setEditingId(inst.id); setEditName(inst.name); setEditPot(inst.potSize || '');
  }

  function saveEdit() {
    setData(prev => ({
      ...prev,
      instances: (prev.instances || []).map(i =>
        i.id === editingId ? { ...i, name: editName.trim() || i.name, potSize: editPot.trim() } : i
      ),
    }));
    setEditingId(null);
  }

  const totalRecords = instances.reduce((s, inst) =>
    s + Object.values(inst.records || {}).reduce((a, r) => a + (r?.length || 0), 0), 0);
  const recordedCount = instances.filter(i =>
    Object.values(i.records || {}).some(r => r?.length > 0)).length;
  const totalPhotos = instances.reduce((s, inst) =>
    s + Object.values(inst.records || {}).reduce((a, r) => a + (r || []).filter(rec => rec.photo).length, 0), 0);

  return (
    <div className="pb-28 px-4 pt-3 space-y-4">
      <div className="px-1">
        <div className="text-xs text-gray-500 font-bold">SETTINGS</div>
        <h1 className="text-2xl font-black text-gray-800">設定 ⚙️</h1>
      </div>

      {/* 地域セクション */}
      <div className="bg-white rounded-3xl p-5 space-y-3 shadow-sm">
        <h3 className="font-black text-gray-800 flex items-center gap-1.5">
          <MapPin size={18} className="text-emerald-600" />地域
        </h3>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0">
            <MapPin size={18} className="text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-black text-gray-800 truncate">{location.name}</div>
            <div className="text-[10px] text-gray-500 font-bold">{location.prefecture}</div>
          </div>
          <button onClick={() => setLocationModalOpen(true)}
            className="flex-shrink-0 bg-emerald-500 text-white font-black text-xs px-3 py-2 rounded-full shadow-sm active:scale-95 transition">
            変更
          </button>
        </div>
        <div className="text-[10px] text-gray-500 font-medium leading-relaxed px-1">
          天気予報とAIアドバイスはこの地域に基づきます
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-3xl p-3 shadow-sm">
          <div className="text-2xl mb-0.5">📝</div>
          <div className="text-[10px] text-gray-600 font-bold">記録</div>
          <div className="text-xl font-black text-emerald-800">{totalRecords}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-100 to-rose-100 rounded-3xl p-3 shadow-sm">
          <div className="mb-0.5">{sPot(28)}</div>
          <div className="text-[10px] text-gray-600 font-bold">育てている鉢</div>
          <div className="text-xl font-black text-pink-800">{recordedCount}<span className="text-xs">/{instances.length}</span></div>
        </div>
        <div className="bg-gradient-to-br from-cyan-100 to-blue-100 rounded-3xl p-3 shadow-sm">
          <div className="mb-0.5"><Camera size={26} className="text-cyan-700" /></div>
          <div className="text-[10px] text-gray-600 font-bold">写真</div>
          <div className="text-xl font-black text-cyan-800">{totalPhotos}</div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-gray-800 flex items-center gap-1.5">
            <span style={{ display: 'inline-flex' }}>{sPot(22)}</span>鉢の管理
          </h3>
          <div className="flex gap-1.5">
            {reorderMode ? (
              <button onClick={() => { setReorderMode(false); setDraggedId(null); setDragOverId(null); }}
                className="flex items-center gap-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">
                <Check size={14} strokeWidth={3} />完了
              </button>
            ) : (
              <>
                {instances.length >= 2 && (
                  <button onClick={() => { setReorderMode(true); setEditingId(null); setConfirmInstDel(null); }}
                    className="flex items-center gap-1 bg-purple-100 text-purple-700 text-xs font-black px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">
                    <GripVertical size={13} strokeWidth={2.5} />並び替え
                  </button>
                )}
                <button onClick={onAddInstance}
                  className="flex items-center gap-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-sm active:scale-95 transition-transform">
                  <Plus size={14} strokeWidth={3} />追加
                </button>
              </>
            )}
          </div>
        </div>
        {instances.length === 0 ? (
          <div className="text-center py-6 text-gray-400 text-sm">
            <div className="flex justify-center mb-2">{sPot(40)}</div>鉢を追加してはじめましょう
          </div>
        ) : (
          <div className="space-y-2">
            {(() => {
              const toggleArchive = (inst) => {
                setData(prev => ({
                  ...prev,
                  instances: (prev.instances || []).map(i =>
                    i.id === inst.id ? { ...i, archived: !i.archived } : i
                  ),
                }));
              };
              const renderRow = (inst) => {
                const plant = getPlant(inst.plantTypeId);
                if (editingId === inst.id) {
                  return (
                    <div key={inst.id} className={`p-3 rounded-2xl bg-gradient-to-r ${plant.bg} space-y-2`}>
                      <div className="flex items-center gap-2">
                        <PlantIcon plantId={plant.id} size={28} />
                        <div className="text-xs font-bold text-gray-700">{plant.name}</div>
                      </div>
                      <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                        placeholder="ニックネーム"
                        className="w-full px-3 py-2 bg-white/80 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white" />
                      <input type="text" value={editPot} onChange={e => setEditPot(e.target.value)}
                        placeholder="鉢サイズ（任意）"
                        className="w-full px-3 py-2 bg-white/80 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-white" />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingId(null)}
                          className="flex-1 bg-white/80 text-gray-700 font-black py-2 rounded-xl text-sm active:scale-95">
                          キャンセル
                        </button>
                        <button onClick={saveEdit}
                          className="flex-1 bg-emerald-500 text-white font-black py-2 rounded-xl text-sm shadow-sm active:scale-95 flex items-center justify-center gap-1">
                          <Check size={14} strokeWidth={3} />保存
                        </button>
                      </div>
                    </div>
                  );
                }
                if (reorderMode) {
                  const isDragging = draggedId === inst.id;
                  const isDragOver = dragOverId === inst.id && draggedId && draggedId !== inst.id;
                  return (
                    <div key={inst.id}
                      data-inst-id={inst.id}
                      onPointerDown={(e) => handleRowPointerDown(e, inst.id)}
                      onPointerMove={handleRowPointerMove}
                      onPointerUp={handleRowPointerUp}
                      onPointerCancel={handleRowPointerUp}
                      style={{ touchAction: 'none' }}
                      className={`flex items-center gap-3 p-3 rounded-2xl select-none transition-all ${
                        isDragging ? 'bg-emerald-100 ring-2 ring-emerald-400 shadow-lg scale-[1.02] cursor-grabbing relative z-10' :
                        isDragOver ? 'bg-emerald-50 ring-2 ring-emerald-300 cursor-grab' :
                        'bg-gray-50 cursor-grab hover:bg-gray-100'
                      } ${inst.archived ? 'opacity-65' : ''}`}>
                      <GripVertical size={20} className="text-gray-400 flex-shrink-0 pointer-events-none" />
                      <PlantIcon plantId={plant.id} size={32} />
                      <div className="flex-1 min-w-0 pointer-events-none">
                        <div className="text-sm font-black text-gray-800 truncate">{inst.name}</div>
                        <div className="text-[10px] text-gray-500 font-bold truncate">
                          {plant.name}{inst.potSize && ` ・ ${inst.potSize}`}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={inst.id} className={`flex items-center gap-3 p-3 bg-gray-50 rounded-2xl ${inst.archived ? 'opacity-65' : ''}`}>
                    <PlantIcon plantId={plant.id} size={32} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-black text-gray-800 truncate">{inst.name}</div>
                      <div className="text-[10px] text-gray-500 font-bold truncate">
                        {plant.name}{inst.potSize && ` ・ ${inst.potSize}`}
                      </div>
                    </div>
                    {confirmInstDel === inst.id ? (
                      <div className="flex gap-1 flex-shrink-0">
                        <button onClick={() => setConfirmInstDel(null)}
                          className="text-[10px] font-black px-2 py-1.5 bg-gray-200 text-gray-700 rounded-lg active:scale-95">
                          やめる
                        </button>
                        <button onClick={() => handleDeleteInstance(inst.id)}
                          className="text-[10px] font-black px-2 py-1.5 bg-red-500 text-white rounded-lg shadow-sm active:scale-95">
                          削除
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-0.5 flex-shrink-0">
                        <button onClick={() => startEdit(inst)}
                          className="text-gray-500 hover:text-emerald-600 p-2 rounded-full hover:bg-emerald-50 transition-colors active:scale-90"
                          title="編集">
                          <Edit3 size={15} />
                        </button>
                        <button onClick={() => toggleArchive(inst)}
                          title={inst.archived ? "復元する" : "アーカイブ（過去の記録として保管）"}
                          className="text-gray-500 hover:text-amber-600 p-2 rounded-full hover:bg-amber-50 transition-colors active:scale-90 text-base leading-none">
                          {inst.archived ? '⏪' : '📦'}
                        </button>
                        <button onClick={() => setConfirmInstDel(inst.id)}
                          className="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 transition-colors active:scale-90"
                          title="削除">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                );
              };
              const activeList = instances.filter(i => !i.archived);
              const archivedList = instances.filter(i => i.archived);
              return (
                <>
                  {reorderMode && (
                    <div className="bg-purple-50 rounded-2xl p-3 text-xs text-purple-700 font-medium leading-relaxed flex items-start gap-2">
                      <GripVertical size={16} className="text-purple-500 flex-shrink-0 mt-0.5" />
                      <span>鉢をドラッグして順番を入れ替えできます。同じグループ内（育成中／アーカイブ）でのみ移動可能です。終わったら右上の「完了」を押してください。</span>
                    </div>
                  )}
                  {activeList.map(renderRow)}
                  {archivedList.length > 0 && (
                    <>
                      <div className="text-[10px] font-black text-gray-500 mt-3 mb-1 px-1 flex items-center gap-1.5 flex-wrap">
                        <span className="flex items-center gap-1">📦 アーカイブ済み ({archivedList.length})</span>
                        <span className="text-[9px] font-medium text-gray-400">記録画面のアーカイブで閲覧可能</span>
                      </div>
                      {archivedList.map(renderRow)}
                    </>
                  )}
                </>
              );
            })()}
          </div>
        )}
      </div>

      <div className="bg-white rounded-3xl p-5 space-y-3 shadow-sm">
        <h3 className="font-black text-gray-800 mb-1">💾 データ管理</h3>
        <button onClick={handleExport}
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-500 text-white font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform">
          <Download size={18} />JSONでバックアップ
        </button>
        <label className="block">
          <div className="w-full bg-gradient-to-r from-purple-400 to-pink-500 text-white font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-transform">
            <Upload size={18} />バックアップから復元
          </div>
          <input type="file" accept=".json,application/json" className="hidden" onChange={handleImport} />
        </label>
        {importStatus && (
          <div className={`p-3 rounded-2xl text-sm font-bold ${
            importStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>{importStatus.message}</div>
        )}
        {confirmReset ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 space-y-3">
            <div className="text-sm font-black text-red-800 text-center">⚠️ すべての記録と鉢が削除されます</div>
            <div className="text-xs text-red-700 text-center font-medium">この操作は取り消せません</div>
            <div className="flex gap-2">
              <button onClick={() => setConfirmReset(false)}
                className="flex-1 bg-white text-gray-700 font-black py-2.5 rounded-xl active:scale-95">
                キャンセル
              </button>
              <button onClick={handleResetAll}
                className="flex-1 bg-red-500 text-white font-black py-2.5 rounded-xl shadow-md active:scale-95">
                削除する
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setConfirmReset(true)}
            className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-black py-3.5 rounded-2xl flex items-center justify-center gap-2 active:scale-95 transition-transform">
            <Trash2 size={18} />すべてリセット
          </button>
        )}
      </div>

      <div className="bg-white rounded-3xl p-5 text-xs text-gray-500 space-y-2 shadow-sm">
        <h3 className="font-black text-gray-800 text-sm mb-1">ℹ️ このアプリについて</h3>
        <p className="font-bold text-emerald-700">🌱 みどりのある暮らし v2.3</p>
        <p className="font-medium">家庭菜園を楽しく続けるためのPWAです🌸</p>
        <p className="font-medium">天気予報は{location.name}から取得しています</p>
        <p className="pt-2 text-gray-400 leading-relaxed">
          データはこの端末内に安全に保存されます。<br />
          機種変更前は必ずバックアップを取ってくださいね。
        </p>
      </div>

      <LocationModal open={locationModalOpen} current={location}
        onClose={() => setLocationModalOpen(false)} onSelect={onLocationChange} />
    </div>
  );
}

// ============== ボトムナビ ==============
function BottomNav({ view, onChange }) {
  const tabs = [
    { id: 'dashboard', icon: Home, label: 'ホーム' },
    { id: 'map', icon: MapIcon, label: 'マップ' },
    { id: 'record', icon: ClipboardList, label: '記録' },
    { id: 'chat', icon: MessageCircle, label: '相談' },
    { id: 'settings', icon: SettingsIcon, label: '設定' },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 pointer-events-none">
      <div className="max-w-md mx-auto p-3 pointer-events-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 px-1.5 py-2 flex justify-around">
          {tabs.map(t => {
            const Icon = t.icon;
            const active = view === t.id;
            return (
              <button key={t.id} onClick={() => onChange(t.id)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-2xl transition-all ${
                  active ? 'bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-700 scale-105' : 'text-gray-400'
                }`}>
                <Icon size={18} strokeWidth={active ? 2.5 : 2} />
                <span className={`text-[10px] ${active ? 'font-black' : 'font-bold'}`}>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============== ルート ==============
export default function GardenBuddy() {
  const [data, setData] = useState({ instances: [], location: DEFAULT_LOCATION, loaded: false });
  const [storageReady, setStorageReady] = useState(false);
  const [view, setView] = useState('dashboard');
  const [selectedInstanceId, setSelectedInstanceId] = useState(null);
  const [selectedRecordType, setSelectedRecordType] = useState('watering');
  const [recordMode, setRecordMode] = useState('active');
  const [weather, setWeather] = useState(generateMockWeather(DEFAULT_LOCATION));
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: '🌱 こんにちは!家庭菜園のこと、お気軽に聞いてくださいね。植物を選ぶと、その鉢に合わせたアドバイスをします。' }
  ]);
  const [chatSelectedPlantTypeId, setChatSelectedPlantTypeId] = useState(null);

  // 現在の地域（参照用）
  const currentLocation = data.location || DEFAULT_LOCATION;

  // ストレージからデータ読み込み
  useEffect(() => {
    let cancelled = false;
    let won = false;
    const finalize = (loadedData) => {
      if (cancelled || won) return;
      won = true;
      const instances = loadedData?.instances || defaultInstances();
      const location = loadedData?.location || DEFAULT_LOCATION;
      setData({ instances, location, loaded: true });
      const firstActive = instances.find(i => !i.archived);
      if (firstActive) setSelectedInstanceId(firstActive.id);
      setStorageReady(true);
    };
    const timer = setTimeout(() => finalize(null), 4000);
    window.storage.get('garden-buddy-data')
      .then(result => {
        if (won) return;
        clearTimeout(timer);
        if (result?.value) {
          try {
            const migrated = migrateData(JSON.parse(result.value));
            finalize(migrated);
          } catch { finalize(null); }
        } else { finalize(null); }
      })
      .catch(() => {
        if (won) return;
        clearTimeout(timer);
        finalize(null);
      });
    return () => { cancelled = true; clearTimeout(timer); };
  }, []);

  // 現在の地域に基づいて天気を取得（手動更新ボタン用）
  async function loadWeather() {
    setWeatherLoading(true);
    const w = await fetchWeatherSmart(currentLocation);
    if (w) setWeather(w);
    setWeatherLoading(false);
  }

  // 地域の変更（または初回ロード完了）に追従して天気を再取得
  useEffect(() => {
    if (!storageReady) return;
    let cancelled = false;
    const loc = currentLocation;

    // 地域が変わった瞬間、見た目を即時に概算へ差し替え（取得中表示にする）
    setWeather(prev => (prev?.location === loc.name ? prev : generateMockWeather(loc)));
    setWeatherLoading(true);

    (async () => {
      const w = await fetchWeatherSmart(loc);
      if (cancelled) return;
      if (w) setWeather(w);
      setWeatherLoading(false);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.location, storageReady]);

  // データ保存
  useEffect(() => {
    if (!storageReady) return;
    (async () => {
      try {
        const { loaded, ...toSave } = data;
        await window.storage.set('garden-buddy-data', JSON.stringify(toSave));
      } catch (e) { console.error('Save failed', e); }
    })();
  }, [data, storageReady]);

  function handleInstanceSelect(instanceId, recordType) {
    setSelectedInstanceId(instanceId);
    if (recordType) setSelectedRecordType(recordType);
    setRecordMode('active');
    setView('record');
  }

  function handleAddInstance(payload) {
    const newInst = {
      id: newId('inst'),
      plantTypeId: payload.plantTypeId,
      name: payload.name,
      potSize: payload.potSize,
      records: {},
      plans: '',
    };
    setData(prev => ({ ...prev, instances: [...(prev.instances || []), newInst] }));
    setSelectedInstanceId(newInst.id);
    setRecordMode('active');
  }

  // 地域変更ハンドラー
  function handleLocationChange(newLocation) {
    if (!newLocation || typeof newLocation !== 'object') return;
    setData(prev => ({ ...prev, location: newLocation }));
  }

  if (!data.loaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-pink-50 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-6xl mb-3 animate-bounce">🌱</div>
          <div className="text-emerald-700 font-black mb-1">よみこみ中...</div>
          <div className="text-xs text-emerald-600 font-medium">初回は少しだけ時間がかかります</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-pink-50">
      <div className="max-w-md mx-auto relative">
        <div className="px-4 pt-4 pb-1 flex items-center gap-2">
          <div className="text-2xl">🌱</div>
          <div className="font-black text-lg bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
            みどりのある暮らし
          </div>
          <div className="ml-auto flex items-center gap-1 bg-white/70 backdrop-blur rounded-full px-2.5 py-1">
            <MapPin size={10} className="text-emerald-600" />
            <span className="text-[10px] font-black text-gray-600">{currentLocation.name}</span>
          </div>
        </div>

        {view === 'dashboard' && (
          <DashboardView data={data} weather={weather} weatherLoading={weatherLoading}
            onInstanceSelect={handleInstanceSelect}
            onAddInstance={() => setShowAddModal(true)}
            onRefreshWeather={loadWeather} />
        )}
        {view === 'map' && (
          <MapView data={data} setData={setData}
            onInstanceSelect={handleInstanceSelect}
            onAddInstance={() => setShowAddModal(true)} />
        )}
        {view === 'record' && (
          <RecordView data={data} setData={setData}
            selectedInstanceId={selectedInstanceId} selectedRecordType={selectedRecordType}
            setSelectedInstanceId={setSelectedInstanceId} setSelectedRecordType={setSelectedRecordType}
            mode={recordMode} setMode={setRecordMode} />
        )}
        {view === 'chat' && (
          <ChatView data={data} weather={weather}
            chatMessages={chatMessages} setChatMessages={setChatMessages}
            chatSelectedPlantTypeId={chatSelectedPlantTypeId} setChatSelectedPlantTypeId={setChatSelectedPlantTypeId} />
        )}
        {view === 'settings' && (
          <SettingsView data={data} setData={setData}
            onAddInstance={() => setShowAddModal(true)}
            location={currentLocation}
            onLocationChange={handleLocationChange} />
        )}

        <BottomNav view={view} onChange={setView} />
      </div>

      <AddInstanceModal open={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddInstance} />
    </div>
  );
}
