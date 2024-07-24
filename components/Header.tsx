"use client";
import Image from "next/image";
import Link from "next/link";

import { NavigationMenuComponent } from "@/components/NavbarMenu";

export function Header() {
  return (
    <header className="admin-header">
      <Link href="/" className="cursor-pointer">
        <Image
          src="/assets/icons/leon-cares-eclinic_logo_white-01.png"
          height={32}
          width={162}
          alt="logo"
          className="h-12 w-fit"
        />
      </Link>
      <NavigationMenuComponent />
    </header>
  );
}
