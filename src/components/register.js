import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {logout} from '../actions';
import  _ from 'lodash';
import Header from './header';
import RegisterForm from './register-form';
import{register} from '../actions';

class Register extends Component{
  constructor(props){
    super(props);
    this.state= {register:false,error:false,registered:false};
  }

  register(values){
    debugger;
    this.props.register(values).then((data)=>{
      debugger;
      if(data.error){
        this.setState({error:true});
      }else{
        this.setState({registered:true,error:false});
      }
    }).catch(()=>{
      debugger;
      this.setState({error:true});
    });
  }

  renderError(){
    const {register,registered,error} = this.state;
    debugger;
    if(error&& register){
      return(<div className="error">Une erreur est survenue pendant l&apos;enregistrement</div>)
    }
  }
  renderSuccess(){
    const {register,registered,error} = this.state;
    debugger;
    if(registered&& register){
      return(<div className="info">Vous êtes enregistrés, Vous pouvez désormais vous <Link to="/">connecter</Link></div>)
    }
  }

  renderRegisterForm()
  {
    const {register,registered,error} = this.state;
    if(register){
      return (
        <section className="cover flex flex-column align-center just-center">
          {this.renderError()}
          {this.renderSuccess()}

          <RegisterForm
            name="register"
            submitForm={(values)=>{this.register(values)}}
            cancelForm={()=>{this.setState({register:false})}}
            />
        </section>
      )
    }
  }

  renderCGU(){
    const {register,registered,error} = this.state;
    if(!register){
      return (
        <section className="main flex flex-column align-center just-center">
          <div className="cgu">
            <h3> Modèle </h3>
            <p>Cette application est développée sur un modèle participatif à but non-lucratif, transparent et open-source.</p>

            <h3> Tarifs </h3>
            <p>l&apos;inscription est gratuite, cependant nous avons tous besoin de manger, d&apos;entretenir des serveurs et de travailler dans la joie par conséquent un don est toujours le bienvenu.</p>
            <p>Pour donner une idée: Les serveurs coutent en ce moment 10 CHF par mois pour XX utilisateurs soit X CHF par utilisateur</p>
            <p>Le coût de développement a été estimé à 15&apos;000 francs (soit 125h à 120CHF de l&apos;heure)</p>
            <p>Si les dons mensuels sont suffisants nous pourrons par exemple, mettre en place des sauvegardes, des listes d&apos;aliments personnalisés etc.</p>
            <p>Et cela facilitera et accélerera le développement d&apos;autres fonctionnalités</p>

            <h3>Garanties et conditions</h3>
            <p>Aucune garantie n&apos;est fournie pour l&apos;utilisation de Saladin. En vous inscrivant vous acceptez de l&apos;utiliser à vos risques et périls.</p>
            <p>Tout recours juridique est exclu. Cet outil est fourni par l&apos;auteur à bien plaire, ce qui signifie que l&apos;AUTEUR et l&apos;UTILISATEUR ne se trouvent PAS dans une relation contractuelle de mandat.</p>

            <p>Bien que l&apos;AUTEUR ai fait tous les efforts possibles, compte tenu de ses compétences techniques, pour préserver la confidentialité des données hébergées, il ne pourra en aucun cas être tenu
            responsable d&apos;une éventuelle fuite, piratage, perte partielle ou complète des données hébergées. l&apos;UTILISATEUR est tenu de ne pas entrer d&apos;informations
            personnelles ou permettant d&apos;identifier une personne. l&apos;UTILISATEUR est entièrement responsable des données qu&apos;il entre dans Saladin.<br/>
            l&apos;UTILISATEUR est tenu de télécharger régulièrement ses données</p>

            <h3>Données</h3>
            <p>Les données sont hébergées par DigitalOcean, dans un datacenter à Francfort, dépendamment des dons mensuels, nous pensons migrer chez infomaniak à Genève</p>
            <p>Vous pourrez en tout temps télécharger vos données, pour les sauvegarder de votre côté, ou pour mettre en place un saladin auto-hébergé</p>
            <p>Vous pouvez en tout temps demander l&apos;effacement de vos données et de votre compte, en envoyant un email à fabien@ditore.ch. Prévoir environ 48h de délai.</p>
            <p>Les sources du client sont disponibles gratuitement ici: <a href="http://github.com/FDT2k/saladin-client" target="_blank">http://github.com/FDT2k/saladin-client</a> </p>
            <p>Les sources du serveur sont disponibles gratuitement ici: <a href="http://github.com/FDT2k/saladin-api" target="_blank">http://github.com/FDT2k/saladin-api</a></p>
            <p>Le support technique pour un saladin auto hébergé sera facturé 80 CHF de l&apos;heure</p>

            <div className="separate flex flex-column align-center">
              <h5>Acceptez-vous les conditions d&apos;utilisation ?</h5>
              <button className="cgubtn" onClick={()=>{
                this.setState({register:true});
              }}>J&apos;accepte</button>
            </div>


          </div>
        </section>
      )
    }
  }

  render(){
    return (
    <div>
      <Header title="S'enregistrer"  backTo={()=>{this.props.history.goBack()}} noTools={true}/>

        {this.renderCGU()}
        {this.renderRegisterForm()}


    </div>)
  }
}

export default  connect(null,{register})(Register);
