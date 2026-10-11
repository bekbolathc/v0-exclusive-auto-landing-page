"use client"



const carBrands = [
  { name: "Toyota", models: "Camry, Land Cruiser, RAV4" },
  { name: "Lexus", models: "RX, ES, GX" },
  { name: "BMW", models: "3, 5, X5, X7" },
  { name: "Mercedes", models: "C, E, S-Class, GLC" },
  { name: "Kia", models: "K5, K7, Sportage" },
  { name: "Hyundai", models: "Sonata, Tucson, Santa Fe" },
  { name: "Chery", models: "Tiggo 7 Pro, Tiggo 8 Pro" },
  { name: "Haval", models: "Jolion, F7, H9, Dargo" },
  { name: "Geely", models: "Coolray, Atlas Pro, Monjaro" },
  { name: "Changan", models: "CS55 Plus, CS75 Plus, UNI-K" },
  { name: "Exeed", models: "TXL, VX, LX" },
  { name: "Chevrolet", models: "Cobalt, Captiva, TrailBlazer" },
  { name: "Jetour", models: "Dashing, X70 Plus, X90 Plus" },
]

export function CarModelsSection() {
  return (
    <section className="py-14 md:py-20" id="models">
      <div className="container px-4 max-w-5xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-balance">
          Авточехлы в Алматы под любую модель авто
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Более 2 000 лекал — чехлы садятся без складок и провисаний
        </p>

        <ul className="flex flex-wrap justify-center gap-2">
          {carBrands.map((brand) => (
            <li
              key={brand.name}
              title={brand.models}
              className="rounded-full border border-border/60 px-4 py-2 text-sm font-medium"
            >
              {brand.name}
            </li>
          ))}
          <li className="rounded-full px-4 py-2 text-sm text-muted-foreground">и другие</li>
        </ul>
      </div>
    </section>
  )
}
