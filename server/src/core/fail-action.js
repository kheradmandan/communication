module.exports = async function failAction(request, h, err) {
    if (process.env.NODE_ENV === 'production') {

        // send to logger service if needed
        throw Boom.badRequest('Invalid request payload input!');
    } else {
        console.log('fail action: %o', err);
        throw err;
    }
};