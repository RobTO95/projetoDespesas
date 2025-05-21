import path from "path";
import { fileURLToPath } from "url";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class Conexao {
	static instance = null;

	constructor() {
		if (!Conexao.instance) {
			const dbPath = path.join(__dirname, "..", "db", "data.db");
			const db = new Database(dbPath);
			db.pragma("foreign_keys = ON");
			Conexao.instance = db;
		}
		this._conn = Conexao.instance;
	}

	get conn() {
		return this._conn;
	}

	execute(sql, params = {}) {
		return this._conn.prepare(sql).run(params);
	}

	queryOne(sql, params = {}) {
		return this._conn.prepare(sql).get(params);
	}

	queryAll(sql, params = {}) {
		return this._conn.prepare(sql).all(params);
	}

	transaction(fn) {
		const trx = this._conn.transaction(fn);
		return trx();
	}

	close() {
		this._conn.close();
		Conexao.instance = null;
	}

	hasTable(tableName) {
		const result = this._conn
			.prepare(`SELECT name FROM sqlite_master WHERE type='table' AND name = ?`)
			.get(tableName);
		return !!result;
	}
}
