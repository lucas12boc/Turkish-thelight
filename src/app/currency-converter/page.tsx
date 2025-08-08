"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";
import { getExchangeRate } from '@/ai/flows/currency-converter-flow';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { PageHeader } from '@/components/page-header';

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('TRY');
  const [exchangeResult, setExchangeResult] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const { toast } = useToast();

  const handleConversion = async () => {
    setIsConverting(true);
    setExchangeResult(null);
    try {
      const result = await getExchangeRate({ from: fromCurrency, to: toCurrency });
      const convertedAmount = (parseFloat(amount) * result.rate).toFixed(2);
      setExchangeResult(`${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`);
    } catch (error) {
      console.error("Error converting currency:", error);
      toast({
        variant: "destructive",
        title: "Dönüşüm Hatası",
        description: "Kur bilgisi alınamadı. Lütfen tekrar deneyin.",
      });
    } finally {
      setIsConverting(false);
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

  return (
    <>
      <PageHeader 
        title="Döviz Çevirici"
        subtitle="Güncel döviz kurları"
      />
      <main className="flex-1">
        <section className="container mx-auto max-w-2xl px-4 py-8 md:px-6 md:py-12 flex flex-col items-center gap-8">
            <Card className="w-full bg-transparent border-0 shadow-none">
                <CardHeader className="text-center">
                   <p className="text-center text-muted-foreground pt-2">
                    En güncel döviz kurunu alın ve USD, EUR ve TRY arasında çeviri yapın.
                  </p>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                  
                  <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                      <div className="space-y-2">
                          <label htmlFor="amount" className="text-sm font-medium text-muted-foreground">Miktar</label>
                          <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1.00" className="text-lg"/>
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">Kaynak</label>
                          <Select value={fromCurrency} onValueChange={setFromCurrency}>
                              <SelectTrigger className="text-lg">
                                  <SelectValue placeholder="Para birimi seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="TRY">TRY</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">Hedef</label>
                          <Select value={toCurrency} onValueChange={setToCurrency}>
                              <SelectTrigger className="text-lg">
                                  <SelectValue placeholder="Para birimi seçin" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="USD">USD</SelectItem>
                                  <SelectItem value="EUR">EUR</SelectItem>
                                  <SelectItem value="TRY">TRY</SelectItem>
                              </SelectContent>
                          </Select>
                      </div>
                  </div>

                  <ActionButton onClick={handleConversion} disabled={isConverting || !amount}>
                    {isConverting ? "Çevriliyor..." : <><ArrowRightLeft className="mr-2" /> Çevir</>}
                  </ActionButton>

                  {isConverting && (
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

                  {exchangeResult && !isConverting && (
                      <Card className="w-full animate-in fade-in-50 zoom-in-95 mt-4 bg-background/50 border-primary/20 shadow-lg">
                          <CardContent className="pt-6">
                              <p className="text-center text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                                  {exchangeResult}
                              </p>
                          </CardContent>
                      </Card>
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
