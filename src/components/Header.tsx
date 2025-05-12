"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { fetchUserProfile } from "@/lib/slices/profileSlice";


interface NavListProps {
  className?: string;
}
const NavList: React.FC<NavListProps> = ({className}) => {
  return <nav className={cn("hidden md:flex items-center gap-6", className)}>
    <Link
      href="/ai-analyze"
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#D4A5FF]"
    >
      AI Feature
    </Link>
    <Link
      href="/profile"
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#D4A5FF]"
    >
      Workflow
    </Link>
    <Link
      href="/#why-docflow"
      className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#D4A5FF]"
    >
      Why DocFlow?
    </Link>
  </nav>
}

const Header = () => {
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: userProfile } = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    dispatch(fetchUserProfile() as any);
  }, []);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 border-b bg-background w-full flex flex-col justify-center items-center  z-100">
      <div className="container flex h-16 items-center justify-between px-3 md:px-0">
        <Link href={"/"} className="flex items-center gap-2 cursor-pointer">
          <Zap className="h-6 w-6 text-[#9B4DFF]"/>
          <span className="text-xl font-bold text-[#9B4DFF]">DocFlow</span>
        </Link>

        <NavList/>

        <div className="flex items-center gap-4">
          {
            !userProfile ?
              <Link href={"/login"}>
                <Button variant="ghost" size="sm" className="hidden md:flex text-[#9B4DFF]">
                  Log in
                </Button>
              </Link>
              :
              <Link href={"/profile"}>
                <Button variant="ghost" size="sm" className="hidden md:flex text-[#9B4DFF]">
                  Profile
                </Button>
              </Link>
          }
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {!isMenuOpen ? <Menu className="h-5 w-5"/> : <X className="h-5 w-5"/>}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        }  w-full bg-[#9B4DFF]/10 bg-opacity-80 md:hidden transition-all duration-300 ease-in-out z-40`}
      >
        <NavList className={"flex flex-col items-start max-w-[200px] w-full container px-6 py-4"}/>
      </div>
    </header>
  );
};

export default Header;