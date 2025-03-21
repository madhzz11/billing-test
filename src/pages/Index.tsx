import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
const Index = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-violet-50 p-4">
      <div className="w-full max-w-md p-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-purple-100 animate-fade-in text-center">
        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center mx-auto mb-6 shadow-md">
          <ShoppingCart size={28} className="text-white" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-700 via-pink-600 to-violet-700 bg-clip-text text-transparent">
          Elegant Billing System
        </h1>
        
        <p className="text-gray-600 mb-8">
          A beautiful, intuitive restaurant management and billing solution with smooth animations and a modern design.
        </p>
        
        <Button onClick={() => navigate('/billing')} className="w-full py-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]">
          <span className="text-lg font-medium">Open Billing Page</span>
          <ArrowRight className="ml-2" />
        </Button>
      </div>
      
      
    </div>;
};
export default Index;