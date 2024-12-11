async function sendMessage(event) {
    event.preventDefault();
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("config.json");
        const config = await response.json();
        const apiKey = config.apiKey;
        const url = 'https://openrouter.ai/api/v1/chat/completions';

        const data = {
            model: 'openai/gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }]
        };

        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resultData = await result.json();
        const botResponse = resultData.choices[0].message.content;

        const responseElement = document.getElementById("response");
        responseElement.innerHTML = "";
        let i = 0;
        const interval = setInterval(() => {
            if (i < botResponse.length) {
                responseElement.textContent += botResponse.charAt(i);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 30); // Changed the interval to speed up the typing animation
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}
