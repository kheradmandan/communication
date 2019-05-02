const locales = {
    prefix: '',
    suffix: 'ago',

    seconds: 'less than a minute',
    minute: 'about a minute',
    minutes: '%d minutes',
    hour: 'about an hour',
    hours: 'about %d hours',
    day: 'a day',
    days: '%d days',
    month: 'about a month',
    months: '%d months',
    year: 'about a year',
    years: '%d years'
};

const localesFa = {
    prefix: '',
    suffix: 'پیش',
    separator: ' ',

    seconds: 'کمتر از یک دقیقه',
    minute: 'نزدیک یک دقیقه',
    minutes: '%d دقیقه',
    hour: 'نزدیک یک ساعت',
    hours: 'نزدیک %d ساعت',
    day: 'یک روز',
    days: '%d روز',
    month: 'نزدیک یک ماه',
    months: '%d ماه',
    year: 'نزدیک یکسال',
    years: '%d سال'
};

export default function getRelativeTimeSpan(timeAgo, locales = localesFa) {
    // let seconds = Math.floor((new Date() - parseInt(timeAgo)) / 1000),
    let seconds = Math.floor((new Date() - new Date(timeAgo)) / 1000),
        separator = locales.separator || ' ',
        words = locales.prefix + separator,
        interval = 0,
        intervals = {
            year: seconds / 31536000,
            month: seconds / 2592000,
            day: seconds / 86400,
            hour: seconds / 3600,
            minute: seconds / 60
        };

    let distance = locales.seconds;

    for (const key in intervals) {
        interval = Math.floor(intervals[key]);

        if (interval > 1) {
            distance = locales[key + 's'];
            break;
        } else if (interval === 1) {
            distance = locales[key];
            break;
        }
    }

    distance = distance.replace(/%d/i, interval);
    words += distance + separator + locales.suffix;

    return words.trim();
}
