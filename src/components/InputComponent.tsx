// components/InputComponent.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaperclipIcon, Send } from "lucide-react";
import { Loader2 } from "lucide-react";

interface InputComponentProps {
  handleSubmit: (e: React.FormEvent) => void;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  isLoading: boolean;
}

const InputComponent: React.FC<InputComponentProps> = ({
                                                         handleSubmit,
                                                         input,
                                                         setInput,
                                                         file,
                                                         setFile,
                                                         isLoading,
                                                       }) => {
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

            <Button
              type="submit"
              size="sm"
              disabled={isLoading || (!input.trim() && !file)}
              className="bg-[#9B4DFF]"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InputComponent;
