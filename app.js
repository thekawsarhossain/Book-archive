// search details id here
const searchDetails = document.getElementById('search-details');
// here is the results container
const booksContainer = document.getElementById('books-container');

// search button's event listerner here 
document.getElementById('search-button').addEventListener('click', getSearchValue => {
    // input text field here
    const searchText = document.getElementById('input-field');

    // error handleing here
    if(searchText.value === ''){
        searchDetails.innerText = `Search input can't be empty!`;
        booksContainer.textContent = '';
    }else{
    // fetching data here
    const url = (`https://openlibrary.org/search.json?q=${searchText.value}`);
    fetch(url)
    .then(response => response.json())
    .then(data => displayResults(data))
    }

    // clear the input field here
    searchText.value = '';
}); 

const displayResults = books => {

    booksContainer.textContent = '';

    books.docs.forEach(book => {
        // creating new div here
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <div class="card-body">
          <h4 class="card-title">Book Name: ${book.title}</h4>
          <h6 class="card-text">Publisher: ${book.author_name === undefined ? 'Unknown' : book.author_name[0]}</h6>
          <h6 class="card-text">Published Year: ${book.first_publish_year === undefined ? 'Unknown' : book.first_publish_year}</h6>
        </div>
      </div>
        `;

        // appending child here
        booksContainer.appendChild(div);
    });

    // get the total elements count from the container
    const totalELements = booksContainer.childElementCount;
    // update the found results count
    searchDetails.innerText = `Showing ${totalELements} Result's of ${books.numFound}`;

    // api error handling here if search input not matched 
    if(books.numFound === 0){
        searchDetails.innerText = `No Result's Found !`;
    }
}