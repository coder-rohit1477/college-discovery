import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SavedCollegesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8 flex justify-center">
          <div className="bg-primary/10 p-6 rounded-full">
            <Heart className="h-12 w-12 text-primary" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold tracking-tight mb-4">Saved Colleges</h1>
        
        <Card className="border-dashed">
          <CardContent className="py-12">
            <p className="text-xl text-muted-foreground mb-8">
              Saved colleges feature coming soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/colleges">
                <Button size="lg">Browse Colleges</Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg">Back to Home</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
