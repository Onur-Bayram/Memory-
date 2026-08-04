export type Player = 'blue' | 'orange';
export type Winner = Player | 'draw';
export type BoardSize = 16 | 24 | 36;
export type Theme = 'code-vibes' | 'gaming' | 'da-projects' | 'foods';

export type GameSettings = {
  theme: Theme;
  boardSize: BoardSize;
  firstPlayer: Player;
};

export type BoardConfig = {
  pairCount: number;
  fieldClass: string;
};

// pairCount is the number of pairs, not the number of all cards.
export const boardConfigs: Record<BoardSize, BoardConfig> = {
  16: {
    pairCount: 8,
    fieldClass: 'field--16',
  },
  24: {
    pairCount: 12,
    fieldClass: 'field--24',
  },
  36: {
    pairCount: 18,
    fieldClass: 'field--36',
  },
};
