// finds out where the guy is
var x = getXPosition("guy");
var y = getYPosition("guy");
//controls the red triangles that select the pokemon in the store
var triangles = ["triangle1", "triangle2", "triangle3", "triangle4", "triangle5", "triangle6"];
var sideTriangles = ["sideTriangle1", "sideTriangle2", "sideTriangle3", "sideTriangle4", "sideTriangle5", "sideTriangle6"];
//controls what direction the guy is moving
var dir = "none";
//used in to do the animation
var countRight = 0;
var countLeft = 0;
var countUp = 0;
var countDown = 0;
var rightImages = ["assets/east 1.png", "assets/east 2.png", "assets/east 3.png"];
var rightImageIndex = 0;
var leftImages = ["assets/west 1.png", "assets/west 2.png", "assets/west 3.png"];
var leftImageIndex = 0;
var downImages = ["assets/south 1.png", "assets/south 2.png", "assets/south 3.png"];
var downImageIndex = 0;
var upImages = ["assets/north 1.png", "assets/north 2.png", "assets/north 3.png"];
var upImageIndex = 0;
//used to determine if a battle is going to happen
var battle;
var battleVar;
//used for the battle soundtrack
var battleSongNumber = randomNumber(0,4);
var battleSongs = ["Pokemon Black and White Music - Final N Battle (64  kbps) (YouTube 2 MP3 Converter).mp3", "Pokemon DiamondPearlPlatinum - Battle! Trainer Music (HQ).mp3", "Pokemon Diamond_Pearl_Platinum - Battle! Champion Cynthia Music (HQ).mp3", "assets/RSE Pokemon - Wild Pokemon.mp3", "Pokemon FireRed-LeafGreen Music- Trainer Battle (128  kbps) (YouTube 2 MP3 Converter).mp3"];
//chooses an opponent 
var opponent = randomNumber(0,49);
//makes it known that a game started
var newGamePressed = 0;
//determines if game is ongoing
var playing = 0;
//stores your original pokemon
var initialPokemon;
//used for the walking soundtrack
var walkingSongs = ["assets/Pokemon DiamondPearlPlatinum - Route 210 Music HQ.mp3", "assets/Pokemon DiamondPearlPlatinum - Route 225 Music HQ.mp3", "Pokemon Diamond_Pearl_Platinum - Route 205 Music (HQ).mp3", "assets/Pokemon RSE- Route 110 111 112 114 117 Music.mp3", "assets/Pokemon RubySapphireEmerald- Route 104.mp3", "assets/Pokemon RubySapphireEmerald- Route 113.mp3"];
var walkingSongNumber = randomNumber(0,5);
//stores money
var money = 100;
//arrays that store the IDs of your party and the healths of your party
var urParty = [];
var urPartyHealth = [];
//did you faint or did they faint or did you catch them?
var faint = 0;
var theyFaint = 0;
var caught = 0;
//statistics for the battles
var theirHP;
var theirAttack;
var theirDefense;
var theirDamage;
var urHP;
var urAttack;
var urDefense;
var urDamage;
//index for your party
var currentPokemon = 0;
//stores your score
var score = 0;
//scores your username and table ID
var userNumber;
var userName;
//stores the high score and the username associated with it
var highScore = 0;
var highScoreName;
//controls muting
var mute = 0;
//initial conditions
setScreen("playScreen");
playSound("assets/Pokémon Theme Song.mp3", true);
hideElement("username_input");
//our gameloop yay
var gameloop;
gameloop = timedLoop(20, function() {
//checks if they die, you die, or if they're caught 
  if (caught == 1) {
    caught = 0;
    if (mute === 0) {
    playSound(walkingSongs[walkingSongNumber]);
    }
    stopSound(battleSongs[battleSongNumber]);
    updateMoney(50);
    setScreen("catchScreen");
    readRecords("original pokemon", {}, function(records) {
      updateScore(Math.round(10000/records[opponent].rate));
    });
  }
  if (faint == 1) {
    faint = 0;
    stopSound(battleSongs[battleSongNumber]);
    if (mute === 0) {
    playSound(walkingSongs[walkingSongNumber]);
    }
    setScreen("faintScreen");
    readRecords("original pokemon", {}, function(records) {
      updateScore(Math.round(-2*((records[currentPokemon].health + records[currentPokemon].attack + records[currentPokemon].defense + records[currentPokemon].speed)/4)));
      urPartyHealth[currentPokemon] = records[urParty[currentPokemon]].health
      ;
    });
  }
  if (theyFaint==1) {
    theyFaint=0;
    stopSound(battleSongs[battleSongNumber]);
    if (mute === 0) {
    playSound(walkingSongs[walkingSongNumber]);
    }
    setScreen("theyFaintScreen");
    updateMoney(20);
    readRecords("original pokemon", {}, function(records) {
      updateScore(Math.round((2*(records[opponent].health + records[opponent].attack + records[opponent].defense + records[opponent].speed)/4)));
    });
  }
//moves the guy depending on what direction he needs to go  
  if (dir == "right") {
    x += 2;
    setImageURL("guy", rightImages[rightImageIndex]);
  }  if (dir == "left") {
    x -= 2;
    setImageURL("guy", leftImages[leftImageIndex]);
  }  if (dir == "up") {
    y -= 2;
    setImageURL("guy", upImages[upImageIndex]);
  }  if (dir == "down") {
    y += 2;
    setImageURL("guy", downImages[downImageIndex]);
  } 
//keeps him at the right position
  setPosition("guy",x,y);
//makes sure he can't go out of bounds
  if (x >= 290 || x <= -7 || y <= 0 || y>= 370) {
    dir = "none";
  }
//get in the store  
  if (y<=40 && x>=27 && x<=90 && x <100){
    readRecords("original pokemon", {}, function(records) {
      setImageURL("pokemon1", records[(urParty[0])].front);
      if (urParty.length >= 2) {
        setImageURL("pokemon2", records[(urParty[1])].front);
      }
      if (urParty.length >= 3) {
        setImageURL("pokemon3", records[(urParty[2])].front);
      }
      if (urParty.length >= 4) {
        setImageURL("pokemon4", records[(urParty[3])].front);
      }
      if (urParty.length >= 5) {
        setImageURL("pokemon5", records[(urParty[4])].front);
      }
      if (urParty.length >= 6) {
        setImageURL("pokemon6", records[(urParty[5])].front);
      }
      setScreen("storeScreen");
      hideElement("triangle1");
      hideElement("triangle2");
      hideElement("triangle3");
      hideElement("triangle4");
      hideElement("triangle5");
      hideElement("triangle6");
      showElement(triangles[currentPokemon]);
      x = 60;
      y = 70;
      dir = "none";
      stopSound(walkingSongs[walkingSongNumber]);
      if (mute === 0) {
      playSound("PokéMart - Pokémon Diamond-Pearl-Platinum (64  kbps) (YouTube 2 MP3 Converter).mp3", true);
      }
    });
  }
  if (x>=292 && y>=370){
    setScreen("dietCokeScreen");
    x=300;
    y=360;
  }
//stuff to make the battle start
  if (y>=120 && y<=388 && x<=230 && x>= 0 && newGamePressed == 1 && dir !== "none"){
    battle = 1;
  } else {
    battle = 0;
  }
  if (battle == 1) {
    battleVar = randomNumber(1,500);
  } else {
    battleVar = 0;
  }
  if (battleVar == 69 || battleVar == 420) {
    readRecords("original pokemon", {}, function(records) {
      urHP = urPartyHealth[currentPokemon];
      setImageURL("urPokemon", records[urParty[currentPokemon]].back);
      setImageURL("opponent", records[opponent].front);
      setText("opponentName", records[opponent].name);
      setText("urName", records[urParty[currentPokemon]].name);
      healthBar("urHPslider", urParty[currentPokemon], urHP);
      setProperty("theirHPslider", "width", 100);
      theirHP = (records[opponent].health);
      theirDefense = (records[opponent].defense);
      theirAttack = (records[opponent].attack);
      urDefense = (records[urParty[currentPokemon]].defense);
      urAttack = (records[urParty[currentPokemon]].attack);
      stopSound(walkingSongs[walkingSongNumber]);
      if (mute === 0) {
        playSound(battleSongs[battleSongNumber], true);
      }
      setTimeout(function() {
        setScreen("battleScreen");
        dir = "none";
      }, 100);
    });
  }
});
//checks the keypress to determine the direction
onEvent("walkingScreen", "keydown", function(event) {
  if ((event.key == "d" || event.key == "Right" ) && x <= 290) {
    dir = "right";
    countRight++;
    if (countRight %2 === 0) {
      rightImageIndex = (rightImageIndex + 1)%3;
      setImageURL("guy", rightImages[rightImageIndex]);
    }
  }  
  if ((event.key == "a" || event.key == "Left") && x >= -7) {
    dir = "left";
    countLeft++;
    if (countLeft %2 === 0) {
     leftImageIndex = (leftImageIndex + 1)%3;
      setImageURL("guy", leftImages[leftImageIndex]);
    }
  } 
  if ((event.key == "w" || event.key == "Up") && y >= 0) {
    dir = "up";
    countUp++;
    if (countUp %2 === 0) {
     upImageIndex = (upImageIndex + 1)%3;
      setImageURL("guy", upImages[upImageIndex]);
    }
  }  
  if ((event.key == "s" || event.key == "Down") && y <= 370) {
    dir = "down";
    countDown++;
    if (countDown %2 === 0) {
    downImageIndex = (downImageIndex + 1)%3;
      setImageURL("guy", downImages[downImageIndex]);
    }
  }
});
//when you're not pressing a key it doesn't go
onEvent("walkingScreen", "keyup", function() {
  dir = "none";
});
//title screen stuff, determines your initial pokemon and your username
onEvent("username_input", "change", function() {
  var vals = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50];
  setScreen("walkingScreen");
  stopSound("assets/Pokémon Theme Song.mp3");
  if (getNumber("startingPokemon")) {
    for (var i = 1; i < 50; i++) {
      if (getNumber("startingPokemon") == vals[i]) {
        initialPokemon = getNumber("startingPokemon") - 1;
        break;
      } else {
        initialPokemon = 34;
      }
    }
  } else {
    initialPokemon = 34;
  }
  playSound(walkingSongs[walkingSongNumber], true);
  readRecords("original pokemon", {}, function(records) {
    urHP = records[initialPokemon].health;
    urParty[currentPokemon] = records[initialPokemon-1].id;
    appendItem(urPartyHealth, urHP);
  });
  newGamePressed = 1;
  createRecord("high score", {username:getText("username_input")}, function(record) {
    userNumber = record.id;
  });
  userName = getText("username_input");
  playing = 1;
});
//when you press new game
onEvent("newGameBtn", "click", function() {
  showElement("username_input");
  showElement("startingPokemon");
});
//lets you run away
onEvent("runAway", "click", function() {
 readRecords("original pokemon", {}, function(records) {
   if ((records[urParty[currentPokemon]]).speed > records[opponent].speed) {
      setScreen("walkingScreen");
      urPartyHealth[currentPokemon] = urHP;
      stopSound(battleSongs[battleSongNumber]);
      if (mute === 0) {
      playSound(walkingSongs[walkingSongNumber], true);
      }
      opponent = randomNumber(0,49);
      updateScore(-50);
    } else {
      showElement("noRun");
      setTimeout(function() {
        hideElement("noRun");
      }, 1000);
    }
 });
});
//lets you restore health by buying potions
onEvent("potion", "click", function() {
  if (money<10){
    showElement("full");
    return;
  } else {
    readRecords("original pokemon", {}, function(records) {
      if (urPartyHealth[currentPokemon] == records[urParty[currentPokemon]].health) {
        showElement("full");
        setTimeout(function() {
          hideElement("full");
          return;
        }, 1000);
       
      } else      
      if (urPartyHealth[currentPokemon] + 20 > records[urParty[currentPokemon]].health) {
        urPartyHealth[currentPokemon] = records[urParty[currentPokemon]].health;
        showElement("full");
        setTimeout(function() {
          hideElement("full");
        }, 1000);
        money = money - 10;
      } else {
        urPartyHealth[currentPokemon] += 20;
        money = money - 10;
      }
      setText("moneyStoreText","₽: "+money);
      setText("moneyText","₽: "+money);
    });
  }
});
onEvent("superPotion", "click", function() {
  if (money<20){
    showElement("full");
    return;
  } else {
    readRecords("original pokemon", {}, function(records) {
    if (urPartyHealth[currentPokemon] == records[urParty[currentPokemon]].health) {
      showElement("full");
      setTimeout(function() {
        hideElement("full");
        return;
      }, 1000);
    } else
    if (urPartyHealth[currentPokemon] + 50 > records[urParty[currentPokemon]].health) {
      urPartyHealth[currentPokemon] = records[urParty[currentPokemon]].health;
      showElement("full");
      setTimeout(function() {
        hideElement("full");
      }, 1000);
    } else {
      urPartyHealth[currentPokemon] += 50;
      }
    money = money - 20;
    setText("moneyStoreText","₽: "+money);
    setText("moneyText","₽: "+money);
    });
  }
});
onEvent("hyperPotion", "click", function() {
  if (money<30){
    showElement("full");
    return;
  } else {
    readRecords("original pokemon", {}, function(records) {
      if (urPartyHealth[currentPokemon] == records[urParty[currentPokemon]].health) {
        showElement("full");
        setTimeout(function() {
          hideElement("full");
          return;
        }, 1000);
      } else 
      if (urPartyHealth[currentPokemon] + 200 > records[urParty[currentPokemon]].health) {
        urPartyHealth[currentPokemon] = records[urParty[currentPokemon]].health;
        showElement("full");
        setTimeout(function() {
          hideElement("full");
        }, 1000);
      } else {
        urPartyHealth[currentPokemon] += 200;
      }
      money = money - 30;
      setText("moneyStoreText","₽: "+money);
      setText("moneyText","₽: "+money);
    });
  }
});
onEvent("fullRestore", "click", function() {
  if (money<50){
    showElement("full");
    return;
  } else {
    readRecords("original pokemon", {}, function(records) {
      if (urPartyHealth[currentPokemon] == records[urParty[currentPokemon]].health) {
        showElement("full");
        setTimeout(function() {
          hideElement("full");
          return;
        }, 1000);
      } else {
      urPartyHealth[currentPokemon] = records[urParty[currentPokemon]].health;
      showElement("full");
      setTimeout(function() {
        hideElement("full");
        }, 1000);
      money = money - 50;
      setText("moneyStoreText","₽: "+money);
      setText("moneyText","₽: "+money);
      }
    });
    }
  });
//gets you out of the store
onEvent("storeBack", "click", function() {
  x = 60;
  y = 70;
  setPosition("guy", x, y);
  setScreen("walkingScreen");
  stopSound("PokéMart - Pokémon Diamond-Pearl-Platinum (64  kbps) (YouTube 2 MP3 Converter).mp3");
  if (mute === 0) {
  playSound(walkingSongs[walkingSongNumber]);
  }
});
//lets you attack and calculates damage and stuff
onEvent("attackButton", "click", function() {
  readRecords("original pokemon", {}, function(records) {
    if (records[urParty[currentPokemon]].speed < records[opponent].speed) {
    theirDamage = ((((880* (theirAttack/urDefense))/50))+2);
    if (theirDamage < urHP) {
      urHP = urHP - theirDamage;
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }
      healthBar("urHPslider", urParty[currentPokemon], urHP);
    } else {
      urHP = urHP - theirDamage;
            if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }
      faint = 1;
      return;
    }
    setTimeout(function() {
      urDamage = ((((880 * (urAttack/theirDefense)/50)))+2);
    if (urDamage < theirHP) {
      theirHP = theirHP - urDamage;
      healthBar("theirHPslider", opponent, theirHP);
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }      
    } else {
      theirHP = theirHP - urDamage;
      urPartyHealth[currentPokemon] = urHP;
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }      
      theyFaint = 1;
      return;
    }
    }, 500);
    } else {
    urDamage = ((((880* (urAttack/theirDefense))/50))+2);
    if (urDamage < theirHP) {
      theirHP = theirHP - urDamage;
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }      
      healthBar("theirHPslider", opponent, theirHP);
    } else {
      theirHP = theirHP - urDamage;
      theyFaint = 1;
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }      
      urPartyHealth[currentPokemon] = urHP;
      return;
    }
    setTimeout(function() {
      theirDamage = ((((880 * (theirAttack/urDefense))/50))+2);
    if (theirDamage < urHP) {
      urHP = urHP - theirDamage;
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }      
      healthBar("urHPslider", urParty[currentPokemon], urHP);
    } else {
      urHP = urHP - theirDamage;
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }      
      faint = 1;
      return;
    }
    }, 500);
    }
  });
});
//mutes and unmutes
onEvent("mute", "click", function() {
  if (mute === 0) {
    stopSound(walkingSongs[walkingSongNumber]);
    mute = 1;
    setImageURL("mute", "assets/mute.png");
    return;
  } else {
    playSound(walkingSongs[walkingSongNumber]);
    mute = 0;
    setImageURL("mute", "assets/unmute.png");
    return;
  }
});
//lets you catch pokemon
onEvent("catchButton", "click", function() {
  readRecords("original pokemon", {}, function(records) {
    var a = ((((3*records[opponent].health)-(2*theirHP))*records[opponent].rate * 2)/(3*records[opponent].health));
    var b = (1048560/(Math.sqrt(Math.sqrt((16711680/a)))));
    if (b>randomNumber(0,65532) && b>randomNumber(0,65532) && b>randomNumber(0,65532) && b>randomNumber(0,65532)) {
      setScreen("catchScreen");
      stopSound(battleSongs[battleSongNumber]);
      caught = 1;
      setText("catchLabel", "Congratulations! You've caught a " + records[opponent].name);
      urPartyHealth[currentPokemon] = urHP;
      setImageURL("newCatchImage", records[opponent].front);
      if (urParty.length < 6) {
        setText("autoAddLabel", records[opponent].name + " has been added to your party!");
        showElement("autoAddLabel");
        showElement("catchContinueButton");
        appendItem(urParty, (records[opponent].id-1));
        appendItem(urPartyHealth, theirHP);
      } else {
        readRecords("original pokemon", {}, function(records) {
          setImageURL("party1", records[urParty[0]].front);
          setImageURL("party2", records[urParty[1]].front);
          setImageURL("party3", records[urParty[2]].front);
          setImageURL("party4", records[urParty[3]].front);
          setImageURL("party5", records[urParty[4]].front);
          setImageURL("party6", records[urParty[5]].front);
          showElement("replaceLabel");
          showElement("party6");
          showElement("party5");
          showElement("party4");
          showElement("party3");
          showElement("party2");
          showElement("party1");
          hideElement("autoAddLabel");
          hideElement("catchContinueButton");
        });
      }
    } else {
      setTimeout(function() {
      theirDamage = ((((880 * (theirAttack/urDefense))/50))+2);
    if (theirDamage < urHP) {
      urHP = urHP - theirDamage;
      healthBar("urHPslider", urParty[currentPokemon], urHP);
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }
    } else {
      urHP = urHP - theirDamage;
      if (mute === 0) {
        playSound("Hitmarker Sound! [Green Screen].mp3");
      }      
      faint = 1;
      return;
    }
    }, 500);
    }
  });
});
//selects which pokemon you want to heal and battle with
onEvent("pokemon1", "click", function() {
  hideElement(triangles[currentPokemon]);
  currentPokemon = 0;
  showElement(triangles[currentPokemon]);
});
onEvent("pokemon2", "click", function() {
  hideElement(triangles[currentPokemon]);
  currentPokemon = 1;
  showElement(triangles[currentPokemon]);
});
onEvent("pokemon3", "click", function() {
  hideElement(triangles[currentPokemon]);
  currentPokemon = 2;
  showElement(triangles[currentPokemon]);
});
onEvent("pokemon4", "click", function() {
 hideElement(triangles[currentPokemon]);
 currentPokemon = 3;
 showElement(triangles[currentPokemon]);
});
onEvent("pokemon5", "click", function() {
  hideElement(triangles[currentPokemon]);
  currentPokemon = 4;
  showElement(triangles[currentPokemon]);
});
onEvent("pokemon6", "click", function() {
  hideElement(triangles[currentPokemon]);
  currentPokemon = 5;
  showElement(triangles[currentPokemon]);
});
onEvent("view1", "click", function(){
  hideElement(sideTriangles[currentPokemon]);
  currentPokemon = 0;
  showElement(sideTriangles[currentPokemon]);
});
onEvent("view2", "click", function(){
  hideElement(sideTriangles[currentPokemon]);
  currentPokemon = 1;
  showElement(sideTriangles[currentPokemon]);
});
onEvent("view3", "click", function(){
  hideElement(sideTriangles[currentPokemon]);
  currentPokemon = 2;
  showElement(sideTriangles[currentPokemon]);
});
onEvent("view4", "click", function(){
  hideElement(sideTriangles[currentPokemon]);
  currentPokemon = 3;
  showElement(sideTriangles[currentPokemon]);
});
onEvent("view5", "click", function(){
  hideElement(sideTriangles[currentPokemon]);
  currentPokemon = 4;
  showElement(sideTriangles[currentPokemon]);
});
onEvent("view6", "click", function(){
  hideElement(sideTriangles[currentPokemon]);
  currentPokemon = 5;
  showElement(sideTriangles[currentPokemon]);
});
//lets you go back to title from the how to play
onEvent("backToTitle", "click", function() {
  if (playing === 0) {
    setScreen("playScreen");
  } else {
    setScreen("walkingScreen");
  }
});
onEvent("backBtnDietCoke", "click", function() {
  setScreen("walkingScreen");
});
//shows you how to play
onEvent("howButton", "click", function() {
  setScreen("howScreen");
  hideElement("pokemonList");
  hideElement("pokemonHide");
  showElement("pokemonListBtn");
});
//lets you see the pokemon
onEvent("viewPokemonButton", "click", function() {
  hideElement("sideTriangle1");
  hideElement("sideTriangle2");
  hideElement("sideTriangle3");
  hideElement("sideTriangle4");
  hideElement("sideTriangle5");
  hideElement("sideTriangle6");
  showElement(sideTriangles[currentPokemon]);
  readRecords("original pokemon", {}, function(records) {
    setImageURL("view1",records[urParty[0]].front);
    healthBar("view1HP", urParty[0], urPartyHealth[0]);
    if (urParty.length >= 2) {
    showElement("view2");
    showElement("view2HP");
    showElement("label11");
    setImageURL("view2",records[urParty[1]].front);
    healthBar("view2HP", urParty[1], urPartyHealth[1]);
    }
    if (urParty.length >= 3) {
    showElement("view3");
    showElement("view3HP");
    showElement("label12");
    setImageURL("view3",records[urParty[2]].front);
    healthBar("view3HP", urParty[2], urPartyHealth[2]);
    }
    if (urParty.length >= 4) {
    showElement("view4");
    showElement("label13");
    showElement("view4HP");
    setImageURL("view4",records[urParty[3]].front);
    healthBar("view4HP", urParty[3], urPartyHealth[3]);
    }
    if (urParty.length >= 5) {
    showElement("view5");
    showElement("view5HP");
    showElement("label14");
    setImageURL("view5",records[urParty[4]].front);
    healthBar("view5HP", urParty[4], urPartyHealth[4]);
    }
    if (urParty.length >= 6) {
    showElement("view6");
    showElement("view6HP");
    showElement("label15");
    setImageURL("view6",records[urParty[5]].front);
    healthBar("view6HP", urParty[5], urPartyHealth[5]);
    }
    setScreen("viewPokemonScreen");
  });
});
//gets you back
onEvent("viewBackBtn", "click", function() {
  setScreen("walkingScreen");
});
//lets you see the list of pokemon
onEvent("pokemonListBtn", "click", function() {
  showElement("pokemonList");
  showElement("pokemonHide");
  hideElement("pokemonListBtn");
});
//hides the list of pokemon
onEvent("pokemonHide", "click", function(){
  hideElement("pokemonList");
  hideElement("pokemonHide");
  showElement("pokemonListBtn");
});
//lets you get out of the faint screen
onEvent("faintBack", "click", function() {
  setScreen("walkingScreen");
  opponent = randomNumber(0,49);
});
//lets you get out of the catch screen
onEvent("catchContinueButton", "click", function() {
  opponent = randomNumber(0,49);
  setScreen("walkingScreen");
});
//lets you get out of the congratulations screen
onEvent("theyFaintContinue", "click", function() {
  setScreen("walkingScreen");
  opponent = randomNumber(0,49);
});
//reveals the high score
onEvent("highScore", "click", function() {
  setScreen("scoreScreen");
  setText("urScoreText", "Your Score: " + score);
  readRecords("high score", {}, function(records) {
    for (var i = 0; i < records.length; i++) {
      if (records[i].score > highScore) {
        highScore = records[i].score;
        highScoreName = records[i].username;
      }
    }
    if (highScore > score) {
      setText("highScoreText", "High Score: " + highScore);
      setText("highScoreOwner", "Owner: " + highScoreName);
      hideElement("uHaveHighScore");
    } else {
      setText("highScoreText", "High Score: " + score);
      setText("highScoreOwner", "Owner: " + userName);
      showElement("uHaveHighScore");
    }
  });
});
//gets you out of the high score screen
onEvent("highScoreBack", "click", function() {
  setScreen("walkingScreen");
});
//replaces the party member that you chose to replace when you catch a 7th pokemon
onEvent("party1", "click", function() {
 replace(0);
});
onEvent("party2", "click", function() {
 replace(1);
});
onEvent("party3", "click", function() {
 replace(2);
});
onEvent("party4", "click", function() {
 replace(3);
});
onEvent("party5", "click", function() {
 replace(4);
});
onEvent("party6", "click", function() {
 replace(5);
});
//shows how to play
onEvent("questionMark", "click", function() {
  setScreen("howScreen");
});
//function that replaces the pokemon that you chose to replace
function replace(index) {
   readRecords("original pokemon", {}, function(records) {
    removeItem(urParty, index);
    insertItem(urParty, index, records[opponent].id-1);
    removeItem(urPartyHealth, index);
    insertItem(urPartyHealth, index, records[opponent].health);
    setScreen("walkingScreen");
    opponent = randomNumber(0,49);
  });
}
//function that adds or removes from your score
function updateScore(amount) {
  score = score + amount;
  setText("scoreText", "score: " + score);
  updateRecord("high score", {id:userNumber, username:getText("username_input"), score:score}, function() {
  });
}
//function that adds or removes from your score
function updateMoney(amount) {
  money = money + amount;
  setText("moneyStoreText","₽: "+money);
  setText("moneyText","₽: "+money); 
}
//function that sets the widths of the health bar in the battles
function healthBar(id, person, whoseHP) {
 readRecords("original pokemon", {}, function(records) {
     setProperty(id, "width", (whoseHP/records[person].health) * 100);
 });
}
