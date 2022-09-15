import React, {useState, useEffect} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlusSquare ,faSave, faEraser} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import InputValidation from '../validation/InputValidation';
import {useNavigate} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Notify from "../notifications/Toasts.js";


export default function AddPersonne() {

    const initialPersonne = {
        nom:"",
        prenom :"",
        dateNaissance:"",
        cin:"",
        sexe:"",
        email:"",
        numeroTel:"",
        adresse:"",
        situationFamiliale:"",
    };

    const[personne,setPersonne] = useState(initialPersonne);

    const [formErrors,setFormErrors] = useState({});
    const[isSubmit,setIsSubmit] = useState(false);

    const {nom, prenom,dateNaissance,cin,sexe,email,numeroTel,adresse,situationFamiliale} = personne;
    
    const resetPersonne = () =>
    {
        setPersonne(initialPersonne);
    }

    const onInputChange=(event)=>
    {
        setPersonne({...personne,[event.target.name]:event.target.value});
    };

    const onSubmit = async (event)=>
    {
        event.preventDefault();
        setFormErrors(InputValidation(personne));
        setIsSubmit(true);
    };

    const navigate = useNavigate();

    useEffect(()=>{
        if(Object.keys(formErrors).length === 0 && isSubmit)
        {
            personne.cin = personne.cin.toUpperCase();//to unify the input
            personne.numeroTel = personne.numeroTel.replace(/[^+\d]/g, '');//to unify the input
            axios.post("http://localhost:8080/api/ajouterPersonne",personne)
                        .then(response =>
                            {
                                if(response.data != null)
                                {
                                    navigate('/', {state: 'showToast'});
                                }
                            }
                            )
                        .catch((error) => {
                                Notify("infoExistant");
                                console.log(error);})
        }
    },[formErrors]);

    return (
    <div className='container ' style={{marginTop: "25px"}} id="content-wrap">
        <div className='row' >
            <div className="col-lg-8 offset-md-2 border rounded p-4 mt-2 shadow marginBottom ">
                <div style={{marginRight : "255px"}}>
                    <h2 className="m-4" > 
                    <FontAwesomeIcon icon={faPlusSquare} />{" "}
                    Ajouter une Personne 
                    </h2>
                </div>
                <hr />
               <br/>
                <div className='mb-3' style={{marginTop : "20px"}}>
                    <form noValidate onReset={(event)=>resetPersonne(event)} onSubmit={(event)=>onSubmit(event)}>
                        <div className="form-group row">
                            <label htmlFor="prenom" className="col-sm-4 col-form-label ">
                            <p className="floatLeft ">Prénom*</p>
                            </label>
                            <div className="col-sm-8">
                                <input type={"text"}
                                className="form-control" 
                                id="prenom"
                                name="prenom" 
                                placeholder="Prénom"
                                value={prenom}
                                onChange={(e)=>onInputChange(e)}
                                required/>
                                <p className="invalid">{formErrors.prenom} </p>
                            </div>                            
                        </div>
                        <br/>
                        <div className="form-group row">
                            <label htmlFor="nom" className="col-sm-4 col-form-label">
                            <p className='floatLeft'>Nom*</p>
                            </label>
                            <div className="col-sm-8">
                                <input 
                                type={"text"}
                                className=" form-control" 
                                id="nom" 
                                name="nom" 
                                placeholder="Nom"
                                value={nom}
                                onChange={(e)=>onInputChange(e)}
                                required/>
                                <p className="invalid">{formErrors.nom} </p>
                            </div>
                        </div>
                        <br/>   
                        <div className="row" >
                            <label htmlFor="dateNaissance" className="col-sm-4 col-form-label">
                            <p className='floatLeft'>Date de Naissance*</p>
                            </label>
                            <div  className="col-sm-8">
                                <input 
                                type={"date"}
                                name="dateNaissance" 
                                className="form-control" 
                                id="dateNaissance" 
                                value={dateNaissance}
                                onChange={(e)=>onInputChange(e)}
                                required/>
                                <p className="invalid">{formErrors.dateNaissance} </p>
                            </div>
                        </div>
                        <br/>
                        <div className="form-group row">
                            <label htmlFor="cin" className="col-sm-4 col-form-label">
                            <p className='floatLeft'>CIN*</p>
                            </label>
                            <div className="col-sm-8">
                                <input 
                                type={"text"}
                                className="form-control" 
                                id="cin" 
                                name="cin" 
                                placeholder="CIN"
                                value={cin}
                                onChange={(e)=>onInputChange(e)}
                                required
                                />
                                <p className="invalid">{formErrors.cin} </p>
                            </div>
                        </div>
                        <br/>
                        
                        <div className="form-group row">
                            <label htmlFor="sexe" className="col-sm-4 col-form-label">
                            <p className='floatLeft'>Sexe*</p>
                            </label>
                            <div className="col-sm-8">
                            <select 
                                value={sexe}  
                                name="sexe" 
                                id="sexe" 
                                className="form-control" required 
                                onChange={(e)=>onInputChange(e)}>
                                <option defaultChecked>Choisir le sexe...</option>
                                <option name="sexe" value="Femme">Femme</option>
                                <option  name="sexe" value="Homme">Homme</option>
                            </select>
                            <p className="invalid">{formErrors.sexe} </p>
                            </div>
                        </div>
                        <br/>
                            <div className="form-group row">
                                <label htmlFor="email" className="col-sm-4 col-form-label">
                                <p className='floatLeft'>Email*</p>
                                </label>
                                <div className="col-sm-8">
                                    <input 
                                    type={"email"}
                                    className="form-control" 
                                    id="email" 
                                    name="email"
                                    placeholder="jsmith@example.com" 
                                    value={email}
                                    onChange={(e)=>onInputChange(e)}
                                    required/>
                                    <p className="invalid">{formErrors.email} </p>
                                </div>
                            </div>
                        <br/>
                            <div className="form-group row">
                                <label htmlFor="numeroTel" className="col-sm-4 col-form-label">
                                <p className='floatLeft'>Numero de Téléphone*</p>
                                </label>
                                <div className="col-sm-8">
                                    <input 
                                    type={"tel"}
                                    className="form-control" 
                                    id="numeroTel" 
                                    name="numeroTel"
                                    placeholder="+212 X XX XX XX XX"
                                    onChange={(e)=>onInputChange(e)}
                                    value={numeroTel}
                                    required/>
                                    <p className="invalid">{formErrors.numeroTel} </p>
                                </div>
                            </div>
                        <br/>
                            <div className="form-group row">
                                <label htmlFor="adresse" className="col-sm-4 col-form-label">
                                <p className='floatLeft'>Adresse</p>
                                </label>
                                <div className="col-sm-8">
                                    <input 
                                    type={"text"}
                                    className="form-control" 
                                    id="adresse"
                                    name="adresse"  
                                    placeholder="Rue, appartement, bâtiment, code postal, ville et Pays "
                                    onChange={(e)=>onInputChange(e)}
                                    value={adresse}
                                    />
                                    <p className="invalid">{formErrors.adresse} </p>
                                </div>
                            </div>
                        <br/>
                        <div className="form-group row">
                            <label htmlFor="situationFamiliale" className="col-sm-4 col-form-label">
                            <p className='floatLeft'>Situation Familiale</p>
                            </label>
                            <div className="col-sm-8">
                            <select 
                            id="situationFamiliale" 
                            name="situationFamiliale" 
                            value={situationFamiliale} 
                            className="form-control"
                            onChange={(e)=>onInputChange(e)}>
                                <option defaultChecked>Choisir la situation familiale...</option>
                                <option name="situationFamiliale" value="Célibataire">Célibataire</option>
                                <option name="situationFamiliale" value="Marié(e)">Marié(e)</option>
                            </select>
                            <p className="invalid">{formErrors.situationFamiliale} </p>
                            </div>
                        </div>
                        <br/>
                        <div className = "col-sm-4 " style={{marginTop:"20px",marginLeft:"30px"}}>
                            <button type="submit" className="btn  btn-outline-success" > 
                                    <FontAwesomeIcon icon={faSave}/> Ajouter
                            </button>{" "}
                            <button type="reset" className= "btn btn-outline-primary" style={{marginLeft:"10px"}}>
                                    <FontAwesomeIcon icon={faEraser}/> Effacer
                            </button>
                        </div>
                        </form>
                    </div>
            </div>
        </div> 
        <ToastContainer className="marginBottom10"/>
    </div>
  )
}
