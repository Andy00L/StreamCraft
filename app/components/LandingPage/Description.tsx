import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Description() {
  return (
    <div className="sm:flex sm:flex-col sm:align-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-logo font-bold mt-0 text-center">
        AI-powered video creation at scale
      </div>
      <p className="text-center text-lg sm:text-xl mt-4">
        Transform your idea/brand into a professional-grade video,
        <br /> regardless of your experience level.
      </p>
      <div className="text-center mt-5 MB-6 flex items-center justify-center ">
        <Button>
          <Link href="/home">Get started for free</Link>
        </Button>
      </div>
    </div>
  );
}
