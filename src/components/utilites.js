import { dateToday, dateTomorrow, dateWeek } from './date';

export function live(data) {
    let matches = [];
    data.forEach(match => {
        if (match.status == 'LIVE' || match.status == 'PAUSED' || match.status == 'IN_PLAY') {
            matches.push(match);
        }
    });
    return matches;
}

export function today(data) {
    let matches = [];
    let todaysDate = dateToday();
    data.forEach(match => {
        if (match.utcDate == todaysDate) {
            matches.push(match);
        }
    });
    return matches;
}

export function week(data) {
    let matches = [];
    let weeksDates = dateWeek();

    data.forEach(match => {
        let day = match.utcDate.slice(8, 10);
        let month = match.utcDate.slice(5, 7);
        let year = match.utcDate.slice(0, 4);
        let matchDate =  `${day}-${month}-${year}`;
        if (weeksDates.includes(matchDate)) {
            matches.push(match);
        }
    });
    return matches;
}

export function upComming(data) {
    let matches = [];
    data.forEach(match => {
        if (match.status == 'SCHEDULED') {
            matches.push(match);
        }
    });
    return matches;
}