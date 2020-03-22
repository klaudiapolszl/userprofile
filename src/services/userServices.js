const apiUrl = "http://localhost:4000/";
const endpoints = {
    statistics: apiUrl + "statistics/",
    comments: apiUrl + "comments/"
};

export default function getStatistics() {
    return function(dispatch) {
        return fetch(endpoints.statistics)
            .then( r => r.json() )
            .then( json => {
                dispatch({ type: 'SET_STATISTICS', statistics: json })
            });
    }
}
export function addLike(statistics, id) {
    console.log(statistics);
    console.log(id);
    statistics[id].likes++;
    return function(dispatch) {
        return fetch(endpoints.statistics + statistics[id].id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statistics[id])
        })
        .then(() => {
            dispatch({ type: 'SET_STATISTICS', statistics: statistics })
        });
    }
}
export function subtractLike(statistics, id) {
    statistics[id].likes--;
    return function(dispatch) {
        return fetch(endpoints.statistics + statistics[id].id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statistics[id])
        })
        .then(() => {
            dispatch({ type: 'SET_STATISTICS', statistics: statistics })
        });
    }
}
export function addFollow(statistics, id) {
    statistics[id].followers++;
    return function(dispatch) {
        return fetch(endpoints.statistics + statistics[id].id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statistics[id])
        })
        .then(() => {
            dispatch({ type: 'SET_STATISTICS', statistics: statistics })
        });
    }
}
export function subtractFollow(statistics, id) {
    statistics[id].followers--;
    return function(dispatch) {
        return fetch(endpoints.statistics + statistics[id].id,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(statistics[id])
        })
            .then(() => {
                dispatch({ type: 'SET_STATISTICS', statistics: statistics })
            });
    }
}
