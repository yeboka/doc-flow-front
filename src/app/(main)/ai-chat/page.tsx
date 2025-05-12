"use client";
import React from 'react';
import ChatComponent from "@/components/ChatComponent";

const Page = () => {
  return (
    <div className={"w-full"}>
      <ChatComponent isBackBtnShown={false}/>
    </div>
);
};

export default Page;