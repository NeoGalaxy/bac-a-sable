<main>
	<h1>Challenge Open Data &mdash; Rapport</h1>

	<p>Membres de l’équipe&nbsp;:</p>
	<ul>
		<li>Ariane DAUVERGNE</li>
		<li>Gwennan ELIEZER</li>
		<li>Jean LE MENN</li>
		<li>Maxime LHERMITE</li>
		<li>Habibata SAMAKE</li>
		<li>Syméon SMITH</li>
	</ul>

	<h2>Introduction</h2>

	<p>
		Le but de ce Challenge Open Data est de produire un visuel sur différentes
		méthodes de votes grâce à l’expérience «&nbsp;Voter Autrement&nbsp;»
		réalisée en ligne, offrant ainsi l'occasion de comprendre les opinions des
		participants sur les candidats à la présidentielle de 2017 et de faire un
		lien avec les résultats du vote officiel.
	</p>

	<h2>Jeu de données et représentation sur l'application</h2>

	<p>
		<!-- cf pre-rapport --> Le jeu de données sélectionné pour ce challenge est issu
		d’une expérimentation en ligne sur les votes des élections présidentielles de
		2017 en France. Près de 37739 personnes ont participé à l’expérience. Il leur
		a été demandé de remplir des bulletins de vote représentant différentes méthodes
		de vote. Les participants ont également répondu à différents questionnaires concernant
		par exemple leur jugement de la pertinence d’une telle démarche ou leur niveau
		de satisfaction quant à leur vote réellement exprimé au premier tour des élections
		présidentielles. Bien que nous disposions aussi d’indicateurs socio-professionnels
		(sexe, tranche d’âge, niveau d’éducation, etc), nous avons décidé de nous concentrer
		uniquement sur les données exprimées dans les bulletins de vote sans considérer
		ces autres facteurs.
	</p>
	<p>
		En effet, nous avons pour objectif de réaliser des visualisations de données
		permettant de comparer et de mettre en opposition les différentes méthodes
		de vote et leur influence sur le classement final des candidats. Afin de
		pouvoir réaliser cela, nous devons dans un premier temps traiter les données
		afin de les homogénéiser pour pouvoir les rendre exploitables. À cet effet,
		après pré-traitement de nos données, nous ne retenons que les scores finaux
		qu'ont obtenu les candidats selons les méthodes de vote.
	</p>

	<h2>Architecture de l'application</h2>

	<p>
		L’application est structurée en deux couches&nbsp;: une couche de
		pré-traitement des données, permettant de mettre en forme les données et de
		les rendre plus digestes, et une couche applicative qui reprend ces données,
		applique si besoin des traitements plus légers, et les affiche sous forme de
		graphes interactifs.
	</p>
	<p>
		La partie de pré-traitement des données consiste en un script qui récupère
		pour chaque scrutin les résultats finaux des candidats et les rassemble en
		un jeu de données au format bien défini. Ces données sont ensuite insérées
		dans l’application dans un fichier JSON, qui est importé depuis
		l’application. Cependant, lors de la compilation, Svelte inclut ce fichier
		sous forme de variable JavaScript, ce qui permet de ne pas avoir de souci
		d’import de fichier de type CORS.
	</p>
	<p>
		L’application web utilise ces données pour afficher le
		«&nbsp;Bi-graphe&nbsp;» car celui-ci nécessite de connaître les résultats
		par méthode de vote. Par contre, le «&nbsp;Multi-graphe&nbsp;» a besoin
		d’avoir les données mises en forme par candidat (puisqu’il affiche les
		résultats de chaque méthode sélectionnée, pour chaque candidat). Cette mise
		en forme est réalisée au lancement de l’application et stockée dans une
		autre variable.
	</p>

	<h3>Technologies utilisées</h3>

	<ul>
		<li>
			<strong>Script de pré-traitement&nbsp;:</strong> Python.
			<br />
		</li>
		<li>
			<strong>Application web&nbsp;:</strong>
			<a target="_BLANK" href="https://svelte.dev">Svelte</a>.
			<br />
			Svelte est un framework web qui compile un langage proche des langages du web
			(HTML, CSS, JavaScript) en JavaScript extrêmement optimisé. Il donne un moyen
			simplifié de gérer l’état d’une application web, et d’interagir avec le DOM.
		</li>
		<li>
			<strong>Gestion des graphiques&nbsp;:</strong>
			<a target="_BLANK" href="https://d3js.org">D3.js</a>.
			<br />
			Cette bibliothèque JavaScript renommée nous a permis de simplifier la gestion
			de l’affichage des graphiques, en simplifiant le calcul et l’affichage des
			axes, ainsi que les positions SVG des différents éléments constituants ces
			graphes.
		</li>
	</ul>

	<h3>Analyse GreenIT</h3>

	<p>
		L’application web sur laquelle vous vous trouvez récolte le score de
		<strong>A</strong> par l’analyse de GreenIT, avec un EcoIndex autour de
		<strong>95</strong>, une émission autour de
		<strong>1,1 gCO2e</strong> pour une taille totale d’environ
		<strong>150 Ko</strong> (résultats fluctuants légèrement selon le navigateur
		utilisé). L’analyse des bonnes pratiques révèle uniquement des aspects sur lesquels
		nous n’avons pas de contrôle dû au choix de ne pas utiliser de serveur (headers
		de caching et compression des ressources) ou à l’utilisation du service Google
		Fonts pour la police de l’application.
	</p>
	<p>
		Ce score est dû à l’efficacité de Svelte, mais la taille de la page peut
		étonner&nbsp;: en effet, un framework JavaScript tel que Svelte crée un
		unique script qui s’occupe de créer de lui-même tous les éléments de la
		page, plutôt que ceux-ci soient créés en HTML par le développeur. De plus,
		ce script emporte toutes les dépendances du projet&nbsp;: notamment, les
		éléments utilisés de la bibliothèque D3 composent une bonne partie de la
		taille du script généré.
	</p>
</main>

<style>
	main {
		max-width: 68ch;
		margin: auto;
		line-height: 1.3;
		margin-top: 3rem;
		margin-bottom: 8rem;
		text-align: justify;
		padding: 0 1rem;
	}

	h1,
	h2,
	h3 {
		color: var(--primary);
	}

	ul {
		margin-top: -0.5rem;
	}

	a,
	a:visited {
		color: inherit;
	}
</style>
