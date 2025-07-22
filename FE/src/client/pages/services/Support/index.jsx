import React, { useState } from 'react';

const Support = () => {
  const [activeTab, setActiveTab] = useState('technical');

  const supportChannels = [
    {
      id: 'hotline',
      title: 'Hotline 24/7',
      description: 'Gọi ngay để được hỗ trợ trực tiếp',
      contact: '1900 1234',
      icon: '📞',
      available: true
    },
    {
      id: 'chat',
      title: 'Chat trực tuyến',
      description: 'Trò chuyện với nhân viên hỗ trợ',
      contact: 'Bắt đầu chat',
      icon: '💬',
      available: true
    },
    {
      id: 'email',
      title: 'Email hỗ trợ',
      description: 'Gửi email để được tư vấn chi tiết',
      contact: 'support@congthongtin.gov.vn',
      icon: '✉️',
      available: true
    },
    {
      id: 'ticket',
      title: 'Tạo ticket',
      description: 'Tạo yêu cầu hỗ trợ để theo dõi',
      contact: 'Tạo ticket mới',
      icon: '🎫',
      available: true
    }
  ];

  const faqCategories = {
    technical: {
      title: 'Hỗ trợ kỹ thuật',
      questions: [
        {
          q: 'Tôi không thể đăng nhập vào hệ thống?',
          a: 'Vui lòng kiểm tra tên đăng nhập và mật khẩu. Nếu vẫn không được, hãy sử dụng chức năng "Quên mật khẩu" hoặc liên hệ hotline.'
        },
        {
          q: 'Tại sao trang web tải chậm?',
          a: 'Có thể do kết nối internet hoặc trình duyệt. Hãy thử làm mới trang, xóa cache hoặc sử dụng trình duyệt khác.'
        }
      ]
    },
    service: {
      title: 'Dịch vụ công',
      questions: [
        {
          q: 'Thời gian xử lý hồ sơ là bao lâu?',
          a: 'Thời gian xử lý tùy thuộc vào từng loại hồ sơ, thường từ 1-15 ngày làm việc. Bạn có thể tra cứu tiến độ trực tuyến.'
        }
      ]
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800">Hỗ Trợ Kỹ Thuật</h1>
          <p className="text-gray-600 mt-2">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Support Channels */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Kênh Hỗ Trợ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportChannels.map(channel => (
              <div key={channel.id} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition duration-300">
                <div className="text-4xl mb-4">{channel.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{channel.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{channel.description}</p>
                <button className={`w-full py-2 rounded-lg font-semibold transition duration-300 ${
                  channel.available 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}>
                  {channel.contact}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-8">Câu Hỏi Thường Gặp</h2>
          
          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                {Object.entries(faqCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm transition duration-300 ${
                      activeTab === key
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {category.title}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              <div className="space-y-6">
                {faqCategories[activeTab].questions.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
