//print to dom
const printToDom = (id, text) => {
  document.querySelector(id).innerHTML = text;
}

//update HP
const updateHp = (dinoId, amount) => {
  const dino = dinos.find(dino => dino.id === dinoId);
  if (dino.health + amount > 100) {
    dino.health = 100;
  } else if (amount === 0) {
    dino.health = 0;
  } else {
    dino.health = dino.health + amount;
  }
}

//add dino form
const addDino = (e) => {
  e.preventDefault();
  const newDino = {
    id: new Date(),
    name: e.target.elements.name.value,
    type: e.target.elements.type.value,
    age: e.target.elements.age.value,
    owner: e.target.elements.owner.value,
    adventures: [],
    health: 50,
    imageUrl: e.target.elements.image.value,
    walk: e.target.elements.walk.value
  };
  dinos.push(newDino);
  dinoKennel();
}

// dino kennel cards
const dinoKennel = () => {
  let domString = '';
  for (let i=0; i < dinos.length; i++) {
    if (dinos[i].health > 0) {
    domString += `<div class="card dino-card" id="${dinos[i].id}">
                    <div class="card-img-top">
                      <img class="dino-img ${dinos[i].walk}" src="${dinos[i].imageUrl}" alt="image of ${dinos[i].name}">
                      <img class="cell-bars" src="cell-bars.png">
                      <h3 class="hp"><span class="badge badge-danger">HP ${dinos[i].health}</span></h3>
                    </div>
                  <div class="card-body">
                    <h4 class="card-title">${dinos[i].name} <small class="text-muted"><em>${dinos[i].type}</em></small></h4>
                    <h6><small class="text-muted">Owned by</small> ${dinos[i].owner}</h6>
                    <h6><small class="text-muted">Age:</small> ${dinos[i].age}</h6>
                    <p class="card-text">${dinos[i].name} has been on the following adventures:
                      <ul>`
                      for (let j=0; j < dinos[i].adventures.length; j++) {
                        domString += `<li>${dinos[j].adventures}</li>`
                      }
    domString +=     `</ul>
                    </p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                  </div>
                </div>`
    }
  }
  printToDom("#dino-kennel", domString);
}

const populateForm = () => {
  const owners = [...new Set(dinos.map(x => x.owner))];
  const types = [...new Set(dinos.map(x => x.type))];
  let allTypes = '';
  let allOwners = '';
  for (owner of owners) {
    allOwners += `<option value="${owner}">${owner}</option>`
  }
  for (type of types) {
    allTypes += `<option value="${type}">${type}</option>`
  }
  printToDom("#owner", allOwners);
  printToDom("#type", allTypes);
}

const listeners = () => {
  document.getElementById("add-dino-form").addEventListener('submit', addDino);
}

// init
const init = () => {
  dinoKennel();
  populateForm();
  listeners();
}

init();
