
const savename = "saved-book-list"

function savetolocalstorage(state){
    let savefile = JSON.stringify({
        books: state.books
    })
    localStorage.setItem(savename, savefile)
}
function retrievefromlocalstorage(state){
    var save = localStorage.getItem(savename)
    if (save != null){
        var data = JSON.parse(save)
        state.books = data.books
    }
}

export {savetolocalstorage, retrievefromlocalstorage}