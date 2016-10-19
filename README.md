# workshop-rootstock-LaBitConf2016
# Mercado Pokémon

Teaching material for LaBitConf 2016 RSK Workshop

The featured content must be used only for educational purposes.
This is a prototype for studying and learning about the development of RSK Dapps (decentralized applications) and should not be used in production.

## What is the Mercado Pokémon?
Mercado Pokémon is a demo of creating coins and Pokémons in RSK platform, as well as the trading between different accounts.

Also is presented the concept of a non-infrastructure environment, which uses blockchain as a data repository and acessing dapps directly by a standalone html.

## Pre-requisites:
- RSK node
- RSK console (connecting to the node)
- Solidity Browser

## Setup:

1. node console -server [node address]:4445

2. Open file accounts-for-testing.txt

3. Open file pokecoin.web3.js and copy the contents to the console

4. Note the address pokecoin.address in accounts-for-testing.txt

5. Transfer pokecoins to the players 1 and 2 using the console:
    ```
    pokecoin.transfer(account1Demo, 5000, {from:web3.eth.accounts[0],gas:2000000});
    pokecoin.transfer(account2Demo, 5000, {from:web3.eth.accounts[0],gas:2000000});
    ```
    
    5.1 Verify is the transfers were suceeded
    ```
    pokecoin.balanceOf(account1Demo) // 5000
    pokecoin.balanceOf(account2Demo) // 5000
    ```
    
6. Open file pokecentral.web3.js and copy the contents to the console

7.  Note the address pokecentral.address in accounts-for-testing.txt

8. Inside console, create the first pokemon owner:
    ```
    pokecentral.newPokemonMaster(web3.eth.accounts[0], {from:web3.eth.accounts[0],gas:2000000});
    ```
    
9. Inside console, create the first pokemon (0,0,0 this is a not valid pokemon)
    ```
    pokecentral.newPokemon(0,0,0, {from:web3.eth.accounts[0],gas:2000000})
    ```
    
10. Create the next four valid pokemons:
    ```
    pokecentral.newPokemon(3,500,40, {from:web3.eth.accounts[0],gas:2000000});
    pokecentral.newPokemon(1,535,70, {from:web3.eth.accounts[0],gas:2000000});
    pokecentral.newPokemon(4,546,80, {from:web3.eth.accounts[0],gas:2000000});
    pokecentral.newPokemon(2,557,90, {from:web3.eth.accounts[0],gas:2000000});
    ```    
    
    10.1 Verify pokemon total
    ```
    pokecentral.totalPokemonSupply()
    ```
    
    10.2 Verify the pokemon owner (wait until mining)
    ```
    pokecentral.pokemons(0);
    pokecentral.pokemons(1);
    pokecentral.pokemons(2);
    pokecentral.pokemons(3);
    pokecentral.pokemons(4);
    ```
    
11. Transfer the pokemons to player1 and player2
    ```    
    pokecentral.transferPokemon(web3.eth.accounts[0], account1Demo, 1,{from:web3.eth.accounts[0],gas:2000000});
    pokecentral.transferPokemon(web3.eth.accounts[0], account1Demo, 4,{from:web3.eth.accounts[0],gas:2000000});
    pokecentral.transferPokemon(web3.eth.accounts[0], account2Demo, 2,{from:web3.eth.accounts[0],gas:2000000});
    pokecentral.transferPokemon(web3.eth.accounts[0], account2Demo, 3,{from:web3.eth.accounts[0],gas:2000000});
    ```    
    
    11.1 Verify the pokemon owner, as in 10.2

12. Open file pokeMarket.web3.js, add the addresses pokecoin e pokecentral and load it into the console

13. Note the address of pokemarket.address in accounts-for-testing.txt

14. Update the PokeMarketAddress in dapps PokeCoin e PokeCentral
    ```    
    pokecoin.updatePokeMarketAddress(pokemarket.address, {from:web3.eth.accounts[0],gas:2000000});
    pokecentral.updatePokeMarketAddress(pokemarket.address, {from:web3.eth.accounts[0],gas:2000000});
    ```    
    
    14.1 Verify the addresses
    ```
    pokecoin.pokeMarketAddress();
    pokecentral.pokeMarketAddress();
    ```    
    
15. Put the pokemon 1 from account1Demo for selling by 2000 pkc:
    ```
    pokemarket.newSale(account1Demo, 1, 2000, {from:web3.eth.accounts[0],gas:2000000});
    ```    
    
16. Verify the number of active sells:
    ```
    pokemarket.totalActiveSales();
    ```
    
17. Verify the active sell 1 data:
    ```         
    pokemarket.pokeSales(0);
    ```    
    
18. Verify if the pokemon 1 is active for selling:
    ```
    pokemarket.pokeSelling(1);
    ```
    
19. Buy the pokemon 1, with the player 2
    ```
    pokemarket.buyPokemon(account2Demo, 1, {from:web3.eth.accounts[0],gas:2000000});
    ```   
    
20. Verify if the pokemon owner was changed to account2Demo address
    ```
    pokecentral.pokemons(1);
    ```
    
21. Verify the pokecoins total for each player
    ```
    pokecoin.balanceOf(account1Demo);
    pokecoin.balanceOf(account2Demo);
    ```  
    
22. Update vars PokeCoinAddress, PokeCentralAddress and PokeMarketAddress in mercadopokemon.js

23. Load player1.html and player2.html each one in a new window in Chrome


## How it works: 

Once the contracts were loaded, we created the PokeCoins and Pokemons, and distributed them between Player1 and Player2 accounts.
Through the html files you can put Pokemons for sale and make the purchase.

## Obs:
It is necessary that the account [0] is unlocked and has funds. To do this, type: personal.unlockAccount(eth.accounts[0]) on the console.

If pokecoins are transferred to an account, you can trade them directly in the secondary market, but that wallet must have funds for paying the rsk gas transaction.
