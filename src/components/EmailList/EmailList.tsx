
import { component$, useContext } from "@builder.io/qwik";
import { InboxContext } from "~/routes/inbox";

type EmailListProps = { 
    emailsPerPage: number 
};

export const EmailList = component$<EmailListProps>(({ emailsPerPage }) => {
    const context = useContext(InboxContext);

    const min = context.offset * emailsPerPage;
    const max = min + emailsPerPage;

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>From</th>
                        <th>Subject</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        context.emails.slice(min, max).map((email) => (
                            <tr key={email.uniqueId}>
                                <td>{email.from}</td>
                                <td>{email.subject}</td>
                                <td>{email.dateTime.toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
})