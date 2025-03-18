Dans le cadre de la formation en développement web : BelieveMy. Les étudiants dont je faisais partie avaient pour devoir de créer un site complet et fonctionnel. Cette épreuve, appelée : Projet passerelle, était la quatrième et la dernière. La validation de celle-ci était indispensable pour valider l'ensemble de la formation. L'intitulé de ce projet était : "Surprenez votre formateur, le but est de présenter un site internet utile qui pourrait sortir en tant qu'idée de startup."
Après avoir envisagé un court moment un site sur lequel les artisans auraient pu présenter leur produits, j'ai changé d'avis. Concidérant que ces derniers étaient peu enclin à utiliser un tel site et que leur réseau existait déjà hors d'internet, je me suis orienté vers un site de présentation de jeux vidéos. Un site dans lequel les développeurs des jeux présenteraient eux-même leur créations. Internet ne manque pas de site consacrés aux jeux-vidéos. Mais ceux-ci sont des sites de journalistes ou d'éditeurs professionnels. La référence dans ce domaine : jeuxvideo.com ne parle plus de jeux vidéo. Seul itch.io laisse la possibilité aux développeurs de présenter leurs jeux. Mais sur ce site, les développeurs sont des amateurs qui créer des jeux très courts et gratuits. Ils sont généralement candidats dans des Game-jam ; des concours dans lesquels ils doivent créer un jeux en 48 heures.
Les jeux sortant sur les plate-formes comme Steam se compte par milliers chaque année. Ils sont pour ainsi dire "noyés dans la masse". Si une partie d'entre eux est visible sur un site comme le mien, peut-être seront-ils plus succeptibles d'attirer l'attention. Mais ce n'est le tout d'avoir une idée. Encore faut-il l'exploiter correctement. Et pour mon épreuve, j'ai choisi un projet qui pourrait-être utilisable après la formation.

J'arrive à la fin de cette épreuve, je dois m'efforcer de voir la partie pleine du verre. Ce qui est loin d'être évident. Il a fallu six mois pour rendre le projet qui ne répond pas vraiment à mes attentes. Le site est fonctionnel. Mais les avantages censés convaincre n'y sont pas. J'ai consacré énormément de temps à la partie fonctionnelle, surtout celles qui ne sont pas intégrées aux cours. J'ai perdu des semaines entières à choisir des services tiers, tenter de les installer par moi même. Je ne sais plus si le pire a été l'exploitation d'un éditeur de texte enrichi ou l'hébergeur d'image pour mes utilisateurs.
Devant la difficulté à installer et utiliser l'éditeur de texte, j'ai décidé d'en créer un moi-même ; avec une intelligence artificielle bien-sûr. Encore une fois, le résultat était fonctionnel mais ridicule. Par exemple, quand l'utilisateur voulait transformer son texte en "gras", le fait de cliquer sur le bouton ajoutait des balises de langage html que seuls les développeurs connaissent. Ce qui rendait l'expérience d'utilisation inacceptable. J'ai donc passé des mois avec un éditeur de texte enrichi obsolète. Et quand j'ai décidé au tout dernier moment de revenir à l'éditeur proposé par le service tiers, je ne me souvenais même plus du problème qui m'avait poussé à créer le mien. Une personnalisation que je n'arrivais pas à créer, sans doute.
Autre grande perte de temps, l'hébergeur pour stocker les images des membres inscrits. En cherchant à simplifier l'expérience, le service Cloudinary incite le développeur à utiliser un widget. C'est une petite fenêtre qui inclut plusieurs fonctionnalités prédéfinies comme redimensionner les images par exemple. Le problème est que l'envoi de l'image vers le serveur Cloudinary était immédiat. Dès qu'elle était choisie. J'ai tenté de contourner cette abération en supprimant l'image précédente quand l'utilisateur décide de remplacer celle-ci. Mais dans le cas où l'utilisateur fermait avant de finir de remplir le formulaire, les images étaient stockées inutilement dans le serveur. J'ai passé une semaine à contourner le problème. J'avais presque réussi. Les images stockées étaient effacées quand l'utilisateur clique sur un lien vers une autre page du site. Mais quand il fermait l'onglet, les images restaient inutilement stockées. J'étais sur le point d'essayer un autre service tiers quand j'ai réussi ce que je voulais faire depuis le début. J'ai recommencé à partir d'un code presque vide. Il y avait seulement des boutons permettant d'envoyer des fichiers : les images. Et j'ai demandé à l'intelligence artificielle de Cloudinary de se baser sur ce code. Toujours avec son aide, j'ai ajouté l'affichage des images avant qu'elles ne soient envoyées. Il m'a fallu une journée entière pour intégrer ce code basique à celui du formulaire. Mais l'objectif est enfin atteint : les images ne sont envoyées qu'au moment où toutes les données du formulaires le sont.

Maintenant, tout cela fonctionne mais l'essentiel n'y est pas. Il me faudrait des semaines supplémentaires pour réaliser l'idée de base : laisser le choix de l'apparence aux membres. Je voulais créer plusieurs mises en page prédéfinies afin que les personnes inscrites puissent présenter leur jeux le plus facilement possible. J'espérais passé la majorité du projet à créer ces mises en page et proposer un choix de personnalisations. C'est la partie du développement web que je préfère. Dans ce projet, j'y ai consacré 20% du temps.

Je vais présenter en détails ce que j'ai réussi à faire.
Au départ, je cherchais un fond d'écran assez sobre et polyvalent. Comme celui d'une Playstation 4. Mais les gifs que je trouvais présentaient des mouvements beaucoup trop rapides. J'ai donc utilisé une image fixe. Elle est dans le style des jeux Nintendo Nes ou Sega Master System. C'est plutôt joli mais ça laisse à croire que tous les jeux présentés sur le site seront dans ce style.
Globalement, je suis assez satisfait de l'aspect visuel du site. Les boutons avec les arrondis sont dans l'ère du temps. Les polices d'écritures sont basiques pour les boutons et assortis aux jeux vidéos pour l'encadré du haut. J'ai préféré du noir transparent pour l'arrière plan des boutons plutôt qu'une couleur opaque. L'absence de couleur rendait la lecture difficile.
Les deux drapeaux visibles correspondent aux deux langues du site. Quand le visiteur utilise un navigateur français, français-québecois, français-belge ou une autre variante, l'affichage sera automatiquement français. Dans tous les autres cas, l'affichage sera en anglais. Que le navigateur soit en anglais ou autre que le français. La taille des drapeaux ne varie pas selon celle de l'écran. Mais l'espace dédié aux logos des réseaux sociaux diffère quand on est sur mobile. Dans un premier temps, j'avais créé une disposition en carré pour avoir deux logos sur une première ligne et les deux sur la deuxième. Mais quand j'ai ajouté un cinquième logo, j'ai du m'adapter. Aucun des ces logos ne sont véritablement cliquables. Mais l'idée était de créer une modale : un encadré qui s'afficherait seulement quand on clique sur les logos (quand on est sur mobile).

Concernant la page d'accueil, j'ai d'abord envisagé de ne montrer que les images sans les titres. Je voulais qu'un cadre apparaisse contenant les informations du jeu. Le problème était que sur un écran de mobile, il aurait fallu que le cadre apparaisse tantôt à droite, tantôt à gauche. J'ai finalement opté pour un simple affichage du titre sous l'image. Remarquez que l'image zoom légèrement quand on passe le curseur dessus. Le chargement de la page d'accueil devrait être rapide puisqu'il est fait sur le serveur et pas dans le navigateur.

Les boutons "Accueil" et "Recherche" sont remplacés par des petites icones sur les écrans mobiles pour occuper moins d'espace. Le bouton "Rechercher" propose une recherche rapide et simple. Et aussi "une recherche détaillée". Sur mobile, on passe focément sur la recherche détaillée dans un souci d'affichage. Je suis assez content de l'aspect du bouton avec le champ d'écriture, l'icone de la loupe à coté et la mention "recherche détaillée" en dessous. La modale a une apparance qu ime plait aussi mais elle contient peu de chose comparé à ce que je prévoyais. Il est tout de même possible d'effectuer des recherches parmi les genres et les plate-formes. Il est possible de fermer la modale en cliquant à l'extérieur de celle-ci. J'avais failli oublier cette possibilité. On la voit partout. Il fallait la rajouter.

La partir logo et nom du site est assez sobre mais j'estime que l'apparence est suffisamment bonne. Je suis assez content de la différence entre l'apparence sur écran large et écran de mobile. On pourrait croire qu'un ensemble a été créé pour chaque taille d'écran mais il n'en existe qu'un. Il s'adapte. Sur mobile, le texte rapetisse, un arrière plan violet apparait et le logo se positionne au centre. Je voulais une police d'écriture faisant référence aux vieux jeux-vidéos ou à l'informatique. J'ai été surpris par la facilité d'importation de la police dans ce projet. Étant donné que le titre est visible à proximité de la couleur violette de l'arrière plan, j'ai choisi la même couleur pour garder une homogénéité. Il y a un effet néon qui correspont à la ville moderne de l'arrière plan par défaut et également celui présent dans les formulaires. J'avais cherché des images de personnages devant leur écran censées représenter des développeurs de jeux. J'en ai même créées deux avec une intelligence artificielle mais je n'ai rien trouvé de convenable alors j'ai choisi l'image de la manette. Les images que j'ai obtenues avec l'IA ont été utilisées dans des exemples de présentations de jeux en arrière plan.

Evidemment le bouton "se connecter" cède la place au bouton "se déconnecter" une fois que l'utilisateur... est connecté.

Les parties pour créer un nouveau membre et lui permettre de se connecter étaient dans les cours de ma formation. Cela fait tellement longtemps que j'ai fait ces deux parties. Je ne souviens plus des difficultés que j'ai eu. La partie "mot de passe oublié" est fonctionnelle. Le seul problème est que le service tiers n'envoie les mails d'essai qu'à une seule adresse. Moi qui voulait inonder mes différentes adresses mail, ça n'a pas été possible. L'utilisateur qui s'inscrit reçoit un message lui confirmant l'inscription. Quand il a oublié son mot de passe, il doit donner son adresse mail pour recevoir le courriel. Celui-ci contient un lien unique et temporaire me semble-t-il. Je ne suis pas sûr. Pas très professionnel de ma part. L'utilisateur doit choisir un nouveau mot de passe. Dans la page de connexion, j'ai choisi d'indiquer les messages d'alertes identiques quand l'adresse mail ou le mot de passe sont erronés. Je souhaite resté volontairement évasif. Le message "le mot de passe est incorrect" est trop explicite. Il indique que l'adresse mail est bonne ; et que le problème ne provient que du mot de passe. Les hackers qui tentent d'entrer des mails dont ils disposent découvriraient de cette façon qu'une des adresses est dans le répertoire du site.
Encore une fois, le partie la plus compliquée a été d'installer le service tiers. J'ai eu besoin d'aide pour cela. Ce qui m'inquiète. Même si je souhaite me concentrer sur la création de la partie visible des sites, j'aimerais ne pas perdre tout ce que j'ai appris sur ce projet. Ceci dit, je ne suis pas prêt à travailler vite et bien quand il s'agit de la partie fonctionnelle que l'on appelle le backend.
Concernant la partie visible : le frontend, je suis très content du rendu dans les pages "S'inscrire" et "Se connecter". En particulier des expressions à l'intérieur des champs qui réduisent leur taille et qui montent quand on clique dessus pour écrire dans le champ du formulaire. Ces deux pages affichent le deuxième arrière plan. Celui qui est en fait une vidéo. Non seulement nous restons dans l'univers cyber-punk mais en plus nous voyons des références direct au monde du jeux-vidéo. Et cet arrière plan est également visible dans les pages "Présentez votre jeu" et "Votre profil".
Je me suis compliqué la tache dans la page de formulaire de présentation de jeu. J'avais créé des boutons en haut sur lesquels il fallait cliquer pour faire apparaitre la section correspondante. L'idée était d'avoir la zone "Aperçu" le plus haut possible. Quand une section était remplie, il fallait cliquer à nouveau sur le bouton pour faire disparaitre la zone. Tout ceci était compliqué et inutile. J'ai décidé de garder ce qui était des boutons pour les placer à gauche de l'écran. Ils servent dorénavant à indiquer quand une zone est remplie. Ces indicateurs ne sont visibles que lorsque l'écran est suffisamment large. Je suis très satisfait de l'apparence de ce formulaire. J'ai fait en sorte qu'il soit assorti à l'arrière plan. Je n'ai pas encore compris pourquoi la phrase tout en haut apparait bien de gauche à droite comme je le voulais au départ alors que la phrase en haut du formulaire "profile de l'utilisateur" montre une apparition centrée. Mais les deux somblent correctes. Je trouve que les ombres violettes complètent bien les lettres blanches. Dans cette page comme dans les autres, j'utilise le neumorphisme. C'est un style qui permet de créer une illusion de relief ou de forme enfoncée. C'est assez facile à faire et je trouve ce concept élégant sans être tape à l'œil. J'ai également utilisé la transparence dans la plupart des zones du formulaire. Comme toujours, la page est adapté à toutes les tailles d'écran. Seule la partie tinyMCE ressort du reste. J'ignore si je peux en changer l'apparence. J'ai failli laissé certaines parties comme "Date de sortie" sans la moindre décoration. Mais ayant déjà des mois de retard, je n'étais plus à quelques minutes pret. Et cette partie du travail est celle j'aime faire donc j'ai terminé.
J'aime beaucoup les icones Solo/Multi. Elles n'étaient pas comme ceci au départ. Je les ai créées avec un logiciel photo à partir d'un dessin de manette et d'un symbole de la planète.
Les couleurs d'arrière plan des indicateurs ont été assez compliquées à faire puisqu'il y a du rouge uni et un dégradé transparent de violet par dessus. Le choix vert dégradé turquoise est discutable mais facile à changer au besoin.

Loading pendant chargment des pages
chargement pendant l'envoi des données à mongodb (avec layout)
chargement encore différent quand on supprime une présentation (sans le layout)