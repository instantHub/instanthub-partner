import { Button } from "@components/general";
import {
  useDeletePartnerExecutivesMutation,
  useGetPartnerExecutivesQuery,
} from "@features/api";
import { IExecutive } from "@features/api/executives/types";
import { DeleteIcon, EditIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

export const ExecutivesList = () => {
  const { data: executives, isLoading } = useGetPartnerExecutivesQuery();
  const [deleteExecutive] = useDeletePartnerExecutivesMutation();

  const handleDelete = async (executive: IExecutive) => {
    if (
      window.confirm(
        `Are you sure you want to delete this executive: ${executive.name}?`
      )
    ) {
      try {
        await deleteExecutive(executive._id);
        toast.success(`executive deleted successfully!`);
      } catch (error) {
        toast.error(`Failed to delete executive.`);
      }
    }
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* Table Headers */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {executives?.map((executive) => (
              <tr key={executive._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {executive.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {executive.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                  {executive?.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 capitalize">
                  {executive.role}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                      executive.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {executive.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="flex min-w-[150px] px-2 sm:px-6 py-4 text-right text-sm font-medium space-x-1 sm:space-x-2">
                  {/* <Button variant="ghost" onClick={() => onEdit(user)}> */}
                  <Button variant="ghost">
                    <EditIcon className="w-4 h-4 text-blue-600" />
                  </Button>
                  {/* onClick={() => onToggleActive(executive._id, executive.isActive)} */}
                  <button
                    title={executive.isActive ? "Deactivate" : "Activate"}
                    className="text-blue-600"
                  >
                    {executive.isActive ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  {/* <Button variant="ghost" onClick={() => onDelete(user._id)}> */}
                  <Button
                    variant="ghost"
                    onClick={() => handleDelete(executive)}
                  >
                    <DeleteIcon className="w-4 h-4 text-red-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isLoading && executives?.length === 0 && (
        <div className="text-center py-12 text-gray-500 text-lg">
          No Executives found
        </div>
      )}
    </div>
  );
};
