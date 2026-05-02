import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req){

    try{
    const raw_token = await req.json();


    const got_token = raw_token.resToken;

    console.log("This is your token ",got_token);


if(!got_token){
    return NextResponse.json({status:400},{message:"Token is not received"});
}

const secret = process.env.JWT_SECRET;

const res = jwt.verify(got_token,secret);

console.log("This is my responce under jwt", res);

if(res)
{
return NextResponse.json(
    {
        valid:true,
        received_id: res.id});
}
else{
    return NextResponse.json({valid:false});
}

    }
    catch(err){
console.log("This is your error ",err);
return NextResponse.json({valid:false});
    }

}