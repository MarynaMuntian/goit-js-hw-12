import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { Notify } from 'notiflix';
import { debounce } from 'lodash';
import countriesListMarkup from './templates/countries-list.hbs';
import countryMarkup from './templates/country-markup.hbs';

const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');
const cardContainer = document.querySelector('.js-card-container');
const countriesList = document.querySelector('.country-list');

const renderCountryCard = (template, country) => {
    const markup = template(country);
    cardContainer.insertAdjacentHTML('beforeend', markup);

};

const clearPage = () => {
  cardContainer.innerHTML = '';
  countriesList.innerHTML = '';
}

const onFetchError = () => {
     clearPage();
  searchInput.value = '';
        Notify.Failure({ text: 'Oops, there is no country with that name' })
}

const isFetchSucces = (value) => {
    try {
        if (value.length > 10) {
            Notify.Info({ text: 'Too many matches found. Please enter a more specific name.' });
        }
        if (value.length > 1 && value.length <= 10) {
            renderCountryCard(countriesListMarkup, value);
        }
        if (value.length === 1) {
            renderCountryCard(countryMarkup, value);
        }
    }
    catch (error) { onFetchError}
}



const onSearch = () => {
    cardContainer.innerHTML = ""
    const searchedCountry = searchInput.value.trim();

    if (searchedCountry === "")
    { return; }

    fetchCountries(searchedCountry)
        .then(isFetchSucces)
        .catch(onFetchError)
}

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));