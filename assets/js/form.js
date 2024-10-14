document.addEventListener('DOMContentLoaded', function() {
    var serviceSelect = document.getElementById('service');
    var additionalFields = document.getElementById('additional-fields');
    var frequencyField = document.getElementById('frequency-field');

    serviceSelect.addEventListener('change', function() {
        var service = this.value;
        showRelevantFields(service);
        updateSummary();
        calculatePrice();
    });

    addEventListeners();

    function addEventListeners() {
        const fieldsToWatch = ['unit_type', 'total_bathrooms', 'frequency', 'size_square_feet', 'postal_code', 'cleaning_date'];

        fieldsToWatch.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function() {
                    updateSummary();
                    calculatePrice();
                });
                element.addEventListener('change', function() {
                    updateSummary();
                    calculatePrice();
                });
            }
        });
    }

    function showRelevantFields(service) {
        additionalFields.classList.remove('hidden');
        document.querySelectorAll('.common-fields, .clean-type-fields, .home-organization-fields, .pet-sitter-fields, .balcony-fields').forEach(function(field) {
            field.classList.add('hidden');
        });
        frequencyField.classList.add('hidden');

        switch (service) {
            case 'cleaning_airbnb':
            case 'regular_clean':
                document.querySelector('.clean-type-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
                frequencyField.classList.remove('hidden');
                break;
            case 'deep_clean':
            case 'one_time_clean':
            case 'move_in_out':
                document.querySelector('.clean-type-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
                break;
            case 'home_organization':
                document.querySelector('.home-organization-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
                break;
            case 'balcony':
                document.querySelector('.balcony-fields').classList.remove('hidden');
                break;
            case 'pet_sitter':
                document.querySelector('.pet-sitter-fields').classList.remove('hidden');
                break;
            default:
                additionalFields.classList.add('hidden');
                break;
        }
    }

    function updateSummary() {
        const serviceSelect = document.getElementById('service');
        const selectedServiceText = serviceSelect.options[serviceSelect.selectedIndex].text;

        document.getElementById('summary-service').textContent = selectedServiceText || 'None';
        document.getElementById('summary-unit-type').textContent = document.getElementById('unit_type').value || 'None';
        document.getElementById('summary-size').textContent = document.getElementById('size_square_feet').value ? `${document.getElementById('size_square_feet').value} sq ft` : '0 sq ft';
        document.getElementById('summary-bathrooms').textContent = document.getElementById('total_bathrooms').value || '0';
        document.getElementById('summary-postal-code').textContent = document.getElementById('postal_code').value || 'None';
        document.getElementById('summary-date').textContent = document.getElementById('cleaning_date').value || 'None';
        document.getElementById('summary-frequency').textContent = document.getElementById('frequency').value || 'None';
    }

    function calculatePrice() {
        const serviceSelect = document.getElementById('service');
        const unitType = document.getElementById('unit_type').value;
        const totalBathrooms = parseInt(document.getElementById('total_bathrooms').value, 10) || 1;
        const frequency = document.getElementById('frequency').value;
        const sizeSquareFeet = parseInt(document.getElementById('size_square_feet').value, 10) || 0;
        let price = 0;
    
        switch(serviceSelect.value) {
            case 'one_time_clean':
                price = 140;
                if (unitType === 'apartment' || unitType === 'condo') {
                    price += (totalBathrooms === 2 ? 20 : (totalBathrooms > 2 ? (totalBathrooms - 2) * 50 : 0));
                } else if (unitType === 'house') {
                    price = totalBathrooms <= 2 ? 190 : 220 + (totalBathrooms - 3) * 50;
                }
                break;
    
            case 'regular_clean':
                price = 100;
                if (unitType === 'apartment' || unitType === 'condo') {
                    price += (totalBathrooms === 2 ? 20 : (totalBathrooms > 2 ? (totalBathrooms - 2) * 50 : 0));
                } else if (unitType === 'house') {
                    price = totalBathrooms <= 2 ? 150 : 180 + (totalBathrooms - 3) * 50;
                }
                break;
    
            case 'deep_clean':
                price = 200; 
                if (unitType === 'apartment' || unitType === 'condo') {
                    price += (totalBathrooms === 2 ? 20 : (totalBathrooms > 2 ? (totalBathrooms - 2) * 50 : 0));
                } else if (unitType === 'house') {
                    price = totalBathrooms <= 2 ? 250 : 280 + (totalBathrooms - 3) * 50;
                }
                break;
    
            case 'move_in_out':
                price = 220; 
                if (unitType === 'apartment' || unitType === 'condo') {
                    price += (totalBathrooms === 2 ? 20 : (totalBathrooms > 2 ? (totalBathrooms - 2) * 50 : 0));
                } else if (unitType === 'house') {
                    price = totalBathrooms <= 2 ? 270 : 300 + (totalBathrooms - 3) * 50;
                }
                break;
    
            case 'cleaning_airbnb':
                price = 130; 
                if (unitType === 'apartment' || unitType === 'condo') {
                    price += (totalBathrooms === 2 ? 20 : (totalBathrooms > 2 ? (totalBathrooms - 2) * 50 : 0));
                } else if (unitType === 'house') {
                    price = totalBathrooms <= 2 ? 180 : 210 + (totalBathrooms - 3) * 50;
                }
                break;
    
            case 'balcony':
                price = sizeSquareFeet <= 100 ? 120 : sizeSquareFeet <= 180 ? 180 : 220;  
                break;
    
            default:
                price = 0; 
                break;
        }
    
        document.getElementById('price-value').textContent = price.toFixed(2);
    }

    showRelevantFields(serviceSelect.value);
    updateSummary();
    calculatePrice();
});
