import Image from "next/image";
import logoPegi3 from "/public/logo/pegi_3.jpg";
import logoPegi7 from "/public/logo/pegi_7.jpg";
import logoPegi12 from "/public/logo/pegi_12.jpg";
import logoPegi16 from "/public/logo/pegi_16.jpg";
import logoPegi18 from "/public/logo/pegi_18.jpg";
import logoPegiSexe from "/public/logo/pegi_sexe.jpg";
import logoPegiOnline from "/public/logo/pegi_online.jpg";
import logoPegiNudite from "/public/logo/pegi_nudite.jpg";
import logoPegiJeuxHasard from "/public/logo/pegi_jeuxHasard.jpg";
import logoPegiViolence from "/public/logo/pegi_violence.jpg";
import logoPegiLangageGrossier from "/public/logo/pegi_langageGrossier.jpg";
import logoPegiPeur from "/public/logo/pegi_peur.jpg";
import logoPegiDrogue from "/public/logo/pegi_drogue.jpg";
import logoPegiDiscrimination from "/public/logo/pegi_discrimination.jpg";

const Pegi = ({
  selectedAgePegi,
  setSelectedAgePegi,
  selectedAdditionalPegi,
  setSelectedAdditionalPegi,
}) => {
  const handleAdditionalChange = (value) => {
    if (selectedAdditionalPegi.includes(value)) {
      setSelectedAdditionalPegi(
        selectedAdditionalPegi.filter((item) => item !== value)
      );
    } else {
      setSelectedAdditionalPegi([...selectedAdditionalPegi, value]);
    }
  };

  return (
    <section className="border my-2">
      <div className="pegi">
        <label>
          <Image src={logoPegi3} alt="Logo Pegi 3" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="radio"
              value="3"
              checked={selectedAgePegi === "3"}
              onChange={(e) => setSelectedAgePegi(e.target.value)}
            />
          </div>
        </label>

        <label>
          <Image src={logoPegi7} alt="Logo Pegi 7" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="radio"
              value="7"
              checked={selectedAgePegi === "7"}
              onChange={(e) => setSelectedAgePegi(e.target.value)}
            />
          </div>
        </label>

        <label>
          <Image src={logoPegi12} alt="Logo Pegi 12" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="radio"
              value="12"
              checked={selectedAgePegi === "12"}
              onChange={(e) => setSelectedAgePegi(e.target.value)}
            />
          </div>
        </label>

        <label>
          <Image src={logoPegi16} alt="Logo Pegi 16" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="radio"
              value="16"
              checked={selectedAgePegi === "16"}
              onChange={(e) => setSelectedAgePegi(e.target.value)}
            />
          </div>
        </label>

        <label>
          <Image src={logoPegi18} alt="Logo Pegi 18" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="radio"
              value="18"
              checked={selectedAgePegi === "18"}
              onChange={(e) => setSelectedAgePegi(e.target.value)}
            />
          </div>
        </label>
      </div>
      {/******************* Catégories *********************************************************************************** */}
      <div className="pegi flex-wrap">
        <label>
          <Image src={logoPegiSexe} alt="Logo Pegi Sexe" title="Sexe" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Sexe"
              checked={selectedAdditionalPegi.includes("Sexe")}
              onChange={() => handleAdditionalChange("Sexe")}
            />
          </div>
        </label>
        <label>
          <Image src={logoPegiNudite} alt="Logo Pegi Nudité" title="Nudité" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Nudité"
              checked={selectedAdditionalPegi.includes("Nudité")}
              onChange={() => handleAdditionalChange("Nudité")}
            />
          </div>
        </label>
        <label>
          <Image
            src={logoPegiJeuxHasard}
            alt="Logo Pegi Jeux de Hasard"
            title="Jeux de Hasard"
            unoptimized={true}
          />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Jeux de Hasard"
              checked={selectedAdditionalPegi.includes("Jeux de Hasard")}
              onChange={() => handleAdditionalChange("Jeux de Hasard")}
            />
          </div>
        </label>
        <label>
          <Image
            src={logoPegiViolence}
            alt="Logo Pegi Violence"
            title="Violence"
            unoptimized={true}
          />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Violence"
              checked={selectedAdditionalPegi.includes("Violence")}
              onChange={() => handleAdditionalChange("Violence")}
            />
          </div>
        </label>
        <label>
          <Image
            src={logoPegiLangageGrossier}
            alt="Logo Pegi Langage Grossier"
            title="Langage Grossier"
            unoptimized={true}
          />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Langage Grossier"
              checked={selectedAdditionalPegi.includes("Langage Grossier")}
              onChange={() => handleAdditionalChange("Langage Grossier")}
            />
          </div>
        </label>
        <label>
          <Image src={logoPegiPeur} alt="Logo Pegi Peur" title="Peur" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Peur"
              checked={selectedAdditionalPegi.includes("Peur")}
              onChange={() => handleAdditionalChange("Peur")}
            />
          </div>
        </label>
        <label>
          <Image src={logoPegiDrogue} alt="Logo Pegi Drogue" title="Drogue" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Drogue"
              checked={selectedAdditionalPegi.includes("Drogue")}
              onChange={() => handleAdditionalChange("Drogue")}
            />
          </div>
        </label>
        <label>
          <Image
            src={logoPegiDiscrimination}
            alt="Logo Pegi Discrimination"
            title="Discrimination"
            unoptimized={true}
          />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Discrimination"
              checked={selectedAdditionalPegi.includes("Discrimination")}
              onChange={() => handleAdditionalChange("Discrimination")}
            />
          </div>
        </label>
        <label>
          <Image src={logoPegiOnline} alt="Logo Pegi Online" title="En ligne" unoptimized={true} />
          <div className="flex justify-center pt-1">
            <input
              type="checkbox"
              value="Online"
              checked={selectedAdditionalPegi.includes("Online")}
              onChange={() => handleAdditionalChange("Online")}
            />
          </div>
        </label>
      </div>
    </section>
  );
};

export default Pegi;
