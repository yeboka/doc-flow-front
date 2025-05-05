import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import DocumentCard from "@/components/DocumentCard";
import RequestCard from "@/components/RequestCard";
import Link from "next/link";

const documents = [
  {
    id: 1,
    title: "Title",
    subtitle: "subtitle"
  },
  {
    id: 2,
    title: "Title",
    subtitle: "subtitle"
  }, {
    id: 3,
    title: "Title",
    subtitle: "subtitle"
  },
]

const requests = [
  {
    id: 1,
    title: "Запрос на больничный",
    subtitle: "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.",
    user: {
      username: "Username",
      role: "role",
    }
  },
  {
    id: 2,
    title: "Запрос на больничный",
    subtitle: "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.",
    user: {
      username: "Username",
      role: "role",
    }
  }, {
    id: 3,
    title: "Запрос на больничный",
    subtitle: "A dialog is a type of modal window that appears in front of app content to provide critical information, or prompt for a decision to be made.",
    user: {
      username: "Username",
      role: "role",
    }
  },
]

export default function Home() {
  return (
    <main className={"w-[1000px] flex-1"}>
      <header className={"flex items-center justify-between p-5"}>
        <SidebarTrigger/>
        <Button variant={"outline"} className={"bg-[#FEF7FF]"}>Создать запрос</Button>
      </header>
      <section className={" flex flex-col p-5"}>
        <h2 className={"text-2xl font-medium py-3 leading-10 tracking-normal"}>Недавние документы</h2>
        <div className={"w-full flex flex-wrap gap-[25px] items-center"}>
          {
            documents.map((item) => (
              <DocumentCard key={item.id} title={item.title} subtitle={item.subtitle}/>
            ))
          }
          <Link href={"/docs"}>
            <Button variant={"outline"} className={"bg-[#FEF7FF] font-normal"}>Показать больше</Button>
          </Link>
        </div>
      </section>
      <section className={"w-full flex flex-col p-5 gap-3"}>
        <h2 className={"text-2xl font-medium py-3 leading-10 tracking-normal"}>Новые запросы</h2>
        <div className={"w-full flex gap-[25px] items-center"}>
          {
            requests.map((item) => (
              <RequestCard key={item.id} title={item.title} subtitle={item.subtitle} user={item.user}/>
            ))
          }
        </div>
        <Link href={"/requests"}>
          <Button variant={"outline"} className={"bg-[#FEF7FF] font-normal w-fit"}>Показать больше</Button>
        </Link>
      </section>
    </main>
  );
}
