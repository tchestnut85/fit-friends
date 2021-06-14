// During page reload, React Context is cleared/lost.
// Use thes to save users data to a localstorage key and retrieve it if Context is lost

function saveData(data) {
    localStorage.setItem('fit_friends_data', JSON.stringify(data));
}

function getData() {
    const savedData = JSON.parse(localStorage.getItem('fit_friends_data'));
    return savedData;
}

function clearData() {
    localStorage.removeItem('fit_friends_data');
}

module.exports = { saveData, getData, clearData };
