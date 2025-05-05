"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpRight, Hospital, MailOpen } from "lucide-react";
import Link from "next/link";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";

const list = [
  {
    id: 1,
    title: "Запрос на больничный",
    name: "Бек Бекович"
  },
  {
    id: 2,
    title: "Запрос на больничный",
    name: "Бек Бекович"
  },
  {
    id: 3,
    title: "Запрос на больничный",
    name: "Бек Бекович"
  },
]

const templates = [
  {
    title: "Запрос о больничном",
    type: "health",
  },
  {
    title: "Запрос о больничном",
    type: "health",
  },
  {
    title: "Запрос о больничном",
    type: "health",
  }
]

const RequestsPage = () => {
  // const [isRequestCreated, setIsRequestCreated] = useState(false);


  const handleCreateRequest = () => {
    // Handle request creation logic here
    console.log("Request Created");
    // setIsRequestCreated(true);
  };
  return (
    <div className={"flex w-full flex-col p-5"}>

      <div className={"w-full flex items-center justify-between"}>
        <h2 className={"text-2xl font-medium py-3 leading-10 tracking-normal"}>Запросы</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className={"gap-1 rounded-full flex items-center"}>
              Создать запрос <ArrowUpRight/>
            </Button>
          </DialogTrigger>

          <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded p-8 w-full max-w-md">
              <DialogTitle className={"text-2xl font-bold my-3"}>Создание запроса</DialogTitle>
              <DialogContent>
                <p>
                  Создать запрос по шаблону:
                </p>
                <div className={"flex flex-wrap gap-1 my-3"}>
                  {
                    templates.map((item, idx) => (
                      <div key={idx} className={" rounded-lg flex items-center p-3 justify-center bg-[#F7F2FA] gap-3"}>
                        <div className={"flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#FFCDD4]"}>
                          <Hospital width={16} height={16}/>
                        </div>
                        <h3 className={"font-semibold text-xs"}>{item.title}</h3>
                      </div>
                    ))
                  }
                </div>
                <p>
                  Пожалуйста, введите все необходимые данные для создания запроса:
                </p>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    placeholder="Название запроса"
                    className="border px-3 py-2 rounded w-full"
                  />
                  <textarea
                    placeholder="Описание запроса"
                    className="border px-3 py-2 rounded w-full"
                  />
                </div>
              </DialogContent>
              <div className="flex flex-col gap-4 mt-6">
                <DialogClose asChild>
                  <Button className="w-full" onClick={handleCreateRequest}>
                    Создать
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
      <div className={"w-full flex flex-col gap-3"}>
        {
          list.map((item, idx) => {
            return <div key={idx}
                        className={"p-3 w-full rounded-[20px] flex items-center bg-[#FEF7FF] justify-between hover:outline-1 hover:outline-[#79747E]/30"}>
              <div className={"flex gap-2 items-center"}>
                <div className={"bg-center bg-contain bg-no-repeat rounded-md w-[114px] h-[64px]"}
                     style={{
                       "backgroundImage": `url("imgs/card_thumbnail.png")`,
                       backgroundSize: "cover",
                     }}>
                </div>
                <div className={"flex flex-col"}>
                  <h3 className={"text-lg font-medium"}>{item.title}</h3>
                  <p className={"text-md"}>{item.name}</p>
                </div>
              </div>
              <Link href={`/requests/${item.id}`}>
                <Button variant={"outline"} className={"gap-1 rounded-full"}>Открыть <MailOpen/></Button>
              </Link>
            </div>
          })
        }
      </div>
    </div>
  );
};

export default RequestsPage;