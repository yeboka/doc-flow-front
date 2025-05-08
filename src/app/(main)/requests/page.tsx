"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { ArrowUpRight, MailOpen } from "lucide-react";
import { fetchDocuments } from "@/lib/slices/documentsSlice";
import { fetchUsersInCompany } from "@/lib/slices/companySlice";
import { RootState } from "@/lib/store";
import { createRequest, fetchRequests } from "@/lib/slices/requestsSlice";
import Link from "next/link";

const RequestsPage = () => {
  const dispatch = useDispatch();
  const { data: userProfile } = useSelector((state: RootState) => state.profile);
  const { data: documents, loading: documentsLoading, error: documentsError } = useSelector((state: RootState) => state.documents);
  const { users, loading: usersLoading, error: usersError } = useSelector((state: RootState) => state.company);
  const { requests, loading: requestsLoading, error: requestsError } = useSelector((state: RootState) => state.requests);

  const [newRequestData, setNewRequestData] = useState({
    title: "",
    description: "",
  });
  const [selectedUserId, setSelectedUserId] = useState<number | string>("");
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | string>("");

  useEffect(() => {
    console.log(userProfile?.company?.id)
    if (userProfile?.company?.id) {
      dispatch(fetchDocuments() as any);
      dispatch(fetchUsersInCompany(userProfile?.company?.id) as any);
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(fetchRequests(userProfile?.id) as any); // Загружаем запросы для текущего пользователя
    }
  }, [userProfile?.id, dispatch]);

  useEffect(() => {
    console.log(requests)
  }, [requests]);
  const handleCreateRequest = () => {
    if (!newRequestData.title || !newRequestData.description || !selectedUserId || !selectedDocumentId) {
      alert("Заполните все поля");
      return;
    }

    dispatch(createRequest({ senderId: userProfile?.id, receiverId: selectedUserId as number, documentId: selectedDocumentId as number}) as any);
  };

  if (documentsLoading || usersLoading || requestsLoading) return <p>Загрузка...</p>;
  if (documentsError || usersError || requestsError) return <p className="text-red-500">{documentsError || usersError || requestsError}</p>;

  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-medium py-3 leading-10 tracking-normal">Запросы</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-1 rounded-full flex items-center">
              Создать запрос <ArrowUpRight />
            </Button>
          </DialogTrigger>

          <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded p-8 w-full max-w-md">
              <DialogTitle className="text-2xl font-bold my-3">Создание запроса</DialogTitle>
              <DialogDescription>
                Пожалуйста, введите все необходимые данные для создания запроса:
              </DialogDescription>

              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Название запроса"
                  className="border px-3 py-2 rounded w-full"
                  value={newRequestData.title}
                  onChange={(e) => setNewRequestData({ ...newRequestData, title: e.target.value })}
                />
                <textarea
                  placeholder="Описание запроса"
                  className="border px-3 py-2 rounded w-full"
                  value={newRequestData.description}
                  onChange={(e) => setNewRequestData({ ...newRequestData, description: e.target.value })}
                />

                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">Выберите сотрудника</option>
                  {users.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>

                <select
                  value={selectedDocumentId}
                  onChange={(e) => setSelectedDocumentId(e.target.value)}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="">Выберите документ</option>
                  {documents?.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <DialogClose asChild>
                  <Button className="w-full" onClick={handleCreateRequest}>
                    Создать
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button variant="ghost" className="w-full">
                    Отменить
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-full flex flex-col gap-3">
        {requests && requests.map((item: any, idx) => (
          <div key={idx} className="p-3 w-full rounded-[20px] flex items-center bg-[#FEF7FF] justify-between hover:outline-1 hover:outline-[#79747E]/30">
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <h3 className="text-lg font-medium">{item.document?.title}</h3>
                <p className="text-md">{item.sender?.firstName} {item.sender?.lastName}</p>
              </div>
            </div>
            <Link href={`/requests/${item.id}`}>
              <Button variant="outline" className="gap-1 rounded-full">
                Открыть <MailOpen />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsPage;
