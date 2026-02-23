import { supabase } from "@/src/lib/supabase"

type Painting = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
};

export default async function Home() {
  const { data, error } = await supabase.from("paintings").select("*");

console.log("SUPABASE DATA:", data);
console.log("SUPABASE ERROR:", error);

  if (error) {
    return <p>Error loading paintings...</p>;
  }

  return (
   <main style={{ color: "white", padding: "40px" }}>
      <h1>Wasim Art Store</h1>

      <h2>Debug Data:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <h2>Error:</h2>
      <pre>{JSON.stringify(error, null, 2)}</pre>
    </main>
  );
}