const placesApiUrl = `https://api.geoapify.com/v2/places?`;

console.log("deals page loaded");

function getUrlParams() {
    const params = {};
    const searchParams = window.location.search.substring(1).split('&');

    for (const param of searchParams) {
        const [key, value] = param.split('=');
        params[key] = decodeURIComponent(value);
    }

    return params;
}
document.addEventListener("DOMContentLoaded", function () {
    const urlParams = getUrlParams();

    const currAddressLabel = document.getElementById("current-address");
    currAddressLabel.textContent = "Current address is : " + urlParams["value"];
    console.log(currAddressLabel);
})