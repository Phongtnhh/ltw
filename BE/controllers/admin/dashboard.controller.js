const Account = require("../../model/account.model");
const News = require("../../model/News.model");
require("dotenv").config();

// [GET] /admin/dashboard/stats - Lấy thống kê tổng quan cho dashboard
module.exports.getStats = async (req, res) => {
    try {
        // Thống kê người dùng
        const totalUsers = await Account.countDocuments({ deleted: false });
        const activeUsers = await Account.countDocuments({ deleted: false, status: 'active' });
        
        // Thống kê tin tức
        const totalNews = await News.countDocuments({ deleted: false });
        const publishedNews = await News.countDocuments({ deleted: false, status: 'published' });
        const draftNews = await News.countDocuments({ deleted: false, status: 'draft' });
        
        // Thống kê theo thời gian (30 ngày qua)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        const newUsersLast30Days = await Account.countDocuments({
            deleted: false,
            createdAt: { $gte: thirtyDaysAgo }
        });
        
        const newNewsLast30Days = await News.countDocuments({
            deleted: false,
            createdAt: { $gte: thirtyDaysAgo }
        });

        // Tính phần trăm thay đổi (giả lập - so với 30 ngày trước đó)
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
        
        const usersLast60Days = await Account.countDocuments({
            deleted: false,
            createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
        });
        
        const newsLast60Days = await News.countDocuments({
            deleted: false,
            createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
        });

        // Tính phần trăm thay đổi
        const userChangePercent = usersLast60Days > 0 
            ? Math.round(((newUsersLast30Days - usersLast60Days) / usersLast60Days) * 100)
            : newUsersLast30Days > 0 ? 100 : 0;
            
        const newsChangePercent = newsLast60Days > 0 
            ? Math.round(((newNewsLast30Days - newsLast60Days) / newsLast60Days) * 100)
            : newNewsLast30Days > 0 ? 100 : 0;

        // Thống kê theo category tin tức
        const newsByCategory = await News.aggregate([
            { $match: { deleted: false, status: 'published' } },
            { $group: { _id: '$category', count: { $sum: 1 } } }
        ]);

        res.status(200).json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    active: activeUsers,
                    inactive: totalUsers - activeUsers,
                    newLast30Days: newUsersLast30Days,
                    changePercent: userChangePercent
                },
                news: {
                    total: totalNews,
                    published: publishedNews,
                    draft: draftNews,
                    newLast30Days: newNewsLast30Days,
                    changePercent: newsChangePercent,
                    byCategory: newsByCategory
                },
                // Giả lập thống kê lượt truy cập (có thể tích hợp Google Analytics sau)
                visits: {
                    total: Math.floor(Math.random() * 5000) + 2000, // Giả lập
                    changePercent: Math.floor(Math.random() * 50) + 10 // Giả lập
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy thống kê dashboard",
            error: error.message
        });
    }
};

// [GET] /admin/dashboard/recent-activities - Lấy hoạt động gần đây
module.exports.getRecentActivities = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        
        // Lấy tin tức mới nhất
        const recentNews = await News.find({ deleted: false })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title author createdAt status');
            
        // Lấy người dùng mới nhất
        const recentUsers = await Account.find({ deleted: false })
            .sort({ createdAt: -1 })
            .limit(5)
            .select('fullName email createdAt role_id');

        // Tạo danh sách hoạt động gần đây
        const activities = [];
        
        // Thêm hoạt động từ tin tức
        recentNews.forEach(news => {
            activities.push({
                id: `news_${news._id}`,
                type: 'news',
                action: news.status === 'published' ? 'Xuất bản tin tức' : 'Tạo tin tức mới',
                title: news.title,
                user: news.author,
                time: news.createdAt,
                details: {
                    status: news.status
                }
            });
        });
        
        // Thêm hoạt động từ người dùng
        recentUsers.forEach(user => {
            activities.push({
                id: `user_${user._id}`,
                type: 'user',
                action: 'Đăng ký tài khoản mới',
                title: `${user.fullName} (${user.email})`,
                user: 'System',
                time: user.createdAt,
                details: {
                    role: user.role_id
                }
            });
        });
        
        // Sắp xếp theo thời gian và giới hạn số lượng
        activities.sort((a, b) => new Date(b.time) - new Date(a.time));
        const limitedActivities = activities.slice(0, limit);
        
        // Format thời gian
        const formattedActivities = limitedActivities.map(activity => ({
            ...activity,
            timeFormatted: formatTimeAgo(activity.time)
        }));

        res.status(200).json({
            success: true,
            data: formattedActivities
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy hoạt động gần đây",
            error: error.message
        });
    }
};

// Helper function để format thời gian
function formatTimeAgo(date) {
    const now = new Date();
    const diffInMs = now - new Date(date);
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInMinutes < 60) {
        return `${diffInMinutes} phút trước`;
    } else if (diffInHours < 24) {
        return `${diffInHours} giờ trước`;
    } else if (diffInDays < 30) {
        return `${diffInDays} ngày trước`;
    } else {
        return new Date(date).toLocaleDateString('vi-VN');
    }
}

// [GET] /admin/dashboard/overview - Lấy tổng quan dashboard (kết hợp stats và activities)
module.exports.getOverview = async (req, res) => {
    try {
        // Gọi cả hai function để lấy dữ liệu
        const statsPromise = new Promise((resolve, reject) => {
            const mockReq = { query: {} };
            const mockRes = {
                status: () => mockRes,
                json: (data) => {
                    if (data.success) {
                        resolve(data.data);
                    } else {
                        reject(new Error(data.message));
                    }
                }
            };
            module.exports.getStats(mockReq, mockRes);
        });
        
        const activitiesPromise = new Promise((resolve, reject) => {
            const mockReq = { query: { limit: 5 } };
            const mockRes = {
                status: () => mockRes,
                json: (data) => {
                    if (data.success) {
                        resolve(data.data);
                    } else {
                        reject(new Error(data.message));
                    }
                }
            };
            module.exports.getRecentActivities(mockReq, mockRes);
        });
        
        const [stats, activities] = await Promise.all([statsPromise, activitiesPromise]);
        
        res.status(200).json({
            success: true,
            data: {
                stats,
                recentActivities: activities
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy tổng quan dashboard",
            error: error.message
        });
    }
};
