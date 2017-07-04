// Ivan Martinez Laborda - Mini-Proyecto de la Sesión 4 del precurso de SkyLab Coders Academy (Promoción Julio 2017)
// >>>Skylab Pasapalabra<<<

var userName;
var gameState = 'playing';
var currentLetter = 0;
var successCounter = 0;
var failureCounter = 0;
var playersScores = [];
var backCount = 129;
var downCount;
var timerUpdater;


//Array de objetos con las distintas preguntas y respuestas
var questions = [
    { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
    { letter: "b", answer: "bingo", status: 0, question: ("CON LA B. Juego que ha sacado de quicio a todos los 'Skylabers' en las sesiones de precurso") },
    { letter: "c", answer: "churumbel", status: 0, question: ("CON LA C. Niño, crío, bebé") },
    { letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
    { letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
    { letter: "f", answer: "facil", status: 0, question: ("CON LA F. Que no requiere gran esfuerzo, capacidad o dificultad") },
    { letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
    { letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
    { letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
    { letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
    { letter: "k", answer: "kamikaze", status: 0, question: ("CON LA K. Persona que se juega la vida realizando una acción temeraria") },
    { letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
    { letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
    { letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
    { letter: "ñ", answer: "señal", status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
    { letter: "o", answer: "orco", status: 0, question: ("CON LA O. Humanoide fantástico de apariencia terrible y bestial, piel de color verde creada por el escritor Tolkien") },
    { letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
    { letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
    { letter: "r", answer: "raton", status: 0, question: ("CON LA R. Roedor") },
    { letter: "s", answer: "stackoverflow", status: 0, question: ("CON LA S. Comunidad salvadora de todo desarrollador informático") },
    { letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
    { letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
    { letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
    { letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
    { letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
    { letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
    { letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
]

//Mensaje de inicio
function init() {
  refreshGame();
  document.getElementById('display').innerHTML = '<h2>Skylab Pasapalabra</h2>'+ '<br>' + 'Ivan Martinez Laborda';
  document.getElementById('rankButUnpushed').style.display = 'none';
  document.getElementById('exitBut').style.display = 'none';
  document.getElementById('marker').style.display = 'none';
  playersScores = [];
}
init();

//Reiniciar variables y contadores para una nueva partida
function refreshGame() {
  document.getElementById('userInput').placeholder = 'introduce tu nombre';
  document.getElementById('userInput').value = '';
  currentLetter = 0;
	successCounter = 0;
	failureCounter = 0;

  backCount = 129;

  var nodes = document.getElementById('lettersCircle').getElementsByClassName('letter');
  for(var i = 0; i<nodes.length; i++) {
    nodes[i].style.backgroundColor = '#107FC9';
}

	questions.forEach(function(key) {
		key.status = 0;
	})
}

//Función comenzar partida playPasapalabra()
function playPasapalabra() {
  refreshGame();
  document.getElementById('userInput').style.visibility = 'visible';
  document.getElementById('startBut').style.display = 'none';
  document.getElementById('rankButUnpushed').style.display = 'none';
  document.getElementById('exitBut').style.display = 'none';
  document.getElementById('userInput').style.display = 'block';
  document.getElementById('sendNameBut').style.display = 'block';
  document.getElementById('display').innerHTML = '¿Cómo te llamas?';
  document.getElementById('marker').style.display = 'none';
}


//Función saveName
function saveName() {
  userName = document.getElementById('userInput').value;
  document.getElementById('display').innerHTML = '';
  document.getElementById('sendNameBut').style.display = 'none';
  document.getElementById('sendAnswBut').style.display = 'inline-block';
  document.getElementById('pasBut').style.display = 'inline-block';
  document.getElementById('endBut').style.display = 'inline-block';
  document.getElementById('userInput').value = '';
  document.getElementById('userInput').placeholder = 'introduce respuesta';
  document.getElementById('marker').style.display = 'block';
  wordLauncher();
  timerFunc();
  document.getElementById('succMarker').innerHTML = successCounter;
}

//Función timerFunc()
function timerFunc() {
  document.getElementById('timer').innerHTML = backCount;

  downCount = setTimeout(function(){
    endGame();
    stopTimerUpdater();
    stopDownCount();
  }, 130000);

  timerUpdater = setInterval(function(){
    backCount--;
    document.getElementById('timer').innerHTML = backCount;
  }, 1000);
}

//Funcion stopDownCount()
function stopDownCount() {
  clearTimeout(downCount);
}

//Funcion stopTimerUpdater()
function stopTimerUpdater() {
  clearInterval(timerUpdater);
}

//Función lanzadora de preguntas
function wordLauncher() {
  if (questions[currentLetter].status === 0) {
    document.getElementById('userInput').style.visibility = 'visible';
    document.getElementById('display').innerHTML = questions[currentLetter].question;
    document.getElementById('sendAnswBut').style.display = 'inline-block';
    document.getElementById('pasBut').style.display = 'inline-block';
  } else {
    checkGame();
  }
}

//Function checkeadora de respuestas
function checkAnswer() {
  userAnswer = document.getElementById('userInput').value;
  userAnswer = userAnswer.toLocaleLowerCase();
  if (userAnswer === questions[currentLetter].answer) {
    questions[currentLetter].status = 1;
    document.getElementById('display').innerHTML = '¡Correcto!';
    var currentDiv = questions[currentLetter].letter + 'Let';
    document.getElementById(currentDiv).style.backgroundColor = '#00DA3C';
    successCounter++;
    document.getElementById('succMarker').innerHTML = successCounter;

  } else {
    questions[currentLetter].status = 2;
    document.getElementById('display').innerHTML = 'Lo sentimos, la respuesta correcta es: ' + questions[currentLetter].answer;
    var currentDiv = questions[currentLetter].letter + 'Let';
    document.getElementById(currentDiv).style.backgroundColor = '#FF003C';
    failureCounter++;
  }
  document.getElementById('userInput').style.visibility = 'hidden';
  document.getElementById('sendAnswBut').style.display = 'none';
  document.getElementById('pasBut').style.display = 'none';
  document.getElementById('continBut').style.display = 'inline-block';
}

//Function nextQuestion;
function nextQuestion() {
  if (currentLetter < 26) {
    currentLetter++;
    document.getElementById('userInput').value = '';
    wordLauncher();
  } else {
    checkGame();
  }
  document.getElementById('continBut').style.display = 'none';
}

//funcíon pasaPalabra
function pasaPalabra() {
  if (currentLetter < 26) {
    currentLetter++;
    document.getElementById('userInput').value = '';
    wordLauncher();
  } else {
    checkGame();
  }
}

//Función checkeadora de situación de Juego
function checkGame() {
  if (successCounter + failureCounter > 26) {
    endGame();
  } else if (currentLetter < 26) {
    currentLetter++;
    wordLauncher();
  } else {
    currentLetter = 0;
    wordLauncher();
  }
}

//Función juego acabado
function endGame() {
  userRank();
  stopDownCount();
  stopTimerUpdater();
  document.getElementById('display').innerHTML = userName + ', el juego ha terminado. Has acertado ' + successCounter + ' preguntas y has fallado ' + failureCounter + ' preguntas' + '<br>' + '¿Alguien más quiere intentarlo?';
  document.getElementById('startBut').style.display = 'inline-block';
  document.getElementById('userInput').style.visibility = 'hidden';
  document.getElementById('sendAnswBut').style.display = 'none';
  document.getElementById('continBut').style.display = 'none';
  document.getElementById('pasBut').style.display = 'none';
  document.getElementById('endBut').style.display = 'none';
  document.getElementById('rankButUnpushed').style.display = 'inline-block';
  document.getElementById('exitBut').style.display = 'inline-block';
}

//Función creadora de objetos nombre/puntuación
function ScoreLogger(name, totalScore) {
	this.name = name;
	this.totalScore = totalScore;
	this.showUserScore = function() {
		alert(this.name + ': ' + successCounter + 'aciertos!')
	}
	playersScores.push(this);
}

//Añadiendo al ranking
function userRank() {
	new ScoreLogger(userName, successCounter);
}

//Mostrar ranking
function showRank() {
  document.getElementById('rankButUnpushed').style.display = 'none';
  document.getElementById('rankButPushed').style.display = 'inline-block';
  document.getElementById('startBut').style.display = 'none';
  document.getElementById('exitBut').style.display = 'none';
  document.getElementById('display').innerHTML = '<h3>Ranking global </h3>';
	playersScores.sort(function (a, b) {
		return Number(b.totalScore) - Number(a.totalScore);
	});
	playersScores.forEach(function(key) {
    document.getElementById('display').insertAdjacentHTML('beforeend', key.name + ' - ' + key.totalScore + ' aciertos!');
    document.getElementById('display').insertAdjacentHTML('beforeend', '<br>');
	})
}

//Esconder ranking
function hideRank() {
  document.getElementById('display').innerHTML = userName + ', el juego ha terminado. Has acertado ' + successCounter + ' preguntas y has fallado ' + failureCounter + ' preguntas' + '\n' + '¿Alguien más quiere intentarlo?';
  document.getElementById('rankButPushed').style.display = 'none';
  document.getElementById('startBut').style.display = 'inline-block';
  document.getElementById('userInput').style.visibility = 'hidden';
  document.getElementById('sendAnswBut').style.display = 'none';
  document.getElementById('continBut').style.display = 'none';
  document.getElementById('pasBut').style.display = 'none';
  document.getElementById('endBut').style.display = 'none';
  document.getElementById('rankButUnpushed').style.display = 'inline-block';
  document.getElementById('exitBut').style.display = 'inline-block';
}
