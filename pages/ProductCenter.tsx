import {
  ChevronDown,
  Filter,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { products as allProducts } from "../data";
import { Attribute, Category } from "../types";

const ProductCenter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<string>("店铺精选");
  const [activeAttr, setActiveAttr] = useState<string>("全部");
  const [sortBy, setSortBy] = useState<string>("默认");
  const [searchQuery, setSearchQuery] = useState("");

  // Synchronize with URL params
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setActiveCategory(cat);
  }, [searchParams]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (activeCategory !== "店铺精选") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (activeAttr !== "全部") {
      result = result.filter((p) => p.attribute === activeAttr);
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    switch (sortBy) {
      case "销量优先":
        result.sort((a, b) => b.sales - a.sales);
        break;
      case "价格从低到高":
        result.sort((a, b) => a.price - b.price);
        break;
      case "价格从高到低":
        result.sort((a, b) => b.price - a.price);
        break;
      case "新品优先":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, activeAttr, sortBy, searchQuery]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-10 mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-light text-black mb-2 tracking-wide">
            商品中心
          </h1>
          <p className="text-gray-400 font-light">amidrajk - Simple is True</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:flex gap-10">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0 mb-10 lg:mb-0">
            <div className="bg-white p-6 sticky top-28">
              <div className="flex items-center space-x-2 mb-8 text-black font-medium border-b border-gray-100 pb-4">
                <Filter size={18} />
                <span className="uppercase tracking-widest text-xs">筛选</span>
              </div>

              {/* Category */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-widest">
                  分类
                </h4>
                <div className="flex flex-col space-y-2">
                  {["店铺精选", ...Object.values(Category)].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left text-sm py-2 px-3 transition-all ${
                        activeCategory === cat
                          ? "bg-black text-white"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attributes */}
              <div className="mb-8">
                <h4 className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-widest">
                  属性
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["全部", ...Object.values(Attribute)].map((attr) => (
                    <button
                      key={attr}
                      onClick={() => setActiveAttr(attr)}
                      className={`text-xs px-3 py-1.5 border transition-all ${
                        activeAttr === attr
                          ? "bg-black border-black text-white"
                          : "border-gray-200 text-gray-500 hover:border-black hover:text-black"
                      }`}
                    >
                      {attr}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveCategory("店铺精选");
                  setActiveAttr("全部");
                  setSearchQuery("");
                }}
                className="w-full py-3 text-xs text-gray-400 hover:text-black transition-colors border-t border-gray-100 pt-4 uppercase tracking-widest"
              >
                重置筛选
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-grow">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div className="relative flex-grow max-w-md">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="搜索商品..."
                  className="w-full pl-8 pr-4 py-2 bg-transparent border-b border-gray-200 focus:border-black outline-none transition-colors text-sm placeholder:text-gray-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-5 py-2 text-sm font-medium hover:text-gray-600 transition-all">
                    <SlidersHorizontal size={14} />
                    <span className="uppercase tracking-widest text-xs">
                      排序: {sortBy}
                    </span>
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute right-0 mt-0 w-48 bg-white border border-gray-100 py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-20 shadow-lg">
                    {[
                      "默认",
                      "销量优先",
                      "价格从低到高",
                      "价格从高到低",
                      "新品优先",
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSortBy(opt)}
                        className={`w-full text-left px-5 py-2 text-xs hover:bg-gray-50 transition-colors ${sortBy === opt ? "font-bold text-black" : "text-gray-500"}`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-40 bg-gray-50 border border-gray-100">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 border border-gray-200">
                  <ShoppingBag size={32} strokeWidth={1} />
                </div>
                <h3 className="text-lg font-medium text-black mb-2">
                  未找到相关商品
                </h3>
                <p className="text-gray-400 text-sm font-light">
                  请尝试调整搜索或筛选条件。
                </p>
                <button
                  onClick={() => {
                    setActiveCategory("店铺精选");
                    setActiveAttr("全部");
                  }}
                  className="mt-6 text-black text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  清除所有筛选
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductCenter;
