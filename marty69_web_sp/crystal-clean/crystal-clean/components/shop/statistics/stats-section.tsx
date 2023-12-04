type StatsType = {
  id: number;
  name: string;
  value: string;
};

type Props = {
  heading: string;
  description: string;
  stats: StatsType[];
};

type StatsBoxProps = {
  stats: StatsType[];
};

export default function Stats({
  heading,
  description,
  stats,
}: Readonly<Props>) {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {heading}
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              {description}
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            <StatsBox stats={stats} />
          </dl>
        </div>
      </div>
    </div>
  );
}

export function StatsBox({ stats }: Readonly<StatsBoxProps>) {
  return (
    <>
      {stats.map((stat) => (
        <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">
            {stat.name}
          </dt>
          <dd className="order-first text-3xl font-semibold tracking-tight text-zinc-100">
            {stat.value}
          </dd>
        </div>
      ))}
    </>
  );
}
