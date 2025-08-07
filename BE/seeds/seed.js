const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Account = require("../model/account.model");
const Role = require("../model/role.route");
const Permission = require("../model/permission.model");
require("dotenv").config();

const connectDB = require("../database/db");

const seedData = async () => {
    try {
        // Kết nối database
        await connectDB();
        console.log("Connected to database");

        // Xóa dữ liệu cũ (nếu cần)
        // await Permission.deleteMany({});
        // await Role.deleteMany({});
        // await Account.deleteMany({});

        // Tạo permissions
        const permissions = [
            {
                name: "Quản lý tin tức",
                description: "Tạo, sửa, xóa tin tức",
                resource: "news",
                actions: ["create", "read", "update", "delete"]
            },
            {
                name: "Xem tin tức",
                description: "Chỉ xem tin tức",
                resource: "news",
                actions: ["read"]
            },
            {
                name: "Quản lý người dùng",
                description: "Quản lý tài khoản người dùng",
                resource: "users",
                actions: ["create", "read", "update", "delete"]
            },
            {
                name: "Xem người dùng",
                description: "Chỉ xem danh sách người dùng",
                resource: "users",
                actions: ["read"]
            },
            {
                name: "Quản lý banner",
                description: "Thay đổi banner trang web",
                resource: "banners",
                actions: ["create", "read", "update", "delete"]
            },
            {
                name: "Xem thống kê",
                description: "Xem báo cáo và thống kê hệ thống",
                resource: "dashboard",
                actions: ["read"]
            },
            {
                name: "Quản lý quyền hạn",
                description: "Quản lý roles và permissions",
                resource: "permissions",
                actions: ["create", "read", "update", "delete"]
            }
        ];

        console.log("Creating permissions...");
        const createdPermissions = [];
        for (const permData of permissions) {
            const existingPerm = await Permission.findOne({ name: permData.name });
            if (!existingPerm) {
                const permission = new Permission(permData);
                await permission.save();
                createdPermissions.push(permission);
                console.log(`Created permission: ${permission.name}`);
            } else {
                createdPermissions.push(existingPerm);
                console.log(`Permission already exists: ${existingPerm.name}`);
            }
        }

        // Tạo roles
        const adminPermissions = createdPermissions.map(p => p._id);
        const editorPermissions = createdPermissions
            .filter(p => ['news', 'dashboard'].includes(p.resource))
            .map(p => p._id);
        const userPermissions = createdPermissions
            .filter(p => p.actions.includes('read') && p.resource !== 'permissions')
            .map(p => p._id);

        const roles = [
            {
                title: "admin",
                description: "Quản trị viên hệ thống - có tất cả quyền",
                permissions: adminPermissions,
                isDefault: true
            },
            {
                title: "editor",
                description: "Biên tập viên - quản lý nội dung",
                permissions: editorPermissions,
                isDefault: true
            },
            {
                title: "user",
                description: "Người dùng thông thường",
                permissions: userPermissions,
                isDefault: true
            }
        ];

        console.log("Creating roles...");
        const createdRoles = {};
        for (const roleData of roles) {
            const existingRole = await Role.findOne({ title: roleData.title });
            if (!existingRole) {
                const role = new Role(roleData);
                await role.save();
                createdRoles[roleData.title] = role;
                console.log(`Created role: ${role.title}`);
            } else {
                createdRoles[roleData.title] = existingRole;
                console.log(`Role already exists: ${existingRole.title}`);
            }
        }

        // Tạo tài khoản admin mặc định
        const adminEmail = "admin@ltw.com";
        const existingAdmin = await Account.findOne({ email: adminEmail });
        
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash("admin123", 10);
            
            const adminAccount = new Account({
                fullName: "Administrator",
                email: adminEmail,
                password: hashedPassword,
                phone: "0123456789",
                role: createdRoles.admin._id,
                status: "active"
            });

            await adminAccount.save();
            console.log("Created admin account:");
            console.log(`Email: ${adminEmail}`);
            console.log(`Password: admin123`);
        } else {
            console.log("Admin account already exists");
        }

        // Tạo tài khoản editor demo
        const editorEmail = "editor@ltw.com";
        const existingEditor = await Account.findOne({ email: editorEmail });
        
        if (!existingEditor) {
            const hashedPassword = await bcrypt.hash("editor123", 10);
            
            const editorAccount = new Account({
                fullName: "Editor Demo",
                email: editorEmail,
                password: hashedPassword,
                phone: "0123456788",
                role: createdRoles.editor._id,
                status: "active"
            });

            await editorAccount.save();
            console.log("Created editor account:");
            console.log(`Email: ${editorEmail}`);
            console.log(`Password: editor123`);
        } else {
            console.log("Editor account already exists");
        }

        console.log("Seed data created successfully!");
        process.exit(0);

    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
