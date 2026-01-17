import { ChevronRight, Menu, ShoppingBag, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "首页", path: "/", type: "route" as const },
    { name: "品牌哲学", path: "brand-philosophy", type: "section" as const },
    { name: "门店展示", path: "offline-store", type: "section" as const },
    { name: "关于我们", path: "/about", type: "route" as const },
    { name: "产品中心", path: "/products", type: "route" as const },
    { name: "联系我们", path: "/contact", type: "route" as const },
  ];

  const isActive = (path: string) => location.pathname === path;
  const handleSectionClick = (sectionId: string) => {
    if (location.pathname === "/") {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled || !isHome ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span
              className={`text-2xl font-bold tracking-[0.2em] transition-colors uppercase ${scrolled || !isHome ? "text-black" : "text-white"}`}
            >
              amidrajk
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-12">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors hover:text-gray-400 ${
                    isActive(link.path)
                      ? "text-black border-b border-black"
                      : scrolled || !isHome
                        ? "text-gray-600"
                        : "text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleSectionClick(link.path)}
                  className={`text-xs font-medium tracking-widest uppercase transition-colors hover:text-gray-400 ${
                    scrolled || !isHome ? "text-gray-600" : "text-white"
                  }`}
                >
                  {link.name}
                </button>
              ),
            )}
            <a
              href="https://amidrajk.tmall.com/shop/view_shop.htm?spm=pc_detail.30350276.shop_popup_block.dentershop.296f7dd63PbT10"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 border px-6 py-2 rounded-full text-xs font-semibold tracking-widest transition-all hover:bg-black hover:text-white ${
                scrolled || !isHome
                  ? "border-black text-black"
                  : "border-white text-white hover:bg-white hover:text-black"
              }`}
            >
              <ShoppingBag size={14} />
              <span>天猫在线商城</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${scrolled || !isHome ? "text-black" : "text-white"} hover:text-gray-500 transition-colors focus:outline-none`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <div className="flex flex-col h-full pt-28 px-8">
          <div className="flex flex-col space-y-8">
            {navLinks.map((link) =>
              link.type === "route" ? (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-3xl font-light tracking-widest ${
                    isActive(link.path)
                      ? "text-black font-normal"
                      : "text-gray-500"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.path}
                  type="button"
                  onClick={() => handleSectionClick(link.path)}
                  className="text-3xl font-light tracking-widest text-left text-gray-500 hover:text-black transition-colors"
                >
                  {link.name}
                </button>
              ),
            )}
            <a
              href="https://amidrajk.tmall.com/shop/view_shop.htm?spm=pc_detail.30350276.shop_popup_block.dentershop.296f7dd63PbT10"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-t border-gray-100 pt-8 mt-8"
            >
              <span className="flex items-center gap-2 text-lg font-medium tracking-wide">
                <ShoppingBag size={20} /> 天猫在线商城
              </span>
              <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
