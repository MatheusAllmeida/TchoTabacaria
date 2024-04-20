// Variável para armazenar os itens do carrinho
var carrinhoItens = [];
var carrinhoAberto = false;
var contadorItens = 0;

// Variável para o contador de itens no carrinho
var contadorItensCarrinho = document.getElementById('contadorCarrinho');

// Impede o menu de contexto ao clicar com o botão direito do mouse
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// Impede seleção de texto
document.addEventListener('DOMContentLoaded', function() {
    document.body.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
});

// Função para voltar ao topo da página
function voltarAoTopo() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// função alerta adicionou ao carrinho
function mostrarAlerta() {
    var mensagem = "Produto Adicionado ao carrinho";
    var tempo = 1000; // 1 segundos

    var alerta = document.getElementById('meuAlerta');
    alerta.textContent = mensagem;
    alerta.style.display = 'block';

    setTimeout(function() {
        alerta.style.display = 'none';
    }, tempo);
}

// Mostrar ou ocultar o botão de voltar ao topo conforme a posição da página
window.addEventListener('scroll', function () {
    var btnVoltarTopo = document.getElementById('btnVoltarTopo');
    btnVoltarTopo.style.display = window.scrollY > 200 ? 'block' : 'none';
});

// Função para abrir o carrinho
function abrirCarrinho() {
    carrinhoAberto = true; // Define que o carrinho está aberto

    // Cria a camada de fundo
    var backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    document.body.appendChild(backdrop);

    var modal = document.createElement('div');
    modal.id = 'modalCarrinho';
    modal.innerHTML = '<button onclick="fecharCarrinho()" id="fecharModalCarrinho">X</button><ul id="listaItensCarrinho"></ul><div><button onclick="comprar()" id="comprarBtn" style="margin-right: 10px;">Comprar</button><button onclick="esvaziarCarrinho()" id="esvaziarCarrinhoBtn" style="margin-right: 10px;">Esvaziar Carrinho</button></div>';

    // Adiciona o modal ao corpo do documento
    document.body.appendChild(modal);

    // Estilizando os botões de fechar e finalizar do modal
    var fecharBtn = modal.querySelector('#fecharModalCarrinho');
    var esvaziarBtn = modal.querySelector('#esvaziarCarrinhoBtn');
    var comprarBtn = modal.querySelector('#comprarBtn');

    // Função para estilizar os botões
    function estilizarBotao(botao) {
        botao.style.cssText = 'padding: 10px 20px; background-color: rgb(255, 166, 0); color: white; border: none; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease';
    }

    estilizarBotao(fecharBtn);
    estilizarBotao(esvaziarBtn);
    estilizarBotao(comprarBtn);

    // Adicionando efeito hover aos botões
    fecharBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = 'rgb(184, 119, 0)';
    });

    fecharBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = 'rgb(255, 166, 0)';
    });

    esvaziarBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = 'rgb(184, 119, 0)';
    });

    esvaziarBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = 'rgb(255, 166, 0)';
    });

    comprarBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = 'rgb(184, 119, 0)';
    });

    comprarBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = 'rgb(255, 166, 0)';
    });

    // Exibe os itens do carrinho
    var listaItensCarrinho = modal.querySelector('#listaItensCarrinho');
    carrinhoItens.forEach(item => {
        var li = document.createElement('li');
        li.textContent = item.nome + ' (' + item.quantidade + 'x ' + item.preco + ')';
        listaItensCarrinho.appendChild(li);
    });

    // Atualiza o contador de itens no carrinho
    contadorItensCarrinho.textContent = contadorItens;
}

// Função para fechar o modal do carrinho e limpar o carrinho
function fecharCarrinho() {
    // Remove o modal de carrinho
    var modal = document.getElementById('modalCarrinho');
    if (modal) {
        modal.remove();
    }

    // Remove a camada de fundo
    var backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }

    carrinhoAberto = false; // Define que o carrinho está fechado
}

// Função para esvaziar o carrinho
function esvaziarCarrinho() {
    carrinhoItens = []; // Esvazia o carrinho
    contadorItens = 0; // Zera o contador de itens
    fecharCarrinho(); // Fecha o modal do carrinho
}

// Função para adicionar ao carrinho e exibir pop-up
function adicionarAoCarrinho(produtoNome, produtoPreco) {
    var produtoExistente = carrinhoItens.find(item => item.nome === produtoNome);
    if (produtoExistente) {
        produtoExistente.quantidade += 1; // Aumenta a quantidade do produto existente
    } else {
        carrinhoItens.push({ nome: produtoNome, preco: produtoPreco, quantidade: 1 }); // Adiciona o produto ao carrinho com quantidade 1
    }

    contadorItens++; // Incrementa o contador de itens
    contadorItensCarrinho.textContent = contadorItens; // Atualiza o texto do contador de itens
}

// Função para comprar os itens do carrinho
function comprar() {
    var mensagem = "Fala *John*! Gostaria de fazer um pedido:\n";
    carrinhoItens.forEach(item => {
        mensagem += "- " + item.nome + " (" + item.quantidade + "x " + item.preco + ")\n";
    });

    var numeroWhatsApp = "+554989195649";
    window.open("https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagem), "_blank");
}

// Event listener para adicionar produtos ao carrinho
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.produto img').forEach(imagem => {
        imagem.addEventListener('click', function () {
            const produtoNome = this.parentNode.getAttribute('data-nome');
            const produtoPreco = this.parentNode.querySelector('p').innerText;
            adicionarAoCarrinho(produtoNome, produtoPreco);
        });
    });
});

// Event listener para abrir o carrinho
document.getElementById('carrinho').addEventListener('click', function () {
    if (!carrinhoAberto) {
        abrirCarrinho();
    }
});


 // Pegar o modal
 var modal = document.getElementById("myModal");

 // Quando a página for carregada, abrir o modal
 window.onload = function() {
     modal.style.display = "block";
 }

 // Pegar o elemento <span> que fecha o modal
 var span = document.getElementsByClassName("close")[0];

 // Quando o usuário clicar no <span> (x), fechar o modal
 span.onclick = function() {
     modal.style.display = "none";
 }

 // Quando o usuário clicar em qualquer lugar fora do modal, fechar o modal
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }