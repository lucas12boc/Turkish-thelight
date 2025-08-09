"use client";

import type { SlangOfTheDayOutput } from "@/ai/flows/slang-of-the-day-flow";
import { getSlangOfTheDay } from "@/ai/flows/slang-of-the-day-flow";
import { SlangCard } from "@/components/slang-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { PageHeader } from "@/components/page-header";

export default function SlangOfTheDayPage() {
  const [slangData, setSlangData] = useState<SlangOfTheDayOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchSlang = () => {
    startTransition(async () => {
      try {
        const data = await getSlangOfTheDay();
        setSlangData(data);
      } catch (error) {
        console.error("Failed to fetch slang of the day:", error);
        toast({
          variant: "destructive",
          title: "Hata",
          description: "Günün argosu alınamadı. Lütfen tekrar deneyin.",
        });
      }
    });
  };

  useEffect(() => {
    fetchSlang();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <PageHeader
        title="Günün Argosu"
        subtitle="Geri kalma!"
        actions={
          <Button variant="ghost" size="icon" onClick={fetchSlang} disabled={isPending}>
            <RefreshCw className={isPending ? "animate-spin" : ""} />
          </Button>
        }
      />
      <main className="flex-1">
        <section className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-12">
          {isPending && !slangData ? (
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {slangData?.slangWords.map((word, index) => (
                <SlangCard
                  key={index}
                  slang={word.slang}
                  definition={word.definition}
                  example={word.example}
                  animationDelay={index * 150}
                />
              ))}
            </div>
          )}
        </section>
      </main>
       <footer className="border-t bg-background/80">
        <div className="container mx-auto flex h-14 items-center justify-center p-4">
          <p className="text-xs text-muted-foreground">
            Geliştirici: Lucas Leandro Guzmán
          </p>
        </div>
      </footer>
    </>
  );
}
