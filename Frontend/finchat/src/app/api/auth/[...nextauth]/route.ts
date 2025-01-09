import NextAuth from "next-auth";
import  CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers : [
        CredentialsProvider({
            name : "Email",
            credentials : {
                username : {label : 'email', type :'text',
                    placeholder:'Email'
                },
                password : {label : 'password', type :'password',
                    placeholder:'Password'
                },
            },
            async authorize(credentials : any){
                console.log(credentials);
                return {
                    id : "user1",
                    username:"praniket",
                    passoword : "Praniket@2001"
                }
            }
        })
    ]
})

export const GET = handler;
export const POST = handler;
