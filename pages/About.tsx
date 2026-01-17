import { Fingerprint, Leaf, Scissors, Sparkles } from "lucide-react";
import React from "react";

const About: React.FC = () => {
  return (
    <div className="pt-24 flex flex-col font-sans">
      {/* Brand Hero - Minimal Text */}
      <section className="relative py-40 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 block">
            始于 2023
          </span>
          <h1 className="text-5xl md:text-7xl font-thin tracking-tight text-black mb-10">
            amidrajk
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            在潮流迭代加速的当下，
            <br className="hidden md:block" />
            我们坚信真正的风格不应随波逐流，
            <br className="hidden md:block" />
            而应回归穿着者本身。
          </p>
        </div>
      </section>

      {/* Brand Essence - Story */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <img
                src="/cms/goose/ads/3.jpg"
                alt="Brand Essence"
                className="shadow-2xl transition-all duration-700"
              />
            </div>
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl font-light text-black mb-6">
                  少即是多，简而不凡
                </h2>
                <div className="w-8 h-px bg-black mb-6"></div>
                <div className="space-y-6 text-gray-600 font-light text-lg leading-relaxed">
                  <p>
                    amidrajk
                    品牌创建于2023年。我们的诞生是对当代时尚的深刻反思。
                  </p>
                  <p>
                    品牌以“极简主义”为核心美学，专注于时尚简约服装的创作。我们摒弃冗余装饰与浮夸设计，将重心聚焦于服装的本质：材质的纯粹、剪裁的精准与细节的考究。
                  </p>
                  <p>
                    每一件单品都具备“穿十年仍不过时”的长效价值；立体剪裁基于人体工学原理，在利落线条中暗藏修饰身形的巧思。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Values - Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-3xl font-light text-black mb-4">核心价值</h2>
            <p className="text-gray-400 font-light tracking-widest uppercase">
              我们的信仰
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: <Sparkles size={32} strokeWidth={1} />,
                title: "克制即高级",
                desc: "我们不刻意标榜潮流，而是以沉静、坚定的设计语言，表达最真实的自我。",
              },
              {
                icon: <Leaf size={32} strokeWidth={1} />,
                title: "回归本真",
                desc: "在物质丰裕的时代选择精简，在纷繁复杂的世界保持清醒。",
              },
              {
                icon: <Scissors size={32} strokeWidth={1} />,
                title: "匠心剪裁",
                desc: "一道自然褶裥、一次肌理拼接、一枚隐形纽扣，都在无声中彰显品质。",
              },
              {
                icon: <Fingerprint size={32} strokeWidth={1} />,
                title: "独立审美",
                desc: "面向拥有独立审美判断的群体，相信真正的品味源于内在的自信。",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center group"
              >
                <div className="mb-8 p-6 bg-gray-50 rounded-full text-gray-800 group-hover:bg-black group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h4 className="text-xl font-medium mb-4 text-black">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 bg-black text-white relative">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-2xl md:text-4xl font-light italic leading-relaxed text-gray-300">
            "简约不是单调的代名词，而是更高级的表达。
            <br />
            服装不止是遮体的器物，更是自我态度的无声宣言。"
          </p>
          <div className="mt-12 text-sm font-bold tracking-[0.3em] uppercase text-gray-500">
            — amidrajk 设计哲学
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
