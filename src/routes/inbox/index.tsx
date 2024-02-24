import { component$, useStore, useVisibleTask$, createContextId, useContextProvider } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { EmailList } from "~/components/EmailList/EmailList";
import { EmailPagination } from "~/components/EmailPagination/EmailPagination";

export const InboxContext = createContextId<{ emails: Email[], offset: number }>("Inbox.context");

export default component$(() => {
    const emailsPerPage = 50;
    const store = useStore<{ emails: Email[], offset: number }>({ emails: [], offset: 0 });

    useContextProvider(InboxContext, store);

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
            const emails = e.data as Email[];
            store.emails.push(...emails);
        }
    });

    return (
        <>
            <h1>Inbox</h1>
            <EmailPagination emailsPerPage={emailsPerPage} />
            <EmailList emailsPerPage={emailsPerPage}/>
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
