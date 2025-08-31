import { Input, Select } from "@/components/forms";
import { Button } from "@/components/ui";
import { amortization, Payment } from "@/util";
import Head from "next/head";
import { useReducer, useState } from "react";

const OPTIONS = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
];

const INITIAL_STATE: State = {
  principle: 0,
  interest: 0,
  term: 0,
  frequency: "monthly" as "monthly" | "weekly" | "biweekly",
};

interface State {
  principle: number;
  interest: number;
  term: number;
  frequency: "monthly" | "weekly" | "biweekly";
}

export default function Home() {
  const [payments, setPayments] = useState<Payment[]>([]);

  type FormAction =
    | { type: "setPrinciple"; payload: number }
    | { type: "setInterest"; payload: number }
    | { type: "setTerm"; payload: number }
    | { type: "setFrequency"; payload: "monthly" | "weekly" | "biweekly" };

  const formReducer = (
    state: State,
    action: FormAction
  ): typeof INITIAL_STATE => {
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

  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  return (
    <>
      <Head>
        <title>Loan Calculator</title>
      </Head>
      <div className="font-sans grid min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="grid gap-8 grid-cols-2 relative">
          <form className="sticky top-0" onSubmit={(e) => e.preventDefault()}>
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
                  <ul className="grid grid-cols-2">
                    <div>
                      <li className="grid grid-cols-2">
                        <strong>Principle:</strong>{" "}
                        <span>{state.principle}</span>
                      </li>
                      <li className="grid grid-cols-2">
                        <strong>Interest:</strong>{" "}
                        <span>{state.interest}%</span>
                      </li>
                      <li className="grid grid-cols-2">
                        <strong>Term:</strong> <span>{state.term} years</span>
                      </li>
                      <li className="grid grid-cols-2">
                        <strong>Frequency:</strong>{" "}
                        <span>{state.frequency}</span>
                      </li>
                    </div>
                    <div>
                      <li className="grid grid-cols-2">
                        <strong>Principle:</strong>{" "}
                        <span>{state.principle}</span>
                      </li>
                      <li className="grid grid-cols-2">
                        <strong>Interest:</strong>{" "}
                        <span>{state.interest}%</span>
                      </li>
                      <li className="grid grid-cols-2">
                        <strong>Term:</strong> <span>{state.term} years</span>
                      </li>
                      <li className="grid grid-cols-2">
                        <strong>Frequency:</strong>{" "}
                        <span>{state.frequency}</span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
            </div>
            <br />
            <div>
              <Button
                onClick={() => {
                  setPayments(amortization(state));
                }}
              >
                Calculate
              </Button>
            </div>
          </form>

          <div className="w-full max-w-4xl mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Amortization Schedule
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-2 px-4 text-left">Payment #</th>
                    <th className="py-2 px-4 text-right">Payment</th>
                    <th className="py-2 px-4 text-right">Interest</th>
                    <th className="py-2 px-4 text-right">Principal</th>
                    <th className="py-2 px-4 text-right">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 &&
                    payments.map((payment, index) => (
                      <tr key={index} className="border-b hover:bg-gray-900">
                        <td className="py-2 px-4 text-left">
                          {payment.paymentNumber}
                        </td>
                        <td className="py-2 px-4 text-right">
                          ${payment.paymentAmount.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-right">
                          ${payment.interestPaid.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-right">
                          ${payment.principalPaid.toFixed(2)}
                        </td>
                        <td className="py-2 px-4 text-right">
                          ${payment.remainingBalance.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
