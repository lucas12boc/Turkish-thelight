'use server';
/**
 * @fileOverview A Turkish coffee fortune telling AI agent.
 *
 * - tellFortune - A function that handles the fortune telling process.
 * - FortuneTellerInput - The input type for the tellFortune function.
 * - FortuneTellerOutput - The return type for the tellFortune function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FortuneTellerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a Turkish coffee cup, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type FortuneTellerInput = z.infer<typeof FortuneTellerInputSchema>;

const FortuneTellerOutputSchema = z.object({
  fortune: z.string().describe("The fortune read from the coffee grounds. Should be in Turkish."),
});
export type FortuneTellerOutput = z.infer<typeof FortuneTellerOutputSchema>;

export async function tellFortune(input: FortuneTellerInput): Promise<FortuneTellerOutput> {
  return fortuneTellerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'fortuneTellerPrompt',
  input: {schema: FortuneTellerInputSchema},
  output: {schema: FortuneTellerOutputSchema},
  prompt: `You are an expert Turkish coffee fortune teller (Kahve Falı). You will be given an image of a coffee cup with grounds.

Your task is to analyze the patterns and symbols in the coffee grounds and provide a fortune reading in Turkish. The reading should be insightful, a bit mystical, and positive in tone.

Look for common symbols like animals, objects, and numbers and interpret their meaning in the context of the user's life (love, work, travel, etc.). The response must be entirely in Turkish.

Photo: {{media url=photoDataUri}}`,
});

const fortuneTellerFlow = ai.defineFlow(
  {
    name: 'fortuneTellerFlow',
    inputSchema: FortuneTellerInputSchema,
    outputSchema: FortuneTellerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
