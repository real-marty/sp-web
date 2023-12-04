import { usePathname } from "next/navigation";

import {
  GlobeEuropeAfricaIcon,
  AdjustmentsHorizontalIcon,
  BanknotesIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";

export type AdminBreadCrumbType = {
  name: string;
  href: string;
  current: boolean;
};

export type PathConfig = {
  [key: string]: string;
};

export const useAdminBreadCrumb = (): AdminBreadCrumbType[] => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");

  const navigation: AdminBreadCrumbType[] = [];

  // Configuration for specific paths.
  const pathConfig: PathConfig = {
    "/admin/product": "Služby - Produkty",
    "/admin/product/new": "Přidat novou službu - produkt",
    "/admin/category": "Záložka - Kategorie",
    "/admin/category/new": "Přidat novou kategorii",
    "/admin/specification": "Záložka - Zacílení",
    "/admin/specification/new": "Přidat nové zacílení",
    "/admin/color": "Záložka - Barva",
    "/admin/color/new": "Přidat novou barvu",
    "/admin/size": "Záložka - Velikost",
    "/admin/size/new": "Přidat novou velikost",
    "/admin/feature": "Záložka - Vlastnost",
    "/admin/feature/new": "Přidat novou vlatsnost",
    "/admin/faq": "FAQ",
    "/admin/faq/new": "Přidat novou FAQ",
    "/admin/messages": "Zprávy od uživatelů",
    "/admin/team": "Super uživatelé",
  };
  const knownStaticSegments = [
    "admin",
    "category",
    "feature",
    "faq",
    "new",
    "color",
    "size",
    "specification",
    "product",
  ];

  const isDynamicSegment = (segment: string) => {
    return (
      !knownStaticSegments.includes(segment) && !pathConfig[`/admin/${segment}`]
    );
  };

  // Function to build the navigation structure based on the current path.
  const buildNavigation = (pathSegments: string[]) => {
    let currentPath = "";

    for (const segment of pathSegments) {
      if (segment) {
        currentPath += `/${segment}`;
        if (pathConfig[currentPath]) {
          navigation.push({
            name: pathConfig[currentPath],
            href: currentPath,
            current: pathname === currentPath,
          });
        } else if (isDynamicSegment(segment)) {
          // Handle dynamic segment.
          navigation.push({
            name: `Editace: ${segment}`,
            href: currentPath,
            current: pathname === currentPath,
          });
        }
      }
    }
  };
  buildNavigation(pathSegments);
  return navigation;
};

export const useAdminTeamSubNavigation = () => {
  const pathname = usePathname();
  const navigation = [
    {
      name: "",
      href: "/admin/team",
      current: pathname === "/admin/team",
    },
    {
      name: "Editace: " + pathname.split("/").pop(),
      href: "/admin/team/" + pathname.split("/").pop(),
      current: pathname === "/admin/team/" + pathname.split("/").pop(),
    },
  ];

  if (pathname === "/admin/team" || pathname === "/admin/team/add") {
    navigation.pop();
  }

  return navigation;
};

export const useAdminNavigation = () => {
  const pathname = usePathname();

  return [
    {
      name: "Hlavní stránka",
      href: "/admin",
      icon: GlobeEuropeAfricaIcon,
      current: pathname === "/admin",
    },
    {
      name: "Objednávky",
      href: "/admin/orders",
      icon: BanknotesIcon,
      current: pathname === "/admin/orders",
    },
    {
      name: "Služby - Produkty",
      href: "/admin/product",
      icon: AdjustmentsHorizontalIcon,
      current: pathname === "/admin/product",
    },
    {
      name: "FAQ",
      href: "/admin/faq",
      icon: QuestionMarkCircleIcon,
      current: pathname === "/admin/faq",
    },
    {
      name: "Zprávy od uživatelů",
      href: "/admin/messages",
      icon: ChatBubbleLeftIcon,
      current: pathname === "/admin/messages",
    },
  ];
};

export const useAdminCategoryNavigation = () => {
  const pathname = usePathname();
  return [
    {
      name: "@ - kategorie",
      href: "/admin/category",
      icon: null,
      current: pathname === "/admin",
    },
    {
      name: "@ - vlastnost",
      href: "/admin/feature",
      icon: null,
      current: pathname === "/admin",
    },
    {
      name: "@ - specifikace",
      href: "/admin/specification",
      icon: null,
      current: pathname === "/admin",
    },
    {
      name: "@ - barva",
      href: "/admin/color",
      icon: null,
      current: pathname === "/admin",
    },
    {
      name: "@ - velikost",
      href: "/admin/size",
      icon: null,
      current: pathname === "/admin",
    },
  ];
};

export const useAdminTeams = () => {
  const pathname = usePathname();
  return [
    {
      id: 1,
      name: "Administrační panel",
      href: "/admin/team",
      initial: "AP",
      current: pathname === "/admin/team",
    },
  ];
};
