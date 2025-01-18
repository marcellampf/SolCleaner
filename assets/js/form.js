document.addEventListener('DOMContentLoaded', function () {
    // Selecionar elementos necessários
    var serviceSelect = document.getElementById('service');
    var additionalFields = document.getElementById('additional-fields');
    var frequencyField = document.getElementById('frequency-field');

    // Adicionar evento de alteração ao serviço
    serviceSelect.addEventListener('change', function () {
        var service = this.value;
        showRelevantFields(service);
        updateSummary();
        calculatePrice();
    });

    // Adicionar listeners aos campos para atualizar o resumo
    addEventListeners();

    function addEventListeners() {
        const fieldsToWatch = ['unit_type', 'total_bathrooms', 'frequency', 'size_square_feet', 'postal_code', 'cleaning_date'];

        fieldsToWatch.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', function () {
                    updateSummary();
                    calculatePrice();
                });
                element.addEventListener('change', function () {
                    updateSummary();
                    calculatePrice();
                });
            }
        });
    }

    function showRelevantFields(service) {
        // Mostrar campos adicionais
        additionalFields.classList.remove('hidden');
        document.querySelectorAll('#additional-fields input, #additional-fields select').forEach(el => {
            el.disabled = true; // Desabilitar todos os campos inicialmente
        });

        document.querySelectorAll('.common-fields, .clean-type-fields, .home-organization-fields, .pet-sitter-fields, .balcony-fields').forEach(function (field) {
            field.classList.add('hidden');
            field.querySelectorAll('input, select').forEach(el => el.disabled = true); // Desabilitar campos ocultos
        });

        frequencyField.classList.add('hidden');

        switch (service) {
            case 'cleaning_airbnb':
            case 'regular_clean':
                document.querySelector('.clean-type-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
                frequencyField.classList.remove('hidden');
                document.querySelectorAll('.clean-type-fields input, .common-fields input, .clean-type-fields select, .common-fields select').forEach(el => el.disabled = false);
                break;
            case 'deep_clean':
            case 'one_time_clean':
            case 'move_in_out':
                document.querySelector('.clean-type-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
                document.querySelectorAll('.clean-type-fields input, .common-fields input, .clean-type-fields select, .common-fields select').forEach(el => el.disabled = false);
                break;
            case 'home_organization':
                document.querySelector('.home-organization-fields').classList.remove('hidden');
                document.querySelector('.common-fields').classList.remove('hidden');
                document.querySelectorAll('.home-organization-fields input, .common-fields input, .home-organization-fields select, .common-fields select').forEach(el => el.disabled = false);
                break;
            case 'balcony':
                document.querySelector('.balcony-fields').classList.remove('hidden');
                document.querySelectorAll('.balcony-fields input, .balcony-fields select').forEach(el => el.disabled = false);
                break;
            case 'pet_sitter':
                document.querySelector('.pet-sitter-fields').classList.remove('hidden');
                document.querySelectorAll('.pet-sitter-fields input, .pet-sitter-fields select').forEach(el => el.disabled = false);
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
        document.getElementById('summary-unit-type').textContent = document.getElementById('unit_type')?.value || 'None';
        document.getElementById('summary-size').textContent = document.getElementById('size_square_feet')?.value ? `${document.getElementById('size_square_feet').value} sq ft` : '0 sq ft';
        document.getElementById('summary-bathrooms').textContent = document.getElementById('total_bathrooms')?.value || '0';
        document.getElementById('summary-postal-code').textContent = document.getElementById('postal_code')?.value || 'None';
        document.getElementById('summary-date').textContent = document.getElementById('cleaning_date')?.value || 'None';
        document.getElementById('summary-frequency').textContent = document.getElementById('frequency')?.value || 'None';
    }

    function calculatePrice() {
        const serviceSelect = document.getElementById('service');
        const totalBathrooms = parseInt(document.getElementById('total_bathrooms')?.value, 10) || 1;
        const sizeSquareFeet = parseInt(document.getElementById('size_square_feet')?.value, 10) || 0;
        let price = 0;

        switch (serviceSelect.value) {
            case 'one_time_clean':
                price = 140 + (totalBathrooms - 1) * 20;
                break;
            case 'regular_clean':
                price = 120 + (totalBathrooms - 1) * 20;
                break;
            case 'deep_clean':
                price = 230 + (totalBathrooms - 1) * 30;
                break;
            case 'move_in_out':
                price = 220 + (totalBathrooms - 1) * 25;
                break;
            case 'cleaning_airbnb':
                price = 130 + (totalBathrooms - 1) * 15;
                break;
            case 'balcony':
            case 'cleaning_office':
                price = sizeSquareFeet <= 100 ? 120 : sizeSquareFeet <= 200 ? 180 : 240;
                break;
            default:
                price = 0;
        }

        document.getElementById('price-value').textContent = `$${price.toFixed(2)}`;
    }

    // Inicializar campos ao carregar a página
    showRelevantFields(serviceSelect.value);
    updateSummary();
    calculatePrice();

    // Envio do formulário
    document.getElementById('quote-form').addEventListener('submit', function (event) {
        event.preventDefault();

        // Desabilitar campos ocultos para evitar validação
        document.querySelectorAll('.hidden input, .hidden select').forEach(el => el.disabled = true);

        const serviceID = 'service_aqr1aoq';
        const templateID = 'template_kz17f8e';

        const data = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            service: document.getElementById('service').value,
            unit_type: document.getElementById('unit_type')?.value || 'Not provided',
            size_square_feet: document.getElementById('size_square_feet')?.value || 'Not provided',
            postal_code: document.getElementById('postal_code')?.value || 'Not provided',
            total_bathrooms: document.getElementById('total_bathrooms')?.value || 'Not provided',
            cleaning_date: document.getElementById('cleaning_date')?.value || 'Not provided',
            frequency: document.getElementById('frequency')?.value || 'Not provided',
            recurring_cleaning: document.querySelector('input[name="recurring_cleaning"]:checked')?.value || 'Not provided',
            message: document.getElementById('message')?.value || 'No message provided'
        };

        emailjs.send(serviceID, templateID, data)
            .then(() => {
                alert('Email enviado com sucesso!');
            })
            .catch((error) => {
                console.error('Erro no envio:', error);
                alert('Falha no envio. Verifique os dados e tente novamente.');
            });
    });
});
