import { Header } from "@/components/layout/header";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Footer />
    </main>
  );
}
