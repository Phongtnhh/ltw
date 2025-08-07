const News = require("../../model/News.model")

module.exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const category = req.query.category || '';

    // Tạo query filter
    let filter = {
      status: 'published',
      deleted: { $ne: true }
    };


    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    
    if (category && category !== 'all') {
      filter.category = category;
    }

    const [news, totalItems] = await Promise.all([
      News.find(filter).sort({ createdAt: -1 }).limit(limit).skip(skip),
      News.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      massage: "Lấy tin tức thành công",
      News: news,
      currentPage: page,
      totalPages: totalPages,
      totalItems: totalItems
    });
  } catch (error) {
    res.status(500).json({ massage: "Lỗi server" });
  }
};

// [Get] detail new
module.exports.detailNews = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin tức'
            })
        }
        res.json({
            success: true,
            data: news
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi lấy tin tức',
            error: error.message
        })
    }
}