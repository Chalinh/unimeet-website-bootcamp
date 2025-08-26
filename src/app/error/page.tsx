"use client"

import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  return (
    <div>
      <p>Sorry, something went wrong</p>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
