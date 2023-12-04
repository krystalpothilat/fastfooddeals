
function checkInput() {
    var userInput = document.getElementById('userAddress').value;
    var resultBox = document.getElementById('resultBox');
    
    if(userInput.length > 0){
        resultBox.style.display = 'block';
    } else {
        resultBox.style.display = 'none';
    }
}

