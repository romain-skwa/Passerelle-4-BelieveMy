"use client";

import { useFormStatus } from "react-dom"; // Pour connaitre le status actuel du formulaire

export default function ButtonForm({
  children,
  formButton,
}) {
  const { pending } = useFormStatus(); // Peut être = à true, false ou undefined.
  return (
    // En français, "disabled" se traduit par "désactivé" ou "inactif".
    <button
      disabled={formButton && pending} // Quand on clique, pending == true, donc le bouton est désactivé. Il n'est plus cliquable.
      // La propriété formButton doit être présente dans les props du composant pour que disabled soit true.
      className="text-white bg-black/70 border-2 p-3 mx-auto w-40 rounded-full m-2 disabled:bg-opacity-50 disabled:cursor-not-allowed hover:bg-white hover:transition hover:duration-300 hover:text-black"
    >
      {children}
    </button>
  );
}
