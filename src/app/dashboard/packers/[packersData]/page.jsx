'use client'
// components/PackerMoverTable.jsx
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";

const categories =[
  {
    "section": "Living Room",
    "items": [
      {
        "title": "Chairs",
        "icon": "🪑",
        "items": [
          {"name": "Plastic/Folding Chair", "count": 6},
          {"name": "Dining Table Chair", "count": 1}
        ]
      },
      {
        "title": "Tables",
        "icon": "🍽️",
        "items": [
          {"name": "Center Table", "count": 1},
          {"name": "Dining Table", "count": 5}
        ]
      },
      {
        "title": "TV/Monitor",
        "icon": "📺",
        "items": [
          {"name": "Below 43”", "count": 0},
          {"name": "43” to 65”", "count": 1},
          {"name": "Above 63”", "count": 2}
        ]
      }
    ]
  },
  {
    "section": "Bed Room",
    "items": [
      {
        "title": "Mattress",
        "icon": "🛏️",
        "items": [
          {"name": "Single Mattress", "count": 6},
          {"name": "Double Mattress", "count": 4}
        ]
      },
      {
        "title": "AC/Cooler/Fan",
        "icon": "🌬️",
        "items": [
          {"name": "AC (split)", "count": 1},
          {"name": "Cooler", "count": 5}
        ]
      },
      {
        "title": "Almirah/Wardrobe",
        "icon": "🚪",
        "items": [
          {"name": "Small (0-3 feet wide) Wooden", "count": 3},
          {"name": "Medium (3-6 feet wide) Wooden", "count": 1},
          {"name": "Small (0-3 feet wide) Metal", "count": 2}
        ]
      }
    ]
  },
  {
    "section": "Kitchen",
    "items": [
      {
        "title": "Appliances",
        "icon": "🥘",
        "items": [
          {"name": "Microwave Oven", "count": 1},
          {"name": "Refrigerator", "count": 1},
          {"name": "Gas Stove", "count": 1},
          {"name": "Toaster", "count": 1}
        ]
      },
      {
        "title": "Utensils",
        "icon": "🍴",
        "items": [
          {"name": "Plates", "count": 6},
          {"name": "Bowls", "count": 6},
          {"name": "Glasses", "count": 6},
          {"name": "Spoons", "count": 6},
          {"name": "Forks", "count": 6}
        ]
      },
      {
        "title": "Storage",
        "icon": "🗄️",
        "items": [
          {"name": "Cabinets", "count": 2},
          {"name": "Drawers", "count": 4},
          {"name": "Shelves", "count": 3}
        ]
      }
    ]
  },
  {
    "section": "Other",
    "items": [
      {
        "title": "Miscellaneous",
        "icon": "🔧",
        "items": [
          {"name": "Toolbox", "count": 1},
          {"name": "Flashlight", "count": 1},
          {"name": "Batteries", "count": 6},
          {"name": "Scissors", "count": 2}
        ]
      }
    ]
  }
];


const PackerMoverTable = () => {
  const [expanded, setExpanded] = useState({});
  const [counts, setCounts] = useState(
    categories.reduce((acc, section) => {
      section.items.forEach((category) => {
        acc[category.title] = category.items.map((item) => item.count);
      });
      return acc;
    }, {})
  );

  const handleToggle = (title) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleIncrement = (categoryTitle, itemIndex) => {
    setCounts((prev) => {
      const newCounts = { ...prev };
      newCounts[categoryTitle][itemIndex]++;
      return newCounts;
    });
  };

  const handleDecrement = (categoryTitle, itemIndex) => {
    setCounts((prev) => {
      const newCounts = { ...prev };
      if (newCounts[categoryTitle][itemIndex] > 0) {
        newCounts[categoryTitle][itemIndex]--;
      }
      return newCounts;
    });
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="">
          <CardTitle>Packer and Mover</CardTitle>
          <CardDescription>A list of items to be moved categorized by rooms</CardDescription>
        </CardHeader>
        <hr className="border-t border-gray-800 mb-5" /> {/* Add this line */}
        <CardContent>
          {categories.map((section) => (
            <div key={section.section}>
              <h2 className="font-bold text-xl mb-2 bg-slate-800 p-3 mt-5">{section.section}</h2>
              {section.items.map((category) => (
                <div key={category.title}>
                  <div
                    className="flex justify-between items-center cursor-pointer py-2 bg-slate-900 p-3"
                    onClick={() => handleToggle(category.title)}
                  >
                    <div className="flex items-center">
                      <span className="mr-2">{category.icon}</span>
                      <span>{category.title}</span>
                    </div>
                    {expanded[category.title] ? <ChevronUp /> : <ChevronDown />}
                  </div>
                  {expanded[category.title] && (
                    <div className="ml-4">
                      {category.items.map((item, itemIndex) => (
                        <div
                          key={item.name}
                          className="flex justify-between items-center py-2"
                        >
                          <span>{item.name}</span>
                          <div className="flex items-center">
                            {/* <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleDecrement(category.title, itemIndex)
                              }
                            >
                              <Minus />
                            </Button> */}
                            <span className="mx-2 text-center bg">{counts[category.title][itemIndex]} Qty</span>
                            {/* <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                handleIncrement(category.title, itemIndex)
                              }
                            >
                              <Plus />
                            </Button> */}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PackerMoverTable;
