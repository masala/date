import {C, F, IParser, N} from '@masala/parser'

export function usHoursParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(day => ({day}));
}

export function europeHoursParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(day => ({day}));
}

export function minutesParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(day => ({day}));
}

export function secondsParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(day => ({day}));
}

export function milliSecondsParser() {
    return N.digit().occurrence(2).map(t => t.join('')).map(s => parseInt(s)).map(day => ({day}));
}

const sign = () => tryAll([C.char('+'), C.char('-')]);
const twelveMax =()=>N.digit().occurrence(2).filter(f=>parseInt(f.join(''))<=12)
const sixtyMax =()=>N.digit().occurrence(2).filter(f=>parseInt(f.join(''))<60)

export function timeZoneXIsoParser() {
    //-08; -0800; -08:00

    const first = sign().then(twelveMax()).map(v => ({timezone: v.join(''), tz:'X'}))
    const second = sign().then(twelveMax()).then(sixtyMax()).map(v => ({timezone: v.join(''), tz:'X'}))
    const third = sign()
        .then(twelveMax())
        .then(C.char(":"))
        .then(sixtyMax())
        .map(v => ({timezone: v.join(''), tz:'X'}));
    return tryAll([third, second, first]);
}

export function timeZoneZRfcParser() {
    return sign().then(N.digit().occurrence(4)).map(v => ({timezone: v.join(''), tz:'Z'}))
}

export function usHours() {
    return C.string('hh').map(() => usHoursParser());
}

export function europeHours() {
    return C.string('HH').map(() => usHoursParser());
}

export function seconds() {
    return C.string('ss').map(() => usHoursParser());
}

export function milliSeconds() {
    return C.string('SSS').map(() => usHoursParser());
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