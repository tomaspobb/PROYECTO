import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Chart from "chart.js/auto";

// Configuración para traducciones
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default function HorariosMasFrecuentados() {
  const { t } = useTranslation("common"); // Traducciones
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  // Efecto para cargar los datos del gráfico desde la API
  useEffect(() => {
    fetch("/api/get-frequent-times")
      .then((response) => response.json())
      .then((result) => {
        setLabels(result.labels);
        setData(result.data);
        renderChart(result.labels, result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Función para renderizar el gráfico
  const renderChart = (labels, data) => {
    const ctx = document.getElementById("frequentTimesChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels, // Fechas
        datasets: [
          {
            label: t("mostFrequentedTimes"),
            data: data, // Número de reservas
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: t("reservations"), // Etiqueta del eje Y
            },
          },
          x: {
            title: {
              display: true,
              text: t("daysOfMonth"), // Etiqueta del eje X
            },
          },
        },
      },
    });
  };

  return (
    <div className="container py-5">
      <Head>
        <title>{t("mostFrequentedTimes")} - {t("restaurantName")}</title>
      </Head>

      <h1 className="text-center">{t("mostFrequentedTimes")}</h1>
      <p className="text-center">{t("frequentedTimesDescription")}</p>

      <div className="chart-container mt-4">
        <canvas id="frequentTimesChart"></canvas>
      </div>

      {/* Estilo CSS */}
      <style jsx>{`
        .chart-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
}
