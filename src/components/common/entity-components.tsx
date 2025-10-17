import Link from "next/link";
import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type EntityHeaderProps = {
  title: string;
  newButtonLabel: string;
  description?: string;
  disabled?: boolean;
  isCreating?: boolean;
} & (
  | { onNew: () => void; newButtonHref?: never; }
  | { newButtonHref: string; onNew?: never; }
  | { onNew?: never; newButtonHref?: never; }
);

export const EntityHeader = ({
  title,
  description,
  newButtonHref,
  newButtonLabel,
  disabled,
  isCreating,
  onNew,
}: EntityHeaderProps) => (
  <div className="flex flex-row justify-between items-center gap-x-4">
    <div className="flex flex-col">
      <h1 className="font-semibold text-lg md:text-xl">{title}</h1>
      {description && (
        <p className="text-xs md:text-sm text-muted-foreground">{description}</p>
      )}
    </div>

    {onNew && !newButtonHref && (
      <Button
        size="sm"
        disabled={isCreating || disabled}
        onClick={onNew}
      >
        <PlusIcon size={16} />
        {newButtonLabel}
      </Button>
    )}

    {newButtonHref && !onNew && (
      <Button size="sm" asChild>
        <Link href={newButtonHref} prefetch>
          <PlusIcon size={16} />
          {newButtonLabel}
        </Link>
      </Button>
    )}
  </div>
);

type EntityContainerProps = {
  children?: React.ReactNode;
  header?: React.ReactNode;
  search?: React.ReactNode;
  pagination?: React.ReactNode;
}

export const EntityContainer = ({
  children,
  header,
  search,
  pagination
}: EntityContainerProps) => (
  <div className="h-full px-4 md:px-10 md:py-6">
    <div className="flex flex-col gap-y-8 w-full max-w-screen-xl h-full mx-auto">
      {header}
      <div className="flex flex-col gap-y-4 h-full">
        {search}
        {children}
      </div>
      {pagination}
    </div>
  </div>
);
