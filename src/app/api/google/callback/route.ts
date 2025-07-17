// pages/api/google/callback.ts (hoặc tương đương nếu dùng app router)

import { NextRequest, NextResponse } from "next/server";

export function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect("/error");
  }

  const html = `
    <html>
      <body>
        <script>
          window.opener.postMessage({ code: "${code}" }, window.opener.origin);
          window.close();
        </script>
      </body>
    </html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
