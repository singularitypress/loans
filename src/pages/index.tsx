import { Geist, Geist_Mono } from "next/font/google";
import { useReducer } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const initialState = {
    principle: 0,
    interest: 0,
    term: 0,
    frequency: "monthly" as "monthly" | "weekly" | "biweekly",
  };

  type FormAction =
    | { type: "setPrinciple"; payload: number }
    | { type: "setInterest"; payload: number }
    | { type: "setTerm"; payload: number }
    | { type: "setFrequency"; payload: "monthly" | "weekly" | "biweekly" };

  const formReducer = (
    state: typeof initialState,
    action: FormAction
  ): typeof initialState => {
    switch (action.type) {
      case "setPrinciple":
        return { ...state, principle: action.payload };
      case "setInterest":
        return { ...state, interest: action.payload };
      case "setTerm":
        return { ...state, term: action.payload };
      case "setFrequency":
        return { ...state, frequency: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <form className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-4">Loan Calculator</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">
                  Principal Amount
                </label>
                <input
                  type="number"
                  value={state.principle}
                  onChange={(e) =>
                    dispatch({
                      type: "setPrinciple",
                      payload: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  value={state.interest}
                  onChange={(e) =>
                    dispatch({
                      type: "setInterest",
                      payload: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Term (in years)
                </label>
                <input
                  type="number"
                  value={state.term}
                  onChange={(e) =>
                    dispatch({
                      type: "setTerm",
                      payload: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Payment Frequency
                </label>
                <select
                  value={state.frequency}
                  onChange={(e) =>
                    dispatch({
                      type: "setFrequency",
                      payload: e.target.value as
                        | "monthly"
                        | "weekly"
                        | "biweekly",
                    })
                  }
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-background"
                >
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Biweekly</option>
                </select>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p>
                  Current values: Principle: {state.principle}, Interest:{" "}
                  {state.interest}%, Term: {state.term} years, Frequency:{" "}
                  {state.frequency}
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 cursor-pointer transition-all ease-in-out border-2 border-indigo-600 rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-background focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Calculate
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
