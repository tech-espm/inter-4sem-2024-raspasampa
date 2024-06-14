import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		let hoje = new Date();

		let mes = hoje.getMonth() + 1;
		let dia = hoje.getDate();

		let opcoes = {
			ano: hoje.getFullYear(),
			mes: (mes < 10 ? "0" + mes : mes),
			dia: (dia < 10 ? "0" + dia : dia)
		};

		res.render("index/index", opcoes);
	}

	public async sobre(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre"
		};
	

		res.render("index/sobre", opcoes);
	}
	
	public async visualizacao(req: app.Request, res: app.Response) {
		let hoje = new Date();

		let mes = hoje.getMonth() + 1;
		let dia = hoje.getDate();
		let indicadores: any[];
		let bairros: any[];

		await app.sql.connect(async sql => {
			indicadores = await sql.query("SELECT id_indicador, nome_indicador FROM indicador");
			bairros = await sql.query("SELECT id_bairro, nome_bairro FROM bairro");
		});

		let opcoes = {
			titulo: "Visualização",
			ano: hoje.getFullYear(),
			mes: (mes < 10 ? "0" + mes : mes),
			dia: (dia < 10 ? "0" + dia : dia),
			indicadores: indicadores,
			bairros: bairros
		};

		res.render("index/visualizacao", opcoes);
	}

	@app.http.post()
	public async obterDados(req: app.Request, res: app.Response) {
		let indicadores: number[] = req.body?.indicadores || [];
		let bairros: number[] = req.body?.bairros || [];
		let dados: any[] = [];

		await app.sql.connect(async sql => {
			for (let i = 0; i < indicadores.length; i++) {
				for (let j = 0; j < bairros.length; j++) {
					const result = await sql.query("select concat(b.nome_bairro, ' / ', i.nome_indicador) sigla, a.ano, ifnull(e.valor, 0) valor from ano a left join evidencia e on e.ano = a.ano and e.id_indicador = ? and e.id_bairro = ? inner join indicador i on i.id_indicador = ? inner join bairro b on b.id_bairro = ? order by a.ano", [indicadores[i], bairros[j], indicadores[i], bairros[j]]);

					dados.push(result);
				}
			}
		});

		res.json(dados);
	}
}

export = IndexRoute;
