import React from 'react';
import moment from 'jalali-moment';
import relativeTimestamp from '../../utils/relativeTimestamp'

export default function ({timestamp, locale = 'fa', relative = false, format = 'YYYY/MM/DD - HH:MM:SS'}) {
    let text = '';
    if (!timestamp) {
        text = '----/--/--';
    } else {
        if (relative) {
            text = relativeTimestamp(timestamp);
        } else {
            text = moment.from(timestamp).locale(locale).format(format);
        }
    }
    return <p>{text}</p>
}
