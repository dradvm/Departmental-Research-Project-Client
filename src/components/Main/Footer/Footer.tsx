import React from "react";
import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  {
    title: "Udemy Business",
    links: [
      { label: "Teach on Udemy", href: "#" },
      { label: "Get the app", href: "#" },
      { label: "About us", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
  {
    title: "Careers",
    links: [
      { label: "Blog", href: "#" },
      { label: "Help and Support", href: "#" },
      { label: "Affiliate", href: "#" },
      { label: "Investors", href: "#" },
    ],
  },
  {
    title: "Terms",
    links: [
      { label: "Privacy policy", href: "#" },
      { label: "Sitemap", href: "#" },
      { label: "Accessibility statement", href: "#" },
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
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={34}
            style={{ marginBottom: 16 }}
          />
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
        © {new Date().getFullYear()} Udemy, Inc.
      </div>
    </footer>
  );
}
