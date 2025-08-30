import { Input, Select } from "@/components/forms";
import { Button } from "@/components/ui";
import Head from "next/head";
import { useReducer } from "react";

const OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
];

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
    <>
      <Head>
        <title>Loan Calculator</title>
      </Head>
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <form className="w-full max-w-md space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-4">Loan Calculator</h1>
              <div className="space-y-4">
                <Input
                  label="Principal Amount"
                  type="number"
                  value={state.principle}
                  onChange={(e) =>
                    dispatch({
                      type: "setPrinciple",
                      payload: parseFloat(e.target.value) || 0,
                    })
                  }
                />
                <Input
                  label="Interest Rate (%)"
                  type="number"
                  value={state.interest}
                  onChange={(e) =>
                    dispatch({
                      type: "setInterest",
                      payload: parseFloat(e.target.value) || 0,
                    })
                  }
                />
                <Input
                  label="Term (in years)"
                  type="number"
                  value={state.term}
                  onChange={(e) =>
                    dispatch({
                      type: "setTerm",
                      payload: parseFloat(e.target.value) || 0,
                    })
                  }
                />
                <Select
                  label="Payment Frequency"
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
                  options={OPTIONS}
                />
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
              <Button
                onClick={() => {
                  console.log();
                }}
              >
                Calculate
              </Button>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}
