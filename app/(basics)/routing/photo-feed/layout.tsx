export const metadata = {
  title: 'Next.js Docs - Intercept Routing',
  description: 'Exploring Next.js 14 intercepting routing features',
};

export default function Layout(props: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
      {props.modal}
      {props.children}
    </>
  );
}
