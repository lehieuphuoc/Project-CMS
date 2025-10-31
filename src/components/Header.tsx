"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input, Drawer, Divider, Modal, Dropdown } from "antd";
import {
    UserOutlined,
    SearchOutlined,
    HomeOutlined,
    MenuOutlined,
    CloseOutlined,
    DownOutlined,
} from "@ant-design/icons";

export default function Header() {
    const [searchVisible, setSearchVisible] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null); // ✅ Trạng thái đăng nhập

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ✅ Lấy thông tin user từ localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // ✅ Xử lý đăng xuất
    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        window.location.reload();
    };

    const userMenu = [
        {
            key: "1",
            label: <Link href="/profile">Thông tin tài khoản</Link>,
        },
        {
            key: "2",
            label: (
                <span
                    onClick={handleLogout}
                    className="text-red-500 cursor-pointer"
                >
                    Đăng xuất
                </span>
            ),
        },
    ];

    // Đóng submenu khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".menu-item")) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Danh sách menu
    const menuItems = [
        { name: "TIN MỚI NHẤT" },
        {
            name: "KINH DOANH",
            children: ["Doanh nghiệp", "Tài chính", "Thị trường"],
        },
        { name: "THỜI SỰ" },
        { name: "SỨC KHỎE" },
        { name: "BẤT ĐỘNG SẢN" },
        { name: "ĐỜI SỐNG" },
        {
            name: "THỂ THAO",
            children: ["Bóng đá", "Bóng rổ", "Tennis"],
        },
        { name: "GIẢI TRÍ" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            {/* --- Thanh trên cùng --- */}
            <div className="flex justify-between items-center px-4 md:px-12 py-2 text-sm text-gray-700 bg-white">
                <div className="flex items-center gap-3 md:gap-6">
                    <Link href="/">
                        <Image
                            src="/logo-pc.png"
                            alt="Logo"
                            width={120}
                            height={40}
                            className="object-contain cursor-pointer"
                        />
                    </Link>

                    <div className="hidden sm:flex items-center text-gray-500 text-[14px]">
                        <span>Hà Nội</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span>Thứ 2, 20/10/2025</span>
                        <span className="mx-2 text-gray-300">|</span>
                        <span className="flex items-center gap-1">
                            <span className="text-sky-500 text-lg">☁</span>30°C
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3 md:gap-5">
                    <div className="hidden md:flex items-center gap-4 text-[14px]">
                        {["Fica", "DTiNews", "Nội vụ & Xã hội"].map((text) => (
                            <span
                                key={text}
                                className="cursor-pointer text-gray-600 hover:text-green-600 transition"
                            >
                                {text}
                            </span>
                        ))}
                    </div>

                    {/* ✅ Nếu đăng nhập thì hiện menu con, chưa thì hiện link login */}
                    {user ? (
                        <Dropdown
                            menu={{ items: userMenu }}
                            placement="bottomRight"
                            trigger={["click"]}
                        >
                            <div className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-green-600 transition">
                                <UserOutlined className="text-lg" />
                                <span className="text-sm font-medium">
                                    {user.name || "Tài khoản"}
                                </span>
                            </div>
                        </Dropdown>
                    ) : (
                        <Link href="/login">
                            <UserOutlined className="text-lg cursor-pointer text-gray-600 hover:text-green-600 transition" />
                        </Link>
                    )}

                    <SearchOutlined
                        className="text-lg cursor-pointer text-gray-600 hover:text-green-600 hover:scale-110 transition-transform"
                        onClick={() => setSearchVisible(true)}
                    />

                    <div className="md:hidden">
                        <MenuOutlined
                            className="text-xl cursor-pointer text-gray-700 hover:text-green-600 transition"
                            onClick={() => setMenuOpen(true)}
                        />
                    </div>
                </div>
            </div>

            {/* --- Thanh menu chính (Desktop) --- */}
            <nav className="hidden md:flex justify-center items-center px-4 md:px-10 py-3 bg-white text-[15px] font-semibold text-gray-700 border-t border-gray-100 relative">
                <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <Link
                        href="/"
                        className="flex justify-center items-center w-9 h-9 bg-green-50 rounded-full hover:bg-green-100 transition"
                    >
                        <HomeOutlined className="text-green-600 text-lg hover:scale-110 transition-transform" />
                    </Link>

                    {menuItems.map((item, i) => (
                        <div
                            key={i}
                            className="relative menu-item select-none"
                            onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenu(
                                    activeMenu === item.name ? null : item.name
                                );
                            }}
                        >
                            <div className="flex items-center gap-1 text-gray-700 hover:text-green-600 cursor-pointer transition">
                                {item.name}
                                {item.children && (
                                    <DownOutlined
                                        className={`text-xs mt-[2px] transition-transform ${activeMenu === item.name
                                                ? "rotate-180 text-green-600"
                                                : ""
                                            }`}
                                    />
                                )}
                            </div>

                            {/* Submenu hiển thị khi click */}
                            {item.children &&
                                activeMenu === item.name && (
                                    <div className="absolute top-full left-0 mt-2 bg-white shadow-lg border rounded-lg w-48 z-[100]">
                                        {item.children.map((sub, j) => (
                                            <Link
                                                key={j}
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                        </div>
                    ))}
                </div>
            </nav>

            {/* --- Drawer Menu Mobile --- */}
            <Drawer
                title={
                    <div className="flex justify-between items-center w-full">
                        <Image
                            src="/logo-pc.png"
                            alt="Logo"
                            width={90}
                            height={35}
                        />
                        <CloseOutlined
                            onClick={() => setMenuOpen(false)}
                            className="text-gray-600 text-lg cursor-pointer hover:text-green-600"
                        />
                    </div>
                }
                placement="right"
                onClose={() => setMenuOpen(false)}
                open={menuOpen}
                width={280}
                closeIcon={false}
            >
                <div className="flex flex-col gap-4 mt-4 text-gray-700 font-medium">
                    <Link
                        href="/"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 hover:text-green-600"
                    >
                        <HomeOutlined /> Trang chủ
                    </Link>

                    {menuItems.map((item, i) => (
                        <div key={i}>
                            <div
                                className="flex items-center justify-between cursor-pointer hover:text-green-600 transition"
                                onClick={() =>
                                    setActiveMenu(
                                        activeMenu === item.name
                                            ? null
                                            : item.name
                                    )
                                }
                            >
                                <span>{item.name}</span>
                                {item.children && (
                                    <DownOutlined
                                        className={`text-xs transition-transform ${activeMenu === item.name
                                                ? "rotate-180 text-green-600"
                                                : ""
                                            }`}
                                    />
                                )}
                            </div>

                            {item.children &&
                                activeMenu === item.name && (
                                    <div className="ml-4 mt-2 flex flex-col gap-2 text-sm">
                                        {item.children.map((sub, j) => (
                                            <Link
                                                key={j}
                                                href="#"
                                                onClick={() => setMenuOpen(false)}
                                                className="hover:text-green-600"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                        </div>
                    ))}

                    <Divider className="my-3" />
                    {user ? (
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/account"
                                onClick={() => setMenuOpen(false)}
                                className="hover:text-green-600"
                            >
                                Thông tin tài khoản
                            </Link>
                            <span
                                onClick={handleLogout}
                                className="text-red-500 cursor-pointer"
                            >
                                Đăng xuất
                            </span>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center gap-2 hover:text-green-600"
                        >
                            <UserOutlined /> Tài khoản
                        </Link>
                    )}
                </div>
            </Drawer>

            {/* --- Overlay Search --- */}
            {isMobile ? (
                <Drawer
                    placement="top"
                    closable={false}
                    height="100%"
                    open={searchVisible}
                    onClose={() => setSearchVisible(false)}
                    style={{ padding: "24px" }}
                    styles={{
                        mask: { backgroundColor: "rgba(0,0,0,0.7)" },
                        content: { backgroundColor: "#fff" },
                    }}
                >
                    <div className="flex flex-col h-full justify-start">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">
                                Tìm kiếm bài viết
                            </h3>
                            <CloseOutlined
                                onClick={() => setSearchVisible(false)}
                                className="text-gray-500 text-lg cursor-pointer hover:text-red-500 transition"
                            />
                        </div>

                        <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden mb-4">
                            <Input
                                placeholder="Nhập từ khóa..."
                                className="border-none focus:ring-0 focus:outline-none py-2"
                                prefix={
                                    <SearchOutlined className="text-gray-500 mr-2" />
                                }
                            />
                            <button
                                className="bg-green-600 text-white px-4 py-[6px] hover:bg-green-700 transition"
                                onClick={() => setSearchVisible(false)}
                            >
                                Tìm
                            </button>
                        </div>

                        <p className="text-gray-500 text-sm">
                            Gợi ý: “Sức khỏe”, “Bất động sản”, “Đời sống”...
                        </p>
                    </div>
                </Drawer>
            ) : (
                <Modal
                    open={searchVisible}
                    footer={null}
                    closable={false}
                    centered
                    width={600}
                    onCancel={() => setSearchVisible(false)}
                    styles={{
                        body: {
                            background: "white",
                            borderRadius: "12px",
                            padding: "24px",
                        },
                        mask: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
                    }}
                >
                    <div className="flex flex-col items-center gap-4">
                        <h3 className="text-lg font-semibold text-gray-700">
                            Tìm kiếm bài viết
                        </h3>
                        <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                            <Input
                                placeholder="Nhập từ khóa tìm kiếm..."
                                className="border-none focus:ring-0 focus:outline-none py-2"
                                prefix={
                                    <SearchOutlined className="text-gray-500 mr-2" />
                                }
                            />
                            <button
                                className="bg-green-600 text-white px-4 py-[6px] hover:bg-green-700 transition"
                                onClick={() => setSearchVisible(false)}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                        <button
                            onClick={() => setSearchVisible(false)}
                            className="text-gray-400 hover:text-red-500 transition mt-2 flex items-center gap-1"
                        >
                            <CloseOutlined /> Đóng
                        </button>
                    </div>
                </Modal>
            )}
        </header>
    );
}
