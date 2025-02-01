import { getServerSession } from "next-auth";
import { authConfig } from "../../lib/auth";

export default async function handler(req:any,res:any){
    const session = await getServerSession(req,res,authConfig);
    if(!session){
        return res.status(401).json({message : 'unauthorized'});
    }
    else
    {
        res.status(200).json({session});
    }
}

