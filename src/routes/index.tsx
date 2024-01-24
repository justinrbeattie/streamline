import { component$, useContext } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { ButtonComponent } from "~/components/design/button/button";
import { LayoutContext } from "./layout";


export default component$(() => {
  const layoutContext = useContext(LayoutContext);
  return (
    <div class="content">
      <header ref={layoutContext.headerRef} style=" display:flex; background-attachment:fixed; place-content:center; height:80vh; margin-top:calc(var(--nav-block-start-height) * -1);">   
        
        <img style="width:100%; height:100%" src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
            
            </header>
      <main ref={layoutContext.mainRef} >
        <section >
          <h6>Section</h6>
        </section>

        <section style="display:grid; place-content:center;">
        <ButtonComponent href="ddd" variant={"primary"} > Learn More </ButtonComponent>
        </section>
      </main>

      <footer ref={layoutContext.footerRef}>
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
