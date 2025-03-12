let kerdesek = [];
let index = 0;
let pont = 0;

let kezdesId = document.getElementById("kezdes");
let tesztId = document.getElementById("teszt");
let indit = document.getElementById("inditBtn");
let tovabb = document.getElementById("tovabbBtn");
let eredmeny = document.getElementById("eredmenyBtn");

kezdesId.style.display = "block";
tesztId.style.display = "none";

indit.addEventListener('click', Indit);
tovabb.addEventListener('click', Tovabb);

eredmeny.style.display = "none";
tovabb.disabled = false;

function Indit()
{
    kezdesId.style.display = "none";
    tesztId.style.display = "block";
}

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
        <input name="valasz" type="radio" id="a" value="a">
        <label for="a" value="a">${element.answerA}</label><br>
        <input name="valasz" type="radio" id="b" value="b">
        <label for="b" value="b">${element.answerB}</label><br>
        <input name="valasz" type="radio" id="c" value="c">
        <label for="c" value="c">${element.answerC}</label><br>
    </section>`;
}

function Tovabb()
{
    let valasztott = document.querySelector('input[name="valasz"]:checked');
    if (index < kerdesek.length - 1)
    {
        index++;
        Adatok(kerdesek[index]);
    }
    else
    {
        eredmeny.style.display = "block";
    }

    if (valasztott != null)
    {
        let valasz = valasztott.value;
        if (valasz == "a")
        {
            pont += parseInt(kerdesek[index].answerAPoint);
        }
        else if (valasz == "b")
        {
            pont += parseInt(kerdesek[index].answerBPoint);
        }
        else if (valasz == "c")
        {
            pont += parseInt(kerdesek[index].answerCPoint);
        }
        console.log(valasz)
    }
    console.log(pont)
}

Beolvas();