"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function PackersDetailsPage( {params}) {
  return (
    <Card className="sm:col-span-2 mx-5">
      <CardHeader className="pb-3">
        <CardTitle>Your Orders</CardTitle>
        <CardDescription className="max-w-lg text-balance leading-relaxed">
          Introducing Our Dynamic Orders Dashboard for Seamless Management and
          Insightful Analysis.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="pb-5">
        <h1>1: Living Room (main Category)</h1>
        <div>
        <p>a: Chairs (Category)</p>
        <p>a: Chairs (Category)</p>
        </div>
        <p></p>
        </div>
        <h1>2: Bed Room</h1>
        <h1>3: Kitchen</h1>
        <h1>4: Others</h1>
      </CardContent>
      <CardFooter>
        
      </CardFooter>
    </Card>
  )
}


