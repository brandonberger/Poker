function test(type) {
    if (type == 'royal-flush') {
        communityCards = [
            {fullName: "Ten of Spades", suit: "Spades", name: "Ten", faceValue: "10", numericValue: 10, location: 'community'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Eleven", faceValue: "11", numericValue: 11, location: 'community'},
            {fullName: "Queen of Spades", suit: "Spades", name: "Twelve", faceValue: "12", numericValue: 12, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "13", numericValue: 13, location: 'community'},
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "14", numericValue: 14, location: 'community'}
        ];
        paintCards(communityCards, 'communityCards');
        shuffleDeck();
        dealCards();
        findWinner();
    } else if (type == 'flush') {
        communityCards = [
            {fullName: "Eight of Spades", suit: "Spades", name: "Eight", faceValue: "8", numericValue: 8, location: 'community'},
            {fullName: "Ten of Spades", suit: "Spades", name: "Ten", faceValue: "10", numericValue: 10, location: 'community'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Eleven", faceValue: "11", numericValue: 11, location: 'community'},
            {fullName: "Queen of Spades", suit: "Spades", name: "Twelve", faceValue: "12", numericValue: 12, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "13", numericValue: 13, location: 'community'}
        ];
        paintCards(communityCards, 'communityCards');
        shuffleDeck();
        dealCards();
        findWinner();
    } else if (type == 'straight') {
        communityCards = [
            {fullName: "Ace of Spades", suit: "Spades", name: "Ace", faceValue: "A", numericValue: 14, location: 'community'},
            {fullName: "Ten of Hearts", suit: "Hearts", name: "Ten", faceValue: "10", numericValue: 10, location: 'community'},
            {fullName: "Jack of Hearts", suit: "Hearts", name: "Eleven", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "Queen of Spades", suit: "Spades", name: "Twelve", faceValue: "Q", numericValue: 12, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "K", numericValue: 13, location: 'community'}
        ];
        paintCards(communityCards, 'communityCards');
        shuffleDeck();
        dealCards();
        findWinner();
    } else if (type == 'two-pair') {
        communityCards = [
            {fullName: "Two of Spades", suit: "Spades", name: "Two", faceValue: "2", numericValue: 2, location: 'community'},
            {fullName: "Ten of Hearts", suit: "Hearts", name: "Ten", faceValue: "10", numericValue: 10, location: 'community'},
            {fullName: "Jack of Hearts", suit: "Hearts", name: "Eleven", faceValue: "J", numericValue: 11, location: 'community'},
            {fullName: "Queen of Spades", suit: "Spades", name: "Twelve", faceValue: "Q", numericValue: 12, location: 'community'},
            {fullName: "King of Spades", suit: "Spades", name: "Thirteen", faceValue: "K", numericValue: 13, location: 'community'}
        ];
        players[0].hand = [
            {fullName: "Two of Hearts", suit: "Hearts", name: "Two", faceValue: "2", numericValue: 2, location: 'PlayersHand'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Jack", faceValue: "J", numericValue: 11, location: 'PlayersHand'},
        ];
        players[1].hand = [
            {fullName: "Queen of Diamonds", suit: "Diamonds", name: "Queen", faceValue: "Q", numericValue: 12, location: 'PlayersHand'},
            {fullName: "Jack of Spades", suit: "Spades", name: "Jack", faceValue: "J", numericValue: 11, location: 'PlayersHand'},
        ];
        paintCards(players[0].hand, 'yourHand');
        paintCards(players[1].hand, 'otherPlayersHands');
        paintCards(communityCards, 'communityCards');
        findWinner();
    }
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
}

const currentPlayerId = 1;
const deck = generateDeck();

var players = [
    {
        id: 1,
        name: 'Player 1',
        hand: [],
        chips: 0,
        winningCards: []
    },
    {
        id: 2,
        name: 'Player 2',
        hand: [],
        chips: 0,
        winningCards: []
    }
];

function findFinalHands() {
    for (var i = 0; i < players.length; i++) {
        var finalHand = players[i].hand.concat(communityCards);
        var winningHands = searchForWinningCards(finalHand, players[i].hand);
        players[i].winningCards = winningHands;
    }
}

function findWinner() {
    findFinalHands();

    var winners = [];
    var topHandCode = 0;
    for (var i = 0; i < players.length; i++) {
        if (topHandCode < players[i].winningCards.handCode) {
            winners = [];
            topHandCode = players[i].winningCards.handCode;
            winners.push(players[i]);
        } else if (topHandCode == players[i].winningCards.handCode) {
            winners.push(players[i]);
        }
    }

    var winnerBanner = document.getElementById('winnerBanner');
    
    if (winners.length > 1) {
        // tiebreaker
        winners = tieBreaker(winners, communityCards);
    }

    if (winners.message) {
        winnerString = winners.message;
    } else {
        winnerString = buildWinningMessage(winners, null, null);
    }

    winnerBanner.innerHTML = winnerString;
    winnerBanner.className = 'winner-banner show';
    return winners;
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
        return {highestCardPlayers, message: message};
    } else {
        return kickerCard(highestCardPlayers, 4, highestCard, null);
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
        return {highestPairPlayers, message: winningMessage};
    } else {
        return kickerCard(highestPairPlayers, 1, [highestPair], null);
    }
}

function tieRoyalFlush(winners, communityCards) {
    var winningMessage = buildWinningMessage(winners, null, true);
    return {winners, message: winningMessage};
}

// function tieFlush(winners, communityCards) {
//     console.log(winners);
// }

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
        return {highestStraightPlayers, message: winningMessage};
    } else {
        var winningMessage = buildWinningMessage(highestStraightPlayers, null, 1);
        return {highestStraightPlayers, message: winningMessage};
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
        var winningMessage = buildWinningMessage(highestPairPlayers, false, true);
        return {highestPairPlayers, message: winningMessage};
    } else {
        return kickerCard(highestPairPlayers, 1, [0], null);
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


    if (highestKickerPlayers.length > 1 && numberOfKickers > 0) {
        console.log('kicker matches');
        valuesToIgnore.push(highestKicker);
        highestKicker = 0;
        return kickerCard(highestKickerPlayers, numberOfKickers-1, valuesToIgnore, null);
    }

    if (highestKickerPlayers.length > 1 && checkKickerInCommunity(highestKicker)) {
        console.log('Players split pot - kicker in community');
        var winningMessage = buildWinningMessage(highestKickerPlayers, null, true);
        return {highestKickerPlayers, message: winningMessage};
    }

    if (highestKickerPlayers.length == 1) {
        console.log('Kicker found');
        var winningMessage = buildWinningMessage(highestKickerPlayers, highestKicker, false);
        return {highestKickerPlayers, message: winningMessage};
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
    } else {
        return winners;
    }

    // if (winners[0].winningCards.type == 'High Card') {
    //     for (var i = 0; i < winners.length; i++) {
    //        if (getHighestCard(winners[i].hand))
    //     }
    // }


    // Royal Flush = split pot
    // Straight Flush = highest value
    // Four of a kind = Highest value
        // if all 4 in community then a kicker card is in play
        // if the 5th com. card is higher than all kickers = split pot
    // Full house  = Check the highest 3 pair
        // if the 3 pair is in the community than look at the 2 pair
    // Flush = highest value
        // if the highest value ties, check the next value and so on.
    // Straight = highest value
        // if both have the same value, split pot.
    // Three of a kind = highest value
        // if both have the same, check kicker card
        // if kicker the same check 1 more
    // Two pair = highest pair wins
        // if both same, check kicker card
    // One Pair = highest value
        // if both same
        // check up to 3 kickers
    // high card = highest value
        // if both players have the highest check all kickers
        // if all kickers match = split pot

}

function searchForWinningCards(cards, playerHand) {

    cards = cards.sort(sortCards);
    var straight = checkForAStraight(cards);
    var flush = checkForFlush(cards);

    var straightFlush = false;
    if (straight && flush) {
        straightFlush = checkForStraightFlush(straight.matchedCards, flush.suit);
    }

    var kinds = checkForSameKinds(cards);

    var pairs = [];
    for (var i = 0; i < kinds.length; i++) {
        if (kinds[i].occurrences == 4) {
            var fourOfAKind = {type: '4 of a kind', highestCard: kinds[i].value};
        } else if (kinds[i].occurrences == 3) {
            var threeOfAKind = {type: '3 of a kind', highestCard: kinds[i].value};
        } else if (kinds[i].occurrences == 2) {
            var pair = true;
            pairs.push(kinds[i]);
        }
    }

    var highCard = playerHand.sort(sortCards);
    highCard = highCard[1];

    // TODO: Need to pass in the cards not the highestValue
    // well, maybe.

    // This actually doesn't work, need to check if the straight is all of the same suit. 
    // It is possible that there is a straight and a flush but not a straight flush
    if (flush && straight.highestCard == 14 && straightFlush) {
        return {type: 'Royal Flush', handCode: 10, highestCard: straight.highestCard};
    // It is possible that there is a straight and a flush but not a straight flush
    } else if (flush && straight && straightFlush) {
        return {type: 'Straight Flush', handCode: 9, highestCard: straight.highestCard};
    } else if (fourOfAKind) {
        return {type: '4 Of a Kind', handCode: 8, highestCard: fourOfAKind.highestCard};
    } else if (threeOfAKind && pair) {
        return {type: 'Full House', handCode: 7, highestCard: threeOfAKind.highestCard};
    } else if (flush) {
        return {type: 'Flush', handCode: 6, cards: flush.matchedCards};
    } else if (straight) {
        return {type: 'Straight', handCode: 5, highestCard: straight.highestCard, highestCardSuit: straight.highestCardSuit, highestCardLocation: straight.highestCardLocation};
    } else if (threeOfAKind) {
        return {type: 'Three of a kind', handCode: 4, highestCard: threeOfAKind.highestCard}; 
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
        if (straightCards.suit == flushSuit) {
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

    for (var i = 0; i < cards.length; i++) {
        if (cards[i].suit != suitToSearchFor) {
            cards.splice(i, 1);
        }
    }

    return {type: 'Flush', matchedCards: cards, suit: suitToSearchFor};
}   


function getHighestCard(cards) {
    cards = cards.sort(sortCards);
    return cards[0].value;
}


function removeDuplicateValues(cards) {
    var cardValues = [];
    loop1 : for (var i = 0; i < cards.length; i++) {

        for (var j = 0; j < cardValues.length; j++) {
            if (cardValues[j].numericValue == cards[i].numericValue) {
                continue loop1;
            }
        }

        cardValues.push({numericValue: cards[i].numericValue, suit: cards[i].suit});
    }
    return cardValues;
}

function checkForAStraight(cards) {

    cards = removeDuplicateValues(cards);
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
                // || 
                // (
                //     numberOfCardsInARow[i].match == 1 && 
                //     i == numberOfCardsInARow.length - 1 && 
                //     numberOfCardsInARow[i-1].match == 1 && 
                //     numberOfCardsInARow[i].value - numberOfCardsInARow[i-1].value == 1
                // )
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

var communityCardDeals = 0;
var communityCards = [];

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

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}


function autoPlay() {
    shuffleDeck();
    dealCards();
    for (var i = 0; i < 3; i++) {
        dealCommunityCards();
    }
    findWinner();
}