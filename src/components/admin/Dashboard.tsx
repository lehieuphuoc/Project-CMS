"use client";

import React from "react";
import { Layout, theme, Card, Row, Col, Typography } from "antd";
import {
    BarChartOutlined,
    UserOutlined,
    SettingOutlined,
} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

export default function ContentArea() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const stats = [
        {
            title: "Tổng người dùng",
            value: "1,245",
            icon: (
                <div className="p-3 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-400 text-white shadow-md">
                    <UserOutlined className="text-2xl" />
                </div>
            ),
        },
        {
            title: "Doanh thu tháng",
            value: "35,200,000₫",
            icon: (
                <div className="p-3 rounded-xl bg-gradient-to-tr from-green-500 to-emerald-400 text-white shadow-md">
                    <BarChartOutlined className="text-2xl" />
                </div>
            ),
        },
        {
            title: "Cài đặt hệ thống",
            value: "3 mục đang hoạt động",
            icon: (
                <div className="p-3 rounded-xl bg-gradient-to-tr from-orange-400 to-yellow-400 text-white shadow-md">
                    <SettingOutlined className="text-2xl" />
                </div>
            ),
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
            <div className="mb-6 border-b border-gray-200 pb-3 text-center md:text-left">
                <Title level={3} className="!mb-1 text-lg md:text-2xl">
                    Bảng điều khiển
                </Title>
                <Text type="secondary" className="text-sm md:text-base">
                    Tổng quan về hiệu suất và hoạt động của hệ thống quản trị.
                </Text>
            </div>

            {/* Thống kê */}
            <Row gutter={[16, 16]}>
                {stats.map((item, index) => (
                    <Col xs={24} sm={12} lg={8} key={index}>
                        <Card
                            className="shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl"
                            style={{
                                background:
                                    "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(245,247,250,0.95))",
                            }}
                        >
                            <div className="flex items-center space-x-5">
                                {item.icon}
                                <div>
                                    <Text type="secondary" className="text-xs md:text-sm">
                                        {item.title}
                                    </Text>
                                    <Title
                                        level={4}
                                        className="m-0 mt-1 font-semibold text-gray-800 text-base md:text-lg"
                                    >
                                        {item.value}
                                    </Title>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Content>
    );
}
