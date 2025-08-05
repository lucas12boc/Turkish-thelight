"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Mail, User, MapPin, Heart } from "lucide-react";
import Link from 'next/link';
import { ThemeToggle } from "@/components/theme-toggle";

const CreatorInfoPage = () => {
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
              Geliştirici Hakkında
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12 flex flex-col items-center gap-8">
            <Card className="w-full bg-background/50 border-primary/20 shadow-lg p-4 sm:p-6 animate-in fade-in-50 zoom-in-95">
                <CardHeader className="text-center items-center">
                   <div className="flex justify-center mb-4 p-4 bg-primary/10 rounded-full">
                     <User size={64} className="text-primary" />
                   </div>
                   <CardTitle className="text-3xl font-bold">Lucas Leandro Guzmán</CardTitle>
                   <p className="flex items-center gap-2 text-muted-foreground pt-2">
                       <MapPin className="h-5 w-5" />
                       Buenos Aires, Arjantin
                   </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6 text-center text-lg text-foreground/80">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-5 w-5 text-primary" />
                    <p>Türk toplumu için saygı ve takdirle yaratılmıştır.</p>
                  </div>
                  <div className="w-full border-t border-border my-2"></div>
                  <p>
                    Bu uygulama, günlük hayatta karşılaşılan zorlukları tek bir tıkla çözerek Türk halkının yaşamını kolaylaştırmak amacıyla tasarlanmıştır.
                  </p>
                  <
