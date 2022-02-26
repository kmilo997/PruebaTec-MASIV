<template>
    <div>
        <v-container mt-3 >
            <v-layout  wrap >


                <v-flex xs12 mb-3 >
                    <v-btn class="white--text" block small  color="red" @click="borrarPuntuaciones();">
                        <v-icon>
                            mdi-remove
                        </v-icon>
                        Borrar  puntuaciones
                    </v-btn>    
                </v-flex >

                <v-flex xs12 >
                    

                    <v-card   mt-3 pt-3 center>

                        <v-toolbar color="indigo" dark >
                            <v-toolbar-title>{{comic.titulo}} </v-toolbar-title>
                            <v-spacer></v-spacer>
                            <span v-if="comic.puntuado" mr-3>Ya ha sido puntuado</span>
                            <v-tooltip right>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn fab  small v-bind="attrs"  v-on="on" color="success" @click="cargarNuevoComic();">
                                        <v-icon>
                                            mdi-reload
                                        </v-icon>
                                    </v-btn>   
                                </template>
                                <span>Cargar nuevo comic</span>
                            </v-tooltip>
                        </v-toolbar>

                        <v-card-text class="text--primary">
                            <v-img
                            class="white--text align-end"
                            max-height="1000px"
                            max-width="1000px"
                            :src="comic.imagen"
                            >
                            </v-img>

                            <v-layout wrap mt-3>
                                
                                <v-flex xs12 v-for="(texto,index) in comic.cuerpo.split('\n')" :key="index">
                                - {{texto}}
                                </v-flex>

                            </v-layout>


                        </v-card-text>

                        <v-card-actions >
                            <v-layout>
                                <v-flex xs6>
                                    <star-rating @rating-selected ="guardarCalificacion" v-model="comic.calificacion" :read-only="comic.puntuado" :show-rating="false" />
                                </v-flex>
                                <v-flex xs6 v-if="comic.puntuado">
                                    <h4>
                                        Gracias por tu puntuacion
                                    </h4>
                                </v-flex>
                            </v-layout>
                        </v-card-actions>
                            
                    </v-card>

                </v-flex >

            </v-layout>
        </v-container>
        
    </div>
</template>
<script>

import StarRating from 'vue-star-rating'

export default {
    components: {
        StarRating
    },
    data() {
        return{
            comic:{
                num:"",
                titulo:"",
                cuerpo:"",
                imagen:"",
                calificacion:null,
                puntuado:false
            },
            cantidad_comics:2000
        }
    }, 
    mounted(){
        this.cargarNuevoComic();
    },
    methods:{

        borrarPuntuaciones(){

            localStorage.setItem("comics_calificados","[]");
            this.cargarNuevoComic();

        },

        guardarCalificacion(calificacion){

            this.comic.calificacion = calificacion;

            this.comic.puntuado = true;

            let comic_calificado = this.comic;

            let comics_calificados = []

            if(localStorage.getItem("comics_calificados") != null)
            {
                comics_calificados = JSON.parse(localStorage.getItem("comics_calificados"));
            }

            comics_calificados.push(comic_calificado);           

            comics_calificados = JSON.stringify(comics_calificados);

            localStorage.setItem("comics_calificados",comics_calificados);

        },

        comicExistente(num_comic){

            let comics_calificados = JSON.parse(localStorage.getItem("comics_calificados"));
  
            console.log("comics_calificados",comics_calificados)

            if(comics_calificados != null)
            {
                let comic = comics_calificados.filter(c => c.num == num_comic);

                if(comic.length > 0)
                {
                    return comic[0];
                }
            }

            return false;

        },

        cargarNuevoComic(){

            let id_comic = Math.floor(Math.random() * this.cantidad_comics+1);

            let comic_existente = this.comicExistente(id_comic);

            if(comic_existente){

                this.comic.num = comic_existente.num
                this.comic.imagen = comic_existente.imagen
                this.comic.titulo =  comic_existente.titulo
                this.comic.cuerpo =  comic_existente.cuerpo
                this.comic.calificacion =  comic_existente.calificacion
                this.comic.puntuado =  true

                console.log("comic_existente",this.comic);

                return false;
            }

            let url = "https://helperapi-masiv.herokuapp.com/comics?num="+id_comic

            this.axios({ 
                method: 'GET',
                url: url
            }).then((response) => {
                
                let comic = response.data   

                if(this.comic.num == comic.num)
                {
                    this.cargarNuevoComic()
                    return false;
                }

                this.comic.num = comic.num
                this.comic.imagen = comic.img
                this.comic.titulo =  comic.title
                this.comic.cuerpo =  comic.transcript
                this.comic.calificacion =  0
                this.comic.puntuado = false
            
            }).catch((err) =>{

                this.cargarNuevoComic();
                console.log(err)

            })

        }
  
        
    }
}
</script>