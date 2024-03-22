"use client";

import Link from "next/link"
import { usePathname } from "next/navigation";
import { Category, Parent } from "@/types";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import NavbarActions from "./navbar-actions";
import path from "path";

interface MainNavProps {
  data: Category[];
  parents: Parent[]
}

const MainNav: React.FC<MainNavProps> = ({
  data, parents
}) => {
  
  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
    parentId: route.parentId
  }));

  let navTree: any = {};
  const ignore = ['/login','/create-account','/recover-password']
  parents.forEach((parent) => {
   navTree[parent.type.label] = navTree[parent.type.label] || {};
   navTree[parent.type.label].url = parent.type.imageUrl || "";
   navTree[parent.type.label].links = navTree[parent.type.label].links || [];
   navTree[parent.type.label].links.push({
      name: parent.name,
      categories: routes.filter((route) =>route.parentId == parent.id)
   });
  });
  
  return (
    <nav>
      <div className="wrapper">
        <Link href="/" className="flex lg:ml-0 gap-x-2">
          <img src="/logo-black.png" width={250} height={70} />
        </Link>
        {!ignore.includes(pathname || "") ? (
          <div className="flex justify-between flex-1">
            <div className="flex-1 justify-between flex">
              <input type="radio" name="slider" id="menu-btn" />
              <input type="radio" name="slider" id="close-btn" />
              <ul className="nav-links flex-1 flex">
                <label htmlFor="close-btn" className="btn close-btn">
                  <Cross1Icon />
                </label>
                {Object.entries(navTree).map(([key, value]: any) => (
                  <li key={key} className="p-4">
                    <div className="desktop-item nav hover-underline-animation font-semibold text-lg">
                      {key}
                    </div>
                    <input
                      type="checkbox"
                      id={`showMega${key}`}
                      className="showMega"
                    />
                    <label htmlFor={`showMega${key}`} className="mobile-item">
                      {key}
                    </label>
                    <div className="mega-box">
                      <div className="content">
                        <div className="row first">
                          <img
                            style={{ aspectRatio: "3/2", objectFit: "contain" }}
                            src={value.url}
                            alt=""
                          />
                        </div>
                        {value.links
                          .filter((e: any) => e.categories.length > 0)
                          .map((e: any) => (
                            <div className="row" key={key + e.name}>
                              <header className="hover-underline-animation">
                                {e.name}
                              </header>
                              <ul className="mega-links">
                                {e?.categories?.map((parent: any) => (
                                  <li key={parent.label}>
                                    <Link
                                      className="hover-underline-animation"
                                      href={parent.href || ""}
                                    >
                                      {parent.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>
                  </li>
                ))}
                <NavbarActions />
              </ul>
            </div>
            <label htmlFor="menu-btn" className="btn menu-btn">
              <HamburgerMenuIcon />
            </label>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default MainNav;
