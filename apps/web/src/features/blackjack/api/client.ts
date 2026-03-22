import {
  ApiErrorSchema,
  CreateSessionResponseSchema,
  GameSnapshotSchema,
  StartRoundRequestSchema,
  type GameSnapshot,
} from '@blackjack/contracts';

const parseResponse = async (response: Response): Promise<GameSnapshot> => {
  const payload = await response.json();

  if (!response.ok) {
    const error = ApiErrorSchema.parse(payload);
    throw new Error(error.message);
  }

  return GameSnapshotSchema.parse(payload);
};

const postJson = async <TPayload>(url: string, payload?: TPayload): Promise<GameSnapshot> => {
  const request: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (payload !== undefined) {
    request.body = JSON.stringify(payload);
  }

  const response = await fetch(url, request);

  return parseResponse(response);
};

export const createSession = async (): Promise<GameSnapshot> => {
  const response = await fetch('/api/session', {
    method: 'POST',
  });
  const payload = await response.json();

  if (!response.ok) {
    const error = ApiErrorSchema.parse(payload);
    throw new Error(error.message);
  }

  return CreateSessionResponseSchema.parse(payload);
};

export const startRound = async (sessionId: string, bet: number): Promise<GameSnapshot> =>
  postJson(`/api/session/${sessionId}/round`, StartRoundRequestSchema.parse({ bet }));

export const hit = async (sessionId: string): Promise<GameSnapshot> =>
  postJson(`/api/session/${sessionId}/action/hit`);

export const stand = async (sessionId: string): Promise<GameSnapshot> =>
  postJson(`/api/session/${sessionId}/action/stand`);

export const doubleDown = async (sessionId: string): Promise<GameSnapshot> =>
  postJson(`/api/session/${sessionId}/action/double-down`);
