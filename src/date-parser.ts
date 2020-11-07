import {Streams, F, C} from '@masala/parser'


/**
 * Created by Nicolas Zozol on 2020/11/05
 */

export const dateParser = C.char('a')
    .then(C.char('b'))
    .then(C.char('c'))
    .eos()
