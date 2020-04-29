//Budget controller
var budgeController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: function (type, des, val) {
      var newItem, ID;

      // create new id
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      // create new item based on inc or exp
      if (type === "exp") {
        newItem = new Expense(ID, des, val);
      } else if ((type = "inc")) {
        newItem = new Income(ID, des, val);
      }
      data.allItems[type].push(newItem);
      return newItem;
    },
    testing: function () {
      console.log(data);
    },
  };
})();

// ui controller
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
  };
  //some code
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// global app controller
var controller = (function (budgeCtr, UICtr) {
  var setupEventListener = function () {
    var DOM = UICtr.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrAddItem);

    document.addEventListener("keypress", function (event) {
      // console.log(event);
      if (event.keyCode === 13 || event.which === 13) {
        ctrAddItem();
      }
    });
  };

  var ctrAddItem = function () {
    var input, newItem;
    // 1. Get the field input data
    input = UICtr.getInput();

    // 2. Add the item to the budget controller
    newItem = budgeCtr.addItem(input.type, input.description, input.value);
    // 3. Add the item to the UI
    // 4. Calculate the budget
    // 5. Display the budget on the UI
  };

  return {
    init: function () {
      console.log("Application has started");
      setupEventListener();
    },
  };
})(budgeController, UIController);

controller.init();
