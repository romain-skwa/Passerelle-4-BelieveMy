import "../../app/styles/loading.css";
import Image from "next/image";
import Pacman from "../../../public/gif/pacman.gif";

const  Loading =  () => {
    return (
        <div className="load">
                <Image src={Pacman} alt="Pacman" className="pacman w-[250px]" />
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
    )
}

export default Loading;