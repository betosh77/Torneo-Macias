function MatchSkeleton() {
    return (
      <div className="match-card skeleton">
        {/* Logo izquierda */}
        <div className="team">
          <div className="skeleton-circle" />
          <div className="skeleton-text small" />
        </div>
  
        {/* Centro */}
        <div className="match-info">
          <div className="skeleton-text medium" />
          <div className="skeleton-text large" />
          <div className="skeleton-text small" />
        </div>
  
        {/* Logo derecha */}
        <div className="team">
          <div className="skeleton-circle" />
          <div className="skeleton-text small" />
        </div>
      </div>
    );
  }
  
  export default MatchSkeleton;