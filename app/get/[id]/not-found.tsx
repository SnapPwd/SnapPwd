import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-6">
      <h2 className="text-2xl font-bold mb-4">Secret Not Found</h2>
      <p className="text-gray-600 mb-6">
        The secret you are looking for may have already been viewed or expired.
      </p>
      <Button asChild variant="outline">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
