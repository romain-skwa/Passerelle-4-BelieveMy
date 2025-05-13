import Pacman from "/public/gif/pacman.gif";
import loadingCss from "/src/app/styles/loading.module.css";
const Loading = () => {
    return (
        <>
            <div className={loadingCss.load}>
                <img src={Pacman.src} alt="Pacman" className={loadingCss.pacman} />
                <div className={loadingCss.lettersGroup}>
                    <div className={loadingCss.letter}>L</div>
                    <div className={loadingCss.letter}>O</div>
                    <div className={loadingCss.letter}>A</div>
                    <div className={loadingCss.letter}>D</div>
                    <div className={loadingCss.letter}>I</div>
                    <div className={loadingCss.letter}>N</div>
                    <div className={loadingCss.letter}>G</div>
                </div>
            </div>
        </>
    );
};

export default Loading;