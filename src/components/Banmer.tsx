"use client";

import { Carousel, Button } from "antd";
import Image from "next/image";

const banners = [
    {
        src: "https://nhanhauclinic.com.vn/wp-content/uploads/2024/12/noi-soi-tieu-hoa-banner-pc.webp",
        title: "Sách mới mỗi ngày",
        desc: "Khám phá kho tri thức vô tận cùng Sách 36",
    },
    {
        src: "https://phongkhamducquang.com/files/sites/site_43/site_43_banner/banner-ducquang.jpg",
        title: "Ưu đãi cực sốc",
        desc: "Giảm giá đến 50% cho tất cả thể loại sách",
    },
    {
        src: "https://bizweb.dktcdn.net/100/332/012/files/in-poster-quang-cao-phong-kham-nha-khoa.jpg?v=1562289066392",
        title: "Giao hàng toàn quốc",
        desc: "Nhanh chóng – An toàn – Tiện lợi",
    },
];

export default function BannerSlider() {
    return (
        <section className="relative w-full h-[280px] sm:h-[350px] md:h-[500px] overflow-hidden">
            <Carousel autoplay effect="fade" dots={{ className: "custom-dots" }}>
                {banners.map((banner, index) => (
                    <div key={index} className="relative w-full h-[280px] sm:h-[350px] md:h-[500px]">
                        {/* Ảnh banner */}
                        <img
                            src={banner.src}
                            alt={banner.title}
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay nội dung */}
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4 sm:px-8">
                            <h2
                                className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 animate-[fadeInUp_0.8s_ease-out]"
                            >
                                {banner.title}
                            </h2>
                            <p
                                className="text-xs sm:text-sm md:text-lg mb-5 md:mb-6 animate-[fadeInUp_1s_ease-out]"
                            >
                                {banner.desc}
                            </p>
                            <Button
                                size="large"
                                className="bg-yellow-400 text-[#0B4F6C] font-semibold border-none hover:bg-yellow-300 rounded-lg px-5 sm:px-7 py-2 text-sm sm:text-base animate-[fadeInUp_1.2s_ease-out]"
                            >
                                Xem ngay
                            </Button>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* CSS cho hiệu ứng dots */}
            <style jsx global>{`
                .custom-dots li button {
                    background-color: white !important;
                    opacity: 0.5;
                }
                .custom-dots li.slick-active button {
                    background-color: #facc15 !important; /* vàng */
                    opacity: 1;
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </section>
    );
}
