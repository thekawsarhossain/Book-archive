// search button's event listerner here 
document.getElementById('search-button').addEventListener('click', getSearchValue => {

    // input text field here
    const searchText = document.getElementById('input-field');

    // fetching data here
    const url = (`http://openlibrary.org/search.json?q=${searchText.value}`);
    fetch(url)
    .then(response => response.json())
    .then(data => displayResult(data.docs))

    // clear the input field here
    searchText.value = '';
}); 

const displayResult = results => {

    // here is the results container
    const resultsConatiner = document.getElementById('results-container');

    // for Each here
    results.forEach(details => {
        console.log(details);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${details.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Book Name: ${details.title}</h5>
          <h6 class="card-text">Publisher: ${details.author_name}</h6>
          <p class="card-text">Published Year: ${details.first_publish_year}</p>
        </div>
      </div>
        `;

        // appending child here
        resultsConatiner.appendChild(div);
    });

    // get the total elements count from the container
    const totalELements = resultsConatiner.childElementCount;
    // update the found results count
    document.getElementById('total-element').innerText = `Total found result's ${totalELements}`;


}