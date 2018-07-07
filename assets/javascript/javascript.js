var game = {
    playerArenaName: '',
    playerAttackPoints: 0,
    playerArenaHealthPoints: 0,
    playerAttackUpper: 26,
    challengerArenaName: '',
    challengerAttackPoints: 0,
    challengerArenaHealthPoints: 0,
    characterName: ['','Faust', 'Iago', 'Grendel', 'Sauron'],
    characterHealthPoints: [0,100,110,120,130],
    trackPlayerIndex: 0,
    trackChallengerIndex: 0,
    roundCounter: 1,
    gameCounter: 1,
};

$(document).ready(function() {

    // set the name and HP for the cards in the right side bar
    for (i = 1; i < 5; i++) {
        $('#challengerName' + i).text(game.characterName[i]);
        $('#challengerHealthPoints' + i).text(game.characterHealthPoints[i]);
    }

    startGame();
    

// ****  Game play logic
    $('#attack').on('click', function() {

        game.playerAttackPoints = Math.floor(Math.random() * 26);
        game.challengerAttackPoints = Math.floor(Math.random() * 26);

        if (game.playerArenaHealthPoints > 0 && game.challengerArenaHealthPoints > 0 && game.roundComplete == false) {
            attack(game.playerArenaHealthPoints,game.playerAttackPoints,game.challengerArenaHealthPoints,game.challengerAttackPoints);
            game.roundCounter++ ;

// *** Game Over Condition
        } else if (game.playerArenaHealthPoints < 0 || game.challengerArenaHealthPoints < 0) {
            //display a message letting the player know who won
    
    // *** Player Loses
            if (game.playerArenaHealthPoints <= 0) {
                $('#gameMessage').css('color', 'red').text(displayMessage('Game over! ' + game.challengerArenaName + ' Won!'));
            } 
    // *** Player Wins
            else {
                game.wins++;
                $('#gameMessage').css('color', 'green').text(displayMessage('You have defeated ' + game.challengerArenaName + '! Choose another challenger.'));
                $('#gamesWon').text(game.wins);

                
            }

            // clean up

            playerAttackUpper = 36;
            game.gameCounter++;
        };
    });

// Sets the challenge buttons to display the challenger data in the arena
    $('.challengerButton').on('click', function() {
        
        

        if ($(".playerImage").children().length == 0) {
            $(".playerImage").append($(this));
            game.trackPlayerIndex = $(this).attr("id");
            game.playerArenaName = game.characterName[game.trackPlayerIndex];
            game.playerArenaHealthPoints = game.characterHealthPoints[game.trackPlayerIndex];
            $('#playerArenaName').text(game.playerArenaName);
            $('#playerArenaHealthPoints').text(game.playerArenaHealthPoints); 

        } else if ($(".challengerImage").children().length == 0) {
            $(".challengerImage").append($(this));
            game.trackChallengerIndex = $(this).attr("id");
            game.challengerArenaName = game.characterName[game.trackChallengerIndex];
            game.challengerArenaHealthPoints = game.characterHealthPoints[game.trackChallengerIndex];
            $('#challengerArenaName').text(game.challengerArenaName);
            $('#challengerArenaHealthPoints').text(game.challengerArenaHealthPoints);
            $('#attack').show();
        } else {
            console.log(game.trackPlayerIndex);
            console.log(game.trackChallengerIndex);
            game.playerArenaHealthPoints = game.characterHealthPoints[game.trackPlayerIndex];
            $('#playerArenaHealthPoints').text(game.playerArenaHealthPoints);

            trackChallengerIndex = $(this).attr("id");
            $(".challengerImage").empty().append($(this));
            game.challengerArenaName = game.characterName[game.trackChallengerIndex];
            game.challengerArenaHealthPoints = game.characterHealthPoints[game.trackChallengerIndex];
            $('#challengerArenaName').text(game.challengerArenaName);
            $('#challengerArenaHealthPoints').text(game.challengerArenaHealthPoints);
            resetBoard();
        }
    });

    function attack() {
        roundCounter++;
        game.playerArenaHealthPoints -= game.challengerAttackPoints;
        game.challengerArenaHealthPoints -= game.playerAttackPoints;

        console.log('Attack: ' + game.roundCounter + ' ' + game.playerAttackPoints + ' ' + game.challengerAttackPoints);
        console.log('Health: ' + game.roundCounter + ' ' + game.challengerArenaHealthPoints + ' ' + game.playerArenaHealthPoints); 

        $('#roundCounter').text(game.roundCounter); //update the round counter
        //update the player/challenger health and attacks. IF to display a 0 if number drops into negatice
        $('#playerArenaHealthPoints').text((game.playerArenaHealthPoints > 0) ? game.playerArenaHealthPoints : 0);
        $('#challengerArenaHealthPoints').text((game.challengerArenaHealthPoints > 0) ? game.challengerArenaHealthPoints : 0);
        $('#playerAttackScore').text(game.challengerAttackPoints);
        $('#challengerAttackScore').text(game.playerAttackPoints);

        return(game.playerArenaHealthPoints,game.playerAttackPoints,game.challengerArenaHealthPoints,game.challengerAttackPoints);
    };

// Starts and restarts the game
    function startGame() {
        game.roundComplete = false;
        game.gameStart = true;

        resetArena();

    }

    function resetArena() {
        game.roundCounter = 1;
        game.playerArenaHealthPoints = 0;
        game.playerAttackPoints = 0;
        game.challengerArenaHealthPoints = 0;
        game.challengerAttackPoints = 0;
        
        $('#gameCounter').text(game.gameCounter);
        $('#roundCounter').text(game.roundCounter);

        $('#challengerArenaHealthPoints').empty();
        $('#playerAttackScore').empty();
        $('#challengerAttackScore').empty();
        $('#gameMessageBox').hide()
    }
    
    function resetBoard() {
        $('#playerAttackScore').empty();
        $('#challengerAttackScore').empty();
        $('#gameMessageBox').hide()
        gameCounter++
        $('#gameCounter').text(game.gameCounter);
    }

    function displayMessage(message) {
        //show the message box and the message when needed
        $('#gameMessageBox').show();
        $('#gameMessage').text(message);
    }

    //hide certain elements until it's needed
    $('#gameMessageBox').hide();
    $('#attack').hide();
});


