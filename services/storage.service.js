export const storageService = {
    loadFromStorage,
    saveToStorage
}

function saveToStorage(key, val) {
    console.log('key: ', key )
    console.log('val: ', val )
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}