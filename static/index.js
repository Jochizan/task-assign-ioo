const d = document;
const $buttonChangeArray = d.querySelector('#buttonChangeArray')
const $buttonSendArray = d.querySelector('#buttonSendArray')

let initArray = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
let n = 3;

function resizeInput() {
    this.style.width = this.value.length <= 2 ? "3.2rem" : this.value.length + 4 + "ch";
}

function changeArray() {

    n = d.getElementById('valueChange').value;

    if (n > 12) return alert("Error");
    if (n <= 0) return alert("Error");

    let $html = "";
    const $section = d.querySelector('.insert-html');
    for (let i = 0; i < n; i++) {
        let $fragment = "<div class='py-4 flex justify-around'>";
        for (let j = 0; j < n; j++) {
            $fragment += ` 
                <input class="is bg-gray-200 appearance-none border-2 border-gray-200 rounded w-12 h-12 py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
                       value="0" type="number" id="${i}+${j}" />
`
        }
        $fragment += "</div>";
        $html += $fragment;
    }

    initArray = []

    for (let i = 0; i < n; i++) {
        initArray.push([])
        for (let j = 0; j < n; j++) {
            initArray[i][j] = 0;
        }
    }

    console.log(initArray)
    $section.innerHTML = $html;
    addWidthInput();
}

async function sendArray() {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let value = d.getElementById(`${i}+${j}`).value;
            initArray[i][j] = value === '' ? 0 : value;
        }
    }

    const res = await fetch('/api/task_assignment', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(initArray)
    })

    const data = await res.json();
    console.log(data)
    const $answer = d.getElementById("answer");

    $answer.innerText = `El mínimo costo es ${data.min_cost} obteniendose con ${data.best_solution}`

}

$buttonChangeArray.addEventListener('click', changeArray)
$buttonSendArray.addEventListener('click', sendArray)

function addWidthInput() {
    const $inputs = d.querySelectorAll('.is');

    $inputs.forEach((el) => {
        el.addEventListener('input', resizeInput)
        resizeInput.call(el)
    })
}

addWidthInput();