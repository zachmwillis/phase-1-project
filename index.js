// Displays a random photo from the API whenever the button is clicked
document.addEventListener('DOMContentLoaded', function () {
    //Declaring variabels for the button, div, and pictures
    const surpriseButton = document.getElementById('surpriseButton');
    const dayImprover = document.getElementById('dayImprover');
    const dogPic = document.createElement('img');



    // Function that grabs the photos from the API
    async function getRandomPic() {
        // Tries to get photo from API
        try {
            const getDogPic = await fetch("https://dog.ceo/api/breeds/image/random");
            const picInfo = await getDogPic.json();
            return picInfo.message;
        // If the fetch request is unsuccessful, it will throw an error
        } catch (error) {
            console.error('Error loading dog photo:', error);
        }
    }


    // Function that loads new dog pic whenever the button is pressed again
    async function newDogPic() {
        const imageLink = await getRandomPic();
        dogPic.src = imageLink;
    }


    // Event listener for when the button is pressed, the new dog photo will appear
    surpriseButton.addEventListener('click', newDogPic);


    // Appends to the div
    dayImprover.appendChild(dogPic);
});










// Event listener where you can comment and submit that comment
document.addEventListener('DOMContentLoaded', function () {
    const formOne = document.getElementById('formOne');
    const textBox = document.getElementById('text');
    

    // Event listener so that the comment goes away when the submit button is pressed
    formOne.addEventListener('submit', function (event) {
        event.preventDefault();


        // Declaring variable for text box. Value property added so it holds the current text
        const commentText = textBox.value;


        // If statement that takes comment and can put it in an array and clears the comment box after submitted
        if (commentText !== '') {
            console.log('New comment:', commentText);
            textBox.value = '';
        }
    });
});










// Event listener so that when arrow keys are pressed, it shuffles through the table and displays new data
document.addEventListener('DOMContentLoaded', function () {
    // Declaring variables
    const dataTable = document.querySelector('#dealsTable tbody');
    let storeID = 1;
    let upperPrice = 25;


    // Function that gets data from storeID and upperPrices
    function refreshTable() {
        fetchCheapSharkData(storeID)
            // Once promise is returned, it will fill the table with data
            .then(info => {
                inputDataInTable(info);
            });
    }


    // Function that fills the table with data and affects the HTML
    function inputDataInTable(data) {
        dataTable.innerHTML = '';

        // Iterates through the data and arranges it into the table
        data.forEach(deal => {
            // Declaring variables that add rows
            const row = dataTable.insertRow();
            const [description, lowerPrice] = deal.split(', ');
            // Declaring variables that add cells
            const descRow = row.insertCell(0);
            const lowerPriceRow = row.insertCell(1);
            // Replaces cells with new data once needed
            descRow.textContent = description.replace('Description: ', '');
            lowerPriceRow.textContent = lowerPrice.replace('Lower Price: ', '');
        });
    }


    // Function that fetches data from the API using the two parameters and returns the array of strings into the table
    function fetchCheapSharkData(storeID) {
        // Declares variable with the value being the API address
        const apiUrl = `https://www.cheapshark.com/api/1.0/deals?storeID=${storeID}&upperPrice=${upperPrice}`;
        // Returns the API address and 
        return fetch(apiUrl)
            .then(response => {
                // Checks to see if the response is ok. If not, it throws an error message
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            // Uses .map() to form all of the data into a string and returns all of the data as an array
            .then(dealsData => {
                return dealsData.map(deal => {
                    return `Description: ${deal.title}, Lower Price: ${deal.salePrice}`;
                });
            })
            // If any errors occur, it will display an error message
            .catch(error => {
                console.error('Error fetching deals information:', error.message);
            });
    }


    // Event listener so that when you press the left or right key, it filters through the table
    document.addEventListener('keydown', function (event) {
        switch (event.key) {
            case 'ArrowLeft':
                storeID = Math.max(1, storeID - 1);
                break;
            case 'ArrowRight':
                storeID += 1;
                break;
        }
        // Calls the function and refreshes the table when the arrows are pressed
        refreshTable();
    });


    // Starting spot
    refreshTable();
});










// Function that gets the data from the API and makes it into a table
async function getPlayers() {
    const bballApi = "https://www.balldontlie.io/api/v1/players";
    // Declaring variables according to each parameter
    const ballParam = {
      page: 1,
      per_page: 50,
      search: 'Jalen'
    };
    // Telling what parameters to get from the API
    const apiUrl = new URL(bballApi);
    apiUrl.search = new URLSearchParams(ballParam).toString();

    // Gets the data from the API, dynamicall changes the HTML, and puts it all in the table
    try {
      // Get request from the API
      const response = await fetch(apiUrl);
      // If statement that tells you if its ok
      if (response.ok) {
        // Goes through the JSON response
        const data = await response.json();
        // Gets the data
        const players = data.data || [];
        // Makes a table
        const table = document.createElement('table');
        table.border = '2';
        // Makes table headers
        const headers = table.createTHead();
        const headerRow = headers.insertRow(0);
        headerRow.insertCell(0).textContent = 'ID';
        headerRow.insertCell(1).textContent = 'First Name';
        headerRow.insertCell(2).textContent = 'Last Name';
        // Looks for guys named Jalen and puts all of the info in the table
        players.forEach(player => {
          if (
            player.first_name.toLowerCase().includes('jalen') ||
            player.last_name.toLowerCase().includes('jalen')
          ) {
            const row = table.insertRow();
            row.insertCell(0).textContent = player.id;
            row.insertCell(1).textContent = player.first_name;
            row.insertCell(2).textContent = player.last_name;
          }
        });
        // Appends the table to the body
        document.body.appendChild(table);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }

  // Calls the function and shows the data
  getPlayers();