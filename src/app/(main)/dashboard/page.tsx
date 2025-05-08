"use client";

import React, { useEffect, useState } from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import DocumentCard from "@/components/DocumentCard";
import RequestCard from "@/components/RequestCard";
import Link from "next/link";
import API from "@/lib/axios";
import { toast } from "sonner";
import DocumentCardSkeleton from "@/components/skeletons/DocumentCardSkeleton";

export default function Home() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const requests = [
    {
      id: 1,
      title: "Запрос на больничный",
      subtitle: "A dialog is a type of modal window...",
      user: { username: "Username", role: "role" }
    },
    // ... другие запросы
  ];

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await API.get("/documents/user/last/3");
        setDocuments(response.data);
      } catch (err) {
        console.error("Ошибка загрузки документов:", err);
        toast.error("Не удалось загрузить документы");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  return (
    <main className="w-[1000px] flex-1">
      <header className="flex items-center justify-between p-5">
        <SidebarTrigger />
        <Button variant={"outline"} className="bg-[#FEF7FF]">Создать запрос</Button>
      </header>

      <section className="flex flex-col p-5">
        <h2 className="text-2xl font-medium py-3">Недавние документы</h2>
        <div className="w-full flex flex-wrap gap-[25px] items-center">
          {loading ? (
            <>
              <DocumentCardSkeleton />
              <DocumentCardSkeleton />
              <DocumentCardSkeleton />
            </>
          ) : documents.length > 0 ? (
            documents.map((doc: any) => (
              <DocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                fileUrl={doc.file_url}
              />
            ))
          ) : (
            <div className="text-gray-500 italic">Нет доступных документов</div>
          )}
          <Link href="/docs">
            <Button variant={"outline"} className="bg-[#FEF7FF] font-normal">Показать больше</Button>
          </Link>
        </div>
      </section>

      <section className="w-full flex flex-col p-5 gap-3">
        <h2 className="text-2xl font-medium py-3">Новые запросы</h2>
        <div className="w-full flex gap-[25px] items-center">
          {requests.map((item) => (
            <RequestCard key={item.id} title={item.title} subtitle={item.subtitle} user={item.user} />
          ))}
        </div>
        <Link href="/requests">
          <Button variant={"outline"} className="bg-[#FEF7FF] font-normal w-fit">Показать больше</Button>
        </Link>
      </section>
    </main>
  );
}
