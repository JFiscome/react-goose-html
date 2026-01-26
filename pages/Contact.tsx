import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    content: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.content) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: "", phone: "", content: "" });
    }
  };

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Header */}
      <div className="bg-white py-16 mb-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">
            联系我们
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light leading-relaxed">
            真诚期待与你沟通。无论是产品建议、商务合作还是咨询，我们都在这里。
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-8">
            <div className="bg-gray-50 p-10 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-light text-black mb-10">
                  保持联系
                </h3>
                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-10 h-10 border border-black rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-black group-hover:text-white">
                      <Phone size={18} />
                    </div>
                    <div>
                      <h5 className="font-bold text-black mb-1 text-sm uppercase tracking-widest">
                        电话
                      </h5>
                      <p className="text-gray-500 mb-1">400-888-8888</p>
                      <span className="text-xs text-gray-400 font-medium">
                        周一至周五, 9:00 - 18:00
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-10 h-10 border border-black rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-black group-hover:text-white">
                      <Mail size={18} />
                    </div>
                    <div>
                      <h5 className="font-bold text-black mb-1 text-sm uppercase tracking-widest">
                        邮箱
                      </h5>
                      <p className="text-gray-500 mb-1">amidrajk@163.com</p>
                      <span className="text-xs text-gray-400 font-medium">
                        24小时内回复
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-10 h-10 border border-black rounded-full flex items-center justify-center flex-shrink-0 transition-all group-hover:bg-black group-hover:text-white">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h5 className="font-bold text-black mb-1 text-sm uppercase tracking-widest">
                        地址
                      </h5>
                      <p className="text-gray-500">
                        福建省福州市仓山区科技园A栋
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-gray-200">
                <h5 className="font-bold text-black mb-6 flex items-center gap-2 text-sm uppercase tracking-widest">
                  关注我们
                </h5>
                <div className="flex gap-6">
                  <div className="text-center group cursor-pointer">
                    <span className="text-sm text-gray-500 font-medium group-hover:text-black transition-colors border-b border-transparent group-hover:border-black pb-0.5">
                      WeChat
                    </span>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <span className="text-sm text-gray-500 font-medium group-hover:text-black transition-colors border-b border-transparent group-hover:border-black pb-0.5">
                      TikTok
                    </span>
                  </div>
                  <div className="text-center group cursor-pointer">
                    <span className="text-sm text-gray-500 font-medium group-hover:text-black transition-colors border-b border-transparent group-hover:border-black pb-0.5">
                      Instagram
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="bg-black text-white p-10 relative overflow-hidden">
            <h3 className="text-2xl font-light mb-4 relative z-10">发送留言</h3>
            <p className="text-gray-400 mb-10 relative z-10 font-light">
              我们将尽快回复您。
            </p>

            {submitted ? (
              <div className="h-64 flex flex-col items-center justify-center animate-in fade-in duration-500 border border-white/20">
                <CheckCircle2
                  size={48}
                  className="text-white mb-6"
                  strokeWidth={1}
                />
                <h4 className="text-xl font-light mb-2">留言已发送</h4>
                <p className="text-gray-400 text-sm">
                  感谢您的联系，我们会尽快处理。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold mb-2 text-gray-500 uppercase tracking-widest">
                      姓名
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-2 text-gray-500 uppercase tracking-widest">
                      电话
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-700"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2 text-gray-500 uppercase tracking-widest">
                    留言内容
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder:text-gray-700 resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black font-bold py-4 mt-4 uppercase tracking-widest hover:bg-gray-200 transition-colors"
                >
                  发送留言
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
