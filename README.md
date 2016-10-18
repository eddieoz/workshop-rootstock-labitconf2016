# workshop-1hackathon-BC-2016
# Mercado Pokémon

Material didático para o Workshop no 1 Hackathon BC - 7-Set-2016

O conteúdo apresentado deve ser utilizado somente para fins didáticos. 
Este é um protótipo para estudo e aprendizado sobre o desenvolvimento de smart-contracts na plataforma Ethereum e não deve ser utilizado em produção.

## O que é o Mercado Pokémon
Mercado Pokémon é uma demonstração do funcionamento de criação de moedas e Pokémons na plataforma Ethereum, assim como a negociação dos mesmos entre contas distintas.

Também é apresentado o conceito de um ambiente sem infraestrutura, que usa o blockchain como repositório de dados e aplicações, acessado diretamente por um html standalone.

## Pré-requisitos:
- Ethereum em Testnet
- Mist

## Setup:

0. node console -server 40.76.76.239:4445

1. Abra o arquivo accounts-for-testing.txt

2. Abra o arquivo pokecoin.web3.js e carregue no console.

3. Anote o endereço de pokecoin.address em accounts-for-testing.txt

4. Transfira pokecoins para os players no console:
# pokecoin.transfer(account1Demo, 5000, {from:web3.eth.accounts[0],gas:2000000});
# pokecoin.transfer(account2Demo, 5000, {from:web3.eth.accounts[0],gas:2000000});
4.1 Verifique se a transferencia teve sucesso
# pokecoin.balanceOf(account1Demo) // 5000
# pokecoin.balanceOf(account2Demo) // 5000

5. Abra o arquivo pokecentral.web3.js e carregue no console

6. Anote o endereço de pokecentral.address em accounts-for-testing.txt

7. No console, crie o primeiro owner de pokemons:

# pokecentral.newPokemonMaster(web3.eth.accounts[0], {from:web3.eth.accounts[0],gas:2000000});

8. No console, crie o primeiro pokemon 0,0,0
# pokecentral.newPokemon(0,0,0, {from:web3.eth.accounts[0],gas:2000000})

9. Crie os primeiros pokemons validos
# pokecentral.newPokemon(3,500,40, {from:web3.eth.accounts[0],gas:2000000});
# pokecentral.newPokemon(1,535,70, {from:web3.eth.accounts[0],gas:2000000});
# pokecentral.newPokemon(4,546,80, {from:web3.eth.accounts[0],gas:2000000});
# pokecentral.newPokemon(2,557,90, {from:web3.eth.accounts[0],gas:2000000});
9.1 Verifique o total de pokemons
# pokecentral.totalPokemonSupply()
9.2 Verifique os pokemons do owner (aguarde a criacao)
# pokecentral.pokemons(0);
# pokecentral.pokemons(1);
# pokecentral.pokemons(2);
# pokecentral.pokemons(3);
# pokecentral.pokemons(4);

10. Transfira os pokemons criados para player1 e player2
# pokecentral.transferPokemon(web3.eth.accounts[0], account1Demo, 1,{from:web3.eth.accounts[0],gas:2000000});
# pokecentral.transferPokemon(web3.eth.accounts[0], account1Demo, 4,{from:web3.eth.accounts[0],gas:2000000});
# pokecentral.transferPokemon(web3.eth.accounts[0], account2Demo, 2,{from:web3.eth.accounts[0],gas:2000000});
# pokecentral.transferPokemon(web3.eth.accounts[0], account2Demo, 3,{from:web3.eth.accounts[0],gas:2000000});
10.1 Verifique os pokemons de cada owner como no item 9.1

11. Abra o arquivo pokeMarket.web3.js, adicione os endereços da pokecoin e pokecentral e carregue no console

12. Anote o endereço de pokemarket.address em accounts-for-testing.txt

13. Atualize o PokeMarketAddress nos contratos PokeCoin e PokeCentral
# pokecoin.updatePokeMarketAddress(pokemarket.address, {from:web3.eth.accounts[0],gas:2000000});
# pokecentral.updatePokeMarketAddress(pokemarket.address, {from:web3.eth.accounts[0],gas:2000000});
13.1 Verifique os endereços
# pokecoin.pokeMarketAddress();
# pokecentral.pokeMarketAddress();

14. Coloque o pokemon 1 do account1Demo à venda por 2000 pkc:
# pokemarket.newSale(account1Demo, 1, 2000, {from:web3.eth.accounts[0],gas:2000000});

15. Verifique o número de vendas ativas:
# pokemarket.totalActiveSales();

16. Verifique os dados da venda 1:
# pokemarket.pokeSales(0);

17. Verifique se o pokemon está com venda ativa diretamente:
# pokemarket.pokeSelling(1);

18. Compre o pokemon 1 à venda, com o player 2
# pokemarket.buyPokemon(account2Demo, 1, {from:web3.eth.accounts[0],gas:2000000});

19. Verifique que o owner do pokemon foi alterado para o endereço do account2Demo
# pokecentral.pokemons(1);

20. Verifique a quantidade de pokecoins de cada player
# pokecoin.balanceOf(account1Demo);
# pokecoin.balanceOf(account2Demo);

21. Atualize as variáveis PokeCoinAddress, PokeCentralAddress e PokeMarketAddress em mercadopokemon.js

22. Carregue player1.html e player2.html em janelas separadas no Chrome1






## Funcionamento: 

Assim que os contratos forem carregados, eles criarão as PokeCoins e Pokemons, e os distribuirão entre as contas Player1 e Player2.
Através dos arquivos html é possível colocar pokemons à venda e efetuar a compra.

## Observação:
É necessário que o account[0] esteja desbloqueado e possua fundos. Para isso, digite: personal.unlockAccount(eth.accounts[0]) no console.

Se as pokecoins forem transferidas para uma conta no Mist, é possível negociá-las no mercado secundário, desde que a wallet possua fundos em ether para pagar o gas da transação.

