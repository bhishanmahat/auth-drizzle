import { Button } from "@/components/ui/button";
import Link from "next/link";

type BackButtonProps = {
  href: string;
  label: string;
};

export const Backbutton = ({ href, label }: BackButtonProps) => {
    return (
        <Button variant="link" className="font-normal w-full" asChild>
            <Link href={href}>{label}</Link>
        </Button>
    )
};
