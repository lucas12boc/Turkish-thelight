"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, Upload } from "lucide-react";
import Image from 'next/image';
import { tellFortune } from '@/ai/flows/fortune-teller-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/page-header';

export default function FortuneTellerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [fortune, setFortune] = useState<string | null>(null);
  const [isFortuneLoading, setIsFortuneLoading] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setFortune(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFortuneTelling = async () => {
    if (!selectedImage) return;
    setIsFortuneLoading(true);
    setFortune(null);
    try {
      const result = await tellFortune({ photoDataUri: selectedImage });
      setFortune(result.fortune);
    } catch (error) {
      console.error("Error telling fortune:", error);
      toast({
        variant: "destructive",
        title: "Hata",
        description: "Falınıza bakılamadı. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsFortuneLoading(false);
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
    <>
      <PageHeader 
        title="Fal Yorumu"
        subtitle="Kaderinizi keşfedin"
      />
      <main className="flex-1">
        <section className="container mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12 flex flex-col items-center gap-8">
            <Card className="w-full bg-transparent border-0 shadow-none">
                <CardHeader className="text-center">
                   <p className="text-center text-muted-foreground pt-2">
                    Türk kahvesi fincanınızın iç kısmının bir fotoğrafını çekin ve falınıza bakabilmemiz için yükleyin.
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                  <div className="w-full max-w-sm aspect-square rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-secondary/30 overflow-hidden">
                    {selectedImage ? (
                      <Image src={selectedImage} alt="Kahve Fincanı" width={400} height={400} className="object-cover w-full h-full" />
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <Coffee size={48} className="mx-auto mb-2 text-primary/50" />
                        <span>Resim bekleniyor...</span>
                      </div>
                    )}
                  </div>

                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                   <Button asChild size="lg" className="w-full max-w-sm cursor-pointer" variant="outline">
                      <label htmlFor="imageUpload">
                        <Upload className="mr-2" />
                        Fotoğraf Seç
                      </label>
                    </Button>

                  <ActionButton 
                    onClick={handleFortuneTelling} 
                    disabled={!selectedImage || isFortuneLoading}
                  >
                    {isFortuneLoading ? "Falınıza bakılıyor..." : "Falıma Bak"}
                  </ActionButton>

                  {isFortuneLoading && (
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

                  {fortune && !isFortuneLoading && (
                    <ResultCard title="Falınız">
                      {fortune}
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
    </>
  );
}
