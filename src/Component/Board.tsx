import { FC, useEffect, useState, useRef } from "react";
import Piece from "./Piece.tsx";
import validateMoves from "../helpers/movesValidate.tsx";

enum Player {
    p1='White',
    p2='Black'
}
type Counter={
    [Player.p1]:0,
    [Player.p2]:0
}

const Board:FC = () => {

    const pieces=['r','k','b','q','kg','p'];

    const boardRef=useRef<HTMLDivElement>(null);

    const rowsCount=8
    const [board,setBoard]=useState<string[][]>([[]])
    const [current,setCurrent]=useState<Player>(Player.p1);
    const [counter,setCounter]=useState<Counter>({White:0,Black:0});

        const newPosition = (e:any):{row:number,col:number}=>{
            if(boardRef.current){
                const {top,left,width}=boardRef.current?.getBoundingClientRect();
                const {clientX,clientY}=e;
                const size=width/8;
                const row = Math.floor((clientY-top)/size);
                const col = Math.floor((clientX-left)/size);
                return {row,col}                
            }
            return {row:0,col:0}
        }
        const handleDrop = (e: any) => {
            const { row, col } = newPosition(e);
            const data = e.dataTransfer?.getData('text/plain');
            const [ch, rowID, colID] = data.split(','); 
          if(validateMoves(ch.substring(1),[rowID,colID],[row,col],current))
            {
                setBoard(prevValues => {
                    const updatedBoard = prevValues.map((r, rIndex) => {
                      if (rIndex === parseInt(rowID)) {
                        return r.map((c, cIndex) => (cIndex === parseInt(colID) ? '' : c));
                      } else if (rIndex === row) {
                        return r.map((c, cIndex) => (cIndex === col ? ch : c));
                      }
                      return r;
                    });
                
                    return updatedBoard;
                  });
                      setCurrent((prev)=>prev===Player.p1?Player.p2:Player.p1);
            }

          };
          

    useEffect(()=>{
        let Board=Array(rowsCount).fill(Array(rowsCount).fill(''));
        Board[0]=['br','bk','bb','bq','bkg','bb','bk','br'];
        Board[1]=['bp','bp','bp','bp','bp','bp','bp','bp'];
        Board[6]=['wp','wp','wp','wp','wp','wp','wp','wp'];
        Board[7]=['wr','wk','wb','wq','wkg','wb','wk','wr'];
        setBoard(()=>Board);
        console.log(Board);

    },[])

    
    return ( 
        <div className="text-3xl font-bold grid justify-center " >
            <h3>Chess Game Board </h3>
            <div className="grid grid-cols-2  " >
            <h5 className=" grid place-items-center" >Total Moves</h5>
            <div className="grid grid-rows-2" >
                <h5>{Player.p1}: {counter.White}</h5>
                <h5>{Player.p2}: {counter.Black}</h5>
            </div>
            </div>
        <div  ref={boardRef} className={`grid grid-cols-8  justify-center w-max h-max mt-[50px]`} onDragOver={e=>e.preventDefault()}  onDrop={handleDrop} >
        {board&&
        board.map((row,rowNo)=>(
                    row.map((cell,ColNo)=>(
                        <Piece key={rowNo+"-"+ColNo} ch={cell} rowID={rowNo} colID={ColNo} pieceColor={cell.startsWith('b')?Player.p2:Player.p1} current={current} />
                    ))
            ))}
        </div>
        <h5 className="mt-5" >Current Player : {current}</h5>
        </div> 
    );
}
 
export default Board;