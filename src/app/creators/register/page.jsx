"use client"; // pour détecter l'envoi du formulaire, il faut détecter la saisie des informations, et pour ça il faut utiliser un évènement, et pour utiliser un évènemetn , il faut use client

import ButtonForm from '@/components/Button/ButtonForm';
import '../../styles/components.css';
import Link from 'next/link';
import { newCreatorData } from '@/actions/newCreatorData';
import { toast } from 'react-toastify';
import { checkEmail } from '@/utils/check-email-syntax';
import { useRouter } from 'next/navigation'; // Toujours utiliser ce router quand on choisit le router App

export default function Register() {
    // Variable
    const router = useRouter();

    // Function
    const registerNewCreator = async (formData) => { // We get the data from the form
        const username = formData.get("username");
        const email = formData.get("email");
        const password = formData.get("password");
        const passwordconfirm = formData.get("passwordconfirm");

        // If a field is empty
        if(!username || !email || !password || !passwordconfirm ){
            // Notification
            return toast.error("Aucun champ ne doit être vide.");
            // Ne s'affiche pas puisque "required" est déjà utilisé. Je laisse comme ça pour l'instant.
        }

        // Check if passwords are identical
        if (password !== passwordconfirm) {
            return toast.error("Les mots de passe ne sont pas identiques");
        }

        // Check if the email is valid
        if(!checkEmail(email)) {
            return toast.error("Veuillez entrer un email valide")
        }

        // Check if the password is at least 8 characters long
        if(password.length < 8) {
            return toast.error("Le mot de passe est trop court. Il doit contenir au moins 8 caractères");
        }

        // Check if the password contains at least one digit
        if(!password.match(/.*[0-9].*/)) {
            return toast.error("Le mot de passe doit contenir au moins un chiffre");
        }

        try {
            newCreatorData(username, email, password, passwordconfirm);
   
        } catch (error) {
            return toast.error(error.message);
        }

        // Success
        toast.success("Votre compte a bien été créé");

        // Redirect
        router.push("/creators/login");
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
            <div className='password-requirement border'>
                <div className='text-center bg-slate-200 font-semibold'>Mot de passe</div>
                <div className='text-sm md:text-base'> 8 caractères minimum ; (au moins 1 chiffre et 1 lettre)</div>
            </div>
            <input type="password" name='password' placeholder='Mot de passe' className="input-register-section" required />
            <input type="password" name='passwordconfirm' placeholder='Confirmation du mot de passe' className="input-register-section" required />
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