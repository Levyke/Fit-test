let kezdesId = document.getElementById("kezdes");
let tesztId = document.getElementById("teszt");
let indit = document.getElementById("inditBtn");
let tovabb = document.getElementById("tovabbBtn");

kezdesId.style.display = "block";
tesztId.style.display = "none";

indit.addEventListener('click', Indit);
function Indit()
{
    kezdesId.style.display = "none";
    tesztId.style.display = "block";
}

let kerdesek = [];
let index = 0;
function Beolvas()
{
    fetch("teszt.json")
    .then(response => response.json())
    .then(data => {
        kerdesek = data.Questions;
        Adatok(kerdesek[index]);
        console.log(kerdesek);
    })
}

function Adatok(element)
{
    let kerdes = document.getElementById("kerdes");
    kerdes.innerHTML = "";
    kerdes.innerHTML +=
    `<section>
        <h1>${element.question}</h1><br>
        <label name="valasz" for="a" value="a">${element.answerA}</label>
        <input type="radio" id="a"><br>
        <label name="valasz" for="b" value="b">${element.answerB}</label>
        <input type="radio" id="b"><br>
        <label name="valasz" for="c" value="c">${element.answerC}</label>
        <input type="radio" id="c">
    </section>`;
}

tovabb.addEventListener('click', Tovabb)
function Tovabb()
{
    if (index < kerdesek.length - 1)
    {
        index++;
        Adatok(kerdesek[index]);
    }
    else
    {
        tovabb.enabled = true;
    }
}

Beolvas();