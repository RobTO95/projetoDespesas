const db = require("./create-db.js");

// Dados para seed
const categoria = [
	{ id: 1, categoria: "Alimentação" },
	{ id: 2, categoria: "Transporte" },
	{ id: 3, categoria: "Moradia" },
	{ id: 4, categoria: "Saúde" },
	{ id: 5, categoria: "Educação" },
	{ id: 6, categoria: "Lazer" },
	{ id: 7, categoria: "Compras" },
	{ id: 8, categoria: "Assinaturas e Serviços" },
	{ id: 9, categoria: "Contas e Utilidades" },
	{ id: 10, categoria: "Investimentos" },
	{ id: 11, categoria: "Impostos e Taxas" },
	{ id: 12, categoria: "TransPresentes e Doaçõesporte" },
	{ id: 13, categoria: "Animais de Estimação" },
	{ id: 14, categoria: "Cuidados Pessoais" },
	{ id: 15, categoria: "Despesas Emergenciais" },
	{ id: 16, categoria: "Viagens" },
];

const sexo = [
	{ id: 1, sexo: "Feminino" },
	{ id: 2, sexo: "Masculino" },
];

const status_despesa = [
	{ id: 1, status_despesa: "Pago" },
	{ id: 2, status_despesa: "Pendente" },
];

const status_funcionario = [
	{ id: 1, status_funcionario: "Ativo" },
	{ id: 2, status_funcionario: "Inativo" },
];

const tipo_pagamento = [
	{ id: 1, tipo_pagamento: "à vista" },
	{ id: 2, tipo_pagamento: "parcelado" },
];

const forma_pagamento = [
	{ id: 1, forma_pagamento: "Dinheiro" },
	{ id: 2, forma_pagamento: "Cartão" },
	{ id: 3, forma_pagamento: "PIX" },
	{ id: 4, forma_pagamento: "Boleto" },
];

const vinculo_funcionario = [
	{ id: 1, vinculo: "CLT" },
	{ id: 2, vinculo: "PJ" },
	{ id: 3, vinculo: "Prestador de serviço" },
	{ id: 4, vinculo: "Doméstico" },
	{ id: 5, vinculo: "Freelancer" },
];

function seedTable(tableName, rows, keyColumn = "id") {
	// Limpa os dados da tabela
	db.prepare(`DELETE FROM ${tableName}`).run();

	// Insere os novos dados
	const keys = Object.keys(rows[0]);
	const placeholders = keys.map((k) => `@${k}`).join(", ");
	const stmt = db.prepare(
		`INSERT INTO ${tableName} (${keys.join(", ")}) VALUES (${placeholders})`
	);

	const insertMany = db.transaction((rows) => {
		for (const row of rows) stmt.run(row);
	});

	insertMany(rows);
	console.log(`✅ ${tableName} populada com sucesso.`);
}

// Executa o seed
seedTable("tabCategoria", categoria);
seedTable("tabSexo", sexo);
seedTable("tabStatusDespesa", status_despesa);
seedTable("tabStatusFuncionario", status_funcionario);
seedTable("tabTipoPagamento", tipo_pagamento);
seedTable("tabFormaPagamento", forma_pagamento);
seedTable("tabVinculoFuncionario", vinculo_funcionario);
