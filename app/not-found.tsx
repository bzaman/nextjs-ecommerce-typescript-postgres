import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import LogoSvg from "@/components/ui/logo-svg";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container min-h-svh flex flex-col items-center justify-center">
      <div className="mb-2">
        <LogoSvg title={APP_NAME} size={150} />
      </div>

      <div className="rounded-md shadow-md text-center p-6 w-full md:w-1/3">
        <h1 className="font-bold text-3xl mb-4">Not Found</h1>
        <p className="text-destructive mb-4">Could not find requested page</p>
        <Button variant="outline" asChild>
          <Link className="text-inherit" href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
}
