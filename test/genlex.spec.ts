import {dateParser} from "../src/date-parser";
import {Streams} from '@masala/parser'

describe('dateParser Genlex', function () {
    test('parsingGenlex', () => {

        const p = dateParser.val("MMYYYY");
        const val = p.val("122010");
        delete val.date;
        expect(val).toEqual({month: 12, year: 2010});
    });

    test('parsingGenlexWithSeparator', () => {

        const p = dateParser.val("MM-YYYY");
        const val = p.val("12-2010");
        delete val.date;
        expect(val).toEqual({month: 12, year: 2010});
    });

    test('parsingGenlexWithSpaceSeparator', () => {


        const p = dateParser.val("MM YYYY");
        const val = p.val("12 2010");
        delete val.date;
        expect(val).toEqual({month: 12, year: 2010});
    });

    test('parsingGenlexWithMultipleSeparator', () => {

        const p = dateParser.val("YYYY::MM");
        const val = p.val("2010::10");
        delete val.date;
        expect(val).toEqual({month: 10, year: 2010});
        const fail = p.val('10::2010');
        expect(fail).toBe(undefined);

        const multipleDifferent = dateParser.val("MM: YYYY");
        const withMultipleDifferent = multipleDifferent.val('10: 2010');
        delete withMultipleDifferent.date;
        expect(withMultipleDifferent).toEqual({month: 10, year: 2010})
    });

    test("full date ", () => {
        const parser = dateParser.val("YYYY-MM-ddThh:mm:ss::SSS a Z");
        const response = parser.parse(Streams.ofString('2020-08-27T08:55:04::012 a.m. -06'));
        expect(response.isAccepted()).toBeTruthy();
    })

});