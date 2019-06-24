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
 * Explore in options to find corresponding key
 * @param value
 * @param options
 * @returns {string}
 */
export const findKey = function (value, options = []) {
    const keys = options.filter(x => x.value === value);
    return keys.length > 0 ? keys[0] : {};
};