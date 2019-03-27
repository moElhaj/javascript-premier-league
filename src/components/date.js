export function isToday(date) {
    let today = new Date();
    let day = today.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let year = today.getFullYear();
    let todaysDate = `${year}-${month}-${day}`;
    if (date == todaysDate) {
        return true;
    } else {
        return false;
    }
}

export function isTomorrow(date) {
    let today = new Date();
    today.setDate(today.getDate() + 1);

    let day = today.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let year = today.getFullYear();
    let tomorrowsDate = `${year}-${month}-${day}`;
    if (date == tomorrowsDate) {
        return true;
    } else {
        return false;
    }
}

export function matchTime(utcDate){
    let houre = utcDate.slice(11, 13);
    let minutes = utcDate.slice(14, 16);
    return `${houre}:${minutes}`;
}
