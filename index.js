const countryStateData = {
    "India": [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
        "Uttar Pradesh", "Uttarakhand", "West Bengal", 
        "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", 
        "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
    ],
    "United States": [
        "Alabama", "Alaska", "Arizona", "Arkansas", "California", 
        "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
        "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", 
        "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
        "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", 
        "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
        "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", 
        "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
        "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", 
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ],
    "Australia": [
        "Australian Capital Territory", "New South Wales", "Northern Territory", 
        "Queensland", "South Australia", "Tasmania", "Victoria", "Western Australia"
    ]
};

const countrySelect = document.getElementById('country');
const stateSelect = document.getElementById('state');

function populateCountries() {
    document.getElementById('billing-form').reset();
    for (const country in countryStateData) {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = country;
        countrySelect.appendChild(option);
    }
}

function populateStates(selectedCountry) {
    stateSelect.innerHTML = '<option value="">Select State</option>';
    countryStateData[selectedCountry].forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });
}

countrySelect.addEventListener('change', function() {
    populateStates(countrySelect.value);
});

window.onload = populateCountries;

document.getElementById('billing-form').onsubmit = function(event) {
    event.preventDefault();
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.textContent = '');

    let isValid = true;

    // Card number validation
    const cardNumber = document.getElementById('card-number').value;
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
        document.getElementById('card-number-error').textContent = 'Card number must be 16 digits.';
        isValid = false;
    }

    // Cardholder name validation
    const cardholderName = document.getElementById('cardholder-name').value;
    const nameRegex = /^[a-zA-Z\s'-]{2,40}$/;
    if (!nameRegex.test(cardholderName)) {
        document.getElementById('cardholder-name-error').textContent = 'Cardholder name is required and must be 2-40 characters (only letters, spaces, hyphens, or apostrophes).';
        isValid = false;
    }

    // Expiry validation
    const expiry = document.getElementById('expiry').value;
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;  // MM/YY format
    if (!expiryRegex.test(expiry)) {
        document.getElementById('expiry-error').textContent = 'Expiry must be in MM/YY format (e.g., 08/25).';
        isValid = false;
    }

    // CVV validation
    const cvv = document.getElementById('cvv').value;
    const cvvRegex = /^\d{3}$/;
    if (!cvvRegex.test(cvv)) {
        document.getElementById('cvv-error').textContent = 'CVV must be 3 digits.';
        isValid = false;
    }

    // Email validation
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Address validation
    const address = document.getElementById('address').value;
    if (address.trim() === '') {
        document.getElementById('address-error').textContent = 'Address is required.';
        isValid = false;
    }

    // City validation
    const city = document.getElementById('city').value;
    if (city.trim() === '') {
        document.getElementById('city-error').textContent = 'City is required.';
        isValid = false;
    }

    // State validation
    const state = document.getElementById('state').value;
    if (!state) {
        document.getElementById('state-error').textContent = 'State is required.';
        isValid = false;
    }

    // Country validation
    const country = document.getElementById('country').value;
    if (!country) {
        document.getElementById('country-error').textContent = 'Country is required.';
        isValid = false;
    }

    // Zip code validation
    const zip = document.getElementById('zip').value;
    const zipRegex = /^\d+$/;
    if (!zipRegex.test(zip)) {
        document.getElementById('zip-error').textContent = 'Zip code must contain only numbers.';
        isValid = false;
    }

    // If form is valid, submit the form
    if (isValid) {
        const billData = {
            cardNumber,
            cardholderName,
            expiry,
            cvv,
            email,
            address,
            city,
            state,
            country,
            zip
        };

        console.log(billData);
        alert('Form submitted successfully!');
    }
};
