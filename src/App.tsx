import "./App.css";
import MatchCard from "./components/MatchCard";
import RestCard from "./components/RestCard";
import MatchSkeleton from "./components/MatchSkeleton";
import { useEffect, useState } from "react";
import { getMatches } from "./services/getMatches";

type Team = {
  name: string;
  role?: string;
  logo: string;
};

type Match =
  | {
      categoria: string;
      suspendida?: boolean;
      mensaje_suspendida?: string;
      type: "game";
      date: string;
      time: string;
      field: string;
      status: string;
      home: Team;
      away: Team;
    }
  | {
      categoria: string;
      suspendida?: boolean;
      mensaje_suspendida?: string;
      type: "rest";
      team: Team;
    };

function App() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     Transformación directa
  ========================= */

  const transformMatches = (raw: any[]): Match[] => {
    return raw.map((item) => {
      const suspendida =
        String(item.suspendida).toUpperCase() === "TRUE";

      if (item.tipo === "rest") {
        return {
          categoria: item.categoria,
          suspendida,
          mensaje_suspendida: item.mensaje_suspendida,
          type: "rest",
          team: {
            name: item.home_name,
            logo: item.home_logo,
          },
        };
      }

      return {
        categoria: item.categoria,
        suspendida,
        mensaje_suspendida: item.mensaje_suspendida,
        type: "game",
        date: item.fecha, // 👈 texto directo del Sheet
        time: item.hora,
        field: item.campo,
        status: item.estado,
        home: {
          name: item.home_name,
          role: item.home_role,
          logo: item.home_logo,
        },
        away: {
          name: item.away_name,
          role: item.away_role,
          logo: item.away_logo,
        },
      };
    });
  };

  /* =========================
     Fetch centralizado
  ========================= */

  const fetchData = () => {
    setLoading(true);

    getMatches()
      .then((data) => {
        const transformed = transformMatches(data);
        setMatches(transformed);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("focus", fetchData);
    return () => window.removeEventListener("focus", fetchData);
  }, []);

  /* =========================
     Agrupar por categoría
  ========================= */

  const groupedMatches = matches.reduce<Record<string, Match[]>>(
    (acc, match) => {
      if (!acc[match.categoria]) {
        acc[match.categoria] = [];
      }
      acc[match.categoria].push(match);
      return acc;
    },
    {}
  );

  /* =========================
     Render
  ========================= */

  return (
    <div className="container">
      <header className="header">
        <div>
          <h1>Tercer torneo Ángel Macías</h1>
          <p>Liga Pequeña de Beisbol Oaxaca</p>
        </div>
      </header>

      {loading && (
        <div className="match-grid">
          <MatchSkeleton />
          <MatchSkeleton />
          <MatchSkeleton />
        </div>
      )}

      {!loading &&
        Object.entries(groupedMatches).map(([categoria, items]) => {
          const isSuspended = items.some((m) => m.suspendida);
          const suspendedItem = items.find((m) => m.suspendida);
          const suspensionMessage =
            suspendedItem?.mensaje_suspendida?.trim();

          return (
            <div key={categoria} className="category-block">
              <div className="chip">{categoria}</div>

              {isSuspended ? (
                <div className="notice">
                  {" "}
                  {suspensionMessage ||
                    `Categoría ${categoria} suspendida`}
                </div>
              ) : (
                <div className="match-grid">
                  {items.map((m, idx) =>
                    m.type === "rest" ? (
                      <RestCard
                        key={idx}
                        name={m.team.name}
                        logo={m.team.logo}
                      />
                    ) : (
                      <MatchCard
                        key={idx}
                        date={m.date}  // 👈 texto directo
                        time={m.time}
                        field={m.field}
                        status={m.status}
                        home={m.home}
                        away={m.away}
                      />
                    )
                  )}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default App;