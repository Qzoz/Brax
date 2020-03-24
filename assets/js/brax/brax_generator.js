
/**
 * 
 * @param {Number} matchNo  => holds the match Number 1 - n
 * @param {Number} roundNo  => holds roundNo 0 - n [n -> {2 (4),12 (128)}] (x) -> x players
 * @param {Char} lrToken    => whether tile is in left or right 'l' or 'r'
 * 
 * return HTML CODE a Match Tile
 * 
 */
function getMatchTileGen(matchNo, roundNo, lrToken){
    var matchID = "r-"+roundNo+"-m-"+matchNo;
    var inHtml = "<div class=\"qz_brax_match_tile\" id=\""+matchID+"\">"+
                    "<div class=\"qz_brax_pl pl_1 h50 qz_brax_pl_"+lrToken+" disFlex alignCenter\" id=\""+matchID+"-p-1\">"+
                        "<p class=\"qz_brax_info\" onclick=\"infoClicked(this)\">&ii;</p>" +
                        "<p class=\"qz_brax_name\" onclick=\"playerClicked(this)\"></p>" +
                    "</div>" +
                    "<div class=\"qz_brax_pl pl_2 h50 qz_brax_pl_"+lrToken+" disFlex alignCenter\" id=\""+matchID+"-p-2\">"+
                        "<p class=\"qz_brax_info\" onclick=\"infoClicked(this)\">&ii;</p>" +
                        "<p class=\"qz_brax_name\" onclick=\"playerClicked(this)\"></p>" +
                    "</div>" +
                "</div>";
    return inHtml;
}

/**
 * 
 * @param {Number} matchNo contains MatchNo
 * 
 * return String of HTML CODE to added as innerHTML for Left
 * 
 */
function createMatchLeft(matchNo, roundNo) {
    return "<div class=\"qz_brax_match qz_brax_match_left posRel\"><p class=\"posAbs\" " + 
            " onclick=\"matchClicked(this)\">" + matchCount +
            "</p>"+getMatchTileGen(matchNo, roundNo, 'l')+"</div>";
}

/**
 * 
 * @param {Number} matchNo contains MatchNo
 * 
 * return String of HTML CODE to added as innerHTML for Right
 * 
 */
function createMatchRight(matchNo, roundNo) {
    return "<div class=\"qz_brax_match qz_brax_match_right posRel\"><p class=\"posAbs\" " + 
            " onclick=\"matchClicked(this)\">" + matchCount + 
            "</p>"+getMatchTileGen(matchNo, roundNo, 'r')+"</div>";
}


/**
 * 
 * @param {Number} bMatches contains number of matches in a round
 * @param {Number} bHeight contains clock height for a particular column
 * @param {Boolean} isLeft contains whether the tile is in left or Not
 * 
 * return String of HTML CODE to add as innerHTML
 * 
 */
function createMatchBlocksAndTiles(bMatches, bHeight, isLeft, roundNo) {
    var blockStrHTML = ""
    for (var i = 0; i < bMatches; i++) {
        blockStrHTML += "<div class=\"qz_brax_block disFlex justifyCenter alignCenter\" " +
            "style=\"height:" + bHeight + "px\" >";
        matchCount++;
        if (isLeft) {
            blockStrHTML += createMatchLeft(i, roundNo);
        }
        else {
            blockStrHTML += createMatchRight(i, roundNo);
        }
        blockStrHTML += "</div>"
    }
    return blockStrHTML;
}


/**
 * 
 * @param {Number} roundWidth width Of the columns or Rounds
 * 
 * return Rounds Column Node (Element)
 * 
 */
function createRoundsCol(roundWidth) {
    var elem = document.createElement("div");
    elem.className = "qz_brax_round disInBlock";
    elem.style.width = roundWidth + "%";
    return elem;
}

/**
 * 
 * @param {String} elemID Id of element in which it is to be appended
 * @param {JS Object} dimen dimen Object having roundWidth, roundBlocks List
 * 
 * Generates Brackets with desired Input
 * 
 */
function generateBrax(elemID, dimen) {
    var elem = document.getElementById(elemID);
    rounds = dimen.roundCount;
    for (var i = 0; i < dimen.roundCount; i++) {
        elem.appendChild(createRoundsCol(dimen.roundWidth));
        roundMatches.push(dimen.roundBlocks[i].bMatches);
    }
    let len = dimen.roundCount;
    for (var i = 0; i < len / 2; i++) {
        elem.children[i].innerHTML = createMatchBlocksAndTiles(dimen.roundBlocks[i].bMatches,
            dimen.roundBlocks[i].bHeight, true, i);
        elem.children[len-i-1].innerHTML = createMatchBlocksAndTiles(dimen.roundBlocks[len-i-1].bMatches,
            dimen.roundBlocks[len-i-1].bHeight, false, (len - i - 1));
    }
}



