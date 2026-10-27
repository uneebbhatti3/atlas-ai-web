import { cn } from "cn";
import Image from "next/image";

interface LogoMarkProps {
  className?: string;
}

/** The Atlas app-icon tile. Decorative: it always sits next to the "Atlas AI" wordmark. */
export function LogoMark({ className }: LogoMarkProps) {
  return (
    <Image src={"/logo.svg"} alt="Atlas AI" width={35} height={35} className={cn(className)} />
  );
}
