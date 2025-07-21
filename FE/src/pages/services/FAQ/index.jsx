import React, { useState } from 'react';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState({});

  const categories = [
    { id: 'general', name: 'Câu hỏi chung', icon: '❓' },
    { id: 'account', name: 'Tài khoản', icon: '👤' },
    { id: 'services', name: 'Dịch vụ công', icon: '🏛️' },
    { id: 'technical', name: 'Kỹ thuật', icon: '🔧' },
    { id: 'payment', name: 'Thanh toán', icon: '💳' }
  ];

  const faqData = {
    general: [
      {
        id: 1,
        question: 'Cổng thông tin này cung cấp những dịch vụ gì?',
        answer: 'Cổng thông tin cung cấp các dịch vụ công trực tuyến như đăng ký kinh doanh, khai báo thuế, đăng ký xe, cấp giấy phép xây dựng, và nhiều thủ tục hành chính khác.'
      },
      {
        id: 2,
        question: 'Thời gian hoạt động của hệ thống là như thế nào?',
        answer: 'Hệ thống hoạt động 24/7, bạn có thể truy cập và sử dụng dịch vụ bất kỳ lúc nào. Tuy nhiên, một số dịch vụ có thể được xử lý trong giờ hành chính.'
      }
    ],
    account: [
      {
        id: 3,
        question: 'Làm thế nào để tạo tài khoản?',
        answer: 'Bạn có thể tạo tài khoản bằng cách click "Đăng ký" trên trang chủ, sau đó điền đầy đủ thông tin cá nhân và xác thực qua email hoặc SMS.'
      },
      {
        id: 4,
        question: 'Tôi quên mật khẩu, phải làm sao?',
        answer: 'Sử dụng chức năng "Quên mật khẩu" trên trang đăng nhập. Nhập email hoặc số điện thoại đã đăng ký, hệ thống sẽ gửi link đặt lại mật khẩu.'
      }
    ],
    services: [
      {
        id: 5,
        question: 'Thời gian xử lý hồ sơ là bao lâu?',
        answer: 'Thời gian xử lý tùy thuộc vào từng loại hồ sơ: Đăng ký kinh doanh (3-5 ngày), Đăng ký xe (2-3 ngày), Cấp phép xây dựng (15-20 ngày).'
      }
    ],
    technical: [
      {
        id: 6,
        question: 'Tại sao tôi không thể đăng nhập?',
        answer: 'Kiểm tra lại tên đăng nhập và mật khẩu. Đảm bảo Caps Lock đã tắt và không có dấu cách thừa. Nếu vẫn không được, thử xóa cache trình duyệt.'
      }
    ],
    payment: [
      {
        id: 7,
        question: 'Có những hình thức thanh toán nào?',
        answer: 'Hỗ trợ thanh toán qua thẻ ATM/Visa/MasterCard, ví điện tử (MoMo, ZaloPay, VNPay), chuyển khoản ngân hàng, hoặc thanh toán trực tiếp tại cơ quan.'
      }
    ]
  };

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredFAQs = faqData[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800">Câu Hỏi Thường Gặp</h1>
          <p className="text-gray-600 mt-2">Tìm câu trả lời nhanh chóng cho các thắc mắc của bạn</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-4 top-3 text-gray-400 text-xl">🔍</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4">Danh Mục</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 flex items-center space-x-3 ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">
                  {categories.find(cat => cat.id === activeCategory)?.name}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredFAQs.length} câu hỏi
                </p>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredFAQs.map(faq => (
                  <div key={faq.id} className="p-6">
                    <button
                      onClick={() => toggleExpand(faq.id)}
                      className="w-full text-left flex items-center justify-between group"
                    >
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition duration-300">
                        {faq.question}
                      </h3>
                      <span className={`text-2xl transition duration-300 ${
                        expandedItems[faq.id] ? 'rotate-180' : ''
                      }`}>
                        ⌄
                      </span>
                    </button>
                    
                    {expandedItems[faq.id] && (
                      <div className="mt-4 text-gray-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="p-12 text-center">
                  <span className="text-4xl mb-4 block">🔍</span>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Không tìm thấy kết quả
                  </h3>
                  <p className="text-gray-600">
                    Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Không Tìm Thấy Câu Trả Lời?</h2>
            <p className="text-gray-600 mb-6">
              Chúng tôi luôn sẵn sàng hỗ trợ bạn qua các kênh sau
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2">
                <span>💬</span>
                <span>Chat trực tuyến</span>
              </button>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center space-x-2">
                <span>📞</span>
                <span>Hotline: 1900 1234</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
