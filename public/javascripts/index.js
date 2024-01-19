// getting elements fron form and table
var form = document.getElementById("user-form");
var table =  document.getElementById("user-table");

// add event listener to the form submit
form.addEventListener("submit", function(event){
    // prevent default form action
    event.preventDefault();  
    
    // get input value
    var name = form.name.value;
    var address = form.address.value;
    var contact = form.contact.value;

    // create a new table row element
    var row =  document.createElement("tr");

    // create a new table cell element
    var nameCell = document.createElement("td");
    var addressCell = document.createElement("td");
    var contactCell = document.createElement("td");
    var passwordCell = document.createElement("td");
    var actionCell = document.createElement("td");

    nameCell.textContent = name;
    addressCell.textContent = address;
    contactCell.textContent = contact;
    passwordCell.textContent = "";

    // create a new button element for password generator
    var passwordButton = document.createElement("button");
    passwordButton.textContent = "Generate Password";

    // add eventlisener to password generator button
    passwordButton.addEventListener("click", function(){
        // generate random passowrd of 4 Character
        var password = Math.random().toString(36).slice(-4);

        // set pasword cell to password
        passwordCell.textContent = password;

        // diasble password generator
        passwordButton.disabled = true;
    });

    // append the password generator button to action cell
    actionCell.appendChild(passwordButton);

    // append name address phone no. password and action cell to the row
    row.appendChild(nameCell);
    row.appendChild(addressCell);
    row.appendChild(contactCell);
    row.appendChild(passwordCell);
    row.appendChild(actionCell);

    // append row to the table
    table.appendChild(row);

    // reset the form
    form.reset();

});