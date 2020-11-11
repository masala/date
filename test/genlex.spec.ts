import {dateParser} from "../src/date-parser";

test('parsingGenlex', () => {


    const p = dateParser.val("mmYYYY");
    const val = p.val("122010");


    expect(val).toEqual({month: 12,year: 2010});
});

test('parsingGenlexWithSeparator', () => {


    const p = dateParser.val("mm-YYYY");
    const val = p.val("12-2010");
    expect(val).toEqual({month: 12, year: 2010});
});

test('parsingGenlexWithSpaceSeparator', () => {


    const p = dateParser.val("mm YYYY");
    const val = p.val("12 2010");


    expect(val).toEqual({month: 12, year: 2010});
});

test('parsingGenlexWithMultipleSeparator', () => {

    const p = dateParser.val("YYYY::mm");
    const val = p.val("2010::10");
    expect(val).toEqual({month: 10, year: 2010});
    const fail = p.val('10::2010');
    expect(fail).toBe(undefined);

    const multipleDifferent = dateParser.val("mm: YYYY");
    const withMultipleDifferent = multipleDifferent.val('10: 2010');
    expect(withMultipleDifferent).toEqual({month: 10, year: 2010})
});