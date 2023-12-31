const smartyApiUrl = `https://us-autocomplete-pro.api.smarty.com/lookup`;
const resultsContainer = document.getElementById("results-container");
const resultsBox = document.getElementById("resultBox");

const debounceDelay = 500;
let debounceTimer;

console.log("script is running");

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
    const userInput = document.getElementById("userAddress");
    const dealsButton = document.getElementById("find-deals-button");

    //no input, do nothing
    if(userInput.value.length == 0){
        resultsBox.style.display = "none";
        dealsButton.style.display = "none";
        return;
    }

    //parameters for api request
    const params = {
        search: userInput.value,
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
        
        //clear previous suggestions
        resultsContainer.innerHTML = "";

        suggestions.forEach(suggestion => {
            const formattedAddress =  buildAddress(suggestion);
            const listItem = document.createElement("li");
            listItem.textContent = formattedAddress;

            //check if suggested address is chosen by user
            listItem.addEventListener("click", () => {
                //set input box to chosen address
                userInput.value = formattedAddress;

                //clear suggestions
                resultsContainer.innerHTML = "";
                resultsBox.style.display = "none";
                dealsButton.style.display = "block";
            });

            resultsContainer.appendChild(listItem);
        });

        resultsBox.style.display = "block";

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

