import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  icon: LucideIcon;
  onClick: () => void;
  className?: string;
};

export function ButtonWithIcon({ icon: Icon, className = "", onClick }: Props) {
  return (
    <button
      className={cn("h-8 w-8 cursor-pointer", className)}
      onClick={onClick}
    >
      <Icon className="h-full w-full" />
    </button>
  );
}
