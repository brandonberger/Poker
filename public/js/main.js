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
        name: 'bdon',
        hand: [],
        chips: 0
    },
    {
        id: 2,
        name: 'Jessica',
        hand: [],
        chips: 0
    }
];



function findWinner() {
    for (var i = 0; i < players.length; i++) {
        var finalHand = players[i].hand.concat(communityCards);
        var winningCards = searchForWinningCards(finalHand);
        console.log(players[i].name + ' ' + winningCards);
    }
}

function searchForWinningCards(cards) {
    cards = cards.sort(sortCards);
    var straight = checkForAStraight(cards);
    var flush = checkForFlush(cards);

    var kinds = checkForSameKinds(cards);

    var pairs = [];
    for (var i = 0; i < kinds.length; i++) {
        if (kinds[i].occurrences == 4) {
            var fourOfAKind = true;
        } else if (kinds[i].occurrences == 3) {
            var threeOfAKind = true;
        } else if (kinds[i].occurrences == 2) {
            var pair = true;
            pairs.push(kinds[i]);
        }
    }

    if (flush && flush != 'Flush' && straight.value == 14) {
        return 'Royal Flush';
    } else if (flush && flush != 'Flush') {
        return 'Straight Flush';
    } else if (fourOfAKind) {
        return '4 Of a Kind';
    } else if (threeOfAKind && pair) {
        return 'Full House';
    } else if (flush) {
        return 'Flush';
    } else if (straight) {
        return 'Straight';
    } else if (threeOfAKind) {
        return 'Three of a kind'; 
    } else if (pairs.length > 1) {
        return 'Two Pair';
    } else if (pair) {
        return 'Pair';
    } else {
        return cards[6].faceValue;
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
            } else {
                match = 0;
            }
        } 

        if (match == 0) {
            kinds.push({value: cards[i].numericValue, occurrences: 1});            
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

    straightFlush = checkForAStraight(cards);

    if (straightFlush) {
        return straightFlush;
    } else {
        return 'Flush';
    }

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
        } else if(i == 0 && (cards[i+1] - cards[i] == 1)) {
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
    for (var i = 0; i < numberOfCardsInARow.length; i++) {
        if (i != 0 && numberOfCardsInARow[i].match == 1 && numberOfCardsInARow[i-1].match == 1) {
            highestStreak++;
            straightValue = numberOfCardsInARow[i].value;
        } else if (i == 0 && numberOfCardsInARow[i].match == 1) {
            highestStreak++;
            straightValue = numberOfCardsInARow[i].value;
        } else if (numberOfCardsInARow[i].match == 1 && numberOfCardsInARow[i-1].match == 0) {
            if (highestStreak < 1) {
                highestStreak = 1;
                straightValue = numberOfCardsInARow[i].value;
            }
        }
    }

    if (highestStreak > 4) {
        return {highestStreak, straightValue};
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