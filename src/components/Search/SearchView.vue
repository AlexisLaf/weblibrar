
<script>
import SmallBook from '../Display/SmallBook.vue';

const API_URL = "https://openlibrary.org/search.json?"

export default{
    data(){
        return {
            searchText : "",
            query_results : null,
            page:1
        }
    },
    methods:{
        async search(){
            let query = this.searchText.replace(" ", "+")
            let query_res = await fetch(API_URL+"q="+query+"&limit=15&page="+this.page)
            if (!query_res.ok) {
                //Handle failure to fetch
                this.query_results = null 
            }
            this.query_results = await query_res.json()
        },
        addAndredirect(book){
            this.$store.commit("addbook",book)
            this.$router.push("/Library")
        }
    },
    components : {SmallBook}
}

</script>

<template>
    <div>
        <input type="text" v-model=searchText v-on:keyup.enter="search"/>
        <button @click="search"> Search </button>
    </div>
    Search results for : {{ searchText }}
    <div v-if=query_results>
        <div>
            <span v-if=query_results.numFoundExact> Found {{ query_results.numFound }} Results</span>
            <span v-else> Found ~{{ query_results.numFound }}</span>
        </div>
        <div class="flex" >
            <span v-for="(book, id) in query_results.docs">
                <SmallBook :key="id" :book="book" search=1 @add_book.once="addAndredirect" />
            </span>
        </div>
    </div>
    <div v-if="query_results">
        Results from {{ (page-1) * 15 }} to {{ page * 15 }}
        <!--<span v-for="x in Array.from({ length: query_results.numFound /15 },(value, index) => 1 + index)">
            Initial test that puts everything but doesn't work well when there are thousands of pages.-->
        <span v-for="x in [1, 2, 3, 4, 5, 6]">
            <span class="pageselectborder" @click="() => {this.page=x;search()} ">
                {{ x }}
            </span>
        </span>
    </div>
</template>

<style>
.pageselectborder{
    border: 2px rgb(225, 219, 219) solid;
    padding: 5px;
    margin: 5px;
    border-radius: 30%;
    max-width: 50px;
    display: inline-flex;
}

input{
    width: 80%;
    margin-right: 10px;
    padding: 3px;
}

.flex{
    flex-wrap: wrap;
    display: flex;
    gap: 10px;
}
</style>