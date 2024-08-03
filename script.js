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

// Função alerta adicionou ao carrinho
function mostrarAlerta() {
    var mensagem = "Adicionado ao carrinho";
    var tempo = 1000; // 1 segundo

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
    modal.innerHTML = '<button onclick="fecharCarrinho()" id="fecharModalCarrinho" style="padding: 8px;">X</button><ul id="listaItensCarrinho"></ul><div id="totalCarrinho">Total: R$ 0,00</div><div><button onclick="comprar()" id="comprarBtn" style="margin-right: 10px; padding:10px;">Comprar</button><button onclick="esvaziarCarrinho()" id="esvaziarCarrinhoBtn" style="margin-right: 10px; padding:10px;">Esvaziar Carrinho</button></div>';

    // Adiciona o modal ao corpo do documento
    document.body.appendChild(modal);

    // Estilizando os botões de fechar e finalizar do modal
    var fecharBtn = modal.querySelector('#fecharModalCarrinho');
    var esvaziarBtn = modal.querySelector('#esvaziarCarrinhoBtn');
    var comprarBtn = modal.querySelector('#comprarBtn');

    // Exibe os itens do carrinho
    var listaItensCarrinho = modal.querySelector('#listaItensCarrinho');
    carrinhoItens.forEach(item => {
        var li = document.createElement('li');
        li.textContent = item.nome + ' (' + item.quantidade + 'un ' + ')';
        listaItensCarrinho.appendChild(li);
    });

    // Calcula o total do carrinho
    var totalCarrinho = carrinhoItens.reduce((total, item) => {
        return total + (item.preco * item.quantidade);
    }, 0);

    // Atualiza o texto do total do carrinho
    var totalCarrinhoDiv = modal.querySelector('#totalCarrinho');
    totalCarrinhoDiv.textContent = 'Total: R$ ' + totalCarrinho.toFixed(2);
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
    contadorItensCarrinho.textContent = contadorItens; // Atualiza o texto do contador de itens
    salvarItensDoCarrinho(); // Salva o carrinho no localStorage
    // Agora chamamos a função para fechar o carrinho após esvaziar
    fecharCarrinho(); // Fecha o modal do carrinho
}

// Função para adicionar ao carrinho e exibir pop-up
function adicionarAoCarrinho(produtoNome, produtoPreco, produtoMarca) {
    // Constrói a mensagem a ser exibida
    let mensagemProduto = produtoNome;
    if (produtoMarca !== null && produtoMarca !== "CARVÃO" && produtoMarca !== "Aluminio") {
        mensagemProduto += ` - Marca: ${produtoMarca}`;
    }

    var produtoExistente = carrinhoItens.find(item => item.nome === produtoNome && item.marca === produtoMarca);
    if (produtoExistente) {
        produtoExistente.quantidade += 1; // Aumenta a quantidade do produto existente
    } else {
        carrinhoItens.push({ nome: produtoNome, preco: produtoPreco, quantidade: 1, marca: produtoMarca }); // Adiciona o produto ao carrinho com quantidade 1
    }

    contadorItens++; // Incrementa o contador de itens
    contadorItensCarrinho.textContent = contadorItens; // Atualiza o texto do contador de itens
    salvarItensDoCarrinho(); // Salva o carrinho no localStorage

    mostrarAlerta(); // Mostra o alerta de que o item foi adicionado ao carrinho

    // Verifica se o produto é "CARVÃO" ou "Aluminio" e se a mensagem inclui "Marca"
    if ((produtoMarca === "CARVÃO" || produtoMarca === "Aluminio") && mensagemProduto.includes('Marca')) {
        // Remove a parte da mensagem referente à marca
        mensagemProduto = mensagemProduto.split(' - ')[0];
    }

    return mensagemProduto;
}

// Função para comprar os itens do carrinho
function comprar() {
    var mensagem = "Fala *Gleize*! Gostaria de fazer um pedido:\n";
  
    carrinhoItens.forEach(item => {
      // Check if the product is "CARVÃO" and remove the brand information
      if (item.nome === "CARVÃO") {
        mensagem += `- ${item.nome} (${item.quantidade} un)\n`;
      } else {
        mensagem += `- ${item.nome} (${item.quantidade} un) - Marca: ${item.marca || ''}\n`;
      }
    });
  
    // Calculate the total cart price
    var totalCarrinho = carrinhoItens.reduce((total, item) => {
      return total + (item.preco * item.quantidade);
    }, 0);
  
    mensagem += "Total: R$ " + totalCarrinho.toFixed(2) + "\n";
    mensagem += "Frete a combinar.\n"; 
  
    var numeroWhatsApp = "+554988455171";
    window.open("https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(mensagem), "_blank");
  
    // Clear the cart after purchase
    esvaziarCarrinho();
  }


// Função para carregar os itens do carrinho do localStorage
function carregarItensDoCarrinho() {
    var carrinhoArmazenado = localStorage.getItem('carrinhoItens');
    if (carrinhoArmazenado) {
        carrinhoItens = JSON.parse(carrinhoArmazenado);
        contadorItens = carrinhoItens.length;
        contadorItensCarrinho.textContent = contadorItens;
    }
}

// Função para salvar os itens do carrinho no localStorage
function salvarItensDoCarrinho() {
    localStorage.setItem('carrinhoItens', JSON.stringify(carrinhoItens));
}

// Event listener para carregar os itens do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', function () {
    carregarItensDoCarrinho();
});

// Event listener para adicionar produtos ao carrinho
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.produto img').forEach(imagem => {
        imagem.addEventListener('click', function () {
            const produtoNome = this.parentNode.getAttribute('data-nome');
            const produtoMarca = this.closest('.linha-produtos').previousElementSibling.getAttribute('id');
            const produtoPreco = parseFloat(this.parentNode.querySelector('p').textContent.replace('R$', '').trim());

            // Verifica se o produto deve incluir a marca ao ser adicionado ao carrinho
            if (produtoNome === "CARVÃO" || produtoNome === "Alumínio") {
                // Não inclui a marca
                adicionarAoCarrinho(produtoNome, produtoPreco, null);
            } else {
                // Inclui a marca
                adicionarAoCarrinho(produtoNome, produtoPreco, produtoMarca);
            }
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
