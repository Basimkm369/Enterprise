import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CommonModal from "./CommonModal";

const statusOptions = [
  "under-mitigation",
  "pending-mitigation",
  "new",
  "closed",
  "sent-for-closure",
  "escalated",
  "draft",
];

const typeOptions = ["threat", "opportunity"];

const createEnterpriseSchema = yup.object({
  recordNo: yup.string().trim().required("Record number is required."),
  description: yup.string().trim().required("Description is required."),
  status: yup
    .string()
    .oneOf(statusOptions, "Select a valid status.")
    .required("Status is required."),
  type: yup
    .string()
    .oneOf(typeOptions, "Select a valid type.")
    .required("Type is required."),
  phase: yup.string().trim().required("Phase is required."),
  department: yup.string().trim().required("Department is required."),
  inherentImpact: yup
    .number()
    .typeError("Impact must be a number.")
    .integer("Impact must be a whole number.")
    .min(1, "Impact must be between 1 and 5.")
    .max(5, "Impact must be between 1 and 5.")
    .required("Impact is required."),
  inherentLikelihood: yup
    .number()
    .typeError("Likelihood must be a number.")
    .integer("Likelihood must be a whole number.")
    .min(1, "Likelihood must be between 1 and 5.")
    .max(5, "Likelihood must be between 1 and 5.")
    .required("Likelihood is required."),
});

const CreateEnterpriseModal = ({ isOpen, onClose, onCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(createEnterpriseSchema),
    defaultValues: {
      recordNo: "",
      description: "",
      status: "new",
      type: "threat",
      phase: "",
      department: "",
      inherentImpact: 1,
      inherentLikelihood: 1,
    },
  });

  const handleClose = () => {
    reset();
    onClose?.();
  };

  const handleCreate = async (values) => {
    await onCreate?.(values);
    reset();
    onClose?.();
  };

  return (
    <CommonModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Enterprise"
      footer={
        <>
          <button
            type="button"
            onClick={handleClose}
            className="h-9 px-4 rounded-md border border-border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-enterprise-form"
            disabled={isSubmitting}
            className="h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <span className="h-4 w-4 rounded-full border-2 border-primary-foreground/60 border-t-transparent animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </>
      }
    >
      <form
        id="create-enterprise-form"
        onSubmit={handleSubmit(handleCreate)}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Record No
          </label>
          <input
            type="text"
            placeholder="ERM-0311"
            className="h-9 px-3 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            {...register("recordNo")}
          />
          {errors.recordNo ? (
            <span className="text-xs text-destructive">
              {errors.recordNo.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          <select
            className="h-9 px-3 border border-border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            {...register("status")}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status.replace(/-/g, " ")}
              </option>
            ))}
          </select>
          {errors.status ? (
            <span className="text-xs text-destructive">
              {errors.status.message}
            </span>
          ) : null}
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Risk Activity Description
          </label>
          <textarea
            rows={3}
            placeholder="Describe the risk activity..."
            className="px-3 py-2 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 resize-none"
            {...register("description")}
          />
          {errors.description ? (
            <span className="text-xs text-destructive">
              {errors.description.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Type</label>
          <select
            className="h-9 px-3 border border-border rounded-md bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            {...register("type")}
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type ? (
            <span className="text-xs text-destructive">
              {errors.type.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">Phase</label>
          <input
            type="text"
            placeholder="Warranty"
            className="h-9 px-3 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            {...register("phase")}
          />
          {errors.phase ? (
            <span className="text-xs text-destructive">
              {errors.phase.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Department
          </label>
          <input
            type="text"
            placeholder="Finance"
            className="h-9 px-3 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            {...register("department")}
          />
          {errors.department ? (
            <span className="text-xs text-destructive">
              {errors.department.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Inherent Impact
          </label>
          <input
            type="number"
            min={1}
            max={5}
            step={1}
            className="h-9 px-3 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            {...register("inherentImpact", { valueAsNumber: true })}
          />
          {errors.inherentImpact ? (
            <span className="text-xs text-destructive">
              {errors.inherentImpact.message}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Inherent Likelihood
          </label>
          <input
            type="number"
            min={1}
            max={5}
            step={1}
            className="h-9 px-3 border border-border rounded-md bg-card text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1"
            {...register("inherentLikelihood", { valueAsNumber: true })}
          />
          {errors.inherentLikelihood ? (
            <span className="text-xs text-destructive">
              {errors.inherentLikelihood.message}
            </span>
          ) : null}
        </div>
      </form>
    </CommonModal>
  );
};

export default CreateEnterpriseModal;
