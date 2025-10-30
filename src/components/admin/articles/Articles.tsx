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
    message,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

interface Article {
    id: number;
    title: string;
    slug: string;
    sapo: string;
    content: string;
    thumbnail_url: string;
    author_id: number;
    category_id: number;
    status: string;
    views_count: number;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([
        {
            id: 1,
            title: "Bí quyết học tốt ReactJS",
            slug: "bi-quyet-hoc-tot-reactjs",
            sapo: "Một số mẹo giúp bạn làm chủ React nhanh hơn.",
            content: "Nội dung chi tiết bài viết về cách học React hiệu quả.",
            thumbnail_url:
                "https://placehold.co/100x60/png?text=React",
            author_id: 1,
            category_id: 1,
            status: "published",
            views_count: 320,
            published_at: "2025-10-29",
            created_at: "2025-10-29",
            updated_at: "2025-10-29",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [form] = Form.useForm();

    const openAddModal = () => {
        setEditingArticle(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    const openEditModal = (record: Article) => {
        setEditingArticle(record);
        form.setFieldsValue(record);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        setArticles(articles.filter((item) => item.id !== id));
        message.success("Đã xóa bài viết");
    };

    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                if (editingArticle) {
                    // Cập nhật
                    setArticles(
                        articles.map((item) =>
                            item.id === editingArticle.id ? { ...editingArticle, ...values } : item
                        )
                    );
                    message.success("Đã cập nhật bài viết");
                } else {
                    // Thêm mới
                    const newArticle = {
                        id: articles.length + 1,
                        ...values,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    };
                    setArticles([...articles, newArticle]);
                    message.success("Đã thêm bài viết mới");
                }
                setIsModalOpen(false);
            })
            .catch(() => { });
    };

    const columns = [
        {
            title: "Ảnh",
            dataIndex: "thumbnail_url",
            key: "thumbnail_url",
            render: (url: string) => (
                <img src={url} alt="thumb" className="w-16 h-10 rounded object-cover" />
            ),
        },
        { title: "Tiêu đề", dataIndex: "title", key: "title" },
        { title: "Slug", dataIndex: "slug", key: "slug" },
        { title: "Trạng thái", dataIndex: "status", key: "status" },
        { title: "Lượt xem", dataIndex: "views_count", key: "views_count" },
        {
            title: "Hành động",
            key: "actions",
            render: (_: any, record: Article) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(record)}
                    />
                    <Popconfirm
                        title="Xóa bài viết này?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-semibold">Danh sách bài viết</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={openAddModal}
                >
                    Thêm bài viết
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={articles}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            <Modal
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={700}
                centered
            >
                <div className="text-center mb-6">
                    <h2
                        className={`text-2xl font-bold ${editingArticle ? "text-blue-600" : "text-green-600"
                            }`}
                    >
                        {editingArticle ? "✏️ Sửa bài viết" : "📝 Thêm bài viết mới"}
                    </h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-indigo-400 to-blue-500 mx-auto mt-2 rounded-full"></div>
                </div>

                <Form layout="vertical" form={form} initialValues={{ status: "draft" }}>
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: "Vui lòng nhập tiêu đề bài viết" }]}
                    >
                        <Input placeholder="Nhập tiêu đề bài viết" />
                    </Form.Item>

                    <Form.Item label="Slug" name="slug">
                        <Input placeholder="vd: bai-viet-ve-reactjs" />
                    </Form.Item>

                    <Form.Item label="Sapo" name="sapo">
                        <Input placeholder="Mô tả ngắn đầu bài viết" />
                    </Form.Item>

                    <Form.Item label="Nội dung" name="content">
                        <Input.TextArea rows={4} placeholder="Nhập nội dung chi tiết bài viết" />
                    </Form.Item>

                    <Form.Item label="Ảnh đại diện" name="thumbnail_url">
                        <Input placeholder="Nhập URL ảnh đại diện" />
                    </Form.Item>

                    <Form.Item label="Trạng thái" name="status">
                        <Select>
                            <Select.Option value="draft">Nháp</Select.Option>
                            <Select.Option value="published">Đã xuất bản</Select.Option>
                        </Select>
                    </Form.Item>

                    <div className="flex justify-center gap-4 mt-6">
                        <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 px-6"
                        >
                            {editingArticle ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                </Form>
            </Modal>


        </div>
    );
}
