import React, { useState } from "react";

const DatePicker = ({ value, onChange }) => {
  const localToday = new Date();
  localToday.setHours(0, 0, 0, 0);

  const initialNavDate = value ? new Date(value) : new Date();
  const [currentNavDate, setCurrentNavDate] = useState(initialNavDate);

  const currentYear = currentNavDate.getFullYear();
  const currentMonth = currentNavDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const totalDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentNavDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentNavDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleDateSelect = (day) => {
    const selected = new Date(currentYear, currentMonth, day);
    const yyyy = selected.getFullYear();
    const mm = String(selected.getMonth() + 1).padStart(2, "0");
    const dd = String(selected.getDate()).padStart(2, "0");
    
    onChange(`${yyyy}-${mm}-${dd}`);
  };

  const calendarCells = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= totalDaysInMonth; day++) {
    calendarCells.push(day);
  }

  return (
    <div className="w-full max-w-sm mx-auto rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-xl text-white">
      
      {/* Calendar Navigation Header */}
      <div className="mb-4 flex items-center justify-between">
        <button 
          type="button" 
          onClick={handlePrevMonth} 
          className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-bold text-zinc-300 transition hover:bg-zinc-700"
        >
          &larr;
        </button>
        <span className="text-base font-semibold text-zinc-100">
          {monthNames[currentMonth]} {currentYear}
        </span>
        <button 
          type="button" 
          onClick={handleNextMonth} 
          className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-bold text-zinc-300 transition hover:bg-zinc-700"
        >
          &rarr;
        </button>
      </div>

      {/* Weekdays Grid - Explicit style fallbacks added */}
      <div 
        className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-400 mb-2"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>

      {/* Days Grid Matrix - Explicit style fallbacks added */}
      <div 
        className="grid grid-cols-7 gap-1 text-center"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}
      >
        {calendarCells.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="h-10 w-10" />;
          }

          const cellDateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const cellDate = new Date(currentYear, currentMonth, day);
          const isPast = cellDate < localToday;
          const isSelected = value === cellDateStr;

          return (
            <button
              key={`day-${day}`}
              type="button"
              disabled={isPast}
              onClick={() => handleDateSelect(day)}
              className={`
                h-10 w-10 mx-auto flex items-center justify-center rounded-lg text-sm transition-all duration-100 focus:outline-none
                ${isPast 
                  ? "text-zinc-600 bg-zinc-950/30 cursor-not-allowed opacity-40" 
                  : isSelected 
                    ? "bg-blue-600 text-white font-bold shadow-md scale-105" 
                    : "text-zinc-200 hover:bg-zinc-800 cursor-pointer"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DatePicker;