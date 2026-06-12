import CreateContractWizard from "@/components/contracts/CreateContractWizard";

export default function CreateContractPage() {
  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 pb-20">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">New Deal</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Safely define terms before money is deposited.</p>
      </div>

      <CreateContractWizard />
    </div>
  );
}
