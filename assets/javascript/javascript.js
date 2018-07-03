var game = {
    playerHealthPoints: 100,
    computerHealthPoints: 50,
    playerAttackPoints: 0,
    computerAttackPoints: 0,
    roundCounter: 0,
    gameCounter: 0,
    roundComplete: false,
};


$(document).ready(function() {

    $('#attack').on('click', function() {

        game.playerAttackPoints = Math.floor(Math.random() * 26);
        game.computerAttackPoints = Math.floor(Math.random() * 26);

        console.log('test');

        if (game.playerHealthPoints > 0 && game.computerHealthPoints > 0 && game.roundComplete == false) {
            attack(game.playerHealthPoints,game.playerAttackPoints,game.computerHealthPoints,game.computerAttackPoints);
            game.roundCounter++ ;
            game.gameCounter++;
            console.log('first if Health: ' + game.roundCounter + ' ' + game.computerHealthPoints + ' ' 
                + game.playerHealthPoints); 
        } else if (game.playerHealthPoints < 0 || game.computerHealthPoints < 0) {
            $('#roundCounter').text((game.playerHealthPoints <= 0) ? 'The Computer Won' : 'The Player Won');

            $('#attack').prop('disabled', true);

            roundComplete = true;

            console.log('Game Over!');
        };
    });


$('#start').on('click', function() {
    game.playerHealthPoints = 100;
    game.computerHealthPoints = 50;
    game.playerAttackPoints = 0;
    game.computerAttackPoints = 0;
    game.roundCounter = 1;
    game.gameCounter = 1;
    game.roundComplete = false;
    $('#attack').removeAttr('disabled');
    $('#gameCounter').text('Game: ' + game.gameCounter);
    $('#roundCounter').text('Round: ' + game.roundCounter);
    $('#playerHealthPointsId').text( 'Health points: 0'); 
    $('#computerHealthPointsId').text('Health points: 0');
    $('#playerAttackScore').text('Damage Taken: 0');
    $('#computerAttackScore').text('Damage Taken: 0');

});

$('#faustButton').on('click', function() {
    // alert($('div.faust').text());
    $('#challengerName').text($('h5.faust').text());
    
})

function attack() {
    roundCounter++;
    game.playerHealthPoints = game.playerHealthPoints - game.computerAttackPoints;
    game.computerHealthPoints = game.computerHealthPoints - game.playerAttackPoints;

    console.log('Attack: ' + game.roundCounter + ' ' + game.playerAttackPoints + ' ' + game.computerAttackPoints);
    console.log('Health: ' + game.roundCounter + ' ' + game.computerHealthPoints + ' ' + game.playerHealthPoints); 

    $('#roundCounter').text('Round: ' + game.roundCounter);
    $('#playerHealthPointsId').text((game.playerHealthPoints > 0) ? 'Health points: ' 
        + game.playerHealthPoints : 'Health points: ' + 0);
    $('#computerHealthPointsId').text((game.computerHealthPoints > 0) ? 'Health points: ' 
        + game.computerHealthPoints : 'Health points: ' + 0);
    $('#playerAttackScore').text('Damage Taken: ' + game.computerAttackPoints);
    $('#computerAttackScore').text('Damage Taken: ' + game.playerAttackPoints);

    console.log('last function Health: ' + game.roundCounter + ' ' + game.computerHealthPoints + ' ' 
        + game.playerHealthPoints); 

    return(game.playerHealthPoints,game.playerAttackPoints,game.computerHealthPoints,game.computerAttackPoints);
};


});


