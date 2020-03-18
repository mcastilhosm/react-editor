import React, { useMemo } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

import { Container, Content, Asset } from './styles';

export default function Header() {
  const datetimeFormated = useMemo(
    () => format(new Date(), 'dd/MM/yyyy HH:mm'),
    []
  );

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="React Editor" />

          <Link to="/">EDITOR</Link>
        </nav>

        <aside>
          <Asset>
            <div>
              <strong>{datetimeFormated}</strong>
              <Link
                to="/"
                onClick={() => (window.location.href = '/')}
                disabled
              >
                RESETAR
              </Link>
            </div>
          </Asset>
        </aside>
      </Content>
    </Container>
  );
}
