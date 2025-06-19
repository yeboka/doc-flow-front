// app/requests/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { ArrowUpRight, MailOpen, Send, Inbox, Plus } from "lucide-react";
import { fetchDocuments } from "@/lib/slices/documentsSlice";
import { fetchUsersInCompany } from "@/lib/slices/companySlice";
import { RootState } from "@/lib/store";
import { createRequest, fetchRequests } from "@/lib/slices/requestsSlice";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-200 text-yellow-800",
  SIGNED: "bg-green-200 text-green-800",
  DECLINED: "bg-red-200 text-red-800",
};

const RequestsPage = () => {
  const dispatch = useDispatch();
  const {data: userProfile} = useSelector((state: RootState) => state.profile);
  const {
    data: documents,
    loading: documentsLoading,
    error: documentsError
  } = useSelector((state: RootState) => state.documents);
  const {users, loading: usersLoading, error: usersError} = useSelector((state: RootState) => state.company);
  const {requests, loading: requestsLoading, error: requestsError} = useSelector((state: RootState) => state.requests);

  const [newRequestData, setNewRequestData] = useState({
    title: "",
    description: "",
  });
  const [selectedUserId, setSelectedUserId] = useState<number | string>("");
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | string>("");
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  useEffect(() => {
    if (userProfile?.company?.id) {
      dispatch(fetchDocuments() as any);
      dispatch(fetchUsersInCompany(userProfile?.company?.id) as any);
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    if (userProfile?.id) {
      dispatch(fetchRequests(userProfile?.id) as any);
    }
  }, [userProfile?.id, dispatch]);

  const handleCreateRequest = () => {
    if (!newRequestData.title || !newRequestData.description || !selectedUserId || !selectedDocumentId) {
      alert("Заполните все поля");
      return;
    }

    dispatch(
      createRequest({
        senderId: userProfile?.id,
        receiverId: selectedUserId as number,
        documentId: selectedDocumentId as number,
      }) as any
    ).then(() => {
      // Очищаем форму после создания
      setNewRequestData({ title: "", description: "" });
      setSelectedUserId("");
      setSelectedDocumentId("");
      setShowCreateDialog(false);
      // Обновляем список запросов
      if (userProfile?.id) {
        dispatch(fetchRequests(userProfile.id) as any);
      }
    });
  };

  const handleCreateRequestClick = () => {
    setShowCreateDialog(true);
  };

  if (documentsLoading || usersLoading || requestsLoading) return <p>Загрузка...</p>;
  if (documentsError || usersError || requestsError) return <p
    className="text-red-500">{documentsError || usersError || requestsError}</p>;

  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-medium py-3 leading-10 tracking-normal">Запросы</h2>
        <Button 
          variant="outline" 
          className="gap-1 rounded-full flex items-center"
          onClick={handleCreateRequestClick}
        >
          Создать запрос <ArrowUpRight/>
        </Button>
      </div>

      {requests && requests.length > 0 ? (
        <div className="w-full flex flex-col gap-3">
          {requests.map((item: any, idx) => {
            const isSender = item.sender?.id === userProfile?.id;
            return (
              <div
                key={idx}
                className="p-3 w-full rounded-[20px] flex items-center bg-[#FEF7FF] justify-between hover:outline-1 hover:outline-[#79747E]/30"
              >
                <div className="flex flex-1 gap-3 items-center">
                  <div
                    className={`p-2 rounded-full ${isSender ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                    {isSender ? <Send size={18}/> : <Inbox size={18}/>}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium">{item.document?.title}</h3>
                    <p className="text-md">{item.sender?.firstName} {item.sender?.lastName}</p>
                  </div>
                </div>
                <span
                  className={`mt-1 text-xs w-fit px-2 py-1 rounded ${statusColors[item.status] || 'bg-gray-200 text-gray-800'}`}
                >
                  {item.status}
                </span>
                <Link href={`/requests/${item.id}`} className={"flex-1 flex justify-end"}>
                  <Button variant="outline" className="gap-1 rounded-full">
                    Открыть <MailOpen/>
                  </Button>
                </Link>
              </div>
            );
          })}
          
          {/* Кнопка создания запроса в списке */}
          <div className="p-3 w-full rounded-[20px] flex items-center bg-[#FEF7FF] justify-center hover:outline-1 hover:outline-[#79747E]/30 cursor-pointer"
               onClick={handleCreateRequestClick}>
            <div className="flex items-center gap-2 text-gray-500">
              <Plus className="w-5 h-5" />
              <span>Создать новый запрос</span>
            </div>
          </div>
        </div>
      ) : (
        <EmptyState type="requests" onCreateClick={handleCreateRequestClick} />
      )}

      {/* Dialog для создания запроса */}
      {showCreateDialog && (
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
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
                  onChange={(e) => setNewRequestData({...newRequestData, title: e.target.value})}
                />
                <textarea
                  placeholder="Описание запроса"
                  className="border px-3 py-2 rounded w-full"
                  value={newRequestData.description}
                  onChange={(e) => setNewRequestData({...newRequestData, description: e.target.value})}
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
      )}
    </div>
  );
};

export default RequestsPage;
