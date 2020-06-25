import {useState,useEffect,useCallback} from 'react';

export const useGameStatus =rowsCleared =>{
    const [score,setScore]=useState(0);
    const [rows,setRows]=useState(0);
    const [level,setLevel]=useState(0);

    const linePoints=[40,100,200,1200];

    const calcScore=useCallback(()=>{
        //check if score exists. if no rows cleared, score doesn't change
        if(rowsCleared >0){
            //formula to calculate the score
            setScore(prev=>prev+linePoints[rowsCleared-1]*(level+1));
            setRows(prev=>prev+rowsCleared);

        }
    },[level,linePoints,rowsCleared])
    //the above array is to make sure it changes only when level, linepoints or rows cleared chanegs and not on every render

    useEffect(()=>{
        calcScore();

    },[calcScore,rowsCleared,score])

    return[score,setScore,rows,setRows,level,setLevel]

}