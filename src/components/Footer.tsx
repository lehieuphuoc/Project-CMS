"use client";

import Image from "next/image";
import { Input, Button } from "antd";
import {
    PhoneOutlined,
    EnvironmentOutlined,
    YoutubeOutlined,
    FacebookOutlined,
    MailOutlined,
} from "@ant-design/icons";


export default function Footer() {
    return (
        <footer className="bg-[#0B4F6C] text-white text-sm pt-12 pb-6 px-6 md:px-16">
            {/* --- Nội dung chính --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-white/20 pb-10">
                {/* Cột 1: Logo + liên hệ */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <Image
                            src="/logo-pc.png"
                            alt="Sách 36 Logo"
                            width={60}
                            height={60}
                            className="rounded-md"
                        />      
                        <div>
                            <h2 className="text-lg font-bold text-white">Sách 36</h2>
                            <p className="text-gray-300 text-xs italic">
                                Thế giới tri thức – Nâng tầm tư duy Việt
                            </p>
                        </div>
                    </div>

                    <h3 className="font-semibold mb-3 text-white/90 border-l-4 border-yellow-400 pl-2">
                        Liên hệ
                    </h3>
                    <p className="flex items-center gap-2 mb-1">
                        <PhoneOutlined /> 0989 363 636
                    </p>
                    <p className="flex items-center gap-2 mb-1">
                        <MailOutlined /> support@sach36.vn
                    </p>
                    <div className="flex items-start gap-2 mb-2">
                        <EnvironmentOutlined className="mt-1" />
                        <div>
                            <span>Địa chỉ:</span>
                            <ul className="list-disc list-inside text-gray-200 text-xs mt-1">
                                <li>36 Nguyễn Trãi, Hà Nội</li>
                                <li>Chi nhánh TP. Hồ Chí Minh</li>
                                <li>Chi nhánh Đà Nẵng</li>
                            </ul>
                        </div>
                    </div>

                    <Image
                        src="/dmca.png"
                        alt="DMCA"
                        width={100}
                        height={40}
                        className="my-3"
                    />
                    <p className="text-xs text-gray-300">
                        Đại diện pháp lý: <br />
                        <span className="font-semibold text-white">Nguyễn Văn Công</span>
                    </p>
                </div>

                {/* Cột 2: Chính sách */}
                <div>
                    <h3 className="font-semibold mb-3 border-l-4 border-yellow-400 pl-2">
                        Chính sách & hỗ trợ
                    </h3>
                    <ul className="space-y-2 text-gray-200">
                        {[
                            "Chính sách đổi trả",
                            "Chính sách bảo mật",
                            "Hướng dẫn thanh toán",
                            "Điều khoản sử dụng",
                        ].map((item, i) => (
                            <li
                                key={i}
                                className="hover:text-yellow-300 cursor-pointer transition-colors"
                            >
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cột 3: Danh mục nổi bật */}
                <div>
                    <h3 className="font-semibold mb-3 border-l-4 border-yellow-400 pl-2">
                        Danh mục nổi bật
                    </h3>
                    <ul className="space-y-2 text-gray-200">
                        {[
                            "Sách văn học",
                            "Sách kỹ năng sống",
                            "Sách thiếu nhi",
                            "Sách học ngoại ngữ",
                            "Combo khuyến mãi",
                        ].map((item, i) => (
                            <li
                                key={i}
                                className="hover:text-yellow-300 cursor-pointer transition-colors"
                            >
                                • {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Cột 4: Đăng ký nhận tin + Mạng xã hội */}
                <div>
                    <h3 className="font-semibold mb-3 border-l-4 border-yellow-400 pl-2">
                        Theo dõi tin mới & ưu đãi
                    </h3>
                    <div className="flex items-center mb-3">
                        <Input
                            placeholder="Nhập email của bạn"
                            className="rounded-l-md border-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <Button className="bg-yellow-400 text-[#0B4F6C] font-semibold border-none hover:bg-yellow-300">
                            Đăng ký
                        </Button>
                    </div>
                    <p className="text-xs text-gray-300 mb-4">
                        Nhận thông tin sách mới và ưu đãi độc quyền hàng tuần
                    </p>

                    <h4 className="font-semibold mb-2">Kết nối với chúng tôi</h4>
                    <div className="flex items-center gap-4 mb-4">
                        <FacebookOutlined className="text-2xl hover:text-yellow-300 cursor-pointer transition" />
                        <YoutubeOutlined className="text-2xl hover:text-yellow-300 cursor-pointer transition" />
                    </div>

                    <h4 className="font-semibold mb-2">Tải ứng dụng Sách 36</h4>
                    <div className="flex items-center gap-2">
                        <Image src="/qr.png" alt="QR Code" width={80} height={80} />
                        <div className="flex flex-col gap-2">
                            <Image src="/appstore.png" alt="App Store" width={110} height={35} />
                            <Image src="/googplay.png" alt="Google Play" width={110} height={35} />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Dòng cuối --- */}
            <div className="text-center text-gray-300 text-xs mt-6">
                © 2025 <span className="font-semibold text-white">Sách 36</span> • MST:
                0109999999 • Thành viên của{" "}
                <span className="text-yellow-400">Tech36 Network</span> • Hotline:{" "}
                <span className="font-semibold text-white">0989 363 636</span>
            </div>
        </footer>
    );
}
