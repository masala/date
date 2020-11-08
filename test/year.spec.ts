import {yearParser, year} from "../src/year";


test('parsing year 2010', () => {
    const val = yearParser(4).val("2010");
    expect(val).toEqual({year: 2010});
});


test('parsing the right amount of number', () => {
    const val = yearParser(5).val("2010");
    expect(val).toBe(undefined);
});


test('parsingYears', () => {
    const yearsParser = year().val("YYYY");
    const val = yearsParser.val("2010");
    expect(val).toEqual({year: 2010});
});