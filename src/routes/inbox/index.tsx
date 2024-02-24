import { component$, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";


export default component$(() => {
    useVisibleTask$(() => {
        const imap = new Worker("/public/workers/imap.worker.ts");

        const loginOptions: any = {
            type: "apple-login",
            user: "lorenzomarchisio05@icloud.com",
            password: "xbmv-sydq-sypt-cjon",
        }

        imap.postMessage({
            operation: "init",
            loginOptions,
        });

        imap.postMessage({
            operation: "start",
        });

        imap.onmessage = (e) => {
            console.log(e.data);
        }

        setTimeout(() => {
            imap.postMessage({
                operation: "stop"
            })
        }, 10_000);


    })

    return (
        <>
            <h1>hi</h1>
        </>
    );
});

export const head: DocumentHead = {
    title: "HolyMail Web",
    meta: [
        {
            name: "description",
            content: "HolyMail web application",
        },
    ],
};
