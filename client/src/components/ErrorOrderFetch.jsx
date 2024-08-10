const ErrorOrderFetch = ({ onRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 my-24">
      <h1 className="text-4xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>
      <p className="text-lg text-gray-700 mb-6">Error fetching order list.</p>
      <a
        onClick={onRefresh}
        className="cursor-pointer px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition duration-200"
      >
        Refresh
      </a>
    </div>
  );
};

export default ErrorOrderFetch;
