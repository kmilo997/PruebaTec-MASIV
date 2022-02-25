<template>
    <div>
        <v-app-bar color="green accent-4" dense dark >
            <v-toolbar-title>{{titulo}}</v-toolbar-title>
        </v-app-bar>

    </div>
</template>
<script>

export default {
    data() {
        return{
            titulo:'Prueba Tecnica - VUE',
            imagen:'https://cdn.icon-icons.com/icons2/2248/PNG/512/vuejs_icon_136045.png'
        }       
    },
}
</script>