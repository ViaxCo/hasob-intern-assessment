// Element selectors
const body = document.querySelector("body");
const main = document.querySelector("main");
const form = document.querySelector("form");
const ol = document.querySelector("ol");
const btnDiv = document.querySelector(".btn-div");
const button = document.querySelector("button");

form.addEventListener("submit", e => {
  e.preventDefault();

  // Answer element selectors
  const checkedRadio = document.querySelector("input[type=radio]:checked");
  const select = document.querySelector("select");
  const checkboxNodeList = document.querySelectorAll(
    "input[type=checkbox]:checked"
  );
  const checkboxesArray = Array.from(checkboxNodeList);
  const email = document.querySelector("#email");

  // Check if radio or checkboxes were checked
  if (checkedRadio === null || checkboxesArray.length === 0) {
    alert("Please complete the form");
  } else {
    // Create JSON oject as regular Javascript object
    const obj = {
      1: {
        question: document.querySelector("#q1").textContent,
        answer: checkedRadio.value.capitalize(),
      },
      2: {
        question: document.querySelector("#q2").textContent,
        answer: select.value,
      },
      3: {
        question: document.querySelector("#q3").textContent,
        answer: checkboxesArray.map(checkbox => checkbox.value.capitalize()),
      },
      4: {
        question: document.querySelector("#q4").textContent,
        answer: email.value,
      },
    };
    // Convert object to JSON
    const jsonData = JSON.stringify(obj, undefined, 4);
    // Hide form
    ol.style.display = "none";
    btnDiv.style.display = "none";
    form.classList.add("show-json");
    // Create <pre> element to hold the JSON data
    const pre = document.createElement("pre");
    // Add the JSON data to the <pre> element with the syntax highlightin function
    pre.innerHTML = syntaxHighlight(jsonData);
    // Append the <pre> element to the form
    form.appendChild(pre);
  }
});

// Function to add syntax highlighting to the JSON data
const syntaxHighlight = json => {
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
};

// Capitalize function for first letter of string
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
