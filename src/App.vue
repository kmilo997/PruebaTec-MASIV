<template>
    <v-app id="inspire"  class="app" > 
        <div>
            <pageHeader/>
            <comicsRandom/>        
        </div>
    </v-app>
</template>

<script>

import pageHeader from './components/pageHeader.vue'
import comicsRandom from './views/comicsRandom.vue'

export default {

    components: { 
        pageHeader,
        comicsRandom,
    },

    data() {
        return { 

        }
        
    },
}
</script>

<style lang="scss" src="./scss/main.scss">

</style>
