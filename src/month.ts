import {C, N} from "@masala/parser";

export function monthParser(n:number){

    if (n < 1){
        throw "illegal number of month";
    }
    return N.digit().occurrence(n)
        .map(t => t.join('')).map(s => parseInt(s))
        .filter(m => m>=0 && m<=12)
        .map(month => ({month}));
}

export function month(){

    return C.char('M').occurrence(2).map( ()=> monthParser(2));

}

