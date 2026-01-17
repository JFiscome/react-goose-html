
import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost, Home, Headset } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-orange-600 animate-bounce mb-8">
        <Ghost size={120} strokeWidth={1} />
      </div>
      <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">哎呀，页面走丢啦~</h1>
      <p className="text-gray-500 mb-10 text-center max-w-md text-lg font-light leading-relaxed">
        你访问的页面不存在或已被移除，可能是在大雪中迷路了。
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link to="/" className="flex items-center justify-center space-x-2 bg-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:bg-orange-700 transition-all transform hover:scale-105 active:scale-95">
          <Home size={20} />
          <span>返回首页</span>
        </Link>
        <Link to="/contact" className="flex items-center justify-center space-x-2 bg-white text-gray-900 border border-gray-200 px-8 py-4 rounded-full font-bold shadow-sm hover:bg-gray-50 transition-all">
          <Headset size={20} />
          <span>联系客服咨询</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
