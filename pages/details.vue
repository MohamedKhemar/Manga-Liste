<template>
 <div>
  <div v_if="current_manga" class="details-manga">
    <div class="d-flex hustify-center ma-a">
      <v-card width="450" style="background-color: lightgreen;">
        <v-card-title><h3>{{ current_manga.nom }}</h3></v-card-title>
        <v-card-subtitle class="noir-fonce">{{ this.current_manga.auteur }}</v-card-subtitle>
        <v-card-subtitle class="noir-fonce">{{ this.current_manga.date }}</v-card-subtitle>
        <v-img :src="this.current_manga.url_image"></v-img>
        <v-card-text class="description">{{ this.current_manga.description }}</v-card-text>

        <v-card-actions>
          <v-btn to="/" text style="background-color: whitesmoke;"> 
            <i class="fa fa-chevron-circle-left" style="font-size:20px; color: lightgreen;"></i>Retour</v-btn>
        </v-card-actions>
      </v-card>
    </div>

    

  </div>
  <div v-if="!current_manga">
    <p>Chargement des détails...</p>
  </div>
 </div>
</template>

<script>
import { Manga } from '@/modeles/manga.ts'; // Import de l'interface Manga
export default {
  name: 'Details',
  props:{
    
  },
  data() {
    return{
      current_manga_id : Number | null,
      current_manga:Manga | null
    }
  },

  /**
   * @mounted -> initialise current_manga_id grace à l'url, et charge les details du manga
   */
  mounted(){
    this.current_manga_id = parseInt(this.$route.params.id);
    this.loadMangaDetails();
  },

  /**
   * @watch -> recupere le nouvel id à chaque changement, et recharge les details du manga correspondant.
   */
  watch:{
    '$route.params.id'(newId,oldID){
      this.current_manga_id = parseInt(newId);
      this.loadMangaDetails();
    }
  },
  
  methods:{
    /**
     * @method -> charge les details d'un manga en fonction de son id
     */
    loadMangaDetails(){
      try {
        const manga_from_json = require('@/assets/data.json'); //recuperation des données depuis le fichier json
        const foundManga = manga_from_json.find((manga) => parseInt(manga.id) === parseInt(this.current_manga_id));

        this.current_manga = foundManga ? {
          id: foundManga.id,
          nom: foundManga.nom,
          auteur: foundManga.auteur,
          date: foundManga.date,
          url_image: foundManga.url_image,
          description: foundManga.description
        } : null;
      } catch(error){
        console.error('Une erreur est survenue lors du chargement des détails du manga :', error);
      }
      },
    }
  }
</script>


<style>
  .details-manga{
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  }
  h3{
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  .noir-fonce{
    color:solid black;
    font-size:larger;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  }
  .description{
    font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    color: black;
    font-size: medium;
  }
</style>