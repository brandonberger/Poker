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

    console.log(winners);

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
        kickerCard(highestKickerPlayers, numberOfKickers-1, valuesToIgnore, null);
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

    console.log(winType);

    if (winType == 'Pair') {
        return pairTie(winners, communityCards);
    } else if (winType == 'High Card') {
        return highCard(winners, communityCards);
        // return kickerCard(winners, 4, winners[0].winningCards.highestCard, null);
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
    if (flush && straight.highestCard == 14) {
        return {type: 'Royal Flush', handCode: 10, highestCard: straight.highestCard};
    } else if (flush && straight) {
        return {type: 'Straight Flush', handCode: 9, highestCard: straight.highestCard};
    } else if (fourOfAKind) {
        return {type: '4 Of a Kind', handCode: 8, highestCard: fourOfAKind.highestCard};
    } else if (threeOfAKind && pair) {
        return {type: 'Full House', handCode: 7, highestCard: threeOfAKind.highestCard};
    } else if (flush) {
        return {type: 'Flush', handCode: 6, highestCard: flush.highestCard};
    } else if (straight) {
        return {type: 'Straight', handCode: 5, highestCard: straight.highestCard};
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

    return {type: 'Flush', matchedCards: cards};
}   


function getHighestCard(cards) {
    cards = cards.sort(sortCards);
    return cards[cards.length-1].numericValue;
}


function removeDuplicateValues(cards) {
    var cardValues = [];
    for (var i = 0; i < cards.length; i++) {
        if (cardValues.includes(cards[i].numericValue)) {
            continue;
        } else {
            cardValues.push(cards[i].numericValue);
        }
    }
    return cardValues;
}

function checkForAStraight(cards) {

    cards = removeDuplicateValues(cards);
    var numberOfCardsInARow = [];

    for (var i = 0; i < cards.length; i++) {
        if (i != 0 && (cards[i] - cards[i-1] == 1)) {
            numberOfCardsInARow.push({match: 1, value: cards[i]});
        } else if(cards[i+1] - cards[i] == 1) {
            numberOfCardsInARow.push({match: 1, value: cards[i]});
        } else {
            numberOfCardsInARow.push({match: 0, value: cards[i]});
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
    var highestStreak = 0;
    var currentStreak = 0;
    for (var i = 0; i < numberOfCardsInARow.length; i++) {
        if (i != 0 && numberOfCardsInARow[i].match == 1 && numberOfCardsInARow[i-1].match == 1 && numberOfCardsInARow[i].value - numberOfCardsInARow[i-1].value == 1) {
            currentStreak++;
            if (currentStreak > highestStreak) {
                highestStreak++;
            }
            straightValue = numberOfCardsInARow[i].value;
        } else if (i == 0 && numberOfCardsInARow[i].match == 1) {
            highestStreak++;
            currentStreak++;
            straightValue = numberOfCardsInARow[i].value;
        } else if (numberOfCardsInARow[i].match == 1 && numberOfCardsInARow[i-1].match == 0 && numberOfCardsInARow[i].value - numberOfCardsInARow[i-1].value != 1) {
            if (highestStreak < 1) {
                highestStreak = 1;
                straightValue = numberOfCardsInARow[i].value;
            }
            currentStreak = 1;
        } else {
            currentStreak = 0;
        }
    }

    if (highestStreak > 4) {
        return {type: 'Straight', highestCard: straightValue};
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
            communityCards.push(deck[0]);
            deck.shift();
        }
    } else if (communityCardDeals > 0 && communityCardDeals < 3) {
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
                    numericValue: cards.values[j].value
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