import { useState } from "react";

export function ProposalModa({
  isOpen,
  onClose,
  onSubmit,
  selectedJob,
  engineerId,
}) {
  const [content, setContent] = useState("");
  const [cost, setCost] = useState("");
  const [errors, setErrors] = useState({}); // State to hold validation errors

  const validateInputs = () => {
    const errors = {};
    if (!content || content.length < 10) {
      errors.content = "Cover letter must be at least 10 characters";
    }
    if (!cost || cost <= 0) {
      errors.cost = "Cost must be greater than 0";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const proposalData = {
      engineerId: engineerId,
      service: selectedJob._id,
      content,
      budget: Number(cost),
    };

    onSubmit(proposalData);
    onClose(); // Close modal after submission
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-[36rem] h-auto max-w-full">
        <h2 className="text-2xl text-amber-400 font-bold mb-6">
          Submit Proposal
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cover Letter
            </label>
            <textarea
              className={`mt-1 p-2 block w-full border ${
                errors.content ? "border-red-500" : "border-gray-400"
              } rounded-md bg-slate-100`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required></textarea>
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">{errors.content}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Cost
            </label>
            <input
              type="number"
              className={`mt-1 p-2 block w-full border ${
                errors.cost ? "border-red-500" : "border-gray-400"
              } rounded-md bg-slate-100`}
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
            />
            {errors.cost && (
              <p className="text-red-500 text-sm mt-1">{errors.cost}</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={onClose}
              className="p-2 px-6 bg-gray-600 text-white rounded-md">
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 px-6 bg-amber-300 hover:bg-amber-500 text-black rounded-md">
              Send Proposal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
