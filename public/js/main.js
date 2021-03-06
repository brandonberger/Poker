// Rules
/**
 * 
 * 2 - 10 Players
 * 1 Player is dealer
 * Left of the dealer - small and big blind ( to start pot )
 * PLayer left of the BB is first 
 * Options: Call, Raise, Fold, Check
 * 
 * After first round of betting,
 * A FLOP is put down ( 3 cards )
 * First player in this round is the person left of the dealer
 * 
 * After second
 * THE TURN is put down ( one more card)
 * 
 * Final round: THe RIVER
 * 5th card
 * 
 * After all
 * Showdown
 * Finds winner
 * 
 * Dealers more clockwise in next game
 * 
 * 
 * 
 * Big blind = buy in / 100
 * Small blind = big blind / 2
 * 
 */


/** TESTS */
function test(type) {
    if (type == 'royal-flush') {
        communityCards = [
            {fullName: "Ten of Spades", suit: "Spades", name: "Ten", faceValue: "10", numericValue: 10, location: 'community'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Eleven", faceValue: "11", numericValue: 11, location: 'community'},
            {fullName: "Queen of Spades", suit: "Spades", name: "Twelve", faceValue: "12", numericValue: 12, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "13", numericValue: 13, location: 'community'},
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "14", numericValue: 14, location: 'community'}
        ];

        players[1].hand = [
            {fullName: "Six of Clubs", suit: "Clubs", name: "Six", faceValue: "6", numericValue: 6, location: 'PlayersHand'},
            {fullName: "Ace of Diamonds", suit: "Diamonds", name: "Ace", faceValue: "A", numericValue: 14, location: 'PlayersHand'},
        ];
        players[0].hand = [
            {fullName: "6 of Diamonds", suit: "Diamonds", name: "Six", faceValue: "6", numericValue: 6, location: 'PlayersHand'},
            {fullName: "Ace of Hearts", suit: "Hearts", name: "Ace", faceValue: "A", numericValue: 14, location: 'PlayersHand'},
        ];
        paintCards(players[0].hand, 'yourHand');
        paintCards(players[1].hand, 'otherPlayersHands');
        paintCards(communityCards, 'communityCards');
        findWinner();
    } else if (type == 'flush') {

        players[0].hand = [
            {fullName: "Two of Hearts", suit: "Hearts", name: "Two", faceValue: "2", numericValue: 2, location: 'PlayersHand'},
            {fullName: "Two of Hearts", suit: "Hearts", name: "Two", faceValue: "2", numericValue: 2, location: 'PlayersHand'},
        ];

        players[1].hand = [
            {fullName: "Queen of Diamonds", suit: "Diamonds", name: "Queen", faceValue: "Q", numericValue: 12, location: 'PlayersHand'},
            {fullName: "Queen of Diamonds", suit: "Diamonds", name: "Queen", faceValue: "Q", numericValue: 12, location: 'PlayersHand'},
        ];

        communityCards = [
            // {fullName: "Queen of Diamonds", suit: "Diamonds", name: "Queen", faceValue: "Q", numericValue: 12, location: 'community'},
            {fullName: "9 of Spades", suit: "Spades", name: "Nine", faceValue: "9", numericValue: 9, location: 'community'},
            {fullName: "Ten of Spades", suit: "Spades", name: "Ten", faceValue: "10", numericValue: 10, location: 'community'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Eleven", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "Queen of Spades", suit: "Spades", name: "Twelve", faceValue: "Q", numericValue: 12, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "K", numericValue: 13, location: 'community'}
        ];
        paintCards(communityCards, 'communityCards');
        shuffleDeck();
        dealCards();
        findWinner();
    } else if (type == 'straight') {

        players[0].hand = [
            {fullName: "4 of Clubs", suit: "Clubs", name: "Four", faceValue: "4", numericValue: 4, location: 'PlayersHand'},
            {fullName: "Queen of Spades", suit: "Spades", name: "Queen", faceValue: "Q", numericValue: 12, location: 'PlayersHand'},
        ];

        players[1].hand = [
            {fullName: "Eight of Diamonds", suit: "Diamonds", name: "Eight", faceValue: "8", numericValue: 8, location: 'PlayersHand'},
            {fullName: "Nine of Diamonds", suit: "Diamonds", name: "Nine", faceValue: "9", numericValue: 9, location: 'PlayersHand'},
        ];

        communityCards = [
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "A", numericValue: 14, location: 'community'},
            {fullName: "Ten of Hearts", suit: "Hearts", name: "Ten", faceValue: "10", numericValue: 10, location: 'community'},
            {fullName: "Jack of Hearts", suit: "Hearts", name: "Eleven", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "4 of Hearts", suit: "Hearts", name: "Four", faceValue: "4", numericValue: 4, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "K", numericValue: 13, location: 'community'}
        ];
        paintCards(communityCards, 'communityCards');
        shuffleDeck();
        dealCards();
        findWinner();
    } else if (type == 'two-pair') {
        communityCards = [
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "14", numericValue: 14, location: 'community'},
            {fullName: "Ace of Hearts", suit: "Hearts", name: "Ace", faceValue: "14", numericValue: 14, location: 'community'},
            {fullName: "Jack of Hearts", suit: "Hearts", name: "Jack", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Jack", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "K", numericValue: 13, location: 'community'}
        ];
        players[0].hand = [
            {fullName: "Two of Hearts", suit: "Hearts", name: "Two", faceValue: "2", numericValue: 2, location: 'PlayersHand'},
            {fullName: "Four of Spades", suit: "Spades", name: "Four", faceValue: "4", numericValue: 4, location: 'PlayersHand'},
        ];
        players[1].hand = [
            {fullName: "Queen of Diamonds", suit: "Diamonds", name: "Queen", faceValue: "Q", numericValue: 12, location: 'PlayersHand'},
            {fullName: "3 of Spades", suit: "Spades", name: "Three", faceValue: "3", numericValue: 3, location: 'PlayersHand'},
        ];
        paintCards(players[0].hand, 'yourHand');
        paintCards(players[1].hand, 'otherPlayersHands');
        paintCards(communityCards, 'communityCards');
        findWinner();
    } else if (type == 'four-of-a-kind') {
        communityCards = [
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "14", numericValue: 14, location: 'community'},
            {fullName: "Ace of Hearts", suit: "Hearts", name: "Ace", faceValue: "14", numericValue: 14, location: 'community'},
            {fullName: "Ace of Diamonds", suit: "Diamonds", name: "Ace", faceValue: "A", numericValue: 14, location: 'community'},
            {fullName: "Ace of Clubs", suit: "Clubs", name: "Ace", faceValue: "A", numericValue: 14, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "K", numericValue: 13, location: 'community'}
        ];
        players[0].hand = [
            {fullName: "Jack of Diamonds", suit: "Diamonds", name: "Jack", faceValue: "J", numericValue: 11, location: 'PlayersHand'},
            {fullName: "Jack Of Clubs", suit: "Clubs", name: "Jack", faceValue: "J", numericValue: 11, location: 'PlayersHand'},
        ];
        players[1].hand = [
            {fullName: "6 of Clubs", suit: "Clubs", name: "Six", faceValue: "6", numericValue: 6, location: 'PlayersHand'},
            {fullName: "5 of Clubs", suit: "Clubs", name: "Five", faceValue: "5", numericValue: 5, location: 'PlayersHand'},
        ];
        paintCards(players[0].hand, 'yourHand');
        paintCards(players[1].hand, 'otherPlayersHands');
        paintCards(communityCards, 'communityCards');
        findWinner();
    } else if (type == 'full-house') {
        communityCards = [
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "A", numericValue: 14, location: 'community'},
            {fullName: "King of Hearts", suit: "Hearts", name: "King", faceValue: "K", numericValue: 13, location: 'community'},
            {fullName: "Jack of Hearts", suit: "Hearts", name: "Jack", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Jack", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "Jack of Diamonds", suit: "Diamonds", name: "Jack", faceValue: "J", numericValue: 11, location: 'community'}
        ];
        players[0].hand = [
            {fullName: "Queen of Diamonds", suit: "Diamonds", name: "Queen", faceValue: "Q", numericValue: 12, location: 'PlayersHand'},
            {fullName: "Ace Of Clubs", suit: "Clubs", name: "Ace", faceValue: "A", numericValue: 14, location: 'PlayersHand'},
        ];
        players[1].hand = [
            {fullName: "King of Diamonds", suit: "Diamonds", name: "King", faceValue: "K", numericValue: 13, location: 'PlayersHand'},
            {fullName: "4 of Clubs", suit: "Clubs", name: "Four", faceValue: "4", numericValue: 4, location: 'PlayersHand'},
        ];
        paintCards(players[0].hand, 'yourHand');
        paintCards(players[1].hand, 'otherPlayersHands');
        paintCards(communityCards, 'communityCards');
        findWinner();
    } else if (type == 'straight-flush') {
        communityCards = [
            {fullName: "Three of Diamonds", suit: "Diamonds", name: "Three", faceValue: "3", numericValue: 3, location: 'community'},
            {fullName: "Four of Diamonds", suit: "Diamonds", name: "Four", faceValue: "4", numericValue: 4, location: 'community'},
            {fullName: "Five of Diamonds", suit: "Diamonds", name: "Five", faceValue: "5", numericValue: 5, location: 'community'},
            {fullName: "Six of Diamonds", suit: "Diamonds", name: "Six", faceValue: "6", numericValue: 6, location: 'community'},
            {fullName: "Seven of Diamonds", suit: "Diamonds", name: "Seven", faceValue: "7", numericValue: 7, location: 'community'}
        ];
        players[1].hand = [
            {fullName: "One of Diamonds", suit: "Diamonds", name: "One", faceValue: "1", numericValue: 1, location: 'PlayersHand'},
            {fullName: "Two of Diamonds", suit: "Diamonds", name: "Two", faceValue: "2", numericValue: 2, location: 'PlayersHand'},
        ];
        players[0].hand = [
            {fullName: "9 of Diamonds", suit: "Diamonds", name: "Six", faceValue: "9", numericValue: 9, location: 'PlayersHand'},
            {fullName: "Eight of Diamonds", suit: "Diamonds", name: "Eight", faceValue: "8", numericValue: 8, location: 'PlayersHand'},
        ];
        paintCards(players[0].hand, 'yourHand');
        paintCards(players[1].hand, 'otherPlayersHands');
        paintCards(communityCards, 'communityCards');
        findWinner();
    } else if (type == 'three-of-a-kind') {
        communityCards = [
            {fullName: "Three of Diamonds", suit: "Diamonds", name: "Three", faceValue: "3", numericValue: 3, location: 'community'},
            {fullName: "Four of Spades", suit: "Spades", name: "Four", faceValue: "4", numericValue: 4, location: 'community'},
            {fullName: "Five of Diamonds", suit: "Diamonds", name: "Five", faceValue: "5", numericValue: 5, location: 'community'},
            {fullName: "Six of Diamonds", suit: "Diamonds", name: "Six", faceValue: "6", numericValue: 6, location: 'community'},
            {fullName: "Six of Hearts", suit: "Hearts", name: "Six", faceValue: "6", numericValue: 6, location: 'community'}
        ];
        players[1].hand = [
            {fullName: "6 of Clubs", suit: "Clubs", name: "Six", faceValue: "6", numericValue: 6, location: 'PlayersHand'},
            {fullName: "Ace of Diamonds", suit: "Spades", name: "Ace", faceValue: "A", numericValue: 14, location: 'PlayersHand'},
        ];
        players[0].hand = [
            {fullName: "6 of Spades", suit: "Spades", name: "Six", faceValue: "6", numericValue: 6, location: 'PlayersHand'},
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "A", numericValue: 14, location: 'PlayersHand'},
        ];
        paintCards(players[0].hand, 'yourHand');
        paintCards(players[1].hand, 'otherPlayersHands');
        paintCards(communityCards, 'communityCards');
        findWinner();
    }
}

function autoPlay() {
    setUpTable();
    shuffleDeck();
    shuffleDeck();
    shuffleDeck();
    dealCards();
    for (var i = 0; i < 3; i++) {
        dealCommunityCards();
    }
    findWinner();
}


function findFinalHands() {
    for (var i = 0; i < players.length; i++) {
        if (players[i].hand.length == 2) {
            var finalHand = players[i].hand.concat(communityCards);
            var winningHands = searchForWinningCards(finalHand, players[i].hand);
            players[i].winningCards = winningHands;
        }
    }
}

function findWinner() {
    findFinalHands();

    console.log(players);

    var winners = [];
    var topHandCode = 0;
    for (var i = 0; i < players.length; i++) {
        if (players[i].hand.length == 2) {
            if (topHandCode < players[i].winningCards.handCode) {
                winners = [];
                topHandCode = players[i].winningCards.handCode;
                winners.push(players[i]);
            } else if (topHandCode == players[i].winningCards.handCode) {
                winners.push(players[i]);
            }
        }
    }

    var winnerBanner = document.getElementById('winnerBanner');
    var winData = null;
    if (winners.length > 1) {
        // tiebreaker
        winners = tieBreaker(winners, communityCards);
        winData = winners;
    }

    if (winners.message) {
        winnerString = winners.message;
    } else {
        winnerString = buildWinningMessage(winners, null, null);
    }

    winnerBanner.innerHTML = winnerString;
    winnerBanner.className = 'winner-banner show';

    if (winData) {
        return winData;
    } else {
        return {winners, message: winnerString};
    }
}


function highCard(winners, communityCards) {
    var highestCard = 0;
    var highestCardPlayers = [];

    for (var i = 0; i < winners.length; i++) {
        var highCard = winners[i].winningCards.highestCard;
        if (highestCard <= highCard) {
            if (highCard > highestCard) {
                highestCardPlayers = [];
                highestCard = highCard;
            }
            highestCardPlayers.push(winners[i]);
        }
    }

    if (highestCardPlayers.length == 1) {
        var message = buildWinningMessage(highestCardPlayers, null, null);
        return {winners: highestCardPlayers, message: message};
    } else {
        return kickerCard(highestCardPlayers, 4, [highestCard], null);
    }
}


function pairTie(winners, communityCards) {
    var highestPair = 0;
    var highestPairPlayers = [];

    for (var i = 0; i < winners.length; i++) {
        var pairValue = winners[i].winningCards.pairs[0].matchedCards[0].numericValue;
        if (highestPair <= pairValue) {
            if (pairValue > highestPair) {
                highestPairPlayers = [];
                highestPair = pairValue;
            }
            highestPairPlayers.push(winners[i]);
        }
    }

    if (highestPairPlayers.length == 1) {
        var winningMessage = buildWinningMessage(highestPairPlayers, null, null);
        return {winners: highestPairPlayers, message: winningMessage};
    } else {
        return kickerCard(highestPairPlayers, 3, [highestPair], null);
    }
}

function tieFourOfAKind(winners, communityCards) {

    console.log(winners);

    var highestCard = 0;
    var highestCardPlayers = [];

    for (var i = 0; i < winners.length; i++) {
        var value = winners[i].winningCards.pairs[0].matchedCards[0].numericValue;
        if (highestCard < value) {
            highestCard = value;
            highestCardPlayers = [];
            highestCardPlayers.push(winners[i]);
        } else if (highestCard == value) {
            highestCardPlayers.push(winners[i]);
        }
    }

    if (checkFourOfAKindInCommunity(highestCardPlayers)) {
        return kickerCard(highestCardPlayers, 1, [highestCard], null);
    } else {
        var winningMessage = buildWinningMessage(highestCardPlayers, null, null);
        return {winners: highestCardPlayers, message: winningMessage};
    }
}

function checkFourOfAKindInCommunity(winners) {
    var inCommunity = 0;
    
    for (var i = 0; i < winners.length; i++) {
        for (var j = 0; j < winners[i].winningCards.pairs.length; j++) {
            if (winners[i].winningCards.pairs[j].occurrences == 4) {
                for (var k = 0; k < winners[i].winningCards.pairs[j].matchedCards.length; k++) {
                    if (winners[i].winningCards.pairs[j].matchedCards[k].location == 'community') {
                        inCommunity++;
                    }
                }
            }
        }
    }

    if (inCommunity == winners.length * 4) {
        return true;
    } else {
        return false;
    }
}

function tieThreeOfAKind(winners, communityCards) {
    var highestCard = 0;
    var highestCardPlayers = [];

    for (var i = 0; i < winners.length; i++) {
        var value = winners[i].winningCards.highestCard;
        if (highestCard < value) {
            highestCard = value;
            highestCardPlayers = [];
            highestCardPlayers.push(winners[i]);
        } else if (highestCard == value) {
            highestCardPlayers.push(winners[i]);
        }
    }

    if (highestCardPlayers.length == 1) {
        var winningMessage = buildWinningMessage(highestCardPlayers, null, null);
        return {winners: highestCardPlayers, message: winningMessage};
    } else {
        return kickerCard(highestCardPlayers, 2, [highestCard], null);
    }
}

function tieFullHouse(winners, communityCards) {
    var highestCard = 0;
    var highestCardPlayers = [];

    console.log(winners);

    var highestThreeOfAKind = 0;
    var highestThreeOfAKindPlayers = [];
    for (var i = 0; i < winners.length; i++) {
        for (var j = 0; j < winners[i].winningCards.pairs.length; j++) {
            if (winners[i].winningCards.pairs[j].occurrences == 3) {
                var threeOfAKindValue = winners[i].winningCards.pairs[j].value;
                if (highestThreeOfAKind < threeOfAKindValue) {
                    highestThreeOfAKind = threeOfAKindValue;
                    highestThreeOfAKindPlayers = [];
                    highestThreeOfAKindPlayers.push(winners[i]);
                } else if (highestThreeOfAKind == threeOfAKindValue) {
                    highestThreeOfAKindPlayers.push(winners[i]);
                }
            }
        }
    }

    if (highestThreeOfAKindPlayers.length > 1) {
        var highestPair = 0;
        var highestPairPlayers = [];
        for (var i = 0; i < winners.length; i++) {
            for (var j = 0; j < winners[i].winningCards.pairs.length; j++) {
                if (winners[i].winningCards.pairs[j].occurrences == 2) {
                    var pairValue = winners[i].winningCards.pairs[j].value;
                    if (highestPair < pairValue) {
                        highestPair = pairValue;
                        highestPairPlayers = [];
                        highestPairPlayers.push(winners[i]);
                    } else if (highestPair == pairValue) {
                        highestPairPlayers.push(winners[i]);
                    }
                }
            }
        }
        highestCard = highestPair;
        highestCardPlayers = highestPairPlayers;
    } else {
        highestCard = highestThreeOfAKind;
        highestCardPlayers = highestThreeOfAKindPlayers;
    }

    if (highestCardPlayers.length > 1) {
        var winningMessage = buildWinningMessage(highestCardPlayers, null, true);
        return {winners: highestCardPlayers, message: winningMessage};
    } else {
        var winningMessage = buildWinningMessage(highestCardPlayers, null, false);
        return {winners: highestCardPlayers, message: winningMessage};
    }
}

function tieStraightFlush(winners, communityCards) {
    var highestCard = 0;
    var highestCardPlayers = [];

    for (var i = 0; i < winners.length; i++) {
        var value = winners[i].winningCards.highestCard;
        if (highestCard < value) {
            highestCard = value;
            highestCardPlayers = [];
            highestCardPlayers.push(winners[i]);
        } else if (highestCard == value) {
            highestCardPlayers.push(winners[i]);
        }
    }

    console.log(winners);

    if (highestCardPlayers.length == 1) {
        var winningMessage = buildWinningMessage(highestCardPlayers, null, null);
        return {winners: highestCardPlayers, message: winningMessage};
    } else {
        var winningMessage = buildWinningMessage(highestCardPlayers, null, true);
        return {winners: highestCardPlayers, message: winningMessage};
    }
}

function tieRoyalFlush(winners, communityCards) {
    var winningMessage = buildWinningMessage(winners, null, true);
    return {winners, message: winningMessage};
}

function tieFlush(winners, communityCards) {
    var winningPlayerFlushCompare = [];
    for (var i = 0; i < winners.length; i++ ) {
        winningPlayerFlushCompare.push({id: winners[i].id, flushCards: getFiveHighestCards(winners[i].winningCards.cards)});
    }

    var singleWinner = false;
    var winningFlushPlayers = [];
    var count = 0;

    while (singleWinner == false && count < 5) {
        winningPlayerFlushCompare = findPlayerWithHighestFlush(winningPlayerFlushCompare);
        if (winningPlayerFlushCompare.length == 1) {
            singleWinner = true;
            winningFlushPlayers = [];
            winningFlushPlayers.push(winningPlayerFlushCompare);
        } else {
            winningFlushPlayers = [];
            winningFlushPlayers.push(winningPlayerFlushCompare);
            winningPlayerFlushCompare = popHighestFlushCard(winningPlayerFlushCompare)
        }

        count++;
    }

    var winnerIds = [];
    for (var i = 0; i < winningFlushPlayers[0].length; i++) {
        winnerIds.push(winningFlushPlayers[0][i].id);
    }

    var winningPlayerObjects = [];
    for (var i = 0; i < winnerIds.length; i++) {
        var result = players.filter(obj => {
            return obj.id === winnerIds[i];
        });
        winningPlayerObjects.push(result[0]);
    }

    
    if (singleWinner == false && count == 5) {
        console.log('split');
        var winningMessage = buildWinningMessage(winningPlayerObjects, false, true);
        return {winners: winningPlayerObjects, message: winningMessage};
    } else {
        var winningMessage = buildWinningMessage(winningPlayerObjects, false, false);
        return {winners: winningPlayerObjects, message: winningMessage};
    }


}

function getFiveHighestCards(cards) {
    var sortedCards = cards.sort(sortCardsDesc);
    for (var i = sortedCards.length; i > 5; i--) {
        sortedCards.pop();
    }
    return sortedCards;
}

function popHighestFlushCard(players) {
    for (var i = 0; i < players.length; i++) {
        players[i].flushCards.shift();
    }
    return players;
}

function findPlayerWithHighestFlush(flushWinners) {

    var highestFlushValue = 0;
    var highestFlushPlayers = [];
    for (var i = 0; i < flushWinners.length; i++) {
        highestCard = flushWinners[i].flushCards[0].numericValue;
        if (highestFlushValue < highestCard) {
            highestFlushValue = highestCard;
            highestFlushPlayers = [];
            highestFlushPlayers.push(flushWinners[i]);
        } else if (highestFlushValue == highestCard) {
            highestFlushPlayers.push(flushWinners[i]);
        }
    }

    var winningPlayerFlushCompare2 = [];
    for (var i = 0; i < highestFlushPlayers.length; i++) {
        winningPlayerFlushCompare2.push({id: highestFlushPlayers[i].id, flushCards: highestFlushPlayers[i].flushCards});
    }

    return winningPlayerFlushCompare2;
}

function tieStraight(winners, communityCards) {
    highestStraight = 0;
    highestStraightPlayers = [];

    for (var i = 0; i < winners.length; i++) {
        straightValue = winners[i].winningCards.highestCard;
        if (highestStraight <= straightValue) {
            if (straightValue > highestStraight) {
                highestStraightPlayers = [];
                highestStraight = straightValue;
            }
            highestStraightPlayers.push(winners[i]);
        }
    }

    if (highestStraightPlayers.length == 1) {
        var winningMessage = buildWinningMessage(highestStraightPlayers, null, null);
        return {winners: highestStraightPlayers, message: winningMessage};
    } else {
        var winningMessage = buildWinningMessage(highestStraightPlayers, null, 1);
        return {winners: highestStraightPlayers, message: winningMessage};
    }
}

function tieTwoPair(winners, communityCards) {
    var highestPairValue = 0;
    var highestPairPlayers = [];

    var highestPairOnePlayers = [];
    var highestPairOneValue = 0;

    var highestPairTwoPlayers = [];
    var highestPairTwoValue = 0;


    for (var i = 0; i < winners.length; i++) {
        highestPair = getHighestCard(winners[i].winningCards.pairs);
        if (highestPairOneValue < highestPair) {
            highestPairOneValue = highestPair;
            highestPairOnePlayers = [];
            highestPairOnePlayers.push(winners[i]);
        } else if (highestPairOneValue == highestPair) {
            highestPairOnePlayers.push(winners[i]);
        }
    }


    if (highestPairOnePlayers.length == 1) {
        highestPairPlayers.push(highestPairOnePlayers[0]);
    } else {
        for (var i = 0; i < winners.length; i++) {
            lowestPair = winners[i].winningCards.pairs.sort(sortCards)[winners[i].winningCards.pairs.length - 1];
            if (highestPairTwoValue < lowestPair.value) {
                highestPairTwoValue = lowestPair.value;
                highestPairTwoPlayers = [];
                highestPairTwoPlayers.push(winners[i]);
            } else if (highestPairTwoValue == lowestPair.value) {
                highestPairTwoPlayers.push(winners[i]);
            }
        }

        if (highestPairTwoPlayers.length == 1) {
            highestPairPlayers.push(highestPairTwoPlayers[0]);
        } else {
            for (var i = 0; i < highestPairTwoPlayers.length; i++ ){
                highestPairPlayers.push(highestPairTwoPlayers[i]);
            }
        }
    }



    if (highestPairPlayers.length == 1) {
        console.log(highestPairPlayers);
        var winningMessage = buildWinningMessage(highestPairPlayers, false, true);
        return {winners: highestPairPlayers, message: winningMessage};
    } else {
        var valuesToIgnore = [];
        for (var i = 0; i < highestPairPlayers.length; i++) {
            for (var j = 0; j < highestPairPlayers[i].winningCards.pairs; j++) {
                valuesToIgnore.push(highestPairPlayers[i].winningCards.pairs[j].value);
            } 
        }

        console.log(kickerCard(highestPairPlayers, 1, valuesToIgnore, null));
        return kickerCard(highestPairPlayers, 1, valuesToIgnore, null);
    }
}

function kickerCard(winningPlayers, numberOfKickers, valuesToIgnore, suiteToIgnore) {
    var highestKicker = 0;
    var highestKickerPlayers = [];

    for (var i = 0; i < winningPlayers.length; i++) {
        var hand = winningPlayers[i].hand.concat(communityCards);
        hand = hand.sort(sortCards);
        for (var j = 0; j < hand.length; j++) {
            if (valuesToIgnore.length > 0 && valuesToIgnore.includes(hand[j].numericValue)) {
                continue;
            } else {
                if (hand[j].numericValue == highestKicker) {
                    highestKickerPlayers.push(winningPlayers[i]);
                } else if (hand[j].numericValue > highestKicker) {
                    highestKicker = hand[j].numericValue;
                    highestKickerPlayers = [];
                    highestKickerPlayers.push(winningPlayers[i]);
                }
            }
        }
    }

    if (highestKickerPlayers.length > 1 && checkKickerInCommunity(highestKicker)) {
        console.log('Players split pot - kicker in community');
        var winningMessage = buildWinningMessage(highestKickerPlayers, null, true);
        return {winners: highestKickerPlayers, message: winningMessage};
    }

    if (highestKickerPlayers.length > 1 && numberOfKickers > 0) {
        console.log('kicker matches');
        valuesToIgnore.push(highestKicker);
        highestKicker = 0;
        return kickerCard(highestKickerPlayers, numberOfKickers-1, valuesToIgnore, null);
    }

    if (highestKickerPlayers.length == 1) {
        console.log('Kicker found');
        var winningMessage = buildWinningMessage(highestKickerPlayers, highestKicker, false);
        return {winners: highestKickerPlayers, message: winningMessage};
    }
}

function buildWinningMessage(players, kicker, split) {
    var message;

    if (players.length == 1) {
        message = players[0].name + ' wins with a ' + players[0].winningCards.type;
        if (kicker) {
            message = message + ' and a kicker of ' + kicker + ' decided the win';
        }
    } else {
        var playerNamesString;
        for (var i = 0; i < players.length; i++) {
            if (playerNamesString) {
                playerNamesString = playerNamesString + ', ' + players[i].name;
            } else {
                playerNamesString = players[i].name;
            }
        }
        message = playerNamesString;
        if (split) {
            message = message + ' tied with a ' + players[0].winningCards.type + ' Split the pot';
        } else {
            message = message + ' tie ' + 'with a ' + players[0].winningCards.type + ' and i haven\'t coded the tiebreaker yet';
        }
    }
    return message;
}

function checkKickerInCommunity(valueToFind) {
    for (var i = 0; i < communityCards.length; i++) {
        if (communityCards[i].numericValue == valueToFind) {
            return true;
        }
    }
    return false;
}

function tieBreaker(winners, communityCards) {

    var winType = winners[0].winningCards.type;

    if (winType == 'Pair') {
        return pairTie(winners, communityCards);
    } else if (winType == 'High Card') {
        return highCard(winners, communityCards);
    } else if (winType == 'Royal Flush') {
        return tieRoyalFlush(winners, communityCards);
    } else if (winType == 'Straight Flush') {
        return tieStraightFlush(winners, communityCards);
    } else if (winType == 'Flush') {
        return tieFlush(winners, communityCards);
    } else if (winType == 'Straight') {
        return tieStraight(winners, communityCards);
    } else if (winType == 'Two Pair') {
        return tieTwoPair(winners, communityCards);
    } else if (winType == 'Four of a Kind') {
        return tieFourOfAKind(winners, communityCards);
    } else if (winType == 'Full House') {
        return tieFullHouse(winners, communityCards);
    } else if (winType == 'Three of a Kind') {
        return tieThreeOfAKind(winners, communityCards);
    } else {
        return winners;
    }

    // *Royal Flush = split pot
    // *Straight Flush = highest value
        // *If same split
    // *Four of a kind = Highest value
        // *if all 4 in community then a kicker card is in play
        // *if the 5th com. card is higher than all kickers = split pot
    // *Full house  = Check the highest 3 pair
        // *if the 3 pair is in the community than look at the 2 pair
    // *Flush = highest value
        // *if the highest value ties, check the next value and so on.
    // *Straight = highest value
        // *if both have the same value, split pot.
    // *Three of a kind = highest value
        // *if both have the same, check kicker card
        // *if kicker the same check 1 more
    // *Two pair = highest pair wins
        // *if both same, check kicker card
    // *One Pair = highest value
        // *if both same
        // *check up to 3 kickers
    // *high card = highest value
        // *if both players have the highest check all kickers
        // *if all kickers match = split pot

}

function searchForWinningCards(cards, playerHand) {

    cards = cards.sort(sortCards);
    var flush = checkForFlush(cards);

    var straight = checkForAStraight(cards, flush.suit);
    if (straight) {
        straight.matchedCards = validateStraight(straight.matchedCards);
        straight.highestCard = straight.matchedCards[straight.matchedCards.length-1].value;
    }

    var straightFlush = false;
    if (straight && flush) {
        straightFlush = checkForStraightFlush(straight.matchedCards, flush.suit);
    }

    var kinds = checkForSameKinds(cards);

    var pairs = [];
    for (var i = 0; i < kinds.length; i++) {
        if (kinds[i].occurrences == 4) {
            var fourOfAKind = {type: '4 of a kind', highestCard: kinds[i].value};
            pairs.push(kinds[i]);
        } else if (kinds[i].occurrences == 3) {
            var threeOfAKind = {type: '3 of a kind', highestCard: kinds[i].value};
            pairs.push(kinds[i]);
        } else if (kinds[i].occurrences == 2) {
            var pair = true;
            pairs.push(kinds[i]);
        }
    }

    var highCard = playerHand.sort(sortCards);
    highCard = highCard[1];

    // TODO: Need to pass in the cards not the highestValue
    // well, maybe.
    if (flush && straight.highestCard == 14 && straightFlush) {
        return {type: 'Royal Flush', handCode: 10, highestCard: straight.highestCard};
    } else if (flush && straight && straightFlush) {
        return {type: 'Straight Flush', handCode: 9, highestCard: straight.highestCard};
    } else if (fourOfAKind) {
        return {type: 'Four of a Kind', handCode: 8, pairs};
    } else if (threeOfAKind && pair) {
        return {type: 'Full House', handCode: 7, pairs};
    } else if (flush) {
        return {type: 'Flush', handCode: 6, cards: flush.matchedCards};
    } else if (straight) {
        return {type: 'Straight', handCode: 5, highestCard: straight.highestCard, highestCardSuit: straight.highestCardSuit, highestCardLocation: straight.highestCardLocation};
    } else if (threeOfAKind) {
        return {type: 'Three of a Kind', handCode: 4, highestCard: threeOfAKind.highestCard}; 
    } else if (pairs.length > 1) {
        return {type: 'Two Pair', handCode: 3, pairs};
    } else if (pair) {
        return {type: 'Pair', handCode: 2, pairs};
    } else {
        return {type: 'High Card', handCode: 1, highestCard: highCard.numericValue};
    }
}

function checkForStraightFlush(straightCards, flushSuit) {
    var flushSuitCount = 0;

    for (var i = 0; i < straightCards.length; i++) {
        if (straightCards[i].suit == flushSuit) {
            flushSuitCount++;
        } else {
            continue;
        }
    }

    if (flushSuitCount >= 5) {
        return true;
    } else {
        return false;
    }
}

// This is so dumb, im fixing my own bugs with a new function
// Quarantine makes you do dumb things i guess
function validateStraight(straightCards) {
    straightCards = straightCards.sort(sortCards);
    // groups defined by starting index
    var groups = [];

    var i = 0;
    while (i < straightCards.length) {
        if (i != 0 && i != straightCards.length-1) {
            if ((straightCards[i+1].value - straightCards[i].value) != 1) {
                groups.push(i+1);
            }
        } else if (i==0) {
            groups.push(0);
        }
        i++;
    }

    if (groups.length == 2) {
        return straightCards.slice(groups[0], groups[1]);
    } else {
        return straightCards;
    }
}

function checkForSameKinds(cards) {
    var kinds = [];
    var match = 0;

    for (var i = 0; i < cards.length; i++) {
        for (var j = 0; j < kinds.length; j++) {
            if (kinds[j].value == cards[i].numericValue) {
                match = 1;
                kinds[j].occurrences++;
                kinds[j].matchedCards.push(cards[i]);
            } else {
                match = 0;
            }
        } 
        if (match == 0) {
            kinds.push({value: cards[i].numericValue, occurrences: 1, matchedCards: [cards[i]]});  
        }
    }

    kinds = kinds.sort(sortSameKinds);

    var sameKinds = [];
    for (var k = 0; k < kinds.length; k++) {
        if (kinds[k].occurrences > 1) {
            sameKinds.push(kinds[k]); 
        }
    }

    return sameKinds;
}

function sortSameKinds(a,b) {
    if (a.occurrences < b.occurrences) return 1;
    if (a.occurrences > b.occurrences) return -1;
    
    if (a.value < b.value) return 1;
    if (a.value > b.value) return -1;
}

function checkForFlush(cards) {

    var hearts = 0;
    var spades = 0;
    var diamonds = 0;
    var clubs = 0;

    for (var i = 0; i < cards.length; i++) {
        switch (cards[i].suit) {
            case 'Diamonds':
                diamonds++;
                break;
            case 'Hearts':
                hearts++;
                break;
            case 'Spades':
                spades++;
                break;
            case 'Clubs':
                clubs++;
                break;
        }
    }

    if (hearts >= 5) {
        suitToSearchFor = 'Hearts';
    } else if (spades >= 5) {
        suitToSearchFor = 'Spades';
    } else if (diamonds >= 5) {
        suitToSearchFor = 'Diamonds';
    } else if (clubs >= 5) {
        suitToSearchFor = 'Clubs';
    } else {
        return false;
    }

    var finalCards = [];
    for (var i = 0; i < cards.length; i++) {
        if (cards[i].suit == suitToSearchFor) {
            finalCards.push(cards[i]);
        }
    }

    return {type: 'Flush', matchedCards: finalCards, suit: suitToSearchFor};
}   

function getHighestCard(cards) {
    cards = cards.sort(sortCards);
    return cards[0].value;
}

function removeDuplicateValues(cards, suitToKeep = null) {
    var cardValues = [];

    loop1 : for (var i = 0; i < cards.length; i++) {
        for (var j = 0; j < cardValues.length; j++) {
            if (cardValues[j].numericValue == cards[i].numericValue) {
                if (cards[i].suit == suitToKeep) {
                    cardValues[j].suit = suitToKeep;
                }
                continue loop1;
            }
        }

        cardValues.push({numericValue: cards[i].numericValue, suit: cards[i].suit});
    }
    return cardValues;
}

function checkForAStraight(cards, suitToKeep = null) {

    cards = removeDuplicateValues(cards, suitToKeep);
    var numberOfCardsInARow = [];

    for (var i = 0; i < cards.length; i++) {
        if (i != 0 && (cards[i].numericValue - cards[i-1].numericValue == 1)) {
            numberOfCardsInARow.push({match: 1, value: cards[i].numericValue, suit: cards[i].suit});
        } else if(cards[i+1] && cards[i+1].numericValue - cards[i].numericValue == 1) {
            numberOfCardsInARow.push({match: 1, value: cards[i].numericValue, suit: cards[i].suit});
        } else {
            numberOfCardsInARow.push({match: 0, value: cards[i].numericValue, suit: cards[i].suit});
        }
    }

    if (numberOfCardsInARow.some(card => card.value === 2 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value === 3 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value === 4 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value === 5 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value !== 10 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value !== 11 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value !== 12 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value !== 13 && card.match == 1) &&
        numberOfCardsInARow.some(card => card.value === 14)
    ) {
        numberOfCardsInARow.push({match:1, value: 1});
        for (var i = 0; i < numberOfCardsInARow.length; i++) {
            if (numberOfCardsInARow[i].value == 14) {
                numberOfCardsInARow.splice(i, 1);
                break;
            }
        }
    }

    numberOfCardsInARow = numberOfCardsInARow.sort(sortStraight);

    var straightValue = 0;
    var straightSuit = null;
    var highestStreak = 0;
    var currentStreak = 0;
    var matchedCards = [];

    for (var i = 0; i < numberOfCardsInARow.length; i++) {
        if (
            i != 0 && 
            (
                (
                    numberOfCardsInARow[i].match == 1 && 
                    numberOfCardsInARow[i-1].match == 1 && 
                    numberOfCardsInARow[i].value - numberOfCardsInARow[i-1].value == 1
                )
            )
        ) {
            currentStreak++;
            if (currentStreak > highestStreak) {
                highestStreak++;
            }
            straightValue = numberOfCardsInARow[i].value;
            straightSuit = numberOfCardsInARow[i].suit;
            matchedCards.push(numberOfCardsInARow[i]);
        } else if (i == 0 && numberOfCardsInARow[i].match == 1) {
            highestStreak++;
            currentStreak++;
            straightValue = numberOfCardsInARow[i].value;
            straightSuit = numberOfCardsInARow[i].suit;
            matchedCards.push(numberOfCardsInARow[i]);
        } else if (numberOfCardsInARow[i].match == 1 && (numberOfCardsInARow[i-1].match == 0 || numberOfCardsInARow[i].value - numberOfCardsInARow[i-1].value != 1)) {
            if (highestStreak < 1) {
                highestStreak = 1;
                straightValue = numberOfCardsInARow[i].value;
                straightSuit = numberOfCardsInARow[i].suit;
                matchedCards = [];
                matchedCards.push(numberOfCardsInARow[i]);
            }
            currentStreak = 1;
        } else {
            currentStreak = 0;
        }
    }

    if (highestStreak > 4) {
        return {type: 'Straight', highestCard: straightValue, highestCardSuit: straightSuit, matchedCards: matchedCards};
    } else {
        return false;
    }
}

function sortStraight(a, b) {
    let comparison = 0;
    if (a.value > b.value) {
        comparison = 1;
    } else if (a.value < b.value) {
        comparison = -1;
    }

    return comparison;
}

function sortCards(a, b) {
    const cardA = a.numericValue;
    const cardB = b.numericValue;

    let comparison = 0;
    if (cardA > cardB) {
        comparison = 1;
    } else if (cardA < cardB) {
        comparison = -1;
    }

    return comparison;
}

function sortCardsDesc(a, b) {
    const cardA = a.numericValue;
    const cardB = b.numericValue;

    let comparison = 0;
    if (cardA < cardB) {
        comparison = 1;
    } else if (cardA > cardB) {
        comparison = -1;
    }

    return comparison;
}


/**
 * GAME SETUP
 */

 
function setUpTable() {
    paintToSeat();
    paintCardsToSeat();
}



const cards = {
    suits: ['Hearts', 'Spades', 'Diamonds', 'Clubs'],
    values: [
        {
            name: 'Ace', 
            faceValue: 'A',
            value: 14
        }, 
        {
            name: 'Two', 
            faceValue: '2',
            value: 2
        }, 
        {
            name: 'Three', 
            faceValue: '3',
            value: 3
        }, 
        {
            name: 'Four', 
            faceValue: '4',
            value: 4
        }, 
        {
            name: 'Five', 
            faceValue: '5',
            value: 5
        }, 
        {
            name: 'Six', 
            faceValue: '6',
            value: 6
        }, 
        {
            name: 'Seven', 
            faceValue: '7',
            value: 7
        }, 
        {
            name: 'Eight', 
            faceValue: '8',
            value: 8
        }, 
        {
            name: 'Nine', 
            faceValue: '9',
            value: 9
        }, 
        {
            name: 'Ten', 
            faceValue: '10',
            value: 10
        }, 
        {
            name: 'Jack', 
            faceValue: 'J',
            value: 11
        }, 
        {
            name: 'Queen', 
            faceValue: 'Q',
            value: 12
        }, 
        {
            name: 'King', 
            faceValue: 'K',
            value: 13
        }
    ]
};

// const pokerChips = {
//     black: 100,
//     green: 20,
//     blue: 10,
//     red: 5, 
//     white: 1
// };

var players = [];
const currentPlayerId = 1;
const buyInCost = 200;
const bigBlind = buyInCost / 100;
const smallBlind = bigBlind  / 2;
var currentRound = 0;
var currentDealerSeat = 0;
var pot = 0;

function buyInTest(seatId, id, name) {
    players.push({
        id: id,
        name: name,
        hand: [],
        // chips: {
        //     black: 1,
        //     green: 2,
        //     blue: 3,
        //     red: 4,
        //     white: 10
        // },
        money: 200,
        winningCards: [],
        seat: seatId,
        round1: {
            bets: 0
        },
        round2: {
            bets: 0
        },
        round3: {
            bets: 0
        },
        round4: {
            bets: 0
        },
        dealer: false,
        smallBlind: false,
        bigBlind: false,
        folded: false
    });

    var seat = document.querySelectorAll('[data-seat="'+seatId+'"]');
    var buyInBtn = seat[0].getElementsByClassName('buyInBtn');
    buyInBtn[0].remove();
    setUpTable();
}

function buyIn(seatId) {
    var id = prompt("Id");
    var name = prompt("Name");

    players.push({
        id: id,
        name: name,
        hand: [],
        // chips: {
        //     black: 1,
        //     green: 2,
        //     blue: 3,
        //     red: 4,
        //     white: 10
        // },
        money: 200,
        winningCards: [],
        seat: seatId,
        round1: {
            bets: 0,
        },
        round2: {
            bets: 0,
        },
        round3: {
            bets: 0,
        },
        round4: {
            bets: 0,
        },
        dealer: false,
        smallBlind: false,
        bigBlind: false,
        folded: false
    });

    var seat = document.querySelectorAll('[data-seat="'+seatId+'"]');
    var buyInBtn = seat[0].getElementsByClassName('buyInBtn');
    buyInBtn[0].remove();
    setUpTable();
}

var game = {
    round1: {
        currentBet: 0,
    },
    round2: {
        currentBet: 0,
    },
    round3: {
        currentBet: 0,
    },
    round4: {
        currentBet: 0,
    },
    currentRound: 0,
    players: [],
    smallBlind: false,
    bigBlind: false,
    maxTurns: 0,
    folded: 0,
    over: false,
    pot: 0
}

var pause = false;

function startGame() {
    buyInTest(1, 1, 'Bdon');
    buyInTest(2, 2, 'Jess');
    buyInTest(3, 3, 'Dan');
    buyInTest(4, 4, 'Eeema');
    buyInTest(5, 5, 'Dune');
    // buyInTest(6, 6, 'Donald Trump');
    // buyInTest(7, 7, 'Joe Exotic');
    // buyInTest(8, 8, 'Dr. Fauci');
    // buyInTest(9, 9, 'COVID-19');
    // buyInTest(10, 6, 'Ranchel');
    if (players.length < 3) {
        return 'Not Enough Players';
    } 

    game.players.push(players);
    game.currentRound = 1;
    game.maxTurns = players.length;

    shuffleDeck();
    assignDealer();
    triggerSmallBlind();
    triggerBigBlind();
    dealCards();

    currentPlayerTurnId = getBigBlindPlayer().id + 1;
    continueRound();
}

// GAME TIME

var currentTurn = 1;


function continueRound() {
    if (game.folded == players.length - 1) {
        game.over = true;
        handleWin(findLastRemainingPlayer());
    }
    if (!game.over) {
        if (currentTurn > game.maxTurns) {
            nextRound();
        } else {
            while (!pause) {
                if (currentPlayerTurnId > players.length) {
                    currentPlayerTurnId = 1;
                }
                player = findPlayerInGameById(currentPlayerTurnId);
                console.log(currentPlayerTurnId);
                console.log(player);
                if (player.folded) {
                    currentTurn++;
                    currentPlayerTurnId++;
                } else {
                    promptPlayer(player);
                    currentPlayerTurnId++;
                    currentTurn++;
                }
            }
        }
    }
}


function findLastRemainingPlayer() {
    var playerObj = game.players[0].filter(obj => {
        return obj.folded == false
    });
    return playerObj[0];
}


function handleWin(winData) {
    player = winData.winners[0];

    console.log(player.name + ' wins');
    addPlayerMoney(player, game.pot);
    resetPot();
    setEventBannerMessage(winData.message + ' | ' + player.name + ' Wins $' + game.pot + '!');
    paintToSeat();
}


function handleTie(winData) {

    numberOfWinners = winData.winners.length;
    splitPot = game.pot / numberOfWinners;

    console.log('number of winners: ' + numberOfWinners);
    console.log('split amount: ' + splitPot);

    for (var i = 0; i < winData.winners.length; i++) {
        addPlayerMoney(winData.winners[i], splitPot);
    }
    resetPot();
    setEventBannerMessage(winData.message);
    paintToSeat();
}

function promptPlayer(player) {
    pause = true;
    highlightPlayer(player.id);
    setEventBannerMessage( player.name + '\'s Turn');
    var controlPanel = document.getElementById('control-panel');
    controlPanel.setAttribute('player-id', player.id);
    preparePromptButtons(player.id);
}


function nextRound() {
    if (game.currentRound == 4) {
        console.log('game over');
        winners = findWinner();

        console.log(winners);

        if (winners.winners.length > 1) {
            handleTie(winners);
        } else {
            handleWin(winners);
        }
    } else {
        currentPlayerTurnId = getPlayerLeftOfDealer().id;
        dealCommunityCards();
        game.currentRound++;
        currentTurn = 1;
        continueRound();
    }
}


// Control Panel & Buttons

function preparePromptButtons(playerId) {
    prepareCheckButton(playerId);
    prepareCallButton(playerId);
}

function prepareCheckButton(playerId) {
    checkButton = getControlButton('check');
    if (!canCheck(playerId)) {
        checkButton.setAttribute('disabled', !canCheck(playerId));
    }
}

function prepareCallButton(playerId) {
    callButton = getControlButton('call');

    if (canCall(playerId)) {
        callButton.setAttribute('amount', getGameRoundsCurrentBet());
        if (canCallAll(playerId)) {
            if (callIsAll(playerId)) {
                callButton.textContent = 'ALL IN $' + getCallAmountByPlayer(playerId);
            } else {
                callButton.textContent = 'CALL $' + getCallAmountByPlayer(playerId);
            }
        } else {
            callButton.textContent = 'ALL IN $' + getCallAmountByPlayer(playerId);
        }
    } else {
        callButton.setAttribute('disabled', !canCall(playerId));
        callButton.textContent = 'CALL';
    }
}

function getControlButton(name) {
    var controlPanel = document.getElementById('control-panel');
    return controlPanel.getElementsByClassName(name)[0];
}

function canCheck(playerId) {
    if (getPlayersTotalRoundBets(playerId) == getGameRoundsCurrentBet()) {
        return true;
    } else {
        return false;
    }
}

function canCall(playerId) {
    if (getPlayersTotalRoundBets(playerId) == getGameRoundsCurrentBet()) {
        return false;
    } else {
        return true;
    }
}

function canCallAll(playerId) {
    player = findPlayerInGameById(playerId);
    if (player.money < getGameRoundsCurrentBet()) {
        return false;
    } else {
        return true;
    }
}


function callIsAll(playerId) {
    player = findPlayerInGameById(playerId);
    if (player.money == getGameRoundsCurrentBet()) {
        return true;
    } else {
        return false;
    }
}





// Game moves

function fold() {
    player = getPlayerByControlPanel();
    player.folded = true;
    player.hand = [];
    setEventBannerMessage(player.name + ' Folded');
    removePlayersCards(player);
    foldPlayerUI(player.id);
    game.folded++;
    updateGame();
}

function check() {
    player = getPlayerByControlPanel();
    setEventBannerMessage(player.name + ' Checked');
    updateGame();
}

function call() {
    player = getPlayerByControlPanel();
    callAmount = getCallAmountByPlayer(player.id);
    subtractPlayersMoney(player.id, callAmount);
    addToPot(callAmount);
    paintToSeat();
    setEventBannerMessage(player.name + ' Called');
    updateGame();
}

function raise() {
    player = getPlayerByControlPanel();
    var raiseUI = document.getElementById('raise-selector');
    raiseUI.className = 'show';

    minBtn = raiseUI.getElementsByClassName('min-raise')[0];
    minBtn.setAttribute('min-amount', getMiniumRaiseAmount(player));
    minBtn.textContent = 'Min | $'+getMiniumRaiseAmount(player);
    minBtn.setAttribute('onClick', 'raiseAmount('+getMiniumRaiseAmount(player)+')');
    
    midBtn = raiseUI.getElementsByClassName('mid-raise')[0];
    midBtn.setAttribute('mid-amount', getMiniumRaiseAmount(player) * 2);
    midBtn.textContent = '2x | $'+getMiniumRaiseAmount(player) * 2;
    midBtn.setAttribute('onClick', 'raiseAmount('+getMiniumRaiseAmount(player)*2+')');

    maxBtn = raiseUI.getElementsByClassName('max-raise')[0];
    maxBtn.setAttribute('max-raise', player.money);
    maxBtn.textContent = 'Max | $'+player.money;
    maxBtn.setAttribute('onClick', 'raiseAmount('+player.money+')');
}

function raiseAmount(amount) {
    player = getPlayerByControlPanel();
    subtractPlayersMoney(player.id, getGameRoundsCurrentBet() + amount);
    addToPot(getGameRoundsCurrentBet() + amount);
    paintToSeat();
    setCurrentBet(getGameRoundsCurrentBet() + amount);
    setEventBannerMessage(player.name + ' Raised $'+amount);
    currentTurn = 2;
    updateGame();
}


// Get Game Info


function getMiniumRaiseAmount(player) {
    minAmount = 0;

    if (getGameRoundsCurrentBet() <= 0) {
        minAmount = bigBlind;
    } else if (getGameRoundsCurrentBet() < player.money) {
        minAmount = getGameRoundsCurrentBet() * 2;
    } else {
        minAmount = player.money;
    }
    
    return minAmount;
}

function getPlayersTotalRoundBets(playerId) {
    player = findPlayerInGameById(playerId);
    return player['round'+game.currentRound].bets;
}

function getGameRoundsCurrentBet() {
    return game['round'+game.currentRound].currentBet;
}

function getPlayerByControlPanel() {
    var controlPanel = document.getElementById('control-panel');
    playerId = controlPanel.getAttribute('player-id');
    player = findPlayerInGameById(playerId);
    return player;
}

function findPlayerInGameById(id) {
    var playerObj = game.players[0].filter(obj => {
        return obj.id == id
    });
    return playerObj[0];
}

function getBigBlindPlayer() {
    var playerObj = game.players[0].filter(obj => {
        return obj.bigBlind == true
    });

    return playerObj[0];
}

function getPlayerLeftOfDealer() {
    var playerObj = game.players[0].filter(obj => {
        return obj.smallBlind == true
    });
    return playerObj[0];
}

function getCallAmountByPlayer(playerId) {
    player = findPlayerInGameById(playerId);

    if (getGameRoundsCurrentBet() - getPlayersTotalRoundBets(playerId) > player.money) {
        return player.money;
    } else {
        return getGameRoundsCurrentBet() - getPlayersTotalRoundBets(playerId);
    }
}

function getPlayerMoneyById(playerId) {
    player = findPlayerInGameById(playerId);
    return player.money;
}




// Setting Game Info

function setCurrentBet(bet) {
    game['round'+game.currentRound].currentBet = bet;
}

function setPlayersCurrentRoundBets(playerId, amount) {
    player = findPlayerInGameById(playerId);
    player['round'+game.currentRound].bets = getPlayersTotalRoundBets(playerId) + amount;
}


function subtractPlayersMoney(playerId, cost) {
    player = findPlayerInGameById(playerId);
    player.money = player.money - cost;
}

function addPlayerMoney(player, amount) {
    player.money = player.money + amount;
}

function resetPot() {
    game.pot = pot;
    var potText = document.getElementsByClassName('pot-amount');
    potText[0].textContent = '$0';
}

// function removePlayerFromGameById(id) {
//     id = parseInt(id);
//     var removeIndex = game.players[0].map(function(item) { return item.id; }).indexOf(id);
//     game.players[0].splice(removeIndex, 1);
// }


// Painting Game Updates


function foldPlayerUI(playerId) {
    var playersSeat = document.querySelectorAll('[data-seat="'+(playerId)+'"');
    var playerName = playersSeat[0].getElementsByClassName('name')[0];
    var playerMoney = playersSeat[0].getElementsByClassName('money')[0];
    playerName.classList.add('folded');
    playerMoney.classList.add('folded');
}

function highlightPlayer(playerId) {
    var seats = document.getElementsByClassName('player-highlight');
    for (var i = 0; i < seats.length; i++) {
        seats[i].classList.remove('player-highlight');
    }

    var playersSeat = document.querySelectorAll('[data-seat="'+(playerId)+'"');
    var playerName = playersSeat[0].getElementsByClassName('name')[0];
    playerName.classList.add('player-highlight');
}

function setEventBannerMessage(message) {
    var eventBanner = document.getElementById('event-banner');
    var eventBannerMessage = eventBanner.getElementsByClassName('message');
    eventBannerMessage[0].textContent = message;
}

function removePlayersCards(player) {
    var playersSeat = document.querySelectorAll('[data-seat="'+(player.id)+'"');
    var playersCards = playersSeat[0].getElementsByClassName('cards')[0];
    playersCards.classList.add('hide');
}


// Blinds

function triggerSmallBlind() {
    var smallBlindSeat = document.querySelectorAll('[data-seat="'+(currentDealerSeat+1)+'"');
    var smallBlindPlayerId = smallBlindSeat[0].getAttribute('player-table-id');
    var smallBlindPlayer = findPlayerInGameById(smallBlindPlayerId);

    game.smallBlind = true;
    smallBlindPlayer.smallBlind = true;

    setCurrentBet(1);
    setPlayersCurrentRoundBets(smallBlindPlayerId, 1);
    // smallBlindPlayer.chips.white = smallBlindPlayer.chips.white - 1;
    // addChipsToPot([{color: 'white', amount: 1}]);
    subtractPlayersMoney(smallBlindPlayerId, 1);
    addToPot(1);
    paintToSeat();
}

function triggerBigBlind() {
    var bigBlindSeat = document.querySelectorAll('[data-seat="'+(currentDealerSeat+2)+'"');
    var bigBlindPlayerId = bigBlindSeat[0].getAttribute('player-table-id');
    var bigBlindPlayer = findPlayerInGameById(bigBlindPlayerId);

    bigBlindPlayer.bigBlind = true;

    game.bigBlind = true;
    setCurrentBet(2);
    setPlayersCurrentRoundBets(bigBlindPlayerId, 2);
    // bigBlindPlayer.chips.white = bigBlindPlayer.chips.white - 2;
    // addChipsToPot([{color: 'white', amount: 2}]);
    subtractPlayersMoney(bigBlindPlayerId, 2);
    addToPot(2);
    paintToSeat();
}


// MONEY

// Add to pot
// TODO: Make chips real
// function addChipsToPot(chips) {
//     var totalToAdd = 0;
//     for (var i = 0; i < chips.length; i++) {
//         color = chips[i].color;
//         amount = chips[i].amount;
//         totalToAdd += calculateChips({[color]: amount});
//     }

//     pot = pot + totalToAdd;
//     var potText = document.getElementsByClassName('pot-amount');
//     potText[0].textContent = '$'+pot;
// }


function addToPot(money) {
    pot = pot + money;
    game.pot = pot;
    var potText = document.getElementsByClassName('pot-amount');
    potText[0].textContent = '$'+pot;
}


// function calculateChips(chips) {
//     var total = 0;
//     total += (chips.black) ? pokerChips.black * chips.black : 0;
//     total += (chips.green) ? pokerChips.green * chips.green : 0;
//     total += (chips.red) ? pokerChips.red * chips.red : 0;
//     total += (chips.blue) ? pokerChips.blue * chips.blue : 0;
//     total += (chips.white) ? pokerChips.white * chips.white : 0;
    
//     return total;
// }



// Assigns the dealer
function assignDealer() {
    var seat = document.querySelectorAll('[data-seat="'+(currentDealerSeat+1)+'"]');
    seat[0].setAttribute('dealer', 'true');
    playerId = seat[0].getAttribute('player-table-id');
    player = findPlayerInGameById(playerId);
    player.dealer = true;
    currentDealerSeat++;
}


// PAINTING


function updateGame() {
    resetHands();
    updateGameSeats();
    updateGameCards();
    pause = false;

    disabledControlPanel();

    setTimeout(function(){ 
        resetControlPanel();
        continueRound(); 
    }, 200);
}

function resetControlPanel() {
    resetControlPanelButtons('fold');
    resetControlPanelButtons('check');
    resetControlPanelButtons('call');
    resetControlPanelButtons('raise');

    var raiseUI = document.getElementById('raise-selector');
    raiseUI.className = '';
}

function disabledControlPanel() {
    disabledControlPanelButtons('fold');
    disabledControlPanelButtons('check');
    disabledControlPanelButtons('call');
    disabledControlPanelButtons('raise');

    var raiseUI = document.getElementById('raise-selector');
    raiseUI.className = '';
}

function resetControlPanelButtons(name) {
    var controlPanel = document.getElementById('control-panel');
    btn = controlPanel.getElementsByClassName(name)[0];
    btn.removeAttribute('disabled');
    btn.removeAttribute('amount');
}

function disabledControlPanelButtons(name) {
    var controlPanel = document.getElementById('control-panel');
    btn = controlPanel.getElementsByClassName(name)[0];
    btn.setAttribute('disabled', 'true');
}


function updateGameSeats() {
    for (var i = 0; i < game.players[0].length; i++) {
        var seat = document.querySelectorAll('[data-seat="'+(game.players[0][i].seat)+'"]');
        var playerName = seat[0].getElementsByClassName('name');
        var playerMoney = seat[0].getElementsByClassName('money');
        seat[0].setAttribute('player-table-id', i);
        playerName[0].textContent = game.players[0][i].name;
        // playerMoney[0].textContent = '$'+calculateChips(game.players[0][i].chips);
        playerMoney[0].textContent = '$'+game.players[0][i].money;
    }
}

function updateGameCards() {
    for (var i = 0; i < game.players[0].length; i++) {
        var seat = document.querySelectorAll('[data-seat="'+(game.players[0][i].seat)+'"]');
        var handContainer = seat[0].getElementsByClassName('cards');

        for (var j = 0; j < game.players[0][i].hand.length; j++) {
            handContainer[0].appendChild(buildCard(game.players[0][i].hand[j]));
        }
    }
}

const deck = generateDeck();
var communityCardDeals = 0;
var communityCards = [];


function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function dealCommunityCards() {
    // Burn card
    deck.shift();

    if (communityCardDeals == 0) {
        for (var i = 0; i < 3; i++) {
            deck[0].location = 'Community';
            communityCards.push(deck[0]);
            deck.shift();
        }
    } else if (communityCardDeals > 0 && communityCardDeals < 3) {
        deck[0].location = 'Community';
        communityCards.push(deck[0]);
        deck.shift();
    }
    communityCardDeals++;

    resetCards('deck');
    resetCards('communityCards');
    paintCards(deck, 'deck');
    paintCards(communityCards, 'communityCards');
    paintCardsToCommunity();
}

function dealCards() {
    for (var i = 0; i < players.length; i++) {
        while (players[i].hand.length < 2) {
            deck[0].location = 'PlayersHand';
            players[i].hand.push(deck[0]);
            deck.shift();
        }
    }
    paintYourHand();
    paintOtherPlayersHands();
    resetCards('deck');
    paintCards(deck, 'deck');
    paintCardsToSeat();
}

function shuffleDeck() {
    resetCards('deck');
    shuffle(deck);
    paintCards(deck, 'deck');
}

function resetCards(elementContainer) {
    var elementToReset = document.getElementById(elementContainer);
    while(elementToReset.firstChild) {
        elementToReset.removeChild(elementToReset.firstChild);
    }
}

function resetHands() {
    var seats = document.getElementsByClassName('seat');
    for (var i = 0; i < seats.length; i++) {
        var hand = seats[i].getElementsByClassName('cards');
        while (hand[0].firstChild) {
            hand[0].removeChild(hand[0].firstChild);
        }
    }
}

function generateDeck() {
    const deck = [];
    for (var i = 0; i < cards.suits.length; i++) {
        for (var j = 0; j < cards.values.length; j++) {
            deck.push(
                {
                    fullName: cards.values[j].name + ' of ' + cards.suits[i],
                    suit: cards.suits[i],
                    name: cards.values[j].name,
                    faceValue: cards.values[j].faceValue,
                    numericValue: cards.values[j].value,
                    location: null
                },
            );
            
        }
    }
    return deck;

}
function paintYourHand() {
    resetCards('yourHand');
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == currentPlayerId) {
            cardsToPaint = players[i].hand;
            paintCards(cardsToPaint, 'yourHand');
        }
    }
}

function paintOtherPlayersHands() {
    resetCards('otherPlayersHands');
    for (var i = 0; i < players.length; i++) {
        if (players[i].id != currentPlayerId) {
            cardsToPaint = players[i].hand;
            paintCards(cardsToPaint, 'otherPlayersHands');
        }
    }
}

function paintCards(cardsToPaint, elementToPaint) {
    for (var i = 0; i < cardsToPaint.length; i++) {
        var card = document.createElement('div');
        card.dataset.fullName = cardsToPaint[i].fullName;
        card.dataset.suit = cardsToPaint[i].suit;
        card.dataset.name = cardsToPaint[i].name;
        card.dataset.numericValue = cardsToPaint[i].numericValue;
        card.className = 'card';
    
        var topValue = document.createElement('div');
        topValue.className = 'topValue';
        var topValueText = document.createTextNode(cardsToPaint[i].faceValue);
    
        topValue.appendChild(topValueText);
        card.appendChild(topValue);

        var topSuitIcon = document.createElement('div');
        topSuitIcon.className = cardsToPaint[i].suit + '-icon suit-icon';
    
        card.appendChild(topSuitIcon);
    
        var paintTo = document.getElementById(elementToPaint);
        paintTo.appendChild(card);
    }
}

function paintToSeat() {
    for (var i = 0; i < players.length; i++) {
        var seat = document.querySelectorAll('[data-seat="'+(players[i].seat)+'"]');
        var playerName = seat[0].getElementsByClassName('name');
        var playerMoney = seat[0].getElementsByClassName('money');
        seat[0].setAttribute('player-table-id', players[i].id);
        playerName[0].textContent = players[i].name;
        // playerMoney[0].textContent = '$'+calculateChips(players[i].chips);
        playerMoney[0].textContent = '$'+players[i].money;
    }
}

function paintCardsToSeat() {
    for (var i = 0; i < players.length; i++) {
        var seat = document.querySelectorAll('[data-seat="'+(players[i].seat)+'"]');
        var handContainer = seat[0].getElementsByClassName('cards');

        for (var j = 0; j < players[i].hand.length; j++) {
            handContainer[0].appendChild(buildCard(players[i].hand[j]));
        }
    }
}

function paintCardsToCommunity() {

    if (communityCards.length > 3) {
        resetCards('community-cards');
    }

    var communityContainer = document.getElementById('community-container');
    var communityCardsContainer = communityContainer.getElementsByClassName('community-cards');

    for (var i = 0; i < communityCards.length; i++) {
        communityCardsContainer[0].appendChild(buildCard(communityCards[i]));
    }
}

function buildCard(cardObj) {
    var card = document.createElement('div');
    card.dataset.fullName = cardObj.fullName;
    card.dataset.suit = cardObj.suit;
    card.dataset.name = cardObj.name;
    card.dataset.numericValue = cardObj.numericValue;
    card.className = 'card';

    var topValue = document.createElement('div');
    topValue.className = 'topValue';
    var topValueText = document.createTextNode(cardObj.faceValue);

    topValue.appendChild(topValueText);
    card.appendChild(topValue);

    var topSuitIcon = document.createElement('div');
    topSuitIcon.className = cardObj.suit + '-icon suit-icon';

    card.appendChild(topSuitIcon);

    return card;
}