const content = document.querySelector(".content");
const inputField = document.querySelector("#inputField");
const inputButton = document.querySelector("#inputButton");
console.log(inputButton);
const clearButton = document.querySelector("#clearButton");
const row = document.querySelector(".row");

function translit(text) {
  let result = "";
  let letters = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "h",
    ц: "c",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ь: "'",
    ы: "y",
    ъ: "",
    э: "e",
    ю: "yu",
    я: "ya",

    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "E",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "H",
    Ц: "C",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sch",
    Ь: "'",
    Ы: "Y",
    Ъ: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",

    "!": "!",
    "?": "?",
    ".": ".",
    ",": ",",
    "-": "-",
    " ": " ",
  };

  for (var i = 0; i < text.length; ++i) {
    if (letters[text[i]] === undefined) {
      result = "";
    } else {
      result += letters[text[i]];
    }
  }

  return result;
}

function addRow() {
  const newRow = document.createElement("div");
  const index = document.createElement("span");
  const ru = document.createElement("div");
  const tr = document.createElement("div");

  const rowCross = document.createElement("button");
  rowCross.className = "rowCross";

  const image = document.createElement("img");
  image.src = "./icons/Cross.svg";

  rowCross.appendChild(image);

  newRow.className = "row";
  newRow.style.cssText = `
    border-top: 1px solid #111111;
  `;

  index.className = "index";
  const allIndexes = document.querySelectorAll(".index");
  index.innerText = allIndexes.length + 1;

  if (inputField.value.length === 0) {
    return 0;
  }
  // Добавление подсказки
  if (inputField.value.length > 7) {
    const tooltip_ru = document.createElement("div");
    tooltip_ru.className = "tooltip";
    tooltip_ru.innerText = inputField.value;

    const tooltip_tr = document.createElement("div");
    tooltip_tr.className = "tooltip";
    tooltip_tr.innerText = translit(inputField.value);

    ru.innerText = inputField.value.slice(0, 7) + "...";
    ru.append(tooltip_ru);

    tr.innerText = `${translit(inputField.value).slice(0, 7)}...`;
    tr.append(tooltip_tr);

    ru.addEventListener("mouseover", () => {
      tooltip_ru.style.display = "block";
    });

    ru.addEventListener("mouseout", () => {
      tooltip_ru.style.display = "none";
    });

    tr.addEventListener("mouseover", () => {
      tooltip_tr.style.display = "block";
    });

    tr.addEventListener("mouseout", () => {
      tooltip_tr.style.display = "none";
    });
  } else {
    ru.innerText = inputField.value;
    tr.innerText = translit(inputField.value);
  }

  ru.className = "ru";
  ru.prepend(index);

  tr.className = "tr";

  newRow.append(ru, tr, rowCross);
  content.append(newRow);

  rowCross.addEventListener("click", () => {
    const divToRemove = index.parentNode.parentNode;
    divToRemove.remove();

    const allIndexes = document.querySelectorAll(".index");
    allIndexes.forEach((element, index) => {
      element.innerText = index + 1;
    });
  });

  inputField.value = "";
}

inputButton.addEventListener("click", addRow);

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addRow();
  }
});

clearButton.addEventListener("click", () => {
  window.location = "/";
});
