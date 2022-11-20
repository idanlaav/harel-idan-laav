const guestList = [];
let IndexToEdit;
let popupFormChangeData = false;
displayGuestList();

function openForm() {
    document.getElementById("popupForm").style.display = "block";
}

// Save guest list 
function addNewGuestToList() {
    event.preventDefault();
    if (popupFormChangeData === true) {
        getNewDataGuestToEdit();
        return;
    }
    let newGuest = getNewGuestData();
    guestList.push(newGuest);
    closeForm();
    document.getElementById("guestForm").reset();
    displayGuestList();
    document.getElementById("addMeetingBtn").disabled = false;
}

// Get new guest data
function getNewGuestData() {
    const idNumber = document.getElementById("idNumber");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const phoneNumber = document.getElementById("phoneNumber");
    const comment = document.getElementById("comment");

    let guest = {
        idNumber: idNumber.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phoneNumber: phoneNumber.value,
        comment: comment.value
    };

    return guest;
}

// Display guest list
function displayGuestList() {
    const guestFoot = document.getElementById("tfoot");
    let message = "";
    if (guestList && guestList.length) {
        const tbody = document.getElementById("tbody");
        for (let i = 0; i < guestList.length; i++) {
            message += `
            <tr>`
            if (guestList[i].comment !== "") {
                message += `<td class="limitWIdth"><span class="guestComment">הערות:</span><div class="comment">${guestList[i].comment}</div></td>`;
            }
            else {
                message += `<td></td>`;
            }
            message += `
                <td>${guestList[i].idNumber}</td>
                <td>${guestList[i].lastName}</td>
                <td>${guestList[i].firstName}</td>
                <td>${guestList[i].phoneNumber}</td>
                <td><button type="button" class="btnWithOutCSS" onclick="deleteGuestFromList(${guestList[i].idNumber})">❌</button>
                <button type="button" class="btnWithOutCSS" onclick="editGuest(${guestList[i].idNumber})">✍🏻</button></td>
            </tr>`;
        }
        tbody.innerHTML = message;
        guestFoot.innerHTML = "";
    }
    else {
        tbody.innerHTML = "";
        message = `<tr>${NO_GUESTS}</tr>`; // From translate file
        guestFoot.innerHTML = message;
    }
}

// Edit guest
function editGuest(idNumber) {
    IndexToEdit = guestList.findIndex(guest => guest.idNumber === idNumber.toString());
    if (IndexToEdit > -1) {
        popupFormChangeData = true;
        openForm();
    }
}

// Get new data guest
function getNewDataGuestToEdit() {
    guestList[IndexToEdit].idNumber = idNumber.value;
    guestList[IndexToEdit].firstName = firstName.value;
    guestList[IndexToEdit].lastName = lastName.value;
    guestList[IndexToEdit].phoneNumber = phoneNumber.value;
    guestList[IndexToEdit].comment = comment?.value;
    closeForm();
    popupFormChangeData = false;
    document.getElementById("guestForm").reset();
    displayGuestList();
}

// Delete guest from list
function deleteGuestFromList(idNumber) {
    if (confirm(GUEST_DELETION_CONFIRMATION) == false) { // From translate file
        return;
    }
    const indexToDelete = guestList.findIndex(guest => guest.idNumber === idNumber.toString());
    if (indexToDelete > -1) {
        guestList.splice(indexToDelete, 1);
        displayGuestList();
    }
    if (!guestList || guestList.length == 0) {
        document.getElementById("addMeetingBtn").disabled = true;
    }
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

