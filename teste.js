function atribuirVoos() {
    const recebeVoos = document.getElementById("cadastroVoos").value;
    const recebeAeronaves = document.getElementById("cadastroAeronaves").value;

    const mapaTrajetos = recebeVoos.split('\n').map(linha => {
        const partes = linha.split(';');
        const trajeto = partes[0];
        const duracao = parseInt(partes[1]);
        return { trajeto, duracao };
    });

    const aeronaves = recebeAeronaves.split('\n');

    const voosAtribuidos = {};
    const resumoAvioes = {};

    mapaTrajetos.forEach(viagem => {
        const aeronave = aeronaves[Math.floor(Math.random() * aeronaves.length)];

        if (!voosAtribuidos[aeronave]) {
            voosAtribuidos[aeronave] = [];
            resumoAvioes[aeronave] = { quantidade: 0, tempoTotal: 0 };
        }

        voosAtribuidos[aeronave].push({
            trajeto: viagem.trajeto,
            duracao: viagem.duracao,
        });

        resumoAvioes[aeronave].quantidade++;
        resumoAvioes[aeronave].tempoTotal += viagem.duracao;
    });

    mostraVoos(voosAtribuidos);
    mostraResumo(resumoAvioes);
}

function mostraVoos(voosAtribuidos) {
    const elementoVoosAtribuidos = document.getElementById("voosPorAviao");
    elementoVoosAtribuidos.innerHTML = "";

    for (const aeronave in voosAtribuidos) {
        const viagens = voosAtribuidos[aeronave];

        const listaViagens = document.createElement("ul");

        viagens.forEach(viagem => {
            const itemViagem = document.createElement("li");
            itemViagem.textContent = `${viagem.trajeto} - Duração: ${viagem.duracao} minutos`;
            listaViagens.appendChild(itemViagem);
        });

        const informacaoAviao = document.createElement("li");
        informacaoAviao.textContent = `${aeronave}:`;
        informacaoAviao.appendChild(listaViagens);
        elementoVoosAtribuidos.appendChild(informacaoAviao);
    }
}

function mostraResumo(resumoAvioes) {
    const elementoResumoAvioes = document.getElementById("resumoAviao");
    elementoResumoAvioes.innerHTML = "";

    for (const aeronave in resumoAvioes) {
        const information = resumoAvioes[aeronave];

        const resumoInformation = document.createElement("li");
        resumoInformation.textContent = `${aeronave}: Total de voos: ${information.quantidade}, Tempo total de voo: ${information.tempoTotal} minutos`;
        elementoResumoAvioes.appendChild(resumoInformation);
    }
}