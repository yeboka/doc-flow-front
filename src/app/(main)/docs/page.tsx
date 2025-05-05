"use client";
import React, { useEffect, useState } from 'react';
import DocumentCard from "@/components/DocumentCard";
import API from "@/lib/axios";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Import axios instance
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@radix-ui/react-dialog";


const DocsPage = () => {
  const [documents, setDocuments] = useState<any[]>([]); // Store the documents
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error state
  const [file, setFile] = useState<File | null>(null);

  // Function to fetch documents
  const fetchDocuments = async () => {
    try {
      const response = await API.get("/documents/user"); // Replace with actual API endpoint
      setDocuments(response.data); // Assuming response contains documents in `data`
    } catch (error: any) {
      setError("Failed to load documents");
      console.error("Error fetching documents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments(); // Fetch documents when the component mounts
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
  };

  const handleUpload = () => {
    // Handle file upload logic here
    if (file) {
      console.log("Uploading file:", file);
    }
  };

  // If loading, display a loading spinner
  if (loading) {
    return <div>Loading documents...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={"flex w-full flex-col p-5"}>
      <div className={"w-full flex justify-between items-center my-5"}>
        <h2 className={"text-2xl font-medium py-3 leading-10 tracking-normal"}>Твои документы</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className={"gap-1 rounded-full flex items-center"}>
              Загрузить документ <ArrowUpRight />
            </Button>
          </DialogTrigger>

          {/* Modal Dialog */}
          <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded p-8 w-full max-w-md">
              <DialogTitle>Загрузка документа</DialogTitle>
              <DialogDescription>
                Пожалуйста, выберите файл для загрузки:
                <div className="mt-4 space-y-4">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="border px-3 py-2 rounded w-full"
                  />
                  {file && (
                    <p className="mt-2 text-sm text-gray-700">
                      Вы выбрали файл: <strong>{file.name}</strong>
                    </p>
                  )}
                </div>
              </DialogDescription>
              <div className="flex gap-4 mt-6">
                <DialogClose asChild>
                  <Button className="w-full" onClick={handleUpload}>
                    Загрузить
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
      <div className={"w-full flex flex-wrap gap-3"}>
        {/* Map through documents and display each in DocumentCard */}
        {documents.map((item) => (
          <DocumentCard
            key={item.id}
            title={item.title}
            fileUrl={item.file_url}
            subtitle={item.subtitle}
          />
        ))}

      </div>
    </div>
  );
};

export default DocsPage;
