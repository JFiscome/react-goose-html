import {
  ChevronRight,
  Headset,
  Heart,
  RotateCcw,
  Share2,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "../data";
// import ProductCard from '../components/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product)
    return (
      <div className="pt-40 pb-20 text-center">
        <h2 className="text-3xl font-light">未找到商品</h2>
        <Link
          to="/products"
          className="text-black border-b border-black hover:opacity-70 mt-4 inline-block pb-1"
        >
          返回商品中心
        </Link>
      </div>
    );

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex py-6 text-xs text-gray-500 uppercase tracking-widest">
          <Link to="/" className="hover:text-black transition-colors">
            首页
          </Link>
          <ChevronRight size={12} className="mx-2" />
          <Link to="/products" className="hover:text-black transition-colors">
            商品中心
          </Link>
          <ChevronRight size={12} className="mx-2" />
          <span className="text-black truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        <div className="bg-white">
          <div className="lg:flex gap-12">
            {/* Image Gallery */}
            <div className="lg:w-1/2">
              <div className="aspect-[3/4] bg-gray-50 mb-4 overflow-hidden">
                <img
                  src={product.images[activeImg] || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
              <div className="flex gap-4 scroll-hide overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`flex-shrink-0 w-20 h-24 overflow-hidden border transition-all ${
                      activeImg === idx
                        ? "border-black"
                        : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      className="w-full h-full object-cover"
                      alt="Thumb"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2 py-6">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                  {product.category}
                </span>
                {product.isNew && (
                  <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">
                    新品
                  </span>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl font-light text-black mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-baseline space-x-4 mb-8">
                <span className="text-2xl font-medium text-black">
                  ¥{product.price}
                </span>
                {product.originalPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through font-light">
                    ¥{product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed mb-10 font-light text-lg">
                {product.description}
              </p>

              <div className="space-y-8 mb-12 border-t border-b border-gray-100 py-8">
                <div className="flex items-center gap-8">
                  <span className="text-xs font-bold text-black uppercase tracking-widest w-16">
                    面料
                  </span>
                  <span className="text-sm text-gray-600 font-light">
                    {product.material}
                  </span>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-xs font-bold text-black uppercase tracking-widest w-16">
                    颜色
                  </span>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="text-xs border border-gray-200 px-3 py-1 text-gray-600"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <span className="text-xs font-bold text-black uppercase tracking-widest w-16">
                    尺寸
                  </span>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        className="w-10 h-10 flex items-center justify-center border border-gray-200 text-xs font-medium hover:border-black hover:bg-black hover:text-white transition-all"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                {product.isComingSoon ? (
                  <button
                    disabled
                    className="flex-grow bg-gray-300 text-white py-4 font-bold flex items-center justify-center space-x-2 cursor-not-allowed uppercase tracking-widest text-sm"
                  >
                    <span>敬请期待</span>
                  </button>
                ) : (
                  <a
                    href={product.tmallUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-grow bg-black text-white py-4 font-bold flex items-center justify-center space-x-2 hover:bg-gray-800 transition-all uppercase tracking-widest text-sm"
                  >
                    <ShoppingBag size={16} />
                    <span>前往天猫购买</span>
                  </a>
                )}
                <button className="flex-shrink-0 bg-white text-black p-4 border border-gray-200 hover:border-black transition-all">
                  <Heart size={20} />
                </button>
                <button className="flex-shrink-0 bg-white text-black p-4 border border-gray-200 hover:border-black transition-all">
                  <Share2 size={20} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-wider">
                  <ShieldCheck className="text-black" size={14} />
                  <span>正品保证</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-wider">
                  <RotateCcw className="text-black" size={14} />
                  <span>七天退换</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-wider">
                  <Headset className="text-black" size={14} />
                  <span>客户支持</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Description Section */}
        <div className="mt-24 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h3 className="text-xl font-medium text-black mb-8 uppercase tracking-widest">
                产品亮点
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 bg-gray-50">
                  <h5 className="font-bold text-black mb-4 text-sm uppercase tracking-widest">
                    优质面料
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm">
                    严选高品质面料，兼顾舒适与耐用。面料经过特殊处理，触感柔软，悬垂感极佳。
                  </p>
                </div>
                <div className="p-8 bg-gray-50">
                  <h5 className="font-bold text-black mb-4 text-sm uppercase tracking-widest">
                    完美剪裁
                  </h5>
                  <p className="text-gray-500 leading-relaxed font-light text-sm">
                    基于人体工学设计，确保活动自如的同时，保持利落挺括的轮廓。
                  </p>
                </div>
              </div>
            </section>

            {product.detailImages && product.detailImages.length > 0 ? (
              <section>
                <h3 className="text-xl font-medium text-black mb-8 uppercase tracking-widest">
                  详细规格
                </h3>
                <div className="space-y-0">
                  {product.detailImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Detail ${index + 1}`}
                      className="w-full block"
                    />
                  ))}
                </div>
              </section>
            ) : (
              <section>
                <h3 className="text-xl font-medium text-black mb-8 uppercase tracking-widest">
                  产品图集
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <img
                    src="/cms/goose/ads/7.jpg"
                    alt="Detail 1"
                    className="w-full transition-all duration-700"
                  />
                  <img
                    src="/cms/goose/ads/8.jpg"
                    alt="Detail 2"
                    className="w-full transition-all duration-700"
                  />
                </div>
              </section>
            )}
          </div>

          {/* Recommendations Sidebar */}
          <div className="space-y-10">
            <h3 className="text-xl font-medium text-black mb-8 uppercase tracking-widest">
              猜你喜欢
            </h3>
            <div className="space-y-8">
              {products
                .filter((p) => p.id !== id)
                .slice(0, 3)
                .map((rec) => (
                  <div key={rec.id} className="flex gap-4 group">
                    <Link
                      to={`/products/${rec.id}`}
                      className="w-20 h-24 overflow-hidden flex-shrink-0 bg-gray-100"
                    >
                      <img
                        src={rec.images[0]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={rec.name}
                      />
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link
                        to={`/products/${rec.id}`}
                        className="font-medium text-black hover:text-gray-600 transition-colors line-clamp-1 mb-1"
                      >
                        {rec.name}
                      </Link>
                      <span className="text-black text-sm">¥{rec.price}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
