import { Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-gray-400 pt-20 pb-10 font-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 border-b border-neutral-800 pb-16">
          {/* Brand Info */}
          <div className="space-y-8">
            <Link to="/" className="block">
              <span className="text-2xl font-bold text-white tracking-[0.2em] uppercase">
                amidrajk
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs">
              以简约，见真我。
              <br />
              amidrajk
              致力于为追求独立审美与品质生活的都市人群，提供经得起时间考验的着装选择。
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center hover:bg-white hover:border-white hover:text-black transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-white font-medium mb-8 tracking-widest text-xs uppercase">
              探索
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  首页
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="hover:text-white transition-colors"
                >
                  产品中心
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="hover:text-white transition-colors"
                >
                  关于品牌
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition-colors"
                >
                  联系我们
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-medium mb-8 tracking-widest text-xs uppercase">
              联系方式
            </h4>
            <ul className="space-y-6 text-sm">
              <li className="flex items-start space-x-4 group">
                <Phone
                  size={18}
                  className="text-gray-600 group-hover:text-white transition-colors"
                />
                <span className="group-hover:text-white transition-colors">
                  400-888-8888
                </span>
              </li>
              <li className="flex items-start space-x-4 group">
                <Mail
                  size={18}
                  className="text-gray-600 group-hover:text-white transition-colors"
                />
                <span className="group-hover:text-white transition-colors">
                  amidrajk@163.com
                </span>
              </li>
              <li className="flex items-start space-x-4 group">
                <MapPin
                  size={18}
                  className="text-gray-600 group-hover:text-white transition-colors"
                />
                <span className="group-hover:text-white transition-colors leading-relaxed">
                  福建省福州市仓山区
                  <br />
                  科技园A栋
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 space-y-4 md:space-y-0">
          <p className="tracking-wide">© 2026 amidrajk. 保留所有权利。</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-gray-300 transition-colors">
              隐私政策
            </a>
            <a href="#" className="hover:text-gray-300 transition-colors">
              服务条款
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
