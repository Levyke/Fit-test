let kerdesek = [];
let index = 0;
let pont = 0;

let kezdesId = document.getElementById("kezdes");
let tesztId = document.getElementById("teszt");
let indit = document.getElementById("inditBtn");
let tovabb = document.getElementById("tovabbBtn");
let eredmeny = document.getElementById("eredmenyBtn");
let modal = document.getElementById("model");
let ujTeszt = document.getElementById("ujBtn");
let tanacs = document.getElementById("tanacs");

kezdesId.style.display = "block";
tesztId.style.display = "none";
indit.addEventListener('click', Indit);
tovabb.addEventListener('click', Tovabb);
ujTeszt.addEventListener('click', Ujra);
eredmeny.addEventListener('click', Eredmeny);
eredmeny.style.display = "none";
modal.style.display = "none";

eredmeny.style.display = "none";

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
    })
}

function RadioEsemenyfigyelo() 
{
    let radioGombok = document.querySelectorAll('input[name="valasz"]');
    radioGombok.forEach(radio => {
        radio.addEventListener('change', Tilt);
    });
}

function Adatok(element)
{
    let kerdes = document.getElementById("kerdes");
    kerdes.innerHTML = "";
    kerdes.innerHTML +=
    `<section>
        <img src="img/${element.image}" alt="${element.image}">
        <h1>${element.question}</h1>
        <input name="valasz" type="radio" id="a" value="a">
        <label for="a" value="a">${element.answerA}</label><br>
        <input name="valasz" type="radio" id="b" value="b">
        <label for="b" value="b">${element.answerB}</label><br>
        <input name="valasz" type="radio" id="c" value="c">
        <label for="c" value="c">${element.answerC}</label><br>
    </section>`;

    RadioEsemenyfigyelo();
    tovabb.disabled = true
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
            pont += parseInt(kerdesek[index - 1].answerAPoint);
        }
        else if (valasz == "b")
        {
            pont += parseInt(kerdesek[index - 1].answerBPoint);
        }
        else if (valasz == "c")
        {
            pont += parseInt(kerdesek[index - 1].answerCPoint);
        }
    }
}

function Eredmeny()
{
    let elertPont = document.getElementById("elertPont");
    let eredmenySzoveg = document.getElementById("eredmenySzoveg");
    let tanacs = document.getElementById("tanacs");
    modal.style.display = "block";
    tesztId.style.display = "none";
    if (pont <= 21)
    {
        elertPont.innerHTML = pont + " pontot értél el a tesztben";
        eredmenySzoveg += "Gratulálunk, te tudod, hogy kell igazán egészségesen élni. Ami nagyon fontos, hogy továbbra is figyelj oda a megfelelő hidratálásra és a rostbevitelre. Ha még nem próbáltad, akkor itt az ideje kipróbálni az alternatív fehérje megoldásokat is. Szuper egészséges és finom tud lenni. Egyre vigyázz, azért ne hajtsd túl magad. ;)";
    }
    else if (pont <= 30)
    {
        elertPont.innerHTML = pont + " pontot értél el a tesztben";
        eredmenySzoveg.innerHTML = "Jó úton jársz, de még van mit javítani az étkezéseden. Figyelj a rost és a megfelelő fehérje bevitelre (hal, pulyka vagy csirke legyen a fő és a hüvelyes zöldségek). Nézz utána a mediterrán étrendnek, a tested meg fogja hálálni. A nassolást, amennyire lehet, mellőzd. A nyugodt alváshoz pedig elengedhetetlen a jó környezet, a sötét szoba. Nyugi, nincs szörny az ágy alatt. ;)";
        
        tanacs.innerHTML = "Légy tudatos, egy életünk van. Javasoljuk, hogy a gyorsan felszívódó szénhidrátokat (vagy épp a szupergyorsan felszívódókat) -mint a nassok, sütemények, krumpli, rizs- cseréld lassan felszívódó szénhidrátokra – basmati rizs, hajdina, köles, kuszkusz- és fogyassz elég folyadékot. Minden nap legalább egy 4km-es távot sétálj le gyorssétával. Ha azt érzed, hogy nehézkes az alvás, akkor lefekvés előtt egy 30 perccel már ne nézz tv-t és ne használd a telefonodat sem. Így nyugodtabb lesz az alvásod és másnap nem kelsz fáradtan, ami miatt amúgy összezabálsz mindent.";
    }
    else
    {
        elertPont.innerHTML = pont + " pontot értél el a tesztben";
        eredmenySzoveg.innerHTML = "Ajjaj, nagy a baj. Nem figyelsz az étkezésedre. Ha ezen nem változtatsz, komoly egészségügyi következményei is lehetnek (mint a cukorbetegség, a magas vérnyomás vagy a korai csontritkulás).";

        tanacs.innerHTML = "Légy tudatos, egy életünk van. Javasoljuk, hogy a gyorsan felszívódó szénhidrátokat (vagy épp a szupergyorsan felszívódókat) -mint a nassok, sütemények, krumpli, rizs- cseréld lassan felszívódó szénhidrátokra – basmati rizs, hajdina, köles, kuszkusz- és fogyassz elég folyadékot. Minden nap legalább egy 4km-es távot sétálj le gyorssétával. Ha azt érzed, hogy nehézkes az alvás, akkor lefekvés előtt egy 30 perccel már ne nézz tv-t és ne használd a telefonodat sem. Így nyugodtabb lesz az alvásod és másnap nem kelsz fáradtan, ami miatt amúgy összezabálsz mindent.";
    }
}


function Ujra()
{
    modal.style.display = "none";
    kezdesId.style.display = "block";
    tesztId.style.display = "none";
    eredmeny.style.display = "none";
    tovabb.style.display = "block";
    pont = 0;
    index = 0;
    Beolvas();
}

function Tilt()
{
    let valasztott = document.querySelector('input[name="valasz"]:checked');
    if (valasztott != null)
    {
        tovabb.disabled = false
    }
}
Beolvas();