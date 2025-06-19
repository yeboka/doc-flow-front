// app/requests/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { signRequest, declineRequest, fetchRequests } from '@/lib/slices/requestsSlice';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { DocumentViewer } from 'react-documents';
import { fetchUserProfile } from '@/lib/slices/profileSlice';
import { fetchDocuments } from '@/lib/slices/documentsSlice';
import { fetchUsersInCompany } from '@/lib/slices/companySlice';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-200 text-yellow-800',
  SIGNED: 'bg-green-200 text-green-800',
  DECLINED: 'bg-red-200 text-red-800',
};

const RequestDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: userProfile } = useSelector((state: RootState) => state.profile);
  const { requests } = useSelector((state: RootState) => state.requests);
  const [request, setRequest] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchUserProfile() as any);
  }, []);

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

  useEffect(() => {
    const found = requests.find((r: any) => r.id == id);
    if (found) setRequest(found);
  }, [requests, id]);

  const handleSign = () => {
    dispatch(signRequest({ requestId: request.id, userId: userProfile.id }) as any);
  };

  const handleDecline = () => {
    dispatch(declineRequest({ requestId: request.id }) as any);
  };

  if (!request) return <p>Загрузка...</p>;

  return (
    <div className="w-full p-5 space-y-6">
      <div
        className="inline-flex items-center gap-2 cursor-pointer text-sm text-blue-600"
        onClick={() => history.back()}
      >
        <ArrowLeft size={18} /> Назад
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4">Информация о запросе</h2>
        <p><strong>Документ:</strong> {request.document?.title}</p>
        <p><strong>Статус:</strong> <span className={`px-2 py-1 rounded ${statusColors[request.status] || 'bg-gray-200 text-gray-800'}`}>{request.status}</span></p>
        <p><strong>Отправитель:</strong> {request.sender?.firstName} {request.sender?.lastName}</p>
        <p><strong>Получатель:</strong> {request.receiver?.firstName} {request.receiver?.lastName}</p>
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-3">Документ</h3>
        <div className="w-full h-[500px]">
          <DocumentViewer
            url={request.document?.file_url}
            viewer="url"
            className="w-full h-full"
          />
        </div>
        <a
          href={request.document?.file_url}
          target="_blank"
          className="text-blue-500 underline mt-3 inline-block"
        >
          Скачать документ
        </a>
      </div>

      {request.status === 'PENDING' && request.receiver?.id === userProfile?.id && (
        <div className="flex gap-4">
          <Button onClick={handleSign} className="bg-green-600 text-white">
            Подписать документ
          </Button>
          <Button onClick={handleDecline} className="bg-red-500 text-white">
            Отклонить запрос
          </Button>
        </div>
      )}
    </div>
  );
};

export default RequestDetailPage;
