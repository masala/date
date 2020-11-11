import {separator} from '../src/separator'

describe('separator suite', function () {

    test('parsingSeparator', () => {
        const separatorParser = separator().val("-");
        const val = separatorParser.val("-");
        expect(val).toEqual({char: "-"});
    });

    test('parsingSpaceSeparator', () => {
        const separatorParser = separator().val(" ");
        const val = separatorParser.val(" ");
        expect(val).toEqual({char: " "});
    });

});