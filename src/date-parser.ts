import {
    Streams,
    F,
    C,
    GenLex,
    TupleParser,
    Tuple,
    Parser,
    IParser,
    Token,
    TokenResult,
    SingleParser
} from '@masala/parser'
import {month, monthParser} from "./month";
import {year, yearParser} from "./year";
import {separator} from './separator'
import {amPmHours, amPmMarker, milliSeconds, minutes, seconds, twentyFourHours} from './time'


/**
 * Created by Nicolas Zozol on 2020/11/05
 * Following simplification of: https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html
 */


type Item = string;
type Separator = string;

const genlex = new GenLex();

interface DateResult{
    year?:number;
    month?:number;

}

export function thenify(parsers: IParser<any>[]):SingleParser<DateResult>{

    const tupleParser= parsers.reduce( (p, next)=> p.then(next), F.nop()) as TupleParser<any>;
    // removing the separators
    //return tupleParser.map( (tuple:Tuple<any>) => tuple.array().filter(i => i.sep!==undefined) );
    return tupleParser.map( (value:Tuple<any>) => value.array().reduce( (acc, next)=> next.char ? acc : {...acc, ...next}, {}))

}

const monthToken = genlex.tokenize(month(), "month", 1000);
const yearToken = genlex.tokenize(year(), "year", 1000);
const amPmHoursToken = genlex.tokenize(amPmHours(), "amPmHours", 1000);
const amPmMarkerToken = genlex.tokenize(amPmMarker(), "amPmMarker", 1000);
const twentyFourHoursToken = genlex.tokenize(twentyFourHours(), "twentyFourHours", 1000);
const minutesToken = genlex.tokenize(minutes(), "minutes", 1000);
const secondsToken = genlex.tokenize(seconds(), "seconds", 1000);
const milliSecondsToken = genlex.tokenize(milliSeconds(), "milliSeconds", 1000);
const separatorToken = genlex.tokenize(separator(), "sep", 10000); // a letter would
// remove any possibility a separator is found
genlex.setSeparatorsParser(F.any().filter(c => c === Symbol()))
// be the
// separator.
// 2nd step: the parser should be map to a parser that accept the same char

const grammar = F.any().rep()
    .map((tuple:Tuple<TokenResult<Parser<any>>>) => thenify(tuple.array().map(t=>t.value)))


export const dateParser = genlex.use(grammar);


