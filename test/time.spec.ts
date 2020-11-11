import {timeZoneXIsoParser} from '../src/time'

test('timeZoneXIsoParser', () => {
    let val = timeZoneXIsoParser().eos().val("+0800");
    expect(val).toEqual({timezone: "+0800", tz:'X'});

    val = timeZoneXIsoParser().eos().val("+08");
    expect(val).toEqual({timezone: "+08", tz:'X'});

    val = timeZoneXIsoParser().eos().val("-08:30");
    expect(val).toEqual({timezone: "-08:30", tz:'X'});
});


test('timeZoneXIsoParser with bad values', () => {
    let val = timeZoneXIsoParser().eos().val("+1300");
    expect(val).toBe(undefined);

    val = timeZoneXIsoParser().eos().val("+13");
    expect(val).toBe(undefined);

    val = timeZoneXIsoParser().eos().val("-08:70");
    expect(val).toBe(undefined);
});