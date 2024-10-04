document.addEventListener('deviceready', function() {
    carregarPreferencias();

    const nomeUsuarioInput = document.getElementById('nomeUsuario');
    const temaSwitch = document.getElementById('temaSwitch');
    const salvarBtn = document.getElementById('salvarBtn');
    const welcomeMessage = document.getElementById('welcomeMessage');

    salvarBtn.addEventListener('click', function() {
        const nomeUsuario = nomeUsuarioInput.value;
        const temaEscuro = temaSwitch.checked;

        localStorage.setItem('nome', nomeUsuario);
        localStorage.setItem('tema', temaEscuro ? 'dark' : 'light');

        exibirMensagem(nomeUsuario);
        aplicarTema(temaEscuro);
    });

    function carregarPreferencias() {
        const nomeSalvo = localStorage.getItem('nome');
        const temaSalvo = localStorage.getItem('tema');

        if (nomeSalvo) {
            nomeUsuarioInput.value = nomeSalvo;
            exibirMensagem(nomeSalvo);
        }

        if (temaSalvo) {
            const isDarkTheme = temaSalvo === 'dark';
            temaSwitch.checked = isDarkTheme;
            aplicarTema(isDarkTheme);
        }
    }

    function exibirMensagem(nome) {
        welcomeMessage.innerText = nome ? `Bem-vindo, ${nome}!` : '';
    }

    function aplicarTema(isDark) {
        if (isDark) {
            document.body.classList.add('dark');
            document.body.classList.remove('light');
        } else {
            document.body.classList.add('light');
            document.body.classList.remove('dark');
        }
    }
});
