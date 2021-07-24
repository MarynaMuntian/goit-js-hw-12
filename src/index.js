import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from "notiflix";
import { debounce } from 'lodash';
import countriesListMarkup from './templates/countries-list.hbs';
import countryMarkup from './templates/country-markup.hbs';

const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');
const cardContainer = document.querySelector('.js-card-container');

const renderCountryCard = (template, country) => {
    const markup = template(country);
    cardContainer.insertAdjacentHTML('beforeend', markup);

};

const isFetchSucces = (value) => {
    if (value.length > 10) {
        Notify.Failure('Too many matches found. Please enter a more specific name.');
    }
    if (value.length > 1 && value.length <= 10) {
        renderCountryCard(countriesListMarkup, value);
    }
     if (value.length === 1) {
        renderCountryCard(countryMarkup, value);
     }
    onFetchError();
}

const onFetchError = () => {
    error(Notify.Failure('Oops, there is no country with that name'));
}

const onSearch = () => {
    cardContainer.innerHTML = ""
    const searchedCountry = searchInput.value;

    if (searchedCountry === "")
    { return; }

    fetchCountries(searchedCountry)
        .then(isFetchSucces)
        .catch(onFetchError)
}

 searchInput.addEventListener('input', debounce(onSearch, 300));