"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import styles from "./NotFound.module.scss"
import { MountAnimation } from "@/shared/animations/MountAnimation";
export const NotFoundClient = () => {
  const router = useRouter();

  return (
    <MountAnimation>
        <div className={styles.container} style={{ alignItems: "center" }}>
            <p className="medFont0">
                Ошибка 404 — Страница не найдена
            </p>

            <Button onClick={() => router.push("/login")} style={{background: "#454545", color: "#fff"  }}>
                На главную
            </Button>
        </div>
    </MountAnimation>
  );
}

