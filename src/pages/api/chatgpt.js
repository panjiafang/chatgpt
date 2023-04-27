import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// export default async function handler(messages, res) {
//     const prompt = req.body.prompt;
//     const response = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: messages,
//     });

//     res.status(200).json(response);
// }

export default async function handler(req, res) {
    console.log("handler:", req.body);
    const messages = req.body.messages;
    console.log("messages:", messages)
    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        }, { timeout: 10000 });
        res.status(200).json(response);
    } catch (err) {
        console.log(err);

        if (err.response) {
            res.status(err.response.status).json({
                statusCode: err.response.status,
                message: err.response.statusText,
            });
        } else {
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    }
}
