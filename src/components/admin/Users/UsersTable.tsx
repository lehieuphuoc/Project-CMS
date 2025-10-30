"use client";

import React, { useState } from "react";
import {
    Table,
    Button,
    Modal,
    Form,
    Input,
    Select,
    Space,
    Popconfirm,
    notification,
    Avatar,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    UserOutlined,
} from "@ant-design/icons";

const { Option } = Select;

interface User {
    id: number;
    role_id: string;
    full_name: string;
    email: string;
    password: string;
    avatar_url?: string;
    bio?: string;
    created_at: string;
    updated_at: string;
}

export default function UsersTable() {
    const [users, setUsers] = useState<User[]>([
        {
            id: 1,
            role_id: "admin",
            full_name: "Nguyễn Văn A",
            email: "nguyenvana@example.com",
            password: "••••••••",
            avatar_url: "",
            bio: "Quản trị viên hệ thống chính.",
            created_at: "2025-10-25 09:12",
            updated_at: "2025-10-28 15:47",
        },
        {
            id: 2,
            role_id: "user",
            full_name: "Trần Thị B",
            email: "tranthib@example.com",
            password: "••••••••",
            avatar_url: "",
            bio: "Thành viên mới tham gia diễn đàn.",
            created_at: "2025-10-20 14:32",
            updated_at: "2025-10-27 08:20",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [form] = Form.useForm();

    
    const openModal = (user?: User) => {
        if (user) {
            setEditingUser(user);
            form.setFieldsValue(user);
        } else {
            setEditingUser(null);
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    
    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                if (editingUser) {
                    setUsers((prev) =>
                        prev.map((u) =>
                            u.id === editingUser.id
                                ? { ...u, ...values, updated_at: new Date().toLocaleString() }
                                : u
                        )
                    );
                    notification.success({
                        message: "Cập nhật thành công 🎉",
                        description: `Thông tin của "${values.full_name}" đã được cập nhật.`,
                    });
                } else {
                    const newUser = {
                        id: users.length + 1,
                        ...values,
                        created_at: new Date().toLocaleString(),
                        updated_at: new Date().toLocaleString(),
                    };
                    setUsers([...users, newUser]);
                    notification.success({
                        message: "Thêm người dùng mới 👤",
                        description: `Người dùng "${values.full_name}" đã được thêm thành công.`,
                    });
                }
                setIsModalOpen(false);
            })
            .catch(() =>
                notification.error({
                    message: "Lỗi nhập liệu",
                    description: "Vui lòng điền đầy đủ thông tin người dùng.",
                })
            );
    };

   
    function handleDelete(id: number) {
        const deletedUser = users.find((u) => u.id === id);
        setUsers((prev) => prev.filter((u) => u.id !== id));
        notification.info({
            message: "Đã xóa người dùng 🗑️",
            description: `Người dùng "${deletedUser?.full_name}" đã bị xóa.`,
        });
    }

    
    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60,
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "avatar_url",
            key: "avatar_url",
            render: (url: string) => (
                <Avatar
                    src={url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMVX0iKz6eFyUNjWyfoVnJ56vlBksZgHRMrA&s"}
                    size={40}
                />
            ),
        },
        {
            title: "Họ và tên",
            dataIndex: "full_name",
            key: "full_name",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Vai trò",
            dataIndex: "role_id",
            key: "role_id",
            render: (role: string) => (
                <span
                    className={`px-2 py-1 rounded-md text-sm font-medium ${role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                >
                    {role === "admin" ? "Quản trị viên" : "Người dùng"}
                </span>
            ),
        },
        {
            title: "Tiểu sử",
            dataIndex: "bio",
            key: "bio",
            render: (bio: string) => <span className="text-gray-600">{bio || "—"}</span>,
        },
        {
            title: "Tạo lúc",
            dataIndex: "created_at",
            key: "created_at",
        },
        {
            title: "Cập nhật lúc",
            dataIndex: "updated_at",
            key: "updated_at",
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: User) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                    />
                    <Popconfirm
                        title="Bạn có muốn xóa người dùng này không?"
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-4">
          
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <UserOutlined /> Quản lý người dùng
                </h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Thêm người dùng
                </Button>
            </div>

           
            <Table
                dataSource={users}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                bordered
            />

           
            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                centered
                width={600}
            >
                <div className="text-center mb-6">
                    <h2
                        className={`text-2xl font-bold ${editingUser ? "text-blue-600" : "text-green-600"
                            }`}
                    >
                        {editingUser
                            ? "✏️ Sửa thông tin người dùng"
                            : "🧑‍💻 Thêm người dùng mới"}
                    </h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-indigo-400 to-blue-500 mx-auto mt-2 rounded-full"></div>
                </div>

                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Họ và tên"
                        name="full_name"
                        rules={[{ required: true, message: "Nhập họ và tên" }]}
                    >
                        <Input placeholder="Nhập họ và tên" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Nhập email" },
                            { type: "email", message: "Email không hợp lệ" },
                        ]}
                    >
                        <Input placeholder="Nhập email" />
                    </Form.Item>

                    <Form.Item
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: "Nhập mật khẩu" }]}
                    >
                        <Input.Password placeholder="Nhập mật khẩu" />
                    </Form.Item>

                    <Form.Item
                        label="Vai trò"
                        name="role_id"
                        initialValue="user"
                    >
                        <Select>
                            <Option value="user">Người dùng</Option>
                            <Option value="admin">Quản trị viên</Option>
                            <Option value="editor">Biên tập viên</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Ảnh đại diện (URL)" name="avatar_url">
                        <Input placeholder="Dán link ảnh đại diện (nếu có)" />
                    </Form.Item>

                    <Form.Item label="Tiểu sử" name="bio">
                        <Input.TextArea
                            placeholder="Viết tiểu sử ngắn gọn của người dùng"
                            rows={3}
                        />
                    </Form.Item>

                    <div className="flex justify-center gap-4 mt-6">
                        <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 px-6"
                        >
                            {editingUser ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
