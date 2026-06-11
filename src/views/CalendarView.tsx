import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, CircleDollarSign } from 'lucide-react';
import { Transaction } from '../core/types';

export function CalendarView({ transactions, currency }: { transactions: Transaction[]; currency: string }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const firstDay = getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth());
  
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDay === 0 ? 6 : firstDay - 1 }, (_, i) => i);
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <CalendarIcon className="w-6 h-6 text-accent-blue" />
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <div className="flex gap-2">
            <button onClick={prevMonth} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextMonth} className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4 text-center text-sm font-bold text-brand-muted uppercase tracking-wider">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {paddingDays.map(day => (
            <div key={`padding-${day}`} className="h-24 rounded-2xl bg-transparent"></div>
          ))}
          {days.map(day => {
             // Mock some transactions on some days
             const hasTransaction = day % 4 === 0;
             const isToday = day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth();
             
             return (
               <div 
                 key={day} 
                 className={`h-20 md:h-24 rounded-2xl border p-2 flex flex-col justify-between transition-colors
                   ${isToday ? 'border-accent-blue bg-accent-blue/10 text-accent-blue' : 'border-white/5 bg-white/5 hover:bg-white/10'}
                 `}
               >
                 <span className="font-bold">{day}</span>
                 {hasTransaction && (
                   <div className="flex items-center gap-1 text-[10px] md:text-xs text-accent-purple font-medium">
                     <CircleDollarSign className="w-3 h-3 md:w-4 md:h-4" />
                     <span className="hidden md:inline">2 items</span>
                   </div>
                 )}
               </div>
             )
          })}
        </div>
      </div>
    </div>
  );
}
