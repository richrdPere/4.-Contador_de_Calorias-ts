// Types
import { Activity } from "../types";

// Actions (Acciones)
export type ActivityActions =
  | { type: "save-activity"; payload: { newActivity: Activity } }
  | { type: "set-activeId"; payload: { id: Activity["id"] } }
  | { type: "delete-activity"; payload: { id: Activity["id"] } }
  | { type: "restart-app" };

// InitialState - LocalStorage
export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

const localStorageActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: localStorageActivities(),
  activeId: "",
};

// Reducers
export const activityReducer = (
  state: ActivityState = initialState,
  action: ActivityActions
) => {
  // Action 1: save-activity
  if (action.type === "save-activity") {
    // Este codigo maneja la logica para actualizar el state
    let updateActivities: Activity[] = [];

    if (state.activeId) {
      updateActivities = state.activities.map((activity) =>
        activity.id === state.activeId ? action.payload.newActivity : activity
      );
    } else {
      updateActivities = [...state.activities, action.payload.newActivity];
    }

    return {
      ...state,
      activities: updateActivities,
      activeId: "",
    };
  }

  // Action 2: set-activeId
  if (action.type === "set-activeId") {
    // Este codigo maneja la logica para actualizar el state

    return {
      ...state,
      activeId: action.payload.id,
    };
  }

  // Action 3: delete-activity
  if (action.type === "delete-activity") {
    // Este codigo maneja la logica para actualizar el state
    return {
      ...state,
      activities: state.activities.filter(
        (activity) => activity.id !== action.payload.id
      ),
    };
  }

  // Action 4: restart-app
  if (action.type === "restart-app") {
    // Este codigo maneja la logica para actualizar el state

    return {
      activities: [],
      activeId: "",
    };
  }

  return state;
};
