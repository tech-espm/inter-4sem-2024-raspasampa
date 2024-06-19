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
        let opcoes = { titulo: "Sobre" };
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
            titulo: "Gráfico 1",
            ano: hoje.getFullYear(),
            mes: (mes < 10 ? "0" + mes : mes),
            dia: (dia < 10 ? "0" + dia : dia),
            indicadores,
            bairros
        };

        res.render("index/visualizacao", opcoes);
    }

    public async visualizacao2(req: app.Request, res: app.Response) {
        let opcoes = { titulo: "Gráfico 2" };
        res.render("index/visualizacao2", opcoes);
    }

    public async visualizacao3(req: app.Request, res: app.Response) {
        let opcoes = { titulo: "Gráfico 3" };
        res.render("index/visualizacao3", opcoes);
    }

    public async visualizacao4(req: app.Request, res: app.Response) {
        let opcoes = { titulo: "Visualização 4" };
        res.render("index/visualizacao4", opcoes);
    }

    public async visualizacao5(req: app.Request, res: app.Response) {
        let opcoes = { titulo: "Visualização 5" };
        res.render("index/visualizacao5", opcoes);
    }

    @app.http.post()
    public async obterDados(req: app.Request, res: app.Response) {
        let indicadores: number[] = req.body?.indicadores || [];
        let bairros: number[] = req.body?.bairros || [];
        let dados: any[] = [];

        await app.sql.connect(async sql => {
            for (let i = 0; i < indicadores.length; i++) {
                for (let j = 0; j < bairros.length; j++) {
                    const result = await sql.query("SELECT concat(b.nome_bairro, ' / ', i.nome_indicador) AS sigla, a.ano, IFNULL(e.valor, 0) AS valor FROM ano a LEFT JOIN evidencia e ON e.ano = a.ano AND e.id_indicador = ? AND e.id_bairro = ? INNER JOIN indicador i ON i.id_indicador = ? INNER JOIN bairro b ON b.id_bairro = ? ORDER BY a.ano", [indicadores[i], bairros[j], indicadores[i], bairros[j]]);
                    dados.push(result);
                }
            }
        });

        res.json(dados);
    }
}

export = IndexRoute;
