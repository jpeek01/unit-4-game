

$(document).ready(function() {

    var playerHealthPoints = 50;
    var computerHealthPoints = 50;
    var playerAttackPoints = 0;
    var computerAttackPoints = 0;
    var roundCounter = 1;
    var roundComplete = true;

    $('#attack').on('click', function() {

        playerAttackPoints = Math.floor(Math.random() * 26);
        computerAttackPoints = Math.floor(Math.random() * 26);

        if (playerHealthPoints > 0 && computerHealthPoints > 0 && roundComplete == true) {
            attack(playerHealthPoints,playerAttackPoints,computerHealthPoints,computerAttackPoints);
            roundCounter++ ;
            console.log('first if Health: ' + roundCounter + ' ' + computerHealthPoints + ' ' + playerHealthPoints); 
        } else if (playerHealthPoints < 0 || computerHealthPoints < 0) {
            $('#round').text((playerHealthPoints <= 0) ? 'The Computer Won' : 'The Player Won');

            $('#attack').prop('disabled', true);

            roundComplete = true;

            console.log('Game Over!');
        }
    });

function attack() {

    playerHealthPoints = playerHealthPoints - computerAttackPoints;
    computerHealthPoints = computerHealthPoints - playerAttackPoints;

    console.log('Attack: ' + roundCounter + ' ' + playerAttackPoints + ' ' + computerAttackPoints);
    console.log('Health: ' + roundCounter + ' ' + computerHealthPoints + ' ' + playerHealthPoints); 

    $('#round').text('Round: ' + roundCounter);
    $('#playerHealthPointsId').text((playerHealthPoints > 0) ? 'Health points: ' + playerHealthPoints : 'Health points: ' + 0);
    $('#computerHealthPointsId').text((computerHealthPoints > 0) ? 'Health points: ' + computerHealthPoints : 'Health points: ' + 0);
    $('#playerAttackScore').text('Damage Taken: ' + computerAttackPoints);
    $('#computerAttackScore').text('Damage Taken: ' + playerAttackPoints);

    console.log('last function Health: ' + roundCounter + ' ' + computerHealthPoints + ' ' + playerHealthPoints); 

    return(playerHealthPoints,playerAttackPoints,computerHealthPoints,computerAttackPoints);
}

});