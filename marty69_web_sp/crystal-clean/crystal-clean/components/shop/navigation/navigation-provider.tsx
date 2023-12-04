"use client";

import { Category, useEshopNavigation } from "../data/navigation";
import DesktopNavigation from "./layout/desktop-navigation";
import MobileNavigationPopup from "./layout/mobile-navigation-popup";

import type { User } from "next-auth";

type Props = {
  readonly children?: any;
  readonly user?: User;
  readonly categories: Category[];
};

export default function NavigationProvider({
  children,
  user,
  categories,
}: Readonly<Props>) {
  const getNavigation = useEshopNavigation(categories);

  return (
    <div>
      <MobileNavigationPopup navigation={getNavigation} />
      <DesktopNavigation user={user} navigation={getNavigation} />
      {children}
    </div>
  );
}
