import  CredentialsProvider  from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { NextAuthOptions } from "next-auth";

const prisma = new PrismaClient();
export const authConfig : NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Password",
                },
            },
            async authorize(credentials : any) {
                if(!credentials || !credentials.email || !credentials.password)
                    return null;
                const tempDb: any = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })
                const isPasswordValid = await bcrypt.compare(credentials.password, tempDb.password);
                if (tempDb && isPasswordValid && tempDb.password) {
                    console.log(tempDb);
                    return{
                        id: tempDb.id,
                        email: tempDb.email,
                        name: tempDb.name
                    }
                }
                return null;
            },

        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks:{
        session: async({session,token,user}:any)=>{
          console.log(token)
          
          session.user.id=token.sub;
          
          console.log(session);
          return session;
        }
    },
    pages: {
        signIn: '/login',
    }
}