//print to dom
const printToDom = (id, text) => {
  document.querySelector(id).innerHTML = text;
}

// dino kennel cards
const dinoKennel = () => {
  let domString = '';
  for (let i=0; i < dinos.length; i++) {
    if (dinos[i].health > 0) {
    domString += `<div class="card" id="${dinos[i].id}">
                  <img class="card-img-top" src="${dinos[i].imageUrl}" alt="image of ${dinos[i].name}">
                  <div class="badge badge-danger hp">HP<br>${dinos[i].health}</div>
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

// init
const init = () => {
  dinoKennel();
}

init();
