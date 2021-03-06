import React, { useContext, useEffect, useState } from 'react'
import Header from '../../client/Header'
import Filters from '../../client/filters'
import Mes from "../../client/graphics/mes"
import Botoes from '../../components/Botoes'
import GraphicCompany from '../../components/graphic/model'
import CompanyActivity from '../../client/tables/company-activity'
import CompanyNature from '../../client/tables/company-nature'
import Counties from '../../client/tables/counties'
import { ContextGlobal } from '../../contexts/GlobalContext/context'
import { getDataEmpresasAbertas, getDataEmpresasAtivas } from '../../services/pinot'

import './style.css'
import './styleGlobal.css'

export default ({tipo}) => {
  const context = useContext(ContextGlobal)
  const [quantidade, setQuantidade] = useState(null)

  useEffect(() => {
    const getQtdAbertas = async () => {
      var filtros = {classificacao: "", ...context.state};
      const response = await getDataEmpresasAbertas(filtros);
      if(context.state.empresasAbertas == true) await setQuantidade(response.values[0].toLocaleString())
    }
  
    const getQtdAtivas = async () => {
      var filtros = {classificacao: "", ...context.state};
      const response = await getDataEmpresasAtivas(filtros);
      if(context.state.empresasAbertas == false) await setQuantidade(response.values[0]);
    }
  
    getQtdAbertas()
    getQtdAtivas()
  }, [context])

  return (
    <div className='wrap'>
      <Header />
      <Filters />
      <div className='main'>
        <Botoes tipo={tipo} />
      <div className='content-data'>
          <div className='content-tipoEmpresa'>
            {(window.innerWidth >= 320 && window.innerWidth < 768) ? <div className="total-empresasAbertas">
              <p>{`Total de Empresas ${context.state.empresasAbertas ? 'Abertas' : 'Ativas'}`}</p>
              <p>{quantidade !== null && quantidade.toLocaleString('pt-br')}</p>
            </div> : null}
            <div className='tipoEmpresa'>
              <div className='containerGraphics'>
                <GraphicCompany classificationGraphic='porte' isVetical={true} />
                {context.state.empresasAbertas == true && <GraphicCompany classificationGraphic='setor' />}
              </div>
              {context.state.empresasAbertas == false && <CompanyActivity />}
              <CompanyNature />
            </div>
            <Counties />
          </div>
          {context.state.empresasAbertas !== false && context.state.mes === '' && <Mes />}
        </div>
      </div> 
    </div>
  );
}
