import {separator} from '../src/separator'


test('parsingSeparator', () => {
    const separatorParser = separator().val("-");
    const val = separatorParser.val("-");
    expect(val).toEqual({char:"-"});
});