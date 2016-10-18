/*
Copyright (c) 2016 Edilson Osorio Junior - OriginalMy.com

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

var Web3 = require('web3');
var web3 = new Web3();
var eth = web3.eth;
	
var txutils = lightwallet.txutils;
var signing = lightwallet.signing;
var encryption = lightwallet.encryption;

/* ABI dos três Dapps */
var abiPokeCoin = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"marketAddress","type":"address"}],"name":"updatePokeMarketAddress","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"standard","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pokeMarketAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"qtdCoinsToDelete","type":"uint256"}],"name":"vanishCoins","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newSupply","type":"uint256"}],"name":"issueNew","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"owned","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"account1Demo","type":"address"},{"name":"account2Demo","type":"address"}],"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
var abiPokeCentral = [{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"marketAddress","type":"address"}],"name":"updatePokeMarketAddress","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalPokemonSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"pokeOwnerIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pokeMasters","outputs":[{"name":"pokeMaster","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pokeMarketAddress","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pokemonToMaster","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pokemons","outputs":[{"name":"pokeNumber","type":"uint256"},{"name":"pokeName","type":"string"},{"name":"pokeType","type":"string"},{"name":"pokeCP","type":"uint256"},{"name":"pokeHP","type":"uint256"},{"name":"pokemonHash","type":"bytes32"},{"name":"pokeOwner","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pokemonNumber","type":"uint256"},{"name":"cp","type":"uint256"},{"name":"hp","type":"uint256"}],"name":"newPokemon","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_pokemonID","type":"uint256"}],"name":"transferPokemon","outputs":[{"name":"pokemonID","type":"uint256"},{"name":"from","type":"address"},{"name":"to","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"},{"name":"","type":"uint256"}],"name":"pokemonNameTypes","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pokemonMaster","type":"address"}],"name":"newPokemonMaster","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"totalPokemonsFromMaster","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[],"type":"constructor"},{"payable":false,"type":"fallback"}];
var abiPokeMarket = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pokeSales","outputs":[{"name":"pokeSeller","type":"address"},{"name":"pokeBuyer","type":"address"},{"name":"pokeID","type":"uint256"},{"name":"pokePrice","type":"uint256"},{"name":"pokeSold","type":"bool"},{"name":"pokeSellActive","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newPokecoinAddress","type":"address"},{"name":"newPokecentralAddress","type":"address"}],"name":"updatePokecoinAndPokemarketAddresses","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pokeSaleIndex","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"pokeSelling","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pokeSellerAddress","type":"address"},{"name":"pokemonID","type":"uint256"},{"name":"pokemonSalePrice","type":"uint256"}],"name":"newSale","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalPokemonSales","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pokeCoin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pokeSellerAddress","type":"address"},{"name":"pokemonID","type":"uint256"}],"name":"stopSale","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"pokeCentral","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"pokeBuyerAddress","type":"address"},{"name":"pokemonID","type":"uint256"}],"name":"buyPokemon","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalActiveSales","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"owned","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"uint256"}],"name":"pokeMasterSelling","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"pokeCoinAddress","type":"address"},{"name":"pokeCentralAddress","type":"address"}],"type":"constructor"},{"payable":false,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pokeSellerAddress","type":"address"},{"indexed":false,"name":"pokemonID","type":"uint256"},{"indexed":false,"name":"pokemonSalePrice","type":"uint256"}],"name":"NewSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pokeSellerAddress","type":"address"},{"indexed":false,"name":"pokemonID","type":"uint256"}],"name":"StopSale","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"pokeBuyerAddress","type":"address"},{"indexed":false,"name":"pokeSellerAddress","type":"address"},{"indexed":false,"name":"pokemonID","type":"uint256"}],"name":"PokeTrade","type":"event"}];

/* Endereços dos Dapps */
var pokeCoinAddress = '0xc5ff80517e12a9dd9e249e0be5f5aa8adffb229a';
var pokeCentralAddress = '0x001306f6a9689a6701f6cbecc2ee5cab50ff6c42';
var pokeMarketAddress = '0x64ab6928cb89f0df40b42cb412a92ef77d10b7ac';

/* Carregamento dos Contratos */
var MyPokeCoinContract = web3.eth.contract(abiPokeCoin);
var pokeCoin = MyPokeCoinContract.at(pokeCoinAddress);

var MyPokeCentralContract = web3.eth.contract(abiPokeCentral);
var pokeCentral = MyPokeCentralContract.at(pokeCentralAddress);

var MyPokeMarketContract = web3.eth.contract(abiPokeMarket);
var pokeMarket = MyPokeMarketContract.at(pokeMarketAddress);

var keystore;

var accountAddress = "xxx";
var password = 'mercadopokemon';

/* Inicializa conexão com o node local */
web3.setProvider(new web3.providers.HttpProvider("http://40.76.76.239:4445"));	

function setWeb3Provider(keystore) {
    var web3Provider = new HookedWeb3Provider({
      host: "http://40.76.76.239:4445",
      transaction_signer: keystore
    });

    web3.setProvider(web3Provider);
};

/* Criação/carregamento do account */
lightwallet.keystore.deriveKeyFromPassword(password, function(err, pwDerivedKey) {

	/* Se for criar uma nova conta com um novo seed, descomente as duas linhas abaixo */

	//var extraEntropy = 'mercadopokemon129387612348917236';
	//seed = lightwallet.keystore.generateRandomSeed(extraEntropy);
	
	keystore = new lightwallet.keystore(seed, pwDerivedKey);
	keystore.generateNewAddress(pwDerivedKey, 1);

	accountAddress = keystore.getAddresses()[0];

	document.getElementById("accountAddress").innerText = '0x'+accountAddress;
	document.getElementById("seed").innerText = seed;
		
	web3.eth.defaultAccount = eth.accounts[0];

});	

function showStatus(){
	var currentBalance = pokeCoin.balanceOf('0x'+accountAddress).toNumber();
	console.log(currentBalance);
	var qtdePokemons = pokeCentral.totalPokemonsFromMaster('0x'+accountAddress);
	console.log(qtdePokemons);
	document.getElementById("currbalance").innerText = 'Balance: ' + currentBalance + ' pkc'; 
	document.getElementById("totalPokemons").innerText = 'Qtde : ' + qtdePokemons + ' pokemon(s)'; 			
	
	
	/* Constrói informações sobre cada Pokémon da conta */
	var html = '<table class="table table-striped">';
	html += '<thead><tr><th>ID</th><th>Pokemon</th><th>Type</th><th>CP</CP><th>HP</th></tr></thead><tbody>'
	for (i=0; i<qtdePokemons; i++){
		html += '<tr>'
		var pokeID = pokeCentral.balanceOf('0x'+accountAddress, i);
		html += '<td>' + pokeID + '</td>'
		for (j=1; j<5; j++){
			html += '<td>' + pokeCentral.pokemons(pokeID)[j] + '</td>';
		}
		html += '</tr>';
	}
	html+='</tbody></table>'
	
	document.getElementById("pokemonList").innerHTML = html;

	/* Constrói as vendas ativas */
	var html2 = '';
	html2 = '<table class="table table-striped">'
	html2 += '<thead><tr><th>ID</th><th>Pokemon</th><th>Type</th><th>CP</CP><th>HP</th><th>Price</th><th>Owner</th><th>#</th></tr></thead><tbody>';
	for (i=0;i<5;i++){
		if (pokeMarket.pokeSales(i)[0] == '0x') break;
		if (pokeMarket.pokeSales(i)[5]){ 
			html2 += '<tr>';
			saleID = pokeMarket.pokeSales(i)[2].toNumber();
			html2 += '<td>' + saleID + '</td>'
			for (j=1; j<5; j++){
				html2 += '<td>' + pokeCentral.pokemons(saleID)[j] + '</td>';
			}
			html2 += '<td>' + pokeMarket.pokeSales(i)[3].toNumber() + ' pkc</td>';
			html2 += '<td>' + pokeMarket.pokeSales(i)[0].substring(0,6) + '...'+ '</td>';
			if (pokeMarket.pokeSales(i)[0] == '0x'+accountAddress){
				html2 += '<td><button type="button" class="btn btn-xs btn-info" onclick="stopSell(' + saleID + ')">Cancel</button></td>';
			} else {
				html2 += '<td><button type="button" class="btn btn-xs btn-success" onclick="setBuy(' + saleID + ')">Buy</button></td>';
			}
			html2 += '</tr>';
		}		
	}
	html2 += '</tbody></table>'
	document.getElementById("pokeSells").innerHTML = html2;
};

function setSell(){
	var pokeIDSell = document.getElementById("pokeIDSell").value;
	var pokePriceSell = document.getElementById("pokePriceSell").value;
	pokeMarket.newSale('0x'+accountAddress, pokeIDSell, pokePriceSell, {value: 0, gas: 2000000}, function(err, hash) {
		if (!err){
			console.log("Transaction sent: " + hash);
			document.getElementById("msgVenda").innerText = hash;
		} else {
			console.log("Error: " + err);
			document.getElementById("msgVenda").innerText = err;
		};
	});
	var pokeIDSell = document.getElementById("pokeIDSell").value = '';
	var pokePriceSell = document.getElementById("pokePriceSell").value = '';
}

function setBuy(pokemonID){
	var pokeIDBuy = pokemonID;
	pokeMarket.buyPokemon('0x'+accountAddress, pokeIDBuy, {value: 0, gas: 2000000}, function(err, hash) {
		if (!err){
			console.log("Transaction sent: " + hash);
			document.getElementById("msgMercado").innerText = hash;
		} else {
			console.log("Error: " + err);
			document.getElementById("msgMercado").innerText = err;
		};
	});
	pokeIDBuy = '';
}

function stopSell(pokemonID){
	pokeMarket.stopSale('0x'+accountAddress, pokemonID, {value: 0, gas: 2000000}, function(err, hash) {
		if (!err){
			console.log("Transaction sent: " + hash);
			document.getElementById("msgMercado").innerText = hash;
		} else {
			console.log("Error: " + err);
			document.getElementById("msgMercado").innerText = err;
		};
	});
}


/* Filtro do web3 para atualizar os valores automaticamente */
var filter = web3.eth.filter('latest');
filter.watch(function(error, result) {
	if (!error) {
		showStatus()
	}
});
