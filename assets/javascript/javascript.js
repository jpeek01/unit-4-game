var game = {
    playerHealthPoints: 100,
    challengerHealthPoints: 0,
    playerAttackPoints: 0,
    challengerAttackPoints: 0,
    roundCounter: 0,
    gameCounter: 0,
    roundComplete: false,
};

var challengers = {
    challenger1name: 'Faust',
    challenger1HealthPoints: 100,
    challenger2name: 'Iago',
    challenger2HealthPoints: 125,
    challenger3name: 'Grendel',
    challenger3HealthPoints: 150,
    challenger4name: 'Sauron',
    challenger4HealthPoints: 200,
}


$(document).ready(function() {

    $('#attack').on('click', function() {

        game.playerAttackPoints = Math.floor(Math.random() * 26);
        game.challengerAttackPoints = Math.floor(Math.random() * 26);

        console.log('test');

        if (game.playerHealthPoints > 0 && game.challengerHealthPoints > 0 && game.roundComplete == false) {
            attack(game.playerHealthPoints,game.playerAttackPoints,game.challengerHealthPoints,game.challengerAttackPoints);
            game.roundCounter++ ;
            game.gameCounter++;
            console.log('first if Health: ' + game.roundCounter + ' ' + game.challengerHealthPoints + ' ' 
                + game.playerHealthPoints); 
        } else if (game.playerHealthPoints < 0 || game.challengerHealthPoints < 0) {
            $('#roundCounter').text((game.playerHealthPoints <= 0) ? 'The Computer Won' : 'The Player Won');

            $('#attack').prop('disabled', true);

            roundComplete = true;

            console.log('Game Over!');
        };
    });


$('#start').on('click', function() {
    game.playerHealthPoints = 100;
    game.challengerHealthPoints = 0;
    game.playerAttackPoints = 0;
    game.challengerAttackPoints = 0;
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

    $('#challenger1Name').text(challengers.challenger1name);
    $('#challenger1HealthPoints').text('Health Points:' + challengers.challenger1HealthPoints);

    $('#challenger2Name').text(challengers.challenger2name);
    $('#challenger2HealthPoints').text('Health Points:' + challengers.challenger2HealthPoints);

    $('#challenger3Name').text(challengers.challenger3name);
    $('#challenger3HealthPoints').text('Health Points:' + challengers.challenger3HealthPoints);

    $('#challenger4Name').text(challengers.challenger4name);
    $('#challenger4HealthPoints').text('Health Points:' + challengers.challenger4HealthPoints);
});

$('#challenger1Button').on('click', function() {
    $('#challengerName').text(challengers.challenger1Name);
    $('#challengerHealthPoints').text(challengers.challenger1HealthPoints);
    game.challengerHealthPoints = challenger1HealthPoints;
});

$('#challenger2Button').on('click', function() {
    $('#challengerName').text(challengers.challenger2Name);
    $('#challengerHealthPoints').text(challengers.challenger2HealthPoints);
    game.challengerHealthPoints = challenger2HealthPoints;
});

$('#challenger3Button').on('click', function() {
    $('#challengerName').text(challengers.challenger3Name);
    $('#challengerHealthPoints').text(challengers.challenger3HealthPoints);
    game.challengerHealthPoints = challenger3HealthPoints;
});

$('#challenger4Button').on('click', function() {
    $('#challengerName').text(challengers.challenger4Name);
    $('#challengerHealthPoints').text(challengers.challenger4HealthPoints);
    game.challengerHealthPoints = challenger4HealthPoints;
});

function attack() {
    roundCounter++;
    game.playerHealthPoints = game.playerHealthPoints - game.challengerAttackPoints;
    game.challengerHealthPoints = game.challengerHealthPoints - game.playerAttackPoints;

    console.log('Attack: ' + game.roundCounter + ' ' + game.playerAttackPoints + ' ' + game.challengerAttackPoints);
    console.log('Health: ' + game.roundCounter + ' ' + game.challengerHealthPoints + ' ' + game.playerHealthPoints); 

    $('#roundCounter').text('Round: ' + game.roundCounter);
    $('#playerHealthPointsId').text((game.playerHealthPoints > 0) ? 'Health points: ' 
        + game.playerHealthPoints : 'Health points: ' + 0);
    $('#computerHealthPointsId').text((game.challengerHealthPoints > 0) ? 'Health points: ' 
        + game.challengerHealthPoints : 'Health points: ' + 0);
    $('#playerAttackScore').text('Damage Taken: ' + game.challengerAttackPoints);
    $('#computerAttackScore').text('Damage Taken: ' + game.playerAttackPoints);

    console.log('last function Health: ' + game.roundCounter + ' ' + game.challengerHealthPoints + ' ' 
        + game.playerHealthPoints); 

    return(game.playerHealthPoints,game.playerAttackPoints,game.challengerHealthPoints,game.challengerAttackPoints);
};


});


