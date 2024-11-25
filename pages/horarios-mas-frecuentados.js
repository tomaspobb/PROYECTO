import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Chart from "chart.js/auto";

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default function HorariosMasFrecuentados() {
  const { t } = useTranslation("common");
  const [labelsDays, setLabelsDays] = useState([]);
  const [dataDays, setDataDays] = useState([]);
  const [labelsHoursToday, setLabelsHoursToday] = useState([]);
  const [dataHoursToday, setDataHoursToday] = useState([]);

  useEffect(() => {
    fetch("/api/get-frequent-times")
      .then((response) => response.json())
      .then((result) => {
        setLabelsDays(result.labelsDays);
        setDataDays(result.dataDays);
        setLabelsHoursToday(result.labelsHoursToday);
        setDataHoursToday(result.dataHoursToday);

        // Renderizar los gráficos
        renderDayChart(result.labelsDays, result.dataDays);
        renderHourChart(result.labelsHoursToday, result.dataHoursToday);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderDayChart = (labels, data) => {
    const ctx = document.getElementById("dayChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: t("reservationsByDay"),
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  };

  const renderHourChart = (labels, data) => {
    const ctx = document.getElementById("hourChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: t("reservationsByHour"),
            data: data,
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
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

      {/* Botón para regresar a la página de reservas */}
      <div className="d-flex justify-content-center mt-4">
        <a href="/reservas" className="btn-back">
          {t("backToReservations")}
        </a>
      </div>

      {/* Acordeón: Frecuencia dentro del mes */}
      <div className="accordion mt-4">
        <button
          className="accordion-button"
          onClick={() =>
            document.getElementById("monthlyFrequency").classList.toggle("show")
          }
        >
          {t("monthlyFrequency")}
        </button>
        <div id="monthlyFrequency" className="accordion-content">
          <h3>{t("reservationsByDay")}</h3>
          <canvas id="dayChart"></canvas>
        </div>
      </div>

      {/* Acordeón: Frecuencia de reservas para hoy */}
      <div className="accordion mt-4">
        <button
          className="accordion-button"
          onClick={() =>
            document.getElementById("dailyFrequency").classList.toggle("show")
          }
        >
          {t("todayFrequency")}
        </button>
        <div id="dailyFrequency" className="accordion-content">
          <h3>{t("reservationsByHour")}</h3>
          <canvas id="hourChart"></canvas>
        </div>
      </div>

      <style jsx>{`
        .accordion {
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .accordion-button {
          width: 100%;
          padding: 15px;
          text-align: left;
          background-color: #f7f7f7;
          border: none;
          cursor: pointer;
          font-size: 16px;
        }
        .accordion-button:hover {
          background-color: #e6e6e6;
        }
        .accordion-content {
          display: none;
          overflow: hidden;
          padding: 15px;
          border-top: 1px solid #ddd;
        }
        .accordion-content.show {
          display: block;
        }
        .chart-container {
          width: 100%;
          max-width: 800px;
          margin: 0 auto;
        }
        .btn-back {
          display: inline-block;
          padding: 10px 20px;
          font-size: 16px;
          color: white;
          background-color: #007bff;
          border-radius: 20px;
          text-decoration: none;
          text-align: center;
          transition: background-color 0.3s ease;
        }
        .btn-back:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
}
