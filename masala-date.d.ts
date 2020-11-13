import { SingleParser } from '@masala/parser';
export interface DateResult {
    date?: Date;
    year?: number;
    month?: number;
    day?: number;
    amPmHours?: number;
    amPmMarker?: string;
    twentyFourHours?: number;
    minutes?: number;
    seconds?: number;
    millis?: number;
    timezone?: string;
    tzHours?: number;
    tzMinutes?: number;
}
export declare const dateParser: SingleParser<SingleParser<DateResult>>;
