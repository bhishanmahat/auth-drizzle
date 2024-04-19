// "use client";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
  } from "@/components/ui/card";
  import { Backbutton } from "./back-button";
  import { Social } from "./social";
  
  import { cn } from "@/lib/utils";
  import { Poppins } from "next/font/google";
  
  import { Lock } from "lucide-react";
  
  const poppins = Poppins({
    subsets: ["latin"],
    weight: ["600"],
  });
  
  type CardWrapperProps = {
    children: React.ReactNode;
    cardTitle: string;
    cardDescription: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
  };
  
  export const CardWrapper = ({
    children,
    cardTitle,
    cardDescription,
    backButtonLabel,
    backButtonHref,
    showSocial,
  }: CardWrapperProps) => {
    return (
      <Card className="w-[400px] shadow-md">
        <CardHeader className="text-center space-y-4">
          <CardTitle className={cn("text-3xl", poppins.className)}>
            <Lock size="20" className="inline mr-2"/>
            <span>{cardTitle}</span>
          </CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {showSocial && (
          <CardFooter>
            <Social />
          </CardFooter>
        )}
        <CardFooter>
          <Backbutton label={backButtonLabel} href={backButtonHref} />
        </CardFooter>
      </Card>
    );
  };
  