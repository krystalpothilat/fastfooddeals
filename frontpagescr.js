const smartyApiUrl = `https://us-autocomplete-pro.api.smarty.com/lookup`;

const debounceDelay = 500;
let debounceTimer;

console.log("script is running");
// function checkInput() {
//     var userInput = document.getElementById("userAddress").value;
//     var resultBox = document.getElementById("resultBox");
    
//     if(userInput.length > 0){
//         resultBox.style.display = "block";
//     } else {
//         resultBox.style.display = "none";
//     }
// }

//format address 
function buildAddress(suggestion) {
	let whiteSpace = "";
	if (suggestion.secondary) {
		if (suggestion.entries > 1) {
			suggestion.secondary += " (" + suggestion.entries + " entries)";
		}
		whiteSpace = " ";
	}
	return suggestion.street_line + whiteSpace + suggestion.secondary + " " + suggestion.city + ", " + suggestion.state + " " + suggestion.zipcode;
}

function suggestAddress() {
    const userInput = document.getElementById("userAddress").value;

    //no input, do nothing
    if(userInput.length == 0){
        return;
    }
    const params = {
        search: userInput,
        max_results: 5,
    };

    const queryString = new URLSearchParams(params).toString();
    const fullUrl = `${smartyApiUrl}?key=${smartyApiKey}&${queryString}`;

    //API request
    fetch(fullUrl, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
        },
    })
    .then(response => {
        if(!response.ok){
            throw new Error ("HTTP error! Status: $(response.status}");
        }
        return response.json();
    })
    .then(data => {
        //process data
        const suggestions = data.suggestions;

        suggestions.forEach(suggestion => {
            const formattedAddress =  buildAddress(suggestion);
            console.log(formattedAddress);
        });
    })
    .catch(error => {
        console.error("Error:", error);
    });

}

function handleInput() {
    //clear previous timer
    clearTimeout(debounceTimer);

    //set new timer
    debounceTimer = setTimeout(() => {
        suggestAddress();
    }, debounceDelay);
}

document.getElementById("userAddress").addEventListener("input", handleInput);

