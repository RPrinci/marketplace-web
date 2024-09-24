import { useQuery } from '@tanstack/react-query'
import { format, parseISO, subDays } from 'date-fns'
import { pt } from 'date-fns/locale/pt'
import { UserMultipleIcon } from 'hugeicons-react'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { DateRange } from 'react-day-picker'
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getMetricsViewsPerDay } from '@/api/get-metrics-views-per-day'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DateRangePicker } from '@/components/ui/date-range-picker'

export function VisitorsChart() {
  const [dateRange, setDateRante] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const { data: viewsPerDay } = useQuery({
    queryFn: () => getMetricsViewsPerDay(),
    queryKey: ['metrics', 'views-per-day'],
  })

  const chartData = useMemo(() => {
    return viewsPerDay?.viewsPerDay.map((chartIem) => {
      return {
        date: chartIem.date,
        amount: chartIem.amount,
      }
    })
  }, [viewsPerDay?.viewsPerDay])

  const CustomTooltip = ({ active, payload, label }) => {
    const locale = pt
    if (active && payload && payload.length) {
      return (
        <>
          <Card>
            <CardContent>
              <div className="mb-4 flex h-4 flex-col p-2">
                <h4>{format(parseISO(label), 'd MMMM, yyyy', { locale })}</h4>
                <div className="flex flex-row items-center">
                  <UserMultipleIcon className="mr-2 size-4 text-gray-500" />
                  <span>{payload[0].value} visitantes</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )
    }

    return null
  }

  const CustomTooltip2 = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
          <p className="intro">{label}</p>
          <p className="desc">Anything you want can be displayed here.</p>
        </div>
      )
    }

    return null
  }

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">Visitantes</CardTitle>
        </div>

        <div className="flex items-center gap-3">
          <DateRangePicker
            className="text-gray-500"
            date={dateRange}
            onDateChange={setDateRante}
          />
        </div>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={chartData} style={{ fontSize: 12 }}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                dy={16}
                tickFormatter={(value: number) =>
                  new Date(value).getDate().toString()
                }
              />
              <YAxis
                stroke="#888"
                axisLine={false}
                tickLine={false}
                width={80}
                tickFormatter={(value: number) => value.toString()}
              />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid vertical={false} className="stroke-muted" />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="amount"
                stroke={colors.blue[300]}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[240px] w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
