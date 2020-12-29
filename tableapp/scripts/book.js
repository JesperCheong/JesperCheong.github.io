window.addEventListener("load", function () {
    document.getElementById("userDate").valueAsDate = new Date();
}); 

function BookNow(guestName, guestContact,guestEmail, guestDate, guestSession, guestPax, guestRemarks) {
    let url = 'https://api.sheety.co/766f50739fb40a2b659c331650277aa7/bookingApp/bookings';
    let body = {
        booking: {
            name: guestName,
            contact: guestContact,
            email: guestEmail,
            date: guestDate,
            session: guestSession,
            pax: guestPax,
            remarks: guestRemarks
        }
    }
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
/*
let bookNow = document.getElementById("bookNow");
bookNow.addEventListener("click", function () {
    let gName = document.getElementById("guestName").value;
    let gEmail = document.getElementById("guestEmail").value;
    let gPax = document.getElementById("guestPax").value;

    BookNow(gName, gEmail, gPax);
});*/

window.addEventListener("load", function () {
    document.getElementById("bookNow").addEventListener("click", function () {
        let userName = document.getElementById("userName").value;
        let userContact = DocumentTimeline.getElementById("userContact").value;
        let userEmail = document.getElementById("userEmail").value;
        let userDate = document.getElementById("userDate").value;
        let userSession = document.getElementById("userSession").value;
        let userPax = document.getElementById("userPax").value;
        let userRemarks = document.getElementById("userRemarks").value;

        BookNow(userName, userContact, userEmail, userDate, userSession, userPax, userRemarks)
    });
});