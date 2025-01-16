"use client";

import { signIn } from "next-auth/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";

export default function LoginPage() {
  return (
    <main>
      <section className="wrapper py-10 h-full flex">
        <Card>
          <CardHeader>
            <CardTitle>Login to CMS</CardTitle>
            <CardDescription>
              You will be redirected to login page
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => signIn("keycloak", { callbackUrl: "/cms" })}>
              Sign in with Keycloak
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
}
