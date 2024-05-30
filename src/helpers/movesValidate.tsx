
enum Player {
    p1='White',
    p2='Black'
}
const validateMoves = ( piece: string, startPos:number[],endPos:number[],current:string) => {

            const pieceType: Record<string, string> = {
                r: 'rook',
                k: 'king',
                b: 'bishop',
                q: 'queen',
                kg: 'king',
                p: 'pawn',
            };

    const [fromRow, fromCol] = startPos;
    const [toRow, toCol] = endPos;


    if (pieceType[piece] === 'pawn') {
      const isPawnMovingForward = current === Player.p1 && toRow < fromRow || current === Player.p2 && toRow > fromRow;
      if (isPawnMovingForward) return false;

      const isPawnMovingDiagonally = Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1;
      if (isPawnMovingDiagonally) return true;

      const isPawnMovingHorizontally = Math.abs(toCol - fromCol) === 1 && toRow === fromRow;
      if (isPawnMovingHorizontally) return true;

      const isPawnMovingVertically = Math.abs(toRow - fromRow) === 1 && toCol === fromCol;
      if (isPawnMovingVertically) return true;

      return false;
    }
};

export default validateMoves

