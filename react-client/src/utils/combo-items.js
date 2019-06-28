/**
 * Assignee titles
 * @type {*[]}
 */
export const assigneeTitlesOptions = [
    {key: 'ref', icon: 'arrow alternate circle right', text: 'ارجاع', value: 'ارجاع'},
    {key: 'question', icon: 'question circle', text: 'پرسش', value: 'پرسش'},
    {key: 'answer', icon: 'aws', text: 'پاسخ', value: 'پاسخ'},
    {key: 'review', icon: 'video', text: 'مشاهده', value: 'مشاهده'},
    {key: 'finish', icon: 'calendar check', text: 'پایان', value: 'پایان'},
    {key: 'again', icon: 'retweet', text: 'دوباره', value: 'دوباره'},
];

/**
 * Priority titles
 * @type {*[]}
 */
export const priorityOptions = [
    {key: '0', value: 0, icon: 'meh', text: 'کم'},
    {key: '1', value: 1, icon: 'idea', text: 'طبیعی'},
    {key: '2', value: 2, icon: 'gripfire', text: 'زیاد'},
    {key: '3', value: 3, icon: 'broken chain', text: 'بحرانی'},
];

/**
 * Explore in options to find corresponding key
 * @param value
 * @param options
 * @returns {string}
 */
export const findKey = function (value, options = []) {
    const keys = options.filter(x => x.value === value);
    return keys.length > 0 ? keys[0] : {};
};