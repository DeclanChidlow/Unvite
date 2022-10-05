/* MIT License

Copyright (c) 2022 DoruDoLasu

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */




var theusers = {};
var friendidtoname = {};

var thetoken = undefined;
var thechannel = undefined;
var theserver = undefined;
var lastprocessedauthor = undefined;
/*uncomment and put your token if used locally, gonna spare you the effort*/
/*thetoken = "";*/

var timer = 0;

var socket = 0;
var thereplying = [];
var theattachments = [];
var autoscroll = false;
var istyping = true;


var theoldcustemotes = {
        "1984": "1984.gif",
        "KekW": "KekW.png",
        "amogus": "amogus.gif",
        "awaa": "awaa.png",
        "boohoo": "boohoo.png",
        "boohoo_goes_hard": "boohoo_goes_hard.png",
        "boohoo_shaken": "boohoo_shaken.png",
        "cat_arrival": "cat_arrival.gif",
        "cat_awson": "cat_awson.png",
        "cat_blob": "cat_blob.png",
        "cat_bonk": "cat_bonk.png",
        "cat_concern": "cat_concern.png",
        "cat_fast": "cat_fast.gif",
        "cat_kitty": "cat_kitty.png",
        "cat_lick": "cat_lick.gif",
        "cat_not_like": "cat_not_like.png",
        "cat_put": "cat_put.gif",
        "cat_pwease": "cat_pwease.png",
        "cat_rage": "cat_rage.png",
        "cat_sad": "cat_sad.png",
        "cat_snuff": "cat_snuff.gif",
        "cat_spin": "cat_spin.gif",
        "cat_squish": "cat_squish.gif",
        "cat_stare": "cat_stare.gif",
        "cat_steal": "cat_steal.gif",
        "cat_sussy": "cat_sussy.gif",
        "clueless": "clueless.png",
        "death": "death.gif",
        "developers": "developers.gif",
        "fastwawa": "fastwawa.gif",
        "ferris": "ferris.png",
        "ferris_bongo": "ferris_bongo.gif",
        "ferris_nom": "ferris_nom.png",
        "ferris_pensive": "ferris_pensive.png",
        "ferris_unsafe": "ferris_unsafe.png",
        "flesh": "flesh.png",
        "flooshed": "flooshed.png",
        "flosh": "flosh.png",
        "flushee": "flushee.png",
        "forgor": "forgor.png",
        "hollow": "hollow.png",
        "john": "john.png",
        "lightspeed": "lightspeed.png",
        "little_guy": "little_guy.png",
        "lmaoooo": "lmaoooo.gif",
        "lol": "lol.png",
        "looking": "looking.gif",
        "marie": "marie.png",
        "marie_furret": "marie_furret.gif",
        "marie_smug": "marie_smug.png",
        "megumin": "megumin.png",
        "michi_above": "michi_above.png",
        "michi_awww": "michi_awww.gif",
        "michi_drag": "michi_drag.gif",
        "michi_flustered": "michi_flustered.png",
        "michi_glare": "michi_glare.png",
        "michi_sus": "michi_sus.png",
        "monkaS": "monkaS.png",
        "monkaStare": "monkaStare.png",
        "monkey_grr": "monkey_grr.png",
        "monkey_pensive": "monkey_pensive.png",
        "monkey_zany": "monkey_zany.png",
        "nazu_sit": "nazu_sit.png",
        "nazu_sus": "nazu_sus.png",
        "ok_and": "ok_and.gif",
        "owo": "owo.png",
        "pat": "pat.png",
        "pointThink": "pointThink.png",
        "rainbowHype": "rainbowHype.gif",
        "rawr": "rawr.png",
        "rember": "rember.png",
        "revolt": "revolt.png",
        "sickly": "sickly.png",
        "stare": "stare.png",
        "tfyoulookingat": "tfyoulookingat.png",
        "thanks": "thanks.png",
        "thonk": "thonk.png",
        "trol": "trol.png",
        "troll_smile": "troll_smile.gif",
        "uber": "uber.png",
        "ubertroll": "ubertroll.png",
        "verycool": "verycool.png",
        "verygood": "verygood.png",
        "wawafast": "wawafast.gif",
        "wawastance": "wawastance.png",
        "yeahokayyy": "yeahokayyy.png",
        "yed": "yed.png",
        "yems": "yems.png",
        "michael": "michael.gif",
        "charle": "charle.gif",
        "sadge": "sadge.webp",
        "sus": "sus.webp",
        "chade": "chade.gif",
        "gigachad": "gigachad.webp",
        "sippy": "sippy.webp",
        "ayame_heart": "ayame_heart.png",
        "catgirl_peek": "catgirl_peek.png",
        "girl_happy": "girl_happy.png",
        "hug_plushie": "hug_plushie.png",
        "huggies": "huggies.png",
        "noted": "noted.gif",
        "waving": "waving.png",
        "mogusvented": "mogusvented.png",
    };





document.getElementById("messages").innerHTML = '<div id="loggingin" style="text-align: center;display: grid;"><input id="token"/><h4 id="logo2">ENTER TOKEN HERE and press ok</h4><button onclick="login()">ok</button><input type="checkbox" onclick="wipelocal()" id="keeptoken" name="keep"><label for="keep">Keep entered token saved in localStorage of your browser (unchecking clears it)</label><h4 id="logo2">To obtain your token, paste and press enter on this in the web console (Ctrl-Shift-I) if you\'re using Revite (default Revolt chat client): <p>window.state.auth.sessions.get(controllers.client.getReadyClient().user._id).session.token</p> or check out <a style="color: #BB000E" href="https://infi.sh/post/revolt-tokens">Infi\'s website</a> if you want a slower way that will work with all Revolt web clients</h4><h4 id="logo2"><br/><a style="color: #BB000E" href="https://github.com/DoruDoLasu/Reduct">ReductV3 GitHub</a></h4></div><h4 id="extras">Extra options: </h4><input type="checkbox" id="scrolloff" name="scrolloff"><label for="scrolloff">Always autoscroll</label>';

thestage = "login";

if (localStorage.tokeno !== undefined) {
  document.getElementById("token").value = localStorage.tokeno;
  document.getElementById("keeptoken").checked = true;
}



if (thetoken !== undefined) {
  document.getElementById("messages").innerHTML = '';
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
}
if (thechannel === undefined) {
  document.getElementById("precontrols").hidden = true;
  document.getElementById("controls").hidden = true;
}

function dowebsocketstuff() {
 socket = new WebSocket('wss://ws.revolt.chat');

socket.addEventListener('open', function (event) {
              socket.send('{"type":"Authenticate","token":"'+thetoken+'"}');
              document.getElementById("wsconnection").innerText = "WS connected";
              document.getElementById("wsconnection").style.color = "#67CC89";

              keepAlive();
              });

socket.addEventListener('close', function (event) {
document.getElementById("wsconnection").innerText = "WS closed, press WS reload button to reconnect";
              document.getElementById("wsconnection").style.color = "#E11423";
});

socket.addEventListener('message', function (event) {
                datta = event.data;

                if (JSON.parse(datta)["type"] == "Ready") {
                    thestage = "loggedin";
			thefirstthing = JSON.parse(datta);
            serverlist = thefirstthing.servers;
            channellist = thefirstthing.channels;

            thefirstthing.users.forEach(function (item){
              friendidtoname[item._id] = item.username;
            });

            changeservchannel();
                }
                if (JSON.parse(datta)["type"] == "Message" && JSON.parse(datta)["channel"] == thechannel) {
                  thenewstuff = JSON.parse(datta);
                  themessages = [];
                  themessages[0] = thenewstuff;
                  rendermessages();
                  if (autoscroll == true){
                    document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
                  }
                }
                if (JSON.parse(datta)["type"] == "ChannelStartTyping" && JSON.parse(datta)["id"] == thechannel) {
                  if (istyping == true){
                    typtyp = JSON.parse(datta);
                    if (theusers[typtyp.user] === undefined) {
                    document.getElementById('typing').innerText = typtyp.user + "is typing";
                    }
                    else {
                      document.getElementById('typing').innerText = theusers[typtyp.user][0] + " is typing";
                    }
                  }
                }
                if (JSON.parse(datta)["type"] == "ChannelStopTyping" && JSON.parse(datta)["id"] == thechannel) {
                  if (istyping == true){
                    document.getElementById('typing').innerText = '';
                  }
                }
});


}

function wipelocal(){
  if (document.getElementById("keeptoken").checked == false ) {
    localStorage.clear();
  }
}

function login() {
  if (document.getElementById("keeptoken").checked == true ) {
    localStorage.tokeno = document.getElementById("token").value;
  }
  if (document.getElementById("scrolloff").checked == true ) {
    autoscroll = true;
  }
   thetoken = document.getElementById("token").value;
   document.getElementById("logo2").innerHTML = '';
    document.getElementById("loggingin").innerHTML = '';
    document.getElementById("precontrols").innerHTML = '<button onclick="changeservchannel()">Servers</button>';
    document.getElementById("controls").innerHTML = '<input id="a"/><button id="send" onclick="sendmessagelegacy()">Send</button><button onclick="attachprepare()">+</button><button id="gett" onclick="getmessagelegacy()">Full channel/WS reload</button>';



    dowebsocketstuff();
}

function changeservchannel(){
    thestage = "scgchange";
  thechannel = undefined;
  document.getElementById("controls").hidden = true;
  document.getElementById("replyingto").innerHTML = '';
  document.getElementById("typing").innerHTML = '';
  document.getElementById("messages").innerHTML = '<button onclick="grouplist()">Groups</button><button onclick="dmlist()">DM list</button><button onclick="savednotesgo()">Saved Notes</button><h1>Select server: </h1><select name="seletcc" id="selectt" onchange="chserver()"></select>';
  serverlist.forEach(function(item, index) {
    var server = document.createElement("option");
    server.textContent = item.name;
    server.value = item._id;
    if (theserver == item._id) {
      server.selected = "selected";
    }
    var channeldiv = document.createElement("div");
    channeldiv.id = "channelpick";
    document.getElementById("selectt").appendChild(server);
    document.getElementById("messages").appendChild(channeldiv);

    chserver();


});
}

function chserver(){
    thestage = "schange";
  theserver = document.getElementById('selectt').value;
  serverlist.forEach(function(item, index) {
    if (item._id == theserver) {
      theparsedserver = serverlist[index];
    }
  });
  if (theparsedserver.banner === undefined) {
  document.getElementById("channelpick").innerHTML = '<h2>Select channel: </h2><select name="seletcc" id="selecttt"></select>';
  }
  else {
   document.getElementById("channelpick").innerHTML = '<h2>Select channel: </h2><select name="seletcc" id="selecttt"></select>';
   document.getElementById("messages").style.backgroundImage = 'url("https://autumn.revolt.chat/banners/'+ theparsedserver.banner._id + '")';
   document.getElementById("messages").style.backgroundRepeat = "no-repeat";
   document.getElementById("messages").style.backgroundSize = "contain";
   document.getElementById("messages").style.backgroundPositionX = "100%"
  }

//  theparsedserver.channels.forEach(function(item, index) {
//    document.getElementById("selecttt").innerHTML += '<option value="' + item + //'">' + index + ': ' + item + '</option>';
//});

  thefirstthing.channels.forEach(function (item, index){
  if (item.server == theserver){
        document.getElementById("selecttt").innerHTML += '<option value="' + item._id + '">' + index + ': ' + item.name + '</option>';
}
});

  document.getElementById("channelpick").innerHTML += '<button onclick="chchannelnext()">ok</button>';
  document.getElementById("channelpick").innerHTML += '<h2>Manual channel id: </h2><input id="customchannel"></input><button onclick="customidpick()">ok</button>';

}


function dmlist(){
   thechannel = undefined;
   document.getElementById("replyingto").innerHTML = '';
   document.getElementById("messages").innerHTML = '<button onclick="grouplist()">Groups</button><button onclick="changeservchannel()">Servers</button><button onclick="savednotesgo()">Saved Notes</button><h1>DM list: </h1><select name="seletcc" id="selecttt"></select><button onclick="chchannelnext()">ok</button>';



    channellist.forEach(function(item, index) {
      if (item.channel_type == "DirectMessage") {
      var dm = document.createElement("option");
      if ((friendidtoname[item.recipients[0]] !== undefined) && (friendidtoname[item.recipients[1]] !== undefined)){
        dm.textContent = friendidtoname[item.recipients[0]] + " - " + friendidtoname[item.recipients[1]];
      }
      else {
        dm.textContent = item._id;
      }
      dm.value = item._id;
      
    var channeldiv = document.createElement("div");
    channeldiv.id = "channelpick";
    document.getElementById("selecttt").appendChild(dm);
    document.getElementById("messages").appendChild(channeldiv);
      }

});
}

function grouplist(){
   thechannel = undefined;
   document.getElementById("replyingto").innerHTML = '';
   document.getElementById("messages").innerHTML = '<button onclick="changeservchannel()">Servers</button><button onclick="dmlist()">DM list</button><button onclick="savednotesgo()">Saved Notes</button><h1>Group list: </h1><select name="seletcc" id="selecttt"></select><button onclick="chchannelnext()">ok</button>';
    channellist.forEach(function(item, index) {
      if (item.channel_type == "Group") {
      var dm = document.createElement("option");
      dm.textContent = item.name;
      dm.value = item._id;

    var channeldiv = document.createElement("div");
    channeldiv.id = "channelpick";
    document.getElementById("selecttt").appendChild(dm);
    document.getElementById("messages").appendChild(channeldiv);
      }

});
}


function savednotesgo(){
  thechannel = channellist[0]._id;
  lastmessage = undefined;
  firstmessage = undefined;
  document.getElementById("messages").innerHTML = "";
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
  getmessagelegacy();
}




function chchannelnext(){
  thechannel = document.getElementById('selecttt').value ;
  lastmessage = undefined;
  firstmessage = undefined;
  document.getElementById("messages").innerHTML = "";
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
  getmessagelegacy();
}

function customidpick(){
  thechannel = document.getElementById('customchannel').value ;
  lastmessage = undefined;
  firstmessage = undefined;
  document.getElementById("messages").innerHTML = "";
  document.getElementById("precontrols").hidden = false;
  document.getElementById("controls").hidden = false;
  getmessagelegacy();
}


function ulidtodate(ulid){
    digits = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
    finaldate = 0;
    date = ulid.slice(0,10);
    date.split('').reverse().forEach(function(item, index) {
    finaldate += digits.indexOf(item)*(Math.pow(32, index));
    });
    return finaldate;
}


function sendmessagelegacy(){
  var sendmsgsa = new XMLHttpRequest();
  sendmsgsa.open("POST", "https://api.revolt.chat/channels/"+thechannel+"/messages", true);
  sendmsgsa.setRequestHeader("x-session-token", thetoken);
  sendmsgsa.setRequestHeader("Accept", "*/*");
  sendmsgsa.setRequestHeader("Content-Type", "application/json");

  sendmsgsa.onreadystatechange = function(){
    if(sendmsgsa.readyState === 4){
        if(sendmsgsa.status === 200){
            console.log("Message sent");
            }
        if(sendmsgsa.status === 403){
            console.log("Message not sent");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot send this message (no permissons?) -> ('+ messid +')</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
            }

        istyping = true;
        document.getElementById("typing").innerHTML = '';
        resetreplytachment();
    }

  };
if (theattachments.length > 0){
    sendmsgsa.send(JSON.stringify({
                          content: document.getElementById("a").value,
                          replies: thereplying,
                          attachments: theattachments}));
  }
  else {
    sendmsgsa.send(JSON.stringify({
                          content: document.getElementById("a").value,
                          replies: thereplying
                          }));
 }
    //sendmsgsa.send("{\"content\":\" " +  + "\",\"replies\":[]}");
    document.getElementById("a").value = "";
    //setTimeout(function () { getmessagelegacy(); document.getElementById("a").value = "" }, 1000);
  }





function deletemessage(messid){
  var sendmsgsa = new XMLHttpRequest();
  sendmsgsa.open("DELETE", "https://api.revolt.chat/channels/"+thechannel+"/messages/"+messid, true);
  sendmsgsa.setRequestHeader("x-session-token", thetoken);
  sendmsgsa.setRequestHeader("Accept", "*/*");
  sendmsgsa.setRequestHeader("Content-Type", "application/json");

  sendmsgsa.onreadystatechange = function(){
    if(sendmsgsa.readyState === 4){
        if(sendmsgsa.status === 204){
            console.log("Message deleted");
            setTimeout(function () { document.getElementById(messid).remove(); getmessagelegacy();  }, 1000);
            }
        if(sendmsgsa.status === 403){
            console.log("Message not deleted");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot delete this message ('+ messid +')</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
            }
    }
  };
  sendmsgsa.send();

  }


function leaveleteserver(serverus){
  var sendmsgsa = new XMLHttpRequest();
  sendmsgsa.open("DELETE", "https://api.revolt.chat/servers/"+serverus, true);
  sendmsgsa.setRequestHeader("x-session-token", thetoken);
  sendmsgsa.setRequestHeader("Accept", "*/*");
  sendmsgsa.setRequestHeader("Content-Type", "application/json");

  sendmsgsa.onreadystatechange = function(){
    if(sendmsgsa.readyState === 4){
        if(sendmsgsa.status === 204){
            console.log("Server left/deleted");
            }
        if(sendmsgsa.status === 403){
            console.log("Server not left/deleted");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot delete this message ('+ messid +')</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
            }
    }
  };
  sendmsgsa.send();

  }



function reacttopre(messid){
  reactid = prompt("What emoji id?");
  if (reactid !== null){
  if ((reactid[0] == ":") && (reactid[reactid.length-1] == ":")) {
    reactid = reactid.slice(1,-1);
  }
  reactto(messid, reactid);
}
}
//

function reactto(messid, emoteid){
  var sendmsgsa = new XMLHttpRequest();
  sendmsgsa.open("PUT", "https://api.revolt.chat/channels/"+thechannel+"/messages/"+messid+"/reactions/"+emoteid, true);
  sendmsgsa.setRequestHeader("x-session-token", thetoken);
  sendmsgsa.setRequestHeader("Accept", "*/*");
  sendmsgsa.setRequestHeader("Content-Type", "application/json");

  sendmsgsa.onreadystatechange = function(){
    if(sendmsgsa.readyState === 4){
        if(sendmsgsa.status === 204){
            console.log("Reacted");
            setTimeout(function () { document.getElementById(messid).remove(); getmessagelegacy();  }, 1000);
            }
        if(sendmsgsa.status === 403){
            console.log("Not reacted");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot react to this message ('+ messid +') [maybe no react permission?]</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
            }
    }
  };
  sendmsgsa.send();

  }

function editprepare(messageid){
  istyping = false;
  document.getElementById("typing").innerHTML = '<input id="edithere" label="edited"/><button onclick="editmessage(\''+messageid+'\')">Edit</button><button onclick="closeattach()">X</button>';
}

function editmessage(messid){
  var sendmsgsa = new XMLHttpRequest();
  sendmsgsa.open("PATCH", "https://api.revolt.chat/channels/"+thechannel+"/messages/"+messid, true);
  sendmsgsa.setRequestHeader("x-session-token", thetoken);
  sendmsgsa.setRequestHeader("Accept", "*/*");
  sendmsgsa.setRequestHeader("Content-Type", "application/json");

  sendmsgsa.onreadystatechange = function(){
    if(sendmsgsa.readyState === 4){
        if(sendmsgsa.status === 200){
            console.log("Edited");
            document.getElementById("typing").innerHTML = '';
            setTimeout(function () {document.getElementById("typing").innerHTML = '';istyping = true;getmessagelegacy();  }, 1000);
            }
        else if(sendmsgsa.status === 403){
            console.log("Not edited");
            document.getElementById("typing").innerHTML = '<span style="color: #E64040">You cannot edit this message ('+ messid +')</span>';
            setTimeout(function () { document.getElementById("typing").innerHTML = '';istyping = true;  }, 3000);
            }
        else {
            document.getElementById("typing").innerHTML = '';
            istyping = true;
        }
    }
  };
  sendmsgsa.send(JSON.stringify({
                          content: document.getElementById("edithere").value,
                          replies: thereplying}));
  resetreplytachment()

  }

function attachprepare(){
  istyping = false;
  document.getElementById("typing").innerHTML = '<input type="file" id="attachhere" label="edited"/><button onclick="uploadautumn()">Upload to Autumn</button><button onclick="closeattach()">X</button>';
}

function closeattach(){
    document.getElementById("typing").innerHTML = '';
    istyping = true;
}

function uploadautumn(){
  if (theattachments.length < 5){
    if (document.getElementById("attachhere").files[0] !== undefined){
    theattachment = new FormData();
    theattachment.append('file', document.getElementById("attachhere").files[0]);

    var sendmsgsa = new XMLHttpRequest();
  sendmsgsa.open("POST", "https://autumn.revolt.chat/attachments", true);
  sendmsgsa.setRequestHeader("Accept", "*/*");

  sendmsgsa.onreadystatechange = function(){
    if(sendmsgsa.readyState === 4){
        if(sendmsgsa.status === 200){
            console.log("Uploaded");
            theuploaded = sendmsgsa.responseText;
            theparseduploaded = JSON.parse(theuploaded);
            theattachments.push(theparseduploaded.id);
            replytachment();
            }
        else {
            console.log("Not uploaded");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">Uploading failed</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
            }
    }
  };
  sendmsgsa.send(theattachment);


  }
  }
}




function repply(replyid){
  if (thereplying.length < 5){
 thereplying.push({id: replyid, mention:false});
  }
  else {
    thereplying.shift();
    thereplying.push({id: replyid, mention:false});
  }
 replytachment();
}

function resetreplytachment(){
  thereplying = [];
  theattachments = [];
  replytachment();
}


function replytachment(){


  document.getElementById("replyingto").innerHTML = '<span>Replies to: ' + thereplying.length + '</span><span>, attachments: ' + theattachments.length + '    </span><span onclick="resetreplytachment()">[reset]</span>';

}





function rendermessages(){
              for (var i=0; i < theparsedthing.users.length; i++) {
                  if (theusers[theparsedthing.users[i]._id] === undefined){
                    if (theparsedthing.users[i].avatar !== undefined){
                      theusers[theparsedthing.users[i]._id] = [theparsedthing.users[i].username,theparsedthing.users[i].avatar._id];
                    }
                    else {
                      theusers[theparsedthing.users[i]._id] = [theparsedthing.users[i].username, "nope"];
                    }
                  }
              }

              if (themessages[0] !== undefined){

                for(var i=themessages.length-1;i>=0;i--){
                  // if (themessages[i].content !== undefined) {

                  var message = document.createElement("div");
                  message.id = themessages[i]._id;



                  // THE MESSAGE AUTHOR


                  // show author if last message is not made by the same one
                  if (lastprocessedauthor !== themessages[i].author || themessages[i].masquerade !== undefined) {

                  if (themessages[i].system !== undefined) {
                  // document.getElementById("messages").innerHTML += '<div id="'+themessages[i]._id+'">'+'<span class="system">SYSTEM (!!!)</span>'



                  var msbegin = document.createElement("span");
                  msbegin.class = "system";
                  msbegin.innerHTML = "SYSTEM (!!!)";
                  message.appendChild(msbegin);




                  }

                  else if (theusers[themessages[i].author] === undefined){
                    document.getElementById("messages").innerHTML += '<div id="'+themessages[i]._id+'" class="nmsgtop">'+'<span style="color: #764347">'+ themessages[i].author +' (full refresh to get)</span>';

                  } else {
                  if (theusers[themessages[i].author][1] == "nope") {
                   document.getElementById("messages").innerHTML += '<div id="'+themessages[i]._id+'" class="nmsgtop">'+'<span class="author">'+theusers[themessages[i].author][0]+'</span>';

                  }

                  else if (themessages[i].masquerade !== undefined) {document.getElementById("messages").innerHTML += '<div id="'+themessages[i]._id+'" class="nmsgtop"><span class="maskedauthor"><img class="pfp" src="https://jan.revolt.chat/proxy?url=' + themessages[i].masquerade.avatar + '">' + themessages[i].masquerade.name +  ' (masked '+theusers[themessages[i].author][0]+')</span>';
                  }

                  else {
                  document.getElementById("messages").innerHTML += '<div id="'+themessages[i]._id+'"  class="nmsgtop">'+'<span class="author"><img class="pfp" src="https://autumn.revolt.chat/avatars/'+ theusers[themessages[i].author][1] +'?max_side=32"/>'+theusers[themessages[i].author][0]+'</span>';
                  }
                  }
                  }

                  document.getElementById("messages").innerHTML += '<span class="timeclas" title="' + new Date(ulidtodate(themessages[i]._id)) + '">('+new Date(ulidtodate(themessages[i]._id)).toLocaleTimeString()+")  </span>"

                  //<button onclick="deletemessage(" 01g7m00v0r33bycne9vj2nd93w")"="">delete</button>

                  if (themessages[i].replies !== undefined) {
                    document.getElementById("messages").innerHTML += '<span style="color: #ffffff">replies to </span>';
                    for (rep=0;rep<themessages[i].replies.length;rep++){
                    document.getElementById("messages").innerHTML += '<a href="#' + themessages[i].replies[rep] + '">['+(rep+1)+']</a> ';
                    }
                  }

                  //rher

                  document.getElementById("messages").innerHTML += ' <span class="deleto" onclick="deletemessage(\'' + themessages[i]._id + '\')">[delete]</span><span class="replyto" onclick="repply(\'' + themessages[i]._id + '\')">[reply]</span>' + '<span class="replyto" onclick="reacttopre(\'' + themessages[i]._id + '\')">[react]</span>' + '<span class="replyto" onclick="editprepare(\'' + themessages[i]._id + '\')">[edit] </span>';

                  if (themessages[i].content !== undefined) {

                  if (themessages[i].content.split(":").length > 2) {
                    var mscontent = document.createElement("h5");
                        mscontent.id = "content";
                    msgmote = themessages[i].content.split(":");
                    msgmote.forEach(function (item, index){
                     if ((index % 2 !=0) && (item.length == 26 && item.indexOf("<") == -1)){
                        var mscontent1 = document.createElement("span");
                            mscontent1.class = "emoji";
                        var emote = document.createElement("img");
                            emote.id = "emoji";
                       	    emote.src = "https://autumn.revolt.chat/emojis/" + item;
                        mscontent1.appendChild(emote);
                        mscontent.appendChild(mscontent1);
                      }
                      else if ((index % 2 !=0) && item == "cat_departure") {
                        var mscontent1 = document.createElement("span");
                        mscontent1.class = "emoji";
                         var emote = document.createElement("img");
                         emote.id = "emoji";
                         emote.src = "https://autumn.revolt.chat/emojis/01G7KXGW83G5EGFWX7ASMJ04Q7";
                         mscontent1.appendChild(emote);
                         mscontent.appendChild(mscontent1);
                      }
                      else if (index % 2 !=0 && theoldcustemotes[item] !== undefined) {
                        var mscontent1 = document.createElement("span");
                            mscontent1.class = "emoji";
                        var emote = document.createElement("img");
                            emote.id = "emoji";
                            emote.src = "https://dl.insrt.uk/projects/revolt/emotes/" + theoldcustemotes[item];
                        mscontent1.appendChild(emote);
                        mscontent.appendChild(mscontent1);
                      }
                      else if (index % 2 !=0) {
                        var mscontent2 = document.createElement("span");
                        mscontent2.innerText = ":" + item + ":";
                        mscontent.appendChild(mscontent2);
                      }
                      else {
                        var mscontent2 = document.createElement("span");
                        mscontent2.innerText = item;
                        mscontent.appendChild(mscontent2);
                      }


                    });
                    document.getElementById("messages").appendChild(mscontent);
                    document.getElementById("messages").innerHTML += '</div>';
                  }
                   else {
                  var mscontent = document.createElement("h5");
                  mscontent.id = "content";
                  mscontent.innerText = themessages[i].content;
                  document.getElementById("messages").appendChild(mscontent);
                  document.getElementById("messages").innerHTML += '</div>';
                   }
                  }

                  else if (themessages[i].system !== undefined) {
                    var mscontent = document.createElement("h5");
                    mscontent.id = "content";
                    mscontent.innerText = themessages[i].system.type + "  " + themessages[i].system.id;
                    document.getElementById("messages").appendChild(mscontent);
                  }

                  if (themessages[i].embeds !== undefined) {
                    themessages[i].embeds.forEach(function(item, index) {
                      var embcontent = document.createElement("h5");
                      embcontent.id = "embedd";
                      embcontent.innerText = item.description;
                      if (item.colour !== undefined) {
                       embcontent.style.borderColor = item.colour;
                      }
                      document.getElementById("messages").appendChild(embcontent);
                      });
                    }

                  if (themessages[i].reactions !== undefined){
                    Object.keys(themessages[i].reactions).forEach(function(item, index) {
                        var reactcontent = document.createElement("span");
                        reactcontent.id = "reactcont"
                        reactcontent.title = "reacted: "
                        themessages[i].reactions[item].forEach(function(item2, index2) {
                          if (theusers[themessages[i].reactions[item][index2]] !== undefined){
                            reactcontent.title += theusers[themessages[i].reactions[item][index2]][0] + " ";
                          }
                          else {
                            reactcontent.title += themessages[i].reactions[item][index2] + " ";
                          }
                        });
                        reactcontent.setAttribute("onclick", "reactto('" + themessages[i]._id + "', '" + item + "')");
                        var emote = document.createElement("img");
                         emote.id = "react";
                         emote.src = "https://autumn.revolt.chat/emojis/" + item;
                         reactcontent.appendChild(emote);
                         var emotetimes = document.createElement("span");
                         emotetimes.id = "reactcount";
                         emotetimes.innerText = themessages[i].reactions[item].length
                         reactcontent.appendChild(emotetimes);
                         document.getElementById("messages").appendChild(reactcontent);
                    });

                  }

                  /* EMBEDS */

                  if (themessages[i].attachments !== undefined){
                    themessages[i].attachments.forEach(function(item, index) {

                    document.getElementById("messages").innerHTML += '<h5 id="filename">'+themessages[i]["attachments"][index]["filename"]+' <a href="https://autumn.revolt.chat/attachments/' + themessages[i]["attachments"][index]["_id"] + '" target="_blank" rel="noopener noreferrer">⇓</a></h5>';

                    if (themessages[i]["attachments"][index]["metadata"]["type"] == "Image") {document.getElementById("messages").innerHTML += '<img class="embed" src="https://autumn.revolt.chat/attachments/' + themessages[i]["attachments"][index]["_id"] + '"></img>';}

                    else if (themessages[i]["attachments"][index]["metadata"]["type"] == "Audio") {document.getElementById("messages").innerHTML += '<audio controls preload="none"><source src="https://autumn.revolt.chat/attachments/' + themessages[i]["attachments"][index]["_id"] + '" type="'+themessages[i].attachments[index].content_type+'"></audio>';}

                    else if (themessages[i]["attachments"][index]["metadata"]["type"] == "Video") {document.getElementById("messages").innerHTML += '<video controls preload="none"><source src="https://autumn.revolt.chat/attachments/' + themessages[i]["attachments"][index]["_id"] + '" type="'+themessages[i].attachments[index].content_type+'"></video>';}

                    else if (themessages[i]["attachments"][index].content_type == "video/ogg")
                    {document.getElementById("messages").innerHTML += '<audio controls preload="none"><source src="https://autumn.revolt.chat/attachments/' + themessages[i]["attachments"][index]["_id"] + '" type="'+themessages[i].attachments[index].content_type+'"></audio>';}

                    else if (themessages[i]["attachments"][index].content_type == "application/x-riff")
                    {document.getElementById("messages").innerHTML += '<audio controls preload="none"><source src="https://autumn.revolt.chat/attachments/' + themessages[i]["attachments"][index]["_id"] + '" type="audio/wav"></audio>';}


                    });

                  }

                  document.getElementById("messages").appendChild(message);
                  lastprocessedauthor = themessages[i].author;
                }

                lastmessage = themessages[0]._id;
                replytachment();

              }
        }






function getmessagelegacy(){
  istyping = true;
  var getmsgsa = new XMLHttpRequest();
 // if (typeof lastmessage == 'undefined'){
    getmsgsa.open("GET", "https://api.revolt.chat/channels/"+thechannel+"/messages?include_users=true", true);
//  }
 // else {
  //  getmsgsa.open("GET", "https://api.revolt.chat/channels/"+thechannel+"/messages?include_users=true&after="+lastmessage, true);
 // }
  getmsgsa.setRequestHeader("x-session-token", thetoken);
  getmsgsa.setRequestHeader("Accept", "*/*");
  getmsgsa.onreadystatechange = function() {
      if(getmsgsa.readyState === 4){
          if(getmsgsa.status === 200){
              thething = getmsgsa.responseText;
              theparsedthing = JSON.parse(thething);
              themessages = theparsedthing.messages;
              firstmessage = themessages[themessages.length-1]._id
              document.getElementById("messages").style.backgroundImage = '';
              document.getElementById("messages").style.backgroundRepeat = "";
              document.getElementById("messages").style.backgroundSize = "";
              document.getElementById("messages").style.backgroundPositionX = "";
              document.getElementById("messages").innerHTML = '<h2 id="newm">===</h2><button onclick="getmessagelegacyolder()">Get older messages</a>';
              if (socket.readyState == 3) {
               dowebsocketstuff();
              }
              rendermessages();
              //if (autoscroll == true) {
                document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
              //}

		}
		if(getmsgsa.status === 403){
            console.log("Getting the channel messages failed");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot access this channel (lack of permissions?) -> ('+ thechannel +')</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
		}
	}
};
getmsgsa.send(null);
}
function getmessagelegacyolder(){
  var getmsgsa = new XMLHttpRequest();
  getmsgsa.open("GET", "https://api.revolt.chat/channels/"+thechannel+"/messages?include_users=true&before="+firstmessage, true);
  getmsgsa.setRequestHeader("x-session-token", thetoken);
  getmsgsa.setRequestHeader("Accept", "*/*");
  getmsgsa.onreadystatechange = function() {
      if(getmsgsa.readyState === 4){
          if(getmsgsa.status === 200){
              thething = getmsgsa.responseText;
              theparsedthing = JSON.parse(thething);
              themessages = themessages.concat(theparsedthing.messages);
              document.getElementById("messages").innerHTML = '';

              if (socket.readyState == 3) {
               dowebsocketstuff();
              }
              rendermessages();
              if (autoscroll == true) {
                document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
              }
		}
		if(getmsgsa.status === 403){
            console.log("Getting the channel messages failed");
            document.getElementById("replyingto").innerHTML = '<span style="color: #E64040">You cannot access this channel (lack of permissions?) -> ('+ thechannel +')</span>';
            setTimeout(function () { document.getElementById("replyingto").innerText = '';  }, 3000);
		}
	}
};
getmsgsa.send(null);
}




function keepAlive() {
  if (socket.readyState == socket.OPEN) {
    socket.send('{"type": "Ping","data": ' + Date.now() + '}');
  }
  timerId = setTimeout(keepAlive, 30000);
}
function cancelKeepAlive() {
  if (timerId) {
    clearTimeout(timerId);
  }
}

document.addEventListener('keyup', function(event){
	if(event.key === "Escape"){
		document.getElementById("messages").scrollTop = document.getElementById("messages").scrollHeight;
	}
});

document.addEventListener('keyup', function(event){
	if(event.key === "Enter"){
      document.getElementById("send").click();
	}
});
