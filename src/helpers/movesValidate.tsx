


const pieceType: Record<string, string> = {
    r: 'rook',
    k: 'knight',
    b: 'bishop',
    q: 'queen',
    kg: 'king',
    p: 'pawn',
};



const validateMoves = (piece: string,color:string, startPos: number[], endPos: number[]) => {
    const [fromRow, fromCol] = startPos;
    const [toRow, toCol] = endPos;


    switch (pieceType[piece]) {
        case 'rook':
            return isRookMove(fromRow, fromCol, toRow, toCol);
        case 'knight':
            return isKnightMove(fromRow, fromCol, toRow, toCol);
        case 'bishop':
            return isBishopMove(fromRow, fromCol, toRow, toCol);
        case 'king':
            return isKingMove(fromRow, fromCol, toRow, toCol);
        case 'queen':
            return isQueenMove(fromRow, fromCol, toRow, toCol);
        case 'pawn':
            return isPawnMove( fromRow, fromCol, toRow, toCol,color);
        default:
            return false;
    }
};

const isKnightMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const distanceRow = Math.abs(toRow - fromRow);
    const distanceCol = Math.abs(toCol - fromCol);
    return (distanceRow === 2 && distanceCol === 1) || (distanceRow === 1 && distanceCol === 2);
};

const isRookMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const isMovingHorizontally = Math.abs(toRow - fromRow) === 0 && Math.abs(toCol - fromCol) > 0;
    const isMovingVertically = Math.abs(toCol - fromCol) === 0 && Math.abs(toRow - fromRow) > 0;

    return isMovingHorizontally || isMovingVertically;
};

const isBishopMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    const isMovingDiagonally = Math.abs(toRow - fromRow) === Math.abs(toCol - fromCol);

    return isMovingDiagonally;
};

const isKingMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    return (
        Math.abs(toRow - fromRow) <= 1 &&
        Math.abs(toCol - fromCol) <= 1
    );
};

const isQueenMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    return isRookMove(fromRow, fromCol, toRow, toCol) || isBishopMove(fromRow, fromCol, toRow, toCol);
};

const isPawnMove = ( fromRow: number, fromCol: number, toRow: number, toCol: number,color:string) => {
    const isMovingDiagonally = Math.abs(toRow - fromRow) === 1 && Math.abs(toCol - fromCol) === 1;
    const isMovingVertically =   Math.abs(toCol - fromCol) === 0 && (color==='b' ?(toRow - fromRow) === 1:  fromRow - toRow === 1);
    
    return  isMovingDiagonally  || isMovingVertically;
};

export default validateMoves

