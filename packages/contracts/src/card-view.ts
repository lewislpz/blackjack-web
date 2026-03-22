import { z } from 'zod';

export const SuitSchema = z.enum(['clubs', 'diamonds', 'hearts', 'spades']);
export const RankSchema = z.enum([
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'J',
  'Q',
  'K',
  'A',
]);

export const FaceUpCardSchema = z.object({
  kind: z.literal('faceUp'),
  id: z.string(),
  rank: RankSchema,
  suit: SuitSchema,
  label: z.string(),
});

export const FaceDownCardSchema = z.object({
  kind: z.literal('faceDown'),
  id: z.string(),
  label: z.literal('Face down card'),
});

export const CardViewSchema = z.discriminatedUnion('kind', [
  FaceUpCardSchema,
  FaceDownCardSchema,
]);

export type Suit = z.infer<typeof SuitSchema>;
export type Rank = z.infer<typeof RankSchema>;
export type FaceUpCard = z.infer<typeof FaceUpCardSchema>;
export type FaceDownCard = z.infer<typeof FaceDownCardSchema>;
export type CardView = z.infer<typeof CardViewSchema>;

