import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

import { Button } from "@/components/ui/moving-border";
import { LockIcon } from "lucide-react";
import { LoginButton } from "@/components/auth/login-button";

export default function Home() {
  return (
    <main className="h-full flex items-center justify-center dark:bg-black bg-white dark:bg-dot-white/[0.30] bg-dot-black/[0.30] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-medium drop-shadow-md",
            poppins.className
          )}
        >
          <LockIcon size="40" className="inline mr-4" />
          Auth
        </h1>
        <p className="text-xl text-muted-foreground">
          A simple and secure authentication service
        </p>
        <div>
          <LoginButton>
            <Button
              containerClassName="h-12 w-32"
              className="text-lg font-medium"
            >
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
