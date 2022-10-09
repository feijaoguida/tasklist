import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session(session: any, profile: string) {

      try {
        return {
          ...session,
          id: profile.sub,
        }
      } catch (error) {
        return {
          ...session,
          id: null
        }
        
      }
    },
    async signIn(user: { email: any }, account: any, profile: any) {
      const { email } = user;
      try {
        return true
      } catch (error) {
        console.log("Erro ao logar: ", error)
        return false
      }
    }
  }

})
  