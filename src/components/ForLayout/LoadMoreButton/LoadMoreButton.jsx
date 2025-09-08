"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LoadMoreButton.module.css';

export default function LoadMoreButton({ count }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      await router.push(`?count=${count + 10}#bottom`);
      // Add a slight delay to show the loading spinner
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      {isLoading ? (
        <div className={styles.loadingSpinner} aria-label="Chargement en cours">
          <div className={styles.spinner}></div>
        </div>
      ) : (
        <button
          onClick={handleLoadMore}
          className="rounded-2xl text-white border bg-black/70 px-4 py-2 hover:bg-black/80 transition-all duration-300"
        >
          Voir plus de jeux
        </button>
      )}
    </div>
  );
}