import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }: any) {
      console.log("User data on sign-in:", {
        user,
        account,
        profile,
        email,
        credentials,
      });
      // Access the authorization code from the account object
      const authorizationCode = account?.params?.code;
      console.log(authorizationCode);

      // Send the authorization code to your backend for further processing
      // You can use a HTTP request library like axios or fetch to send the code
      await sendAuthorizationCodeToBackend(authorizationCode);

      return true; // Continue with the default signIn behavior
    },
  },
};

export default NextAuth(authOptions);

// Function to send the authorization code to your backend
async function sendAuthorizationCodeToBackend(
  authorizationCode: string | undefined
) {
  if (authorizationCode) {
    try {
      // Make an HTTP request to your backend with the authorization code
      const response = await fetch("/your-backend-endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ authorizationCode }),
      });

      if (response.ok) {
        console.log("Authorization code sent to backend successfully.");
      } else {
        console.error("Failed to send authorization code to backend.");
      }
    } catch (error) {
      console.error("Error sending authorization code to backend:", error);
    }
  }
}
