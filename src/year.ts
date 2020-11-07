import {C, N} from "@masala/parser";

export function yearParser(n:number){

    if (n < 1){
        throw "illegal number of year";
    }
    let parser = N.digit().map(n=>""+n);
    n--;
    while (n>0){
        parser = parser.then(N.digit()).map(t=>t.join(""))
        n--
    }
    return parser.map(s => parseInt(s));
}
