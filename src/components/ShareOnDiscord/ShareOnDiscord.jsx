const ShareOnDiscord = ({ message }) => {
    const encodedMessage = encodeURIComponent(message);
    const discordShareUrl = `https://discord.com/channels/@me?message=${encodedMessage}`;
  
    return (
      <a href={discordShareUrl} target="_blank" rel="noopener noreferrer">
        Partager sur Discord
      </a>
    );
  };
  
  export default ShareOnDiscord;