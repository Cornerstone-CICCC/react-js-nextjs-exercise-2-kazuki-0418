"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // モーダルが開いているときにスクロールを無効化
    document.body.style.overflow = "hidden";

    // Escape キーでモーダルを閉じる
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.push("/users");
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [router]);

  // URLが /users に変わったらモーダルを表示しない
  useEffect(() => {
    if (pathname === "/users") {
      document.body.style.overflow = "unset";
    }
  }, [pathname]);

  // URLが /users の場合はモーダルを表示しない
  if (pathname === "/users") {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    // モーダルの背景をクリックしたときに閉じる
    if (e.target === e.currentTarget) {
      router.push("/users");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      {children}
    </div>
  );
}
