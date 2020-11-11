# date

Date parser using masala parser.


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

 


