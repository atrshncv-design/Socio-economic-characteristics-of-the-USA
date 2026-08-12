# Socio-economic Characteristics of the USA

An interactive analytical dashboard of key socio-economic patterns of the United States — a geography coursework/research project built with **Next.js + React + TypeScript**. Combines charts, comparison tables, and short analytical conclusions in a single interface.

> **Status: experiment** — research/coursework project, not a production service.

## Features

- **Resources tab**: comparative data on coal, oil, gas, iron ore, copper, zinc, lead, lithium
- **Zipf's law tab**: largest US cities — rank-size comparison and multi-year population dynamics
- **Lorenz curve tab**: population concentration by macroregion vs. area share
- **Summary tab**: condensed conclusions and development factors
- Mobile-friendly tabbed UI (reusable components + Recharts visualizations)

## Analytical scope

Three core dimensions of the US socio-economic profile:

- Resource availability: reserves, annual extraction, world ranking, estimated years of sufficiency
- Urban system structure: actual city-size hierarchy vs. the ideal Zipf distribution
- Territorial concentration: Lorenz curve analysis of population vs. area

## Local run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Build: `npm run build && npm run start`.

---

# Социально-экономическая характеристика США

Интерактивный аналитический дашборд ключевых социально-экономических закономерностей США — учебно-исследовательский проект по географии на **Next.js + React + TypeScript**. Объединяет графики, сравнительные таблицы и краткие аналитические выводы в одном интерфейсе.

> **Статус: experiment** — исследовательский/учебный проект, не production-сервис.

## Возможности

- **Вкладка «Ресурсы»**: сравнительные данные по углю, нефти, газу, железной руде, меди, цинку, свинцу, литию
- **Вкладка «Закон Ципфа»**: крупнейшие города США — сравнение «ранг–размер» и динамика населения за несколько лет
- **Вкладка «Кривая Лоренца»**: концентрация населения по макрорегионам против доли площади
- **Вкладка «Итоги»**: сжатые выводы и факторы развития
- Мобильный адаптивный интерфейс с вкладками (переиспользуемые компоненты + визуализации Recharts)

## Аналитический охват

Три ключевых измерения социально-экономического профиля США:

- Обеспеченность ресурсами: запасы, годовая добыча, место в мире, расчётные годы обеспеченности
- Структура городской системы: фактическая иерархия городов против идеального распределения Ципфа
- Территориальная концентрация: анализ кривой Лоренца «население против площади»

## Локальный запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000`. Сборка: `npm run build && npm run start`.
