import React, { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TopPanel.css';

interface TopPanelProps {}

const TopPanel: FC<TopPanelProps> = () => {
  // Función para formatear la hora actual
  const formatCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0'); // Añade ceros a la izquierda si es necesario
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript son de 0 a 11, así que sumamos 1
    const year = now.getFullYear();
    
    // Obtén la zona horaria
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds} ${timezone}`;
  };

  // Estado para manejar la hora actual
  const [currentTime, setCurrentTime] = useState<string>(formatCurrentTime());

  // Efecto para actualizar la hora cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 1000); // Actualiza cada segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <div className="TopPanel">
      {/* Logo */}
      <div className="col-1">
        <Link to="/">
          <img
            className="corner-icon"
            src="src\assets\fomalhaut_logo.png"
            alt="Fomalhaut Logo"
          />
        </Link>
      </div>

      {/* Connection Status */}
      <div className="col-6 connection-status">
        <span>
          <FontAwesomeIcon icon="satellite-dish" />
        </span>
        <span>Ground Station</span>
        <span className="status-text-good">Online</span>
        <span>
          <FontAwesomeIcon icon="satellite" />
        </span>
        <span>Next Satellite Window</span>
        <span className="status-text-info">{currentTime}</span>
      </div>
    </div>
  );
};

export default TopPanel;
