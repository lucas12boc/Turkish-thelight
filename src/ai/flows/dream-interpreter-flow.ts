'use server';
/**
 * @fileOverview A dream interpretation AI agent.
 *
 * - interpretDream - A function that handles the dream interpretation process.
 * - DreamInterpreterInput - The input type for the interpretDream function.
 * - DreamInterpreterOutput - The return type for the interpretDream function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DreamInterpreterInputSchema = z.object({
  dreamDescription: z.string().describe('The description of the dream to be interpreted.'),
});
export type DreamInterpreterInput = z.infer<typeof DreamInterpreterInputSchema>;

const DreamInterpreterOutputSchema = z.object({
  interpretation: z.string().describe("The interpretation of the dream. Should be in Turkish, positive, and insightful."),
});
export type DreamInterpreterOutput = z.infer<typeof DreamInterpreterOutputSchema>;

export async function interpretDream(input: DreamInterpreterInput): Promise<DreamInterpreterOutput> {
  return dreamInterpreterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dreamInterpreterPrompt',
  input: {schema: DreamInterpreterInputSchema},
  output: {schema: DreamInterpreterOutputSchema},
  prompt: `You are an expert Turkish dream interpreter (Rüya Tabircisi). You have deep knowledge of Turkish culture, symbolism, and psychology related to dreams.

You will be given a description of a dream. Your task is to provide a detailed, positive, and insightful interpretation in Turkish. The interpretation should be encouraging and offer a bit of guidance or reflection for the user's life. The response must be entirely in Turkish.

Dream description: {{{dreamDescription}}}`,
});

const dreamInterpreterFlow = ai.defineFlow(
  {
    name: 'dreamInterpreterFlow',
    inputSchema: DreamInterpreterInputSchema,
    outputSchema: DreamInterpreterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
