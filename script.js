document.getElementById('apiRequestForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Assuming 'manufacturer' and 'model' input fields exist in your HTML
    const manufacturer = document.getElementById('manufacturer').value;
    const model = document.getElementById('model').value;
    
    // Correct the fetch URL string
    fetch(`https://api.api-ninjas.com/v1/aircraft?manufacturer=${manufacturer}&model=${model}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'NIvfw3HXdxzjcO1fgXU58DKOFfitMXNrIjXkE0qN'
        }
    })
    .then(response => response.json())
    .then(data => {
        const responseContainer = document.getElementById('apiResponse');
        responseContainer.innerHTML = ''; // Clear previous content

        if (Array.isArray(data) && data.length > 0) {
            data.forEach(item => {
                const itemContainer = document.createElement('div');
                itemContainer.classList.add('api-item');

                Object.keys(item).forEach(key => {
                    if (typeof item[key] === 'object' && item[key] !== null) {
                        const subItemContainer = document.createElement('div');
                        subItemContainer.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>`;
                        Object.keys(item[key]).forEach(subKey => {
                            const subParagraph = document.createElement('p');
                            subParagraph.innerHTML = `${subKey}: ${item[key][subKey]}`;
                            subItemContainer.appendChild(subParagraph);
                        });
                        itemContainer.appendChild(subItemContainer);
                    } else if (key !== 'image_url') { 
                        const paragraph = document.createElement('p');
                        paragraph.innerHTML = `<strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${item[key]}`;
                        itemContainer.appendChild(paragraph);
                    }
                });

                if (item.image_url) {
                    const image = document.createElement('img');
                    image.src = item.image_url;
                    image.alt = item.name || 'Image';
                    image.style.maxWidth = '100%'; 
                    image.style.marginTop = '10px';
                    itemContainer.appendChild(image);
                }

                responseContainer.appendChild(itemContainer);
            });
        } else {
            responseContainer.textContent = 'No data found for the given parameter.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('apiResponse').innerHTML = 'Failed to fetch data.';
    });
});
