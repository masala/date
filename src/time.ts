import {C, F, IParser, N, Tuple} from '@masala/parser'


/**
 * Parsers
 */
export function amPmHoursParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(amPmHours => ({amPmHours}));
}

export function amPmMarkerParser(){
    const am = C.stringIn(['AM', 'am', 'a.m.']).returns('AM')
    const pm = C.stringIn(['PM', 'pm', 'p.m.']).returns('PM')
    return tryAll([am, pm]).map(amPmMarker=> ({amPmMarker}));
}

export function twentyFourHoursParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(twentyFourHours => ({twentyFourHours}));
}

export function minutesParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(minutes => ({minutes}));
}

export function secondsParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(seconds => ({seconds}));
}

export function milliSecondsParser() {
    return N.digit().occurrence(3).map(t => t.join('')).map(s => parseInt(s)).map(millis => ({millis}));
}

const sign = () => tryAll([C.char('+'), C.char('-')]);
const twelveMax =()=>N.digit().occurrence(2).filter(f=>parseInt(f.join(''))<=12)
const twentyFourMax =()=>N.digit().occurrence(2).filter(f=>parseInt(f.join(''))<=24)
const sixtyMax =()=>N.digit().occurrence(2).filter(f=>parseInt(f.join(''))<60)

// concat2([+,0,6,3,0],1) -> 6
// concat2([+,0,6,3,0],3) -> 30
function concat2(tuple:Tuple<string>, index:number){
    return parseInt(''+tuple.at(index)+tuple.at(index+1));
}
// same with sign
function concat3(tuple:Tuple<string>, index:number){
    return parseInt(''+tuple.at(index)+tuple.at(index+1)+tuple.at(index+2));
}

export function timeZoneZParser() {
    //-08; -0800; -08:00

    const first = sign().then(twelveMax()).map(v => ({timezone: v.join(''), tz:'Z', tzHours:concat3(v,0)}))
    const second = sign().then(twelveMax()).then(sixtyMax()).map(v => (
        {timezone: v.join(''), tz:'Z', tzHours:concat3(v,0), tzMinutes:concat2(v,3)})
    )
    const third = sign()
        .then(twelveMax())
        .then(C.char(":"))
        .then(sixtyMax())
        .map(v => ({timezone: v.join(''), tz:'Z', tzHours:concat3(v,0), tzMinutes:concat2(v,4)}));
    return tryAll([third, second, first]);
}




/**
 * TOKENS that return the parser
 */

export function amPmHours() {
    return C.string('hh').map(() => amPmHoursParser());
}

export function amPmMarker() {
    return C.string('a').map(() => amPmMarkerParser());
}

export function twentyFourHours() {
    return C.string('HH').map(() => twentyFourHoursParser());
}

export function minutes() {
    return C.string('mm').map(() => minutesParser());
}

export function seconds() {
    return C.string('ss').map(() => secondsParser());
}

export function milliSeconds() {
    return C.string('SSS').map(() => milliSecondsParser());
}

export function timeZone(){
    return C.char('Z').map(()=>timeZoneZParser());
}

export function timeSeparator(){
    return C.char('T').map(()=>C.char('T').drop())
}

function tryAll(array: IParser<any>[]) {
    if (array.length === 0) {
        return F.nop();
    }
    let parser = F.try(array[0]);
    for (let i = 1; i < array.length; i++) {
        parser = parser.or(F.try(array[i]));
    }

    return parser;
}