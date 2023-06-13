import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth( {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:'601956668331-j2mnj9nvenveetk53bc4b44tbt0qqps5.apps.googleusercontent.com',
      clientSecret: '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',
    }),
    // ...add more providers here
  ],
  pages:{
    signIn:'/auth/signin'
  },
  callbacks:{
    async session({session,token,user}){
      session.user.username=session.user.name.split(' ').join('').toLocaleLowerCase();
      session.user.uid=token.sub
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
