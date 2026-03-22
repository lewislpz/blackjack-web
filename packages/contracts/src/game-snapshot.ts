import { z } from 'zod';

import { CardViewSchema } from './card-view';

export const RoundPhaseSchema = z.enum(['playerTurn', 'complete']);
export const RoundOutcomeSchema = z.enum([
  'player-blackjack',
  'dealer-blackjack',
  'player-win',
  'dealer-win',
  'player-bust',
  'dealer-bust',
  'push',
]);

export const HandSnapshotSchema = z.object({
  cards: z.array(CardViewSchema),
  total: z.number().int().nullable(),
  visibleTotal: z.number().int(),
  isBlackjack: z.boolean(),
  isBust: z.boolean(),
});

export const RoundResolutionSchema = z.object({
  outcome: RoundOutcomeSchema,
  payoutDelta: z.number().int(),
  message: z.string(),
});

export const RoundSnapshotSchema = z.object({
  roundNumber: z.number().int().positive(),
  phase: RoundPhaseSchema,
  bet: z.number().int().positive(),
  doubledDown: z.boolean(),
  dealerRevealed: z.boolean(),
  player: HandSnapshotSchema,
  dealer: HandSnapshotSchema,
  resolution: RoundResolutionSchema.nullable(),
});

export const AllowedActionsSchema = z.object({
  canStartRound: z.boolean(),
  canHit: z.boolean(),
  canStand: z.boolean(),
  canDoubleDown: z.boolean(),
  canCreateSession: z.boolean(),
});

export const RoundHistoryEntrySchema = z.object({
  roundNumber: z.number().int().positive(),
  outcome: RoundOutcomeSchema,
  bet: z.number().int().positive(),
  payoutDelta: z.number().int(),
  balanceAfterRound: z.number().int().min(0),
  timestamp: z.string(),
});

export const GameSnapshotSchema = z.object({
  sessionId: z.string(),
  balance: z.number().int().min(0),
  minimumBet: z.number().int().positive(),
  chipOptions: z.array(z.number().int().positive()).min(1),
  bankrollExhausted: z.boolean(),
  tableMessage: z.string(),
  allowedActions: AllowedActionsSchema,
  currentRound: RoundSnapshotSchema.nullable(),
  history: z.array(RoundHistoryEntrySchema),
});

export const StartRoundRequestSchema = z.object({
  bet: z.number().int().positive(),
});

export const CreateSessionResponseSchema = GameSnapshotSchema;

export const ApiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
});

export type RoundPhase = z.infer<typeof RoundPhaseSchema>;
export type RoundOutcome = z.infer<typeof RoundOutcomeSchema>;
export type HandSnapshot = z.infer<typeof HandSnapshotSchema>;
export type RoundResolution = z.infer<typeof RoundResolutionSchema>;
export type RoundSnapshot = z.infer<typeof RoundSnapshotSchema>;
export type AllowedActions = z.infer<typeof AllowedActionsSchema>;
export type RoundHistoryEntry = z.infer<typeof RoundHistoryEntrySchema>;
export type GameSnapshot = z.infer<typeof GameSnapshotSchema>;
export type StartRoundRequest = z.infer<typeof StartRoundRequestSchema>;
export type CreateSessionResponse = z.infer<typeof CreateSessionResponseSchema>;
export type ApiError = z.infer<typeof ApiErrorSchema>;

