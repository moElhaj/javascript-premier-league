export function dateToday() { 
    let today = new Date();
    let day = today.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let year = today.getFullYear();

    return `${year}-${month}-${day}`;
}

export function dateTomorrow(){
    let today = new Date();
    today.setDate(today.getDate() + 1);
    
    let day = today.getDate();
    day = day < 10 ? `0${day}` : day;
    let month = today.getMonth() + 1;
    month = month < 10 ? `0${month}` : month;
    let year = today.getFullYear();
    
    return `${year}-${month}-${day}`;
}


export function dateWeek() {
    let weeksDates = [];
    let today = new Date();
    for (let i = 0; i < 7; i++) {
        today.setDate(today.getDate() + 1);
        let day = today.getDate();
        day = day < 10 ? `0${day}` : day;
        let month = today.getMonth() + 1;
        month = month < 10 ? `0${month}` : month;
        let year = today.getFullYear();
        weeksDates.push(`${day}-${month}-${year}`)
    }   
    return weeksDates; 
}