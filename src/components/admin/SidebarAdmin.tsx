"use client";

import React, { useEffect, useState } from "react";
import {
    DashboardOutlined,
    FileTextOutlined,
    UserOutlined,
    SettingOutlined,
    LogoutOutlined,
    AppstoreOutlined,
    CommentOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Menu, Layout, Modal, message } from "antd";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const { Sider } = Layout;
const { confirm } = Modal;

interface SidebarProps {
    collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // Đảm bảo chỉ render menu sau khi client đã mount
        setMounted(true);
    }, []);

    if (!mounted) {
        // Tránh hydration mismatch bằng cách không render gì trước khi mount
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={230}
                className="min-h-screen"
                style={{
                    background:
                        "linear-gradient(180deg, #001529 0%, #000d1a 100%)",
                }}
            />
        );
    }

    const menuItems = [
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
            label: (
                <Link href="/admin/user-comments">Bình luận theo người dùng</Link>
            ),
        },
        {
            key: "/admin/Users",
            icon: <UserOutlined />,
            label: <Link href="/admin/Users">Người dùng</Link>,
        },
    ];

    const logoutItem = [
        {
            key: "logout",
            icon: <LogoutOutlined />,
            label: <span className="text-red-400">Đăng xuất</span>,
            onClick: handleLogout,
        },
    ];

    function handleLogout() {
        confirm({
            title: "Xác nhận đăng xuất",
            content: "Bạn có chắc chắn muốn đăng xuất không?",
            okText: "Đăng xuất",
            okType: "danger",
            cancelText: "Hủy",
            async onOk() {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                message.success("Đăng xuất thành công!");
                router.push("/login");
            },
        });
    }

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={230}
            className="min-h-screen flex flex-col"
            style={{
                background: "linear-gradient(180deg, #001529 0%, #000d1a 100%)",
            }}
        >
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

            {/* Menu chính */}
            <div className="flex-1 overflow-y-auto">
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[pathname]}
                    items={menuItems}
                    style={{ background: "transparent" }}
                />
            </div>

            {/* Đăng xuất */}
            <div className="border-t border-gray-800">
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[]}
                    items={logoutItem}
                    style={{ background: "transparent" }}
                />
            </div>
        </Sider>
    );
}
