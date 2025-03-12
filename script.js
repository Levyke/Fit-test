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

Beolvas();