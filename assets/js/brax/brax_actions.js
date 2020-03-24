
function playerClicked(elem) {
    var eid = elem.parentNode.id;
    var match = getMatchObject((eid.substr(0, eid.length-4)));
    if(match.status == 'don'){
        return;
    }
    if(eid.charAt(eid.length-1) == '1'){
        showConfirmModal(match.p1, eid);
    }
    else{
        showConfirmModal(match.p2, eid);
    }
}

function winnersInfinalClicked(eid) {
    var match = getMatchObject((eid.substr(0, eid.length-4)));
    if (getMatchObject('final').status == 'don' && getMatchObject('playoff').status == 'don') {
        finalRankingModal(getMatchObject('final'),getMatchObject('playoff'));
    }
    if(match.status == 'don'){
        return;
    }
    if (match.p1 == undefined || match.p2 == undefined){
        return;
    }
    if(eid.charAt(eid.length-1) == '1'){
        showConfirmModal(match.p1, eid);
    }
    else{
        showConfirmModal(match.p2, eid);
    }
}

function confClicked(res, eid){
    if(eid == undefined){
        return;
    }
    if(res){
        if ((eid.substr(0, eid.length-4)) == 'final' || (eid.substr(0, eid.length-4)) == 'playoff') {
            winnerDecided((eid.substr(0, eid.length-4)), eid.charAt(eid.length-1));
        }
        else {
            proceedPlayer((eid.substr(0, eid.length-4)), eid.charAt(eid.length-1));
        }
    }
}

function infoClicked(elem) {
    var eid = elem.parentNode.id;
    infoClickedResolved(eid);
}

function infoClickedResolved(eid){
    var match = getMatchObject((eid.substr(0, eid.length-4)));
    if(eid.charAt(eid.length-1) == '1'){
        if (match.p1 == undefined) {
            return;
        }
        showInfoModal(match.p1);
    }
    else{
        if (match.p2 == undefined) {
            return;
        }
        showInfoModal(match.p2);
    }
}

function matchClicked(elem) {
    var meid = elem.nextSibling.id;
    if (meid) {
        showMatchInfo(getMatchObject(meid))
    }
}

function toggleFloatingButton(elem) {
    var floatContent = document.getElementById(elem.dataset.target);
    if (floatContent.style.display == 'block') {
        floatContent.style.display = '';
        elem.children[0].innerHTML = '&plus;';
    }
    else{
        floatContent.style.display = 'block';
        elem.children[0].innerHTML = '&times;';
    }
}

