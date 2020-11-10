import {parser} from "../src/date-parser";

test('parsingGenlex', () => {


    const p = parser.val("mmYYYY");
    const val = p.val("122010");


    expect(val.value).toEqual([{"month": 12}, {"year": 2010}]);
});

test('parsingGenlexWithSeparator', () => {


    const p = parser.val("mm-YYYY");
    const val = p.val("12-2010");


    expect(val.value).toEqual([{"month": 12}, {"year": 2010}]);
});

test('parsingGenlexWithSpaceSeparator', () => {


    const p = parser.val("mm YYYY");
    const val = p.val("12 2010");


    expect(val.value).toEqual([{"month": 12}, {"year": 2010}]);
});