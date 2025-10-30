"use client";

import Image from "next/image";
import { Card, Button, Row, Col, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

export default function ServiceSelection() {
    const services = [
        {
            id: 1,
            title: "Lấy mẫu xét nghiệm tại nhà",
            desc: "Giúp khách hàng chủ động tầm soát bệnh lý, tiết kiệm thời gian đi lại và nhận kết quả nhanh chóng với chi phí hợp lý.",
            img: "/images/service1.jpg",
        },
        {
            id: 2,
            title: "Đặt lịch thăm khám tại MEDLATEC",
            desc: "Đặt lịch khám tại cơ sở của MEDLATEC giúp chủ động thời gian, tránh chờ đợi và hạn chế tiếp xúc nơi đông người.",
            img: "/images/service2.jpg",
        },
    ];

    return (
        <div className="w-full bg-gradient-to-br from-[#1089d4] to-[#1c9fe8] p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl overflow-hidden">
            <Row gutter={[32, 32]} align="middle">
                {/* Cột trái */}
                <Col xs={24} md={14}>
                    <div className="text-white space-y-3 text-center md:text-left">
                        <Title level={2} className="!text-white !mb-2 font-bold">
                            Lựa chọn dịch vụ
                        </Title>
                        <Text className="!text-blue-100 text-base">npm install @ant-design/icons@5.x --save
                            Quý khách vui lòng chọn dịch vụ y tế phù hợp với nhu cầu của mình.
                        </Text>
                    </div>

                    <div className="flex flex-col gap-6 mt-8">
                        {services.map((s, i) => (
                            <motion.div
                                key={s.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.15 }}
                            >
                                <Card
                                    hoverable
                                    className="rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border-none bg-white"
                                    styles={{
                                        body: {
                                            padding: "20px",
                                            textAlign: "center",
                                        },
                                    }}
                                >
                                    {/* Hình ảnh */}
                                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-lg overflow-hidden group">
                                        <Image
                                            src={s.img}
                                            alt={s.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Nội dung */}
                                    <div className="flex flex-col justify-between flex-1">
                                        <div>
                                            <Title
                                                level={5}
                                                className="!mb-1 !text-gray-800 font-semibold"
                                            >
                                                {s.title}
                                            </Title>
                                            <Paragraph className="!text-gray-500 !text-[15px] !mb-0">
                                                {s.desc}
                                            </Paragraph>
                                        </div>
                                        <div className="flex justify-end mt-3">
                                            <Button
                                                type="primary"
                                                size="middle"
                                                className="bg-[#1089d4] hover:bg-[#0c74b4] rounded-md px-5 py-1 font-medium transition-all duration-300"
                                            >
                                                Đặt lịch
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </Col>

                {/* Cột phải (ẩn trên mobile) */}
                <Col xs={0} md={10}>
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative h-[380px] md:h-[480px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <Image
                            src="/images/doctor.jpg"
                            alt="Doctor"
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                </Col>
            </Row>
        </div>
    );
}
