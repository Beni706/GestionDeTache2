import type { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      apiToken?: string;
      isNewUser?: boolean;
    } & DefaultSession["user"]; // DefaultSession["user"] typically includes name, email, image
    accessToken?: string; // To store the JWT itself or a specific access token
  }

  interface User extends DefaultUser { // Extends DefaultUser to include id, name, email, image
    // id is part of DefaultUser, ensure it's string
    id: string;
    apiToken?: string; // Custom token from your API
    token?: string;    // Token from CredentialsProvider or OAuth for JWT
    isNewUser?: boolean; // Flag for new OAuth users
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string;
    accessToken?: string; // Corresponds to user.token or OAuth access_token
    apiToken?: string;    // Custom token from your API
    isNewUser?: boolean;  // Flag for new OAuth users
  }
}
