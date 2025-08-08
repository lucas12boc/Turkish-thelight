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
