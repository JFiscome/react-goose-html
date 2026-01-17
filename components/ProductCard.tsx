import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative bg-white flex flex-col h-full">
      {/* Image Area */}
      <Link
        to={`/products/${product.id}`}
        className="block relative aspect-[3/4] overflow-hidden bg-gray-100"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        {/* Overlays */}
        {product.isComingSoon ? (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-0.5 uppercase tracking-widest">
            敬请期待
          </span>
        ) : product.isNew ? (
          <span className="absolute top-2 left-2 bg-black text-white text-[10px] font-medium px-2 py-0.5 uppercase tracking-widest">
            新品
          </span>
        ) : null}
      </Link>

      {/* Content Area */}
      <div className="py-4 flex flex-col flex-grow">
        <Link to={`/products/${product.id}`} className="block mb-2">
          <h3 className="text-black font-medium text-base line-clamp-1 hover:text-gray-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center space-x-2 mb-3">
          {product.tags.slice(0, 1).map((tag) => (
            <span
              key={tag}
              className="text-[10px] text-gray-500 uppercase tracking-wider border border-gray-200 px-1.5 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline space-x-2">
            <span className="text-black font-medium text-lg">
              ¥{product.price}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-gray-300 text-xs line-through font-light">
                ¥{product.originalPrice}
              </span>
            )}
          </div>

          {product.isComingSoon ? (
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest pb-0.5 cursor-not-allowed">
              敬请期待
            </span>
          ) : (
            <a
              href={product.tmallUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black border-b border-black text-xs font-bold uppercase tracking-widest pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              立即购买
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
