type RestCardProps = {
    name: string;
    logo: string;
  };
  
  export default function RestCard({ name, logo }: RestCardProps) {
    return (
      <div className="match-card descanso">
        <div className="team">
          <img src={logo} alt={name} />
          <span>{name}</span>
        </div>
  
        <div className="status">Descansa</div>
      </div>
    );
  }
  