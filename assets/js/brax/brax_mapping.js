
/**
 * Declarations
 */
var totalPlayersCount = 0;
var rounds = 0;
var roundMatches = [];
var matches = {}
var players = {}
var playerIDlist = [];

/**
 * Used in Generation
 */
var matchCount = 0;
/**
 * min Height = 80px
 */
const matchBlockHeight = 80;

class Player{
    constructor(id,name,phno,pos,lname,origin, rank){
        this.pid = id;
        this.name = name;
        this.phno = phno;
        this.pos = pos;
        this.lname = lname;
        this.origin = origin;
        this.rank = rank;
    }
    info(){
        return 'ID:['+this.pid+'] Name:['+this.name+'] Phno.:['+
                this.phno+'] Pos:['+this.pos+'] Lname:['+this.lname+'] Origin:['+this.origin+']';
    }
}

class Match{
    constructor(sno, mid, pid1, pid2, status, nextMatchID, winner){
        this.sno = sno;
        this.mid = mid;
        this.p1 = pid1;
        this.p2 = pid2;
        this.status = status
        this.nextMatchID = nextMatchID;
        this.winner = winner;
    }
}

function insertMatchDetail(matchObject){
    matches[matchObject.mid] = matchObject;
}

function getMatchObject(matchID){
    return matches[matchID];
}

function insertPlayerDetail(playerObject){
    players[playerObject.pid] = playerObject;
}

function getPlayerObject(playerID){
    return players[playerID];
}