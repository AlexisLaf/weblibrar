
import { createStore } from 'vuex'
import { retrievefromlocalstorage, savetolocalstorage } from "./windowsave";

// Create a new store instance.
const store = createStore({
  state () {
    return {
      books : []
    }
  },
  getters:{
    numberofsavedbooks(state){
      return length(state.books)
    },
    getbooks(state){
      return state.books
    },
    favbooks(state){
      return state.books.filter(book => book.favorite)
    },
    readbooks(state){
      return state.books.filter(book => book.read)
    },
    unreadbooks(state){
      return state.books.filter(book => !book.read)
    },
  },
  mutations: {
    save(state){
      savetolocalstorage(state)
    },
    loadsave(state){
      retrievefromlocalstorage(state)
    },
    addbook(state, book_info){
      let kept_info = {
        title:book_info.title,
        cover_edition_key:book_info.cover_edition_key,
        author_name:book_info.author_name,
        first_publish_year:book_info.first_publish_year,
        favorite: false,
        read: false
      }
      state.books.push(kept_info)
    },
    readbook(state, book_info){
      state.books[state.books.findIndex(book => book==book_info)].read = true
    },
    unreadbook(state, book_info){
      state.books[state.books.findIndex(book => book==book_info)].read = false
    },
    favbook(state, book_info){
      state.books[state.books.findIndex(book => book==book_info)].favorite = true
    },
    unfavbook(state, book_info){
      state.books[state.books.findIndex(book => book==book_info)].favorite = false
    }
  },
  actions: {
    saving({commit}){
      commit("save")
    },
    loadlocalsave({commit}){
      commit("loadsave")
    }
  }
})

export default store;