"use client";

import { Sidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock, TrendingUp, TrendingDown, MoreVertical, Play } from "lucide-react";
import Link from "next/link";

const workflows = [
  {
    id: 1,
    title: "Add competitor keywords to bullet points of my Amazon product listing",
    time: "5-8 mins",
    metrics: [
      { name: "Conversion Rates", trend: "up" },
      { name: "Product Discoverability", trend: "up" },
    ],
  },
  {
    id: 2,
    title: "Improve titles of my Amazon product listing",
    time: "7-10 mins",
    metrics: [
      { name: "Conversion Rates", trend: "up" },
      { name: "Product Discoverability", trend: "up" },
      { name: "Advertising Cost of Sales", trend: "down" },
    ],
  },
  {
    id: 3,
    title: "Optimise the images and their resolutions of my Amazon listings",
    time: "3-6 mins",
    metrics: [
      { name: "Click Through Rates", trend: "up" },
      { name: "Sales", trend: "up" },
      { name: "Advertising Cost of Sales", trend: "down" },
    ],
  },
];

export default function RunWorkflowPage() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <main className="flex-1 ml-16 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">Run a Workflow</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-500 h-12 rounded-lg"
            />
          </div>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
              <CardHeader className="relative">
                <div className="absolute top-4 right-4">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>{workflow.time}</span>
                </div>
                <CardTitle className="text-base font-normal leading-snug pr-8">
                  {workflow.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="flex flex-wrap gap-2">
                  {workflow.metrics.map((metric, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium"
                      style={{
                        color: metric.trend === "up" ? "#10b981" : "#ef4444",
                      }}
                    >
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span>{metric.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-4">
                <Button variant="ghost" className="flex-1 text-white hover:bg-[#2a2a2a] h-9">
                  View Details
                </Button>
                {workflow.id === 1 ? (
                  <Link href="/set-context" className="flex-1">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9">
                      <Play className="w-4 h-4 mr-1.5" />
                      Run
                    </Button>
                  </Link>
                ) : (
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-9">
                    <Play className="w-4 h-4 mr-1.5" />
                    Run
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

