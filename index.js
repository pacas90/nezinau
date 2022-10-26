const urlInput = document.querySelector("#url-input");
const urlButton = document.querySelector("#open-url-btn");
urlButton.onclick = () => {
    let url = urlInput.value;
    url = url.slice(-18, -10);
    let newUrl = "https://klase.eduka.lt/api/student/quiz-templates/result-xml/" + url + "/sprendimas";
    window.open(newUrl);
} 

const xmlTextBox = document.querySelector("#testo-xml");
const processXMLbtn = document.querySelector("#process-xml-btn");

processXMLbtn.onclick = () => processXML(xmlTextBox.value);

function processXML(val) {
    let xml = val.slice(113);
    let parser = new DOMParser();
    let XMLdoc = parser.parseFromString(xml, "text/xml");
    
    let questions = XMLdoc.querySelectorAll("text[draggable],[math],[isActivity]");
    let data = [];
    let j = 0;
    for(let i = 0; i < questions.length; i++) {
        let q = questions[i].textContent;
        if(!q.includes("Užduoties lygis") && !q.includes("Rodyti atsakymus") && q !== "") {
            data[j] = {
                question: j+1
            }
            j++;
        }
    }

    let answers = XMLdoc.querySelectorAll("option");
    let b = 0;
    for(let k = 0; k < answers.length; k++) {
        if(answers[k].getAttribute("value") == 1) {
            data[b].answer = answers[k].children[0].textContent; 
            b++;
        }
    }

    const outputParagraph = document.querySelector("#output");
    outputParagraph.innerHTML = "";
    for(let l = 0; l < data.length; l++) {
        outputParagraph.innerHTML += `<br>` + data[l].question + ". " + data[l].answer;
    }
}

