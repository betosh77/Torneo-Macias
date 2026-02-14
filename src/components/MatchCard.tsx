type Team = {
    name: string;
    role?: string;
    logo: string;
  };
  
  type MatchCardProps = {
    date: string;
    time: string;
    field: string;
    status: string;
    home: Team;
    away: Team;
  };
  
  export default function MatchCard({
    date,
    time,
    field,
    status,
    home,
    away,
  }: MatchCardProps) {
    return (
      <div className="match-card">
        <div className="team">
          <img src={home.logo} alt={home.name} />
          <span>{home.name}</span>
          {home.role && <small>{home.role}</small>}
        </div>
  
        <div className="match-info">
          <p>{date}</p>
          <h2>{time}</h2>
          <div className="field">{field}</div>
          <div className="status">{status}</div>
        </div>
  
        <div className="team">
          <img src={away.logo} alt={away.name} />
          <span>{away.name}</span>
          {away.role && <small>{away.role}</small>}
        </div>
      </div>
    );
  }
  