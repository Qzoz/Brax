function setBackgroundImage(path) {
    document.getElementById('brax_back').style = "background-image: url("+path+");"
}
// setBackgroundImage('../assets/imgs/IMAGE_SELECTED')

totalPlayersCount = 64;
generateBrax('brax_holder', getMatchRectSize(totalPlayersCount));


function createDummyPlayers(num){
    for(var i=1; i<=num; i++){
        let player = new Player(i, 'nm'+i, 123456789, 0, 'ln'+i, 'origin-'+i, undefined);
        playerIDlist.push(i);
        insertPlayerDetail(player);
    }
}

fillxBlocksBlank();
createDummyPlayers(totalPlayersCount)
fillxInitialBlocks();
