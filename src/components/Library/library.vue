<script>
import SmallBook from '../Display/SmallBook.vue';

export default{
    data(){
        return {
            displaytype : "All",
            nb_books : 0
        }
    },
    methods:{

    },
    computed:{
        displayed_books(){
            switch(this.displaytype){
                case "favorite":
                    return this.$store.getters.favbooks;
                case "read":
                    return this.$store.getters.readbooks;
                case "unread":
                    return this.$store.getters.unreadbooks;
                default: // "ALL"
                    return this.$store.getters.getbooks;
                }
            },
        numberofbooks(){
            this.nb_books = this.$store.getters.numberofsavedbooks
        }
    },
    components : {SmallBook}
}
</script>

<template>
    There are {{ nb_books }} books in your library.
    <select v-model="displaytype">
        <option>All</option>
        <option>favorite</option>
        <option>read</option>
        <option>unread</option>
    </select>

    <div class="flex">
        <span v-for="(book, id) in displayed_books">
                <SmallBook :key="id" :book="book" library=1 />
        </span>
    </div>
</template>

<style>
.flex{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
}
</style>
