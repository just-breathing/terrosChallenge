import { FC } from "react";

type Props = {
    ch:string,
    rowID:number,
    colID:number,
    current:string,
    pieceColor:string

}
const Piece:FC<Props> = ({ch,rowID,colID,current,pieceColor}) => {
    const backgroundClass = (rowID + colID) % 2 === 0 ? 'bg-black-50' : 'bg-white-50';
    const isDraggable=(current===pieceColor)||(current===pieceColor);
    const handleDrag=(e:any)=>{
        e.dataTransfer.effectAllow='move';
        e.dataTransfer?.setData('text/plain',`${ch},${rowID},${colID}`);
    }

    return (
             <div className={`border-2 border-black p-5 md:w-[90px] md:h-[90px] flex justify-center items-center ${backgroundClass} `}  >
                {ch&& <img  src={`/assets/${ch}.svg`}  alt={`${ch}`} draggable={isDraggable} onDragStart={handleDrag} />}
            </div> 
        );
}
export default Piece;

