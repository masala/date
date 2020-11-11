import {C, N} from "@masala/parser";

// Always using 2, but could be simplified
export function dayParser(n:number){
    return N.digit().occurrence(n).map(t => t.join('')).map(s => parseInt(s)).map(day=>({day}));
}

export function day(){
    return C.string('dd').map( ()=> dayParser(2));
}
