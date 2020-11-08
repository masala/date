import {parser} from "../src/date-parser";

test('parsingGenlex', () => {


    const p = parser.val("mmYYYY");
    const val = p.val("122010");


    expect(val.value).toEqual([{"month": 12}, {"year": 2010}]);
});