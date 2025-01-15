import { getServerSession } from "next-auth";
import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

export const config = {
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(config);

export { handler as GET, handler as POST };

export function auth(...args) {
  return getServerSession(...args, config);
}
