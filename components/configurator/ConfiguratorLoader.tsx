'use client'

import dynamic from 'next/dynamic'

const SeatConfigurator = dynamic(
  () =>
    import('@/components/configurator/SeatConfigurator').then(m => ({
      default: m.SeatConfigurator,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex flex-col items-center justify-center h-[500px] gap-4 text-muted-foreground">
        <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm">Загрузка 3D конструктора...</p>
      </div>
    ),
  }
)

export function ConfiguratorLoader() {
  return <SeatConfigurator />
}
