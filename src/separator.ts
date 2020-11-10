import {F, C, N} from '@masala/parser'

export function separatorParser(char: string) {

    if (char.length !== 1) {
        throw "char is too long: " + char;
    }
    return F.any()
        .filter(c => c === char)
        .map(char => ({char}));
}

export function separator() {

    return C.charNotIn("mY").map((c) => separatorParser(c));

}
