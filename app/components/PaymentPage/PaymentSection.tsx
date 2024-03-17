import AnnualPlan from "./paymentplans/annualPlan";
import ProPlan from "./paymentplans/proplan";
export default function PaymentSection() {
  return (
    <div className="items-center justify-center mt-8 sm:mt-16 flex flex-col space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-2 md:gap-6 ">
      <div className="col-span-1 flex-shrink-0 rounded-2xl  transition-all  h-full flex-1 border border-opacity-20">
        <AnnualPlan />
      </div>
      <div className="col-span-1 flex-shrink-0 rounded-2xl  transition-all  h-full flex-1 border border-opacity-20">
        <ProPlan />
      </div>
    </div>
  );
}
