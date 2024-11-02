import Image from "next/image";
import logoPegi3 from "../../../public/logo/pegi_3.jpg";
import logoPegi7 from "../../../public/logo/pegi_7.jpg";
import logoPegi12 from "../../../public/logo/pegi_12.jpg";
import logoPegi16 from "../../../public/logo/pegi_16.jpg";
import logoPegi18 from "../../../public/logo/pegi_18.jpg";
import logoPegiSexe from "../../../public/logo/pegi_sexe.jpg";
import logoPegiOnline from "../../../public/logo/pegi_online.jpg";
import logoPegiNudite from "../../../public/logo/pegi_nudite.jpg";
import logoPegiJeuxHasard from "../../../public/logo/pegi_jeuxHasard.jpg";
import logoPegiViolence from "../../../public/logo/pegi_violence.jpg";
import logoPegiLangageGrossier from "../../../public/logo/pegi_langageGrossier.jpg";
import logoPegiPeur from "../../../public/logo/pegi_peur.jpg";
import logoPegiDrogue from "../../../public/logo/pegi_drogue.jpg";
import logoPegiDiscrimination from "../../../public/logo/pegi_discrimination.jpg";

const Pegi = ({ selectedAge, setSelectedAge, selectedAdditional, setSelectedAdditional }) => {
    const handleAdditionalChange = (value) => {
        if (selectedAdditional.includes(value)) {
            setSelectedAdditional(selectedAdditional.filter(item => item !== value));
        } else {
            setSelectedAdditional([...selectedAdditional, value]);
        }

    };

    return (
        <section>
            <div className="pegi">
                <label>
                    <Image src={logoPegi3} alt="Logo Pegi 3" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="radio"
                            value="3"
                            checked={selectedAge === "3"}
                            onChange={(e) => setSelectedAge(e.target.value)}
                        />
                    </div>
                </label>

                <label>
                    <Image src={logoPegi7} alt="Logo Pegi 7" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="radio"
                            value="7"
                            checked={selectedAge === "7"}
                            onChange={(e) => setSelectedAge(e.target.value)}
                        />
                    </div>
                </label>

                <label>
                    <Image src={logoPegi12} alt="Logo Pegi 12" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="radio"
                            value="12"
                            checked={selectedAge === "12"}
                            onChange={(e) => setSelectedAge(e.target.value)}
                        />
                    </div>
                </label>

                <label>
                    <Image src={logoPegi16} alt="Logo Pegi 16" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="radio"
                            value="16"
                            checked={selectedAge === "16"}
                            onChange={(e) => setSelectedAge(e.target.value)}
                        />
                    </div>
                </label>

                <label>
                    <Image src={logoPegi18} alt="Logo Pegi 18" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="radio"
                            value="18"
                            checked={selectedAge === "18"}
                            onChange={(e) => setSelectedAge(e.target.value)}
                        />
                    </div>
                </label>
            </div>
            <div className="pegi">
                <label>
                    <Image src={logoPegiSexe} alt="Logo Pegi Sexe" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Sexe"
                            checked={selectedAdditional.includes("Sexe")}
                            onChange={() => handleAdditionalChange("Sexe")}
                        />
                    </div>
                </label>
                <label>
                    <Image src={logoPegiOnline} alt="Logo Pegi Online" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Online"
                            checked={selectedAdditional.includes("Online")}
                            onChange={() => handleAdditionalChange("Online")}
                        />
                    </ div>
                </label>
                <label>
                    <Image src={logoPegiNudite} alt="Logo Pegi Nudité" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Nudité"
                            checked={selectedAdditional.includes("Nudité")}
                            onChange={() => handleAdditionalChange("Nudité")}
                        />
                    </div>
                </label>
                <label>
                    <Image src={logoPegiJeuxHasard} alt="Logo Pegi Jeux de Hasard" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Jeux de Hasard"
                            checked={selectedAdditional.includes("Jeux de Hasard")}
                            onChange={() => handleAdditionalChange("Jeux de Hasard")}
                        />
                    </div>
                </label>
                <label>
                    <Image src={logoPegiViolence} alt="Logo Pegi Violence" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Violence"
                            checked={selectedAdditional.includes("Violence")}
                            onChange={() => handleAdditionalChange("Violence")}
                        />
                    </div>
                </label>
                <label>
                    <Image src={logoPegiLangageGrossier} alt="Logo Pegi Langage Grossier" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Langage Grossier"
                            checked={selectedAdditional.includes("Langage Grossier")}
                            onChange={() => handleAdditionalChange("Langage Grossier")}
                        />
                    </div>
                </label>
                <label>
                    <Image src={logoPegiPeur} alt="Logo Pegi Peur" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Peur"
                            checked={selectedAdditional.includes("Peur")}
                            onChange={() => handleAdditionalChange("Peur")}
                        />
                    </div>
                </label>
                <label>
                    <Image src={logoPegiDrogue} alt="Logo Pegi Drogue" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Drogue"
                            checked={selectedAdditional.includes("Drogue")}
                            onChange={() => handleAdditionalChange("Drogue")}
                        />
                    </div>
                </label>
                <label>
                    <Image src={logoPegiDiscrimination} alt="Logo Pegi Discrimination" />
                    <div className="flex justify-center pt-1">
                        <input
                            type="checkbox"
                            value="Discrimination"
                            checked={selectedAdditional.includes("Discrimination")}
                            onChange={() => handleAdditionalChange("Discrimination")}
                        />
                    </div>
                </label>
            </div>
        </section>
    );
};

export default Pegi;