import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 md:px-6">
      <ol className="flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
        <li>
          <Link href="/" className="hover:text-primary transition-colors font-medium">
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronRight size={14} />
        </li>
        <li aria-current="page" className="text-foreground font-bold">
          {current}
        </li>
      </ol>
    </nav>
  );
}