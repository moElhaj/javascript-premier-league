import { isToday, isTomorrow, matchTime } from './date';

/** A function to shorten and prepare teams names */
export function rename(str) {
    let name = str.includes('FC') ? str.replace("FC", "") : str;
    if (name.includes("Brighton")) {
        return "Brighton";
    } else if (name.includes("Wolverhampton")) {
        return "Wolverhampton";
    } else if (name.includes("Bournemouth")) {
        return "Bournemouth";
    } else if (name.includes("Tottenham")) {
        return "Tottenham";
    } else if (name.includes("Huddersfield")) {
        return "Huddersfield";
    } else if (name.includes("West Ham")) {
        return "West Ham";
    } else if (name.includes("Newcastle")) {
        return "Newcastle";
    } else {
        return name;
    }
}

/** function to prepare the header grouping the matches */
export function header(str) {
    if (isToday(str)) {
        str = 'Today';
    } else if (isTomorrow(str)){
        str = 'Tomorrow'
    }
    return `
        <div class="col s12 date text-center">
            <span class="date-header">${str}</span>
        </div>
    `
}

/** function to display the matches */
export function render(match) {
    let score = '';
    if (match.score.fullTime.homeTeam == null) {
        score = `
        <div class="score col s2">
            <span>${matchTime(match.utcDate)}</span>
        </div>
        `
    } else {
        score = `
        <div class="score col s2">
            <span>${match.score.fullTime.homeTeam}</span>
            <span>:</span>
            <span>${match.score.fullTime.awayTeam}</span>
        </div>
        `
    }
    return `
        <div id="${match.status}" class="match col s12">
            <div class="col s3 text-right">${rename(match.homeTeam.name)}</div>
            <div class="col s2 text-center"><img class="match-img" src="images/${match.homeTeam.id}.png"></div>
            ${score}
            <div class="col s2 text-center"><img class="match-img" src="images/${match.awayTeam.id}.png"></div>
            <div class="col s3 text-left">${rename(match.awayTeam.name)}</div>
        </div>
    `
}
