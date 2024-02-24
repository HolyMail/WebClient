import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = ({ redirect }) => {
  throw redirect(302, "inbox/");
}

export default component$(() => {
  return (
    <>
      hi
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
