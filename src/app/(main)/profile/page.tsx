"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HousePlus, LogIn, LogOut, UserRoundPlus, UserRoundX } from "lucide-react";
import API from "@/lib/axios";
import { Roles } from "@/lib/roles";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog";

const requests = [
  // example requests, can be fetched from API as well
  {
    id: 1,
    company: {
      id: 1,
      name: "SOme Company",
    },
    user: {
      name: "Adil Adilov",
    },
    status: 'approved',
  },
  {
    id: 2,
    company: {
      id: 1,
      name: "Other Company",
    },
    user: {
      name: "Adil Adilov",
    },
    status: 'rejected',
  },
  {
    id: 3,
    company: {
      id: 1,
      name: "New Company",
    },
    user: {
      name: "Adil Adilov",
    },
    status: 'pending',
  }
]

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchUserProfile = async () => {
    try {
      const response = await API.get("/profile");
      setUserProfile(response.data);
    } catch (error: any) {
      setError("Failed to load profile");
      console.error("Error fetching user profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doc-flow-access-token");
    window.location.href = "/login";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col gap-y-5 p-5">
      {/* USER INFO */}
      <div className="w-full flex justify-between">
        <div className="flex items-center gap-5">
          <Avatar>
            <AvatarImage src={userProfile?.avatar || ""} alt={userProfile?.username} />
            <AvatarFallback>{userProfile?.firstName?.[0]?.toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1 cursor-pointer">
            <h3 className="text-lg font-[500] leading-6 tracking-tight">
              {userProfile?.firstName} {userProfile?.lastName}
            </h3>
            <p className="text-sm font-normal leading-5 tracking-tight">
              {Roles[userProfile?.role as keyof typeof Roles]} {/* Type assertion */}
            </p>
          </div>
        </div>
        <div className="flex gap-5">
          <Button variant="outline" className="bg-[#FEF7FF] font-normal w-fit" onClick={handleLogout}>
            Выйти <LogOut />
          </Button>
        </div>
      </div>

      <div className={"flex gap-8"}>
        {/* COMPANY INFO */}
        {userProfile.company ? (
          <div className="border p-4 rounded-xl h-fit shadow bg-white flex-1 space-y-3">
            <h4 className="text-md font-semibold">Ваша компания</h4>
            <Image src={"/imgs/card_thumbnail.png"} alt={"Logo"} className="object-cover rounded-lg w-full h-42"
                   width={300}
                   height={100} />
            <p className="text-ld font-bold text-gray-700 mt-1">
              {userProfile.company.name}
            </p>
            <p className="text-sm text-gray-600">
              {userProfile.company.description}
            </p>
          </div>
        ) : (
          <>
            {/* NO COMPANY - JOIN OR CREATE */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="border hover:border-[#685DFF] cursor-pointer p-4 rounded-xl shadow bg-white flex flex-col items-center justify-center text-[#685DFF] space-y-5 flex-1">
                  <LogIn className={"w-10 h-10"} />
                  <h4 className="text-md font-semibold mb-2">Присоединиться к компании</h4>
                </div>
              </DialogTrigger>
              <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl p-8 w-full max-w-md  flex flex-col items-center">
                  <DialogTitle><strong>Присоединение к компании</strong></DialogTitle>
                  <DialogDescription>
                    Введите код компании для присоединения:
                    <input type="text" placeholder="Введите код компании" className="border px-3 py-2 rounded w-full" />
                    <Button className="mt-2 w-full">Отправить заявку</Button>
                  </DialogDescription>
                  <DialogClose asChild>
                    <Button className="mt-2 w-full" variant={"ghost"}>Закрыть</Button>
                  </DialogClose>
                </div>

              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="border hover:border-[#685DFF] cursor-pointer p-4 rounded-xl shadow bg-white flex flex-col items-center justify-center text-[#685DFF] space-y-5 flex-1">
                  <HousePlus className={"w-10 h-10"} />
                  <h4 className="text-md font-semibold mb-2">Создать свою компанию</h4>
                </div>
              </DialogTrigger>
              <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl p-8 w-full max-w-md flex flex-col items-center">
                  <DialogTitle><strong>Создание компании</strong></DialogTitle>
                  <DialogDescription>
                    Введите название и описание компании:
                    <input type="text" placeholder="Название компании" className="border px-3 py-2 rounded w-full mb-2" />
                    <textarea placeholder="Описание" className="border px-3 py-2 rounded w-full" />
                    <Button className="mt-2 w-full">Создать</Button>
                  </DialogDescription>
                  <DialogClose asChild>
                    <Button className="mt-2 w-full" variant={"ghost"}>Закрыть</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}

        {/* JOIN REQUESTS */}
        {requests?.length > 0 && (
          <div className=" flex-1">
            <h4 className="text-md font-semibold mb-2 border rounded-xl shadow p-4 bg-white">Ваши заявки на вступление</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 ">
              {requests.map((req: any) => (
                <li key={req.id} className={"flex items-center justify-between hover:rounded-xl p-4 hover:bg-gray-300/50 "}>
                  <h3 className={"text-md"}>
                    В компанию <strong>{req.company.name}</strong>
                  </h3>
                  <p>от {req.user.name}</p>
                  <div className={"flex gap-4"}>
                    <div className={"p-2 w-8 h-8 rounded-full border flex items-center justify-center bg-white cursor-pointer"}>
                      <UserRoundPlus color={"green"} className={"w-6 h-6"} />
                    </div>
                    <div className={"p-2 rounded-full w-8 h-8 border flex items-center justify-center bg-white cursor-pointer"}>
                      <UserRoundX color={"red"} className={"w-6 h-6"} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
