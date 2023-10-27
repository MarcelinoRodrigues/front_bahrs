import React from 'react';
import { H2, H3, WindowContainer } from '../styled';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

export default function VagasWindow() {
    const [quantidadeDeRegistros, setQuantidadeDeRegistros] = useState(0);

    useEffect(() => {
        const fetch = async () => {
            const result = await axios('https://localhost:44311/api/Vagas/Status');
            setQuantidadeDeRegistros(result.data.length);
        };
        fetch();
    }, []);

    return (
      <WindowContainer>
        <H2>Vagas Disponíveis</H2>
        <div>
            <H3>{quantidadeDeRegistros}</H3>
        </div>
      </WindowContainer>
    );
  }