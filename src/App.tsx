import "./App.css";
import MatchCard from "./components/MatchCard";
import RestCard from "./components/RestCard";


type Team = {
  name: string;
  role?: string;
  logo: string;
};

type Game = {
  type: "game";
  date: string;
  time: string;
  field: string;
  status: string;
  home: Team;
  away: Team;
};

type Rest = {
  type: "rest";
  team: Team;
};

type Match = Game | Rest;


const categoria78: Match[] = [

  {
    type: "game",
    date: "sáb 14 de feb",
    time: "09:30 AM",
    field: "Campo CU",
    status: "Programado",
    home: { name: "Pink Sox", role: "Local", logo: "/logos/pinksox.png" },
    away: { name: "Toritos", role: "Visitante", logo: "/logos/toritos.png" },
  },
  {
    type: "rest",
    team: { name: "Raptors", logo: "/logos/raptors.png" },
  },
];

const categoria1314: Match[] = [

  {
    type: "game",
    date: "sáb 14 de feb",
    time: "09:00 AM",
    field: "Ocotlán",
    status: "Programado",
    home: { name: "Doble play", role: "Local", logo: "/logos/dobleplay.png" },
    away: { name: "Raptors", role: "Visitante", logo: "/logos/raptors.png" },
  },
  {
    type: "game",
    date: "sáb 14 de feb",
    time: "09:30 AM",
    field: "Zaachila",
    status: "Programado",
    home: { name: "Zapotecas", role: "Local", logo: "/logos/zapotecas.png" },
    away: { name: "Toros", role: "Visitante", logo: "/logos/toros.png" },
  },
];

function App() {
  return (
    <div className="container">
      {/* HEADER */}
      <header className="header">
        <div>
          <h1>Tercer torneo Ángel Macías</h1>
          <p>Liga Pequeña de Beisbol Oaxaca</p>
        </div>
      </header>

      {/* CATEGORÍA 7-8 */}
      <div className="chip">Categoría 7-8</div>

      <div className="match-grid">
        {categoria78.map((m, idx) => {
          if (m.type === "rest") {
            return (
              <RestCard
                key={idx}
                name={m.team.name}
                logo={m.team.logo}
              />
            );
          }

          return (
            <MatchCard
              key={idx}
              date={m.date}
              time={m.time}
              field={m.field}
              status={m.status}
              home={m.home}
              away={m.away}
            />
          );
        })}
      </div>

      {/* NOTICE */}
      <div className="notice">
        Categorías 9-10 y 11-12 se suspende la jornada por copa Telmex
      </div>

      {/* CATEGORÍA 13-14 */}
      <div className="chip">Categoría 13-14</div>

      <div className="match-grid">
        {categoria1314.map((m, idx) => {
          if (m.type === "rest") {
            return (
              <RestCard
                key={idx}
                name={m.team.name}
                logo={m.team.logo}
              />
            );
          }

          return (
            <MatchCard
              key={idx}
              date={m.date}
              time={m.time}
              field={m.field}
              status={m.status}
              home={m.home}
              away={m.away}
            />
          );
        })}
      </div>
    </div>
  );
}


export default App;
