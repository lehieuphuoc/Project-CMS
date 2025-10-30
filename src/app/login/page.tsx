"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginModal from "@/components/login/LoginModal";

export default function LoginPage() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(true);

    const handleClose = () => {
        setShowModal(false);
        // Khi đóng modal bằng nút X thì quay lại trang trước
        setTimeout(() => router.back(), 200);
    };

    const handleLoginSuccess = () => {
        setShowModal(false);
        // Khi đăng nhập thành công thì về trang chủ
        router.push("/");
    };

    return (
        <>
            {showModal && (
                <LoginModal
                    onClose={handleClose}
                    // onLoginSuccess={handleLoginSuccess}
                />
            )}
        </>
    );
}
