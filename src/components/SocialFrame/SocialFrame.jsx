import { useState } from "react";
import Image from "next/image";
import logoInstagram from "/public/logo/instagram_logo.png";
import logoFacebook from "/public/logo/facebook_logo.png";
import logoTwitch from "/public/logo/twitch_logo.png";
import logoDiscord from "/public/logo/discord-logo.png";
import logoYoutube from "/public/logo/youtube_logo.png";
import  socialNetworkModal from "../../app/styles/socialNetworkModal.module.css";
import componentsCss from "@/app/styles/components.module.css";

export default function SocialFrame() {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleModalClick = (e) => {
        // Vérifie si le clic est en dehors de modal-content
        if (e.target === e.currentTarget) {
            handleCloseModal();
        }
    };

    return (
        <>
            <section className="w-[3.25rem] overflow-hidden" onClick={handleOpenModal}>
                <div className={`flex gap-1 ${componentsCss.allIconSocial}`}>
                    <Image src={logoDiscord} alt="Logo Discord" className="w-[1.5rem]" unoptimized={true} />
                    <Image src={logoYoutube} alt="Logo Youtube" className="w-[1.5rem]" unoptimized={true} />
                    <Image src={logoInstagram} alt="Logo Instagram" className="w-[1.5rem]" unoptimized={true} />
                    <Image src={logoFacebook} alt="Logo Facebook" className="w-[1.5rem]" unoptimized={true} />
                    <Image src={logoTwitch} alt="Logo Twitch" className="w-[1.5rem]" unoptimized={true} />
                </div>
            </section>

            {isModalOpen && (
                <div className={socialNetworkModal.modal} onClick={handleModalClick}>
                    <div className={socialNetworkModal["modal-content"]}>
                        <div className="flex flex-col gap-4 items-center">
                            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                                <Image src={logoDiscord} alt="Logo Discord" className="w-[3rem]" unoptimized={true} />
                            </a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                                <Image src={logoYoutube} alt="Logo Youtube" className="w-[3rem]" unoptimized={true} />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <Image src={logoInstagram} alt="Logo Instagram" className="w-[3rem]" unoptimized={true} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                <Image src={logoFacebook} alt="Logo Facebook" className="w-[3rem]" unoptimized={true} />
                            </a>
                            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
                                <Image src={logoTwitch} alt="Logo Twitch" className="w-[3rem]" unoptimized={true} />
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}