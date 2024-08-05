const Calendar = () => {
  return (
    <div className="p-4 bg-gradient-to-r from-violet-100 to-violet-300 border-2 border-black shadow-lg rounded-lg">
      {/* Example calendar content */}
      <div className="text-center text-xl font-bold">04</div>
      <div className="grid grid-cols-7 gap-2">
        {[...Array(31).keys()].map((day) => (
          <div key={day} className="text-center p-2">
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
