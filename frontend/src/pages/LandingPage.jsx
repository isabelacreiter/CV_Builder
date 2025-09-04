import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function LandingPage() {
  return (
    <>
      <Header />
      <NavBar />
      <main className="py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">CV Builder</h1>
        <p className="mb-8">Crie, edite e exporte seu currículo com um visual profissional em poucos minutos.</p>

        <section>
          <h2 className="text-xl font-semibold mb-2">Últimos currículos</h2>
          <p>Ainda não há currículos cadastrados.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
