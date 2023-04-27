import Head from "next/head";

export default function Chat() {
    const messages = [
        {
            role: "system",
            content: "Your name is John",
        },
    ];



    async function getChat() {
      console.log("getChat");
        try {
          const text = document.getElementById("input").value;
          var message = {'role': 'user', 'content': text};
          messages.push(message);

          const response = await fetch("/api/chatgpt", {
            method: "POST",
            body: JSON.stringify(messages),
          });

          const data = await response.json();
          // console.log(data.choices[0].message);

          // var resMessage = data.choices[0].message;
          // messages.push(resMessage)

        } catch (err) {
            console.log(err);
            messages.pop();
        }
    }

    return (
        <div>
            <Head>
                <title>Chat</title>
            </Head>
            <main>
                <h1>Chat</h1>
                <button onClick={getChat}>Get Chat</button>
                <input type="text" id="input"/>

                <div>
                    {messages.map((message, index) => (
                        <div key={index}>
                            <span>{message.role}</span>
                            <span>{message.content}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
