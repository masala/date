import {month, monthParser} from "../src/month";
import {year, yearParser} from "../src/year";



    test('parsing months', () => {
        const monthParser = month().val("mm");
        const val = monthParser.val("12");
        expect(val).toEqual({month:12});
    });

    test('parsing bad months', () => {
        const monthParser = month().val("mm");
        const val = monthParser.val("13");
        expect(val).toEqual(undefined);
    });

    test('combineTest', ()=>{
        const tuple = monthParser(2).then(yearParser(4))
            .val("112020");

        expect(tuple.value).toEqual([{month:11}, {year:2020}]);
    })
