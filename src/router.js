const routes = {
	"/home": "view/home.html",
	"/despesas": "view/despesas.html",
	"/funcionarios": "view/funcionarios.html",
	"/analises": "view/analises.html",
};

async function loadPage(path) {
	const route = routes[path] || routes["/home"];
	try {
		const response = await fetch(route);
		const html = await response.text();
		document.getElementById("app").innerHTML = html;
	} catch (e) {
		document.getElementById("app").innerHTML =
			"<h2>Erro ao carregar a página.</h2>";
	}
}

function router() {
	const hash = window.location.hash.slice(1); // remove o '#'
	loadPage(hash);
}

// Roteia no carregamento inicial
window.addEventListener("load", router);

// Roteia sempre que o hash mudar
window.addEventListener("hashchange", router);
