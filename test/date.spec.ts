import {dateParser} from '../src/date-parser'

test('parsingGenlexWithMultipleSeparator', () => {

    const p = dateParser.val("YYYY::MM");
    const val = p.val("2010::10");


});