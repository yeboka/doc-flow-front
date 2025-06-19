"use client";
import React, { useEffect } from 'react';
import DocumentCard from "@/components/DocumentCard";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchDocuments } from "@/lib/slices/documentsSlice";
import UploadDialog from "@/components/dialogs/UploadDialog";
import DocumentCardSkeleton from "@/components/skeletons/DocumentCardSkeleton";
import EmptyState from "@/components/EmptyState";

const DocsPage = () => {
  const dispatch = useAppDispatch();
  const { data: documents, loading, error } = useAppSelector((state) => state.documents);

  useEffect(() => {
    dispatch(fetchDocuments());
  }, [dispatch]);

  const handleCreateDocument = () => {
    // UploadDialog уже имеет свой собственный Dialog, поэтому просто показываем его
    // Кнопка создания будет открывать диалог через UploadDialog
  };

  // If loading, display skeletons
  if (loading) {
    return (
      <div className="flex flex-col p-5">
        <div className="w-full flex justify-between items-center my-5">
          <h2 className="text-2xl font-medium py-3 leading-10 tracking-normal">Твои документы</h2>
          <UploadDialog />
        </div>
        <div className="w-full flex flex-wrap gap-3">
          <DocumentCardSkeleton />
          <DocumentCardSkeleton />
          <DocumentCardSkeleton />
        </div>
      </div>
    );
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex w-full flex-col p-5">
      <div className="w-full flex justify-between items-center my-5">
        <h2 className="text-2xl font-medium py-3 leading-10 tracking-normal">Твои документы</h2>
        <UploadDialog />
      </div>
      
      {documents && documents.length > 0 ? (
        <div className="w-full flex flex-wrap gap-3">
          {/* Map through documents and display each in DocumentCard */}
          {documents.map((item) => (
            <DocumentCard
              key={item.id}
              id={item.id}
              title={item.title}
              fileUrl={item.file_url}
            />
          ))}
          {/* Кнопка создания документа в списке */}
          {/* <CreateDocumentButton onSuccess={() => dispatch(fetchDocuments())} /> */}
        </div>
      ) : (
        <EmptyState type="documents" onCreateClick={handleCreateDocument} />
      )}
    </div>
  );
};

export default DocsPage;
