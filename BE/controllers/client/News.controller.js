const News = require("../../model/News.model")

module.exports.index = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [news, totalItems] = await Promise.all([
      News.find({
        status: 'published',
        deleted: { $ne: true }
      }).sort({ createdAt: -1 }).limit(limit).skip(skip),
      
      News.countDocuments({
        status: 'published',
        deleted: { $ne: true }
      })
    ]); 

    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      massage: "Lấy tin tức thành công",
      News: news,
      currentPage: page,
      totalPages: totalPages
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