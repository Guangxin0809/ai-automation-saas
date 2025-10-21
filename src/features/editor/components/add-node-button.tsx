
"use client"

import { memo } from "react";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export const AddNodeButton = memo(() => {
  return (
    <Button
      size="icon"
      variant="outline"
      onClick={() => {}}
      className="bg-background"
    >
      <PlusIcon />
    </Button>
  );
});

AddNodeButton.displayName = "AddNodeButton";
