/**
 * Classe para manipulação de tabelas HTML com dados dinâmicos.
 */
export class TabelaInterativa {
	/** @type {HTMLTableElement} */
	table;

	/**
	 * @param {HTMLTableElement} table - Elemento da tabela HTML
	 */
	constructor(table) {
		if (!(table instanceof HTMLTableElement)) {
			throw new Error("Elemento fornecido não é uma tabela HTML.");
		}
		this.table = table;
	}

	/**
	 * Carrega dados na tabela a partir de um array de objetos.
	 * @param {Object[]} dados - Lista de objetos a serem carregados na tabela
	 */
	load(dados) {
		if (!Array.isArray(dados) || dados.length === 0) {
			this.clear();
			this.table.innerHTML =
				"<thead><tr><th>Nenhum dado encontrado</th></tr></thead>";
			return;
		}

		// Limpa conteúdo atual
		this.clear();

		// Gera cabeçalho com base nas chaves do primeiro objeto
		const colunas = Object.keys(dados[0]);
		const thead = this.table.createTHead();
		const headRow = thead.insertRow();

		colunas.forEach((col) => {
			const th = document.createElement("th");
			th.textContent = col;
			headRow.appendChild(th);
		});

		// Gera corpo da tabela
		const tbody = this.table.createTBody();

		dados.forEach((obj) => {
			const row = tbody.insertRow();
			colunas.forEach((col) => {
				const cell = row.insertCell();
				cell.textContent = obj[col] != null ? obj[col] : "";
			});
		});
	}

	/**
	 * Limpa todos os dados da tabela.
	 */
	clear() {
		this.table.innerHTML = "";
	}
}
