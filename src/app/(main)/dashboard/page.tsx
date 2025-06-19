"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import DocumentCard from "@/components/DocumentCard";
import RequestCard from "@/components/RequestCard";
import Link from "next/link";
import API from "@/lib/axios";
import { toast } from "sonner";
import DocumentCardSkeleton from "@/components/skeletons/DocumentCardSkeleton";
import { fetchRequests } from "@/lib/slices/requestsSlice";
import { RootState } from "@/lib/store";
import { Plus } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const { data: userProfile } = useSelector((state: RootState) => state.profile);
  const { requests, loading: requestsLoading, error: requestsError } = useSelector((state: RootState) => state.requests);
  
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(fetchRequests(userProfile.id) as any);
    }
  }, [userProfile?.id, dispatch]);

  // Получаем первые 3 запроса
  const recentRequests = requests ? requests.slice(0, 3) : [];

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
          {requestsLoading ? (
            <div className="text-gray-500 italic">Загрузка запросов...</div>
          ) : requestsError ? (
            <div className="text-red-500 italic">{requestsError}</div>
          ) : recentRequests.length > 0 ? (
            recentRequests.map((request: any) => (
              <RequestCard 
                key={request.id}
                id={request.id}
                title={request.document?.title || "Без названия"} 
                subtitle={`От: ${request.sender?.firstName} ${request.sender?.lastName}`} 
                user={{
                  username: request.sender?.firstName + " " + request.sender?.lastName,
                  role: request.sender?.role || "Сотрудник",
                  avatarImg: request.sender?.avatarImg
                }} 
              />
            ))
          ) : (
            <div className="text-gray-500 italic">Нет новых запросов</div>
          )}
        </div>
        {requests && requests.length > 3 && (
          <Link href="/requests">
            <Button variant={"outline"} className="bg-[#FEF7FF] font-normal w-fit">Показать больше</Button>
          </Link>
        )}
      </section>
    </main>
  );
}
