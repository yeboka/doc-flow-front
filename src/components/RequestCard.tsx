import React from 'react';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface RequestCardProps {
  title: string,
  subtitle: string,
  user: {
    username: string,
    role: string,
    avatarImg?: string,
  }
}

const RequestCard: React.FC<RequestCardProps> = ({subtitle, title, user}) => {
  return (
    <div className={"flex flex-col bg-[#ECE6F0]  w-[285px] gap-y-3 rounded-[12px] p-[24px] overflow-clip shadow"}>
      <h3 className={"text-xl font-normal leading-6 tracking-tight"}>{title}</h3>
      <p className={"text-sm font-normal text-[#49454F] leading-5 tracking-tight"}>{subtitle}</p>
      <div className={"flex items-center gap-3"}>
        <Avatar>
          <AvatarImage src={user.avatarImg} alt="@shadcn"/>
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div className={"flex flex-col flex-1 cursor-pointer"}>
          <h3 className={"text-lg font-medium leading-6 tracking-tight"}>{user.username}</h3>
          <p className={"text-sm font-normal leading-5 tracking-tight"}>{user.role}</p>
        </div>
      </div>
      <div className={"w-full flex justify-end mt-2"}>
        <Button variant={"ghost"}>
          Перейти к запросу
          <Image src={"icons/arrow_icon.svg"} alt={"options"} width={24} height={24}/>
        </Button>
      </div>
    </div>
  );
};

export default RequestCard;