// app/login/page.tsx
"use client";
import { AuthForm } from "@/components/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Импортируем useRouter
import React, { useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const router = useRouter(); // Хук для перехода
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Состояние для ошибок

  const handleLogin = async (data: { email: string; password: string }) => {
    setErrorMessage(null); // Сбрасываем сообщение об ошибке при новом запросе
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok && result.accessToken != undefined) {
        // Успешный логин
        console.log("Login successful:", result);
        localStorage.setItem("doc-flow-access-token", result.accessToken); // Сохраняем токен в localStorage
        localStorage.setItem("doc-flow-refresh-token", result.refreshToken); // Сохраняем токен в localStorage
        router.push("/profile"); // Перенаправление на главную страницу
      } else {
        // Если ошибка, отображаем ее
        setErrorMessage(result.message || "Ошибка входа"); // Устанавливаем ошибку
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      setErrorMessage("Произошла ошибка при входе. Попробуйте позже.");
    }
  };

  return (
    <div className="flex  w-full ">
      <div className={"h-screen flex-1 flex flex-col items-center justify-center bg-[#FEF7FF] text-[#76557A]"}>
        <h1 className={"text-[64px] font-bold"}>Doc Flow</h1>
        <Image src={"/imgs/login_page_illustration.png"} alt={"Login to DOC FLOW"} width={500} height={300}/>
      </div>
      <div className={"p-5 h-screen flex-1 flex flex-col items-center justify-center"}>
        <div className={"w-[300px]"}>
          <Link className={"rounded-full border-1 flex items-center justify-center w-8 h-8 border-[#76557A] hover:bg-[#76557A]/20 "} href={"/"}>
            <ArrowLeft className={"h-5 w-5"}/>
          </Link>
        </div>
        <h1 className="text-2xl mb-4">Войти</h1>
        <AuthForm mode="login" onSubmit={handleLogin} />
        {errorMessage && (
          <div className="mt-4 text-red-500 text-sm">{errorMessage}</div> // Ошибка отображается под формой
        )}
        <Link href={"/register"} className={"mt-3 hover:underline text-black/70"}>Зарегистрироваться</Link>
      </div>
    </div>
  );
}
