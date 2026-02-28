import { supabase } from "@/src/lib/supabase";
export const dynamic = "force-dynamic";

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
  <main
    style={{
      padding: "40px",
      color: "white",
      background: "black",
      minHeight: "100vh",
    }}
  >
    <h1 style={{ marginBottom: "30px" }}>Wasim Art Store</h1>

    {/* ✅ Responsive Gallery Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: "28px",
      }}
    >
      {paintings?.map((painting: Painting) => (
        <div
          key={painting.id}
          style={{
            background: "#111",
            padding: "16px",
            borderRadius: "14px",
            border: "1px solid #222",
            transition: "transform 0.2s ease",
          }}
        >
          {/* ✅ Fixed-size image container */}
          <img
            src={painting.image_url}
            alt={painting.title}
            style={{
              width: "100%",
              height: "260px",
              objectFit: "cover",   // prevents stretching
              borderRadius: "10px",
              marginBottom: "14px",
            }}
          />

          <h2 style={{ margin: "6px 0" }}>{painting.title}</h2>

          <p style={{ color: "#aaa", fontSize: "14px" }}>
            {painting.description}
          </p>

          <p style={{ fontWeight: "bold", marginTop: "10px" }}>
            ₹ {painting.price}
          </p>
        </div>
      ))}
    </div>
  </main>
)};