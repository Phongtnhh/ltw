const News = require("../../model/News.model")
const multer = require('multer')
const path = require('path')

// Cấu hình multer để lưu ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Thư mục lưu ảnh
    },
    filename: function (req, file, cb) {
        // Tạo tên file unique với timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

// Filter để chỉ cho phép upload ảnh
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true)
    } else {
        cb(new Error('Chỉ cho phép upload file ảnh!'), false)
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
    }
})

// Middleware upload cho admin
module.exports.uploadImage = upload.single('thumbnail')

// [GET] Lấy tất cả tin tức cho admin (bao gồm draft)
module.exports.index = async (req, res) => {
    try {
        console.log('Admin news index called with query:', req.query);
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const status = req.query.status || 'all';
        const search = req.query.search || '';

        // Tạo query filter
        let filter = { deleted: { $ne: true } };
        
        console.log('Initial filter:', filter);
        
        if (status !== 'all') {
            filter.status = status;
        }
        
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { author: { $regex: search, $options: 'i' } }
            ];
        }

        console.log('Final filter:', filter);

        const [news, totalItems] = await Promise.all([
            News.find(filter)
                .sort({ createdAt: -1 })
                .limit(limit)
                .skip(skip),
            News.countDocuments(filter)
        ]);

        console.log(`Found ${news.length} news items, total: ${totalItems}`);

        const totalPages = Math.ceil(totalItems / limit);

        const response = {
            success: true,
            message: "Lấy danh sách tin tức thành công",
            data: {
                news,
                pagination: {
                    currentPage: page,
                    totalPages,
                    totalItems,
                    limit
                }
            }
        };
        
        console.log('Sending response with', news.length, 'items');
        res.json(response);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({
            success: false,
            message: "Lỗi server khi lấy danh sách tin tức",
            error: error.message
        });
    }
};

// [POST] Tạo tin tức mới
module.exports.create = async (req, res) => {
    try {
        console.log('Create news called with body:', req.body);
        console.log('File uploaded:', req.file);
        
        const { title, contentHtml, author, status, category, excerpt, featured } = req.body;

        // Validation
        if (!title || !contentHtml || !author) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin bắt buộc: title, contentHtml, author'
            });
        }

        // Xử lý URL ảnh
        let thumbnailUrl = null;
        if (req.file) {
            thumbnailUrl = `/uploads/${req.file.filename}`;
            console.log('Thumbnail URL:', thumbnailUrl);
        }

        const newsData = {
            title,
            contentHtml,
            author,
            thumbnail: thumbnailUrl,
            status: status || 'draft',
            category: category || 'all',
            excerpt,
            featured: featured === 'true' || featured === true
        };
        
        console.log('Creating news with data:', newsData);

        const newNews = new News(newsData);
        await newNews.save();
        
        console.log('News created successfully:', newNews._id);
        
        res.json({
            success: true,
            data: newNews,
            message: 'Tạo tin tức thành công!'
        });
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi tạo tin tức',
            error: error.message
        });
    }
};

// [GET] Lấy chi tiết tin tức
module.exports.detail = async (req, res) => {
    try {
        console.log('Get news detail for ID:', req.params.id);
        
        const news = await News.findById(req.params.id);
        if (!news || news.deleted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin tức'
            });
        }
        
        res.json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error fetching news detail:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi lấy chi tiết tin tức',
            error: error.message
        });
    }
};

// [GET] Lấy chi tiết tin tức để edit
module.exports.edit = async (req, res) => {
    try {
        console.log('Get news for edit, ID:', req.params.id);

        const news = await News.findById(req.params.id);
        if (!news || news.deleted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin tức'
            });
        }

        res.json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Error fetching news for edit:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi lấy thông tin tin tức',
            error: error.message
        });
    }
};

// [PUT] Cập nhật tin tức
module.exports.update = async (req, res) => {
    try {
        console.log('Update news ID:', req.params.id);
        console.log('Update data:', req.body);
        console.log('New file:', req.file);

        const { title, contentHtml, author, status, category, excerpt, featured } = req.body;
        const newsId = req.params.id;

        // Validation
        if (!title || !contentHtml || !author) {
            return res.status(400).json({
                success: false,
                message: 'Thiếu thông tin bắt buộc: title, contentHtml, author'
            });
        }

        const updateData = {
            title,
            contentHtml,
            author,
            status: status || 'draft',
            category: category || 'all',
            excerpt,
            featured: featured === 'true' || featured === true
        };

        // Xử lý ảnh mới nếu có
        if (req.file) {
            updateData.thumbnail = `/uploads/${req.file.filename}`;
        }

        const updatedNews = await News.findByIdAndUpdate(
            newsId,
            updateData,
            { new: true }
        );

        if (!updatedNews || updatedNews.deleted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin tức'
            });
        }

        console.log('News updated successfully:', updatedNews._id);

        res.json({
            success: true,
            data: updatedNews,
            message: 'Cập nhật tin tức thành công!'
        });
    } catch (error) {
        console.error('Error updating news:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi cập nhật tin tức',
            error: error.message
        });
    }
};

// [DELETE] Xóa tin tức (soft delete)
module.exports.delete = async (req, res) => {
    try {
        console.log('Delete news ID:', req.params.id);
        
        const newsId = req.params.id;

        const deletedNews = await News.findByIdAndUpdate(
            newsId,
            { 
                deleted: true,
                deletedAt: new Date()
            },
            { new: true }
        );

        if (!deletedNews) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin tức'
            });
        }

        console.log('News deleted successfully:', deletedNews._id);

        res.json({
            success: true,
            message: 'Xóa tin tức thành công!'
        });
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi xóa tin tức',
            error: error.message
        });
    }
};

// [PATCH] Thay đổi trạng thái tin tức
module.exports.changeStatus = async (req, res) => {
    try {
        console.log('Change status for news ID:', req.params.id);
        console.log('New status:', req.body.status);
        
        const { status } = req.body;
        const newsId = req.params.id;

        if (!['draft', 'published'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Trạng thái không hợp lệ'
            });
        }

        const updatedNews = await News.findByIdAndUpdate(
            newsId,
            { status },
            { new: true }
        );

        if (!updatedNews || updatedNews.deleted) {
            return res.status(404).json({
                success: false,
                message: 'Không tìm thấy tin tức'
            });
        }

        console.log('News status changed successfully:', updatedNews._id);

        res.json({
            success: true,
            data: updatedNews,
            message: `Đã ${status === 'published' ? 'xuất bản' : 'chuyển về nháp'} tin tức!`
        });
    } catch (error) {
        console.error('Error changing news status:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi thay đổi trạng thái tin tức',
            error: error.message
        });
    }
};
