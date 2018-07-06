var game = {
    playerHealthPoints: 100,
    playerAttackPoints: 0,
    challengerArenaHealthPoints: 0,
    challengerAttackPoints: 0,
    challengerArenaName: '',
    challengerName: ['','Faust', 'Iago', 'Grendel', 'Sauron'],
    challengerHealthPoints: [0,100,125,150,200],
    trackChallengerIndex: 0,
    roundCounter: 1,
    gameCounter: 1,
    wins: 0,
};

$(document).ready(function() {

    // set the name and HP for the cards in the right side bar
    for (i = 1; i < 5; i++) {
        $('#challengerName' + i).text(game.challengerName[i]);
        $('#challengerHealthPoints' + i).text(game.challengerHealthPoints[i]);
    }
    

// ****  Game play logic
    $('#attack').on('click', function() {

        game.playerAttackPoints = Math.floor(Math.random() * 26);
        game.challengerAttackPoints = Math.floor(Math.random() * 26);

        if (game.playerHealthPoints > 0 && game.challengerArenaHealthPoints > 0 && game.roundComplete == false) {
            attack(game.playerHealthPoints,game.playerAttackPoints,game.challengerArenaHealthPoints,game.challengerAttackPoints);
            $('.challengerButton').removeAttr('disabled');
            game.roundCounter++ ;

// *** Game Over Condition
        } else if (game.playerHealthPoints < 0 || game.challengerArenaHealthPoints < 0) {
            //display a message letting the player know who won
    
    // *** Player Loses
            if (game.playerHealthPoints <= 0) {
                $('#gameMessage').css('color', 'red').text(displayMessage('Game over! ' + game.challengerName[trackChallengerIndex] + ' Won!'));
            } 
    // *** Player Wins
            else {
                game.wins++;
                game.playerHealthPoints = 1025; //Increase HP when the player wins
                $('#gameMessage').css('color', 'green').text(displayMessage('The Player Won!'));
                $('#gamesWon').text(game.wins);
                updateDefeatedList(game.challengerName[trackChallengerIndex]);
            }

            $('#attack').attr('disabled', true);
            $('#start').removeAttr('disabled'); 
            game.gameCounter++;
        };
    });

// Sets the challenge buttons to display the challenger data in the arena
    $('.challengerButton').on('click', function() {
        trackChallengerIndex = $(this).val();
        game.challengerArenaName = game.challengerName[trackChallengerIndex];
        game.challengerArenaHealthPoints = game.challengerHealthPoints[trackChallengerIndex];
        $('#challengerArenaName').text(game.challengerArenaName);
        $('#challengerArenaHealthPoints').append(game.challengerArenaHealthPoints);

        $('#attack').removeAttr('disabled')
        $('.challengerButton').attr('disabled', true);
        
    });

    function attack() {
        roundCounter++;
        game.playerHealthPoints -= game.challengerAttackPoints;
        game.challengerArenaHealthPoints -= game.playerAttackPoints;

        console.log('Attack: ' + game.roundCounter + ' ' + game.playerAttackPoints + ' ' + game.challengerAttackPoints);
        console.log('Health: ' + game.roundCounter + ' ' + game.challengerArenaHealthPoints + ' ' + game.playerHealthPoints); 

        $('#roundCounter').text(game.roundCounter); //update the round counter
        //update the player/challenger health and attacks. IF to display a 0 if number drops into negatice
        $('#playerHealthPoints').text((game.playerHealthPoints > 0) ? game.playerHealthPoints : 0);
        $('#challengerArenaHealthPoints').text((game.challengerArenaHealthPoints > 0) ? game.challengerArenaHealthPoints : 0);
        $('#playerAttackScore').text(game.challengerAttackPoints);
        $('#challengerAttackScore').text(game.playerAttackPoints);

        return(game.playerHealthPoints,game.playerAttackPoints,game.challengerArenaHealthPoints,game.challengerAttackPoints);
    };

// Starts and restarts the game
    $('#start').on('click', function() {
        game.roundComplete = false;
        game.gameStart = true;
        resetArena();

        $('#start').attr('disabled', true).text('Restart Game');
        $('.challengerButton').removeAttr('disabled');
    });

    function resetArena() {
        game.gameCounter = 1;
        game.roundCounter = 1;
        game.playerAttackPoints = 0;
        game.challengerArenaHealthPoints = 0;
        game.challengerAttackPoints = 0;
        
        $('#gameCounter').text(game.gameCounter);
        $('#roundCounter').text(game.roundCounter);
        $('#playerHealthPoints').text(game.playerHealthPoints); 
        $('#challengerArenaHealthPoints').empty();
        $('#playerAttackScore').empty();
        $('#challengerAttackScore').empty();

        $('#gameMessageBox').hide()
    }

    function updateDefeatedList(name) {
        $("#defeatedList").append("<li>" + name + "</li>")
    }

    function displayMessage(message) {
        //show the message box and the message when needed
        $('#gameMessageBox').show();
        $('#gameMessage').text(message);
    }

    //hide certain elements until it's needed
    $('#gameMessageBox').hide(); 
    $('#next').hide();

});


