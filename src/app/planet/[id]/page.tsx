interface PlanetPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlanetPage({ params }: PlanetPageProps) {
  const { id } = await params;

  return (
    <div>
      <h1>Hello World</h1>
      <p>Planet ID: {id}</p>
    </div>
  );
}
