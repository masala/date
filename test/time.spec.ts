import {amPmMarkerParser, timeZoneZParser} from '../src/time'
import {dateParser} from '../src/date-parser'
import {Streams} from '@masala/parser';

test('timeZoneXIsoParser', () => {
    let val = timeZoneZParser().eos().val("+0800");
    expect(val).toEqual({timezone: "+0800", tz: 'Z'});

    val = timeZoneZParser().eos().val("+08");
    expect(val).toEqual({timezone: "+08", tz: 'Z'});

    val = timeZoneZParser().eos().val("-08:30");
    expect(val).toEqual({timezone: "-08:30", tz: 'Z'});
});

test('amPmMarkerParser', () => {
    let val = amPmMarkerParser().eos().val("a.m.");
    expect(val).toEqual({amPmMarker: "AM"});
});


test('timeZoneZParser with bad values', () => {
    let val = timeZoneZParser().eos().val("+1300");
    expect(val).toBe(undefined);

    val = timeZoneZParser().eos().val("+13");
    expect(val).toBe(undefined);

    val = timeZoneZParser().eos().val("-08:70");
    expect(val).toBe(undefined);
});

test('fulltime', () => {

    let parser = dateParser.val("HH");
    let time = parser.val("14");
    expect(time).toEqual({twentyFourHours: 14})


    parser = dateParser.val("hha");
    time = parser.val("09AM");
    expect(time).toEqual({ amPmHours: 9, amPmMarker: 'AM' })

    parser = dateParser.val("HH:mm:ss");

    time = parser.val("19:18:32");
    expect(time).toEqual({ twentyFourHours: 19, minutes: 18, seconds: 32 })

})