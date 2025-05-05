"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Loader2, PaperclipIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

interface InputComponentProps {
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({ handleSubmit, input, setInput, file, setFile, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <div className="flex items-end gap-2">
        <div className="flex-1 bg-white border rounded-lg overflow-hidden flex flex-col">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your document..."
            className="min-h-[80px] border-0 focus-visible:ring-0 resize-none"
          />

          <div className="p-2 border-t flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label className="cursor-pointer">
                <Input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setFile(e.target.files[0]);
                    }
                  }}
                />
                <div className="p-1.5 rounded-md hover:bg-gray-100">
                  <PaperclipIcon className="h-5 w-5 text-gray-500" />
                </div>
              </label>
              {file && (
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setFile(null)}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>

            <Button type="submit" size="sm" disabled={isLoading || (!input.trim() && !file)} className={"bg-[#9B4DFF]"}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!input.trim() && !file) return;

    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      file: file ? file.name : undefined,
    };

    setMessages((prev: any[]) => [...prev, userMessage]);


    // Prepare form data to send to backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("prompt", input);
    setInput("");
    setFile(null);
    setIsLoading(true);
    // Call the backend API
    try {
      const response = await fetch("http://localhost:8080/documents/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyze document");
      }

      const data = await response.json();
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: "",
        role: "assistant",
        analysis: data.analysis,
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (error) {
      console.error("Error during API call:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 pt-16">
      <div className={"w-full p-1 flex justify-center"}>
        <div className={"container"}>
          <div
            className={"rounded-full border-1 flex items-center justify-center w-fit h-8 p-2 cursor-pointer hover:border-[#76557A] hover:bg-[#76557A]/20 "}
            onClick={() => {
              if (window !== undefined) {
                history.back();
              }
            }}
          >
            <ArrowLeft className={"h-5 w-5"}/> Назад
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-8">
              <div className="max-w-md">
                <h1 className="text-2xl font-bold mb-2">Document Analyzer</h1>
                <p className="text-gray-500">
                  Upload a document and ask questions to get an analysis of its strengths, weaknesses, and suggestions
                  for improvement.
                </p>
              </div>
              <div className={"w-full"}>
                <InputComponent handleSubmit={handleSubmit} input={input} setInput={setInput} file={file}
                                setFile={setFile} isLoading={isLoading}/>
              </div>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id}
                   className={cn("max-w-3xl mx-auto w-full", message.role === "user" ? "flex justify-end" : "flex justify-start")}>
                <div
                  className={cn(
                    "rounded-lg p-4 max-w-[80%]",
                    message.role === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200"
                  )}
                >
                  <p>{message.content}</p>
                  {message.file && (
                    <div className="mt-2 p-2 bg-black/10 rounded flex items-center gap-2 text-sm">
                      <PaperclipIcon size={14}/>
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
                <Loader2 className="h-4 w-4 animate-spin text-gray-500"/>
                <p className="text-sm text-gray-500">Печатает...</p>
              </div>
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <div className="border-t p-4">
            <InputComponent handleSubmit={handleSubmit} input={input} setInput={setInput} file={file} setFile={setFile}
                            isLoading={isLoading}/>
          </div>
        )}
      </div>
    </div>
  );
}
