import quotes from "./Thought.json";

const TodaysThought = () => {
  // Get the current day of the year (0-365)
  const dayOfYear = new Date().getDay();

  // Select a quote based on the current day
  const quote = quotes[dayOfYear % quotes.length];

  return (
    <div className="p-4 bg-gradient-to-r from-blue-100  to-blue-300 border-2 border-black shadow rounded-lg">
      <h3 className="text-xl font-bold mb-2">Today's Thought</h3>
      <div className="flex justify-center items-center flex-col px-4">
        <p className="italic text-center py-6">"{quote.text}"</p>
        <p className="font-bold ">- {quote.author}</p>
      </div>
    </div>
  );
};

export default TodaysThought;
