import type { ComponentPropsWithoutRef } from "react";

export function PaperCard({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`paper-card ${className}`} {...props} />;
}
