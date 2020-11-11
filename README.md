# date

Date parser using masala parser.

## Usage


    const parser  = dateParser.val("YYYY-MM-ddThh:mm:ss::SSS a Z");
    const response = parser.parse(Streams.ofString('2020-08-27T08:55:04::012 a.m. -06'));
    // or 
     value = parser.val('2020-08-27T08:55:04::012 a.m. -06');

## Goals

Warning: the goal of the parser are:

- testing/improving Masala in a other area
- Gives the ability to design a custom parser around dates
- NOT being a ISO/RFC full compliant parser. JS standard lib or moment() have everything for that.

It can be used by another masala parser or without it.

## Supported

These tokens are supported with some limitations. The most important limitation is that i18n full
 days like Mon/Dimanche are not supported. For performance reasons, it's better that you choose
 how to handle it.

It should be enough for most enterprise date parser though. Moreover you can add tokens,
 change the limitations, give new powers.

Example: `YYYY-MM-ddThh:mm:ss::SSS a Z` parses `2020-08-27T08:55:04::012 a.m. -06` and gives this
 result:

```json5
{
        year: 2020,
        month: 8,
        day: 27,
        amPmHours: 8,
        minutes: 55,
        seconds: 4,
        millis: 12,
        amPmMarker: 'AM',
        timezone: '-06',
        tz: 'Z'
}
```
 
* Year: `YYYY` only ; result {year}
* Month: `MM` only ; result {month}
* Days: `dd` only ; result {day}
* Time separator `T`; result is dropped
* 12h : `hh` ; result {amPmHours}
* 24h: `HH` ; result {twentyFourHours}
* minutes: `mm` only ; result {minutes}
* seconds: `ss` only ; result {seconds}
* millis: `SSS` only ; result {millis}
* AM-PM: `a` as `AM`, `am`, or `a.m.`; result {amPmMarker}
* TimeZone :`Z` only but interpreted for `-08`, `-0800`, `+09:30`; result {timezone}
    - `{tz:'Z'}` is added to the result, as other timezone such as `z` or `X` could come.