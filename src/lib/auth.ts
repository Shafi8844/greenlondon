import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_URI as string);
const db =client.db('greenLondon');


export const auth = betterAuth({
    database: mongodbAdapter(db,{
        client,
    }),
    emailAndPassword:{
        enabled:true,
        minPasswordLength:6,
    },
    socialProviders:{
        google:{
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string
        }
    },
    // Allow Google sign-in to attach to an existing account created with
    // email/password when the emails match — otherwise Better Auth refuses
    // with "User already exist but account isn't linked to google".
    account:{
        accountLinking:{
            trustedProviders:["google"]
        }
    },
    plugins:[jwt()],
    session:{
        cookieCache:{
            enabled:true,
            strategy: "jwt",
            maxAge: 7*24*60*60
        }
    }
});