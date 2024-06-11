import { NextResponse } from "next/server";

export default function middleware(req){
  let verify = req.cookies.get('logged in')
  let url = req.url


  if(!verify && url.includes('/dashboard')){
    return NextResponse.redirect("http://localhost:3000/login")
  }

  if(verify && url === "http://localhost:3000/dashboard"){
    return NextResponse.redirect("http://localhost:3000/login")
  }
}