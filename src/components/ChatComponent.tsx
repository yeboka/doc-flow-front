// components/ChatComponent.tsx

import { useState } from "react";
import InputComponent from "./InputComponent";
import { ArrowLeft, Loader2, PaperclipIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  file?: string;
  analysis?: string;
}

interface ChatComponentProps {
  isBackBtnShown?: boolean;
}

const ChatComponent: React.FC<ChatComponentProps> = ({isBackBtnShown = true}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() && !file) return;

    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      file: file ? file.name : undefined,
    };

    setMessages((prev: any) => [...prev, userMessage]);

    const formData = new FormData();
    formData.append("file", file!);
    formData.append("prompt", input);
    setInput("");
    setFile(null);
    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const response = await fetch(`${baseUrl}/documents/analyze`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to analyze document");

      const data = await response.json();
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        analysis: data.analysis,
      };

      setMessages((prev: any) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={"flex flex-col pt-16 h-screen"}>
      {isBackBtnShown && <div className="w-full p-1 flex justify-center">
        <div className="container">
          <div
            className="rounded-full border-1 flex items-center justify-center w-fit h-8 p-2 cursor-pointer hover:border-[#76557A] hover:bg-[#76557A]/20"
            onClick={() => {
              if (window !== undefined) {
                history.back();
              }
            }}
          >
            <ArrowLeft className="h-5 w-5"/> Назад
          </div>
        </div>
      </div>}
      <div className="flex flex-2 flex-col max-h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className=" flex flex-col items-center justify-center text-center gap-8">
              <div className="max-w-md">
                <h1 className="text-2xl font-bold mb-2">Document Analyzer</h1>
                <p className="text-gray-500">
                  Upload a document and ask questions to get an analysis of its strengths, weaknesses, and suggestions for improvement.
                </p>
              </div>
              <div className="w-full">
                <InputComponent
                  handleSubmit={handleSubmit}
                  input={input}
                  setInput={setInput}
                  file={file}
                  setFile={setFile}
                  isLoading={isLoading}
                />
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-3xl mx-auto w-full ${message.role === "user" ? "flex justify-end" : "flex justify-start"}`}
              >
                <div
                  className={`rounded-lg p-4 max-w-[80%] ${
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                  }`}
                >
                  <p>{message.content}</p>
                  {message.file && (
                    <div className="mt-2 p-2 bg-black/10 rounded flex items-center gap-2 text-sm">
                      <PaperclipIcon size={14} />
                      {message.file}
                    </div>
                  )}
                  {message.analysis && (
                    <div className="bg-white-50 rounded-md p-3">
                      <ReactMarkdown>{message.analysis}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="max-w-3xl mx-auto w-full flex">
              <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
                <p className="text-sm text-gray-500">Печатает...</p>
              </div>
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t p-4">
            <InputComponent
              handleSubmit={handleSubmit}
              input={input}
              setInput={setInput}
              file={file}
              setFile={setFile}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;
