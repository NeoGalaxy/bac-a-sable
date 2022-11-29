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

	<h2>Introduction </h2>
	<div><p>
		Le but de ce projet Challenge Open Data est de produire un visuel sur de différentes méthodes de votes réalisés en ligne offrant ainsi l'occasion de comprendre les opinions des participants sur les candidats à la presidentielle de 2017 et faire un lien avec les votes officiels. 
	</p></div>
	<h2>Jeu de données et représentation sur l'application</h2>
	<div>
		<p>
			cf pre-rapport
			Le jeu de données sélectionné pour ce challenge est issu d’une expérimentation en ligne sur les votes des élections présidentielles de 2017 en France.
			Près de 37739 personnes ont participé à l’expérience. Il leur a été demandé de remplir des bulletins de vote représentant différentes méthodes de vote. Les participants ont également répondu à différents questionnaires concernant par exemple leur jugement de la pertinence d’une telle démarche ou leur niveau de satisfaction quant à leur vote réellement exprimé au premier tour des élections présidentielles.

			Bien que nous disposions aussi d’indicateurs socio-professionnels (sexe, tranche d’âge, niveau d’éducation, etc), nous avons décidé de nous concentrer uniquement sur les données exprimées dans les bulletins de vote sans considérer ces autres facteurs. En effet, nous avons pour objectif de réaliser des visualisations de données permettant de comparer et de mettre en opposition les différentes méthodes de vote et leur influence sur le classement final des candidats.

			Afin de pouvoir réaliser cela, nous devons dans un premier temps traiter les données afin de les homogénéiser pour pouvoir les rendre exploitables. A cet effet, après pre-traitement de nos données, nous ne retenons que les resultats finaux pour les méthodes, les scores finaux pour les candidats qu'ont obtenu les candidats selons les méthodes de vote.
		</p>
	</div>
	<h2>Architecture de l'application</h2>
	<div>
		<p>Dans notre architecture, nous avons principalement deux pages: l'une "ReportPage.svelte" où se trouve le rapport et l'autre  "GraphPage" où sont faites les différentes repesentation graphiques.Ces deux pages sont récuperés dans le fichier index.html qui se trouve à la racine du projet. Nous avons une architecture arborescente contenant les dossiers suivants: 
		</p>
		<ul>
			<li><strong>src</strong>: contient tout le code source su projet, incluant les feuilles de styles, les librairies et les différents composants de l'application, mais aussi nos datasets contenant les infrormations nécessaires pour la représentation graphique pour les différentes méthodes.
			</li>

		</ul>
	</div>
	
	
	<h3>Technologies utilisées</h3>
	<div>



	<ul>
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
		<strong>150 Ko</strong>. L’analyse des bonnes pratiques révèle uniquement
		des aspects sur lesquels nous n’avons pas de contrôle dû au choix de ne pas
		utiliser de serveur (headers de caching et compression des ressources) ou à
		l’utilisation du service Google Fonts pour la police de l’application.
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

	<h2>Conclusion</h2>
</main>

<style>
	main {
		max-width: 65ch;
		margin: auto;
		line-height: 1.3;
		margin-top: 3rem;
		margin-bottom: 8rem;
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
