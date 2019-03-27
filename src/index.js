import './index.css';
import { config } from './components/config';
import { rename, header, render } from './components/display';

/** Initiating divs */
const loader = document.querySelector('.loader-div');
const wrapper = document.querySelector('.wrapper');
const error_div = document.querySelector('.error');

/** IIFE that will get the data from source and call the factory function to display */
(function () {
    Promise.all([
        /** get all standings */
        fetch(`${config.url}standings`, { headers: { 'X-Auth-Token': config.key } }).then(response => response.json()),
        /** get all matches */
        fetch(`${config.url}matches?status=SCHEDULED`, { headers: { 'X-Auth-Token': config.key } }).then(response => response.json())
    ])
        .then(data => {
            let standings = data[0].standings[0].table;
            let matches = data[1].matches;
            factory(standings, matches);
        })
        .catch(err => {
            error(err);
        });
})();

/** Function to display the data */
function factory(standings, matches) {

    /** Standings */
    var standingsContent = '';
    standings.forEach(team => {
        standingsContent += `
            <tr>
                <td>${team.position}</td>
                <td><img class="table-img" src="../images/${team.team.id}.png"></td>
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

    /** Matches */

    var matchesContent = '';

    if (matches.length > 0) {
        let dates = [];
        matches.forEach(match => {
            let day = match.utcDate.slice(8, 10);
            let month = match.utcDate.slice(5, 7);
            let year = match.utcDate.slice(0, 4);
            let matchDate = `${day}-${month}-${year}`;
            if (!dates.includes(matchDate)) {
                dates.push(matchDate)
            }
        });

        group(dates);

        function group(dates) {
            dates.forEach(date => {
                matchesContent += header(date);
                matches.forEach(match => {
                    let day = match.utcDate.slice(8, 10);
                    let month = match.utcDate.slice(5, 7);
                    let year = match.utcDate.slice(0, 4);
                    let matchDate = `${day}-${month}-${year}`;
                    if (date == matchDate) {
                        matchesContent += render(match);
                    }
                })
            })
        }
    } else {
        matchesContent = 'No Matches !!'
    }

    document.querySelector('.matches').innerHTML = matchesContent;

    loader.classList.add('hide');
    wrapper.classList.remove('hide');
}

/** Error Function */
function error(err) {
    console.log(err);
    loader.classList.add('hide');
    wrapper.classList.add('hide');
    error_div.classList.remove('hide');
}
