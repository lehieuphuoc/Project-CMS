"use client";

import Image from "next/image";
import { Button } from "antd";
import {
    ClockCircleOutlined,
    PhoneOutlined,
    ArrowRightOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";

export default function NewsSection() {
    const newsList = [
        {
            title: "MEDLATEC chung tay xây dựng cộng đồng khỏe mạnh...",
            date: "Chủ Nhật, 19 tháng 10, 2025",
            img: "/news1.jpg",
        },
        {
            title: "MEDLATEC phối hợp cùng Vietinbank nâng cao sức khỏe cộng đồng...",
            date: "Thứ Bảy, 18 tháng 10, 2025",
            img: "/news2.jpg",
        },
        {
            title: "Nữ sinh 16 tuổi ăn kiêng và tập gym cường độ cao dẫn đến suy kiệt...",
            date: "Thứ Bảy, 18 tháng 10, 2025",
            img: "/news3.jpg",
        },
        {
            title: "Kịp thời phát hiện và loại bỏ tổn thương tiền ung thư...",
            date: "Thứ Sáu, 17 tháng 10, 2025",
            img: "/news4.jpg",
        },
    ];

    // Hiệu ứng animation
    const fadeInUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    const fadeInRight = {
        hidden: { opacity: 0, x: 80 },
        visible: { opacity: 1, x: 0 },
    };

    return (
        <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* --- Tin tức nổi bật --- */}
            <motion.div
                className="md:col-span-2 bg-blue-50 rounded-2xl p-6 shadow-sm border border-blue-100"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl md:text-2xl font-bold text-[#0B4F6C] tracking-wide">
                        📰 Tin tức nổi bật
                    </h2>
                    <a
                        href="#"
                        className="text-blue-600 text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all duration-200"
                    >
                        Xem thêm <ArrowRightOutlined />
                    </a>
                </div>

                {/* Bài viết chính */}
                <div className="flex flex-col md:flex-row gap-5 mb-6">
                    <motion.div
                        className="w-full md:w-1/2"
                        variants={fadeInUp}
                        transition={{ delay: 0.1 }}
                    >
                        <Image
                            src="/main-news.jpg"
                            alt="Tin chính"
                            width={400}
                            height={260}
                            className="rounded-xl object-cover w-full h-full"
                        />
                    </motion.div>
                    <motion.div
                        className="flex flex-col justify-between"
                        variants={fadeInUp}
                        transition={{ delay: 0.2 }}
                    >
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 cursor-pointer leading-snug">
                                Nam thanh niên ngứa ngáy khắp vùng mặt sau khi dùng thuốc...
                            </h3>
                            <p className="text-gray-600 text-sm mt-2 leading-relaxed line-clamp-3">
                                Sau khi sử dụng thuốc điều trị bệnh Gút, bệnh nhân xuất hiện cảm
                                giác ngứa ngáy, châm chích khắp vùng mặt. Các bác sĩ khuyến cáo
                                nên tái khám khi có dấu hiệu bất thường.
                            </p>
                        </div>
                        <p className="text-xs text-gray-500 mt-3 flex items-center gap-2">
                            <ClockCircleOutlined /> Thứ Hai, 20 tháng 10, 2025
                        </p>
                    </motion.div>
                </div>

                {/* Danh sách tin nhỏ */}
                <motion.div
                    className="space-y-3"
                    variants={fadeInUp}
                    transition={{ delay: 0.3 }}
                >
                    {newsList.map((news, i) => (
                        <div
                            key={i}
                            className="flex gap-3 items-center group hover:bg-white hover:shadgeekprank.comow-md p-2 rounded-xl transition-all duration-200 cursor-pointer"
                        >
                            <Image
                                src={news.img}
                                alt={news.title}
                                width={90}
                                height={65}
                                className="rounded-md object-cover flex-shrink-0"
                            />
                            <div>
                                <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2">
                                    {news.title}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <ClockCircleOutlined /> {news.date}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* --- Cột bên phải: Hotline + banner --- */}
            <motion.div
                className="flex flex-col gap-5"
                variants={fadeInRight}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
            >
                {/* Thẻ Hotline */}
                <motion.div
                    className="bg-gradient-to-b from-[#0B4F6C] to-[#073B4C] text-white rounded-2xl p-6 text-center shadow-lg"
                    variants={fadeInRight}
                    transition={{ delay: 0.2 }}
                >
                    <PhoneOutlined className="text-4xl mb-3 text-blue-200 animate-pulse" />
                    <p className="text-sm text-gray-200">Hotline hỗ trợ</p>
                    <h3 className="text-3xl font-bold mb-3 text-white tracking-wide">
                        1900 565 565
                    </h3>
                    <p className="text-xs text-gray-300 mb-5 leading-relaxed">
                        Liên hệ ngay với MEDLATEC để được phục vụ và sử dụng các dịch vụ khám chữa bệnh
                        hiện đại và chất lượng cao nhất.
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        className="bg-blue-400 hover:bg-blue-300 border-none font-semibold px-6 rounded-full"
                    >
                        Liên hệ với chúng tôi
                    </Button>
                </motion.div>

                {/* Banner quảng cáo */}
                <motion.div
                    className="rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                    variants={fadeInRight}
                    transition={{ delay: 0.4 }}
                >
                    <Image
                        src="/banner-medlatec.jpg"
                        alt="Tặng quà sức khỏe"
                        width={400}
                        height={250}
                        className="object-cover w-full h-full"
                    />
                </motion.div>
            </motion.div>
        </div>
    );
}
