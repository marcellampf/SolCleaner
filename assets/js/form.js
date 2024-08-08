document.addEventListener('DOMContentLoaded', function() {
    var serviceSelect = document.getElementById('service');
    var additionalFields = document.getElementById('additional-fields');

    serviceSelect.addEventListener('change', function() {
        var service = this.value;
        additionalFields.classList.remove('hidden');
        document.querySelectorAll('.common-fields, .deep-clean-fields, .home-organization-fields, .pet-sitter-fields').forEach(function(field) {
            field.classList.add('hidden');
        });

        switch (service) {
            case 'cleaning_airbnb':
            case 'deep_clean':
            case 'move_in_out':
                document.querySelector('.deep-clean-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
                break;
            case 'cleaning_office':
                // to be done
                break;
            case 'home_organization':
                document.querySelector('.home-organization-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
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
                        <option value="bi-weekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                        <option value="other">Other</option>
                    </select>
                    <input type="date" name="recurrence_start_date" id="recurrence_start_date" placeholder="Recurrence Start Date" class="col-12" />
                `;
            }
        });
    }

    var animal1 = document.getElementById('animal1');
    var animal2 = document.getElementById('animal2');
    if (animal1) {
        animal1.addEventListener('change', function() {
            toggleOtherAnimalField(this, 'other_animal1');
        });
    }
    if (animal2) {
        animal2.addEventListener('change', function() {
            toggleOtherAnimalField(this, 'other_animal2');
        });
    }

    var animalHealth = document.getElementById('animal_health');
    if (animalHealth) {
        animalHealth.addEventListener('change', function() {
            var healthDetails = document.getElementById('health_details');
            if (this.value === 'yes') {
                healthDetails.classList.remove('hidden');
            } else {
                healthDetails.classList.add('hidden');
            }
        });
    }
}

function toggleOtherAnimalField(selectElement, otherFieldId) {
    var otherField = document.getElementById(otherFieldId);
    if (selectElement.value === 'other') {
        otherField.classList.remove('hidden');
    } else {
        otherField.classList.add('hidden');
    }
}

document.getElementById('quote-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    var formData = new FormData(this);
    var message = '';

    // Message with form information (maybe it's not working properly)
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
            document.getElementById('quote-form').reset(); // Reset form after successful submission
            additionalFields.classList.add('hidden'); // Hide additional fields
        }, function(error) {
            alert('Failed to send your message. Error: ' + JSON.stringify(error));
        });
});
