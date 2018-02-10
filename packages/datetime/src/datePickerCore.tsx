/*
 * Copyright 2016 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { LocaleUtils } from "react-day-picker/types/utils";
import { Months } from "./common/months";

// DatePicker supports a simpler set of modifiers (for now).
// also we need an interface for the dictionary without `today` and `outside` injected by r-d-p.
/**
 * Collection of functions that determine which modifier classes get applied to which days.
 * See the [**react-day-picker** documentation](http://react-day-picker.js.org/Modifiers.html) to learn more.
 */
export interface IDatePickerModifiers {
    [name: string]: (date: Date) => boolean;
}

export interface IDatePickerBaseProps {
    /**
     * The initial month the calendar displays.
     */
    initialMonth?: Date;

    /**
     * The locale name, which is passed to the functions in `localeUtils`
     * (and `formatDate` and `parseDate` if supported).
     */
    locale?: string;

    /**
     * Collection of functions that provide internationalization support.
     */
    localeUtils?: LocaleUtils;

    /**
     * The latest date the user can select.
     * @default Dec. 31st of this year.
     */
    maxDate?: Date;

    /**
     * The earliest date the user can select.
     * @default Jan. 1st, 20 years in the past.
     */
    minDate?: Date;

    /**
     * Collection of functions that determine which modifier classes get applied to which days.
     * Each function should accept a `Date` and return a boolean.
     * See the [**react-day-picker** documentation](http://react-day-picker.js.org/Modifiers.html) to learn more.
     */
    modifiers?: IDatePickerModifiers;

    /**
     * If `true`, the month menu will appear to the left of the year menu.
     * Otherwise, the month menu will apear to the right of the year menu.
     * @default false
     */
    reverseMonthAndYearMenus?: boolean;
}

export const DISABLED_MODIFIER = "disabled";
export const HOVERED_RANGE_MODIFIER = "hovered-range";
export const OUTSIDE_MODIFIER = "outside";
export const SELECTED_MODIFIER = "selected";
export const SELECTED_RANGE_MODIFIER = "selected-range";
// modifiers the user can't set because they are used by Blueprint or react-day-picker
export const DISALLOWED_MODIFIERS = [
    DISABLED_MODIFIER,
    HOVERED_RANGE_MODIFIER,
    OUTSIDE_MODIFIER,
    SELECTED_MODIFIER,
    SELECTED_RANGE_MODIFIER,
];

export function getDefaultMaxDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear());
    date.setMonth(Months.DECEMBER, 31);
    return date;
}

export function getDefaultMinDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 20);
    date.setMonth(Months.JANUARY, 1);
    return date;
}

export function combineModifiers(baseModifiers: IDatePickerModifiers, userModifiers: IDatePickerModifiers) {
    let modifiers = baseModifiers;
    if (userModifiers != null) {
        modifiers = {};
        for (const key of Object.keys(userModifiers)) {
            if (DISALLOWED_MODIFIERS.indexOf(key) === -1) {
                modifiers[key] = userModifiers[key];
            }
        }
        for (const key of Object.keys(baseModifiers)) {
            modifiers[key] = baseModifiers[key];
        }
    }
    return modifiers;
}
