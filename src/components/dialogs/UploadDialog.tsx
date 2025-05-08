"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@radix-ui/react-dialog";
import { FileText, UploadCloud, X } from "lucide-react"; // Добавили иконку X для закрытия
import { toast } from "sonner";
import API from "@/lib/axios";
import { fetchDocuments } from "@/lib/slices/documentsSlice";
import { useAppDispatch } from "@/lib/hooks";

export default function UploadDialog({ onSuccess }: { onSuccess?: () => void }) {
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file || !title) {
      toast.error("Заполните название и выберите файл");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("file", file);

      await API.post("/documents/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Документ успешно загружен");
      dispatch(fetchDocuments())
      setFile(null);
      setTitle("");
      onSuccess?.();
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при загрузке документа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-1 rounded-full flex items-center">
          <UploadCloud className="w-5 h-5" />
          Загрузить документ
        </Button>
      </DialogTrigger>

      <DialogContent
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        onClick={(e) => e.stopPropagation()} // Чтобы предотвратить закрытие при клике внутри окна
      >
        <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-lg space-y-4">
          <div className="">
            <DialogClose className={"cursor-pointer border rounded-full w-7 h-7 flex items-center justify-center"} asChild>
              <Button variant="ghost" className="text-black-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </Button>
            </DialogClose>
          </div>

          <DialogTitle className="text-xl font-semibold text-center mb-1">Загрузка документа</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 text-center">
            Укажите название и выберите документ, который хотите загрузить.
          </DialogDescription>

          <div className="space-y-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Название</span>
              <input
                type="text"
                placeholder="Например: Резюме, Договор..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#685DFF]"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-gray-700">Файл</span>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                className="sr-only"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
              >
                <UploadCloud className="w-5 h-5 text-[#685DFF]" />
                <span className="text-sm text-gray-600">Выберите файл</span>
              </label>
            </label>

            {file && (
              <div className="flex items-center gap-3 p-3 mt-2 border rounded-md bg-gray-50 text-sm text-gray-700">
                <FileText className="text-[#685DFF]" />
                <span className="truncate">{file.name}</span>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <DialogClose asChild>
              <Button
                className="w-full"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? "Загрузка..." : "Загрузить"}
              </Button>
            </DialogClose>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
