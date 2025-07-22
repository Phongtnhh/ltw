import React, { useState } from 'react';

const Procedures = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'Tất cả thủ tục' },
    { id: 'business', name: 'Doanh nghiệp' },
    { id: 'individual', name: 'Cá nhân' },
    { id: 'construction', name: 'Xây dựng' },
    { id: 'transport', name: 'Giao thông' }
  ];

  const procedures = [
    {
      id: 1,
      title: 'Đăng ký thành lập doanh nghiệp',
      category: 'business',
      department: 'Sở Kế hoạch và Đầu tư',
      time: '15 ngày làm việc',
      fee: '500,000 VNĐ',
      documents: [
        'Đơn đăng ký thành lập doanh nghiệp',
        'Điều lệ công ty',
        'Danh sách thành viên góp vốn',
        'Bản sao CMND/CCCD của người đại diện'
      ],
      steps: [
        'Chuẩn bị hồ sơ theo quy định',
        'Nộp hồ sơ tại Sở KH&ĐT hoặc trực tuyến',
        'Thanh toán lệ phí',
        'Chờ thẩm định hồ sơ',
        'Nhận Giấy chứng nhận đăng ký doanh nghiệp'
      ],
      online: true,
      popular: true
    },
    {
      id: 2,
      title: 'Đăng ký kết hôn',
      category: 'individual',
      department: 'UBND Phường/Xã',
      time: '1 ngày làm việc',
      fee: '20,000 VNĐ',
      documents: [
        'Đơn đăng ký kết hôn',
        'Bản sao CMND/CCCD của hai bên',
        'Giấy khám sức khỏe tiền hôn nhân',
        'Giấy xác nhận tình trạng hôn nhân'
      ],
      steps: [
        'Chuẩn bị hồ sơ đầy đủ',
        'Nộp hồ sơ tại UBND nơi cư trú',
        'Thanh toán lệ phí',
        'Tham gia lễ đăng ký kết hôn',
        'Nhận Giấy chứng nhận kết hôn'
      ],
      online: false,
      popular: true
    },
    {
      id: 3,
      title: 'Cấp phép xây dựng nhà ở',
      category: 'construction',
      department: 'Sở Xây dựng',
      time: '20 ngày làm việc',
      fee: '2% giá trị công trình',
      documents: [
        'Đơn xin phép xây dựng',
        'Bản vẽ thiết kế kỹ thuật',
        'Giấy chứng nhận quyền sử dụng đất',
        'Báo cáo đánh giá tác động môi trường'
      ],
      steps: [
        'Lập hồ sơ thiết kế',
        'Nộp hồ sơ xin phép',
        'Thẩm định hồ sơ',
        'Thanh toán phí và lệ phí',
        'Nhận Giấy phép xây dựng'
      ],
      online: true,
      popular: false
    }
  ];

  const filteredProcedures = procedures.filter(procedure => {
    const matchesCategory = selectedCategory === 'all' || procedure.category === selectedCategory;
    const matchesSearch = procedure.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const popularProcedures = procedures.filter(p => p.popular);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-800">Thủ Tục Hành Chính</h1>
          <p className="text-gray-600 mt-2">Hướng dẫn chi tiết các thủ tục hành chính phổ biến</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Popular Procedures */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Thủ Tục Phổ Biến</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularProcedures.map(procedure => (
              <div key={procedure.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{procedure.title}</h3>
                  {procedure.online && (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-semibold">
                      Trực tuyến
                    </span>
                  )}
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Cơ quan:</span>
                    <span className="font-semibold">{procedure.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Thời gian:</span>
                    <span className="font-semibold">{procedure.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Phí:</span>
                    <span className="font-semibold text-green-600">{procedure.fee}</span>
                  </div>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Search and Filter */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Tìm kiếm thủ tục..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                Tìm kiếm
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Procedures List */}
        <section>
          <div className="space-y-6">
            {filteredProcedures.map(procedure => (
              <div key={procedure.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-2/3">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-xl font-semibold">{procedure.title}</h3>
                      {procedure.online && (
                        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                          Trực tuyến
                        </span>
                      )}
                      {procedure.popular && (
                        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                          Phổ biến
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div>
                        <span className="text-gray-500 text-sm">Cơ quan thực hiện:</span>
                        <p className="font-semibold">{procedure.department}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Thời gian xử lý:</span>
                        <p className="font-semibold">{procedure.time}</p>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm">Lệ phí:</span>
                        <p className="font-semibold text-green-600">{procedure.fee}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Hồ sơ cần thiết:</h4>
                      <ul className="space-y-1">
                        {procedure.documents.map((doc, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span className="text-gray-700 text-sm">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/3">
                    <h4 className="font-semibold mb-3">Quy trình thực hiện:</h4>
                    <ol className="space-y-3">
                      {procedure.steps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                    
                    <div className="mt-6 space-y-2">
                      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                        {procedure.online ? 'Thực hiện trực tuyến' : 'Tải mẫu đơn'}
                      </button>
                      <button className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg hover:bg-gray-50 transition duration-300">
                        Hướng dẫn chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Procedures;
