import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./theme-toggle";

export default function Navbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background p-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <h1 className="text-2xl font-bold text-primary">NantiAja</h1>
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
