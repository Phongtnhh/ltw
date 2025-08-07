const News = require("../../model/News.model")

// [GET] Contact page
module.exports.index = async (req, res) => {
    try {
        // Get latest news for contact page
        const news = await News.find({
            deleted: false,
            status: "published"
        }).sort({ createdAt: -1 }).limit(6);

        res.json({
            success: true,
            message: "Contact page data",
            data: {
                news: news,
                contact: {
                    phone: "+84 123 456 789",
                    email: "contact@example.com",
                    address: "123 Main Street, City, Country"
                }
            }
        });
    } catch (error) {
        console.error("Error fetching contact data:", error);
        res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra khi tải thông tin liên hệ",
            error: error.message
        });
    }
}

// [POST] Send contact message
module.exports.sendMessage = async (req, res) => {
    try {
        const { name, email, phone, subject, message } = req.body;

        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng điền đầy đủ thông tin bắt buộc"
            });
        }

        // Here you would typically save to database or send email
        console.log("Contact message received:", {
            name, email, phone, subject, message
        });

        res.json({
            success: true,
            message: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể."
        });

    } catch (error) {
        console.error("Error sending contact message:", error);
        res.status(500).json({
            success: false,
            message: "Có lỗi xảy ra khi gửi tin nhắn",
            error: error.message
        });
    }
}