"use client";

import { Button } from "@/core/components/ui/button";
import { signOut } from "next-auth/react";

export default function CMSHome() {
  return (
    <div>
      <div className="wrapper py-10">
        <span>You are signed in</span>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </div>
  );
}
