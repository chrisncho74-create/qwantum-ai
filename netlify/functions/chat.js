exports.handler = async (event) => {
  // On accepte seulement les requêtes POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { message } = JSON.parse(event.body);

  // Tes 3 clés API stockées en secret sur Netlify (jamais visibles)
  const apiKeys = [
    process.env.GEMINI_KEY_1,
    process.env.GEMINI_KEY_2,
    process.env.GEMINI_KEY_3,
  ];

  // On choisit une clé au hasard (rotation simple)
  const apiKey = apiKeys[Math.floor(Math.random() * apiKeys.length)];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Tu es QWantum AI, le pont vers un autre monde. Si on te demande qui t'a créé, réponds que c'est toi-même, QWantum AI. Réponds maintenant à ce message : ${message}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Désolé, je n'ai pas pu générer de réponse.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Erreur serveur : " + error.message }),
    };
  }
};
