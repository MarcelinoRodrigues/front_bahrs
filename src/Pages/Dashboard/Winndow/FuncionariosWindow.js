import React, { useEffect, useState } from 'react';
import { H2, H3, WindowContainer } from '../styled';
import axios from 'axios';

export default function FuncionariosWindow() {
    const [quantidadeDeRegistros, setQuantidadeDeRegistros] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios('https://localhost:44311/api/Funcionarios');
            setQuantidadeDeRegistros(result.data.length);
        };
        fetch();
    }, []);

    return (
      <WindowContainer>
      <H2>Funcionarios Totais</H2>
      <div>
          <H3>{quantidadeDeRegistros}</H3>
      </div>
    </WindowContainer>
    );
  }