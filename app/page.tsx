import { supabase } from "@/src/lib/supabase";

type Painting = {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  available: boolean;
};

export default async function Home() {
  // ✅ Fetch data from Supabase
  const { data: paintings, error } = await supabase
    .from("paintings")
    .select("*")
    .eq("available", true);

  if (error) {
    console.error(error);
  }

  return (
    <main style={{ padding: "40px", color: "white", background: "black" }}>
      <h1>Wasim Art Store</h1>

      <div style={{ display: "grid", gap: "20px" }}>
        {paintings?.map((painting: Painting) => (
          <div
            key={painting.id}
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "12px",
              border: "1px solid #222",
            }}
          >
            <img
              src={painting.image_url}
              alt={painting.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />

            <h2>{painting.title}</h2>
            <p>{painting.description}</p>
            <p>₹ {painting.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}