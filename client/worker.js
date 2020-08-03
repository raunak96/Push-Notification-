console.log("Service Worker loaded!!");

self.addEventListener("push", (e) => {
    const data = e.data.json();
    console.log("Push recieved..");
    self.registration.showNotification(data.title, {
        body: "Notified by Rawn",
        icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTQJIu7WNlslETnfBpY-2ds_ShjsaWt8PKvNQ&usqp=CAU",
    });
});
