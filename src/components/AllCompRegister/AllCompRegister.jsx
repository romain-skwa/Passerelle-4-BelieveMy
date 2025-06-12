"use client";
// REGISTER
import ButtonForm from "@/components/Button/ButtonForm";
import componentsCss from "@/app/styles/components.module.css";
import Link from "next/link";
import { newCreatorData } from "@/actions/newCreatorData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkEmail } from "@/utils/check-email-syntax";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/ForLayout/LanguageContext/LanguageContext";

export default function AllCompRegister() {
  // Variable
  const router = useRouter();
  const { language } = useLanguage();

  // Function
  const registerNewCreator = async (formData) => {
    // We get the data from the form
    const username = encodeURIComponent(formData.get("username"));
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordconfirm = formData.get("passwordconfirm");

    // If a field is empty
    if (!username || !email || !password || !passwordconfirm) {
      // Notification
      return toast.error(
        language === "fr"
          ? "Aucun champ ne doit être vide."
          : "No field should be empty."
      );
    }

    // Check if passwords are identical
    if (password !== passwordconfirm) {
      return toast.error(
        language === "fr"
          ? "Les mots de passe ne sont pas identiques."
          : "The passwords do not match."
      );
    }

    // Check if the email is valid
    if (!checkEmail(email)) {
      return toast.error(
        language === "fr"
          ? "Veuillez entrer un email valide."
          : "Please enter a valid email."
      );
    }

    // Check if the password is at least 8 characters long
    if (password.length < 8) {
      return toast.error(
        language === "fr"
          ? "Le mot de passe est trop court. Il doit contenir au moins 8 caractères."
          : "The password is too short. It must contain at least 8 characters."
      );
    }

    // Check if the password contains at least one digit
    if (!password.match(/.*[0-9].*/)) {
      return toast.error(
        language === "fr"
          ? "Le mot de passe doit contenir au moins un chiffre."
          : "The password must contain at least one digit."
      );
    }
    if (!password.match(/.*[a-zA-Z].*/)) {
      return toast.error(
        language === "fr"
          ? "Le mot de passe doit contenir au moins une lettre."
          : "The password must contain at least one letter."
      );
    }

    try {
      // Creation of new user
      const result = await newCreatorData(
        username,
        email,
        password,
        passwordconfirm
      ); // Assurez-vous d'attendre le résultat

      // Success
      if (result.success) {
        toast.success(
          language == "fr"
            ? "Un courriel vous a été envoyé"
            : "An email has been sent to you."
        );
        router.push("/creators/login");
      } else {
        toast.error(result.message);
      }
      // Redirect
      router.replace("/creators/login");
    } catch (error) {
      return toast.error(error.message);
    }
  };
  return (
    <section className="w-[90vw] tablet:w-[70vw] largeScreen:w-[30vw] mx-auto my-4 py-4 flex-col bg-white/10 border-2 rounded-2xl">
      <div className="text-center mx-auto w-[180px] p-3 bg-black/70 text-white text-2xl rounded-2xl border-2 border-black">
        {language === "fr" ? "INSCRIPTION" : "REGISTRATION"}
      </div>

      {/* Form */}
      <form action={registerNewCreator}>
        <div className={`${componentsCss.input_component}`}>
          <input
            type="text"
            name="username"
            placeholder={language === "fr" ? "Nom d'utilisateur" : "Username"}
            className={`${componentsCss.input_register_section}`}
            required
          />
        </div>

        <div className={`${componentsCss.input_component}`}>
          <input
            type="email"
            name="email"
            placeholder={language === "fr" ? "Courriel" : "Email"}
            className={`${componentsCss.input_register_section}`}
            required
          />
        </div>

        <div className="w-11/12 md:w-[400px] my-2 mx-auto rounded-md border">
          <div className="text-center bg-slate-200 font-semibold">
            {language === "fr" ? "Mot de passe" : "Password"}
          </div>
          <div className="text-sm md:text-base text-center bg-white pb-2">
            {" "}
            {language === "fr" ? (
              <>
                8 caractères minimum incluant
                <br />
                au moins 1 chiffre et 1 lettre.
              </>
            ) : (
              <>
                Minimum 8 characters including
                <br />
                at least 1 digit and 1 letter.
              </>
            )}
          </div>
        </div>

        <div className={`${componentsCss.input_component}`}>
          <input
            type="password"
            name="password"
            placeholder={language === "fr" ? "Mot de passe" : "Password"}
            className={`${componentsCss.input_register_section}`}
            required
          />
        </div>

        <div className={`${componentsCss.input_component}`}>
          <input
            type="password"
            name="passwordconfirm"
            placeholder={
              language === "fr"
                ? "Confirmation du mot de passe"
                : "Password confirmation"
            }
            className={`${componentsCss.input_register_section}`}
            required
          />
        </div>
        {/*----------------------*/}

        <div className="flex justify-center">
          <ButtonForm formButton>
            {language === "fr" ? "S'inscrire" : "Register"}
          </ButtonForm>
        </div>

        {/*----------------------------------------------------------------*/}

        <div className="flex justify-center">
          <Link href="../../creators/login">
            <ButtonForm>
              {language === "fr" ? "Se connecter" : "Login"}
            </ButtonForm>
          </Link>
        </div>
      </form>
    </section>
  );
}
