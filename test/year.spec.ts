import {yearParser} from "../src/year";


test('parsing year 2010', () => {
    const val = yearParser(4)..val("2010");
    expect(val).toBe(2010);
});


test('parsing the right amount of number', () => {
    const val = yearParser(5).val("2010");
    expect(val).toBe(undefined);
});
