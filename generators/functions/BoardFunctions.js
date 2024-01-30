
const boardFunctions = function(options){
    return {
        emailKey: options.emailKey || false,
        calendarKey: options.calendarKey || false,
        tag: options.tag || false,
        viewed: options.viewed || false,
        list: options.list || false
    };
};

const boardDefaultFunctions = function(){
    return {
        emailKey: false,
        calendarKey: false,
        tag: false,
        viewed: false,
        list: false
    };
};

module.exports = { boardFunctions, boardDefaultFunctions };
