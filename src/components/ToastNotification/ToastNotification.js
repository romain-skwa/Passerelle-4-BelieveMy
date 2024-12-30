"use client"; // Indique que ce composant est un composant client
import { useEffect } from "react";
import { toast } from "react-toastify"; // Importez la fonction toast

// Composant qui affiche des notifications de toast si une erreur est fournie
const ToastNotification = ({ error }) => {
  useEffect(() => {
    if (error) {
      toast.error(error); // Affiche une notification d'erreur avec le message d'erreur
    }
  }, [error]); // Se déclenche quand la prop error change

  return null; // Ce composant n'affiche rien directement
};

export default ToastNotification;
