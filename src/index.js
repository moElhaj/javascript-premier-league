import './index.css';
import { live, today, week, upComming } from './components/utilites';
import { rename, status, matchDate } from './components/display';

/** IIFE Function to get the data from api using date component to orgnize data according week, today, and tomorrow */
(function () {
    Promise.all([
        /** get all standings */
        fetch('https://api.football-data.org/v2/competitions/2021/standings', { headers: { 'X-Auth-Token': 'api key' } }).then(response => response.json()),
        /** get all matches */
        fetch('https://api.football-data.org/v2/competitions/2021/matches', { headers: { 'X-Auth-Token': 'api key' } }).then(response => response.json())
    ])
        .then(data => {
            let standings = data[0].standings[0].table;
            let matches = data[1].matches;
            factory(standings, matches);
        })
        .catch(err => {
            snap(err);
        });
})();

var loader = document.querySelector('#loader');
var wrapper = document.querySelector('#wrapper');
var error = document.querySelector('#error');

function factory(standings, matches) {

    let liveMatches = live(matches);
    let todayMatches = today(matches);
    let weekMatches = week(matches);
    let upCommingMatches = upComming(matches);

    let currentContent = '<table class="centered"><tbody>';

    /** Display Live Matches */

    if (liveMatches.length > 0) {
        currentContent += header('Live Matches');
        liveMatches.forEach(match => {
            currentContent += render(match);
        });
    } else if (todayMatches.length > 0) {
        currentContent += header('Todays Matches');
        todayMatches.forEach(match => {
            currentContent += render(match);
        });
    } else if (weekMatches.length > 0) {
        currentContent += header('This Week Matches');
        weekMatches.forEach(match => {
            currentContent += render(match);
        });
    } else if (upCommingMatches.length > 0) {
        currentContent += header('Up Comming Matches');
        upCommingMatches.forEach(match => {
            currentContent += render(match);
        });
    } else {
        currentContent = 'No Matches'
    }

    currentContent += '</tbody></table>';

    document.querySelector('#matchesContent').innerHTML = currentContent;

    /** Standings */
    
    var standingsContent = '';
    standings.forEach(team => {
        standingsContent += `
            <tr>
                <td>${team.position}</td>
                <td><img class="img" src="../images/${team.team.id}.png"></td>
                <td>${rename(team.team.name)}</td>
                <td>${team.playedGames}</td>
                <td>${team.won}</td>
                <td>${team.draw}</td>
                <td>${team.lost}</td>
                <td>${team.points}</td>
        </tr>
    `
    });
    document.querySelector('#standingsContent').innerHTML = standingsContent;

    loader.classList.add('hide');
    wrapper.classList.remove('hide');
}

function snap(err) {
    console.log(err);
    loader.classList.add('hide');
    wrapper.classList.add('hide');
    error.classList.remove('hide');
}

function header(str) {
    return `
    <div class="center-align">
        <div class="chip">
            ${str}
        </div>
    </div>
    `
}

function render(match) {
    return `
        <tr class="tr-border">
            <td colspan="3" class="td-left">${matchDate(match.utcDate)} - ${status(match.status)}</td>
            <td></td>
            <td colspan="3" class="td-right"></td>
        </tr>
        <tr>
            <td width="30%">${rename(match.homeTeam.name)}</td>
            <td><img src="../images/${match.homeTeam.id}.png" class="img"></td>
            <td>${match.score.fullTime.homeTeam == null ? '0' : match.score.fullTime.homeTeam}</td>
            <td>:</td>
            <td>${match.score.fullTime.awayTeam == null ? '0' : match.score.fullTime.awayTeam}</td>
            <td><img src="../images/${match.awayTeam.id}.png" class="img"></td>
            <td width="30%">${rename(match.awayTeam.name)}</td>
        </tr>
`
}
