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
