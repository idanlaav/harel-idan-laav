const nameOfMeetingBuildings = ARRAY_BUILDING_NAMES; // From translate file
const listOfHostnames = ARRAY_MEETING_HOSTNAMES; // From translate file
const numberOfFloors = 25;

insertingDefaultValueToMainForm();

// Inserting data to inputs and select tags in the main form
function insertingDefaultValueToMainForm() {

    const meetingBuildings = document.getElementById("meetingBuildings");
    buildingOptions = `<option value="" selected disabled>${BUILDING_NAME_DEFAULT_VALUE}</option>`; // From translate file
    nameOfMeetingBuildings.forEach(buildingName => {
        buildingOptions += `
        <option value="${buildingName}">${buildingName}</option>
        `;
    })
    meetingBuildings.innerHTML = buildingOptions;


    const meetingFloors = document.getElementById("meetingFloors");
    floorOptions = `<option value="" selected disabled>${BUILDING_FLOORS_DEFAULT_VALUE}</option>`; // From translate file
    for (let i = 1; i <= numberOfFloors; i++) {
        floorOptions += `
        <option value="${i}">${i}</option>
        `;
    }
    meetingFloors.innerHTML = floorOptions;


    const meetingDate = document.getElementById("meetingDate");
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();

    const fullDate = `${year}-${month}-${day}`;
    meetingDate.value = fullDate;
    meetingDate.setAttribute("min", fullDate);


    const hostnames = document.getElementById("hostnames");
    hostnameOptions = `<option value="" selected disabled>${HOSTNAME_DEFAULT_VALUE}</option>`; // From translate file
    for (let i = 0; i < listOfHostnames.length; i++) {
        hostnameOptions += `
        <option value="${listOfHostnames[i]}">${listOfHostnames[i]}</option>
        `;
    }
    hostnames.innerHTML = hostnameOptions;


    const beginningTime = document.getElementById("beginningTime");
    let hour = new Date().getHours();
    let minutes = new Date().getMinutes();
    if(hour < 10) {
        hour = `0${hour}`;
    }
    if(minutes < 10) {
        minutes = `0${minutes}`;
    }
    const currentTime = `${hour}:${minutes}`;
    beginningTime.value = currentTime;
}

// Validity check for the selected hours
function checkingTimeSelection() {
    let startTime = beginningTime.value;
    let endingTime = endTime.value;

    if(startTime > endingTime && endingTime !== "") {
        endTime.value = null;
        alert(TIME_ERROR_MESSAGE); // From translate file
    }
}
