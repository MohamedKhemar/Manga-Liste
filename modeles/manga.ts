/**
 * modele de donnée representant un manga, avec tous ces attributs
 */
interface Manga {
    id: number;
    nom: string;
    auteur: string;
    date: string;
    url_image?: string;
    description?: string;
  }
  