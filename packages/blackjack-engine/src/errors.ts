export const RULE_ERROR_CODES = [
  'ROUND_COMPLETE',
  'ACTION_NOT_ALLOWED',
  'INSUFFICIENT_BALANCE',
  'INVALID_BET',
] as const;

export type RuleErrorCode = (typeof RULE_ERROR_CODES)[number];

export class BlackjackRuleError extends Error {
  readonly code: RuleErrorCode;

  constructor(code: RuleErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'BlackjackRuleError';
  }
}

