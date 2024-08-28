document.addEventListener('DOMContentLoaded', function() {
    var serviceSelect = document.getElementById('service');
    var additionalFields = document.getElementById('additional-fields');
    var frequencyField = document.getElementById('frequency-field');
    var totalBathrooms = document.getElementById('total_bathrooms');
    var sizeSquareFeet = document.getElementById('size_square_feet');
    var bathroomError = document.createElement('p');
    var sizeError = document.createElement('p');

    // Configuração das mensagens de erro
    bathroomError.id = 'bathroom-error';
    bathroomError.style.color = 'red';
    bathroomError.style.display = 'none';
    bathroomError.textContent = 'Please enter a value between 1 and 7.';
    totalBathrooms.parentNode.appendChild(bathroomError);

    sizeError.id = 'size-error';
    sizeError.style.color = 'red';
    sizeError.style.display = 'none';
    sizeError.textContent = 'Please enter a valid number for size in square feet.';
    sizeSquareFeet.insertAdjacentElement('afterend', sizeError);

    // Adiciona os eventos para validação
    serviceSelect.addEventListener('change', function() {
        var service = this.value;
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
            case 'cleaning_office':
                // To be done
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

        addEventListeners();
    });

    addEventListeners();

    // Validação do campo "Total Bathrooms"
    if (totalBathrooms) {
        totalBathrooms.addEventListener('input', function() {
            if (this.value < 1 || this.value > 7) {
                bathroomError.style.display = 'block';
            } else {
                bathroomError.style.display = 'none';
            }
        });
    }

    // Validação do campo "Size in Square Feet"
    if (sizeSquareFeet) {
        sizeSquareFeet.addEventListener('input', function() {
            if (isNaN(this.value) || this.value <= 0) {
                sizeError.style.display = 'block';
            } else {
                sizeError.style.display = 'none';
            }
        });
    }

    // Reimplementando o envio do formulário
    document.getElementById('quote-form').addEventListener('submit', function(event) {
        event.preventDefault(); 

        var formData = new FormData(this);
        var message = '';

        // Mensagem com as informações do formulário
        for (var pair of formData.entries()) {
            message += `${pair[0]}: ${pair[1]}\n`;
        }

        var templateParams = {
            from_name: formData.get('from_name'),
            from_email: formData.get('from_email'),
            service: formData.get('service'),
            message: message
        };

        emailjs.send('service_aqr1aoq', 'template_kz17f8e', templateParams)
            .then(function(response) {
                alert('Your message has been sent successfully!');
                document.getElementById('quote-form').reset(); // Reseta o formulário após envio
                additionalFields.classList.add('hidden'); // Esconde campos adicionais
            }, function(error) {
                alert('Failed to send your message. Error: ' + JSON.stringify(error));
            });
    });
});

function addEventListeners() {
    var recurringCleaning = document.getElementById('recurring_cleaning');
    if (recurringCleaning) {
        recurringCleaning.addEventListener('change', function() {
            var recurrenceFields = document.getElementById('recurrence-fields');
            recurrenceFields.innerHTML = '';
            if (this.value === 'yes') {
                recurrenceFields.innerHTML = `
                    <label for="recurrence_frequency">Recurrence Frequency</label>
                    <select name="recurrence_frequency" id="recurrence_frequency" class="col-12">
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Every Two Weeks</option>
                        <option value="tri-weekly">Every Three Weeks</option>
                        <option value="monthly">Monthly</option>
                    </select>
                    <input type="date" name="recurrence_start_date" id="recurrence_start_date" placeholder="Recurrence Start Date" class="col-12" />
                `;
            }
        });
    }
}


// Summary service

document.addEventListener('DOMContentLoaded', function() {
    const serviceField = document.getElementById('service');

    function toggleSummaryFields(service) {
        const allFields = document.querySelectorAll('.summary-field');
        allFields.forEach(field => field.classList.add('hidden'));

        switch(service) {
            case 'cleaning_airbnb':
            case 'deep_clean':
            case 'regular_clean':
            case 'one_time_clean':
            case 'move_in_out':
                document.querySelector('.summary-service').classList.remove('hidden');
                document.querySelector('.summary-unit-type').classList.remove('hidden');
                document.querySelector('.summary-size').classList.remove('hidden');
                document.querySelector('.summary-bathrooms').classList.remove('hidden');
                document.querySelector('.summary-postal-code').classList.remove('hidden');
                document.querySelector('.summary-date').classList.remove('hidden');
                document.querySelector('.summary-frequency').classList.remove('hidden');
                break;

            case 'balcony':
                document.querySelector('.summary-service').classList.remove('hidden');
                document.querySelector('.summary-balcony-size').classList.remove('hidden');
                break;

            case 'home_organization':
                document.querySelector('.summary-service').classList.remove('hidden');
                document.querySelector('.summary-org-date').classList.remove('hidden');
                document.querySelector('.summary-closets').classList.remove('hidden');
                document.querySelector('.summary-shelves').classList.remove('hidden');
                break;

            case 'pet_sitter':
                document.querySelector('.summary-service').classList.remove('hidden');
                document.querySelector('.summary-animal1').classList.remove('hidden');
                document.querySelector('.summary-specify-animal1').classList.remove('hidden');
                document.querySelector('.summary-animal2').classList.remove('hidden');
                document.querySelector('.summary-specify-animal2').classList.remove('hidden');
                document.querySelector('.summary-health').classList.remove('hidden');
                document.querySelector('.summary-vaccines').classList.remove('hidden');
                document.querySelector('.summary-travel-duration').classList.remove('hidden');
                document.querySelector('.summary-emergency-contact').classList.remove('hidden');
                document.querySelector('.summary-emergency-phone').classList.remove('hidden');
                document.querySelector('.summary-emergency-clinic').classList.remove('hidden');
                break;

            default:
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
    
        document.getElementById('summary-balcony-size').textContent = document.getElementById('balcony_size').value ? `${document.getElementById('balcony_size').value} sq ft` : '0 sq ft';
        
        document.getElementById('summary-closets').textContent = document.getElementById('total_closets').value || '0';
        document.getElementById('summary-shelves').textContent = document.getElementById('total_shelves').value || '0';
        document.getElementById('summary-org-date').textContent = document.getElementById('organization_date').value || 'None';
    
        document.getElementById('summary-animal1').textContent = document.getElementById('animal1').value || 'None';
        document.getElementById('summary-specify-animal1').textContent = document.getElementById('other_animal1').value || 'None';
        document.getElementById('summary-animal2').textContent = document.getElementById('animal2').value || 'None';
        document.getElementById('summary-specify-animal2').textContent = document.getElementById('other_animal2').value || 'None';
        document.getElementById('summary-health').textContent = document.querySelector('input[name="animal_health"]:checked').value || 'No';
        document.getElementById('summary-vaccines').textContent = document.querySelector('input[name="vaccines_up_to_date"]:checked').value || 'No';
        document.getElementById('summary-travel-duration').textContent = document.getElementById('travel_duration').value || 'None';
        document.getElementById('summary-emergency-contact').textContent = document.getElementById('emergency_contact').value || 'None';
        document.getElementById('summary-emergency-phone').textContent = document.getElementById('emergency_phone').value || 'None';
        document.getElementById('summary-emergency-clinic').textContent = document.getElementById('emergency_clinic').value || 'None';
    }
    

    serviceField.addEventListener('change', function() {
        const selectedService = serviceField.value;
        toggleSummaryFields(selectedService);
        updateSummary();
    });

    const fieldsToWatch = ['unit_type', 'size_square_feet', 'total_bathrooms', 'postal_code', 'cleaning_date', 'frequency', 'balcony_size', 'total_closets', 'total_shelves', 'organization_date', 'animal1', 'other_animal1', 'animal2', 'other_animal2', 'travel_duration', 'emergency_contact', 'emergency_phone', 'emergency_clinic'];

    fieldsToWatch.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.addEventListener('input', updateSummary);
            element.addEventListener('change', updateSummary);
        }
    });

    document.querySelectorAll('input[name="animal_health"], input[name="vaccines_up_to_date"]').forEach(radio => {
        radio.addEventListener('change', updateSummary);
    });

    toggleSummaryFields(serviceField.value);
    updateSummary();
});
