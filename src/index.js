import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import { Notify } from "notiflix";
import countriesListMarkup from './templates/countries-list.hbs';
import countryMarkup from './templates/country-markup.hbs';

const DEBOUNCE_DELAY = 300;

const searchInput = document.getElementById('search-box');

searchInput.addEventListener('input', _.debounce(fetchCountries, 300));

