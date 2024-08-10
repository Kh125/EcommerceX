import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="z-10 relative min-h-[700px] overflow-hidden bg-white">
      <div className="relative h-full z-10 flex flex-col items-center justify-center text-center text-gray-900 mt-36">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Welcome to EcommerceX
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover amazing products and offers. Shop now and enjoy exclusive
          deals!
        </p>
        <Link
          to="/products"
          className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition duration-300"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default Landing;
