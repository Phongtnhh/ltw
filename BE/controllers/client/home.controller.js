const News = require("../../model/News.model")

module.exports.index = async (req, res) => {
    try {
        const news = await News.find({
            status: 'published',
            deleted: { $ne: true }
        }).sort({ createdAt: -1 }).limit(3);

        res.json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error fetching latest news:', error);
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy tin tức mới nhất'
        });
    }
}