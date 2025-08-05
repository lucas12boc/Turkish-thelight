"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Coffee, ArrowRightLeft, Moon, MessageSquareQuote, LogOut, User } from "lucide-react";
import Link from 'next/link';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ThemeToggle } from '@/components/theme-toggle';

const WELCOME_KEY = 'turkish-delight-daily-welcome-shown-v2';

export default function Home() {
  const [view, setView] = useState<'loading' | 'welcome' | 'dialog' | 'main'>('loading');

  useEffect(() => {
    // This effect runs only on the client, after the component has mounted.
    const welcomeShown = localStorage.getItem(WELCOME_KEY);
    if (!welcomeShown) {
      setView('welcome');
    } else {
      setView('main');
    }
  }, []);

  const handleStart = () => {
    setView('dialog');
  };
  
  const handleContinueFromDialog = () => {
    localStorage.setItem(WELCOME_KEY, 'true');
    setView('main');
  }

  const handleLogout = () => {
    localStorage.removeItem(WELCOME_KEY);
    window.location.reload();
  };
  
  if (view === 'loading') {
    return null; // Or a loading spinner
  }

  if (view === 'welcome') {
    return (
       <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background text-foreground font-body text-center p-4">
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
           <h1 className="text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent sm:text-7xl">
            Günlük Türkçe Lezzetler
          </h1>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500">
           <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
             Günlük yardımcılarınız, bir tutam sihirle.
          </p>
        </div>
        <div className="animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-1000">
           <Button onClick={handleStart} size="lg" className="mt-8 font-bold text-lg bg-gradient-to-r from-primary to-accent text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
            Başla
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <AlertDialog open={view === 'dialog'} onOpenChange={(open) => !open && handleContinueFromDialog()}>
        <AlertDialogContent className="max-w-md text-center">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              Hoş Geldiniz!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base text-foreground/80 pt-2">
              Bu uygulama <span className="font-semibold text-primary">Lucas Leandro Guzmán</span> tarafından tüm Türk halkına büyük bir saygı ve sevgiyle oluşturulmuştur.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction onClick={handleContinueFromDialog} className="w-full sm:w-auto">
              Devam Et
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex min-h-screen w-full flex-col bg-background text-foreground font-body">
        <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6 relative">
            <div className="flex-1"></div>
            <div className="flex flex-col items-center gap-1 text-center">
              <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent sm:text-5xl">
                Günlük Türkçe Lezzetler
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                Günlük yardımcılarınız, bir tutam sihirle.
              </p>
            </div>
            <div className="flex-1 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </header>
        <main className="flex-1">
          <section className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                href="/slang-of-the-day"
                icon={<MessageSquareQuote className="h-10 w-10 text-primary" />}
                title="Günün Argosu"
                description="En son argoyu ve popüler kelimeleri öğrenin ve güncel kalın."
              />
              <FeatureCard
                href="/fortune-teller"
                icon={<Coffee className="h-10 w-10 text-primary" />}
                title="Fal Yorumu"
                description="Kahve fincanınızın fotoğrafını yükleyin ve kaderin sizin için neler hazırladığını öğrenin."
              />
              <FeatureCard
                href="/currency-converter"
                icon={<ArrowRightLeft className="h-10 w-10 text-primary" />}
                title="Döviz Çevirici"
                description="En güncel kurlarla TRY, USD ve EUR arasında çeviri yapın."
              />
              <FeatureCard
                href="/dream-interpreter"
                icon={<Moon className="h-10 w-10 text-primary" />}
                title="Rüya Yorumcusu"
                description="Rüyanızı anlatın, size gizli anlamını açıklayalım."
              />
              <FeatureCard
                href="/creator-info"
                icon={<User className="h-10 w-10 text-primary" />}
                title="Geliştirici Hakkında"
                description="Bu uygulamanın geliştiricisi hakkında daha fazla bilgi edinin ve nasıl iletişime geçeceğinizi öğrenin."
              />
            </div>
          </section>
        </main>
        <footer className="border-t bg-background/80">
          <div className="container mx-auto flex h-14 items-center justify-between p-4">
             <Link href="/creator-info" passHref>
                <Button variant="link" className="text-xs text-muted-foreground p-0 h-auto">
                    Geliştirici: Lucas Leandro Guzmán
                </Button>
            </Link>
             <Button onClick={handleLogout} variant="ghost" className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:scale-105">
                <LogOut className="mr-2 h-4 w-4" />
                Çıkış Yap
            </Button>
          </div>
        </footer>
      </div>
    </>
  );
}

const FeatureCard = ({ href, icon, title, description }: { href: string; icon: React.ReactNode; title: string; description: string }) => (
  <Link href={href} passHref>
    <Card className="flex h-full flex-col justify-between transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/10">
      <CardHeader>
        <div className="mb-4 flex justify-center">{icon}</div>
        <CardTitle className="text-center text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  </Link>
);
