// POUR L'INSTANT CE CODE N'EST UTILISE NULLE PART
const CallRouteAllDataUser = ({session, setUser}) => {
useEffect(() => {// to use the function fetchUserData when the session is defined
    fetchUserData();
  }, [session]);
  
    // Function to get all data about the connected user
    const fetchUserData = async () => {
      const response = await fetch("/api/getAllUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(session?.user?.username),
      }); 
  
      const data = await response.json();
  
      if (!data) {throw new Error("Invalid JSON response");}
  
      if (!response.ok) {toast.error("Une erreur est intervenue");}
  
      setUser(data.user);
    };
}