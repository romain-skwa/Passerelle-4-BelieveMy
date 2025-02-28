import "@/app/styles/loading.css";
import Pacman from "/public/gif/pacman.gif";
import WeAreSendingData from "@/components/WeAreSendingData/WeAreSendingData"; // Assurez-vous que le chemin est correct

const Loading = () => {
    return (
        <>
            <div className="load">
                <img src={Pacman.src} alt="Pacman" className="pacman" />
                <div className="lettersGroup">
                    <div className="letter">L</div>
                    <div className="letter">O</div>
                    <div className="letter">A</div>
                    <div className="letter">D</div>
                    <div className="letter">I</div>
                    <div className="letter">N</div>
                    <div className="letter">G</div>
                </div>
            </div>
        </>
    );
};

export default Loading;