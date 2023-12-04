import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

type BaseLogoProps = {
  logoText: string;
  seo: string;
};

type LinkElementProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  className?: string;
};

type LogoProps = BaseLogoProps & LinkElementProps;

export function Logo({ logoText, seo, className, ...props }: LogoProps) {
  return (
    <Link href="/" {...props} className={className}>
      <span className="sr-only">{seo}</span>
      <h1>{logoText}</h1>
    </Link>
  );
}
