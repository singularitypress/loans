export interface Payment {
  /**
   * The sequential number of the payment
   */
  paymentNumber: number;
  /**
   * The total amount for this payment
   */
  paymentAmount: number;
  /**
   * The portion of the payment applied to interest
   */
  interestPaid: number;
  /**
   * The portion of the payment applied to the principal
   */
  principalPaid: number;
  /**
   * The outstanding loan balance after this payment
   */
  remainingBalance: number;
}

interface State {
  /**
   * The initial loan amount (principal)
   */
  principle: number;
  /**
   * The annual interest rate as a decimal (e.g., 0.05 for 5%)
   */
  interest: number;
  /**
   * The total number of payment periods (e.g., months, weeks)
   */
  term: number;
  /**
   * The frequency of payments: 'monthly', 'weekly', or 'biweekly'
   */
  frequency: "monthly" | "weekly" | "biweekly";
}

/**
 * Calculates a complete amortization schedule for a loan.
 *
 * @param Options - An object containing the principle, interest, term, and frequency.
 * @returns An array of payment objects detailing the schedule.
 */

export const amortization = (loanDetails: State): Payment[] => {
  const { principle, interest, term, frequency } = loanDetails;

  // 1. Determine the number of payment periods per year
  const periodsPerYear = {
    monthly: 12,
    weekly: 52,
    biweekly: 26,
  }[frequency];

  // 2. Calculate core variables for the formula
  const periodicInterestRate = interest / 100 / periodsPerYear;
  const totalPayments = term * periodsPerYear;

  // Handle the edge case of a 0% interest loan
  if (periodicInterestRate === 0) {
    const simplePayment = principle / totalPayments;
    const schedule: Payment[] = [];
    let balance = principle;

    for (let i = 1; i <= totalPayments; i++) {
      balance -= simplePayment;
      schedule.push({
        paymentNumber: i,
        paymentAmount: simplePayment,
        interestPaid: 0,
        principalPaid: simplePayment,
        remainingBalance: Math.max(0, balance),
      });
    }
    return schedule;
  }

  // 3. Calculate the fixed monthly payment using the amortization formula
  const powerTerm = Math.pow(1 + periodicInterestRate, totalPayments);
  const paymentAmount =
    (principle * (periodicInterestRate * powerTerm)) / (powerTerm - 1);

  // 4. Generate the payment schedule
  const schedule: Payment[] = [];
  let remainingBalance = principle;

  for (let i = 1; i <= totalPayments; i++) {
    // Calculate interest for the current period on the remaining balance
    const interestForPeriod = remainingBalance * periodicInterestRate;

    // The rest of the payment goes to the principal
    let principalForPeriod = paymentAmount - interestForPeriod;

    // Adjust the last payment to ensure the balance is exactly zero
    if (i === totalPayments) {
      principalForPeriod = remainingBalance;
      const adjustedPayment = principalForPeriod + interestForPeriod;

      schedule.push({
        paymentNumber: i,
        paymentAmount: adjustedPayment,
        interestPaid: interestForPeriod,
        principalPaid: principalForPeriod,
        remainingBalance: 0,
      });
      break; // Exit loop after final payment
    }

    // Update the remaining balance
    remainingBalance -= principalForPeriod;

    schedule.push({
      paymentNumber: i,
      paymentAmount: paymentAmount,
      interestPaid: interestForPeriod,
      principalPaid: principalForPeriod,
      remainingBalance: remainingBalance,
    });
  }

  return schedule;
};
