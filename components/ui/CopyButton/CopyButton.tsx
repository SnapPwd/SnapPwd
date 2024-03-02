"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function CopyButton({ text }: { text: string }) {
  const [buttonText, setButtonText] = useState<string>("Copy");

  const copy = (text: string) => {
    window.navigator.clipboard.writeText(text);
    setButtonText("Copied!");
    setTimeout(() => {
      setButtonText("Copy");
    }, 1000);
  };

  return (
    <Button
      className="text-white w-24 bg-black hover:bg-gray-600"
      onClick={() => copy(text)}
    >
      {buttonText}
    </Button>
  );
}
