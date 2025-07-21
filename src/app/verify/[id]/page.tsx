"use client";

import { useParams } from "next/navigation";
import Verify from "components/Auth/verify";

export default function VerifyPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : ""; // fallback nếu undefined

  return <Verify id={id} />;
}
