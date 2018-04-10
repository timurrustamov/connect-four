export type UserId = number;
export type BoardGrid = (UserId | undefined)[];
export type IndexedBoardGrid = {
  index: number,
  value: UserId | undefined
}[];

export enum MatchState {
  Menu,
  InGame,
  Draw,
  Results
}

export type Theme = {
  boardBackgroundColor: React.CSSProperties['backgroundColor'],
  boardBackgroundShadowColor: React.CSSProperties['color'],
  boardHolesColor: React.CSSProperties['backgroundColor'],
  boardHolesShadowColor: React.CSSProperties['color'],
  boardHolesOnHoverColor: React.CSSProperties['backgroundColor'],
  playerColors: React.CSSProperties['backgroundColor'][]
}

export type State = {
  /**
   * This part of state describes current game grid state.
   * To be clearer, it is called the `board`.
   */
  board: {
    /**
     * This 1D array describes current grid with indexes as cell indexes
     * and its value is a User Id or `undefined`
     */
    grid: BoardGrid,
    /**
     * Desribes current dimensions of the game board grid.
     */
    dimensions: {
      gridHeight: number,
      gridWidth: number
    }
  },
  /**
   * Current players ID.
   */
  currentPlayer: UserId,
  /**
   * Describes current match state.
   */
  match: {
    /**
     * Match state (is actually the app state)
     */
    state: MatchState,
    /**
     * Latest winner of the match
     */
    winner?: UserId,
    /**
     * Grid sequence that caused victory
     */
    winningSequence: IndexedBoardGrid
  },
  /**
   * Additional information enforcing game rules
   * _Currently unused_
   */
  illegalMoves: {
    columnId: number,
    userId: number
  }[],
  /**
   * Match options
   */
  options: {
    /**
     * Number of players in current match
     * (this should not excede 4 or you must add player colors to the theme)
     */
    players: number
  },
  theme: Theme
};

export const createState = (gridWidth = 10, gridHeight = 4): State => ({
  board: {
    grid: Array(gridHeight * gridWidth).fill(undefined),
    dimensions: {
      gridHeight,
      gridWidth
    }
  },
  currentPlayer: 0,
  match: {
    state: MatchState.Menu,
    winningSequence: []
  },
  illegalMoves: [],
  options: {
    players: 2
  },
  theme: {
    boardBackgroundColor: '#326FC8',
    boardBackgroundShadowColor: '#333',
    boardHolesColor: 'transparent',
    boardHolesOnHoverColor: '#eee',
    boardHolesShadowColor: '#333',
    playerColors: [
      'red',
      'blue',
      'palevioletred',
      'green'
    ]
  }
});

export const DefaultState = createState();

export default DefaultState;