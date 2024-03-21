"use client"

import { useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import IconButton  from "@/components/ui/icon-button";
import { Category, Color, Parent, Size } from "@/types";
import { Button } from "./ui/buttons";
import NavbarActions from "./navbar-actions";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";


interface NavbarProps {
  data: Category[];
  parents: Parent[]
}

const Categories: React.FC<NavbarProps> = ({
  data,
  parents,
}) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  const pathname = usePathname();

  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathname === `/category/${route.id}`,
    parentId: route.parentId
  }));

  let navTree: any = {};

  parents.forEach((parent) => {
   navTree[parent.type] = navTree[parent.type] || [];
   navTree[parent.type].push({
      name: parent.name,
      categories: routes.filter((route) =>route.parentId == parent.id),
   });
  });

  return (
    <>
      <Button onClick={onOpen} className="flex items-start sm:hidden">
        <HamburgerMenuIcon />
      </Button>

      <Dialog
        open={open}
        as="div"
        className="relative z-40 sm:hidden"
        onClose={onClose}
      >
        {/* Background color and opacity */}
        <div className="fixed inset-0 bg-black bg-opacity-25" />

        {/* Dialog position */}
        <div className="fixed inset-0 z-40 flex">
          <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
            {/* Close button */}
            <div className="flex items-center justify-end px-4">
              <IconButton icon={<X size={15} />} onClick={onClose} />
            </div>
            <div className="p-4">
              {Object.entries(navTree).map(([key, value]: any) => (
                <div key={key + "mobile"}>
                  <h3 className="text-2xl font-semibold">{key}</h3>
                  <hr className="my-1" />
                  {value
                    .filter((e: any) => e.categories.length > 0)
                    .map((e: any) => (
                      <ul key={key + e.name + "mobile"} className="p-0 pb-2 grow">
                        <div className="text-lg font-medium">{e.name}</div>
                        {e?.categories?.map((parent: any) => (
                          <Link
                            href={parent.href || ""}
                            ref={parent.ref}
                            onClick={onClose}
                            key={parent.href + "mobile"}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 py-1 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            )}
                          >
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              {parent.label}
                            </p>
                          </Link>
                        ))}
                      </ul>
                    ))}
                </div>
              ))}
              <NavbarActions />
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Categories;
