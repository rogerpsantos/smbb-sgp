function processarJson(dados) {
	let tarefas = {};
	let processos = {};
	let etapas = {};
	let projetos = {};

	// const content = {};

	// Tarefa -> Processo -> Etapa -> Projeto
	const parseProjeto = (projeto) => {
		const item = { ...projeto, etapas: [] };
		projetos[projeto.id_projeto] = item;
	};

	const parseEtapa = (etapa) => {
		const item = { ...etapa, processos: [] };
		delete item['projetos'];

		etapas[etapa.id_etapa] = item;

		for (const projeto of etapa['projetos']) {
			const id = projeto.id_projeto;
			parseProjeto(projeto);
			projetos[id].etapas.push(item);
		}
	};


	const parseProcesso = (processo) => {
		const item = { ...processo, tarefas: [] };
		delete item['etapas'];

		processos[processo.id_processo] = item;

		for (const etapa of processo['etapas']) {
			const id = etapa.id_etapa;
			parseEtapa(etapa);
			etapas[id].processos.push(item);
		}
	};


	const parseTarefa = (tarefa) => {
		const item = { ...tarefa };
		delete item['processos'];

		tarefas[tarefa.id_tarefa] = item;

		for (const processo of tarefa['processos']) {
			const id = processo.id_processo;
			parseProcesso(processo);
			processos[id].tarefas.push(item);
		}
	};

	for (const tarefa of dados.content) {
		parseTarefa(tarefa);
	}
	return projetos;
}