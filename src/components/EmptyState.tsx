import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Inbox } from 'lucide-react';
import UploadDialog from '@/components/dialogs/UploadDialog';

interface EmptyStateProps {
  type: 'documents' | 'requests';
  onCreateClick?: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type, onCreateClick }) => {
  const isDocuments = type === 'documents';
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-6">
        {isDocuments ? (
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <FileText className="w-12 h-12 text-gray-400" />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <Inbox className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      
      <h3 className="text-xl font-medium text-gray-900 mb-2">
        {isDocuments ? 'Нет документов' : 'Нет запросов'}
      </h3>
      
      <p className="text-gray-500 text-center mb-6 max-w-md">
        {isDocuments 
          ? 'У вас пока нет загруженных документов. Создайте первый документ, чтобы начать работу.'
          : 'У вас пока нет запросов. Создайте первый запрос, чтобы отправить документ на подпись.'
        }
      </p>
      
      {isDocuments ? (
        <UploadDialog onSuccess={onCreateClick}>
          <Button className="bg-[#FEF7FF] text-gray-900 hover:bg-[#F3E8F9]">
            Создать документ
          </Button>
        </UploadDialog>
      ) : (
        onCreateClick && (
          <Button onClick={onCreateClick} className="bg-[#FEF7FF] text-gray-900 hover:bg-[#F3E8F9]">
            Создать запрос
          </Button>
        )
      )}
    </div>
  );
};

export default EmptyState; 