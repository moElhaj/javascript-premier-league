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

export function status(status) {
    switch (status) {
        case "FINISHED": return "Finished";
        case "SCHEDULED": return "Scheduled";
        case "LIVE": return "Live";
        case "IN_PLAY": return "Live";
        case "PAUSED": return "Live";
        case "POSTPONED": return "Postponed";
        case "SUSPENDED": return "Suspended";
        case "CANCELED": return "Canceled";
        default: return "Scheduled";
    }
}

export function matchDate(utcDate) {
    let day = utcDate.slice(8, 10);
    let month = utcDate.slice(5, 7);
    let year = utcDate.slice(0, 4);
    return `${day}-${month}-${year}`;
}

export function matchTime(utcDate){
    let houre = utcDate.slice(11, 13);
    let minutes = utcDate.slice(14, 16);
    return `${houre}:${minutes}`;
}