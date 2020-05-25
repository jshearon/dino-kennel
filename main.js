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

//process dino form
const addDino = (e) => {
  e.preventDefault();
  const input = e.target.elements;
  const newDino = {
    id: new Date(),
    name: input.name.value,
    type: input.type.value,
    age: input.age.value,
    owner: input.owner.value,
    adventures: [],
    health: 50,
    imageUrl: input.image.value,
    walk: input.walk.value
  };
  $('#add-dino').collapse('hide');
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
                    <div class="d-flex justify-content-between">
                      <button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Feed ${dinos[i].name}"><i class="fas fa-cookie-bite fa-2x"></i></button>
                      <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="top" title="Send ${dinos[i].name} to Hostpital"><i class="fas fa-hospital fa-2x"></i></button>
                      <button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Pet ${dinos[i].name}"><i class="fas fa-hand-paper fa-2x"></i></button>
                      <button type="button" class="btn btn-success" data-toggle="tooltip" data-placement="top" title="Send ${dinos[i].name} on an Advenure"><i class="fas fa-suitcase fa-2x"></i></button>
                    </div>    
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

// show tootips
$(document).ready(function() {
  $("body").tooltip({ selector: '[data-toggle=tooltip]' });
});

const init = () => {
  dinoKennel();
  populateForm();
  listeners();
}

init();
