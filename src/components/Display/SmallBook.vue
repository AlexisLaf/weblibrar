
<script>
import { errorMessages } from 'vue/compiler-sfc';


export default{
    props: {
        book:{},
        search:false,
        library:false
    },
    data(){
        return {
            bookCoverAPI:"https://covers.openlibrary.org/b",
            imgloaderror: false
        }
    },
    methods:{
        imageloadError(){
            this.imgloaderror = true
        },
        addtolibrary(){
            this.$emit("add_book",this.book)
        },
        readbook(){
            this.$store.commit("readbook",this.book)
        },
        favbook(){
            this.$store.commit("favbook",this.book)
        },
        unreadbook(){
            this.$store.commit("unreadbook",this.book)
        },
        unfavbook(){
            this.$store.commit("unfavbook",this.book)
        }
    },
    emits: ["add_book"]
}
</script>

<template>
    <div class="border">
        {{ book.title }}: <br>
        <span v-if="book.author_name"> {{ book.author_name[0] }}</span> <br>
        First published in : {{ book.first_publish_year }} <br>
        <div v-if="library">
            Favorite : <span v-if="book.favorite">✓</span><span v-else> ✕ </span>
            Read : <span v-if="book.read">✓</span><span v-else> ✕ </span>
        </div>
        <span v-if="!imgloaderror">
            <img :src="bookCoverAPI+'/olid/'+book.cover_edition_key+'-M.jpg'" @error="imageloadError">
        </span>
        <span v-else> There seems to be no Image for this title available. </span>
        <br>
        <button v-if="search" @click="addtolibrary"> Add This book to your library </button>
        <button v-if="library"v-show="!book.read" @click="readbook"> I have already read this book.</button>
        <button v-if="library"v-show="book.read" @click="unreadbook"> Sorry, I haven't yet read this book.</button>
        <button v-if="library" v-show="!book.favorite" @click="favbook"> I love this book. (favorite)</button>
        <button v-if="library" v-show="book.favorite" @click="unfavbook"> I don't like this book anymore. (unfavorite)</button>
    </div>
</template>

<style>
.border{
    border: 2px rgb(42, 41, 41) solid;
}
</style>