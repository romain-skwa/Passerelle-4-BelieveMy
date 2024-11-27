export default function Footer({background}) {
  return (
    <footer
      className={`
        text-xs mt-6 p-3
        text-white
        text-center
        flex 
        flex-col 
        justify-center
        gap-1 
        md:flex-row 
        md:gap-4 
        ${background}
        `}
    >
      <div>© ThisisMYgame</div>
      <div>Conditions générales</div>
      <div>Politique de confidentialité</div>
    </footer>
  );
}
