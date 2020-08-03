const publicVapidKey="BIUDYsR0ALBT91mZ-wkjzrcVVBwCyn_OWiBfyEtMvu943o0a6ly4_NQU6DOp6oX5n2QhQ6-5cb7jsuMFZK6__BA"

// check for serviceWorker

const send = async () => {
    console.log("Registering Service Worker");
    const register = await navigator.serviceWorker.register(
        "./worker.js",
        {
            scope: "/",
        }
    );
    console.log("Service Worker registered!");

    //Register Push
    console.log("Registering Push");
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Registered Push");

    //Send Push Notification
    console.log("Sending Push Notification");

    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: { "content-type": "application/json" },
    });
    console.log("Push notitification sent");
};

if('serviceWorker' in navigator){
    send().catch(error => console.log(error));
}



function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}