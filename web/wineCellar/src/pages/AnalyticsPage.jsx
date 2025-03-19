import { useEffect, useState } from 'react';
import { PageLayout } from '../components/PageLayout';
import * as API from '../services/ApiService';
import { ResizableChart } from '../components/ResizableChart/ResizableChart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Rectangle,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import image1 from '../assets/analytics/specification_5967094.png';
import image2 from '../assets/analytics/shopping_4698443.png';

// Colores para PieChart
const COLORS = [
  '#66031dff',
  '#35470fff',
  '#db7d95ff',
  '#9c2a5dff',
  '#8b4e5aff',
];

// Diccionario de iconos por país
const countryIcons = {
  España: 'spanish-flag.svg',
  Usa: 'us.svg',
  France: 'svg/path-to-france-icon.svg',
};

const renderCustomAxisTick = ({ x, y, payload }) => {
  const country = payload.value;
  const icon = countryIcons[country];

  return (
    <g transform={`translate(${x},${y})`}>
      {icon ? (
        <image xlinkHref={icon} x="-12" y="-12" width="24" height="24" />
      ) : (
        <text x={0} y={0} dy={16} fontSize={12} textAnchor="middle">
          {country}
        </text>
      )}
    </g>
  );
};

export default function AnalyticsPage() {
  const [cellar, setCellar] = useState(null);
  const [chartData, setChartData] = useState({
    year: [],
    type: [],
    winery: [],
    grapeVariety: [],
    country: [],
  });
  const [marketValue, setMarketValue] = useState(0);
  const [purchaseValue, setPurchaseValue] = useState(0);

  useEffect(() => {
    API.getCellar()
      .then((data) => {
        setCellar(data);
        if (data?.wines) {
          setMarketValue(
            data.wines.reduce(
              (acc, wine) =>
                acc +
                wine.price *
                  Math.pow(1 + 0.05, new Date().getFullYear() - wine.year),
              0
            )
          );
          setPurchaseValue(
            data.wines.reduce((acc, wine) => acc + wine.price, 0)
          );
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!cellar?.wines) return;

    const processData = (key) => {
      return cellar.wines.reduce((acc, wine) => {
        const value = wine[key];
        const found = acc.find((item) => item[key] === value);
        if (found) {
          found.bottles += 1;
        } else {
          acc.push({ [key]: value, bottles: 1 });
        }
        return acc;
      }, []);
    };

    setChartData({
      year: processData('year').sort((a, b) => a.year - b.year),
      type: processData('winetype'),
      winery: processData('winery'),
      grapeVariety: processData('grapeVariety'),
      country: processData('country'),
    });
  }, [cellar?.wines]);

  const renderChart = (data, dataKey, title) => (
    <div className="relative mx-auto w-full bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <h2 className="text-2xl font-semibold text-gray-900 text-center">
        {title}
      </h2>
      <ResizableChart className="mt-5">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} tick={renderCustomAxisTick} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="bottles"
            fill="#34480fff"
            activeBar={<Rectangle fill="#66031dff" stroke="#a82741ff" />}
          />
        </BarChart>
      </ResizableChart>
    </div>
  );

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="tooltip border bg-white text-black p-2">
          <p>{payload[0].payload.winery}</p>
          <p>{payload[0].payload.bottles} bottles</p>
        </div>
      );
    }

    return null;
  };

  const renderPieChart = (data, title) => (
    <div className="relative mx-auto w-full bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
      <h2 className="text-2xl font-semibold text-gray-900 text-center">
        {title}
      </h2>
      <ResizableChart className="mt-5">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="bottles"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResizableChart>
    </div>
  );

  return (
    <PageLayout>
      <div className="flex flex-col items-center gap-6 p-6">
        <h1 className="text-3xl font-bold text-gray-900">Analítics</h1>
        <p className="text-gray-500">
          Analytical data about the wines stored in your cellar.
        </p>

        <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl">
          <div className="flex-1 bg-white rounded-lg shadow-xl ring-1 ring-gray-900/5 flex items-center p-6">
            <img
              src={image1}
              alt="Market Image"
              className="w-25 h-auto p-1 mr-4 object-contain"
            />

            <div>
              <div className="ml-20 text-sm font-medium text-gray-500">
                Market Value
              </div>
              <p className="ml-20 text-2xl font-semibold text-gray-900">
                {marketValue.toFixed(2)} €
              </p>
            </div>
          </div>

          <div className="flex-1 bg-white p-6 rounded-lg shadow-xl ring-1 ring-gray-900/5 flex items-center">
            {/* Imagen a la izquierda */}
            <img
              src={image2}
              alt="Purchase Image"
              className="w-25 h-auto p-1 object-contain mr-4"
            />

            <div>
              <h3 className=" ml-20 text-sm font-medium text-gray-500">
                Purchase Value
              </h3>
              <p className="ml-20 text-2xl font-semibold text-gray-900">
                {purchaseValue.toFixed(2)} €
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-8 mt-5">
          {renderChart(chartData.year, 'year', 'Quantity of wines by Year')}
          {renderChart(chartData.type, 'winetype', 'Quantity by Wine Type')}
          {renderChart(chartData.winery, 'winery', 'Quantity by Winery')}
          {renderPieChart(chartData.winery, 'Distribution by Winery')}
          {renderChart(chartData.country, 'country', 'Quantity by Country')}
        </div>
      </div>
    </PageLayout>
  );
}
