'use server';
/**
 * @fileOverview A flow for generating daily Turkish slang.
 *
 * - getSlangOfTheDay - Fetches a list of current Turkish slang words.
 * - SlangOfTheDayOutput - The return type for the getSlangOfTheDay function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SlangWordSchema = z.object({
  slang: z.string().describe('The slang word or phrase in Turkish.'),
  definition: z.string().describe('A clear and concise definition of the slang in Turkish.'),
  example: z.string().describe('An example sentence using the slang in a natural context, in Turkish.'),
});

const SlangOfTheDayOutputSchema = z.object({
  slangWords: z.array(SlangWordSchema).describe('An array of 4 Turkish slang words.'),
});
export type SlangOfTheDayOutput = z.infer<typeof SlangOfTheDayOutputSchema>;

const slangPrompt = ai.definePrompt({
  name: 'slangOfTheDayPrompt',
  output: { schema: SlangOfTheDayOutputSchema },
  prompt: `You are an expert on modern Turkish culture and language, specializing in the slang used by people aged 15-35 in 2025.

Generate a list of 4 popular and current Turkish slang words or phrases. For each item, provide the slang itself, a clear definition, and a simple, natural example sentence.

The tone should be fun, informative, and authentic. The entire response, including slang, definitions, and examples, must be in Turkish.`,
});

const slangOfTheDayFlow = ai.defineFlow(
  {
    name: 'slangOfTheDayFlow',
    outputSchema: SlangOfTheDayOutputSchema,
  },
  async () => {
    const { output } = await slangPrompt();
    return output!;
  }
);

export async function getSlangOfTheDay(): Promise<SlangOfTheDayOutput> {
  return slangOfTheDayFlow();
}
