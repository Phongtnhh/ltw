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


// Middleware upload cho postNews
module.exports.uploadImage = upload.single('thumbnail')

module.exports.postNews = async (req, res) => {
    try {
        const { title, contentHtml, author, status } = req.body;

        // Xử lý URL ảnh
        let thumbnailUrl = null;
        if (req.file) {
            // Tạo URL cho ảnh đã upload
            thumbnailUrl = `/uploads/${req.file.filename}`;
        }

        const newNews = new News({
            title,
            contentHtml,
            author,
            thumbnail: thumbnailUrl, // Lưu URL ảnh vào database
            status
        });

        await newNews.save();
        res.json({
            success: true,
            data: newNews,
            message: 'Tạo tin tức thành công!'
        })
    } catch (error) {
        console.error('Error creating news:', error);
        res.status(500).json({
            success: false,
            message: 'Có lỗi xảy ra khi tạo tin tức',
            error: error.message
        })
    }
}