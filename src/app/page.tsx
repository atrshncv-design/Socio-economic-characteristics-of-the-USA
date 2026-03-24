'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area
} from 'recharts'
import { BarChart3, Building2, TrendingUp, FileText, Zap, Droplets, Flame, Mountain } from 'lucide-react'

// Data
const resourcesData = [
  { name: 'Каменный уголь', reserves: '220 167 млн т', production: '524 млн т', rank: 5, years: 420, perCapita: '662 т/чел', color: '#38a169' },
  { name: 'Нефть', reserves: '68 млрд барр.', production: '8 млрд барр./год', rank: 1, years: 8.5, perCapita: '204 барр./чел', color: '#e53e3e' },
  { name: 'Природный газ', reserves: '17 710 млрд м³', production: '1 033 млрд м³', rank: 1, years: 17.1, perCapita: '53 183 м³/чел', color: '#dd6b20' },
  { name: 'Железная руда', reserves: '1,3 млрд т', production: '46 млн т', rank: 7, years: 28.3, perCapita: '3,9 т/чел', color: '#3182ce' },
  { name: 'Медь', reserves: '48 млн т', production: '1,2 млн т', rank: 4, years: 40, perCapita: '144 кг/чел', color: '#805ad5' },
  { name: 'Цинк', reserves: '9,2 млн т', production: '780 тыс. т', rank: 6, years: 11.8, perCapita: '27,6 кг/чел', color: '#d69e2e' },
  { name: 'Свинец', reserves: '5 млн т', production: '300 тыс. т', rank: 3, years: 16.7, perCapita: '15 кг/чел', color: '#319795' },
  { name: 'Литий', reserves: '1,8 млн т', production: '8,7 тыс. т', rank: 5, years: 207, perCapita: '5,4 кг/чел', color: '#38a169' },
]

const citiesData = [
  { rank: 1, city: 'Нью-Йорк', state: 'Нью-Йорк', y2000: 8008.6, y2010: 8175.1, y2020: 8804.2, y2023: 8258.1, ideal: 8258.1 },
  { rank: 2, city: 'Лос-Анджелес', state: 'Калифорния', y2000: 3694.6, y2010: 3792.6, y2020: 3898.7, y2023: 3820.9, ideal: 4129.1 },
  { rank: 3, city: 'Чикаго', state: 'Иллинойс', y2000: 2896.1, y2010: 2695.6, y2020: 2746.4, y2023: 2664.4, ideal: 2752.7 },
  { rank: 4, city: 'Хьюстон', state: 'Техас', y2000: 1974.2, y2010: 2100.3, y2020: 2304.5, y2023: 2314.2, ideal: 2064.5 },
  { rank: 5, city: 'Феникс', state: 'Аризона', y2000: 1322.1, y2010: 1445.6, y2020: 1608.1, y2023: 1650.1, ideal: 1651.6 },
  { rank: 6, city: 'Филадельфия', state: 'Пенсильвания', y2000: 1517.6, y2010: 1526.0, y2020: 1603.7, y2023: 1550.4, ideal: 1376.4 },
  { rank: 7, city: 'Сан-Антонио', state: 'Техас', y2000: 1160.0, y2010: 1327.4, y2020: 1434.6, y2023: 1495.3, ideal: 1179.7 },
  { rank: 8, city: 'Сан-Диего', state: 'Калифорния', y2000: 1223.4, y2010: 1307.4, y2020: 1386.9, y2023: 1388.3, ideal: 1032.3 },
  { rank: 9, city: 'Даллас', state: 'Техас', y2000: 1188.6, y2010: 1197.8, y2020: 1304.4, y2023: 1302.8, ideal: 917.6 },
  { rank: 10, city: 'Джексонвилл', state: 'Флорида', y2000: 735.5, y2010: 821.7, y2020: 949.6, y2023: 985.8, ideal: 825.8 },
]

const regionsData = [
  { region: 'I. СЕВЕРО-ВОСТОК', population: 57609148, area: 469672, popShare: 17.38, areaShare: 4.78, kN: 3.64, kR: 12.6, level: 0 },
  { region: '  1.1 Новая Англия', population: 15116205, area: 186481, popShare: 4.56, areaShare: 1.90, kN: 2.40, kR: 2.66, level: 1 },
  { region: '  1.2 Среднеатлантические', population: 42492943, area: 283191, popShare: 12.82, areaShare: 2.88, kN: 4.45, kR: 9.94, level: 1 },
  { region: 'II. СРЕДНИЙ ЗАПАД', population: 68985454, area: 2128797, popShare: 20.81, areaShare: 21.65, kN: 0.96, kR: -0.84, level: 0 },
  { region: 'III. ЮГ', population: 126266107, area: 2384620, popShare: 38.09, areaShare: 24.26, kN: 1.57, kR: 13.83, level: 0 },
  { region: '  3.1 Южноатлантические', population: 66089734, area: 758955, popShare: 19.94, areaShare: 7.72, kN: 2.58, kR: 12.22, level: 1 },
  { region: 'IV. ЗАПАД', population: 78588572, area: 4847663, popShare: 23.71, areaShare: 49.31, kN: 0.48, kR: -25.6, level: 0 },
  { region: '  4.1 Горные штаты', population: 24919150, area: 2237675, popShare: 7.52, areaShare: 22.76, kN: 0.33, kR: -15.24, level: 1 },
  { region: '  4.2 Тихоокеанские', population: 53669422, area: 2609988, popShare: 16.19, areaShare: 26.55, kN: 0.61, kR: -10.36, level: 1 },
]

const lorenzData = [
  { region: 'Горные штаты', popCum: 7.52, areaCum: 22.76 },
  { region: 'Сев.-Зап. центр', popCum: 14.04, areaCum: 36.47 },
  { region: 'Тихоокеанские', popCum: 30.23, areaCum: 63.02 },
  { region: 'Юго-Зап. центр', popCum: 42.53, areaCum: 76.73 },
  { region: 'СРЕДНИЙ ЗАПАД', popCum: 63.34, areaCum: 98.38 },
  { region: 'Юго-Вост. центр', popCum: 69.19, areaCum: 103.21 },
  { region: 'Сев.-Вост. центр', popCum: 83.48, areaCum: 111.15 },
  { region: 'Южноатлантические', popCum: 103.42, areaCum: 118.87 },
  { region: 'СЕВЕРО-ВОСТОК', popCum: 120.8, areaCum: 123.65 },
  { region: 'Среднеатлантич.', popCum: 133.62, areaCum: 126.53 },
]

const statesCount = [
  { state: 'Техас', count: 3, color: '#e53e3e' },
  { state: 'Калифорния', count: 2, color: '#3182ce' },
  { state: 'Нью-Йорк', count: 1, color: '#38a169' },
  { state: 'Аризона', count: 1, color: '#dd6b20' },
  { state: 'Иллинойс', count: 1, color: '#805ad5' },
  { state: 'Пенсильвания', count: 1, color: '#d69e2e' },
  { state: 'Флорида', count: 1, color: '#319795' },
]

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ru-RU').format(num)
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('resources')

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-green-600">1</Badge>
    if (rank <= 3) return <Badge className="bg-green-500">{rank}</Badge>
    if (rank <= 5) return <Badge className="bg-blue-500">{rank}</Badge>
    return <Badge variant="secondary">{rank}</Badge>
  }

  const getYearsBadge = (years: number) => {
    if (years >= 50) return <Badge className="bg-green-600">{years} лет</Badge>
    if (years >= 20) return <Badge className="bg-yellow-500">{years} лет</Badge>
    return <Badge className="bg-red-500">{years} лет</Badge>
  }

  const getKNColor = (kN: number) => {
    if (kN >= 2) return 'text-green-600 font-bold'
    if (kN >= 1) return 'text-yellow-600 font-semibold'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 to-slate-700 text-white py-8 px-6 shadow-lg shrink-0">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Социально-экономическая характеристика США</h1>
          <p className="text-slate-300">Интерактивный дашборд для анализа данных</p>
          <p className="text-sm text-slate-400 mt-1">Данные: USGS, EIA, Бюро переписи США 2023-2024</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col gap-6">
          {/* Navigation */}
          <div className="bg-white rounded-xl p-4 shadow-sm border shrink-0">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 h-auto p-0 bg-transparent">
              <TabsTrigger 
                value="resources" 
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white"
              >
                <BarChart3 className="h-4 w-4" />
                <span className="hidden sm:inline">Ресурсообеспеченность</span>
                <span className="sm:hidden">Ресурсы</span>
              </TabsTrigger>
              <TabsTrigger 
                value="zipf" 
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white"
              >
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">График Ципфа</span>
                <span className="sm:hidden">Ципф</span>
              </TabsTrigger>
              <TabsTrigger 
                value="lorenz" 
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white"
              >
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Кривая Лоренца</span>
                <span className="sm:hidden">Лоренц</span>
              </TabsTrigger>
              <TabsTrigger 
                value="summary" 
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-slate-800 data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4" />
                <span>Сводка</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* RESOURCES TAB */}
          <TabsContent value="resources" className="space-y-6 mt-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-amber-100 text-sm mb-1">Место по добыче нефти</p>
                  <div className="text-3xl font-bold">1</div>
                  <Flame className="h-6 w-6 mt-2 opacity-50" />
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-blue-100 text-sm mb-1">Место по добыче газа</p>
                  <div className="text-3xl font-bold">1</div>
                  <Droplets className="h-6 w-6 mt-2 opacity-50" />
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-green-100 text-sm mb-1">Обеспеченность углём</p>
                  <div className="text-3xl font-bold">420</div>
                  <p className="text-sm text-green-100">лет</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-purple-100 text-sm mb-1">Обеспеченность литием</p>
                  <div className="text-3xl font-bold">207</div>
                  <Zap className="h-6 w-6 mt-2 opacity-50" />
                </CardContent>
              </Card>
            </div>

            {/* Table */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Mountain className="h-5 w-5" />
                  Таблица ресурсообеспеченности США
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Вид ископаемых</TableHead>
                        <TableHead className="font-semibold">Разведанные запасы</TableHead>
                        <TableHead className="font-semibold">Объём добычи</TableHead>
                        <TableHead className="font-semibold">Место</TableHead>
                        <TableHead className="font-semibold">Обеспеченность</TableHead>
                        <TableHead className="font-semibold">На душу нас.</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resourcesData.map((resource) => (
                        <TableRow key={resource.name} className="hover:bg-slate-50">
                          <TableCell className="font-medium">{resource.name}</TableCell>
                          <TableCell>{resource.reserves}</TableCell>
                          <TableCell>{resource.production}</TableCell>
                          <TableCell>{getRankBadge(resource.rank)}</TableCell>
                          <TableCell>{getYearsBadge(resource.years)}</TableCell>
                          <TableCell>{resource.perCapita}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ресурсообеспеченность по видам (лет)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={resourcesData} layout="vertical" margin={{ left: 20, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis type="number" tick={{ fontSize: 12 }} />
                        <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 11 }} />
                        <Tooltip formatter={(value: number) => [`${value} лет`, 'Обеспеченность']} />
                        <Bar dataKey="years" radius={[0, 4, 4, 0]}>
                          {resourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Место США в мире по добыче</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourcesData}
                          dataKey="years"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ name, rank }) => `${name} (${rank})`}
                          labelLine={false}
                        >
                          {resourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" align="right" verticalAlign="middle" />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Box */}
            <Card className="border-l-4 border-l-blue-500 bg-blue-50 overflow-hidden">
              <CardContent className="p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Ключевые выводы:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-blue-800">
                  <li>США занимают <strong>1-е место</strong> в мире по добыче нефти и природного газа</li>
                  <li>Высокая обеспеченность углём (420 лет) и литием (207 лет) создаёт стратегическое преимущество</li>
                  <li>Невысокая обеспеченность нефтью (8,5 лет) требует освоения новых месторождений</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ZIPF TAB */}
          <TabsContent value="zipf" className="space-y-6 mt-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-red-100 text-sm mb-1">Население Нью-Йорка</p>
                  <div className="text-2xl font-bold">8,26 млн</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-indigo-100 text-sm mb-1">Крупнейших городов</p>
                  <div className="text-3xl font-bold">10</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-teal-500 to-teal-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-teal-100 text-sm mb-1">Соотношение 1/2 город</p>
                  <div className="text-3xl font-bold">2,2:1</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-orange-100 text-sm mb-1">Идеальное соотношение</p>
                  <div className="text-3xl font-bold">2:1</div>
                </CardContent>
              </Card>
            </div>

            {/* Cities Table */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Крупнейшие города США (тыс. чел.)</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">#</TableHead>
                        <TableHead className="font-semibold">Город</TableHead>
                        <TableHead className="font-semibold">Штат</TableHead>
                        <TableHead className="font-semibold text-right">2000</TableHead>
                        <TableHead className="font-semibold text-right">2010</TableHead>
                        <TableHead className="font-semibold text-right">2020</TableHead>
                        <TableHead className="font-semibold text-right">2023</TableHead>
                        <TableHead className="font-semibold text-right">Идеальная</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {citiesData.map((city) => (
                        <TableRow key={city.rank} className="hover:bg-slate-50">
                          <TableCell>{city.rank}</TableCell>
                          <TableCell className="font-medium">{city.city}</TableCell>
                          <TableCell>{city.state}</TableCell>
                          <TableCell className="text-right">{formatNumber(city.y2000)}</TableCell>
                          <TableCell className="text-right">{formatNumber(city.y2010)}</TableCell>
                          <TableCell className="text-right">{formatNumber(city.y2020)}</TableCell>
                          <TableCell className="text-right font-bold text-blue-600">{formatNumber(city.y2023)}</TableCell>
                          <TableCell className="text-right text-slate-400">{formatNumber(city.ideal)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Zipf Chart */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">График Ципфа: Фактическое vs Идеальное распределение</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={citiesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="rank" label={{ value: 'Ранг города', position: 'bottom', fontSize: 12 }} tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => formatNumber(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="y2023" name="Фактическое (2023)" stroke="#3182ce" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
                      <Line type="monotone" dataKey="ideal" name="Идеальное по Ципфу" stroke="#e53e3e" strokeDasharray="5 5" dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Динамика населения городов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={citiesData} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="city" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="y2000" name="2000" stroke="#94a3b8" dot={false} />
                        <Line type="monotone" dataKey="y2010" name="2010" stroke="#64748b" dot={false} />
                        <Line type="monotone" dataKey="y2020" name="2020" stroke="#475569" dot={false} />
                        <Line type="monotone" dataKey="y2023" name="2023" stroke="#1e293b" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Распределение городов по штатам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statesCount}
                          dataKey="count"
                          nameKey="state"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          label={({ state, count }) => `${state}: ${count}`}
                        >
                          {statesCount.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Box */}
            <Card className="border-l-4 border-l-green-500 bg-green-50 overflow-hidden">
              <CardContent className="p-4">
                <h4 className="font-semibold text-green-900 mb-2">Выводы по графику Ципфа:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-800">
                  <li>Распределение городов <strong>близко к идеальному</strong>, что указывает на зрелую систему расселения</li>
                  <li>Соотношение населения 1-го и 2-го городов ≈ <strong>2,2:1</strong> (близко к идеальному 2:1)</li>
                  <li><strong>Растут города Юга и Запада:</strong> Хьюстон, Феникс, Сан-Антонио</li>
                  <li><strong>Стагнируют города Севера:</strong> Чикаго, Филадельфия</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LORENZ TAB */}
          <TabsContent value="lorenz" className="space-y-6 mt-0">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-slate-600 to-slate-700 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-slate-300 text-sm mb-1">Население США</p>
                  <div className="text-2xl font-bold">331,4 млн</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-slate-600 to-slate-700 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-slate-300 text-sm mb-1">Площадь страны</p>
                  <div className="text-2xl font-bold">9,83 млн км²</div>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-green-200 text-sm mb-1">Макс. Kₙ</p>
                  <div className="text-3xl font-bold">4,45</div>
                  <p className="text-xs text-green-200">Среднеатлантические</p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-red-600 to-red-700 text-white overflow-hidden">
                <CardContent className="p-4">
                  <p className="text-red-200 text-sm mb-1">Мин. Kₙ</p>
                  <div className="text-3xl font-bold">0,33</div>
                  <p className="text-xs text-red-200">Горные штаты</p>
                </CardContent>
              </Card>
            </div>

            {/* Regions Table */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Макрорегионы США: Коэффициенты концентрации</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="font-semibold">Макрорегион</TableHead>
                        <TableHead className="font-semibold text-right">Население</TableHead>
                        <TableHead className="font-semibold text-right">Площадь</TableHead>
                        <TableHead className="font-semibold text-right">Доля нас.</TableHead>
                        <TableHead className="font-semibold text-right">Доля пл.</TableHead>
                        <TableHead className="font-semibold text-right">Kₙ</TableHead>
                        <TableHead className="font-semibold text-right">Kᵣ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {regionsData.map((region, idx) => (
                        <TableRow key={idx} className={region.level === 0 ? 'bg-slate-50 font-semibold' : ''}>
                          <TableCell className={region.level === 1 ? 'text-slate-500' : ''}>
                            {region.region}
                          </TableCell>
                          <TableCell className="text-right">{formatNumber(region.population)}</TableCell>
                          <TableCell className="text-right">{formatNumber(region.area)}</TableCell>
                          <TableCell className="text-right">{region.popShare}%</TableCell>
                          <TableCell className="text-right">{region.areaShare}%</TableCell>
                          <TableCell className={`text-right ${getKNColor(region.kN)}`}>
                            {region.kN > 1 ? '▲' : region.kN < 1 ? '▼' : '●'} {region.kN.toFixed(2)}
                          </TableCell>
                          <TableCell className={`text-right ${region.kR > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {region.kR > 0 ? '+' : ''}{region.kR}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Lorenz Curve */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Кривая Лоренца: Распределение населения по площади</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lorenzData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="popCum" tick={{ fontSize: 12 }} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip formatter={(value: number) => `${value.toFixed(1)}%`} />
                      <Legend />
                      <Line 
                        type="linear" 
                        data={lorenzData.map((d) => ({ ...d, equal: d.popCum }))} 
                        dataKey="equal" 
                        name="Равномерное" 
                        stroke="#38a169" 
                        strokeDasharray="10 5" 
                        dot={false} 
                        strokeWidth={2}
                      />
                      <Area type="monotone" dataKey="areaCum" name="Фактическое" stroke="#3182ce" fill="#3182ce" fillOpacity={0.2} strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Коэффициент Kₙ по регионам</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionsData.filter(r => r.level === 0)} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="region" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Bar dataKey="kN" name="Коэффициент Kₙ" radius={[4, 4, 0, 0]}>
                          {regionsData.filter(r => r.level === 0).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.kN >= 1 ? '#38a169' : '#e53e3e'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Доля населения vs Доля площади</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={regionsData.filter(r => r.level === 0)} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="region" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
                        <YAxis tick={{ fontSize: 12 }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="popShare" name="Доля населения %" fill="#3182ce" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="areaShare" name="Доля площади %" fill="#38a169" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Info Box */}
            <Card className="border-l-4 border-l-purple-500 bg-purple-50 overflow-hidden">
              <CardContent className="p-4">
                <h4 className="font-semibold text-purple-900 mb-2">Интерпретация коэффициентов:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-purple-800 mb-2">
                  <li><strong>Kₙ &gt; 1</strong> — население сконцентрировано (высокая плотность)</li>
                  <li><strong>Kₙ ≈ 1</strong> — равномерное распределение</li>
                  <li><strong>Kₙ &lt; 1</strong> — население рассредоточено (низкая плотность)</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SUMMARY TAB */}
          <TabsContent value="summary" className="space-y-6 mt-0">
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Общие выводы по практической работе</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border-l-4 border-l-blue-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-blue-900 mb-1">Ресурсообеспеченность</h4>
                  <p className="text-sm text-blue-800">США обладают значительными природными ресурсами, занимая лидирующие позиции в мире по добыче нефти и природного газа.</p>
                </div>
                <div className="bg-green-50 border-l-4 border-l-green-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-green-900 mb-1">Система расселения</h4>
                  <p className="text-sm text-green-800">Городская сеть США соответствует правилу «ранг-размер», что свидетельствует о зрелости системы расселения.</p>
                </div>
                <div className="bg-purple-50 border-l-4 border-l-purple-500 p-4 rounded-r-lg">
                  <h4 className="font-semibold text-purple-900 mb-1">Размещение населения</h4>
                  <p className="text-sm text-purple-800">Население концентрируется в прибрежных районах и вблизи Великих озёр, тогда как внутренние территории имеют низкую плотность.</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Ключевые показатели</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Ресурсообеспеченность нефтью</span>
                      <span className="text-sm text-slate-500">8,5 лет</span>
                    </div>
                    <Progress value={8.5} className="h-2" />
                    <p className="text-xs text-slate-400 mt-1">Критично низкая</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Ресурсообеспеченность углём</span>
                      <span className="text-sm text-slate-500">420 лет</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-slate-400 mt-1">Очень высокая</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Ресурсообеспеченность литием</span>
                      <span className="text-sm text-slate-500">207 лет</span>
                    </div>
                    <Progress value={100} className="h-2" />
                    <p className="text-xs text-slate-400 mt-1">Высокая</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">Соответствие правилу Ципфа</span>
                      <span className="text-sm text-slate-500">~85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                    <p className="text-xs text-slate-400 mt-1">Соответствие идеальному</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Факторы развития</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-sm">Исторические:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                      <li>Колонизация с Востока на Запад</li>
                      <li>Формирование промышленного пояса</li>
                      <li>Развитие железнодорожной сети</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-sm">Природные:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                      <li>Климатические различия регионов</li>
                      <li>Рельеф (горные хребты, равнины)</li>
                      <li>Водные ресурсы</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 text-sm">Экономические:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                      <li>Развитие высоких технологий</li>
                      <li>Смена налоговой политики штатов</li>
                      <li>Глобализация экономики</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6 px-6 mt-auto shrink-0">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-300">Интерактивный дашборд создан на основе практической работы</p>
          <p className="text-sm text-slate-400 mt-2">
            Источники данных:{' '}
            <a href="https://www.usgs.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">USGS</a>
            ,{' '}
            <a href="https://www.eia.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">EIA</a>
            ,{' '}
            <a href="https://www.census.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Бюро переписи США</a>
            {' '}(2023-2024)
          </p>
        </div>
      </footer>
    </div>
  )
}
