'use server';
/**
 * @fileOverview A currency conversion AI agent.
 *
 * - getExchangeRate - A function that handles the currency conversion process.
 * - CurrencyConverterInput - The input type for the getExchangeRate function.
 * - CurrencyConverterOutput - The return type for the getExchangeRate function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import fetch from 'node-fetch';

const ExchangeRateInputSchema = z.object({
  from: z.string().describe('The currency to convert from.'),
  to: z.string().describe('The currency to convert to.'),
});
export type ExchangeRateInput = z.infer<typeof ExchangeRateInputSchema>;

const ExchangeRateOutputSchema = z.object({
  rate: z.number().describe('The exchange rate.'),
});
export type ExchangeRateOutput = z.infer<typeof ExchangeRateOutputSchema>;

const getExchangeRateTool = ai.defineTool(
    {
      name: 'getExchangeRate',
      description: 'Get the exchange rate between two currencies.',
      inputSchema: ExchangeRateInputSchema,
      outputSchema: ExchangeRateOutputSchema,
    },
    async (input) => {
        const response = await fetch(`https://api.frankfurter.app/latest?from=${input.from}&to=${input.to}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch exchange rate: ${response.statusText}`);
        }
        const data = await response.json() as { rates: { [key: string]: number } };
        const rate = data.rates?.[input.to];
        if (typeof rate !== 'number') {
            // If the 'from' and 'to' currencies are the same, the API might not return a rate.
            if (input.from === input.to) {
                return { rate: 1 };
            }
            throw new Error(`Could not find rate for currency ${input.to}`);
        }
        return { rate };
    }
  );


const currencyConverterFlow = ai.defineFlow(
    {
      name: 'currencyConverterFlow',
      inputSchema: ExchangeRateInputSchema,
      outputSchema: ExchangeRateOutputSchema,
    },
    async (input) => {
      return await getExchangeRateTool(input);
    }
);

export async function getExchangeRate(input: ExchangeRateInput): Promise<ExchangeRateOutput> {
    return currencyConverterFlow(input);
}
