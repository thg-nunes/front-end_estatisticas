import React, { useContext, useEffect, useState } from "react"
import { ContextGlobal } from '../../../contexts/GlobalContext/context'
import { getAbertasAnual, getQuantidadeAbertasPorMunicipio } from '../../../services/pinot'
import './style.css'

export default () => {

  const [quantidade, setQuantidade] = useState(null)
  const [municipios] = useState([])
  const [quantidade_abertas_por_municipio] = useState([])

  useEffect(() => {
    const get_abertura_ano = async () => {
      const abertura_ano = await getAbertasAnual()
      setQuantidade(abertura_ano)
    }

    const get_qntd_por_municipio = async () => {
      const response = await getQuantidadeAbertasPorMunicipio()
      response.rows.forEach(element => {
        municipios.push(element[0])
        quantidade_abertas_por_municipio.push(element[1])
      })
    }

    get_abertura_ano()
    get_qntd_por_municipio()
  }, [])

  const context = useContext(ContextGlobal)

  return(
    <div className="content-municipio">
      <div className="total-empresasAbertas">
        <p>{`Total de Empresas ${context.state.empresasAbertas ? 'Abertas' : 'Ativas'}`}</p>
        <p>{quantidade}</p>
      </div>
      <div className="content-dataMunicipio">
        <p>{`Total de Empresas ${context.state.empresasAbertas ? 'Abertas' : 'Ativas'}`}</p>
        <div className="content-table">
          <div className="tabelas">
            <table>
              <tbody>
                {municipios.length > 0 && municipios.map((item, index) => (
                  <tr key={index}><td>{item}</td></tr>
                ))}
              </tbody>
            </table>
            {/* <table>
              <tbody>
                {quantidade_abertas_por_municipio.map((item, index) => (
                  <tr key={index}><td>{item}</td></tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  )
}