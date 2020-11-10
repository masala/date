import {Streams, F, C, GenLex, TupleParser, Tuple, Parser, IParser, Token, TokenResult} from '@masala/parser'
import {month, monthParser} from "./month";
import {year, yearParser} from "./year";


/**
 * Created by Nicolas Zozol on 2020/11/05
 */


type Item = string;
type Separator = string;

const genlex = new GenLex();

export function thenify(parsers: IParser<any>[]):TupleParser<any>{

    return parsers.reduce( (p, next)=> p.then(next), F.nop()) as TupleParser<any>;

}

const monthToken = genlex.tokenize(month(), "month", 1000);
const yearToken = genlex.tokenize(year(), "year", 1000);
const separatorToken = genlex.tokenize(C.charNotIn("mY"), "sep", 10000); // a letter would be the separator.
// 2nd step: the parser should be map to a parser that accept the same char

const grammar = F.any().rep().map((tuple:Tuple<TokenResult<Parser<any>>>) => thenify(tuple.array().map(t=>t.value)))

export const parser = genlex.use(grammar);


export const dateParser = C.char('a')
    .then(C.char('b'))
    .then(C.char('c'))
    .eos()

