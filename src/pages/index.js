import Head from "next/head"



export default function Chat() {

  async function getChat() {
    try {
        console.log('getChat')
        const response = await fetch('/api/chatgpt', {
            method: 'POST',
            body: JSON.stringify( [
                    {
                        "role": "system",
                        "message": "Your name is John",
                    },
                    {
                        "role": "user",
                        "message": "What is your name?",
                    }
                ]
            )
        })
        const data = await response.json()
        console.log(data)
    } catch(err) {
        console.log(err)
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
      </main>
    </div>
  )
}