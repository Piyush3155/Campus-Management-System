"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AIChat } from "@/components/ai/ai-chat";
import Image from "next/image";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full p-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-transparent border-0"
          size="icon"
        >
          <Image
            src="/cms.png"
            alt="AI Assistant"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl h-[600px] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>AI Assistant</DialogTitle>
        </DialogHeader>
        <div className="relative h-full">
{/*           <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button> */}
          <AIChat />
        </div>
      </DialogContent>
    </Dialog>
  );
}