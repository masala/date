import {
    F,
    GenLex,
    TupleParser,
    Tuple,
    Parser,
    IParser,
    TokenResult,
    SingleParser
} from '@masala/parser'
import {month} from "./month";
import {year} from "./year";
import {separator} from './separator'
import {
    amPmHours,
    amPmMarker,
    milliSeconds,
    minutes,
    seconds,
    twentyFourHours,
    timeZone,
    timeSeparator
} from './time'
import {day} from './day'


/**
 * Created by Nicolas Zozol on 2020/11/05
 * Following simplification of: https://docs.oracle.com/javase/8/docs/api/java/text/SimpleDateFormat.html
 */
const genlex = new GenLex();

export interface DateResult{
    date?:Date;
    year?:number;
    month?:number;
    day?:number;
    amPmHours?:number;
    amPmMarker?:string;
    twentyFourHours?:number;
    minutes?:number;
    seconds?:number;
    millis?:number;
    timezone?:string;
    tzHours?:number;
    tzMinutes?:number;
}

export function thenify(parsers: IParser<any>[]):SingleParser<DateResult>{

    const tupleParser= parsers.reduce( (p, next)=> p.then(next), F.nop()) as TupleParser<any>;
    // removing the separators
    //return tupleParser.map( (tuple:Tuple<any>) => tuple.array().filter(i => i.sep!==undefined) );
    return tupleParser.map( (value:Tuple<any>) => value.array().reduce( (acc, next)=> next.char ? acc : {...acc, ...next}, {}))

}

function createDate(value:DateResult){
    let result = new Date();

    if (value.year!== undefined){
        result.setFullYear(value.year);
    }
    if(value.month!== undefined){
        result.setMonth(value.month-1);
    }
    if (value.day!== undefined){
        result.setDate(value.day);
    }
    if (value.amPmHours!== undefined){
        const addPM = value.amPmMarker ==='PM' ? 12 : 0;
        result.setHours(value.amPmHours  + addPM)
    }
    if (value.twentyFourHours!== undefined){
        result.setHours(value.twentyFourHours);
    }
    if (value.minutes!== undefined){
        result.setMinutes(value.minutes);
    }
    if (value.seconds!== undefined){
        result.setSeconds(value.seconds);
    }
    if (value.millis!== undefined){
        result.setMilliseconds(value.millis);
    }
    if (value.timezone!== undefined){

        // setting time to utc, assuming this computer is in utc
        result.setHours(result.getHours()-value.tzHours!)

        // offsetting local -60 min  ; utc = local + (-60)
        result.setMinutes(result.getMinutes()  - result.getTimezoneOffset());

        if (value.tzMinutes){
            result.setMinutes(result.getMinutes()+value.tzMinutes)
        }
    }
    return result;
}

const yearToken = genlex.tokenize(year(), "year", 1000);
const monthToken = genlex.tokenize(month(), "month", 1000);
const dayToken = genlex.tokenize(day(), "day", 1000);
const timeSeparatorToken = genlex.tokenize(timeSeparator(), "timeSeparator", 1000);
const amPmHoursToken = genlex.tokenize(amPmHours(), "amPmHours", 1000);
const amPmMarkerToken = genlex.tokenize(amPmMarker(), "amPmMarker", 1000);
const twentyFourHoursToken = genlex.tokenize(twentyFourHours(), "twentyFourHours", 1000);
const minutesToken = genlex.tokenize(minutes(), "minutes", 1000);
const secondsToken = genlex.tokenize(seconds(), "seconds", 1000);
const milliSecondsToken = genlex.tokenize(milliSeconds(), "milliSeconds", 1000);
const timeZoneToken = genlex.tokenize(timeZone(), "timeZone", 1000);
const separatorToken = genlex.tokenize(separator(), "sep", 10000); // a letter would
// remove any possibility another separator is found
genlex.setSeparatorsParser(F.any().filter(c => c === Symbol()))

// 2nd step: the parser should be map to a parser that accept the same char

const grammar:SingleParser<SingleParser<DateResult>> = F.any().rep()
    .map((tuple:Tuple<TokenResult<Parser<any>>>) => thenify(tuple.array().map(t=>t.value)))
    .map(parser => parser.map(value=>({...value, date:createDate(value)})));


export const dateParser = genlex.use(grammar);


