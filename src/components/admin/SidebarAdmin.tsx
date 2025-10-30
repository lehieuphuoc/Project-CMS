"use client";

import React from "react";
import {
    DashboardOutlined,
    FileTextOutlined,
    UserOutlined,
    SettingOutlined,
    BarChartOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    CommentOutlined,
    TeamOutlined, 
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
    const pathname = usePathname();

    const items = [
        {
            key: "/admin",
            icon: <DashboardOutlined />,
            label: <Link href="/admin">Dashboard</Link>,
        },
        {
            key: "/admin/articles",
            icon: <FileTextOutlined />,
            label: <Link href="/admin/articles">Bài viết</Link>,
        },
        {
            key: "/admin/Categories",
            icon: <AppstoreOutlined />,
            label: <Link href="/admin/Categories">Danh mục</Link>,
        },
        {
            key: "/admin/comments",
            icon: <CommentOutlined />,
            label: <Link href="/admin/comments">Bình luận</Link>,
        },
        {
            key: "/admin/user-comments",
            icon: <TeamOutlined />,
            label: <Link href="/admin/user-comments">Bình luận theo người dùng</Link>,
        },
        {
            key: "/admin/Users",
            icon: <UserOutlined />,
            label: <Link href="/admin/Users">Người dùng</Link>,
        },
        {
            key: "/admin/reports",
            icon: <BarChartOutlined />,
            label: <Link href="/admin/reports">Báo cáo</Link>,
        },
        {
            key: "/admin/settings",
            icon: <SettingOutlined />,
            label: <Link href="/admin/settings">Cài đặt</Link>,
        },
        {
            type: "divider" as const,
        },
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span className="text-red-400">Đăng xuất</span>,
        },
    ];

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={230}
            className="min-h-screen"
            style={{
                background: "linear-gradient(180deg, #001529 0%, #000d1a 100%)",
            }}
        >
            {/* Logo */}
            <div className="flex flex-col items-center py-4 border-b border-gray-800">
                <Image
                    src="/logo-pc.png"
                    alt="Admin Logo"
                    width={collapsed ? 40 : 80}
                    height={collapsed ? 40 : 80}
                    className="rounded-full mb-2 transition-all duration-300"
                />
                {!collapsed && (
                    <h2 className="text-white text-lg font-semibold">
                        AdminPanel
                    </h2>
                )}
            </div>

            {/* Menu */}
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[pathname]}
                items={items}
                className="mt-2"
                style={{ background: "transparent" }}
            />
        </Sider>
    );
}
