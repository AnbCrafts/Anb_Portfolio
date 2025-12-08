import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-center px-6">
      <h1 className="text-9xl font-bold text-teal-100 select-none">404</h1>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
         <h2 className="text-3xl font-bold text-slate-800">Page Not Found</h2>
      </div>
      
      <p className="text-slate-500 mt-4 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      
      <Link 
        to="/" 
        className="mt-8 flex items-center gap-2 px-8 py-3 bg-teal-600 text-white rounded-xl font-bold hover:bg-teal-700 transition-all shadow-lg"
      >
        <Home size={20} /> Back to Home
      </Link>
    </div>
  );
}