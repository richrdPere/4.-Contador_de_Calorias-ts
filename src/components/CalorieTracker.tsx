import { useMemo } from "react";
import { Activity } from "../types";
import CaloriesDisplay from "./CaloriesDisplay";

type CaloriesTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CaloriesTrackerProps) {
  // Calorias consumidas
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  // Calorias quemadas
  const caloriesBurned = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  // Calorias Totales
  const netCalories = useMemo(
    () => caloriesConsumed - caloriesBurned,
    [activities]
  );

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        {/* Calorias consumidas */}
        <CaloriesDisplay calories={caloriesConsumed} text="Consumidas" />

        {/* Calorias quemadas */}
        <CaloriesDisplay calories={caloriesBurned} text="Ejercicio" />

        {/* Calorias totales */}
        <CaloriesDisplay calories={netCalories} text="Diferencia" />
      </div>
    </>
  );
}
