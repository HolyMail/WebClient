type GoogleLoginOptions = {
    type: "google-oauth2",
    user: string,
    oauth2: string,
};

type AppleLoginOptions = {
    type: "apple-login",
    user: string,
    password: string,
};

type LoginOptions = GoogleLoginOptions | AppleLoginOptions;

type ImapOptions = {
    body: {
        emailsCount: number,
        offset: number,
        user: string,
        credentials: string,
    }
    endpoint: string,
    lastFetched: number
};


const base_endpoint = "https://localhost:7018/emails";

const imapOptions: ImapOptions = {
    body: {
        emailsCount: 50,
        offset: 0,
        user: "",
        credentials: "",
    },
    endpoint: "",
    lastFetched: -1,
};

let stopRequested = false;

self.addEventListener("message", async (event) => {
    const { data } = event;
    const { operation, loginOptions } = data;

    console.log(operation);

    switch(operation) {
        case "init": 
        {
            imapOptions.body.user = loginOptions.user;

            if(loginOptions.type === "google-oauth2") {
                const options = loginOptions as GoogleLoginOptions;
        
                imapOptions.body.credentials = options.oauth2;
                imapOptions.endpoint = `${base_endpoint}/google/list`;
            }
        
            if(loginOptions.type === "apple-login") {
                const options = loginOptions as AppleLoginOptions;
        
                imapOptions.body.credentials = options.password;
                imapOptions.endpoint = `${base_endpoint}/apple/list`;
            }
            
            stopRequested = false;

            break;
        }
        case "start":
        {
            if(imapOptions.body.user === "" || imapOptions.body.credentials === "") {
                return;
            }

            stopRequested = false;

            while(!stopRequested){
                await tick();
            }
            break;
        }
        case "stop":
        {
            stopRequested = true;
            break;
        }
    }
});

async function tick() {
    const response = await fetch(imapOptions.endpoint, {
        method: "POST",
        body: JSON.stringify(imapOptions.body),
        headers: {
            "Content-Type": "application/json",
        }
    });

    const {end, data, length } = await response.json();

    if(data[length - 1].uniqueId < imapOptions.lastFetched || imapOptions.lastFetched === -1) {
        postMessage(data);

        imapOptions.lastFetched = data[length - 1].uniqueId;
    }

    if(end) {
        await Delay(60_000);
        return;
    }

    imapOptions.body.offset += imapOptions.body.emailsCount;
}

function Delay(milliseconds: number) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}