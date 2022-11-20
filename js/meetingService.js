let allMeetings = [];
loadAllMeetingFromLocalStorage();
displayMeeting();

// Save new meeting to local storage
function saveNewMeetingToLocalStorage() {
    const result = JSON.stringify(allMeetings);
    localStorage.setItem("allMeetings", result);
}

// Load all meetings from local storage
function loadAllMeetingFromLocalStorage() {
    const result = localStorage.getItem("allMeetings");
    allMeetings = result ? JSON.parse(result) : [];
} // Preparation for the presentation of the meetings

// Add new Meeting
function addNewMeeting() {
    let newMeeting = {
        meetingDetails: {
            purposeOfTheMeeting: purposeOfTheMeeting.value,
            meetingBuildings: meetingBuildings.value,
            meetingFloors: meetingFloors.value,
            meetingDate: meetingDate.value,
            hostnames: hostnames.value,
            beginningTime: beginningTime.value,
            endTime: endTime.value
        },
        guests: guestList
    };
    allMeetings.push(newMeeting);
    saveNewMeetingToLocalStorage();

    document.getElementById("guestForm").reset();
    document.getElementById("mainForm").reset();
    tbody.getElementById("tbody").reset();
    guestList = [];

    alert(SUCCESS_INVITE_MEETING); // From translate File
}

// Display meetings
function displayMeeting() {
    const meetingData = document.getElementById("meetingData");
    const meetingFoot = document.getElementById("meetingFoot");
    let tBody = "";
    if (allMeetings && allMeetings.length) {
        for (let i = 0; i < allMeetings.length; i++) {
            tBody += `
            <tr>
            <td>${allMeetings[i].meetingDetails.purposeOfTheMeeting}</td>
            <td>${allMeetings[i].meetingDetails.meetingBuildings}</td>
            <td>${allMeetings[i].meetingDetails.meetingFloors}</td>
            <td>${allMeetings[i].meetingDetails.meetingDate}</td>
            <td>${allMeetings[i].meetingDetails.beginningTime}</td>
            <td>${allMeetings[i].meetingDetails.endTime}</td>
            <td>${allMeetings[i].meetingDetails.hostnames}</td>
            <td>`;
            for (let g = 0; g < allMeetings[i].guests.length; g++) {
                tBody += `
                <p>
                ${allMeetings[i].guests[g].firstName} ${allMeetings[i].guests[g].firstName}:<br />
                תעודת זהות: ${allMeetings[i].guests[g].idNumber} <br />
                מספר טלפון:  ${allMeetings[i].guests[g].phoneNumber}<br />`;
                if (allMeetings[i].guests[g].comment !== "") {
                    tBody += `הערות: ${allMeetings[i].guests[g].comment}</p>`;
                }
                else {
                    tBody += `</p>`;
                }
            }
            tBody += `</td></tr>`;
            
        }
        if (meetingData) {
            meetingData.innerHTML = tBody;
        }
        if (meetingFoot) {
            meetingFoot.innerHTML = ""; 
        }
    }
    else {
        if (meetingData) {
            meetingData.innerHTML = "";
        }
        if (meetingFoot) {
            meetingFoot.innerHTML = `<tr>${NO_MEETINGS}</tr>`; // From translate file
        }
    }
}
