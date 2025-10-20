import Link from "next/link";
import { PlusIcon, SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
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

type EntitySearchProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const EntitySearch = ({
  value,
  onChange,
  placeholder = "Search"
}: EntitySearchProps) => (
  <div className="relative ml-auto">
    <SearchIcon size={16} className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground" />
    <Input
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      className="max-w-[200px] pl-8 border-border shadow-none bg-background"
    />
  </div>
);

type EntityPaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
}

export const EntityPagination = ({
  page,
  totalPages,
  onPageChange,
  disabled = false,
}: EntityPaginationProps) => (
  <div className="flex justify-between items-center gap-x-2 w-full">
    <div className="flex-1 text-sm text-muted-foreground">
      Page {page} of {totalPages || 1}
    </div>
    <div className="flex justify-end items-center space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1 || disabled}
        onClick={() => onPageChange(Math.max(1, page - 1))}
      >
        Prev
      </Button>
      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages || totalPages === 0 || disabled}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
      >
        Next
      </Button>
    </div>
  </div>
);
