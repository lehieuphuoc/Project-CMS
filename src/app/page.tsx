"use client";

import React from "react";
import Image from "next/image";
import "@/app/globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Banner from "@/components/Banmer";
import BannerSection from "@/components/BannerSection";
import NewsIntroBanner from "@/components/NewsIntroBanner";
import ServiceSelection from "@/components/ServiceSelection";

export default function HomePage() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="min-h-screen bg-gray-50">
        {/* Banner Hero */}
        <section className="relative">
          <Banner />
        </section>

        {/* Banner Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <BannerSection />
        </section>

        {/* News Intro Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <NewsIntroBanner />
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <ServiceSelection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
