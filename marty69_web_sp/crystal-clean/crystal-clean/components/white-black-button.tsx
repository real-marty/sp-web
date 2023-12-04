import Link from "next/link";
import clsx from "clsx";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type BaseButtonProps = {
  invert?: boolean;
  href?: string;
  children: ReactNode;
};

type ButtonElementProps = ButtonHTMLAttributes<HTMLButtonElement>;
type LinkElementProps = AnchorHTMLAttributes<HTMLAnchorElement>;

type ButtonProps = BaseButtonProps & (ButtonElementProps | LinkElementProps);

export function Button({
  invert,
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  className = clsx(
    className,
    "inline-block rounded-md px-8 py-3 font-medium transition",
    invert
      ? "bg-white text-zinc-950 hover:bg-zinc-700 hover:text-white"
      : "bg-zinc-950 text-white hover:bg-zinc-800",
  );

  let inner = <span className="relative top-px">{children}</span>;

  if (href) {
    const linkProps = props as LinkElementProps;
    return (
      <Link href={href} className={className} {...linkProps}>
        {inner}
      </Link>
    );
  }
  // inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100
  const buttonProps = props as ButtonElementProps;
  return (
    <button className={className} {...buttonProps}>
      {inner}
    </button>
  );
}
