"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const [providers, setProviders] = useState();

  function fetchProviders() {
    getProviders().then((res: any) => {
      setProviders(res);
    });
  }

  useEffect(() => {
    fetchProviders();
  }, []);

  return (
    <nav className="w-full flex-between pt-3 mb-16">
      <Link className="flex gap-2 flex-center" href="/">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link className="black_btn" href="/create-prompt">
              Create Post
            </Link>

            <button className="outline_btn" onClick={() => signOut()}>
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user?.image || ""}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex z-50">
            <Image
              src={session?.user?.image || ""}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create Prompt
                </Link>

                <button
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: any) => (
                <button
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
