
/**
 * fill @param matches holds match details
 */
function fillxBlocksBlank(){
    var matchCtr = 0;
    for (var i=0; i<rounds/2; i++){
        for (var j=0; j<roundMatches[i]; j++){
            matchCtr++;
            var match = new Match(matchCtr, 'r-'+i+'-m-'+j, undefined, 
                undefined, undefined, undefined, undefined);
            assignValsToBlockBlank(match,i,j);
        }
        for (var j=0; j<roundMatches[rounds-i-1]; j++){
            matchCtr++;
            var match = new Match(matchCtr, 'r-'+(rounds-i-1)+'-m-'+j, 
                undefined, undefined, undefined, undefined, undefined);
            assignValsToBlockBlank(match,(rounds-i-1),j);
        }
    }
    insertMatchDetail(new Match(matchCtr+2, 'final',undefined, undefined, undefined, undefined, undefined));
    insertMatchDetail(new Match(matchCtr+1, 'playoff',undefined, undefined, undefined, undefined, undefined));
}

/**
 * 
 * @param {Object} match    => holds match Object
 * @param {Number} i        => holds row Val
 * @param {Number} j        => holds col Val
 * 
 * calculate Next Match ID and insert a match object
 */
function assignValsToBlockBlank(match, i, j){
    if (i == 0 || i == rounds-1){
        match.status = 'reg';
    }
    if (i < rounds/2-1){
        if (j%2 == 0){
            match.nextMatchID = 'r-'+(i+1)+'-m-'+(j/2)+'-p-1';
        }
        else{
            match.nextMatchID = 'r-'+(i+1)+'-m-'+((j-1)/2)+'-p-2';
        }
    }
    else if (i > rounds/2) {
        if (j%2 == 0){
            match.nextMatchID = 'r-'+(i-1)+'-m-'+(j/2)+'-p-1';
        }
        else{
            match.nextMatchID = 'r-'+(i-1)+'-m-'+((j-1)/2)+'-p-2';
        }
    }
    insertMatchDetail(match);
}

/**
 * insert @param player details into @param matches witch @param players
 */
function fillxInitialBlocks(){
    var plc = 0;
    for(var j=0; j<rounds/2; j++){
        for(var i=0; i<roundMatches[j]; i++){
            var match1 = getMatchObject('r-'+j+"-m-"+i);
            var match2 = getMatchObject('r-'+(rounds-j-1)+"-m-"+i);
            if(j==0){
                match1.p1 = players[playerIDlist[plc]];
                match2.p1 = players[playerIDlist[plc+1]];
                match1.p2 = players[playerIDlist[plc+2]];
                match2.p2 = players[playerIDlist[plc+3]];
                match1.p1.pos = match1.mid;
                match2.p1.pos = match2.mid;
                match1.p2.pos = match1.mid;
                match2.p2.pos = match2.mid;
                setTextOfChild1AtElemID(match1.mid+'-p-1', match1.p1.name);
                setTextOfChild1AtElemID(match1.mid+'-p-2', match1.p2.name);
                setTextOfChild1AtElemID(match2.mid+'-p-1', match2.p1.name);
                setTextOfChild1AtElemID(match2.mid+'-p-2', match2.p2.name);

                plc+=4;
            }
            else{
                setDisplayNone(match1.mid);
                setDisplayNone(match2.mid);
            }
        }
    }
}

/**
 * 
 * @param {String} elemID holds ID
 * to hide the tile
 */
function setDisplayNone(elemID){
    document.getElementById(elemID).style = "display:none;";
}

/**
 * 
 * @param {String} elemID holds ID
 * to show the tile
 */
function setDisplayNormal(elemID){
    document.getElementById(elemID).style = "";
}

/**
 * 
 * @param {String} elemID   => holds ID
 * @param {String} text     => holds text
 * 
 * sets the @param text to children[1] of element with id = @param elemID
 */
function setTextOfChild1AtElemID(elemID, text){
    document.getElementById(elemID).children[1].innerText = text;
}

/**
 * 
 * @param {String} elemID holds ID
 * 
 * gets the text of children[1] of element with id = @param elemID
 */
function getTextOfChild1AtElemID(elemID){
    return document.getElementById(elemID).children[1].innerText;
}


/**
 * 
 * @param {Object} matchObj     => holds matchObject
 * @param {playerNo} playerNo   => holds player No
 * 
 * moves winner and loser to their next match
 * 
 */
function proceedPlayerToFinals(matchObj, playerNo){
    var fmatch = getMatchObject('final');
    var pmatch = getMatchObject('playoff');
    if (playerNo == '1') {
        winner = matchObj.p1;
        loser = matchObj.p2;
    }
    else{
        winner = matchObj.p2;
        loser = matchObj.p1;
        fmatch.p2 = winner;
        pmatch.p2 = loser;
    }
    if(fmatch.p1 == undefined){
        fmatch.p1 = winner;
        pmatch.p1 = loser;
        winner.pos = 'final-p-1';
        loser.pos = 'playoff-p-1';
    }
    else{
        fmatch.p2 = winner;
        pmatch.p2 = loser;
        winner.pos = 'final-p-2';
        loser.pos = 'playoff-p-2';
    }
    setTextOfChild1AtElemID(matchObj.mid+'-p-'+playerNo, '');
    document.getElementById(winner.pos).innerText = winner.name;
    document.getElementById(loser.pos).innerText = loser.name;
    matchObj.status = 'don';
    fmatch.status = 'reg';
    pmatch.status = 'reg';
    document.getElementById(matchObj.mid).parentNode.style.opacity = 0.7;
}


/**
 * 
 * @param {String} matchID  => holds Match ID
 * @param {char} playerNo   => holds player No either '1' or '2'
 * 
 * moves the player ahead in brackets
 */
function proceedPlayer(matchID, playerNo) {
    var match = getMatchObject(matchID);
    if (match.status == 'don') {
        return;
    }
    if (match.p1 == undefined || match.p2 == undefined) {
        return;
    }
    if (match.nextMatchID == undefined) {
        proceedPlayerToFinals(match, playerNo);
        return;
    }
    var nextMatchID = match.nextMatchID.substr(0,match.nextMatchID.length-4);
    var nextMatch = getMatchObject(nextMatchID);
    setDisplayNormal(nextMatchID);
    match.status = 'don';
    nextMatch.status = 'reg';
    if(match.nextMatchID.charAt(match.nextMatchID.length-1) == '1'){
        if (playerNo == '1') {
            nextMatch.p1 = match.p1;
        }
        else{
            nextMatch.p1 = match.p2;
        }
        nextMatch.p1.pos = nextMatch.mid;
        setTextOfChild1AtElemID(match.nextMatchID, nextMatch.p1.name);
    }
    else{
        if (playerNo == '1') {
            nextMatch.p2 = match.p1;
        }
        else{
            nextMatch.p2 = match.p2;
        }
        nextMatch.p2.pos = nextMatch.mid;
        setTextOfChild1AtElemID(match.nextMatchID, nextMatch.p2.name);
    }
    setTextOfChild1AtElemID(matchID+'-p-'+playerNo, '');
    document.getElementById(matchID).parentNode.style.opacity = 0.7;
}


/**
 * 
 * @param {String} matchID  => holds the match id of item clicked
 * @param {String} playerNo => holds the player number clicked '1' or '2'
 * 
 * performs the action on winners clicked for third and final
 * 
 */
function winnerDecided(matchID, playerNo){
    var match = getMatchObject(matchID);
    var win = undefined;
    var los = undefined;
    if (playerNo == '1') {
        win = match.p1;
        los = match.p2;
    }
    else {
        win = match.p2;
        los = match.p1;
    }
    if (matchID == 'final') {
        win.rank = 'first';
        los.rank = 'second';
    }
    else {
        win.rank = 'third';
        los.rank = 'fourth';
    }
    document.getElementById(win.pos).parentNode.style.transform = 'scale(1.125)';
    document.getElementById(los.pos).parentNode.style.transform = 'scale(0.875)';
    document.getElementById(los.pos).parentNode.style.opacity = 0.6;
    match.status = 'don';
    if (getMatchObject('final').status == 'don' && getMatchObject('playoff').status == 'don') {
        setTimeout(function(){
            finalRankingModal(getMatchObject('final'),getMatchObject('playoff'));
        },2000);
    }
}