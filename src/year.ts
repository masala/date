import {C, N} from "@masala/parser";

export function yearParser(n:number){

    if (n < 1){
        throw "illegal number of year";
    }
    return N.digit().occurrence(n).map(t => t.join('')).map(s => parseInt(s)).map(year=>({year}));
}

export function year(){

    return C.char('Y').occurrence(4).map( ()=> yearParser(4));

}