import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";


export default component$(() => {
  return (
    <div class="content">
      <header style=" display:flex; background-attachment:fixed; place-content:center; height:80vh; margin-top:calc(var(--nav-block-start-height) * -1);   background-image: var(--gradient-1); color:#fff;">         <h6>Header</h6></header>
      <main>
        <section >
          <h6>Section</h6>
        </section>
      </main>

      <footer>
        <h6>Footer</h6>
      </footer>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
