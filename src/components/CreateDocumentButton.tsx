import React from 'react';
import { Plus } from "lucide-react";
import UploadDialog from "@/components/dialogs/UploadDialog";

interface CreateDocumentButtonProps {
  onSuccess?: () => void;
}

const CreateDocumentButton: React.FC<CreateDocumentButtonProps> = ({ onSuccess }) => {
  return (
    <UploadDialog onSuccess={onSuccess}>
      <div className="w-[285px] h-[200px] border-2 border-dashed border-gray-300 rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Plus className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-gray-500 text-sm">Создать документ</p>
        </div>
      </div>
    </UploadDialog>
  );
};

export default CreateDocumentButton; 