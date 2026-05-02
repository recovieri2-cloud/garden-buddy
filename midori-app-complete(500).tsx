import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Home, ClipboardList, Settings as SettingsIcon, Sun, CloudRain, CloudSun, Cloud, Wind, Droplets,
  Download, Upload, Trash2, Sparkles, TrendingUp, X, Leaf, Plus, Edit3, Check, MapPin,
  Map as MapIcon, MessageCircle, Send, RefreshCw, Archive, ArrowLeft, Search, ChevronDown, ChevronRight,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

// ============== SVG アイコン ==============
const sBlueberry = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="13" cy="6" rx="2" ry="3" fill="#5A9A3A" transform="rotate(-30 13 6)"/>
    <ellipse cx="19" cy="6" rx="2" ry="3" fill="#5A9A3A" transform="rotate(30 19 6)"/>
    <line x1="16" y1="4" x2="16" y2="12" stroke="#3F6F2A" strokeWidth="1.2"/>
    <circle cx="11" cy="17" r="5.5" fill="#3B5998"/><circle cx="21" cy="17" r="5.5" fill="#3B5998"/>
    <circle cx="16" cy="22" r="6" fill="#4A6BAB"/>
    <circle cx="11" cy="14" r="1.4" fill="#1A2D4D" opacity="0.7"/>
    <circle cx="21" cy="14" r="1.4" fill="#1A2D4D" opacity="0.7"/>
    <circle cx="16" cy="19" r="1.4" fill="#1A2D4D" opacity="0.7"/>
  </svg>
);
const sFig = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 16 11 C 22 11 26 16 26 21 C 26 26 22 29 16 29 C 10 29 6 26 6 21 C 6 16 10 11 16 11 Z" fill="#6B3F8C"/>
    <path d="M 12 5 L 20 5 L 16 11 Z" fill="#5A9A3A"/>
    <path d="M 9 7 L 14 9 L 11 12 Z" fill="#6BB048"/>
    <path d="M 23 7 L 18 9 L 21 12 Z" fill="#6BB048"/>
  </svg>
);
const sRaspberry = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <line x1="16" y1="4" x2="16" y2="11" stroke="#5A9A3A" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="11" cy="14" r="2.6" fill="#D63A5A"/><circle cx="16" cy="13" r="2.6" fill="#E04A6E"/>
    <circle cx="21" cy="14" r="2.6" fill="#D63A5A"/><circle cx="9" cy="18" r="2.6" fill="#B82847"/>
    <circle cx="13" cy="17.5" r="2.6" fill="#E04A6E"/><circle cx="19" cy="17.5" r="2.6" fill="#E04A6E"/>
    <circle cx="23" cy="18" r="2.6" fill="#B82847"/><circle cx="11" cy="22" r="2.6" fill="#D63A5A"/>
    <circle cx="16" cy="22" r="2.6" fill="#B82847"/><circle cx="21" cy="22" r="2.6" fill="#D63A5A"/>
  </svg>
);
const sNira = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 8 28 Q 7 18 5 4" stroke="#3F8B2E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <path d="M 12 28 Q 11 16 10 3" stroke="#52B788" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <path d="M 16 28 L 16 2" stroke="#3F8B2E" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <path d="M 20 28 Q 21 16 22 3" stroke="#52B788" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
    <path d="M 24 28 Q 25 18 27 4" stroke="#3F8B2E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    <ellipse cx="16" cy="28" rx="11" ry="1.5" fill="#7A5A3A"/>
  </svg>
);
const sHydrangea = (s) => {
  const fl = [[10,8,'#9B7FED'],[16,6,'#7B68EE'],[22,8,'#A78BD4'],[7,13,'#7B68EE'],[13,11,'#A78BD4'],[19,11,'#9B7FED'],[25,13,'#7B68EE'],[10,17,'#A78BD4'],[16,16,'#9B7FED'],[22,17,'#7B68EE'],[13,21,'#7B68EE'],[19,21,'#A78BD4']];
  return (
    <svg width={s} height={s} viewBox="0 0 32 32">
      <ellipse cx="9" cy="26" rx="5" ry="2.2" fill="#3F8B2E" transform="rotate(-25 9 26)"/>
      <ellipse cx="23" cy="26" rx="5" ry="2.2" fill="#3F8B2E" transform="rotate(25 23 26)"/>
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
    {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
      <ellipse key={`o${a}`} cx="16" cy="6" rx="2.5" ry="4.5" fill="#FFD700" transform={`rotate(${a} 16 16)`}/>
    ))}
    {[15,45,75,105,135,165,195,225,255,285,315,345].map(a => (
      <ellipse key={`m${a}`} cx="16" cy="9" rx="2.2" ry="3.5" fill="#FFEC4F" transform={`rotate(${a} 16 16)`}/>
    ))}
    <circle cx="16" cy="16" r="2.2" fill="#F59E0B"/>
  </svg>
);
const sPot = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 8 13 L 24 13 L 22 27 Q 22 28 21 28 L 11 28 Q 10 28 10 27 Z" fill="#C97E5F"/>
    <rect x="5" y="10" width="22" height="4" rx="1.5" fill="#D69377"/>
    <ellipse cx="16" cy="11" rx="11" ry="1.8" fill="#A86347"/>
  </svg>
);
const sBasket = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <circle cx="10" cy="13" r="2.8" fill="#E63946"/>
    <path d="M 17 11.5 Q 14.8 11.5 14.8 14 Q 14.8 17 17 17 Q 19.2 17 19.2 14 Q 19.2 11.5 17 11.5 Z" fill="#E94560"/>
    <path d="M 21 11.5 L 26 11.5 L 23.5 17 Z" fill="#FF8C42"/>
    <circle cx="6" cy="15" r="1.7" fill="#3B5998"/><circle cx="7.8" cy="14.2" r="1.4" fill="#4A6BAB"/>
    <path d="M 4 17 L 28 17 L 26 28.5 Q 26 29.5 25 29.5 L 7 29.5 Q 6 29.5 6 28.5 Z" fill="#B8804A"/>
    <ellipse cx="16" cy="17" rx="12" ry="1.6" fill="#9A6633"/>
    <rect x="3.5" y="16" width="25" height="2.2" rx="0.8" fill="#D4A574"/>
    <path d="M 7 19.5 Q 16 21 25 19.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/>
    <path d="M 7 22.5 Q 16 24 25 22.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/>
    <path d="M 7.5 25.5 Q 16 27 24.5 25.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/>
  </svg>
);
const sKuushinsai = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="16" cy="29" rx="6" ry="1.2" fill="#7A5A3A"/>
    <path d="M 16 29 L 16 16" stroke="#4A8B3A" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    <path d="M 16 22 Q 13 18 9 14" stroke="#4A8B3A" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M 16 22 Q 19 18 23 14" stroke="#4A8B3A" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
    <path d="M 16 16 L 13 11 L 14 6 L 16 4 L 18 6 L 19 11 Z" fill="#52B788"/>
    <path d="M 9 14 L 5 12 L 4 8 L 6 6 L 9 7 L 11 11 Z" fill="#6BC990"/>
    <path d="M 23 14 L 27 12 L 28 8 L 26 6 L 23 7 L 21 11 Z" fill="#6BC990"/>
  </svg>
);
const sCare = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 13.5 14.5 Q 9 9 3 5.5 Q 1.5 5 2 7.5 Q 7 11.5 12 15.5 Z" fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.3"/>
    <path d="M 13.5 17.5 Q 9 23 3 26.5 Q 1.5 27 2 24.5 Q 7 20.5 12 16.5 Z" fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.3"/>
    <path d="M 16 14 Q 21 10.5 28 6 Q 30 5 30 7.5 Q 28 11 22.5 14.5 Q 18 16.5 16 16 Z" fill="#D5DBDB" stroke="#5C2D17" strokeWidth="1.3"/>
    <path d="M 16 18 Q 22 18.5 29 17.5 Q 30.5 17.5 30 19.5 Q 28 21.5 22 21 Q 18 20 16 19 Z" fill="#EAEDED" stroke="#5C2D17" strokeWidth="1.3"/>
    <circle cx="14.5" cy="16" r="2.6" fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.2"/>
    <circle cx="14.5" cy="16" r="1" fill="#3A1810"/>
  </svg>
);
const sBean = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 6 19 Q 6 8 16 7 Q 26 8 26 19 Q 23 21 16 20 Q 9 21 6 19 Z" fill="#6BC990" stroke="#3F8B2E" strokeWidth="1"/>
    <circle cx="10" cy="14" r="2.5" fill="#52B788" opacity="0.7"/>
    <circle cx="16" cy="12" r="2.8" fill="#52B788" opacity="0.7"/>
    <circle cx="22" cy="14" r="2.5" fill="#52B788" opacity="0.7"/>
  </svg>
);
const sGinger = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="16" cy="18" rx="6" ry="4" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.7"/>
    <ellipse cx="9" cy="20" rx="3" ry="2" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.5" transform="rotate(-30 9 20)"/>
    <ellipse cx="23" cy="20" rx="3" ry="2" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.5" transform="rotate(30 23 20)"/>
  </svg>
);
const sKaki = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="16" cy="20" rx="9" ry="8" fill="#FF8C42" stroke="#D4651F" strokeWidth="0.7"/>
    <path d="M 11 12 L 13 9 L 16 11 L 19 9 L 21 12 L 18 14 L 16 13 L 14 14 Z" fill="#5A8B3A"/>
  </svg>
);
const sPurpleFlower = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <line x1="16" y1="30" x2="16" y2="18" stroke="#3F8B2E" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="16" cy="9" rx="3.5" ry="4.5" fill="#9B7FED"/>
    <ellipse cx="22" cy="13" rx="4.5" ry="3.5" fill="#7B68EE"/>
    <ellipse cx="20" cy="20" rx="4" ry="3.5" fill="#9B7FED"/>
    <ellipse cx="12" cy="20" rx="4" ry="3.5" fill="#9B7FED"/>
    <ellipse cx="10" cy="13" rx="4.5" ry="3.5" fill="#7B68EE"/>
    <circle cx="16" cy="14" r="2" fill="#FFE869"/>
  </svg>
);
const sHouseplant = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <ellipse cx="16" cy="9" rx="2.2" ry="6" fill="#3F8B2E"/>
    <ellipse cx="10" cy="11" rx="2" ry="5" fill="#52B788" transform="rotate(-35 10 11)"/>
    <ellipse cx="22" cy="11" rx="2" ry="5" fill="#52B788" transform="rotate(35 22 11)"/>
    <path d="M 9 18 L 23 18 L 21.5 28 Q 21.5 29.5 20 29.5 L 12 29.5 Q 10.5 29.5 10.5 28 Z" fill="#C97E5F"/>
    <rect x="8" y="16" width="16" height="3" rx="1" fill="#D69377"/>
  </svg>
);
const sSucculent = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <g transform="translate(16,18)">
      <ellipse cx="0" cy="-9" rx="2.2" ry="5.5" fill="#52B788"/>
      <ellipse cx="6.4" cy="-6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(40)"/>
      <ellipse cx="9" cy="0" rx="2.2" ry="5.5" fill="#52B788" transform="rotate(80)"/>
      <ellipse cx="6.4" cy="6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(125)"/>
      <ellipse cx="0" cy="9" rx="2.2" ry="5.5" fill="#52B788" transform="rotate(180)"/>
      <ellipse cx="-6.4" cy="6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(220)"/>
      <ellipse cx="-9" cy="0" rx="2.2" ry="5.5" fill="#52B788" transform="rotate(260)"/>
      <ellipse cx="-6.4" cy="-6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(310)"/>
    </g>
    <circle cx="16" cy="18" r="1.8" fill="#9DD88A"/>
  </svg>
);
const sLeaf = (s) => (
  <svg width={s} height={s} viewBox="0 0 32 32">
    <path d="M 16 4 Q 26 8 26 18 Q 26 28 16 28 Q 6 28 6 18 Q 6 8 16 4 Z" fill="#52B788"/>
    <path d="M 16 4 L 16 28" stroke="#3F8B2E" strokeWidth="0.8"/>
  </svg>
);

const SVG_ICONS = {
  blueberry: sBlueberry, fig: sFig, raspberry: sRaspberry, nira: sNira,
  hydrangea: sHydrangea, marigold: sMarigold, kuushinsai: sKuushinsai,
  bean: sBean, ginger: sGinger, kaki: sKaki,
  purpleFlower: sPurpleFlower, houseplant: sHouseplant, succulent: sSucculent,
  leaf: sLeaf,
};

// ============== 植物マスター ==============
const PLANTS = [
  { id: 'blueberry',  name: 'ブルーベリー',     svg: sBlueberry, color: '#4A6BAB', bg: 'from-blue-100 to-indigo-200',    ring: 'ring-blue-300',    wateringInterval: 2, fertilizerInterval: 30, isHarvested: true },
  { id: 'strawberry', name: 'イチゴ',           emoji: '🍓',     color: '#E94560', bg: 'from-pink-100 to-red-200',       ring: 'ring-rose-300',    wateringInterval: 2, fertilizerInterval: 14, isHarvested: true },
  { id: 'fig',        name: 'イチジク',         svg: sFig,       color: '#6B3F8C', bg: 'from-purple-100 to-fuchsia-200', ring: 'ring-purple-300',  wateringInterval: 3, fertilizerInterval: 30, isHarvested: true },
  { id: 'raspberry',  name: 'ラズベリー',       svg: sRaspberry, color: '#D63A5A', bg: 'from-rose-100 to-pink-200',      ring: 'ring-pink-300',    wateringInterval: 2, fertilizerInterval: 21, isHarvested: true },
  { id: 'nira',       name: 'ニラ',             svg: sNira,      color: '#52B788', bg: 'from-green-100 to-emerald-200',  ring: 'ring-emerald-300', wateringInterval: 2, fertilizerInterval: 21, isHarvested: true },
  { id: 'garlic',     name: 'にんにく',         emoji: '🧄',     color: '#D4A574', bg: 'from-amber-100 to-yellow-200',   ring: 'ring-amber-300',   wateringInterval: 4, fertilizerInterval: 30, isHarvested: true },
  { id: 'shiso',      name: 'しそ',             emoji: '🍃',     color: '#9B59B6', bg: 'from-violet-100 to-purple-200',  ring: 'ring-violet-300',  wateringInterval: 1, fertilizerInterval: 14, isHarvested: true },
  { id: 'kuushinsai', name: '空心菜',           svg: sKuushinsai,color: '#52B788', bg: 'from-lime-100 to-green-200',     ring: 'ring-lime-300',    wateringInterval: 1, fertilizerInterval: 14, isHarvested: true },
  { id: 'tomato',     name: 'ミニトマト',       emoji: '🍅',     color: '#E63946', bg: 'from-red-100 to-orange-200',     ring: 'ring-red-300',     wateringInterval: 1, fertilizerInterval: 14, isHarvested: true },
  { id: 'hydrangea',  name: 'アジサイ',         svg: sHydrangea, color: '#7B68EE', bg: 'from-sky-100 to-blue-200',       ring: 'ring-sky-300',     wateringInterval: 1, fertilizerInterval: 30, isHarvested: false },
  { id: 'marigold',   name: 'マリーゴールド',   svg: sMarigold,  color: '#FFD700', bg: 'from-yellow-100 to-orange-200',  ring: 'ring-yellow-300',  wateringInterval: 2, fertilizerInterval: 21, isHarvested: false },
];

const RECORD_TYPES = [
  { id: 'watering',   name: '水やり',     emoji: '💧',  color: 'bg-sky-100 text-sky-700' },
  { id: 'care',       name: 'お手入れ',   svg: sCare,   color: 'bg-emerald-100 text-emerald-700' },
  { id: 'harvest',    name: '収穫',       svg: sBasket, color: 'bg-rose-100 text-rose-700' },
  { id: 'fertilizer', name: '追肥',       emoji: '🌱',  color: 'bg-green-100 text-green-700' },
  { id: 'pesticide',  name: '農薬',       emoji: '🧴',  color: 'bg-purple-100 text-purple-700' },
  { id: 'repotting',  name: '植え替え',   svg: sPot,    color: 'bg-amber-100 text-amber-700' },
];

// ============== カタログ(主要種を厳選) ==============
const CATEGORY_DEFAULTS = {
  vh: { water:2, fert:14, harvest:true,  label:'野菜・ハーブ',   bg:'from-green-100 to-emerald-200',  ring:'ring-emerald-300', color:'#52B788' },
  ft: { water:3, fert:30, harvest:true,  label:'果樹',           bg:'from-rose-100 to-pink-200',      ring:'ring-pink-300',    color:'#E94560' },
  ww: { water:3, fert:30, harvest:false, label:'花木・庭木',     bg:'from-pink-100 to-fuchsia-200',   ring:'ring-fuchsia-300', color:'#C026D3' },
  af: { water:2, fert:21, harvest:false, label:'一年草・草花',   bg:'from-yellow-100 to-orange-200',  ring:'ring-yellow-300',  color:'#F59E0B' },
  pf: { water:2, fert:21, harvest:false, label:'多年草',         bg:'from-purple-100 to-pink-200',    ring:'ring-purple-300',  color:'#9333EA' },
  hp: { water:4, fert:30, harvest:false, label:'観葉植物',       bg:'from-emerald-100 to-teal-200',   ring:'ring-teal-300',    color:'#14B8A6' },
  sc: { water:10,fert:60, harvest:false, label:'多肉・サボテン', bg:'from-amber-100 to-yellow-200',   ring:'ring-amber-300',   color:'#D4A574' },
};

const TOP_CATEGORIES = [
  { id:'tab_vh', name:'野菜・ハーブ',   icon:'🥬', subs:['vh'] },
  { id:'tab_fw', name:'果樹・花木',     icon:'🍎', subs:['ft','ww'] },
  { id:'tab_fh', name:'花・観葉植物',   icon:'🌸', subs:['af','pf','hp'] },
  { id:'tab_sc', name:'多肉・サボテン', icon:'🌵', subs:['sc'] },
];

const CATALOG_GROUPS = [
  {c:'vh',f:'ナス科',d:'🍆',p:[{n:'トマト',e:'🍅'},{n:'ナス'},{n:'ピーマン'},{n:'シシトウ',e:'🌶️'},{n:'鷹の爪',e:'🌶️'},{n:'ジャガイモ',e:'🥔'}]},
  {c:'vh',f:'アブラナ科',d:'🥬',p:[{n:'キャベツ'},{n:'ブロッコリー',e:'🥦'},{n:'ハクサイ'},{n:'コマツナ'},{n:'ミズナ'},{n:'チンゲンサイ'},{n:'カブ'},{n:'ラディッシュ'},{n:'ルッコラ'},{n:'ダイコン'},{n:'ケール'}]},
  {c:'vh',f:'セリ科',d:'🌿',p:[{n:'ニンジン',e:'🥕'},{n:'セロリ'},{n:'パセリ'},{n:'ミツバ'},{n:'ディル'},{n:'パクチー'}]},
  {c:'vh',f:'シソ科ハーブ',d:'🌿',p:[{n:'バジル'},{n:'ミント'},{n:'レモンバーム'},{n:'ローズマリー'},{n:'タイム'},{n:'セージ'},{n:'オレガノ'}]},
  {c:'vh',f:'ヒガンバナ科',d:'🧅',p:[{n:'タマネギ'},{n:'ネギ'},{n:'九条ネギ'},{n:'ワケギ'}]},
  {c:'vh',f:'ウリ科',d:'🥒',p:[{n:'キュウリ'},{n:'ズッキーニ'},{n:'カボチャ',e:'🎃'},{n:'スイカ',e:'🍉'},{n:'メロン',e:'🍈'},{n:'ゴーヤ'}]},
  {c:'vh',f:'マメ科',d:'🫘',p:[{n:'エダマメ',s:'bean'},{n:'ソラマメ',s:'bean'},{n:'スナップエンドウ',s:'bean'},{n:'インゲン',s:'bean'},{n:'ラッカセイ',e:'🥜'}]},
  {c:'vh',f:'キク科',d:'🥬',p:[{n:'レタス'},{n:'サニーレタス'},{n:'シュンギク'},{n:'ゴボウ'}]},
  {c:'vh',f:'ヒユ科',d:'🥬',p:[{n:'ホウレンソウ'},{n:'スイスチャード'},{n:'ビーツ'}]},
  {c:'vh',f:'イネ科',d:'🌾',p:[{n:'トウモロコシ',e:'🌽'},{n:'レモングラス'}]},
  {c:'vh',f:'ショウガ科',d:'🫚',p:[{n:'ショウガ',s:'ginger'},{n:'ミョウガ',s:'ginger'},{n:'ターメリック',s:'ginger'}]},
  {c:'vh',f:'その他野菜',d:'🌿',p:[{n:'アスパラガス'},{n:'オクラ'},{n:'モロヘイヤ'},{n:'サツマイモ',e:'🍠'},{n:'サトイモ'},{n:'ヤマイモ'}]},
  {c:'ft',f:'バラ科',d:'🍑',p:[{n:'桃'},{n:'リンゴ',e:'🍎'},{n:'和ナシ',e:'🍐'},{n:'サクランボ',e:'🍒'},{n:'ブラックベリー'}]},
  {c:'ft',f:'ミカン科',d:'🍊',p:[{n:'温州ミカン'},{n:'レモン',e:'🍋'},{n:'ユズ',e:'🍋'},{n:'スダチ',e:'🍋'},{n:'キンカン'}]},
  {c:'ft',f:'カキノキ科',d:'🌳',p:[{n:'富有柿',s:'kaki'},{n:'次郎柿',s:'kaki'}]},
  {c:'ft',f:'ブドウ科',d:'🍇',p:[{n:'巨峰'},{n:'シャインマスカット'},{n:'デラウェア'}]},
  {c:'ft',f:'その他果樹',d:'🌳',p:[{n:'アボカド',e:'🥑'},{n:'バナナ',e:'🍌'},{n:'マンゴー',e:'🥭'},{n:'オリーブ'},{n:'ザクロ'}]},
  {c:'ww',f:'バラ科(花木)',d:'🌹',p:[{n:'バラ'},{n:'ソメイヨシノ',e:'🌸'},{n:'河津桜',e:'🌸'},{n:'花桃',e:'🌸'},{n:'花梅',e:'🌸'}]},
  {c:'ww',f:'ツツジ科',d:'🌺',p:[{n:'ツツジ'},{n:'サツキ'},{n:'シャクナゲ'}]},
  {c:'ww',f:'モクセイ科',d:'🌼',p:[{n:'キンモクセイ'},{n:'ライラック',s:'purpleFlower'}]},
  {c:'ww',f:'その他花木',d:'🌳',p:[{n:'ハナミズキ',e:'🌸'},{n:'フジ',s:'purpleFlower'},{n:'ハイビスカス',e:'🌺'},{n:'ブーゲンビリア',e:'🌺'},{n:'ミモザ',e:'🌼'}]},
  {c:'af',f:'キク科',d:'🌼',p:[{n:'ヒマワリ',e:'🌻'},{n:'コスモス',e:'🌸'},{n:'ジニア'},{n:'ガーベラ'},{n:'マーガレット'}]},
  {c:'af',f:'ナス科観賞',d:'🌸',p:[{n:'ペチュニア'},{n:'カリブラコア'}]},
  {c:'af',f:'スミレ科',d:'🌸',p:[{n:'パンジー'},{n:'ビオラ'}]},
  {c:'af',f:'その他草花',d:'🌸',p:[{n:'アサガオ'},{n:'ニチニチソウ'},{n:'インパチェンス'},{n:'シクラメン'},{n:'プリムラ'}]},
  {c:'pf',f:'シソ科宿根',d:'💜',p:[{n:'ラベンダー',s:'purpleFlower'},{n:'サルビア',s:'purpleFlower'}]},
  {c:'pf',f:'ユリ科',d:'🌸',p:[{n:'カサブランカ'},{n:'スカシユリ'},{n:'チューリップ',e:'🌷'}]},
  {c:'pf',f:'アヤメ科',d:'💜',p:[{n:'アヤメ',s:'purpleFlower'},{n:'ハナショウブ',s:'purpleFlower'}]},
  {c:'pf',f:'その他宿根',d:'🌸',p:[{n:'ホスタ',e:'🌿'},{n:'シャクヤク'},{n:'クリスマスローズ'},{n:'ヒアシンス'}]},
  {c:'hp',f:'サトイモ科',d:'🪴',p:[{n:'ポトス',s:'houseplant'},{n:'モンステラ',s:'houseplant'},{n:'スパティフィラム',s:'houseplant'},{n:'アンスリウム',e:'🌺'}]},
  {c:'hp',f:'クワ科',d:'🪴',p:[{n:'ベンジャミン',s:'houseplant'},{n:'ゴムの木',s:'houseplant'},{n:'ウンベラータ',s:'houseplant'}]},
  {c:'hp',f:'キジカクシ科',d:'🪴',p:[{n:'ドラセナ',s:'houseplant'},{n:'幸福の木',s:'houseplant'},{n:'サンスベリア',s:'houseplant'},{n:'ユッカ',s:'houseplant'}]},
  {c:'hp',f:'ヤシ科',d:'🌴',p:[{n:'テーブルヤシ'},{n:'アレカヤシ'}]},
  {c:'hp',f:'シダ植物',d:'🌿',p:[{n:'アジアンタム'},{n:'ボストンファン'},{n:'コウモリラン'}]},
  {c:'hp',f:'その他観葉',d:'🪴',p:[{n:'パキラ',s:'houseplant'},{n:'ガジュマル',s:'houseplant'},{n:'エバーフレッシュ',s:'houseplant'},{n:'アイビー'},{n:'オリヅルラン',e:'🌿'}]},
  {c:'sc',f:'ベンケイソウ科',d:'🪴',p:[{n:'セダム',s:'succulent'},{n:'エケベリア',s:'succulent'},{n:'カゲツ(金のなる木)',s:'succulent'},{n:'カランコエ',e:'🌸'}]},
  {c:'sc',f:'サボテン科',d:'🌵',p:[{n:'ウチワサボテン'},{n:'金鯱'},{n:'シャコバサボテン'}]},
  {c:'sc',f:'ツルボラン科',d:'🪴',p:[{n:'アロエ',s:'succulent'},{n:'ハオルチア',s:'succulent'}]},
  {c:'sc',f:'キジカクシ科多肉',d:'🪴',p:[{n:'アガベ',s:'succulent'}]},
  {c:'sc',f:'その他多肉',d:'🪴',p:[{n:'ティランジア',e:'🌿'}]},
];

const CATALOG_INDEX = (() => {
  const idx = {};
  CATALOG_GROUPS.forEach(g => g.p.forEach(p => { idx[p.n] = { plant: p, group: g }; }));
  return idx;
})();

// ============== ヘルパー ==============
const todayStr = () => new Date().toISOString().split('T')[0];
const daysBetween = (d1, d2) => Math.floor((new Date(d2) - new Date(d1)) / 86400000);
const formatDate = (s) => { const d = new Date(s); return `${d.getMonth() + 1}/${d.getDate()}`; };
const isCatalogId = (id) => typeof id === 'string' && id.startsWith('cat:');
const catalogNameFromId = (id) => id.slice(4);
const makeCatalogId = (name) => `cat:${name}`;

function resolveCatalogPlant(id) {
  const name = catalogNameFromId(id);
  const entry = CATALOG_INDEX[name];
  if (!entry) return null;
  const { plant, group } = entry;
  const cd = CATEGORY_DEFAULTS[group.c];
  return {
    id, name: plant.n, svgKey: plant.s, emoji: plant.e || group.d,
    color: cd.color, bg: cd.bg, ring: cd.ring,
    wateringInterval: cd.water, fertilizerInterval: cd.fert, isHarvested: cd.harvest,
    family: group.f, isCatalog: true,
  };
}

function getPlant(id) {
  if (isCatalogId(id)) {
    const c = resolveCatalogPlant(id);
    if (c) return c;
  }
  return PLANTS.find(p => p.id === id) || PLANTS[0];
}

const getRecType = (id) => RECORD_TYPES.find(r => r.id === id) || RECORD_TYPES[0];
const newId = (prefix = 'inst') => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
const defaultUnit = (id) => id === 'harvest' ? '個' : id === 'fertilizer' ? 'g' : '';

function getDefaultPosition(idx, total) {
  const cols = total <= 4 ? Math.max(2, total) : Math.min(4, Math.ceil(Math.sqrt(total)));
  const rows = Math.ceil(total / cols);
  const col = idx % cols;
  const row = Math.floor(idx / cols);
  return { x: 14 + (col + 0.5) * (72 / cols), y: 16 + (row + 0.5) * (68 / Math.max(1, rows)) };
}

function PlantIcon({ plantId, size = 32 }) {
  const p = getPlant(plantId);
  if (p.svg) return <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>{p.svg(size)}</span>;
  if (p.svgKey && SVG_ICONS[p.svgKey]) return <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>{SVG_ICONS[p.svgKey](size)}</span>;
  const emoji = p.emoji || '🌱';
  return <span style={{fontSize:size*0.95,lineHeight:1,display:'inline-flex',alignItems:'center',justifyContent:'center',width:size,height:size}}>{emoji}</span>;
}

function RecordIcon({ recordTypeId, size = 24 }) {
  const r = getRecType(recordTypeId);
  if (r.svg) return <span style={{display:'inline-flex'}}>{r.svg(size)}</span>;
  return <span style={{fontSize:size,lineHeight:1}}>{r.emoji}</span>;
}

// ============== 地域・天気 ==============
const CLIMATE_DESCRIPTIONS = {
  hokkaido: '冷涼な気候、冬は厳寒で積雪が深く、夏は涼しい',
  tohoku: '冷涼な気候、冬は寒く積雪あり、夏は穏やか',
  pacific_temperate: '温暖な太平洋側気候、夏は高温多湿、冬は晴天が多く乾燥しやすい',
  japan_sea_temperate: '温暖な日本海側気候、夏は蒸し暑く、冬は曇りや雪が多い',
  subtropical: '亜熱帯気候、年間を通じて温暖、夏は台風が多い',
};

const CITIES = [
  { name: '札幌市', prefecture: '北海道', lat: 43.0642, lng: 141.3469, climate: 'hokkaido' },
  { name: '函館市', prefecture: '北海道', lat: 41.7688, lng: 140.7290, climate: 'hokkaido' },
  { name: '旭川市', prefecture: '北海道', lat: 43.7706, lng: 142.3650, climate: 'hokkaido' },
  { name: '青森市', prefecture: '青森県', lat: 40.8246, lng: 140.7406, climate: 'tohoku' },
  { name: '盛岡市', prefecture: '岩手県', lat: 39.7036, lng: 141.1527, climate: 'tohoku' },
  { name: '仙台市', prefecture: '宮城県', lat: 38.2682, lng: 140.8694, climate: 'tohoku' },
  { name: '秋田市', prefecture: '秋田県', lat: 39.7186, lng: 140.1024, climate: 'japan_sea_temperate' },
  { name: '山形市', prefecture: '山形県', lat: 38.2404, lng: 140.3636, climate: 'tohoku' },
  { name: '福島市', prefecture: '福島県', lat: 37.7503, lng: 140.4676, climate: 'tohoku' },
  { name: '水戸市', prefecture: '茨城県', lat: 36.3418, lng: 140.4467, climate: 'pacific_temperate' },
  { name: '宇都宮市', prefecture: '栃木県', lat: 36.5551, lng: 139.8829, climate: 'pacific_temperate' },
  { name: '前橋市', prefecture: '群馬県', lat: 36.3895, lng: 139.0634, climate: 'pacific_temperate' },
  { name: 'さいたま市', prefecture: '埼玉県', lat: 35.8617, lng: 139.6455, climate: 'pacific_temperate' },
  { name: '千葉市', prefecture: '千葉県', lat: 35.6074, lng: 140.1064, climate: 'pacific_temperate' },
  { name: '東京都心', prefecture: '東京都', lat: 35.6762, lng: 139.6503, climate: 'pacific_temperate' },
  { name: '新宿区', prefecture: '東京都', lat: 35.6938, lng: 139.7036, climate: 'pacific_temperate' },
  { name: '世田谷区', prefecture: '東京都', lat: 35.6464, lng: 139.6533, climate: 'pacific_temperate' },
  { name: '八王子市', prefecture: '東京都', lat: 35.6664, lng: 139.3160, climate: 'pacific_temperate' },
  { name: '横浜市', prefecture: '神奈川県', lat: 35.4437, lng: 139.6380, climate: 'pacific_temperate' },
  { name: '川崎市', prefecture: '神奈川県', lat: 35.5308, lng: 139.7029, climate: 'pacific_temperate' },
  { name: '新潟市', prefecture: '新潟県', lat: 37.9026, lng: 139.0233, climate: 'japan_sea_temperate' },
  { name: '富山市', prefecture: '富山県', lat: 36.6953, lng: 137.2113, climate: 'japan_sea_temperate' },
  { name: '金沢市', prefecture: '石川県', lat: 36.5613, lng: 136.6562, climate: 'japan_sea_temperate' },
  { name: '福井市', prefecture: '福井県', lat: 36.0652, lng: 136.2216, climate: 'japan_sea_temperate' },
  { name: '甲府市', prefecture: '山梨県', lat: 35.6635, lng: 138.5683, climate: 'pacific_temperate' },
  { name: '長野市', prefecture: '長野県', lat: 36.6485, lng: 138.1949, climate: 'tohoku' },
  { name: '松本市', prefecture: '長野県', lat: 36.2381, lng: 137.9720, climate: 'tohoku' },
  { name: '岐阜市', prefecture: '岐阜県', lat: 35.4232, lng: 136.7607, climate: 'pacific_temperate' },
  { name: '静岡市', prefecture: '静岡県', lat: 34.9756, lng: 138.3828, climate: 'pacific_temperate' },
  { name: '浜松市', prefecture: '静岡県', lat: 34.7108, lng: 137.7261, climate: 'pacific_temperate' },
  { name: '名古屋市', prefecture: '愛知県', lat: 35.1815, lng: 136.9066, climate: 'pacific_temperate' },
  { name: '津市', prefecture: '三重県', lat: 34.7184, lng: 136.5057, climate: 'pacific_temperate' },
  { name: '大津市', prefecture: '滋賀県', lat: 35.0044, lng: 135.8686, climate: 'pacific_temperate' },
  { name: '京都市', prefecture: '京都府', lat: 35.0116, lng: 135.7681, climate: 'pacific_temperate' },
  { name: '大阪市', prefecture: '大阪府', lat: 34.6937, lng: 135.5023, climate: 'pacific_temperate' },
  { name: '神戸市', prefecture: '兵庫県', lat: 34.6901, lng: 135.1956, climate: 'pacific_temperate' },
  { name: '姫路市', prefecture: '兵庫県', lat: 34.8150, lng: 134.6856, climate: 'pacific_temperate' },
  { name: '奈良市', prefecture: '奈良県', lat: 34.6852, lng: 135.8048, climate: 'pacific_temperate' },
  { name: '和歌山市', prefecture: '和歌山県', lat: 34.2261, lng: 135.1675, climate: 'pacific_temperate' },
  { name: '鳥取市', prefecture: '鳥取県', lat: 35.5039, lng: 134.2381, climate: 'japan_sea_temperate' },
  { name: '松江市', prefecture: '島根県', lat: 35.4723, lng: 133.0509, climate: 'japan_sea_temperate' },
  { name: '岡山市', prefecture: '岡山県', lat: 34.6618, lng: 133.9344, climate: 'pacific_temperate' },
  { name: '広島市', prefecture: '広島県', lat: 34.3853, lng: 132.4553, climate: 'pacific_temperate' },
  { name: '山口市', prefecture: '山口県', lat: 34.1858, lng: 131.4706, climate: 'pacific_temperate' },
  { name: '徳島市', prefecture: '徳島県', lat: 34.0658, lng: 134.5593, climate: 'pacific_temperate' },
  { name: '高松市', prefecture: '香川県', lat: 34.3401, lng: 134.0434, climate: 'pacific_temperate' },
  { name: '松山市', prefecture: '愛媛県', lat: 33.8392, lng: 132.7657, climate: 'pacific_temperate' },
  { name: '高知市', prefecture: '高知県', lat: 33.5597, lng: 133.5311, climate: 'pacific_temperate' },
  { name: '福岡市', prefecture: '福岡県', lat: 33.5904, lng: 130.4017, climate: 'pacific_temperate' },
  { name: '北九州市', prefecture: '福岡県', lat: 33.8835, lng: 130.8751, climate: 'pacific_temperate' },
  { name: '佐賀市', prefecture: '佐賀県', lat: 33.2494, lng: 130.2989, climate: 'pacific_temperate' },
  { name: '長崎市', prefecture: '長崎県', lat: 32.7503, lng: 129.8779, climate: 'pacific_temperate' },
  { name: '熊本市', prefecture: '熊本県', lat: 32.8031, lng: 130.7079, climate: 'pacific_temperate' },
  { name: '大分市', prefecture: '大分県', lat: 33.2382, lng: 131.6126, climate: 'pacific_temperate' },
  { name: '宮崎市', prefecture: '宮崎県', lat: 31.9077, lng: 131.4202, climate: 'pacific_temperate' },
  { name: '鹿児島市', prefecture: '鹿児島県', lat: 31.5602, lng: 130.5581, climate: 'pacific_temperate' },
  { name: '那覇市', prefecture: '沖縄県', lat: 26.2125, lng: 127.6792, climate: 'subtropical' },
  { name: '石垣市', prefecture: '沖縄県', lat: 24.3408, lng: 124.1556, climate: 'subtropical' },
];

const DEFAULT_LOCATION = CITIES.find(c => c.name === '東京都心') || CITIES[0];
const PREFECTURES = [...new Set(CITIES.map(c => c.prefecture))];

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
    if (!res.ok) throw new Error('http ' + res.status);
    const data = await res.json();
    const cur = data.current || {};
    const days = data.daily.time.map((date, i) => ({
      date, condition: codeToCondition(data.daily.weather_code[i]),
      tempHigh: Math.round(data.daily.temperature_2m_max[i]),
      tempLow: Math.round(data.daily.temperature_2m_min[i]),
      rainProb: data.daily.precipitation_probability_max[i] || 0,
      windSpeed: Math.round((data.daily.wind_speed_10m_max[i] || 0) / 3.6),
    }));
    if (cur.temperature_2m !== undefined) {
      days[0] = { ...days[0], currentTemp: Math.round(cur.temperature_2m),
        condition: codeToCondition(cur.weather_code ?? data.daily.weather_code[0]),
        windSpeed: Math.round((cur.wind_speed_10m ?? 0) / 3.6) };
    }
    return { today: days[0], forecast: days.slice(1), location: location.name, isReal: true, fetchedAt: new Date().toISOString() };
  } catch (e) { console.error('weather:', e); return null; }
}

async function fetchWeatherSmart(location) {
  if (!location || typeof location.lat !== 'number') location = DEFAULT_LOCATION;
  const cacheKey = `weather-cache-${location.lat.toFixed(3)}-${location.lng.toFixed(3)}`;
  try {
    const cached = await window.storage.get(cacheKey);
    if (cached?.value) {
      const w = JSON.parse(cached.value);
      if (w.fetchedAt && w.today?.date === todayStr()) {
        const age = Date.now() - new Date(w.fetchedAt).getTime();
        if (age < 3 * 3600 * 1000) return w;
      }
    }
  } catch {}
  const w = await fetchWeatherDirect(location);
  if (w?.isReal) {
    try { await window.storage.set(cacheKey, JSON.stringify(w)); } catch {}
  }
  return w;
}

function generateMockWeather(location) {
  const climate = location?.climate || 'pacific_temperate';
  const m = new Date().getMonth();
  const climateTemps = {
    hokkaido: { high:[-1,0,4,11,17,21,25,26,22,16,8,2], low:[-7,-7,-3,3,9,13,17,19,14,7,1,-4] },
    tohoku: { high:[3,4,8,14,19,23,26,28,24,18,12,6], low:[-3,-3,0,5,11,16,20,21,16,9,3,-1] },
    pacific_temperate: { high:[10,11,14,19,23,26,30,32,28,23,18,13], low:[2,3,6,11,16,20,24,25,22,16,10,5] },
    japan_sea_temperate: { high:[5,6,10,16,21,24,28,30,26,20,14,8], low:[0,0,3,8,13,18,22,23,19,13,7,2] },
    subtropical: { high:[19,19,21,24,26,29,32,32,30,27,24,20], low:[14,14,16,19,22,25,27,27,26,23,20,16] },
  };
  const t = climateTemps[climate] || climateTemps.pacific_temperate;
  const days = [];
  for (let i = 0; i < 4; i++) {
    const d = new Date(); d.setDate(d.getDate() + i);
    days.push({ date: d.toISOString().split('T')[0], condition: 'cloudy',
      tempHigh: t.high[m] + (i % 2 ? 1 : -1), tempLow: t.low[m] + (i % 2 ? 1 : -1),
      rainProb: 30, windSpeed: 3 });
  }
  return { today: days[0], forecast: days.slice(1), location: location?.name || '東京', isReal: false };
}

function getTimeOfDay() {
  const h = new Date().getHours();
  if (h >= 5 && h < 11) return 'morning';
  if (h >= 11 && h < 17) return 'daytime';
  if (h >= 17 && h < 20) return 'evening';
  return 'night';
}

const DEFAULT_ADVICE = {
  morning: { sunny:{icon:'🌅',text:'気持ちいい朝!植物の様子をチェックしてみよう'}, cloudy:{icon:'☁️',text:'やわらかな朝の光、観察日和です'}, rainy:{icon:'☔',text:'雨の朝、植物もうるおって嬉しそう'}, snowy:{icon:'❄️',text:'冷え込む朝、寒さから守ってあげよう'} },
  daytime: { sunny:{icon:'😊',text:'今日もガーデニング日和!'}, cloudy:{icon:'⛅',text:'過ごしやすい曇り空、お世話にぴったり'}, rainy:{icon:'🌧️',text:'雨の日はお部屋からじっくり観察を'}, snowy:{icon:'❄️',text:'雪景色、植物の様子をそっと確認'} },
  evening: { sunny:{icon:'🌇',text:'夕方の水やりにちょうどいい時間'}, cloudy:{icon:'🌆',text:'穏やかな夕暮れ、一日お疲れさま'}, rainy:{icon:'☔',text:'雨の夕方、明日もゆっくり育ちますように'}, snowy:{icon:'❄️',text:'冷え込む夕方、室内に取り込む準備を'} },
  night: { sunny:{icon:'🌙',text:'静かな夜、植物もお休み中'}, cloudy:{icon:'🌃',text:'今日もお疲れさま、また明日'}, rainy:{icon:'🌧️',text:'雨音を聞きながら、ゆっくり休んで'}, snowy:{icon:'❄️',text:'雪の夜、植物を寒さから守って'} },
};

function getWeatherAdvice(w) {
  const advice = [];
  const tomorrow = w.forecast[0];
  if (tomorrow?.rainProb >= 60) advice.push({ icon:'☔', text:'明日は雨予報!水やりはお休みでOK', type:'info' });
  if (w.today.windSpeed >= 8) advice.push({ icon:'💨', text:'強風注意!支柱や鉢の固定を確認しよう', type:'warning' });
  if (w.today.tempHigh >= 28) advice.push({ icon:'🌡️', text:'暑い1日!朝夕にたっぷり水を', type:'warning' });
  if (w.today.tempLow <= 3) advice.push({ icon:'❄️', text:'冷え込み注意!霜対策を忘れずに', type:'warning' });
  const noRain = w.forecast.every(d => d.rainProb < 30) && w.today.rainProb < 30;
  const tod = getTimeOfDay();
  if (noRain && advice.length === 0) {
    const t = { morning:'晴れ続き!朝のうちに水やりを', daytime:'晴れ続き!しっかり水やりしてあげよう', evening:'晴れ続き!夕方の涼しい時間に水やりを', night:'晴れ続き!明日の朝の水やりを忘れずに' }[tod];
    advice.push({ icon:'☀️', text:t, type:'info' });
  }
  if (advice.length === 0) {
    const cond = w.today.condition || 'cloudy';
    const def = DEFAULT_ADVICE[tod]?.[cond] || DEFAULT_ADVICE.daytime.sunny;
    advice.push({ ...def, type:'info' });
  }
  return advice;
}

// ============== データ移行 ==============
function migrateData(data) {
  if (!data) return { instances: [], location: DEFAULT_LOCATION };
  let result = Array.isArray(data.instances) ? data : { instances: [] };
  result.instances = (result.instances || []).map(inst => {
    let plantTypeId = inst.plantTypeId === 'mitsuba' ? 'cat:ミツバ' : inst.plantTypeId;
    return { ...inst, plantTypeId };
  });
  if (!result.location || typeof result.location !== 'object' || typeof result.location.lat !== 'number') {
    result.location = DEFAULT_LOCATION;
  }
  return result;
}

function getMonthlyHarvest(instances) {
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const byType = {};
  instances.forEach(inst => {
    const harvests = inst.records?.harvest || [];
    const total = harvests.filter(h => new Date(h.date) >= monthStart).reduce((s,h) => s + (parseFloat(h.amount) || 0), 0);
    if (total > 0) {
      const plant = getPlant(inst.plantTypeId);
      if (!byType[inst.plantTypeId]) byType[inst.plantTypeId] = { id: inst.plantTypeId, name: plant.name, color: plant.color, amount: 0 };
      byType[inst.plantTypeId].amount += total;
    }
  });
  return Object.values(byType).map(d => ({ ...d, amount: Math.round(d.amount * 10) / 10 }));
}

// ============== UI部品 ==============
function WeatherSymbol({ condition, size = 24 }) {
  if (condition === 'sunny') return <Sun size={size} className="text-yellow-500" />;
  if (condition === 'cloudy') return <CloudSun size={size} className="text-gray-400" />;
  if (condition === 'rainy') return <CloudRain size={size} className="text-blue-400" />;
  if (condition === 'snowy') return <Cloud size={size} className="text-blue-200" />;
  return <Cloud size={size} />;
}

function WeatherCard({ weather, loading, onRefresh }) {
  const advice = getWeatherAdvice(weather);
  const t = weather.today;
  return (
    <div className="bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-3xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-2">
        <MapPin size={12} className="text-sky-700" />
        <div className="text-xs font-black text-sky-700">{weather.location}</div>
        {!weather.isReal && !loading && <span className="text-[9px] bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">概算</span>}
        {loading && <span className="text-[9px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-full font-bold animate-pulse">取得中...</span>}
        <button onClick={onRefresh} disabled={loading} className="ml-auto text-sky-600 disabled:opacity-50 active:scale-95 transition">
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
        {(weather.forecast || []).slice(0, 3).map((d, i) => {
          const label = i === 0 ? '明日' : i === 1 ? '明後日' : formatDate(d.date);
          return (
            <div key={i} className="text-center flex-1">
              <div className="text-[10px] font-bold text-gray-600 mb-1">{label}</div>
              <div className="flex justify-center mb-1"><WeatherSymbol condition={d.condition} size={22} /></div>
              <div className="text-xs font-bold text-gray-700">{d.tempHigh}°<span className="text-gray-400">/{d.tempLow}°</span></div>
            </div>
          );
        })}
      </div>
      <div className="space-y-1.5">
        {advice.map((a, i) => (
          <div key={i} className={`flex items-start gap-2 p-2.5 rounded-2xl text-sm ${a.type === 'warning' ? 'bg-amber-100 text-amber-900' : 'bg-white/70 text-gray-700'}`}>
            <span className="text-base">{a.icon}</span>
            <span className="font-medium flex-1 leading-snug">{a.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function HarvestTick({ x, y, payload }) {
  const id = payload.value;
  const plant = getPlant(id);
  const size = 26;
  if (plant.svg) return <g transform={`translate(${x - size/2}, ${y + 2})`}>{plant.svg(size)}</g>;
  if (plant.svgKey && SVG_ICONS[plant.svgKey]) return <g transform={`translate(${x - size/2}, ${y + 2})`}>{SVG_ICONS[plant.svgKey](size)}</g>;
  return <text x={x} y={y + 20} fontSize="20" textAnchor="middle">{plant.emoji || '🌱'}</text>;
}

function HarvestChart({ instances }) {
  const data = useMemo(() => getMonthlyHarvest(instances), [instances]);
  const total = data.reduce((s,d) => s + d.amount, 0);
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
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.04)' }}
                contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
                formatter={(v) => [v, '収穫量']}
                labelFormatter={(_, p) => p[0]?.payload?.name || ''} />
              <Bar dataKey="amount" radius={[6,6,0,0]}>
                {data.map((d,i) => <Cell key={i} fill={d.color} />)}
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
  const totalH = (records.harvest || []).reduce((s,h) => s + (parseFloat(h.amount) || 0), 0);
  const needsWater = dW !== null && dW >= plant.wateringInterval;
  return (
    <button onClick={onClick} className={`w-full text-left bg-gradient-to-br ${plant.bg} rounded-3xl p-4 shadow-sm hover:scale-[1.03] active:scale-95 transition-transform`}>
      <div className="flex items-center justify-between mb-2">
        <PlantIcon plantId={instance.plantTypeId} size={36} />
        {needsWater && <div className="bg-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">要水やり</div>}
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
            <span style={{display:'inline-flex'}}>{sPot(11)}</span><span>{instance.potSize}</span>
          </div>
        )}
      </div>
    </button>
  );
}

function AddCard({ onClick }) {
  return (
    <button onClick={onClick} className="w-full bg-white/60 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 min-h-[140px]">
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

// ============== カタログピッカー ==============
function CatalogTile({ plant, onClick }) {
  const cd = CATEGORY_DEFAULTS[plant.c];
  const renderIcon = () => {
    if (plant.s && SVG_ICONS[plant.s]) return <span style={{display:'inline-flex'}}>{SVG_ICONS[plant.s](28)}</span>;
    return <span style={{fontSize:26,lineHeight:1,display:'inline-flex',alignItems:'center',justifyContent:'center',width:28,height:28}}>{plant.e || plant.d || '🌱'}</span>;
  };
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-gradient-to-br ${cd.bg} hover:scale-105 active:scale-95 transition-transform`}>
      {renderIcon()}
      <span className="text-[9px] font-bold text-gray-700 truncate w-full text-center leading-tight">{plant.n}</span>
    </button>
  );
}

function FamilyAccordion({ group, open, onToggle, onPick }) {
  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-2.5 hover:bg-gray-100">
        <div className="flex items-center gap-1.5">
          <span className="text-base">{group.d}</span>
          <span className="font-black text-xs text-gray-800">{group.f}</span>
          <span className="text-[10px] font-bold text-gray-400">{group.p.length}種</span>
        </div>
        {open ? <ChevronDown size={14} className="text-gray-400" /> : <ChevronRight size={14} className="text-gray-400" />}
      </button>
      {open && (
        <div className="px-2.5 pb-2.5 grid grid-cols-4 gap-1.5">
          {group.p.map((p, i) => (
            <CatalogTile key={i} plant={{ ...p, c: group.c, f: group.f, d: group.d }}
              onClick={() => onPick({ ...p, c: group.c, f: group.f, d: group.d })} />
          ))}
        </div>
      )}
    </div>
  );
}

function CatalogPicker({ open, onClose, onSelect }) {
  const [tab, setTab] = useState('tab_vh');
  const [q, setQ] = useState('');
  const [openFamilies, setOpenFamilies] = useState({});

  useEffect(() => {
    if (open) { setTab('tab_vh'); setQ(''); setOpenFamilies({}); }
  }, [open]);

  const flatCatalog = useMemo(() => CATALOG_GROUPS.flatMap(g => g.p.map(p => ({ ...p, c: g.c, f: g.f, d: g.d }))), []);
  const results = useMemo(() => {
    if (!q.trim()) return null;
    const lo = q.toLowerCase();
    return flatCatalog.filter(p => p.n.toLowerCase().includes(lo) || p.f.toLowerCase().includes(lo));
  }, [q, flatCatalog]);

  if (!open) return null;
  const activeTab = TOP_CATEGORIES.find(t => t.id === tab);
  const groupsInSub = (s) => CATALOG_GROUPS.filter(g => g.c === s);
  const tabCount = (t) => CATALOG_GROUPS.filter(g => t.subs.includes(g.c)).reduce((sum,g) => sum + g.p.length, 0);

  function handlePick(plant) { onSelect(makeCatalogId(plant.n)); onClose(); }
  function toggleFamily(key) { setOpenFamilies(prev => ({ ...prev, [key]: !prev[key] })); }

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md flex flex-col shadow-2xl" style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <h3 className="text-base font-black text-gray-800">📚 その他の植物から探す</h3>
            <button onClick={onClose} className="ml-auto p-1.5 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="植物名・科名で検索"
              className="w-full pl-9 pr-9 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            {q && (
              <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>
          {!q && (
            <div className="-mx-4 mt-3 overflow-x-auto pb-1" style={{ WebkitOverflowScrolling: 'touch' }}>
              <div className="flex gap-1.5 px-4" style={{ width: 'max-content' }}>
                {TOP_CATEGORIES.map(t => (
                  <button key={t.id} onClick={() => setTab(t.id)}
                    className={`flex-shrink-0 px-2.5 py-1.5 rounded-2xl font-black text-[11px] shadow-sm whitespace-nowrap ${tab === t.id ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white' : 'bg-white text-gray-600 ring-1 ring-gray-200'}`}>
                    <span className="mr-0.5">{t.icon}</span>{t.name}
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${tab === t.id ? 'bg-white/30' : 'bg-gray-100'}`}>{tabCount(t)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-3" style={{ WebkitOverflowScrolling: 'touch' }}>
          {q && results && (
            <div>
              <div className="text-xs font-black text-gray-500 mb-2 px-1">検索結果: {results.length}件</div>
              {results.length === 0 ? (
                <div className="text-center py-12 text-gray-400 text-sm font-bold">
                  <div className="text-4xl mb-2">🔍</div>該当する植物が見つかりません
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-1.5">
                  {results.slice(0, 100).map((p, i) => <CatalogTile key={i} plant={p} onClick={() => handlePick(p)} />)}
                </div>
              )}
            </div>
          )}
          {!q && activeTab && (
            <div className="space-y-3">
              {activeTab.subs.map(s => {
                const groups = groupsInSub(s);
                if (groups.length === 0) return null;
                const subInfo = CATEGORY_DEFAULTS[s];
                const showSubHeader = activeTab.subs.length > 1;
                return (
                  <div key={s}>
                    {showSubHeader && (
                      <div className="text-[11px] font-black text-gray-700 mb-1.5 px-1 flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full" style={{ background: subInfo.color }} />
                        {subInfo.label}
                      </div>
                    )}
                    <div className="space-y-1.5">
                      {groups.map(g => (
                        <FamilyAccordion key={g.f} group={g} open={!!openFamilies[g.f]}
                          onToggle={() => toggleFamily(g.f)} onPick={handlePick} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============== 鉢追加モーダル ==============
function AddInstanceModal({ open, onClose, onAdd }) {
  const [plantTypeId, setPlantTypeId] = useState('strawberry');
  const [name, setName] = useState('');
  const [potSize, setPotSize] = useState('');
  const [catalogOpen, setCatalogOpen] = useState(false);

  useEffect(() => {
    if (open) { setPlantTypeId('strawberry'); setName(''); setPotSize(''); setCatalogOpen(false); }
  }, [open]);

  if (!open) return null;
  const plant = getPlant(plantTypeId);
  const isCatalog = isCatalogId(plantTypeId);

  function handleSave() {
    onAdd({ plantTypeId, name: name.trim() || plant.name, potSize: potSize.trim() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
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
                  className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${plantTypeId === p.id ? `bg-gradient-to-br ${p.bg} ring-2 ${p.ring}` : 'bg-gray-50'}`}>
                  <PlantIcon plantId={p.id} size={26} />
                  <span className="text-[9px] font-bold text-gray-700 truncate w-full text-center">{p.name}</span>
                </button>
              ))}
              <button onClick={() => setCatalogOpen(true)}
                className={`flex flex-col items-center gap-0.5 p-2 rounded-xl relative ${isCatalog ? 'bg-gradient-to-br from-purple-100 to-pink-100 ring-2 ring-purple-300' : 'bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100'}`}>
                <div className="w-[26px] h-[26px] flex items-center justify-center">
                  {isCatalog ? <PlantIcon plantId={plantTypeId} size={26} /> : <Search size={20} className="text-purple-600" strokeWidth={2.5} />}
                </div>
                <span className="text-[9px] font-black text-purple-700 truncate w-full text-center">
                  {isCatalog ? plant.name : 'その他'}
                </span>
              </button>
            </div>
          </div>
          <div className={`bg-gradient-to-br ${plant.bg} rounded-2xl p-4 text-center`}>
            <PlantIcon plantId={plantTypeId} size={48} />
            <div className="text-sm font-black text-gray-800 mt-1">{plant.name}</div>
            {isCatalog && plant.family && <div className="text-[10px] font-bold text-gray-600 mt-0.5">{plant.family}</div>}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">📛 ニックネーム</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              placeholder={`例: ${plant.name}1号`}
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">🪴 鉢サイズ(任意)</label>
            <input type="text" value={potSize} onChange={e => setPotSize(e.target.value)}
              placeholder="例: 7号、30cm"
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 font-black py-3 rounded-2xl active:scale-95">
              キャンセル
            </button>
            <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 flex items-center justify-center gap-1.5">
              <Plus size={16} strokeWidth={3} />追加する
            </button>
          </div>
        </div>
      </div>
      <CatalogPicker open={catalogOpen} onClose={() => setCatalogOpen(false)} onSelect={(id) => setPlantTypeId(id)} />
    </div>
  );
}

// ============== ダッシュボード ==============
function DashboardView({ data, weather, weatherLoading, onInstanceSelect, onAddInstance, onRefreshWeather }) {
  const instances = (data.instances || []).filter(i => !i.archived);
  const now = new Date();
  const greeting = now.getHours() < 11 ? 'おはよう' : now.getHours() < 17 ? 'こんにちは' : 'こんばんは';
  const dayJp = ['日','月','火','水','木','金','土'][now.getDay()];
  return (
    <div className="space-y-4 pb-28 px-4 pt-3">
      <div className="px-1">
        <div className="text-xs text-gray-500 font-bold">{now.getMonth() + 1}月{now.getDate()}日 ({dayJp})</div>
        <h1 className="text-2xl font-black text-gray-800 mt-0.5">{greeting}!🌞</h1>
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
          {instances.map(inst => <InstanceCard key={inst.id} instance={inst} onClick={() => onInstanceSelect(inst.id)} />)}
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
    setDrag({ instanceId: inst.id, pointerId: e.pointerId,
      offsetX: e.clientX - rect.left - pxX, offsetY: e.clientY - rect.top - pxY,
      start: currentPos, current: currentPos, hasMoved: false });
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
      setData(prev => ({ ...prev, instances: (prev.instances || []).map(i => i.id === drag.instanceId ? { ...i, position: drag.current } : i) }));
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
          <div className="text-[11px] text-gray-600 font-medium mt-0.5">タップで記録、ドラッグで移動</div>
        </div>
        <button onClick={onAddInstance} className="flex items-center gap-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-xs font-black px-3 py-2 rounded-full shadow-sm active:scale-95">
          <Plus size={14} strokeWidth={3}/>追加
        </button>
      </div>
      <div className="relative" style={{ height: '480px' }}>
        <div ref={containerRef} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
          className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-100 rounded-3xl shadow-inner border-4 border-amber-200/60 overflow-hidden"
          style={{ touchAction: 'none' }}>
          <svg className="absolute inset-0 w-full h-full opacity-25 pointer-events-none">
            <defs>
              <pattern id="gridDots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
                <circle cx="11" cy="11" r="1.2" fill="#7BC36F" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#gridDots)" />
          </svg>
          <div className="absolute top-2 right-2 text-2xl opacity-30 pointer-events-none">☀️</div>
          {instances.map((inst, idx) => {
            const plant = getPlant(inst.plantTypeId);
            const pos = getPosition(inst, idx);
            const isDragging = drag?.instanceId === inst.id;
            return (
              <div key={inst.id} onPointerDown={e => handlePointerDown(e, inst, pos)}
                className="absolute select-none flex flex-col items-center"
                style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)',
                  touchAction: 'none', cursor: isDragging ? 'grabbing' : 'grab',
                  zIndex: isDragging ? 30 : 10 }}>
                <div className={`bg-gradient-to-br ${plant.bg} rounded-full shadow-lg ring-2 ring-white pointer-events-none flex items-center justify-center ${isDragging ? 'scale-110' : ''}`}
                  style={{ width: '52px', height: '52px' }}>
                  <PlantIcon plantId={inst.plantTypeId} size={36} />
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
          className={`flex items-center gap-1.5 text-xs font-black px-3.5 py-2 rounded-full shadow-sm ${history.length === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 active:scale-95'}`}>
          <RefreshCw size={13} />
          一つ前に戻す{history.length > 0 && <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">{history.length}</span>}
        </button>
      </div>
      <div className="bg-blue-50 rounded-2xl p-3 text-xs text-blue-700 font-medium leading-relaxed">
        💡 <strong>ヒント:</strong> ドラッグで並べ替え、タップで記録画面が開きます。
      </div>
    </div>
  );
}

// ============== AI相談 ==============
function buildChatSystemPrompt({ plantTypeId, weather, instances, location }) {
  const m = new Date().getMonth() + 1;
  const seasons = { 12:'冬',1:'冬',2:'冬',3:'春',4:'春',5:'春',6:'梅雨',7:'夏',8:'夏',9:'秋',10:'秋',11:'秋' };
  const season = seasons[m];
  const loc = location || DEFAULT_LOCATION;
  const climateDesc = CLIMATE_DESCRIPTIONS[loc?.climate] || CLIMATE_DESCRIPTIONS.pacific_temperate;
  let prompt = `あなたは家庭菜園と園芸の専門家「ガーデンバディ」です。日本の家庭菜園を楽しむアマチュアの方に、温かく実践的なアドバイスをします。

【今の状況】
場所: ${loc.prefecture || ''}${loc.name || ''}(${climateDesc})
時期: ${m}月(${season})`;
  if (weather) {
    prompt += `\n今日の天気: ${conditionText(weather.today.condition)}(${weather.today.tempLow}°〜${weather.today.tempHigh}°、降水確率${weather.today.rainProb}%)`;
  }
  const active = (instances || []).filter(i => !i.archived);
  if (active.length > 0) {
    const allPlants = [...new Set(active.map(i => getPlant(i.plantTypeId).name))].join('、');
    prompt += `\n育てている植物: ${allPlants}`;
  }
  if (plantTypeId) {
    const plant = getPlant(plantTypeId);
    const same = active.filter(i => i.plantTypeId === plantTypeId);
    prompt += `\n\n【今相談している植物】\n${plant.name}${plant.family ? `(${plant.family})` : ''} (${same.length}鉢)`;
    same.forEach(inst => {
      prompt += `\n■ ${inst.name}`;
      if (inst.potSize) prompt += `(${inst.potSize})`;
      const records = inst.records || {};
      const recent = [];
      Object.entries(records).forEach(([type, list]) => {
        if (!list?.length) return;
        const last = list[list.length - 1];
        recent.push(`${getRecType(type).name}: ${daysBetween(last.date, todayStr())}日前`);
      });
      if (recent.length) prompt += `\n  記録: ${recent.join('、')}`;
    });
  }
  prompt += `\n\n【返答ルール】
- 親しみやすい口調で、絵文字も適度に使う🌱
- 簡潔に200-300字程度
- 専門用語は避ける、または簡単に説明
- 地域の気候と季節を考慮`;
  return prompt;
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} gap-2`}>
      {!isUser && <div className="text-2xl flex-shrink-0 self-end mb-1">🌱</div>}
      <div className={`max-w-[80%] px-4 py-3 rounded-3xl ${isUser ? 'bg-gradient-to-br from-emerald-400 to-green-500 text-white rounded-br-md shadow-md' : 'bg-white text-gray-800 rounded-bl-md shadow-sm border border-gray-100'}`}>
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
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}}/>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}}/>
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}}/>
        </div>
      </div>
    </div>
  );
}

const SUGGESTED_GENERAL = ['今の時期にやるべき手入れは?', '夏の暑さ対策を教えて', '虫がついた時の対処法は?', '肥料の選び方を知りたい'];
const SUGGESTED_BY_PLANT = {
  blueberry: ['実が小さい原因は?', '酸度調整って必要?', '剪定はいつすればいい?'],
  strawberry: ['ランナーの処理について', '花が咲かない原因は?'],
  tomato: ['脇芽は全部取る?', '実割れの原因と対策'],
  raspberry: ['誘引のコツを教えて', '剪定はいつする?'],
  fig: ['剪定時期は?', '実が落ちる原因は?'],
  nira: ['花芽は摘むべき?', '株分けのタイミング'],
  garlic: ['追肥タイミング', '収穫時期の見分け方'],
  shiso: ['葉が硬い時は?', '葉を増やすコツ'],
  hydrangea: ['色を変える方法は?', '剪定時期と方法'],
  marigold: ['花がら摘みのコツ', 'コンパニオンプランツ効果'],
  kuushinsai: ['収穫タイミング', '何回まで収穫できる?'],
};

function SuggestedQuestions({ plant, onPick }) {
  const questions = plant ? (SUGGESTED_BY_PLANT[plant.id] || SUGGESTED_GENERAL).slice(0, 4) : SUGGESTED_GENERAL;
  return (
    <div className="space-y-2">
      <div className="text-[11px] font-black text-gray-500 px-1">💡 こんな質問はいかが?</div>
      <div className="flex flex-col gap-1.5">
        {questions.map((q, i) => (
          <button key={i} onClick={() => onPick(q)}
            className="text-left text-xs font-bold text-gray-700 bg-white hover:bg-emerald-50 border border-gray-200 px-3 py-2 rounded-2xl active:scale-95">
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

function ChatView({ data, weather, focusInstanceId, onClearFocus }) {
  const focusInstance = focusInstanceId ? (data.instances || []).find(i => i.id === focusInstanceId) : null;
  const focusPlant = focusInstance ? getPlant(focusInstance.plantTypeId) : null;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(text) {
    if (!text.trim() || loading) return;
    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const systemPrompt = buildChatSystemPrompt({
        plantTypeId: focusPlant?.id, weather, instances: data.instances, location: data.location
      });
      const history = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: systemPrompt, messages: history,
        })
      });
      if (!res.ok) throw new Error('API ' + res.status);
      const apiData = await res.json();
      const reply = (apiData.content || []).filter(c => c.type === 'text').map(c => c.text).join('\n');
      setMessages(prev => [...prev, { role: 'assistant', content: reply || 'うまく回答できませんでした。' }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: 'すみません、エラーが発生しました🥲 もう一度試してみてください。' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col" style={{ height: 'calc(100vh - 60px - 60px)' }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-white border-b border-gray-100 flex-shrink-0">
        <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-xl p-1.5 shadow-sm">
          <MessageCircle size={16} className="text-white" />
        </div>
        <div className="flex-1">
          <div className="font-black text-sm text-gray-800">AI相談</div>
          {focusPlant && (
            <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <PlantIcon plantId={focusInstance.plantTypeId} size={12}/> {focusInstance.name}について
            </div>
          )}
        </div>
        {focusInstanceId && (
          <button onClick={onClearFocus} className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            全体相談に戻す
          </button>
        )}
      </div>
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gradient-to-b from-emerald-50/30 to-white">
        {messages.length === 0 && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-emerald-100">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🌱</div>
                <div className="flex-1">
                  <div className="font-black text-sm text-gray-800 mb-1">こんにちは!ガーデンバディです</div>
                  <div className="text-xs text-gray-600 leading-relaxed">
                    植物のお世話で気になることがあれば、なんでも聞いてくださいね。
                  </div>
                </div>
              </div>
            </div>
            <SuggestedQuestions plant={focusPlant} onPick={send} />
          </div>
        )}
        {messages.map((m, i) => <ChatMessage key={i} message={m} />)}
        {loading && <ChatLoading />}
      </div>
      <div className="px-4 py-3 bg-white border-t border-gray-100 flex-shrink-0">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); } }}
            placeholder={focusPlant ? `${focusInstance.name}について質問...` : '植物のお世話について質問...'}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gray-50 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-300 disabled:opacity-50" />
          <button onClick={() => send(input)} disabled={!input.trim() || loading}
            className="bg-gradient-to-br from-emerald-400 to-green-500 text-white p-3 rounded-full shadow-md disabled:opacity-30 active:scale-95">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== 鉢詳細・記録 ==============
function RecordEntry({ rec, type, onEdit, onDelete }) {
  const dDays = daysBetween(rec.date, todayStr());
  const dayLabel = dDays === 0 ? '今日' : dDays === 1 ? '昨日' : `${dDays}日前`;
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm flex items-start gap-3">
      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${type.color}`}>
        <RecordIcon recordTypeId={type.id} size={22} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
          <span className="font-black text-sm text-gray-800">{type.name}</span>
          <span className="text-[10px] font-bold text-gray-400">{formatDate(rec.date)} ({dayLabel})</span>
        </div>
        {rec.amount && (
          <div className="text-xs font-bold text-emerald-700">
            {rec.amount}{rec.unit || defaultUnit(type.id)}
          </div>
        )}
        {rec.note && <div className="text-xs text-gray-600 mt-0.5 leading-snug whitespace-pre-wrap">{rec.note}</div>}
      </div>
      <div className="flex flex-col gap-1">
        <button onClick={onEdit} className="p-1 rounded-full hover:bg-gray-100"><Edit3 size={13} className="text-gray-400"/></button>
        <button onClick={onDelete} className="p-1 rounded-full hover:bg-red-50"><Trash2 size={13} className="text-red-400"/></button>
      </div>
    </div>
  );
}

function RecordFormModal({ open, onClose, onSave, recordTypeId, editing }) {
  const type = getRecType(recordTypeId);
  const [date, setDate] = useState(todayStr());
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (open) {
      if (editing) {
        setDate(editing.date || todayStr());
        setAmount(editing.amount || '');
        setUnit(editing.unit || defaultUnit(recordTypeId));
        setNote(editing.note || '');
      } else {
        setDate(todayStr()); setAmount(''); setUnit(defaultUnit(recordTypeId)); setNote('');
      }
    }
  }, [open, editing, recordTypeId]);

  if (!open) return null;
  const showAmount = ['harvest','fertilizer','watering','pesticide'].includes(recordTypeId);

  function handleSave() {
    onSave({
      date, amount: amount.trim(), unit: unit.trim() || defaultUnit(recordTypeId),
      note: note.trim(), id: editing?.id || newId('rec')
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <RecordIcon recordTypeId={recordTypeId} size={24}/> {type.name}を記録
            </h3>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">📅 日付</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
          </div>
          {showAmount && (
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1.5">📊 量(任意)</label>
              <div className="flex gap-2">
                <input type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="例: 5"
                  className="flex-1 px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                <input type="text" value={unit} onChange={e => setUnit(e.target.value)}
                  placeholder={defaultUnit(recordTypeId)}
                  className="w-24 px-3 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              </div>
            </div>
          )}
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">📝 メモ(任意)</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="気づいたこと、状態など..."
              className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none" />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 font-black py-3 rounded-2xl active:scale-95">
              キャンセル
            </button>
            <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 flex items-center justify-center gap-1.5">
              <Check size={16} strokeWidth={3}/>{editing ? '更新' : '保存'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InstanceDetailView({ instance, setData, onBack, onChat }) {
  const plant = getPlant(instance.plantTypeId);
  const [activeType, setActiveType] = useState('watering');
  const [recordModal, setRecordModal] = useState(null);
  const [editingMeta, setEditingMeta] = useState(false);
  const [tempName, setTempName] = useState(instance.name);
  const [tempPotSize, setTempPotSize] = useState(instance.potSize || '');
  const [tempPlans, setTempPlans] = useState(instance.plans || '');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const records = instance.records || {};
  const visibleTypes = plant.isHarvested ? RECORD_TYPES : RECORD_TYPES.filter(r => r.id !== 'harvest');
  const activeRecords = (records[activeType] || []).slice().sort((a,b) => (b.date || '').localeCompare(a.date || ''));
  const lastWatering = (records.watering || []).slice(-1)[0];
  const dWater = lastWatering ? daysBetween(lastWatering.date, todayStr()) : null;
  const totalH = (records.harvest || []).reduce((s,h) => s + (parseFloat(h.amount) || 0), 0);

  function saveRecord(rec) {
    setData(prev => ({
      ...prev,
      instances: prev.instances.map(i => {
        if (i.id !== instance.id) return i;
        const list = (i.records?.[activeType] || []).slice();
        const idx = list.findIndex(r => r.id === rec.id);
        if (idx >= 0) list[idx] = rec; else list.push(rec);
        return { ...i, records: { ...(i.records || {}), [activeType]: list } };
      })
    }));
  }

  function deleteRecord(recId) {
    setData(prev => ({
      ...prev,
      instances: prev.instances.map(i => {
        if (i.id !== instance.id) return i;
        const list = (i.records?.[activeType] || []).filter(r => r.id !== recId);
        return { ...i, records: { ...(i.records || {}), [activeType]: list } };
      })
    }));
  }

  function saveMeta() {
    setData(prev => ({
      ...prev,
      instances: prev.instances.map(i => i.id === instance.id ? {
        ...i, name: tempName.trim() || plant.name, potSize: tempPotSize.trim(), plans: tempPlans
      } : i)
    }));
    setEditingMeta(false);
  }

  function archiveInstance() {
    setData(prev => ({
      ...prev,
      instances: prev.instances.map(i => i.id === instance.id ? { ...i, archived: true } : i)
    }));
    onBack();
  }

  function deleteInstance() {
    setData(prev => ({ ...prev, instances: prev.instances.filter(i => i.id !== instance.id) }));
    onBack();
  }

  return (
    <div className="pb-28">
      <div className={`bg-gradient-to-br ${plant.bg} px-4 pt-4 pb-6`}>
        <div className="flex items-center justify-between mb-3">
          <button onClick={onBack} className="bg-white/80 p-2 rounded-full shadow-sm active:scale-95">
            <ArrowLeft size={18} className="text-gray-700"/>
          </button>
          <div className="flex gap-1.5">
            <button onClick={onChat} className="bg-white/80 px-3 py-2 rounded-full shadow-sm flex items-center gap-1 text-xs font-black text-emerald-700 active:scale-95">
              <MessageCircle size={13}/>AI相談
            </button>
            <button onClick={() => setEditingMeta(true)} className="bg-white/80 p-2 rounded-full shadow-sm active:scale-95">
              <Edit3 size={16} className="text-gray-700"/>
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3">
          <div className="bg-white/80 rounded-2xl p-3 shadow-sm">
            <PlantIcon plantId={instance.plantTypeId} size={56} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-2xl font-black text-gray-800 truncate">{instance.name}</div>
            <div className="text-xs font-bold text-gray-600 mt-0.5">
              {plant.name}{plant.family && ` (${plant.family})`}
              {instance.potSize && ` ・ ${instance.potSize}`}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/70 rounded-2xl p-2.5 text-center">
            <div className="text-[10px] font-bold text-gray-500">最終水やり</div>
            <div className="text-sm font-black text-gray-800 mt-0.5">
              {lastWatering ? `${dWater}日前` : '記録なし'}
            </div>
          </div>
          {plant.isHarvested && (
            <div className="bg-white/70 rounded-2xl p-2.5 text-center">
              <div className="text-[10px] font-bold text-gray-500">累計収穫</div>
              <div className="text-sm font-black text-gray-800 mt-0.5">{totalH.toFixed(1)}</div>
            </div>
          )}
          {!plant.isHarvested && (
            <div className="bg-white/70 rounded-2xl p-2.5 text-center">
              <div className="text-[10px] font-bold text-gray-500">水やり目安</div>
              <div className="text-sm font-black text-gray-800 mt-0.5">{plant.wateringInterval}日に1回</div>
            </div>
          )}
        </div>
      </div>

      {instance.plans?.trim() && (
        <div className="px-4 mt-3">
          <div className="bg-yellow-50 rounded-2xl p-3 border border-yellow-100">
            <div className="text-[11px] font-black text-yellow-700 mb-1 flex items-center gap-1">📌 メモ・予定</div>
            <div className="text-xs text-gray-700 leading-relaxed whitespace-pre-wrap">{instance.plans}</div>
          </div>
        </div>
      )}

      <div className="px-4 mt-4">
        <div className="overflow-x-auto -mx-4 px-4 pb-1" style={{ WebkitOverflowScrolling:'touch' }}>
          <div className="flex gap-1.5" style={{ width: 'max-content' }}>
            {visibleTypes.map(t => {
              const cnt = (records[t.id] || []).length;
              return (
                <button key={t.id} onClick={() => setActiveType(t.id)}
                  className={`flex-shrink-0 px-3 py-2 rounded-2xl font-black text-xs flex items-center gap-1.5 ${activeType === t.id ? 'bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md' : 'bg-white text-gray-600 ring-1 ring-gray-200'}`}>
                  <RecordIcon recordTypeId={t.id} size={14}/>
                  {t.name}
                  {cnt > 0 && <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${activeType === t.id ? 'bg-white/30' : 'bg-gray-100'}`}>{cnt}</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-4 mt-3 space-y-2">
        <button onClick={() => setRecordModal({ editing: null })}
          className="w-full bg-gradient-to-r from-emerald-400 to-green-500 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 flex items-center justify-center gap-1.5">
          <Plus size={16} strokeWidth={3}/>{getRecType(activeType).name}を記録
        </button>
        {activeRecords.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-sm font-bold text-gray-500">まだ記録がありません</div>
          </div>
        ) : (
          activeRecords.map(rec => (
            <RecordEntry key={rec.id} rec={rec} type={getRecType(activeType)}
              onEdit={() => setRecordModal({ editing: rec })}
              onDelete={() => { if (confirm('この記録を削除しますか?')) deleteRecord(rec.id); }} />
          ))
        )}
      </div>

      <div className="px-4 mt-6 flex gap-2">
        <button onClick={archiveInstance} className="flex-1 bg-gray-100 text-gray-700 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1 active:scale-95">
          <Archive size={13}/>アーカイブ
        </button>
        <button onClick={() => setConfirmDelete(true)} className="flex-1 bg-red-50 text-red-600 font-bold py-2.5 rounded-2xl text-xs flex items-center justify-center gap-1 active:scale-95">
          <Trash2 size={13}/>削除
        </button>
      </div>

      {recordModal && (
        <RecordFormModal open={true} onClose={() => setRecordModal(null)}
          onSave={saveRecord} recordTypeId={activeType} editing={recordModal.editing} />
      )}

      {editingMeta && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={() => setEditingMeta(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-gray-800">✏️ 鉢の情報を編集</h3>
                <button onClick={() => setEditingMeta(false)} className="p-1.5 rounded-full hover:bg-gray-100">
                  <X size={20} className="text-gray-500" />
                </button>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1.5">📛 ニックネーム</label>
                <input type="text" value={tempName} onChange={e => setTempName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1.5">🪴 鉢サイズ</label>
                <input type="text" value={tempPotSize} onChange={e => setTempPotSize(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1.5">📌 メモ・予定</label>
                <textarea value={tempPlans} onChange={e => setTempPlans(e.target.value)} rows={4}
                  placeholder="次の追肥は来週、剪定の予定..."
                  className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-300 resize-none" />
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={() => setEditingMeta(false)} className="flex-1 bg-gray-100 text-gray-700 font-black py-3 rounded-2xl active:scale-95">
                  キャンセル
                </button>
                <button onClick={saveMeta} className="flex-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-black py-3 rounded-2xl shadow-md active:scale-95">
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setConfirmDelete(false)}>
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-black text-gray-800 mb-2">本当に削除しますか?</h3>
            <p className="text-sm text-gray-600 mb-4">「{instance.name}」とすべての記録が完全に削除されます。この操作は取り消せません。</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmDelete(false)} className="flex-1 bg-gray-100 text-gray-700 font-black py-3 rounded-2xl active:scale-95">
                キャンセル
              </button>
              <button onClick={deleteInstance} className="flex-1 bg-red-500 text-white font-black py-3 rounded-2xl shadow-md active:scale-95">
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============== 地域選択 ==============
function LocationPickerModal({ open, onClose, currentLocation, onSelect }) {
  const [selectedPref, setSelectedPref] = useState(currentLocation?.prefecture || DEFAULT_LOCATION.prefecture);
  const [q, setQ] = useState('');

  useEffect(() => {
    if (open) { setSelectedPref(currentLocation?.prefecture || DEFAULT_LOCATION.prefecture); setQ(''); }
  }, [open, currentLocation]);

  if (!open) return null;

  const filtered = q.trim()
    ? CITIES.filter(c => c.name.includes(q) || c.prefecture.includes(q))
    : CITIES.filter(c => c.prefecture === selectedPref);

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md flex flex-col shadow-2xl" style={{ maxHeight: '90vh' }} onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="text-base font-black text-gray-800 flex items-center gap-1">📍 お住まいの地域</h3>
            <button onClick={onClose} className="ml-auto p-1.5 rounded-full hover:bg-gray-100">
              <X size={20} className="text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" value={q} onChange={e => setQ(e.target.value)} placeholder="市区町村を検索"
              className="w-full pl-9 pr-9 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300" />
            {q && (
              <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X size={14} />
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-1 overflow-hidden">
          {!q && (
            <div className="w-28 border-r border-gray-100 overflow-y-auto" style={{ WebkitOverflowScrolling:'touch' }}>
              {PREFECTURES.map(p => (
                <button key={p} onClick={() => setSelectedPref(p)}
                  className={`w-full text-left px-3 py-2.5 text-xs font-bold border-b border-gray-50 ${selectedPref === p ? 'bg-emerald-50 text-emerald-700 border-l-4 border-l-emerald-500' : 'text-gray-700 hover:bg-gray-50'}`}>
                  {p}
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling:'touch' }}>
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm font-bold">該当する地域なし</div>
            ) : (
              filtered.map(c => {
                const isCurrent = currentLocation?.name === c.name && currentLocation?.prefecture === c.prefecture;
                return (
                  <button key={`${c.prefecture}-${c.name}`} onClick={() => { onSelect(c); onClose(); }}
                    className={`w-full text-left px-4 py-3 border-b border-gray-50 flex items-center justify-between ${isCurrent ? 'bg-emerald-50' : 'hover:bg-gray-50'}`}>
                    <div>
                      <div className="font-black text-sm text-gray-800">{c.name}</div>
                      {q && <div className="text-[10px] font-bold text-gray-500">{c.prefecture}</div>}
                    </div>
                    {isCurrent && <Check size={16} className="text-emerald-600"/>}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============== 設定画面 ==============
function SettingsView({ data, setData }) {
  const [locationOpen, setLocationOpen] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const archived = (data.instances || []).filter(i => i.archived);

  function handleExport() {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `midori-backup-${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        const migrated = migrateData(imported);
        if (confirm(`${migrated.instances.length}個の鉢のデータをインポートします。現在のデータは置き換えられます。よろしいですか?`)) {
          setData(migrated);
          alert('インポートが完了しました!');
        }
      } catch (err) {
        alert('ファイルの読み込みに失敗しました: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function restoreInstance(id) {
    setData(prev => ({
      ...prev,
      instances: prev.instances.map(i => i.id === id ? { ...i, archived: false } : i)
    }));
  }

  function permanentDelete(id) {
    if (!confirm('この鉢を完全に削除しますか?この操作は取り消せません。')) return;
    setData(prev => ({ ...prev, instances: prev.instances.filter(i => i.id !== id) }));
  }

  return (
    <div className="space-y-4 pb-28 px-4 pt-3">
      <div className="px-1">
        <div className="text-xs text-gray-500 font-bold">SETTINGS</div>
        <h1 className="text-2xl font-black text-gray-800 mt-0.5">設定 ⚙️</h1>
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-sm">
        <div className="text-xs font-black text-gray-500 mb-2 px-1">📍 地域設定</div>
        <button onClick={() => setLocationOpen(true)}
          className="w-full bg-gradient-to-br from-sky-50 to-indigo-50 rounded-2xl p-4 flex items-center justify-between active:scale-[0.98]">
          <div className="text-left">
            <div className="text-[10px] font-bold text-gray-500">{data.location?.prefecture || '東京都'}</div>
            <div className="font-black text-base text-gray-800 mt-0.5">{data.location?.name || '東京都心'}</div>
            <div className="text-[10px] font-bold text-sky-700 mt-1 leading-snug">
              {CLIMATE_DESCRIPTIONS[data.location?.climate] || CLIMATE_DESCRIPTIONS.pacific_temperate}
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400 flex-shrink-0 ml-2"/>
        </button>
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-sm space-y-2">
        <div className="text-xs font-black text-gray-500 mb-1 px-1">💾 データ管理</div>
        <button onClick={handleExport} className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98]">
          <div className="bg-blue-100 rounded-xl p-2"><Download size={18} className="text-blue-600"/></div>
          <div className="text-left flex-1">
            <div className="font-black text-sm text-gray-800">バックアップを書き出し</div>
            <div className="text-[10px] font-bold text-gray-500">JSONファイルとして保存</div>
          </div>
        </button>
        <label className="w-full bg-gray-50 hover:bg-gray-100 rounded-2xl p-3 flex items-center gap-3 active:scale-[0.98] cursor-pointer">
          <div className="bg-emerald-100 rounded-xl p-2"><Upload size={18} className="text-emerald-600"/></div>
          <div className="text-left flex-1">
            <div className="font-black text-sm text-gray-800">バックアップを読み込み</div>
            <div className="text-[10px] font-bold text-gray-500">既存データは置き換えられます</div>
          </div>
          <input type="file" accept=".json,application/json" onChange={handleImport} className="hidden"/>
        </label>
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-sm">
        <button onClick={() => setShowArchived(!showArchived)}
          className="w-full flex items-center justify-between mb-2 px-1">
          <div className="text-xs font-black text-gray-500 flex items-center gap-1.5">
            <Archive size={12}/>アーカイブ ({archived.length})
          </div>
          {showArchived ? <ChevronDown size={16} className="text-gray-400"/> : <ChevronRight size={16} className="text-gray-400"/>}
        </button>
        {showArchived && (
          archived.length === 0 ? (
            <div className="text-center py-4 text-xs text-gray-400 font-bold">アーカイブされた鉢はありません</div>
          ) : (
            <div className="space-y-2">
              {archived.map(inst => (
                <div key={inst.id} className="bg-gray-50 rounded-2xl p-3 flex items-center gap-3">
                  <PlantIcon plantId={inst.plantTypeId} size={28}/>
                  <div className="flex-1 min-w-0">
                    <div className="font-black text-sm text-gray-700 truncate">{inst.name}</div>
                  </div>
                  <button onClick={() => restoreInstance(inst.id)} className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">復元</button>
                  <button onClick={() => permanentDelete(inst.id)} className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded-full">削除</button>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <div className="bg-white rounded-3xl p-4 shadow-sm text-center text-xs text-gray-500 space-y-1">
        <p className="font-bold text-emerald-700 text-sm">🌱 みどりのある暮らし v1.0</p>
        <p className="font-medium">日々の植物のお世話を、もっと楽しく</p>
      </div>

      <LocationPickerModal open={locationOpen} onClose={() => setLocationOpen(false)}
        currentLocation={data.location}
        onSelect={(loc) => setData(prev => ({ ...prev, location: loc }))} />
    </div>
  );
}

// ============== 下部ナビ ==============
function BottomNav({ view, setView }) {
  const items = [
    { id: 'dashboard', name: 'ホーム', icon: Home },
    { id: 'map', name: 'マップ', icon: MapIcon },
    { id: 'chat', name: 'AI相談', icon: MessageCircle },
    { id: 'settings', name: '設定', icon: SettingsIcon },
  ];
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 safe-area-bottom">
      <div className="max-w-md mx-auto flex">
        {items.map(item => {
          const Icon = item.icon;
          const active = view === item.id;
          return (
            <button key={item.id} onClick={() => setView(item.id)}
              className={`flex-1 py-2.5 flex flex-col items-center gap-0.5 ${active ? 'text-emerald-600' : 'text-gray-400'} active:scale-95 transition-transform`}>
              <Icon size={20} strokeWidth={active ? 2.5 : 2}/>
              <span className="text-[10px] font-black">{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============== メインアプリ ==============
const STORAGE_KEY = 'midori-life-data-v1';

export default function App() {
  const [data, setData] = useState({ instances: [], location: DEFAULT_LOCATION });
  const [loaded, setLoaded] = useState(false);
  const [view, setView] = useState('dashboard');
  const [selectedInstanceId, setSelectedInstanceId] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [chatFocusId, setChatFocusId] = useState(null);

  // データ読み込み
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get(STORAGE_KEY);
        if (res?.value) {
          const parsed = JSON.parse(res.value);
          setData(migrateData(parsed));
        }
      } catch (e) {
        console.log('No saved data or load error:', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  // データ保存
  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try { await window.storage.set(STORAGE_KEY, JSON.stringify(data)); }
      catch (e) { console.error('save error:', e); }
    })();
  }, [data, loaded]);

  // 天気取得
  const refreshWeather = async () => {
    setWeatherLoading(true);
    const w = await fetchWeatherSmart(data.location);
    setWeather(w || generateMockWeather(data.location));
    setWeatherLoading(false);
  };

  useEffect(() => {
    if (!loaded) return;
    setWeather(generateMockWeather(data.location));
    refreshWeather();
  }, [loaded, data.location?.lat, data.location?.lng]);

  function addInstance({ plantTypeId, name, potSize }) {
    const id = newId('inst');
    setData(prev => ({
      ...prev,
      instances: [...(prev.instances || []), {
        id, plantTypeId, name, potSize, records: {}, plans: '', archived: false,
      }]
    }));
  }

  const selectedInstance = selectedInstanceId
    ? (data.instances || []).find(i => i.id === selectedInstanceId)
    : null;

  if (!loaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3 animate-bounce">🌱</div>
          <div className="text-sm font-black text-emerald-700">読み込み中...</div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3 animate-bounce">🌱</div>
          <div className="text-sm font-black text-emerald-700">天気情報を取得中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/30 to-green-50/30">
      <div className="max-w-md mx-auto bg-white min-h-screen relative shadow-xl">
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
          <div className="px-4 py-3 flex items-center gap-2">
            <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl p-1.5 shadow-md">
              <Leaf size={18} className="text-white" />
            </div>
            <div className="font-black text-lg bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              みどりのある暮らし
            </div>
          </div>
        </div>

        {selectedInstance ? (
          <InstanceDetailView instance={selectedInstance} setData={setData}
            onBack={() => setSelectedInstanceId(null)}
            onChat={() => { setChatFocusId(selectedInstanceId); setSelectedInstanceId(null); setView('chat'); }} />
        ) : (
          <>
            {view === 'dashboard' && (
              <DashboardView data={data} weather={weather} weatherLoading={weatherLoading}
                onInstanceSelect={setSelectedInstanceId}
                onAddInstance={() => setAddModalOpen(true)}
                onRefreshWeather={refreshWeather} />
            )}
            {view === 'map' && (
              <MapView data={data} setData={setData}
                onInstanceSelect={setSelectedInstanceId}
                onAddInstance={() => setAddModalOpen(true)} />
            )}
            {view === 'chat' && (
              <ChatView data={data} weather={weather} focusInstanceId={chatFocusId}
                onClearFocus={() => setChatFocusId(null)} />
            )}
            {view === 'settings' && (
              <SettingsView data={data} setData={setData} />
            )}
          </>
        )}

        {!selectedInstance && <BottomNav view={view} setView={(v) => { setView(v); if (v !== 'chat') setChatFocusId(null); }} />}

        <AddInstanceModal open={addModalOpen} onClose={() => setAddModalOpen(false)} onAdd={addInstance} />
      </div>
    </div>
  );
}
