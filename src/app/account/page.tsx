"use client";

import "@/app/globals.css";
import { useEffect, useState } from "react";
import { Card, Avatar, Descriptions, Button, message } from "antd";
import { UserOutlined, EditOutlined, LogoutOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

interface User {
    name: string;
    email: string;
    phone?: string;
    address?: string;
    avatar?: string;
}

export default function AccountPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
       
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            message.warning("Vui lòng đăng nhập trước khi xem thông tin tài khoản.");
            router.push("/login");
        }
        setLoading(false);
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        message.success("Đã đăng xuất thành công!");
        router.push("/");
    };

    if (loading) return <p>Đang tải...</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
            <Card
                className="w-full max-w-lg shadow-lg rounded-2xl"
                title="Thông tin tài khoản"
                extra={
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => message.info("Chức năng chỉnh sửa sắp ra mắt")}
                    >
                        Chỉnh sửa
                    </Button>
                }
            >
                <div className="flex flex-col items-center mb-4">
                    <Avatar
                        size={100}
                        icon={<UserOutlined />}
                        src={user?.avatar || undefined}
                        className="mb-4"
                    />
                    <h2 className="text-xl font-semibold">{user?.name}</h2>
                </div>

                <Descriptions bordered column={1} size="middle">
                    <Descriptions.Item label="Email">{user?.email}</Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {user?.phone || "Chưa cập nhật"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">
                        {user?.address || "Chưa cập nhật"}
                    </Descriptions.Item>
                </Descriptions>

                <div className="mt-6 text-center">
                    <Button
                        type="default"
                        danger
                        icon={<LogoutOutlined />}
                        onClick={handleLogout}
                    >
                        Đăng xuất
                    </Button>
                </div>
            </Card>
        </div>
    );
}
