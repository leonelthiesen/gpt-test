const OpenAi = require('openai');

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

const { recipePrompt }  = require('./prompt.json');

const generateInfo = async (req, res) => {
    const { recipe } = req.body

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `${recipePrompt} ${recipe}` }],
        });

        const data = response.choices[0].message.content;

        return res.status(200).json({
            success: true,
            data: data,
        });        
    } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 401) {
          return res.status(401).json({
            error: "Please provide a valid API key.",
          });
        }
        return res.status(500).json({
          error:
            "An error occurred while generating recipe information. Please try again later.",
        });
    }
};

module.exports = { generateInfo };
