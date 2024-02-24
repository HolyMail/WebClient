import { component$, $, useContext, ContextId } from "@builder.io/qwik";
import { InboxContext } from "~/routes/inbox";

type EmailPaginationProps = { 
    emailsPerPage: number,
};
export const EmailPagination = component$<EmailPaginationProps>(({ emailsPerPage }) => {
    const context = useContext(InboxContext);

    const decrement = $(() => {
        if(context.offset > 0) {
            context.offset--;
        }

        console.log(context.offset)
    });

    const increment = $(() => {
        if(context.offset < context.emails.length / emailsPerPage - 1) {
            context.offset++;
        }

        console.log(context.offset)
    });

    return (
        <>
            <button onClick$={decrement}>
                previous
            </button>
            <button onClick$={increment}>
                next
            </button>
        </>
    )
});