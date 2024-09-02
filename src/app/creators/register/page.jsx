import ButtonForm from '@/components/Button/ButtonForm';
import '../../styles/components.css';

export default function Register() {
    return(
        <section className=" mx-2 border flex-col">
        <div className="text-center border">
            Inscrivez-vous ici.
        </div>
        
        {/* Form */}
        <form action="">
            <input type="text" name="username" placeholder="Nom d'utilisateur" className="input-register-section" required/>
            <input type="email" name='email'  placeholder='Courriel' className="input-register-section" required />
            <input type="password" name='password'  placeholder='Mot de passe' className="input-register-section" required />
            <input type="password" name='password'  placeholder='Confirmation du mot de passe' className="input-register-section" required />
            <div className='flex justify-center'>
                <ButtonForm>Lancer l'inscription</ButtonForm>
            </div>
        </form>
        </section>
    )
}