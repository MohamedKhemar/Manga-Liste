<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="mangas"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.nom`]="{ item }">
        {{ item.nom }}
      </template>
      <template v-slot:[`item.auteur`]="{ item }">
        {{ item.auteur }}
      </template>
      <template v-slot:[`item.date`]="{ item }">
        {{ item.date }}
      </template>
      <template v-slot:item.action="{ item }">
        <v-btn style="background-color: lightgreen;" color="green" @click="showDetails(item)">
          Voir Details
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { Manga } from '@/modeles/manga.ts'; // Import de l'interface Manga


export default {
  data() {
    return {
      headers: [
        { text: 'Nom', value: 'nom' },
        { text: 'Auteur', value: 'auteur' },
        { text: 'Date', value: 'date' },
        { text: 'Action', value: 'action', sortable: false }
      ],
      // Tableau de mangas de type Manga
      mangas: [],
    }
  },
  async created() {
    // chargement de la liste des mangas
    await this.loadMangas();
  },
  methods: {
    /**
     * @method -> recupere les données depuis une source JSON et les transforme en tableau contenant des objet de type Manga
     */
    async loadMangas() {
      try {
        const manga_from_json = require('@/assets/data.json');

        // Mapper les données JSON vers l'interface Manga
        this.mangas = manga_from_json.map(manga => ({
          id: manga.id,
          nom: manga.nom,
          auteur: manga.auteur,
          date: manga.date,
          url_image: manga.url_image,
          description: manga.description
        }));
      } catch (error) {
        console.error('Une erreur est survenue lors du chargement des données des mangas :', error);
      }
    },
    /**
     * 
     * @param {Manga} item -> Redirige vers la page des details avec comme parametre l'id du Manga 
     */
    showDetails(item) {
      this.$router.push({path: `/details/${item.id}`});
    }
  }
}
</script>
