import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from "notiflix";
import { debounce } from 'lodash';
import countriesListMarkup from './templates/countries-list.hbs';
import countryMarkup from './templates/country-markup.hbs';

const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');
const cardContainer = document.querySelector('.js-card-container');

const onSearch = () => {
    cardContainer.innerHTML = ""
    const searchedCountry = searchInput.value;

    if (searchedCountry === "")
    { return; }

    fetchCountries(searchedCountry)
        .then(isFetchSucces)
        .catch(onFetchError)
}
 
const isFetchSucces = () => {
    
}

 searchInput.addEventListener('input', debounce(onSearch, 300));