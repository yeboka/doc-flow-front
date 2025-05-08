"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@radix-ui/react-dialog";
import { toast } from "sonner";
import API from "@/lib/axios";

const DeleteDocumentDialog = ({ documentId, onSuccess }: { documentId: number|string; onSuccess: () => void }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await API.delete(`/documents/${documentId}`, {
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${localStorage.getItem("doc-flow-access-token")}`,
        },
      });
      toast.success("Документ успешно удалён");
      onSuccess(); // обновить список или выполнить действия после удаления
    } catch (err) {
      toast.error("Ошибка при удалении документа");
      console.error("Error deleting document:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-[#FFB8B8] text-[#FF5959]">
          Удалить
        </Button>
      </DialogTrigger>

      <DialogContent
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6"
        onClick={(e) => e.stopPropagation()} // предотвращаем закрытие при клике внутри окна
      >
        <div className="bg-white rounded-xl p-8 w-full max-w-lg space-y-4">
          <DialogClose className={"cursor-pointer border rounded-full w-7 h-7 flex items-center justify-center"} asChild>
            <Button
              variant="ghost"
              className=" text-gray-500 hover:text-gray-700"
            >
              X
            </Button>
          </DialogClose>
          <DialogTitle className="text-xl font-semibold text-center">Удаление документа</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 text-center">
            Вы уверены, что хотите удалить этот документ?
          </DialogDescription>
          <div className="flex gap-4 justify-center">
            <DialogClose asChild>
              <Button
                className="w-48"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Удаление..." : "Да, удалить"}
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="ghost" className="w-48">
                Отменить
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDocumentDialog;
