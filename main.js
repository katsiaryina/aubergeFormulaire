document.getElementById("submit").addEventListener("click", submitForm);
function submitForm() {
  // Get client info
  const clientName = document.getElementById("name").value;
  const company = document.getElementById("company").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const eventDate = document.getElementById("eventDate").value;
  const eventLocation = document.getElementById("eventLocation").value;
  const guestNum = document.getElementById("guestNum").value;

  // Get choices array
  const chosenSandwiches = getChoices("choice");
  const chosenSalads = getChoices("saladChoice");

  // Get cost
  const cost = setTotalCost();

  const data = {
    clientName: clientName,
    company: company,
    phone: phone,
    email: email,
    eventDate: eventDate,
    eventLocation: eventLocation,
    guestNum: guestNum,
    chosenSandwiches: chosenSandwiches,
    chosenSalads: chosenSalads,
    cost: cost,
  };
  console.log(data);

  // Send Ajax request to the server
  AjaxSend(data);
}

// Add even Listener to number of guests input
const guestInput = document.getElementById("guestNum");
guestInput.addEventListener("input", setTotalCost);

// Add event Listeners to sandwich checkboxes
const sandwichList = document.getElementsByName("choice");
sandwichList.forEach(function (element) {
  element.addEventListener("click", function () {
    handleCheckboxClick("choice", 2);
  });
});

// Add event Listeners to salade checkboxes
const saladList = document.getElementsByName("saladChoice");
saladList.forEach(function (element) {
  element.addEventListener("click", function () {
    handleCheckboxClick("saladChoice", 3);
  });
});

// Add event Listeners to desert checkboxes
const desertList = document.getElementsByName("desertChoice");
desertList.forEach(function (element) {
  element.addEventListener("click", function () {
    handleCheckboxClick("desertChoice", 1);
  });
});

// Add event Listeners to Accompagnement checkboxes
const accompagnementList = document.getElementsByName("AccompagnementChoice");
accompagnementList.forEach(function (element) {
  element.addEventListener("click", function () {
    handleCheckboxClick("AccompagnementChoice", 1);
  });
});

function handleCheckboxClick(inputName, maxChoices) {
  const checkboxList = document.getElementsByName(inputName);

  // Get sandwich choices (array)
  const choiceArray = getChoices(inputName);

  // Enable all checkboxes
  checkboxList.forEach(function (element) {
    element.disabled = false;
  });

  // Disable checkboxes when checked more than maxChoices
  if (choiceArray.length >= maxChoices) {
    checkboxList.forEach(function (element) {
      if (!element.checked) {
        element.disabled = true;
      }
    });
  }

  setTotalCost();
}

function getChoices(inputName) {
  const checkboxList = document.getElementsByName(inputName);
  const choiceArray = [];
  checkboxList.forEach(function (element) {
    if (element.checked) {
      choiceArray.push(element.value);
    }
  });
  return choiceArray;
}

// Calculate sandwich cost
function calculateCost(inputName) {
  const guestNum = document.getElementById("guestNum").value;
  const choiceArray = getChoices(inputName);

  let cost = 0;
  if (choiceArray.length === 2) {
    cost = guestNum * 2.5;
  } else if (choiceArray.length === 1) {
    cost = guestNum * 2;
  }

  return cost;
}

// Calculate salad cost
function calculateSaladCost() {
  const guestNum = document.getElementById("guestNum").value;
  const choiceArray = getChoices("saladChoice");

  let cost = 0;
  if (choiceArray.length === 3) {
    cost = guestNum * 2.5;
  } else if (choiceArray.length === 2) {
    cost = guestNum * 2;
  } else if (choiceArray.length === 1) {
    cost = guestNum * 1.5;
  }
  return cost;
}

// Calculate accompagnement cost
function calculateAccompagnementCost() {
  const guestNum = document.getElementById("guestNum").value;
  const choiceArray = getChoices("AccompagnementChoice");

  let cost = 0;

  const costs = {
    marinade: 1.25,
    trempette: 2.0,
    poisson: 2.5,
    fin: 3.5,
  };

  choiceArray.forEach(function (item) {
    cost += costs[item];
  });

  return cost * guestNum;
}

// Calculate desert cost
function calculateDesertCost() {
  const guestNum = document.getElementById("guestNum").value;
  const choiceArray = getChoices("desertChoice");

  const desert = choiceArray[0];
  // desert -is a string

  const costs = {
    desertDuJour: 2.5,
    biscuits: 2.5,
    dessertsVaries: 3,
    poudingChomeur: 3.5,
    pouding: 3.5,
  };

  let cost = guestNum * costs[desert];

  if (costs[desert] === undefined) {
    return 0;
  }
  return cost;
}

// Set Total Cost
function setTotalCost() {
  const cost =
    calculateCost("choice") +
    calculateSaladCost() +
    calculateDesertCost() +
    calculateAccompagnementCost();
  const price = document.getElementById("price");
  price.textContent = `Le prix approximatif est $${cost}`;
  return cost;
}

function AjaxSend(data) {
  var url = "./post-form.php";
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    let result = JSON.parse(this.response);
    console.log(result);
  };
  xhr.send(JSON.stringify(data));
}
