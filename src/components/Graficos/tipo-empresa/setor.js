import React, { useContext, useEffect, useState } from "react";
import Echarts from "echarts-for-react";

import { getAbertas } from '../../../services/pinot'
import { ContextGlobal } from '../../../contexts/GlobalContext/context';
import "./style.css";

export default () => {

  const context = useContext(ContextGlobal)

  const [dataSetor, setdataSetor] = useState([]);
  const [setor, setSetor] = useState({
    classificacao: "Setor",
    empresas: [],
    quantidade: []
  });
 
  useEffect(() => {
    if(dataSetor !== undefined){
      const obj = {classificacao: "Setor", empresas: [], quantidade: []}
      dataSetor.forEach(element => {
        obj.empresas.push(element[0].replace(' ', '\n'))
        obj.quantidade.push(element[1]);
      });
      setSetor(obj);
    }  
  }, [dataSetor]);

  useEffect(() => {
    const fetchsetor = async () => {
      switch (context.state.empresasAbertas) {
        default:
          const response = await getAbertas('setor', context);
          setdataSetor(response);
          break;
      }
    }
    fetchsetor()
  }, [context]);

  let datas = [];
  const colors = [
    "#48cae4",
    "#00b4d8",
    "#0096c7",
    "#0077b6",
    "#90e0ef",
    "#5c677d",
  ];
  
  for (let i = 0; i < setor.quantidade.length; i++) {
    datas.push({
      value: setor.quantidade[i],
      itemStyle: { color: colors[i] },
    });
  }

   const config1 = {
    grid: {
      containLabel: true,
      width: "92%",
      height: "90%",
      left: "2%",
      top: "4%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
    },
    label: {
      show: true,
      position: "right",
      fontWeight: 'bold',
      color: "rgb(0, 0, 0)",
    },
    xAxis: {
      type: "value",
      data: setor.quantidade,
      axisLabel: {
        fontSize: 12,
        fontWeight: setor.quantidade.length > 7 ? "normal" : "bold",
      }
    },
    toolbox: {
      show: true,
      orient: "horizontal",
      left: "95%",
      itemSize: 15,
      showTitle: true,
      feature: {
        type: "png",
        saveAsImage: {
          show: true,
          title: "Download",
          iconStyle: {
            borderWidth: 1.5,
          },
        },
      },
    },
    yAxis: {
      tipo: "category",
      data: setor.empresas,
      axisLabel: {
        fontSize: 12,
        fontWeight: setor.quantidade.length > 7 ? "normal" : "bold",
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    series: [
      {
        data: datas,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        barWidth: "45%",
      },
    ],
  };

  const config2 = {
    grid: {
      containLabel: true,
      width: "93%",
      height: "88%",
      top: "6%",
      left: "1%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
    },
    toolbox: {
      show: true,
      orient: "horizontal",
      left: "94%",
      itemSize: 14,
      showTitle: true,
      feature: {
        type: "png",
        saveAsImage: {
          show: true,
          title: "Download",
          iconStyle: {
            borderWidth: 1.5,
          },
        },
      },
    },
    label: {
      show: true,
      align: "center",
      position:  "right",
      verticalAlign: "middle",
      fontSize: 10,
      fontWeight: "bold",
      color: "rgb(0, 0, 0)",
    },
    xAxis: {
      type: "value",
      show: true,
      data: setor.quantidade,
      zlevel: 5,
      axisLabel: {
        fontWeight: "bold",
        fontSize: 10,
      },
    },
    yAxis: {
      tipo: "category",
      data: setor.empresas,
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        fontSize: 9,
        fontWeight: "bold",
      }
    },
    series: [
      {
        data: datas,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        barWidth: "50%",
      },
    ],
  };

  const config3 = {
    grid: {
      containLabel: true,
      width: "90%",
      height: "85%",
      top: "5%",
      left: "3%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
    },
    toolbox: {
      show: true,
      orient: "horizontal",
      left: "right",
      itemSize: 12,
      showTitle: true,
      feature: {
        type: "png",
        saveAsImage: {
          show: true,
          title: "Download",
          iconStyle: {
            borderWidth: 1.5,
          },
        },
      },
    },
    label: {
      show: true,
      align: "center",
      verticalAlign: "middle",
      margin: true,
      position: "right",
      fontWeight: "normal",
      fontSize: 10,
      color: "rgb(0, 0, 0)",
    },
    xAxis: {
      type: "value",
      data: setor.quantidade,
      zlevel: 5,
      axisLabel: {
        fontWeight: "bold",
        fontSize: 9,
      }
    },
    yAxis: {
      type: "category",
      data: setor.empresas,
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        fontSize: 8,
        fontWeight: "bold",
      },
    },
    series: [
      {
        data: datas,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
        barWidth: "50%",
      },
    ],
  };

  const config4 = {
    grid: {
      containLabel: true,
      height: "92%",
      width: "92%",
      top: "2%",
      left: "3%",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
    },
    toolbox: {
      show: true,
      orient: "horizontal",
      left: "96%",
      itemSize: 17,
      showTitle: true,
      feature: {
        type: "png",
        saveAsImage: {
          show: true,
          title: "Download",
          iconStyle: {
            borderWidth: 1.5,
          },
        },
      },
    },
    label: {
      show: true,
      position: "right",
      color: "rgb(0, 0, 0)",
      fontWeight: 'bold'
    },
    xAxis: {
      type: "value",
      data: setor.quantidade,
      axisLabel: {
        fontSize: 12,
        fontWeight: "bold",
      },
    },
    yAxis: {
      tipo: "category",
      data: setor.empresas,
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        fontSize: setor.quantidade.length > 7 ? 9 : 12,
        fontWeight: "bold",
        position: "top",
        verticalAlign: "middle",
      },
    },
    series: [
      {
        data: datas,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.3)",
        },
        barWidth: "50%",
      },
    ],
  };

  return (
    <div
      className="grafico setor"
      style={{
        overflowY: "hidden",
      }}
    >
      <p>{`Empresas ${context.state.empresasAbertas ? 'Abertas Por Setor' : 'Ativas Por Atividade'}`}</p>

      {window.innerWidth >= 425 && window.innerWidth < 768 && (
        <Echarts
          option={config3}
          style={{
            width: '70vw',
          }}
          opts={{ renderer: "canvas" }}
        />
      )}

      {window.innerWidth >= 768 && window.innerWidth <= 1024 && (
        <Echarts
          option={config2}
          style={{
            width: "50vw",
            height: "45vh"
          }}
          opts={{ renderer: "canvas" }}
        />
      )}

      {window.innerWidth > 1024 && window.innerWidth <= 1366 && (
        <Echarts
          option={config1}
          style={{
            width: "50vw",
            height: "45vh"
          }}
          opts={{ renderer: "canvas" }}
        />
      )}

      {window.innerWidth > 1366 && (
        <Echarts
          option={config4}
          style={{
            height: "50vh",
            width: "50vw",
          }}
          opts={{ renderer: "canvas" }}
        />
      )}
    </div>
  );
};
