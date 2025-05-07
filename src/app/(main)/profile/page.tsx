"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Copy, HousePlus, LogIn, LogOut } from "lucide-react";
import API from "@/lib/axios";
import { Roles } from "@/lib/roles";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger
} from "@radix-ui/react-dialog";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { toast } from "sonner";

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [joinCode, setJoinCode] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyDescription, setCompanyDescription] = useState<string>("");

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

  const handleLogout = () => {
    localStorage.removeItem("doc-flow-access-token");
    window.location.href = "/login";
  };

  const createCompany = async () => {
    try {
      await API.post("/company/create", {
        name: companyName,
        description: companyDescription,
      });
      await fetchUserProfile();
    } catch (error: any) {
      setError("Error creating company.");
      console.error("Error creating company", error);
    }
  };

  const joinCompany = async () => {
    try {
      await API.post(`/company/${joinCode}/join`);
      toast.success("Successfully joined the company!");
      await fetchUserProfile(); // Refresh profile to get new company info
    } catch (error: any) {
      toast.error("Неправильный код или что то пошло не так")
      console.error("Error joining company", error);
    }
  };

  const handleCopyToClipboard = () => {
    const joinCode = userProfile?.company?.joinCode.toUpperCase();
    console.log(joinCode)
    if (joinCode) {
      navigator.clipboard.writeText(joinCode)
        .then(() => {
          toast.success("Код скопирован", {
          })
        })
        .catch((err) => {
          console.error("Error copying text: ", err);
        });
    }
  };

  const handleLeaveCompany = async () => {
    try {
      await API.post(`/company/${userProfile.company.id}/leave`);
      await fetchUserProfile();
    } catch (error) {
      console.error("Error leaving company:", error);
      toast.error("Ошибка при выходе из компании");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="w-full flex flex-col gap-y-5 p-5">
      {/* USER INFO */}
      <div className="w-full flex justify-between">
        <div className={"flex gap-5 items-center"}>
          <SidebarTrigger/>

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
                {Roles[userProfile?.role as keyof typeof Roles]}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-5">
          <Button variant="outline" className="bg-[#FEF7FF] font-normal w-fit" onClick={handleLogout}>
            Выйти <LogOut />
          </Button>
        </div>
      </div>

      <div className={"flex flex-wrap gap-8"}>
        {/* COMPANY INFO */}
        {userProfile.company ? (
          <div className="border p-4 rounded-xl h-fit min-w-sm shadow bg-white flex-1 space-y-3">
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

            <div className={"w-full flex items-center justify-between"}>
              <div>
                 Код компании:
                <div className={"p-2 rounded-md flex items-end justify-center gap-5 border border-[#] hover:bg-[#FEF7FF]"}>
                  {userProfile.company.joinCode.toUpperCase()}
                  <Copy width={20} height={20} className={"cursor-pointer"} onClick={handleCopyToClipboard}/>
                </div>
              </div>
              <Button variant="outline" className="bg-[#FFDDDD]/30 text-red-500" onClick={handleLeaveCompany}>
                Покинуть компанию
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* NO COMPANY - JOIN OR CREATE */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="border hover:border-[#685DFF] text-center min-w-xs cursor-pointer p-4 rounded-xl shadow bg-white flex flex-col items-center justify-center text-[#685DFF] space-y-5 flex-1">
                  <LogIn className={"w-10 h-10"} />
                  <h4 className="text-md font-semibold mb-2">Присоединиться к компании</h4>
                </div>
              </DialogTrigger>
              <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl p-8 w-full max-w-md  flex flex-col items-center">
                  <DialogTitle><strong>Присоединение к компании</strong></DialogTitle>
                  <DialogDescription>
                    Введите код компании для присоединения:
                    <input
                      type="text"
                      placeholder="Введите код компании"
                      className="border px-3 py-2 rounded w-full"
                      value={joinCode}
                      onChange={(e) => setJoinCode(e.target.value)}
                    />
                    <Button className="mt-2 w-full" onClick={joinCompany}>Отправить заявку</Button>
                  </DialogDescription>
                  <DialogClose asChild>
                    <Button className="mt-2 w-full" variant={"ghost"}>Закрыть</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <div className="border hover:border-[#685DFF] text-center min-w-xs cursor-pointer p-4 rounded-xl shadow bg-white flex flex-col items-center justify-center text-[#685DFF] space-y-5 flex-1">
                  <HousePlus className={"w-10 h-10"} />
                  <h4 className="text-md font-semibold mb-2">Создать свою компанию</h4>
                </div>
              </DialogTrigger>
              <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-xl p-8 w-full max-w-md flex flex-col items-center">
                  <DialogTitle><strong>Создание компании</strong></DialogTitle>
                  <DialogDescription>
                    Введите название и описание компании:
                    <input
                      type="text"
                      placeholder="Название компании"
                      className="border px-3 py-2 rounded w-full mb-2"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <textarea
                      placeholder="Описание"
                      className="border px-3 py-2 rounded w-full"
                      value={companyDescription}
                      onChange={(e) => setCompanyDescription(e.target.value)}
                    />
                    <Button className="mt-2 w-full" onClick={createCompany}>Создать</Button>
                  </DialogDescription>
                  <DialogClose asChild>
                    <Button className="mt-2 w-full" variant={"ghost"}>Закрыть</Button>
                  </DialogClose>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
