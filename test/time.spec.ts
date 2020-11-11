import {amPmMarkerParser, timeZoneZParser} from '../src/time'
import {dateParser} from '../src/date-parser'
import {Streams} from '@masala/parser';

describe('time', function () {

    test('timeZoneXIsoParser', () => {
        let val = timeZoneZParser().eos().val("+0800");
        expect(val).toEqual({
            timezone: "+0800", tz: 'Z', "tzHours": 8,
            "tzMinutes": 0
        });

        val = timeZoneZParser().eos().val("+08");
        expect(val).toEqual({timezone: "+08", tz: 'Z', tzHours: 8});

        val = timeZoneZParser().eos().val("-08:30");
        expect(val).toEqual({
            timezone: "-08:30", tz: 'Z', "tzHours": -8,
            "tzMinutes": 30
        });
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
        delete time.date;
        expect(time).toEqual({twentyFourHours: 14})


        parser = dateParser.val("hha");
        time = parser.val("09AM");
        delete time.date;
        expect(time).toEqual({amPmHours: 9, amPmMarker: 'AM'})

        parser = dateParser.val("HH:mm:ss");

        time = parser.val("19:18:32");
        delete time.date;
        expect(time).toEqual({twentyFourHours: 19, minutes: 18, seconds: 32})

    })


    test('timezone times', () => {
        let parser = dateParser.val("HH:mm Z");
        let time1 = parser.val("14:00 +04");

        let time2 = parser.val("14:00 +06");

        expect(time1.date!.getHours()-time2.date!.getHours()).toEqual(2)
    })


});