"use client";

import ButtonForm from "@/components/Button/ButtonForm";
import '../../styles/components.css';

export default function Login() {
    // Function
    const prepareLogin = async (formData) => {
        const email = formData.get("email");
        const password = formData.get("password");

        console.log(`Dans le formulaire de CONNEXION de compte : `, email, password);
    }
  return (
    <form action={prepareLogin}>
      <input
        type="email"
        name="email"
        placeholder="Courriel"
        className="input-register-section"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Mot de passe"
        className="input-register-section"
        required
      />
      {/*----------------------*/}
      <div className="flex justify-center">
        <ButtonForm>Se connecter</ButtonForm>
      </div>
    </form>
  );
}
