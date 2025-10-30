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
    notification,
} from "antd";
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    MessageOutlined,
} from "@ant-design/icons";

interface Comment {
    id: number;
    author: string;
    content: string;
    postTitle: string;
    status: string;
}

const { TextArea } = Input;
const { Option } = Select;

export default function CommentsTable() {
    const [comments, setComments] = useState<Comment[]>([
        {
            id: 1,
            author: "Nguyễn Văn A",
            content: "Bài viết rất hay và hữu ích!",
            postTitle: "Học ReactJS cơ bản",
            status: "approved",
        },
        {
            id: 2,
            author: "Trần Thị B",
            content:
                "Mình thấy phần này hơi khó hiểu, bạn có thể giải thích thêm không?",
            postTitle: "Giới thiệu Next.js 14",
            status: "pending",
        },
        {
            id: 3,
            author: "Trần Thị C",
            content:
                "Mình thấy phần này hơi khó hiểu, bạn có thể giải thích thêm không?",
            postTitle: "Giới thiệu Next.js 15",
            status: "hidden",
        },
    ]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const [form] = Form.useForm();

    
    const openModal = (comment?: Comment) => {
        if (comment) {
            setEditingComment(comment);
            form.setFieldsValue(comment);
        } else {
            setEditingComment(null);
            form.resetFields();
        }
        setIsModalOpen(true);
    };

   
    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
                if (editingComment) {
                    setComments((prev) =>
                        prev.map((item) =>
                            item.id === editingComment.id ? { ...item, ...values } : item
                        )
                    );
                    notification.success({
                        message: "Cập nhật thành công 🎉",
                        description: `Bình luận của "${values.author}" đã được cập nhật.`,
                    });
                } else {
                    const newComment = {
                        id: comments.length + 1,
                        ...values,
                    };
                    setComments([...comments, newComment]);
                    notification.success({
                        message: "Thêm bình luận mới 📝",
                        description: `Bình luận của "${values.author}" đã được thêm thành công.`,
                    });
                }
                setIsModalOpen(false);
            })
            .catch(() =>
                notification.error({
                    message: "Lỗi nhập liệu",
                    description: "Vui lòng điền đầy đủ thông tin.",
                })
            );
    };

   
    const handleDelete = (id: number) => {
        const deletedComment = comments.find((c) => c.id === id);
        setComments((prev) => prev.filter((c) => c.id !== id));
        notification.info({
            message: "Đã xóa bình luận 🗑️",
            description: `Bình luận của "${deletedComment?.author}" đã bị xóa.`,
        });
    };


    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: 60,
        },
        {
            title: "Người bình luận",
            dataIndex: "author",
            key: "author",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
            ellipsis: true,
        },
        {
            title: "Bài viết",
            dataIndex: "postTitle",
            key: "postTitle",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <span
                    className={`px-2 py-1 rounded-md text-sm font-medium ${status === "approved"
                            ? "bg-green-100 text-green-700"
                            : status === "pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                        }`}
                >
                    {status === "approved"
                        ? "Đã duyệt"
                        : status === "pending"
                            ? "Chờ duyệt"
                            : "Đã ẩn"}
                </span>
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            width: 150,
            render: (_: any, record: Comment) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => openModal(record)}
                        type="default"
                    />
                    <Popconfirm
                        title="Bạn có muốn xóa bình luận này không?"
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
                    <MessageOutlined /> Quản lý bình luận
                </h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700"
                >
                    Thêm bình luận
                </Button>
            </div>

         
            <Table
                dataSource={comments}
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
                        className={`text-2xl font-bold ${editingComment ? "text-blue-600" : "text-green-600"
                            }`}
                    >
                        {editingComment ? "✏️ Sửa bình luận" : "📝 Thêm bình luận mới"}
                    </h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-indigo-400 to-blue-500 mx-auto mt-2 rounded-full"></div>
                </div>

                <Form form={form} layout="vertical">
                    <Form.Item
                        label="Người bình luận"
                        name="author"
                        rules={[{ required: true, message: "Nhập tên người bình luận" }]}
                    >
                        <Input placeholder="Nhập tên người bình luận" />
                    </Form.Item>

                    <Form.Item
                        label="Nội dung"
                        name="content"
                        rules={[{ required: true, message: "Nhập nội dung bình luận" }]}
                    >
                        <TextArea rows={3} placeholder="Nhập nội dung bình luận" />
                    </Form.Item>

                    <Form.Item
                        label="Bài viết liên quan"
                        name="postTitle"
                        rules={[{ required: true, message: "Nhập tên bài viết" }]}
                    >
                        <Input placeholder="Tên bài viết" />
                    </Form.Item>

                    <Form.Item label="Trạng thái" name="status" initialValue="pending">
                        <Select>
                            <Option value="pending">Chờ duyệt</Option>
                            <Option value="approved">Đã duyệt</Option>
                            <Option value="hidden">Ẩn</Option>
                        </Select>
                    </Form.Item>

                    <div className="flex justify-center gap-4 mt-6">
                        <Button onClick={() => setIsModalOpen(false)}>Hủy</Button>
                        <Button
                            type="primary"
                            onClick={handleSave}
                            className="bg-blue-600 hover:bg-blue-700 px-6"
                        >
                            {editingComment ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
