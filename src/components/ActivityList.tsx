import { Activity } from "../types";
import { categories } from "../data/category";

// Libreries

import { PencilSquareIcon, XCircleIcon } from "@heroicons/react/24/outline"; //Para iconos. Install: npm i @heroicons/react

// states
import { useMemo, Dispatch } from "react";
import { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export default function ActivityList({
  activities,
  dispatch,
}: ActivityListProps) {
  // State - UseMemo
  const categoryName = useMemo(
    () => (category: Activity["category"]) =>
      categories.map(cat => (cat.id === category ? cat.name : ""))
    ,[activities]
  );

  const isEmptyActivities = useMemo(() => activities.length === 0,[activities]) ;

  return (
    <>
      {/* Title */}
      <h2 className="text-4xl font-bold text-slate-600 text-center">
        Comida y Actividades
      </h2>
      {/* List */}
      { isEmptyActivities ? (
        <p className="text-center my-5">No hay Actividades aún...</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
          >
            {/* Calorias */}
            <div className="space-y-2 relative">
              {/* Categoria - name */}
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white font-bold ${
                  activity.category === 1 ? "bg-lime-500" : "bg-orange-500"
                }`}
              >
                {categoryName(+activity.category)}
              </p>

              {/* Name */}
              <p className="text-2xl font-bold pt-5">{activity.name}</p>

              {/* Caloria - number */}
              <p className="font-black text-4xl text-lime-500">
                {activity.calories} {""}
                <span>Calorias</span>
              </p>
            </div>

            {/* Acciones */}
            <div className="flex gap-5 items-center">
              {/* Button - Editar */}
              <button
                onClick={() =>
                  dispatch({
                    type: "set-activeId",
                    payload: { id: activity.id },
                  })
                }
                className="rounded-full p-2 hover:bg-yellow-500"
              >
                <PencilSquareIcon className="h-8 w-8 text-gray-800 hover:text-white" />
              </button>

              {/* Button - Eliminar */}
              <button
                onClick={() =>
                  dispatch({
                    type: "delete-activity",
                    payload: { id: activity.id },
                  })
                }
                className="rounded-full p-2 hover:bg-red-700"
              >
                <XCircleIcon className="h-8 w-8 text-gray-800 hover:text-white" />
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
}
