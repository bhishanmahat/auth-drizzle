import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

import { Button } from "@/components/ui/button";
import { LockIcon } from "lucide-react";
import { LoginButton } from "@/components/ui/auth/login-button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center dark:bg-black bg-white">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-medium drop-shadow-md",
            poppins.className
          )}
        >
          {/* <Fingerprint color="#38bdf8" size="40" className="inline mr-4" /> */}
          <LockIcon size="40" className="inline mr-4" />
          Auth
        </h1>
        <p className="text-xl text-muted-foreground">
          A simple and secure authentication service
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
