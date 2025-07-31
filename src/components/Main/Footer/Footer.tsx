import React from "react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Về EduMarket",
    links: [
      { label: "Giảng dạy trên EduMarket", href: "#" },
      { label: "Tải ứng dụng", href: "#" },
      { label: "Giới thiệu", href: "#" },
      { label: "Liên hệ", href: "#" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Blog", href: "#" },
      { label: "Trợ giúp", href: "#" },
      { label: "Cộng tác viên", href: "#" },
      { label: "Nhà đầu tư", href: "#" },
    ],
  },
  {
    title: "Pháp lý",
    links: [
      { label: "Chính sách bảo mật", href: "#" },
      { label: "Sơ đồ trang", href: "#" },
      { label: "Tuyên bố truy cập", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{ background: "#1c1d1f", color: "#fff", padding: "40px 0 20px" }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "0 24px",
        }}
      >
        <div style={{ flex: "1 1 200px", marginBottom: 24 }}>
          <div style={{ fontSize: 24, fontWeight: "bold", color: "#fff" }}>
            EduMarket
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flex: "3 1 600px",
            gap: 48,
            flexWrap: "wrap",
          }}
        >
          {footerLinks.map((section, idx) => (
            <div key={idx} style={{ minWidth: 150, marginBottom: 24 }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>
                {section.title}
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link, i) => (
                  <li key={i} style={{ marginBottom: 8 }}>
                    <Link
                      href={link.href}
                      style={{
                        color: "#fff",
                        textDecoration: "none",
                        fontSize: 15,
                      }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #393939",
          marginTop: 32,
          paddingTop: 16,
          textAlign: "center",
          fontSize: 14,
          color: "#b2b2b2",
        }}
      >
        © {new Date().getFullYear()} EduMarket. Đã đăng ký bản quyền.
      </div>
    </footer>
  );
}
