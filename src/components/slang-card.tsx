"use client";

import type { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircleQuestion, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlangCardProps {
  slang: string;
  definition: string;
  example: string;
  className?: string;
  animationDelay?: number;
}

export const SlangCard: FC<SlangCardProps> = ({
  slang,
  definition,
  example,
  className,
  animationDelay = 0,
}) => {
  return (
    <Card 
      className={cn(
        "flex h-full w-full flex-col justify-between transform-gpu transition-all duration-300 hover:scale-105 hover:shadow-xl animate-in fade-in-0 zoom-in-95 fill-mode-backwards",
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div>
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl font-bold font-headline">
            <Sparkles className="h-7 w-7 text-accent" />
            {slang}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground/90">{definition}</p>
        </CardContent>
      </div>
      <CardFooter>
        <blockquote className="w-full rounded-r-md border-l-4 border-accent/70 bg-secondary/30 p-3 italic text-muted-foreground">
          <p className="flex items-start gap-3">
            <MessageCircleQuestion className="mt-1 h-5 w-5 flex-shrink-0" />
            <span>{example}</span>
          </p>
        </blockquote>
      </CardFooter>
    </Card>
  );
};
