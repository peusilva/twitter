"use client";

import Link from "next/link";
import Image from "next/image";
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useRouter } from "next/navigation";

function Topbar() {
  const router = useRouter();
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">Twitter</p>
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedOut>
            <div className="flex cursor-pointer gap-4 p-4">
              <SignInButton>
                <div className="flex cursor-pointer">
                  <Image
                    src="/assets/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                  />
                  <p className="text-light-2 ml-2">Login</p>
                </div>
              </SignInButton>
            </div>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-1",
            },
          }}
        />
      </div>
    </nav>
  );
}

export default Topbar;
