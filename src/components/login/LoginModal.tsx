"use client";

import { useState } from "react";
import React from "react";
import {
    Modal,
    Tabs,
    Input,
    Button,
    Form,
    Divider,
    message,
} from "antd";
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    GoogleOutlined,
    FacebookOutlined,
    AppleOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginModal({ onClose }: { onClose: () => void }) {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    //  Hàm xử lý form (đã thêm phần fetch API)
    const handleSubmit = async (values: any) => {
        setLoading(true);
        try {
            const type = isLogin ? "login" : "register";

            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...values, type }),
            });

            const data = await res.json();

            if (!res.ok) {
                message.error(data.message || "Lỗi không xác định");
                return;
            }

            message.success(data.message);
            router.push("/");
            onClose();
        } catch (err) {
            console.error(err);
            message.error("Có lỗi xảy ra, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            open={true}
            onCancel={onClose}
            footer={null}
            centered
            width={420}
            className="rounded-2xl"
        >
            {/* Logo */}
            <div className="flex justify-center mb-4 mt-2">
                <Image
                    src="/logo-pc.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="rounded-full shadow-md hover:scale-105 transition-transform duration-300"
                />
            </div>

            {/* Tabs */}
            <Tabs
                centered
                activeKey={isLogin ? "login" : "register"}
                onChange={(key) => setIsLogin(key === "login")}
                items={[
                    {
                        key: "login",
                        label: (
                            <span className="font-semibold text-base">
                                Đăng nhập
                            </span>
                        ),
                    },
                    {
                        key: "register",
                        label: (
                            <span className="font-semibold text-base">
                                Đăng ký
                            </span>
                        ),
                    },
                ]}
            />

            {/* Social login */}
            <div className="text-center mb-4 mt-2">
                <p className="text-gray-500 text-sm mb-3">
                    {isLogin
                        ? "Đăng nhập bằng tài khoản mạng xã hội"
                        : "Tạo tài khoản bằng mạng xã hội"}
                </p>
                <div className="flex justify-center gap-3">
                    <Button
                        shape="circle"
                        icon={<GoogleOutlined />}
                        size="large"
                        className="hover:bg-red-50 hover:text-red-500 transition-all"
                    />
                    <Button
                        shape="circle"
                        icon={<FacebookOutlined />}
                        size="large"
                        className="hover:bg-blue-50 hover:text-blue-500 transition-all"
                    />
                    <Button
                        shape="circle"
                        icon={<AppleOutlined />}
                        size="large"
                        className="hover:bg-black hover:text-white transition-all"
                    />
                </div>
            </div>

            <Divider plain>Hoặc sử dụng Email</Divider>

            {/* Form */}
            <Form layout="vertical" onFinish={handleSubmit} className="mt-4">
                {!isLogin && (
                    <Form.Item
                        label={<span className="font-medium">Tên Đăng Nhập</span>}
                        name="taiKhoan"
                        rules={[
                            { required: true, message: "Vui lòng nhập Tên Đăng Nhập!" },
                        ]}
                    >
                        <Input
                            placeholder="Nhập Tên Đăng Nhập của bạn"
                            size="large"
                            className="rounded-lg"
                        />
                    </Form.Item>
                )}

                <Form.Item
                    label={<span className="font-medium">Email</span>}
                    name="email"
                    rules={[{ required: true, message: "Vui lòng nhập Email!" }]}
                >
                    <Input
                        placeholder="Nhập Email của bạn"
                        size="large"
                        className="rounded-lg"
                    />
                </Form.Item>

                <Form.Item
                    label={<span className="font-medium">Mật khẩu</span>}
                    name="password"
                    rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
                >
                    <Input.Password
                        placeholder="Nhập mật khẩu"
                        size="large"
                        className="rounded-lg"
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>

                {!isLogin && (
                    <Form.Item
                        label={<span className="font-medium">Xác nhận mật khẩu</span>}
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                            { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            placeholder="Nhập lại mật khẩu"
                            size="large"
                            className="rounded-lg"
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    </Form.Item>
                )}

                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    block
                    className="rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors font-semibold"
                >
                    {isLogin ? "Đăng nhập" : "Đăng ký"}
                </Button>

                {isLogin && (
                    <p className="text-center text-blue-600 mt-3 hover:underline cursor-pointer">
                        Quên mật khẩu?
                    </p>
                )}
            </Form>
        </Modal>
    );
}
