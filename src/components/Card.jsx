import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { DollarSign } from "lucide-react";

const HomeCard = ({ title, icons, value }) => {
  return (
    <div>
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icons}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {/* Optional Text 
            <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
          */}
        </CardContent>
      </Card>
    </div>
  );
};

export default HomeCard;
