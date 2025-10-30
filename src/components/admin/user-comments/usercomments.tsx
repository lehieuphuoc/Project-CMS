"use client";

import { useState } from "react";
import {
    Table,
    Button,
    Card,
    Space,
    Popconfirm,
    Typography,
    message,
} from "antd";
import {
    UserOutlined,
    MessageOutlined,
    DeleteOutlined,
    ArrowLeftOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

interface Comment {
    id: number;
    post: string;
    content: string;
    date: string;
}

interface UserComments {
    id: number;
    name: string;
    comments: Comment[];
}

export default function usercomments() {
    const [selectedUser, setSelectedUser] = useState<UserComments | null>(null);
    const [users, setUsers] = useState<UserComments[]>([
        {
            id: 1,
            name: "Nguyễn Văn A",
            comments: [
                {
                    id: 1,
                    post: "Hướng dẫn học React cơ bản",
                    content: "Bài viết rất hay và dễ hiểu!",
                    date: "2024-06-05",
                },
                {
                    id: 2,
                    post: "Giới thiệu Tailwind CSS",
                    content: "Cảm ơn bạn, mình đã hiểu thêm nhiều.",
                    date: "2024-07-10",
                },
            ],
        },
        {
            id: 2,
            name: "Trần Thị B",
            comments: [
                {
                    id: 3,
                    post: "10 mẹo học JavaScript nhanh hơn",
                    content: "Bài viết rất hữu ích!",
                    date: "2024-09-01",
                },
            ],
        },
        {
            id: 3,
            name: "Lê Hữu Phước",
            comments: [],
        },
    ]);

    const handleDelete = (userId: number, commentId: number) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? { ...u, comments: u.comments.filter((c) => c.id !== commentId) }
                    : u
            )
        );
        message.success("Đã xóa bình luận!");
    };

    // ======== Cột danh sách người dùng ========
    const userColumns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
            width: 60,
        },
        {
            title: "Người dùng",
            dataIndex: "name",
            key: "name",
            render: (text: string) => (
                <Space>
                    <UserOutlined style={{ color: "#1677ff" }} />
                    <span>{text}</span>
                </Space>
            ),
        },
        {
            title: "Số bình luận",
            dataIndex: "comments",
            key: "comments",
            align: "center" as const,
            render: (comments: Comment[]) => (
                <span style={{ color: "#1677ff", fontWeight: 500 }}>
                    {comments.length}
                </span>
            ),
        },
    ];

    // ======== Cột bình luận chi tiết ========
    const commentColumns = [
        {
            title: "#",
            dataIndex: "index",
            key: "index",
            render: (_: any, __: any, index: number) => index + 1,
            width: 60,
        },
        {
            title: "Bài viết",
            dataIndex: "post",
            key: "post",
            render: (text: string) => <strong>{text}</strong>,
        },
        {
            title: "Nội dung",
            dataIndex: "content",
            key: "content",
        },
        {
            title: "Ngày",
            dataIndex: "date",
            key: "date",
        },
        {
            title: "Hành động",
            key: "action",
            align: "center" as const,
            render: (_: any, record: Comment) => (
                <Popconfirm
                    title="Xóa bình luận này?"
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() => handleDelete(selectedUser!.id, record.id)}
                >
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                    />
                </Popconfirm>
            ),
        },
    ];

    return (
        <div className="p-6">
            {!selectedUser ? (
                <Card
                    title={
                        <Title
                            level={4}
                            style={{ marginBottom: 0 }}
                            className="flex items-center gap-2"
                        >
                            <MessageOutlined /> Quản lý bình luận theo người dùng
                        </Title>
                    }
                >
                    <Table
                        dataSource={users}
                        columns={userColumns}
                        rowKey="id"
                        pagination={false}
                        onRow={(record) => ({
                            onClick: () => setSelectedUser(record),
                        })}
                        className="cursor-pointer"
                    />
                </Card>
            ) : (
                <Card
                    title={
                        <Space>
                            <Button
                                icon={<ArrowLeftOutlined />}
                                onClick={() => setSelectedUser(null)}
                            >
                                Quay lại
                            </Button>
                            <Title
                                level={4}
                                style={{ marginBottom: 0 }}
                                className="flex items-center gap-2"
                            >
                                <UserOutlined /> Bình luận của: {selectedUser.name}
                            </Title>
                        </Space>
                    }
                >
                    {selectedUser.comments.length > 0 ? (
                        <Table
                            dataSource={selectedUser.comments}
                            columns={commentColumns}
                            rowKey="id"
                            pagination={false}
                        />
                    ) : (
                        <p className="text-center text-gray-500 py-6">
                            Người dùng này chưa có bình luận nào.
                        </p>
                    )}
                </Card>
            )}
        </div>
    );
}
