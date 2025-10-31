"use client";

import React, { useEffect, useState } from "react";
import { Layout, theme, Card, Row, Col, Typography } from "antd";
import {
    ReadOutlined, // 📘 Bài viết
    AppstoreOutlined, // 🗂️ Danh mục
    CommentOutlined, // 💬 Bình luận
    TeamOutlined, // 👥 Người dùng
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

// Hiệu ứng đếm số động
function useCountUp(target: number, duration = 1200) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * target);
            setCount(value);

            if (progress < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    }, [target, duration]);

    return count.toLocaleString("vi-VN");
}

export default function ContentArea() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const stats = [
        {
            title: "BÀI VIẾT",
            value: 1245,
            icon: (
                <div className="p-4 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <ReadOutlined className="text-2xl" />
                </div>
            ),
            gradient: "from-blue-50 to-indigo-100",
        },
        {
            title: "DANH MỤC",
            value: 58,
            icon: (
                <div className="p-4 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <AppstoreOutlined className="text-2xl" />
                </div>
            ),
            gradient: "from-green-50 to-emerald-100",
        },
        {
            title: "BÌNH LUẬN",
            value: 128,
            icon: (
                <div className="p-4 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <CommentOutlined className="text-2xl" />
                </div>
            ),
            gradient: "from-purple-50 to-pink-100",
        },
        {
            title: "NGƯỜI DÙNG",
            value: 8540,
            icon: (
                <div className="p-4 rounded-xl bg-gradient-to-tr from-orange-400 to-yellow-400 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <TeamOutlined className="text-2xl" />
                </div>
            ),
            gradient: "from-yellow-50 to-orange-100",
        },
    ];

    return (
        <Content
            style={{
                margin: "16px",
                padding: 16,
                minHeight: "calc(100vh - 112px)",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            {/* Tiêu đề */}
            <div className="mb-6 border-b border-gray-200 pb-3 text-center md:text-left animate-fade-in">
                <Title level={3} className="!mb-1 text-lg md:text-2xl font-bold">
                    Bảng điều khiển
                </Title>
                <Text type="secondary" className="text-sm md:text-base">
                    Tổng quan về hiệu suất và hoạt động của hệ thống quản trị.
                </Text>
            </div>

            {/* Thống kê */}
            <Row gutter={[16, 16]}>
                {stats.map((item, index) => {
                    const count = useCountUp(item.value, 1000 + index * 200);
                    return (
                        <Col xs={24} sm={12} lg={6} key={index}>
                            <Card
                                className={`group shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl border-none bg-gradient-to-br ${item.gradient} animate-fade-in`}
                                style={{
                                    background:
                                        "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,247,250,0.95))",
                                }}
                                bodyStyle={{ padding: "20px 24px" }}
                            >
                                <div className="flex items-center space-x-5">
                                    {item.icon}
                                    <div>
                                        <Text
                                            type="secondary"
                                            className="text-xs md:text-sm tracking-wide"
                                        >
                                            {item.title}
                                        </Text>
                                        <Title
                                            level={4}
                                            className="m-0 mt-1 font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 text-base md:text-xl"
                                        >
                                            {count}
                                        </Title>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Content>
    );
}
