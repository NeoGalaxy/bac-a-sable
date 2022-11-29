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

	<h2>Jeu de données et représentation sur l'application</h2>

	<h2>Architecture de l'application</h2>

	<h3>Technologies utilisées</h3>

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
