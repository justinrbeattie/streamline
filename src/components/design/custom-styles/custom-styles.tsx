import { component$} from "@builder.io/qwik";


export const CustomStylesComponent = component$<{styles: string}>((props) => {


  return (
    <style lang="postcss" dangerouslySetInnerHTML={props.styles}></style>
  );
});
