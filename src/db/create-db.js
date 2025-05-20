const path = require("path");
const fs = require("fs");
const Database = require("better-sqlite3");

// Garante que a pasta existe
const dbDir = path.join(__dirname);
if (!fs.existsSync(dbDir)) {
	fs.mkdirSync(dbDir, { recursive: true });
}

// Caminho completo do arquivo do banco
const dbPath = path.join(dbDir, "data.db");

// Conecta ao banco (cria se não existir)
const db = new Database(dbPath);

// Ativabdo chave estrangeira
db.pragma("foreign_keys = ON");

// Criação de tabelas ===================================================================
// -------------------------- criação da tabDespesas
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabDespesas (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        descricao TEXT NOT NULL, 
        categoria INTEGER, 
        valor REAL NOT NULL, 
        data TEXT NOT NULL, 
        forma_pagamento INTEGER, 
        tipo_pagamento INTEGER, 
        status_despesa INTEGER, 
        observacao TEXT
        )
        `
).run();

// -------------------------- criação da tabFuncionarios
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabFuncionarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        nome TEXT NOT NULL, 
        sexo INTEGER, 
        cpf TEXT, 
        data_nascimento TEXT, 
        contato TEXT, 
        endereco TEXT, 
        cep TEXT, 
        email TEXT, 
        status_funcionario INTEGER, 
        vinculo INTEGER, 
        banco TEXT, 
        agencia TEXT, 
        conta TEXT, 
        imagem TEXT
        )
        `
).run();

// -------------------------- criação da tabDespesasFuncionarios
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabDespesasFuncionarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        id_despesa INTEGER NOT NULL, 
        id_funcionario INTEGER NOT NULL, 
        FOREIGN KEY (id_despesa) REFERENCES tabDespesas(id) ON DELETE CASCADE, 
        FOREIGN KEY (id_funcionario) REFERENCES tabFuncionarios(id) ON DELETE CASCADE 
        )
        `
).run();

// -------------------------- criação da tabCategoria
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabCategoria (
        id INTEGER PRIMARY KEY, 
        categoria TEXT
        )
        `
).run();

// -------------------------- criação da tabSexo
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabSexo (
        id INTEGER PRIMARY KEY, 
        sexo TEXT
        )
        `
).run();

// -------------------------- criação da tabFormaPagamento
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabFormaPagamento (
        id INTEGER PRIMARY KEY, 
        forma_pagamento TEXT
        )
        `
).run();

// -------------------------- criação da tabTipoPagamento
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabTipoPagamento (
        id INTEGER PRIMARY KEY, 
        tipo_pagamento TEXT
        )
        `
).run();

// -------------------------- criação da tabStatusDespesa
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabStatusDespesa (
        id INTEGER PRIMARY KEY, 
        status_despesa TEXT
        )
        `
).run();

// -------------------------- criação da tabStatusFuncionario
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabStatusFuncionario (
        id INTEGER PRIMARY KEY, 
        status_funcionario TEXT
        )
        `
).run();

// -------------------------- criação da tabVinculoFuncionario
db.prepare(
	`CREATE TABLE IF NOT EXISTS tabVinculoFuncionario (
        id INTEGER PRIMARY KEY, 
        vinculo TEXT
        )
        `
).run();

// -------------------------------------------------------------
module.exports = db;
console.log("Banco criado com sucesso!");
