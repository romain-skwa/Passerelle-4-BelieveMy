"use client"; // pour détecter l'envoi du formulaire, il faut détecter la saisie des informations, et pour ça il faut utiliser un évènement, et pour utiliser un évènemetn , il faut use client

import ButtonForm from '@/components/Button/ButtonForm';
import '../../styles/components.css';
import Link from 'next/link';
import { newCreatorData } from '@/actions/newCreatorData';

export default function Register() {
    // Function
    const registerNewCreator = async (formData) => { // We get the datas from the form
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(`Dans le formulaire de création de compte : `,username, email, password);
        
        newCreatorData(username, email, password);
    }
    return(
        <section className=" mx-2 border flex-col">
        <div className="text-center border">
            Inscription
        </div>
        
        {/* Form */}
        <form action={registerNewCreator}>
            <input type="text" name="username" placeholder="Nom d'utilisateur" className="input-register-section" required/>
            <input type="email" name='email'  placeholder='Courriel' className="input-register-section" required />
            <input type="password" name='password'  placeholder='Mot de passe' className="input-register-section" required />
            <input type="password" name='password'  placeholder='Confirmation du mot de passe' className="input-register-section" required />
            {/*----------------------*/}
            <div className='flex justify-center'>
                <ButtonForm>Lancer l'inscription</ButtonForm>
            </div>
            {/*----------------------------------------------------------------*/}
            <div className='flex justify-center'>
                <Link href="../../creators/login">
                    <ButtonForm>Se connecter</ButtonForm>                
                </Link>
            </div>
        </form>
        </section>
    )
}
/* On se sert d'un server action pour pouvoir envoyer des données depuis un composant client*/