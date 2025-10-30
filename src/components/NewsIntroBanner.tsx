"use client";

import Image from "next/image";
import { ClockCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button } from "antd";

export default function HomeIntroSection() {
    const mainPost = {
        title: "PGS.TS.BSCC Lê Chính Đại - Chuyên gia Ung bướu được hàng...",
        desc: "Với hơn 40 năm kinh nghiệm công tác tại các bệnh viện tuyến đầu như Bệnh viện K, Bệnh viện Bạch Mai, cùng sự nhiệt huyết và tận tâm với nghề, PGS.TS.BSCC Lê Chính Đại luôn là tấm gương sáng trong ngành y.",
        date: "Thứ Tư, 24 tháng 9, 2025",
        img: "/images/gioi-thieu-1.jpg",
    };

    const subPosts = [
        {
            title: "PGS.TS Trần Hoàng Thành - Hành trình 45 năm bảo vệ sức khỏe nhân dân...",
            date: "Thứ Hai, 8 tháng 9, 2025",
            img: "/images/gioi-thieu-2.jpg",
        },
        {
            title: "Hệ thống Y tế MEDLATEC: Dịch vụ uy tín, nâng tầm trải nghiệm...",
            date: "Thứ Tư, 9 tháng 11, 2022",
            img: "/images/gioi-thieu-3.jpg",
        },
        {
            title: "Hướng dẫn khách hàng tra cứu kết quả khám xét nghiệm online...",
            date: "Thứ Ba, 4 tháng 5, 2025",
            img: "/images/gioi-thieu-4.jpg",
        },
        {
            title: "Quy trình khám chữa bệnh tại MEDLATEC - Nhanh chóng, chính xác...",
            date: "Thứ Năm, 17 tháng 10, 2019",
            img: "/images/gioi-thieu-5.jpg",
        },
    ];

    const sidePosts = [
        {
            title: "Tiêm trưởng thành phổi có con chậm tăng cân không? Giải đáp...",
            desc: "Tiêm trưởng thành phổi là phương pháp y khoa quan trọng...",
            date: "Thứ Bảy, 18 tháng 10, 2025",
            img: "/images/side-1.jpg",
        },
        {
            title: "Lao phổi có lây không? Con đường lây truyền và cách phòng...",
            desc: "Lao phổi là bệnh truyền nhiễm phổ biến và nguy hiểm...",
            date: "Thứ Bảy, 18 tháng 10, 2025",
            img: "/images/side-2.jpg",
        },
        {
            title: "MEDLATEC phối hợp cùng Vietinbank nâng cao nhận thức chăm sóc sức khỏe...",
            desc: "Ngày 17/10, MEDLATEC phối hợp cùng Ngân hàng Vietinbank...",
            date: "Thứ Bảy, 18 tháng 10, 2025",
            img: "/images/side-3.jpg",
        },
        {
            title: "Cập nhật tình hình bệnh Whitmore ở Việt Nam mới nhất...",
            desc: "Căn bệnh Whitmore đang có diễn biến mới tại nhiều địa phương...",
            date: "Thứ Bảy, 18 tháng 10, 2025",
            img: "/images/side-4.jpg",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto p-8 mt-12 bg-white rounded-3xl shadow-[0_6px_24px_rgba(0,0,0,0.05)] relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-10 border-b border-gray-200 pb-4">
                <h2 className="text-3xl font-bold text-gray-800 relative tracking-wide before:absolute before:-bottom-2 before:left-0 before:w-16 before:h-[3px] before:bg-gradient-to-r from-blue-500 to-sky-400">
                    Giới thiệu
                </h2>
                <Button
                    type="link"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-500 font-medium transition-all hover:translate-x-1"
                >
                    Xem thêm <RightOutlined />
                </Button>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cột trái: Bài chính */}
                <div className="rounded-2xl bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="relative overflow-hidden group">
                        <Image
                            src={mainPost.img}
                            alt={mainPost.title}
                            width={700}
                            height={400}
                            className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"></div>
                    </div>
                    <div className="p-6">
                        <h3 className="font-semibold text-lg text-gray-900 leading-snug hover:text-blue-600 cursor-pointer line-clamp-2 transition-all">
                            {mainPost.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-3">
                            {mainPost.desc}
                        </p>
                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
                            <ClockCircleOutlined className="text-blue-500" />
                            <span>{mainPost.date}</span>
                        </div>
                    </div>
                </div>

                {/* Cột giữa: Danh sách bài phụ */}
                <div className="flex flex-col gap-5">
                    {subPosts.map((post, index) => (
                        <div
                            key={index}
                            className="flex gap-4 items-center cursor-pointer bg-gray-50 hover:bg-white p-3 rounded-2xl transition-all group hover:-translate-y-[3px] hover:shadow-md"
                        >
                            <div className="overflow-hidden rounded-xl w-[110px] h-[75px] flex-shrink-0 shadow-sm">
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    width={110}
                                    height={75}
                                    className="object-cover w-full h-full transform group-hover:scale-110 transition-all duration-500"
                                />
                            </div>
                            <div>
                                <h4 className="text-sm font-medium text-gray-800 hover:text-blue-600 line-clamp-2">
                                    {post.title}
                                </h4>
                                <div className="flex items-center gap-2 text-gray-500 text-xs mt-1">
                                    <ClockCircleOutlined className="text-blue-500" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cột phải: Tin bên phải */}
                <div className="flex flex-col gap-6">
                    {sidePosts.map((post, index) => (
                        <div
                            key={index}
                            className="flex gap-4 items-start cursor-pointer bg-gray-50 hover:bg-white p-4 rounded-2xl transition-all group hover:-translate-y-[3px] hover:shadow-md"
                        >
                            <div className="overflow-hidden rounded-xl w-[100px] h-[80px] flex-shrink-0 shadow-sm">
                                <Image
                                    src={post.img}
                                    alt={post.title}
                                    width={100}
                                    height={80}
                                    className="object-cover w-full h-full transform group-hover:scale-110 transition-all duration-500"
                                />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-[15px] font-semibold text-gray-800 hover:text-blue-600 line-clamp-2">
                           8         {post.title}
                                </h4>
                                <p className="text-gray-600 text-xs mt-1 line-clamp-2">
                                    {post.desc}
                                </p>
                                <div className="flex items-center gap-2 text-gray-500 text-xs mt-2">
                                    <ClockCircleOutlined className="text-blue-500" />
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
