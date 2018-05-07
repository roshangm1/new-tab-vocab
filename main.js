const GRE_VOCABULARY_ENDPOINT = `https://gre.economist.com/gre-vocabulary.json`;

async function main() {
  let words;
  if (localStorage.GRE_VOCABULARY) {
    words = JSON.parse(localStorage.GRE_VOCABULARY);
  } else {
    const res = await fetch(GRE_VOCABULARY_ENDPOINT, {
      headers: { accept: "application/json" }
    });
    words = await res.json();

    // Cache for later
    localStorage.GRE_VOCABULARY = JSON.stringify(words);
  }

  let { word, pronunciation, definition, passage, partOfSpeech } = words[
    Math.floor(Math.random() * words.length)
  ];

  // Some words contain newlines for some reason
  word = word.trim();

  // Remove whitespace and empasize current word
  passage = passage.trim().replace(new RegExp(`(${word}[a-z]*)`, "gi"), "$1");

  //old node with loading screen
  var oldVocab = document.getElementsByClassName("vocab")[0];

  //new parent node vocab
  var vocab = document.createElement("div");
  vocab.className = "vocab";

  //word node
  var vocabWord = document.createElement("h1");
  vocabWord.className = "vocab__word";
  var textWord = document.createTextNode(word);
  vocabWord.appendChild(textWord);

  //hr node
  var hr = document.createElement("hr");
  hr.className = "vocab__hr";

  //passage node
  var vocabPassage = document.createElement("blockquote");
  vocabPassage.className = "vocab__passage";
  var textPassage = document.createTextNode(`${passage}`);
  vocabPassage.appendChild(textPassage);

  //definition node
  var vocabDef = document.createElement("p");
  vocabDef.className = "vocab__definition";
  var textDef = document.createTextNode(`${pronunciation} [${partOfSpeech}] - ${definition}
  `);
  vocabDef.appendChild(textDef);

  //appending dom elements in parent node
  vocab.appendChild(vocabWord);
  vocab.appendChild(hr);
  vocab.appendChild(vocabPassage);
  vocab.appendChild(vocabDef);

  //replace oldVocab screen with new
  document.body.replaceChild(vocab, oldVocab);
}

main();
