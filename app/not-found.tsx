import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Secret Not Found</h2>
      <p className="text-muted-foreground mb-6">
        The secret you are looking for may have already been viewed or expired.
      </p>
      <Button asChild variant="outline" size="lg">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
