//make booking date default to today's date
window.addEventListener("load", function () {
    document.getElementById("userDate").valueAsDate = new Date();
});

//form validation
function Validation() {
    let validationId = ["userName", "userContact", "userEmail", "userDate", "userSession", "userPax"];
    let valid = true;
    for (i = 0; i < validationId.length; i++) {
        let inpObj = document.getElementById(validationId[i]);
        if (!inpObj.checkValidity()) {
            valid = false;
        }
    }
    return valid;
}

function BookNow(guestName, guestContact, guestEmail, guestDate, guestSession, guestPax, guestTable, guestRemarks) {
    let url = 'https://api.sheety.co/766f50739fb40a2b659c331650277aa7/bookingApp/bookings';
    let body = {
        booking: {
            name: guestName,
            contact: guestContact,
            email: guestEmail,
            date: guestDate,
            session: guestSession,
            pax: guestPax,
            table: guestTable,
            remarks: guestRemarks
        }
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    })
        .then((response) => response.json())
        .then(json => {
            alert(json.booking.name + " added!");
        });
}

window.addEventListener("load", function () {
    document.getElementById("bookNow").addEventListener("click", function () {

        if (Validation() == true) {
            let userName = document.getElementById("userName").value;
            let userContact = document.getElementById("userContact").value;
            let userEmail = document.getElementById("userEmail").value;
            let userDate = document.getElementById("userDate").value;
            let userSession = document.getElementById("userSession").value;
            let userPax = document.getElementById("userPax").value;
            let userRemark = document.getElementById("userRemarks").value;
            let userTable;
            //determine user table size base on pax input from form
            if (userPax <= 4) {
                userTable = "Small";
            } else if (userPax >= 5 && userPax <= 8) {
                userTable = "Medium";
            } else if (userPax >= 9) {
                userTable = "Large";
            }

            let url = 'https://api.sheety.co/766f50739fb40a2b659c331650277aa7/bookingApp/bookings';
            fetch(url)
                .then((response) => response.json())
                .then(json => {
                    let smallTable = 0;
                    let mediumTable = 0;
                    let largeTable = 0;

                    //count table availability in database according to date and session input from form
                    for (let i = 0; i < json.bookings.length; i++) {
                        let gDate = json.bookings[i].date;
                        let gSession = json.bookings[i].session;
                        let gTable = json.bookings[i].table;

                        if (userDate == gDate) {
                            if (userSession == gSession) {
                                if (gTable == "Small") {
                                    smallTable++;
                                } else if (gTable == "Medium") {
                                    mediumTable++;
                                } else if (gTable == "Large") {
                                    largeTable++;
                                }
                            }
                        }
                    }
                   
                    //check table availability
                    if (userTable == "Small") {
                        if (smallTable >= 4) {
                            alert("Small tables (1-4pax) are fully booked");
                        } else {
                            BookNow(userName, userContact, userEmail, userDate, userSession, userPax, userTable, userRemark);
                        }
                    } else if (userTable == "Medium") {
                        if (mediumTable >= 2) {
                            alert("Medium tables (5-8pax) are fully booked");
                        } else {
                            BookNow(userName, userContact, userEmail, userDate, userSession, userPax, userTable, userRemark);
                        }
                    } else if (userTable == "Large") {
                        if (largeTable >= 1) {
                            alert("Large tables (9-10pax) are fully booked");
                        } else {
                            BookNow(userName, userContact, userEmail, userDate, userSession, userPax, userTable, userRemark);
                        }
                    }
                });
        } else if (Validation() == false) {
            alert ("Please complete the reservation form before submission.")
        }
    });
});

