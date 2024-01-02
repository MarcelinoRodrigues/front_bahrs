import React from 'react';
import moment from 'moment';
import { CupomContainer } from './styledCupom';

const CupomComponent = ({ dadosDaApi, onClose }) => {
   const handlePrint = async () => {
      window.print();
      onClose();
   };

   return (
      <CupomContainer>
         <h2>Cupom não Fiscal</h2>
         <p><strong>Entrada:</strong> {moment(dadosDaApi.entrada).format('DD-MM-YYYY HH:mm')}</p>
         <p><strong>Saída:</strong> {moment(dadosDaApi.vencimento).format('DD-MM-YYYY HH:mm')}</p>
         <p><strong>Placa:</strong> {dadosDaApi.placa}</p>
         <p><strong>Valor:</strong>  R${dadosDaApi.valor}</p>
         <ul>
            <button onClick={handlePrint}>Imprimir</button>
            <button className='Cancel' onClick={onClose}>Cancelar</button>
         </ul>
         <style>
        {`
          @media print {
            body {
              visibility: hidden;
            }

            ${CupomContainer} {
              visibility: visible;
              position: absolute;
            }

            h2 {
              font-size: 1.5em;
              margin-bottom: 0.5em;
            }

            p {
              margin-bottom: 0.5em;
            }

            ul {
              list-style-type: none;
              padding: 0;
            }

            li {
              margin-bottom: 0.5em;
            }
          }
        `}
      </style>
      </CupomContainer>
   );
};

export default CupomComponent;
