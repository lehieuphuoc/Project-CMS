"use client";

import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
}

export default function Categories() {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: 1,
            name: "Công nghệ",
            slug: "cong-nghe",
            description: "Các bài viết về lập trình và công nghệ.",
        },
        {
            id: 2,
            name: "Sách học tập",
            slug: "sach-hoc-tap",
            description: "Tổng hợp sách học kỹ năng, phát triển bản thân.",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [form] = Form.useForm();

   
    const openModal = (category?: Category) => {
        if (category) {
            setEditingCategory(category);
            form.setFieldsValue(category);
        } else {
            setEditingCategory(null);
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    
    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                if (editingCategory) {
                    setCategories((prev) =>
                        prev.map((item) =>
                            item.id === editingCategory.id ? { ...item, ...values } : item
                        )
                    );
                    message.success("Đã cập nhật thể loại");
                } else {
                    const newCategory = {
                        id: categories.length + 1,
                        ...values,
                    };
                    setCategories([...categories, newCategory]);
                    message.success("Đã thêm thể loại mới");
                }
                setIsModalOpen(false);
            })
            .catch(() => message.error("Vui lòng điền đầy đủ thông tin"));
    };


    const handleDelete = (id: number) => {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        message.success("Đã xóa thể loại");
    };

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60,
        },
        {
            title: "Tên thể loại",
            dataIndex: "name",
            key: "name",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Slug",
            dataIndex: "slug",
            key: "slug",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
            ellipsis: true,
        },
        {
            title: "Hành động",
            key: "actions",
            width: 150,
            render: (_: any, record: Category) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                        type="default"
                    />
                    <Popconfirm
                        title="Bạn có chắc muốn xóa thể loại này không?"
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
                <h2 className="text-xl font-bold text-gray-800">📚 Quản lý thể loại</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Thêm thể loại
                </Button>
            </div>

         
            <Table
                dataSource={categories}
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
                        className={`text-2xl font-bold ${editingCategory ? "text-blue-600" : "text-green-600"
                            }`}
                    >
                        {editingCategory ? "✏️ Sửa thể loại" : "📝 Thêm thể loại mới"}
                    </h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-indigo-400 to-blue-500 mx-auto mt-2 rounded-full"></div>
                </div>

                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Tên thể loại"
                        name="name"
                        rules={[{ required: true, message: "Nhập tên thể loại" }]}
                    >
                        <Input placeholder="Nhập tên thể loại" />
                    </Form.Item>

                    <Form.Item label="Slug" name="slug">
                        <Input placeholder="vd: cong-nghe" />
                    </Form.Item>

                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea rows={3} placeholder="Nhập mô tả ngắn" />
                    </Form.Item>

                    <div className="flex justify-center gap-4 mt-6">
                        <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 px-6"
                        >
                            {editingCategory ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
