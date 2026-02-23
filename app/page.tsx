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
  const { data: paintings, error } = await supabase
    .from("paintings")
    .select("*")
    .eq("available", true);

  if (error) {
    return <p>Error loading paintings...</p>;
  }

  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-8">Wasim Art Store</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paintings?.map((p: Painting) => (
          <div
            key={p.id}
            className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
          >
            <img
              src={p.image_url}
              alt={p.title}
              className="w-full h-64 object-cover"
            />

            <div className="p-4">
              <h2 className="text-xl font-semibold">{p.title}</h2>
              <p className="text-gray-600 mt-2">{p.description}</p>
              <p className="text-lg font-bold mt-3">₹{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}