import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  ShieldCheck,
  Star,
  Users,
  Zap,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products } from "../data";
import { Category } from "../types";

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      image: "/ads/7.jpg",
      title: "以简约，见真我",
      subtitle: "amidrajk / 简约即真实",
    },
    {
      image: "/ads/8.jpg",
      title: "少即是多，简而不凡",
      subtitle: "美学的减法",
    },
    {
      image: "/ads/1.jpg",
      title: "克制即高级",
      subtitle: "高级始于克制",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    if (state?.scrollTo) {
      const section = document.getElementById(state.scrollTo);
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [location.state]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="flex flex-col font-sans text-primary">
      {/* 1. Hero Carousel - Minimalist */}
      <section className="relative h-screen overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-4">
              {slide.title && (
                <h1 className="text-white text-5xl md:text-7xl font-light tracking-[0.2em] mb-6 leading-tight animate-fade-in-up">
                  {slide.title}
                </h1>
              )}
              {slide.subtitle && (
                <p className="text-gray-200 text-lg md:text-xl font-light tracking-[0.3em] uppercase animate-fade-in-up delay-200">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Simple Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white transition-colors"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 text-white/50 hover:text-white transition-colors"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </button>
      </section>

      {/* 1.5. Stats/Guarantee Section */}
      <section className="relative z-20 -mt-20 px-4 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[2rem] shadow-xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-gray-100">
              <div className="flex flex-col items-center text-center space-y-3 pt-8 md:pt-0">
                <div className="bg-orange-50 p-4 rounded-2xl mb-2">
                  <Users size={24} className="text-black" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">
                    10W+ 粉丝
                  </h4>
                  <p className="text-xs text-gray-500">全网忠实用户信赖</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 pt-8 md:pt-0">
                <div className="bg-orange-50 p-4 rounded-2xl mb-2">
                  <Star size={24} className="text-black" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">
                    4.9分 好评
                  </h4>
                  <p className="text-xs text-gray-500">品质服务双重保障</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 pt-8 md:pt-0">
                <div className="bg-orange-50 p-4 rounded-2xl mb-2">
                  <ShieldCheck size={24} className="text-black" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">
                    正品保障
                  </h4>
                  <p className="text-xs text-gray-500">官方直营，退货无忧</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center space-y-3 pt-8 md:pt-0">
                <div className="bg-orange-50 p-4 rounded-2xl mb-2">
                  <Zap size={24} className="text-black" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-black mb-1">
                    极速发货
                  </h4>
                  <p className="text-xs text-gray-500">24小时内闪电发货</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Core - Philosophy */}
      <section
        id="brand-philosophy"
        className="py-32 bg-white text-center px-4"
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 block mb-6">
            品牌哲学
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-black mb-12 leading-relaxed">
            真正的风格不应随波逐流
            <br />
            而应回归穿着者本身
          </h2>
          <div className="w-12 h-px bg-black mx-auto mb-12"></div>
          <p className="text-gray-600 leading-winest font-light text-lg max-w-2xl mx-auto">
            amidrajk 的“简约”并非单纯的形式减法，而是经过深思熟虑的美学表达。
            我们摒弃冗余装饰与浮夸设计，将重心聚焦于服装的本质：材质的纯粹、剪裁的精准与细节的考究。
          </p>
        </div>
      </section>

      {/* Brand Video Show */}
      <section
        className="w-full bg-black overflow-hidden relative group cursor-pointer"
        onClick={() => {
          if (videoRef.current) {
            if (videoRef.current.paused) {
              videoRef.current.play();
              setIsPlaying(true);
            } else {
              videoRef.current.pause();
              setIsPlaying(false);
            }
          }
        }}
      >
        <video
          ref={videoRef}
          className="w-full h-[50vh] md:h-[85vh] object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/videos/show.mp4"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          您的浏览器不支持视频播放。
        </video>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/30">
            <div className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/50 transition-transform hover:scale-110">
              <Play className="text-white fill-white ml-1" size={32} />
            </div>
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
      </section>

      {/* 6. Offline Store - Shop Image (Moved) */}
      <section id="offline-store" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[21/9] overflow-hidden group">
            <img
              src="/ads/shop.jpg"
              alt="Offline Store"
              className="w-full h-full object-cover transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
              <span className="text-white/80 text-xs tracking-[0.3em] uppercase mb-4">
                欢迎光临
              </span>
              <h2 className="text-white text-3xl md:text-5xl font-light tracking-[0.2em] mb-8">
                线下体验店
              </h2>
              <Link
                to="/contact"
                className="border border-white/50 text-white px-8 py-3 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:border-white transition-all backdrop-blur-sm"
              >
                获取路线
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. New Arrivals - Clean Grid */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-3xl font-light tracking-wide text-black">
              本季新品
            </h2>
            <Link
              to="/products"
              className="text-sm border-b border-black pb-1 hover:text-gray-600 transition-colors"
            >
              查看全部
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Design Philosophy - Image & Text */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
              <img
                src="/ads/2.jpg"
                alt="Design Philosophy"
                className="w-full h-full object-cover transition-all duration-1000"
              />
            </div>

            <div className="space-y-10">
              <h3 className="text-4xl font-light text-black leading-tight">
                服装是自我的延伸
              </h3>
              <div className="space-y-6 text-gray-500 font-light text-lg leading-relaxed">
                <p>
                  我们倡导“服装服务于人，而非定义人”。设计不追逐短暂潮流，而是围绕“多场景适配”与“衣橱兼容性”展开。
                </p>
                <p>
                  从都市通勤的干练衬衫到休闲时刻的松弛针织，全系列单品以中性色与低饱和色系为基底，通过简约廓形与灵活搭配，满足多元需求。
                </p>
              </div>
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center space-x-3 group"
                >
                  <span className="uppercase tracking-widest text-sm font-bold border-b border-transparent group-hover:border-black transition-all pb-1">
                    阅读品牌故事
                  </span>
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4.5. Style Journal */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-center mb-16 tracking-wide text-black">
            风格日志
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[3/4]">
                <img
                  src="/ads/3.jpg"
                  alt="Urban Minimalist"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-2">
                都市极简
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                在喧嚣都市中寻找宁静。以纯粹线条勾勒生活轮廓，从容应对每一个日常瞬间。
              </p>
            </div>
            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[3/4]">
                <img
                  src="/ads/4.jpg"
                  alt="Texture & Form"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-2">
                肌理与廓形
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                回归材质本真。触感细腻的羊毛与挺括的科技面料，共同演绎刚柔并济的穿着美学。
              </p>
            </div>
            <div className="group cursor-pointer">
              <div className="overflow-hidden mb-6 aspect-[3/4]">
                <img
                  src="/ads/5.jpg"
                  alt="Timeless Classics"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-2">
                永恒经典
              </h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                超越时间的束缚。不为潮流左右的经典单品，构建可持续的胶囊衣橱。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Categories - Minimalist Tiles */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-4 h-[600px]">
            {[
              {
                cat: Category.RECOMMEND,
                name: "SILHOUETTE",
                img: "/products/pro-1.jpg", // Minimalist top
              },
              {
                cat: Category.HOT,
                name: "STRUCTURE",
                img: "/ads/6.jpg", // Minimalist pants
              },
              {
                cat: Category.NEW,
                name: "OBJECTS",
                img: "/ads/5.jpg", // Minimalist simple accessory
              },
            ].map((item, i) => (
              <Link
                to={`/products?category=${item.cat}`}
                key={i}
                className="relative group overflow-hidden h-full flex-1"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-3xl font-light tracking-[0.3em] uppercase border border-white/50 px-8 py-4 backdrop-blur-sm hover:bg-white hover:text-black transition-all duration-500">
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. Client Voice */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light tracking-wide text-black mb-4">
              客户之声
            </h2>
            <div className="w-12 h-px bg-black mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="space-y-6">
              <div className="flex justify-center text-black space-x-1">
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
              </div>
              <p className="text-gray-600 font-light text-lg italic leading-relaxed">
                &ldquo;版型正如我所期待的那样。纯粹、简单，却充满力量。这就是我一直在寻找的风格。&rdquo;
              </p>
              <p className="text-xs font-bold tracking-widest uppercase">
                Allen W. / 资深设计师
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex justify-center text-black space-x-1">
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
              </div>
              <p className="text-gray-600 font-light text-lg italic leading-relaxed">
                &ldquo;品质超乎想象。面料触感极佳，剪裁非常考究。这不仅仅是一件衣服，更是一种生活态度。&rdquo;
              </p>
              <p className="text-xs font-bold tracking-widest uppercase">
                Sarah L. / 创意总监
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex justify-center text-black space-x-1">
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
                <Star size={16} fill="black" />
              </div>
              <p className="text-gray-600 font-light text-lg italic leading-relaxed">
                &ldquo;终于找到了一个真正理解‘少即是多’的品牌。每一件单品都值得长久珍藏。&rdquo;
              </p>
              <p className="text-xs font-bold tracking-widest uppercase">
                David C. / 建筑师
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Newsletter / CTA - Simple */}
      <section className="py-32 bg-black text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-light mb-6 tracking-wide">订阅通讯</h2>
          <p className="text-gray-400 mb-10 font-light">
            订阅我们的邮件，第一时间获取新品发布与专属活动信息。
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="请输入您的邮箱"
              className="flex-1 bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-white transition-colors text-center sm:text-left"
            />
            <button
              type="button"
              className="text-sm font-bold tracking-widest uppercase hover:text-gray-300 transition-colors mt-4 sm:mt-0"
            >
              订阅
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
