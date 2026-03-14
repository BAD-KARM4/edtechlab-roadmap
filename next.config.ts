import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/edtechlab-roadmap",
  images: {
    unoptimized: true,        // отключаем оптимизацию изображений
  },
};

export default nextConfig;
