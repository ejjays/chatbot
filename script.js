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
                responseElement.textContent = botResponse;
                responseElement.style.display = 'block';
                responseElement.style.animation = 'fadeIn 0.5s ease';
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            }
        }
