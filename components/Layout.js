import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, logged }) {
  return (
    <>
      <Header logged={logged} />
      <main className="min-h-[70vh]">{children}</main>
      <Footer logged={logged} />
    </>
  );
}
