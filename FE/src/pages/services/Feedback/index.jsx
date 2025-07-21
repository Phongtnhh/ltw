import React, { useState } from 'react';

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    feedbackType: '',
    title: '',
    content: ''
  });

  const handleRating = (value) => {
    setRating(value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Feedback submitted:', { ...formData, rating });
    alert('Cảm ơn bạn đã gửi góp ý! Chúng tôi sẽ xem xét và phản hồi sớm nhất.');
  };

  const services = [
    { value: '', label: 'Chọn dịch vụ' },
    { value: 'business-registration', label: 'Đăng ký kinh doanh' },
    { value: 'tax-declaration', label: 'Khai báo thuế' },
    { value: 'vehicle-registration', label: 'Đăng ký xe' },
    { value: 'other', label: 'Khác' }
  ];

  const feedbackTypes = [
    { value: '', label: 'Chọn loại góp ý' },
    { value: 'compliment', label: 'Khen ngợi' },
    { value: 'suggestion', label: 'Đề xuất cải tiến' },
    { value: 'complaint', label: 'Khiếu nại' },
    { value: 'question', label: 'Câu hỏi' },
    { value: 'bug-report', label: 'Báo lỗi hệ thống' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800">Góp Ý Kiến</h1>
          <p className="text-gray-600 mt-2">Ý kiến của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Feedback Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Gửi Góp Ý</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập họ và tên"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập địa chỉ email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Dịch vụ liên quan
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {services.map(service => (
                        <option key={service.value} value={service.value}>
                          {service.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loại góp ý *
                    </label>
                    <select
                      name="feedbackType"
                      value={formData.feedbackType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {feedbackTypes.map(type => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Đánh giá chung về dịch vụ
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRating(star)}
                        className={`text-2xl transition duration-200 ${
                          star <= rating ? 'text-yellow-400' : 'text-gray-300'
                        } hover:text-yellow-400`}
                      >
                        ⭐
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {rating > 0 && `${rating}/5 sao`}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tiêu đề *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tiêu đề góp ý"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nội dung góp ý *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Chia sẻ chi tiết góp ý của bạn..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-semibold"
                >
                  Gửi góp ý
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Guidelines */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">Hướng Dẫn Góp Ý</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Góp ý cụ thể, rõ ràng về dịch vụ đã sử dụng</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Sử dụng ngôn từ lịch sự, tôn trọng</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">✓</span>
                  <span>Cung cấp thông tin liên hệ để được phản hồi</span>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Thống Kê Góp Ý</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Tổng góp ý:</span>
                  <span className="font-bold text-blue-600">1,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Đã xử lý:</span>
                  <span className="font-bold text-green-600">1,156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Tỷ lệ hài lòng:</span>
                  <span className="font-bold text-blue-600">94.5%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
