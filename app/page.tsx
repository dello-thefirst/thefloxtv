import Header from "./components/Header";
import MainCarousel from "./components/MainCarousel";
import "@/app/dist/style/App.css";

function Home() {
  return (
    <>
      <Header page="home" />
      <MainCarousel />
    </>
  );
}

export default Home;
