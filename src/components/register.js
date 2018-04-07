import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {logout} from '../actions';
import  _ from 'lodash';
import Header from './header';



class Register extends Component{


  render(){

    return (
      <div>
      <Header title="S'enregistrer"  backTo={()=>{this.props.history.goBack()}} noTools={true}/>
      <section className="with-header-nospace flex flex-column align-center just-center cgu">
        <h3> Modèle </h3>
        Cette application est développée sur un modèle participatif à but non-lucratif, transparent et open-source.
                  <br/>
        <h3> Tarifs </h3>
        <p>L'inscription est gratuite, cependant nous avons tous besoin de manger et par conséquent un don est toujours le bienvenu</p>
        <p>Pour donner une idée: Les serveurs coutent en ce moment xx CHF par mois pour XX utilisateurs soit X CHF par utilisateur</p>
        <p>Le cout de développement a été estimé à XXXX francs (soit 125h à 30CHF de l'heure)</p>

        <p>Si les dons mensuels sont suffisants nous pourrons par exemple, mettre en place des sauvegardes.</p>
        <p>Et cela facilitera et accelerera le développement de fonctionnalités supplémentaires</p>
        <h3> Garanties et conditions</h3>
        <p>Aucune garantie n'est fournie pour l'utilisation de Saladin. En vous inscrivant vous acceptez de l'utiliser à vos risques et périls.</p>
        <p>Tout recours juridique est exclu. Cet outil est fourni par l'auteur à bien plaire,
        ce qui signifie que l'auteur et l'utilisateur ne se trouvent pas dans une relation contractuelle de mandat.</p>
        <p>Bien que l'auteur ai fait tous les efforts possibles, tenu compte de ses compétences techniques, pour préserver la confidentialité des données hébergées, il ne pourra en aucun cas être tenu
        responsable d'une éventuelle fuite, piratage, perte partielle ou complète des données hébergées. L'utilisateur est tenu de ne pas entrer d'informations
        personnelles ou permettant d'identifier facilement une personne. L'utilisateur est complètement responsable des données qu'il entre dans Saladin.<br/>

        L'utilsateur est tenu de télécharger régulièrement ses données</p>
        <h3> Données</h3>
        <p>Les données sont hébergées par DigitalOcean, dans un datacenter à Francfort, dépendamment des dons mensuels, nous pensons migrer chez infomaniak à Genève</p>
        <p>Vous pourrez en tout temps télécharger vos données, pour les sauvegarder de votre côté, ou pour mettre en place un saladin auto-hébergé</p>
        <p>Vous pouvez en tout temps demander l'effacement de vos données et de votre compte. Prévoir environ 48h de délai.</p>

        <p>Les sources du client sont disponibles gratuitement ici: <a href="http://github.com/FDT2k/saladin-client" target="_blank">http://github.com/FDT2k/saladin-client</a> </p>

        <p>Les sources du serveur sont disponibles gratuitement ici: <a href="http://github.com/FDT2k/saladin-api" target="_blank">http://github.com/FDT2k/saladin-api</a></p>

        <p>Le support technique pour un saladin auto hébergé sera facturé 80 CHF de l'heure</p>

        <button>J'accepte les conditions d'utilisation et souhaite m'inscrire</button>
      </section>

      </div>
    );
  }
}

export default  Register;
