"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, ArrowLeft } from "lucide-react";
import { interpretDream } from '@/ai/flows/dream-interpreter-flow';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DreamInterpreterPage() {
  const [dreamDescription, setDreamDescription] = useState('');
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [isInterpreting, setIsInterpreting] = useState(false);
  const { toast } = useToast();

  const handleDreamInterpretation = async () => {
    if (!dreamDescription) return;
    setIsInterpreting(true);
    setInterpretation(null);
    try {
      const result = await interpretDream({ dreamDescription });
      setInterpretation(result.interpretation);
    } catch (error) {
      console.error("Error interpreting dream:", error);
      toast({
        variant: "destructive",
        title: "Yorumlama Hatası",
        description: "Rüyanız yorumlanamadı. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsInterpreting(false);
    }
  };

  const ActionButton = ({ onClick, disabled, children, className }: { onClick: () => void, disabled: boolean, children: React.ReactNode, className?: string }) => (
    <Button 
      onClick={onClick} 
      disabled={disabled}
      size="lg"
      className={cn(
        "w-full font-bold text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 disabled:hover:scale-100 disabled:shadow-none",
        className
      )}
    >
      {children}
    </Button>
  );

  const ResultCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Card className="w-full animate-in fade-in-50 zoom-in-95 mt-4 bg-background/50 border-primary/20 shadow-lg">
        <CardHeader>
            <CardTitle className="text-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-center text-lg italic text-foreground/80">
                {children}
            </p>
        </CardContent>
    </Card>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground font-body">
      <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
           <Link href="/" passHref>
             <Button variant="ghost" size="icon">
                <ArrowLeft />
             </Button>
          </Link>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent sm:text-5xl">
              Rüya Yorumcusu
            </h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
                Gizli anlamlarını keşfedin
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12 flex flex-col items-center gap-8">
            <Card className="w-full bg-transparent border-0 shadow-none">
                <CardHeader className="text-center">
                    <p className="text-center text-muted-foreground pt-2">
                        Rüyanızı anlatın, size gizli anlamını açıklayalım.
                    </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    
                    <div className="w-full space-y-2">
                        <label htmlFor="dream" className="text-sm font-medium text-muted-foreground">Ne rüya gördünüz?</label>
                        <Textarea 
                            id="dream" 
                            placeholder="Örn: Boğaz'ın üstünde uçtuğumu gördüm..." 
                            className="min-h-[120px] text-base"
                            value={dreamDescription}
                            onChange={(e) => setDreamDescription(e.target.value)}
                        />
                    </div>

                    <ActionButton onClick={handleDreamInterpretation} disabled={isInterpreting || !dreamDescription}>
                        {isInterpreting ? "Yorumlanıyor..." : <><Moon className="mr-2" /> Rüyamı Yorumla</>}
                    </ActionButton>

                    {isInterpreting && (
                      <div className="text-center">
                          <div role="status">
                              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 28.0001 72.5987 9.68022 50 9.68022C27.4013 9.68022 9.08144 28.0001 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0492C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                              </svg>
                              <span className="sr-only">Yükleniyor...</span>
                          </div>
                      </div>
                    )}

                    {interpretation && !isInterpreting && (
                       <ResultCard title="Yorumunuz">
                         {interpretation}
                       </ResultCard>
                    )}
                </CardContent>
            </Card>
        </section>
      </main>
      <footer className="border-t bg-background/80">
        <div className="container mx-auto flex h-14 items-center justify-center p-4">
          <p className="text-xs text-muted-foreground">
            Geliştirici: Lucas Leandro Guzmán
          </p>
        </div>
      </footer>
    </div>
  );
}
