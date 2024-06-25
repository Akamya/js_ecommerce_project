import { Carousel } from "../components/Carousel";
import images from "../storage/homepageCarousel.json";
import sexeJSON from "../storage/sexe.json";
import marquesJSON from "../storage/marques.json";

/**
 * Page d'accueil
 *
 * @param {HTMLElement} element
 * @returns {void}
 */
export const Home = (element) => {
  const sexeChat = sexeJSON.find((sexe) => sexe.id == 1);
  const sexeChatte = sexeJSON.find((sexe) => sexe.id == 2);
  const crocs = marquesJSON.find((marque) => marque.id == 1);
  const nike = marquesJSON.find((marque) => marque.id == 2);
  const louboutin = marquesJSON.find((marque) => marque.id == 3);

  element.innerHTML = `
  <h1 style="text-align:center; padding-bottom: 1em;">Cat Shoes</h1>
    ${Carousel(images)}
    <h1 style="text-align:center; padding-top: 1em;">Bienvenue chez <strong>Cat Shoes</strong></h1>
        <p>La destination ultime pour habiller les pattes de vos compagnons félins avec style et confort. Que vous ayez un chat ou une chatte, nous avons sélectionné les meilleures marques de chaussures pour répondre à leurs besoins et à leurs envies. Découvrez notre collection unique et amusante de chaussures pour chats, conçues pour allier élégance et fonctionnalité.</p>


    <section id="categories">
        <h2 style="padding-top: 1em;">Nos Catégories</h2>
        <article id="chaussures-pour-chats">
            <h3>${sexeChat.nom}</h3>
            <p>${sexeChat.description}</p>
        </article>

        <article id="chaussures-pour-chattes">
            <h3>${sexeChatte.nom}</h3>
            <p>${sexeChatte.description}</p>
        </article>
    </section>

    <section id="marques">
        <h2>Nos Marques</h2>
        
        <article id="crocs">
            <h3>${crocs.nom}</h3>
            <p>${crocs.description}</p>
        </article>
        
        <article id="nike">
            <h3>${nike.nom}</h3>
            <p>${nike.description}</p>
        </article>
        
        <article id="louboutin">
            <h3>${louboutin.nom}</h3>
            <p>${louboutin.description}</p>
        </article>
    </section>
    `;
};
