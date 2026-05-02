import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Home, ClipboardList, Settings as SettingsIcon, Sun, CloudRain, CloudSun, Cloud, Wind, Droplets, Calendar as CalendarIcon, Download, Upload, Trash2, Sparkles, TrendingUp, X, Leaf, Plus, Edit3, Check, MapPin, StickyNote, Map as MapIcon, MessageCircle, Send, Camera, RefreshCw, Archive, ArrowLeft, GripVertical, Search, ChevronDown, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

// ============== featured SVG ==============
const sBlueberry=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="13" cy="6" rx="2" ry="3" fill="#5A9A3A" transform="rotate(-30 13 6)"/><ellipse cx="19" cy="6" rx="2" ry="3" fill="#5A9A3A" transform="rotate(30 19 6)"/><line x1="16" y1="4" x2="16" y2="12" stroke="#3F6F2A" strokeWidth="1.2"/><circle cx="11" cy="17" r="5.5" fill="#3B5998"/><circle cx="21" cy="17" r="5.5" fill="#3B5998"/><circle cx="16" cy="22" r="6" fill="#4A6BAB"/><circle cx="11" cy="14" r="1.4" fill="#1A2D4D" opacity="0.7"/><circle cx="21" cy="14" r="1.4" fill="#1A2D4D" opacity="0.7"/><circle cx="16" cy="19" r="1.4" fill="#1A2D4D" opacity="0.7"/><ellipse cx="9" cy="15.5" rx="1.2" ry="1.8" fill="#A0B5D8" opacity="0.8"/><ellipse cx="19" cy="15.5" rx="1.2" ry="1.8" fill="#A0B5D8" opacity="0.8"/><ellipse cx="14" cy="20.5" rx="1.2" ry="1.8" fill="#A0B5D8" opacity="0.8"/></svg>);
const sFig=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 16 11 C 22 11 26 16 26 21 C 26 26 22 29 16 29 C 10 29 6 26 6 21 C 6 16 10 11 16 11 Z" fill="#6B3F8C"/><path d="M 12 5 L 20 5 L 16 11 Z" fill="#5A9A3A"/><path d="M 9 7 L 14 9 L 11 12 Z" fill="#6BB048"/><path d="M 23 7 L 18 9 L 21 12 Z" fill="#6BB048"/><ellipse cx="11" cy="18" rx="2" ry="3" fill="#A56FC2" opacity="0.6"/><circle cx="18" cy="22" r="0.5" fill="#FFE0CC"/><circle cx="14" cy="24" r="0.5" fill="#FFE0CC"/><circle cx="20" cy="25" r="0.5" fill="#FFE0CC"/><circle cx="16" cy="20" r="0.5" fill="#FFE0CC"/></svg>);
const sRaspberry=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 11 6 Q 14 9 12 11 L 14 11 Z" fill="#5A9A3A"/><line x1="16" y1="4" x2="16" y2="11" stroke="#5A9A3A" strokeWidth="1.5" strokeLinecap="round"/><path d="M 21 6 Q 18 9 20 11 L 18 11 Z" fill="#5A9A3A"/><circle cx="11" cy="14" r="2.6" fill="#D63A5A"/><circle cx="16" cy="13" r="2.6" fill="#E04A6E"/><circle cx="21" cy="14" r="2.6" fill="#D63A5A"/><circle cx="9" cy="18" r="2.6" fill="#B82847"/><circle cx="13" cy="17.5" r="2.6" fill="#E04A6E"/><circle cx="19" cy="17.5" r="2.6" fill="#E04A6E"/><circle cx="23" cy="18" r="2.6" fill="#B82847"/><circle cx="11" cy="22" r="2.6" fill="#D63A5A"/><circle cx="16" cy="22" r="2.6" fill="#B82847"/><circle cx="21" cy="22" r="2.6" fill="#D63A5A"/><circle cx="13.5" cy="26" r="2.3" fill="#E04A6E"/><circle cx="18.5" cy="26" r="2.3" fill="#E04A6E"/></svg>);
const sNira=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 8 28 Q 7 18 5 4" stroke="#3F8B2E" strokeWidth="2.2" fill="none" strokeLinecap="round"/><path d="M 12 28 Q 11 16 10 3" stroke="#52B788" strokeWidth="2.4" fill="none" strokeLinecap="round"/><path d="M 16 28 L 16 2" stroke="#3F8B2E" strokeWidth="2.4" fill="none" strokeLinecap="round"/><path d="M 20 28 Q 21 16 22 3" stroke="#52B788" strokeWidth="2.4" fill="none" strokeLinecap="round"/><path d="M 24 28 Q 25 18 27 4" stroke="#3F8B2E" strokeWidth="2.2" fill="none" strokeLinecap="round"/><ellipse cx="16" cy="28" rx="11" ry="1.5" fill="#7A5A3A"/></svg>);
const sHydrangea=(s)=>{const fl=[[10,8,'#9B7FED'],[16,6,'#7B68EE'],[22,8,'#A78BD4'],[7,13,'#7B68EE'],[13,11,'#A78BD4'],[19,11,'#9B7FED'],[25,13,'#7B68EE'],[10,17,'#A78BD4'],[16,16,'#9B7FED'],[22,17,'#7B68EE'],[13,21,'#7B68EE'],[19,21,'#A78BD4']];return(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="9" cy="26" rx="5" ry="2.2" fill="#3F8B2E" transform="rotate(-25 9 26)"/><ellipse cx="23" cy="26" rx="5" ry="2.2" fill="#3F8B2E" transform="rotate(25 23 26)"/><ellipse cx="16" cy="27" rx="3" ry="1.5" fill="#2F6F22"/>{fl.map((f,i)=>(<g key={i} transform={`translate(${f[0]},${f[1]})`}><ellipse cx="0" cy="-1.8" rx="1.5" ry="1.8" fill={f[2]}/><ellipse cx="1.8" cy="0" rx="1.8" ry="1.5" fill={f[2]}/><ellipse cx="0" cy="1.8" rx="1.5" ry="1.8" fill={f[2]}/><ellipse cx="-1.8" cy="0" rx="1.8" ry="1.5" fill={f[2]}/><circle cx="0" cy="0" r="0.6" fill="#FFE869"/></g>))}</svg>);};
const sMarigold=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32">{[0,30,60,90,120,150,180,210,240,270,300,330].map(a=>(<ellipse key={`o${a}`} cx="16" cy="6" rx="2.5" ry="4.5" fill="#FFD700" transform={`rotate(${a} 16 16)`}/>))}{[15,45,75,105,135,165,195,225,255,285,315,345].map(a=>(<ellipse key={`m${a}`} cx="16" cy="9" rx="2.2" ry="3.5" fill="#FFEC4F" transform={`rotate(${a} 16 16)`}/>))}{[0,60,120,180,240,300].map(a=>(<ellipse key={`i${a}`} cx="16" cy="11" rx="2" ry="2.8" fill="#FFF59D" transform={`rotate(${a} 16 16)`}/>))}<circle cx="16" cy="16" r="2.2" fill="#F59E0B"/><circle cx="16" cy="16" r="1" fill="#92400E"/></svg>);
const sPot=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 8 13 L 24 13 L 22 27 Q 22 28 21 28 L 11 28 Q 10 28 10 27 Z" fill="#C97E5F"/><rect x="5" y="10" width="22" height="4" rx="1.5" fill="#D69377"/><ellipse cx="16" cy="11" rx="11" ry="1.8" fill="#A86347"/><ellipse cx="11" cy="18" rx="1.2" ry="3.5" fill="#E5A98C" opacity="0.5"/></svg>);
const sBasket=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><circle cx="10" cy="13" r="2.8" fill="#E63946"/><path d="M 17 11.5 Q 14.8 11.5 14.8 14 Q 14.8 17 17 17 Q 19.2 17 19.2 14 Q 19.2 11.5 17 11.5 Z" fill="#E94560"/><circle cx="6" cy="15" r="1.7" fill="#3B5998"/><circle cx="7.8" cy="14.2" r="1.4" fill="#4A6BAB"/><path d="M 4 17 L 28 17 L 26 28.5 Q 26 29.5 25 29.5 L 7 29.5 Q 6 29.5 6 28.5 Z" fill="#B8804A"/><ellipse cx="16" cy="17" rx="12" ry="1.6" fill="#9A6633"/><rect x="3.5" y="16" width="25" height="2.2" rx="0.8" fill="#D4A574"/><path d="M 7 19.5 Q 16 21 25 19.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/><path d="M 7 22.5 Q 16 24 25 22.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/><path d="M 7.5 25.5 Q 16 27 24.5 25.5" stroke="#7A5230" strokeWidth="0.4" fill="none" opacity="0.6"/></svg>);
const sKuushinsai=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 16 29 L 16 16" stroke="#4A8B3A" strokeWidth="1.5" fill="none" strokeLinecap="round"/><path d="M 16 22 Q 13 18 9 14" stroke="#4A8B3A" strokeWidth="1.3" fill="none" strokeLinecap="round"/><path d="M 16 22 Q 19 18 23 14" stroke="#4A8B3A" strokeWidth="1.3" fill="none" strokeLinecap="round"/><path d="M 16 16 L 13 11 L 14 6 L 16 4 L 18 6 L 19 11 Z" fill="#52B788"/><path d="M 9 14 L 5 12 L 4 8 L 6 6 L 9 7 L 11 11 Z" fill="#6BC990"/><path d="M 23 14 L 27 12 L 28 8 L 26 6 L 23 7 L 21 11 Z" fill="#6BC990"/></svg>);
const sCare=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 13.5 14.5 Q 9 9 3 5.5 Q 1.5 5 2 7.5 Q 7 11.5 12 15.5 Z" fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.3"/><path d="M 13.5 17.5 Q 9 23 3 26.5 Q 1.5 27 2 24.5 Q 7 20.5 12 16.5 Z" fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.3"/><path d="M 16 14 Q 21 10.5 28 6 Q 30 5 30 7.5 Q 28 11 22.5 14.5 Q 18 16.5 16 16 Z" fill="#D5DBDB" stroke="#5C2D17" strokeWidth="1.3"/><path d="M 16 18 Q 22 18.5 29 17.5 Q 30.5 17.5 30 19.5 Q 28 21.5 22 21 Q 18 20 16 19 Z" fill="#EAEDED" stroke="#5C2D17" strokeWidth="1.3"/><circle cx="14.5" cy="16" r="2.6" fill="#FF7A2C" stroke="#5C2D17" strokeWidth="1.2"/><circle cx="14.5" cy="16" r="1" fill="#3A1810"/></svg>);

// ============== カタログ用SVG ==============
const sPepper=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><rect x="14.5" y="3" width="3" height="3.5" rx="0.5" fill="#5A8B3A"/><path d="M 12 6 Q 14 5 16 5.5 Q 18 5 20 6 L 20 8 Q 18 7.5 16 8 Q 14 7.5 12 8 Z" fill="#6BAA48"/><path d="M 9 11 Q 8 8 11 8 Q 14 9 16 8.5 Q 18 9 21 8 Q 24 8 23 11 L 24 22 Q 24 28 16 28 Q 8 28 8 22 Z" fill="#4A8B3A"/><ellipse cx="12" cy="16" rx="1.5" ry="5" fill="#7BC36F" opacity="0.6"/></svg>);
const sRoot=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="13" cy="9" rx="2.5" ry="4" fill="#5A9A3A" transform="rotate(-25 13 9)"/><ellipse cx="19" cy="9" rx="2.5" ry="4" fill="#5A9A3A" transform="rotate(25 19 9)"/><ellipse cx="16" cy="7" rx="2.2" ry="4.8" fill="#6BC990"/><circle cx="16" cy="20" r="6.8" fill="#FBF7EE"/><circle cx="16" cy="20" r="6.8" fill="none" stroke="#C9BFA8" strokeWidth="0.7"/><ellipse cx="13" cy="18" rx="1.5" ry="2.8" fill="#FFFFFF" opacity="0.6"/></svg>);
const sMitsuba=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><line x1="16" y1="29" x2="16" y2="14" stroke="#5A8B3A" strokeWidth="1.5" strokeLinecap="round"/><ellipse cx="16" cy="9" rx="3" ry="4.5" fill="#52B788"/><ellipse cx="10" cy="13" rx="3" ry="4.5" fill="#6BC990" transform="rotate(-50 10 13)"/><ellipse cx="22" cy="13" rx="3" ry="4.5" fill="#6BC990" transform="rotate(50 22 13)"/></svg>);
const sLeek=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><rect x="13" y="16" width="6" height="13" fill="#FBF7EE"/><rect x="13" y="16" width="6" height="13" fill="none" stroke="#C9BFA8" strokeWidth="0.5"/><path d="M 13 16 Q 11 4 12 3 Q 13 4 14 16 Z" fill="#52B788"/><path d="M 14 16 L 14.5 3 Q 15 2 15.5 3 L 15 16 Z" fill="#6BC990"/><path d="M 16.5 16 L 17 3 Q 17.5 2 18 3 L 18 16 Z" fill="#6BC990"/><path d="M 18 16 Q 20 4 20 3 Q 21 4 19 16 Z" fill="#52B788"/></svg>);
const sYam=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="16" cy="18" rx="4.5" ry="11" fill="#B58962" transform="rotate(15 16 18)"/><ellipse cx="16" cy="18" rx="4.5" ry="11" fill="none" stroke="#7A5230" strokeWidth="0.6" transform="rotate(15 16 18)"/><ellipse cx="14" cy="6" rx="1.5" ry="2.5" fill="#5A9A3A" transform="rotate(-25 14 6)"/><ellipse cx="18" cy="5" rx="1.5" ry="3" fill="#6BC990"/></svg>);
const sBean=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 6 19 Q 6 8 16 7 Q 26 8 26 19 Q 23 21 16 20 Q 9 21 6 19 Z" fill="#6BC990"/><path d="M 6 19 Q 6 8 16 7 Q 26 8 26 19 Q 23 21 16 20 Q 9 21 6 19 Z" fill="none" stroke="#3F8B2E" strokeWidth="1"/><circle cx="10" cy="14" r="2.5" fill="#52B788" opacity="0.7"/><circle cx="16" cy="12" r="2.8" fill="#52B788" opacity="0.7"/><circle cx="22" cy="14" r="2.5" fill="#52B788" opacity="0.7"/></svg>);
const sGinger=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="14" cy="10" rx="1.5" ry="3" fill="#5A9A3A" transform="rotate(-15 14 10)"/><ellipse cx="18" cy="9" rx="1.5" ry="3.5" fill="#6BC990"/><ellipse cx="16" cy="18" rx="6" ry="4" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.7"/><ellipse cx="9" cy="20" rx="3" ry="2" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.5" transform="rotate(-30 9 20)"/><ellipse cx="23" cy="20" rx="3" ry="2" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.5" transform="rotate(30 23 20)"/><ellipse cx="13" cy="24" rx="2.5" ry="1.8" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.5"/><ellipse cx="19" cy="24" rx="2.5" ry="1.8" fill="#E5C29A" stroke="#A87B4A" strokeWidth="0.5"/></svg>);
const sAsparagus=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 10 30 L 11 6" stroke="#52B788" strokeWidth="2.6" strokeLinecap="round"/><path d="M 16 30 L 16 4" stroke="#3F8B2E" strokeWidth="2.8" strokeLinecap="round"/><path d="M 22 30 L 21 6" stroke="#52B788" strokeWidth="2.6" strokeLinecap="round"/><ellipse cx="11" cy="6" rx="1.7" ry="2.4" fill="#3F8B2E"/><ellipse cx="16" cy="4" rx="1.9" ry="2.6" fill="#2D6F1F"/><ellipse cx="21" cy="6" rx="1.7" ry="2.4" fill="#3F8B2E"/></svg>);
const sOkra=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 13 5 L 19 5 L 18 8 L 14 8 Z" fill="#5A9A3A"/><path d="M 13 8 L 12 27 Q 12 30 14 30 L 18 30 Q 20 30 20 27 L 19 8 Z" fill="#6BC990" stroke="#3F8B2E" strokeWidth="0.8"/><line x1="14.5" y1="9" x2="14" y2="29" stroke="#3F8B2E" strokeWidth="0.6"/><line x1="16" y1="9" x2="16" y2="30" stroke="#3F8B2E" strokeWidth="0.6"/><line x1="17.5" y1="9" x2="18" y2="29" stroke="#3F8B2E" strokeWidth="0.6"/></svg>);
const sAzalea=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="6" cy="22" rx="3.5" ry="2" fill="#3F8B2E" transform="rotate(-30 6 22)"/><ellipse cx="26" cy="22" rx="3.5" ry="2" fill="#3F8B2E" transform="rotate(30 26 22)"/><g transform="translate(7,11) scale(0.6)"><ellipse cx="0" cy="-4" rx="3" ry="3.5" fill="#FF8FB8"/><ellipse cx="3.8" cy="-1" rx="3.5" ry="3" fill="#FF8FB8"/><ellipse cx="2.4" cy="3.5" rx="3" ry="3.5" fill="#FF8FB8"/><ellipse cx="-2.4" cy="3.5" rx="3" ry="3.5" fill="#FF8FB8"/><ellipse cx="-3.8" cy="-1" rx="3.5" ry="3" fill="#FF8FB8"/><circle cx="0" cy="0" r="1" fill="#FFE869"/></g><g transform="translate(25,11) scale(0.6)"><ellipse cx="0" cy="-4" rx="3" ry="3.5" fill="#FF8FB8"/><ellipse cx="3.8" cy="-1" rx="3.5" ry="3" fill="#FF8FB8"/><ellipse cx="2.4" cy="3.5" rx="3" ry="3.5" fill="#FF8FB8"/><ellipse cx="-2.4" cy="3.5" rx="3" ry="3.5" fill="#FF8FB8"/><ellipse cx="-3.8" cy="-1" rx="3.5" ry="3" fill="#FF8FB8"/><circle cx="0" cy="0" r="1" fill="#FFE869"/></g><g transform="translate(16,15)"><ellipse cx="0" cy="-4.5" rx="3.2" ry="3.8" fill="#FF6B9D"/><ellipse cx="4.2" cy="-1.2" rx="3.8" ry="3.2" fill="#FF6B9D"/><ellipse cx="2.6" cy="3.8" rx="3.2" ry="3.8" fill="#FF6B9D"/><ellipse cx="-2.6" cy="3.8" rx="3.2" ry="3.8" fill="#FF6B9D"/><ellipse cx="-4.2" cy="-1.2" rx="3.8" ry="3.2" fill="#FF6B9D"/><circle cx="0" cy="0" r="1.4" fill="#FFE869"/></g></svg>);
const sKaki=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="16" cy="20" rx="9" ry="8" fill="#FF8C42" stroke="#D4651F" strokeWidth="0.7"/><path d="M 11 12 L 13 9 L 16 11 L 19 9 L 21 12 L 18 14 L 16 13 L 14 14 Z" fill="#5A8B3A"/><ellipse cx="16" cy="12.5" rx="3.2" ry="1.3" fill="#3F8B2E"/><line x1="16" y1="9.5" x2="16" y2="6.5" stroke="#7A5230" strokeWidth="1.3" strokeLinecap="round"/><ellipse cx="12" cy="17" rx="2" ry="3" fill="#FFB585" opacity="0.6"/></svg>);
const sBerry=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><path d="M 16 30 Q 14 22 16 14 Q 18 8 16 4" stroke="#7A5230" strokeWidth="1" fill="none" strokeLinecap="round"/><ellipse cx="9" cy="13" rx="3.5" ry="1.6" fill="#52B788" transform="rotate(-30 9 13)"/><ellipse cx="23" cy="11" rx="3.5" ry="1.6" fill="#52B788" transform="rotate(30 23 11)"/><ellipse cx="11" cy="22" rx="3" ry="1.4" fill="#3F8B2E" transform="rotate(-25 11 22)"/><ellipse cx="21" cy="24" rx="3" ry="1.4" fill="#3F8B2E" transform="rotate(25 21 24)"/><circle cx="14" cy="9" r="2.2" fill="#5A3A8B"/><circle cx="19" cy="14" r="2.2" fill="#3A2055"/><circle cx="13" cy="18" r="2.2" fill="#7A2A4E"/><circle cx="20" cy="20" r="2" fill="#5A8B3A"/></svg>);
const sPurpleFlower=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><line x1="16" y1="30" x2="16" y2="18" stroke="#3F8B2E" strokeWidth="1.5" strokeLinecap="round"/><ellipse cx="11" cy="24" rx="3" ry="1.5" fill="#52B788" transform="rotate(-30 11 24)"/><ellipse cx="21" cy="22" rx="3" ry="1.5" fill="#52B788" transform="rotate(30 21 22)"/><ellipse cx="16" cy="9" rx="3.5" ry="4.5" fill="#9B7FED"/><ellipse cx="22" cy="13" rx="4.5" ry="3.5" fill="#7B68EE"/><ellipse cx="20" cy="20" rx="4" ry="3.5" fill="#9B7FED"/><ellipse cx="12" cy="20" rx="4" ry="3.5" fill="#9B7FED"/><ellipse cx="10" cy="13" rx="4.5" ry="3.5" fill="#7B68EE"/><circle cx="16" cy="14" r="2" fill="#FFE869"/><circle cx="16" cy="14" r="1" fill="#F59E0B"/></svg>);
const sHouseplant=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><ellipse cx="16" cy="9" rx="2.2" ry="6" fill="#3F8B2E"/><ellipse cx="10" cy="11" rx="2" ry="5" fill="#52B788" transform="rotate(-35 10 11)"/><ellipse cx="22" cy="11" rx="2" ry="5" fill="#52B788" transform="rotate(35 22 11)"/><ellipse cx="7" cy="15" rx="1.8" ry="4" fill="#6BC990" transform="rotate(-65 7 15)"/><ellipse cx="25" cy="15" rx="1.8" ry="4" fill="#6BC990" transform="rotate(65 25 15)"/><path d="M 9 18 L 23 18 L 21.5 28 Q 21.5 29.5 20 29.5 L 12 29.5 Q 10.5 29.5 10.5 28 Z" fill="#C97E5F"/><rect x="8" y="16" width="16" height="3" rx="1" fill="#D69377"/><ellipse cx="16" cy="17" rx="7.5" ry="1" fill="#A86347"/></svg>);
const sSucculent=(s)=>(<svg width={s} height={s} viewBox="0 0 32 32"><g transform="translate(16,18)"><ellipse cx="0" cy="-9" rx="2.2" ry="5.5" fill="#52B788"/><ellipse cx="6.4" cy="-6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(40)"/><ellipse cx="9" cy="0" rx="2.2" ry="5.5" fill="#52B788" transform="rotate(80)"/><ellipse cx="6.4" cy="6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(125)"/><ellipse cx="0" cy="9" rx="2.2" ry="5.5" fill="#52B788" transform="rotate(180)"/><ellipse cx="-6.4" cy="6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(220)"/><ellipse cx="-9" cy="0" rx="2.2" ry="5.5" fill="#52B788" transform="rotate(260)"/><ellipse cx="-6.4" cy="-6.5" rx="2.2" ry="5.5" fill="#5BC499" transform="rotate(310)"/></g><circle cx="16" cy="18" r="1.8" fill="#9DD88A"/><circle cx="16" cy="18" r="0.7" fill="#3F8B2E"/></svg>);

const SVG_ICONS={blueberry:sBlueberry,fig:sFig,raspberry:sRaspberry,nira:sNira,hydrangea:sHydrangea,marigold:sMarigold,kuushinsai:sKuushinsai,pepper:sPepper,root:sRoot,mitsuba:sMitsuba,leek:sLeek,yam:sYam,bean:sBean,ginger:sGinger,asparagus:sAsparagus,okra:sOkra,azalea:sAzalea,kaki:sKaki,berry:sBerry,purpleFlower:sPurpleFlower,houseplant:sHouseplant,succulent:sSucculent};
const FAMILY_HEADER_SVG={'マメ科':'bean','ショウガ科':'ginger','ツツジ科(果樹)':'blueberry','カキノキ科':'kaki','シソ科宿根':'purpleFlower','アヤメ科':'purpleFlower','サトイモ科(観葉)':'houseplant','クワ科観葉':'houseplant','キジカクシ科観葉':'houseplant','イラクサ科':'houseplant','ツユクサ科':'purpleFlower','イワタバコ科':'purpleFlower','その他観葉':'houseplant','ベンケイソウ科':'succulent','ハマミズキ科':'succulent','ハマミズナ科':'succulent','ツルボラン科':'succulent','キジカクシ科多肉':'succulent','その他多肉':'succulent'};

// ============== featured 10種 ==============
const PLANTS=[
  {id:'blueberry',name:'ブルーベリー',svg:sBlueberry,color:'#4A6BAB',bg:'from-blue-100 to-indigo-200',ring:'ring-blue-300',wateringInterval:2,fertilizerInterval:30,isHarvested:true},
  {id:'strawberry',name:'イチゴ',emoji:'🍓',color:'#E94560',bg:'from-pink-100 to-red-200',ring:'ring-rose-300',wateringInterval:2,fertilizerInterval:14,isHarvested:true},
  {id:'fig',name:'イチジク',svg:sFig,color:'#6B3F8C',bg:'from-purple-100 to-fuchsia-200',ring:'ring-purple-300',wateringInterval:3,fertilizerInterval:30,isHarvested:true},
  {id:'raspberry',name:'ラズベリー',svg:sRaspberry,color:'#D63A5A',bg:'from-rose-100 to-pink-200',ring:'ring-pink-300',wateringInterval:2,fertilizerInterval:21,isHarvested:true},
  {id:'nira',name:'ニラ',svg:sNira,color:'#52B788',bg:'from-green-100 to-emerald-200',ring:'ring-emerald-300',wateringInterval:2,fertilizerInterval:21,isHarvested:true},
  {id:'garlic',name:'にんにく',emoji:'🧄',color:'#D4A574',bg:'from-amber-100 to-yellow-200',ring:'ring-amber-300',wateringInterval:4,fertilizerInterval:30,isHarvested:true},
  {id:'shiso',name:'しそ',emoji:'🍃',color:'#9B59B6',bg:'from-violet-100 to-purple-200',ring:'ring-violet-300',wateringInterval:1,fertilizerInterval:14,isHarvested:true},
  {id:'kuushinsai',name:'空心菜',svg:sKuushinsai,color:'#52B788',bg:'from-lime-100 to-green-200',ring:'ring-lime-300',wateringInterval:1,fertilizerInterval:14,isHarvested:true},
  {id:'tomato',name:'ミニトマト',emoji:'🍅',color:'#E63946',bg:'from-red-100 to-orange-200',ring:'ring-red-300',wateringInterval:1,fertilizerInterval:14,isHarvested:true},
  {id:'hydrangea',name:'アジサイ',svg:sHydrangea,color:'#7B68EE',bg:'from-sky-100 to-blue-200',ring:'ring-sky-300',wateringInterval:1,fertilizerInterval:30,isHarvested:false},
  {id:'marigold',name:'マリーゴールド',svg:sMarigold,color:'#FFD700',bg:'from-yellow-100 to-orange-200',ring:'ring-yellow-300',wateringInterval:2,fertilizerInterval:21,isHarvested:false},
];

// ============== カタログ(489種) ==============
const CD={vh:{water:2,fert:14,harvest:true,label:'野菜・ハーブ',bg:'from-green-100 to-emerald-200',ring:'ring-emerald-300',color:'#52B788'},ft:{water:3,fert:30,harvest:true,label:'果樹',bg:'from-rose-100 to-pink-200',ring:'ring-pink-300',color:'#E94560'},ww:{water:3,fert:30,harvest:false,label:'花木・庭木',bg:'from-pink-100 to-fuchsia-200',ring:'ring-fuchsia-300',color:'#C026D3'},af:{water:2,fert:21,harvest:false,label:'一年草・草花',bg:'from-yellow-100 to-orange-200',ring:'ring-yellow-300',color:'#F59E0B'},pf:{water:2,fert:21,harvest:false,label:'多年草・宿根草',bg:'from-purple-100 to-pink-200',ring:'ring-purple-300',color:'#9333EA'},bf:{water:2,fert:21,harvest:false,label:'球根',bg:'from-rose-100 to-yellow-200',ring:'ring-rose-300',color:'#F43F5E'},hp:{water:4,fert:30,harvest:false,label:'観葉植物',bg:'from-emerald-100 to-teal-200',ring:'ring-teal-300',color:'#14B8A6'},sc:{water:10,fert:60,harvest:false,label:'多肉・サボテン',bg:'from-amber-100 to-yellow-200',ring:'ring-amber-300',color:'#D4A574'}};
const TOP_CATEGORIES=[{id:'tab_vh',name:'野菜・ハーブ',icon:'🥬',subs:['vh']},{id:'tab_fw',name:'果樹・花木',icon:'🍎',subs:['ft','ww']},{id:'tab_fh',name:'花・観葉植物',icon:'🌸',subs:['af','pf','bf','hp']},{id:'tab_sc',name:'多肉・サボテン',icon:'🌵',subs:['sc']}];
const G=[
{c:'vh',f:'ナス科',d:'🍆',p:[{n:'トマト',e:'🍅'},{n:'中玉トマト',e:'🍅'},{n:'ナス'},{n:'長ナス'},{n:'米ナス'},{n:'ピーマン',s:'pepper'},{n:'パプリカ',s:'pepper'},{n:'シシトウ',e:'🌶️'},{n:'万願寺とうがらし',e:'🌶️'},{n:'鷹の爪',e:'🌶️'},{n:'ハバネロ',e:'🌶️'},{n:'ジャガイモ',e:'🥔'},{n:'食用ホオズキ'},{n:'トマティージョ'}]},
{c:'vh',f:'アブラナ科',d:'🥬',p:[{n:'キャベツ'},{n:'芽キャベツ'},{n:'ブロッコリー',e:'🥦'},{n:'カリフラワー',e:'🥦'},{n:'ロマネスコ',e:'🥦'},{n:'ハクサイ'},{n:'コマツナ'},{n:'ミズナ'},{n:'チンゲンサイ'},{n:'カブ',s:'root'},{n:'ラディッシュ',s:'root'},{n:'ルッコラ'},{n:'ダイコン',s:'root'},{n:'ハツカダイコン',s:'root'},{n:'葉ダイコン',s:'root'},{n:'ターサイ'},{n:'ケール'},{n:'コールラビ'},{n:'わさび菜'},{n:'クレソン'},{n:'ナバナ'},{n:'カラシナ'}]},
{c:'vh',f:'セリ科',d:'🌿',p:[{n:'ニンジン',e:'🥕'},{n:'セロリ'},{n:'パセリ'},{n:'イタリアンパセリ'},{n:'ミツバ',s:'mitsuba'},{n:'フェンネル'},{n:'ディル'},{n:'チャービル'},{n:'アシタバ'},{n:'コリアンダー(パクチー)'}]},
{c:'vh',f:'シソ科ハーブ',d:'🌿',p:[{n:'赤ジソ'},{n:'バジル'},{n:'ホーリーバジル'},{n:'ミント'},{n:'ペパーミント'},{n:'スペアミント'},{n:'レモンバーム'},{n:'ローズマリー'},{n:'コモンタイム'},{n:'レモンタイム'},{n:'セージ'},{n:'オレガノ'},{n:'マジョラム'},{n:'ヒソップ'}]},
{c:'vh',f:'ヒガンバナ科',d:'🧅',p:[{n:'タマネギ'},{n:'赤タマネギ'},{n:'エシャロット'},{n:'ネギ',s:'leek'},{n:'九条ネギ',s:'leek'},{n:'ワケギ',s:'leek'},{n:'アサツキ',s:'leek'},{n:'ジャンボニンニク',e:'🧄'},{n:'行者ニンニク',e:'🧄'},{n:'リーキ',s:'leek'}]},
{c:'vh',f:'ヒルガオ科',d:'🍠',p:[{n:'サツマイモ'},{n:'紫芋'}]},
{c:'vh',f:'サトイモ科',d:'🥔',p:[{n:'サトイモ'},{n:'八つ頭'},{n:'エビイモ'}]},
{c:'vh',f:'ヤマノイモ科',d:'🌱',p:[{n:'山芋',s:'yam'},{n:'長芋',s:'yam'},{n:'大和芋',s:'yam'}]},
{c:'vh',f:'ウリ科',d:'🥒',p:[{n:'キュウリ'},{n:'ズッキーニ'},{n:'カボチャ',e:'🎃'},{n:'ハロウィンカボチャ',e:'🎃'},{n:'バターナッツ',e:'🎃'},{n:'そうめんカボチャ',e:'🎃'},{n:'スイカ',e:'🍉'},{n:'小玉スイカ',e:'🍉'},{n:'メロン',e:'🍈'},{n:'マクワウリ',e:'🍈'},{n:'トウガン'},{n:'ニガウリ(ゴーヤ)'},{n:'ヘチマ'},{n:'ハヤトウリ'},{n:'ユウガオ'}]},
{c:'vh',f:'マメ科',d:'🫘',p:[{n:'エダマメ',s:'bean'},{n:'ソラマメ',s:'bean'},{n:'サヤエンドウ',s:'bean'},{n:'絹さや',s:'bean'},{n:'スナップエンドウ',s:'bean'},{n:'グリーンピース',s:'bean'},{n:'インゲン',s:'bean'},{n:'モロッコインゲン',s:'bean'},{n:'ささげ',s:'bean'},{n:'ヒヨコマメ',s:'bean'},{n:'フジマメ',s:'bean'},{n:'ラッカセイ',e:'🥜'}]},
{c:'vh',f:'キク科(野菜)',d:'🥬',p:[{n:'レタス'},{n:'サニーレタス'},{n:'リーフレタス'},{n:'ロメインレタス'},{n:'サンチュ'},{n:'シュンギク',e:'🌿'},{n:'ゴボウ',s:'yam'},{n:'アーティチョーク',e:'🌿'},{n:'エンダイブ'},{n:'チコリ'},{n:'フキ',e:'🌿'},{n:'菊芋',s:'yam'}]},
{c:'vh',f:'ヒユ科',d:'🥬',p:[{n:'ホウレンソウ'},{n:'フダンソウ'},{n:'スイスチャード'},{n:'ビーツ',e:'🥔'}]},
{c:'vh',f:'イネ科',d:'🌾',p:[{n:'トウモロコシ',e:'🌽'},{n:'スイートコーン',e:'🌽'},{n:'ハトムギ'},{n:'レモングラス'}]},
{c:'vh',f:'ショウガ科',d:'🫚',p:[{n:'ショウガ',s:'ginger'},{n:'ミョウガ',s:'ginger'},{n:'ターメリック',s:'ginger'},{n:'ガランガル',s:'ginger'}]},
{c:'vh',f:'その他野菜・ハーブ',d:'🌿',p:[{n:'アスパラガス',s:'asparagus'},{n:'オクラ',s:'okra'},{n:'モロヘイヤ'},{n:'ツルムラサキ'},{n:'エゴマ'},{n:'ゴマ'},{n:'ルバーブ',e:'🌱'},{n:'ボリジ',e:'🌸'},{n:'ナスタチウム',e:'🌸'},{n:'ステビア'},{n:'レモンバーベナ'},{n:'カモミール',e:'🌼'},{n:'ヤーコン'},{n:'ハス'},{n:'サフラン',e:'🌸'},{n:'ホップ'}]},
{c:'ft',f:'バラ科(果樹)',d:'🍑',p:[{n:'ワイルドストロベリー',e:'🍓'},{n:'桃'},{n:'ネクタリン'},{n:'スモモ'},{n:'アンズ'},{n:'サクランボ',e:'🍒'},{n:'リンゴ',e:'🍎'},{n:'姫リンゴ',e:'🍎'},{n:'和ナシ',e:'🍐'},{n:'洋ナシ',e:'🍐'},{n:'ブラックベリー'},{n:'カリン',e:'🍐'},{n:'ジューンベリー'}]},
{c:'ft',f:'ツツジ科(果樹)',d:'🫐',p:[{n:'ハイブッシュブルーベリー',s:'blueberry'},{n:'ラビットアイブルーベリー',s:'blueberry'},{n:'クランベリー',s:'blueberry'}]},
{c:'ft',f:'ミカン科',d:'🍊',p:[{n:'温州ミカン'},{n:'レモン',e:'🍋'},{n:'ライム',e:'🍋'},{n:'ユズ',e:'🍋'},{n:'スダチ',e:'🍋'},{n:'カボス',e:'🍋'},{n:'キンカン'},{n:'ダイダイ'},{n:'不知火(デコポン)'},{n:'せとか'},{n:'八朔'},{n:'甘夏'},{n:'文旦'},{n:'グレープフルーツ'},{n:'ベルガモット'}]},
{c:'ft',f:'クワ科(果樹)',d:'🌳',p:[{n:'桑'},{n:'ヤマグワ'}]},
{c:'ft',f:'カキノキ科',d:'🌳',p:[{n:'富有柿',s:'kaki'},{n:'次郎柿',s:'kaki'},{n:'渋柿',s:'kaki'}]},
{c:'ft',f:'ブドウ科',d:'🍇',p:[{n:'巨峰'},{n:'ピオーネ'},{n:'シャインマスカット'},{n:'デラウェア'},{n:'ナイアガラ'}]},
{c:'ft',f:'その他果樹',d:'🌳',p:[{n:'アボカド',e:'🥑'},{n:'パパイヤ'},{n:'パッションフルーツ'},{n:'バナナ',e:'🍌'},{n:'パイナップル',e:'🍍'},{n:'フェイジョア'},{n:'グアバ'},{n:'マンゴー',e:'🥭'},{n:'ライチ'},{n:'ザクロ'},{n:'オリーブ',s:'berry'},{n:'ナツメ'},{n:'スターフルーツ'},{n:'ローゼル'},{n:'ハスカップ',s:'berry'},{n:'グーズベリー',s:'berry'},{n:'カシス',s:'berry'},{n:'レッドカラント',s:'berry'},{n:'クコ'},{n:'アーモンド',e:'🌰'},{n:'クルミ',e:'🌰'},{n:'栗',e:'🌰'},{n:'アケビ'},{n:'ムベ'},{n:'ヤマブドウ',e:'🍇'}]},
{c:'ww',f:'バラ科(花木)',d:'🌹',p:[{n:'バラ'},{n:'つるバラ'},{n:'ミニバラ'},{n:'ハマナス'},{n:'ソメイヨシノ',e:'🌸'},{n:'河津桜',e:'🌸'},{n:'シダレザクラ',e:'🌸'},{n:'八重桜',e:'🌸'},{n:'花桃',e:'🌸'},{n:'花梅',e:'🌸'}]},
{c:'ww',f:'ツツジ科(花木)',d:'🌺',p:[{n:'ツツジ',s:'azalea'},{n:'サツキ',s:'azalea'},{n:'シャクナゲ',s:'azalea'},{n:'アザレア',s:'azalea'},{n:'ドウダンツツジ',s:'azalea'}]},
{c:'ww',f:'アジサイ科',d:'💠',p:[{n:'ガクアジサイ'},{n:'カシワバアジサイ'},{n:'アナベル'},{n:'ノリウツギ'}]},
{c:'ww',f:'モクセイ科',d:'🌼',p:[{n:'キンモクセイ'},{n:'ギンモクセイ'},{n:'ヒイラギモクセイ',e:'🌳'},{n:'レンギョウ'},{n:'ライラック',s:'purpleFlower'}]},
{c:'ww',f:'モクレン科',d:'🌸',p:[{n:'コブシ'},{n:'ハクモクレン'},{n:'シモクレン'},{n:'カラタネオガタマ'}]},
{c:'ww',f:'ツバキ科',d:'🌺',p:[{n:'ツバキ'},{n:'サザンカ'},{n:'カンツバキ'}]},
{c:'ww',f:'ミソハギ科',d:'🌸',p:[{n:'サルスベリ'}]},
{c:'ww',f:'その他花木',d:'🌳',p:[{n:'ハナミズキ',e:'🌸'},{n:'ヤマボウシ'},{n:'ジャスミン',e:'🌼'},{n:'フジ',s:'purpleFlower'},{n:'ヤマブキ',e:'🌼'},{n:'ボケ',e:'🌸'},{n:'ウメモドキ'},{n:'ピラカンサ'},{n:'コデマリ',e:'🌸'},{n:'ユキヤナギ',e:'🌸'},{n:'ニシキギ'},{n:'マサキ'},{n:'マユミ'},{n:'ランタナ',e:'🌸'},{n:'ムラサキシキブ',s:'purpleFlower'},{n:'ムクゲ',e:'🌺'},{n:'フヨウ',e:'🌺'},{n:'ハイビスカス',e:'🌺'},{n:'ブーゲンビリア',e:'🌺'},{n:'プルメリア',e:'🌺'},{n:'ジャカランダ',s:'purpleFlower'},{n:'ミモザ',e:'🌼'},{n:'ナンテン'},{n:'千両'},{n:'万両'},{n:'シマトネリコ'},{n:'ソヨゴ'}]},
{c:'af',f:'キク科(花)',d:'🌼',p:[{n:'ヒマワリ',e:'🌻'},{n:'コスモス',e:'🌸'},{n:'ジニア'},{n:'センニチコウ',e:'🌸'},{n:'ガーベラ'},{n:'アスター'},{n:'カレンデュラ'},{n:'マーガレット'},{n:'ルドベキア'},{n:'エキナセア',e:'🌸'},{n:'ガザニア'}]},
{c:'af',f:'ナデシコ科',d:'🌸',p:[{n:'ナデシコ'},{n:'カーネーション'},{n:'カスミソウ'},{n:'スターチス'},{n:'サクラマンテマ'}]},
{c:'af',f:'ナス科観賞',d:'🌸',p:[{n:'ペチュニア'},{n:'カリブラコア'},{n:'ニコチアナ'}]},
{c:'af',f:'オオバコ科',d:'🌸',p:[{n:'ジキタリス'},{n:'ペンステモン'},{n:'リナリア'}]},
{c:'af',f:'ゴマノハグサ科',d:'🌸',p:[{n:'キンギョソウ'},{n:'ネメシア'},{n:'ゴマノハグサ'}]},
{c:'af',f:'ヒルガオ科(花)',d:'🌸',p:[{n:'アサガオ'},{n:'西洋アサガオ'},{n:'ムーンフラワー'}]},
{c:'af',f:'ケシ科',d:'🌸',p:[{n:'ポピー'},{n:'アイスランドポピー'},{n:'ヒナゲシ'}]},
{c:'af',f:'スミレ科',d:'🌸',p:[{n:'パンジー'},{n:'ビオラ'},{n:'スミレ'},{n:'ニオイスミレ'}]},
{c:'af',f:'サクラソウ科',d:'🌸',p:[{n:'プリムラ・ジュリアン'},{n:'プリムラ・ポリアンサ'},{n:'プリムラ・マラコイデス'},{n:'サクラソウ'},{n:'シクラメン'}]},
{c:'af',f:'シソ科観賞',d:'🌸',p:[{n:'サルビア'},{n:'メドーセージ'},{n:'コリウス',e:'🌿'},{n:'アゲラタム'}]},
{c:'af',f:'ヒユ科観賞',d:'🌸',p:[{n:'ケイトウ'},{n:'アマランサス',e:'🌾'},{n:'千日小坊'}]},
{c:'af',f:'ベゴニア科',d:'🌸',p:[{n:'木立性ベゴニア'},{n:'センパフローレンス'},{n:'球根ベゴニア'}]},
{c:'af',f:'その他草花',d:'🌸',p:[{n:'トレニア'},{n:'ニチニチソウ'},{n:'ロベリア'},{n:'メランポジウム',e:'🌼'},{n:'エボルブルス'},{n:'サフィニア'},{n:'サンビタリア',e:'🌼'},{n:'マツバボタン'},{n:'インパチェンス'},{n:'アスチルベ'},{n:'ストック'},{n:'ワスレナグサ'},{n:'ブラキカム'},{n:'エリカ'},{n:'ナデシコ・テルスター'},{n:'ハーデンベルギア'},{n:'デージー',e:'🌼'},{n:'リシマキア',e:'🌿'},{n:'ロータス・ブリムストーン',e:'🌿'}]},
{c:'pf',f:'キク科(宿根)',d:'🌼',p:[{n:'キク'},{n:'ガーデンマム'},{n:'フランス菊'},{n:'シャスタデイジー'},{n:'エゾギク'}]},
{c:'pf',f:'シソ科宿根',d:'💜',p:[{n:'ラベンダー',s:'purpleFlower'},{n:'サルビア・グアラニチカ',s:'purpleFlower'},{n:'サルビア・レウカンサ',s:'purpleFlower'},{n:'ベロニカ',s:'purpleFlower'},{n:'モナルダ',e:'🌸'}]},
{c:'pf',f:'ユリ科',d:'🌸',p:[{n:'カサブランカ'},{n:'スカシユリ'},{n:'オリエンタルユリ'},{n:'テッポウユリ'},{n:'ヤマユリ'}]},
{c:'pf',f:'ヒガンバナ科宿根',d:'🌸',p:[{n:'スイセン',e:'🌼'},{n:'アガパンサス',s:'purpleFlower'},{n:'アマリリス'},{n:'ヒガンバナ'},{n:'リコリス'}]},
{c:'pf',f:'アヤメ科',d:'💜',p:[{n:'アヤメ',s:'purpleFlower'},{n:'ハナショウブ',s:'purpleFlower'},{n:'ジャーマンアイリス',s:'purpleFlower'},{n:'フリージア',e:'🌼'},{n:'グラジオラス',e:'🌸'}]},
{c:'pf',f:'その他宿根',d:'🌸',p:[{n:'ホスタ(ギボウシ)',e:'🌿'},{n:'フウロソウ'},{n:'ヘメロカリス'},{n:'シャクヤク'},{n:'クリスマスローズ'}]},
{c:'bf',f:'ユリ科球根',d:'🌷',p:[{n:'チューリップ',e:'🌷'},{n:'ヒアシンス'},{n:'ムスカリ',s:'purpleFlower'}]},
{c:'bf',f:'ヒガンバナ科球根',d:'🌸',p:[{n:'スノードロップ',e:'🌼'},{n:'ネリネ'},{n:'ゼフィランサス'}]},
{c:'bf',f:'その他球根',d:'🌸',p:[{n:'クロッカス',s:'purpleFlower'},{n:'シラー'},{n:'エラントス',e:'🌼'},{n:'カラー'}]},
{c:'hp',f:'サトイモ科(観葉)',d:'🪴',p:[{n:'ポトス',s:'houseplant'},{n:'ゴールデンポトス',s:'houseplant'},{n:'モンステラ',s:'houseplant'},{n:'ヒメモンステラ',s:'houseplant'},{n:'スパティフィラム',s:'houseplant'},{n:'フィロデンドロン',s:'houseplant'},{n:'アンスリウム',e:'🌺'},{n:'ディフェンバキア',s:'houseplant'},{n:'シンゴニウム',s:'houseplant'},{n:'カラジウム',s:'houseplant'}]},
{c:'hp',f:'クワ科観葉',d:'🪴',p:[{n:'ベンジャミン',s:'houseplant'},{n:'ゴムの木',s:'houseplant'},{n:'ウンベラータ',s:'houseplant'},{n:'フィカス・アルテシマ',s:'houseplant'},{n:'カシワバゴム',s:'houseplant'}]},
{c:'hp',f:'キジカクシ科観葉',d:'🪴',p:[{n:'ドラセナ',s:'houseplant'},{n:'コンシンネ',s:'houseplant'},{n:'幸福の木',s:'houseplant'},{n:'サンスベリア',s:'houseplant'},{n:'ユッカ',s:'houseplant'},{n:'トックリラン',s:'houseplant'},{n:'コルジリネ',s:'houseplant'},{n:'リュウゼツラン',s:'houseplant'}]},
{c:'hp',f:'ヤシ科',d:'🌴',p:[{n:'テーブルヤシ'},{n:'ケンチャヤシ'},{n:'アレカヤシ'},{n:'フェニックス'},{n:'シュロチク'}]},
{c:'hp',f:'ウコギ科',d:'🌿',p:[{n:'アイビー'},{n:'シェフレラ',s:'houseplant'},{n:'ヘデラ'},{n:'ツピダンサス',s:'houseplant'}]},
{c:'hp',f:'シダ植物',d:'🌿',p:[{n:'アジアンタム'},{n:'タマシダ'},{n:'ボストンファン'},{n:'プテリス'},{n:'リュウビンタイ'},{n:'コウモリラン(ビカクシダ)'},{n:'トキワシノブ'}]},
{c:'hp',f:'イラクサ科',d:'🪴',p:[{n:'ピレア',s:'houseplant'},{n:'ベビーティアーズ',e:'🌿'},{n:'ピレア・グロボーサ',s:'houseplant'}]},
{c:'hp',f:'ツユクサ科',d:'💜',p:[{n:'ムラサキツユクサ',s:'purpleFlower'},{n:'セトクレアセア',s:'purpleFlower'},{n:'トラディスカンチア',e:'🌿'}]},
{c:'hp',f:'イワタバコ科',d:'💜',p:[{n:'セントポーリア',s:'purpleFlower'},{n:'グロキシニア',e:'🌸'},{n:'エピスシア',e:'🌸'}]},
{c:'hp',f:'その他観葉',d:'🪴',p:[{n:'エバーフレッシュ',s:'houseplant'},{n:'パキラ',s:'houseplant'},{n:'ガジュマル',s:'houseplant'},{n:'ストレリチア',s:'houseplant'},{n:'シペルス',e:'🌿'},{n:'エアプランツ',e:'🌿'},{n:'コーヒーノキ',s:'houseplant'},{n:'ザミオクルカス',s:'houseplant'},{n:'フィットニア',s:'houseplant'},{n:'クロトン',s:'houseplant'},{n:'オリヅルラン',e:'🌿'},{n:'シュガーバイン',e:'🌿'}]},
{c:'sc',f:'ベンケイソウ科',d:'🪴',p:[{n:'セダム類',s:'succulent'},{n:'エケベリア',s:'succulent'},{n:'月美人',s:'succulent'},{n:'火祭り',s:'succulent'},{n:'虹の玉',s:'succulent'},{n:'オーロラ',s:'succulent'},{n:'カゲツ(金のなる木)',s:'succulent'},{n:'桜吹雪',s:'succulent'},{n:'黒法師',s:'succulent'},{n:'カランコエ',e:'🌸'},{n:'月兎耳',s:'succulent'},{n:'福兎耳',s:'succulent'},{n:'不死鳥',s:'succulent'},{n:'朧月',s:'succulent'},{n:'銘月',s:'succulent'}]},
{c:'sc',f:'サボテン科',d:'🌵',p:[{n:'ウチワサボテン'},{n:'金鯱'},{n:'マミラリア'},{n:'月下美人',e:'🌸'},{n:'リプサリス'},{n:'シャコバサボテン'},{n:'雪晃'},{n:'ギムノカリキウム'}]},
{c:'sc',f:'ハマミズナ科',d:'🪴',p:[{n:'リトープス',s:'succulent'},{n:'コノフィツム',s:'succulent'},{n:'フェネストラリア',s:'succulent'}]},
{c:'sc',f:'トウダイグサ科(多肉)',d:'🌵',p:[{n:'ユーフォルビア・ホリダ'},{n:'ハナキリン',e:'🌺'},{n:'ユーフォルビア・オベサ'},{n:'ユーフォルビア・ラクテア'}]},
{c:'sc',f:'キョウチクトウ科(多肉)',d:'🌿',p:[{n:'アデニウム(砂漠のバラ)',e:'🌹'},{n:'ハートカズラ'},{n:'セロペギア'}]},
{c:'sc',f:'ツルボラン科',d:'🪴',p:[{n:'アロエ',s:'succulent'},{n:'アロエベラ',s:'succulent'},{n:'キダチアロエ',s:'succulent'},{n:'ハオルチア',s:'succulent'},{n:'ガステリア',s:'succulent'},{n:'不夜城',s:'succulent'}]},
{c:'sc',f:'キジカクシ科多肉',d:'🪴',p:[{n:'アガベ',s:'succulent'},{n:'アガベ・チタノタ',s:'succulent'},{n:'アガベ・吉祥天',s:'succulent'},{n:'アガベ・アテナータ',s:'succulent'}]},
{c:'sc',f:'その他多肉',d:'🪴',p:[{n:'ティランジア',e:'🌿'},{n:'グラプトペタルム',s:'succulent'},{n:'パキフィツム',s:'succulent'},{n:'ピーチプリデ',s:'succulent'},{n:'桃美人',s:'succulent'},{n:'コチレドン',s:'succulent'},{n:'十二の巻',s:'succulent'}]},
];
const CAT_INDEX=(()=>{const idx={};G.forEach(g=>g.p.forEach(p=>{idx[p.n]={plant:p,group:g};}));return idx;})();

// ============== ヘルパー ==============
const todayStr=()=>new Date().toISOString().split('T')[0];
const daysBetween=(d1,d2)=>Math.floor((new Date(d2)-new Date(d1))/86400000);
const formatDate=(s)=>{const d=new Date(s);return `${d.getMonth()+1}/${d.getDate()}`;};
const isCatId=(id)=>typeof id==='string'&&id.startsWith('cat:');
const catName=(id)=>id.slice(4);
const makeCatId=(n)=>`cat:${n}`;
function resolveCat(id){const n=catName(id);const e=CAT_INDEX[n];if(!e)return null;const{plant:p,group:g}=e;const cd=CD[g.c];return{id,name:p.n,svgKey:p.s,emoji:p.e||g.d,color:cd.color,bg:cd.bg,ring:cd.ring,wateringInterval:cd.water,fertilizerInterval:cd.fert,isHarvested:cd.harvest,family:g.f,category:g.c,isCatalog:true};}
function getPlant(id){if(isCatId(id)){const c=resolveCat(id);if(c)return c;}return PLANTS.find(p=>p.id===id)||PLANTS[0];}
const newId=(p='inst')=>`${p}_${Date.now()}_${Math.random().toString(36).slice(2,7)}`;

function PlantIcon({plantId,size=32}){
  const p=getPlant(plantId);
  if(p.svg)return <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>{p.svg(size)}</span>;
  if(p.svgKey&&SVG_ICONS[p.svgKey])return <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>{SVG_ICONS[p.svgKey](size)}</span>;
  return <span style={{fontSize:size*0.95,lineHeight:1,display:'inline-flex',alignItems:'center',justifyContent:'center',width:size,height:size}}>{p.emoji||'🌱'}</span>;
}

// ============== カタログピッカー ==============
function CatTile({plant,onClick}){
  const cd=CD[plant.c];
  const renderIcon=()=>{
    if(plant.s&&SVG_ICONS[plant.s])return <span style={{display:'inline-flex'}}>{SVG_ICONS[plant.s](28)}</span>;
    return <span style={{fontSize:26,lineHeight:1,width:28,height:28,display:'inline-flex',alignItems:'center',justifyContent:'center'}}>{plant.e||plant.d||'🌱'}</span>;
  };
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 p-2 rounded-xl bg-gradient-to-br ${cd.bg} hover:scale-105 active:scale-95 transition-transform`}>
      {renderIcon()}
      <span className="text-[9px] font-bold text-gray-700 truncate w-full text-center leading-tight">{plant.n}</span>
    </button>
  );
}

function FamilyAcc({group,open,onToggle,onPick}){
  return (
    <div className="bg-gray-50 rounded-2xl overflow-hidden">
      <button onClick={onToggle} className="w-full flex items-center justify-between p-2.5 hover:bg-gray-100 active:bg-gray-100">
        <div className="flex items-center gap-1.5">
          {FAMILY_HEADER_SVG[group.f]&&SVG_ICONS[FAMILY_HEADER_SVG[group.f]]
            ? <span style={{display:'inline-flex'}}>{SVG_ICONS[FAMILY_HEADER_SVG[group.f]](20)}</span>
            : <span className="text-base">{group.d}</span>}
          <span className="font-black text-xs text-gray-800">{group.f}</span>
          <span className="text-[10px] font-bold text-gray-400">{group.p.length}種</span>
        </div>
        {open?<ChevronDown size={14} className="text-gray-400"/>:<ChevronRight size={14} className="text-gray-400"/>}
      </button>
      {open&&(
        <div className="px-2.5 pb-2.5 grid grid-cols-4 gap-1.5">
          {group.p.map((p,i)=>(<CatTile key={i} plant={{...p,c:group.c,f:group.f,d:group.d}} onClick={()=>onPick({...p,c:group.c,f:group.f,d:group.d})}/>))}
        </div>
      )}
    </div>
  );
}

function CatalogPicker({open,onClose,onSelect}){
  const [tab,setTab]=useState('tab_vh');
  const [q,setQ]=useState('');
  const [openF,setOpenF]=useState({});
  useEffect(()=>{if(open){setTab('tab_vh');setQ('');setOpenF({});}},[open]);
  const flat=useMemo(()=>G.flatMap(g=>g.p.map(p=>({...p,c:g.c,f:g.f,d:g.d}))),[]);
  const results=useMemo(()=>{if(!q.trim())return null;const lo=q.toLowerCase();return flat.filter(p=>p.n.toLowerCase().includes(lo)||p.f.toLowerCase().includes(lo));},[q,flat]);
  if(!open)return null;
  const at=TOP_CATEGORIES.find(t=>t.id===tab);
  const groupsInSub=(s)=>G.filter(g=>g.c===s);
  const tabCount=(t)=>G.filter(g=>t.subs.includes(g.c)).reduce((s,g)=>s+g.p.length,0);
  function handlePick(p){onSelect(makeCatId(p.n));onClose();}
  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"/>
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md flex flex-col shadow-2xl" style={{maxHeight:'90vh'}} onClick={e=>e.stopPropagation()}>
        <div className="p-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100"><ArrowLeft size={20} className="text-gray-600"/></button>
            <h3 className="text-base font-black text-gray-800">📚 その他の植物から探す</h3>
            <button onClick={onClose} className="ml-auto p-1.5 rounded-full hover:bg-gray-100"><X size={20} className="text-gray-500"/></button>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            <input type="text" value={q} onChange={e=>setQ(e.target.value)} placeholder="植物名・科名で検索" className="w-full pl-9 pr-9 py-2.5 bg-gray-50 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300"/>
            {q&&<button onClick={()=>setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={14}/></button>}
          </div>
          {!q&&(
            <div className="-mx-4 mt-3 overflow-x-auto pb-1" style={{WebkitOverflowScrolling:'touch',scrollbarWidth:'none'}}>
              <div className="flex gap-1.5 px-4" style={{width:'max-content'}}>
                {TOP_CATEGORIES.map(t=>(
                  <button key={t.id} onClick={()=>setTab(t.id)} className={`flex-shrink-0 px-2.5 py-1.5 rounded-2xl font-black text-[11px] shadow-sm transition-all whitespace-nowrap ${tab===t.id?'bg-gradient-to-r from-emerald-400 to-green-500 text-white scale-105':'bg-white text-gray-600 ring-1 ring-gray-200'}`}>
                    <span className="mr-0.5">{t.icon}</span>{t.name}
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[9px] ${tab===t.id?'bg-white/30':'bg-gray-100'}`}>{tabCount(t)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-3" style={{WebkitOverflowScrolling:'touch'}}>
          {q&&results&&(
            <div>
              <div className="text-xs font-black text-gray-500 mb-2 px-1">検索結果: {results.length}件</div>
              {results.length===0
                ? <div className="text-center py-12 text-gray-400 text-sm font-bold"><div className="text-4xl mb-2">🔍</div>該当する植物が見つかりません</div>
                : <div className="grid grid-cols-4 gap-1.5">{results.slice(0,100).map((p,i)=><CatTile key={i} plant={p} onClick={()=>handlePick(p)}/>)}</div>}
              {results.length>100&&<div className="text-center text-[10px] text-gray-400 mt-2 font-medium">残り{results.length-100}件...検索を絞り込んでください</div>}
            </div>
          )}
          {!q&&at&&(
            <div className="space-y-3">
              {at.subs.map(s=>{
                const groups=groupsInSub(s);
                if(groups.length===0)return null;
                const si=CD[s];
                const cnt=groups.reduce((sum,g)=>sum+g.p.length,0);
                const showH=at.subs.length>1;
                return (
                  <div key={s}>
                    {showH&&(
                      <div className="text-[11px] font-black text-gray-700 mb-1.5 px-1 flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full" style={{background:si.color}}/>
                        {si.label}<span className="text-[10px] font-bold text-gray-400">({cnt}種)</span>
                      </div>
                    )}
                    <div className="space-y-1.5">
                      {groups.map(g=><FamilyAcc key={g.f} group={g} open={!!openF[g.f]} onToggle={()=>setOpenF(p=>({...p,[g.f]:!p[g.f]}))} onPick={handlePick}/>)}
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
function AddInstanceModal({open,onClose,onAdd}){
  const [pid,setPid]=useState('strawberry');
  const [name,setName]=useState('');
  const [potSize,setPotSize]=useState('');
  const [catOpen,setCatOpen]=useState(false);
  useEffect(()=>{if(open){setPid('strawberry');setName('');setPotSize('');setCatOpen(false);}},[open]);
  if(!open)return null;
  const plant=getPlant(pid);
  const isCat=isCatId(pid);
  function handleSave(){onAdd({plantTypeId:pid,name:name.trim()||plant.name,potSize:potSize.trim()});onClose();}
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"/>
      <div className="relative bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2">{sPot(24)} 新しい鉢を追加</h3>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-gray-100"><X size={20} className="text-gray-500"/></button>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-2">🌱 植物の種類</label>
            <div className="grid grid-cols-4 gap-1.5">
              {PLANTS.map(p=>(
                <button key={p.id} onClick={()=>setPid(p.id)} className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${pid===p.id?`bg-gradient-to-br ${p.bg} ring-2 ${p.ring} scale-105`:'bg-gray-50'}`}>
                  <PlantIcon plantId={p.id} size={26}/>
                  <span className="text-[9px] font-bold text-gray-700 truncate w-full text-center">{p.name}</span>
                </button>
              ))}
              <button onClick={()=>setCatOpen(true)} className={`flex flex-col items-center gap-0.5 p-2 rounded-xl transition-all ${isCat?'bg-gradient-to-br from-purple-100 to-pink-100 ring-2 ring-purple-300 scale-105':'bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100'}`}>
                <div className="w-[26px] h-[26px] flex items-center justify-center">
                  {isCat?<PlantIcon plantId={pid} size={26}/>:<Search size={20} className="text-purple-600" strokeWidth={2.5}/>}
                </div>
                <span className="text-[9px] font-black text-purple-700 truncate w-full text-center">{isCat?plant.name:'その他'}</span>
              </button>
            </div>
            <div className="text-[10px] text-gray-400 mt-1.5 font-medium px-1">※ 「その他」から489種類の植物を探せます</div>
          </div>
          <div className={`bg-gradient-to-br ${plant.bg} rounded-2xl p-4 text-center`}>
            <PlantIcon plantId={pid} size={48}/>
            <div className="text-sm font-black text-gray-800 mt-1">{plant.name}</div>
            {isCat&&plant.family&&<div className="text-[10px] font-bold text-gray-600 mt-0.5">{plant.family}</div>}
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5">📛 ニックネーム</label>
            <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder={`例: ${plant.name}1号`} className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300"/>
          </div>
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1.5 flex items-center gap-1"><span style={{display:'inline-flex'}}>{sPot(14)}</span>鉢サイズ(任意)</label>
            <input type="text" value={potSize} onChange={e=>setPotSize(e.target.value)} placeholder="例: 7号、30cm" className="w-full px-4 py-3 bg-gray-50 rounded-2xl text-gray-800 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-300"/>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 font-black py-3 rounded-2xl active:scale-95">キャンセル</button>
            <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 flex items-center justify-center gap-1.5"><Plus size={16} strokeWidth={3}/>追加する</button>
          </div>
        </div>
      </div>
      <CatalogPicker open={catOpen} onClose={()=>setCatOpen(false)} onSelect={(id)=>setPid(id)}/>
    </div>
  );
}

// ============== 鉢カード ==============
function InstanceCard({instance,onClick,onDelete}){
  const plant=getPlant(instance.plantTypeId);
  return (
    <div className={`bg-gradient-to-br ${plant.bg} rounded-3xl p-4 shadow-sm relative`}>
      <button onClick={onDelete} className="absolute top-2 right-2 bg-white/70 hover:bg-red-100 rounded-full p-1 active:scale-90"><Trash2 size={12} className="text-red-500"/></button>
      <button onClick={onClick} className="w-full text-left">
        <div className="flex items-center mb-2"><PlantIcon plantId={instance.plantTypeId} size={36}/></div>
        <div className="text-sm font-black text-gray-800 mb-1.5 truncate">{instance.name}</div>
        <div className="text-[10px] text-gray-700 font-medium">
          <div>{plant.name}{plant.family&&<span className="ml-1 text-gray-500">({plant.family})</span>}</div>
          {instance.potSize&&<div className="flex items-center gap-1 mt-0.5"><span style={{display:'inline-flex'}}>{sPot(11)}</span>{instance.potSize}</div>}
        </div>
      </button>
    </div>
  );
}

// ============== ルート ==============
export default function App(){
  const [instances,setInstances]=useState(()=>{
    try{const s=window.localStorage?.getItem('mvk-demo-instances');if(s)return JSON.parse(s);}catch(_){}
    return [
      {id:newId(),plantTypeId:'blueberry',name:'ベランダのブルーベリー',potSize:'7号'},
      {id:newId(),plantTypeId:'tomato',name:'ミニトマト1号',potSize:'8号'},
      {id:newId(),plantTypeId:'cat:ラベンダー',name:'お庭のラベンダー',potSize:'6号'},
    ];
  });
  const [showAdd,setShowAdd]=useState(false);
  
  useEffect(()=>{try{window.localStorage?.setItem('mvk-demo-instances',JSON.stringify(instances));}catch(_){}},[instances]);
  
  function handleAdd(payload){
    setInstances(prev=>[...prev,{id:newId(),plantTypeId:payload.plantTypeId,name:payload.name,potSize:payload.potSize}]);
  }
  function handleDelete(id){
    setInstances(prev=>prev.filter(i=>i.id!==id));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-yellow-50 to-pink-50 pb-8">
      <div className="max-w-md mx-auto">
        <div className="px-4 pt-4 pb-1 flex items-center gap-2">
          <div className="text-2xl">🌱</div>
          <div className="font-black text-lg bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">みどりのある暮らし v2.4</div>
        </div>
        <div className="px-4 pt-1 text-[11px] text-gray-500 font-medium">
          ステップ2完成版デモ ・ featured 10種 + カタログ 489種
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-gradient-to-br from-pink-400 to-purple-400 rounded-xl p-1.5 shadow-sm"><Leaf size={16} className="text-white"/></div>
              <h2 className="font-black text-gray-800">うちのみどり</h2>
              <span className="ml-auto text-xs font-bold text-gray-500">{instances.length}鉢</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {instances.map(inst=><InstanceCard key={inst.id} instance={inst} onClick={()=>{}} onDelete={()=>handleDelete(inst.id)}/>)}
              <button onClick={()=>setShowAdd(true)} className="w-full bg-white/60 border-2 border-dashed border-gray-300 hover:border-emerald-400 hover:bg-emerald-50 rounded-3xl p-4 flex flex-col items-center justify-center gap-2 transition-all active:scale-95 min-h-[140px]">
                <div className="relative">{sPot(44)}<div className="absolute -top-1 -right-1 bg-emerald-500 rounded-full p-0.5 shadow-md ring-2 ring-white"><Plus size={11} className="text-white" strokeWidth={3.5}/></div></div>
                <div className="text-xs font-black text-gray-600">鉢を追加</div>
              </button>
            </div>
          </div>

          <div className="bg-amber-50 rounded-3xl p-4 text-xs text-amber-800 font-medium leading-relaxed">
            <div className="font-black mb-1">💡 デモの使い方</div>
            • 「鉢を追加」でモーダルが開きます<br/>
            • featured 10種 + 「🔍 その他」ボタンが11個目<br/>
            • 「その他」をタップして489種から選べます<br/>
            • カテゴリタブ・科アコーディオン・検索が動きます<br/>
            • 追加した鉢はブラウザに保存されます
          </div>

          <div className="bg-white rounded-3xl p-4 text-[11px] text-gray-500">
            <div className="font-black text-gray-700 mb-1">注意:</div>
            このデモは「鉢追加」とカタログピッカーの動作確認用です。本来のアプリには天気・記録・マップ・AI相談・設定など他の機能もありますが、このデモでは最小限のホーム画面のみ表示しています。
          </div>
        </div>

        <AddInstanceModal open={showAdd} onClose={()=>setShowAdd(false)} onAdd={handleAdd}/>
      </div>
    </div>
  );
}
