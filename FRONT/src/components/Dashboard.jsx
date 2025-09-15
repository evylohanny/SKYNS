import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  RadialBarChart, RadialBar
} from 'recharts';

const Dashboard = () => {
  const lineData = [
    { time: "00:00", A: 25, B: 15, C: 10 },
    { time: "01:00", A: 30, B: 25, C: 12 },
    { time: "02:00", A: 35, B: 40, C: 30 },
    { time: "03:00", A: 45, B: 35, C: 25 },
    { time: "04:00", A: 40, B: 30, C: 15 },
    { time: "05:00", A: 80, B: 50, C: 20 },
    { time: "06:00", A: 60, B: 40, C: 18 },
  ];

  const radarData = [
    { subject: "Sales", A: 120, B: 110 },
    { subject: "Marketing", A: 98, B: 130 },
    { subject: "Development", A: 86, B: 130 },
    { subject: "Customer Support", A: 99, B: 100 },
    { subject: "Technology", A: 85, B: 90 },
    { subject: "Administration", A: 65, B: 85 },
  ];

  const cards = [
    {
      title: "Produção | Mensal",
      value: 145,
      subtitle: "12% crescimento",
      color: "#FF7CA8",
      percent: 70,
    },
    {
      title: "Valores | Mensal",
      value: 30480,
      subtitle: "17% crescimento",
      color: "#FF7CA8",
      percent: 80,
    },
    {
      title: "Usuários atv | Mensal",
      value: 14108,
      subtitle: "10% redução",
      color: "#FF7CA8",
      percent: 40,
    },
  ];

  return (
    <div className="w-[80%] mx-auto p-6 space-y-6">
      <div className="w-full flex flex-col">
        <h1 className="text-gray2 font-secondary text-xl">Início</h1>
        <div className="flex font-primary text-gray2/50 gap-2">
          <p>login</p>
          <p>/</p>
          <p>Dashboard</p>
        </div>
      </div>
      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-sm p-4 text-center flex flex-col items-center"
          >
            <p className="text-purpledark font-medium">{card.title}</p>

            <div className='w-full flex items-center justify-center gap-5'>
              {/* Gráfico circular */}
              <div className="w-24 h-24 ">
                <ResponsiveContainer>
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="80%"
                    outerRadius="100%"
                    barSize={10}
                    data={[
                      { name: "percent", value: card.percent, fill: card.color },
                    ]}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise
                      dataKey="value"
                    />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>

              <div className='flex flex-col items-center justify-center'>
                <h2 className="text-2xl font-bold" style={{ color: card.color }}>
                  {card.value}
                </h2>
                <p className="text-xs text-gray1 font-semibold">{card.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Gráficos abaixo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LineChart à esquerda */}
        <div className="bg-white shadow-md rounded-sm p-4">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="A" stroke="#4154F1" />
              <Line type="monotone" dataKey="B" stroke="#2ECA6A" />
              <Line type="monotone" dataKey="C" stroke="#FF771D" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* RadarChart à direita */}
        <div className="bg-white shadow-md rounded-sm p-4">
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Allocated Budget"
                dataKey="A"
                stroke="#5470C6"
                fill="#5470C6"
                fillOpacity={0.6}
              />
              <Radar
                name="Actual Spending"
                dataKey="B"
                stroke="#91CC75"
                fill="#91CC75"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
