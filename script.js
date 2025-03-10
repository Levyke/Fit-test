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
        <h1>${element.question}</h1>
        <input name="valasz" type="radio" id="a">
        <label for="a" value="a">${element.answerA}</label><br>
        <input name="valasz" type="radio" id="b">
        <label for="b" value="b">${element.answerB}</label><br>
        <input name="valasz" type="radio" id="c">
        <label for="c" value="c">${element.answerC}</label><br>
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