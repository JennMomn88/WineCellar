import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecentReviews from './RecentReviews';

const WineCommentCard = ({ wine, comment }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container mt-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-light w-100 d-flex align-items-center justify-content-between border rounded p-2"
      >
        <div className="d-flex align-items-center gap-3">
          <img
            src={wine.image}
            alt={wine.name}
            className="rounded object-fit-contain bg-black"
            style={{ width: '40px', height: '40px' }}
          />
          <div className="text-start">
            <span className="fw-semibold d-block">{wine.name}</span>
            <span className="text-secondary d-block">
              {wine.year}, {wine.region}
            </span>
          </div>
        </div>
        <span className={isOpen ? 'rotate-180' : ''}>▼</span>
      </button>
      {isOpen && (
        <div className="p-3 text-secondary bg-light border rounded mt-2">
          <p>{wine.description}</p>
          <a href={wine.url} className="text-primary text-decoration-none">
            Ver más detalles
          </a>
          <div className="mt-2 p-2 bg-white border rounded">
            <h6 className="fw-bold">Último comentario:</h6>
            <p>{comment.body || 'No hay comentarios aún'}</p>
            <small className="text-muted">Por: {comment.email}</small>
          </div>
        </div>
      )}
    </div>
  );
};


  return (
    <div className="container mt-4">
      {/* aqui agregamos el recentreviewcomment */}
      <RecentReviews />

      <h2 className="text-center">Lista de Vinos con Últimos Comentarios</h2>
      {wineData.map(({ wine, comment }) => (
        <WineCommentCard key={comment.id} wine={wine} comment={comment} />
      ))}
    </div>
  );
};

export default WineList;
