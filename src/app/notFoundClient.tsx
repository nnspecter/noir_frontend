"use client";

import { useRouter } from "next/navigation";

export default function NotFoundClient() {
  const router = useRouter();

  return (
      <div className="container" style={{ alignItems: "center" }}>
        <p className="medFont1">
          Ошибка 404 — Страница не найдена
        </p>

        <button onClick={() => router.push("/login")} style={{background: "#454545", color: "#fff"  }}>
          На главную
        </button>
      </div>
  );
}